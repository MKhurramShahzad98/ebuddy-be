// controller/authController.ts
import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { ApiError } from "../entities/apiErrors";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).send({
      message: "User created successfully",
      userId: userRecord.uid,
    });
  } catch (error: any) {
    next(new ApiError(error.message, 400));
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(200).send({
      message: "User signed in successfully",
      customToken,
    });
  } catch (error) {
    next(new ApiError("Invalid email or password", 401));
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Invalidate the token on the client-side by simply deleting it
  res.status(200).send({ message: "User logged out successfully" });
};
