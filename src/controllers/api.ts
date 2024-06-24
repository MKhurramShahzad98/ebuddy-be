// controller/api.ts
import { Request, Response, NextFunction } from "express";
import { db } from "../config/firebaseConfig";
import { ApiError } from "../entities/apiErrors";

export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, gender, address, email } = req.body;
    await db.collection("USER").add({
      name,
      gender,
      email,
      address,
    });
    res.status(201).send({ message: "New user added successfully" });
  } catch (error) {
    console.log("error", error);

    next(new ApiError("Failed to add new user", 500));
  }
};

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, data } = req.body;
    await db.collection("USER").doc(userId).set(data, { merge: true });
    res.status(200).send({ message: "User data updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersSnapshot = await db.collection("USER").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (!users.length) {
      res.status(404).send({ message: "Users not found" });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    next(error);
  }
};
