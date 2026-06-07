import { CosmicBackground } from "@/components/background/CosmicBackground";
import { GlowCursor } from "@/components/cursor/GlowCursor";
import { Navbar } from "@/components/navbar/Navbar";
import { ChoiceAndServices } from "@/components/sections/ChoiceAndServices";
import { Contact } from "@/components/sections/Contact";
import { Destinations } from "@/components/sections/Destinations";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { TestPreparation } from "@/components/sections/TestPreparation";
import { Universities } from "@/components/sections/Universities";
import { PageTransition } from "@/components/transitions/PageTransition";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { getSiteContent } from "@/lib/database";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <SmoothScrollProvider>
      <PageTransition>
        <CosmicBackground />
        <GlowCursor />
        <Navbar />
        <main>
          <Hero content={content.pageSections} />
          <Destinations destinations={content.destinationDetails} content={content.pageSections} />
          <ChoiceAndServices content={content.pageSections} />
          <Services services={content.services} content={content.pageSections} />
          <TestPreparation content={content.pageSections} />
          <Universities universities={content.universities} content={content.pageSections} />
          <Process timeline={content.timeline} content={content.pageSections} />
          <Testimonials testimonials={content.testimonials} content={content.pageSections} />
          <Gallery items={content.galleryItems} content={content.pageSections} />
          <Team members={content.teamMembers} content={content.pageSections} />
          <Contact
            destinations={content.destinationDetails}
            settings={content.websiteSettings}
            content={content.pageSections}
          />
        </main>
        <Footer settings={content.websiteSettings} content={content.pageSections} />
      </PageTransition>
    </SmoothScrollProvider>
  );
}
