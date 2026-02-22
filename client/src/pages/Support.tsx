import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Support() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Ticket Submitted", description: "Our support team will contact you shortly." });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How can we help?</h1>
          <p className="text-xl text-muted-foreground">Our customer care team is available 24/7 to assist you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: MessageSquare, title: "WhatsApp Support", detail: "+1 (800) 555-0199", color: "text-green-500", bg: "bg-green-500/10" },
            { icon: Phone, title: "Call Us", detail: "+1 (800) 555-0199", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Mail, title: "Email", detail: "support@lakefront.global", color: "text-purple-500", bg: "bg-purple-500/10" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border-white/5 text-center flex flex-col items-center hover:bg-white/5 transition-colors cursor-pointer">
              <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Create a Support Ticket</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Have an issue with a delivery or a dispute? Fill out the form and our admin team will review it immediately on the dashboard.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" /> 120 Logistics Hub, NY 10001
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" /> Available 24/7
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ticket Created!</h3>
                <p className="text-muted-foreground mb-6">We've received your request and will get back to you via email.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="border-white/10 hover:bg-white/5">Submit another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Your full name" required className="bg-black/40 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Tracking ID (Optional)</Label>
                  <Input placeholder="e.g. LG-993A" className="bg-black/40 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Describe your issue..." required className="bg-black/40 border-white/10 min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] mt-4">
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Inline clock component for the support page
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}