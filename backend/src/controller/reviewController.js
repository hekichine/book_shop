import reviewSchema from "../model/reviewSchema";
import userSchema from "../model/userSchema";
import mongoose from "mongoose";
import productSchema from "../model/productSchema";

const reviewController = {
  getreview: async (req, res) => {
    let { id } = req.params;
    try {
      let reviews = await reviewSchema
        .find()
        .populate("uid", "fullname avatar");

      if (!reviews) {
        return res.status(200).json({
          message: "Not found",
          success: false,
        });
      }
      res.status(200).json({
        message: "Found user",
        success: true,
        reviews: reviews,
      });
    } catch (error) {
      console.log("Review error: ", error);
    }
  },
  create: async (req, res) => {
    try {
      let uid = req.body?.uid;
      let productid = req.body?.productid;
      if (!mongoose.isValidObjectId(uid)) {
        return res
          .status(200)
          .json({ message: "Invalid product id", success: false });
      }
      let reviews = new reviewSchema({
        uid: req.body?.uid,
        content: req.body?.content,
      });
      let finduid = await userSchema.findById(req.body?.uid);
      if (!finduid) {
        return res.status(200).json({
          message: "User not found",
          success: false,
        });
      }
      await reviews
        .save()
        .then(async (reviews) => {
          if (reviews) {
            let cmt = await productSchema.findByIdAndUpdate(productid, {
              $push: {
                reviews: reviews?.id,
              },
            });

            if (!cmt) {
              return res.status(200).json({
                message: "Error update comment",
                success: false,
              });
            }
            res.status(200).json({
              message: "Add reviews success",
              success: true,
            });
          } else {
            res.status(200).json({
              message: "Review don't created",
              success: false,
            });
          }
        })
        .catch((err) => {
          return res.status(200).json({
            message: "Error",
            success: false,
          });
        });
    } catch (error) {
      return res.status(200).json({
        message: "Error",
        success: false,
        error,
      });
    }
  },
  delete: async (req, res) => {
    let { id } = req.params;
    let { prid } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(200)
          .json({ message: "Invalid product id", success: false });
      }
      let reviews = await reviewSchema.findByIdAndDelete(id);
      if (!reviews) {
        return res.status(200).json({
          message: "The reviews can't deleted",
          success: false,
        });
      }
      let product = await productSchema.findByIdAndUpdate(prid, {
        $pull: {
          reviews: id,
        },
      });
      if (!product) {
        return res.status(200).json({
          message: "The product can't updated",
          success: false,
        });
      }
      res.status(200).json({
        message: "The reviews deleted",
        success: true,
      });
    } catch (error) {
      return res.status(200).json({
        message: "Error",
        success: false,
        error,
      });
    }
  },
};
export default reviewController;
