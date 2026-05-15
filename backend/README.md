# ProjectMaker AI - Backend

Node.js + Express backend for the ProjectMaker AI SaaS platform.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/projectmaker
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

## Project Structure

- `config/` - Database and authentication configuration
- `controllers/` - Business logic for routes
- `models/` - MongoDB schemas
- `middleware/` - Authentication and error handling
- `routes/` - API route definitions
- `services/` - External service integrations (OpenAI, Stripe, etc.)
- `utils/` - Helper functions and utilities
- `uploads/` - Uploaded files storage

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/ai/generate` - Generate content with AI
- `GET /api/templates` - Get available templates
- `GET /api/admin/analytics` - Get platform analytics (admin only)
