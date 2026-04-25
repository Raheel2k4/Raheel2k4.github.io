// ============================================================
// PORTFOLIO MAIN JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initWaveCanvas();
  initNavScroll();
  initScrollReveal();
  renderAll();
  initContactForm();
});

// ============================================================
// THEME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('pf_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pf_theme', next);
    // re-draw waves with new colors
    cancelAnimationFrame(waveRAF);
    initWaveCanvas();
  });
}

// ============================================================
// WAVE CANVAS — organic animated gradient waves
// ============================================================
let waveRAF;
function initWaveCanvas() {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Read theme colors dynamically
  function getTheme() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      dark,
      bg:   dark ? '#09090f' : '#faf8ff',
      waves: dark
        ? [ 'rgba(194,0,90,0.18)',  'rgba(130,0,200,0.14)', 'rgba(220,20,80,0.09)',  'rgba(90,0,180,0.11)' ]
        : [ 'rgba(200,0,80,0.09)',  'rgba(120,0,200,0.07)', 'rgba(230,20,100,0.05)', 'rgba(90,0,180,0.06)' ]
    };
  }

  // Wave configs
  const WAVES = [
    { amp: 0.14, freq: 0.9,  speed: 0.00022, phase: 0,    yFrac: 0.30 },
    { amp: 0.11, freq: 0.7,  speed: 0.00015, phase: 2.1,  yFrac: 0.52 },
    { amp: 0.10, freq: 1.1,  speed: 0.00028, phase: 4.4,  yFrac: 0.70 },
    { amp: 0.08, freq: 0.55, speed: 0.00018, phase: 1.0,  yFrac: 0.88 },
  ];

  let t = 0;

  function draw(ts) {
    t = ts;
    const th = getTheme();
    ctx.clearRect(0, 0, W, H);

    // Draw each wave as a filled shape
    WAVES.forEach((w, i) => {
      const baseY = H * w.yFrac;
      const amplitude = H * w.amp;

      ctx.beginPath();
      ctx.moveTo(0, H);

      // Build wave points
      const pts = [];
      for (let x = 0; x <= W + 2; x += 2) {
        const nx = x / W;
        // Layered sinusoids for organic shape
        const y = baseY
          + Math.sin(nx * Math.PI * 2 * w.freq + t * w.speed) * amplitude
          + Math.sin(nx * Math.PI * 3 * w.freq * 0.7 + t * w.speed * 1.3 + w.phase) * amplitude * 0.4
          + Math.cos(nx * Math.PI * w.freq * 1.5 + t * w.speed * 0.8 + w.phase * 1.2) * amplitude * 0.25;
        pts.push({ x, y });
      }

      // Smooth curve through points
      ctx.moveTo(0, H + 10);
      pts.forEach((p, idx) => {
        if (idx === 0) { ctx.lineTo(p.x, p.y); return; }
        const prev = pts[idx - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, (prev.y + p.y) / 2);
      });
      ctx.lineTo(W, H + 10);
      ctx.closePath();

      // Gradient fill
      const grad = ctx.createLinearGradient(0, baseY - amplitude, W, baseY + amplitude);
      const c = th.waves[i % th.waves.length];
      grad.addColorStop(0, c);
      grad.addColorStop(0.5, c.replace(/[\d.]+\)$/, '0.05)'));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Radial glow orbs
    drawOrb(ctx, W * 0.15, H * 0.25, 320, th.dark ? 'rgba(194,0,90,0.10)' : 'rgba(200,0,80,0.05)');
    drawOrb(ctx, W * 0.80, H * 0.60, 400, th.dark ? 'rgba(130,0,200,0.08)' : 'rgba(120,0,200,0.04)');
    drawOrb(ctx, W * 0.50, H * 0.85, 280, th.dark ? 'rgba(200,20,80,0.06)' : 'rgba(200,0,80,0.03)');

    waveRAF = requestAnimationFrame(draw);
  }

  waveRAF = requestAnimationFrame(draw);
}

function drawOrb(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ============================================================
// NAV SCROLL
// ============================================================
function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('revealed'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  function observe() {
    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => io.observe(el));
  }
  observe();
  // Re-observe after dynamic content loads
  setTimeout(observe, 300);
}

// ============================================================
// RENDER ALL
// ============================================================
function renderAll() {
  const d = PORTFOLIO_DATA;

  // Personal
  document.getElementById('nav-initials').textContent = d.personal.initials || 'A.C';
  document.getElementById('nav-status').textContent = d.personal.status;
  document.getElementById('hero-name').textContent = d.personal.name;
  document.getElementById('hero-tagline').textContent = d.personal.tagline;
  document.getElementById('about-bio').textContent = d.personal.bio;
  document.getElementById('footer-name').textContent = `© ${new Date().getFullYear()} ${d.personal.name}`;

  // Stats
  document.getElementById('stat-exp').dataset.val     = d.personal.stats.experience;
  document.getElementById('stat-cves').dataset.val    = d.personal.stats.cves;
  document.getElementById('stat-ctf').dataset.val     = d.personal.stats.ctf;
  document.getElementById('stat-clients').dataset.val = d.personal.stats.clients;
  initStatsCounter();

  // Photo
  if (d.personal.photo) {
    const img = document.getElementById('about-photo');
    img.src = d.personal.photo; img.style.display = 'block';
    document.getElementById('photo-placeholder').style.display = 'none';
  }

  // Certs
  const certStack = document.getElementById('cert-stack');
  d.certifications.forEach(c => {
    const sp = document.createElement('span');
    sp.className = 'cert-pill'; sp.textContent = c;
    certStack.appendChild(sp);
  });

  renderSkills(d.skills);
  renderProjects(d.projects);
  renderBlog(d.posts);
  renderContact(d.contact);
}

// ---- Stats Counter ----
function initStatsCounter() {
  const els = ['stat-exp','stat-cves','stat-ctf','stat-clients'];
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    els.forEach(id => {
      const el = document.getElementById(id);
      const raw = el.dataset.val || '0';
      const suffix = raw.replace(/[\d]/g,'');
      const num = parseInt(raw);
      if (isNaN(num)) { el.textContent = raw; return; }
      let cur = 0; const step = Math.max(1, Math.ceil(num / 45));
      const t = setInterval(() => {
        cur = Math.min(cur + step, num);
        el.textContent = cur + suffix;
        if (cur >= num) clearInterval(t);
      }, 35);
    });
    io.disconnect();
  }, { threshold: 0.5 });
  const row = document.getElementById('stat-row');
  if (row) io.observe(row);
}

// ---- Skills ----
function renderSkills(skills) {
  const wrap = document.getElementById('skills-wrap');
  wrap.innerHTML = '';
  skills.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'skill-card';
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${i * 60}ms`;
    el.innerHTML = `
      <div class="skill-card-header">
        <span class="skill-icon">${s.icon}</span>
        <span class="skill-cat">${s.category}</span>
      </div>
      <div class="skill-pills">${s.tags.map(t => `<span class="skill-pill">${t}</span>`).join('')}</div>
    `;
    wrap.appendChild(el);
  });
}

// ---- Projects ----
function renderProjects(projects) {
  const mosaic = document.getElementById('projects-mosaic');
  const filters = document.getElementById('project-filters');
  mosaic.innerHTML = ''; filters.innerHTML = '';

  const cats = ['All', ...new Set(projects.map(p => p.category))];
  cats.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-pill' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.dataset.f = cat === 'All' ? 'all' : cat;
    btn.onclick = () => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.project-card').forEach(c => {
        c.style.display = (btn.dataset.f === 'all' || c.dataset.cat === btn.dataset.f) ? 'flex' : 'none';
      });
    };
    filters.appendChild(btn);
  });

  projects.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'project-card';
    el.setAttribute('data-reveal', '');
    el.dataset.cat = p.category;
    el.style.transitionDelay = `${i * 80}ms`;
    const thumb = p.image
      ? `<img src="${p.image}" alt="${p.title}">`
      : `<div class="project-thumb-label">${p.category}</div>`;
    const links = [];
    if (p.links.github) links.push(`<a href="${p.links.github}" class="proj-link" target="_blank">GitHub</a>`);
    if (p.links.demo)   links.push(`<a href="${p.links.demo}"   class="proj-link" target="_blank">Read More</a>`);
    el.innerHTML = `
      <div class="project-thumb">${thumb}</div>
      <div class="project-body">
        <div class="project-cat">${p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-foot">${links.join('')}</div>
      </div>
    `;
    mosaic.appendChild(el);
  });
}

// ---- Blog ----
function renderBlog(posts) {
  const river = document.getElementById('blog-river');
  river.innerHTML = '';
  posts.forEach((p, i) => {
    const d = new Date(p.date);
    const day = d.getDate().toString().padStart(2,'0');
    const mon = d.toLocaleString('en', {month:'short'}).toUpperCase();
    const yr  = d.getFullYear();
    const el = document.createElement('div');
    el.className = 'blog-entry';
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${i * 70}ms`;
    el.innerHTML = `
      <div class="blog-date"><strong>${day}</strong>${mon} ${yr}</div>
      <div class="blog-main">
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="blog-tags">${p.tags.map(t=>`<span class="blog-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="blog-arrow">→</div>
    `;
    el.onclick = () => { if (p.url !== '#') window.open(p.url, '_blank'); };
    river.appendChild(el);
  });
}

// ---- Contact ----
function renderContact(contact) {
  document.getElementById('contact-intro').textContent = contact.intro;
  const sl = document.getElementById('social-links');
  sl.innerHTML = '';
  contact.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.className = 'social-link';
    a.innerHTML = `<span class="social-icon">${l.icon}</span><span>${l.label}</span>`;
    sl.appendChild(a);
  });
}

// ---- Contact Form ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg,#00cc66,#009955)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
  });
}
