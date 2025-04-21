// controller -> router.

// service -> controller.


// get -> pagination -> 10 data default. -> pagination.
// update -> first check existing, update
// delete -> first check, delete
// private -> 

// auth middleware,
// role middleware,
// file upload -> most most essentials.


// logger, error.stack. -> 

import { Router } from "express";
import userRouter from "./router";

// import authRouter from './authRouter';
// import userRouter from './userRouter'

const router = Router();



router.use ("/user", userRouter);

//
export default router;