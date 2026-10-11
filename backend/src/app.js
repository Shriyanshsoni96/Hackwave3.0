
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ReviveAI backend is running",
  });
});

async function startServer() {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
