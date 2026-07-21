
🐛 Debugging Guide - Gondrong-Terminal
Common Issues & Solutions
1. Next.js Build Fails
Error: Module not found
Solution:

bash
rm -rf .next node_modules
npm install
npm run dev
2. TradingView Chart Not Loading
Error: Cannot listen to the event from the provided iframe, contentWindow is not available
Solution:

Use next/dynamic with ssr: false

Load TradingView script on client-side only

Ensure container div has proper ID

3. TradingView Symbol Not Found
Error: This symbol doesn't exist
Solution:

Use correct exchange prefix (e.g., BINANCE:SOLUSDT, FX_IDC:XAUUSD)

Add custom pairs via the + button

Check TradingView symbol syntax

4. API Rate Limit
Error: 429 Too Many Requests
Solution: Implement caching with TanStack Query

5. Tailwind CSS v4 Issues
Error: Cannot apply unknown utility class
Solution:

Use @import "tailwindcss" syntax

Define custom utilities in @layer utilities

6. Environment Variables Not Loading
Error: process.env.VARIABLE is undefined
Solution:

Client-side: Use NEXT_PUBLIC_* prefix

Server-side: Use regular variables

Check .env.local exists

7. WebSocket Disconnect
Error: WebSocket closed unexpectedly
Solution: Add reconnection logic with exponential backoff

8. React 19 Compatibility
Error: peer dependency conflict
Solution:

Use @tanstack/react-query@5 instead of react-query

Avoid packages that don't support React 19

Use --legacy-peer-deps as last resort

Debugging Tools
Browser Console: Press F12

Next.js Dev Tools: http://localhost:3000/_next/static/development/_devtools

Network Tab: Check API requests and WebSocket connections

React DevTools: For component state inspection

Performance Optimization
Use next/dynamic for heavy components

Implement React.memo for expensive renders

Use useMemo and useCallback appropriately

Lazy load images with Next.js Image component

Quick Fixes
Clear Cache
bash
rm -rf .next node_modules/.cache
npm run dev
Reset Git (if needed)
bash
git reset --hard HEAD
git clean -fd
Check TypeScript
bash
npx tsc --noEmit
Check ESLint
bash
npm run lint
Last Updated: July 2026
