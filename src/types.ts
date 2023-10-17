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

export interface YextResponse<T> {
  meta: {
    uuid: string;
    errors: unknown[];
  };
  response: T;
}

export type ReviewsResponse = {
  count: number;
  docs: {
    $key: {
      locale: string;
      primaryKey: string;
    };
    authorName: string;
    content: string;
    rating: number;
    reviewDate: string;
    entity: {
      id: string;
    };
  }[];
};
