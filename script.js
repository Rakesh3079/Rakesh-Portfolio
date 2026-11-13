
const roles = [
    "Electrical Engineer",
    "Embedded Systems Enthusiast",
    "IoT Developer",
    "Industrial Automation Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const element = document.getElementById("typing-text");

    if (!element) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        element.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        element.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();
// DARK AND LIGHT THEME

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "🌙 Dark Mode";
    } else {
        themeButton.textContent = "☀️ Light Mode";
    }

});
// MOBILE NAVIGATION

const menuButton = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".navbar ul");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});

// Close menu after clicking a link

document.querySelectorAll(".navbar ul a").forEach(link => {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });
});

/* SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
    "section:not(.hero), .skill-card, .project-card, .education-card, .contact-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});
