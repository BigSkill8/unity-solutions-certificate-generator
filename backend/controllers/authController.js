const jwt =
    require("jsonwebtoken");

const bcrypt =
    require("bcryptjs");

const Admin =
    require("../models/Admin");

// =========================
// LOGIN
// =========================

exports.login =
    async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Email and password are required."

            });

        }

        // =========================
        // FIND ADMIN
        // =========================

        const admin =
            await Admin.findOne({

                email:
                    email.trim()

            });

        if (!admin) {

            return res.status(401).json({

                message:
                    "Invalid credentials"

            });

        }

        // =========================
        // PASSWORD CHECK
        // =========================

        const validPassword =
            await bcrypt.compare(

                password,

                admin.password

            );

        if (!validPassword) {

            return res.status(401).json({

                message:
                    "Invalid credentials"

            });

        }

        // =========================
        // GENERATE TOKEN
        // =========================

        const token =
            jwt.sign(

                {

                    id:
                        admin._id

                },

                process.env.JWT_SECRET,

                {

                    expiresIn:
                        "1d"

                }

            );

        // =========================
        // SUCCESS
        // =========================

        res.status(200).json({

            token,

            admin: {

                id:
                    admin._id,

                email:
                    admin.email

            }

        });

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({

            message:
                "Server error"

        });

    }

};