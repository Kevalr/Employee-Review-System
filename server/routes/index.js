const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("<h1> Hello world </h1>");
});

// user routes
const userController = require("../controller/userController");

// authentication routes
router.post("/users/register", userController.registerUser);
router.post("/users/login", userController.loginUser);

// review routes -- All Users Routes
const reviewController = require("../controller/reviewController");

// ------------------------------- admin user routes ------------------------------- //

// user modules routes
router.get("/users", userController.getUsersList);
router.put("/users/update/:id", userController.updateUser);
router.put("/users/changeUserStatus/:id", userController.changeUserStatus);
router.delete("/users/:id", userController.deleteUser);

// getting all reviews list for admin users
router.get("/reviews", reviewController.getAllReviews);

// creating reviews for admin users
router.post("/reviews/create", reviewController.createReview);

// updating reviews for admin users
router.put("/reviews/update/:id", reviewController.updateReview);

// deleting reviews for admin users
router.delete("/reviews/delete/:id", reviewController.deleteReview);


// ------------------------------ employees user routes ------------------- //

// getting reviews where reviewersId is used id for employees users
router.get(
  "/reviews/getReviewsByReviewerId/:reviewerEmpId",
  reviewController.getReviewsByUser
);

// giving and updating review for employees users
router.put(
  "/reviews/updateEmpReview/:id/:reviewerEmpId",
  reviewController.giveReviewToEmployees
);

module.exports = router;
