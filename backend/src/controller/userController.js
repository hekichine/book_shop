import userSchema from "../model/userSchema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
require("dotenv/config");

const secret = process.env.SECRET;

let userController = {
  getlist: async (req, res) => {
    let users = await userSchema.find();
    if (!users) {
      res.status(200).json({
        success: false,
      });
    }
    res.status(200).json({
      message: "Get list user",
      success: true,
      users,
    });
  },
  create: async (req, res) => {
    let username = req.body?.username;
    let email = req.body?.email;

    try {
      let findUser = await userSchema.find({ username: username });
      let findEmail = await userSchema.find({ email: email });
      if (findUser.length > 0) {
        return res.status(200).json({
          message: "Username is exists",
          success: false,
        });
      }
      if (findEmail.length > 0) {
        return res.status(200).json({
          message: "Email is exists",
          success: false,
        });
      }
      let user = new userSchema({
        username: req.body?.username,
        email: req.body?.email,
        password: bcrypt.hashSync(req.body?.password, 10),
        isAdmin: false,
      });
      await user
        .save()
        .then((user) => {
          res.status(200).json({
            message: "Create success",
            success: true,
            user: user,
          });
        })
        .catch((err) => {
          res.status(200).json({
            message: "The user can't created",
            err,
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
  findById: async (req, res) => {
    let { id } = req.params;
    try {
      await userSchema
        .findById(id)
        .select("-password")
        .then((result) => {
          if (result) {
            res.status(200).json({
              message: `Find user id: ${id}`,
              success: true,
              user: result,
            });
          } else {
            res.status(200).json({
              message: "Not found",
              success: false,
            });
          }
        })
        .catch((err) => {
          res.status(200).json({
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
  signin: async (req, res) => {
    try {
      let user = await userSchema.findOne({ username: req.body?.username });
      if (!user) {
        return res.status(200).json({
          message: "User not found",
          success: false,
        });
      }
      if (user && bcrypt.compareSync(req.body?.password, user.password)) {
        res.status(200).json({
          message: "Signin success",
          success: true,
          user: {
            username: user.username,
            fullname: user.fullname,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            id: user.id,
          },
        });
      } else {
        res.status(200).json({
          message: "Password is wrong!",
          success: false,
        });
      }
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

    try {
      await userSchema
        .findByIdAndDelete(id)
        .then((user) => {
          if (user) {
            res.status(200).json({
              message: "Delete user success",
              success: true,
            });
          } else {
            res.status(200).json({
              message: "Delete user error",
              success: false,
            });
          }
        })
        .catch((err) => {
          res.status(200).json({
            message: "Error",
            success: false,
            error: err,
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
  coveravatar: async (req, res) => {
    let { id } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(200)
          .json({ message: "Invalid user id", success: false });
      }
      const file = req.file;

      const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

      const user = await userSchema.findByIdAndUpdate(
        id,
        {
          coveravatar: `${basePath}${file?.filename}`,
        },
        { new: true }
      );
      if (!user) {
        return res.status(200).json({
          message: "The cover avatar cannot updated",
          success: false,
        });
      }
      res.status(200).json({
        message: "Cover avatar update success",
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
  avatar: async (req, res) => {
    let { id } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(200)
          .json({ message: "Invalid user id", success: false });
      }
      const file = req.file;

      const basePath = `${req.protocol}://${req.get("host")}/uploads/`;

      const user = await userSchema.findByIdAndUpdate(
        id,
        {
          avatar: `${basePath}${file?.filename}`,
        },
        { new: true }
      );
      if (!user) {
        return res.status(200).json({
          message: "The avatar cannot updated",
          success: false,
        });
      }
      res.status(200).json({
        message: "Avatar update success",
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
  password: async (req, res) => {
    let { id } = req.params;

    try {
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(200)
          .json({ message: "Invalid user id", success: false });
      }
      const user = await userSchema.findByIdAndUpdate(
        id,
        {
          password: req.body?.password,
        },
        { new: true }
      );
      if (!user) {
        return res.status(200).json({
          message: "The password cannot updated",
          success: false,
        });
      }
      res.status(200).json({
        message: "Password update success",
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
  update: async (req, res) => {
    let { id } = req.params;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(200)
          .json({ message: "Invalid user id", success: false });
      }
      const user = await userSchema.findByIdAndUpdate(
        id,
        {
          fullname: req.body?.fullname,
          email: req.body?.email,
          phone: req.body?.phone,
        },
        { new: true }
      );
      if (!user) {
        return res.status(200).json({
          message: "The info cannot updated",
          success: false,
        });
      }
      res.status(200).json({
        message: "Info update success",
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
export default userController;
