import React from "react";
import Image from "next/image";
import AddToCart from "../AddToCart";

const UseCaseCard = () => {
  return (
    <div className="flex gap-4 justify-evenly mt-4">
      <div className="grow card image-full w-96 shadow-xl">
        <figure>
          <img src="https://placehold.co/800x400" alt="placeholder" />
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
      <div className="grow card image-full w-96 shadow-xl">
        <figure>
          <img src="https://placehold.co/800x400" alt="placeholder" />
        </figure>
        <div className="card-body">
          <p>If you want to </p>
          <h2 className="card-title">Learn and Find Inspirations</h2>
          <h2 className="card-title">Engage in Public Good Projects</h2>
          <p>
            Discover a wealth of high-quality resources spanning civic research,
            civic data, civic tech and civic design. Civic X Syllabus empowers
            you to learn and develop game-changing civic projects.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;
