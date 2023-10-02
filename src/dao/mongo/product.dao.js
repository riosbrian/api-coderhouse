import ProductModel from "../../models/product.model.js";

class ProductDao {
  constructor() {}

  async create(data) {
    return await ProductModel.create(data);
  }

  async find() {
    return await ProductModel.find({});
  }

  async findById(pid) {
    return await ProductModel.findById(pid);
  }

  async updateOne(pid, data) {
    return await ProductModel.updateOne({ _id: pid }, data);
  }

  async deleteOne(pid) {
    return await ProductModel.deleteOne({ _id: pid });
  }
}

export default new ProductDao();
