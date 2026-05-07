import Hero3D from "@/components/Hero3D";
import AboutMeSection from "@/components/AboutMeSection";
import MasonryGallery from "@/components/MasonryGallery";
import Distinctions from "@/components/Distinctions";
import AccoladesSection from "@/components/AccoladesSection";
import ContactMe from "@/components/ContactMe";
import Dock from "@/components/Dock";
import ScrollIndicator from "@/components/ScrollIndicator";

const sampleProjects = Array.from({ length: 23 }, (_, i) => {
  const num = i + 1;
  const ext = num >= 13 && num <= 22 ? "jpeg" : "jpg";
  return {
    id: `gall${num}`,
    img: `/assets/gall${num}.${ext}`,
    size: num % 5 === 1 ? ("featured" as const) : ("standard" as const),
  };
});

export default function Home() {
  return (
    <main className="stacking-gallery">
      <Hero3D />
      <AboutMeSection />
      <MasonryGallery projects={sampleProjects} />
      <Distinctions />
      <AccoladesSection />
      <ContactMe />
      <Dock />
      <ScrollIndicator />
    </main>
  );
}
