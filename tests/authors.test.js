import { afterAll, beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db/config.js";

describe("Authors API", () => {
  beforeEach(async () => {
    await pool.query(`
      TRUNCATE authors RESTART IDENTITY CASCADE;
    `);

    await pool.query(`
      INSERT INTO authors (name, email, bio)
      VALUES
        ('Ana García', 'ana@example.com', 'Full-stack developer'),
        ('Carlos Ruiz', 'carlos@example.com', 'Technical writer');
    `);
  });

  afterAll(async () => {
    await pool.end();
  });

  test("GET /authors devuelve todos los autores", async () => {
    const response = await request(app).get("/authors");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
  });

  test("GET /authors/:id devuelve un autor", async () => {
    const response = await request(app).get("/authors/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("Ana García");
  });

  test("GET /authors/:id devuelve 404 si el autor no existe", async () => {
    const response = await request(app).get("/authors/9999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Author not found",
    });
  });

  test("POST /authors crea un nuevo autor", async () => {
    const newAuthor = {
      name: "Paúl Corrales",
      email: "paul@example.com",
      bio: "Backend developer",
    };

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newAuthor.name);
    expect(response.body.email).toBe(newAuthor.email);
    expect(response.body).toHaveProperty("id");
  });

  test("PUT /authors/:id actualiza un autor", async () => {
    const updatedAuthor = {
      name: "Ana García Actualizada",
      email: "ana.actualizada@example.com",
      bio: "Senior developer",
    };

    const response = await request(app).put("/authors/1").send(updatedAuthor);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedAuthor.name);
    expect(response.body.email).toBe(updatedAuthor.email);
  });

  test("DELETE /authors/:id elimina un autor", async () => {
    const response = await request(app).delete("/authors/1");

    expect(response.status).toBe(204);

    const author = await pool.query(
      `
      SELECT *
      FROM authors
      WHERE id = $1;
      `,
      [1],
    );

    expect(author.rows).toHaveLength(0);
  });

  test("DELETE /authors/:id devuelve 404 si el autor no existe", async () => {
    const response = await request(app).delete("/authors/9999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Author not found",
    });
  });
});
