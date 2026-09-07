import { NextRequest, NextResponse } from 'next/server';
import { AIShoppingService } from '@/lib/services/aiShoppingService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await AIShoppingService.processClientMessage(body);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error in /api/ai/chat:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process VELA AI request' },
      { status: 400 }
    );
  }
}
