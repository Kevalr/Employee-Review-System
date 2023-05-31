import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReview, useUpdateReview } from "../hooks/reviews";
import { useGetAllUsers } from "../hooks/users";
import { toast } from "react-toastify";
import { invalidateQuery } from "../config/react-query-client";
import Loader from "../components/common/Loader";

const ReviewCreateUpdateForm = ({
  reviewDetails,
  setSelectedReview,
  onRequestClose,
  isOpen,
}) => {
  const { data: usersResponse, isLoading: isUsersLoading } = useGetAllUsers();

  const { mutate: createReview, isLoading: isReviewCreating } =
    useCreateReview();
  const { mutate: updateReview, isLoading: isReviewUpdating } =
    useUpdateReview();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues : {
      reviewedEmpId: reviewDetails?.reviewedEmpId?._id,
      reviewers: reviewDetails?.reviewersList,
    }
  });

  const [userList, setUserList] = useState();

  const [reviewerList, setReviewerList] = useState([]);

  useEffect(() => {
    if (reviewDetails?.reviewersList.length > 0) {
      let reviewerIds =
        reviewDetails?.reviewersList?.map(
          (reviewer) => reviewer.reviewerEmpId._id
        ) ?? [];
      setReviewerList(reviewerIds);
    }
  }, [reviewDetails]);

  useEffect(() => {
    if (usersResponse) {
      setUserList(usersResponse.data);
    }
  }, [usersResponse]);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      reviewedEmpId: data?.reviewedEmpId,
      reviewersList: data?.reviewers.map((reviewId) => {
        let alreadyPresent = reviewDetails?.reviewersList?.find(
          (reviewer) => reviewer.reviewerEmpId._id === reviewId
        );
        return {
          reviewerEmpId: reviewId,
          ratings: alreadyPresent?.ratings ?? 0,
          description: alreadyPresent?.description ?? "",
        };
      }),
    };

    console.log(payload);

    if (reviewDetails?._id) {
      updateReview({...payload, id: reviewDetails._id}, {
        onSuccess: () => {
          invalidateQuery(["reviews"]);
          toast.success("Review Updated Successfully");
          setSelectedReview(null);
          onRequestClose();
        },
      });
    } else {
      createReview(payload, {
        onSuccess: () => {
          invalidateQuery(["reviews"]);
          toast.success("Review Created Successfully");
          onRequestClose();
          setSelectedReview(null);
        },
      });
    }
  };

  if (isUsersLoading) return <Loader />;

  return (
    <div
      className={`backdrop-blur-sm fixed z-40 overflow-y-auto top-0 w-full h-screen left-0 hidden: ${!isOpen} flex items-center`}
    >
      <div className="py-8 px-4 mx-auto max-w-2xl shadow-lg shadow-black bg-white rounded-xl w-1/2">
        <h2 className="mb-4 text-4xl font-bold text-blue-400 text-center">
          {reviewDetails?._id ? "UPDATE" : "CREATE"} REVIEW
        </h2>
        {isUsersLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" w-full mb-3 px-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Employee :
              </label>
              <div className="bg-gray-50 border pr-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <select
                  className="w-full bg-transparent outline-none p-2.5"
                  required
                  {...register("reviewedEmpId")}
                >
                  <option value={false}> Select Employess to Review </option>
                  {userList?.map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                      selected={user._id === reviewDetails?.reviewedEmpId?._id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" w-full mb-3 px-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Reviewers :
              </label>
              <div className="bg-gray-50 border pr-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <div className="w-full flex justify-between py-2 pl-4 font-bold">
                  <p className="w-1/12">Select</p>
                  <p className="w-3/12">Name</p>
                  <p className="w-4/12">Email</p>
                  <p className="w-2/12">Department</p>
                </div>
                {userList?.map((user) => (
                  <div className="w-full" key={user._id}>
                    <div className="flex justify-between py-2">
                      <input
                        type="checkbox"
                        value={user._id}
                        {...register("reviewers")}
                        className="mx-3 w-1/12"
                        checked={reviewerList?.includes(user._id)}
                        onClick={(e) => {
                          if (e.target.checked) {
                            setReviewerList((prev) => [...prev, user._id]);
                          } else {
                            setReviewerList(
                              reviewerList.filter(
                                (reviewId) => reviewId !== user._id
                              )
                            );
                          }
                        }}
                      />
                      <div className="w-3/12">{user.name}</div>
                      <div className="w-4/12">{user.email}</div>
                      <div className="w-2/12">{user.dept}</div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center flex justify-around mt-5">
              <button
                type="button"
                className="px-6 py-3 block bg-gray-800 text-white font-semibold rounded-md"
                onClick={() => {
                  onRequestClose();
                  setSelectedReview(null);
                }}
              >
                cancel
              </button>
              <input
                type="submit"
                className="px-6 py-3 bg-blue-400 font-semibold rounded-md"
                disabled={isReviewCreating || isReviewUpdating}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewCreateUpdateForm;
