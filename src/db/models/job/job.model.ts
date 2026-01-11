import mongoose, { Document, ObjectId, Schema } from "mongoose";
export type JobTypes = "scrape" | "extracting" | "mapping" | "publishing";
export type JobStatus = "pending" | "processing" | "completed" | "failed";
export interface JobProgress {
  type: JobTypes;
  progress: number;
  details: { current: number; total: number } & {
    [key: string]: any; // This is the index signature
  };
  status: JobStatus;
}

export interface IJob extends Document {
  type: JobTypes;
  progress: number;
  details: { current: number; total: number } & {
    [key: string]: any; // This is the index signature
  };
  status: JobStatus;
  refName: "market" | "flyer";
  refId: ObjectId;
}

const JobSchema = new Schema<IJob>(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["scrape", "extracting", "mapping", "publishing"],
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    details: {
      type: new Schema(
        {
          current: { type: Number, required: true },
          total: { type: Number, required: true },
        },
        { _id: false, strict: false }
      ), // <-- Key change is here
      required: true,
    },
    refName: {
      type: String,
      required: true,
      enum: ["market", "flyer"],
      description: "The name of the model this job is associated with",
    },
    refId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "refName",
      description: "The ID of the model this job is associated with",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

export default mongoose.model<IJob>("job", JobSchema);
