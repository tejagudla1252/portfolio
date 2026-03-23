/* =====================================================
   TEJAMANIKANTA GUDLA — script.js (Enhanced)
   ===================================================== */

/* ----- SKILL DATA ----- */
const skillData = {
  langs: {
    bars: [
      { name: 'Python', pct: 95 },
      { name: 'SQL', pct: 92 },
      { name: 'PySpark', pct: 82 },
      { name: 'R', pct: 65 },
    ],
  },
  de: {
    bars: [
      { name: 'Apache Airflow', pct: 88 },
      { name: 'Databricks / Delta Lake', pct: 85 },
      { name: 'Azure Data Factory', pct: 87 },
      { name: 'dbt', pct: 78 },
      { name: 'ETL / ELT Design', pct: 92 },
    ],
  },
  cloud: {
    pills: {
      items: ['Azure ADF', 'Azure Synapse', 'ADLS Gen2', 'Snowflake', 'AWS S3', 'AWS Glue', 'AWS Athena', 'Azure DevOps'],
      color: 'pill-cyan',
    },
    bars: [
      { name: 'Azure (ADF + Synapse)', pct: 88 },
      { name: 'Snowflake', pct: 82 },
      { name: 'AWS (S3, Glue, Athena)', pct: 75 },
    ],
  },
  ml: {
    bars: [
      { name: 'Scikit-learn', pct: 90 },
      { name: 'TensorFlow / PyTorch', pct: 78 },
      { name: 'XGBoost / Random Forest', pct: 88 },
      { name: 'Time-Series (ARIMA/Prophet)', pct: 80 },
      { name: 'MLflow / Experiment Tracking', pct: 72 },
    ],
  },
  genai: {
    bars: [
      { name: 'OpenAI API / Prompt Eng.', pct: 88 },
      { name: 'HuggingFace Transformers', pct: 75 },
      { name: 'TF-IDF / NLP Pipelines', pct: 80 },
      { name: 'LLM Integration', pct: 82 },
    ],
  },
  bi: {
    bars: [
      { name: 'Power BI (DAX + AI Insights)', pct: 90 },
      { name: 'Tableau', pct: 85 },
    ],
  },
  devops: {
    pills: {
      items: ['Git / GitHub Actions', 'Azure DevOps', 'CI/CD Pipelines', 'pytest', 'Linux / Bash', 'Docker'],
      color: 'pill-cyan',
    },
    bars: [
      { name: 'Git / GitHub Actions', pct: 88 },
      { name: 'Azure DevOps', pct: 85 },
      { name: 'pytest / Unit Testing', pct: 78 },
    ],
  },
  foundry: {
    pills: {
      items: ['Pipeline Builder', 'Code Repository', 'Slate Apps', 'Workshop', 'Contour', 'Quiver'],
      color: 'pill-purple',
    },
    bars: [
      { name: 'Pipeline / Transform Builds', pct: 90 },
      { name: 'Slate Application Dev', pct: 85 },
      { name: 'Contour / Quiver Analytics', pct: 78 },
    ],
  },
};

/* ----- RENDER SKILL PANEL ----- */
function renderSkillPanel(key) {
  const data = skillData[key];
  if (!data) return;
  const panel = document.getElementById('skillPanel');
  let html = '<div class="skill-bars">';
  (data.bars || []).forEach(b => {
    html += `
      <div class="skill-bar-item">
        <div class="skill-bar-meta">
          <span class="skill-bar-name">${b.name}</span>
          <span class="skill-bar-pct">${b.pct}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-pct="${b.pct}"></div>
        </div>
      </div>`;
  });
  html += '</div>';

  if (data.pills) {
    html += `<div class="skill-pills-panel" style="margin-top:1.5rem">`;
    data.pills.items.forEach(p => {
      html += `<span class="pill ${data.pills.color}">${p}</span>`;
    });
    html += '</div>';
  }

  panel.innerHTML = html;

  /* Animate bars after a brief delay */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.querySelectorAll('.skill-bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.pct + '%';
      });
    });
  });
}

/* ----- SKILL TABS ----- */
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  let active = 'langs';
  renderSkillPanel(active);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      active = tab.dataset.tab;
      renderSkillPanel(active);
    });
  });
}

/* ----- HERO CANVAS — animated particle network ----- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 60;
  const MAX_DIST = 140;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.55;
    this.vy = (Math.random() - 0.5) * 0.55;
    this.r  = Math.random() * 2.5 + 1;
    const hues = [255, 215, 170];
    this.hue = hues[Math.floor(Math.random() * hues.length)];
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  const colors = [
    'rgba(91,75,219,',
    'rgba(14,165,233,',
    'rgba(16,185,129,',
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = 1 - d / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(91,75,219,${alpha * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse proximity line
      const mdx = particles[i].x - mouse.x;
      const mdy = particles[i].y - mouse.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 160) {
        const alpha = 1 - md / 160;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(91,75,219,${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(91,75,219,0.5)`;
      ctx.fill();
      p.update();
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  });

  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  resize();
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  loop();
}

/* ----- HERO ROLE ROTATOR ----- */
function initRoleRotator() {
  const roles = ['Data Scientist', 'ML Engineer', 'Palantir Foundry Specialist', 'AI Developer', 'Data Engineer'];
  const el = document.getElementById('role-display');
  if (!el) return;
  let idx = 0;
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      el.textContent = roles[idx];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 320);
  }, 2800);
}

/* ----- NAVBAR ----- */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Active link
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  toggle?.addEventListener('click', () => links.classList.toggle('open'));

  // Close on link click (mobile)
  navAnchors.forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ----- ANIMATED COUNTERS ----- */
function animateCounter(el, targetStr, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const target   = parseFloat(targetStr);
  const isDecimal = targetStr.includes('.');
  const decimalPlaces = isDecimal ? (targetStr.split('.')[1] || '').length : 0;
  const isM = suffix.includes('M');

  const update = (now) => {
    const pct   = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - pct, 3);
    const val   = target * eased;
    if (isDecimal) {
      el.textContent = val.toFixed(decimalPlaces);
    } else if (isM) {
      el.textContent = Math.round(val);
    } else {
      el.textContent = Math.round(val);
    }
    if (pct < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ----- SCROLL REVEAL ----- */
function initScrollReveal() {
  /* Stat cards — counter trigger */
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl   = entry.target.querySelector('.stat-number');
      const text    = numEl.textContent;
      const match   = text.match(/^([\d.]+)/);
      const spanEl  = numEl.querySelector('span');
      const suffix  = spanEl ? spanEl.textContent : '';
      if (match) {
        const rawNum = match[1]; // e.g. "3.91" or "10" or "40"
        numEl.textContent = '';
        if (spanEl) { numEl.appendChild(document.createTextNode('')); }
        const valEl = document.createElement('span');
        valEl.className = 'counter-num';
        numEl.appendChild(valEl);
        animateCounter(valEl, rawNum, suffix.includes('M') ? 'M' : '');
        const sfx = document.createElement('span');
        sfx.textContent = suffix;
        numEl.appendChild(sfx);
      }
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-card').forEach(c => statObserver.observe(c));

  /* Fade-up for section elements */
  const fadeEls = document.querySelectorAll(
    '.timeline-item, .project-card, .edu-card, .contact-card, .about-text, .about-stats'
  );
  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => revealObserver.observe(el));

  /* Skills panel — animate bars when section scrolls in */
  const skillsSection = document.getElementById('skills');
  const skillsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.pct + '%';
      });
      skillsObserver.disconnect();
    }
  }, { threshold: 0.2 });
  if (skillsSection) skillsObserver.observe(skillsSection);
}

/* ----- SMOOTH SCROLL ----- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ----- CURSOR GLOW ----- */
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:320px; height:320px;
    background: radial-gradient(circle, rgba(91,75,219,0.07) 0%, transparent 65%);
    border-radius:50%; transform: translate(-50%,-50%);
    transition: left 0.15s ease, top 0.15s ease;
    top:-200px; left:-200px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ----- PROJECT CARD TILT ----- */
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const rx     = (e.clientY - cy) / (rect.height / 2) * 5;
      const ry     = (e.clientX - cx) / (rect.width  / 2) * -5;
      card.style.transform = `translateY(-8px) scale(1.01) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.25s cubic-bezier(0.4,0,0.2,1)';
    });
  });
}

/* ----- PARALLAX SCROLL ----- */
function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.5) {
      heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  }, { passive: true });
}

/* ----- TYPING ANIMATION ----- */
function initTypingAnimation() {
  const summary = document.querySelector('.hero-summary');
  if (!summary) return;
  const fullText = summary.textContent;
  let index = 0;
  summary.textContent = '';
  summary.style.minHeight = '60px';
  
  function typeChar() {
    if (index < fullText.length) {
      summary.textContent += fullText[index];
      index++;
      setTimeout(typeChar, 15);
    }
  }
  
  // Start after a brief delay
  setTimeout(typeChar, 500);
}

/* ----- BACK-TO-TOP BUTTON ----- */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.id = 'backToTop';
  btn.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:999;
    width:48px; height:48px; border-radius:50%;
    background: linear-gradient(135deg, #a855f7, #6366f1);
    border:none; cursor:pointer; color:#fff; font-size:24px;
    opacity:0; visibility:hidden; transition: all 0.3s ease;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
  `;
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.1)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
}

/* ----- BUTTON RIPPLE EFFECT ----- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background: rgba(255,255,255,0.6); pointer-events:none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        left:${x}px; top:${y}px; width:20px; height:20px;
        margin-left:-10px; margin-top:-10px;
      `;
      
      if (!this.style.position || this.style.position === 'static') {
        this.style.position = 'relative';
      }
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple keyframes if not already in CSS
  if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
      @keyframes rippleEffect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ----- STAGGER ANIMATIONS ----- */
function initStaggerAnimation() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('[data-stagger]').forEach((el, i) => {
      if (!el.style.transitionDelay) {
        el.style.transition = 'all 0.5s ease';
        el.style.transitionDelay = `${i * 0.05}s`;
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ----- BOOT ----- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCanvas();
  initRoleRotator();
  initSkillTabs();
  initScrollReveal();
  initSmoothScroll();
  initCursorGlow();
  initCardTilt();
  initParallax();
  initTypingAnimation();
  initBackToTop();
  initButtonRipple();
  initStaggerAnimation();
});
