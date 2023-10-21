import { Router } from 'express';
import * as CartController from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.param('cid', (req, res, next, param) => {
  req.cartID = param;
  next();
});

cartRouter
  .route('/:cid([0-9a-zA-Z]+)')
  .get(CartController.GETCartById)
  .put(CartController.PUTProductList)
  .delete(CartController.DELETEProducts);
cartRouter
  .route('/:cid([0-9a-zA-Z]+)/products/:pid')
  .put(CartController.AddProduct)
  .patch(CartController.PATCHUpdateQuantity)
  .delete(CartController.DELETEProduct);

export default cartRouter;
