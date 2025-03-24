import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Unleash Your <span className="text-primary">Super</span> Potential
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transform your ideas into reality with our powerful platform. Fast, reliable, and built for the future.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

