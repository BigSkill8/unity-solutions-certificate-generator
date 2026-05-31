const express = require("express");

const router = express.Router();

const {
    createCertificate,
    verifyCertificate,
    getCertificates,
    deleteCertificate
} = require("../controllers/certificateController");

const authMiddleware = require("../middleware/authMiddleware");


// =========================
// CREATE CERTIFICATE
// PUBLIC (NO LOGIN REQUIRED)
// =========================

router.post("/", createCertificate);


// =========================
// VERIFY CERTIFICATE
// PUBLIC
// =========================

router.get("/verify/:id", verifyCertificate);


// =========================
// GET ALL CERTIFICATES
// ADMIN ONLY
// =========================

router.get("/", authMiddleware, getCertificates);


// =========================
// DELETE CERTIFICATE
// ADMIN ONLY
// =========================

router.delete("/:id", authMiddleware, deleteCertificate);


module.exports = router;
