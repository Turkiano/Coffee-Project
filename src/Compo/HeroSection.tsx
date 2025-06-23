import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="w-full flex justify-center py-24 md:py-48 lg:py-64 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/TYGChPwG/Flux-Dev-A-warm-and-inviting-image-of-three-happy-Saudi-female-2.jpg')",
      }}
    >
      <div className="container px-4 md:px-6">
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center space-y-4 text-center text-white">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              BEHIND THE <span className="text-primary">COFFEE</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl">
              Reserve your spot now and treat yourself to the rich aromas,
              handcrafted drinks, and warm ambiance that make every visit
              unforgettable!
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-white text-black">
              <Link to="/reservation">Save Your Seat</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
