import { Link } from "wouter";
import { Package, Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 mt-auto relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                <Package className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Lakefront Global Logistic</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional, Bolt-style logistics platform offering real-time live tracking, secure payments, and reliable service across the city.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Same-day Delivery</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Scheduled Drops</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Enterprise Logistics</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Inter-city Freight</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support & Contact</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Become a Rider</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-1.5 rounded bg-white/5"><MapPin className="h-3.5 w-3.5" /></div> 
                120 Logistics Hub, NY 10001
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-1.5 rounded bg-white/5"><Phone className="h-3.5 w-3.5" /></div> 
                +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="p-1.5 rounded bg-white/5"><Mail className="h-3.5 w-3.5" /></div> 
                support@lakefront.global
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lakefront Global Logistic. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition-colors">Insurance Details</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}