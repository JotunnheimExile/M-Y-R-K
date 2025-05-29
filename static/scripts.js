// Reveal on scroll
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const boxTop = reveal.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
});

// Vault Carousel
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".vault-carousel");
    const cards = document.querySelectorAll('.vault-card');
    const total = cards.length;
    const angle = 360 / total;
    let currentRotation = 0;

    // Position cards in a 3D circle
    cards.forEach((card, i) => {
        const rotation = i * angle;
        card.style.transform = `rotateY(${rotation}deg) translateZ(600px)`;
    });

    // Rotate carousel on click
    carousel.addEventListener("click", () => {
        currentRotation -= angle;
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    });
});

// Front-back flip functionality
function flip(button) {
    const card = button.closest('.vault-card');
    card.querySelector('.flip-inner').classList.toggle('flipped');
}

// Fade-out of info flashes
document.addEventListener('DOMContentLoaded', () => {
    const flashes = document.querySelectorAll('.flash-message');
    flashes.forEach(flash => {
        setTimeout(() => {
            flash.classList.add('fade-out');
        }, 2000); // 2 seconds timer
        setTimeout(() => {
            flash.remove();
        }, 3000); // wait for the fade to finish, then remove from DOM
    });
});
