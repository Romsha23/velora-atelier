import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aurelia Silk Wrap Midi Dress',
    slug: 'aurelia-silk-wrap-midi-dress',
    price: 8499,
    originalPrice: 10999,
    category: 'Women',
    subcategory: 'Dresses',
    description: 'Draped in 100% pure Mulberry silk, the Aurelia dress embodies timeless sophistication. Features a flattering wrap front, soft balloon sleeves, and a cascading asymmetric hemline ideal for evening galas and cocktail parties.',
    details: [
      '100% Pure Mulberry Silk (19mm momme)',
      'Self-tie wrap waist with interior security button',
      'Elbow-length soft elasticated sleeves',
      'Dry clean only',
      'Model is 5\'10" wearing size S'
    ],
    materials: '100% Mulberry Silk',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Emerald', hex: '#1C3B2B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    isFeatured: true,
    isTrending: true,
    tags: ['silk', 'wrap dress', 'evening', 'party', 'cocktail', 'luxury', 'wedding guest'],
    occasion: ['Wedding', 'Date Night', 'Formal / Gala'],
    style: ['Editorial', 'Glam', 'Minimal'],
    gender: 'Women',
    fit: 'True to size with adjustable wrap waist',
    pairsWith: ['prod-11', 'prod-15']
  },
  {
    id: 'prod-2',
    name: 'Soren Tailored Italian Linen Blazer',
    slug: 'soren-tailored-italian-linen-blazer',
    price: 9999,
    originalPrice: 12500,
    category: 'Men',
    subcategory: 'Blazers & Suits',
    description: 'Crafted from breathable Italian linen weave, the Soren blazer brings relaxed elegance to warm-weather formalwear. Unstructured silhouette with notch lapels and natural horn buttons.',
    details: [
      '100% Italian Linen outer, silk-viscose buggy lining',
      'Single-breasted 2-button closure',
      'Patch pockets & welt chest pocket',
      'Made in Florence, Italy',
      'Model is 6\'1" wearing size L'
    ],
    materials: '100% Italian Linen',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Sand', hex: '#E2DAC9' },
      { name: 'Midnight Navy', hex: '#1B263B' },
      { name: 'Olive Sage', hex: '#556B2F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    isFeatured: true,
    isNew: true,
    tags: ['blazer', 'linen', 'men fashion', 'summer', 'resort', 'tailored'],
    occasion: ['Resort / Vacation', 'Workwear', 'Wedding'],
    style: ['Classic', 'Minimal', 'Contemporary'],
    gender: 'Men',
    fit: 'Tailored modern fit',
    pairsWith: ['prod-8', 'prod-14']
  },
  {
    id: 'prod-3',
    name: 'Lysandra Pleated Velvet Corset Gown',
    slug: 'lysandra-pleated-velvet-corset-gown',
    price: 14999,
    originalPrice: 17999,
    category: 'Women',
    subcategory: 'Dresses',
    description: 'A showstopping masterpiece in deep burgundy silk velvet. Designed with a boned corset bodice, delicate off-shoulder straps, and a sunray pleated floor-length skirt that moves gracefully with every step.',
    details: [
      'Heavyweight Silk Velvet with internal flexible corsetry',
      'Hidden back zip with hook-and-eye closure',
      'Fully lined in satin',
      'Dry clean only',
      'Floor length'
    ],
    materials: 'Silk Velvet & Satin Lining',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Wine Velvet', hex: '#58111A' },
      { name: 'Midnight Black', hex: '#0B0B0C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviewCount: 16,
    inStock: true,
    isFeatured: true,
    isTrending: true,
    tags: ['velvet', 'gown', 'corset', 'wedding', 'gala', 'red carpet', 'luxury dress'],
    occasion: ['Wedding', 'Formal / Gala'],
    style: ['Glam', 'Editorial'],
    gender: 'Women',
    pairsWith: ['prod-11', 'prod-12']
  },
  {
    id: 'prod-4',
    name: 'Vesper Leather Crossbody Saddle Bag',
    slug: 'vesper-leather-crossbody-saddle-bag',
    price: 6999,
    originalPrice: 8499,
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'Hand-crafted from full-grain Tuscan calfskin with brushed gold hardware. Features a sleek curved saddle shape, magnetic flap closure, and an adjustable shoulder strap for shoulder or crossbody wear.',
    details: [
      '100% Full-grain Tuscan Calfskin Leather',
      'Custom gold-toned brushed metal clasp',
      'Interior suede lining with phone slot & zippered pocket',
      'Dimensions: 22cm x 17cm x 7cm'
    ],
    materials: 'Italian Calfskin Leather',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Brown', hex: '#9E4738' },
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Warm Taupe', hex: '#A89F91' }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isFeatured: true,
    tags: ['leather bag', 'handbag', 'crossbody', 'accessories', 'luxury leather'],
    occasion: ['Casual Chic', 'Date Night', 'Workwear'],
    style: ['Minimal', 'Classic'],
    gender: 'Unisex',
    pairsWith: ['prod-1', 'prod-6']
  },
  {
    id: 'prod-5',
    name: 'Celeste Cashmere Chunky Turtleneck',
    slug: 'celeste-cashmere-chunky-turtleneck',
    price: 7499,
    originalPrice: 8999,
    category: 'Women',
    subcategory: 'Knitwear',
    description: 'Sumptuously soft 100% Grade-A Mongolian cashmere knit. Relaxed slouchy collar, wide ribbed cuffs, and an easy dropped-shoulder silhouette that pairs effortlessly with tailored trousers or silk skirts.',
    details: [
      '100% Mongolian Cashmere (2-ply 12 gauge)',
      'Ribbed collar, hem and cuffs',
      'Hand wash cold or dry clean',
      'Ultra-lightweight warmth'
    ],
    materials: '100% Mongolian Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Slate Grey', hex: '#708090' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 23,
    inStock: true,
    isNew: true,
    tags: ['cashmere', 'knitwear', 'sweater', 'turtleneck', 'winter luxury'],
    occasion: ['Casual Chic', 'Workwear', 'Resort / Vacation'],
    style: ['Minimal', 'Contemporary'],
    gender: 'Women',
    pairsWith: ['prod-6', 'prod-15']
  },
  {
    id: 'prod-6',
    name: 'Monaco Pleated Wide-Leg Trousers',
    slug: 'monaco-pleated-wide-leg-trousers',
    price: 5499,
    originalPrice: 6999,
    category: 'Women',
    subcategory: 'Trousers',
    description: 'High-waisted tailored trousers featuring deep front double pleats, clean waistband with concealed hook fastener, and an elongated fluid wide-leg cut designed to flatter every body shape.',
    details: [
      'Premium Tencel-Wool blend drape fabric',
      'High rise with side slash pockets',
      'Inseam length: 32 inches',
      'Dry clean recommended'
    ],
    materials: 'Tencel & Wool Blend',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Sand Cream', hex: '#EAE6DF' },
      { name: 'Jet Black', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    isTrending: true,
    tags: ['trousers', 'wide leg', 'tailored', 'workwear', 'minimalist pants'],
    occasion: ['Workwear', 'Casual Chic', 'Date Night'],
    style: ['Minimal', 'Classic'],
    gender: 'Women',
    pairsWith: ['prod-5', 'prod-4']
  },
  {
    id: 'prod-7',
    name: 'Elysian Hand-Painted Silk Scarf',
    slug: 'elysian-hand-painted-silk-scarf',
    price: 3499,
    originalPrice: 4299,
    category: 'Accessories',
    subcategory: 'Scarves',
    description: 'An artistic botanical motif digitally rendered onto 100% silk twill with hand-rolled edges. Can be worn tied around the neck, styled as a hair headscarf, or accenting a leather handbag.',
    details: [
      '100% Mulberry Silk Twill',
      'Hand-rolled borders',
      'Dimensions: 90cm x 90cm square',
      'Includes signature boutique box'
    ],
    materials: '100% Silk Twill',
    sizes: ['One Size'],
    colors: [
      { name: 'Midnight Botanical', hex: '#1C3B2B' },
      { name: 'Tuscan Sun Burst', hex: '#D4AF37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    isNew: true,
    tags: ['silk scarf', 'gift', 'accessories', 'printed scarf', 'botanical'],
    occasion: ['Casual Chic', 'Date Night', 'Resort / Vacation'],
    style: ['Editorial', 'Boho'],
    gender: 'Unisex',
    pairsWith: ['prod-1', 'prod-4']
  },
  {
    id: 'prod-8',
    name: 'Kensington Structured Band-Collared Linen Shirt',
    slug: 'kensington-structured-band-collared-linen-shirt',
    price: 4499,
    originalPrice: 5499,
    category: 'Men',
    subcategory: 'Shirts',
    description: 'Pre-washed French linen button-down shirt featuring a relaxed mandarin collar, pearl buttons, and curved hem. Lightweight, breathable, and pre-softened for instant comfort.',
    details: [
      '100% Pure French Flax Linen',
      'Band mandarin collar',
      'Mother of pearl buttons',
      'Machine wash gentle cold'
    ],
    materials: '100% French Linen',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Azure Blue', hex: '#87CEEB' },
      { name: 'Olive Drab', hex: '#556B2F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    isTrending: true,
    tags: ['linen shirt', 'mandarin collar', 'men summer shirt', 'casual linen'],
    occasion: ['Resort / Vacation', 'Casual Chic', 'Date Night'],
    style: ['Minimal', 'Contemporary'],
    gender: 'Men',
    pairsWith: ['prod-2', 'prod-14']
  },
  {
    id: 'prod-9',
    name: 'Verona Italian Leather Penny Loafers',
    slug: 'verona-italian-leather-penny-loafers',
    price: 8999,
    originalPrice: 10999,
    category: 'Footwear',
    subcategory: 'Loafers',
    description: 'Classic penny loafers crafted from hand-burnished calfskin leather. Built with Goodyear welt construction, leather lining, and a cushioned footbed for all-day luxury wear.',
    details: [
      'Hand-finished Italian Calfskin',
      'Genuine leather sole with rubber heel insert',
      'Hand-stitched aprons',
      'Handcrafted in Artisan Workshops in Marche, Italy'
    ],
    materials: 'Full Grain Italian Calfskin',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Burnished Tan', hex: '#8B4513' },
      { name: 'Onyx Black', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    isFeatured: true,
    tags: ['loafers', 'leather shoes', 'men footwear', 'italian leather'],
    occasion: ['Workwear', 'Wedding', 'Date Night'],
    style: ['Classic', 'Minimal'],
    gender: 'Men',
    pairsWith: ['prod-2', 'prod-8']
  },
  {
    id: 'prod-10',
    name: 'Seraphina Minimal Strappy Stiletto Sandals',
    slug: 'seraphina-minimal-strappy-stiletto-sandals',
    price: 7999,
    originalPrice: 9499,
    category: 'Footwear',
    subcategory: 'Heels',
    description: 'Barely-there ultra-slim leather straps frame the foot elegantly. Featuring a comfortable 85mm stiletto heel, padded leather insoles, and delicate ankle buckle closure.',
    details: [
      'Nappa leather upper & leather lining',
      '85mm (3.3 inch) self-covered stiletto heel',
      'Non-slip leather outsole',
      'Includes velvet dust covers'
    ],
    materials: 'Nappa Leather',
    sizes: ['38', '39', '40', '41'],
    colors: [
      { name: 'Metallic Gold', hex: '#D4AF37' },
      { name: 'Nude Beige', hex: '#E3C6B4' },
      { name: 'Sleek Noir', hex: '#0B0B0C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 33,
    inStock: true,
    isTrending: true,
    tags: ['heels', 'strappy sandals', 'party heels', 'wedding sandals'],
    occasion: ['Wedding', 'Date Night', 'Formal / Gala'],
    style: ['Glam', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-1', 'prod-3']
  },
  {
    id: 'prod-11',
    name: 'Solstice 18K Gold Plated Sculptural Earrings',
    slug: 'solstice-18k-gold-plated-sculptural-earrings',
    price: 2999,
    originalPrice: 3999,
    category: 'Accessories',
    subcategory: 'Jewelry',
    description: 'Architectural molten drop earrings thick-plated in 18K yellow gold over solid brass. Lightweight design engineered for comfortable drop statement styling.',
    details: [
      '18K Gold Plating (3 microns)',
      'Hypoallergenic sterling silver posts',
      'Length: 4.5cm drop',
      'Tarnish-resistant coating'
    ],
    materials: '18K Gold Plated Brass & Silver Post',
    sizes: ['One Size'],
    colors: [
      { name: 'Polished Gold', hex: '#D4AF37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 54,
    inStock: true,
    isFeatured: true,
    tags: ['jewelry', 'gold earrings', 'gift', 'sculptural jewelry'],
    occasion: ['Wedding', 'Date Night', 'Casual Chic'],
    style: ['Contemporary', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-1', 'prod-3', 'prod-15']
  },
  {
    id: 'prod-12',
    name: 'Bellagio Oval Acetate Designer Sunglasses',
    slug: 'bellagio-oval-acetate-designer-sunglasses',
    price: 4999,
    originalPrice: 5999,
    category: 'Accessories',
    subcategory: 'Eyewear',
    description: 'Vintage-inspired chunky oval frames cut from Italian bio-based acetate. Outfitted with Category 3 UV400 protective tinted lenses.',
    details: [
      'Handcrafted Italian Acetate frame',
      '100% UV400 Protection Cat 3 lenses',
      '5-barrel gold hinges',
      'Includes hard case and microfiber cloth'
    ],
    materials: 'Italian Bio-Acetate',
    sizes: ['One Size'],
    colors: [
      { name: 'Tortoiseshell Amber', hex: '#7E481C' },
      { name: 'Solid Black', hex: '#0B0B0C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    isNew: true,
    tags: ['sunglasses', 'designer eyewear', 'resort sunglasses', 'accessories'],
    occasion: ['Resort / Vacation', 'Casual Chic'],
    style: ['Editorial', 'Retro'],
    gender: 'Unisex',
    pairsWith: ['prod-2', 'prod-8']
  },
  {
    id: 'prod-13',
    name: 'Aria Silk Satin Camisole & Skirt Set',
    slug: 'aria-silk-satin-camisole-skirt-set',
    price: 9499,
    originalPrice: 11999,
    category: 'Women',
    subcategory: 'Co-ord Sets',
    description: 'A liquid-like two-piece matching set in fluid silk satin. Features a cowl neck adjustable camisole paired with a bias-cut midi skirt that hugs curves beautifully.',
    details: [
      '100% Heavy Silk Satin',
      'Adjustable spaghetti straps',
      'Bias cut skirt with elasticated waist',
      'Wear together or mix & match'
    ],
    materials: '100% Silk Satin',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pearl Ivory', hex: '#FDFBF7' },
      { name: 'Sage Green', hex: '#8F9779' },
      { name: 'Midnight Onyx', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    isNew: true,
    tags: ['silk set', 'co-ord', 'camisole', 'bias skirt', 'date night'],
    occasion: ['Date Night', 'Wedding', 'Resort / Vacation'],
    style: ['Glam', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-10', 'prod-11']
  },
  {
    id: 'prod-14',
    name: 'Florence Tailored Wool Trousers',
    slug: 'florence-tailored-wool-trousers',
    price: 6499,
    originalPrice: 7999,
    category: 'Men',
    subcategory: 'Trousers',
    description: 'Flat-front lightweight Tropical Wool trousers engineered for sleek formal elegance. Features waist adjusters, horn buttons, and a subtle taper down to the hem.',
    details: [
      '98% Virgin Tropical Wool, 2% Elastane stretch',
      'Side waist tab adjusters',
      'Unhemmed for custom tailoring',
      'Dry clean only'
    ],
    materials: 'Virgin Tropical Wool Blend',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Grey', hex: '#36454F' },
      { name: 'Classic Black', hex: '#111111' },
      { name: 'Warm Navy', hex: '#1B263B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 35,
    inStock: true,
    isFeatured: true,
    tags: ['men trousers', 'wool pants', 'formal trousers', 'tailored men'],
    occasion: ['Workwear', 'Wedding', 'Formal / Gala'],
    style: ['Classic', 'Minimal'],
    gender: 'Men',
    pairsWith: ['prod-2', 'prod-8', 'prod-9']
  },
  {
    id: 'prod-15',
    name: 'Copenhagen Double-Breasted Wool Trench Coat',
    slug: 'copenhagen-double-breasted-wool-trench-coat',
    price: 18999,
    originalPrice: 22000,
    category: 'Women',
    subcategory: 'Coats & Jackets',
    description: 'An iconic outerwear statement cut from rich Australian recycled wool. Features oversized storm flaps, gun patch details, horn buttons, and a belted waist for a commanding silhouette.',
    details: [
      '80% Australian Virgin Wool, 20% Cashmere',
      'Full cupro lining',
      'Self-fabric waist belt with leather buckle',
      'Water and wind resistant finish'
    ],
    materials: 'Virgin Wool & Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Noir Black', hex: '#0B0B0C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviewCount: 14,
    inStock: true,
    isFeatured: true,
    isNew: true,
    tags: ['trench coat', 'wool coat', 'luxury outerwear', 'winter coat'],
    occasion: ['Workwear', 'Casual Chic', 'Formal / Gala'],
    style: ['Editorial', 'Classic'],
    gender: 'Women',
    pairsWith: ['prod-5', 'prod-6', 'prod-4']
  },
  {
    id: 'prod-16',
    name: 'Milan Silk Knit Slim Tie',
    slug: 'milan-silk-knit-slim-tie',
    price: 2499,
    originalPrice: 3299,
    category: 'Accessories',
    subcategory: 'Ties',
    description: 'Hand-knitted in Italy from pure textured silk yarn. Square bottom end with rich tactical weave that adds subtle depth to tailoring.',
    details: [
      '100% Knitted Silk',
      'Width: 6cm modern slim profile',
      'Length: 148cm',
      'Handcrafted in Como, Italy'
    ],
    materials: '100% Italian Silk Knit',
    sizes: ['One Size'],
    colors: [
      { name: 'Burgundy Red', hex: '#800020' },
      { name: 'Midnight Navy', hex: '#1B263B' },
      { name: 'Charcoal Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 20,
    inStock: true,
    tags: ['silk tie', 'knit tie', 'men accessories', 'wedding tie'],
    occasion: ['Wedding', 'Workwear', 'Formal / Gala'],
    style: ['Classic', 'Minimal'],
    gender: 'Men',
    pairsWith: ['prod-2', 'prod-14']
  },
  {
    id: 'prod-17',
    name: 'Siena Suede Ankle Chelsea Boots',
    slug: 'siena-suede-ankle-chelsea-boots',
    price: 9499,
    originalPrice: 11500,
    category: 'Footwear',
    subcategory: 'Boots',
    description: 'Refined Chelsea boots made from water-repellent Italian calf suede. Twin elastic side gores and stacked leather heels give a sleek streamlined finish.',
    details: [
      'Water-resistant Italian Calf Suede',
      'Blake stitched flexible leather soles',
      'Pull tabs at heel collar',
      'Crafted in Tuscany'
    ],
    materials: 'Italian Calf Suede',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Tobacco Suede', hex: '#704214' },
      { name: 'Dark Charcoal', hex: '#2C3539' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    isTrending: true,
    tags: ['chelsea boots', 'suede boots', 'men footwear', 'autumn style'],
    occasion: ['Casual Chic', 'Date Night', 'Workwear'],
    style: ['Classic', 'Contemporary'],
    gender: 'Men',
    pairsWith: ['prod-8', 'prod-14']
  },
  {
    id: 'prod-18',
    name: 'Riviera Resort Cotton Guipure Lace Shirt',
    slug: 'riviera-resort-cotton-guipure-lace-shirt',
    price: 5999,
    originalPrice: 7499,
    category: 'Women',
    subcategory: 'Tops',
    description: 'An intricate geometric lace button-up shirt made from 100% organic cotton. Semi-sheer architectural pattern with camp collar and mother-of-pearl buttons.',
    details: [
      '100% Organic Cotton Lace',
      'Camp collar silhouette',
      'Mother of pearl buttons',
      'Hand wash gentle'
    ],
    materials: '100% Organic Cotton Lace',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ecru Ivory', hex: '#FDFBF7' },
      { name: 'Midnight Onyx', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    isNew: true,
    tags: ['lace shirt', 'resort wear', 'sheer top', 'summer fashion'],
    occasion: ['Resort / Vacation', 'Date Night', 'Casual Chic'],
    style: ['Boho', 'Editorial'],
    gender: 'Women',
    pairsWith: ['prod-6', 'prod-4']
  },
  {
    id: 'prod-19',
    name: 'Athena Freshwater Pearl Choker Necklace',
    slug: 'athena-freshwater-pearl-choker-necklace',
    price: 3999,
    originalPrice: 4999,
    category: 'Accessories',
    subcategory: 'Jewelry',
    description: 'Hand-strung baroque Grade-AA natural freshwater pearls with a 14K gold filled toggle clasp. Each pearl has a unique lustrous organic shape.',
    details: [
      'Natural AAA Baroque Freshwater Pearls (8-9mm)',
      '14K Gold Filled heavy toggle clasp',
      'Length: 40cm choker length',
      'Delivered in silk velvet pouch'
    ],
    materials: 'Freshwater Pearls & 14K Gold Fill',
    sizes: ['One Size'],
    colors: [
      { name: 'Lustrous White', hex: '#FDFBF7' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    isFeatured: true,
    tags: ['pearl necklace', 'jewelry', 'baroque pearl', 'gift for her'],
    occasion: ['Wedding', 'Date Night', 'Formal / Gala'],
    style: ['Classic', 'Glam', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-1', 'prod-13']
  },
  {
    id: 'prod-20',
    name: 'Capri Structured Raffia Beach Tote',
    slug: 'capri-structured-raffia-beach-tote',
    price: 4999,
    originalPrice: 6299,
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'Handwoven by women artisans in Madagascar from natural palm raffia, trimmed with smooth tan calfskin handles. Spaciously sized for beach escapes or weekend markets.',
    details: [
      '100% Natural Palm Raffia body',
      '100% Italian Calfskin Leather handles',
      'Internal linen drawstring pouch closure',
      'Dimensions: 45cm x 28cm x 15cm'
    ],
    materials: 'Natural Raffia & Italian Leather',
    sizes: ['One Size'],
    colors: [
      { name: 'Natural Raffia & Tan', hex: '#D2B48C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1575032617751-6dface00b8b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 26,
    inStock: true,
    isNew: true,
    tags: ['raffia bag', 'tote bag', 'resort bag', 'beach tote'],
    occasion: ['Resort / Vacation', 'Casual Chic'],
    style: ['Boho', 'Minimal'],
    gender: 'Unisex',
    pairsWith: ['prod-18', 'prod-12']
  },
  {
    id: 'prod-21',
    name: 'Geneva Cashmere Cable-Knit Cardigan',
    slug: 'geneva-cashmere-cable-knit-cardigan',
    price: 8999,
    originalPrice: 10999,
    category: 'Women',
    subcategory: 'Knitwear',
    description: 'Luxurious 2-ply Mongolian cashmere cardigan featuring heritage cable-knit stitching, genuine horn buttons, and ribbed hems. Effortlessly chic over slip dresses or tailored pants.',
    details: [
      '100% Grade-A Mongolian Cashmere',
      'V-neck silhouette with horn button front',
      'Hand wash cold or dry clean',
      'Imported'
    ],
    materials: '100% Mongolian Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Oatmeal Milk', hex: '#FDFBF7' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 21,
    inStock: true,
    isNew: true,
    tags: ['cardigan', 'cashmere', 'knitwear', 'autumn luxury'],
    occasion: ['Casual Chic', 'Workwear', 'Date Night'],
    style: ['Classic', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-6', 'prod-4']
  },
  {
    id: 'prod-22',
    name: 'Palermo Double-Breasted Italian Linen Suit',
    slug: 'palermo-double-breasted-italian-linen-suit',
    price: 15999,
    originalPrice: 18999,
    category: 'Men',
    subcategory: 'Blazers & Suits',
    description: 'A sharp 6-button double-breasted suit tailored in Florence from pure Italian flax linen. Features peak lapels, horn buttons, and matching relaxed trousers.',
    details: [
      '100% Italian Linen outer, silk cupro lining',
      'Peak lapel double-breasted front',
      'Includes matching flat-front trousers',
      'Dry clean only'
    ],
    materials: '100% Italian Linen',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Cream', hex: '#E2DAC9' },
      { name: 'Midnight Navy', hex: '#1B263B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviewCount: 19,
    inStock: true,
    isFeatured: true,
    tags: ['linen suit', 'men suit', 'double breasted', 'wedding suit'],
    occasion: ['Wedding', 'Formal / Gala', 'Resort / Vacation'],
    style: ['Editorial', 'Classic'],
    gender: 'Men',
    pairsWith: ['prod-9', 'prod-16']
  },
  {
    id: 'prod-23',
    name: 'Venetian Pleated Silk Chiffon Maxi Skirt',
    slug: 'venetian-pleated-silk-chiffon-maxi-skirt',
    price: 7499,
    originalPrice: 8999,
    category: 'Women',
    subcategory: 'Skirts',
    description: 'Floaty sunray-pleated silk chiffon maxi skirt with a high satin waistband and concealed side zip. Moves with ethereal fluidity.',
    details: [
      '100% Silk Chiffon with silk habotai lining',
      'High-waisted fit with invisible zipper',
      'Floor length',
      'Dry clean'
    ],
    materials: '100% Silk Chiffon',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald Green', hex: '#1C3B2B' },
      { name: 'Blush Champagne', hex: '#E3C6B4' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 14,
    inStock: true,
    isNew: true,
    tags: ['silk skirt', 'pleated skirt', 'maxi skirt', 'wedding guest'],
    occasion: ['Wedding', 'Date Night', 'Formal / Gala'],
    style: ['Glam', 'Editorial'],
    gender: 'Women',
    pairsWith: ['prod-18', 'prod-11']
  },
  {
    id: 'prod-24',
    name: 'Cortina Handcrafted Shearling Aviator Jacket',
    slug: 'cortina-handcrafted-shearling-aviator-jacket',
    price: 19999,
    originalPrice: 24000,
    category: 'Men',
    subcategory: 'Coats & Jackets',
    description: 'Heirloom quality shearling bomber jacket crafted from Spanish lambskin with plush sheepskin lining, heavy antique brass zips, and buckle collar straps.',
    details: [
      '100% Spanish Lambskin Shearling',
      'Adjustable waist buckles & throat latch',
      'Heavy-duty brass YKK hardware',
      'Professional leather clean only'
    ],
    materials: 'Spanish Lambskin Shearling',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dark Espresso & Cream', hex: '#3B2F2F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviewCount: 11,
    inStock: true,
    isFeatured: true,
    isTrending: true,
    tags: ['shearling jacket', 'aviator jacket', 'leather bomber', 'men luxury'],
    occasion: ['Casual Chic', 'Date Night', 'Workwear'],
    style: ['Editorial', 'Classic'],
    gender: 'Men',
    pairsWith: ['prod-14', 'prod-17']
  },
  {
    id: 'prod-25',
    name: 'Ischia Layered Silk Slip Cocktail Dress',
    slug: 'ischia-layered-silk-slip-cocktail-dress',
    price: 9999,
    originalPrice: 11999,
    category: 'Women',
    subcategory: 'Dresses',
    description: 'An alluring bias-cut silk satin slip dress with a cowl neckline and low scoop back. Effortlessly elegant for romantic candlelit dinners and evening receptions.',
    details: [
      '100% Mulberry Silk Satin (19mm momme)',
      'Adjustable delicate shoulder straps',
      'Bias cut for natural fluid stretch',
      'Dry clean only'
    ],
    materials: '100% Mulberry Silk Satin',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Onyx', hex: '#111111' },
      { name: 'Crimson Rose', hex: '#8B263E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    isFeatured: true,
    tags: ['silk slip dress', 'cocktail dress', 'date night', 'evening dress'],
    occasion: ['Date Night', 'Wedding', 'Formal / Gala'],
    style: ['Glam', 'Minimal'],
    gender: 'Women',
    pairsWith: ['prod-10', 'prod-11']
  },
  {
    id: 'prod-26',
    name: 'Sorrento Woven Tuscan Leather Tote',
    slug: 'sorrento-woven-tuscan-leather-tote',
    price: 8499,
    originalPrice: 10499,
    category: 'Accessories',
    subcategory: 'Bags',
    description: 'Artisanal hand-woven intrecciato calfskin tote featuring structured dual top handles and an internal zippered suede clutch insert.',
    details: [
      '100% Hand-woven Tuscan Calfskin Leather',
      'Removable suede zippered pouch included',
      'Dimensions: 40cm x 30cm x 14cm',
      'Made in Italy'
    ],
    materials: 'Tuscan Calfskin Leather',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Tan', hex: '#9E4738' },
      { name: 'Pure Onyx', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 33,
    inStock: true,
    isTrending: true,
    tags: ['woven tote', 'leather bag', 'intrecciato tote', 'luxury bag'],
    occasion: ['Workwear', 'Casual Chic', 'Resort / Vacation'],
    style: ['Classic', 'Minimal'],
    gender: 'Unisex',
    pairsWith: ['prod-2', 'prod-6']
  },
  {
    id: 'prod-27',
    name: 'Positano Hand-Finished Leather Driver Moccasins',
    slug: 'positano-hand-finished-leather-driver-moccasins',
    price: 6999,
    originalPrice: 8499,
    category: 'Footwear',
    subcategory: 'Loafers',
    description: 'Supple Italian pebbled calfskin driving moccasins with hand-stitched aprons and rubber nubbed outsoles for lightweight driving comfort.',
    details: [
      'Italian Pebbled Calfskin Leather',
      'Flexible rubber pebble sole',
      'Leather lining & padded footbed',
      'Crafted in Florence'
    ],
    materials: 'Italian Pebbled Leather',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Navy Suede', hex: '#1B263B' },
      { name: 'Tan Pebbled', hex: '#8B4513' }
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    tags: ['moccasins', 'driving shoes', 'men loafers', 'casual footwear'],
    occasion: ['Resort / Vacation', 'Casual Chic', 'Workwear'],
    style: ['Classic', 'Contemporary'],
    gender: 'Men',
    pairsWith: ['prod-8', 'prod-2']
  },
  {
    id: 'prod-28',
    name: 'Lumière 18K Gold Hammered Cuff Bracelet',
    slug: 'lumiere-18k-gold-hammered-cuff-bracelet',
    price: 3999,
    originalPrice: 4999,
    category: 'Accessories',
    subcategory: 'Jewelry',
    description: 'Sculptural open cuff bracelet hand-hammered for organic texture and heavy-plated in 18K yellow gold. Adjustable fit for effortless stacking.',
    details: [
      '18K Gold Plated Solid Brass (3 microns)',
      'Hand-hammered organic finish',
      'Adjustable open cuff sizing',
      'Tarnish-free protective seal'
    ],
    materials: '18K Gold Plated Brass',
    sizes: ['One Size'],
    colors: [
      { name: 'Hammered Gold', hex: '#D4AF37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 39,
    inStock: true,
    isNew: true,
    tags: ['gold cuff', 'bracelet', 'gold jewelry', 'gift for her'],
    occasion: ['Date Night', 'Wedding', 'Casual Chic'],
    style: ['Minimal', 'Glam'],
    gender: 'Women',
    pairsWith: ['prod-1', 'prod-11']
  },
  {
    id: 'prod-29',
    name: 'Amalfi Cuban Collar Textured Linen Polo',
    slug: 'amalfi-cuban-collar-textured-linen-polo',
    price: 4999,
    originalPrice: 5999,
    category: 'Men',
    subcategory: 'Shirts',
    description: 'Knit linen-cotton blend short-sleeve polo shirt featuring a retro Cuban open collar, ribbed hems, and breathable texture.',
    details: [
      '70% French Linen, 30% Organic Cotton',
      'Open camp collar with no buttons',
      'Breathable open-gauge knit',
      'Hand wash or gentle cycle'
    ],
    materials: 'Linen & Cotton Knit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ecru Off-White', hex: '#F5F2EB' },
      { name: 'Sage Olive', hex: '#556B2F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    isNew: true,
    tags: ['linen polo', 'cuban collar', 'men polo', 'resort shirt'],
    occasion: ['Resort / Vacation', 'Casual Chic'],
    style: ['Contemporary', 'Minimal'],
    gender: 'Men',
    pairsWith: ['prod-14', 'prod-27']
  },
  {
    id: 'prod-30',
    name: 'Tuscany Calfskin Leather Dress Belt',
    slug: 'tuscany-calfskin-leather-dress-belt',
    price: 2999,
    originalPrice: 3999,
    category: 'Accessories',
    subcategory: 'Belts',
    description: 'Slim 30mm dress belt crafted from smooth Italian calfskin with solid brass silver-toned buckle. Hand-burnished edges for sharp tailoring.',
    details: [
      '100% Italian Full-Grain Calfskin Leather',
      'Solid nickel-free brass buckle',
      'Width: 30mm slim profile',
      'Made in Italy'
    ],
    materials: 'Italian Calfskin Leather',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Black', hex: '#111111' },
      { name: 'Burnished Tan', hex: '#8B4513' }
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 25,
    inStock: true,
    tags: ['leather belt', 'men belt', 'dress belt', 'accessories'],
    occasion: ['Workwear', 'Wedding', 'Casual Chic'],
    style: ['Classic', 'Minimal'],
    gender: 'Men',
    pairsWith: ['prod-14', 'prod-22']
  },
  {
    id: 'prod-31',
    name: 'Catalina Structured Wool Felt Fedora Hat',
    slug: 'catalina-structured-wool-felt-fedora-hat',
    price: 3499,
    originalPrice: 4499,
    category: 'Accessories',
    subcategory: 'Hats',
    description: 'Timeless wide-brim fedora hat block-shaped from 100% Australian wool felt. Finished with a grosgrain ribbon band and internal sweatband.',
    details: [
      '100% Australian Wool Felt',
      'Width: 7cm wide flat brim',
      'Adjustable internal ribbon size tie',
      'Water repellent wool finish'
    ],
    materials: '100% Australian Wool Felt',
    sizes: ['One Size'],
    colors: [
      { name: 'Black Charcoal', hex: '#111111' },
      { name: 'Camel Tan', hex: '#C19A6B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575032617751-6dface00b8b2?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 16,
    inStock: true,
    tags: ['fedora hat', 'wool hat', 'accessories', 'resort hat'],
    occasion: ['Resort / Vacation', 'Casual Chic'],
    style: ['Editorial', 'Boho'],
    gender: 'Unisex',
    pairsWith: ['prod-15', 'prod-4']
  },
  {
    id: 'prod-32',
    name: 'Ravenna Pointed-Toe Suede Ankle Heels',
    slug: 'ravenna-pointed-toe-suede-ankle-heels',
    price: 8999,
    originalPrice: 10999,
    category: 'Footwear',
    subcategory: 'Heels',
    description: 'Sophisticated pointed-toe pumps cut from rich black Italian suede. Features a flattering V-shaped vamp cut and 75mm sculpted heel.',
    details: [
      'Italian Calf Suede upper & lining',
      '75mm (2.9 inch) self-covered heel',
      'Cushioned memory foam footbed',
      'Handcrafted in Tuscany'
    ],
    materials: 'Italian Calf Suede',
    sizes: ['38', '39', '40', '41'],
    colors: [
      { name: 'Noir Black', hex: '#0B0B0C' },
      { name: 'Wine Suede', hex: '#58111A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    isTrending: true,
    tags: ['heels', 'suede shoes', 'pointed pumps', 'evening heels'],
    occasion: ['Wedding', 'Date Night', 'Workwear'],
    style: ['Classic', 'Glam'],
    gender: 'Women',
    pairsWith: ['prod-1', 'prod-6']
  }
];
