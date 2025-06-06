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
  const track = document.getElementById('galleryTrack');
  const container = document.querySelector('.gallery-container');

  if (!track || !container) return;

  // Clone items for looping illusion
  const items = Array.from(track.children);
  const itemWidth = items[0].offsetWidth + 32; // adjust for margin

  // Clone head and tail
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    track.insertBefore(clone, track.firstChild);
  });

  // Calculate total width
  const originalItemCount = items.length;
  const totalItems = track.children.length;
  const totalWidth = itemWidth * totalItems;

  // Initial offset to center on original items
  let currentX = -itemWidth * originalItemCount;
  track.style.transform = `translateX(${currentX}px)`;

  // Dragging
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;
  let rafID = null;

  container.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    lastX = startX;
    cancelAnimationFrame(rafID);
    container.classList.add('dragging');

  // Prevent text/image dragging
  e.preventDefault();
  });

  container.addEventListener('mousemove', e => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    currentX += dx;
    lastX = e.clientX;

    track.style.transition = 'none';
    track.style.transform = `translateX(${currentX}px)`;

    // Loop if we drag too far left or right
    const minX = -itemWidth * totalItems + container.offsetWidth;
    const maxX = 0;

    if (currentX > -itemWidth * originalItemCount + itemWidth) {
      currentX = -itemWidth * originalItemCount;
      track.style.transform = `translateX(${currentX}px)`;
    } else if (currentX < -itemWidth * (originalItemCount * 2)) {
      currentX = -itemWidth * originalItemCount;
      track.style.transform = `translateX(${currentX}px)`;
    }
  });

  ['mouseup', 'mouseleave'].forEach(event => {
    container.addEventListener(event, () => {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('dragging');

      // Optional: Snap or apply velocity easing if needed
    });
  });

  // Disable text/image drag
  track.addEventListener('dragstart', e => e.preventDefault());
  container.addEventListener('dragstart', e => e.preventDefault());

  // =========================
  // 3. Fade-out of flashes (ID: '.flash-message')
  // =========================
  //setTimeout(() => {
//    console.log("Looking for flash messages...");
//    const flashes = document.querySelectorAll(".flash-message");
//    console.log("Found:", flashes.length);

//    flashes.forEach(flash => {
//      flash.classList.add("flash-in");
//      flash.addEventListener("animationend", () => {
//        setTimeout(() => {
//          flash.classList.remove("flash-in");
//          flash.classList.add("flash-out");
//          flash.addEventListener("animationend", () => {
//            flash.remove();
//          }, { once: true });
//        }, 1500);
//      }, { once: true });
//    });
//  }, 100); // short delay to let template load completely
});