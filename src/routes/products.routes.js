import { Router } from "express";
import * as ProductsController from "../controllers/products.controller.js";
import validateID from "../utils/validateID.js";

const productsRouter = Router();

productsRouter.param("pid", (req, res, next, param) => {
  req.productID = param;
  next();
});

productsRouter.get("/", ProductsController.GETProducts);
productsRouter
  .route("/:pid([0-9a-zA-Z]+)")
  .get(validateID, ProductsController.GETSingleProduct)
  .patch(validateID, ProductsController.PATCHProduct)
  .delete(validateID, ProductsController.DELETEProduct);
productsRouter.post("/add", ProductsController.POSTNewProduct);

productsRouter.get("*", (req, res) => {
  res.status(404).json({
    status: error,
    message: "Upps! 🥲",
  });
});

export default productsRouter;
