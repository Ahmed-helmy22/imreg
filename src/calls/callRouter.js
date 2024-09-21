import { agoraMiddlware } from "../middleware/agoraMiddlare.js";
import { getAccessToken } from "./callController.js";
import Express from 'express'

const router = Express.Router();

// Route for creating a new emergency
router.get(
  "/access-token",
//   protect,
//   restrictTo('user'),
  agoraMiddlware,
  getAccessToken
);


export default router