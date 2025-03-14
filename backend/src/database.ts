import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../database.sqlite");
const db = new Database(dbPath);


db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`);

console.log("Banco de dados conectado!");

export default db;
