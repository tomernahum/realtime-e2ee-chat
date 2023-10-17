

Parts:
- Socket IO server
    - To setup you need to create a .env and put the appropriate vars in there to connect to your database. Also note that planetscale likes to sleep development branches
    - To run in dev: cd backend && npm run dev
    - To run in prod: currently just doing npm run start (which runs esrun, which compiles the ts on start, idk if it's as efficient as compiling into the same file directory or not like in vite, but configuring typescript is a pain)
        - you could also use bun
- Sveltekit frontend (spa/cdn no server logic)
    - To run in dev 1: cd frontend && npm run dev
    - To preview in dev 2 (more accurate but no hot reloading): cd frontend && npm run build && npm run preview-cloudflare-pages   (or npx wrangler pages dev ./build)
    - To run in prod: intended to be deployed to cloudflare pages which will act as free cdn
