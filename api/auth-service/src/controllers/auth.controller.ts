import { Request, Response } from 'express';
import { JwtService } from '../services/jwt.service';

export class AuthController {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, role } = req.body;
      
      if (!userId || !role) {
        res.status(400).json({ error: 'userId and role are required' });
        return;
      }

      const token = this.jwtService.generateToken({ userId, role });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  verifyToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }

      const payload = this.jwtService.verifyToken(token);
      res.json({ payload });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
} 