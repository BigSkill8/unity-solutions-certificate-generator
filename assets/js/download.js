const downloadBtn =
    document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", downloadCertificate);

// =========================
// DOWNLOAD FUNCTION
// =========================

async function downloadCertificate(){

    // CERTIFICATE ELEMENT
    const certificate =
        document.getElementById("certificate");

    // BUTTON STATE
    downloadBtn.textContent =
        "Generating PDF...";

    downloadBtn.disabled = true;

    try{

        // =========================
        // HIGH QUALITY CANVAS
        // =========================

        const canvas =
            await html2canvas(certificate, {

                scale: 3,

                useCORS: true,

                logging: false,

                backgroundColor: null

            });

        // IMAGE DATA
        const imageData =
            canvas.toDataURL(
                "image/png"
            );

        // =========================
        // jsPDF
        // =========================

        const {
            jsPDF
        } = window.jspdf;

        // LANDSCAPE PDF
        const pdf =
            new jsPDF({

                orientation: "landscape",

                unit: "px",

                format: [1400, 1000]

            });

        // PDF DIMENSIONS
        const pdfWidth =
            pdf.internal.pageSize.getWidth();

        const pdfHeight =
            pdf.internal.pageSize.getHeight();

        // IMAGE DIMENSIONS
        const imageWidth =
            canvas.width;

        const imageHeight =
            canvas.height;

        // SCALE RATIO
        const ratio =
            Math.min(
                pdfWidth / imageWidth,
                pdfHeight / imageHeight
            );

        // FINAL SIZE
        const finalWidth =
            imageWidth * ratio;

        const finalHeight =
            imageHeight * ratio;

        // CENTER IMAGE
        const x =
            (pdfWidth - finalWidth) / 2;

        const y =
            (pdfHeight - finalHeight) / 2;

        // ADD IMAGE
        pdf.addImage(
            imageData,
            "PNG",
            x,
            y,
            finalWidth,
            finalHeight
        );

        // =========================
        // FILE NAME
        // =========================

        const recipientName =
            document.getElementById("previewName")
            .textContent
            .replace(/\s+/g, "-");

        // SAVE PDF
        pdf.save(
            `${recipientName}-certificate.pdf`
        );

    }

    catch(error){

        console.error(error);

        alert(
            "Failed to generate PDF."
        );

    }

    finally{

        // RESET BUTTON
        downloadBtn.textContent =
            "Download PDF";

        downloadBtn.disabled = false;

    }

}