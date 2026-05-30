const Certificate =
    require("../models/certificate");

// =========================
// CREATE CERTIFICATE
// =========================

exports.createCertificate =
    async (req, res) => {

        try {

            const certificate =
                await Certificate.create(
                    req.body
                );

            res.status(201).json(
                certificate
            );

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// =========================
// VERIFY CERTIFICATE
// =========================

exports.verifyCertificate =
    async (req, res) => {

        try {

            const certificate =
                await Certificate.findOne({

                    certificateId:
                        req.params.id

                });

            if (!certificate) {

                return res.status(404).json({

                    message:
                        "Certificate not found"

                });

            }

            res.status(200).json(
                certificate
            );

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// =========================
// GET ALL CERTIFICATES
// =========================

exports.getCertificates =
    async (req, res) => {

        try {

            const certificates =
                await Certificate.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json(
                certificates
            );

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// =========================
// DELETE CERTIFICATE
// =========================

exports.deleteCertificate =
    async (req, res) => {

        try {

            const certificate =
                await Certificate.findByIdAndDelete(
                    req.params.id
                );

            if (!certificate) {

                return res.status(404).json({

                    message:
                        "Certificate not found"

                });

            }

            res.status(200).json({

                message:
                    "Certificate deleted successfully"

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };
