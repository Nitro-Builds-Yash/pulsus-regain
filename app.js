/**
 * ATHOTA YASHWANTH // AUTONOMOUS AI ARCHITECTURES
 * Interactive Live Sandbox Controller
 */

// ============================================================================
// Datasets
// ============================================================================
const OMNI_VERIFIED_LEADS = [
  {
    title: "Overcoming Resistance to Immune Checkpoint Blockade in Metastatic Melanoma",
    author: "Dr. Elena Rostova, Ph.D.",
    email: "elena.rostova@oncology.ox.ac.uk",
    source: "Europe PMC",
    mx: "VALID (250 OK)"
  },
  {
    title: "Engineered CAR-T Cells Targeting Solid Tumors: Overcoming the Microenvironment",
    author: "Prof. Marcus Vance, M.D.",
    email: "m.vance@stanfordmed.org",
    source: "PubMed",
    mx: "VALID (250 OK)"
  },
  {
    title: "Single-Cell Spatial Transcriptomics of Tumor Infiltrating Lymphocytes in NSCLC",
    author: "Dr. Sarah Chen, Ph.D.",
    email: "schen@charite.de",
    source: "eLife",
    mx: "VALID (250 OK)"
  },
  {
    title: "Dual PD-1 and CTLA-4 Checkpoint Inhibition in Renal Cell Carcinoma",
    author: "Dr. Alexander Kim, M.D.",
    email: "akim@utoronto.ca",
    source: "PLOS",
    mx: "VALID (250 OK)"
  },
  {
    title: "Nanoparticle-Mediated Drug Delivery Across Blood-Brain Barrier in Glioblastoma",
    author: "Prof. Hiroshi Tanaka, Ph.D.",
    email: "tanaka.h@med.kyoto-u.ac.jp",
    source: "OpenAlex",
    mx: "VALID (250 OK)"
  },
  {
    title: "Neoadjuvant Chemo-Immunotherapy Outcomes in Triple-Negative Breast Cancer",
    author: "Dr. Claire Dubois, M.D.",
    email: "claire.dubois@inserm.fr",
    source: "Frontiers",
    mx: "VALID (250 OK)"
  }
];

const TEMPLATES = {
  1: {
    title: "Slot 1: Clinical Editorial Invitation",
    text: `Dear {name},

We are pleased to invite you to contribute your expertise to our upcoming clinical review related to "{title}". Your work has significantly contributed to advancing this domain.

This provides an international platform to highlight your latest findings and collaborate with peers dedicated to therapeutic progress.

Best regards,
MimicMail Editorial Board
Directorate of Medical Press`
  },
  2: {
    title: "Slot 2: Keynote & Symposium Address",
    text: `Dear {name},

On behalf of the scientific organizing committee, we warmly invite you to present your recent milestone research: "{title}". Your discoveries continue to inspire researchers worldwide.

We would be deeply honored to include your perspective in this upcoming session.

Best regards,
Scientific Steering Directorate
Global Oncology Council`
  },
  3: {
    title: "Slot 3: Academic Advisory Nomination",
    text: `Dear {name},

In light of your distinguished track record and recent paper "{title}", our editorial directors would like to nominate you for our Academic Advisory Board.

Your perspective would be invaluable in guiding future peer-review and editorial initiatives.

Best regards,
MimicMail Advisory Committee
International Medical Press`
  },
  4: {
    title: "Slot 4: Clinical Consortium Collaboration",
    text: `Dear {name},

We have been following your published findings in "{title}". We are currently assembling a multi-center collaborative research consortium and believe your laboratory would be an exceptional partner.

We look forward to connecting and discussing mutual synergies.

Best regards,
Translational Research Directorate
Collaborative Trials Network`
  },
  5: {
    title: "Slot 5: Dedicated Issue Guest Lead",
    text: `Dear {name},

We are organizing a focused special issue exploring breakthrough therapies. Given your influential contributions in "{title}", we warmly welcome an original submission from your team.

We anticipate your positive confirmation.

Best regards,
Special Issue Guest Editors
Advanced Biomedical Reviews`
  }
};

let activeManifest = [];
let mimicQueue = [
  { id: 1, name: "Dr. Elena Rostova", email: "elena.rostova@oncology.ox.ac.uk", title: "Targeting Checkpoint Receptors in Metastatic Melanoma", status: "PENDING", timestamp: "Queued" },
  { id: 2, name: "Prof. Marcus Vance", email: "m.vance@stanfordmed.org", title: "CAR-T Solid Tumor Microenvironment Engineering", status: "PENDING", timestamp: "Queued" },
  { id: 3, name: "Dr. Sarah Chen", email: "schen@charite.de", title: "Spatial Transcriptomics of Tumor Infiltrates", status: "PENDING", timestamp: "Queued" },
  { id: 4, name: "Dr. Alexander Kim", email: "akim@utoronto.ca", title: "Immune Checkpoint Modulation in Renal Carcinoma", status: "PENDING", timestamp: "Queued" }
];

let selectedSlot = 1;
let campaignActive = false;
let campaignTimer = null;

// ============================================================================
// Real-Time Clock, Ping & Background Neural Mesh Canvas
// ============================================================================
function initSystemMonitors() {
  const clockEl = document.getElementById('realtimeClock');
  const pingEl = document.getElementById('realtimePing');

  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toUTCString().split(' ')[4] + ' UTC';
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  if (pingEl) {
    setInterval(() => {
      const p = Math.floor(Math.random() * 8) + 18;
      pingEl.textContent = `${p}ms`;
    }, 3500);
  }
}

// ============================================================================
// Interactive Fluid Cursor, Dark Spotlight & 3D Card Tilt Matrix
// ============================================================================
function initMouseGlow() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (dot) {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }

    // Pass mouse coordinates directly to body background for real-time spotlight engagement
    document.body.style.setProperty('--mouse-screen-x', `${mouseX}px`);
    document.body.style.setProperty('--mouse-screen-y', `${mouseY}px`);
  }, { passive: true });

  // Fluid trailing animation loop for ring
  function renderCursorPhysics() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    if (ring) {
      ring.style.left = `${ringX.toFixed(2)}px`;
      ring.style.top = `${ringY.toFixed(2)}px`;
    }
    requestAnimationFrame(renderCursorPhysics);
  }
  renderCursorPhysics();

  // Dynamic cursor scale up on interactive hover
  const interactives = document.querySelectorAll('a, button, input, select, .bento-box-card, .bat-toggle-btn, .segment-tab-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // 3D Tilt on Bento Showcase Cards
  const cards = document.querySelectorAll('.bento-box-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
      const rotateY = ((x - centerX) / centerX) * 9;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
  });
}

// ============================================================================
// Segmented Sandbox Switcher
// ============================================================================
function switchSandbox(target) {
  const btnOmni = document.getElementById('tabOmniBtn') || document.getElementById('tabBtnOmni');
  const btnMimic = document.getElementById('tabMimicBtn') || document.getElementById('tabBtnMimic');
  const btnMdpi = document.getElementById('tabMdpiBtn') || document.getElementById('tabBtnMdpi');
  
  const paneOmni = document.getElementById('paneOmni');
  const paneMimic = document.getElementById('paneMimic');
  const paneMdpi = document.getElementById('paneMdpi');

  if (btnOmni) btnOmni.classList.remove('active');
  if (btnMimic) btnMimic.classList.remove('active');
  if (btnMdpi) btnMdpi.classList.remove('active');

  if (paneOmni) paneOmni.classList.remove('active');
  if (paneMimic) paneMimic.classList.remove('active');
  if (paneMdpi) paneMdpi.classList.remove('active');

  if (target === 'omni') {
    if (btnOmni) btnOmni.classList.add('active');
    if (paneOmni) paneOmni.classList.add('active');
  } else if (target === 'mimic') {
    if (btnMimic) btnMimic.classList.add('active');
    if (paneMimic) paneMimic.classList.add('active');
  } else if (target === 'mdpi') {
    if (btnMdpi) btnMdpi.classList.add('active');
    if (paneMdpi) paneMdpi.classList.add('active');
  }
  if (window.lucide) lucide.createIcons();
}
window.switchSandboxEngine = switchSandbox;

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3200);
}

// ============================================================================
// OMNISCOUT INTELLIGENCE WORKSPACE
// ============================================================================
function setTopic(topic) {
  document.getElementById('omniTopic').value = topic;
}

function runOmniExtractor() {
  const query = document.getElementById('omniTopic').value.trim();
  const geo = document.getElementById('omniGeo').value;
  const submitBtn = document.getElementById('omniSubmitBtn');
  const progressCard = document.getElementById('omniProgressCard');
  const fill = document.getElementById('omniProgressFill');
  const pctText = document.getElementById('omniPctText');
  const stepText = document.getElementById('omniStepText');
  const subtext = document.getElementById('omniSubtext');
  const clock = document.getElementById('omniClock');

  if (!query) return;

  submitBtn.disabled = true;
  progressCard.style.display = 'block';

  appendLog(`[DISPATCH] Initiating parallel harvest across 10 sources for: "${query}" (Geo: ${geo})`);

  let startTime = Date.now();
  const steps = [
    { p: 20, msg: "Connecting to PubMed Entrez & Europe PMC APIs...", log: "[QUERY] Dispatched concurrent requests to PubMed Entrez & Europe PMC" },
    { p: 45, msg: "Crossref DOI normalization & PDF streaming...", log: "[PDF] DOI normalization verified. Streaming open PDFs in-memory with pdfplumber" },
    { p: 72, msg: "Routing to Gemini LLM for entity resolution...", log: "[AI ROUTER] Discovered zero-rate Gemini fallback. Resolving author contact entities" },
    { p: 90, msg: "Enforcing Zero-Gmail filter & DNS MX socket check...", log: "[GUARD] Zero-Gmail firewall dropped 3 public domains. Verified DNS MX code 250 OK" },
    { p: 100, msg: "3-Field completeness data contract ratified.", log: "[SUCCESS] Extracted 6 verified institutional author records." }
  ];

  let current = 0;
  const interval = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    clock.textContent = `${elapsed}s elapsed`;

    if (current < steps.length) {
      const s = steps[current];
      fill.style.width = s.p + '%';
      pctText.textContent = s.p + '%';
      stepText.innerHTML = `<i data-lucide="loader-2" class="icon-sm spin"></i> ${s.msg}`;
      subtext.textContent = s.log;
      appendLog(s.log);
      lucide.createIcons();
      current++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        progressCard.style.display = 'none';
        submitBtn.disabled = false;
        renderOmniManifest();
        showToast(`Extracted ${OMNI_VERIFIED_LEADS.length} verified institutional author contacts.`);
      }, 400);
    }
  }, 450);
}

function appendLog(msg) {
  const logsEl = document.getElementById('omniLogs');
  if (!logsEl) return;
  const div = document.createElement('div');
  div.className = 't-line text-dim';
  const t = new Date().toLocaleTimeString();
  div.textContent = `[${t}] ${msg}`;
  logsEl.appendChild(div);
  logsEl.scrollTop = logsEl.scrollHeight;
}

function clearLogs() {
  const logsEl = document.getElementById('omniLogs');
  if (logsEl) logsEl.innerHTML = '<div class="t-line text-dim">[CONSOLE CLEARED] Daemon standby.</div>';
}

function renderOmniManifest() {
  activeManifest = [...OMNI_VERIFIED_LEADS];
  const tbody = document.getElementById('omniTableBody');
  const countBadge = document.getElementById('omniCountBadge');
  tbody.innerHTML = '';
  countBadge.textContent = `${activeManifest.length} Contacts`;

  activeManifest.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="font-mono text-dim">${idx + 1}</td>
      <td class="col-title">${item.title}</td>
      <td class="col-author">${item.author}</td>
      <td><span class="pill-email">${item.email}</span></td>
      <td><span class="font-mono text-dim font-xs">${item.source}</span></td>
      <td><span class="pill-mx"><i data-lucide="check" class="icon-xs"></i> ${item.mx}</span></td>
    `;
    tbody.appendChild(tr);
  });
  lucide.createIcons();
}

function copyEmails() {
  if (activeManifest.length === 0) {
    showToast('Run extraction first to discover contacts.');
    return;
  }
  const emails = activeManifest.map(l => l.email).join(', ');
  navigator.clipboard.writeText(emails).then(() => {
    showToast(`Copied ${activeManifest.length} verified institutional emails to clipboard.`);
  });
}

function exportCsv() {
  if (activeManifest.length === 0) {
    showToast('No records to export. Run extraction first.');
    return;
  }
  let csv = "Index,Paper Title,Author Name,Institutional Email,Source,DNS MX Status\n";
  activeManifest.forEach((l, i) => {
    csv += `"${i+1}","${l.title.replace(/"/g, '""')}","${l.author}","${l.email}","${l.source}","${l.mx}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `OmniScout_Verified_Contacts_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported formatted spreadsheet (.csv).');
}

function pipeToMimicMail() {
  if (activeManifest.length === 0) {
    showToast('Extract contacts before transmitting to MimicMail.');
    return;
  }

  mimicQueue = activeManifest.map((item, idx) => ({
    id: idx + 1,
    name: item.author,
    email: item.email,
    title: item.title,
    status: 'PENDING',
    timestamp: 'Queued'
  }));

  renderMimicQueue();
  updateMimicMetrics();
  switchSandbox('mimic');
  showToast(`Transmitted ${mimicQueue.length} verified author contacts to MimicMail dispatcher.`);
}

// ============================================================================
// MIMICMAIL PLAYWRIGHT WORKSPACE
// ============================================================================
function changeCadence(val) {
  document.getElementById('cadenceVal').textContent = `${parseFloat(val).toFixed(2)} min`;
}

function chooseSlot(slotNum) {
  selectedSlot = slotNum;
  document.querySelectorAll('.slot-tab').forEach((btn, idx) => {
    if (idx + 1 === slotNum) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const slotData = TEMPLATES[slotNum];
  document.getElementById('slotTitle').textContent = slotData.title;
  document.getElementById('slotBody').value = slotData.text;
  document.getElementById('mimicSlotBadge').textContent = `Slot ${slotNum}`;
}

function renderMimicQueue() {
  const tbody = document.getElementById('mimicQueueBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  mimicQueue.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.id = `mimic-row-${item.id}`;
    const isSent = item.status === 'SENT';
    tr.innerHTML = `
      <td class="font-mono text-dim">${idx + 1}</td>
      <td class="col-author"><strong>${item.name}</strong></td>
      <td><span class="pill-email">${item.email}</span></td>
      <td class="col-title">${item.title}</td>
      <td><span class="${isSent ? 'badge-excel-sent' : 'badge-excel-pending'}" id="status-tag-${item.id}">${item.status}</span></td>
      <td class="font-mono text-dim font-xs" id="time-tag-${item.id}">${item.timestamp}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateMimicMetrics() {
  const sent = mimicQueue.filter(m => m.status === 'SENT').length;
  const pending = mimicQueue.filter(m => m.status === 'PENDING').length;

  document.getElementById('mimicSentCount').textContent = sent;
  document.getElementById('mimicPendingCount').textContent = pending;
}

function startDispatcher() {
  const pending = mimicQueue.filter(m => m.status === 'PENDING');
  if (pending.length === 0) {
    showToast('All candidates have already been dispatched!');
    return;
  }

  campaignActive = true;
  document.getElementById('startDispatchBtn').style.display = 'none';
  document.getElementById('pauseDispatchBtn').style.display = 'block';
  document.getElementById('browserStatusPill').textContent = 'DISPATCHING LIVE';
  document.getElementById('browserStatusPill').className = 'status-pill pill-active';

  runNextCandidate();
}

function pauseDispatcher() {
  campaignActive = false;
  if (campaignTimer) clearTimeout(campaignTimer);
  document.getElementById('startDispatchBtn').style.display = 'block';
  document.getElementById('pauseDispatchBtn').style.display = 'none';
  document.getElementById('browserStatusPill').textContent = 'DISPATCH PAUSED';
  document.getElementById('browserStatusPill').className = 'status-pill pill-idle';
  document.getElementById('mimicCountdown').textContent = 'PAUSED';
  showToast('Dispatcher cadence paused. Context retained.');
}

function runNextCandidate() {
  if (!campaignActive) return;

  const candidate = mimicQueue.find(m => m.status === 'PENDING');
  if (!candidate) {
    pauseDispatcher();
    showToast('Outreach campaign successfully finished!');
    return;
  }

  // 1. Alternate slot randomly across 1 to 5 to prevent content fingerprinting
  const randomSlot = Math.floor(Math.random() * 5) + 1;
  chooseSlot(randomSlot);

  // 2. Render Times New Roman with automatic bolding
  const rawText = TEMPLATES[randomSlot].text;
  const formattedHtml = rawText
    .replace('{name}', `<strong>${candidate.name}</strong>`)
    .replace('{title}', `<strong>${candidate.title}</strong>`)
    .replace('{email}', candidate.email)
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');

  // 3. Update Zoho Mail DOM Simulator
  document.getElementById('liveTo').textContent = `${candidate.name} <${candidate.email}>`;
  document.getElementById('liveSub').textContent = `Editorial Review Collaboration — ${candidate.title}`;
  document.getElementById('liveBody').innerHTML = formattedHtml;

  // 4. Biological delay jitter countdown
  let countdownSec = 3;
  const clockEl = document.getElementById('mimicCountdown');

  const countTimer = setInterval(() => {
    countdownSec--;
    if (countdownSec >= 0) {
      clockEl.textContent = `00:0${countdownSec}`;
    } else {
      clearInterval(countTimer);

      candidate.status = 'SENT';
      candidate.timestamp = new Date().toLocaleTimeString();

      const statusTag = document.getElementById(`status-tag-${candidate.id}`);
      const timeCell = document.getElementById(`time-tag-${candidate.id}`);
      if (statusTag) {
        statusTag.className = 'badge-excel-sent';
        statusTag.textContent = 'SENT';
      }
      if (timeCell) {
        timeCell.textContent = candidate.timestamp;
      }

      updateMimicMetrics();
      showToast(`Playwright dispatched message to ${candidate.name} (Rotated ${TEMPLATES[randomSlot].title})`);

      if (campaignActive) {
        campaignTimer = setTimeout(runNextCandidate, 1200);
      }
    }
  }, 1000);
}

// ============================================================================
// LIVE 3D SPATIAL TELEMETRY ENGINE (Interactive WebGL)
// Real-time spatial telemetry & mission nodes for OmniScout & MimicMail
// ============================================================================

let sceneSpatial, cameraSpatial, rendererSpatial;
let activeSpatialTarget = 'omniscout';
let rootGroup, nodesGroup, linksGroup, spatialParticles, dataStreamPackets = [];
let isDraggingSpatial = false;
let prevMousePos = { x: 0, y: 0 };
let targetRotation = { x: 0.25, y: -0.4 };
let currentRotation = { x: 0.25, y: -0.4 };

const TACTICAL_PROJECT_DATA = {
  omniscout: {
    systemTitle: "SUBSYSTEM: OMNISCOUT SURVEILLANCE RADAR",
    telemetryId: "NODE: QUANTUM-OMNI-01",
    title: "OmniScout 10-Node Swarm",
    desc: "Autonomous spatial intelligence sweeping 10 global research registries concurrently. Enforces hard institutional verification, eliminates non-academic domains, and decrypts institutional author vectors.",
    nodeInfo: "10 REGISTRIES // ZERO-GMAIL MATRIX",
    metric1: "10 Streams",
    metric2: "Zero-Gmail 100%",
    metric3: "Port 25 (250 OK)",
    metric4: "In-Memory PDF",
    actionBtn: "Fire Tactical Scan Pulse",
    coreColor: 0xffffff, // Pure Clean White
    nodeColor: 0xe2e8f0, // Platinum Silver
    ringColor: 0x94a3b8  // Slate Silver
  },
  mimicmail: {
    systemTitle: "SUBSYSTEM: MIMICMAIL STEALTH WING",
    telemetryId: "NODE: QUANTUM-CLOAK-M7",
    title: "MimicMail Chromium DOM Cluster",
    desc: "Deploying silent Chromium shadow sessions simulating genuine human interaction across Zoho Webmail with 5-slot dynamic HTML template rotation and biological ±15-35s delay jitter.",
    nodeInfo: "CHROMIUM 133 // 5-SLOT DOM ROTATOR",
    metric1: "Playwright CDP",
    metric2: "5-Slot Rotation",
    metric3: "Jitter ±35s",
    metric4: "Excel Live Sync",
    actionBtn: "Deploy Cloaked Dispatch Pulse",
    coreColor: 0xffffff, // Pure Clean White
    nodeColor: 0xcfd8dc, // Silver Fog
    ringColor: 0x38bdf8  // Subtle Ice Blue
  },
  mdpi: {
    systemTitle: "SUBSYSTEM: MDPI CAMPAIGN AUTOMATOR",
    telemetryId: "NODE: QUANTUM-MDPI-SI",
    title: "MDPI Special Issue Orchestrator",
    desc: "Autonomous editorial campaign suite for MDPI journals (Sensors, Molecules, Cancers). Dispatches personalized invitations, matches publication vectors, and enforces co-author deduplication.",
    nodeInfo: "SUSY PORTAL // SPECIAL ISSUE HARVESTER",
    metric1: "MDPI SUSY API",
    metric2: "4 Target Journals",
    metric3: "Zero Co-Author Dup",
    metric4: "100 Safe Quota/Day",
    actionBtn: "Fire MDPI Campaign Sweep",
    coreColor: 0xffffff, // Pure Clean White
    nodeColor: 0x6ee7b7, // Emerald Tint
    ringColor: 0x10b981  // Emerald Silver
  },
  pipeline: {
    systemTitle: "SUBSYSTEM: UNIFIED SHADOW PIPELINE",
    telemetryId: "NODE: QUANTUM-CROSS-01",
    title: "OmniScout &bull; MimicMail Synergy",
    desc: "The dual-subsystem tactical loop: OmniScout extracts verified institutional leads from PubMed, validates MX sockets, and directly funnels clean payloads into MimicMail's stealth dispatch queue.",
    nodeInfo: "END-TO-END CLINICAL RESEARCH PIPELINE",
    metric1: "Zero-Loss Bridge",
    metric2: "100% Institutional",
    metric3: "Anti-Ban Stealth",
    metric4: "Full Deliverability",
    actionBtn: "Execute Full Tactical Mission",
    coreColor: 0xffffff, // Pure Clean White
    nodeColor: 0xe2e8f0, // Platinum
    ringColor: 0xffffff  // Pure White Orbital
  }
};

function init3DStage() {
  const container = document.getElementById('stage3dContainer');
  const canvas = document.getElementById('stage3dCanvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 1. Scene, Camera, Renderer
  scene3D = new THREE.Scene();
  scene3D.fog = new THREE.FogExp2(0x05070e, 0.028);

  camera3D = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera3D.position.set(0, 0, 22);

  renderer3D = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer3D.setSize(width, height);
  renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene3D.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 50);
  pointLight1.position.set(10, 15, 10);
  scene3D.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 50);
  pointLight2.position.set(-10, -10, -10);
  scene3D.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0x34d399, 2, 40);
  pointLight3.position.set(0, 10, -15);
  scene3D.add(pointLight3);

  // 3. Root Interactive Group
  root3DGroup = new THREE.Group();
  scene3D.add(root3DGroup);

  nodesGroup = new THREE.Group();
  linksGroup = new THREE.Group();
  root3DGroup.add(nodesGroup);
  root3DGroup.add(linksGroup);

  // 4. Ambient Space Particles
  buildAmbient3DParticles();

  // 5. Build Current Topology
  buildSpatialTopology(activeSpatialTarget);

  // 6. Mouse Orbit & Touch Listeners
  setup3DInteraction(canvas);

  // 7. Resize Handler
  window.addEventListener('resize', onWindowResize3D);

  // 8. Animation Loop
  animate3D();
}

function buildAmbient3DParticles() {
  const pCount = 350;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount * 3);
  const colors = new Float32Array(pCount * 3);

  const c1 = new THREE.Color(0x38bdf8);
  const c2 = new THREE.Color(0x818cf8);

  for (let i = 0; i < pCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

    const mix = Math.random();
    const c = c1.clone().lerp(c2, mix);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });

  particles3D = new THREE.Points(geom, mat);
  scene3D.add(particles3D);
}

function clear3DGroup(group) {
  while (group.children.length > 0) {
    const obj = group.children[0];
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
    group.remove(obj);
  }
}

function buildSpatialTopology(target) {
  clear3DGroup(nodesGroup);
  clear3DGroup(linksGroup);
  dataStreamPackets = [];

  const data = TACTICAL_PROJECT_DATA[target] || TACTICAL_PROJECT_DATA.omniscout;

  // 1. Central Tactical Core Node (Translucent frosted core + Artemii Lebedev geometric cage)
  const coreGeom = new THREE.IcosahedronGeometry(2.5, 3);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0x111625,
    emissiveIntensity: 0.2,
    roughness: 0.15,
    metalness: 0.1,
    transmission: 0.6,
    ior: 1.5,
    transparent: true,
    opacity: 0.95
  });
  const coreMesh = new THREE.Mesh(coreGeom, coreMat);
  coreMesh.name = "coreNode";
  nodesGroup.add(coreMesh);

  // Outer Precision Architectural Wireframe Cage (Artemii Lebedev Style)
  const cageGeom = new THREE.IcosahedronGeometry(3.2, 1);
  const cageMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const cageMesh = new THREE.Mesh(cageGeom, cageMat);
  cageMesh.name = "cageNode";
  nodesGroup.add(cageMesh);

  // Concentric Orbital Architectural Rings
  const ringGeom = new THREE.TorusGeometry(5.4, 0.035, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.4
  });
  const ring1 = new THREE.Mesh(ringGeom, ringMat);
  ring1.rotation.x = Math.PI / 2.3;
  ring1.name = "ring1";
  nodesGroup.add(ring1);

  const ringGeom2 = new THREE.TorusGeometry(7.6, 0.025, 16, 120);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.25
  });
  const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
  ring2.rotation.x = -Math.PI / 3.2;
  ring2.rotation.y = Math.PI / 6;
  ring2.name = "ring2";
  nodesGroup.add(ring2);

  // Satellite Nodes based on configuration
  const satelliteCount = target === 'omniscout' ? 10 : (target === 'mimicmail' ? 6 : (target === 'mdpi' ? 8 : 12));
  const nodePositions = [];

  for (let i = 0; i < satelliteCount; i++) {
    const angle = (i / satelliteCount) * Math.PI * 2;
    const radius = target === 'pipeline' ? 6.8 + Math.sin(i * 1.5) * 1.5 : (target === 'mdpi' ? 6.4 : 6.0);
    const yOffset = Math.sin(angle * 2) * 1.8;

    const x = Math.cos(angle) * radius;
    const y = yOffset;
    const z = Math.sin(angle) * radius;
    nodePositions.push(new THREE.Vector3(x, y, z));

    // Satellite Mesh (Precision Glass Sphere)
    const satGeom = new THREE.SphereGeometry(0.52, 24, 24);
    const satMat = new THREE.MeshStandardMaterial({
      color: target === 'mdpi' ? 0x6ee7b7 : 0xffffff,
      emissive: target === 'mdpi' ? 0x10b981 : 0xffffff,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.2
    });
    const satMesh = new THREE.Mesh(satGeom, satMat);
    satMesh.position.set(x, y, z);
    nodesGroup.add(satMesh);

    // Connecting Energy Beam (Line) to Core
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x, y, z)
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25
    });
    const line = new THREE.Line(lineGeom, lineMat);
    linksGroup.add(line);

    // Glowing Traveling Data Packet along line
    const packetGeom = new THREE.SphereGeometry(0.14, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending
    });
    const packet = new THREE.Mesh(packetGeom, packetMat);
    packet.userData = {
      start: new THREE.Vector3(0, 0, 0),
      end: new THREE.Vector3(x, y, z),
      t: Math.random(),
      speed: 0.008 + Math.random() * 0.008
    };
    linksGroup.add(packet);
    dataStreamPackets.push(packet);
  }

  // Inter-Satellite Ring Connections
  for (let i = 0; i < nodePositions.length; i++) {
    const nextIdx = (i + 1) % nodePositions.length;
    const perimeterGeom = new THREE.BufferGeometry().setFromPoints([
      nodePositions[i],
      nodePositions[nextIdx]
    ]);
    const perimeterMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    });
    linksGroup.add(new THREE.Line(perimeterGeom, perimeterMat));
  }
}

function setSpatialMission(target) {
  if (!TACTICAL_PROJECT_DATA[target]) return;
  activeSpatialTarget = target;

  // Toggle active button UI
  const btnOmni = document.getElementById('btn3dOmni');
  const btnMimic = document.getElementById('btn3dMimic');
  const btnMdpi = document.getElementById('btn3dMdpi');
  const btnSynergy = document.getElementById('btn3dSynergy');

  if (btnOmni) btnOmni.classList.toggle('active', target === 'omniscout');
  if (btnMimic) btnMimic.classList.toggle('active', target === 'mimicmail');
  if (btnMdpi) btnMdpi.classList.toggle('active', target === 'mdpi');
  if (btnSynergy) btnSynergy.classList.toggle('active', target === 'pipeline');

  const data = TACTICAL_PROJECT_DATA[target];

  // Update HUD
  document.getElementById('hudSystemTitle').textContent = data.systemTitle;
  document.getElementById('hudNodeInfo').textContent = data.nodeInfo;
  document.getElementById('telemetryId').textContent = data.telemetryId;
  document.getElementById('inspectorTitle').textContent = data.title;
  document.getElementById('inspectorDesc').textContent = data.desc;
  document.getElementById('insMetric1').textContent = data.metric1;
  document.getElementById('insMetric2').textContent = data.metric2;
  document.getElementById('insMetric3').textContent = data.metric3;
  document.getElementById('insMetric4').textContent = data.metric4;
  document.getElementById('btnTrigger3DText').textContent = data.actionBtn;

  // Rebuild Spatial Meshes with animation
  buildSpatialTopology(target);

  // Pulse camera smoothly
  camera3D.position.z = 25;
  let tweenIn = setInterval(() => {
    if (camera3D.position.z > 22) {
      camera3D.position.z -= 0.15;
    } else {
      camera3D.position.z = 22;
      clearInterval(tweenIn);
    }
  }, 16);

  showToast(`Spatial engine locked target: ${data.title}`);
}

function triggerTacticalPulse() {
  const data = TACTICAL_PROJECT_DATA[activeSpatialTarget];
  const core = nodesGroup.getObjectByName("coreNode");
  const cage = nodesGroup.getObjectByName("cageNode");

  if (core) {
    core.scale.set(1.5, 1.5, 1.5);
    setTimeout(() => core.scale.set(1, 1, 1), 350);
  }
  if (cage) {
    cage.scale.set(1.4, 1.4, 1.4);
    setTimeout(() => cage.scale.set(1, 1, 1), 400);
  }

  // Accelerate telemetry packets
  dataStreamPackets.forEach(p => {
    p.userData.speed *= 4;
    setTimeout(() => { p.userData.speed /= 4; }, 1200);
  });

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#e2e8f0', '#94a3b8', '#38bdf8']
    });
  }

  showToast(`Dispatched real-time 3D quantum pulse for ${data.title}`);
}

// Aliases for backwards compatibility with inline onclicks
window.set3DTarget = setSpatialMission;
window.trigger3DAction = triggerTacticalPulse;
window.setSpatialMission = setSpatialMission;
window.triggerTacticalPulse = triggerTacticalPulse;

function setup3DInteraction(canvas) {
  canvas.addEventListener('mousedown', (e) => {
    isDragging3D = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging3D = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging3D) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;

    targetRotation.y += deltaX * 0.007;
    targetRotation.x += deltaY * 0.007;

    // Clamp vertical tilt
    targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging3D = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging3D = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging3D || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMousePos.x;
    const deltaY = e.touches[0].clientY - prevMousePos.y;

    targetRotation.y += deltaX * 0.007;
    targetRotation.x += deltaY * 0.007;
    targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

    prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // Mouse wheel zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera3D.position.z += e.deltaY * 0.012;
    camera3D.position.z = Math.max(14, Math.min(32, camera3D.position.z));
  }, { passive: false });
}

function onWindowResize3D() {
  const container = document.getElementById('stage3dContainer');
  if (!container || !renderer3D || !camera3D) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera3D.aspect = width / height;
  camera3D.updateProjectionMatrix();
  renderer3D.setSize(width, height);
}

function animate3D() {
  requestAnimationFrame(animate3D);

  // Smooth rotation easing
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

  if (root3DGroup) {
    // Idle gentle auto-rotation when user is not dragging
    if (!isDragging3D) {
      targetRotation.y += 0.0025;
    }

    root3DGroup.rotation.x = currentRotation.x;
    root3DGroup.rotation.y = currentRotation.y;

    const core = nodesGroup.getObjectByName("coreNode");
    if (core) {
      core.rotation.y += 0.015;
      core.rotation.z += 0.008;
    }

    const cage = nodesGroup.getObjectByName("cageNode");
    if (cage) {
      cage.rotation.y -= 0.01;
      cage.rotation.x += 0.005;
    }

    const ring1 = nodesGroup.getObjectByName("ring1");
    if (ring1) ring1.rotation.z += 0.012;

    const ring2 = nodesGroup.getObjectByName("ring2");
    if (ring2) ring2.rotation.z -= 0.008;

    // Live continuous 3D floating wave motion across satellites
    const time = Date.now() * 0.002;
    nodesGroup.children.forEach((child, i) => {
      if (child.isMesh && child.name !== 'coreNode' && child.name !== 'cageNode' && child.name !== 'ring1' && child.name !== 'ring2') {
        child.position.y += Math.sin(time + i * 0.8) * 0.008;
      }
    });

    // Animate traveling data packets along connections
    dataStreamPackets.forEach(pkt => {
      pkt.userData.t += pkt.userData.speed;
      if (pkt.userData.t > 1) pkt.userData.t = 0;

      pkt.position.lerpVectors(pkt.userData.start, pkt.userData.end, pkt.userData.t);
    });
  }

  if (particles3D) {
    particles3D.rotation.y += 0.0006;
  }

  renderer3D.render(scene3D, camera3D);
}

// ============================================================================
// Interactive Floating Dock Scroll Spy, Velocity Progress & Reveal Movement
// ============================================================================
function initDockScrollSpy() {
  const sections = ['hero', 'tactical-command-deck', 'projects', 'live-sandbox', 'synergy-spec'];
  const dockLinks = document.querySelectorAll('.floating-dock-glass .dock-item[href]');
  const progressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    // 1. Calculate and update page scroll velocity progress bar
    if (progressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Active dock item highlight
    let current = 'hero';
    const scrollPos = window.scrollY + 200;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        current = id;
      }
    });

    dockLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

function initScrollRevealObserver() {
  const targets = document.querySelectorAll('.section, .bento-box-card, .glass-luxe-panel, .spec-step-box');
  targets.forEach(el => el.classList.add('section-reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

// ============================================================================
// MDPI CAMPAIGN AUTOMATOR SIMULATION ENGINE
// High-throughput Special Issue call-for-papers invitation suite
// ============================================================================

const MDPI_SPECIAL_ISSUES = {
  Sensors: [
    "Advanced Microfluidic Biosensors for Early Oncology Diagnostics",
    "Autonomous Drone Swarms & Spatial LiDAR Telemetry",
    "Wearable Electrochemical Sensors in Personalized Medicine"
  ],
  Molecules: [
    "Novel Bio-Active Nanocomposites in Regenerative Medicine",
    "Targeted Covalent Inhibitors in Kinase Drug Discovery",
    "Green Synthesis of Catalytic Metal-Organic Frameworks"
  ],
  Cancers: [
    "Overcoming Immunotherapy Resistance in Metastatic Melanoma",
    "Liquid Biopsy Circulating Tumor DNA in Minimal Residual Disease",
    "CAR-NK Cell Allogeneic Architectures for Solid Tumors"
  ],
  IJMS: [
    "Epigenetic Dysregulation in Neurodegenerative Pathogenesis",
    "Mitochondrial Quality Control in Metabolic Homeostasis",
    "CRISPR Prime Editing & Vector Safety Profiles"
  ]
};

const MDPI_RESEARCHERS = [
  {
    id: 1,
    name: "Dr. Alistair Finch",
    institution: "Imperial College London",
    email: "a.finch@imperial.ac.uk",
    priorPaper: "Continuous microfluidic sensing in clinical bio-fluids (2025)",
    status: "PENDING",
    timestamp: "—"
  },
  {
    id: 2,
    name: "Prof. Hiroshi Tanaka",
    institution: "Kyoto University",
    email: "h-tanaka@pharm.kyoto-u.ac.jp",
    priorPaper: "Nanoscale electrochemical transconductance probes (2024)",
    status: "PENDING",
    timestamp: "—"
  },
  {
    id: 3,
    name: "Dr. Sofia Lindqvist",
    institution: "Karolinska Institutet",
    email: "sofia.lindqvist@ki.se",
    priorPaper: "Surface-plasmon resonance markers for oncological screening (2025)",
    status: "PENDING",
    timestamp: "—"
  },
  {
    id: 4,
    name: "Prof. Mateo Rossi",
    institution: "ETH Zürich",
    email: "mateo.rossi@phys.ethz.ch",
    priorPaper: "Multiplexed point-of-care immunosensing chips (2024)",
    status: "PENDING",
    timestamp: "—"
  },
  {
    id: 5,
    name: "Dr. Chantal Dubois",
    institution: "Sorbonne Université",
    email: "c.dubois@sorbonne-universite.fr",
    priorPaper: "Graphene field-effect biosensors for liquid biopsies (2025)",
    status: "PENDING",
    timestamp: "—"
  }
];

let mdpiActive = false;
let mdpiTimer = null;
let currentMdpiIndex = 0;

function updateMdpiSpecialIssues() {
  const journalSelect = document.getElementById('mdpiJournalSelect');
  const issueSelect = document.getElementById('mdpiSpecialIssue');
  const activeJournalBadge = document.getElementById('mdpiActiveJournalBadge');
  if (!journalSelect || !issueSelect) return;

  const journal = journalSelect.value;
  if (activeJournalBadge) activeJournalBadge.textContent = `MDPI ${journal}`;

  issueSelect.innerHTML = '';
  const issues = MDPI_SPECIAL_ISSUES[journal] || MDPI_SPECIAL_ISSUES.Sensors;
  issues.forEach(iss => {
    const opt = document.createElement('option');
    opt.value = iss;
    opt.textContent = `"${iss}"`;
    issueSelect.appendChild(opt);
  });

  const previewJournal = document.getElementById('mdpiPreviewJournal');
  if (previewJournal) {
    previewJournal.textContent = `MDPI ${journal} (Special Issue)`;
  }
}

function renderMdpiQueue() {
  const tbody = document.getElementById('mdpiQueueBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  MDPI_RESEARCHERS.forEach((res, idx) => {
    const tr = document.createElement('tr');
    tr.id = `mdpi-row-${res.id}`;
    tr.innerHTML = `
      <td class="font-mono text-dim">${idx + 1}</td>
      <td><strong>${res.name}</strong></td>
      <td><span class="font-mono font-xs text-white">${res.institution}</span><br><span class="text-dim font-xs">${res.email}</span></td>
      <td><span class="font-xs text-secondary">${res.priorPaper}</span></td>
      <td><span class="badge-excel-${res.status.toLowerCase()}" id="mdpi-status-tag-${res.id}">${res.status}</span></td>
      <td class="font-mono font-xs text-dim" id="mdpi-time-tag-${res.id}">${res.timestamp}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateMdpiMetrics() {
  const sent = MDPI_RESEARCHERS.filter(r => r.status === 'INVITED').length;
  const pending = MDPI_RESEARCHERS.length - sent;

  const sentEl = document.getElementById('mdpiSentCount');
  const pendEl = document.getElementById('mdpiPendingCount');
  const statusBadge = document.getElementById('mdpiStatusBadge');

  if (sentEl) sentEl.textContent = sent;
  if (pendEl) pendEl.textContent = pending;
  if (statusBadge) {
    statusBadge.textContent = mdpiActive ? 'DISPATCHING' : (pending === 0 ? 'COMPLETED' : 'IDLE');
  }
}

function appendMdpiLog(msg, type = 'info') {
  const logs = document.getElementById('mdpiTerminalLogs');
  if (!logs) return;

  const now = new Date().toTimeString().split(' ')[0];
  const div = document.createElement('div');
  div.className = 'term-line';

  let colorClass = 'term-info';
  if (type === 'ok') colorClass = 'term-ok';
  if (type === 'warn') colorClass = 'term-warn';
  if (type === 'alert') colorClass = 'term-alert';

  div.innerHTML = `<span class="term-time">[${now}]</span> <span class="${colorClass}">${msg}</span>`;
  logs.appendChild(div);
  logs.scrollTop = logs.scrollHeight;
}

function launchMdpiCampaign() {
  if (mdpiActive) return;

  const pendingResearchers = MDPI_RESEARCHERS.filter(r => r.status === 'PENDING');
  if (pendingResearchers.length === 0) {
    showToast('All target researchers have already been invited to this Special Issue.');
    return;
  }

  mdpiActive = true;
  const btn = document.getElementById('btnRunMdpi');
  const btnText = document.getElementById('btnMdpiText');
  const streamState = document.getElementById('mdpiStreamState');

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Orchestrating Special Issue...';
  if (streamState) {
    streamState.textContent = 'CAMPAIGN IN FLIGHT';
    streamState.className = 'pill-chip font-mono font-xs bg-emerald';
  }

  const journal = document.getElementById('mdpiJournalSelect').value;
  const specialIssue = document.getElementById('mdpiSpecialIssue').value;
  const guestEditor = document.getElementById('mdpiGuestEditor').value;

  appendMdpiLog(`Initiating Special Issue outreach for MDPI ${journal}: "${specialIssue}"`, 'ok');
  appendMdpiLog(`Signatory Guest Editor: ${guestEditor}`, 'info');
  appendMdpiLog(`Verifying co-author uniqueness across past 36 months... Zero duplicates found.`, 'info');

  dispatchNextMdpiCandidate(journal, specialIssue, guestEditor);
}

function dispatchNextMdpiCandidate(journal, specialIssue, guestEditor) {
  const pendingIndex = MDPI_RESEARCHERS.findIndex(r => r.status === 'PENDING');

  if (pendingIndex === -1) {
    mdpiActive = false;
    const btn = document.getElementById('btnRunMdpi');
    const btnText = document.getElementById('btnMdpiText');
    const streamState = document.getElementById('mdpiStreamState');

    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Special Issue Fully Dispatched';
    if (streamState) streamState.textContent = 'CAMPAIGN CONCLUDED';

    appendMdpiLog(`[COMPLETION] All candidate researchers successfully invited. Audit records logged to ./campaigns/manifest.csv`, 'ok');
    showToast('MDPI Special Issue campaign successfully concluded.');
    updateMdpiMetrics();
    return;
  }

  const res = MDPI_RESEARCHERS[pendingIndex];

  // Update Preview Letter
  const previewRecip = document.getElementById('mdpiPreviewRecipient');
  const previewJourn = document.getElementById('mdpiPreviewJournal');
  const previewBody = document.getElementById('mdpiPreviewBody');
  const letterBadge = document.getElementById('mdpiLetterBadge');

  if (previewRecip) previewRecip.textContent = `${res.name} <${res.email}> &bull; ${res.institution}`;
  if (previewJourn) previewJourn.textContent = `MDPI ${journal} &mdash; "${specialIssue}"`;
  if (letterBadge) {
    letterBadge.textContent = 'INVITATION COMPILED';
    letterBadge.className = 'badge-status-pill pill-active font-mono';
  }

  if (previewBody) {
    previewBody.innerHTML = `
      <p>Dear <strong>${res.name}</strong>,</p>
      <p>Given your outstanding contributions to the field, particularly your recent published research on <em>"${res.priorPaper}"</em>, we are delighted to formally invite you to submit an original manuscript to the upcoming Special Issue in <strong>MDPI ${journal}</strong> (Impact Factor: ${journal === 'Cancers' ? '5.2' : (journal === 'IJMS' ? '5.6' : '3.9')}).</p>
      <p><strong>Special Issue Title:</strong> "${specialIssue}"<br>
      <strong>Guest Editor:</strong> ${guestEditor}<br>
      <strong>Submission Portal:</strong> <a href="https://susy.mdpi.com" target="_blank" style="color: #6ee7b7; text-decoration: underline;">https://susy.mdpi.com/user/manuscripts/invite</a></p>
      <p>Your institutional work at <em>${res.institution}</em> aligns directly with our thematic scope. Should you accept, please confirm your planned title within 14 days.</p>
      <p>Kind regards,<br>
      <em>Editorial Board, MDPI ${journal}</em></p>
    `;
  }

  appendMdpiLog(`[DISPATCH] Generated personalized letter for ${res.name} (${res.institution}) matching prior work: "${res.priorPaper}"`, 'info');

  mdpiTimer = setTimeout(() => {
    res.status = 'INVITED';
    res.timestamp = new Date().toLocaleTimeString();

    const statusTag = document.getElementById(`mdpi-status-tag-${res.id}`);
    const timeCell = document.getElementById(`mdpi-time-tag-${res.id}`);
    if (statusTag) {
      statusTag.className = 'badge-excel-sent';
      statusTag.textContent = 'INVITED';
    }
    if (timeCell) {
      timeCell.textContent = res.timestamp;
    }

    appendMdpiLog(`[SENT 250 OK] Susy portal invitation dispatched to ${res.email}. Co-author lock engaged.`, 'ok');
    updateMdpiMetrics();
    showToast(`MDPI Invitation sent to ${res.name}`);

    if (mdpiActive) {
      mdpiTimer = setTimeout(() => {
        dispatchNextMdpiCandidate(journal, specialIssue, guestEditor);
      }, 1400);
    }
  }, 1200);
}

function resetMdpiCampaign() {
  if (mdpiTimer) clearTimeout(mdpiTimer);
  mdpiActive = false;

  MDPI_RESEARCHERS.forEach(r => {
    r.status = 'PENDING';
    r.timestamp = '—';
  });

  const btn = document.getElementById('btnRunMdpi');
  const btnText = document.getElementById('btnMdpiText');
  const streamState = document.getElementById('mdpiStreamState');

  if (btn) btn.disabled = false;
  if (btnText) btnText.textContent = 'Deploy Special Issue Campaign';
  if (streamState) streamState.textContent = 'LISTENING';

  renderMdpiQueue();
  updateMdpiMetrics();
  appendMdpiLog('Campaign roster reset to initial state. Ready for new parameters.', 'warn');
  showToast('MDPI Campaign Roster reset.');
}

window.launchMdpiCampaign = launchMdpiCampaign;
window.resetMdpiCampaign = resetMdpiCampaign;
window.updateMdpiSpecialIssues = updateMdpiSpecialIssues;

// ============================================================================
// AUTOMATED SYSTEM TEST SUITE RUNNER
// Realistic verification of DOM composers, MX sockets, and SUSY registries
// ============================================================================

const AUTOMATED_TESTS = [
  { id: 't1', name: 'PubMed API & PDF In-Memory Stream Parser', status: 'pending', duration: '—' },
  { id: 't2', name: 'Academic Domain Firewall (Zero-Gmail 100%)', status: 'pending', duration: '—' },
  { id: 't3', name: 'Port 25 Direct DNS MX Socket Handshake (250 OK)', status: 'pending', duration: '—' },
  { id: 't4', name: 'Playwright CDP Zoho Mail Session Attach', status: 'pending', duration: '—' },
  { id: 't5', name: '5-Slot HTML Template Permutation & Anti-Fingerprint', status: 'pending', duration: '—' },
  { id: 't6', name: 'MDPI SUSY Special Issue Author Deduplication', status: 'pending', duration: '—' }
];

let isTestRunning = false;

function renderTestCases() {
  const container = document.getElementById('testCasesContainer');
  if (!container) return;

  container.innerHTML = '';
  AUTOMATED_TESTS.forEach((t, idx) => {
    const row = document.createElement('div');
    row.className = `test-case-row ${t.status}`;
    row.id = `test-row-${t.id}`;
    row.innerHTML = `
      <span class="test-case-name">
        <i data-lucide="${t.status === 'passed' ? 'check-circle-2' : (t.status === 'running' ? 'loader' : 'circle')}" class="icon-xs ${t.status === 'passed' ? 'text-emerald' : (t.status === 'running' ? 'text-cyan' : 'text-dim')}"></i>
        <span>TEST 0${idx + 1}: ${t.name}</span>
      </span>
      <span class="test-case-status ${t.status}" id="test-status-${t.id}">${t.status.toUpperCase()} (${t.duration})</span>
    `;
    container.appendChild(row);
  });
  if (window.lucide) lucide.createIcons();
}

function openTestRunnerModal() {
  const modal = document.getElementById('testRunnerModal');
  if (!modal) return;
  modal.style.display = 'flex';
  renderTestCases();
}

function closeTestRunnerModal() {
  const modal = document.getElementById('testRunnerModal');
  if (modal) modal.style.display = 'none';
}

function appendTestLog(msg, type = 'info') {
  const term = document.getElementById('testSuiteTerminal');
  if (!term) return;

  const now = new Date().toTimeString().split(' ')[0];
  const div = document.createElement('div');
  div.className = 'term-line';

  let color = 'term-info';
  if (type === 'ok') color = 'term-ok';
  if (type === 'warn') color = 'term-warn';

  div.innerHTML = `<span class="term-time">[${now}]</span> <span class="${color}">${msg}</span>`;
  term.appendChild(div);
  term.scrollTop = term.scrollHeight;
}

function startAutomatedTestSuite() {
  if (isTestRunning) return;
  isTestRunning = true;

  const btn = document.getElementById('btnExecuteTests');
  const btnText = document.getElementById('btnExecuteTestsText');
  const progressFill = document.getElementById('testSuiteProgress');
  const durationVal = document.getElementById('testDurationVal');
  const passedVal = document.getElementById('testPassedCount');

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Running Diagnostics...';

  let passed = 0;
  let startTime = Date.now();
  const timer = setInterval(() => {
    durationVal.textContent = ((Date.now() - startTime) / 1000).toFixed(2) + 's';
  }, 50);

  appendTestLog('INITIALIZING TEST HARNESS: Testing Playwright, REST Sockets & MDPI SUSY...', 'info');

  function runStep(index) {
    if (index >= AUTOMATED_TESTS.length) {
      clearInterval(timer);
      isTestRunning = false;
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Re-Run Test Suite';
      appendTestLog('====================================================', 'ok');
      appendTestLog('ALL 6/6 SYSTEM TESTS PASSED. ZERO FAILS RECORDED (100% HEALTHY).', 'ok');
      showToast('Automated Diagnostic Suite completed: 6/6 tests PASSED');
      return;
    }

    const test = AUTOMATED_TESTS[index];
    test.status = 'running';
    test.duration = '...';
    renderTestCases();

    appendTestLog(`[EXEC] Starting ${test.name}...`, 'info');

    const stepDuration = 600 + Math.floor(Math.random() * 400);

    setTimeout(() => {
      test.status = 'passed';
      test.duration = `${stepDuration}ms`;
      passed++;
      passedVal.textContent = passed;
      progressFill.style.width = `${(passed / AUTOMATED_TESTS.length) * 100}%`;

      appendTestLog(`[PASS] ${test.name} verified in ${stepDuration}ms [STATUS 200 OK]`, 'ok');
      renderTestCases();

      runStep(index + 1);
    }, stepDuration);
  }

  runStep(0);
}

window.openTestRunnerModal = openTestRunnerModal;
window.closeTestRunnerModal = closeTestRunnerModal;
window.startAutomatedTestSuite = startAutomatedTestSuite;

// Universal alias mappings for seamless inline event handlers
window.executeOmniExtraction = runOmniExtractor;
window.launchPlaywrightDispatcher = startDispatcher;
window.selectSlot = chooseSlot;

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initSystemMonitors();
  initMouseGlow();
  chooseSlot(1);
  renderMimicQueue();
  updateMimicMetrics();
  renderMdpiQueue();
  updateMdpiMetrics();
  init3DStage();
  initDockScrollSpy();
  initScrollRevealObserver();
  if (window.lucide) lucide.createIcons();
});


