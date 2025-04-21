import { Router } from "express";
import { registerUser, getAllUsers, loginUser  } from "../modules/user/userController";
import { registerUserSchema } from "../modules/user/userValidation";
import bodyValidator from "../utils/middleware/validators/bodyValidator";

const router = Router();


router.get("/", getAllUsers);
router.post('/register',
    bodyValidator(registerUserSchema),
  registerUser);
router.post('/login', loginUser);
    // auth
    // role middleware
    // file upload -> 
    // validation. bodyValidation(createUser) // register);
    

export default router;
