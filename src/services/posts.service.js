import pool from "../db/config.js";

export const getAllPostsService = async () => {
  const result = await pool.query(`
    SELECT *
    FROM posts;
  `);

  return result.rows;
};

export const getPostByIdService = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM posts
    WHERE id = $1;
    `,
    [id],
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

export const createPostService = async (
  title,
  content,
  authorId,
  published,
) => {
  const result = await pool.query(
    `
    INSERT INTO posts (title, content, author_id, published)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [title, content, authorId, published ?? false],
  );

  return result.rows[0];
};

export const updatePostService = async (
  id,
  title,
  content,
  authorId,
  published,
) => {
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
    [title, content, authorId, published, id],
  );

  return result.rows[0];
};

export const deletePostService = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM posts
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0];
};

export const getPostsByAuthorService = async (authorId) => {
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

  return result.rows;
};
