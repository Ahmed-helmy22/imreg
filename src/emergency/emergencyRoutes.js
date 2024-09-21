import Express from "express";

import {
  addEmergency,
  getAllEmergencies,
  getUserEmergencies,
  updateEmergency,
  deleteEmergency,
  getEmergencyById,
  getEmergenciesForUser
} from "./emergencyController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import validation from "../middleware/joiValidation.js";
import { createEmergencySchema } from "./emergencyValidation.js";

const router = Express.Router();

// Route for creating a new emergency
router.post(
  "/",
  protect,
  restrictTo('user'),
  upload.fields([
    { name: 'emergencyRecord', maxCount: 1 },
    { name: 'emergencyVideo', maxCount: 1 },
    { name: 'emergencyPhoto', maxCount: 1 }
  ]),
  validation(createEmergencySchema),
  addEmergency
);

// Route for retrieving all emergencies (Admin only)
router.get("/", protect, restrictTo("admin"), getAllEmergencies);

// Route for retrieving emergencies specific to the logged-in user
router.get("/user", protect, getUserEmergencies);
router.get("/allEmUser/:id", protect, getEmergenciesForUser);
// Route for updating an emergency by ID
router.patch("/:id", protect, updateEmergency);

// Route for deleting an emergency by ID
router.delete("/:id", protect, deleteEmergency);


// Route for retrieving an emergency by ID
router.get("/:id", protect, getEmergencyById);


export default router;