import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
reviewSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
reviewSchema.set("toJSON", {
  virtuals: true,
});
export default mongoose.model("Review", reviewSchema);
