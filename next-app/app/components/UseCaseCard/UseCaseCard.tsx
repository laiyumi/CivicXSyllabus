import React from "react";
import Image from "next/image";
import AddToCart from "../AddToCart";
import Link from "next/link";

const UseCaseCard = () => {
  return (
    <div className="flex lg:flex-row sm:flex-col  gap-4 justify-evenly m-4">
      <div className="grow card image-full w-96 sm:w-full shadow-xl">
        <figure>
          <img
            src="/ian-schneider-TamMbr4okv4-unsplash.jpg"
            alt="placeholder"
          />
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
            <Link href="/build-my-syllabus" className="btn btn-primary">
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="grow card image-full w-96 sm:w-full shadow-xl">
        <figure>
          <img
            src="/daniele-levis-pelusi-AqgHZajV-IU-unsplash.jpg"
            alt="placeholder"
          />
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
            <Link className="btn btn-primary" href="/resources">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;
