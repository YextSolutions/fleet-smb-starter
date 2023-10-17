import { useQuery } from "@tanstack/react-query";
import { SocialPostsResponse } from "../types";
import SocialPost from "./SocialPost";

export interface SocialPostsGalleryProps {
  entityId: string;
}

const fetchSocialPosts = async (
  entityId: string
): Promise<SocialPostsResponse> => {
  const response = await fetch(`/api/entity/${entityId}/posts`);
  const json = await response.json();
  return json;
};

const SocialPostsGallery = ({ entityId }: SocialPostsGalleryProps) => {
  const { data, isLoading, error } = useQuery(["socialPosts", entityId], () =>
    fetchSocialPosts(entityId)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="social-posts-gallery">
      {data?.response.posts.map((post) => (
        <SocialPost key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default SocialPostsGallery;
