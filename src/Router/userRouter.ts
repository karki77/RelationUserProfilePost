import { Router } from "express";
const router = Router();


router.get("/admin", (req, res) => {
    res.send("Admin route");
})

router.get("/manager", (req, res) => {
    res.send("Manager route");
})

router.get("/user", (req, res) => {
    res.send("User route");
})

export default router;