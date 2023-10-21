import { Router } from 'express';
import * as ViewController from '../controllers/view.controller.js';
import { isLogged, notLogged } from '../utils/secure.middleware.js';

const viewsRouter = Router();

viewsRouter
  .get('/register', isLogged, ViewController.GETRegister)
  .get('/login', isLogged, ViewController.GETLogin)
  .get('/products', notLogged, ViewController.GETProducts)
  .get('/cart', notLogged, ViewController.GETCart);

export default viewsRouter;
