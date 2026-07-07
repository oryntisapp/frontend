import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import Architecture from "../components/sections/Architecture";
import Pillars from "../components/sections/Pillars";
import DashboardPreview from "../components/sections/DashboardPreview";
import AutomationShowcase from "../components/sections/AutomationShowcase";
import Pricing from "../components/sections/Pricing";
import FAQ from "../components/sections/FAQ";
import WhoItsFor from "../components/sections/WhoItsFor";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
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
      <About />
      <Testimonials />
      <Contact />
      <PlatformShowcase />
      <FinalCTA />
    </>
  );
}
