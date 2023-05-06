import { Context, Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", async (c: Context, next) => {
	await next();
	c.res.headers.append("Cache-Control", "max-age=3600");
});

app.use("/assets/*", serveStatic({ root: "./" }));

app.get("/", serveStatic({ path: "./assets/index.html" }));

console.log("Hello via Bun!");

export default {
	port: 3000,
	fetch: app.fetch,
};
