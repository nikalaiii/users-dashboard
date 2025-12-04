"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { User } from "@/lib/api";

type State = {
  users: User[];
};

type Action =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "REMOVE_USER"; payload: number };

function usersReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    default:
      return state;
  }
}

type UsersContextValue = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
};

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(usersReducer, { users: [] });

  const value: UsersContextValue = {
    users: state.users,
    setUsers: (users) => dispatch({ type: "SET_USERS", payload: users }),
    addUser: (user) => dispatch({ type: "ADD_USER", payload: user }),
    removeUser: (id) => dispatch({ type: "REMOVE_USER", payload: id }),
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export function useUsersContext() {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsersContext must be used within UsersProvider");
  }
  return ctx;
}
