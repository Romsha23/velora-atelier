# VÉLORA — Luxury Boutique E-Commerce & VELA AI Personal Stylist

> **VÉLORA** (*"Curated for your style."*) is a full-stack luxury boutique fashion e-commerce platform integrated with **VELA**, an intelligent AI personal stylist. Built using Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma ORM, Zod validation, and Google Gemini API.

---

## 🌟 Key Features & Technical Highlights

### 1. 🤖 VELA — Intelligent AI Personal Stylist
- **Natural Language Intent Extraction**: Parses client queries for category, price budget in ₹ INR (e.g. *"under ₹7,000"*), occasion (*wedding, date night, resort*), style preference (*minimal, glam, boho*), and color.
- **Controlled Function / Tool Calling**: Executes real-time catalog tools (`searchProducts`, `filterByBudget`, `getProductsByOccasion`, `buildOutfit`) against database items without hallucinating non-existent products.
- **AI Outfit Builder**: Assembles multi-piece outfits (Top + Bottom + Accessories/Shoes) matching occasion and budget with a single-click **"Add Entire Outfit to Bag"** button!
- **In-Chat Product Cards**: Displays product thumbnails, titles, prices in ₹ INR, and direct **"View Item"** and **"Add to Atelier Bag"** buttons inside the chat stream.
- **Zod Validation & Fallback**: All incoming client requests and AI tool parameters are validated using Zod schemas (`AIChatRequestSchema`). Operates dynamically via Gemini 1.5 Flash API or an offline intent engine fallback.

### 2. 👗 Full-Stack Luxury E-Commerce Architecture
- **Clean Service Layer Pattern**: Decouples UI components from backend logic:
  - `ProductService`: Catalog searching, multi-faceted filtering, and outfit composition.
  - `AIShoppingService`: VELA AI tool execution, Zod validation, and LLM processing.
  - `OrderService`: Server-side price verification, inventory checks, and order creation.
- **Relational Database Design (`prisma/schema.prisma`)**:
  - `User`, `Product`, `Category`, `Order`, `OrderItem`, `Wishlist`, `WishlistItem`.
- **Server-Side Order Price Verification**: Prevents client-side price tampering by recalculating line item subtotal server-side in `/api/orders`.
- **Multi-Faceted Search & Filters (`/shop`)**: Category tabs, price slider (₹3,000–₹20,000), sizes (`XS` to `XL`, `38` to `43`), occasion filters, sorting options, and grid column toggles.
- **Product Details (`/product/[slug]`)**: Thumbnail gallery switcher, zoom preview, color/size selection, material care, and **"Complete the Ensemble"** recommendations.
- **Slide-Over Bag & Page (`/cart`)**: Persistent cart drawer, free shipping progress bar, promo code validation (`VELORA10` for 10% off), and subtotal calculation.
- **Concierge Checkout & Tracking (`/checkout`, `/order-confirmation/[id]`)**: Zod-validated shipping form, mock Card/UPI/COD payment choices, and 4-stage live courier tracking simulator.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database & ORM**: Prisma ORM with SQLite/PostgreSQL schema
- **Validation**: Zod
- **Styling & Design**: Tailwind CSS, Playfair Display (Serif) & Plus Jakarta Sans (Body), VÉLORA Luxury Gold & Onyx Palette
- **Icons & Motion**: `lucide-react`, `framer-motion`
- **AI SDK**: `@google/generative-ai` (Google Gemini 1.5 Flash)

---

## 📁 System Architecture & Directory Structure

```
velora/
├── prisma/
│   └── schema.prisma             # Relational Database Schema (Product, User, Order, OrderItem, Wishlist)
├── app/
│   ├── layout.tsx                # Root layout with VÉLORA fonts, Providers & VELA AI Trigger
│   ├── page.tsx                  # Home Page (VÉLORA Hero, Curated Departments, VELA Banner, Journal)
│   ├── shop/page.tsx             # Shop / Collection (Category tabs, Price slider, Size/Color filters, Sorting)
│   ├── product/[slug]/page.tsx   # Product Details (Gallery, Specs, Material Care, Outfit Recommender)
│   ├── cart/page.tsx             # Shopping Bag (Server-calculated subtotal, Promo discount)
│   ├── checkout/page.tsx         # Concierge Checkout (Customer info, Shipping, Payment, API POST /api/orders)
│   ├── order-confirmation/[id]/  # Order confirmation receipt & live courier progress simulator
│   ├── wishlist/page.tsx         # Saved Wishlist items with Move to Bag
│   ├── journal/page.tsx          # Editorial Lookbook Magazine with direct Shop-the-Look action
│   ├── account/page.tsx          # User Account Profile & Past Orders History
│   └── api/
│       ├── ai/chat/route.ts      # VELA AI Endpoint (Zod validation & AIShoppingService)
│       ├── products/route.ts     # Products filter & search API route (ProductService)
│       └── orders/route.ts       # Order placement endpoint (OrderService)
├── components/
│   ├── navbar.tsx                # Luxury header with VÉLORA logo, search, cart count, Ask VELA button
│   ├── footer.tsx                # Editorial footer with brand manifesto, newsletter, flagship ateliers
│   ├── product-card.tsx          # High-end product card with hover gallery & quick bag
│   ├── cart-drawer.tsx           # Slide-over cart drawer with free shipping progress bar
│   ├── search-modal.tsx          # Global search overlay modal
│   └── ai-stylist/
│       ├── ai-stylist-widget.tsx # VELA AI floating drawer modal window
│       ├── chat-message.tsx      # Message renderer with embedded product cards & outfit builder card
│       └── starter-prompts.tsx   # Quick prompt inspiration chips
├── lib/
│   ├── services/
│   │   ├── productService.ts     # Product catalog query & outfit builder service layer
│   │   ├── aiShoppingService.ts  # VELA AI tool execution & LLM service layer
│   │   └── orderService.ts       # Order validation & server pricing service layer
│   ├── validations/
│   │   └── index.ts              # Zod validation schemas
│   ├── products-data.ts          # 30+ Detailed boutique fashion products database
│   ├── cart-context.tsx          # Cart state provider
│   ├── wishlist-context.tsx      # Wishlist state provider
│   └── ai-stylist-context.tsx    # VELA AI state provider
├── types/
│   └── index.ts                  # TypeScript domain interfaces
└── README.md                     # Technical architecture documentation
```

---

## 🚀 Environment Setup & Local Execution

### 1. Install Dependencies
```bash
cd elan-atelier
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Optional: Google Gemini API Key for VELA AI
# Get a free key at https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*Note: If no API key is provided, VELA automatically operates using its internal intent engine to parse queries, match budget/occasion tags, execute catalog search tools, and assemble outfits.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification
```bash
npm run build
npm run start
```

---

## 🧪 Testing & Verification Performed

- ✅ **VELA AI Stylist Queries**: Tested queries (*"Build an outfit under ₹6,000"*, *"wedding guest dress under ₹7,000"*, *"minimal for date night"*).
- ✅ **AI Outfit Builder**: Verified VELA combines matching garment + accessory + footwear with a single-click **"Add Entire Outfit"** button.
- ✅ **Zod Input Validation**: Verified validation on AI chat requests, order checkout forms, and catalog query parameters.
- ✅ **Server-Side Pricing**: Verified `/api/orders` recalculates item subtotals on the server, ignoring client price overrides.
- ✅ **Shop Page Discovery**: Tested category filtering, price range slider, sizes, colors, occasions, styles, and sorting.
- ✅ **Full Order Flow**: Tested bag addition, promo code `VELORA10`, concierge checkout, order confirmation receipt, and live courier tracking.
