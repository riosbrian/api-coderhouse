import CartDAO from "../dao/mongo/cart.dao.js";

export const createCart = async () => {
  try {
    return await CartDAO.create();
  } catch (error) {
    return error;
  }
};

export const getCartById = async (cid) => {
  try {
    const cart = await CartDAO.findById(cid);
    return {
      code: 200,
      status: "success",
      message: "cart successfully found",
      payload: cart,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `cart not found: ${error}`,
    };
  }
};

export const addProduct = async (cid, pid) => {
  try {
    const cart = await CartDAO.findById(cid);
    const index = cart.products.findIndex((p) => p.product._id == pid);
    if (index === -1) {
      cart.products.push({ product: pid });
    } else {
      if (cart.products[index].product.stock <= cart.products[index].quantity)
        throw new Error("insufficient stock");
      cart.products[index].quantity = cart.products[index].quantity + 1;
    }
    await CartDAO.save(cart);
    return {
      code: 200,
      status: "success",
      message: `product ${pid} added successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error adding product to cart: ${error}`,
    };
  }
};

export const addProductList = async (cid, productList) => {
  try {
    const cart = await CartDAO.findById(cid);
    cart.products.push(...productList);
    await CartDAO.save(cart);
    return {
      code: 200,
      status: "success",
      message: `product list added successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error adding product list to cart: ${error}`,
    };
  }
};

export const emptyCart = async (cid) => {
  try {
    const cart = await CartDAO.findById(cid);
    cart.products = [];
    await CartDAO.save(cart);
    return {
      code: 200,
      status: "success",
      message: `cart emptied successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error emptying cart: ${error}`,
    };
  }
};

export const updateQuantity = async (cid, pid, quantity) => {
  try {
    const cart = await CartDAO.findById(cid);
    const index = cart.products.findIndex((p) => p.product._id == pid);
    const itemQuantity = cart.products[index].quantity;
    if (cart.products[index].product.stock < itemQuantity + quantity)
      throw new Error("insufficient stock");
    cart.products[index].quantity = cart.products[index].quantity + quantity;
    await CartDAO.save(cart);
    return {
      code: 200,
      status: "success",
      message: `quantity updated successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error updating quantity: ${error}`,
    };
  }
};

export const deleteProduct = async (cid, pid) => {
  try {
    const cart = await CartDAO.findById(cid);
    const index = cart.products.findIndex((p) => p.product._id == pid);
    cart.products.splice(index, 1);
    await CartDAO.save(cart);
    return {
      code: 200,
      status: "success",
      message: `product deleted successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error deleting the product: ${error}`,
    };
  }
};
