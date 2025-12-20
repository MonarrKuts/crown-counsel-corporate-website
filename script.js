/* =========================================================
   MAIN FRONTEND INTERACTIONS
   ---------------------------------------------------------
   Handles:
   - Navbar scroll state
   - Animated statistic counters
   - Mobile navigation toggle
   
   No external libraries required.
   Written for clarity, performance, and easy modification.
   ========================================================= */

// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  /* =======================================================
     NAVBAR SCROLL BEHAVIOR
     -------------------------------------------------------
     Switches navbar from transparent to solid
     once the user scrolls past a threshold.
     ======================================================= */

  const nav = document.getElementById('siteNav');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  // Run once on load (useful for refresh mid-scroll)
  handleScroll();

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);


  /* =======================================================
     ANIMATED COUNTERS (SOCIAL PROOF)
     -------------------------------------------------------
     Counts up numbers when they enter the viewport.
     Uses IntersectionObserver for performance.
     ======================================================= */

  const counters = document.querySelectorAll('.number');

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const targetValue = parseInt(element.dataset.target, 10) || 0;
          const duration = 1400; // Animation duration in ms
          let startTime = null;

          // Animation loop
          const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * targetValue);

            element.textContent =
              currentValue + (progress === 1 ? '+' : '');

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };

          requestAnimationFrame(animateCount);

          // Stop observing once animation is complete
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.5 // Trigger when 50% visible
      }
    );

    counters.forEach(counter => counterObserver.observe(counter));
  }


  /* =======================================================
     MOBILE NAVIGATION TOGGLE
     -------------------------------------------------------
     Controls hamburger menu open/close state.
     ======================================================= */

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });


  /* =======================================================
     CLOSE MOBILE MENU ON LINK CLICK
     -------------------------------------------------------
     Improves UX on small screens.
     ======================================================= */

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

});
