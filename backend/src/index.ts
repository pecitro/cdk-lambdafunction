import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/api/", (c) => {
  return c.text("Hello Hono!");
});

export const handler = handle(app);
