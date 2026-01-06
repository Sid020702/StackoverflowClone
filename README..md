# Stack Overflow Clone 🧠💬

A full-stack **Stack Overflow–inspired platform** that allows users to ask and answer questions, connect with other users, share multimedia posts, and subscribe to premium plans that unlock higher usage limits. The project includes authentication, social features, and a Stripe-powered subscription model.

---

## 🌐 Live Demo

**Frontend (Hosted on Netlify):**  
👉 [https://sidz-stackoverflow-clone.netlify.app/](https://sidz-stackoverflow-clone.netlify.app/)

> The frontend communicates with a separately hosted backend API.

---

## 📂 Project Structure
```
project-root/
├── client/          # React frontend application
└── server/          # Node.js + Express backend API
```

---

## ✨ Features

### 🔐 Authentication & Accounts
- User registration and login
- JWT-based authentication
- Secure protected routes

### ❓ Q&A Functionality
- Ask questions
- Answer other users' questions
- View and interact with community content

### 👥 Social Features
- Send and accept friend invitations
- View friend activity

### 🖼️ Content Sharing
- Post images and videos
- Like and comment on posts

### 💳 Subscription Model (Stripe)
- Free and paid subscription tiers
- Limits the number of questions a user can ask
- Secure payment handling using **Stripe API**

### 📈 Scalable Architecture
- RESTful API design
- MongoDB Atlas for cloud database
- Environment-based configuration

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- HTML / CSS

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT (Authentication)
- Stripe API (Payments)

---

## ⚙️ Environment Variables

All environment variables are required **only for the server**.

Create a `.env` file inside the `server` folder:
```env
BASE_URL=your_backend_hosted_url
CONNECTION_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 🚀 Getting Started

Follow the steps below to set up the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Backend Setup (Server)
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add:
```env
BASE_URL=your_backend_hosted_url
CONNECTION_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:
```bash
npm start
```

The backend will start running on the configured port and connect to MongoDB Atlas.

### 3️⃣ Frontend Setup (Client)
```bash
cd ../client
npm install
npm start
```

The React application will run locally and communicate with the backend using the configured `BASE_URL`.

### 4️⃣ Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000) (or your configured port)

---

## 🙏 Acknowledgments

- Inspired by [Stack Overflow](https://stackoverflow.com/)