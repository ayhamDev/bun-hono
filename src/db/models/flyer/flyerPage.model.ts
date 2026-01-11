import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IFlyerPage extends Document {
  flyerId: ObjectId;
  pageNumber: number;
  imageUrl: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FlyerPageModel = new Schema<IFlyerPage>(
  {
    flyerId: {
      type: Schema.Types.ObjectId,
      ref: "flyer", // Change this to your Flyer model name if different
      required: [true, "flyerId is required."],
      index: 1,
    },
    pageNumber: {
      type: Number,
      required: [true, "Flyer Page Number Is Required."],
      index: 1,
    },
    imageUrl: {
      type: String,
      required: [true, "Flyer Page Image Is Required."],
    },
    disabled: {
      type: Boolean,
      index: 1,
      defualt: false,
    }, // set to true to ignore this page
  },
  {
    timestamps: true,
  }
);

FlyerPageModel.index({ flyerId: 1, pageNumber: 1 });

export default mongoose.model("flyer_page", FlyerPageModel);
