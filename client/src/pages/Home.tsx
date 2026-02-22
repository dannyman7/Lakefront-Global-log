import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Package, ShieldCheck, Clock, Star, Zap, Globe2 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container relative mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center z-10">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide border border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <Zap className="h-4 w-4" /> BOLT-STYLE LOGISTICS
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tighter text-white">
              Logistics at the speed of <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">business.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Lakefront Global Logistic delivers professional, secure, and real-time tracked packages across the city. Book a rider in seconds and monitor every mile live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/book">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all gap-2 bg-primary text-primary-foreground">
                  Send a Package <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/10 hover:bg-white/5 bg-black/40 backdrop-blur-sm text-white">
                  Admin Login
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-display font-bold text-white">Live</p>
                <p className="text-sm text-muted-foreground">Map Tracking</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <p className="text-3xl font-display font-bold text-white">10k+</p>
                <p className="text-sm text-muted-foreground">Active Fleet</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-3xl font-display font-bold text-white">4.9/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-right-8 duration-700 fade-in">
            <img 
              src="/assets/images/delivery-hero.jpg" 
              alt="Lakefront Delivery Professional" 
              className="object-cover w-full h-full filter brightness-75"
            />
            {/* Floating UI Elements */}
            <div className="absolute top-8 left-8 glass-panel p-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Live Status</p>
                <p className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  Out for delivery
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 glass-panel p-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <img src="/assets/images/avatar-1.jpg" alt="Rider" className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
              <div>
                <p className="font-bold text-white text-sm">Marcus J.</p>
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/40 to-background pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Professional standard in every detail.</h2>
            <p className="text-muted-foreground text-lg">Built for businesses and individuals who demand reliability, speed, and real-time transparency.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <Globe2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Fleet Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch your package move smoothly in real-time on our interactive dark map. Know exactly where your delivery is, down to the street.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure OTP Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Packages are only handed over after verifying the SMS/Email OTP. Digital proof of delivery with signature and photo included.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dynamic Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fair, transparent fare calculation based on real-time traffic and exact GPS distance. Pay via card, transfer, or wallet instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white drop-shadow-md">Ready to move?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium">
            Join thousands of businesses relying on Lakefront Global Logistic for their daily operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book">
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl hover:shadow-2xl transition-shadow bg-white text-primary">
                Book a Delivery
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg bg-black/20 border-white/30 hover:bg-black/40 text-white backdrop-blur-sm">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}