import userModel from "../../database/models/userModel.js";
import { catchErr } from "../error/catchErr.js";
import { setPagination } from "../utils/setPagination.js";


export const getUsersWithPagination = catchErr(async (req, res, next) => {
  const { limit, skip, pagination } = await setPagination(userModel, req);

  const users = await userModel.find().skip(skip).limit(limit).sort("-1");

  res.status(200).json({
    status: 'success',
    results: users.length,
    pagination,
    data: {
      users
    }
  });
});

export const getUserProfile = catchErr(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).json({message : "User not found"});
console.log(user);
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const deleteUser = catchErr(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({message : "User not found"});

  res.status(200).json({
    status: 'success',
    message: 'User has been deleted'
  });
});

export const softDelete = catchErr(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({message : "User not found"});
  }

  res.status(200).json({
    status: 'success',
    message: 'User has been soft deleted',
    data: { user }
  });
});
