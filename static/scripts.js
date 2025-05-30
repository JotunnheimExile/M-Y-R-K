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
//document.addEventListener("DOMContentLoaded", function() {
//    const carousel = document.querySelector(".vault-carousel");
//    const cards = document.querySelectorAll(".vault-card");
//    const total = cards.length;
//    const angle = 360 / total;
//    let currentRotation = 0;

    // Position cards in a 3D circle
//    cards.forEach((card, i) => {
//        const rotation = i * angle;
//        card.style.transform = `rotateY(${rotation}deg) translateZ(400px)`;
//    });

    // Rotate carousel on click
//    carousel.addEventListener("click", () => {
//        currentRotation += angle % 360;
//        carousel.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
//    });
//});

// Front-back flip functionality
//function flip(button) {
//    const card = button.closest('.vault-card');
//    card.querySelector('.flip-inner').classList.toggle('flipped');
//}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".vault-card");
  const visibleCount = 5;
  let currentIndex = 0;

  function updateCarousel() {
    const angleStep = 30; // degrees between items
    const radius = 400;   // Z-distance

    cards.forEach((card, i) => {
      const offset = i - currentIndex;

      if (Math.abs(offset) > Math.floor(visibleCount / 2)) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
      } else {
        const angle = offset * angleStep;
        const x = offset * 150;
        card.style.transform = `translateX(${x}px) rotateY(${angle}deg) translateZ(${radius - Math.abs(offset) * 80}px)`;
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      }
    });
  }

  document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  updateCarousel(); // Initial render
});

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
