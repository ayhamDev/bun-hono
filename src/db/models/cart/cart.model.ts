import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for a single item within the cart
export interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}

// Interface for the user's cart document
export interface ICart extends Document {
  market: Types.ObjectId; // Reference to the MarketProduct
  user: Types.ObjectId;
  items: ICartItem[];
}

// Schema for a single item in the cart
const CartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      max: [999, "Item quantity cannot be more than 999."],
      required: true,
      min: [1, "Item quantity cannot be less than 1."],
      default: 1,
    },
  },
  { _id: true } // Use default _id to uniquely identify items in the cart
);

// Schema for the user's shopping cart
const CartSchema = new Schema<ICart>(
  {
    market: {
      type: Schema.Types.ObjectId,
      ref: "market",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true, // Each user has only one cart
      index: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>("cart", CartSchema);
