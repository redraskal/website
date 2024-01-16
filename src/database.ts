import Migrations from "bun-migrate";
import Database from "bun:sqlite";

const database = new Database(process.env.DATABASE || "website.sqlite");
await Migrations.run(database);

export default database;
