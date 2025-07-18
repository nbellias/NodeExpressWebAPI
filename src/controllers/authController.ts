import { Request, Response } from 'express';
import { authenticate, generateToken } from '../services/authService';

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  const user = authenticate(username, password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token });
} 