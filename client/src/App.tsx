import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/lib/mock-store";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import Tracking from "@/pages/Tracking";
import AdminDashboard from "@/pages/Admin";
import Auth from "@/pages/Auth";
import Support from "@/pages/Support";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/auth" component={Auth}/>
      <Route path="/book" component={Booking}/>
      <Route path="/tracking/:id" component={Tracking}/>
      <Route path="/admin" component={AdminDashboard}/>
      <Route path="/support" component={Support}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;