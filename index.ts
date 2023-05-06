import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public/" }));

console.log("Hello via Bun!");

export default {
	port: 3000,
	fetch: app.fetch,
};
