# Smart City Dashboard - Agadir, Morocco

A comprehensive full-stack web application for managing smart city operations in Agadir, Morocco, with scalability for World Cup 2030 and other Moroccan cities.

## 🏛️ Features

### Phase 1 - MVP (Current)
- **Weather Dashboard**: Real-time weather data and forecasts
- **Interactive Map**: Leaflet-based mapping with Agadir focus
- **Event Management**: City events and announcements
- **Responsive Design**: Mobile-first Bootstrap implementation
- **Multi-language Support**: English, Arabic, French with i18next
- **User Authentication**: JWT-based secure authentication
- **Moroccan Theme**: Custom UI with traditional Moroccan colors and patterns

### Phase 2 - Enhanced Features (Planned)
- **Alert System**: Emergency notifications and city alerts
- **Analytics Dashboard**: City metrics and data visualization
- **Multi-city Support**: Expandable to other Moroccan cities

### Phase 3 - Mobile Integration (Planned)
- **React Native App**: Mobile companion application
- **Push Notifications**: Real-time mobile alerts
- **Offline Capabilities**: Core features available offline

## 🎨 Design System

### Color Palette
- **Deep Blue**: #1E3A8A (Primary)
- **Turquoise**: #14B8A6 (Secondary)
- **Sand Beige**: #F5E6CA (Background)
- **Amazigh Orange**: #E07A5F (Accent)
- **Charcoal**: #1F2937 (Text)
- **White**: #FFFFFF (Cards/Surfaces)

### Typography
- **Headings**: Poppins (300-700 weights)
- **Body Text**: Inter (300-600 weights)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd smart-city-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm run install-all
   \`\`\`

3. **Environment Setup**
   
   **Server (.env in /server directory):**
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/smart-city-dashboard
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   CLIENT_URL=http://localhost:3000
   \`\`\`
   
   **Client (.env in /client directory):**
   \`\`\`env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAP_CENTER_LAT=30.4278
   REACT_APP_MAP_CENTER_LNG=-9.5981
   REACT_APP_WEATHER_API_KEY=your-weather-api-key
   \`\`\`

4. **Start Development Servers**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   This will start:
   - Backend API server on http://localhost:5000
   - Frontend React app on http://localhost:3000

## 📁 Project Structure

\`\`\`
smart-city-dashboard/
├── client/                 # React frontend

│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── i18n/          # Internationalization
│   │   ├── styles/        # CSS and theme files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database and app configuration
│   ├── controllers/      # Route logic and business logic
│   ├── middleware/       # Custom middleware (auth, etc.)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   └── package.json
└── README.md
\`\`\`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Weather
- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast

## 🌍 Internationalization

The application supports three languages:
- **English** (en) - Default
- **Arabic** (ar) - RTL support included
- **French** (fr)

Language switching is available in the navigation bar. Translations are managed through i18next with automatic language detection and localStorage persistence.

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: API request rate limiting
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Helmet**: Security headers middleware
- **Input Validation**: Request validation and sanitization

## 📱 Responsive Design

- **Mobile-First**: Bootstrap 5 grid system
- **Breakpoints**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Mobile-optimized interactions
- **Performance**: Optimized loading and rendering

## 🚀 Deployment

### Frontend (Vercel/Netlify)
\`\`\`bash
cd client
npm run build
# Deploy build folder to your hosting service
\`\`\`

### Backend (Render/Railway/Heroku)
\`\`\`bash
cd server
# Set environment variables in your hosting service
# Deploy server directory
\`\`\`

### Environment Variables for Production
Make sure to set all environment variables in your hosting service dashboard.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏛️ About Agadir

Agadir is a major city in Morocco located on the Atlantic coast. This dashboard is designed to support the city's smart city initiatives and prepare for the 2030 FIFA World Cup hosting responsibilities.

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for Agadir, Morocco** 🇲🇦
