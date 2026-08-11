import { Router } from "express";
import {
  getComments,
  getCommentsByPost,
  createComment,
} from "../controllers/comments.controller.js";

const router = Router();

router.get("/", getComments);
router.get("/post/:postId", getCommentsByPost);
router.post("/", createComment);

export default router;
