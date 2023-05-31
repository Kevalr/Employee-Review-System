import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createReview,
  deleteReview,
  getAllReviews,
  // getReviewById,
  updateReview,
} from "../services/reviews";

export const useGetAllReviews = () => useQuery(["reviews"], getAllReviews);

export const useCreateReview = () => useMutation(createReview);

export const useUpdateReview = () => useMutation(updateReview);

// export const useGetReviewById = (id) =>
//   useQuery(["reviews", id], getReviewById, {
//     enabled: !!id,
//   });

export const useDeleteReview = () => useMutation(deleteReview);
