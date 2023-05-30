import React, { useRef, useState, useEffect } from "react";
import { useCreateUser, useUpdateUser } from "../hooks/users";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";

const UserCreateUpdateForm = ({
  isOpen,
  userDetails,
  onRequestClose,
  setSelectedUser,
}) => {
  const nameRef = useRef("");
  const deptRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("hellllll");
  const [admin, setAdmin] = useState(userDetails?.isAdmin ?? false);

  const { mutate: createUser, isLoading: isUserCreating } = useCreateUser();
  const { mutate: updateUser, isLoading: isUserUpdating } = useUpdateUser();

  useEffect(() => {
    if (userDetails) {
      nameRef.current.value = userDetails.name;
      deptRef.current.value = userDetails.dept;
      emailRef.current.value = userDetails.email;
      setAdmin(userDetails.isAdmin);
    }
  }, [userDetails]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let payload = {
      name: nameRef.current?.value,
      dept: deptRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      isAdmin: admin,
    };

    if (userDetails?._id) {
      updateUser(
        { ...payload, password: userDetails.password, id: userDetails._id },
        {
          onSuccess: () => {
            invalidateQuery(["users"]);
            toast.success("User Updated Successfully");
            onRequestClose();
            setSelectedUser(null);
          },
        }
      );
    } else {
      createUser(payload, {
        onSuccess: () => {
          invalidateQuery(["users"]);
          toast.success("User Creating Successfully");
          onRequestClose();
        },
      });
    }
  };

  return (
    <div
      className={`backdrop-blur-sm fixed z-40 overflow-y-auto top-0 w-full h-screen left-0 hidden: ${!isOpen} flex items-center`}
    >
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 shadow-lg shadow-black bg-white rounded-xl w-1/2">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white text-center">
          {userDetails?._id ? "UPDATE" : "ADD"} USER
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                NAME :
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Student name"
                ref={nameRef}
                value={nameRef.current.value}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email :
              </label>
              <input
                type="text"
                name="collage"
                id="collage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Student collage"
                ref={emailRef}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department :
              </label>
              <input
                type="text"
                name="collage"
                id="collage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Student collage"
                ref={deptRef}
                required
              />
            </div>

            {!userDetails?._id && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="collage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password :
                </label>
                <input
                  type="text"
                  name="collage"
                  id="collage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Student collage"
                  ref={passwordRef}
                  required
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <label
                  htmlFor="collage"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Admin :
                </label>
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <input
                    type="checkbox"
                    value=""
                    checked={admin}
                    className="sr-only peer"
                    onChange={() => setAdmin(!admin)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 mt-10">
            <div className="flex items-center justify-around">
              <button
                type="button"
                className="w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => onRequestClose()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/3 flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {!isUserCreating && !isUserUpdating ? (
                  userDetails?._id ? (
                    "UPDATE USER"
                  ) : (
                    "ADD USER"
                  )
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateUpdateForm;
