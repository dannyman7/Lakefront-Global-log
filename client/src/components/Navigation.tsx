import { Link, useLocation } from "wouter";
import { 
  Package, 
  MapPin, 
  LayoutDashboard, 
  Menu, 
  X,
  Bell,
  LogOut,
  User as UserIcon,
  Headset
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/mock-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useStore();

  const links = [
    { href: "/", label: "Home", icon: Package },
    { href: "/book", label: "Book Delivery", icon: MapPin },
    { href: "/support", label: "Support", icon: Headset },
  ];

  if (user?.role === 'admin') {
    links.push({ href: "/admin", label: "Admin Panel", icon: LayoutDashboard });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 glass-panel">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Lakefront Global Logistic</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-all hover:text-primary ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-muted-foreground'}`}>
                  {link.label}
              </Link>
            );
          })}
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 rounded-full px-4 border-primary/30 bg-primary/10 hover:bg-primary/20 hover:text-primary transition-all">
                      <UserIcon className="h-4 w-4" />
                      <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-white/10">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="flex justify-between">
                      Wallet Balance <span className="font-bold text-primary">${user.walletBalance?.toFixed(2) || '0.00'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button className="rounded-full px-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all bg-primary text-primary-foreground">Sign In</Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-white/5" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl absolute w-full shadow-2xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} 
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="p-4 bg-muted/50 rounded-xl flex justify-between items-center border border-white/5">
                    <span className="font-medium text-white">{user.name}</span>
                    <span className="font-bold text-primary">${user.walletBalance?.toFixed(2) || '0.00'}</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => { logout(); setIsOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,197,94,0.3)]" onClick={() => setIsOpen(false)}>Sign In</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}