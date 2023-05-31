import React, { useRef, useState } from "react";
import { useGiveReviewToEmplyoess } from "../hooks/reviews";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";

const ReviewModal = ({
  reviewDetails,
  setSelectedReview,
  onRequestClose,
  isOpen,
}) => {
  console.log("reviewDetails", reviewDetails);

  const descriptionRef = useRef();

  const [ratings, setRatings] = useState(0);

  const { mutate: giveReview, isLoading } = useGiveReviewToEmplyoess();

  const submitReview = () => {
    console.log(descriptionRef.current?.value);
    console.log(ratings);
    const payload = {
      ratings: ratings,
      description: descriptionRef.current?.value ?? "",
      reviewerEmpId: reviewDetails.userId,
      id: reviewDetails.reviewId,
    };

    giveReview(payload, {
      onSuccess: () => {
        invalidateQuery(["reviews", reviewDetails.userId]);
        toast.success("Review Given Successfully");
        setSelectedReview(null);
        onRequestClose();
      },
    });
    console.log(payload);
  };

  return (
    <div
      className={`backdrop-blur-sm fixed z-40 overflow-y-auto top-0 w-full h-screen left-0 hidden: ${!isOpen} flex items-center`}
    >
      <div className="py-8 px-4 mx-auto max-w-2xl shadow-lg shadow-black bg-white rounded-xl w-1/2">
        <h2 className="mb-4 text-4xl font-bold text-blue-400 text-center">
          GIVE REVIEW
        </h2>
        <div className="flex w-full justify-around my-8">
          <div className="font-bold">Employee : </div>
          <div className="capitalize">{reviewDetails?.reviewedUser.name}</div>
          <div>{reviewDetails?.reviewedUser.email}</div>
          <div className="capitalize">{reviewDetails?.reviewedUser.dept}</div>
        </div>
        <div className="flex w-full justify-between my-8 px-10">
          <div className="w-3/12 font-bold">Ratings: </div>
          <div class="flex items-center mb-5 w-9/12">
            <svg
              aria-hidden="true"
              className={`${
                ratings >= 1 ? "text-yellow-400" : "text-gray-300"
              } w-7 h-7`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setRatings(1)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className={`${
                ratings >= 2 ? "text-yellow-400" : "text-gray-300"
              } w-7 h-7`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setRatings(2)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className={`${
                ratings >= 3 ? "text-yellow-400" : "text-gray-300"
              } w-7 h-7`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setRatings(3)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className={`${
                ratings >= 4 ? "text-yellow-400" : "text-gray-300"
              } w-7 h-7`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setRatings(4)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className={`${
                ratings >= 5 ? "text-yellow-400" : "text-gray-300"
              } w-7 h-7`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setRatings(5)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
        <div className="flex w-full justify-around my-8 px-5">
          <div className="w-2/12 font-bold">Description: </div>
          <textarea
            className="w-8/12 border border-blue-300"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className="text-center flex justify-around mt-5">
          <button
            type="button"
            className="px-6 py-3 block bg-gray-800 text-white font-semibold rounded-md"
            onClick={() => {
              onRequestClose();
              setSelectedReview(null);
            }}
            disabled={isLoading}
          >
            cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-400 font-semibold rounded-md"
            disabled={isLoading}
            onClick={submitReview}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
