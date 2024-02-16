require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const bcrypt = require("bcrypt");
const requireAuth = require('./middlewares/authMiddleware');
const saltRounds = 10;
const protectedRoute = require('./routers/protectedRoute');


const app = express();
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/users", userRouter);
app.use('/', protectedRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

