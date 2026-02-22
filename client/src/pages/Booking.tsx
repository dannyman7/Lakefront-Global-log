import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation2, PackageSearch, CreditCard, ChevronRight, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/mock-store";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { user, createOrder } = useStore();
  const { toast } = useToast();
  
  const [vehicle, setVehicle] = useState("bike");
  const [pickup, setPickup] = useState("120 Logistics Hub, NY 10001");
  const [dropoff, setDropoff] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Require login to book
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

  const handleNext = async () => {
    if (step === 1 && !dropoff) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a dropoff location." });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      try {
        const orderId = await createOrder({
          pickup,
          dropoff,
          vehicle,
          fare: getFare(),
          paymentMethod
        });
        toast({ title: "Payment Successful", description: "Your booking is confirmed!" });
        setLocation(`/tracking/${orderId}`);
      } catch (error) {
        toast({ variant: "destructive", title: "Booking Failed", description: "Something went wrong." });
        setIsProcessing(false);
      }
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">Book a Delivery</h1>
        
        {/* Progress Bar */}
        <div className="flex items-center mb-12">
          {[
            { num: 1, label: "Details" },
            { num: 2, label: "Vehicle" },
            { num: 3, label: "Payment" }
          ].map((s, i) => (
            <div key={s.num} className="flex-1 flex items-center">
              <div className={`flex flex-col items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider">{s.label}</span>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step > s.num ? 'bg-primary' : 'bg-muted'}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_350px] gap-8">
          <div className="space-y-6">
            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4 relative">
                      <div className="absolute left-[15px] top-10 bottom-10 w-0.5 bg-border border-dashed border-l-2"></div>
                      
                      <div className="space-y-2 relative">
                        <Label className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center z-10 relative"><Navigation2 className="h-4 w-4 text-primary" /></div> Pickup Location</Label>
                        <Input 
                          placeholder="Enter pickup address" 
                          className="ml-10 w-[calc(100%-40px)]" 
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2 relative">
                        <Label className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center z-10 relative"><MapPin className="h-4 w-4 text-destructive" /></div> Dropoff Location <span className="text-destructive">*</span></Label>
                        <Input 
                          placeholder="Enter destination address" 
                          className="ml-10 w-[calc(100%-40px)]" 
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <PackageSearch className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Package Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Recipient Name</Label>
                        <Input placeholder="Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label>Recipient Phone</Label>
                        <Input placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <Label>Notes for Rider</Label>
                      <Input placeholder="E.g. Leave at front desk" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Vehicle */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="font-semibold text-lg">Select Vehicle Type</h3>
                <RadioGroup value={vehicle} onValueChange={setVehicle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'bike', name: 'Motorbike', desc: 'Up to 5kg • Fast', price: '$12.50' },
                    { id: 'car', name: 'Car', desc: 'Up to 20kg • Secure', price: '$24.00' },
                    { id: 'van', name: 'Delivery Van', desc: 'Up to 200kg • Bulky', price: '$45.00' },
                    { id: 'truck', name: 'Light Truck', desc: 'Up to 1000kg • Heavy', price: '$85.00' },
                  ].map((v) => (
                    <Label
                      key={v.id}
                      htmlFor={v.id}
                      className={`flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors ${vehicle === v.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`}
                    >
                      <RadioGroupItem value={v.id} id={v.id} className="sr-only" />
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{v.name}</span>
                        <span className="font-bold text-primary">{v.price}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{v.desc}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="font-semibold text-lg">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit/Debit Card (Stripe/Paystack)', icon: CreditCard },
                    { id: 'bank', name: 'Bank Transfer (Instant)', icon: CreditCard },
                    { id: 'ussd', name: 'USSD Code', icon: CreditCard },
                    { id: 'wallet', name: `Lakefront Wallet ($${user.walletBalance?.toFixed(2) || '0.00'})`, icon: CreditCard },
                    { id: 'cash', name: 'Cash on Delivery', icon: CreditCard },
                  ].map((method) => (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{method.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
                
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex items-start gap-3 mt-6">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Secure Simulator</p>
                    <p className="text-xs text-muted-foreground">In demo mode, payment is simulated. In production, this integrates with Paystack/Flutterwave/Stripe.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1 || isProcessing}>Back</Button>
              <Button size="lg" className="rounded-full px-8 gap-2" onClick={handleNext} disabled={isProcessing}>
                {isProcessing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Payment...</>
                ) : (
                  <>{step === 3 ? 'Confirm Booking' : 'Continue'} <ChevronRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Fare Estimate</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pickup</span>
                  <span className="font-medium truncate max-w-[150px]">{pickup}</span>
                </div>
                {dropoff && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dropoff</span>
                    <span className="font-medium truncate max-w-[150px]">{dropoff}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium capitalize">{vehicle}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between items-center mb-6">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">{getFare()}</span>
              </div>
              
              <div className="bg-muted p-3 rounded-lg text-xs text-muted-foreground leading-relaxed">
                Dynamic pricing applied based on precise GPS distance and live traffic estimation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}