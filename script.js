
/* =====================================================
   RAKESH SAMBU — PORTFOLIO JAVASCRIPT
   Controls typing effect, theme, mobile menu and
   scroll-reveal animations.
   ===================================================== */


/* =====================================================
   SECTION 1 — HERO TYPING ANIMATION
   Automatically displays different professional roles
   one character at a time.
   ===================================================== */

// List of professional roles displayed in the hero section
const roles = [
    "Electrical Engineer",
    "Embedded Systems Enthusiast",
    "IoT Developer",
    "Industrial Automation Enthusiast"
];

// Variables used to control the typing animation
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

// Function that creates the typing and deleting effect
function typeEffect() {

    const element = document.getElementById("typing-text");

    // Stop if the typing element does not exist
    if (!element) return;

    const currentRole = roles[roleIndex];

    // TYPE: Add one character at a time
    if (!deleting) {

        element.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        // Pause after completing the current role
        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        // DELETE: Remove one character at a time
        element.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        // Move to the next role after deleting the current one
        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    // Control typing and deleting speed
    setTimeout(typeEffect, deleting ? 50 : 100);
}

// Start the typing animation
typeEffect();



/* =====================================================
   SECTION 2 — DARK AND LIGHT MODE
   Remembers the visitor's theme preference using
   browser localStorage.
   ===================================================== */

// Get the theme toggle button
const themeButton = document.getElementById("theme-toggle");

// Apply the selected theme to the website
function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");
        themeButton.textContent = "🌙 Dark Mode";

    } else {

        document.body.classList.remove("light-mode");
        themeButton.textContent = "☀️ Light Mode";

    }

}

// Read the previously saved theme from the browser
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme, or use dark mode by default
if (themeButton) {
    applyTheme(savedTheme || "dark");

    // Change and save the theme when the button is clicked
    themeButton.addEventListener("click", function () {

        const isLightMode =
            document.body.classList.contains("light-mode");

        // Choose the opposite of the current theme
        const newTheme = isLightMode ? "dark" : "light";

        // Apply the new theme
        applyTheme(newTheme);

        // Remember the visitor's choice
        localStorage.setItem("theme", newTheme);

    });
}



/* =====================================================
   SECTION 3 — MOBILE NAVIGATION
   Opens and closes the hamburger menu on smaller screens.
   Also closes the menu after a navigation link is selected.
   ===================================================== */

// Get the hamburger button and navigation menu
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".navbar ul");

// Open or close the mobile navigation menu
if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        // Toggle the active class to show or hide the menu
        navMenu.classList.toggle("active");

    });

    // Close the menu after clicking any navigation link
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });

    });

}


/* =====================================================
   SECTION 4 — SCROLL REVEAL ANIMATION
   Makes sections and cards appear smoothly as visitors
   scroll down the portfolio.
   ===================================================== */

// Select the sections and cards that should animate
const revealElements = document.querySelectorAll(
    "section:not(.hero), " +
    ".skill-card, " +
    ".project-card, " +
    ".education-card, " +
    ".contact-card"
);

// Add the reveal class to prepare elements for animation
revealElements.forEach(element => {
    element.classList.add("reveal");
});

// Check whether the browser supports IntersectionObserver
if ("IntersectionObserver" in window) {

    // Create an observer to detect elements entering the screen
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            // Animate the element when it becomes visible
            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                // Stop observing after the animation happens once
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    // Start observing each selected element
    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    // Fallback: show all elements if the browser lacks support
    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


/* =====================================================
   END OF PORTFOLIO JAVASCRIPT
   ===================================================== */
