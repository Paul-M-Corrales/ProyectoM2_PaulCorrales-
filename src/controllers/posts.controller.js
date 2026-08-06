import pool from "../db/config.js";

export const getPosts = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM posts;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM posts
      WHERE id = $1;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(result.rows[0]);
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

    const authorResult = await pool.query(
      `
      SELECT id
      FROM authors
      WHERE id = $1;
      `,
      [author_id],
    );

    if (authorResult.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO posts (title, content, author_id, published)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [title, content, author_id, published ?? false],
    );

    res.status(201).json(result.rows[0]);
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

    const authorResult = await pool.query(
      `
      SELECT id
      FROM authors
      WHERE id = $1;
      `,
      [author_id],
    );

    if (authorResult.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const result = await pool.query(
      `
      UPDATE posts
      SET title = $1,
          content = $2,
          author_id = $3,
          published = $4
      WHERE id = $5
      RETURNING *;
      `,
      [title, content, author_id, published, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    if (result.rows.length === 0) {
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

    const author = await pool.query(
      `
      SELECT id
      FROM authors
      WHERE id = $1;
      `,
      [authorId],
    );

    if (author.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const result = await pool.query(
      `
      SELECT
        posts.id,
        posts.title,
        posts.content,
        posts.published,
        posts.created_at,
        authors.id AS author_id,
        authors.name AS author_name,
        authors.email AS author_email,
        authors.bio AS author_bio
      FROM posts
      INNER JOIN authors
        ON posts.author_id = authors.id
      WHERE authors.id = $1;
      `,
      [authorId],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
