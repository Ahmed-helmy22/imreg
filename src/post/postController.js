import postModel from '../../database/models/postModel';
import AppErr from '../error/AppErr.js';
import { catchErr } from '../error/catchErr.js';

export const getAllposts = catchErr(async (req, res, next) => {
  const posts = postModel.find({}).populate('comments');
  if (!posts) next(new AppErr('no posts yet'), 404);
  res.status(200).json({
    status: 'success',
    posts,
  });
});
// export const addPost = catchErr(async(req, res, next )=>{
//     {postText}
// })
