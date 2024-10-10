import React from "react";
import Image from "next/image";
import AddToCart from "../AddToCart";

const ProductCard = () => {
  return (
    <div className="mt-4">
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img src="https://placehold.co/600x400" alt="placeholder" />
        </figure>
        <div className="card-body">
          <p>If you want to </p>
          <h2 className="card-title">Build a Civic Project</h2>
          <h2 className="card-title">Create a Syllabus to teach</h2>
          <p>
            Navigate our modules to learn, collaborate, and transform your
            vision into tangible civic projects.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
