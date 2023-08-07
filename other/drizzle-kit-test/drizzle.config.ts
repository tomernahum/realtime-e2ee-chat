import type { Config } from "drizzle-kit";
 
export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        // connectionString: "postgres://tomernahum:GWmFkdX37sRe@ep-snowy-recipe-43959915.us-east-2.aws.neon.tech/neondb",
        connectionString: "postgres://tomernahum:GWmFkdX37sRe@ep-snowy-recipe-43959915.us-east-2.aws.neon.tech/neondb?options=project%3Dep-snowy-recipe-43959915",
    }
} satisfies Config;
