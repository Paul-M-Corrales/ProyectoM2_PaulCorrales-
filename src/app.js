import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authorsRouter from "./routes/authors.routes.js";
import postsRouter from "./routes/posts.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import commentsRouter from "./routes/comments.routes.js";

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.use(errorHandler);

export default app;
