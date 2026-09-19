/* ============================================================
   CASE STUDY DATA
   ------------------------------------------------------------
   HOW TO ADD A NEW CASE STUDY:
   1. Copy one full object below (from the opening { to closing },)
   2. Paste it into the caseStudies array as a new entry
   3. Change every value to match the new project
   4. Save — the list page and detail page render automatically,
      no other code needs to change.

   Fields:
   - id: short URL-safe slug, unique, no spaces (e.g. "seanz-cruise")
   - tag: industry / category shown as a small label
   - title: card + page heading
   - summary: 1-2 sentence description for the list card
   - role: your role on the project
   - period: how long the engagement/measurement ran
   - heroMetric: { value, label } — the single headline number on the list card
   - before: array of { num, lbl } — the starting-point stats grid
   - approach: array of { step, title, desc } — funnel/process steps (any number, 4 looks best)
   - results: array of { count, suffix, label } — animated result counters
       - count must be a plain number (e.g. 4500, 18.95). suffix is a string appended after ("+", "L", "K", "")
   - media: array of { alt, note } — image placeholder slots for screenshots you'll add later
   - responsibilities: array of strings — optional bullet list of what you did (omit field to skip section)
   ============================================================ */

  const caseStudies = [
    {
      id: 'seanz-cruise',
      tag: 'Luxury Cruise & Events',
      title: 'Seanz Cruise: From 400 followers to a booking engine',
      summary: 'Turning a small Instagram presence into an integrated lead generation and online booking system.',
      role: 'Digital Marketing Executive & IT Head',
      period: '6-month measurement period',
      heroMetric: { value: '₹18.95L', label: 'online booking revenue' },
      before: [
        { num: '400+', lbl: 'Instagram followers' },
        { num: 'Poor', lbl: 'lead quality & relevance' },
        { num: 'High', lbl: 'bounce rate on enquiries' },
        { num: '₹40,000', lbl: 'monthly spend, underperforming' }
      ],
      approach: [
        { step: '01', title: 'Awareness', desc: 'Meta & Google Ads, content and influencer collaboration to grow reach.' },
        { step: '02', title: 'Lead Generation', desc: 'Targeted lead campaigns replacing broad, low-intent enquiries.' },
        { step: '03', title: 'Nurture', desc: 'WhatsApp broadcasting and a chatbot to keep enquiries warm.' },
        { step: '04', title: 'Booking', desc: 'Res Avenue booking engine integrated for direct online transactions.' }
      ],
      results: [
        { count: 4500, suffix: '+', label: 'Instagram followers, up from 400+' },
        { count: 220, suffix: '', label: 'Quality weekend cruise leads / week (150–220)' },
        { count: 20, suffix: '', label: 'Corporate event enquiries / month (10–20)' },
        { count: 18.95, suffix: 'L', label: 'Online booking revenue (₹)' },
        { count: 479, suffix: '', label: 'Online transactions, 6-month period' },
        { count: 25, suffix: 'K', label: 'Monthly spend, post-optimisation (₹)' }
      ],
      media: [
        { src: 'assets/images/meta dashboard.jpg', alt: 'Placeholder — add a screenshot of the Meta Ads Manager dashboard for Seanz Cruise showing campaign reach, CTR, and cost-per-lead over the 6-month period', note: '// add: Meta Ads dashboard screenshot' },
        { src: 'assets/images/Resevenue.jpg', alt: 'Placeholder — add a screenshot or chart of Instagram analytics for Seanz Cruise showing follower growth from 400 to 4,500+', note: '// add: Results from booking engine' }
      ],
      responsibilities: [
        'Meta advertising', 'Google advertising', 'Influencer collaboration', 'WhatsApp broadcasting',
        'Audience targeting', 'Marketing automation', 'Lead generation', 'Chatbot implementation',
        'Social media content planning', 'Online booking system integration', 'Copywriting', 'Digital customer journey improvements'
      ]
    }

    // Add your next case study object here, following the same shape.
  ];

  /* ============================================================
     RENDERING — you shouldn't need to touch anything below this
     line when adding a new case study.
     ============================================================ */

 const placeholderSvg = 'assets/images/placeholder.svg';

function renderList() {
  const grid = document.getElementById('caseGrid');

  if (!grid) return;

  grid.innerHTML = caseStudies.map(cs => `
    <div class="case-card" onclick="location.hash = '#/${cs.id}'">
      <div class="tag mono">${cs.tag}</div>
      <h3>${cs.title}</h3>
      <p class="summary">${cs.summary}</p>
      <div class="metric">${cs.heroMetric.value}</div>
      <div class="metric-lbl">${cs.heroMetric.label}</div>
      <div class="cta">
        Read the full case study
        <span class="arrow">→</span>
      </div>
    </div>
  `).join('');

  // Initialize reveal animations for the list
  initReveal();
}


function renderDetail(cs) {
  const el = document.getElementById('detailContent');

  if (!el || !cs) return;

  el.innerHTML = `
    <a href="#" class="back-link" onclick="showList(); return false;">
      ← All case studies
    </a>

    <div class="detail-tag mono reveal">
      ${cs.tag}
    </div>

    <h2 class="detail-title reveal">
      ${cs.title}
    </h2>

    <p class="detail-summary reveal">
      ${cs.summary}
    </p>

    <div class="detail-meta reveal">
      <div>
        <div class="m-lbl mono">ROLE</div>
        <div class="m-val">${cs.role}</div>
      </div>

      <div>
        <div class="m-lbl mono">PERIOD</div>
        <div class="m-val">${cs.period}</div>
      </div>
    </div>

    <div class="before-panel reveal">
      <div class="ptag mono">The starting point</div>

      <div class="before-grid">
        ${cs.before.map(b => `
          <div class="before-item">
            <div class="num">${b.num}</div>
            <div class="lbl">${b.lbl}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="funnel reveal stagger">
      ${cs.approach.map((a, i) => `
        <div class="funnel-step" style="--i:${i}">
          <div class="step-num mono">${a.step}</div>
          <h4>${a.title}</h4>
          <p>${a.desc}</p>
        </div>
      `).join('')}
    </div>

    <div class="results-grid reveal stagger">
      ${cs.results.map((r, i) => `
        <div class="result-card" style="--i:${i}">
          <div
            class="metric"
            data-count="${r.count}"
            data-suffix="${r.suffix || ''}"
          >0</div>

          <div class="lbl">${r.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="case-media reveal stagger">
      ${cs.media.map((m, i) => `
        <div class="media-slot" style="--i:${i}">
          <img
            src="${m.src}"
            alt="${m.alt}"
            loading="lazy"
          >

          <div class="placeholder-label">
            ${m.note}
          </div>
        </div>
      `).join('')}
    </div>

    ${
      cs.responsibilities
        ? `
          <div class="role-list reveal">
            <h4>Full scope of work</h4>

            <ul>
              ${cs.responsibilities.map(r => `
                <li>${r}</li>
              `).join('')}
            </ul>
          </div>
        `
        : ''
    }

    <div class="detail-contact-banner reveal">
      <h3>Want results like this for your business?</h3>

      <a
        href="index.html#contact"
        class="btn-glow"
      >
        Start a project
      </a>
    </div>
  `;
}


function showList(updateHash = true) {
  const listView = document.getElementById('listView');
  const detailView = document.getElementById('detailView');

  if (!listView || !detailView) return;

  // Show list
  listView.style.display = '';

  // Hide detail
  detailView.style.display = 'none';

  // Clear hash without triggering another hashchange event
  if (updateHash && location.hash) {
    history.replaceState(
      null,
      '',
      location.pathname + location.search
    );
  }

  window.scrollTo(0, 0);

  // Re-enable list reveal animations
  initReveal();
}


function showDetail(id) {
  const listView = document.getElementById('listView');
  const detailView = document.getElementById('detailView');

  if (!listView || !detailView) return;

  const cs = caseStudies.find(c => c.id === id);

  // Invalid case-study ID
  if (!cs) {
    console.warn('Case study not found:', id);
    showList(false);
    return;
  }

  // IMPORTANT:
  // 1. Generate the content
  renderDetail(cs);

  // 2. Hide list
  listView.style.display = 'none';

  // 3. SHOW detail BEFORE starting IntersectionObserver
  detailView.style.display = 'block';

  // 4. Now initialize animations/counters
  //    The elements are visible to IntersectionObserver at this point.
  initReveal();
  initCounters();

  window.scrollTo(0, 0);
}


function route() {
  // Convert:
  // #/seanz-cruise
  //
  // into:
  // seanz-cruise

  const hash = decodeURIComponent(
    location.hash.replace(/^#\/?/, '')
  );

  if (hash) {
    showDetail(hash);
  } else {
    showList(false);
  }
}


function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');

  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  els.forEach(el => {
    io.observe(el);
  });

  // Handle staggered elements
  document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });
}


function initCounters() {
  const counters = document.querySelectorAll(
    '.metric[data-count]:not(.counted)'
  );

  if (!counters.length) return;

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const elC = entry.target;

        // Prevent the same counter from being initialized twice
        elC.classList.add('counted');

        const target = parseFloat(elC.dataset.count);
        const suffix = elC.dataset.suffix || '';

        if (isNaN(target)) {
          elC.textContent = '0' + suffix;
          observer.unobserve(elC);
          return;
        }

        const isDecimal = target % 1 !== 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min(
            (now - start) / duration,
            1
          );

          // Ease-out cubic
          const eased =
            1 - Math.pow(1 - progress, 3);

          const value = isDecimal
            ? (target * eased).toFixed(2)
            : Math.round(target * eased);

          elC.textContent = value + suffix;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            // Guarantee exact final value
            elC.textContent =
              (isDecimal
                ? target.toFixed(2)
                : Math.round(target)
              ) + suffix;
          }
        }

        requestAnimationFrame(tick);

        observer.unobserve(elC);
      });
    },
    {
      threshold: 0.4
    }
  );

  counters.forEach(el => {
    io.observe(el);
  });
}


/* =========================================================
   INIT
   ========================================================= */

renderList();

window.addEventListener('hashchange', route);

// Handle direct URLs such as:
// case-studies.html#/seanz-cruise
route();


/* =========================================================
   SCROLL PROGRESS + HEADER + FLOATING CONTACT
   ========================================================= */

const progress = document.getElementById('progress');
const header = document.getElementById('siteHeader');
const floatBtn = document.getElementById('floatContact');


function onScroll() {
  const h = document.documentElement;

  const scrollHeight =
    h.scrollHeight - h.clientHeight;

  const scrolled =
    scrollHeight > 0
      ? (h.scrollTop / scrollHeight) * 100
      : 0;

  if (progress) {
    progress.style.width = scrolled + '%';
  }

  if (header) {
    header.classList.toggle(
      'scrolled',
      h.scrollTop > 10
    );
  }

  if (floatBtn) {
    floatBtn.classList.toggle(
      'show',
      h.scrollTop > 300
    );
  }
}


document.addEventListener(
  'scroll',
  onScroll,
  { passive: true }
);

onScroll();