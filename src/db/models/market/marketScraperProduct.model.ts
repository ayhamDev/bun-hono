import { categories } from "@/config/category.config";
import { Unit, Units } from "@/config/units.config";
import { Document, Schema, Types, model } from "mongoose";

export interface IMarketScraperProduct extends Document {
  marketId: Types.ObjectId;
  jobId: Types.ObjectId;
  productId: Types.ObjectId;
  candidates: Types.ObjectId[];
  nameAr: string;
  nameEn: string;
  size: number;
  unit: string;
  quantity: number;
  category: string;
  images: string[];
  price: number;
  originalPrice: number;
  barcodes: string[];
  productUrl: string;
  variant: string;
  brand: Types.ObjectId | null; // <--- ADDED BRAND
  createdAt: Date;
  updatedAt: Date;
}

const marketScraperProductSchema = new Schema<IMarketScraperProduct>(
  {
    marketId: {
      type: Schema.Types.ObjectId,
      ref: "market",
      required: true,
      index: 1,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      sparse: true,
      index: true,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: false,
      sparse: true,
      index: 1,
    },
    candidates: {
      type: [Schema.Types.ObjectId],
      ref: "product",
      required: false,
      index: 1,
    },
    nameAr: {
      type: String,
      required: true,
      index: 1,
    },
    nameEn: {
      type: String,
      required: true,
      index: 1,
    },
    size: {
      type: Number,
      required: false,
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
    price: {
      type: Number,
      required: true,
      index: 1,
    },
    originalPrice: {
      type: Number,
      required: false,
      index: 1,
    },
    barcodes: {
      type: [String],
      required: false,
      default: [],
      index: 1,
    },
    productUrl: {
      type: String,
      required: false,
      default: null,
    },
    variant: {
      type: String,
      required: false,
      default: null,
      index: 1,
      description: "ID used by the market to group variations (e.g. base_code)",
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

export default model<IMarketScraperProduct>(
  "market_scraper_product",
  marketScraperProductSchema
);
