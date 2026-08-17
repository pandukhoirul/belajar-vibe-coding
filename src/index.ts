import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const port = process.env.PORT || 3000;

const app = new Elysia()
  .get("/", () => {
    return {
      message: "Hello World dari ElysiaJS di atas Bun!",
      status: "success",
    };
  })
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        status: "success",
        data: allUsers,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Gagal mengambil data user dari database.",
        details: error instanceof Error ? error.message : String(error),
      };
    }
  })
  .listen(port);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
