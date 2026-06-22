import { Hono } from "hono";
import type { AppType } from "./types/hono";
import userRoute from "./routes/user";

const app = new Hono<AppType>();

app.route("/users", userRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
