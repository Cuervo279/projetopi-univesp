import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'chaveSecretaPadrão';

export function gerarToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verificarToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
