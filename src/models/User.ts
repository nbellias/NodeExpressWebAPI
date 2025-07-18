export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  id: number;
  username: string;
  password: string; // hashed
  role: UserRole;
} 