import { Router } from "express";
import { createUser, getAllUsers } from "../modules/user/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/",
    // auth
    // role middleware
    // file upload -> 
    // validation. bodyValidation(createUser) // register.
    createUser);

export default router;

// validation, 
// query validation,
// param
// body .. router, 

