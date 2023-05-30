import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getAllUsers, login, toggleIsAdmin, deleteUser } from "../services/users";

// authentication hooks

export const useLoginUser = () => useMutation(login);

export const useCreateUser = () => useMutation(createUser);

// users module hooks

export const useGetAllUsers = () => useQuery(["users"], getAllUsers);

export const useToggleAdmin = () => useMutation(toggleIsAdmin);

export const useDeleteUser = () => useMutation(deleteUser);