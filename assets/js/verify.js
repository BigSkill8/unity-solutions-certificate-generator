// =========================
// ELEMENTS
// =========================

const verifyBtn =
    document.getElementById(
        "verifyBtn"
    );

// =========================
// URL PARAMETERS
// =========================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const urlCertificateId =
    urlParams.get("id");

// =========================
// AUTO VERIFY FROM QR CODE
// =========================

if (urlCertificateId) {

    document.getElementById(
        "certificateId"
    ).value =
        urlCertificateId;

    verifyCertificate(
        urlCertificateId
    );

}

// =========================
// BUTTON CLICK
// =========================

verifyBtn.addEventListener(
    "click",
    () => {

        const certificateId =
            document
                .getElementById(
                    "certificateId"
                )
                .value
                .trim();

        if (!certificateId) {

            alert(
                "Please enter a certificate ID."
            );

            return;

        }

        verifyCertificate(
            certificateId
        );

    }
);

// =========================
// VERIFY CERTIFICATE
// =========================

async function verifyCertificate(
    certificateId
) {

    const statusTitle =
        document.getElementById(
            "statusTitle"
        );

    const statusText =
        document.getElementById(
            "statusText"
        );

    const statusIcon =
        document.querySelector(
            ".status-icon"
        );

    const verificationResult =
        document.getElementById(
            "verificationResult"
        );

    try {

        // =========================
        // LOADING STATE
        // =========================

        statusIcon.innerHTML =
            "⏳";

        statusTitle.textContent =
            "Verifying Certificate...";

        statusText.textContent =
            "Please wait while we validate the certificate.";

        // =========================
        // API REQUEST
        // =========================

        const response =
            await fetch(
                `http://localhost:5000/api/certificates/verify/${certificateId}`
            );

        // =========================
        // CERTIFICATE NOT FOUND
        // =========================

        if (!response.ok) {

            verificationResult.classList.remove(
                "valid"
            );

            verificationResult.classList.add(
                "invalid"
            );

            statusIcon.innerHTML =
                "✖";

            statusTitle.textContent =
                "Certificate Not Found";

            statusText.textContent =
                "The certificate ID entered does not exist in our records.";

            return;

        }

        const certificate =
            await response.json();

        // =========================
        // VALID CERTIFICATE
        // =========================

        verificationResult.classList.remove(
            "invalid"
        );

        verificationResult.classList.add(
            "valid"
        );

        statusIcon.innerHTML =
            "✔";

        statusTitle.textContent =
            "Certificate Verified";

        statusText.innerHTML = `

            <strong>Recipient:</strong>
            ${certificate.recipientName}

            <br><br>

            <strong>Course:</strong>
            ${certificate.courseName}

            <br><br>

            <strong>Issue Date:</strong>
            ${certificate.issueDate}

            <br><br>

            <strong>Certificate ID:</strong>
            ${certificate.certificateId}

            <br><br>

            <strong>Template:</strong>
            ${certificate.template}

            <br><br>

            This certificate is authentic and officially issued by Unity Solutions.

        `;

    }

    catch (error) {

        console.error(
            "Verification Error:",
            error
        );

        verificationResult.classList.remove(
            "valid"
        );

        verificationResult.classList.add(
            "invalid"
        );

        statusIcon.innerHTML =
            "⚠";

        statusTitle.textContent =
            "Server Error";

        statusText.textContent =
            "Unable to connect to the verification server.";

    }

}