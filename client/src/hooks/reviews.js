import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByReviewerId,
  // getReviewById,
  updateReview,
} from "../services/reviews";

export const useGetAllReviews = () => useQuery(["reviews"], getAllReviews);

export const useCreateReview = () => useMutation(createReview);

export const useUpdateReview = () => useMutation(updateReview);

export const useDeleteReview = () => useMutation(deleteReview);

export const useGetReviewsByReviewerId = (id) => useQuery(["reviews",id],getReviewsByReviewerId);
