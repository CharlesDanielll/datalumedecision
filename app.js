/**
 * DATALUME DECISION - Interactive JavaScript Engine (Brand Edition)
 * Brand Colors:
 * - Cor Principal: #8B3DFF
 * - Cor Violet:    #B66CFF
 * - Coral Action:  #FF7043
 * - Texto Branco:  #F5F5F7
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleNetwork();
  initChaosDataCanvas();
  initCounters();
  initProcessPipeline();
  initFAQ();
  initDemoModal();
  initMobileMenu();
  initCursorGlow();
});

/* ==========================================================================
   1. HERO PARTICLES BACKGROUND CANVAS (BRAND PALETTE)
   ========================================================================== */
function initParticleNetwork() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 75;
  const maxDistance = window.innerWidth < 768 ? 85 : 130;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || 600;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2.2 + 1;
      
      const rand = Math.random();
      if (rand < 0.45) {
        this.color = '#8B3DFF'; // Cor Principal
      } else if (rand < 0.8) {
        this.color = '#B66CFF'; // Cor Violet
      } else if (rand < 0.93) {
        this.color = '#FF7043'; // Coral Action
      } else {
        this.color = '#F5F5F7'; // White
      }
      
      this.alpha = Math.random() * 0.55 + 0.25;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#B66CFF';
          ctx.globalAlpha = (1 - dist / mouse.radius) * 0.6;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Connect between particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.color === '#FF7043' || p2.color === '#FF7043' ? 'rgba(255, 112, 67, 0.35)' : 'rgba(182, 108, 255, 0.25)';
          ctx.globalAlpha = (1 - dist / maxDistance) * 0.3;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. CHAOS VS ORDER DATA VISUALIZATION ENGINE (SEÇÃO 1 & 2)
   ========================================================================== */
function initChaosDataCanvas() {
  const canvas = document.getElementById('data-simulation-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mode = 'chaos'; // 'chaos' or 'ordered'
  let dataPoints = [];
  const count = 65;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || 500;
    height = canvas.height = 360;
  }
  window.addEventListener('resize', resize);
  resize();

  class DataNode {
    constructor(i) {
      this.index = i;
      this.initChaos();
    }

    initChaos() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.targetX = this.x;
      this.targetY = this.y;
      this.vx = (Math.random() - 0.5) * 2.8;
      this.vy = (Math.random() - 0.5) * 2.8;
      this.size = Math.random() * 3 + 2;
      this.color = Math.random() > 0.4 ? '#f43f5e' : '#f59e0b';
      this.pulse = Math.random() * Math.PI;
    }

    initOrdered() {
      // Organized pipeline grid flowing into Datalume Central Engine
      const col = this.index % 8;
      const row = Math.floor(this.index / 8);
      const startX = 60 + col * ((width - 120) / 7);
      const startY = 50 + row * ((height - 100) / 7);
      this.targetX = startX;
      this.targetY = startY;
      this.color = this.index % 3 === 0 ? '#FF7043' : (this.index % 2 === 0 ? '#8B3DFF' : '#B66CFF');
      this.size = 3.6;
    }

    update() {
      this.pulse += 0.05;
      if (mode === 'chaos') {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 10 || this.x > width - 10) this.vx *= -1;
        if (this.y < 10 || this.y > height - 10) this.vy *= -1;
      } else {
        // Smoothly interpolate towards organized grid & pipeline stream
        this.x += (this.targetX - this.x) * 0.08;
        this.y += (this.targetY - this.y) * 0.08;
        // Subtle rhythmic floating
        this.y += Math.sin(this.pulse) * 0.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = mode === 'chaos' ? 12 : 16;
      ctx.shadowColor = this.color;
      ctx.globalAlpha = 0.88;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    dataPoints.push(new DataNode(i));
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw central processor hub if in ordered mode
    if (mode === 'ordered') {
      const centerX = width / 2;
      const centerY = height / 2;

      // Outer Glow circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 61, 255, 0.15)';
      ctx.strokeStyle = '#B66CFF';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fill();

      // Inner Core Pulse with Coral Accent
      ctx.beginPath();
      ctx.arc(centerX, centerY, 28 + Math.sin(Date.now() * 0.005) * 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 112, 67, 0.25)';
      ctx.strokeStyle = '#FF7043';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();

      // Label
      ctx.font = '700 11px Space Grotesk, sans-serif';
      ctx.fillStyle = '#F5F5F7';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DATALUME CORE', centerX, centerY);
    }

    // Draw connecting vectors
    for (let i = 0; i < dataPoints.length; i++) {
      const p1 = dataPoints[i];
      p1.update();
      p1.draw();

      if (mode === 'ordered') {
        const centerX = width / 2;
        const centerY = height / 2;
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = p1.color === '#FF7043' ? 'rgba(255, 112, 67, 0.35)' : 'rgba(182, 108, 255, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      } else {
        // Chaotic tangled lines
        for (let j = i + 1; j < dataPoints.length; j += 4) {
          const p2 = dataPoints[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.28)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();

  // Mode Toggle Controls
  const btnChaos = document.getElementById('btn-view-chaos');
  const btnOrder = document.getElementById('btn-view-order');
  const statusBadge = document.getElementById('simulation-status-text');
  const statusDesc = document.getElementById('simulation-status-desc');

  function setMode(newMode) {
    mode = newMode;
    if (mode === 'chaos') {
      dataPoints.forEach(p => p.initChaos());
      if (btnChaos) {
        btnChaos.classList.add('bg-rose-500/20', 'text-rose-300', 'border-rose-500/50');
        btnChaos.classList.remove('text-slate-400', 'border-transparent');
      }
      if (btnOrder) {
        btnOrder.classList.remove('bg-purple-600/30', 'text-violet-300', 'border-purple-500/50');
        btnOrder.classList.add('text-slate-400', 'border-transparent');
      }
      if (statusBadge) {
        statusBadge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block mr-2"></span> Estado Atual: Caos e Dados Fragmentados';
        statusBadge.className = 'text-xs font-semibold px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 inline-flex items-center';
      }
      if (statusDesc) {
        statusDesc.textContent = 'Múltiplos silos, fluxos desconectados, gargalos operacionais e perda constante de oportunidades.';
      }
    } else {
      dataPoints.forEach(p => p.initOrdered());
      if (btnOrder) {
        btnOrder.classList.add('bg-purple-600/30', 'text-violet-200', 'border-purple-500/50');
        btnOrder.classList.remove('text-slate-400', 'border-transparent');
      }
      if (btnChaos) {
        btnChaos.classList.remove('bg-rose-500/20', 'text-rose-300', 'border-rose-500/50');
        btnChaos.classList.add('text-slate-400', 'border-transparent');
      }
      if (statusBadge) {
        statusBadge.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-[#FF7043] animate-ping inline-block mr-2"></span> Datalume Decision Ativado: Inteligência Unificada';
        statusBadge.className = 'text-xs font-semibold px-3 py-1 rounded-full bg-purple-950/90 border border-purple-500/40 text-violet-200 inline-flex items-center';
      }
      if (statusDesc) {
        statusDesc.textContent = 'Dados centralizados, visualização em tempo real e decisões acionáveis e lucrativas.';
      }
    }
  }

  if (btnChaos) btnChaos.addEventListener('click', () => setMode('chaos'));
  if (btnOrder) btnOrder.addEventListener('click', () => setMode('ordered'));

  // Auto flip once to order when scrolling into view
  let hasAutoFlipped = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAutoFlipped) {
        hasAutoFlipped = true;
        setTimeout(() => {
          setMode('ordered');
        }, 1800);
      }
    });
  }, { threshold: 0.4 });

  const simContainer = document.getElementById('data-simulation-container');
  if (simContainer) observer.observe(simContainer);
}

/* ==========================================================================
   3. ANIMATED NUMBER COUNTERS ON SCROLL
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseFloat(target.getAttribute('data-target'));
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const decimals = parseInt(target.getAttribute('data-decimals') || '0', 10);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = (targetNum * easeProgress).toFixed(decimals);

          target.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = `${prefix}${targetNum.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   4. INTERACTIVE PROCESS PIPELINE (SEÇÃO 4 - BRAND EDITION)
   ========================================================================== */
const pipelineStepsData = [
  {
    step: "01",
    title: "Conexão",
    shortDesc: "Integramos seus sistemas e fontes de dados.",
    fullDesc: "Conectores nativos para ERPs, CRMs, Bancos de Dados SQL/NoSQL, APIs e planilhas em nuvem. Sincronização em tempo real sem complexidade de infraestrutura.",
    techBadge: "Multi-Source Ingestion Protocol",
    stat: "< 15 Minutos para Setup Inicial",
    icon: "fa-network-wired"
  },
  {
    step: "02",
    title: "Transformação",
    shortDesc: "Estruturamos e limpamos seus dados para análise.",
    fullDesc: "Pipelines automatizados de ETL/ELT com validação inteligente de integridade, deduplicação e normalização avançada para eliminar ruídos.",
    techBadge: "Automated Data Cleansing & Modeling",
    stat: "100% Integridade Estrutural",
    icon: "fa-microchip"
  },
  {
    step: "03",
    title: "Visualização",
    shortDesc: "Criamos dashboards e relatórios intuitivos.",
    fullDesc: "Telas de comando vivas, responsivas e ultra-fluidas com design de nível executivo. Indicadores visuais claros para todos os níveis decisórios.",
    techBadge: "High Dynamic Visual Dashboards",
    stat: "60fps Visualização em Tempo Real",
    icon: "fa-chart-pie"
  },
  {
    step: "04",
    title: "Análise",
    shortDesc: "Identificamos padrões, tendências e insights.",
    fullDesc: "Algoritmos preditivos e inteligência estatística identificando anomalias de mercado, sazonalidade e novas oportunidades antes da concorrência.",
    techBadge: "Predictive Neural Analytics",
    stat: "99.8% Acurácia de Detecção",
    icon: "fa-brain"
  },
  {
    step: "05",
    title: "Ação",
    shortDesc: "Tomamos decisões estratégicas e impulsionamos seus resultados.",
    fullDesc: "Recomendações prescritivas diretas para a sua equipe, automação de gatilhos operacionais e maximização contínua do ROI do seu negócio.",
    techBadge: "Strategic Decision Automation",
    stat: "+20% Crescimento Comprovado",
    icon: "fa-rocket"
  }
];

function initProcessPipeline() {
  const stepButtons = document.querySelectorAll('.pipeline-step-btn');
  const hudTitle = document.getElementById('hud-step-title');
  const hudNumber = document.getElementById('hud-step-number');
  const hudDesc = document.getElementById('hud-step-desc');
  const hudBadge = document.getElementById('hud-step-badge');
  const hudStat = document.getElementById('hud-step-stat');
  const hudIcon = document.getElementById('hud-step-icon');
  const progressBar = document.getElementById('pipeline-progress-bar');

  if (!stepButtons.length) return;

  function selectStep(index) {
    const data = pipelineStepsData[index];
    if (!data) return;

    stepButtons.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('border-[#B66CFF]', 'bg-purple-950/60', 'text-[#F5F5F7]', 'shadow-[0_0_20px_rgba(139,61,255,0.4)]');
        btn.classList.remove('border-slate-800', 'bg-slate-900/60', 'text-slate-400');
      } else {
        btn.classList.remove('border-[#B66CFF]', 'bg-purple-950/60', 'text-[#F5F5F7]', 'shadow-[0_0_20px_rgba(139,61,255,0.4)]');
        btn.classList.add('border-slate-800', 'bg-slate-900/60', 'text-slate-400');
      }
    });

    if (hudTitle) hudTitle.textContent = `${data.step}. ${data.title}`;
    if (hudNumber) hudNumber.textContent = `ETAPA ${data.step} / 05`;
    if (hudDesc) hudDesc.textContent = data.fullDesc;
    if (hudBadge) hudBadge.textContent = data.techBadge;
    if (hudStat) hudStat.textContent = data.stat;
    if (hudIcon) hudIcon.className = `fas ${data.icon} text-[#FF7043] text-3xl`;
    if (progressBar) progressBar.style.width = `${((index + 1) / 5) * 100}%`;
  }

  stepButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => selectStep(idx));
  });

  // Default step 0
  selectStep(0);
}

/* ==========================================================================
   5. INTERACTIVE FAQ ACCORDION (SEÇÃO 7)
   ========================================================================== */
function initFAQ() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      accordionItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. DEMO BOOKING MODAL & LEAD CAPTURE (SEÇÃO 5 & CTAs)
   ========================================================================== */
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const openButtons = document.querySelectorAll('.btn-open-demo-modal');
  const closeBtn = document.getElementById('btn-close-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const demoForm = document.getElementById('demo-booking-form');
  const formContent = document.getElementById('modal-form-content');
  const successContent = document.getElementById('modal-success-content');
  const btnResetDemo = document.getElementById('btn-reset-demo');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Handle Form Submission — envia por mailto para datalumedecision@outlook.com
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = demoForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Coletar dados dos campos
      const inputs = demoForm.querySelectorAll('input, select, textarea');
      const labels = demoForm.querySelectorAll('label');
      let bodyLines = [];

      inputs.forEach((input, index) => {
        const label = labels[index] ? labels[index].textContent.trim() : `Campo ${index + 1}`;
        const value = input.value || '(não informado)';
        bodyLines.push(`${label}: ${value}`);
      });

      const nome    = demoForm.querySelector('input[type="text"]')?.value || '';
      const email   = demoForm.querySelector('input[type="email"]')?.value || '';
      const allText = bodyLines.join('%0D%0A');

      const subject = encodeURIComponent(`[Datalume Decision] Novo Contato — ${nome}`);
      const body    = encodeURIComponent(
        `Olá, você recebeu um novo contato pelo site da Datalume Decision!\n\n` +
        bodyLines.join('\n') +
        `\n\nResposta para: ${email}`
      );

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Enviando...';

      // Abrir cliente de e-mail com dados preenchidos
      window.location.href = `mailto:datalumedecision@outlook.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        if (formContent) formContent.classList.add('hidden');
        if (successContent) successContent.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    });
  }

  if (btnResetDemo) {
    btnResetDemo.addEventListener('click', () => {
      if (demoForm) demoForm.reset();
      if (formContent) formContent.classList.remove('hidden');
      if (successContent) successContent.classList.add('hidden');
      closeModal();
    });
  }
}

/* ==========================================================================
   7. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMenuBtn = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileDrawer) return;

  function toggleMenu(show) {
    if (show) {
      mobileDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   8. DESKTOP CURSOR GLOW FOLLOWER
   ========================================================================== */
function initCursorGlow() {
  if (window.innerWidth < 1024) return;
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}
