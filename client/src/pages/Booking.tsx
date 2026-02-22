import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Navigation2, PackageSearch, CreditCard, ChevronRight, Loader2, ArrowRight, Wallet, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/mock-store";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const [, setLocation] = useLocation();
  const { user, createOrder } = useStore();
  const { toast } = useToast();
  
  const [vehicle, setVehicle] = useState("bike");
  const [pickup, setPickup] = useState("120 Logistics Hub, NY 10001");
  const [dropoff, setDropoff] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please sign in to book a delivery." });
      setLocation('/auth');
    }
  }, [user, setLocation, toast]);

  const getFare = () => {
    switch(vehicle) {
      case 'bike': return "$12.50";
      case 'car': return "$24.00";
      case 'van': return "$45.00";
      case 'truck': return "$85.00";
      default: return "$12.50";
    }
  };

  const handleBook = async () => {
    if (!dropoff) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a dropoff location." });
      return;
    }

    setIsProcessing(true);
    try {
      const orderId = await createOrder({
        pickup,
        dropoff,
        vehicle,
        fare: getFare(),
        paymentMethod
      });
      toast({ title: "Payment Successful", description: "Connecting to a rider..." });
      // Bolt-like auto navigate to tracking
      setLocation(`/tracking/${orderId}`);
    } catch (error) {
      toast({ variant: "destructive", title: "Booking Failed", description: "Something went wrong." });
      setIsProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] relative flex items-center justify-center">
        {/* Background Map Simulation for Bolt feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <img src="/assets/images/map-bg.jpg" alt="Map" className="w-full h-full object-cover filter grayscale sepia brightness-50" />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50"></div>
        </div>

        <div className="container px-4 py-12 relative z-10 w-full max-w-lg">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8 shadow-2xl border-white/10">
            <h1 className="text-3xl font-display font-bold text-white mb-6 text-center">Where to?</h1>
            
            <div className="space-y-6">
              {/* Location Inputs */}
              <div className="glass-card p-4 rounded-2xl relative border-white/5">
                <div className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-white/10 border-dashed border-l-2"></div>
                
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center z-10 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-xl px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 block">Pickup</Label>
                    <input 
                      className="bg-transparent border-none outline-none w-full text-white text-sm placeholder:text-white/30"
                      placeholder="Current Location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="relative flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center z-10 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-xl px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                    <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 block">Dropoff</Label>
                    <input 
                      className="bg-transparent border-none outline-none w-full text-white text-sm placeholder:text-white/30"
                      placeholder="Enter destination"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Selection - Horizontal Scroll on Mobile */}
              <div>
                <Label className="text-white mb-3 block font-semibold">Select Vehicle</Label>
                <RadioGroup value={vehicle} onValueChange={setVehicle} className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
                  {[
                    { id: 'bike', name: 'Bike', time: '2 min', price: '$12.50', icon: '🛵' },
                    { id: 'car', name: 'Car', time: '5 min', price: '$24.00', icon: '🚘' },
                    { id: 'van', name: 'Van', time: '12 min', price: '$45.00', icon: '🚐' },
                    { id: 'truck', name: 'Truck', time: '20 min', price: '$85.00', icon: '🚚' },
                  ].map((v) => (
                    <Label
                      key={v.id}
                      htmlFor={v.id}
                      className={`relative flex flex-col items-center p-4 border rounded-2xl cursor-pointer transition-all min-w-[100px] snap-center shrink-0 ${vehicle === v.id ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'border-white/5 bg-black/20 hover:bg-white/5'}`}
                    >
                      <RadioGroupItem value={v.id} id={v.id} className="sr-only" />
                      <span className="text-3xl mb-2 filter drop-shadow-md">{v.icon}</span>
                      <span className="font-semibold text-white text-sm">{v.name}</span>
                      <span className="font-bold text-primary text-sm mt-1">{v.price}</span>
                      <span className="text-[10px] text-muted-foreground mt-1">{v.time}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-white font-semibold">Payment Method</Label>
                  <span className="text-primary font-bold text-lg">{getFare()}</span>
                </div>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'card', name: 'Card', icon: CreditCard },
                    { id: 'wallet', name: 'Wallet', icon: Wallet },
                    { id: 'bank', name: 'Transfer', icon: Banknote },
                    { id: 'cash', name: 'Cash', icon: Banknote },
                  ].map((method) => (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-black/40 hover:bg-white/5'}`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                      <method.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-xs text-white">{method.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                size="lg" 
                className="w-full rounded-2xl h-14 text-lg font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all bg-primary text-primary-foreground" 
                onClick={handleBook} 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Connecting...</>
                ) : (
                  <>Request Delivery <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}