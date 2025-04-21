import { Router } from "express";
import authRouter from './authRouter';
import userRouter from './userRouter';

const router = Router();

router.use("/api/auth", authRouter);
router.use ("/api/user", userRouter);
export default router;