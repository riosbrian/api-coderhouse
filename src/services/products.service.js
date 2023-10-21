import ProductDao from '../dao/mongo/product.dao.js';

export const getProducts = async () => {
  try {
    const products = await ProductDao.find();
    if (products.length === 0) throw new Error('No hay productos para mostrar');
    return {
      error: false,
      code: 200,
      payload: products,
    };
  } catch (error) {
    return {
      error: true,
      code: 400,
      message: error.message,
    };
  }
};

export const getSingleProduct = async (pid) => {
  try {
    const product = await ProductDao.findById(pid);
    return {
      code: 200,
      status: 'success',
      payload: product,
    };
  } catch (error) {
    return {
      code: 400,
      status: 'error',
      message: `error fetching product: ${error}`,
    };
  }
};

export const addProduct = async (data) => {
  try {
    const products = await ProductDao.find();
    const repeatCode = products.find((product) => product.code == data.code);
    if (repeatCode) throw new Error('Code already exist');
    const newProduct = await ProductDao.create(data);
    return {
      code: 200,
      status: 'success',
      message: `product added successfully`,
      payload: newProduct,
    };
  } catch (error) {
    return {
      code: 400,
      status: 'error',
      message: `error adding product: ${error}`,
    };
  }
};

export const updateProduct = async (pid, data) => {
  try {
    const productModified = await ProductDao.updateOne(pid, data);
    return {
      code: 201,
      status: 'success',
      message: `product: ${pid} updated successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: 'error',
      message: `error updating product: ${error}`,
    };
  }
};

export const deleteProduct = async (pid) => {
  try {
    await ProductDao.deleteOne(pid);
    return {
      code: 201,
      status: 'success',
      message: `product: ${pid} deleted successfully`,
    };
  } catch (error) {
    return {
      code: 400,
      status: 'error',
      message: `error deleting product: ${error}`,
    };
  }
};
