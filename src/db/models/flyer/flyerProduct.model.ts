import { categories } from "@/config/category.config";
import { Unit, Units } from "@/config/units.config";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFlyerProduct extends Document {
  flyerId: Types.ObjectId; // Reference to a Flyer document
  flyerPageId?: Types.ObjectId; // Optional reference to a FlyerPage document
  productId?: Types.ObjectId;
  candidates?: Types.ObjectId[];
  images: string[];
  nameAr: string;
  nameEn: string;
  size: number;
  unit: string;
  quantity: number;
  price: number;
  originalPrice: number;
  category: string;
  expiresIn: Date | null;
  disabled: Boolean;
}

/**
 * Mongoose schema for the flyer products document.
 */
const FlyerProductSchema: Schema<IFlyerProduct> = new Schema(
  {
    flyerId: {
      type: Schema.Types.ObjectId,
      ref: "flyer", // Change this to your Flyer model name if different
      required: [true, "flyerId is required."],
      index: 1,
    },
    flyerPageId: {
      type: Schema.Types.ObjectId,
      ref: "flyer_page", // Change this to your FlyerPage model name if different
      required: [true, "flyerPageId is required."],
      index: 1,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product", // Change this to your Flyer model name if different
      required: false,
      index: 1,
    },
    candidates: {
      type: [Schema.Types.ObjectId],
      ref: "product", // Change this to your Flyer model name if different
      required: false,
      index: 1,
    },
    images: {
      type: [String],
      required: false,
      // The images of the product.
    },
    nameAr: {
      type: String,
      required: [false, "Arabic name is required."],
      index: 1,
      default: "N/A",
    },
    nameEn: {
      type: String,
      required: [false, "English name is required."],
      index: 1,
      default: "N/A",
    },
    size: {
      type: Number,
      required: [false, "Product size is required."],
      default: 1,
    },
    unit: {
      type: String,
      enum: Units,
      required: [false, "Unit is required."],
      default: "N/A",
    },
    quantity: {
      type: Number,
      required: [false, "Quantity is required."],
      default: 1,
    },
    price: {
      type: Number,
      required: [false, "Price is required."],
      index: 1,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: false,
      index: 1,
      default: 0,
    },
    expiresIn: {
      type: Date,
      required: false,
      default: null,
      index: 1,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
      index: 1,
    },
    disabled: {
      index: 1,
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
FlyerProductSchema.index({ flyerId: 1, flyerPageId: 1 });
FlyerProductSchema.index({ flyerId: 1, productId: 1 });
FlyerProductSchema.index({ nameAr: "text", nameEn: "text" });
// Export the model
export default mongoose.model<IFlyerProduct>(
  "flyer_product",
  FlyerProductSchema
);
