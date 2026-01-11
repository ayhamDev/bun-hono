import jobModel, { JobProgress } from "@/db/models/job/job.model";
import mongoose, { Document, Schema, Types } from "mongoose";

export const OnlineStores = [
  "panda",
  "panda_api",
  "carrefour",
  "lulu",
  "tamimi",
  "danube",
] as const;
export type IOnlineStoresNames =
  | "panda"
  | "panda_api"
  | "bindawood"
  | "lulu"
  | "lulu_api"
  | "tamimi"
  | "danube";
export const OnlineMarkets = [
  {
    nameEn: "panda",
    nameAr: "بندة",
    onlineStore: {
      store: "panda",
    },
  },
  {
    nameEn: "danube",
    nameAr: "الدانوب",
    onlineStore: {
      store: "danube",
    },
  },
  {
    nameEn: "panda",
    nameAr: "بندة",
    onlineStore: {
      store: "panda",
    },
  },

  {
    nameEn: "bindawood",
    nameAr: "بن داود",
    onlineStore: {
      store: "bindawood",
    },
  },
  {
    nameEn: "lulu Hypermarket",
    nameAr: "لولو هايبر ماركت",
    onlineStore: {
      store: "lulu",
    },
  },
  {
    nameEn: "tamimi markets",
    nameAr: "اسواق التيميمي",
    onlineStore: {
      store: "tamimi",
    },
  },
] as IMarket[];

export interface IOnlineStore {
  store: IOnlineStoresNames;
  location: string;
  jobId: Types.ObjectId | null;
  job?: JobProgress | null;
}

export interface IMarket extends Document {
  nameEn: string;
  nameAr: string;
  onlineStore?: IOnlineStore;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  // You can add more fields here if needed.
}

// Define a sub-schema for the onlineStore field
const OnlineStoreSchema = new Schema<IOnlineStore>(
  {
    store: {
      type: String,
      enum: [...OnlineStores],
      index: 1,
      required: [true, "Online Store is required."],
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: jobModel,
      sparse: true, // ✅ This allows multiple `null` values
      index: true,
      required: false,
      default: null,
    },
  },
  { _id: false } // Prevent creating an _id for the sub-document
);

// Define the main Market schema
const MarketSchema = new Schema<IMarket>(
  {
    nameEn: {
      type: String,
      required: [true, "Market English Name is required."],
      unique: false,
      index: 1,
    },
    nameAr: {
      type: String,
      required: [true, "Market Arabic Name is required."],
      unique: false,
      index: 1,
    },
    images: {
      type: [String],
      required: false,
      // The images of the product.
    },
    onlineStore: {
      type: OnlineStoreSchema,
      required: false,
      index: 1,
    },
    // Note: createdAt and updatedAt are automatically added by timestamps
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Indexes
MarketSchema.index({ nameEn: "text", nameAr: "text" }, { unique: false });
export default mongoose.model<IMarket>("market", MarketSchema);
