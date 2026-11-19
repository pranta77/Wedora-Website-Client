
import Link from "next/link";
import { MapPin, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";

const ServiceCard = ({ service }) => {
  const {
    _id,
    serviceName,
    category,
    price,
    location,
    images,
  } = service;

  return (
    <div className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Service Image */}
      <div className="relative h-56 overflow-hidden bg-pink-50">
        <Image
          src={images?.[0] || "/images/services/placeholder.jpg"}
          alt={serviceName}
          width={600}
          height={500}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-pink-600 shadow-sm">
          {category}
        </span>
      </div>

      {/* Service Information */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">
          {serviceName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} className="text-pink-500" />
          {location}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="mt-1 flex items-center gap-1 font-bold text-pink-600">
              <Tag size={15} />
              ৳{Number(price).toLocaleString("en-BD")}
            </p>
          </div>

          <Link
            href={`/services/${_id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-pink-50 px-4 py-2.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-600 hover:text-white"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
