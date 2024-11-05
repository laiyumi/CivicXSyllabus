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
  const response = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 10 },
  });

  const users = await prisma.user.findMany({
    include: {
      savedPosts: {
        select: {
          id: true,
          title: true,
        },
      },
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
              {user.savedPosts.map((post) => (
                <td key={post.id}>{post.title}</td>
              ))}
              <td>
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
