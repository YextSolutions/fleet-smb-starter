export interface SocialPost {
  postId: string;
  entityIds: string[];
  publishers: string[];
  text: string;
  photoUrls: string[];
  createdDate: string;
  postDate: string;
  postCreatedInYext: boolean;
  entityPosts: {
    entityPostId: string;
    entity: {
      id: string;
    };
    publisher: string;
    status: {
      status: string;
    };
    metrics: Record<string, unknown>;
    comments: unknown[];
  }[];
}

export interface SocialPostsResponse {
  meta: {
    uuid: string;
    errors: unknown[];
  };
  response: {
    posts: SocialPost[];
  };
}
