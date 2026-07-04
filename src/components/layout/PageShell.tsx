import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AmbientBlobs from "../background/AmbientBlobs";
import NoiseOverlay from "../background/NoiseOverlay";
import GridOverlay from "../background/GridOverlay";
import Spotlight from "../background/Spotlight";
import CookieConsent from "../ui/CookieConsent";
import { useMousePosition } from "../../hooks/useMousePosition";

export default function PageShell({ children }: { children: ReactNode }) {
  const mouse = useMousePosition();

  return (
    <div className="relative min-h-screen bg-background-base text-foreground">
      <AmbientBlobs />
      <GridOverlay />
      <NoiseOverlay />
      <Spotlight mouse={mouse} />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
