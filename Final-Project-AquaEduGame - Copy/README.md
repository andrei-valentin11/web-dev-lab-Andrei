# AquaEduGame - Aquaculture Education Platform

A comprehensive web application designed for AFA (Agriculture and Fisheries) students and teachers to learn about Philippine aquaculture species through interactive simulations and analytics.

## Features

### 🌊 Species Database
- Explore 6 different Philippine aquaculture species
- Detailed specifications including:
  - pH levels (min, max, optimal)
  - Oxygen levels
  - Temperature requirements
  - Water depth preferences
  - Salinity levels
  - Feeding requirements
  - Growth rates and difficulty levels

### 🎮 Interactive Simulator
- Hands-on practice caring for aquatic species
- Real-time parameter adjustment:
  - pH level control
  - Temperature management
  - Water depth adjustment
  - Oxygen level monitoring
- Health tracking and scoring system
- Real-time alerts and feedback

### 📊 Analytics & Insights
- Performance tracking and trends
- Skill distribution analysis
- Species progress monitoring
- Achievement system
- Learning statistics

### 👤 Student Profile
- Personal information management
- Progress overview
- Recent activity tracking
- Learning statistics

### 🔐 Authentication
- Secure login/sign up system
- Role-based access (Student/Teacher)
- User session management

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Framer Motion** - Advanced animations
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
│   └── Layout.jsx   # Main layout with navigation
├── pages/           # Page components
│   ├── LoginPage.jsx
│   ├── SpeciesPage.jsx
│   ├── SimulatorPage.jsx
│   ├── AnalyticsPage.jsx
│   └── ProfilePage.jsx
├── data/            # Data files
│   └── speciesData.js
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Species Included

1. **Tilapia** (Oreochromis niloticus) - Easy
2. **Bangus/Milkfish** (Chanos chanos) - Medium
3. **Shrimp/Vannamei** (Litopenaeus vannamei) - Hard
4. **Crab/Mud Crab** (Scylla serrata) - Medium
5. **Seaweed/Kappaphycus** (Kappaphycus alvarezii) - Easy
6. **Grouper** (Epinephelus spp.) - Hard

## Usage

1. **Login/Sign Up**: Create an account or login to access the platform
2. **Species Page**: Browse and learn about different aquaculture species
3. **Simulator**: Select a species and practice managing water parameters
4. **Analytics**: View your learning progress and achievements
5. **Profile**: Manage your account and view personal statistics

## Features Highlights

- ✨ Beautiful, modern UI with glassmorphism effects
- 🎨 Advanced animations using Framer Motion
- 📱 Responsive design for all devices
- 🎯 Interactive learning experience
- 📈 Real-time performance tracking
- 🏆 Achievement system
- 🔔 Real-time alerts and feedback

## License

This project is created for educational purposes.

