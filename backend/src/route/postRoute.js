import express from "express";
import postController from "../controller/postController";
require("dotenv/config");

const router = express.Router();
const api = process.env.API_URL;

const initPostRoutes = (app) => {
  //get all
  router.get("/posts", postController.getall);

  router.get("/posts/:id", postController.findById);

  router.put("/posts/:id", postController.updateComment);

  router.put("/posts/react/:id", postController.updateReaction);

  router.post("/posts", postController.create);

  app.use(api, router);
};
export default initPostRoutes;
