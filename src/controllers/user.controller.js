import * as UserService from '../services/user.service.js';

export const GETCurrent = async (req, res) => {
  const user = await UserService.getUserById(req.user._id);
  res.status(user.code).json(user);
};

export const GETUserbyId = async (req, res) => {
  const { uid } = req.params;
  const user = await UserService.getUserById(uid);
  res.status(user.code).json(user);
};
