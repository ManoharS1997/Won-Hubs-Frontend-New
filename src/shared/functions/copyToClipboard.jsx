import Swal from "sweetalert2";

export default function copyToClipboard(text, successMessage = 'Copied!', errorMessage = 'Failed to copy!') {
    if (!navigator.clipboard) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Prevent scrolling to bottom of the page
        textArea.style.opacity = "0"; // Hide the textarea
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            if (successful) {
                Swal.fire({
                    icon: 'success',
                    title: successMessage,
                    text: 'Text has been copied to clipboard.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                throw new Error("Fallback copy failed");
            }
        } catch (err) {
            document.body.removeChild(textArea);
            console.error("Fallback copy failed: ", err);
            Swal.fire({
                icon: 'error',
                title: errorMessage,
                text: 'Unable to copy text to clipboard.',
                timer: 1500,
                showConfirmButton: false,
            });
        }
        return;
    }

    // Modern Clipboard API
    navigator.clipboard.writeText(text).then(
        () => {
            Swal.fire({
                icon: 'success',
                title: successMessage,
                text: 'Text has been copied to clipboard.',
                timer: 1500,
                showConfirmButton: false,
            });
        },
        (err) => {
            console.error("Failed to copy: ", err);
            Swal.fire({
                icon: 'error',
                title: errorMessage,
                text: 'Unable to copy text to clipboard.',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    );
}