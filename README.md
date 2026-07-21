# 🖥️ Gondrong-Terminal

> Personal Crypto Trading Dashboard built with Next.js, Solana, and AI

## ✨ Features

- 📊 **TradingView Chart** - Real-time price charts with technical indicators
- 👀 **Watchlist** - Track your favorite crypto pairs with real-time updates
- 📰 **News Aggregator** - Crypto news from multiple sources
- 📅 **Economic Calendar** - Global economic events impact analysis
- 🤖 **AI Analysis** - Experimental market pattern recognition
- 🧮 **Position Calculator** - Risk management and position sizing
- 🔗 **Solana Wallet** - Connect and interact with Solana blockchain

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Web3**: @solana/web3.js
- **AI**: TensorFlow.js
- **Charts**: TradingView Widget

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
│   ├── api/             # API routes
│   └── layout.tsx
├── components/          # Reusable components
├── lib/                 # Utilities and stores
├── public/              # Static assets
└── ...
🔐 Environment Variables
See .env.example for all required variables.

📝 License
MIT - Educational/Portfolio Project Only

⚠️ Disclaimer
This application is a portfolio project created for educational and demonstration purposes only. All data is for informational use and should not be considered financial advice. No real trading or financial transactions occur on this platform.
