import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/client";

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

userRoute.get("/test", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  });

  try {
    console.log("env", c.env.DATABASE_URL);
    const count = await prisma.user.count();

    return c.json({
      success: true,
      count,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  } finally {
    await prisma.$disconnect();
  }
});

export default userRoute;
