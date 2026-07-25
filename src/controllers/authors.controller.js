import pool from "../db/config.js";

export const getAuthors = async (req, res) => {
  const result = await pool.query(`
    SELECT *
    FROM authors;
  `);

  res.status(200).json(result.rows);
};
export const getAuthorById = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `
    SELECT *
    FROM authors
    WHERE id = $1;
    `,
    [id],
  );

  res.status(200).json(result.rows[0]);
};
export const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;

  const result = await pool.query(
    `
    INSERT INTO authors (name, email, bio)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [name, email, bio],
  );

  res.status(201).json(result.rows[0]);
};
export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;

  const result = await pool.query(
    `
    UPDATE authors
    SET name = $1,
        email = $2,
        bio = $3
    WHERE id = $4
    RETURNING *;
    `,
    [name, email, bio, id],
  );

  res.status(200).json(result.rows[0]);
};
export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `
    DELETE FROM authors
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  res.status(200).json(result.rows[0]);
};
