import { categories } from "@/config/category.config";
import { Units } from "@/config/units.config";
import { IProduct } from "@/db/models/product/product.model";
import mongoose, { Document, InferSchemaType, Schema, Types } from "mongoose";

const OriginalProduct = new Schema(
  {
    nameAr: {
      type: String,
      required: false,
      immutable: false,
    },
    nameEn: {
      type: String,
      required: false,
      immutable: false,
    },
    size: {
      type: Number,
      required: false,
      immutable: false,
      default: 1,
    },
    images: {
      type: [String],
      required: false,
      immutable: false,
    },
    unit: {
      type: String,
      required: false,
      enum: Units,
      immutable: false,
    },
    quantity: {
      type: Number,
      required: false,
      immutable: false,
    },
    category: {
      type: String,
      enum: categories,
      required: false,
      immutable: false,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: false,
      default: null,
    },
  },
  {
    _id: false,
    timestamps: false,
    autoIndex: false,
  }
);

export interface IMarketProduct extends Document {
  productId: IProduct | Types.ObjectId;
  marketId: Types.ObjectId;
  price: Number;
  originalPrice: Number;
  expiresIn: Date | null;
  source: "flyer" | "online";
  published: Boolean;
  original: InferSchemaType<typeof OriginalProduct>;
  barcodes: string[];
  productUrl: string;
  variant: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MarketProductEvents {
  CREATED = "Market.Product:Created",
  UPDATED = "Market.Product:Updated",
  DELETED = "Market.Product:Deleted",
}

const MarketProductSchema = new Schema<IMarketProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    marketId: {
      type: Schema.Types.ObjectId,
      ref: "markets",
      required: true,
    },
    original: OriginalProduct,
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: false,
    },
    source: {
      type: String,
      enum: ["flyer", "online"],
      default: "flyer",
    },
    published: {
      type: Boolean,
      default: true,
      index: 1,
    },
    expiresIn: {
      type: Date,
      required: false,
      default: null,
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
    },
  },
  {
    timestamps: true,
  }
);

MarketProductSchema.index({ source: 1, createdAt: -1 });
MarketProductSchema.index({ price: 1, originalPrice: 1, expiresIn: 1 });
MarketProductSchema.index({ published: 1, expiresIn: 1 });
MarketProductSchema.index({ marketId: 1, variant: 1 });

export default mongoose.model<IMarketProduct>(
  "market_product",
  MarketProductSchema
);
