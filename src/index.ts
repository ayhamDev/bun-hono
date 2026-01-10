import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for Node.js
import * as dotenv from "dotenv";
import connectDB from "./db";
dotenv.config();

connectDB();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

if (typeof Bun === "undefined") {
  console.log(`Server is running on port ${5444}`);
  serve({ fetch: app.fetch, port: 5444 });
}

export default {
  port: 5444,
  fetch: app.fetch,
};
