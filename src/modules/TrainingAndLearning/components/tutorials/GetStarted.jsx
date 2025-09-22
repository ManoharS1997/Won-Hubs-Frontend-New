import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from "lucide-react";

const GetStartedWithWonhubs = () => {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="w-full h-fit md:w-7/9 mx-auto p-6 rounded-2xl bg-white overflow-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Getting Started with Won Hubs</h2>

      <div className="aspect-video">
        <iframe
          src="https://www.youtube.com/embed/Zt6GNAIoUsY?si=KEdmWjRZYadURdC9"
          title="Getting Started with Won Hubs"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <p className="text-base">
          Welcome to Won Hubs! This beginner-friendly walkthrough will guide you through signing up, navigating the platform, and exploring basic features.
        </p>
        <p className="text-base">
          Learn how to create your account, find your way around the dashboard, and make the most of Won Hubs’ core tools. By the end of this introduction, you’ll be ready to start your journey with Won Hubs.
        </p>

        <div className="mt-4">
          <p className="font-semibold mb-2">Was this introduction helpful?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setFeedback('yes')}
              className={`flex items-center gap-2 border rounded px-4 py-2 ${feedback === 'yes' ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
            >
              <ThumbsUp size={16} /> Yes
            </button>
            <button
              onClick={() => setFeedback('no')}
              className={`flex items-center gap-2 border rounded px-4 py-2 ${feedback === 'no' ? 'bg-red-600 text-white' : 'bg-white'
                }`}
            >
              <ThumbsDown size={16} /> No
            </button>
          </div>
          {feedback && (
            <p className="mt-2 text-green-600">
              Thanks for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStartedWithWonhubs;
