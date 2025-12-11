"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="m-12 p-12 text-white">
      <h2 className="text-3xl">Something went wrong!</h2>
      <p className="p-2">
        you need to configure your environment variables , check the readme.md
      </p>
      <p className="p-2">
        process.env.MAPBOX_API_KEY, process.env.UNPLASH_ACCESS_KEY,
        process.env.AIRTABLE_API_TOKEN
        {/* The environment varibales are MAPBOX_API_KEY, UNPLASH_ACCESS_KEY,
        AIRTABLE_API_TOKEN. create these enviroment varibales with values inside
        env.local file */}
      </p>
      <button onClick={() => reset()}>try again</button>
      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  );
}
