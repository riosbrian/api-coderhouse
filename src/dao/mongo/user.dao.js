import UserModel from '../../models/user.model.js';

class UserDao {
  constructor() {}

  async create(data) {
    return await UserModel.create(data);
  }

  async findById(uid) {
    return await UserModel.findById(uid);
  }

  async findOne(email) {
    return await UserModel.findOne({ email: email });
  }
}

export default new UserDao();
