const jwt =
    require("jsonwebtoken");

// =========================
// AUTH MIDDLEWARE
// =========================

const authMiddleware =
    (req, res, next) => {

        try {

            const token =
                req.header(
                    "Authorization"
                );

            // =========================
            // NO TOKEN
            // =========================

            if (!token) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Access denied. No token provided."

                    });

            }

            // =========================
            // VERIFY TOKEN
            // =========================

            const verified =
                jwt.verify(

                    token,

                    process.env.JWT_SECRET

                );

            // =========================
            // ATTACH ADMIN DATA
            // =========================

            req.admin =
                verified;

            next();

        }

        catch (error) {

            console.error(
                "Auth Error:",
                error.message
            );

            return res
                .status(401)
                .json({

                    message:
                        "Invalid or expired token."

                });

        }

    };

module.exports =
    authMiddleware;