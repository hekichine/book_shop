import express from "express";
import reviewController from "../controller/reviewController";
require("dotenv/config");
const api = process.env.API_URL;

const router = express.Router();

const initReviewRoutes = (app) => {
  // get review
  router.get("/", reviewController.getreview);

  //create
  router.post("/", reviewController.create);

  //delete
  router.delete("/:id/:prid", reviewController.delete);

  app.use(`${api}/reviews`, router);
};
export default initReviewRoutes;
