import pool from "../db/config.js";

export const getAllCommentsService = async () => {
  const result = await pool.query(`
    SELECT
      comments.id,
      comments.content,
      comments.created_at,
      posts.id AS post_id,
      posts.title AS post_title,
      authors.id AS author_id,
      authors.name AS author_name,
      authors.email AS author_email
    FROM comments
    INNER JOIN posts
      ON comments.post_id = posts.id
    INNER JOIN authors
      ON comments.author_id = authors.id
    ORDER BY comments.created_at DESC;
  `);

  return result.rows;
};

export const getCommentsByPostService = async (postId) => {
  const result = await pool.query(
    `
    SELECT
      comments.id,
      comments.content,
      comments.created_at,
      posts.id AS post_id,
      posts.title AS post_title,
      authors.id AS author_id,
      authors.name AS author_name,
      authors.email AS author_email
    FROM comments
    INNER JOIN posts
      ON comments.post_id = posts.id
    INNER JOIN authors
      ON comments.author_id = authors.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC;
    `,
    [postId],
  );

  return result.rows;
};

export const getPostExistsService = async (postId) => {
  const result = await pool.query(
    `
    SELECT id
    FROM posts
    WHERE id = $1;
    `,
    [postId],
  );

  return result.rows[0];
};

export const getAuthorExistsService = async (authorId) => {
  const result = await pool.query(
    `
    SELECT id
    FROM authors
    WHERE id = $1;
    `,
    [authorId],
  );

  return result.rows[0];
};

export const createCommentService = async (content, postId, authorId) => {
  const result = await pool.query(
    `
    INSERT INTO comments (content, post_id, author_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [content, postId, authorId],
  );

  return result.rows[0];
};
