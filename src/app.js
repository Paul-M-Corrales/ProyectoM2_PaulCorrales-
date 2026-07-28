import express from "express";
import authorsRouter from "./routes/authors.routes.js";
import postsRouter from "./routes/posts.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);
app.use(errorHandler);

export default app;
