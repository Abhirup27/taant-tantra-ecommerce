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
  Package,
  MapPin,
  Truck,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  LayoutList,
  Table as TableIcon,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { CarrierIcon, getCarrierName } from './CarrierIcon';
import { LoadingAnimation } from './LoadingAnimation';
import { DatePicker } from './DatePicker';

interface FulfillmentItem {
  fulfillmentId: string;
  orderProductId: string;
  productName: string;
  quantity: number;
}

interface Fulfillment {
  id: string;
  orderId: string;
  manufacturerId: string;
  manufacturerName: string;
  carrierId: string;
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';
  shippedFromLocation: string;
  createdAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  items: FulfillmentItem[];
}

const initialFulfillments: Fulfillment[] = [
  {
    id: 'FUL001',
    orderId: 'ORD001',
    manufacturerId: 'MFR001',
    manufacturerName: 'Kanchipuram Weavers Co.',
    carrierId: 'CR001',
    trackingNumber: 'FDX123456789IN',
    status: 'in_transit',
    shippedFromLocation: 'Kanchipuram, Tamil Nadu',
    createdAt: '2024-11-30T10:00:00',
    pickedUpAt: '2024-11-30T14:30:00',
    items: [
      {
        fulfillmentId: 'FUL001',
        orderProductId: 'P001',
        productName: 'Golden Zari Silk Saree',
        quantity: 1
      }
    ]
  },
  {
    id: 'FUL002',
    orderId: 'ORD001',
    manufacturerId: 'MFR002',
    manufacturerName: 'Bengal Handloom Society',
    carrierId: 'CR003',
    trackingNumber: 'BD987654321IN',
    status: 'delivered',
    shippedFromLocation: 'Kolkata, West Bengal',
    createdAt: '2024-11-30T09:30:00',
    pickedUpAt: '2024-11-30T13:00:00',
    deliveredAt: '2024-12-01T16:45:00',
    items: [
      {
        fulfillmentId: 'FUL002',
        orderProductId: 'P002',
        productName: 'Handwoven Cotton Saree',
        quantity: 2
      }
    ]
  },
  {
    id: 'FUL003',
    orderId: 'ORD001',
    manufacturerId: 'MFR004',
    manufacturerName: 'Modern Textiles Ltd.',
    carrierId: 'CR005',
    trackingNumber: 'DLV456789123IN',
    status: 'picked_up',
    shippedFromLocation: 'Surat, Gujarat',
    createdAt: '2024-11-30T11:00:00',
    pickedUpAt: '2024-11-30T15:20:00',
    items: [
      {
        fulfillmentId: 'FUL003',
        orderProductId: 'P003',
        productName: 'Designer Georgette Saree',
        quantity: 1
      }
    ]
  },
  {
    id: 'FUL004',
    orderId: 'ORD002',
    manufacturerId: 'MFR003',
    manufacturerName: 'Varanasi Silk Weavers',
    carrierId: 'CR004',
    trackingNumber: 'DTC789123456IN',
    status: 'in_transit',
    shippedFromLocation: 'Varanasi, Uttar Pradesh',
    createdAt: '2024-11-29T10:15:00',
    pickedUpAt: '2024-11-29T14:00:00',
    items: [
      {
        fulfillmentId: 'FUL004',
        orderProductId: 'P004',
        productName: 'Banarasi Brocade Saree',
        quantity: 1
      }
    ]
  },
  {
    id: 'FUL005',
    orderId: 'ORD003',
    manufacturerId: 'MFR001',
    manufacturerName: 'Kanchipuram Weavers Co.',
    carrierId: 'CR001',
    trackingNumber: 'FDX111222333IN',
    status: 'pending',
    shippedFromLocation: 'Kanchipuram, Tamil Nadu',
    createdAt: '2024-11-28T09:00:00',
    items: [
      {
        fulfillmentId: 'FUL005',
        orderProductId: 'P005',
        productName: 'Temple Border Silk Saree',
        quantity: 1
      }
    ]
  },
  {
    id: 'FUL006',
    orderId: 'ORD004',
    manufacturerId: 'MFR005',
    manufacturerName: 'Chanderi Weavers Guild',
    carrierId: 'CR006',
    trackingNumber: 'ECM333444555IN',
    status: 'failed',
    shippedFromLocation: 'Chanderi, Madhya Pradesh',
    createdAt: '2024-11-27T08:30:00',
    failureReason: 'Stock unavailable - Item not in inventory',
    items: [
      {
        fulfillmentId: 'FUL006',
        orderProductId: 'P006',
        productName: 'Chanderi Silk Cotton Mix',
        quantity: 2
      }
    ]
  },
  {
    id: 'FUL007',
    orderId: 'ORD005',
    manufacturerId: 'MFR002',
    manufacturerName: 'Bengal Handloom Society',
    carrierId: 'CR003',
    trackingNumber: 'BD555666777IN',
    status: 'failed',
    shippedFromLocation: 'Kolkata, West Bengal',
    createdAt: '2024-11-30T07:00:00',
    pickedUpAt: '2024-11-30T11:30:00',
    failureReason: 'Carrier accident - Package damaged during transit',
    items: [
      {
        fulfillmentId: 'FUL007',
        orderProductId: 'P007',
        productName: 'Tant Saree',
        quantity: 3
      }
    ]
  },
  {
    id: 'FUL008',
    orderId: 'ORD005',
    manufacturerId: 'MFR005',
    manufacturerName: 'Chanderi Weavers Guild',
    carrierId: 'CR006',
    trackingNumber: 'ECM777888999IN',
    status: 'delivered',
    shippedFromLocation: 'Chanderi, Madhya Pradesh',
    createdAt: '2024-11-29T10:00:00',
    pickedUpAt: '2024-11-29T14:30:00',
    deliveredAt: '2024-11-30T18:00:00',
    items: [
      {
        fulfillmentId: 'FUL008',
        orderProductId: 'P008',
        productName: 'Chanderi Silk Cotton Mix',
        quantity: 1
      }
    ]
  }
];

export function FulfillmentsPage() {
  const [fulfillments, setFulfillments] = useState<Fulfillment[]>(initialFulfillments);
  const [selectedFulfillment, setSelectedFulfillment] = useState<Fulfillment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'table'>('table');
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'picked_up':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'picked_up':
        return <Package className="w-4 h-4" />;
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleFilterChange = (updateFn: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      updateFn();
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  const filteredFulfillments = fulfillments.filter(fulfillment => {
    const matchesSearch = 
      fulfillment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fulfillment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fulfillment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fulfillment.manufacturerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || fulfillment.status === statusFilter;
    
    const fulfillmentDate = new Date(fulfillment.createdAt);
    const matchesStartDate = !startDate || fulfillmentDate >= new Date(startDate);
    const matchesEndDate = !endDate || fulfillmentDate <= new Date(endDate);
    
    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'id-asc':
        return a.id.localeCompare(b.id);
      case 'id-desc':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredFulfillments.length / itemsPerPage);
  const paginatedFulfillments = filteredFulfillments.slice(
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

  const stats = {
    total: fulfillments.length,
    pending: fulfillments.filter(f => f.status === 'pending').length,
    inTransit: fulfillments.filter(f => f.status === 'in_transit' || f.status === 'picked_up').length,
    delivered: fulfillments.filter(f => f.status === 'delivered').length,
    failed: fulfillments.filter(f => f.status === 'failed').length
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="text-foreground mt-1">{stats.total}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Pending</p>
                <p className="text-foreground mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">In Transit</p>
                <p className="text-foreground mt-1">{stats.inTransit}</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Delivered</p>
                <p className="text-foreground mt-1">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Failed</p>
                <p className="text-foreground mt-1">{stats.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fulfillments Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <CardTitle>Fulfillments</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search fulfillments..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 w-full sm:w-[250px]"
                  />
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
                      <SelectItem value="id-asc">ID (A-Z)</SelectItem>
                      <SelectItem value="id-desc">ID (Z-A)</SelectItem>
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
                      <SelectItem value="picked_up">Picked Up</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
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
                        setStartDate('');
                        setEndDate('');
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
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground">Fulfillment ID</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Manufacturer</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Carrier</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Tracking</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Location</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFulfillments.map((fulfillment) => (
                      <tr 
                        key={fulfillment.id} 
                        className="border-b border-border hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedFulfillment(fulfillment)}
                      >
                        <td className="py-4 px-4">
                          <span className="font-mono text-foreground">{fulfillment.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-muted-foreground">{fulfillment.orderId}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{fulfillment.manufacturerName}</p>
                            <p className="text-muted-foreground">{fulfillment.manufacturerId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <CarrierIcon carrierId={fulfillment.carrierId} size="sm" />
                            <span className="text-muted-foreground">{getCarrierName(fulfillment.carrierId)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-muted-foreground">{fulfillment.trackingNumber}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{fulfillment.shippedFromLocation}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(fulfillment.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(fulfillment.status)}
                              {fulfillment.status.replace('_', ' ').charAt(0).toUpperCase() + fulfillment.status.replace('_', ' ').slice(1)}
                            </div>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFulfillment(fulfillment);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {paginatedFulfillments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No fulfillments found matching your criteria
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredFulfillments.length)} of {filteredFulfillments.length} fulfillments
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

      {/* Fulfillment Detail Modal */}
      <Dialog open={selectedFulfillment !== null} onOpenChange={(open) => !open && setSelectedFulfillment(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fulfillment Details - {selectedFulfillment?.id}</DialogTitle>
          </DialogHeader>
          {selectedFulfillment && (
            <div className="space-y-4 py-4">
              {/* Status */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(selectedFulfillment.status)} mt-2`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedFulfillment.status)}
                      {selectedFulfillment.status.replace('_', ' ').charAt(0).toUpperCase() + selectedFulfillment.status.replace('_', ' ').slice(1)}
                    </div>
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="text-foreground font-mono mt-1">{selectedFulfillment.orderId}</p>
                </div>
              </div>

              {/* Failure Reason */}
              {selectedFulfillment.failureReason && (
                <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="text-red-900 dark:text-red-100">Failure Reason</p>
                      <p className="text-red-700 dark:text-red-300 mt-1">{selectedFulfillment.failureReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Manufacturer & Carrier */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Manufacturer</p>
                  <p className="text-foreground mt-1">{selectedFulfillment.manufacturerName}</p>
                  <p className="text-muted-foreground font-mono">{selectedFulfillment.manufacturerId}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Carrier</p>
                  <div className="flex items-center gap-2 mt-2">
                    <CarrierIcon carrierId={selectedFulfillment.carrierId} size="sm" />
                    <span className="text-foreground">{getCarrierName(selectedFulfillment.carrierId)}</span>
                  </div>
                </div>
              </div>

              {/* Tracking & Location */}
              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div>
                  <p className="text-muted-foreground">Tracking Number</p>
                  <p className="text-foreground font-mono mt-1">{selectedFulfillment.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Shipped From</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedFulfillment.shippedFromLocation}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="mb-3">Fulfillment Items</h3>
                <div className="space-y-2">
                  {selectedFulfillment.items.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-foreground">{item.productName}</p>
                          <p className="text-muted-foreground">Product ID: {item.orderProductId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="text-foreground">{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">Fulfillment Created</p>
                      <p className="text-muted-foreground">{new Date(selectedFulfillment.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {selectedFulfillment.pickedUpAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">Picked Up by Carrier</p>
                        <p className="text-muted-foreground">{new Date(selectedFulfillment.pickedUpAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedFulfillment.deliveredAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">Delivered</p>
                        <p className="text-muted-foreground">{new Date(selectedFulfillment.deliveredAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  {selectedFulfillment.status === 'failed' && selectedFulfillment.failureReason && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">Fulfillment Failed</p>
                        <p className="text-muted-foreground">{selectedFulfillment.failureReason}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}