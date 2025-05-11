# FashionSwipe

A modern fashion e-commerce application built with React that allows users to browse and interact with fashion products using intuitive swipe gestures.

## Features

- 📱 Mobile-first swipe interface for product browsing
- 💖 Like products with a right swipe
- 🛒 Add products to cart with an upward swipe
- ❌ Pass/Reject products with a left swipe
- 🎨 Modern and responsive UI with smooth animations
- 📱 Haptic feedback for better mobile experience
- 📊 Real-time like and cart counters

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Routing**: React Router
- **Data Fetching**: React Query
- **Mobile Support**: Ionic React

## Project Structure

```
src/
├── components/           # React components
│   ├── ProductCard.tsx   # Individual product display
│   ├── ProductStack.tsx  # Stack of products with swipe logic
│   └── SwipeActions.tsx  # Visual feedback for swipe actions
├── hooks/               # Custom React hooks
│   └── useSwipe.tsx     # Swipe gesture handling
├── data/                # Product data and utilities
├── pages/               # Application pages
└── index.css            # Global styles and theme configuration
```

## Getting Started

### Prerequisites
- Node.js (recommended version: 18.x or higher)
- Bun (recommended package manager)
- Capacitor CLI

### Setup Instructions

1. Install Bun (if not already installed):
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

2. Install project dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Build for production:
```bash
bun run build
```

### Capacitor Setup for Mobile Development

1. Initialize Capacitor:
```bash
npx cap init
```

2. Add platforms (iOS and Android):
```bash
npx cap add ios
npx cap add android
```

3. Sync platforms:
```bash
npx cap sync
```

4. Open in native IDE:
```bash
# For iOS
npx cap open ios

# For Android
npx cap open android
```

## Key Components

### ProductCard
- Displays individual product information
- Handles swipe gestures (left, right, up)
- Shows product image, name, and price
- Displays discount prices
- Provides haptic feedback

### ProductStack
- Manages stack of products
- Handles swipe transitions
- Manages state for likes and cart
- Implements three swipe actions:
  - Left: Pass/Reject
  - Right: Like
  - Up: Add to Cart

### SwipeActions
- Visual feedback for swipe actions
- Shows icons for different actions:
  - Heart for like
  - X for pass
  - Shopping cart for add to cart
- Uses overlays with different colors

## State Management

- Uses React's useState for local component state
- Manages:
  - Current product index
  - Products list
  - Loading state
  - Like count
  - Cart count