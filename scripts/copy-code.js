document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".copy-btn").forEach(button => {
        button.addEventListener("click", function () {
            const codeContent = this.parentElement.querySelector(".code-content").innerText;
            navigator.clipboard.writeText(codeContent.trim()).then(() => {
                this.textContent = "✅"; // Show checkmark
                setTimeout(() => this.textContent = "📋", 2000); // Revert to copy symbol
            }).catch(err => console.error("Error copying text:", err));
        });
    });
});
