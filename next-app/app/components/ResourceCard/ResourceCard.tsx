interface Props {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  imageUrl: string;
  sourceName: string;
  categories: string[];
  tags: string[];
}

const ResourceCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src="https://placehold.co/600x400" alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary">Design Sprints</div>
        <h2 className="card-title">Round robin template</h2>
        <p>
          This round robin template, built by LUMA Institute, guides you through
          a collaborative session where every team member contributes multiple
          ideas, making it great for brainstorming and exploration.
        </p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">Tool</div>
          <div className="badge badge-outline">Platform</div>
          <div className="badge badge-outline">Application</div>
        </div>
        <div className="card-actions justify-start mt-4">
          <button className="btn btn-sm btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
