import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../database.sqlite");
const db = new Database(dbPath);

// Tabela de alunos deixei em ingles os nomes das tabelas cabe edição depois :))
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);

// Tabela de rankings
db.exec(`
  CREATE TABLE IF NOT EXISTS rankings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    classroom TEXT NOT NULL,
    professor TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id)
  );
`);

// Tabela de histórico de respostas
db.exec(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_correct INTEGER NOT NULL,  -- 0 = incorreta, 1 = correta
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
  );
`);

console.log("Banco de dados com tabelas atualizado!");
export default db;
