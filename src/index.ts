import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
	.get("/", () => ({
		message: "Hello World! Elysia + Drizzle + MySQL is running.",
		timestamp: new Date().toISOString(),
	}))
	.get("/users", async () => {
		try {
			const allUsers = await db.select().from(users);
			return allUsers;
		} catch (error) {
			return { error: "Database connection failed. Check your .env file." };
		}
	})
	.listen(process.env.PORT ?? 3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
