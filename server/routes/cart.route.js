import { Router } from "express";
import { addItemToCart, getCartItem } from "../controllers/cartProduct.controller.js";
import { authenticated } from "../middlewares/authenticated.js";

const cartRouter = Router();

cartRouter.post("/add-item-to-cart", authenticated, addItemToCart);
cartRouter.get("/get-cart-item", authenticated, getCartItem);

export default cartRouter;
