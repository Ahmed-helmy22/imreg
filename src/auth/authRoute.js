import Express from "express";
import validation from "../middleware/joiValidation.js";
import { protect } from "../middleware/authMiddleware.js";
import * as authController from "./authController.js";
import { loginSchema, signupSchema, updateProfileSchema } from "./authValidation.js";

const router = Express.Router();

router.post("/login", validation(loginSchema), authController.login);
router.post("/signup", validation(signupSchema), authController.signup);
router.patch("/updateProfile", protect, validation(updateProfileSchema), authController.updateProfile);

export default router;
