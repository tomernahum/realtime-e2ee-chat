

Parts:
- Socket IO server
    - To run in dev: cd backend && npm run dev
- Sveltekit frontend (spa/cdn no server logic)
    - To run in dev 1: cd frontend && npm run dev
    - To run in dev 2 (more accurate): cd frontend && npm run build && npx wrangler pages dev ./build
    
    - To run in prod: intended to be deployed to cloudflare pages which will act as free cdn
    - 