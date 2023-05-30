import axiosClient from "../config/axios-client";

const createUser = (payload) => {
  console.log(payload, "----")
  return axiosClient.post("/users/register", payload);
};

const login = (payload) => { 
  console.log(payload, "----login ----")
  return axiosClient.post("/users/login", payload); 
}

export { createUser, login };
