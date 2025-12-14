import { useState } from 'react';
import { DashboardSidebar } from './components/DashboardSidebar';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { StatsCard } from './components/StatsCard';
import { SalesChart } from './components/SalesChart';
import { CategoryChart } from './components/CategoryChart';
import { RecentOrders } from './components/RecentOrders';
import { InstagramStats } from './components/InstagramStats';
import { DiscountCoupons } from './components/DiscountCoupons';
import { ProductReviews } from './components/ProductReviews';
import { ProductsPage } from './components/ProductsPage';
import { ManufacturersPage } from './components/ManufacturersPage';
import { OrdersPage } from './components/OrdersPage';
import { FulfillmentsPage } from './components/FulfillmentsPage';
import { TrendingUp, ShoppingBag, Users, IndianRupee, Menu, LogOut } from 'lucide-react';
import { Button } from './components/ui/button';
import "../index.css";
export default function AdminPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    // In a real application, this would clear auth tokens and redirect to login
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      // For demo purposes, just reload the page
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1>{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'products' ? 'Products' : activeTab === 'orders' ? 'Orders' : activeTab === 'fulfillments' ? 'Fulfillments' : activeTab === 'customers' ? 'Customers' : activeTab === 'manufacturers' ? 'Manufacturers' : 'Analytics'}</h1>
              <p className="text-muted-foreground hidden sm:block">Welcome back to Taant Tantra Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatsCard
                  title="Total Revenue"
                  value="₹8,95,000"
                  change="+12.5% from last month"
                  isPositive={true}
                  icon={IndianRupee}
                />
                <StatsCard
                  title="Total Orders"
                  value="1,248"
                  change="+8.2% from last month"
                  isPositive={true}
                  icon={ShoppingBag}
                />
                <StatsCard
                  title="Active Customers"
                  value="856"
                  change="+15.3% from last month"
                  isPositive={true}
                  icon={Users}
                />
                <StatsCard
                  title="Growth Rate"
                  value="23.5%"
                  change="+4.1% from last month"
                  isPositive={true}
                  icon={TrendingUp}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                  <SalesChart />
                </div>
                <div>
                  <CategoryChart />
                </div>
              </div>

              {/* Orders - Full Width */}
              <div className="overflow-x-auto">
                <RecentOrders />
              </div>

              {/* Product Reviews and Instagram Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                  <ProductReviews />
                </div>
                <div>
                  <InstagramStats />
                </div>
              </div>

              {/* Discount Coupons */}
              <DiscountCoupons />
            </>
          )}

          {activeTab === 'products' && <ProductsPage />}

          {activeTab === 'manufacturers' && <ManufacturersPage />}

          {activeTab === 'orders' && <OrdersPage />}

          {activeTab === 'fulfillments' && <FulfillmentsPage />}

          {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'manufacturers' && activeTab !== 'orders' && activeTab !== 'fulfillments' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2>Coming Soon</h2>
                <p className="text-muted-foreground mt-2">This section is under development</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
