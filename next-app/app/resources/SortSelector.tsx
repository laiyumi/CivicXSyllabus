import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { set } from "zod";

interface Props {
  sortOrder: string;
}

const SortSelector = ({ sortOrder }: Props) => {
  const router = useRouter();

  const orders: { label: string; value: keyof Post }[] = [
    { label: "Created Date", value: "createdAt" },
    { label: "Updated Date", value: "updatedAt" },
    { label: "Title", value: "title" },
  ];

  const [order, setOrder] = useState("");
  const handleOrderChange = () => {
    if (order !== "") {
      // copy the current search params and add the new order
    }
  };

  return (
    <select
      className="select select-bordered w-auto"
      onChange={(e) => setOrder(e.target.value)}
    >
      <option disabled selected>
        Order By
      </option>
      {orders.map((order) => (
        <option key={order.value} value={order.value}>
          {order.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelector;
