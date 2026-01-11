import { JobProgress } from "@/db/models/job/job.model";
import { IMarket } from "@/db/models/market/market.model";
import mongoose, { Document, Schema, Types } from "mongoose";

// Update the IFlyer interface to include jobProgress and expires.
export interface IFlyer extends Document {
  marketId: Types.ObjectId;
  name: string;
  url: string;
  jobId: JobProgress | Types.ObjectId | null;
  job?: JobProgress | null;
  market?: IMarket | null;
  pages: number;
  products: number;
  expiresAt: Date | null; // New expiresAt field
  createdAt: Date;
  updatedAt: Date;
}

// Define the main flyer schema with the expiresAt field.
const FlyerSchema = new Schema<IFlyer>(
  {
    marketId: {
      type: Schema.Types.ObjectId,
      ref: "market",
      required: [true, "MarketId is required."],
      index: 1,
    },
    name: {
      type: String,
      required: [false, "Flyer Name is required."],
      index: 1,
    },
    url: {
      type: String,
      required: [true, "Flyer Url is required."],
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "job",
      index: true,
      sparse: true, // ✅ This allows multiple `null` values
      required: false,
      default: null,
    },
    job: {
      type: Schema.Types.ObjectId,
      refPath: "jobId",
      required: false,
    },
    market: {
      type: Schema.Types.ObjectId,
      refPath: "market",
      required: false,
    },
    pages: {
      type: Number,
      index: 1,
      default: 0,
    },
    products: {
      type: Number,
      index: 1,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: false,
    }, // New expiresAt field
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

export default mongoose.model<IFlyer>("flyer", FlyerSchema);
