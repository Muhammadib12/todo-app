import {DatabaseSync} from 'node:sqlite';
const db = new DatabaseSync(':memory:');


// Execute SQL statment from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXt    
    )    
    `);


db.exec(`
    CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    `);

export default db; 
