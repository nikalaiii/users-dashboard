"use client";

import { useReducer } from "react";
import { useCreateUser } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  email: string;
  company: string;
  adress: string;
  city: string;
};

const initialState: FormData = {
  name: "",
  email: "",
  company: "",
  adress: "",
  city: "",
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormData; value: string }
  | { type: "RESET" };

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const CreateUserForm = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const createUserMutation = useCreateUser();

  const onChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_FIELD", field, value: e.target.value });
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData, {
      onSuccess: () => {
        dispatch({ type: "RESET" });
      },
    });
  };

  return (
    <div className="max-w-md rounded-md border p-4">
      <h2 className="mb-4 text-lg font-semibold">Create new user</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={onChange("name")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={onChange("email")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="company">
            Company
          </label>
          <Input
            id="company"
            placeholder="Acme Inc"
            value={formData.company}
            onChange={onChange("company")}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="address">
            Address
          </label>
          <Input
          id="address"
          placeholder="123 Main St"
          value={formData.adress}
          onChange={onChange("adress")}
        />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="city">
            City
          </label>
          <Input
            id="city"
            placeholder="New York"
            value={formData.city}
            onChange={onChange("city")}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createUserMutation.isPending}
        >
          {createUserMutation.isPending ? "Creating..." : "Create user"}
        </Button>
      </form>
    </div>
  );
};
