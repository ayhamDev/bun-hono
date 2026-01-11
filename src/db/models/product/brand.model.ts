import mongoose, { Document, Schema } from "mongoose";

export interface IBrand extends Document {
  nameEn: string;
  nameAr: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    nameEn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: 1,
    },
    nameAr: {
      type: String,
      required: false,
      trim: true,
      index: 1,
      default: null,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
BrandSchema.index({ nameEn: "text", nameAr: "text" });

export default mongoose.model<IBrand>("brand", BrandSchema);
