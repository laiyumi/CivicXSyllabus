"use client";

import { Prisma } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";

type User = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        posts: true;
      };
    };
  };
}>;

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Users</h1>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">Total:</span>{" "}
            <span className="badge badge-primary">{users.length}</span>
          </p>
          <p>
            <span className="font-bold">Regular User:</span>{" "}
            <span className="badge badge-primary">
              {users.filter((user) => user.role === "USER").length}
            </span>
          </p>
        </div>
      </div>
      <UsersTable users={users} loading={loading} />
    </div>
  );
};

export default AdminUsersPage;
