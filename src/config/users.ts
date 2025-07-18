import bcrypt from 'bcryptjs';
import { User, UserRole } from '../models/User';

// Passwords: admin123, user123
export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: UserRole.Admin,
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('user123', 10),
    role: UserRole.User,
  },
]; 