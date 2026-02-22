import { Link, useLocation } from "wouter";
import { 
  Package, 
  MapPin, 
  LayoutDashboard, 
  Menu, 
  X,
  Bell,
  LogOut,
  User as UserIcon
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
  ];

  // Add admin link if user is admin
  if (user?.role === 'admin') {
    links.push({ href: "/admin", label: "Admin Panel", icon: LayoutDashboard });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Lakefront Global</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {link.label}
              </Link>
            );
          })}
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 rounded-full px-4 border-primary/20 bg-primary/5">
                      <UserIcon className="h-4 w-4" />
                      <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex justify-between">
                      Wallet Balance <span className="font-bold text-primary">${user.walletBalance?.toFixed(2) || '0.00'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">Sign In</Button>
              </Link>
            )}
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
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl absolute w-full">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} 
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t flex flex-col gap-3">
              {user ? (
                <>
                  <div className="p-3 bg-muted rounded-lg flex justify-between items-center">
                    <span className="font-medium">{user.name}</span>
                    <span className="font-bold text-primary">${user.walletBalance?.toFixed(2) || '0.00'}</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => { logout(); setIsOpen(false); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="w-full" onClick={() => setIsOpen(false)}>Sign In</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}