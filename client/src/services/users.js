import axiosClient from "../config/axios-client";

// authentication  methods

const createUser = (payload) => axiosClient.post("/users/register", payload);

const login = (payload) => axiosClient.post("/users/login", payload);

// user module methods

const getAllUsers = () => axiosClient.get("/users");

const toggleIsAdmin = (id) => axiosClient.put(`/users/changeUserStatus/${id}`)

const updateUser = (payload) => {
  console.log(payload);
return axiosClient.put(`/users/update/${payload.id}`, payload)
}

const deleteUser = (id) => axiosClient.delete(`/users/${id}`)

export { createUser, login, getAllUsers, toggleIsAdmin, updateUser, deleteUser}