import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/mock-store";
import { useState } from "react";
import { Loader2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const { login, signup } = useStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login State
  const [email, setEmail] = useState("customer@demo.com");
  
  // Signup State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email);
      toast({ title: "Welcome back!", description: "Successfully logged in." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ name: regName, email: regEmail });
      toast({ title: "Account Created", description: "Welcome to Lakefront Global!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Signup Failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <Card className="w-full max-w-md shadow-xl border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl mb-4">
                <Package className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-display font-bold">Lakefront Global</h1>
              <p className="text-muted-foreground text-sm">Professional Logistics Platform</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                    <p className="text-xs text-muted-foreground">Demo: admin@lakefront.global or customer@demo.com</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password (or OTP)</Label>
                    <Input id="password" type="password" defaultValue="password" required />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input 
                      id="reg-name" 
                      placeholder="John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <Input id="reg-phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}