export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'Women' | 'Men' | 'Accessories' | 'Footwear';
  subcategory: string;
  description: string;
  details: string[];
  materials: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size' | '38' | '39' | '40' | '41' | '42' | '43')[];
  colors: { name: string; hex: string }[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  tags: string[];
  occasion: ('Wedding' | 'Date Night' | 'Resort / Vacation' | 'Formal / Gala' | 'Casual Chic' | 'Workwear')[];
  style: ('Minimal' | 'Editorial' | 'Glam' | 'Boho' | 'Classic' | 'Contemporary' | 'Retro')[];
  gender: 'Women' | 'Men' | 'Unisex';
  fit?: string;
  pairsWith?: string[]; // array of product IDs that make a full outfit
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  recommendedProducts?: Product[];
  timestamp: string;
  suggestedFollowups?: string[];
  toolActionExecuted?: string;
  outfitComposition?: {
    items: Product[];
    totalCost: number;
  };
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  occasions: string[];
  styles: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}
