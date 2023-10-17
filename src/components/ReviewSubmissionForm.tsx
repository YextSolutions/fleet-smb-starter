import { Fragment, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import FormTextArea from "./FormTextArea";
import FormInput from "./FormInput";
import { twMerge } from "tailwind-merge";
// import StarRatingInput from "../StarRatingInput";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { CgSpinner } from "react-icons/cg";

type ReviewSubmission = {
  entity: {
    id: string;
  };
  authorName: string;
  authorEmail: string;
  title: string;
  rating: number;
  content: string;
  status: "LIVE" | "QUARANTINED" | "REMOVED";
  date: string;
};

const submitReview = async (review: ReviewSubmission) => {
  const response = await fetch(
    `https://liveapi.yext.com/v2/accounts/me/reviewSubmission?api_key=${YEXT_PUBLIC_REVIEW_SUBMISSION_API_KEY}&v=20221113`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  return response.json();
};

type ReviewSubmissionFormProps = {
  entityId: string;
  entityName?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ReviewSubmissionForm = ({
  entityId,
  entityName,
  open,
  setOpen,
}: ReviewSubmissionFormProps) => {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [formReady, setFormReady] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (
      authorName &&
      authorEmail &&
      validateEmail(authorEmail) &&
      title &&
      // content &&
      rating > 0
    ) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
  }, [authorName, authorEmail, title, content, rating]);

  // TODO: Make it so this is only requested once
  const reviewSubmissionMutation = useMutation({
    mutationFn: submitReview,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review: ReviewSubmission = {
      entity: {
        id: entityId,
      },
      authorName,
      authorEmail,
      title,
      rating,
      content,
      status: "LIVE",
      date: new Date().toISOString(),
    };
    reviewSubmissionMutation.mutate(review);
  };

  useEffect(() => {
    if (reviewSubmissionMutation.isSuccess) {
      // close modal after half a second
      setTimeout(() => {
        setAuthorName("");
        setAuthorEmail("");
        setTitle("");
        setRating(0);
        setContent("");
        setOpen(false);
        // reset mutation after 400 ms
        setTimeout(() => {
          reviewSubmissionMutation.reset();
        }, 400);
      }, 750);
    }
  }, [reviewSubmissionMutation.status]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div>
                {(reviewSubmissionMutation.isIdle ||
                  reviewSubmissionMutation.isLoading) && (
                  <form
                    id="reviewSubmissionForm"
                    action="#"
                    method="POST"
                    className="px-6 lg:px-12 bg-white py-8 rounded-lg"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex justify-between">
                      <h1 className="text-left text-2xl text-gray-900 font-semibold">
                        Create a Review
                      </h1>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-500"
                        onClick={() => setOpen(false)}
                      >
                        <XMarkIcon className="h-8 w-8" />
                      </button>
                    </div>
                    <div className="flex py-4 border-b-2 my-4">
                      <p className="text-gray-900 text-sm ">{entityName}</p>
                    </div>
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                        {/* <StarRatingInput
                          id="Rating"
                          value={rating}
                          onChange={(value) => setRating(value)}
                        /> */}
                        <FormInput
                          id="authorName"
                          customCssClasses={{
                            formInputContainer: "sm:col-span-2",
                          }}
                          label="Name"
                          required
                          value={authorName}
                          onChange={(value) => setAuthorName(value)}
                        />
                        <FormInput
                          id="authorEmail"
                          customCssClasses={{
                            formInputContainer: "sm:col-span-2",
                          }}
                          label="Email"
                          invalidMessage="Please enter a valid email address."
                          validation={validateEmail}
                          value={authorEmail}
                          onChange={(value) => setAuthorEmail(value)}
                          required
                        />
                        <FormInput
                          id="title"
                          customCssClasses={{
                            formInputContainer: "sm:col-span-2",
                          }}
                          label="Title"
                          required
                          value={title}
                          onChange={(value) => setTitle(value)}
                        />
                        <FormTextArea
                          id="content"
                          customCssClasses={{
                            formTextAreaContainer: "sm:col-span-2",
                          }}
                          label="Review"
                          value={content}
                          onChange={(value) => setContent(value)}
                        />
                      </div>
                      <div className="mt-8 flex justify-end">
                        <button
                          type="submit"
                          className={twMerge(
                            "rounded-md bg-sky-400 px-3.5 py-2.5 w-40 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700",
                            formReady
                              ? "cursor-pointer hover:bg-sky-700"
                              : "cursor-not-allowed opacity-50"
                          )}
                          disabled={!formReady}
                          form={"reviewSubmissionForm"}
                        >
                          {reviewSubmissionMutation.isLoading ? (
                            <CgSpinner className="h-5 w-5 animate-spin text-white mx-auto" />
                          ) : (
                            "Submit Review"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {reviewSubmissionMutation.isSuccess && (
                  <div className="px-6 lg:px-12 bg-white py-8 rounded-lg w-96 pt-12">
                    <p className="text-2xl text-gray-900 font-semibold">
                      Review Submitted
                    </p>
                    <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto my-4" />
                    <p className="text-gray-900 text-sm ">
                      Thank you for your review!
                    </p>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReviewSubmissionForm;
