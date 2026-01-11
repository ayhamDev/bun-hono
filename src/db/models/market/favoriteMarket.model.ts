import { IMarket } from "@/db/models/market/market.model";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFavoriteMarket extends Document {
  user: Types.ObjectId;
  market: Types.ObjectId | IMarket;
}

const FavoriteMarketSchema = new Schema<IFavoriteMarket>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // Assuming a 'User' model
      required: true,
      unique: true, // ✅ This ensures a user can only have one entry.
      index: true,
    },
    market: {
      type: Schema.Types.ObjectId,
      ref: "market",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // Keep track of when the favorite was set/updated
  }
);

export default mongoose.model<IFavoriteMarket>(
  "favorite_market",
  FavoriteMarketSchema
);
