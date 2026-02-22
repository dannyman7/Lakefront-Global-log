import { Link, useLocation } from "wouter";
import { 
  Package, 
  MapPin, 
  LayoutDashboard, 
  Menu, 
  X,
  CreditCard,
  History,
  Settings,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Package },
    { href: "/book", label: "Book Delivery", icon: MapPin },
    { href: "/tracking/demo", label: "Live Tracking", icon: MapPin },
    { href: "/admin", label: "Admin Panel", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Lakefront Global</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {link.label}
                </a>
              </Link>
            );
          })}
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">Sign In</Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}>
                  <a 
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </a>
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </Button>
              <Button className="w-full">Sign In</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}