import { Hono } from "hono";
import connectDB from "./db";

connectDB();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 5444,
  fetch: app.fetch,
};
