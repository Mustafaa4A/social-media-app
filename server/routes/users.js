import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriendRequest,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//* READ */
router.get("/:username", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);



//* UPDATE */
router.patch("/:id/:friendId/friendRequest", verifyToken, addRemoveFriendRequest);
router.patch("/:id/:friendId/addFriend", verifyToken, addRemoveFriend);
router.patch("/:id/:friendId/deleteRequest", verifyToken, addRemoveFriend);

export default router;