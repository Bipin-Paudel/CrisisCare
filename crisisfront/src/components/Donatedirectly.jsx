import React from "react";
import { useParams } from "react-router-dom";

const Donatedirectly = () => {
  const params = useParams(); // Get URL parameters
  console.log("Params:", params); // Debugging line

  const requestId = params.requestId; // Extract requestId

  if (!requestId) {
    return <p className="text-red-500">Error: Request ID not found!</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          Donate to Request #{requestId}
        </h2>
        <p className="text-gray-700 mt-2">
          Your donation can make a difference! Click the button below to proceed.
        </p>

        <a
          href={`https://yourdonationplatform.com/donate?request_id=${requestId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Proceed to Donate
        </a>
      </div>
    </div>
  );
};

export default Donatedirectly;
