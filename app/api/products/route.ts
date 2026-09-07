import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/productService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const occasion = searchParams.get('occasion') || undefined;
  const style = searchParams.get('style') || undefined;
  const color = searchParams.get('color') || undefined;
  const size = searchParams.get('size') || undefined;
  const sortBy = (searchParams.get('sortBy') as any) || 'featured';

  const result = await ProductService.searchProducts({
    searchQuery: search,
    category,
    maxPrice,
    minPrice,
    occasion,
    style,
    color,
    size,
    sortBy,
  });

  return NextResponse.json(result);
}
