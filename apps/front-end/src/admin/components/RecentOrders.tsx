import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const allOrders = [
  {
    id: 'ORD-001',
    customer: 'Priya Sharma',
    product: 'Banarasi Silk Saree',
    amount: 12500,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    date: '2024-11-28'
  },
  {
    id: 'ORD-002',
    customer: 'Anjali Patel',
    product: 'Cotton Tant Saree',
    amount: 3200,
    paymentMethod: 'UPI',
    status: 'Processing',
    date: '2024-11-29'
  },
  {
    id: 'ORD-003',
    customer: 'Meera Reddy',
    product: 'Kanjivaram Silk Saree',
    amount: 18900,
    paymentMethod: 'Debit Card',
    status: 'Shipped',
    date: '2024-11-29'
  },
  {
    id: 'ORD-004',
    customer: 'Kavita Singh',
    product: 'Georgette Printed Saree',
    amount: 4500,
    paymentMethod: 'COD',
    status: 'Delivered',
    date: '2024-11-30'
  },
  {
    id: 'ORD-005',
    customer: 'Ritu Desai',
    product: 'Chiffon Embroidered Saree',
    amount: 6800,
    paymentMethod: 'UPI',
    status: 'Pending',
    date: '2024-12-01'
  },
  {
    id: 'ORD-006',
    customer: 'Sneha Gupta',
    product: 'Tussar Silk Saree',
    amount: 8900,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    date: '2024-11-25'
  },
  {
    id: 'ORD-007',
    customer: 'Divya Menon',
    product: 'Handloom Cotton Saree',
    amount: 2800,
    paymentMethod: 'UPI',
    status: 'Processing',
    date: '2024-11-26'
  },
  {
    id: 'ORD-008',
    customer: 'Asha Nair',
    product: 'Patola Silk Saree',
    amount: 22000,
    paymentMethod: 'Debit Card',
    status: 'Shipped',
    date: '2024-11-27'
  },
  {
    id: 'ORD-009',
    customer: 'Lakshmi Iyer',
    product: 'Chanderi Silk Saree',
    amount: 7500,
    paymentMethod: 'COD',
    status: 'Delivered',
    date: '2024-11-22'
  },
  {
    id: 'ORD-010',
    customer: 'Radha Krishnan',
    product: 'Sambalpuri Cotton Saree',
    amount: 3900,
    paymentMethod: 'UPI',
    status: 'Pending',
    date: '2024-11-23'
  },
  {
    id: 'ORD-011',
    customer: 'Sita Patel',
    product: 'Maheshwari Silk Saree',
    amount: 5600,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    date: '2024-11-20'
  },
  {
    id: 'ORD-012',
    customer: 'Geeta Reddy',
    product: 'Bomkai Silk Saree',
    amount: 9800,
    paymentMethod: 'Debit Card',
    status: 'Processing',
    date: '2024-11-21'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export function RecentOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  
  const itemsPerPage = 5;

  // Filter orders
  const filteredOrders = allOrders.filter(order => {
    // Payment filter
    if (paymentFilter !== 'all' && order.paymentMethod !== paymentFilter) {
      return false;
    }

    // Month filter
    if (monthFilter !== 'all') {
      const orderMonth = order.date.substring(0, 7); // Gets YYYY-MM
      if (orderMonth !== monthFilter) {
        return false;
      }
    }

    // Amount range filter
    if (minAmount && order.amount < parseInt(minAmount)) {
      return false;
    }
    if (maxAmount && order.amount > parseInt(maxAmount)) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Select 
            value={paymentFilter} 
            onValueChange={(value) => {
              setPaymentFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="COD">COD</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={monthFilter} 
            onValueChange={(value) => {
              setMonthFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="2024-12">December 2024</SelectItem>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 flex-1">
            <Input
              type="number"
              placeholder="Min Amount"
              value={minAmount}
              onChange={(e) => {
                setMinAmount(e.target.value);
                handleFilterChange();
              }}
              className="w-full sm:w-[140px]"
            />
            <Input
              type="number"
              placeholder="Max Amount"
              value={maxAmount}
              onChange={(e) => {
                setMaxAmount(e.target.value);
                handleFilterChange();
              }}
              className="w-full sm:w-[140px]"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}