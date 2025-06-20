import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string };
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden: Admins only' });
      return;
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};

export default verifyAdmin;
