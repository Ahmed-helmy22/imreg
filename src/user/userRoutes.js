import Express from "express";
import validation from "../middleware/joiValidation.js";
import * as userController from "./userController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { idSchema, paginationSchema } from "./userVlidation.js";


const router = Express.Router();

// Protect all routes after this middleware
router.use(protect);


// Get users with pagination (admin only)
router.route("/")
  .get(
    restrictTo('admin'),
    validation(paginationSchema),
    userController.getUsersWithPagination
  );

// Get user profile
router.get("/:id",validation(idSchema) ,userController.getUserProfile);

// View user by ID (admin only)
router.route("/:id")
  .delete(
    restrictTo('admin'),
    validation(idSchema) ,
    userController.deleteUser
  );

// For soft delete
router.patch("/softDelete/:id", validation(idSchema) , userController.softDelete);

export default router;
