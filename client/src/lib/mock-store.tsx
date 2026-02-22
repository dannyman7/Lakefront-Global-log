import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
  riderCoords?: [number, number];
};

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@lakefront.global', role: 'admin' },
  { id: '2', name: 'John Customer', email: 'customer@demo.com', role: 'customer', walletBalance: 150.00 },
  { id: '3', name: 'Marcus J. (Rider)', email: 'rider@lakefront.global', role: 'rider' },
];

const MOCK_ORDERS: Order[] = [
  {
    id: 'LG-993A',
    customerId: '2',
    pickup: '120 Logistics Hub, NY 10001',
    dropoff: '450 West St, NY 10014',
    vehicle: 'bike',
    fare: '$12.50',
    status: 'in_transit',
    paymentMethod: 'card',
    createdAt: new Date().toISOString(),
    riderId: '3',
    pickupCoords: [40.7050, -74.0150],
    dropoffCoords: [40.7580, -73.9855],
    riderCoords: [40.7128, -74.0060],
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
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('lakefront_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedOrders = localStorage.getItem('lakefront_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('lakefront_orders', JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string) => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
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
    await new Promise(r => setTimeout(r, 2000)); // Simulate payment processing
    
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
      // Mock coordinates
      pickupCoords: [40.7 + (Math.random() * 0.1), -74.0 + (Math.random() * 0.1)],
      dropoffCoords: [40.7 + (Math.random() * 0.1), -74.0 + (Math.random() * 0.1)],
    };
    
    setOrders([newOrder, ...orders]);
    
    // Simulate auto-assigning a rider after 3 seconds
    setTimeout(() => {
      setOrders(prev => prev.map(o => 
        o.id === newOrder.id 
          ? { ...o, status: 'accepted', riderId: '3', riderCoords: o.pickupCoords } 
          : o
      ));
      
      // Simulate transit after 6 seconds
      setTimeout(() => {
        setOrders(prev => prev.map(o => 
          o.id === newOrder.id ? { ...o, status: 'in_transit' } : o
        ));
      }, 6000);
    }, 3000);

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
