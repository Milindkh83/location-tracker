
// const dotenv = require("dotenv");
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const locationRoutes = require("./routes/locationRoutes");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/location", locationRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });


require("dotenv").config(); // 🔥 FIRST LINE

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const locationRoutes = require("./routes/locationRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/location", locationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});