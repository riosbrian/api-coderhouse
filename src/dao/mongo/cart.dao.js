import CartModel from "../../models/cart.model.js";

class CartDAO {
  constructor() {}

  async create() {
    return await CartModel.create({});
  }

  async findById(cid) {
    return await CartModel.findById(cid);
  }

  async save(cart) {
    return await cart.save();
  }
}

export default new CartDAO();
