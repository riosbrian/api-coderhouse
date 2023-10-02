import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, index: true, unique: true },
  stock: { type: Number, required: true },
});

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
