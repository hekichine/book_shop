import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "http://localhost:8080/uploads/heki.jpg",
    },
    coveravatar: {
      type: String,
      default:
        "http://localhost:8080/uploads/night-city-cyberpunk-wallpaper.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: "Updating",
    },
    address: {
      type: String,
      default: "Updating",
    },
    phone: {
      type: String,
      default: "Updating",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
export default mongoose.model("User", userSchema);
