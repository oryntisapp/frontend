import { useState } from "react";
import Preloader from "../components/sections/Preloader";
import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Architecture from "../components/sections/Architecture";
import Pillars from "../components/sections/Pillars";
import DashboardPreview from "../components/sections/DashboardPreview";
import AutomationShowcase from "../components/sections/AutomationShowcase";
import Pricing from "../components/sections/Pricing";
import WhoItsFor from "../components/sections/WhoItsFor";
import Testimonials from "../components/sections/Testimonials";
import PlatformShowcase from "../components/sections/PlatformShowcase";
import FinalCTA from "../components/sections/FinalCTA";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
      <Hero preloaderDone={preloaderDone} />
      <TrustBar />
      <Architecture />
      <Pillars />
      <DashboardPreview />
      <AutomationShowcase />
      <Pricing />
      <WhoItsFor />
      <Testimonials />
      <PlatformShowcase />
      <FinalCTA />
    </>
  );
}
