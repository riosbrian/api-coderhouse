import * as ProductsService from '../services/products.service.js';

export const GETRegister = (req, res) => {
  res.render('register');
};

export const GETLogin = (req, res) => {
  res.render('login');
};

export const GETProducts = async (req, res) => {
  const products = await ProductsService.getProducts();
  if (products.error)
    return res.render('products', { error: true, message: products.message });
  res.render('products', { products: products.payload });
};

export const GETCart = (req, res) => {
  res.render('cart');
};
