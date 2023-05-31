import React, { useEffect, useState } from "react";
import { useDeleteUser, useGetAllUsers, useToggleAdmin } from "../hooks/users";
import Loader from "../components/common/Loader";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import useModal from "../hooks/use-modal";
import UserCreateUpdateForm from "./UserCreateUpdateForm";

const Users = () => {
  const { data: users, isLoading } = useGetAllUsers();
  const { mutate: toggleAdminStatus } = useToggleAdmin();
  const { mutate: deleteUser } = useDeleteUser();
  const { isOpen, onRequestClose, openModal} = useModal();

  const [userlist, setUserlist] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users) {
      console.log(users);
      setUserlist(users.data);
    }
  }, [users]);

  const toggleAdmin = (id, isAdmin) => {
    toggleAdminStatus(id, { onSuccess: () => {
        toast.success(isAdmin ? "Admin Rights Revoked Successfully" : "Admin Rights Given Successfully");
        invalidateQuery("users");
    } });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want to delete this User?"
    );
    if (confirmDelete) {
        deleteUser(id, {
        onSuccess: () => {
          invalidateQuery(["users"]);
          toast.success("user Deleted Successfully");
        },
      });
    }
  };


  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-3xl">UserList</h2>
        <button 
        className="mr-6 bg-gray-900 text-white px-4 py-1.5 rounded-md font-medium text-lg hover:scale-105 transition-transform ease-in-out"
        onClick={() => openModal()}
        >
          Create User
        </button>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="mx-6 py-4">
                      No.
                    </th>
                    <th scope="col" className="mx-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="mx-6 py-4">
                      Department
                    </th>
                    <th scope="col" className="py-4">
                      Admin
                    </th>
                    <th scope="col" className="py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userlist.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.dept}</td>
                      <td>
                        {user.isAdmin}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            checked={user.isAdmin}
                            className="sr-only peer"
                            onChange={() => toggleAdmin(user._id, user.isAdmin)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td>
                      <img
                          src={edit}
                          alt="edit button"
                          width="20px"
                          className="inline-block mr-5 hover:scale-125"
                          onClick={() => {
                            setSelectedUser(user); 
                            openModal();
                        }}
                        />
                        <img
                          src={trash}
                          alt="delete button"
                          width="20px"
                          className="inline-block hover:scale-125 ease-in-out transition-all duration-200"
                          onClick={() => handleDelete(user._id)}
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
      {
        isOpen  &&(
            <UserCreateUpdateForm 
                userDetails = {selectedUser}
                setSelectedUser = {setSelectedUser}
                onRequestClose={onRequestClose}
                isOpen = {isOpen}
            />
        )
      }
    </div>
  );
};

export default Users;
