import { Layout } from "@/components/Layout";
import { TrackingMap } from "@/components/TrackingMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ShieldCheck, Phone, MessageSquare, Star, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Tracking() {
  // Simulated Rider Movement
  const [riderPos, setRiderPos] = useState<[number, number]>([40.7128, -74.0060]);
  const pickupPos: [number, number] = [40.7050, -74.0150];
  const dropoffPos: [number, number] = [40.7580, -73.9855];

  useEffect(() => {
    // Interpolate movement towards dropoff
    let t = 0;
    const interval = setInterval(() => {
      t += 0.002;
      if (t > 1) t = 0;
      
      const newLat = 40.7128 + (dropoffPos[0] - 40.7128) * t;
      const newLng = -74.0060 + (dropoffPos[1] - -74.0060) * t;
      
      setRiderPos([newLat, newLng]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

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
              <div className="live-dot w-3 h-3 bg-secondary rounded-full"></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Live Status</p>
                <p className="font-bold">Heading to destination</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-background flex flex-col h-[50vh] md:h-auto overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-display font-bold">Tracking #LG-993A</h1>
                <p className="text-sm text-muted-foreground">Arriving in approx. 12 mins</p>
              </div>
              <Badge variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30 text-xs py-1">In Transit</Badge>
            </div>

            {/* Rider Card */}
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
                    <h3 className="font-semibold">Marcus J.</h3>
                    <p className="text-xs text-muted-foreground">Honda PCX • LKF-129</p>
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
            <div className="relative pl-4 space-y-6 pt-2">
              <div className="absolute left-[23px] top-2 bottom-8 w-0.5 bg-border border-l-2"></div>
              
              <div className="relative flex gap-4">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Order Confirmed</p>
                  <p className="text-xs text-muted-foreground">10:42 AM</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10 shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Package Picked Up</p>
                  <p className="text-xs text-muted-foreground">10:55 AM • 120 Logistics Hub, NY</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-secondary bg-background flex items-center justify-center z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-secondary live-dot"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">In Transit</p>
                  <p className="text-xs text-muted-foreground">Heading to destination</p>
                </div>
              </div>
              
              <div className="relative flex gap-4 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center z-10 shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold">Delivery</p>
                  <p className="text-xs text-muted-foreground">Est. 11:15 AM</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}