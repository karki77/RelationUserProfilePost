
import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "./controller";
import { registerUserSchema, loginUserSchema} from "./validation";
import bodyValidator from "../../utils/middleware/validators/bodyValidator";
import { authMiddleware } from "../../utils/middleware/authMiddleware";
import { roleMiddleware } from "../../utils/middleware/roleMiddleware";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post('/register' ,bodyValidator(registerUserSchema), registerUser);

userRouter.post('/login', bodyValidator(loginUserSchema), loginUser);

// ;userRouter.get('/register/admin', authMiddleware, roleMiddleware(["admin"]), 
// })

userRouter.post('/login/superadmin', (req, res) => {
    res.json({message: "welcome superadmin"})
} )

userRouter.post('/register/admin', authMiddleware, roleMiddleware(['admin']),(req, res) => {
    res.json({message: "welcome admin"})}, bodyValidator(loginUserSchema), loginUser);

userRouter.post('/register/manager', authMiddleware, roleMiddleware(['admin','manager']),(req, res) => {
        res.json({message: "welcome manager"})}, bodyValidator(loginUserSchema), loginUser);

userRouter.post('/register/user', bodyValidator(loginUserSchema), loginUser);
        
    
//
export default userRouter;

/**
 * user -> register -> login -> (super admin) -> token generate -> store, environment store, login (access token, refresh token).
 * super admin logged in -> admin create -> auth, role middleware -> controller --> /register/admin (api) -> user authenticate.
 */
