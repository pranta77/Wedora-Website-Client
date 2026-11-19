
// "use client";

// import { useEffect } from "react";
// import { AlertTriangle, RefreshCw } from "lucide-react";

// export default function Error({ error, reset }) {
//   useEffect(() => {
//     console.error("Wedora Error:", error);
//   }, [error]);

//   return (
//     <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFF9FB] px-5 text-center">
//       <div className="rounded-full bg-red-100 p-6 text-red-600">
//         <AlertTriangle size={45} />
//       </div>

//       <h1 className="mt-6 text-3xl font-bold text-gray-900">
//         Oops! Something went wrong.
//       </h1>

//       <p className="mt-3 max-w-md text-gray-500">
//         We encountered an unexpected problem.
//         Please try again.
//       </p>

//       <button
//         onClick={() => reset()}
//         className="mt-7 flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
//       >
//         <RefreshCw size={18} />
//         Try Again
//       </button>
//     </div>
//   );
// }
