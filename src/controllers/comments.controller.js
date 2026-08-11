import {
  getAllCommentsService,
  getCommentsByPostService,
  getPostExistsService,
  getAuthorExistsService,
  createCommentService,
} from "../services/comments.service.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await getAllCommentsService();

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await getPostExistsService(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comments = await getCommentsByPostService(postId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { content, post_id, author_id } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (!post_id) {
      return res.status(400).json({
        message: "Post ID is required",
      });
    }

    if (!author_id) {
      return res.status(400).json({
        message: "Author ID is required",
      });
    }

    const post = await getPostExistsService(post_id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const author = await getAuthorExistsService(author_id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const comment = await createCommentService(content, post_id, author_id);

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};
