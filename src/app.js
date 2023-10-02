import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import cartRouter from "./routes/cart.routes.js";
import productsRouter from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import initLocalStrategy from "./config/passport.config.js";

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "E0l7NAnVtAp1cZz",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_URL,
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

// PASSPORT CONFIG
initLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());

// DB CONNECTION
const dbConnection = mongoose.connect(config.MONGO_URL);
dbConnection.then(() => console.log("success db connection"));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);

/* const products = [
  {
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
    thumbnail: "sin imagen",
    code: "P1",
    stock: 10,
  },
  {
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 29.99,
    thumbnail: "sin imagen",
    code: "P2",
    stock: 15,
  },
  {
    title: "Producto 3",
    description: "Descripción del Producto 3",
    price: 39.99,
    thumbnail: "sin imagen",
    code: "P3",
    stock: 20,
  },
  {
    title: "Producto 4",
    description: "Descripción del Producto 4",
    price: 49.99,
    thumbnail: "sin imagen",
    code: "P4",
    stock: 5,
  },
  {
    title: "Producto 5",
    description: "Descripción del Producto 5",
    price: 59.99,
    thumbnail: "sin imagen",
    code: "P5",
    stock: 30,
  },
  {
    title: "Producto 6",
    description: "Descripción del Producto 6",
    price: 69.99,
    thumbnail: "sin imagen",
    code: "P6",
    stock: 8,
  },
  {
    title: "Producto 7",
    description: "Descripción del Producto 7",
    price: 79.99,
    thumbnail: "sin imagen",
    code: "P7",
    stock: 25,
  },
  {
    title: "Producto 8",
    description: "Descripción del Producto 8",
    price: 89.99,
    thumbnail: "sin imagen",
    code: "P8",
    stock: 12,
  },
  {
    title: "Producto 9",
    description: "Descripción del Producto 9",
    price: 99.99,
    thumbnail: "sin imagen",
    code: "P9",
    stock: 18,
  },
  {
    title: "Producto 10",
    description: "Descripción del Producto 10",
    price: 109.99,
    thumbnail: "sin imagen",
    code: "P10",
    stock: 22,
  },
  {
    title: "Producto 11",
    description: "Descripción del Producto 11",
    price: 119.99,
    thumbnail: "sin imagen",
    code: "P11",
    stock: 3,
  },
  {
    title: "Producto 12",
    description: "Descripción del Producto 12",
    price: 129.99,
    thumbnail: "sin imagen",
    code: "P12",
    stock: 14,
  },
]; */
/* await ProductModel.insertMany(products); */
/* await CartModel.create({}); */

app.listen(config.PORT, () => {
  console.log(`Server running at PORT: ${config.PORT}`);
});
