const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewedEmpId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    reviewersList: [
      {
        ratings: {
          type: Number,
          // required: true,
          default: 0,
        },
        description: {
          type: String,
          // required: true,
          default: "none",
        },
        reviewerEmpId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
