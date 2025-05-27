import prisma from "../../../prisma/client";

const AdminMediaPage = async () => {
  const resources = await prisma.post.findMany();

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Medias</h1>
      <div className="flex flex-wrap gap-4 ">
        {resources.map((resource) => (
          <div className="h-full w-[200px] relatvie" key={resource.id}>
            <img
              src={resource.imageUrl}
              alt="post thumbnail"
              className="w-72 h-56 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaPage;
