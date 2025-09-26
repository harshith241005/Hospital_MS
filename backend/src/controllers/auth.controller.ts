import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

function signToken(payload: { id: string; role: 'admin' | 'doctor' | 'patient' }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user.id, role: user.role });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
};

export const me = async (req: Request, res: Response) => {
  const authUser = req.user;
  if (!authUser) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(authUser.id).select('-password');
  res.json({ user });
};


