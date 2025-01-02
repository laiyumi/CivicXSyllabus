import React from "react";

interface Prop {
  data: {
    persona: string;
    imageUrl: string;
    altText: string;
    name: string;
    occupation: string;
    interests: string;
    intro: string;
    painpoints: string;
  };
}

const PersonaCard = ({ data }: Prop) => {
  return (
    <div className="flex flex-col gap-6 h-full sm:h-full">
      <h2 className="text-xl text-center">{data.persona}</h2>
      <div className="card bg-black flex flex-col justify-between h-full sm:h-full">
        <figure className="flex justify-center items-center h-48 w-full">
          <img
            src={data.imageUrl}
            alt={data.altText}
            className="h-full object-contain"
          />
        </figure>
        <div className="card-body text-white flex flex-col">
          <h3 className="card-title">{data.name}</h3>
          <div>
            <div className="badge badge-primary badge-md my-2">Occupation</div>
            <p className="pb-4">{data.occupation}</p>
            <div className="badge badge-primary badge-md my-2">Interests</div>
            <p className="pb-4">{data.interests}</p>
            <p className="divider divider-secondary">Who is {data.name}?</p>
            <p className="pb-4">{data.intro}</p>
            <p className="divider divider-secondary">Pain Points</p>
            <p className="pb-4">{data.painpoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
