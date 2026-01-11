import { IProduct } from "@/db/models/product/product.model";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFavoriteProduct extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId | IProduct;
}

const FavoriteProductSchema = new Schema<IFavoriteProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming a 'User' model
      required: true,
      index: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    // A user can only favorite a specific product once
  }
);
FavoriteProductSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model<IFavoriteProduct>(
  "favorite_product",
  FavoriteProductSchema
);
