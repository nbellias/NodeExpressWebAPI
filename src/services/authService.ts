import { users } from '../config/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/User';

const JWT_SECRET = 'your_jwt_secret'; // In production, use env variable

export function authenticate(username: string, password: string): User | null {
  const user = users.find(u => u.username === username);
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password);
  return valid ? user : null;
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
} 