import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  role: "admin";
  userAgent: string;
  ip: string;
  expiresAt: Date;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "role",
    },
    role: {
      type: String,
      required: true,
      enum: ["admin"],
    },
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

// Index for faster queries
SessionSchema.index({ user: 1, role: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create and export the model
const SessionModel = mongoose.model<ISession>("admin_session", SessionSchema);
export default SessionModel;
