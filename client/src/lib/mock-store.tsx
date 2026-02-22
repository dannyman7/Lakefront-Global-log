import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useLocation } from 'wouter';

export type Role = 'customer' | 'rider' | 'admin';
export type OrderStatus = 'pending' | 'accepted' | 'in_transit' | 'delivered';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  walletBalance?: number;
};

export type Order = {
  id: string;
  customerId: string;
  pickup: string;
  dropoff: string;
  vehicle: string;
  fare: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  riderId?: string;
  pickupCoords: [number, number];
  dropoffCoords: [number, number];
  // Socket simulation state
  riderCoords: [number, number];
  riderHeading: number;
  riderSpeed: number;
  pathTraveled: [number, number][];
  lastUpdate: number;
};

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin Control', email: 'admin@lakefront.global', role: 'admin' },
  { id: '2', name: 'Demo Customer', email: 'customer@demo.com', role: 'customer', walletBalance: 250.00 },
  { id: '3', name: 'Marcus J. (Rider)', email: 'rider@lakefront.global', role: 'rider' },
  { id: '4', name: 'Sarah L. (Rider)', email: 'sarah@lakefront.global', role: 'rider' },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'LG-993A',
    customerId: '2',
    pickup: '120 Logistics Hub, NY 10001',
    dropoff: '450 West St, NY 10014',
    vehicle: 'bike',
    fare: '$12.50',
    status: 'in_transit',
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    riderId: '3',
    pickupCoords: [40.7050, -74.0150],
    dropoffCoords: [40.7580, -73.9855],
    riderCoords: [40.7128, -74.0060], // Will be updated by simulation
    riderHeading: 45,
    riderSpeed: 35,
    pathTraveled: [[40.7050, -74.0150], [40.7080, -74.0100]],
    lastUpdate: Date.now()
  }
];

interface StoreContextType {
  user: User | null;
  users: User[];
  orders: Order[];
  login: (email: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
  createOrder: (order: Partial<Order>) => Promise<string>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  
  // Refs for simulation loop
  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  useEffect(() => {
    const savedUser = localStorage.getItem('lakefront_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    // Simulate real-time Socket.io continuous streaming
    // Bolt updates very frequently (1-2s)
    const socketSimulationId = setInterval(() => {
      setOrders(currentOrders => {
        let changed = false;
        const newOrders = currentOrders.map(order => {
          if (order.status !== 'in_transit' && order.status !== 'accepted') return order;
          
          changed = true;
          // Target is either pickup (if accepted) or dropoff (if in_transit)
          const target = order.status === 'accepted' ? order.pickupCoords : order.dropoffCoords;
          const current = order.riderCoords;
          
          // Calculate heading
          const dy = target[0] - current[0];
          const dx = target[1] - current[1];
          const distance = Math.sqrt(dx*dx + dy*dy);
          
          // If close enough, don't move or trigger arrival
          if (distance < 0.0005) {
            if (order.status === 'accepted') {
              return { ...order, status: 'in_transit' as OrderStatus, lastUpdate: Date.now() };
            }
            return order; 
          }
          
          // Move 1% of the distance or a fixed step to make it smooth but noticeable
          const step = Math.min(0.0008, distance * 0.05); // Speed multiplier
          const angle = Math.atan2(dy, dx);
          
          const newLat = current[0] + Math.sin(angle) * step;
          const newLng = current[1] + Math.cos(angle) * step;
          
          // Heading in degrees for UI rotation
          const heading = (angle * 180 / Math.PI);
          
          // Fluctuate speed for realism
          const speed = Math.floor(25 + Math.random() * 20);
          
          return {
            ...order,
            riderCoords: [newLat, newLng] as [number, number],
            riderHeading: heading,
            riderSpeed: speed,
            pathTraveled: [...order.pathTraveled, current],
            lastUpdate: Date.now()
          };
        });
        
        return changed ? newOrders : currentOrders;
      });
    }, 1500); // 1.5s updates for "live" feel

    return () => clearInterval(socketSimulationId);
  }, []);

  const login = async (email: string) => {
    await new Promise(r => setTimeout(r, 800));
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('lakefront_user', JSON.stringify(foundUser));
      if (foundUser.role === 'admin') setLocation('/admin');
      else setLocation('/book');
    } else {
      throw new Error('User not found. Use admin@lakefront.global or customer@demo.com');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lakefront_user');
    setLocation('/');
  };

  const signup = async (userData: Partial<User>) => {
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: String(Date.now()),
      name: userData.name || 'New User',
      email: userData.email || '',
      role: userData.role || 'customer',
      walletBalance: 0,
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem('lakefront_user', JSON.stringify(newUser));
    setLocation('/book');
  };

  const createOrder = async (orderData: Partial<Order>) => {
    await new Promise(r => setTimeout(r, 1500)); 
    
    // NY coords roughly
    const pCoords: [number, number] = [40.7 + (Math.random() * 0.05), -74.0 - (Math.random() * 0.05)];
    const dCoords: [number, number] = [40.7 + (Math.random() * 0.05), -74.0 - (Math.random() * 0.05)];
    
    // Rider starts slightly away from pickup
    const rCoords: [number, number] = [pCoords[0] - 0.01, pCoords[1] - 0.01];

    const newOrder: Order = {
      id: `LG-${Math.floor(Math.random() * 10000)}X`,
      customerId: user?.id || '2',
      pickup: orderData.pickup || '',
      dropoff: orderData.dropoff || '',
      vehicle: orderData.vehicle || 'bike',
      fare: orderData.fare || '$0.00',
      status: 'pending',
      paymentMethod: orderData.paymentMethod || 'card',
      createdAt: new Date().toISOString(),
      pickupCoords: pCoords,
      dropoffCoords: dCoords,
      riderCoords: rCoords,
      riderHeading: 0,
      riderSpeed: 0,
      pathTraveled: [rCoords],
      lastUpdate: Date.now()
    };
    
    setOrders([newOrder, ...orders]);
    
    // Simulate Bolt-like quick assignment
    setTimeout(() => {
      setOrders(prev => prev.map(o => 
        o.id === newOrder.id 
          ? { ...o, status: 'accepted', riderId: '4' } 
          : o
      ));
    }, 2500);

    return newOrder.id;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <StoreContext.Provider value={{ user, users, orders, login, logout, signup, createOrder, updateOrderStatus }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}