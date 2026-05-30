document
    .getElementById(
        "loginBtn"
    )
    .addEventListener(
        "click",
        login
    );

async function login() {

    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();

    const password =
        document
            .getElementById(
                "password"
            )
            .value
            .trim();

    if (
        !email ||
        !password
    ) {

        alert(
            "Please enter email and password."
        );

        return;

    }

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        if (response.ok && data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

            alert(
                "Login successful."
            );

            window.location.href =
                "dashboard.html";

        }

        else {

            alert(
                data.message ||
                "Invalid email or password."
            );

        }

    }

    catch (error) {

        console.error(
            error
        );

        alert(
            "Server connection failed."
        );

    }

}