import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for Node.js
import * as dotenv from "dotenv";
import connectDB from "./db";
dotenv.config();
import adminModel from "./db/models/admin/admin.model";
import cartModel from "./db/models/cart/cart.model";
import flyerModel from "./db/models/flyer/flyer.model";
import flyerPageModel from "./db/models/flyer/flyerPage.model";
import flyerProductModel from "./db/models/flyer/flyerProduct.model";
import SessionModel from "./db/models/global/session.model";
import jobModel from "./db/models/job/job.model";
import marketModel from "./db/models/market/market.model";
import marketProductModel from "./db/models/market/marketProduct.model";
import marketScraperProductModel from "./db/models/market/marketScraperProduct.model";
import productModel from "./db/models/product/product.model";
import productsMapModel from "./db/models/product/productsMap.model";
import FavoriteProductModel from "./db/models/product/FavoriteProduct.model";
import brandModel from "./db/models/product/brand.model";

connectDB();
const app = new Hono();

app.get("/", async (c) => {
  const res = await Promise.all([
    adminModel.find().lean(),
    cartModel.find().lean(),
    flyerModel.find().lean(),
    flyerPageModel.find().lean(),
    flyerProductModel.find().lean(),
    SessionModel.find().lean(),
    jobModel.find().lean(),
    marketModel.find().lean(),
    marketProductModel.find().lean(),
    marketScraperProductModel.find().lean(),
    productModel.find().lean(),
    productsMapModel.find().lean(),
    FavoriteProductModel.find().lean(),
    brandModel.find().lean(),
  ]);
  return c.json(res);
});

if (typeof Bun === "undefined") {
  console.log(`Server is running on port ${5444}`);
  serve({ fetch: app.fetch, port: 5444 });
}

export default {
  port: 5444,
  fetch: app.fetch,
};
