# **KudoSpot**

KudoSpot is a platform to share appreciation in a team by sending kudos with various badges and personalized messages. It includes features like a kudos feed, analytics, and a leaderboard.

---

## **Features**

- **User Authentication**: Log in using your name.
- **Send Kudos**: Appreciate team members with predefined badges.
- **View Kudos Feed**: See all kudos given across the team.
- **Like Posts**: Like or unlike kudos posts.
- **Analytics**: Visualize the kudos you've sent.
- **Leaderboard**: See top contributors based on kudos received.
- **Logout**: Easily log out of your account.

---

## **Tech Stack**

### Frontend

- **React + vite**: UI Framework.
- **Tailwind CSS**: Styling.
- **React Router**: Navigation.
- **Toastify**: Notifications.
- **ReactChartjs-2**: Analytics visualization.

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: Backend framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.

---

### **MONGODB Schema**

- **Users Collection**

{
"\_id": "ObjectId",
"name": "string",
"email": "string",
"kudosReceived": ["ObjectId"]
}

- **Kudos Collection**

{
"\_id": "ObjectId",
"to": "ObjectId (ref: Users)",
"from": "ObjectId (ref: Users)",
"badge": "enum (Helping Hand, Excellence, Above and Beyond, Client Focus)",
"reason": "string",
"likes": ["ObjectId (ref: Users)"],
"createdAt": "date"
}

- Relationships:

- **Kudos are linked to users (to and from).**

- **Likes are linked to users who liked the kudos.**

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/DigpalSinghPanwar/kudospot.git
cd kudospot
```

### **2. Navigate to the backend directory:**

```bash
cd backend
npm install
```

Create a config.env file in the backend/ directory:

```bash
MONGO_URI=your-mongodb-uri
PORT=5000
```

Start the backend server:

```bash
npm start
```

### **2. Navigate to the frontend directory:**

```bash
cd frontend
npm install
```

Update the backend base URL in src/utils/axios.js:

```bash
const instance = axios.create({
  baseURL: "http://localhost:10000/api", // Update this to your backend URL
});
```

Start the frontend development server:

```bash
npm run dev
```

## **Predefined Users for Login**

# **Below are four predefined users for testing the application**

# **Name**

- John Cena

- Roman Reigns

- AJ Styles

- Brock Lesnar

# **Use these names during the login process to test the application functionality.**
