import mongoose from "mongoose";

const postDetailSchema = mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
postDetailSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
postDetailSchema.set("toJSON", {
  virtuals: true,
});
export default mongoose.model("PostDetail", postDetailSchema);
