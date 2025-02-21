import express from 'express';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//GET the file path from a url of current module
const __filename = fileURLToPath(import.meta.url);
// Get the dirname from the path
const __dirname = dirname(__filename);

//Serves the HTML file from the public directory
app.use(express.static(path.join(__dirname,'../public')));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
})


// Routes 
app.use("/auth",authRoutes);
app.use("/todos",authMiddleware,todoRoutes);


app.listen(PORT, () => {
    console.log(`App listen at the prot: ${PORT}`);
    
});