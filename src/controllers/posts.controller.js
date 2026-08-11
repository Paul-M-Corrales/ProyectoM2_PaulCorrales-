import {
  getAllPostsService,
  getPostByIdService,
  getAuthorExistsService,
  createPostService,
  updatePostService,
  deletePostService,
  getPostsByAuthorService,
} from "../services/posts.service.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await getPostByIdService(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (!author_id) {
      return res.status(400).json({
        message: "Author ID is required",
      });
    }

    const author = await getAuthorExistsService(author_id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const post = await createPostService(title, content, author_id, published);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author_id, published } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (!author_id) {
      return res.status(400).json({
        message: "Author ID is required",
      });
    }

    const author = await getAuthorExistsService(author_id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const post = await updatePostService(
      id,
      title,
      content,
      author_id,
      published,
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await deletePostService(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    const author = await getAuthorExistsService(authorId);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const posts = await getPostsByAuthorService(authorId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
