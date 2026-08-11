import {
  getAllAuthorsService,
  getAuthorByIdService,
  getAuthorByEmailService,
  getAuthorByEmailExceptIdService,
  createAuthorService,
  updateAuthorService,
  deleteAuthorService,
} from "../services/authors.service.js";

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthorsService();

    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await getAuthorByIdService(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(author);
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

    const existingAuthor = await getAuthorByEmailService(email);

    if (existingAuthor) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const author = await createAuthorService(name, email, bio);

    res.status(201).json(author);
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

    const existingEmail = await getAuthorByEmailExceptIdService(email, id);

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const author = await updateAuthorService(id, name, email, bio);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await deleteAuthorService(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
