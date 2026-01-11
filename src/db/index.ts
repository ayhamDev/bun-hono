import * as mongoose from "mongoose";
import adminModel from "./models/admin/admin.model";
import cartModel from "./models/cart/cart.model";
import flyerModel from "./models/flyer/flyer.model";
import flyerPageModel from "./models/flyer/flyerPage.model";
import flyerProductModel from "./models/flyer/flyerProduct.model";
import SessionModel from "./models/global/session.model";
import jobModel from "./models/job/job.model";
import marketModel from "./models/market/market.model";
import marketProductModel from "./models/market/marketProduct.model";
import marketScraperProductModel from "./models/market/marketScraperProduct.model";
import productModel from "./models/product/product.model";
import productsMapModel from "./models/product/productsMap.model";
import FavoriteProductModel from "./models/product/FavoriteProduct.model";
import brandModel from "./models/product/brand.model";

const connectDB = async (defualtAdmin = true) => {
  try {
    if (process.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        minPoolSize: 100,
        maxPoolSize: 500,
        maxIdleTimeMS: 10000, // Closes idle connections after 10 seconds
      });
      console.log("connected to databse");
      await adminModel.find();
      await cartModel.find();
      await flyerModel.find();
      await flyerPageModel.find();
      await flyerProductModel.find();
      await SessionModel.find();
      await jobModel.find();
      await marketModel.find();
      await marketProductModel.find();
      await marketScraperProductModel.find();
      await productModel.find();
      await productsMapModel.find();
      await FavoriteProductModel.find();
      await brandModel.find();
      return null;
    }
  } catch (err: any) {
    console.log(err);

    process.exit(1);
  }
};

export default connectDB;
