import { DestinationCard } from "@/components/cards/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countryDestinations, pageSections } from "@/data/site";
import type { Destination, PageSectionContent } from "@/types";

export function Destinations({
  destinations = countryDestinations,
  content = pageSections,
}: {
  destinations?: Destination[];
  content?: PageSectionContent;
}) {
  return (
    <section id="destinations" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.destinationsEyebrow}
          title={content.destinationsTitle}
          description={content.destinationsDescription}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((destination, index) => (
            <DestinationCard
              key={destination.country}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
