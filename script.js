document.addEventListener('DOMContentLoaded', function(){
  // Navbar: transparent -> solid on scroll
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if(window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Counters: animate when section is visible
  const counters = document.querySelectorAll('.number');
  if(counters.length){
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const duration = 1400;
        let startTime = null;

        function step(timestamp){
          if(!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + (progress === 1 ? '+' : '');
          if(progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, {threshold: 0.5});

    counters.forEach(c => observer.observe(c));
  }
});
