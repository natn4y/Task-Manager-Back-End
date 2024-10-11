import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  const secretKey = '96C8CAB499686EA0F71683E53873550CA939422CBC61D3644BC3BAFAB3D53DB3';

  try {
    const decoded: any = verify(token, secretKey);
    req.user = decoded.sub;

    next();
  } catch (error: any) {
    if (error instanceof JsonWebTokenError || error instanceof NotBeforeError || error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
