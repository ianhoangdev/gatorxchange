import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Listing from '@/models/Listing';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');

    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID is required' }, { status: 400 });
    }

    await connectDB();
    const listings = await Listing.find({ sellerId }).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ listings });
  } catch (err) {
    console.error('Error fetching user listings', err);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
