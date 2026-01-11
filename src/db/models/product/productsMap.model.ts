// src/shared/db/models/product/productsMap.model.ts
import { categories } from "@/config/category.config";
import { Unit, Units } from "@/config/units.config";
import { IProduct } from "@/db/models/product/product.model";
import { Schema, Types, model } from "mongoose";

export interface IProductMap extends IProduct {
  productId: Types.ObjectId;
  variant: string | null;
  brand: Types.ObjectId | null; // <--- ADDED BRAND
}

const productSchema = new Schema<IProductMap>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
      index: 1,
    },
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
      enum: Units,
      required: false,
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
      index: 1,
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
productSchema.index({ nameEn: 1, nameAr: 1 }, { unique: true });

export default model<IProductMap>("product_map", productSchema);
