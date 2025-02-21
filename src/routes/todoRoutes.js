import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

router.post("/",(req,res) => {
    const {task} = req.body;

    try{

     const insertTask = db.prepare(`INSERT INTO todos (user_id,task) VALUES (?,?)`);
     const taskAdded = insertTask.run(req.userId,task);
    if(!taskAdded){
        return res.status(403).send('No aded the task');
    }
    res.status(200).send('Task added successfully')

    }catch(e){
        console.log(e.message);
        res.statusCode(503)
        
    }



})

router.put("/:id", (req, res) => {
    const { id } = req.params; 
    const { completed } = req.body; 

    try {
        const isexistTask = db.prepare(`SELECT * FROM todos WHERE id = ?`);
        const exist = isexistTask.get(id);
        
        if (!exist) {
            return res.status(404).send('There is no task with this id!!');
        }

        const update = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
        const updated = update.run(parseInt(completed), id);  // تأكد من تحويل completed إلى رقم صحيح
        
        if (!updated) {
            return res.status(403).send('Something went wrong');
        }

        res.status(200).json({ message: 'Todo Updated Successfully' });

    } catch (e) {
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
});

router.delete("/:id", (req,res) => {
    const {id} = req.params;
    try{

        const deleted = db.prepare(`DELETE  FROM todos WHERE id = ?`);
        const Success = deleted.run(id);
        if(Success){
            return res.status(403).send('Faild to delete');
        }

        res.send('success deleted')

    }catch(err){
        console.log(err.message);
        res.status(503).send('Internal server error');
        
    }
})


export default router;
