const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("<h1> Hello world </h1>");
});

// user routes
// ---- common routes -------------- //
const userController = require("../controller/userController");
router.get("/users/", userController.getUsersList);
router.post("/users/register", userController.registerUser);
router.post("/users/login", userController.loginUser);
router.put("/users/changeUserStatus/:id", userController.changeUserStatus);
router.delete("/users/delete/:id", userController.deleteUser);

// review routes
const reviewController = require("../controller/reviewController");
// ---------- admin user routes ------------------- //

// getting all reviews list for admin users
router.get("/reviews", reviewController.getAllReviews);

// creating reviews for admin users
router.post("/reviews/create", reviewController.createReview);

// updating reviews for admin users
router.put("/reviews/update/:id", reviewController.updateReview);

// deleting reviews for admin users
router.delete("/reviews/delete/:id", reviewController.deleteReview);

// ---------- employess user routes ------------------- //

// getting reviews where reviewersId is used id for employees users
router.get(
  "/reviews/getReviewsByReviewerId/:reviewerEmpId",
  reviewController.getReviewsByUser
);

// giving and ypdating review for employees users
router.put(
  "/reviews/updateEmpReview/:id/:reviewerEmpId",
  reviewController.giveReviewToEmployees
);

// atyare aakhu review j update karai dav chu, pachi review ma jaine specific

// employess routes

module.exports = router;
