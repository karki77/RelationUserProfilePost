import { Request, Response, NextFunction } from "express";
import { registerUserService, getAllUsersService, loginUserService } from "./userService";
import {HttpResponse} from "../../utils/api/httpResponse";
import { IRegisterSchema, ILoginSchema } from "./userValidation";


export const registerUser = async (req: Request<unknown, unknown, IRegisterSchema>, res: Response, next: NextFunction) => {
  try {
    const user = await registerUserService(req.body);
    res.send(new HttpResponse({
      message:"User registered successfully",
      data: user
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
    const loginData: ILoginSchema = req.body;
    const result = await loginUserService(loginData);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};