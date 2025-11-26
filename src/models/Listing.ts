import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  sellerId: string;
  sellerEmail: string;
  createdAt: Date;
}

const ListingSchema: Schema = new Schema<IListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  sellerId: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Listing as mongoose.Model<IListing>) || mongoose.model<IListing>('Listing', ListingSchema);
