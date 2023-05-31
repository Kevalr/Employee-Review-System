import axiosClient from "../config/axios-client";

export const getAllReviews = () => axiosClient.get("/reviews");

export const createReview = (payload) =>
  axiosClient.post("/reviews/create", payload);

export const updateReview = (payload) =>
  axiosClient.put(`/reviews/update/${payload.id}`, payload);

export const deleteReview = (id) => axiosClient.delete(`/reviews/delete/${id}`);

export const getReviewsByReviewerId = ({queryKey}) => axiosClient.get(`/reviews/getReviewsByReviewerId/${queryKey[1]}`) 

export const giveReviewToEmplyoess = (payload) => axiosClient.put(`/reviews/updateEmpReview/${payload.id}/${payload.reviewerEmpId}`, {payload})