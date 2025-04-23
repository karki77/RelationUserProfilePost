import { Request, Response, NextFunction } from "express";
import {HttpResponse} from "../../utils/api/httpResponse";
import { registerUserService, getAllUsersService, loginUserService } from "./service";
import type { IRegisterSchema, ILoginSchema } from "./validation";

/**
 * Register User
 */
export const registerUser = async (req: Request<unknown, unknown, IRegisterSchema>, res: Response, next: NextFunction) => {
  try {
   const data = await registerUserService(req.body);
   res.send(new HttpResponse({
      message:"User registered successfully",
      data
    }))
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginUserService(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data
    });
  } catch (error) {
    next(error);
  }
};