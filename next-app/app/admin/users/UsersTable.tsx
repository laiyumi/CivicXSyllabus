"use client";

import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";

type User = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        posts: true;
      };
    };
  };
}>;

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Role</th>
            <th># Lists</th>
            <th># Saved Posts</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{format(new Date(user.updatedAt), "PPP")}</td>{" "}
              {user.role === "ADMIN" ? (
                <td>
                  <span className="badge badge-neutral">Admin</span>
                </td>
              ) : (
                <td>
                  <span className="badge badge-secondary">User</span>
                </td>
              )}
              <td>{user.lists.length}</td>
              <td>
                {user.lists.reduce((acc, list) => acc + list.posts.length, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
