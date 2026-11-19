
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// import ServiceCard from "@/components/services/ServiceCard";
// import LoadingSpinner from "@/components/shared/LoadingSpinner";
// import EmptyState from "@/components/shared/EmptyState";
// import ErrorState from "@/components/shared/ErrorState";

// const FeaturedServices = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchServices = async () => {
//     try {
//       setLoading(true);
//       setError(false);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/services/featured`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to load services");
//       }

//       const data = await response.json();

//       setServices(data.services || []);
//     } catch (err) {
//       console.error(err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//  useEffect(() => {
//   const loadServices = async () => {
//     await fetchServices();
//   };

//   loadServices();
// }, []);

//   return (
//     <section className="bg-white py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Section Heading */}
//         <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//           <div>
//             <p className="font-semibold uppercase tracking-widest text-pink-600">
//               Discover Our Services
//             </p>

//             <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
//               Featured Wedding Services
//             </h2>

//             <p className="mt-3 max-w-xl text-gray-500">
//               Find the perfect professionals to make your
//               special day truly unforgettable.
//             </p>
//           </div>

//           <Link
//             href="/browse-services"
//             className="inline-flex items-center gap-2 font-semibold text-pink-600 transition hover:text-pink-700"
//           >
//             View All Services
//             <ArrowRight size={18} />
//           </Link>
//         </div>

//         {/* Services */}
//         {loading ? (
//           <LoadingSpinner message="Loading featured services..." />
//         ) : error ? (
//           <ErrorState
//             title="Unable to load services"
//             message="Please try again."
//             onRetry={fetchServices}
//           />
//         ) : services.length === 0 ? (
//           <EmptyState
//             title="No featured services yet"
//             description="Our featured wedding services will appear here soon."
//           />
//         ) : (
//           <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
//             {services.slice(0, 6).map((service) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedServices;
