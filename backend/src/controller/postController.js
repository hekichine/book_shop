import postSchema from "../model/post";
import postDetailSchema from "../model/postDetail";

const postController = {
  create: async (req, res) => {
    try {
      let post = new postSchema({
        uid: req.body?.uid,
        content: req.body?.content,
        reaction: 0,
        commentDetail: [],
      });
      post = await post.save();
      if (!post) {
        return res.status(200).json({
          message: "This post can't created",
          success: false,
        });
      }
      res.status(200).json({
        message: "Post created",
        success: true,
      });
    } catch (error) {
      return res.status(200).json({
        error: error,
        success: false,
      });
    }
  },
  getall: async (req, res) => {
    try {
      let post = await postSchema
        .find()
        .populate("commentDetail")
        .populate("uid")
        .sort({ reaction: -1 });
      if (!post) {
        return res.status(200).json({
          error,
          success: false,
        });
      }
      res.status(200).json({
        success: true,
        posts: post,
      });
    } catch (error) {
      return res.status(200).json({
        error: error,
        success: false,
      });
    }
  },
  findById: async (req, res) => {
    try {
      let { id } = req.params;
      let post = await postSchema
        .find({ uid: id })
        .populate("uid")
        .populate({
          path: "commentDetail",
          populate: { path: "uid", select: "-password" },
        })
        .sort({ createdAt: -1 });
      if (!post) {
        return res.status(200).json({
          error,
          success: false,
          message: "not found post by id",
        });
      }
      res.status(200).json({
        success: true,
        posts: post,
      });
    } catch (error) {
      return res.status(200).json({
        error: error,
        success: false,
        message: "Get post by id",
      });
    }
  },
  updateComment: async (req, res) => {
    try {
      let { id } = req.params;
      let comment = new postDetailSchema({
        uid: req.body?.uid,
        content: req.body?.content,
      });
      comment = await comment.save();
      if (!comment) {
        return res.status(200).json({
          message: "This comment can't created",
          success: false,
        });
      }
      let post = await postSchema.findByIdAndUpdate(id, {
        $push: {
          commentDetail: comment?.id,
        },
      });
      if (!post) {
        return res.status(200).json({
          message: "This post can't created",
          success: false,
        });
      }
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(200).json({
        error: error,
        success: false,
      });
    }
  },
  updateReaction: async (req, res) => {
    try {
      let { id } = req.params;
      let update = await postSchema.findByIdAndUpdate(id, {
        reaction: req.body?.reaction,
      });
      if (!update) {
        return res.status(200).json({
          message: "This reaction can't update",
          success: false,
        });
      }
      res.status(200).json({
        success: true,
        message: "Reaction success",
      });
    } catch (error) {
      return res.status(200).json({
        error: error,
        success: false,
      });
    }
  },
};
export default postController;
