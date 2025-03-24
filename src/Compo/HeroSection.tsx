import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
      <section
        className="w-full py-24 md:py-48 lg:py-64 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/d010k5HR/Flux-Dev-A-steamy-aromatic-cup-of-hot-coffee-stands-out-agains-0.jpg')",
        }}
      >
        <div className="container px-4 md:px-6">
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
  
          <div className="relative z-10 flex flex-col items-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Unleash Your <span className="text-primary">Super</span> Potential
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                Transform your ideas into reality with our powerful platform. Fast, reliable, and built for the future.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-white text-black">
                <Link to="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  