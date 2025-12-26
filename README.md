# Digital Communication Suite

A high-fidelity Laboratory for exploring the mathematical foundations of modern communication protocols. This project provides interactive visualizations and theoretical backgrounds for complex signal processing topics, from Fourier analysis to spread spectrum techniques.

## Overview

The Digital Communication Suite is designed to bridge the gap between abstract mathematical formulas and physical intuition. It features real-time simulations that allow users to manipulate parameters and observe immediate effects on signal behavior in both time and frequency domains.

## Technology Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS
- **Interactions**: Framer Motion, Lucide React
- **Visualizations**: Three.js, React Three Fiber, Chart.js, Canvas API

## Project Structure

- `src/simulations/`: High-fidelity interactive components for each topic.
- `src/data/`: Centralized theoretical content, mathematical requirements, and references.
- `src/pages/`: Main application views including the Laboratory Landing Page and Theory Pages.
- `src/components/`: Reusable UI components like the Sidebar, Navbar, and Module Cards.

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd communication
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   Note: The `--legacy-peer-deps` flag is recommended due to specific version requirements for Three.js and React Three Fiber integration.

### Development

Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build

Build the optimized production bundle:
```bash
npm run build
```
Generate a local preview of the production build:
```bash
npm run preview
```

## Features

- **Interactive Simulations**: 24+ high-fidelity visualizations covering Sampling Theorem, Convolution, OFDM, FHSS, and more.
- **Laboratory Perspective**: Focused on research-grade visualizations rather than marketing layouts.
- **Responsive Layout**: Dynamic sidebar and content mapping for seamless desktop and mobile experiences.
- **Theoretical Documentation**: In-depth explanations and seminal academic references for every module.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
