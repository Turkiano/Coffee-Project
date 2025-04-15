import AboutMeSection from "@/Compo/AboutMeSection";
import { NavBar } from "@/Compo/NavBar";
import { useState } from "react";

export function AboutUs() {
  const [searchBy, setSearchBy] = useState("");

  return (
    <>
      <div className="aboutUs-container">
        <NavBar searchBy={searchBy} setSearchBy={setSearchBy} />{" "}
        <AboutMeSection />
      </div>
    </>
  );
}
