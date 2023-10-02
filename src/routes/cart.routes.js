import { Router } from "express";
import * as CartController from "../controllers/cart.controller.js";
import validateID from "../utils/validateID.js";

const cartRouter = Router();

cartRouter.param("cid", (req, res, next, param) => {
  req.cartID = param;
  next();
});

cartRouter
  .route("/:cid([0-9a-zA-Z]+)")
  .get(validateID, CartController.GETCartById)
  .put(validateID, CartController.PUTProductList)
  .delete(validateID, CartController.DELETEProducts);
cartRouter
  .route("/:cid([0-9a-zA-Z]+)/products/:pid")
  .put(validateID, CartController.AddProduct)
  .patch(validateID, CartController.PATCHUpdateQuantity)
  .delete(validateID, CartController.DELETEProduct);

export default cartRouter;
