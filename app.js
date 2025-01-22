const express = require("express");
const errorHandle = require("./middleware/errorHandler");

const connectDb = require("./config/dbConnection");
connectDb();
const app = express();
const PORT = process.env.PORT || 1000;
const dotenv = require("dotenv").config();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandle);

app.listen(PORT);
