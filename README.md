# 🖥️ Gondrong-Terminal

> Personal Crypto Trading Dashboard built with Next.js, Solana, and AI

## ✨ Features

- 📊 **TradingView Chart** - Real-time price charts with technical indicators
  - Support for 8+ timeframes (1m to 1W)
  - Custom pair management (add any TradingView symbol)
  - Gold (XAUUSD) support via OANDA/FX_IDC
  - Dark theme optimized
  
- 👀 **Watchlist** - Track your favorite crypto pairs (Coming Soon)
- 📰 **News Aggregator** - Crypto news from multiple sources (Coming Soon)
- 📅 **Economic Calendar** - Global economic events (Coming Soon)
- 🤖 **AI Analysis** - Experimental market pattern recognition (Coming Soon)
- 🧮 **Position Calculator** - Risk management and position sizing (Coming Soon)
- 🔗 **Solana Wallet** - Connect and interact with Solana blockchain (Coming Soon)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Web3**: @solana/web3.js
- **AI**: TensorFlow.js (Planned)
- **Charts**: TradingView Widget
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gondrong-terminal.git
cd gondrong-terminal

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
📁 Project Structure
text
gondrong-terminal/
├── app/
│   ├── (dashboard)/     # Dashboard routes
│   │   ├── page.tsx     # Dashboard home
│   │   ├── chart/       # TradingView chart
│   │   ├── watchlist/   # Watchlist (WIP)
│   │   ├── news/        # News (WIP)
│   │   ├── calendar/    # Economic calendar (WIP)
│   │   ├── ai-analysis/ # AI Analysis (WIP)
│   │   ├── calculator/  # Position calculator (WIP)
│   │   └── wallet/      # Solana wallet (WIP)
│   ├── api/             # API routes
│   └── layout.tsx
├── components/
│   ├── ui/              # Reusable UI components
│   ├── features/        # Feature-specific components
│   │   └── chart/
│   │       └── TradingViewChart.tsx
│   └── shared/          # Shared components
├── lib/
│   ├── api/             # API clients
│   ├── hooks/           # Custom hooks
│   ├── stores/          # Zustand stores
│   └── utils/           # Helpers
├── public/
├── .env.example
├── README.md
├── DEBUGGING.md
└── package.json
🎨 Design System
Theme: Dark with purple-green gradient accents

Typography: Inter + Space Grotesk

Effects: Glassmorphism, subtle shadows, gradient text

Icons: Lucide React

🔐 Environment Variables
See .env.example for all required variables.

🐛 Debugging
See DEBUGGING.md for common issues and solutions.

📝 License
MIT - Educational/Portfolio Project Only

⚠️ Disclaimer
This application is a portfolio project created for educational and demonstration purposes only. All data is for informational use and should not be considered financial advice. No real trading or financial transactions occur on this platform.

🙏 Credits
Built with 🐍 by Gondrong
# gondrong-terminal
