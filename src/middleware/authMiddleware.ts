// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }

  // try {
  //   await admin.auth().verifyIdToken(token);
  //   next();
  // } catch (error) {
  //   res.status(401).send({ message: 'Unauthorized' });
  // }
};
