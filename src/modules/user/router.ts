
import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "./controller";
import { registerUserSchema, loginUserSchema} from "./validation";
import bodyValidator from "../../utils/middleware/validators/bodyValidator";
import { authMiddleware } from "../../utils/middleware/authMiddleware";
import { roleMiddleware } from "../../utils/middleware/roleMiddleware";

const userRouter = Router();

userRouter.post('/register', bodyValidator(registerUserSchema), registerUser);
userRouter.post('/login', bodyValidator(loginUserSchema), loginUser);
userRouter.get("/", getAllUsers);

userRouter.post('/login/superadmin', loginUser)

userRouter.get('/superadmin', authMiddleware, roleMiddleware(["SUPERADMIN"]), (req, res) => {
    res.json({message: "welcome superadmin"})
});

userRouter.get('/admin',authMiddleware,  (req, res) => {
    res.json({message: "welcome admin"})
});

userRouter.get('/manager', authMiddleware, roleMiddleware(["MANAGER"]), (req, res) => {
    res.json({message: "welcome manager"})
});

userRouter.get('/getUsers', authMiddleware,  (req, res) => {
res.json({message: "welcome user"})
});

export default userRouter;

