// src/shared/db/models/product/product.model.ts
import { categories } from "@/config/category.config";
import { Unit, Units } from "@/config/units.config";
import { Document, Schema, Types, model } from "mongoose";

export interface IProduct extends Document {
  nameAr: string;
  nameEn: string;
  size: number;
  unit: string;
  quantity: number;
  category: string;
  images: string[];
  barcodes: string[];
  variant: string | null;
  brand: Types.ObjectId | null; // <--- ADDED BRAND
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    nameAr: {
      type: String,
      required: false,
      index: 1,
    },
    nameEn: {
      type: String,
      required: false,
      index: 1,
    },
    size: {
      type: Number,
      required: false,
      default: 1,
      index: 1,
    },
    images: {
      type: [String],
      required: false,
    },
    unit: {
      type: String,
      required: false,
      enum: Units,
      default: Unit.None,
      index: 1,
    },
    quantity: {
      type: Number,
      required: false,
      index: 1,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
      index: 1,
    },
    barcodes: {
      type: [String],
      required: false,
      default: [],
    },
    variant: {
      type: String,
      required: false,
      default: null,
      index: 1,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: false,
      default: null,
      index: 1,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

productSchema.index({ nameAr: "text", nameEn: "text" });
productSchema.index({ barcodes: 1 });

export default model<IProduct>("product", productSchema);
