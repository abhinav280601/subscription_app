const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();
// app.use(cors);
app.use(express.json());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.sendFile("/frontend/index.ejs");
// });

app.use("/auth", authRoutes);
app.use("/api", planRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
