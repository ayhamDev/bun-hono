import SessionModel from "@/db/models/global/session.model";
import mongoose, { Document, Schema, Types } from "mongoose";
export enum AdminPermissions {
  // Super Admin permissions
  SUPER_ADMIN = "admin:super",

  // Market permissions
  MARKET_VIEW = "market:view",
  MARKET_CREATE = "market:create",
  MARKET_UPDATE = "market:update",
  MARKET_DELETE = "market:delete",

  // Market Product permissions
  MARKET_PRODUCT_VIEW = "market.product:view",
  MARKET_PRODUCT_CREATE = "market.product:create",
  MARKET_PRODUCT_UPDATE = "market.product:update",
  MARKET_PRODUCT_DELETE = "market.product:delete",
  MARKET_PRODUCT_PUBLISH = "market.product:publish",

  JOB_VIEW = "job:view",
  JOB_CREATE = "job:create",
  JOB_CANCEL = "job:cancel",
  JOB_RESTART = "job:restart",
  JOB_SCHEDULE = "job:schedule",

  // Market Job permissions
  MARKET_JOB_VIEW = "market.job:view",
  MARKET_JOB_CREATE = "market.job:create",
  MARKET_JOB_CANCEL = "market.job:cancel",
  MARKET_JOB_RESTART = "market.job:restart",
  MARKET_JOB_SCHEDULE = "market.job:schedule",

  // Product permissions
  PRODUCT_VIEW = "product:view",
  PRODUCT_CREATE = "product:create",
  PRODUCT_UPDATE = "product:update",
  PRODUCT_DELETE = "product:delete",

  // User management
  USER_VIEW = "user:view",
  USER_CREATE = "user:create",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",
  USER_BLOCK = "user:block",

  // Flyer permissions
  FLYER_VIEW = "flyer:view",
  FLYER_CREATE = "flyer:create",
  FLYER_UPDATE = "flyer:update",
  FLYER_DELETE = "flyer:delete",
  FLYER_PUBLISH = "flyer:publish",

  // Flyer Pages permissions
  FLYER_PAGES_VIEW = "flyer.pages:view",
  FLYER_PAGES_CREATE = "flyer.pages:create",
  FLYER_PAGES_UPDATE = "flyer.pages:update",
  FLYER_PAGES_DELETE = "flyer.pages:delete",

  // Flyer Products permissions
  FLYER_PRODUCTS_VIEW = "flyer.products:view",
  FLYER_PRODUCTS_CREATE = "flyer.products:create",
  FLYER_PRODUCTS_UPDATE = "flyer.products:update",
  FLYER_PRODUCTS_DELETE = "flyer.products:delete",
  FLYER_PRODUCTS_PUBLISH = "flyer.products:publish",

  // Flyer Job permissions
  FLYER_JOB_VIEW = "flyer.job:view",
  FLYER_JOB_CREATE = "flyer.job:create",
  FLYER_JOB_CANCEL = "flyer.job:cancel",
  FLYER_JOB_RESTART = "flyer.job:restart",
  FLYER_JOB_SCHEDULE = "flyer.job:schedule",
}

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  permissions: AdminPermissions[];
  sessions: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    permissions: {
      type: [String],
      enum: Object.values(AdminPermissions),
      select: false,
      default: [],
    },
    sessions: {
      type: [Schema.Types.ObjectId],
      ref: SessionModel,
      select: false,
      default: [],
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    versionKey: false,
  }
);

// Index for faster queries

// Create the model
export default mongoose.model<IAdmin>("admin", AdminSchema);
