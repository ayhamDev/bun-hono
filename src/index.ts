import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for Node.js

import connectDB from "./db";

connectDB();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

if (typeof Bun === "undefined") {
  console.log(`Server is running on port ${5444}`);
  serve(app);
}

export default {
  port: 5444,
  fetch: app.fetch,
};
