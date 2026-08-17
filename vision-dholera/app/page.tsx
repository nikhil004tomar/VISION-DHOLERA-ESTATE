import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
      <Hero />
      <WhyChooseUs/>
      <Gallery/>
      <Benefits />
      <Contact />
      </div>
      
    </>
  );
}
