import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/lib/services/orderService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderResult = await OrderService.createOrder(body);

    return NextResponse.json(orderResult);
  } catch (error: any) {
    console.error('API Error in /api/orders:', error);
    return NextResponse.json(
      { error: error.message || 'Order creation failed' },
      { status: 400 }
    );
  }
}
