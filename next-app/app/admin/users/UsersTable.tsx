"use client";

import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type User = Prisma.UserGetPayload<{
  include: {
    lists: {
      include: {
        posts: true;
      };
    };
  };
}>;

const UsersTable = ({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr>
            <th className="w-1/10">Name</th>
            <th className="w-3/10">Email</th>
            <th className="w-3/10">Last Login</th>
            <th className="w-1/10">Role</th>
            <th className="w-1/10"># Lists</th>
            <th className="w-1/10"># Saved Posts</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{format(new Date(user.updatedAt), "PPP")}</td>{" "}
                  {user.role === "ADMIN" ? (
                    <td>
                      <span className="badge badge-primary">Admin</span>
                    </td>
                  ) : (
                    <td>
                      <span className="badge badge-secondary">User</span>
                    </td>
                  )}
                  <td>{user.lists.length}</td>
                  <td>
                    {user.lists.reduce(
                      (acc, list) => acc + list.posts.length,
                      0
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
