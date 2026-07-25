import pool from "../db/config.js";

export const getPosts = async (req, res) => {
  const result = await pool.query(`
    SELECT *
    FROM posts;
  `);

  res.status(200).json(result.rows);
};
