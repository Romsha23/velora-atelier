# VÉLORA — Luxury Boutique E-Commerce & VELA AI Personal Stylist

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployed" />
</p>

> **VÉLORA** (*"Curated for your style."*) is a full-stack, production-grade luxury fashion e-commerce platform integrated with **VELA**, an intelligent AI Personal Stylist powered by Google Gemini API & dynamic intent tool execution.

---

## 🔗 Live Links & Repository

- 🌐 **Live Production Deployment**: [https://elan-atelier-eight.vercel.app](https://elan-atelier-eight.vercel.app)
- 🐙 **GitHub Repository**: [https://github.com/Romsha23/velora-atelier](https://github.com/Romsha23/velora-atelier)
- 👤 **Author & Lead Architect**: [Romsha Wadhwa (@Romsha23)](https://github.com/Romsha23)

---

## 🌟 Key Features & Experience Design

### 🤖 1. VELA — Intelligent AI Personal Stylist
- **Natural Language Intent Parsing**: Extracts target categories, occasions (*gala, wedding, date night, resort*), style aesthetics (*minimalist, editorial, avant-garde*), color choices, and precise price budgets in **₹ INR** (e.g., *"Build an outfit under ₹5,000"*).
- **Controlled Function / Tool Calling**: Executes real-time database query tools (`searchProducts`, `filterByBudget`, `getProductsByOccasion`, `buildOutfit`) to guarantee zero hallucinated items.
- **Interactive AI Outfit Builder Cards**: Generates complete multi-piece ensembles (Top + Bottom + Accessory + Footwear) rendered in-chat with single-click **"Add Complete Outfit to Bag"** and **"Save Look to Wishlist"** CTAs.
- **Zod Schema Engine**: Strictly validates incoming chat requests (`AIChatRequestSchema`) and dynamic tool payloads. Includes an offline intent parser fallback when API keys are not supplied.

### 🎨 2. Creative Boutique Features
- **Atmosphere Mood Dial**: Real-time visual ambiance filter modifying page typography, color accents, and featured edits (*Minimalist, Editorial Chic, Avant-Garde, Evening Luxury, Riviera Resort*).
- **Digital Runway Studio (`/runway`)**: Interactive styling canvas where clients drag, drop, compose, and preview outfit combinations before purchasing.
- **Editorial Journal Magazine (`/journal`)**: Fashion lookbook showcasing seasonal trends, styling tips, and instant **"Shop the Look"** functionality.

### 🛒 3. Full-Stack E-Commerce Architecture
- **Multi-Faceted Search & Filter (`/shop`)**: Dynamic filtering across 32 luxury fashion items by category, price slider (₹3,000 to ₹25,000), sizes (`XS` to `XL`, `38` to `43`), occasion tags, colors, and live sorting.
- **Product Specs & Recommendations (`/product/[slug]`)**: Multi-angle image gallery switcher, fabric care specs, size guides, and **"Complete the Ensemble"** cross-sells.
- **Persistent Shopping Bag & Wishlist**: Slide-over drawer and full bag page with live shipping threshold progress bars and promo code validation (`VELORA10` for 10% off).
- **Concierge Checkout & Courier Simulator (`/checkout`, `/order-confirmation/[id]`)**: Server-validated order creation (`POST /api/orders`) with a 4-stage real-time courier tracking simulator.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15.1+ (App Router), React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS, Playfair Display (Serif), Plus Jakarta Sans (Sans) |
| **Icons & Motion** | `lucide-react`, `framer-motion` |
| **State Management** | React Context (`CartContext`, `WishlistContext`, `AIStylistContext`) |
| **Backend & APIs** | Next.js API Routes (`/api/ai/chat`, `/api/products`, `/api/orders`) |
| **Validation** | Zod (`/lib/validations/index.ts`) |
| **Database ORM** | Prisma ORM (`prisma/schema.prisma`) |
| **AI SDK** | `@google/generative-ai` (Google Gemini 1.5 Flash) |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 📁 System Directory Structure

```
velora-atelier/
├── app/
│   ├── layout.tsx                # Root layout with VÉLORA styling & providers
│   ├── page.tsx                  # Landing page (Hero, Mood Dial, Curated Edit, Journal)
│   ├── shop/page.tsx             # Multi-faceted search & collection page
│   ├── product/[slug]/page.tsx   # Product detail page & ensemble builder
│   ├── runway/page.tsx           # Digital Runway Studio Canvas
│   ├── journal/page.tsx          # Editorial Lookbook Journal
│   ├── cart/page.tsx             # Shopping bag page
│   ├── checkout/page.tsx         # Concierge checkout form
│   ├── order-confirmation/[id]/  # Order confirmation & live courier tracker
│   ├── order-confirmation/       # Active order lookup fallback
│   ├── wishlist/page.tsx         # Saved wishlist page
│   ├── account/page.tsx          # Client account profile
│   ├── not-found.tsx             # Custom luxury 404 page
│   └── api/
│       ├── ai/chat/route.ts      # VELA AI endpoint with tool calling
│       ├── products/route.ts     # Product search & filtering API
│       └── orders/route.ts       # Server-side price-verified order API
├── components/
│   ├── navbar.tsx                # Top navigation header
│   ├── footer.tsx                # Footer with author links & concierge info
│   ├── product-card.tsx          # Interactive product card
│   ├── mood-dial.tsx             # Real-time ambiance mood selector
│   ├── cart-drawer.tsx           # Slide-over cart drawer
│   ├── search-modal.tsx          # Search modal overlay
│   └── ai-stylist/
│       ├── ai-stylist-widget.tsx # VELA AI chat drawer
│       ├── chat-message.tsx      # Outfit card renderer
│       └── starter-prompts.tsx   # Quick inspiration chips
├── lib/
│   ├── services/
│   │   ├── productService.ts     # Product query & outfit composition layer
│   │   ├── aiShoppingService.ts  # VELA AI tool execution layer
│   │   └── orderService.ts       # Server price verification & order creation
│   ├── validations/
│   │   └── index.ts              # Zod validation schemas
│   ├── products-data.ts          # 32 Luxury boutique fashion items database
│   ├── cart-context.tsx          # Cart state provider
│   ├── wishlist-context.tsx      # Wishlist state provider
│   └── ai-stylist-context.tsx    # VELA AI state provider
├── prisma/
│   └── schema.prisma             # Relational Database Models
└── README.md                     # Project documentation
```

---

## ⚡ Quick Start & Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/Romsha23/velora-atelier.git
cd velora-atelier
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
# Optional: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*Note: If `GEMINI_API_KEY` is not provided, VELA automatically activates its built-in natural language intent parser fallback to answer queries, parse budget numbers, and build outfits.*

### 4. Run Development Server
```bash
npm run dev
```
Navigate to **[http://localhost:3000](http://localhost:3000)**.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Server-Side Validation

- **Server Price Recalculation**: Subtotals are re-calculated on the server inside `/api/orders` by retrieving canonical prices from `PRODUCTS`, preventing client-side DOM tampering.
- **Zod Data Sanitization**: All API inputs, budget limits, and checkout payloads are strictly parsed and validated with Zod before processing.
- **CVE Compliance**: Package dependencies are configured to satisfy current security standards for production edge deployment.

---

## 👤 Author & Contact

**Romsha Wadhwa**  
*Full-Stack Engineer & Architect*

- 🐙 **GitHub**: [@Romsha23](https://github.com/Romsha23)
- ✉️ **Email**: [`contact@velora-atelier.com`](mailto:contact@velora-atelier.com)
- 🌐 **Live App**: [https://elan-atelier-eight.vercel.app](https://elan-atelier-eight.vercel.app)
