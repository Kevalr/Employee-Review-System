import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import useModal from "../hooks/use-modal";
import ReviewCreateUpdateForm from "./ReviewCreateUpdateForm";
import { useDeleteReview, useGetAllReviews } from "../hooks/reviews";

const Reviews = () => {
  const { data: reviews, isLoading } = useGetAllReviews();

  const { mutate: deleteReview } = useDeleteReview();
  const { isOpen, onRequestClose, openModal } = useModal();

  const [reviewList, setReviewList] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    debugger;
    if (reviews) {
      console.log(reviews);
      setReviewList(reviews.data);
    }
  }, [reviews]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want to delete this Review?"
    );
    if (confirmDelete) {
      deleteReview(id, {
        onSuccess: () => {
          invalidateQuery(["reviews"]);
          toast.success("Review Deleted Successfully");
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-3xl">Reviews List</h2>
        <button
          className="mr-6 bg-gray-900 text-white px-4 py-1.5 rounded-md font-medium text-lg hover:scale-105 transition-transform ease-in-out"
          onClick={() => openModal()}
        >
          Create Review
        </button>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left font-light">
                <thead className="border-b dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="mx-6 py-4">
                      No.
                    </th>
                    <th scope="col" className="mx-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="mx-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="py-4">
                      Department
                    </th>
                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {reviewList.length > 0 &&
                    reviewList.map((review, index) => (
                      <tr key={review._id}>
                        <td>{index + 1}</td>
                        <td className="capitalize">
                          {review.reviewedEmpId?.name}
                        </td>
                        <td>{review.reviewedEmpId?.email}</td>
                        <td>{review.reviewedEmpId?.dept}</td>
                        <td>
                          <img
                            src={edit}
                            alt="edit button"
                            width="20px"
                            className="inline-block mr-5 hover:scale-125"
                            onClick={() => {
                              setSelectedReview(review);
                              openModal();
                            }}
                          />
                          <img
                            src={trash}
                            alt="delete button"
                            width="20px"
                            className="inline-block hover:scale-125 ease-in-out transition-all duration-200"
                            onClick={() => handleDelete(review._id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <ReviewCreateUpdateForm
          reviewDetails={selectedReview}
          setSelectedReview={setSelectedReview}
          onRequestClose={onRequestClose}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default Reviews;
