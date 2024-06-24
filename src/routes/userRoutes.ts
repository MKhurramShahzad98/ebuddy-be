// routes/userRoutes.ts
import { Router } from "express";
import { updateUserData, fetchUserData, addNewUser } from "../controllers/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.put("/update-user-data", authMiddleware, updateUserData);
router.get("/fetch-all-users", authMiddleware, fetchUserData);
router.post("/add-user", authMiddleware, addNewUser);

export default router;
