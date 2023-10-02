import mongoose from "mongoose";

const validateID = (req, res, next) => {
  const params = ["cid", "pid"];
  const paramName = params.find((param) => req.params[param]);
  console.log(paramName);
  const id = req.params[paramName];
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid)
    return res.status(400).json({
      status: "error",
      message: "ID invalid",
    });
  next();
};

export default validateID;
