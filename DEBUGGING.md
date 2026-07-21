
🐛 Debugging Guide - Gondrong-Terminal
Common Issues & Solutions
1. Next.js Build Fails
Error: Module not found
Solution:

bash
rm -rf .next node_modules
npm install
npm run dev
2. API Rate Limit
Error: 429 Too Many Requests
Solution: Implement caching with TanStack Query

3. WebSocket Disconnect
Error: WebSocket closed unexpectedly
Solution: Add reconnection logic with exponential backoff

4. Environment Variables Not Loading
Error: process.env.VARIABLE is undefined
Solution:

Client-side: Use NEXT_PUBLIC_* prefix

Server-side: Use regular variables

Check .env.local exists

5. TypeScript Errors
Error: Cannot find module or its corresponding type declarations
Solution:

bash
npm install @types/[package-name] --save-dev
# or check tsconfig.json path mappings
Debugging Tools
Browser Console: Press F12

Next.js Dev Tools: http://localhost:3000/_next/static/development/_devtools

Network Tab: Check API requests and WebSocket connections

Performance Issues
Use React DevTools Profiler

Check bundle size: npm run build -- --analyze

Last Updated: July 2026
