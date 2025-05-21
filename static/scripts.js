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

// Primitive slides
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.vault-card');
    let currentIndex = 0;

    function rotateVault(index) {
        const angle = 360 / cards.length;
        cards.forEach((card, i) => {
            const offset = (i - index + cards.length) % cards.length;
            card.style.transform = `rotateY(${offset * angle}deg) translateZ(600px)`;
            card.style.opacity = offset === 0 ? 1 : 0.5;
            card.style.zIndex = offset === 0 ? 1 : 0.5;
        });
    }

    rotateVault(currentIndex);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        rotateVault(currentIndex);
    }, 6000);
});

function flip(button) {
    const card = button.closest('.vault-card');
    card.querySelector('.flip-inner').classList.toggle('flipped');
}

// Front-back flip functionality
// function flip(button) {
//     const card = button.closest('.flip-card');
//     card.classList.toggle('flipped');
// }

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
