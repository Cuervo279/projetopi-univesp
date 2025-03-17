import { Request, Response } from "express";
import db from "./database";

// Criar novo aluno (se precisar para cobaia)
export const createStudent = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  const stmt = db.prepare("INSERT INTO students (name) VALUES (?)");
  const result = stmt.run(name);

  return res.status(201).json({ id: result.lastInsertRowid, name });
};


export const addRanking = (req: Request, res: Response) => {
  const { student_id, score, classroom, professor } = req.body;

  if (!student_id || !score || !classroom || !professor) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  const stmt = db.prepare(`
    INSERT INTO rankings (student_id, score, classroom, professor)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(student_id, score, classroom, professor);

  return res.status(201).json({ message: "Ranking atualizado!" });
};


export const addHistory = (req: Request, res: Response) => {
  const { student_id, question, answer, is_correct } = req.body;

  if (!student_id || !question || !answer || is_correct === undefined) {
    return res.status(400).json({ error: "Dados incompletos para histórico." });
  }

  const stmt = db.prepare(`
    INSERT INTO history (student_id, question, answer, is_correct)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(student_id, question, answer, is_correct ? 1 : 0);

  return res.status(201).json({ message: "Histórico salvo!" });
};


export const getRanking = (req: Request, res: Response) => {
  const stmt = db.prepare(`
    SELECT r.id, s.name as student_name, r.score, r.classroom, r.professor
    FROM rankings r
    JOIN students s ON r.student_id = s.id
    ORDER BY r.score DESC
  `);

  const rankings = stmt.all();
  return res.json(rankings);
};

// Listar histórico de um aluno específico *** precisamos alinhar a forma final como vai ser 
export const getHistoryByStudent = (req: Request, res: Response) => {
  const { student_id } = req.params;

  const stmt = db.prepare(`
    SELECT question, answer, is_correct, timestamp
    FROM history
    WHERE student_id = ?
    ORDER BY timestamp DESC
  `);

  const history = stmt.all(student_id);
  return res.json(history);
};