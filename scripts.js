// JavaScript to display the correct language text
document.addEventListener("DOMContentLoaded", function () {
    const userLang = navigator.language || navigator.userLanguage; // Detect browser language
    const langCode = userLang.substring(0, 2); // Get the first two characters, e.g., "en"

    // Select all spans within the .coming-soon-text paragraph
    const texts = document.querySelectorAll(".coming-soon-text span");

    texts.forEach(span => {
        // Display the span if its lang attribute matches the detected language
        if (span.getAttribute("lang") === langCode) {
            span.style.display = "inline";
        }
    });

    // Fallback: if no matching language found, show English as default
    if (![...texts].some(span => span.style.display === "inline")) {
        document.querySelector(".coming-soon-text span[lang='en']").style.display = "inline";
    }

    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) {
        return;
    }

    const openingDate = new Date("2025-11-25T00:00:00").getTime();
    let intervalId;

    const updateCountdown = () => {
        const now = Date.now();
        const distance = openingDate - now;

        if (distance <= 0) {
            countdownElement.textContent = "We're open!";
            clearInterval(intervalId);
            return;
        }

        const dayInMs = 1000 * 60 * 60 * 24;
        const hourInMs = 1000 * 60 * 60;
        const minuteInMs = 1000 * 60;

        const days = Math.floor(distance / dayInMs);
        const hours = Math.floor((distance % dayInMs) / hourInMs);
        const minutes = Math.floor((distance % hourInMs) / minuteInMs);
        const seconds = Math.floor((distance % minuteInMs) / 1000);

        const pad = (value) => String(value).padStart(2, "0");

        countdownElement.textContent = `Opening in ${days} days ${pad(hours)} hours ${pad(minutes)} minutes ${pad(seconds)} seconds`;
    };

    intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();
});
