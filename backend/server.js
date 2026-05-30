const express =
    require("express");

const cors =
    require("cors");

const dotenv =
    require("dotenv");

const connectDB =
    require("./config/db");

const certificateRoutes =
    require("./routes/certificateRoutes");

const authRoutes =
    require("./routes/authRoutes");

// =========================
// CONFIG
// =========================

dotenv.config();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// APP
// =========================

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

// =========================
// ROUTES
// =========================

// Certificate Routes
app.use(
    "/api/certificates",
    certificateRoutes
);

// Authentication Routes
app.use(
    "/api/auth",
    authRoutes
);

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

    res.send(
        "Certificate API Running"
    );

});

// =========================
// PORT
// =========================

const PORT =
    process.env.PORT || 5000;

// =========================
// SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});