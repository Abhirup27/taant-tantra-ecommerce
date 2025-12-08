import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  IndianRupee,
  Calendar,
  TrendingUp,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  ArrowUpDown,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DatePicker } from './DatePicker';
import { LoadingAnimation } from './LoadingAnimation';

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

interface Product {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  price: number;
  stock: number;
  sold: number;
  dateAdded: string;
  images?: string[];
  color: string;
  fabric: string;
  length: string;
  description?: string;
  reviews?: Review[];
}

const initialProducts: Product[] = [
  {
    id: 'SAR001',
    name: 'Royal Silk Saree',
    type: 'Silk',
    manufacturer: 'Kanchipuram Weavers Co.',
    price: 12500,
    stock: 15,
    sold: 45,
    dateAdded: '2024-11-15',
    color: 'Deep Red',
    fabric: 'Pure Silk',
    length: '6.3 meters',
    description: 'An exquisite hand-woven pure silk saree featuring traditional Kanchipuram designs. Perfect for weddings and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1726981448126-c7fc9237cdb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzaWxrJTIwc2FyZWUlMjByZWR8ZW58MXx8fHwxNzY0NTg1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1703145219083-6037d97decb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMGVtYnJvaWRlcnklMjBkZXRhaWx8ZW58MXx8fHwxNzY0NTk4NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    reviews: [
      {
        id: 'r1',
        customer: 'Priya Sharma',
        rating: 5,
        comment: 'Absolutely stunning! The silk quality is exceptional and the color is exactly as shown. Worth every penny.',
        date: '2 days ago'
      },
      {
        id: 'r2',
        customer: 'Anjali Kapoor',
        rating: 5,
        comment: 'Beautiful saree! Received many compliments at the wedding. Highly recommended.',
        date: '1 week ago',
        reply: 'Thank you so much for your wonderful feedback! We\'re delighted you loved it.'
      }
    ]
  },
  {
    id: 'SAR002',
    name: 'Cotton Handloom Saree',
    type: 'Cotton',
    manufacturer: 'Bengal Handloom Society',
    price: 3500,
    stock: 28,
    sold: 89,
    dateAdded: '2024-11-20',
    color: 'Sky Blue',
    fabric: 'Handloom Cotton',
    length: '6.2 meters',
    description: 'Comfortable and breathable handloom cotton saree, perfect for everyday wear with traditional elegance.',
    images: [
      'https://images.unsplash.com/photo-1693987656974-fd493e765a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjb3R0b24lMjBzYXJlZSUyMGJsdWV8ZW58MXx8fHwxNzY0NTg1OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    reviews: [
      {
        id: 'r3',
        customer: 'Lakshmi Reddy',
        rating: 4,
        comment: 'Very comfortable cotton. Great for daily wear. Only wish there were more color options.',
        date: '3 days ago'
      }
    ]
  },
  {
    id: 'SAR003',
    name: 'Banarasi Silk Saree',
    type: 'Silk',
    manufacturer: 'Varanasi Silk Weavers',
    price: 18000,
    stock: 8,
    sold: 32,
    dateAdded: '2024-11-10',
    color: 'Golden Yellow',
    fabric: 'Banarasi Silk',
    length: '6.3 meters',
    description: 'Traditional Banarasi silk saree with intricate zari work and golden motifs. A timeless piece for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hcmFzaSUyMHNpbGslMjBzYXJlZSUyMGdvbGRlbnxlbnwxfHx8fDE3NjQ1ODU5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    reviews: [
      {
        id: 'r4',
        customer: 'Meera Joshi',
        rating: 5,
        comment: 'Traditional and elegant! The zari work is stunning. Perfect for my daughter\'s wedding.',
        date: '5 days ago'
      },
      {
        id: 'r5',
        customer: 'Shalini Gupta',
        rating: 5,
        comment: 'Gorgeous! The craftsmanship is outstanding. This is a true heirloom piece.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'SAR004',
    name: 'Georgette Party Wear',
    type: 'Georgette',
    manufacturer: 'Modern Textiles Ltd.',
    price: 4500,
    stock: 42,
    sold: 67,
    dateAdded: '2024-11-25',
    color: 'Emerald Green',
    fabric: 'Georgette',
    length: '6.0 meters',
    description: 'Modern georgette saree with contemporary design, perfect for parties and evening events.',
    images: [],
    reviews: [
      {
        id: 'r6',
        customer: 'Neha Patel',
        rating: 4,
        comment: 'Beautiful party wear! Light and easy to drape. The color is vibrant.',
        date: '4 days ago'
      }
    ]
  },
  {
    id: 'SAR005',
    name: 'Chanderi Silk Cotton',
    type: 'Cotton',
    manufacturer: 'Chanderi Weavers Guild',
    price: 5500,
    stock: 22,
    sold: 54,
    dateAdded: '2024-11-18',
    color: 'Peach',
    fabric: 'Silk Cotton',
    length: '6.2 meters',
    description: 'Delicate Chanderi silk cotton blend with traditional handwoven patterns and soft texture.',
    images: [],
    reviews: []
  },
  {
    id: 'SAR006',
    name: 'Chiffon Designer Saree',
    type: 'Chiffon',
    manufacturer: 'Mumbai Fashion House',
    price: 6200,
    stock: 18,
    sold: 41,
    dateAdded: '2024-11-22',
    color: 'Lavender',
    fabric: 'Pure Chiffon',
    length: '6.0 meters',
    description: 'Designer chiffon saree with modern embellishments, ideal for contemporary styling.',
    images: [],
    reviews: [
      {
        id: 'r7',
        customer: 'Kavita Singh',
        rating: 5,
        comment: 'Love the design! Very elegant and comfortable. Perfect for evening events.',
        date: '2 days ago'
      }
    ]
  },
  {
    id: 'SAR007',
    name: 'Tussar Silk Saree',
    type: 'Silk',
    manufacturer: 'Bihar Silk Federation',
    price: 8500,
    stock: 12,
    sold: 28,
    dateAdded: '2024-11-12',
    color: 'Mustard',
    fabric: 'Tussar Silk',
    length: '6.3 meters',
    description: 'Natural tussar silk saree with organic texture and earthy tones.',
    images: [],
    reviews: []
  },
  {
    id: 'SAR008',
    name: 'Linen Casual Saree',
    type: 'Cotton',
    manufacturer: 'South Indian Handlooms',
    price: 2800,
    stock: 35,
    sold: 95,
    dateAdded: '2024-11-28',
    color: 'Beige',
    fabric: 'Pure Linen',
    length: '6.0 meters',
    description: 'Lightweight linen saree for casual and office wear. Comfortable all-day wear.',
    images: [],
    reviews: [
      {
        id: 'r8',
        customer: 'Ritu Desai',
        rating: 4,
        comment: 'Great for daily wear! Very comfortable and easy to maintain.',
        date: '1 day ago'
      }
    ]
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

// Image Management Component
function ImageManager({ 
  images, 
  onImagesChange 
}: { 
  images: string[], 
  onImagesChange: (images: string[]) => void 
}) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            onImagesChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-3">
      <Label>Product Images</Label>
      
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
              <ImageWithFallback
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/50 text-white text-xs rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Label
          htmlFor="image-upload"
          className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {images.length === 0 ? 'Upload product images' : 'Add more images'}
          </span>
        </Label>
        <p className="text-xs text-muted-foreground mt-2">
          You can upload multiple images. First image will be the primary image.
        </p>
      </div>
    </div>
  );
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manufacturerSearch, setManufacturerSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<{ productId: string; review: Review } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const itemsPerPage = 6;

  const [newProduct, setNewProduct] = useState({
    name: '',
    type: 'Cotton',
    manufacturer: '',
    price: '',
    stock: '',
    color: '',
    fabric: '',
    length: '6.0 meters',
    description: '',
    images: [] as string[]
  });

  const handleFilterChange = (updateFn: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      updateFn();
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  // Get unique manufacturers from products
  const manufacturers = Array.from(new Set(products.map(p => p.manufacturer))).sort();
  
  // Filter manufacturers based on search
  const filteredManufacturers = manufacturers.filter(m => 
    m.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    
    const productDate = new Date(product.dateAdded);
    const matchesStartDate = !startDate || productDate >= new Date(startDate);
    const matchesEndDate = !endDate || productDate <= new Date(endDate);
    
    const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
    
    return matchesSearch && matchesType && matchesStartDate && matchesEndDate && matchesMinPrice && matchesMaxPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'stock-low':
        return a.stock - b.stock;
      case 'stock-high':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const addProduct = () => {
    if (newProduct.name && newProduct.manufacturer && newProduct.price && newProduct.stock) {
      const product: Product = {
        id: `SAR${String(products.length + 1).padStart(3, '0')}`,
        name: newProduct.name,
        type: newProduct.type,
        manufacturer: newProduct.manufacturer,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        sold: 0,
        dateAdded: new Date().toISOString().split('T')[0],
        color: newProduct.color,
        fabric: newProduct.fabric,
        length: newProduct.length,
        description: newProduct.description,
        images: newProduct.images,
        reviews: []
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        type: 'Cotton',
        manufacturer: '',
        price: '',
        stock: '',
        color: '',
        fabric: '',
        length: '6.0 meters',
        description: '',
        images: []
      });
      setIsAddDialogOpen(false);
    }
  };

  const updateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleReply = () => {
    if (selectedReview && replyText.trim()) {
      setProducts(products.map(product => {
        if (product.id === selectedReview.productId) {
          return {
            ...product,
            reviews: product.reviews?.map(review =>
              review.id === selectedReview.review.id
                ? { ...review, reply: replyText }
                : review
            )
          };
        }
        return product;
      }));
      setReplyText('');
      setSelectedReview(null);
      // Update viewing product if it's open
      if (viewingProduct && viewingProduct.id === selectedReview.productId) {
        const updatedProduct = products.find(p => p.id === selectedReview.productId);
        if (updatedProduct) {
          setViewingProduct({
            ...updatedProduct,
            reviews: updatedProduct.reviews?.map(review =>
              review.id === selectedReview.review.id
                ? { ...review, reply: replyText }
                : review
            )
          });
        }
      }
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock < 10) return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Low Stock</Badge>;
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">In Stock</Badge>;
  };

  const averageRating = (reviews?: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Products</p>
                <p className="text-foreground mt-1">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Stock</p>
                <p className="text-foreground mt-1">{products.reduce((acc, p) => acc + p.stock, 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Sold</p>
                <p className="text-foreground mt-1">{products.reduce((acc, p) => acc + p.sold, 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Low Stock Items</p>
                <p className="text-foreground mt-1">{products.filter(p => p.stock < 10).length}</p>
              </div>
              <Package className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <CardTitle>Product Inventory</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Image Manager */}
                    <ImageManager
                      images={newProduct.images}
                      onImagesChange={(images) => setNewProduct({ ...newProduct, images })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Royal Silk Saree"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={newProduct.type} onValueChange={(value) => setNewProduct({ ...newProduct, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cotton">Cotton</SelectItem>
                            <SelectItem value="Silk">Silk</SelectItem>
                            <SelectItem value="Georgette">Georgette</SelectItem>
                            <SelectItem value="Chiffon">Chiffon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manufacturer">Manufacturer/Weaver</Label>
                        <div className="relative">
                          <Select 
                            value={newProduct.manufacturer} 
                            onValueChange={(value) => {
                              setNewProduct({ ...newProduct, manufacturer: value });
                              setManufacturerSearch('');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select manufacturer" />
                            </SelectTrigger>
                            <SelectContent>
                              <div className="p-2">
                                <Input
                                  placeholder="Search manufacturers..."
                                  value={manufacturerSearch}
                                  onChange={(e) => setManufacturerSearch(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="mb-2"
                                />
                              </div>
                              {filteredManufacturers.length > 0 ? (
                                filteredManufacturers.map((manufacturer) => (
                                  <SelectItem key={manufacturer} value={manufacturer}>
                                    {manufacturer}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-muted-foreground">
                                  No manufacturers found
                                </div>
                              )}
                              {manufacturerSearch && !manufacturers.includes(manufacturerSearch) && (
                                <SelectItem value={manufacturerSearch}>
                                  Add "{manufacturerSearch}"
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="e.g., 5000"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder="e.g., 25"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          placeholder="e.g., Deep Red"
                          value={newProduct.color}
                          onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fabric">Fabric</Label>
                        <Input
                          id="fabric"
                          placeholder="e.g., Pure Silk"
                          value={newProduct.fabric}
                          onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="length">Length</Label>
                        <Select value={newProduct.length} onValueChange={(value) => setNewProduct({ ...newProduct, length: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6.0 meters">6.0 meters</SelectItem>
                            <SelectItem value="6.2 meters">6.2 meters</SelectItem>
                            <SelectItem value="6.3 meters">6.3 meters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the product..."
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="col-span-2">
                        <Button onClick={addProduct} className="w-full">
                          Add Product
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="stock-low">Stock (Low to High)</SelectItem>
                    <SelectItem value="stock-high">Stock (High to Low)</SelectItem>
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select 
                  value={filterType} 
                  onValueChange={(value) => {
                    handleFilterChange(() => setFilterType(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Silk">Silk</SelectItem>
                    <SelectItem value="Georgette">Georgette</SelectItem>
                    <SelectItem value="Chiffon">Chiffon</SelectItem>
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

                {/* Min Price */}
                <div>
                  <label className="text-muted-foreground mb-1 block">Min Price (₹)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      handleFilterChange(() => setMinPrice(e.target.value));
                    }}
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-muted-foreground mb-1 block">Max Price (₹)</label>
                  <Input
                    type="number"
                    placeholder="100000"
                    value={maxPrice}
                    onChange={(e) => {
                      handleFilterChange(() => setMaxPrice(e.target.value));
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
                      setFilterType('all');
                      setStartDate('');
                      setEndDate('');
                      setMinPrice('');
                      setMaxPrice('');
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
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground">Image</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Product Name</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Price</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Stock</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Rating</th>
                      <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className="border-b border-border hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      setViewingProduct(product);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <td className="py-4 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-muted-foreground">{product.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground">{product.name}</p>
                        <p className="text-muted-foreground">{product.color}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{product.type}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-foreground">
                        <IndianRupee className="w-4 h-4" />
                        {product.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground">{product.stock}</span>
                        {getStockBadge(product.stock)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {product.reviews && product.reviews.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <StarRating rating={Math.round(averageRating(product.reviews))} />
                          <span className="text-muted-foreground">({product.reviews.length})</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No reviews</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingProduct(product);
                            setCurrentImageIndex(0);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProduct(product);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            {editingProduct && (
                              <div className="space-y-4 py-4">
                                {/* Image Manager */}
                                <ImageManager
                                  images={editingProduct.images || []}
                                  onImagesChange={(images) => setEditingProduct({ ...editingProduct, images })}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="col-span-2 space-y-2">
                                    <Label htmlFor="edit-name">Product Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingProduct.name}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-type">Type</Label>
                                    <Select value={editingProduct.type} onValueChange={(value) => setEditingProduct({ ...editingProduct, type: value })}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Cotton">Cotton</SelectItem>
                                        <SelectItem value="Silk">Silk</SelectItem>
                                        <SelectItem value="Georgette">Georgette</SelectItem>
                                        <SelectItem value="Chiffon">Chiffon</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-manufacturer">Manufacturer/Weaver</Label>
                                    <div className="relative">
                                      <Select 
                                        value={editingProduct.manufacturer} 
                                        onValueChange={(value) => {
                                          setEditingProduct({ ...editingProduct, manufacturer: value });
                                          setManufacturerSearch('');
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select manufacturer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <div className="p-2">
                                            <Input
                                              placeholder="Search manufacturers..."
                                              value={manufacturerSearch}
                                              onChange={(e) => setManufacturerSearch(e.target.value)}
                                              onClick={(e) => e.stopPropagation()}
                                              className="mb-2"
                                            />
                                          </div>
                                          {filteredManufacturers.length > 0 ? (
                                            filteredManufacturers.map((manufacturer) => (
                                              <SelectItem key={manufacturer} value={manufacturer}>
                                                {manufacturer}
                                              </SelectItem>
                                            ))
                                          ) : (
                                            <div className="p-2 text-center text-muted-foreground">
                                              No manufacturers found
                                            </div>
                                          )}
                                          {manufacturerSearch && !manufacturers.includes(manufacturerSearch) && (
                                            <SelectItem value={manufacturerSearch}>
                                              Add "{manufacturerSearch}"
                                            </SelectItem>
                                          )}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-price">Price (₹)</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      value={editingProduct.price}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-stock">Stock</Label>
                                    <Input
                                      id="edit-stock"
                                      type="number"
                                      value={editingProduct.stock}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-color">Color</Label>
                                    <Input
                                      id="edit-color"
                                      value={editingProduct.color}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-fabric">Fabric</Label>
                                    <Input
                                      id="edit-fabric"
                                      value={editingProduct.fabric}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-length">Length</Label>
                                    <Select value={editingProduct.length} onValueChange={(value) => setEditingProduct({ ...editingProduct, length: value })}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="6.0 meters">6.0 meters</SelectItem>
                                        <SelectItem value="6.2 meters">6.2 meters</SelectItem>
                                        <SelectItem value="6.3 meters">6.3 meters</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="col-span-2 space-y-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      placeholder="Describe the product..."
                                      value={editingProduct.description || ''}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Button onClick={updateProduct} className="w-full">
                                      Update Product
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {paginatedProducts.map((product) => (
              <div 
                key={product.id} 
                className="p-4 rounded-lg border border-border bg-muted/30 space-y-3 cursor-pointer"
                onClick={() => {
                  setViewingProduct(product);
                  setCurrentImageIndex(0);
                }}
              >
                {product.images && product.images.length > 0 && (
                  <div className="w-full h-40 rounded-lg overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground">{product.name}</p>
                    <p className="text-muted-foreground font-mono">{product.id}</p>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                          <div className="space-y-4 py-4">
                            {/* Image Manager */}
                            <ImageManager
                              images={editingProduct.images || []}
                              onImagesChange={(images) => setEditingProduct({ ...editingProduct, images })}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="edit-name-mobile">Product Name</Label>
                                <Input
                                  id="edit-name-mobile"
                                  value={editingProduct.name}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-type-mobile">Type</Label>
                                <Select value={editingProduct.type} onValueChange={(value) => setEditingProduct({ ...editingProduct, type: value })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Cotton">Cotton</SelectItem>
                                    <SelectItem value="Silk">Silk</SelectItem>
                                    <SelectItem value="Georgette">Georgette</SelectItem>
                                    <SelectItem value="Chiffon">Chiffon</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-manufacturer-mobile">Manufacturer</Label>
                                <div className="relative">
                                  <Select 
                                    value={editingProduct.manufacturer} 
                                    onValueChange={(value) => {
                                      setEditingProduct({ ...editingProduct, manufacturer: value });
                                      setManufacturerSearch('');
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select manufacturer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <div className="p-2">
                                        <Input
                                          placeholder="Search manufacturers..."
                                          value={manufacturerSearch}
                                          onChange={(e) => setManufacturerSearch(e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="mb-2"
                                        />
                                      </div>
                                      {filteredManufacturers.length > 0 ? (
                                        filteredManufacturers.map((manufacturer) => (
                                          <SelectItem key={manufacturer} value={manufacturer}>
                                            {manufacturer}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <div className="p-2 text-center text-muted-foreground">
                                          No manufacturers found
                                        </div>
                                      )}
                                      {manufacturerSearch && !manufacturers.includes(manufacturerSearch) && (
                                        <SelectItem value={manufacturerSearch}>
                                          Add "{manufacturerSearch}"
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-price-mobile">Price (₹)</Label>
                                <Input
                                  id="edit-price-mobile"
                                  type="number"
                                  value={editingProduct.price}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-stock-mobile">Stock</Label>
                                <Input
                                  id="edit-stock-mobile"
                                  type="number"
                                  value={editingProduct.stock}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-color-mobile">Color</Label>
                                <Input
                                  id="edit-color-mobile"
                                  value={editingProduct.color}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-fabric-mobile">Fabric</Label>
                                <Input
                                  id="edit-fabric-mobile"
                                  value={editingProduct.fabric}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                                />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <Label htmlFor="edit-description-mobile">Description</Label>
                                <Textarea
                                  id="edit-description-mobile"
                                  placeholder="Describe the product..."
                                  value={editingProduct.description || ''}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="col-span-2">
                                <Button onClick={updateProduct} className="w-full">
                                  Update Product
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <Badge variant="outline" className="mt-1">{product.type}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stock</p>
                    <div className="mt-1">{getStockBadge(product.stock)}</div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <div className="flex items-center gap-1 text-foreground mt-1">
                      <IndianRupee className="w-4 h-4" />
                      {product.price.toLocaleString()}
                    </div>
                  </div>
                  {product.reviews && product.reviews.length > 0 && (
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={Math.round(averageRating(product.reviews))} />
                        <span className="text-muted-foreground">({product.reviews.length})</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <p className="text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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
          )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      <Dialog open={viewingProduct !== null} onOpenChange={(open) => !open && setViewingProduct(null)}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          {viewingProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{viewingProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Product Images */}
                {viewingProduct.images && viewingProduct.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={viewingProduct.images[currentImageIndex]}
                        alt={viewingProduct.name}
                        className="w-full h-full object-cover"
                      />
                      {viewingProduct.images.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? viewingProduct.images!.length - 1 : prev - 1
                            )}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === viewingProduct.images!.length - 1 ? 0 : prev + 1
                            )}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    {viewingProduct.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {viewingProduct.images.map((image, index) => (
                          <button
                            key={index}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? 'border-primary'
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <ImageWithFallback
                              src={image}
                              alt={`${viewingProduct.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Product ID</p>
                    <p className="text-foreground font-mono">{viewingProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <Badge variant="outline" className="mt-1">{viewingProduct.type}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <div className="flex items-center gap-1 text-foreground mt-1">
                      <IndianRupee className="w-4 h-4" />
                      {viewingProduct.price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stock</p>
                    <div className="mt-1">{getStockBadge(viewingProduct.stock)}</div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Color</p>
                    <p className="text-foreground">{viewingProduct.color}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fabric</p>
                    <p className="text-foreground">{viewingProduct.fabric}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Length</p>
                    <p className="text-foreground">{viewingProduct.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sold</p>
                    <p className="text-foreground">{viewingProduct.sold} units</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Manufacturer</p>
                    <p className="text-foreground">{viewingProduct.manufacturer}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Date Added</p>
                    <div className="flex items-center gap-1 text-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(viewingProduct.dateAdded).toLocaleDateString()}
                    </div>
                  </div>
                  {viewingProduct.description && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Description</p>
                      <p className="text-foreground mt-1">{viewingProduct.description}</p>
                    </div>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground">Customer Reviews</h3>
                    {viewingProduct.reviews && viewingProduct.reviews.length > 0 && (
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(averageRating(viewingProduct.reviews))} />
                        <span className="text-muted-foreground">
                          {averageRating(viewingProduct.reviews).toFixed(1)} ({viewingProduct.reviews.length} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  {viewingProduct.reviews && viewingProduct.reviews.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {viewingProduct.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 rounded-lg border border-border bg-muted/30 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {review.customer.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-foreground">{review.customer}</p>
                                <p className="text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-foreground">{review.comment}</p>
                          
                          {review.reply && (
                            <div className="mt-3 pl-4 border-l-2 border-primary bg-primary/5 p-3 rounded">
                              <p className="text-primary mb-1">Admin Reply:</p>
                              <p className="text-foreground">{review.reply}</p>
                            </div>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setSelectedReview({ productId: viewingProduct.id, review });
                              setReplyText(review.reply || '');
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            {review.reply ? 'Edit Reply' : 'Reply'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No reviews yet for this product
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={selectedReview !== null} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              {/* Review Preview */}
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-muted-foreground">Review by {selectedReview.review.customer}</p>
                  <StarRating rating={selectedReview.review.rating} />
                </div>
                <p className="text-foreground mt-1">{selectedReview.review.comment}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply here..."
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReview(null);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {selectedReview.review.reply ? 'Update Reply' : 'Post Reply'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
