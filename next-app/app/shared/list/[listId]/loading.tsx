import Spinner from "@/app/components/Spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">Loading shared list...</p>
      </div>
    </div>
  );
}
