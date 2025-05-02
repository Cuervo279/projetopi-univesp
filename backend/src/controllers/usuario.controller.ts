import { Request, Response } from 'express';
import { openDb } from '../database/db';
import bcrypt from 'bcrypt';
import { gerarToken } from '../utils/auth'; // <<-- Importação nova

// Listar todos os usuários (sem senha)
export async function getUsuarios(req: Request, res: Response): Promise<Response> {
  const db = await openDb();
  const usuarios = await db.all('SELECT id, nome, email, data_nascimento FROM Usuario');
  return res.json(usuarios);
}

// Obter usuário por ID
export async function getUsuarioById(req: Request, res: Response): Promise<Response> {
  const db = await openDb();
  const usuario = await db.get('SELECT id, nome, email, data_nascimento FROM Usuario WHERE id = ?', [req.params.id]);
  return res.json(usuario);
}

// Criar novo usuário
export async function createUsuario(req: Request, res: Response): Promise<Response> {
  const { id, nome, email, senha, data_nascimento } = req.body;
  const senhaHash = await bcrypt.hash(senha, 10);
  const db = await openDb();
  await db.run(
    `INSERT INTO Usuario (id, nome, email, senha, data_nascimento) VALUES (?, ?, ?, ?, ?)`,
    [id, nome, email, senhaHash, data_nascimento]
  );
  return res.status(201).send('Usuário criado');
}

// Login de usuário com JWT
export const loginUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, senha } = req.body;
  const db = await openDb();
  const usuario = await db.get('SELECT * FROM Usuario WHERE email = ?', [email]);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Usuário não encontrado' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ mensagem: 'Senha incorreta' });
  }

  const token = gerarToken({ id: usuario.id, email: usuario.email });

  return res.json({
    mensagem: 'Login bem-sucedido',
    token, // <<-- Aqui está o token real
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
};

// Deletar usuário
export async function deleteUsuario(req: Request, res: Response): Promise<Response> {
  const db = await openDb();
  await db.run('DELETE FROM Usuario WHERE id = ?', [req.params.id]);
  return res.send('Usuário deletado');
}
