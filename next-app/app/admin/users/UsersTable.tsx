import React from "react";
import prisma from "../../../prisma/client";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  posts: string[];
}

const UsersTable = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    next: { revalidate: 10 },
  });

  const users = await prisma.user.findMany({
    include: {
      list: true,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Role</th>
            <th>Lists</th>
            <th>Saved Posts</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.updatedAt.toLocaleString()}</td>
              <td>{user.role}</td>
              {user.list.map((singleList) => (
                <td key={singleList.id}>{singleList.name}</td>
              ))}
              <td>
                <th>TODO</th>
                <Link
                  href={`/admin/users/${user.id}`}
                  className="btn btn-outline btn-s"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
