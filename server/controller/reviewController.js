const User = require("../models/User");
const Review = require("../models/Review");

// for admin users only
const getAllReviews = async (req, res) => {
  try {
    let reviews = await Review.find({})
      .populate({
        path: "reviewedEmpId",
        model: "User",
      })
      .populate({
        path: "reviewersList.reviewerEmpId",
        model: "User",
      });
    if (reviews) {
      return res.status(200).json({
        data: reviews,
        message: "Reviews fetched successfully",
      });
    } else {
      return res.status(404).json({
        message: "Reviews not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while fetching Reviews",
    });
  }
};

const createReview = async (req, res) => {
  try {
    let result = await Review.create(req.body);
    if (result) {
      return res.status(200).json({
        data: result,
        message: "Review created successfully",
      });
    } else {
      return res.status(500).json({
        message: "Error while creating Review",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while creating Review",
    });
  }
};

const updateReview = async (req, res) => {
  try {
    let review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (review) {
      return res.status(200).json({
        data: review,
        message: "Review Updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Review not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while updating Review",
    });
  }
};

const deleteReview =  (req, res) => {
  Review.findByIdAndDelete(req.params.id)
  .then((review) => {
    return res.status(200).json({
      message: "Review Deleted Successfully",
      data: review
    })
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "Error while deleting review",
    })
  })
}

// for employees to see and give reviews

const getReviewsByUser = async (req, res) => {
  console.log("get reviews by user ---", req.params.reviewerEmpId);
  try {
    let reviews = await Review.find({
      "reviewersList.reviewerEmpId": req.params.reviewerEmpId,
    }).populate({
      path: "reviewedEmpId",
      modal: "User",
    });
    if (reviews?.length > 0) {
      return res.status(200).json({
        data: reviews,
        message: "Reviews fetched successfully",
      });
    } else {
      return res.status(200).json({
        message: "No Reviews Assigned to this user",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error while fetching Reviews",
    });
  }
};

// review aapva mate ae review fetch karavvanu aena reviwersarray ma update karine aene farirthi save karavi devano

const giveReviewToEmployees = (req, res) => {
  // First, find the review document by its ID
  console.log(" 111111 ", req.params.id, "------- ", req.params.reviewerEmpId)

    Review.findOneAndUpdate(
      {
        _id: req.params.id,
        'reviewersList.reviewerEmpId': req.params.reviewerEmpId
      },
      {
        $set: {
          'reviewersList.$.ratings': 3,
          'reviewersList.$.description': "Hello ratings"
        }
      },
      { new: true }
    )
    .then((updatedReview) => {
      // Updated review
      return res.status(200).json({
        data: updatedReview,
        message: "Review Updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Error while updating Review",
      });
    });
};

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewsByUser,
  giveReviewToEmployees
};
