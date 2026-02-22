import { Link } from "wouter";
import { Package, Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Package className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">Lakefront Global</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional logistics and delivery platform offering real-time tracking, secure payments, and reliable service across the city.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Same-day Delivery</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Scheduled Drops</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Enterprise Logistics</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Inter-city Freight</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Become a Rider</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Partner Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" /> 120 Logistics Hub, NY 10001
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" /> +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" /> support@lakefront.global
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Lakefront Global Logistics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Insurance Details</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}