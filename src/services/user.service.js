import UserDao from "../dao/mongo/user.dao.js";
import UserDTO from "../dto/user.dto.js";
import * as bcryptUtils from "../utils/bcrypt.utils.js";

export const createNewUser = async (data) => {
  try {
    const emailExist = await UserDao.findOne(data.email);
    if (emailExist) throw new Error("Email already exist");
    data.password = await bcryptUtils.hashPassword(data.password);
    const newUser = await UserDao.create(data);
    return {
      code: 200,
      status: "User created successfully",
      payload: newUser,
    };
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error creating new user ${error}`,
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await UserDao.findOne(email);
    if (!user) throw new Error("Invalid email");
    const validPassword = await bcryptUtils.validatePassword(password, user);
    if (!validPassword) throw new Error("Invalid password");
    return user.toObject();
  } catch (error) {
    return {
      code: 400,
      status: "error",
      message: `error login user ${error}`,
    };
  }
};

export const getUserById = async (uid) => {
  try {
    const user = await UserDao.findById(uid);
    const userDTO = new UserDTO(user);
    return {
      code: 200,
      error: false,
      user: userDTO,
    };
  } catch (error) {
    return {
      code: 400,
      error: true,
      message: `Usuario no existente ${error}`,
    };
  }
};

export const getCurrentUser = async (uid) => {
  try {
    const user = await UserDao.findById(uid);
    const userDTO = new UserDTO(user);
    return {
      code: 200,
      error: false,
      user: userDTO,
    };
  } catch (error) {
    return {
      code: 400,
      error: true,
      message: error,
    };
  }
};
