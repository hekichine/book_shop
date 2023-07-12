import express from "express";
import userController from "../controller/userController";
require("dotenv/config");
import upload from "../midleware/upload";

const router = express.Router();
const api = process.env.API_URL;

const initUserRoutes = (app) => {
  // get list
  router.get("/", userController.getlist);

  // create
  router.post("/", userController.create);

  // find by id
  router.get("/:id", userController.findById);
  // sign in
  router.post("/signin", userController.signin);
  //delete
  router.delete("/:id", userController.delete);
  //avatar
  router.put("/avatar/:id", upload.single("avatar"), userController.avatar);
  router.put(
    "/coveravatar/:id",
    upload.single("coveravatar"),
    userController.coveravatar
  );
  //password
  router.put("/password/:id", userController.password);
  // change name
  router.put("/:id", userController.update);

  app.use(`${api}/users`, router);
};
export default initUserRoutes;
