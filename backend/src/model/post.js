import mongoose from "mongoose";

const postSchema = mongoose.Schema(
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
    reaction: {
      type: Number,
      default: 0,
    },
    commentDetail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostDetail",
      },
    ],
  },
  {
    timestamps: true,
  }
);
postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
postSchema.set("toJSON", {
  virtuals: true,
});
export default mongoose.model("Post", postSchema);
