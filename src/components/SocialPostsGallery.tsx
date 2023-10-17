import { useQuery } from "@tanstack/react-query";
import { SocialPostsResponse } from "../types";

export interface SocialPostsGalleryProps {
  entityId: string;
  entityName?: string;
}

const fetchSocialPosts = async (
  entityId: string,
  entityName?: string
): Promise<SocialPostsResponse> => {
  const response = await fetch(`/api/entity/${entityId}/posts`);
  const json = await response.json();
  return json;
};

const SocialPostsGallery = ({
  entityId,
  entityName,
}: SocialPostsGalleryProps) => {
  const { data, isLoading, error } = useQuery(["socialPosts", entityId], () =>
    fetchSocialPosts(entityId)
  );

  // creates a fake twitter handle from the entity name
  const formatHandle = (str: string): string => {
    return (
      "@" +
      str.replace(/\s+/g, "").replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="bg-gray-100 px-6 py-20 lg:px-8">
      {entityName && (
        <h3 className="text-center font-bold text-3xl">
          {formatHandle(entityName ? entityName : "Social Media")}{" "}
        </h3>
      )}
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 mt-6 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data?.response.posts.map((post) => (
          <li key={post.postId} className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                src={post.photoUrls[0]}
                alt=""
                className="pointer-events-none object-cover"
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-end">
                <p className="text-white font-bold text-lg p-4">{post.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialPostsGallery;
