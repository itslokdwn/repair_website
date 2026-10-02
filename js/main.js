// ========================================
// FAQ
// ========================================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer =
            question.nextElementSibling;

        const icon =
            question.querySelector(".faq-icon");

        const isOpen =
            answer.style.display === "block";

        answer.style.display =
            isOpen ? "none" : "block";

        icon.textContent =
            isOpen ? "+" : "−";

    });

});


// ========================================
// REPAIR REQUEST FORM
// ========================================

const repairForm =
    document.querySelector("#repair-form");

if (repairForm) {

    repairForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            repairForm.querySelector(".form-submit");

        const formStatus =
            document.querySelector("#form-status");

        const originalButtonText =
            submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent =
            "Sending...";

        const formData =
            new FormData(repairForm);

        try {

            const response =
                await fetch(
                    repairForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

            if (response.ok) {

    repairForm.reset();

    formStatus.textContent =
        "Your repair request has been received. We'll be in touch soon.";

    formStatus.className =
        "form-status success";

} else {

    throw new Error(
        "Form submission failed."
    );

}

        } catch (error) {

            console.error(error);

            formStatus.textContent =
    "Something went wrong. Please try again.";

formStatus.className =
    "form-status error";

        }

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.textContent =
                originalButtonText;

        }, 3000);

    });

}