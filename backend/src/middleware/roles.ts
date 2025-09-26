import { Request, Response, NextFunction } from 'express';

export function authorize(allowed: Array<'admin' | 'doctor' | 'patient'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: { id: string; role: 'admin' | 'doctor' | 'patient' } }).user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!allowed.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}


