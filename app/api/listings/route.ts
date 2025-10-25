import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Listing from '@/models/Listing';

export async function GET() {
  try {
    await connectDB();
    const listings = await Listing.find().sort({ createdAt: -1 }).limit(20).lean();
    return NextResponse.json({ listings });
  } catch (err) {
    console.error('Error fetching listings', err);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, category, imageUrl, sellerId } = body;

    if (!title || !description || price == null || !category || !sellerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const created = await Listing.create({
      title,
      description,
      price,
      category,
      imageUrl: imageUrl || '',
      sellerId,
    });

    return NextResponse.json({ listing: created }, { status: 201 });
  } catch (err) {
    console.error('Error creating listing', err);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
