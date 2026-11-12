
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Employee Directory API is running"
    });
});

app.use("/employees", employeeRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
