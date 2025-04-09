
# 📘 Auth0 Project Documentation

This documentation outlines the complete structure and functionality of the Auth0-based full-stack application, covering both frontend (Next.js) and backend (Node.js with Express). It includes authentication flow, API routes, role-based access, and mail integration using Resend SMTP.

## 🧠 Overview

-   **Frontend**: Built using Next.js 15 with React 19, TypeScript, Tailwind CSS
-   **Authentication**: Auth0 using `@auth0/nextjs-auth0`
-   **Backend**: Node.js with Express
-   **Mailer**: Nodemailer with Resend SMTP

## 📂 Frontend Structure (Next.js App)

### ➕ Packages Used

```json
{
  "dependencies": {
    "@auth0/nextjs-auth0": "^3.5.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.325.0",
    "next": "15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.2.1",
    "tw-animate-css": "^1.0.0"
  }
}

```

### 📁 Folder Structure

```
client/
├── app/
│   ├── page.tsx         // Home page
│   ├── admin/page.tsx   // Admin page (Protected)
│   ├── unauthorized/    // Unauthorized route
├── lib/
│   ├── auth0.ts         // Auth0 config
│   ├── utils.ts         // cn util
├── actions.ts           // Token & Role Fetching Logic
├── api/auth/token-send  // API route to send token to backend
├── api/profile  		// API route for profile data
├── api/public  		// Public API Route
├── styles/globals.css

```

### 🌐 Frontend Routes

| Path |Description  |
|--|--|
| / | Home page with login/logout and profile info
| /admin | Protected Admin Page
| /unauthorized |Unauthorized access page
| /api/public | Public Route
| /api/profile | Profile Route (Protected Route)
| /api/auth/token-send | Sends ID token to backend via POST
|

## 🚀 Backend Structure (Express Server)

### 📁 Folder Structure

```
server/
├── app.js                    // Entry point
├── controllers/
│   └── authController.js       // Handles callback logic
├── utils/
│   ├── jwtValidator.js         // Verifies ID tokens from Auth0
│   └── mailer.js               // Nodemailer setup
├── .env                        // Environment variables

```

### 🌐 Backend Routes

| Method |Route  | Description |
|--|--|--|
| GET | /api/callback |Validates token and sends email

## 🔐 Authentication Flow

1.  **User logs in** via Auth0 → receives a session in frontend
2.  **Client** sends token to `/api/auth/token-send`
3.  API Route forwards token to **Express backend** via `Authorization` header
4.  Backend:
    -   Validates ID token using JWKS
    -   Sends a mail with the ID token using Nodemailer

## 👮 Role-based Access (Admin Check)

-   Admin role checked using Auth0 Management API
-   Logic in `actions.ts`:
    -   `createAccessToken()` → gets management token
    -   `getUsersRoles()` → fetches roles
    -   `checkIsAdmin()` → checks for role named 'admin'

## 📧 Email Sending Setup (Resend SMTP)

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

```

-   Triggered in `authController.js` after token validation

## 🔐 Environment Variables (Frontend & Backend)

### FrontEnd
```
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
AUTH0_SECRET=
APP_BASE_URL=
SERVER_API_URL=
```
### Backend
```
PORT=
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
EMAIL_USER=
EMAIL_PASS=
```

## 📞 Contact Information

For any issues or collaboration, reach out to **Lakshay Babbar**:

-   🔗 **Portfolio**: [https://lakshay-babbar.vercel.app](https://lakshay-babbar.vercel.app/)
-   🔗 **LinkedIn**: [https://in.linkedin.com/in/lakshay-babbar](https://in.linkedin.com/in/lakshay-babbar)