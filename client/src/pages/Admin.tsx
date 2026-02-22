import { Layout } from "@/components/Layout";
import { TrackingMap } from "@/components/TrackingMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, AlertCircle, TrendingUp, Package, MapPin, Settings, CheckCircle2, ChevronRight } from "lucide-react";
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
      setLocation('/');
    }
  }, [user, setLocation]);

  if (!user || user.role !== 'admin') return null;

  return (
    <Layout>
      <div className="bg-muted/20 min-h-screen pb-12">
        <div className="bg-background border-b pt-8 pb-4 sticky top-16 z-40">
          <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">Admin Control Center</h1>
              <p className="text-muted-foreground">Manage logistics network and view real-time operations.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2"><Settings className="h-4 w-4" /> Settings</Button>
              <Button className="gap-2"><AlertCircle className="h-4 w-4" /> 3 Pending Disputes</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Riders", value: "1,248", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
              { label: "Live Deliveries", value: orders.filter(o => o.status !== 'delivered').length.toString(), icon: Package, color: "text-secondary", bg: "bg-secondary/10", trend: "+5%" },
              { label: "Today's Revenue", value: "$34,290", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", trend: "+18%" },
              { label: "KYC Pending", value: "24", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10", trend: "-2" },
            ].map((stat, i) => (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className="text-3xl font-display font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-secondary font-medium">{stat.trend}</span>
                    <span className="text-muted-foreground">vs last week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-background border h-12 px-2 overflow-x-auto w-full justify-start md:w-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Network Overview</TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Live Orders</TabsTrigger>
              <TabsTrigger value="riders" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Rider Management</TabsTrigger>
              <TabsTrigger value="kyc" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary relative">
                KYC Review
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Live City Map */}
                <Card className="lg:col-span-2 shadow-sm border-border/50 flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" /> Live City Grid
                    </CardTitle>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      <div className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse"></div> Live
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 relative min-h-[400px]">
                    <TrackingMap riderPos={[40.7128, -74.0060]} zoom={12} className="rounded-b-xl rounded-t-none border-x-0 border-b-0" />
                  </CardContent>
                </Card>

                {/* Earnings Chart */}
                <Card className="shadow-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dx={-10} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                            itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Top Performing Zones</h4>
                      {[
                        { zone: "Downtown Core", value: "$12.4k" },
                        { zone: "Westside Business", value: "$8.2k" },
                        { zone: "North Hills", value: "$5.1k" },
                      ].map((z, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{z.zone}</span>
                          <span className="font-bold text-primary">{z.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="animate-in fade-in duration-500">
              <Card>
                <CardHeader>
                  <CardTitle>Live Orders Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl bg-card gap-4">
                        <div className="flex gap-4 items-center">
                          <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <Package className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">Pickup: <span className="text-foreground">{order.pickup}</span></p>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <Badge variant="outline" className={
                            order.status === 'in_transit' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                            order.status === 'delivered' ? 'bg-primary/10 text-primary border-primary/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }>
                            {order.status}
                          </Badge>
                          <div className="flex gap-2">
                            {order.status !== 'delivered' && (
                              <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, 'delivered')}>Mark Delivered</Button>
                            )}
                            <Button size="sm" variant="ghost"><ChevronRight className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kyc">
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  KYC Review components to be implemented in full version. Use demo mode logic for now.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}