import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

router.get("/",UserController.getAuthenticatedUser)
router.post("/logout", UserController.logout)
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

export default router;