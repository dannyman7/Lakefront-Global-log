import { Layout } from "@/components/Layout";
import { TrackingMap } from "@/components/TrackingMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ShieldCheck, Phone, MessageSquare, Star, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useStore } from "@/lib/mock-store";

export default function Tracking() {
  const [, params] = useRoute("/tracking/:id");
  const orderId = params?.id || "LG-993A";
  const { orders, users } = useStore();
  
  const order = orders.find(o => o.id === orderId) || orders[0];
  const rider = users.find(u => u.id === order?.riderId);

  // Simulated Rider Movement
  const [riderPos, setRiderPos] = useState<[number, number]>(order?.riderCoords || [40.7128, -74.0060]);
  const pickupPos = order?.pickupCoords || [40.7050, -74.0150];
  const dropoffPos = order?.dropoffCoords || [40.7580, -73.9855];

  useEffect(() => {
    if (!order || order.status !== 'in_transit') return;

    // Interpolate movement towards dropoff if status is in_transit
    let t = 0;
    const interval = setInterval(() => {
      t += 0.005; // speed
      if (t > 1) t = 1;
      
      const newLat = pickupPos[0] + (dropoffPos[0] - pickupPos[0]) * t;
      const newLng = pickupPos[1] + (dropoffPos[1] - pickupPos[1]) * t;
      
      setRiderPos([newLat, newLng]);
      
      if (t === 1) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, [order?.status, pickupPos, dropoffPos]);

  if (!order) {
    return <Layout><div className="container py-12 text-center">Order not found.</div></Layout>;
  }

  const getStatusText = () => {
    switch(order.status) {
      case 'pending': return 'Finding a rider...';
      case 'accepted': return 'Rider assigned, heading to pickup';
      case 'in_transit': return 'Package picked up, in transit';
      case 'delivered': return 'Package Delivered';
      default: return 'Processing';
    }
  };

  const getStatusBadge = () => {
    switch(order.status) {
      case 'pending': return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Finding Rider</Badge>;
      case 'accepted': return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Heading to Pickup</Badge>;
      case 'in_transit': return <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/20">In Transit</Badge>;
      case 'delivered': return <Badge className="bg-primary text-primary-foreground">Delivered</Badge>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Map Area */}
        <div className="flex-1 relative h-[50vh] md:h-auto border-r border-b md:border-b-0">
          <TrackingMap 
            riderPos={riderPos}
            pickupPos={pickupPos}
            dropoffPos={dropoffPos}
            className="rounded-none border-0"
          />
          <div className="absolute top-4 left-4 z-[400] bg-card p-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              {order.status === 'in_transit' && <div className="live-dot w-3 h-3 bg-secondary rounded-full"></div>}
              {order.status === 'delivered' && <CheckCircle2 className="w-5 h-5 text-primary" />}
              {order.status === 'pending' && <Clock className="w-5 h-5 text-amber-500 animate-pulse" />}
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
                <p className="font-bold text-sm">{getStatusText()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-background flex flex-col h-[50vh] md:h-auto overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-display font-bold">Tracking #{order.id}</h1>
                <p className="text-sm text-muted-foreground capitalize">Payment: {order.paymentMethod} • {order.fare}</p>
              </div>
              {getStatusBadge()}
            </div>

            {/* Rider Card */}
            {rider ? (
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="/assets/images/avatar-1.jpg" alt="Rider" className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                      <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                        <div className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full">4.9</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{rider.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{order.vehicle} • LKF-129</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10 text-primary hover:text-primary hover:bg-primary/10">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="rounded-full h-10 w-10">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 flex items-center justify-center text-muted-foreground text-sm">
                  Searching for nearest available rider...
                </CardContent>
              </Card>
            )}

            {/* OTP Section */}
            <div className="bg-muted p-5 rounded-2xl border">
              <div className="flex items-start gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Secure Delivery PIN</h3>
                  <p className="text-xs text-muted-foreground">Provide this to the rider to receive your package.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <InputOTP maxLength={4} value="4829" disabled className="gap-2">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-14 text-2xl font-display bg-background border-muted-foreground/30 font-bold" />
                    <InputOTPSlot index={1} className="w-12 h-14 text-2xl font-display bg-background border-muted-foreground/30 font-bold" />
                    <InputOTPSlot index={2} className="w-12 h-14 text-2xl font-display bg-background border-muted-foreground/30 font-bold" />
                    <InputOTPSlot index={3} className="w-12 h-14 text-2xl font-display bg-background border-muted-foreground/30 font-bold" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="relative pl-4 space-y-6 pt-2 pb-8">
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-border border-l-2"></div>
              
              <div className="relative flex gap-4">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Order Confirmed</p>
                  <p className="text-xs text-muted-foreground">Waiting for rider</p>
                </div>
              </div>
              
              <div className={`relative flex gap-4 ${['pending'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 shrink-0 ${['accepted', 'in_transit', 'delivered'].includes(order.status) ? 'bg-primary' : 'border-2 bg-background'}`}>
                  {['accepted', 'in_transit', 'delivered'].includes(order.status) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">Rider Assigned</p>
                  <p className="text-xs text-muted-foreground">Heading to pickup</p>
                </div>
              </div>
              
              <div className={`relative flex gap-4 ${['pending', 'accepted'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 shrink-0 ${['in_transit', 'delivered'].includes(order.status) ? 'bg-primary' : 'border-2 bg-background'}`}>
                  {order.status === 'in_transit' && <div className="w-2 h-2 rounded-full bg-secondary live-dot"></div>}
                  {order.status === 'delivered' && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">In Transit</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{order.pickup}</p>
                </div>
              </div>
              
              <div className={`relative flex gap-4 ${['pending', 'accepted', 'in_transit'].includes(order.status) ? 'opacity-50' : ''}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 shrink-0 ${order.status === 'delivered' ? 'bg-primary border-primary' : 'bg-background'}`}>
                  {order.status === 'delivered' && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">Delivery</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{order.dropoff}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}