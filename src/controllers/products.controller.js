import * as ProductsService from '../services/products.service.js';

export const GETProducts = async (req, res) => {
  const products = await ProductsService.getProducts();
  res.status(products.code).json(products);
};

export const GETSingleProduct = async (req, res) => {
  const product = await ProductsService.getSingleProduct(req.productID);
  res.status(product.code).json(product);
};

export const POSTNewProduct = async (req, res) => {
  const data = req.body;
  const newProduct = await ProductsService.addProduct(data);
  res.status(newProduct.code).json(newProduct);
};

export const PATCHProduct = async (req, res) => {
  const data = req.body;
  const updatedProduct = await ProductsService.updateProduct(
    req.productID,
    data
  );
  res.status(updatedProduct.code).json(updatedProduct);
};

export const DELETEProduct = async (req, res) => {
  const deletedProduct = await ProductsService.deleteProduct(req.productID);
  res.status(deletedProduct.code).json(deletedProduct);
};
