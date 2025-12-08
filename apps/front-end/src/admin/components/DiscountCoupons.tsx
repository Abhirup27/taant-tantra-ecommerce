import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Plus, Ticket } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DatePicker } from "./DatePicker";
interface Coupon {
  id: string;
  code: string;
  discount: string;
  minOrder: string;
  category: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit: string;
  usageLimitCount?: number;
  usedCount: number;
}

const initialCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SILK50',
    discount: '50% OFF',
    minOrder: '₹5,000',
    category: 'Silk Sarees',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    isActive: true,
    usageLimit: 'once',
    usedCount: 45
  },
  {
    id: '2',
    code: 'WELCOME20',
    discount: '20% OFF',
    minOrder: '₹2,000',
    category: 'All Categories',
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    isActive: true,
    usageLimit: 'unlimited',
    usedCount: 128
  },
  {
    id: '3',
    code: 'FESTIVE30',
    discount: '30% OFF',
    minOrder: '₹3,000',
    category: 'Cotton Sarees',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    isActive: true,
    usageLimit: 'custom',
    usageLimitCount: 75,
    usedCount: 23
  }
];

export function DiscountCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    minOrder: '',
    category: 'All Categories',
    startDate: '',
    endDate: '',
    usageLimit: 'once',
    usageLimitCount: ''
  });

  const removeCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const addCoupon = () => {
    if (newCoupon.code && newCoupon.discount && newCoupon.minOrder && newCoupon.startDate && newCoupon.endDate) {
      const coupon: Coupon = {
        id: Date.now().toString(),
        code: newCoupon.code,
        discount: newCoupon.discount,
        minOrder: newCoupon.minOrder,
        category: newCoupon.category,
        startDate: newCoupon.startDate,
        endDate: newCoupon.endDate,
        isActive: true,
        usageLimit: newCoupon.usageLimit,
        usageLimitCount: newCoupon.usageLimit === 'custom' ? parseInt(newCoupon.usageLimitCount) : undefined,
        usedCount: 0
      };
      setCoupons([...coupons, coupon]);
      setNewCoupon({
        code: '',
        discount: '',
        minOrder: '',
        category: 'All Categories',
        startDate: '',
        endDate: '',
        usageLimit: 'once',
        usageLimitCount: ''
      });
      setIsDialogOpen(false);
    }
  };

  const getUsageLimitText = (coupon: Coupon) => {
    if (coupon.usageLimit === 'once') return 'Once per user';
    if (coupon.usageLimit === 'unlimited') return 'Unlimited';
    return `${coupon.usageLimitCount}x per user`;
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle>Active Discount Coupons</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., SUMMER25"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    placeholder="e.g., 25% OFF or ₹500 OFF"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order Value</Label>
                  <Input
                    id="minOrder"
                    placeholder="e.g., ₹2,000"
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newCoupon.category} onValueChange={(value) => setNewCoupon({ ...newCoupon, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      <SelectItem value="Cotton Sarees">Cotton Sarees</SelectItem>
                      <SelectItem value="Silk Sarees">Silk Sarees</SelectItem>
                      <SelectItem value="Georgette Sarees">Georgette Sarees</SelectItem>
                      <SelectItem value="Chiffon Sarees">Chiffon Sarees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="grid grid-cols-2 gap-4"> */}
                {/*   <div className="space-y-2"> */}
                <DatePicker
                  label="From Date"
                  value={newCoupon.startDate}
                  onChange={(date) => {
                    // setStartDate(date);
                    // newCoupon.startDate = date;
                    setNewCoupon({ ...newCoupon, startDate: date })
                  }}
                  placeholder="Select start date"
                />

                {/* <Label htmlFor="startDate">Start Date</Label> */}
                {/* <Input */}
                {/*   id="startDate" */}
                {/*   type="date" */}
                {/*   value={newCoupon.startDate} */}
                {/*   onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })} */}
                {/* /> */}
                {/* </div> */}
                {/* <div className="space-y-2"> */}
                {/* <Label htmlFor="endDate">End Date</Label> */}
                {/* <Input */}
                {/*   id="endDate" */}
                {/*   type="date" */}
                {/*   value={newCoupon.endDate} */}
                {/*   onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })} */}
                {/* /> */}
                <DatePicker
                  label="End Date"
                  value={newCoupon.endDate}
                  onChange={(date) => {
                    // setStartDate(date);
                    // newCoupon.startDate = date;
                    setNewCoupon({ ...newCoupon, endDate: date })
                  }}
                  placeholder="Select start date"
                />
                {/*   </div> */}
                {/**/}
                {/* </div> */}
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit Per User</Label>
                  <Select
                    value={newCoupon.usageLimit}
                    onValueChange={(value) => setNewCoupon({ ...newCoupon, usageLimit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="custom">Custom (N times)</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newCoupon.usageLimit === 'custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="usageLimitCount">Number of Uses Per User</Label>
                    <Input
                      id="usageLimitCount"
                      type="number"
                      placeholder="e.g., 5"
                      value={newCoupon.usageLimitCount}
                      onChange={(e) => setNewCoupon({ ...newCoupon, usageLimitCount: e.target.value })}
                    />
                  </div>
                )}
                <Button onClick={addCoupon} className="w-full">
                  Create Coupon
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-start justify-between p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono">{coupon.code}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {coupon.discount}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">
                    <p className="truncate">{coupon.category}</p>
                    <p>Min: {coupon.minOrder}</p>
                    <p>{getUsageLimitText(coupon)}</p>
                    <p className="text-primary">Used by {coupon.usedCount} customers</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCoupon(coupon.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
