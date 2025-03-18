import Link from "next/link";

const UseCaseCard = () => {
  return (
    <div className="flex md:flex-row sm:flex-col gap-4 justify-evenly m-4 sm:h-auto lg:max-h-80">
      <div className="grow card image-full sm:w-full shadow-xl">
        <figure>
          <img
            className="w-full object-cover"
            src="/ian-schneider-TamMbr4okv4-unsplash.jpg"
            alt="Two pairs of shoes standing near pavement text that reads “Passion led us here,” with dappled sunlight creating shadow patterns."
          />
        </figure>
        <div className="card-body md:p-14 sm:p-10">
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
      <div className="grow card image-full sm:w-full shadow-xl">
        <figure>
          <img
            className="w-full object-cover"
            src="/daniele-levis-pelusi-AqgHZajV-IU-unsplash.jpg"
            alt="A radial arrangement of sharp, translucent white shapes resembling flower petals or abstract wings on a light background."
          />
        </figure>
        <div className="card-body md:p-14 sm:p-10">
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
