// Scroll progress + header state
  const progress = document.getElementById('progress');
  const header = document.getElementById('siteHeader');
  const floatBtn = document.getElementById('floatContact');
  const heroH = window.innerHeight;

  function onScroll(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    header.classList.toggle('scrolled', h.scrollTop > 10);
    floatBtn.classList.toggle('show', h.scrollTop > heroH * 0.8);
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Parallax orbs
  const orbs = document.querySelectorAll('.orb');
  function onParallax(){
    const y = window.scrollY;
    orbs.forEach(o => {
      const speed = parseFloat(o.dataset.speed || 0.2);
      o.style.transform = 'translateY(' + (y * speed) + 'px)';
    });
  }
  document.addEventListener('scroll', onParallax, { passive:true });
  onParallax();

  // Hero wordmark kinetic reveal
  (function(){
    const el = document.getElementById('wordmark');
    const text = "IDEA UNFOLD";
    el.innerHTML = '';
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      if (ch === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = ch;
        if (i >= 5) span.classList.add('grad-text');
      }
      span.style.animationDelay = (i * 0.045) + 's';
      el.appendChild(span);
    });
  })();

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => child.style.setProperty('--i', i));
  });

  // Animated counters
  const counters = document.querySelectorAll('.metric[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();
        function tick(now){
          const p = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const value = target * eased;
          el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIO.observe(el));

  // "Why Idea Unfold" pinned scroll story
  (function(){
    const container = document.getElementById('why');
    const panels = Array.from(document.querySelectorAll('.why-panel'));
    const dotsWrap = document.getElementById('whyDots');
    panels.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'why-dot';
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(document.querySelectorAll('.why-dot'));

    function update(){
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      let progress = -rect.top / total;
      progress = Math.max(0, Math.min(1, progress));
      const activeIndex = Math.min(panels.length - 1, Math.floor(progress * panels.length));
      panels.forEach((p, i) => p.classList.toggle('active', i === activeIndex));
      dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }
    document.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    update();
  })();

  // Cursor-reactive glow in hero (desktop only)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      document.querySelector('.orb-3').style.transform += '';
      document.querySelector('.orb-3').style.marginLeft = x + 'px';
      document.querySelector('.orb-3').style.marginTop = y + 'px';
    });
  }

// "Work With Me" — horizontal scroll-through process
(function () {

  function initHowWork() {

    const container = document.getElementById('howwork');
    const track = document.getElementById('howworkTrack');
    const steps = Array.from(document.querySelectorAll('.howwork-step'));
    const lineFill = document.getElementById('howworkLineFill');
    const dotsWrap = document.getElementById('howworkDots');

    if (!container || !track || !steps.length || !lineFill || !dotsWrap) {
      return;
    }

    /* Prevent duplicate dots if script runs more than once */
    dotsWrap.innerHTML = '';

    /* Create progress dots */
    steps.forEach((_, i) => {
      const dot = document.createElement('div');

      dot.className = 'hw-dot';
      dot.textContent = String(i + 1).padStart(2, '0');

      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll('.hw-dot'));

    let ticking = false;

    function updateHowWork() {

      if (window.innerWidth <= 760) {
        track.style.transform = 'none';
        lineFill.style.width = '0%';
        return;
      }

      const rect = container.getBoundingClientRect();

      /*
       * Total scroll distance of the pinned section
       */
      const totalScroll = container.offsetHeight - window.innerHeight;

      if (totalScroll <= 0) return;

      /*
       * Calculate scroll progress from 0 → 1
       */
      let progress = -rect.top / totalScroll;

      progress = Math.max(0, Math.min(1, progress));

      /*
       * Move exactly one viewport width per step.
       *
       * 5 steps:
       * 0%   = Step 01
       * 25%  = Step 02
       * 50%  = Step 03
       * 75%  = Step 04
       * 100% = Step 05
       */
      const maxSlide = steps.length - 1;

      const translateX = progress * maxSlide * 100;

      track.style.transform =
        `translate3d(-${translateX}vw, 0, 0)`;

      /*
       * Progress line
       */
      lineFill.style.width = `${progress * 100}%`;

      /*
       * Active dot
       */
      const activeIndex = Math.min(
        steps.length - 1,
        Math.round(progress * maxSlide)
      );

      dots.forEach((dot, index) => {
        dot.classList.toggle(
          'active',
          index === activeIndex
        );
      });

      ticking = false;
    }

    function requestUpdate() {

      if (!ticking) {
        window.requestAnimationFrame(updateHowWork);
        ticking = true;
      }

    }

    window.addEventListener(
      'scroll',
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      requestUpdate
    );

    updateHowWork();
  }


  /*
   * Make sure the HTML exists before initializing.
   */
  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initHowWork
    );

  } else {

    initHowWork();

  }

})();