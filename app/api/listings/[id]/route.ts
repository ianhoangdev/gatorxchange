import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Listing from '@/models/Listing';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
    }

    await connectDB();
    
    // Find the listing first to check if it exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting listing', err);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
