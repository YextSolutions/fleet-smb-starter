import { useQuery } from "@tanstack/react-query";
import Stars from "./Stars";
import { formatDate } from "../utils";
import { ReviewsResponse, YextResponse } from "../types";
import ReviewSubmissionForm from "./ReviewSubmissionForm";
import { useState } from "react";

export type ReviewSort =
  | "reviewDateDesc"
  | "reviewDateAsc"
  | "ratingDesc"
  | "ratingAsc";

const reviewSortOptions: Record<ReviewSort, { key: string; value: string }> = {
  reviewDateDesc: {
    key: "$sortBy__desc",
    value: "reviewDate",
  },
  reviewDateAsc: {
    key: "$sortBy__asc",
    value: "reviewDate",
  },
  ratingDesc: {
    key: "$sortBy__desc",
    value: "rating",
  },
  ratingAsc: {
    key: "$sortBy__asc",
    value: "rating",
  },
};

const fetchReviews = async (
  entityId: string,
  rating?: number,
  reviewDate?: string
): Promise<YextResponse<ReviewsResponse>> => {
  try {
    const reviewsResp = await fetch(
      `https://cdn.yextapis.com/v2/accounts/me/content/reviews?api_key=${YEXT_PUBLIC_YEXT_API_KEY}&v=20231013&entity.id=${entityId}`
    );

    if (!reviewsResp.ok) {
      throw new Error(`Failed to fetch reviews: ${reviewsResp.status}`);
    }

    const reviewsJson = await reviewsResp.json();

    return reviewsJson;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to fetch reviews: ${error}`);
  }
};

export interface ReviewsProps {
  entityId: string;
}

const REVIEW_LIMIT = 5;

const ReviewsSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
            <div className="flex items-center xl:col-span-1">
              <div className="flex items-center">
                {/* Skeleton for Stars */}
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
              {/* Skeleton for Review Content */}
              <div className="mt-3 space-y-6 h-20 w-full bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
            {/* Skeleton for Author Name */}
            <div className="w-32 h-4 mb-2 bg-gray-300 rounded"></div>
            {/* Skeleton for Date */}
            <div className="w-20 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const Reviews = ({ entityId }: ReviewsProps) => {
  const [showReviewSubmissionForm, setShowReviewSubmissionForm] =
    useState(false);

  const { data, isLoading } = useQuery(["reviews", entityId], () =>
    fetchReviews(entityId)
  );

  return (
    <>
      <div className="bg-gray-100">
        <div className=" px-6 py-20 mx-auto lg:px-8 max-w-2xl lg:max-w-7xl">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium text-gray-900">
              Recent reviews
            </h2>
            <div className="lg:col-span-4">
              <h3 className="text-lg font-medium text-gray-900">
                Share your thoughts
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Share your thoughts with other customers
              </p>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                onClick={() => setShowReviewSubmissionForm(true)}
              >
                Write a review
              </button>
              <ReviewSubmissionForm
                entityId={entityId}
                open={showReviewSubmissionForm}
                setOpen={setShowReviewSubmissionForm}
              />
            </div>
          </div>
          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
            {isLoading ? (
              <ReviewsSkeleton />
            ) : (
              data?.response.docs.map((review) => (
                <div
                  key={review.$key.primaryKey}
                  className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                >
                  <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                    <div className="flex items-center xl:col-span-1">
                      <div className="flex items-center">
                        <Stars rating={review.rating} />
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                      <p className="mt-3 space-y-6 text-sm text-gray-500">
                        {review.content}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                    <p className="font-medium text-gray-900">
                      {review.authorName}
                    </p>
                    <time
                      dateTime={review.reviewDate}
                      className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                    >
                      {formatDate(review.reviewDate)}
                    </time>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
