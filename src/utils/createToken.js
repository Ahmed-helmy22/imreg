import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET , { expiresIn: process.env.TOKEN_EXPIRATION });
};

export const decodeToken = (token) => {
  let decoded;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    decoded = decode;
  });
  return decoded;
};
