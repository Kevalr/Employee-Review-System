import React, { useEffect, useState } from "react";
import { useGetReviewsByReviewerId } from "../hooks/reviews";
import { getUser } from "../utils/helper";
import Loader from "../components/common/Loader";
import useModal from "../hooks/use-modal";
import ReviewModal from "./ReviewModal";

const GiveReviews = () => {
  const user = getUser();
  const { data: userAssignedReviews, isLoading: isUserAssignedReviewsLoading } =
    useGetReviewsByReviewerId(user.id);

  const [userReviews, setUserReviews] = useState([]);

  const { isOpen, openModal, onRequestClose } = useModal();

  useEffect(() => {
    if (userAssignedReviews?.data?.length > 0) {
      setUserReviews(userAssignedReviews?.data);
    }
  }, [userAssignedReviews]);

  const [selectedReview, setSelectedReview] = useState(null);

  // mare khali ratings and description j send karvana che backend ma ae automatically api mathi review-id mathi review goti leshe and aemathi reviwerslist.reviwerEmpid mathi ae j reviwer na data change karshe

  if (isUserAssignedReviewsLoading) return <Loader />;

  return (
    <div className="relative">
      <div className="flex justify-center items-center pb-3">
        <h2 className="text-3xl">Reviews List</h2>
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
                  {userReviews?.length > 0 &&
                    userReviews.map((review, index) => (
                      <tr key={review._id}>
                        <td>{index + 1}</td>
                        <td className="capitalize">
                          {review.reviewedEmpId?.name}
                        </td>
                        <td>{review.reviewedEmpId?.email}</td>
                        <td>{review.reviewedEmpId?.dept}</td>
                        <td>
                          <button
                            className="px-4 py-1.5 my-1 bg-blue-300 rounded-md font-medium"
                            onClick={() => {
                              setSelectedReview({
                                userId: user.id,
                                reviewId: review._id,
                                reviewedUser: review?.reviewedEmpId,
                              })
                              openModal();
                            }}
                          >
                            Give Review
                          </button>
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
        <ReviewModal
          reviewDetails={selectedReview}
          setSelectedReview={setSelectedReview}
          onRequestClose={onRequestClose}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default GiveReviews;
