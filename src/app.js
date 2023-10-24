import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import __dirname from './config/dirname.js';
import cors from 'cors';
import initLocalStrategy from './config/passport.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import viewsRouter from './routes/views.routes.js';
import ProductModel from './models/product.model.js';
/* import session from 'express-session';
import MongoStore from 'connect-mongo'; */
import CartModel from './models/cart.model.js';
/* import UserModel from './models/user.model.js'; */
import winston from './utils/winston.js';
import errorHandler from './utils/errorHandler.js';

const app = express();

app.use(cors());

handlebars.create({
  partialsDir: `${__dirname}/../views/partials`,
});
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');

/* app.use(cors({ origin: true, credentials: true })); */

//MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(winston);

// SESSION CONFIG
/* app.use(
  session({
    secret: 'E0l7NAnVtAp1cZz',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_URL,
      ttl: 3600,
    }),
    ttl: 3600,
  })
); */

// PASSPORT CONFIG
initLocalStrategy();
app.use(passport.initialize());
/* app.use(passport.session()); */

// DB CONNECTION
const dbConnection = mongoose.connect(config.MONGO_URL);
dbConnection.then(() => console.log('success db connection'));

app.use(express.static(`${__dirname}/../public`));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);

app.get('/api/test', (req, res) => {
  let response = response + request;
  return res.status(200).json({
    message: 'logger HTTP',
    response: true,
  });
});

/* const products = [
  {
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 19.99,
    thumbnail: 'sin imagen',
    code: 'P1',
    stock: 10,
  },
  {
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 29.99,
    thumbnail: 'sin imagen',
    code: 'P2',
    stock: 15,
  },
  {
    title: 'Producto 3',
    description: 'Descripción del Producto 3',
    price: 39.99,
    thumbnail: 'sin imagen',
    code: 'P3',
    stock: 20,
  },
  {
    title: 'Producto 4',
    description: 'Descripción del Producto 4',
    price: 49.99,
    thumbnail: 'sin imagen',
    code: 'P4',
    stock: 5,
  },
  {
    title: 'Producto 5',
    description: 'Descripción del Producto 5',
    price: 59.99,
    thumbnail: 'sin imagen',
    code: 'P5',
    stock: 30,
  },
  {
    title: 'Producto 6',
    description: 'Descripción del Producto 6',
    price: 69.99,
    thumbnail: 'sin imagen',
    code: 'P6',
    stock: 8,
  },
  {
    title: 'Producto 7',
    description: 'Descripción del Producto 7',
    price: 79.99,
    thumbnail: 'sin imagen',
    code: 'P7',
    stock: 25,
  },
  {
    title: 'Producto 8',
    description: 'Descripción del Producto 8',
    price: 89.99,
    thumbnail: 'sin imagen',
    code: 'P8',
    stock: 12,
  },
  {
    title: 'Producto 9',
    description: 'Descripción del Producto 9',
    price: 99.99,
    thumbnail: 'sin imagen',
    code: 'P9',
    stock: 18,
  },
  {
    title: 'Producto 10',
    description: 'Descripción del Producto 10',
    price: 109.99,
    thumbnail: 'sin imagen',
    code: 'P10',
    stock: 22,
  },
  {
    title: 'Producto 11',
    description: 'Descripción del Producto 11',
    price: 119.99,
    thumbnail: 'sin imagen',
    code: 'P11',
    stock: 3,
  },
  {
    title: 'Producto 12',
    description: 'Descripción del Producto 12',
    price: 129.99,
    thumbnail: 'sin imagen',
    code: 'P12',
    stock: 14,
  },
]; */
/* await ProductModel.insertMany(products); */
/* await CartModel.create({}); */

/* await CartModel.deleteMany({}); */
/* await ProductModel.deleteMany({}); */
/* await UserModel.deleteMany({}); */

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running at PORT: ${config.PORT}`);
});
