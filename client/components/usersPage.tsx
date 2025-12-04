'use client'

import { Input } from "@/components/ui/input";
import { useDeleteUser, useUsers } from "@/lib/hooks";
import { useState } from "react";
import { UsersTable } from "./usersTable";

const UsersPage = () => {
    const [search, setSearch] = useState("");
    const { data, isLoading, isError } = useUsers(search);
    const deleteMutation = useDeleteUser();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">User Management</h1>

      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load users</p>}

      {data && (
        <UsersTable
          users={data}
          onDelete={(id) => deleteMutation.mutate(id)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default UsersPage;