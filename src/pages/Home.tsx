import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Architecture from "../components/sections/Architecture";
import Pillars from "../components/sections/Pillars";
import DashboardPreview from "../components/sections/DashboardPreview";
import AutomationShowcase from "../components/sections/AutomationShowcase";
import Pricing from "../components/sections/Pricing";
import FAQ from "../components/sections/FAQ";
import WhoItsFor from "../components/sections/WhoItsFor";
import Testimonials from "../components/sections/Testimonials";
import PlatformShowcase from "../components/sections/PlatformShowcase";
import FinalCTA from "../components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero preloaderDone={true} />
      <TrustBar />
      <Architecture />
      <Pillars />
      <DashboardPreview />
      <AutomationShowcase />
      <Pricing />
      <FAQ />
      <WhoItsFor />
      <Testimonials />
      <PlatformShowcase />
      <FinalCTA />
    </>
  );
}
