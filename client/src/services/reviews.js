import axiosClient from "../config/axios-client";

export const getAllReviews = () => axiosClient.get("/reviews");

export const createReview = (payload) =>
  axiosClient.post("/reviews/create", payload);

export const updateReview = (payload) =>
  axiosClient.put(`/reviews/update/${payload.id}`, payload);

export const deleteReview = (id) => axiosClient.delete(`/reviews/delete/${id}`);
