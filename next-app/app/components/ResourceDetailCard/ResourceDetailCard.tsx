import Link from "next/link";

const ResourceDetailCard = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="flex-none">
        <img src="https://placehold.co/600x400" alt="Album" />
      </figure>
      <div className="card-body flex-auto justify-around">
        <div className="badge badge-secondary">Design Sprints</div>
        <h2 className="card-title text-3xl">Round robin template</h2>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">Tool</div>
          <div className="badge badge-outline">Platform</div>
          <div className="badge badge-outline">Application</div>
        </div>
        <div className="card-actions justify-end">
          <Link
            href="https://www.mural.co/templates/round-robin?mc_cid=b2163a78a4&mc_eid=1850419c30"
            className="btn btn-primary"
          >
            Explore this resource
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailCard;
