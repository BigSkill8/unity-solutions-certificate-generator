// =========================
// CHECK LOGIN
// =========================

const token =
    localStorage.getItem(
        "token"
    );

if (!token) {

    window.location.href =
        "login.html";

}

// =========================
// LOGOUT
// =========================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "token"
            );

            window.location.href =
                "login.html";

        }
    );

}