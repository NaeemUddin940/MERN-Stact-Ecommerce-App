import { Router } from "express";
import { addItemToCart, deleteCartItem, getCartItem, updateCartItemQuantity } from "../controllers/cartProduct.controller.js";
import { authenticated } from "../middlewares/authenticated.js";

const cartRouter = Router();

cartRouter.post("/add-item-to-cart", authenticated, addItemToCart);
cartRouter.get("/get-cart-item", authenticated, getCartItem);
cartRouter.put("/update-cart-item-quantity", authenticated, updateCartItemQuantity);
cartRouter.delete("/delete-cart-item", authenticated, deleteCartItem);

export default cartRouter;
