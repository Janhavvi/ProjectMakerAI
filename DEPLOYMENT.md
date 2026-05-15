# AWS Amplify Deployment

## Frontend on Amplify Hosting

This repository is a monorepo. The deployable Vite app lives in `frontend/`, so the root `amplify.yml` points Amplify to that folder.

In Amplify Hosting, add these environment variables:

```text
VITE_API_URL=https://your-backend-domain.com/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

The frontend build command is:

```text
npm run build
```

The output folder is:

```text
frontend/dist
```

## Backend

The current backend is an Express/MongoDB server. Amplify static hosting does not run this server as a long-running API process.

Deploy the `backend/` folder separately, for example on AWS App Runner, Elastic Beanstalk, EC2, ECS, or another Node hosting service. After deployment, set `VITE_API_URL` in Amplify to that backend URL with `/api` at the end.

Backend environment variables needed:

```text
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
NVIDIA_NIM_API_KEY=your-nvidia-key
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## Single Page App Routing

In Amplify Hosting, add a rewrite rule so refreshes on routes like `/dashboard`, `/generate`, `/login`, and `/pricing` load the React app:

```text
Source address: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target address: /index.html
Type: 200 (Rewrite)
```
