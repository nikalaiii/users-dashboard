"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, deleteUser, User } from "./api";
import { useUsersContext } from "./usersContext";
import { useEffect } from "react";

export function useUsers(search: string) {
  const { setUsers } = useUsersContext();

   const query = useQuery<User[], Error>({
    queryKey: ["users", search],
    queryFn: () => getUsers(search || undefined),
  });

  useEffect(() => {
    if (query.data) {
      setUsers(query.data);
    }
  }, [query.data, setUsers]);

  return query;
}


export function useCreateUser() {
  const { addUser } = useUsersContext();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<User, "id">) => createUser(data),
    onSuccess: (newUser) => {
      addUser(newUser);
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}


export function useDeleteUser() {
  const { removeUser } = useUsersContext();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_, id) => {
      removeUser(id);
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
