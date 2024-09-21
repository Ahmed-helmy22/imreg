import userModel from "../../database/models/userModel.js";
import { decodeToken } from "../utils/createToken.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = decodeToken(token);
  console.log(decoded);
  if (!decoded)
    return res.status(401).json({
      status: "fail",
      message: "you are not authnticated please log in",
    });
  const user = await userModel.findOne({ _id: decoded.id });

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "invalid token",
    });}
     else if(user.role == "user" && user.active == "false"){
      return res.status(401).json({
        status: "fail",
        message: "your account is not activeted",
      })
      } else {
    req.user = user;
    next();
  }
};

export const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) return res.json({ message: "not authorized" });
    next();
  };
};
