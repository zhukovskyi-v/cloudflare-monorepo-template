import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle/migrations",
    schema: "./src/database/schema.ts",
    dialect: "sqlite",
});
