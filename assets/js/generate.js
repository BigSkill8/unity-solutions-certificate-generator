// =========================
// BACKEND BASE URL
// =========================

const API_BASE_URL =
    "https://unity-solutions-certificate-generator.onrender.com";

// =========================
// GENERATE BUTTON
// =========================

const generateBtn =
    document.getElementById("generateBtn");

generateBtn.addEventListener(
    "click",
    generateCertificate
);

// =========================
// GENERATE CERTIFICATE
// =========================

async function generateCertificate() {

    try {

        // =========================
        // INPUT VALUES
        // =========================

        const recipientName =
            document.getElementById("recipientName").value.trim();

        const courseName =
            document.getElementById("courseName").value.trim();

        const certificateDate =
            document.getElementById("certificateDate").value;

        const templateSelect =
            document.getElementById("templateSelect").value;

        // =========================
        // VALIDATION
        // =========================

        if (!recipientName || !courseName || !certificateDate) {
            alert("Please complete all fields.");
            return;
        }

        // =========================
        // UPDATE PREVIEW
        // =========================

        document.getElementById("previewName").textContent = recipientName;
        document.getElementById("previewCourse").textContent = courseName;
        document.getElementById("previewDate").textContent = certificateDate;

        // =========================
        // CERTIFICATE ID
        // =========================

        const randomNumber =
            Math.floor(100000 + Math.random() * 900000);

        const certificateId =
            `UNITY-2026-${randomNumber}`;

        document.getElementById("certificateIdText").textContent =
            certificateId;

        // =========================
        // TEMPLATE SWITCHER
        // =========================

        const certificate =
            document.getElementById("certificate");

        certificate.classList.remove(
            "modern-template",
            "classic-template",
            "premium-template"
        );

        certificate.classList.add(`${templateSelect}-template`);

        // =========================
        // CERTIFICATE DATA
        // =========================

        const certificateData = {
            certificateId,
            recipientName,
            courseName,
            issueDate: certificateDate,
            template: templateSelect
        };

        // =========================
        // AUTH TOKEN
        // =========================

        const token =
            localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            window.location.href = "login.html";
            return;
        }

        // =========================
        // SAVE TO DATABASE (FIXED URL)
        // =========================

        const response =
            await fetch(
                `${API_BASE_URL}/api/certificates`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify(certificateData)
                }
            );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to save certificate."
            );
        }

        console.log("Certificate Saved:", data);

        // =========================
        // QR CODE GENERATION
        // =========================

        const verificationURL =
            `${window.location.origin}/verify.html?id=${certificateId}`;

        const qrCanvas =
            document.getElementById("qrCanvas");

        QRCode.toCanvas(
            qrCanvas,
            verificationURL,
            {
                width: 120,
                margin: 1
            },
            function (error) {
                if (error) {
                    console.error(error);
                }
            }
        );

        // =========================
        // SUCCESS
        // =========================

        alert("Certificate generated and saved successfully!");

    } catch (error) {

        console.error("Generation Error:", error);

        alert(error.message || "Failed to save certificate.");
    }
}
