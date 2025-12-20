import { Avatar, AvatarFallback } from './ui/avatar';
import { DeliveryPartnerIcon, getDeliveryPartnerName } from './DeliveryPartnerIcon';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Search,
  Plus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  User,
  IndianRupee,
  Eye,
  Users,
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
}

interface Manufacturer {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: {
    full_name: string,
    phone: string,
    address_line_1: string,
    address_line_2: string,
    locality: string,
    city: string,
    district: string,
    state: string,
    pincode: string,// number,
    country_code: string,
    address_type: "pickup" | "warehouse" | "return",
  }
  joinDate: string;
  totalProducts: number;
  approvedProducts: number;
  pendingProducts: number;
  totalRevenue: number;
  deliveryPartners: string[];
  teamMembers: TeamMember[];
}

interface PendingProduct {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  manufacturerId: string;
  price: number;
  stock: number;
  submittedDate: string;
  color: string;
  fabric: string;
  length: string;
  description?: string;
  images?: string[];
  isRemovalRequest?: boolean; // Flag to indicate if this is a removal request
  existingProductId?: string; // For removal requests, link to existing product
}

interface Log {
  id: string;
  manufacturerId: string;
  manufacturerName: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'approval' | 'stock' | 'product' | 'info';
}

const initialManufacturers: Manufacturer[] = [
  {
    id: 'MFR001',
    name: 'Kanchipuram Weavers Co.',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@kanchiweave.com',
    phone: '+91 98765 43210',
    address: {
      full_name: 'Rajesh Kumar',
      phone: '9876543210',
      address_line_1: '12, Silk Weaver Street',
      address_line_2: 'Near Ekambareswarar Temple',
      locality: 'Little Kanchipuram',
      city: 'Kanchipuram',
      district: 'Kanchipuram',
      state: 'Tamil Nadu',
      pincode: '631501',
      country_code: 'IN',
      address_type: 'pickup',
    }, joinDate: '2023-06-15',
    totalProducts: 45,
    approvedProducts: 42,
    pendingProducts: 3,
    totalRevenue: 562500,
    deliveryPartners: ['DP001', 'DP002'],
    teamMembers: [
      {
        id: 'TM001',
        name: 'Rajesh Kumar',
        role: 'Owner',
        email: 'rajesh@kanchiweave.com',
        phone: '+91 98765 43210',
        joinDate: '2023-06-15'
      },
      {
        id: 'TM002',
        name: 'Suresh Patel',
        role: 'Manager',
        email: 'suresh@kanchiweave.com',
        phone: '+91 98765 43211',
        joinDate: '2023-07-01'
      }
    ]
  },
  {
    id: 'MFR002',
    name: 'Bengal Handloom Society',
    ownerName: 'Anita Das',
    email: 'anita@bengalhandloom.com',
    phone: '+91 98765 43211',
    address: {
      full_name: 'Anita Das',
      phone: '9876543211',
      address_line_1: '45, Rabindra Sarani',
      address_line_2: 'Near Shobhabazar Metro',
      locality: 'Shobhabazar',
      city: 'Kolkata',
      district: 'Kolkata',
      state: 'West Bengal',
      pincode: '700005',
      country_code: 'IN',
      address_type: 'pickup',
    }, joinDate: '2023-07-20',
    totalProducts: 38,
    approvedProducts: 35,
    pendingProducts: 3,
    totalRevenue: 312500,
    deliveryPartners: ['DP003'],
    teamMembers: [
      {
        id: 'TM003',
        name: 'Anita Das',
        role: 'Owner',
        email: 'anita@bengalhandloom.com',
        phone: '+91 98765 43211',
        joinDate: '2023-07-20'
      },
      {
        id: 'TM004',
        name: 'Rahul Sharma',
        role: 'Manager',
        email: 'rahul@bengalhandloom.com',
        phone: '+91 98765 43212',
        joinDate: '2023-08-01'
      }
    ]
  },
  {
    id: 'MFR003',
    name: 'Varanasi Silk Weavers',
    ownerName: 'Prakash Sharma',
    email: 'prakash@varanasisilk.com',
    phone: '+91 98765 43212',
    address: {
      full_name: 'Prakash Sharma',
      phone: '9876543212',
      address_line_1: '8, Madanpura Road',
      address_line_2: 'Near Assi Ghat',
      locality: 'Bhelupur',
      city: 'Varanasi',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001',
      country_code: 'IN',
      address_type: 'pickup',
    }, joinDate: '2023-05-10',
    totalProducts: 52,
    approvedProducts: 50,
    pendingProducts: 2,
    totalRevenue: 936000,
    deliveryPartners: ['DP004'],
    teamMembers: [
      {
        id: 'TM005',
        name: 'Prakash Sharma',
        role: 'Owner',
        email: 'prakash@varanasisilk.com',
        phone: '+91 98765 43212',
        joinDate: '2023-05-10'
      },
      {
        id: 'TM006',
        name: 'Neha Verma',
        role: 'Manager',
        email: 'neha@varanasisilk.com',
        phone: '+91 98765 43213',
        joinDate: '2023-06-01'
      }
    ]
  },
  {
    id: 'MFR004',
    name: 'Modern Textiles Ltd.',
    ownerName: 'Sanjay Patel',
    email: 'sanjay@moderntextiles.com',
    phone: '+91 98765 43213',
    address: {
      full_name: 'Sanjay Patel',
      phone: '9876543213',
      address_line_1: '101, Ring Road Industrial Estate',
      address_line_2: 'Opp. Textile Market',
      locality: 'Varachha',
      city: 'Surat',
      district: 'Surat',
      state: 'Gujarat',
      pincode: '395006',
      country_code: 'IN',
      address_type: 'pickup',
    },
    joinDate: '2023-08-05',
    totalProducts: 28,
    approvedProducts: 26,
    pendingProducts: 2,
    totalRevenue: 301500,
    deliveryPartners: ['DP005'],
    teamMembers: [
      {
        id: 'TM007',
        name: 'Sanjay Patel',
        role: 'Owner',
        email: 'sanjay@moderntextiles.com',
        phone: '+91 98765 43213',
        joinDate: '2023-08-05'
      },
      {
        id: 'TM008',
        name: 'Ravi Kumar',
        role: 'Manager',
        email: 'ravi@moderntextiles.com',
        phone: '+91 98765 43214',
        joinDate: '2023-09-01'
      }
    ]
  },
  {
    id: 'MFR005',
    name: 'Chanderi Weavers Guild',
    ownerName: 'Meera Verma',
    email: 'meera@chanderiweavers.com',
    phone: '+91 98765 43214',
    address: {
      full_name: 'Meera Verma',
      phone: '9876543214',
      address_line_1: '22, Handloom Colony',
      address_line_2: 'Near Chanderi Fort',
      locality: 'Chanderi Town',
      city: 'Chanderi',
      district: 'Ashoknagar',
      state: 'Madhya Pradesh',
      pincode: '473446',
      country_code: 'IN',
      address_type: 'pickup',
    }, joinDate: '2023-09-12',
    totalProducts: 31,
    approvedProducts: 29,
    pendingProducts: 2,
    totalRevenue: 297000,
    deliveryPartners: ['DP006'],
    teamMembers: [
      {
        id: 'TM009',
        name: 'Meera Verma',
        role: 'Owner',
        email: 'meera@chanderiweavers.com',
        phone: '+91 98765 43214',
        joinDate: '2023-09-12'
      },
      {
        id: 'TM010',
        name: 'Amit Singh',
        role: 'Manager',
        email: 'amit@chanderiweavers.com',
        phone: '+91 98765 43215',
        joinDate: '2023-10-01'
      }
    ]
  }
];

const initialPendingProducts: PendingProduct[] = [
  {
    id: 'PND001',
    name: 'Golden Zari Silk Saree',
    type: 'Silk',
    manufacturer: 'Kanchipuram Weavers Co.',
    manufacturerId: 'MFR001',
    price: 15000,
    stock: 10,
    submittedDate: '2024-11-28',
    color: 'Gold',
    fabric: 'Pure Silk with Zari',
    length: '6.3 meters',
    description: 'Exquisite golden zari silk saree with intricate temple border. Perfect for weddings and traditional ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1758549781879-82d764bddc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1758549781879-82d764bddc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100',
      'https://images.unsplash.com/photo-1758549781879-82d764bddc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&blur=10'
    ]
  },
  {
    id: 'PND002',
    name: 'Handwoven Cotton Saree',
    type: 'Cotton',
    manufacturer: 'Bengal Handloom Society',
    manufacturerId: 'MFR002',
    price: 3200,
    stock: 15,
    submittedDate: '2024-11-29',
    color: 'Ivory',
    fabric: 'Handloom Cotton',
    length: '6.2 meters',
    description: 'Traditional handwoven cotton saree with elegant ivory tone. Comfortable for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1656660062743-05a99d85c903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1656660062743-05a99d85c903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100'
    ]
  },
  {
    id: 'PND003',
    name: 'Banarasi Brocade Saree',
    type: 'Silk',
    manufacturer: 'Varanasi Silk Weavers',
    manufacturerId: 'MFR003',
    price: 22000,
    stock: 8,
    submittedDate: '2024-11-27',
    color: 'Royal Blue',
    fabric: 'Banarasi Silk',
    length: '6.3 meters',
    description: 'Luxurious royal blue Banarasi silk saree with intricate brocade work. A timeless masterpiece.',
    images: [
      'https://images.unsplash.com/photo-1676696706907-0e04665b80bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1676696706907-0e04665b80bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100',
      'https://images.unsplash.com/photo-1676696706907-0e04665b80bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&hue=30'
    ]
  },
  {
    id: 'PND004',
    name: 'Designer Georgette Saree',
    type: 'Georgette',
    manufacturer: 'Modern Textiles Ltd.',
    manufacturerId: 'MFR004',
    price: 4800,
    stock: 20,
    submittedDate: '2024-11-30',
    color: 'Wine Red',
    fabric: 'Premium Georgette',
    length: '6.0 meters',
    description: 'Stunning designer georgette saree in wine red. Modern design meets traditional elegance.',
    images: [
      'https://images.unsplash.com/photo-1710967076003-8f7ff576ac3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ]
  },
  {
    id: 'PND005',
    name: 'Chanderi Silk Cotton Mix',
    type: 'Cotton',
    manufacturer: 'Chanderi Weavers Guild',
    manufacturerId: 'MFR005',
    price: 6200,
    stock: 12,
    submittedDate: '2024-11-29',
    color: 'Mint Green',
    fabric: 'Chanderi Silk Cotton',
    length: '6.2 meters',
    description: 'Elegant mint green Chanderi saree with silk-cotton blend. Lightweight and breathable.',
    images: [
      'https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100'
    ]
  },
  {
    id: 'PND006',
    name: 'Temple Border Silk Saree',
    type: 'Silk',
    manufacturer: 'Kanchipuram Weavers Co.',
    manufacturerId: 'MFR001',
    price: 18500,
    stock: 6,
    submittedDate: '2024-11-28',
    color: 'Maroon',
    fabric: 'Kanchipuram Silk',
    length: '6.3 meters',
    description: 'Rich maroon Kanchipuram silk with traditional temple border. Perfect for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1713328471111-4e4a89a29a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1713328471111-4e4a89a29a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100'
    ]
  },
  {
    id: 'PND007',
    name: 'Tant Saree',
    type: 'Cotton',
    manufacturer: 'Bengal Handloom Society',
    manufacturerId: 'MFR002',
    price: 2800,
    stock: 25,
    submittedDate: '2024-11-30',
    color: 'White with Red Border',
    fabric: 'Tant Cotton',
    length: '6.0 meters',
    description: 'Classic white Tant cotton saree with vibrant red border. A Bengali tradition.',
    images: [
      'https://images.unsplash.com/photo-1701456108005-238f481800ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1701456108005-238f481800ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&sat=-100',
      'https://images.unsplash.com/photo-1701456108005-238f481800ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&hue=30'
    ]
  }
];

const initialLogs: Log[] = [
  {
    id: 'LOG001',
    manufacturerId: 'MFR001',
    manufacturerName: 'Kanchipuram Weavers Co.',
    action: 'Product Submitted',
    details: 'Golden Zari Silk Saree submitted for approval',
    timestamp: '2024-11-28 10:30 AM',
    type: 'product'
  },
  {
    id: 'LOG002',
    manufacturerId: 'MFR002',
    manufacturerName: 'Bengal Handloom Society',
    action: 'Stock Updated',
    details: 'Updated stock for Cotton Handloom Saree: 28 → 35 units',
    timestamp: '2024-11-28 02:15 PM',
    type: 'stock'
  },
  {
    id: 'LOG003',
    manufacturerId: 'MFR003',
    manufacturerName: 'Varanasi Silk Weavers',
    action: 'Product Submitted',
    details: 'Banarasi Brocade Saree submitted for approval',
    timestamp: '2024-11-27 04:45 PM',
    type: 'product'
  },
  {
    id: 'LOG004',
    manufacturerId: 'MFR001',
    manufacturerName: 'Kanchipuram Weavers Co.',
    action: 'Product Approved',
    details: 'Royal Silk Saree approved by admin',
    timestamp: '2024-11-27 11:20 AM',
    type: 'approval'
  },
  {
    id: 'LOG005',
    manufacturerId: 'MFR004',
    manufacturerName: 'Modern Textiles Ltd.',
    action: 'Product Submitted',
    details: 'Designer Georgette Saree submitted for approval',
    timestamp: '2024-11-30 09:00 AM',
    type: 'product'
  },
  {
    id: 'LOG006',
    manufacturerId: 'MFR002',
    manufacturerName: 'Bengal Handloom Society',
    action: 'Stock Updated',
    details: 'Updated stock for Tant Saree: 15 → 25 units',
    timestamp: '2024-11-29 03:30 PM',
    type: 'stock'
  },
  {
    id: 'LOG007',
    manufacturerId: 'MFR005',
    manufacturerName: 'Chanderi Weavers Guild',
    action: 'Product Submitted',
    details: 'Chanderi Silk Cotton Mix submitted for approval',
    timestamp: '2024-11-29 01:00 PM',
    type: 'product'
  },
  {
    id: 'LOG008',
    manufacturerId: 'MFR003',
    manufacturerName: 'Varanasi Silk Weavers',
    action: 'Product Approved',
    details: 'Tussar Silk Saree approved by admin',
    timestamp: '2024-11-26 02:45 PM',
    type: 'approval'
  }
];

export function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(initialManufacturers);
  const [pendingProducts, setPendingProducts] = useState<PendingProduct[]>(initialPendingProducts);
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);
  const [selectedPendingProduct, setSelectedPendingProduct] = useState<PendingProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAuthError, setShowAuthError] = useState(false);


  const [newManufacturer, setNewManufacturer] = useState<Manufacturer>({
    id: "",
    name: "",
    ownerName: "",
    email: "",
    phone: "",
    address: {
      full_name: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      locality: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      country_code: "IN",
      address_type: "pickup",
    },
    joinDate: "",
    totalProducts: 0,
    approvedProducts: 0,
    pendingProducts: 0,
    totalRevenue: 0,
    deliveryPartners: [],
    teamMembers: [],

  });


  const filteredManufacturers = manufacturers.filter(mfr =>
    mfr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mfr.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mfr.address.address_line_1.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPendingProducts = manufacturers.reduce((acc, m) => acc + m.pendingProducts, 0);

  const addManufacturer = () => {
    // Simple auth check (in production, this would be a secure backend call)
    if (adminEmail === 'admin@taanttantra.com' && adminPassword === 'admin123') {
      if (newManufacturer.name && newManufacturer.ownerName && newManufacturer.email) {
        const manufacturer: Manufacturer = {
          id: `MFR${String(manufacturers.length + 1).padStart(3, '0')}`,
          name: newManufacturer.name,
          ownerName: newManufacturer.ownerName,
          email: newManufacturer.email,
          phone: newManufacturer.phone,
          address: { ...newManufacturer.address },
          joinDate: new Date().toISOString().split('T')[0],
          totalProducts: 0,
          approvedProducts: 0,
          pendingProducts: 0,
          totalRevenue: 0,
          deliveryPartners: [],
          teamMembers: []
        };
        setManufacturers([...manufacturers, manufacturer]);
        setNewManufacturer({
          id: "",
          name: "",
          ownerName: "",
          email: "",
          phone: "",
          address: {
            full_name: "",
            phone: "",
            address_line_1: "",
            address_line_2: "",
            locality: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
            country_code: "IN",
            address_type: "pickup",
          },
          joinDate: "",
          totalProducts: 0,
          approvedProducts: 0,
          pendingProducts: 0,
          totalRevenue: 0,
          deliveryPartners: [],
          teamMembers: [],
        });
        setAdminEmail('');
        setAdminPassword('');
        setShowAuthError(false);
        setIsAddDialogOpen(false);
      }
    } else {
      setShowAuthError(true);
    }
  };

  const approveProduct = (productId: string) => {
    const product = pendingProducts.find(p => p.id === productId);
    if (product) {
      setPendingProducts(pendingProducts.filter(p => p.id !== productId));
      setManufacturers(manufacturers.map(m => {
        if (m.id === product.manufacturerId) {
          return {
            ...m,
            pendingProducts: m.pendingProducts - 1,
            approvedProducts: m.approvedProducts + 1,
            totalProducts: m.totalProducts
          };
        }
        return m;
      }));

      const newLog: Log = {
        id: `LOG${String(logs.length + 1).padStart(3, '0')}`,
        manufacturerId: product.manufacturerId,
        manufacturerName: product.manufacturer,
        action: 'Product Approved',
        details: `${product.name} approved by admin`,
        timestamp: new Date().toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        type: 'approval'
      };
      setLogs([newLog, ...logs]);
    }
  };

  const rejectProduct = (productId: string) => {
    const product = pendingProducts.find(p => p.id === productId);
    if (product) {
      setPendingProducts(pendingProducts.filter(p => p.id !== productId));
      setManufacturers(manufacturers.map(m => {
        if (m.id === product.manufacturerId) {
          return {
            ...m,
            pendingProducts: m.pendingProducts - 1
          };
        }
        return m;
      }));

      const newLog: Log = {
        id: `LOG${String(logs.length + 1).padStart(3, '0')}`,
        manufacturerId: product.manufacturerId,
        manufacturerName: product.manufacturer,
        action: 'Product Rejected',
        details: `${product.name} rejected by admin`,
        timestamp: new Date().toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        type: 'approval'
      };
      setLogs([newLog, ...logs]);
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'stock':
        return <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'product':
        return <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getManufacturerLogs = (manufacturerId: string) => {
    return logs.filter(log => log.manufacturerId === manufacturerId);
  };

  const getManufacturerPendingProducts = (manufacturerId: string) => {
    return pendingProducts.filter(p => p.manufacturerId === manufacturerId);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Manufacturers</p>
                <p className="text-foreground mt-1">{manufacturers.length}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Pending Approvals</p>
                <p className="text-foreground mt-1">{totalPendingProducts}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Products</p>
                <p className="text-foreground mt-1">{manufacturers.reduce((acc, m) => acc + m.totalProducts, 0)}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Revenue</p>
                <p className="text-foreground mt-1">₹{(manufacturers.reduce((acc, m) => acc + m.totalRevenue, 0) / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="manufacturers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manufacturers">Manufacturers</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Catalogues
            {totalPendingProducts > 0 && (
              <Badge className="ml-2 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                {totalPendingProducts}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Manufacturers List */}
        <TabsContent value="manufacturers">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <CardTitle>Manufacturer Directory</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search manufacturers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-[250px]"
                    />
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Manufacturer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] sm:max-h-[90vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Add New Manufacturer</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto pr-2">
                        <div className="space-y-3 py-3">
                          <div className="space-y-2">
                            <Label htmlFor="mfr-name">Business Name</Label>
                            <Input
                              id="mfr-name"
                              placeholder="e.g., Kanchipuram Weavers Co."
                              value={newManufacturer.name}
                              onChange={(e) => setNewManufacturer({ ...newManufacturer, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="owner-name">Owner Name</Label>
                            <Input
                              id="owner-name"
                              placeholder="e.g., Rajesh Kumar"
                              value={newManufacturer.ownerName}
                              onChange={(e) => setNewManufacturer({ ...newManufacturer, ownerName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mfr-email">Email</Label>
                            <Input
                              id="mfr-email"
                              type="email"
                              placeholder="e.g., contact@manufacturer.com"
                              value={newManufacturer.email}
                              onChange={(e) => setNewManufacturer({ ...newManufacturer, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mfr-phone">Phone</Label>
                            <Input
                              id="mfr-phone"
                              placeholder="e.g., +91 98765 43210"
                              value={newManufacturer.phone}
                              onChange={(e) => setNewManufacturer({ ...newManufacturer, phone: e.target.value })}
                            />
                          </div>

                          <div className="border-t border-border pt-4 mt-4 space-y-4">
                            <p className="text-muted-foreground font-medium">Manufacturer Address</p>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="full-name">Contact Person Name</Label>
                                <Input
                                  id="full-name"
                                  placeholder="e.g., Rajesh Kumar"
                                  value={newManufacturer.address.full_name}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, full_name: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input
                                  id="phone"
                                  placeholder="9876543210"
                                  value={newManufacturer.address.phone}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, phone: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="addr1">Address Line 1</Label>
                                <Input
                                  id="addr1"
                                  placeholder="Building, Street name"
                                  value={newManufacturer.address.address_line_1}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, address_line_1: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="addr2">Address Line 2 (Landmark)</Label>
                                <Input
                                  id="addr2"
                                  placeholder="Near temple, main road"
                                  value={newManufacturer.address.address_line_2}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, address_line_2: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Locality</Label>
                                <Input
                                  placeholder="Area / Colony"
                                  value={newManufacturer.address.locality}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, locality: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>City</Label>
                                <Input
                                  placeholder="City"
                                  value={newManufacturer.address.city}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, city: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>District</Label>
                                <Input
                                  placeholder="District"
                                  value={newManufacturer.address.district}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, district: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>State</Label>
                                <Input
                                  placeholder="State"
                                  value={newManufacturer.address.state}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, state: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Pincode</Label>
                                <Input
                                  placeholder="6-digit pincode"
                                  value={newManufacturer.address.pincode}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: { ...newManufacturer.address, pincode: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Address Type</Label>
                                <select
                                  className="w-full rounded-md border bg-background px-3 py-2"
                                  value={newManufacturer.address.address_type}
                                  onChange={(e) =>
                                    setNewManufacturer({
                                      ...newManufacturer,
                                      address: {
                                        ...newManufacturer.address,
                                        address_type: e.target.value as "pickup" | "warehouse" | "return",
                                      },
                                    })
                                  }
                                >
                                  <option value="pickup">Pickup</option>
                                  <option value="warehouse">Warehouse</option>
                                  <option value="return">Return</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-border pt-4 mt-4">
                            <p className="text-muted-foreground mb-4">Super Admin Authentication Required</p>
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="admin-email">Admin Email</Label>
                                <Input
                                  id="admin-email"
                                  type="email"
                                  placeholder="admin@taanttantra.com"
                                  value={adminEmail}
                                  onChange={(e) => {
                                    setAdminEmail(e.target.value);
                                    setShowAuthError(false);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="admin-password">Admin Password</Label>
                                <Input
                                  id="admin-password"
                                  type="password"
                                  placeholder="Enter password"
                                  value={adminPassword}
                                  onChange={(e) => {
                                    setAdminPassword(e.target.value);
                                    setShowAuthError(false);
                                  }}
                                />
                              </div>
                              {showAuthError && (
                                <div className="flex items-center gap-2 text-destructive">
                                  <AlertCircle className="w-4 h-4" />
                                  <p>Invalid admin credentials</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button onClick={addManufacturer} className="w-full">
                          Add Manufacturer
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredManufacturers.map((manufacturer) => (
                  <div
                    key={manufacturer.id}
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedManufacturer(manufacturer)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {manufacturer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-foreground">{manufacturer.name}</p>
                            <p className="text-muted-foreground">{manufacturer.ownerName}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{manufacturer.address.address_line_1}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{manufacturer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{manufacturer.phone}</span>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="p-2 rounded bg-background">
                            <p className="text-muted-foreground">Products</p>
                            <p className="text-foreground">{manufacturer.totalProducts}</p>
                          </div>
                          <div className="p-2 rounded bg-background">
                            <p className="text-muted-foreground">Revenue</p>
                            <div className="flex items-center gap-1 text-foreground">
                              <IndianRupee className="w-3 h-3" />
                              {(manufacturer.totalRevenue / 1000).toFixed(0)}K
                            </div>
                          </div>
                        </div>
                        {manufacturer.deliveryPartners.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <Truck className="w-4 h-4 text-muted-foreground" />
                              <p className="text-muted-foreground">Delivery Partners</p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {manufacturer.deliveryPartners.map((partnerId) => (
                                <DeliveryPartnerIcon key={partnerId} partnerId={partnerId} size="sm" />
                              ))}
                            </div>
                          </div>
                        )}
                        {manufacturer.pendingProducts > 0 && (
                          <Badge className="mt-2 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                            {manufacturer.pendingProducts} Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Catalogues */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Product Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 cursor-pointer space-y-3 transition-colors"
                    onClick={() => setSelectedPendingProduct(product)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-foreground">{product.name}</p>
                        <p className="text-muted-foreground">{product.manufacturer}</p>
                        <Badge variant="outline" className="mt-2">{product.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPendingProduct(product);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            approveProduct(product.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            rejectProduct(product.id);
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <div className="flex items-center gap-1 text-foreground">
                          <IndianRupee className="w-4 h-4" />
                          {product.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stock</p>
                        <p className="text-foreground">{product.stock} units</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Color</p>
                        <p className="text-foreground">{product.color}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <div className="flex items-center gap-1 text-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(product.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Logs */}
      <Card className="flex flex-col h-[400px]">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getLogIcon(log.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-foreground">{log.action}</p>
                        <p className="text-muted-foreground">{log.manufacturerName}</p>
                      </div>
                      <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                    </div>
                    <p className="text-muted-foreground mt-1">{log.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manufacturer Detail Modal */}
      <Dialog open={selectedManufacturer !== null} onOpenChange={(open) => !open && setSelectedManufacturer(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedManufacturer?.name} - Details</DialogTitle>
          </DialogHeader>
          {selectedManufacturer && (
            <div className="space-y-4 py-4">
              {/* Manufacturer Info */}
              <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedManufacturer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground">{selectedManufacturer.name}</p>
                    <p className="text-muted-foreground">{selectedManufacturer.ownerName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedManufacturer.address}</span>
                      {selectedManufacturer.deliveryPartners.length > 0 && (
                        <div className="flex items-center gap-1 ml-2">
                          {selectedManufacturer.deliveryPartners.map((partnerId) => (
                            <DeliveryPartnerIcon key={partnerId} partnerId={partnerId} size="sm" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-muted-foreground">Total Products</p>
                    <p className="text-foreground">{selectedManufacturer.totalProducts}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Revenue</p>
                    <div className="flex items-center gap-1 text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      {selectedManufacturer.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Approved</p>
                    <p className="text-foreground">{selectedManufacturer.approvedProducts}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="text-foreground">{selectedManufacturer.pendingProducts}</p>
                  </div>
                </div>
              </div>

              {/* Pending Products */}
              {getManufacturerPendingProducts(selectedManufacturer.id).length > 0 && (
                <div>
                  <h3 className="mb-3">Pending Approvals</h3>
                  <div className="space-y-2">
                    {getManufacturerPendingProducts(selectedManufacturer.id).map((product) => (
                      <div
                        key={product.id}
                        className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedPendingProduct(product)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-foreground">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{product.type}</Badge>
                              <span className="text-muted-foreground">₹{product.price.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPendingProduct(product);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                approveProduct(product.id);
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                rejectProduct(product.id);
                              }}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {selectedManufacturer.teamMembers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <h3>Team Members</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedManufacturer.teamMembers.map((member) => (
                      <div key={member.id} className="p-3 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-foreground">{member.name}</p>
                                <Badge variant="outline" className="mt-1">{member.role}</Badge>
                              </div>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Partners */}
              {selectedManufacturer.deliveryPartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <h3>Delivery Partners</h3>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <p className="text-muted-foreground mb-3">Available for pickups from {selectedManufacturer.address}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {selectedManufacturer.deliveryPartners.map((partnerId) => (
                        <div key={partnerId} className="flex flex-col items-center gap-2">
                          <DeliveryPartnerIcon partnerId={partnerId} size="md" />
                          <span className="text-muted-foreground">{getDeliveryPartnerName(partnerId)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Logs */}
              <div>
                <h3 className="mb-3">Recent Activity</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {getManufacturerLogs(selectedManufacturer.id).map((log) => (
                    <div key={log.id} className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-start gap-2">
                        {getLogIcon(log.type)}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-foreground">{log.action}</p>
                            <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                          </div>
                          <p className="text-muted-foreground">{log.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pending Product Detail Modal */}
      <Dialog open={selectedPendingProduct !== null} onOpenChange={(open) => !open && setSelectedPendingProduct(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPendingProduct?.isRemovalRequest ? 'Product Removal Request' : 'Pending Product'} - {selectedPendingProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedPendingProduct && (
            <div className="space-y-4 py-4">
              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <Badge variant="outline" className="mt-1">{selectedPendingProduct.type}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <div className="flex items-center gap-1 text-foreground mt-1">
                    <IndianRupee className="w-4 h-4" />
                    {selectedPendingProduct.price.toLocaleString()}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Stock</p>
                  <p className="text-foreground mt-1">{selectedPendingProduct.stock} units</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Color</p>
                  <p className="text-foreground mt-1">{selectedPendingProduct.color}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fabric</p>
                  <p className="text-foreground mt-1">{selectedPendingProduct.fabric}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Length</p>
                  <p className="text-foreground mt-1">{selectedPendingProduct.length}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Manufacturer</p>
                  <p className="text-foreground mt-1">{selectedPendingProduct.manufacturer}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Submitted Date</p>
                  <div className="flex items-center gap-1 text-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPendingProduct.submittedDate).toLocaleDateString()}
                  </div>
                </div>
                {selectedPendingProduct.description && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Description</p>
                    <p className="text-foreground mt-1">{selectedPendingProduct.description}</p>
                  </div>
                )}
                {selectedPendingProduct.images && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Images</p>
                    <div className="flex items-center gap-2">
                      {selectedPendingProduct.images.map((image, index) => (
                        <ImageWithFallback
                          key={index}
                          src={image}
                          alt={`${selectedPendingProduct.name} image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedPendingProduct.isRemovalRequest && selectedPendingProduct.existingProductId && (
                <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="text-red-900 dark:text-red-100">Removal Request</p>
                      <p className="text-red-700 dark:text-red-300 mt-1">
                        This manufacturer has requested to remove Product ID: {selectedPendingProduct.existingProductId}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPendingProduct(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    rejectProduct(selectedPendingProduct.id);
                    setSelectedPendingProduct(null);
                  }}
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    approveProduct(selectedPendingProduct.id);
                    setSelectedPendingProduct(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
