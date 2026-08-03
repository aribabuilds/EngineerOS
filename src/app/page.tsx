import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Shipped from "@/components/sections/Shipped";
import FeaturedWork from "@/components/sections/FeaturedWork";
import WorkWithAI from "@/components/sections/WorkWithAI";
import DecisionSection from "@/components/sections/DecisionSection";
import PathSection from "@/components/sections/PathSection";
import Contact from "@/components/sections/Contact";
import { REPOS, QUANTUM_LIVE, AUTHOR_NAME } from "@/lib/site";

/** SoftwareSourceCode structured data for both featured repos (brief §9). */
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "BriefPilot",
      description:
        "Reads German official letters aloud from a photo - an in-development, local-first OCR pipeline.",
      codeRepository: REPOS.briefpilot,
      programmingLanguage: ["Python", "TypeScript"],
      author: { "@type": "Person", name: AUTHOR_NAME },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Quantum Playground",
      description:
        "An interactive 3D playground for quantum states: qubits, gates, a Bell pair, and teleportation in real time.",
      codeRepository: REPOS.quantum,
      url: QUANTUM_LIVE,
      programmingLanguage: ["TypeScript", "GLSL"],
      author: { "@type": "Person", name: AUTHOR_NAME },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Shipped />
        <FeaturedWork />
        <WorkWithAI />
        <DecisionSection />
        <PathSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
