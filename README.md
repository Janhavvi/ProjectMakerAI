# ProjectMaker AI - Full Stack SaaS Platform

A production-ready, full-stack SaaS platform for AI-powered website generation using React, Vite, Node.js, Express, and MongoDB.

## Project Structure

```
ProjectMaker/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React context for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service calls
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles
│   │   ├── assets/         # Images, icons, logos
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/         # Static files
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/            # Node.js + Express backend
│   ├── config/         # Database and auth configuration
│   ├── controllers/    # Route handlers and business logic
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API route definitions
│   ├── services/       # External service integrations
│   ├── utils/          # Helper functions
│   ├── uploads/        # User uploads directory
│   ├── server.js       # Express app entry point
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── .gitignore
└── README.md
```

## Features

### Frontend
- ⚡ Fast development with Vite
- ⚛️ React 19 with hooks
- 🎨 Modern component architecture
- 🔄 Context API for state management
- 📦 Service layer for API integration

### Backend
- 🚀 Express.js server
- 📊 MongoDB with Mongoose
- 🔐 JWT authentication
- 🤖 OpenAI integration for AI features
- 💳 Stripe payment integration
- ✉️ Email notifications
- ⏱️ Rate limiting and security

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Installation

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## API Documentation

See [backend/README.md](backend/README.md) for detailed API endpoint documentation.

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/projectmaker
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
NODE_ENV=development
```

## Development

### Running Both Servers
Open two terminals:

**Terminal 1 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

## Build for Production

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm start
```

## Technologies Used

### Frontend
- React 19
- Vite 8
- JavaScript/JSX
- CSS

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT (JSON Web Tokens)
- Passport.js
- OpenAI API
- Stripe API
- Nodemailer

## License

MIT

## Support

For support, email support@projectmaker.ai or open an issue on GitHub.
# ProjectMakerAI
