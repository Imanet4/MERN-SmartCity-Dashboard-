# Smart City Dashboard - Backend API

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Setup
Create a `.env` file in the server directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/smart-city-dashboard
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CLIENT_URL=http://localhost:3000
\`\`\`

### 3. Seed Database
\`\`\`bash
npm run seed
\`\`\`

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

### Events
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (auth required)
- `PUT /api/events/:id` - Update event (auth required)
- `DELETE /api/events/:id` - Delete event (auth required)
- `POST /api/events/:id/join` - Join event (auth required)
- `POST /api/events/:id/leave` - Leave event (auth required)

### Locations
- `GET /api/locations` - Get all locations (with filtering)
- `GET /api/locations/:id` - Get single location
- `POST /api/locations` - Create location (admin only)
- `PUT /api/locations/:id` - Update location (admin only)
- `DELETE /api/locations/:id` - Delete location (admin only)
- `POST /api/locations/:id/review` - Add review (auth required)
- `POST /api/locations/:id/checkin` - Check in (auth required)

### Weather
- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast
- `GET /api/weather/alerts` - Get weather alerts

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get user activity (auth required)

## Database Models

### User
- Authentication and profile information
- Preferences and settings
- Role-based access control

### Event
- Event management with CRUD operations
- Attendee tracking
- Category and location filtering

### Location
- Points of interest in Agadir
- Reviews and ratings
- World Cup 2030 venue information

## Sample Data

The seed script creates:
- 3 sample users (admin, user, moderator)
- 6 key locations in Agadir
- 4 sample events

### Sample Login Credentials
- **Admin**: ahmed.benali@example.com / password123
- **User**: fatima.mansouri@example.com / password123
- **Moderator**: youssef.alami@example.com / password123
