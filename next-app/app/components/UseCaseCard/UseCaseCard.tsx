import React from "react";
import Image from "next/image";
import AddToCart from "../AddToCart";

const UseCaseCard = () => {
  return (
    <div className="flex lg:flex-row sm:flex-col  gap-4 justify-evenly m-4">
      <div className="grow card image-full w-96 sm:w-full shadow-xl">
        <figure>
          <img src="https://placehold.co/800x400" alt="placeholder" />
        </figure>
        <div className="card-body">
          <p>If you want to </p>
          <h2 className="card-title">
            Build a Civic Project | Create a Syllabus for Your Class
          </h2>
          <p>
            Navigate our resources to find articles, media, and networks that
            help you learn and explore about different civic innovation topics.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Get started</button>
          </div>
        </div>
      </div>
      <div className="grow card image-full w-96 sm:w-full shadow-xl">
        <figure>
          <img src="https://placehold.co/800x400" alt="placeholder" />
        </figure>
        <div className="card-body">
          <p>If you want to </p>
          <h2 className="card-title">
            Get Inspired | Explore Civic Innovation Topics
          </h2>
          <p>
            Browse high-quality resources spanning civic innovation topics, such
            as civic research, civic data, civic tech, and civic design.
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
