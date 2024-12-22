const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config.env" });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("middleware succesful");
  next();
});

// Import Routes
const userRoutes = require("./routes/user");
const kudoRoutes = require("./routes/kudo");

// Use Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/kudos", kudoRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "welcome to my medium app",
  });
});

app.all("*", (req, res, next) => {
  console.log("error routes");
});

// Connect to MongoDB

const db = process.env.MONGO_URL;
console.log(db);

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
