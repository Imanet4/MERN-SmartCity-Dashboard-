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


--- Screenshots of the website UI ---
<img width="1920" height="2662" alt="Dashboard-light" src="https://github.com/user-attachments/assets/5c8c696a-8d80-4bc5-ad67-2fb4ede251df" />



<img width="1920" height="2662" alt="Dashboard-dark" src="https://github.com/user-attachments/assets/e387489f-9720-4a15-b9a3-60689cca2894" />


<img width="1920" height="2967" alt="Weather-light" src="https://github.com/user-attachments/assets/4b70d2f4-1ecd-42bb-b57a-0ada402e36f8" />


<img width="1920" height="2967" alt="Weather-dark" src="https://github.com/user-attachments/assets/18b914c9-cd0a-4371-b8e2-b7e36d0bbc1a" />


<img width="1920" height="1996" alt="Events-light" src="https://github.com/user-attachments/assets/b9ab4697-7358-44ed-b1e4-a8997816d5e6" />


<img width="1920" height="1996" alt="Events-dark" src="https://github.com/user-attachments/assets/7f42c589-a641-4183-96a5-f01630f1c545" />


<img width="1920" height="2106" alt="Map-light" src="https://github.com/user-attachments/assets/1fe67920-bba4-4f32-9060-fe07dd6fd410" />


<img width="1920" height="2106" alt="Map-dark" src="https://github.com/user-attachments/assets/75aaa601-3e72-4f6f-b21a-e7fabec6688f" />



<img width="1920" height="1427" alt="Login-light" src="https://github.com/user-attachments/assets/1a6ad993-0d03-4eec-bbaa-7859c4325086" />


<img width="1920" height="1427" alt="Login-dark" src="https://github.com/user-attachments/assets/e32b6c4d-075e-44f3-869c-bb9f6e67785c" />


<img width="1920" height="1557" alt="register-light" src="https://github.com/user-attachments/assets/dd016b7f-25ce-4c55-9832-04829c6dfd73" />


<img width="1920" height="2152" alt="Profile1" src="https://github.com/user-attachments/assets/ee932ce9-9860-44b1-8b8d-9e44c57045df" />
<img width="1920" height="1880" alt="Profile2" src="https://github.com/user-attachments/assets/68c17436-1fed-418c-989d-30851f94fd85" />
<img width="1920" height="2000" alt="Profile3" src="https://github.com/user-attachments/assets/2e956bcb-6109-46ea-ba5c-ed4bb4ba9cb1" />


<img width="1916" height="876" alt="CREATE" src="https://github.com/user-attachments/assets/364dd2a8-3860-4f86-8315-959befd4b033" />


