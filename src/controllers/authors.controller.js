import pool from "../db/config.js";

export const getAuthors = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM authors;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM authors
      WHERE id = $1;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const existingAuthor = await pool.query(
      `
      SELECT id
      FROM authors
      WHERE email = $1;
      `,
      [email],
    );

    if (existingAuthor.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO authors (name, email, bio)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [name, email, bio],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const existingEmail = await pool.query(
      `
      SELECT id
      FROM authors
      WHERE email = $1
        AND id != $2;
      `,
      [email, id],
    );

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

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

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM authors
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
