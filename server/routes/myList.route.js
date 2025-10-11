import { Router } from "express";
import {
  addToMyListController,
  deleteMyListController,
  getMyListController,
} from "../controllers/mylist.controller.js";
import { authenticated } from "../middlewares/authenticated.js";

const myListRouter = Router();

myListRouter.post("/add", authenticated, addToMyListController);

myListRouter.get("/get", authenticated, getMyListController);

myListRouter.delete("/delete/:id", authenticated, deleteMyListController);

export default myListRouter;
