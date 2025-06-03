document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 1. Reveal on Scroll
  // =========================
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
  revealOnScroll(); // Trigger once on load

  // =========================
  // 2. Carousel Drag (ID: 'vault')
  // =========================
  const carousel = document.getElementById('vault');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Adjust drag sensitivity
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

// =========================
// 3. Gallery Drag (container: '.gallery-container')
// =========================
  const track = document.getElementById('galleryTrack');
  const container = document.querySelector('.gallery-container');

  if (!track || !container) return;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  const setTransform = (x) => {
    track.style.transform = `translateX(${x}px)`;
  };

  const animation = () => {
    setTransform(currentTranslate);
    if (isDragging) requestAnimationFrame(animation);
  };

  const startDrag = (e) => {
    isDragging = true;
    container.classList.add('dragging');
    startX = e.pageX;
    animationID = requestAnimationFrame(animation);
  };

  const drag = (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    currentTranslate = prevTranslate + dx;
  };

  const endDrag = () => {
    isDragging = false;
    container.classList.remove('dragging');
    cancelAnimationFrame(animationID);
    prevTranslate = currentTranslate;
  };

  container.addEventListener('mousedown', startDrag);
  container.addEventListener('mousemove', drag);
  container.addEventListener('mouseup', endDrag);
  container.addEventListener('mouseleave', endDrag);

  // Prevent text selection on drag
  container.addEventListener('dragstart', (e) => e.preventDefault());
});

  // =========================
  // 3. Fade-out of flashes (ID: '.flash-message')
  // =========================
const flashes = document.querySelectorAll('.flash-message');
flashes.forEach(flash => {
    setTimeout(() => {
        flash.classList.add('fade-out');
    }, 2000); // 2 seconds timer
    setTimeout(() => {
        flash.remove();
    }, 3000); // wait for the fade to finish, then remove from DOM
});