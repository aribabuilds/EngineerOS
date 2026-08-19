import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Shipped from "@/components/sections/Shipped";
import FeaturedWork from "@/components/sections/FeaturedWork";
import MyPathSection from "@/components/sections/MyPathSection";
import Outro from "@/components/sections/Outro";
import { REPOS, QUANTUM_LIVE, AUTHOR_NAME } from "@/lib/site";

/** SoftwareSourceCode structured data for both featured repos (brief §9). */
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "BriefPilot",
      description:
        "Reads German official letters aloud from a photo. An in-development, local-first OCR pipeline.",
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
        <MyPathSection />
        <Outro />
      </main>
    </>
  );
}
