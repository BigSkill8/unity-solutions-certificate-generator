// =========================
// BACKEND BASE URL
// =========================

const API_BASE_URL =
    "https://unity-solutions-certificate-generator.onrender.com";

// =========================
// GLOBAL DATA
// =========================

let certificates = [];

// =========================
// ELEMENTS
// =========================

const tableBody =
    document.getElementById("certificateTableBody");

const searchInput =
    document.getElementById("searchInput");

const totalCertificates =
    document.getElementById("totalCertificates");

const activeCertificates =
    document.getElementById("activeCertificates");

const templateCount =
    document.getElementById("templateCount");

// =========================
// LOAD CERTIFICATES
// =========================

async function loadCertificates() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "login.html";
            return;
        }

        const response = await fetch(
            `${API_BASE_URL}/api/certificates`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch certificates");
        }

        certificates = await response.json();

        renderCertificates(certificates);
        updateStatistics();

    } catch (error) {

        console.error("Dashboard Error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load certificates.
                </td>
            </tr>
        `;
    }
}

// =========================
// UPDATE STATISTICS
// =========================

function updateStatistics() {

    totalCertificates.textContent = certificates.length;
    activeCertificates.textContent = certificates.length;

    const templates = new Set();

    certificates.forEach(certificate => {
        if (certificate.template) {
            templates.add(certificate.template);
        }
    });

    templateCount.textContent = templates.size;
}

// =========================
// DELETE CERTIFICATE
// =========================

async function deleteCertificate(certificateMongoId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this certificate?");

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/certificates/${certificateMongoId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert("Certificate deleted successfully.");
        loadCertificates();

    } catch (error) {

        console.error(error);
        alert(error.message);
    }
}

// =========================
// RENDER TABLE
// =========================

function renderCertificates(data) {

    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No certificates found.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(certificate => {

        const row = `
            <tr>
                <td>${certificate.certificateId}</td>
                <td>${certificate.recipientName}</td>
                <td>${certificate.courseName}</td>
                <td>${certificate.issueDate}</td>
                <td>${certificate.template}</td>
                <td>
                    <span class="status-badge">Active</span>
                </td>
                <td>
                    <button class="delete-btn"
                        onclick="deleteCertificate('${certificate._id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase().trim();

    const filtered = certificates.filter(certificate =>
        certificate.recipientName.toLowerCase().includes(value) ||
        certificate.certificateId.toLowerCase().includes(value) ||
        certificate.courseName.toLowerCase().includes(value) ||
        (certificate.template || "").toLowerCase().includes(value)
    );

    renderCertificates(filtered);
});

// =========================
// AUTO REFRESH
// =========================

setInterval(loadCertificates, 30000);

// =========================
// INITIAL LOAD
// =========================

loadCertificates();
