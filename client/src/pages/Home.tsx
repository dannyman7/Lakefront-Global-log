import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Package, ShieldCheck, Clock, Star, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="container relative mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" /> Instant Booking
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tighter">
              Logistics at the speed of <span className="text-primary">business.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Lakefront Global delivers professional, secure, and real-time tracked packages across the city. Book a rider in seconds and monitor every mile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/book">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all gap-2">
                  Send a Package <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tracking/demo">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg">
                  Track Delivery
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-8 border-t border-muted">
              <div>
                <p className="text-3xl font-display font-bold text-foreground">Under 2s</p>
                <p className="text-sm text-muted-foreground">Booking Speed</p>
              </div>
              <div className="w-px h-12 bg-muted"></div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Active Riders</p>
              </div>
              <div className="w-px h-12 bg-muted hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-3xl font-display font-bold text-foreground">4.9/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border animate-in slide-in-from-right-8 duration-700 fade-in">
            <img 
              src="/assets/images/delivery-hero.jpg" 
              alt="Lakefront Delivery Professional" 
              className="object-cover w-full h-full"
            />
            {/* Floating UI Elements */}
            <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Out for delivery
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border flex items-center gap-4">
              <img src="/assets/images/avatar-1.jpg" alt="Rider" className="w-12 h-12 rounded-full object-cover border-2 border-background" />
              <div>
                <p className="font-semibold text-sm">Marcus J.</p>
                <div className="flex text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Professional standard in every detail.</h2>
            <p className="text-muted-foreground text-lg">Built for businesses and individuals who demand reliability, speed, and transparency.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live GPS Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch your package move smoothly in real-time on our interactive map. Know exactly where your delivery is, down to the street.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure OTP Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Packages are only handed over after verifying the SMS/Email OTP. Digital proof of delivery with signature and photo included.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Dynamic Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fair, transparent fare calculation based on real-time traffic and exact GPS distance. Pay via card, transfer, or USSD instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to move?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of businesses relying on Lakefront Global for their daily logistics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-semibold">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}