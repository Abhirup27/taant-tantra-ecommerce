import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Package,
  IndianRupee,
  User,
  MapPin,
  Truck,
  Eye,
  LayoutList,
  Table as TableIcon,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  CreditCard,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { CarrierIcon, getCarrierName } from './CarrierIcon';
import { LoadingAnimation } from './LoadingAnimation';
import { DatePicker } from './DatePicker';

interface TimelineEvent {
  timestamp: string;
  title: string;
  description: string;
  type: 'order' | 'payment' | 'fulfillment' | 'shipment' | 'delivery' | 'failure';
  fulfillmentId?: string;
}

interface OrderProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  manufacturer: string;
  manufacturerId: string;
  carrier: string;
  fulfillmentId: string;
}

interface Order {
  id: string;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'partial';
  totalAmount: number;
  products: OrderProduct[];
  paymentMethod: string;
  timeline: TimelineEvent[];
}

const initialOrders: Order[] = [
  {
    id: 'ORD001',
    transactionId: 'TXN001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    shippingAddress: '123 MG Road, Bangalore, Karnataka 560001',
    orderDate: '2024-11-30',
    status: 'shipped',
    totalAmount: 25800,
    paymentMethod: 'UPI',
    products: [
      {
        id: 'P001',
        name: 'Golden Zari Silk Saree',
        type: 'Silk',
        price: 15000,
        quantity: 1,
        manufacturer: 'Kanchipuram Weavers Co.',
        manufacturerId: 'MFR001',
        carrier: 'CR001',
        fulfillmentId: 'FUL001'
      },
      {
        id: 'P002',
        name: 'Handwoven Cotton Saree',
        type: 'Cotton',
        price: 3200,
        quantity: 2,
        manufacturer: 'Bengal Handloom Society',
        manufacturerId: 'MFR002',
        carrier: 'CR003',
        fulfillmentId: 'FUL002'
      },
      {
        id: 'P003',
        name: 'Designer Georgette Saree',
        type: 'Georgette',
        price: 4800,
        quantity: 1,
        manufacturer: 'Modern Textiles Ltd.',
        manufacturerId: 'MFR004',
        carrier: 'CR005',
        fulfillmentId: 'FUL003'
      }
    ],
    timeline: [
      {
        timestamp: '2024-11-30T09:00:00',
        title: 'Order Created',
        description: 'Order placed successfully',
        type: 'order'
      },
      {
        timestamp: '2024-11-30T09:05:00',
        title: 'Payment Confirmed',
        description: 'Payment received via UPI - ₹25,800',
        type: 'payment'
      },
      {
        timestamp: '2024-11-30T10:00:00',
        title: 'Fulfillment Created',
        description: 'FUL001 - Kanchipuram Weavers Co. assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL001'
      },
      {
        timestamp: '2024-11-30T09:30:00',
        title: 'Fulfillment Created',
        description: 'FUL002 - Bengal Handloom Society assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL002'
      },
      {
        timestamp: '2024-11-30T11:00:00',
        title: 'Fulfillment Created',
        description: 'FUL003 - Modern Textiles Ltd. assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL003'
      },
      {
        timestamp: '2024-11-30T13:00:00',
        title: 'Picked Up',
        description: 'FUL002 picked up by Blue Dart from Kolkata',
        type: 'shipment',
        fulfillmentId: 'FUL002'
      },
      {
        timestamp: '2024-11-30T14:30:00',
        title: 'Picked Up',
        description: 'FUL001 picked up by FedEx from Kanchipuram',
        type: 'shipment',
        fulfillmentId: 'FUL001'
      },
      {
        timestamp: '2024-11-30T15:20:00',
        title: 'Picked Up',
        description: 'FUL003 picked up by Delhivery from Surat',
        type: 'shipment',
        fulfillmentId: 'FUL003'
      },
      {
        timestamp: '2024-12-01T16:45:00',
        title: 'Delivered',
        description: 'FUL002 delivered successfully',
        type: 'delivery',
        fulfillmentId: 'FUL002'
      }
    ]
  },
  {
    id: 'ORD002',
    transactionId: 'TXN002',
    customerName: 'Anjali Patel',
    customerEmail: 'anjali.p@email.com',
    shippingAddress: '456 Park Street, Kolkata, West Bengal 700016',
    orderDate: '2024-11-29',
    status: 'delivered',
    totalAmount: 22000,
    paymentMethod: 'Credit Card',
    products: [
      {
        id: 'P004',
        name: 'Banarasi Brocade Saree',
        type: 'Silk',
        price: 22000,
        quantity: 1,
        manufacturer: 'Varanasi Silk Weavers',
        manufacturerId: 'MFR003',
        carrier: 'CR004',
        fulfillmentId: 'FUL004'
      }
    ],
    timeline: [
      {
        timestamp: '2024-11-29T08:00:00',
        title: 'Order Created',
        description: 'Order placed successfully',
        type: 'order'
      },
      {
        timestamp: '2024-11-29T08:10:00',
        title: 'Payment Confirmed',
        description: 'Payment received via Credit Card - ₹22,000',
        type: 'payment'
      },
      {
        timestamp: '2024-11-29T10:15:00',
        title: 'Fulfillment Created',
        description: 'FUL004 - Varanasi Silk Weavers assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL004'
      },
      {
        timestamp: '2024-11-29T14:00:00',
        title: 'Picked Up',
        description: 'FUL004 picked up by DTDC from Varanasi',
        type: 'shipment',
        fulfillmentId: 'FUL004'
      },
      {
        timestamp: '2024-11-30T18:30:00',
        title: 'Delivered',
        description: 'FUL004 delivered successfully',
        type: 'delivery',
        fulfillmentId: 'FUL004'
      }
    ]
  },
  {
    id: 'ORD003',
    transactionId: 'TXN003',
    customerName: 'Meera Krishnan',
    customerEmail: 'meera.k@email.com',
    shippingAddress: '789 Anna Salai, Chennai, Tamil Nadu 600002',
    orderDate: '2024-11-28',
    status: 'processing',
    totalAmount: 18500,
    paymentMethod: 'Net Banking',
    products: [
      {
        id: 'P005',
        name: 'Temple Border Silk Saree',
        type: 'Silk',
        price: 18500,
        quantity: 1,
        manufacturer: 'Kanchipuram Weavers Co.',
        manufacturerId: 'MFR001',
        carrier: 'CR001',
        fulfillmentId: 'FUL005'
      }
    ],
    timeline: [
      {
        timestamp: '2024-11-28T07:00:00',
        title: 'Order Created',
        description: 'Order placed successfully',
        type: 'order'
      },
      {
        timestamp: '2024-11-28T07:15:00',
        title: 'Payment Confirmed',
        description: 'Payment received via UPI - ₹18,500',
        type: 'payment'
      },
      {
        timestamp: '2024-11-28T09:00:00',
        title: 'Fulfillment Created',
        description: 'FUL005 - Kanchipuram Weavers Co. assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL005'
      }
    ]
  },
  {
    id: 'ORD004',
    transactionId: 'TXN004',
    customerName: 'Neha Verma',
    customerEmail: 'neha.v@email.com',
    shippingAddress: '321 Civil Lines, Delhi 110054',
    orderDate: '2024-11-27',
    status: 'cancelled',
    totalAmount: 12400,
    paymentMethod: 'Debit Card',
    products: [
      {
        id: 'P006',
        name: 'Chanderi Silk Cotton Mix',
        type: 'Cotton',
        price: 6200,
        quantity: 2,
        manufacturer: 'Chanderi Weavers Guild',
        manufacturerId: 'MFR005',
        carrier: 'CR006',
        fulfillmentId: 'FUL006'
      }
    ],
    timeline: [
      {
        timestamp: '2024-11-27T06:00:00',
        title: 'Order Created',
        description: 'Order placed successfully',
        type: 'order'
      },
      {
        timestamp: '2024-11-27T06:20:00',
        title: 'Payment Confirmed',
        description: 'Payment received via Debit Card - ₹12,400',
        type: 'payment'
      },
      {
        timestamp: '2024-11-27T08:30:00',
        title: 'Fulfillment Created',
        description: 'FUL006 - Chanderi Weavers Guild assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL006'
      },
      {
        timestamp: '2024-11-28T10:00:00',
        title: 'Fulfillment Failed',
        description: 'FUL006 - Stock unavailable. Item not in inventory',
        type: 'failure',
        fulfillmentId: 'FUL006'
      },
      {
        timestamp: '2024-11-28T10:30:00',
        title: 'Order Cancelled',
        description: 'Order cancelled due to fulfillment failure. Refund initiated',
        type: 'failure'
      }
    ]
  },
  {
    id: 'ORD005',
    transactionId: 'TXN005',
    customerName: 'Shalini Reddy',
    customerEmail: 'shalini.r@email.com',
    shippingAddress: '555 Jubilee Hills, Hyderabad, Telangana 500033',
    orderDate: '2024-11-30',
    status: 'partial',
    totalAmount: 15600,
    paymentMethod: 'UPI',
    products: [
      {
        id: 'P007',
        name: 'Tant Saree',
        type: 'Cotton',
        price: 2800,
        quantity: 3,
        manufacturer: 'Bengal Handloom Society',
        manufacturerId: 'MFR002',
        carrier: 'CR003',
        fulfillmentId: 'FUL007'
      },
      {
        id: 'P008',
        name: 'Chanderi Silk Cotton Mix',
        type: 'Cotton',
        price: 6200,
        quantity: 1,
        manufacturer: 'Chanderi Weavers Guild',
        manufacturerId: 'MFR005',
        carrier: 'CR006',
        fulfillmentId: 'FUL008'
      }
    ],
    timeline: [
      {
        timestamp: '2024-11-30T06:00:00',
        title: 'Order Created',
        description: 'Order placed successfully',
        type: 'order'
      },
      {
        timestamp: '2024-11-30T06:10:00',
        title: 'Payment Confirmed',
        description: 'Payment received via UPI - ₹15,600',
        type: 'payment'
      },
      {
        timestamp: '2024-11-30T07:00:00',
        title: 'Fulfillment Created',
        description: 'FUL007 - Bengal Handloom Society assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL007'
      },
      {
        timestamp: '2024-11-29T10:00:00',
        title: 'Fulfillment Created',
        description: 'FUL008 - Chanderi Weavers Guild assigned',
        type: 'fulfillment',
        fulfillmentId: 'FUL008'
      },
      {
        timestamp: '2024-11-30T11:30:00',
        title: 'Picked Up',
        description: 'FUL007 picked up by Blue Dart from Kolkata',
        type: 'shipment',
        fulfillmentId: 'FUL007'
      },
      {
        timestamp: '2024-11-29T14:30:00',
        title: 'Picked Up',
        description: 'FUL008 picked up by Ecom Express from Chanderi',
        type: 'shipment',
        fulfillmentId: 'FUL008'
      },
      {
        timestamp: '2024-11-30T18:00:00',
        title: 'Delivered',
        description: 'FUL008 delivered successfully',
        type: 'delivery',
        fulfillmentId: 'FUL008'
      },
      {
        timestamp: '2024-12-01T09:00:00',
        title: 'Delivery Failed',
        description: 'FUL007 - Carrier accident. Package damaged during transit. Refund of ₹8,400 initiated',
        type: 'failure',
        fulfillmentId: 'FUL007'
      }
    ]
  }
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'partial':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'fulfillment':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case 'shipment':
        return <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'delivery':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'failure':
        return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'payment':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'fulfillment':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'shipment':
        return 'bg-purple-100 dark:bg-purple-900/30';
      case 'delivery':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'failure':
        return 'bg-red-100 dark:bg-red-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getUniqueManufacturers = (products: OrderProduct[]) => {
    return [...new Set(products.map(p => p.manufacturer))];
  };

  const getUniqueCarriers = (products: OrderProduct[]) => {
    return [...new Set(products.map(p => p.carrier))];
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    const matchesPaymentMethod = paymentMethodFilter === 'all' || order.paymentMethod === paymentMethodFilter;
    
    const orderDate = new Date(order.orderDate);
    const matchesStartDate = !startDate || orderDate >= new Date(startDate);
    const matchesEndDate = !endDate || orderDate <= new Date(endDate);
    
    const matchesMinAmount = !minAmount || order.totalAmount >= parseFloat(minAmount);
    const matchesMaxAmount = !maxAmount || order.totalAmount <= parseFloat(maxAmount);
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesStartDate && matchesEndDate && matchesMinAmount && matchesMaxAmount;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      case 'oldest':
        return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      case 'amount-high':
        return b.totalAmount - a.totalAmount;
      case 'amount-low':
        return a.totalAmount - b.totalAmount;
      case 'name-asc':
        return a.customerName.localeCompare(b.customerName);
      case 'name-desc':
        return b.customerName.localeCompare(a.customerName);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsLoading(false);
    }, 800);
  };

  const handleFilterChange = (callback: () => void) => {
    callback(); // Update state immediately
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Just hide loading after animation
    }, 800);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            {/* Top Row: Title */}
            <CardTitle>Orders Management</CardTitle>

            {/* Controls Row: Search, View Toggle, and Filters Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search - Left side */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => {
                    handleFilterChange(() => setSearchQuery(e.target.value));
                  }}
                  className="pl-10 h-10"
                />
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8"
                  >
                    <LayoutList className="w-4 h-4 mr-1" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="h-8"
                  >
                    <TableIcon className="w-4 h-4 mr-1" />
                    Table
                  </Button>
                </div>

                {/* Show/Hide Filters Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </div>

            {/* Filter Controls - Expandable */}
            {showFilters && (
              <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-3">
                {/* Main Filters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Sort By */}
                  <Select 
                    value={sortBy} 
                    onValueChange={(value) => {
                      handleFilterChange(() => setSortBy(value));
                    }}
                  >
                    <SelectTrigger>
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                      <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select 
                    value={statusFilter} 
                    onValueChange={(value) => {
                      handleFilterChange(() => setStatusFilter(value));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Payment Method Filter */}
                  <Select 
                    value={paymentMethodFilter} 
                    onValueChange={(value) => {
                      handleFilterChange(() => setPaymentMethodFilter(value));
                    }}
                  >
                    <SelectTrigger>
                      <CreditCard className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Net Banking">Net Banking</SelectItem>
                      <SelectItem value="COD">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date Range - Combined on Desktop, Separate on Mobile */}
                  <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {/* From Date */}
                    <DatePicker
                      label="From Date"
                      value={startDate}
                      onChange={(date) => {
                        handleFilterChange(() => setStartDate(date));
                      }}
                      placeholder="Select start date"
                    />

                    {/* To Date - Mobile/Tablet */}
                    <div className="lg:hidden">
                      <DatePicker
                        label="To Date"
                        value={endDate}
                        onChange={(date) => {
                          handleFilterChange(() => setEndDate(date));
                        }}
                        placeholder="Select end date"
                      />
                    </div>
                  </div>

                  {/* To Date - Desktop Only (next to From Date) */}
                  <div className="hidden lg:block">
                    <DatePicker
                      label="To Date"
                      value={endDate}
                      onChange={(date) => {
                        handleFilterChange(() => setEndDate(date));
                      }}
                      placeholder="Select end date"
                    />
                  </div>

                  {/* Min Amount */}
                  <div>
                    <label className="text-muted-foreground mb-1 block">Min Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={minAmount}
                      onChange={(e) => {
                        handleFilterChange(() => setMinAmount(e.target.value));
                      }}
                    />
                  </div>

                  {/* Max Amount */}
                  <div>
                    <label className="text-muted-foreground mb-1 block">Max Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="100000"
                      value={maxAmount}
                      onChange={(e) => {
                        handleFilterChange(() => setMaxAmount(e.target.value));
                      }}
                    />
                  </div>
                </div>

                {/* Clear Filters Button - Separate Bottom Row */}
                <div className="pt-2 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleFilterChange(() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setPaymentMethodFilter('all');
                        setStartDate('');
                        setEndDate('');
                        setMinAmount('');
                        setMaxAmount('');
                        setSortBy('newest');
                      });
                    }}
                    className="w-full sm:w-auto"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Active Filters Summary */}
            {!showFilters && (statusFilter !== 'all' || paymentMethodFilter !== 'all' || startDate || endDate || minAmount || maxAmount || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-muted-foreground">Active filters:</span>
                {searchQuery && <Badge variant="secondary">Search: {searchQuery}</Badge>}
                {statusFilter !== 'all' && <Badge variant="secondary">Status: {statusFilter}</Badge>}
                {paymentMethodFilter !== 'all' && <Badge variant="secondary">Payment: {paymentMethodFilter}</Badge>}
                {startDate && <Badge variant="secondary">From: {startDate}</Badge>}
                {endDate && <Badge variant="secondary">To: {endDate}</Badge>}
                {minAmount && <Badge variant="secondary">Min: ₹{minAmount}</Badge>}
                {maxAmount && <Badge variant="secondary">Max: ₹{maxAmount}</Badge>}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {paginatedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <p className="text-foreground">{order.id}</p>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4" />
                              <span>{order.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Package className="w-4 h-4" />
                              <span>{order.products.length} product{order.products.length > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground">
                              <IndianRupee className="w-4 h-4" />
                              <span>{order.totalAmount.toLocaleString()}</span>
                            </div>
                          </div>

                          {getUniqueManufacturers(order.products).length > 1 && (
                            <div className="flex items-center gap-2 mt-2">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {getUniqueManufacturers(order.products).length} manufacturers
                              </span>
                            </div>
                          )}

                          {getUniqueCarriers(order.products).length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <Truck className="w-4 h-4 text-muted-foreground" />
                              <div className="flex items-center gap-1">
                                {getUniqueCarriers(order.products).map((carrierId) => (
                                  <CarrierIcon key={carrierId} carrierId={carrierId} size="sm" />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {paginatedOrders.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No orders found matching your criteria
                    </div>
                  )}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b-2 border-border">
                      <tr className="text-left">
                        <th className="py-3 px-4 text-muted-foreground">Order ID</th>
                        <th className="py-3 px-4 text-muted-foreground">Customer</th>
                        <th className="py-3 px-4 text-muted-foreground">Date</th>
                        <th className="py-3 px-4 text-muted-foreground">Items</th>
                        <th className="py-3 px-4 text-muted-foreground">Total</th>
                        <th className="py-3 px-4 text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-muted-foreground">Carriers</th>
                        <th className="py-3 px-4 text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order) => (
                        <tr 
                          key={order.id} 
                          className="border-b border-border hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="py-4 px-4">
                            <span className="font-mono text-foreground">{order.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-foreground">{order.customerName}</p>
                              <p className="text-muted-foreground">{order.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-muted-foreground">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-foreground">{order.products.length}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-foreground">
                              <IndianRupee className="w-4 h-4" />
                              {order.totalAmount.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              {getUniqueCarriers(order.products).map((carrierId) => (
                                <CarrierIcon key={carrierId} carrierId={carrierId} size="sm" />
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {paginatedOrders.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No orders found matching your criteria
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={selectedOrder !== null} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(selectedOrder.status)} mt-2`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Transaction ID</p>
                  <p className="text-foreground font-mono mt-1">{selectedOrder.transactionId}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Customer</p>
                  <p className="text-foreground mt-1">{selectedOrder.customerName}</p>
                  <p className="text-muted-foreground">{selectedOrder.customerEmail}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="text-foreground mt-1">{selectedOrder.paymentMethod}</p>
                  <div className="flex items-center gap-1 text-foreground mt-1">
                    <IndianRupee className="w-4 h-4" />
                    {selectedOrder.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-muted-foreground">Shipping Address</p>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <p className="text-foreground">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((product) => (
                    <div key={product.id} className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-foreground">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline">{product.type}</Badge>
                            <span className="text-muted-foreground">Qty: {product.quantity}</span>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Manufacturer:</span>
                              <span className="text-xs text-foreground">{product.manufacturer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Carrier:</span>
                              <CarrierIcon carrierId={product.carrier} size="sm" />
                              <span className="text-xs text-muted-foreground">{getCarrierName(product.carrier)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Fulfillment ID:</span>
                              <span className="text-xs text-foreground font-mono">{product.fulfillmentId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-foreground">
                            <IndianRupee className="w-4 h-4" />
                            {(product.price * product.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="mb-4">Order Timeline</h3>
                <div className="space-y-3">
                  {selectedOrder.timeline
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${getTimelineColor(event.type)} flex items-center justify-center flex-shrink-0`}>
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-foreground">{event.title}</p>
                            {event.fulfillmentId && (
                              <p className="text-xs text-muted-foreground font-mono mt-0.5">{event.fulfillmentId}</p>
                            )}
                            <p className="text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
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
    </div>
  );
}