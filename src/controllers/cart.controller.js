import * as CartService from "../services/cart.service.js";

export const GETCartById = async (req, res) => {
  const cart = await CartService.getCartById(req.cartID);
  res.status(cart.code).json(cart);
};

export const GETPurchase = async (req, res) => {
  const user = req.user;
  const { cid } = req.params;
};

export const AddProduct = async (req, res) => {
  const { pid } = req.params;
  const cart = await CartService.addProduct(req.cartID, pid);
  res.status(cart.code).json(cart);
};

export const PUTProductList = async (req, res) => {
  const productList = req.body;
  const cart = await CartService.addProductList(req.cartID, productList);
  res.status(cart.code).json(cart);
};

export const PATCHUpdateQuantity = async (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.body;
  const cart = await CartService.updateQuantity(req.cartID, pid, quantity);
  res.status(cart.code).json(cart);
};

export const DELETEProduct = async (req, res) => {
  const { pid } = req.params;
  const cart = await CartService.deleteProduct(req.cartID, pid);
  res.status(cart.code).json(cart);
};

export const DELETEProducts = async (req, res) => {
  const cart = await CartService.emptyCart(req.cartID);
  res.status(cart.code).json(cart);
};
