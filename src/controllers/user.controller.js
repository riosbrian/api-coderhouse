import * as UserService from '../services/user.service.js';

export const GETCurrent = async (req, res) => {
  const userID = req.userID;
  if (!userID)
    return res.status(400).send({
      code: 400,
      error: true,
      message: `Ningún usuario logueado`,
    });
  const currentUser = await UserService.getCurrentUser(userID);
  if (currentUser.error) return res.status(currentUser.code).send(currentUser);
  res.status(currentUser.code).send(currentUser);
};

export const GETUserByID = async (req, res) => {
  const { uid } = req.params;
  const user = await UserService.getUserById(uid);
  if (user.error) return res.status(user.code).send(user);
  res.status(user.code).send(user);
};
