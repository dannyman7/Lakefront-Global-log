import { Layout } from "@/components/Layout";
import { TrackingMap } from "@/components/TrackingMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ShieldCheck, Phone, MessageSquare, Clock, CheckCircle2, Activity, MapPin, Navigation, Info, Star } from "lucide-react";
import { useRoute } from "wouter";
import { useStore } from "@/lib/mock-store";
import { useEffect, useState } from "react";

export default function Tracking() {
  const [, params] = useRoute("/tracking/:id");
  const orderId = params?.id || "LG-993A";
  const { orders, users } = useStore();
  
  const order = orders.find(o => o.id === orderId) || orders[0];
  const rider = users.find(u => u.id === order?.riderId);

  // Time since last update for live indicator
  const [timeAgo, setTimeAgo] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setTimeAgo(Math.floor((Date.now() - (order?.lastUpdate || Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(int);
  }, [order?.lastUpdate]);

  if (!order) {
    return <Layout><div className="container py-12 text-center text-white">Order not found.</div></Layout>;
  }

  const getStatusText = () => {
    switch(order.status) {
      case 'pending': return 'Looking for riders...';
      case 'accepted': return 'Rider is on the way to pickup';
      case 'in_transit': return 'Heading to destination';
      case 'delivered': return 'Package Delivered Successfully';
      default: return 'Processing';
    }
  };

  const getStatusColor = () => {
    switch(order.status) {
      case 'pending': return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
      case 'accepted': return 'text-blue-500 border-blue-500/30 bg-blue-500/10';
      case 'in_transit': return 'text-primary border-primary/30 bg-primary/10';
      case 'delivered': return 'text-white border-primary bg-primary';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 relative h-[50vh] md:h-auto border-b border-white/10 md:border-b-0 md:border-r">
          <TrackingMap 
            riderPos={order.riderCoords}
            pickupPos={order.pickupCoords}
            dropoffPos={order.dropoffCoords}
            pathTraveled={order.pathTraveled}
            riderHeading={order.riderHeading}
            vehicleType={order.vehicle}
            fitBounds={true}
            className="h-full w-full"
          />
          
          {/* Live Transmission Overlay */}
          <div className="absolute top-4 left-4 z-[400] glass-panel p-3 px-4 rounded-full flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <div className="radar-pulse w-3 h-3 bg-primary rounded-full shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Live Transmission</span>
              <span className="text-xs text-muted-foreground leading-none mt-1">Socket updated {timeAgo}s ago</span>
            </div>
            {order.status === 'in_transit' && (
              <div className="ml-2 pl-3 border-l border-white/10 flex items-center gap-2">
                <Activity className="h-4 w-4 text-white" />
                <span className="text-xs font-bold text-white">{order.riderSpeed} mph</span>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] glass-card px-6 py-3 rounded-full flex gap-6 border-white/10 shadow-2xl">
             <div className="flex items-center gap-2">
               <MapPin className="h-4 w-4 text-blue-500" />
               <span className="text-xs font-medium">Pickup</span>
             </div>
             <div className="flex items-center gap-2">
               <Navigation className="h-4 w-4 text-primary" />
               <span className="text-xs font-medium">Rider</span>
             </div>
             <div className="flex items-center gap-2">
               <MapPin className="h-4 w-4 text-red-500" />
               <span className="text-xs font-medium">Dropoff</span>
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-[450px] bg-background flex flex-col h-[50vh] md:h-auto overflow-y-auto custom-scrollbar relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">#{order.id}</h1>
                <p className="text-sm text-muted-foreground capitalize mt-1">Paid via {order.paymentMethod} • {order.fare}</p>
              </div>
              <Badge variant="outline" className={`py-1.5 px-3 rounded-full ${getStatusColor()}`}>
                {order.status.replace('_', ' ')}
              </Badge>
            </div>
            
            {/* ETA Card */}
            <div className="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Est. Arrival</p>
                <p className="text-2xl font-display font-bold text-white mt-1">12:45 PM</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</p>
                <p className="text-sm font-bold text-primary mt-1">{getStatusText()}</p>
              </div>
            </div>

            {/* Rider Card */}
            {rider ? (
              <div className="glass-card p-4 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="/assets/images/avatar-1.jpg" alt="Rider" className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
                      <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                        <div className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full flex items-center gap-0.5">
                          5.0 <Star className="h-2 w-2 fill-current" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{rider.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                        {order.vehicle} • LKF-129
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-primary/30 text-primary hover:bg-primary/20 hover:text-primary transition-all">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 text-xs text-muted-foreground border border-white/5">
                  <Info className="h-3.5 w-3.5 text-primary" /> Rider completes 98% of deliveries on time.
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center rounded-2xl border-white/5">
                <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-primary animate-spin mb-4"></div>
                <p className="font-medium text-white">Locating nearest rider...</p>
                <p className="text-xs text-muted-foreground mt-1">Usually takes under 30 seconds</p>
              </div>
            )}

            {/* OTP Section */}
            <div className="glass-panel p-5 rounded-2xl border-white/5">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Secure Delivery PIN</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Provide this to the rider to receive your package.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <InputOTP maxLength={4} value="4829" disabled className="gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-14 text-2xl font-display bg-black/50 border-white/10 text-white font-bold rounded-lg" />
                    <InputOTPSlot index={1} className="w-12 h-14 text-2xl font-display bg-black/50 border-white/10 text-white font-bold rounded-lg" />
                    <InputOTPSlot index={2} className="w-12 h-14 text-2xl font-display bg-black/50 border-white/10 text-white font-bold rounded-lg" />
                    <InputOTPSlot index={3} className="w-12 h-14 text-2xl font-display bg-black/50 border-white/10 text-white font-bold rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="relative pl-6 space-y-8 pt-4 pb-8">
              <div className="absolute left-[31px] top-6 bottom-4 w-0.5 bg-white/10"></div>
              
              <div className="relative flex gap-5">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 flex items-center justify-center z-10 shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-sm font-semibold text-white">Order Confirmed</p>
                  <p className="text-xs text-muted-foreground mt-1">10:42 AM</p>
                </div>
              </div>
              
              <div className={`relative flex gap-5 ${['pending'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-4 h-4 rounded-full z-10 shrink-0 mt-0.5 ${['accepted', 'in_transit', 'delivered'].includes(order.status) ? 'bg-primary ring-4 ring-primary/20' : 'bg-background border-2 border-white/20'}`}></div>
                <div>
                  <p className="text-sm font-semibold text-white">Rider Assigned</p>
                  <p className="text-xs text-muted-foreground mt-1">Heading to pickup</p>
                </div>
              </div>
              
              <div className={`relative flex gap-5 ${['pending', 'accepted'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-4 h-4 rounded-full z-10 shrink-0 mt-0.5 ${['in_transit', 'delivered'].includes(order.status) ? 'bg-primary ring-4 ring-primary/20' : 'bg-background border-2 border-white/20'}`}>
                  {order.status === 'in_transit' && <div className="absolute inset-0 rounded-full animate-ping bg-primary"></div>}
                </div>
                <div>
                  <p className={`text-sm font-bold ${order.status === 'in_transit' ? 'text-primary' : 'text-white'}`}>In Transit</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate max-w-[220px]">{order.pickup}</p>
                </div>
              </div>
              
              <div className={`relative flex gap-5 ${['pending', 'accepted', 'in_transit'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-4 h-4 rounded-full z-10 shrink-0 mt-0.5 ${order.status === 'delivered' ? 'bg-primary ring-4 ring-primary/20' : 'bg-background border-2 border-white/20'}`}></div>
                <div>
                  <p className="text-sm font-semibold text-white">Delivery</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate max-w-[220px]">{order.dropoff}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}