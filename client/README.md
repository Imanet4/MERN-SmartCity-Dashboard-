# Smart City Dashboard - Frontend

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Setup
Create a `.env` file in the client directory:
\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAP_CENTER_LAT=30.4278
REACT_APP_MAP_CENTER_LNG=-9.5981
REACT_APP_DEFAULT_LANGUAGE=en
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm start
\`\`\`

## Features

### 🎨 Moroccan Theme
- Custom color palette with Deep Blue, Turquoise, Sand Beige, and Amazigh Orange
- Traditional geometric patterns and design elements
- Responsive design with Bootstrap 5
- Dark mode support

### 🌍 Multi-language Support
- English, Arabic (RTL), and French
- Automatic language detection
- Persistent language preferences
- Complete UI translation

### 🔐 Authentication
- JWT-based authentication
- Protected routes
- User profile management
- Role-based access control

### 📱 Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Touch-friendly interactions
- Optimized for all screen sizes

### 🏛️ Smart City Features
- Real-time weather data
- Event management system
- Interactive city map
- World Cup 2030 preparation tracking

## API Integration

The frontend integrates with the backend API for:
- User authentication and profiles
- Event CRUD operations
- Weather data fetching
- Location and map data
- Dashboard statistics

## Components Structure

\`\`\`
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   └── layout/         # Layout components (Navbar, Footer)
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service functions
├── styles/             # CSS and theme files
└── utils/              # Utility functions
\`\`\`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_MAP_CENTER_LAT` - Default map latitude
- `REACT_APP_MAP_CENTER_LNG` - Default map longitude
- `REACT_APP_DEFAULT_LANGUAGE` - Default UI language

## Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel
\`\`\`bash
vercel --prod
\`\`\`

### Deploy to Netlify
\`\`\`bash
netlify deploy --prod --dir=build
\`\`\`
