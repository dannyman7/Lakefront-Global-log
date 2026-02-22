import { Layout } from "@/components/Layout";
import { TrackingMap } from "@/components/TrackingMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, AlertCircle, TrendingUp, Package, MapPin, Settings, CheckCircle2, ChevronRight, ExternalLink, Activity } from "lucide-react";
import { useStore } from "@/lib/mock-store";
import { useEffect } from "react";
import { useLocation } from "wouter";

const earningsData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 6890 },
  { name: 'Sat', revenue: 8390 },
  { name: 'Sun', revenue: 7490 },
];

export default function AdminDashboard() {
  const { user, orders, updateOrderStatus } = useStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setLocation('/auth');
    }
  }, [user, setLocation]);

  if (!user || user.role !== 'admin') return null;

  return (
    <Layout>
      <div className="bg-background min-h-screen pb-12">
        <div className="bg-background border-b border-white/5 pt-8 pb-4 sticky top-16 z-40 glass-panel">
          <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-white">Admin Control Center</h1>
              <p className="text-muted-foreground">Manage logistics fleet and live operations.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5"><Settings className="h-4 w-4" /> Settings</Button>
              <Button className="gap-2 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20"><AlertCircle className="h-4 w-4" /> 3 Pending Disputes</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Fleet", value: "1,248", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", trend: "+12%" },
              { label: "Live Transmissions", value: orders.filter(o => o.status !== 'delivered').length.toString(), icon: Package, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", trend: "+5%" },
              { label: "Today's Revenue", value: "$34,290", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20", trend: "+18%" },
              { label: "Disputes / KYC", value: "24", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", trend: "-2" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl border border-white/5 shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color} ${stat.border}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className={`${stat.color} font-bold`}>{stat.trend}</span>
                    <span className="text-muted-foreground">vs last week</span>
                  </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-black/40 border border-white/5 h-14 px-2 rounded-xl overflow-x-auto w-full justify-start md:w-auto p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">Live Fleet Map</TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">Orders & Delivery</TabsTrigger>
              <TabsTrigger value="kyc" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg relative">
                Disputes & KYC
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Live City Map */}
                <div className="lg:col-span-2 glass-card rounded-2xl border-white/5 shadow-xl flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Live City Grid
                    </h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      WebSocket Connected
                    </Badge>
                  </div>
                  <div className="flex-1 relative min-h-[500px]">
                     {/* Show the first active order's map as a demo for the "Fleet Map" */}
                    <TrackingMap 
                       riderPos={orders[0]?.riderCoords || [40.7128, -74.0060]} 
                       riderHeading={orders[0]?.riderHeading || 0}
                       zoom={13} 
                       className="h-full" 
                    />
                  </div>
                </div>

                {/* Live Feed */}
                <div className="glass-card rounded-2xl border-white/5 shadow-xl flex flex-col">
                  <div className="p-4 border-b border-white/5 bg-black/20">
                    <h3 className="text-lg font-bold text-white">System Feed</h3>
                  </div>
                  <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    {orders.slice(0, 5).map((o, i) => (
                      <div key={i} className="flex gap-3 border-b border-white/5 pb-4 last:border-0">
                        <div className="mt-1">
                          {o.status === 'delivered' ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Activity className="h-4 w-4 text-secondary" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Order {o.id}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 capitalize">{o.status.replace('_', ' ')} • {o.vehicle}</p>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">Just now</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="animate-in fade-in duration-500">
              <div className="glass-card rounded-2xl border-white/5 p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Live Orders Dashboard</h3>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-white/5 rounded-xl bg-black/20 hover:bg-black/40 transition-colors gap-4">
                        <div className="flex gap-4 items-center">
                          <div className={`p-3 rounded-full ${order.status === 'delivered' ? 'bg-primary/10 text-primary' : 'bg-blue-500/10 text-blue-500'}`}>
                            <Package className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold text-white">{order.id} <span className="text-xs font-normal text-muted-foreground ml-2">via {order.paymentMethod}</span></p>
                            <p className="text-sm text-muted-foreground mt-1">Pickup: <span className="text-white/80">{order.pickup}</span></p>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-3">
                          <Badge variant="outline" className={
                            order.status === 'in_transit' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                            order.status === 'delivered' ? 'bg-primary/10 text-primary border-primary/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }>
                            {order.status.replace('_', ' ')}
                          </Badge>
                          <div className="flex gap-2">
                            {order.status !== 'delivered' && (
                              <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => updateOrderStatus(order.id, 'delivered')}>Mark Delivered</Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 hover:text-primary" onClick={() => setLocation(`/tracking/${order.id}`)}>
                              Track <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
               <div className="glass-card rounded-2xl border-white/5 p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Revenue Analytics</h3>
                  <div className="h-[400px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={earningsData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} dx={-10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                          itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="kyc">
              <div className="glass-card rounded-2xl border-white/5 p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-white mb-2">Disputes & KYC</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Full document review and ticket management interfaces are available in the production deployment.
                  </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}