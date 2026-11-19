
import ServiceCard from "@/components/services/ServiceCard";
import EmptyState from "@/components/shared/EmptyState";

export default function ServiceGrid({ services = [] }) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="No Services Found"
        description="Try changing your search or filters to find wedding services."
      />
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}
