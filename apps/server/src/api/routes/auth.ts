import express from "express";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/auth";
import validateLoginScheme from "../validations/login";
import { validateRegistrationScheme } from "../validations/register";
const router = express.Router();

router.post("/login",validateLoginScheme, loginHandler);
router.post("/register", validateRegistrationScheme, registerHandler);
router.get("/logout", logoutHandler);

export default router;
