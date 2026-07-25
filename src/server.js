import "dotenv/config";
import express from "express";
import authorsRouter from "./routes/authors.routes.js";
import postsRouter from "./routes/posts.routes.js";

const app = express();

app.use(express.json());

app.use("/authors", authorsRouter);

app.use("/posts", postsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
