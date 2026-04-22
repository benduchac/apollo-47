import {
  state,
  callbacks,
  getRoleLabel,
  getPlayerBriefing,
  createRoom,
  joinRoom,
  sendMessage,
  updateTypingStatus,
  isPrimaryRole,
  isSupport,
  generateCallsign,
  triggerScenarioDrop,
} from './game.js';

import { escapeHtml } from './utils.js';
import { MOON_VERBS, EQUIPMENT_ADJECTIVES, THINGS, PROTOCOL, getRandomItems, getRandomFromCategory } from './prompts.js';

let currentPromptCategory = 'briefing';
let lastRenderedMessageCount = 0;
let transmissionRendered = false;

callbacks.onStateChange = render;
callbacks.onTypingChange = renderTypingIndicator;
callbacks.onSendStatusChange = updateSendStatusDisplay;

// ─────────────────────────────────────────────────────────────────────────────
// Terminal helpers
// ─────────────────────────────────────────────────────────────────────────────

function appendToTerminal(text, className) {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const line = document.createElement('div');
  line.className = className || 'terminal-line';
  line.textContent = text || ' ';
  output.appendChild(line);
  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;
}

async function typeToTerminal(text, className, speed = 6) {
  if (!text) { appendToTerminal('', className); return; }
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const line = document.createElement('div');
  line.className = className || 'terminal-line';
  line.textContent = '';
  output.appendChild(line);
  const container = document.getElementById('terminal-container');
  for (let i = 0; i < text.length; i++) {
    line.textContent += text[i];
    if (container) container.scrollTop = container.scrollHeight;
    await wait(speed);
  }
}

async function typeIntoElement(el, text, speed = 6) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await wait(speed);
  }
}

function showTerminalInput(promptText) {
  const inputLine = document.getElementById('terminal-input-line');
  if (!inputLine) return;
  const promptEl = document.getElementById('terminal-prompt');
  if (promptEl) promptEl.textContent = promptText || '> ';
  inputLine.classList.remove('hidden');
  updateTerminalInputDisplay();
}

function hideTerminalInput() {
  const inputLine = document.getElementById('terminal-input-line');
  if (inputLine) inputLine.classList.add('hidden');
}

function updateTerminalInputDisplay() {
  const termText = document.getElementById('terminal-input-text');
  if (termText) termText.textContent = state.terminalInput;
  const boxText = document.getElementById('box-input-text');
  if (boxText) boxText.textContent = state.terminalInput;
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function rebuildTerminalLayout(preserveOutputHTML = '') {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="terminal-container" class="h-screen overflow-y-auto p-6 font-mono text-sm leading-relaxed">
      <div id="terminal-output">${preserveOutputHTML}</div>
      <div id="terminal-input-line" class="hidden terminal-line mt-1 flex items-center">
        <span id="terminal-prompt" class="text-green-400"></span><span id="terminal-input-text" class="text-green-300"></span><span class="cursor">█</span>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1: Boot sequence
// ─────────────────────────────────────────────────────────────────────────────

async function runBootSequence() {
  state.gameState = 'boot';

  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="terminal-container" class="h-screen overflow-y-auto p-6 font-mono text-sm leading-relaxed">
      <div id="terminal-output"></div>
      <div id="terminal-input-line" class="hidden terminal-line mt-1 flex items-center">
        <span id="terminal-prompt" class="text-green-400"></span><span id="terminal-input-text" class="text-green-300"></span><span class="cursor">█</span>
      </div>
    </div>
  `;

  await typeToTerminal('CAPCOM SYSTEMS INC. — LUNAR COMMUNICATIONS TERMINAL v4.2.1');
  await typeToTerminal('COPYRIGHT (C) 1984-1986 CAPCOM SYSTEMS INC.');
  appendToTerminal('');
  await typeToTerminal('BIOS CHECK.....................OK');
  await typeToTerminal('RAM: 640K      [========================================] OK');
  await typeToTerminal('VIDEO MEMORY: 256K.............OK');
  await typeToTerminal('CHECKING COMMS ARRAY.......................................OK');
  await wait(150);
  await typeToTerminal('LOADING MISSION PROTOCOL STACK.............................OK');
  await wait(200);
  await typeToTerminal('INITIALIZING LUNAR RELAY UPLINK....');
  await wait(700);

  const output = document.getElementById('terminal-output');
  const moonPre = document.createElement('pre');
  moonPre.className = 'text-green-400 my-3 text-xs leading-tight';
  moonPre.textContent = [
    '      .    *          .       *        .      *   ',
    '                            .  *                  ',
    '        .      *    ___                           ',
    '  *           __   /   \\   __          .         *',
    '      .      /  \\_/ /_\\ \\_/  \\                   ',
    '            |   _   ___   _   |    *              ',
    '            |  | | |   | | |  |              .   ',
    '       *    |  |_| |   | |_|  |                  ',
    '            \\_______________/       *             ',
    '                  [MOON]                          ',
  ].join('\n');
  output.appendChild(moonPre);
  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;
  await wait(300);

  appendToTerminal('');
  await typeToTerminal('APOLLO LUNAR COMMUNICATIONS NETWORK');
  await typeToTerminal('UPLINK ESTABLISHED: CAPCOM-VII RELAY');

  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  await typeToTerminal(`LOCAL TIME: ${timeStr}    MISSION DATE: SOL-${dayOfYear}`);

  await wait(500);
  appendToTerminal('');
  await typeToTerminal('> SYSTEM READY.');
  await wait(400);

  state.gameState = 'auth';
  await renderAuth();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2: Authentication
// ─────────────────────────────────────────────────────────────────────────────

async function renderAuth() {
  appendToTerminal('');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  await typeToTerminal('CAPCOM SECURITY PROTOCOL — LUNAR CLEARANCE VERIFICATION');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  await typeToTerminal('This terminal requires MOON_ALPHA_II clearance.');
  appendToTerminal('');
  await typeToTerminal('Confirm clearance level by entering: ALPHA', 'terminal-line font-bold');
  appendToTerminal('');
  state.authStep = 0;
  state.terminalInput = '';
  state.authBusy = false;
  showTerminalInput('> ');
}

async function handleAuthInput() {
  if (state.authBusy) return;
  state.authBusy = true;

  const input = state.terminalInput.trim();
  state.terminalInput = '';

  if (state.authStep === 0) {
    hideTerminalInput();
    updateTerminalInputDisplay();
    await typeToTerminal(`> ${input || 'ALPHA'}`);
    appendToTerminal('');

    const output = document.getElementById('terminal-output');
    const confirmedDiv = document.createElement('div');
    confirmedDiv.className = 'terminal-line text-green-300 font-bold blink-text';
    output.appendChild(confirmedDiv);
    const termContainer = document.getElementById('terminal-container');
    if (termContainer) termContainer.scrollTop = termContainer.scrollHeight;
    await typeIntoElement(confirmedDiv, 'CLEARANCE CONFIRMED.');
    await wait(2000);

    showProtocolBox();

  } else if (state.authStep === 1) {
    updateTerminalInputDisplay();

    const title = document.getElementById('box-title');
    if (title) title.textContent = 'HOW THIS WORKS';

    const footer = document.getElementById('box-footer');
    if (footer) {
      footer.innerHTML = `<div class="text-green-600 text-xs text-center w-full tracking-widest animate-pulse">PRESS ENTER TO CONTINUE</div>`;
    }

    const boxContent = document.getElementById('box-content');
    if (boxContent) boxContent.innerHTML = '';

    const rulesLines = [
      { text: "You're about to improvise a radio conversation", cls: 'text-green-400' },
      { text: "about a routine lunar mission going slightly wrong.", cls: 'text-green-400' },
      { text: '', cls: '' },
      { text: "Stay in character. Invent technical jargon.", cls: 'text-green-400' },
      { text: "You can make it up — it just needs to sound real.", cls: 'text-green-400' },
      { text: '', cls: '' },
      { text: "One player is on the moon (Primary).", cls: 'text-green-400' },
      { text: "Everyone else is on the radio (Support).", cls: 'text-green-400' },
      { text: '', cls: '' },
      { text: "Small problems are the whole game.", cls: 'text-green-300 font-bold' },
      { text: "There are no right answers. Keep talking.", cls: 'text-green-400' },
    ];

    for (const line of rulesLines) {
      const div = document.createElement('div');
      if (!line.text) { div.innerHTML = '&nbsp;'; boxContent.appendChild(div); continue; }
      div.className = line.cls;
      boxContent.appendChild(div);
      await typeIntoElement(div, line.text, 6);
      await wait(15);
    }

    state.authStep = 2;
    state.authBusy = false;

  } else if (state.authStep === 2) {
    state.callsign = generateCallsign();
    state.gameState = 'comms';
    showCapcomConnection();
  }
}

async function showProtocolBox() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="h-screen flex items-center justify-center font-mono text-sm bg-black">
      <div class="border-2 border-green-600 max-w-md w-full mx-8">
        <div id="box-title" class="border-b-2 border-green-600 p-4 text-center font-bold text-green-300 tracking-widest">
          COMMUNICATION PROTOCOL
        </div>
        <div id="box-content" class="p-6 text-green-400 text-sm leading-relaxed"></div>
        <div id="box-footer" class="border-t border-green-800 p-4 flex items-center gap-1">
          <span class="text-green-400">&gt;&nbsp;</span><span id="box-input-text" class="text-green-300"></span><span class="cursor">█</span>
        </div>
      </div>
    </div>
  `;

  const boxContent = document.getElementById('box-content');
  const protocolLines = [
    { text: 'All transmissions are logged and subject', cls: 'text-green-400' },
    { text: 'to review by CAPCOM staff.', cls: 'text-green-400' },
    { text: '', cls: '' },
    { text: 'Communications are to remain appropriate', cls: 'text-green-400' },
    { text: 'to the situation at all times.', cls: 'text-green-400' },
    { text: '', cls: '' },
    { text: 'Unauthorised use may result in mission', cls: 'text-green-400' },
    { text: 'suspension.', cls: 'text-green-400' },
    { text: '', cls: '' },
    { text: 'Enter ACK to acknowledge.', cls: 'text-green-600 text-xs' },
  ];

  for (const line of protocolLines) {
    const div = document.createElement('div');
    if (!line.text) { div.innerHTML = '&nbsp;'; boxContent.appendChild(div); continue; }
    div.className = line.cls;
    boxContent.appendChild(div);
    await typeIntoElement(div, line.text, 6);
    await wait(20);
  }

  state.authStep = 1;
  state.terminalInput = '';
  state.authBusy = false;
}

async function showCapcomConnection() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="h-screen flex items-center justify-center font-mono text-sm bg-black">
      <div class="border-2 border-green-600 max-w-md w-full mx-8">
        <div class="border-b-2 border-green-600 p-4 text-center font-bold text-green-300 tracking-widest">
          ══  CAPCOM LINK PROTOCOL v2.1  ══
        </div>
        <div id="protocol-lines" class="p-6 text-green-400 text-sm leading-relaxed"></div>
        <div class="border-t border-green-800 p-3 text-xs text-green-700 text-center">
          ALL TRANSMISSIONS LOGGED — CLEARANCE LEVEL: MOON_ALPHA_II
        </div>
      </div>
    </div>
  `;

  const protoContent = document.getElementById('protocol-lines');
  const protoLines = [
    { text: 'ESTABLISHING SECURE CHANNEL...', cls: 'text-green-400',          pause: 400 },
    { text: '',                               cls: '',                         pause: 100 },
    { text: 'ENCRYPTION ...... AES-128-LUNAR', cls: 'text-green-600 text-xs', pause: 200 },
    { text: 'PROTOCOL ........ LUNAR-TCP/2',   cls: 'text-green-600 text-xs', pause: 200 },
    { text: 'RELAY NODE ....... CAPCOM-VII',   cls: 'text-green-600 text-xs', pause: 200 },
    { text: 'HANDSHAKE ....... 3-WAY VERIFY',  cls: 'text-green-600 text-xs', pause: 200 },
    { text: 'COMPRESSION ..... DELTA-4',       cls: 'text-green-600 text-xs', pause: 400 },
    { text: '',                               cls: '',                         pause: 100 },
    { text: 'STATUS: AUTHENTICATING...',       cls: 'text-green-300 animate-pulse', pause: 0 },
  ];

  let statusDiv = null;
  for (const line of protoLines) {
    const div = document.createElement('div');
    if (!line.text) { div.innerHTML = '&nbsp;'; protoContent.appendChild(div); await wait(line.pause); continue; }
    div.className = line.cls;
    protoContent.appendChild(div);
    await typeIntoElement(div, line.text, 20);
    if (line.text.startsWith('STATUS:')) statusDiv = div;
    await wait(line.pause);
  }

  if (statusDiv) {
    await wait(600);
    statusDiv.classList.remove('animate-pulse');
    statusDiv.textContent = '';
    await typeIntoElement(statusDiv, 'STATUS: LINK ESTABLISHED', 20);
  }

  await wait(3000);

  rebuildTerminalLayout();
  renderComms();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3: Comms link
// ─────────────────────────────────────────────────────────────────────────────

async function renderComms() {
  if (state.gameState !== 'comms') return;
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');

  if (state.joinCode) {
    await typeToTerminal('CAPCOM UPLINK READY.');
    appendToTerminal('');
    await typeToTerminal('Incoming comms link detected.');
    await typeToTerminal(`Authenticating mission code: ${state.joinCode}...`);
    await wait(1200);

    const result = await joinRoom(state.joinCode);

    if (!result.success) {
      appendToTerminal('');
      await typeToTerminal(result.error, 'terminal-line text-yellow-400');
      appendToTerminal('');
      await typeToTerminal('SYSTEM HALTED. CLOSE THIS TERMINAL TO EXIT.');
      return;
    }

    appendToTerminal('');
    await typeToTerminal('AUTHENTICATION CONFIRMED.');
    await typeToTerminal('Patching into active mission link...');
    await wait(600);

    renderAwaiting();
  } else {
    await typeToTerminal('CAPCOM UPLINK READY.');
    appendToTerminal('');
    await typeToTerminal('No active mission link detected.');
    appendToTerminal('');
    await typeToTerminal('Establish new comms link? [Y/N]');
    appendToTerminal('');
    showTerminalInput('> ');
  }
}

async function acceptCommsPrompt() {
  hideTerminalInput();
  await typeToTerminal('> Y');
  appendToTerminal('');
  await typeToTerminal('GENERATING SECURE COMMS CODE...');
  await wait(600);

  await createRoom();

  const currentOutputHTML = document.getElementById('terminal-output').innerHTML;
  const app = document.getElementById('app');

  // Build split layout — panel starts off-screen, buttons start invisible
  app.innerHTML = `
    <div class="flex h-screen overflow-hidden">
      <div id="terminal-container" class="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed">
        <div id="terminal-output">${currentOutputHTML}</div>
        <div id="terminal-input-line" class="hidden terminal-line mt-1 flex items-center">
          <span id="terminal-prompt" class="text-green-400"></span><span id="terminal-input-text" class="text-green-300"></span><span class="cursor">█</span>
        </div>
      </div>

      <div id="comms-panel" class="w-72 border-l-2 border-green-800 flex flex-col font-mono text-sm bg-black flex-shrink-0"
           style="transform: translateX(100%);">
        <div class="border-b border-green-800 p-3 text-green-600 text-xs tracking-widest font-bold">
          ── MISSION COMMS LINK ──
        </div>
        <div class="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
          <div class="text-green-700 text-xs leading-relaxed mb-2">
            Transmit this access code to<br>
            all incoming crew. Authenticate<br>
            before sharing. Do not broadcast<br>
            on open channels.
          </div>

          <button id="btn-com1" style="opacity:0;"
                  class="text-yellow-400 border border-yellow-800 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-yellow-950 transition">
            [&nbsp;COM-1&nbsp;]&nbsp;&nbsp;UPLINK CHANNEL
          </button>
          <button id="btn-com2" style="opacity:0;"
                  class="text-yellow-400 border border-yellow-800 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-yellow-950 transition">
            [&nbsp;COM-2&nbsp;]&nbsp;&nbsp;SIGNAL VERIFY
          </button>
          <button id="btn-sec1" style="opacity:0;"
                  class="text-yellow-400 border border-yellow-800 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-yellow-950 transition">
            [&nbsp;SEC-1&nbsp;]&nbsp;&nbsp;ENCRYPT LOCK
          </button>

          <div id="btn-code" style="opacity:0; cursor:pointer;"
               onclick="copyLink('btn-code')"
               class="border-2 border-green-600 p-4 my-1 text-center hover:border-green-400 transition-colors">
            <div class="text-xs text-green-600 mb-2 tracking-widest">── COMMS CODE ──</div>
            <div id="comms-code-display" class="text-xl font-bold text-green-300 tracking-widest">${escapeHtml(state.roomCode)}</div>
            <div class="text-xs text-green-800 mt-1">CLICK TO COPY</div>
          </div>

          <button id="btn-copy" style="opacity:0;"
                  onclick="copyLink('btn-copy')"
                  class="text-green-400 border border-green-700 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-green-950 transition">
            [&nbsp;COPY&nbsp;&nbsp;]&nbsp;&nbsp;SHARE UPLINK
          </button>
          <button id="btn-pwd1" style="opacity:0;"
                  class="text-yellow-400 border border-yellow-800 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-yellow-950 transition">
            [&nbsp;PWD-1&nbsp;]&nbsp;&nbsp;AUTH TOKEN
          </button>
          <button id="btn-pwd2" style="opacity:0;"
                  class="text-yellow-400 border border-yellow-800 px-3 py-1.5 text-xs text-left font-mono tracking-wide hover:bg-yellow-950 transition">
            [&nbsp;PWD-2&nbsp;]&nbsp;&nbsp;CLEARANCE VRF
          </button>
        </div>
        <div class="border-t border-green-800 p-3 text-xs text-green-800 text-center">
          CAPCOM-VII RELAY ACTIVE
        </div>
      </div>
    </div>
  `;

  // Slide panel in
  await wait(80);
  const panel = document.getElementById('comms-panel');
  if (panel) {
    panel.style.transition = 'transform 0.45s ease-out';
    panel.style.transform = 'translateX(0)';
  }
  await wait(500);

  // Reveal panel items top to bottom
  const panelItemIds = ['btn-com1', 'btn-com2', 'btn-sec1', 'btn-code', 'btn-copy', 'btn-pwd1', 'btn-pwd2'];
  for (const id of panelItemIds) {
    const el = document.getElementById(id);
    if (el) {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '1';
    }
    await wait(1000);
  }

  await wait(200);

  // Type terminal messages + inline copy button
  await typeToTerminal('LINK ESTABLISHED.');
  appendToTerminal('');

  const output = document.getElementById('terminal-output');
  const codeEl = document.createElement('div');
  codeEl.className = 'terminal-line';
  codeEl.innerHTML = `MISSION COMMS CODE: <span class="font-bold text-green-300">${escapeHtml(state.roomCode)}</span>&nbsp;&nbsp;<button onclick="copyLink('copy-inline')" id="copy-inline" class="font-mono text-xs border border-green-600 px-2 py-0.5 hover:bg-green-900 transition">[COPY LINK]</button>`;
  output.appendChild(codeEl);
  const termContainer = document.getElementById('terminal-container');
  if (termContainer) termContainer.scrollTop = termContainer.scrollHeight;

  appendToTerminal('');
  await typeToTerminal('Share this code with your crew to establish comms.');
  appendToTerminal('');

  renderAwaiting();
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel button light-up (called when a second player connects)
// ─────────────────────────────────────────────────────────────────────────────

async function lightUpPanelButtons() {
  const items = [
    { id: 'btn-com1', type: 'yellow' },
    { id: 'btn-com2', type: 'yellow' },
    { id: 'btn-sec1', type: 'yellow' },
    { id: 'btn-code', type: 'code'   },
    { id: 'btn-copy', type: 'green'  },
    { id: 'btn-pwd1', type: 'yellow' },
    { id: 'btn-pwd2', type: 'yellow' },
  ];

  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    el.style.transition = 'all 0.25s ease';
    if (item.type === 'yellow') {
      el.style.backgroundColor = '#eab308';
      el.style.borderColor     = '#eab308';
      el.style.color           = '#000';
    } else if (item.type === 'green') {
      el.style.backgroundColor = '#4ade80';
      el.style.borderColor     = '#4ade80';
      el.style.color           = '#000';
    } else if (item.type === 'code') {
      el.style.borderColor = '#4ade80';
    }
    await wait(1000);
  }
  await wait(500);
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4: Awaiting crew
// ─────────────────────────────────────────────────────────────────────────────

async function handleIncomingConnection() {
  const awaitEl = document.getElementById('awaiting-indicator');
  if (awaitEl) awaitEl.remove();

  const hasPanelButtons = !!document.getElementById('btn-com1');
  if (hasPanelButtons) {
    let blinkOn = true;
    const blinkInterval = setInterval(() => {
      ['btn-com1', 'btn-com2'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.transition  = 'border-color 0.15s, color 0.15s';
        el.style.borderColor = blinkOn ? '#eab308' : '#422006';
        el.style.color       = blinkOn ? '#fbbf24' : '#78350f';
      });
      blinkOn = !blinkOn;
    }, 350);

    appendToTerminal('');
    await typeToTerminal('RECEIVING COMMUNICATIONS...');
    await wait(800);
    await typeToTerminal('ESTABLISHING INBOUND UPLINK...');
    await wait(1400);

    clearInterval(blinkInterval);
    ['btn-com1', 'btn-com2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.style.transition = ''; el.style.borderColor = ''; el.style.color = ''; }
    });
  }

  handleCrewAssembled();
}

function renderAwaiting() {
  state.awaitingDisplayed = true;

  if (state.players.length >= 2 && !state.crewAssembled) {
    state.crewAssembled = true;
    handleIncomingConnection();
    return;
  }

  appendToTerminal('');
  const output = document.getElementById('terminal-output');
  const awaitEl = document.createElement('div');
  awaitEl.id = 'awaiting-indicator';
  awaitEl.className = 'terminal-line text-green-600 animate-pulse';
  awaitEl.textContent = state.joinCode ? 'STANDING BY FOR MISSION BRIEF...' : 'AWAITING CREW SIGNAL...';
  output.appendChild(awaitEl);

  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;
}

async function handleCrewAssembled() {
  const awaitEl = document.getElementById('awaiting-indicator');
  if (awaitEl) awaitEl.remove();

  // Light up panel buttons if they exist (host path only)
  await lightUpPanelButtons();

  appendToTerminal('');
  await typeToTerminal('CREW SIGNAL CONFIRMED.');
  await typeToTerminal(`LINK ESTABLISHED — ${state.players.length} CREW CONNECTED.`);
  appendToTerminal('');
  await typeToTerminal('INITIATING MISSION BRIEF...');

  await wait(800);
  state.gameState = 'scene';
  renderScene();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5: Scene setting
// ─────────────────────────────────────────────────────────────────────────────

async function renderScene() {
  appendToTerminal('');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');

  const callsignEl = document.createElement('div');
  callsignEl.className = 'terminal-line font-bold text-green-300';
  document.getElementById('terminal-output').appendChild(callsignEl);
  await typeIntoElement(callsignEl, `CALLSIGN ASSIGNED: ${state.callsign}`);
  await typeToTerminal(`ROLE: ${getRoleLabel(state.playerRole, state.selectedScenario)}`, 'terminal-line text-green-600 text-xs');

  appendToTerminal('');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  await typeToTerminal('Ready to establish contact?');
  appendToTerminal('');

  state.terminalInput = '';
  showTerminalInput('Enter: ACK > ');
}

async function handleSceneInput() {
  const input = state.terminalInput.trim();
  state.terminalInput = '';
  hideTerminalInput();

  await typeToTerminal(`Enter: ACK > ${input}`);
  appendToTerminal('');
  await typeToTerminal('LOGGED.');
  appendToTerminal('');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  await typeToTerminal('COMMS FULLY ESTABLISHED. ALL CREW CONNECTED.');
  appendToTerminal('');
  await typeToTerminal('BEGIN TRANSMISSION.');
  await typeToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');

  setTimeout(() => {
    state.gameState = 'playing';
    lastRenderedMessageCount = -1;
    transmissionRendered = false;
    render();
  }, 1200);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main render
// ─────────────────────────────────────────────────────────────────────────────

function render() {
  const nonRenderStates = ['boot', 'auth', 'comms', 'connecting', 'halted'];
  if (nonRenderStates.includes(state.gameState)) return;

  if (state.gameState === 'awaiting') {
    if (state.awaitingDisplayed && state.players.length >= 2 && !state.crewAssembled) {
      state.crewAssembled = true;
      handleIncomingConnection();
    }
    return;
  }

  if (state.gameState === 'scene') return;

  if (state.gameState === 'playing') {
    if (!document.getElementById('terminal')) {
      const roleContext = escapeHtml(getPlayerBriefing(state.playerRole, state.selectedScenario).context || '');
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="flex flex-col h-screen">
          <div class="border-b-2 border-green-400 p-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="font-bold">APOLLO 47 — ${escapeHtml(state.roomCode)}</div>
                    <button onclick="copyRoomCode()" id="copyButton" class="text-xs border border-green-400 px-2 py-1 hover:bg-green-400 hover:text-black transition">
                      COPY LINK
                    </button>
                  </div>

                  ${state.players.length === 1 ? `
                    <div class="text-sm text-yellow-400 animate-pulse flex-1 text-center">
                      ⚠ SUPPORT REQUESTED...AWAITING RESPONSE...
                    </div>
                  ` : `<div class="flex-1"></div>`}

                  ${state.scenarioDropped
                    ? `<button onclick="togglePrompts()" id="mission-data-btn" class="text-sm border-2 border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition font-bold animate-pulse">
                         MISSION DATA RECEIVED
                       </button>`
                    : `<span class="text-xs text-green-600 font-mono">MISSION DATA PENDING...</span>`
                  }
                </div>

                <div class="text-sm text-green-600">
                  ${escapeHtml(state.callsign)} / ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}
                  ${state.scenarioDropped ? ` — ${escapeHtml(state.selectedScenario?.title || '')}` : ''}
                </div>
              </div>
            </div>
          </div>

          <div id="context-panel" class="border-b border-green-800 px-4 pt-2 pb-3 font-mono text-xs">
            <div class="font-bold text-green-300 tracking-wider mb-1">${escapeHtml(state.callsign)} // ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}</div>
            <div class="text-green-600 leading-relaxed">${roleContext}</div>
          </div>

          <div id="terminal" class="flex-1 overflow-y-auto p-4 font-mono">
            <div id="messages"></div>
            <div id="typingIndicator"></div>
            <div id="inputLine" class="terminal-line text-green-300">
              <span>[${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}]: </span><span id="inputText"></span><span class="cursor">█</span>
            </div>
          </div>

          <div id="promptOverlay" class="hidden fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div class="bg-black border-2 border-green-400 w-full max-w-2xl max-h-[80vh] flex flex-col">
              <div class="border-b-2 border-green-400 p-4">
                <div class="flex justify-between items-start mb-2">
                  <div class="font-bold text-green-400 text-xl">MISSION REFERENCE</div>
                  <button onclick="togglePrompts()" class="text-green-400 hover:text-green-300 text-2xl leading-none">×</button>
                </div>
                <div class="text-xs text-green-600">
                  Reference material for your current mission. Keep transmissions brief.
                </div>
              </div>

              <div class="border-b-2 border-green-400 flex">
                <button onclick="switchPromptCategory('briefing')" id="tab-briefing" class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">YOUR BRIEFING</button>
                <button onclick="switchPromptCategory('generic')"  id="tab-generic"  class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">GENERIC JARGON</button>
                <button onclick="switchPromptCategory('things')"   id="tab-things"   class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">THINGS</button>
                <button onclick="switchPromptCategory('protocol')" id="tab-protocol" class="flex-1 p-3 text-sm hover:bg-green-900 transition">PROTOCOL</button>
              </div>

              <div class="flex-1 overflow-y-auto p-4">
                <div id="promptContent"></div>
              </div>

              <div class="border-t-2 border-green-400 p-4">
                <button onclick="refreshPrompts()" class="w-full border-2 border-green-400 py-2 hover:bg-green-400 hover:text-black transition">↻ REFRESH</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      updatePlayingHeader();
    }

    renderMessages();
    setupInput();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Playing screen helpers
// ─────────────────────────────────────────────────────────────────────────────

function appendPendingMessage(text) {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;
  const el = document.createElement('div');
  el.className = 'terminal-line text-green-300';
  el.dataset.pendingMessage = 'true';
  el.textContent = `[${getRoleLabel(state.playerRole, state.selectedScenario)}]: ${text}`;
  messagesDiv.appendChild(el);
  scrollToBottom();
}

function renderMessages() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;

  messagesDiv.querySelectorAll('[data-pending-message]').forEach(el => el.remove());

  const visibleMessages = state.messages.filter(msg => {
    if (!msg.visibility || msg.visibility === 'all') return true;
    if (msg.visibility === 'primary') return isPrimaryRole();
    if (msg.visibility === 'support') return isSupport();
    return true;
  });

  const previousCount = lastRenderedMessageCount;
  const currentCount = visibleMessages.length;

  if (previousCount < 0) {
    messagesDiv.innerHTML = visibleMessages.map(msg => formatMessage(msg)).join('');
    lastRenderedMessageCount = currentCount;
    scrollToBottom();
    return;
  }

  if (currentCount > previousCount) {
    visibleMessages.slice(previousCount).forEach((msg) => {
      if (msg.type === 'transmission') { renderTransmission(messagesDiv, msg); return; }
      const el = document.createElement('div');
      el.className = 'terminal-line';
      const formatted = formatMessage(msg);
      messagesDiv.appendChild(el);
      if (msg.role !== state.playerRole) {
        animateMessage(el, formatted, 50);
      } else {
        el.outerHTML = formatted;
        scrollToBottom();
      }
    });
    lastRenderedMessageCount = currentCount;
  }

  scrollToBottom();
  if (state.sendStatus) updateSendStatusDisplay();
}

function renderTransmission(messagesDiv, msg) {
  if (transmissionRendered) return;
  transmissionRendered = true;
  const incomingEl = document.createElement('div');
  incomingEl.className = 'terminal-line text-green-400 animate-pulse';
  incomingEl.textContent = '> INCOMING PRIORITY TRANSMISSION...';
  messagesDiv.appendChild(incomingEl);
  scrollToBottom();
  setTimeout(() => {
    incomingEl.remove();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = formatMessage(msg);
    messagesDiv.appendChild(wrapper);
    scrollToBottom();
    updatePlayingHeader();
  }, 3000);
}

function formatMessage(msg) {
  if (msg.type === 'system')   return `<div class="terminal-line text-green-600">&gt; ${escapeHtml(msg.text)}</div>`;
  if (msg.type === 'scenario') return `<div class="terminal-line text-green-600">&gt; MISSION: ${escapeHtml(msg.text)}</div>`;
  if (msg.type === 'transmission') {
    const d = '────────────────────────────────────────────────────';
    return `<div class="terminal-line space-y-1 my-2">
      <div class="text-green-600">${d}</div>
      <div class="font-bold">PRIORITY TRANSMISSION — CAPCOM</div>
      <div class="text-green-600">${d}</div>
      <div class="my-2">${escapeHtml(msg.text)}</div>
      <div class="text-green-600">${d}</div>
      <div class="text-green-600">END TRANSMISSION</div>
      <div class="text-green-600">${d}</div>
    </div>`;
  }
  if (msg.type === 'message') {
    const label = escapeHtml(getRoleLabel(msg.role, state.selectedScenario));
    return msg.role === state.playerRole
      ? `<div class="terminal-line text-green-300" data-own-message="true">[${label}]: ${escapeHtml(msg.text)}</div>`
      : `<div class="terminal-line">[${label}]: ${escapeHtml(msg.text)}</div>`;
  }
  return '';
}

function animateMessage(element, htmlContent, speed = 20) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const textToAnimate = tempDiv.textContent || tempDiv.innerText;
  let rolePrefix = '';
  let messageText = textToAnimate;
  if (htmlContent.includes('[') && textToAnimate.includes(']:')) {
    const splitPoint = textToAnimate.indexOf(']:') + 2;
    rolePrefix = textToAnimate.substring(0, splitPoint);
    messageText = textToAnimate.substring(splitPoint);
  }
  element.textContent = rolePrefix;
  let index = 0;
  const interval = setInterval(() => {
    if (index < messageText.length) {
      element.textContent = rolePrefix + messageText.substring(0, index + 1);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, speed);
}

function scrollToBottom() {
  const terminal = document.getElementById('terminal');
  if (terminal) terminal.scrollTop = terminal.scrollHeight;
}

function setupInput() {
  const inputText = document.getElementById('inputText');
  if (!inputText) return;
  inputText.textContent = state.inputMessage;
  renderTypingIndicator();
}

function renderTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (!indicator) return;
  if (state.typingPlayers.length > 0) {
    const roles = state.typingPlayers.map(role => `[${escapeHtml(getRoleLabel(role, state.selectedScenario))}]`).join('');
    indicator.innerHTML = `<div class="terminal-line text-green-600 typing-dots">${roles}<span class="dots">...</span></div>`;
  } else {
    indicator.innerHTML = '';
  }
}

function updateSendStatusDisplay() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;
  const ownMessages = messagesDiv.querySelectorAll('[data-own-message="true"]');
  const target = messagesDiv.querySelector('[data-pending-message]') || ownMessages[ownMessages.length - 1];
  if (!target) return;
  const existing = target.querySelector('.send-status');
  if (existing) existing.remove();
  if (!state.sendStatus) return;
  const tag = document.createElement('span');
  tag.className = 'send-status text-green-600';
  tag.textContent = state.sendStatus === 'sending' ? ' [sending...]' : ' [sent ✓]';
  target.appendChild(tag);
  const inputLine = document.getElementById('inputLine');
  if (inputLine) inputLine.style.visibility = state.sendStatus === 'sending' ? 'hidden' : 'visible';
}

function updatePlayingHeader() {
  const headerDiv = document.querySelector('.border-b-2.border-green-400');
  if (!headerDiv) return;
  headerDiv.innerHTML = `
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="font-bold">APOLLO 47 — ${escapeHtml(state.roomCode)}</div>
            <button onclick="copyRoomCode()" id="copyButton" class="text-xs border border-green-400 px-2 py-1 hover:bg-green-400 hover:text-black transition">COPY LINK</button>
          </div>

          ${state.players.length === 1
            ? `<div class="text-sm text-yellow-400 animate-pulse flex-1 text-center">⚠ SUPPORT REQUESTED...AWAITING RESPONSE...</div>`
            : `<div class="flex-1"></div>`}

          ${state.scenarioDropped
            ? `<button onclick="togglePrompts()" id="mission-data-btn" class="text-sm border-2 border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition font-bold">MISSION DATA RECEIVED</button>`
            : `<span class="text-xs text-green-600 font-mono">MISSION DATA PENDING...</span>`}
        </div>

        <div class="text-sm text-green-600">
          ${escapeHtml(state.callsign)} / ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}
          ${state.scenarioDropped ? ` — ${escapeHtml(state.selectedScenario?.title || '')}` : ''}
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard input
// ─────────────────────────────────────────────────────────────────────────────

function handleKeydown(e) {
  if (state.gameState === 'auth') {
    if (state.authBusy) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAuthInput();
    } else if (state.authStep !== 2) {
      if (e.key === 'Backspace') {
        e.preventDefault();
        state.terminalInput = state.terminalInput.slice(0, -1);
        updateTerminalInputDisplay();
      } else if (e.key.length === 1) {
        e.preventDefault();
        state.terminalInput += e.key.toUpperCase();
        updateTerminalInputDisplay();
      }
    }
    return;
  }

  if (state.gameState === 'comms' && !state.joinCode) {
    if (e.key === 'y' || e.key === 'Y') {
      e.preventDefault();
      state.gameState = 'connecting';
      acceptCommsPrompt();
    } else if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      hideTerminalInput();
      appendToTerminal('> N');
      appendToTerminal('');
      appendToTerminal('LINK ABORTED. CLOSE THIS TERMINAL TO EXIT.');
      state.gameState = 'halted';
    }
    return;
  }

  if (state.gameState === 'scene') {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (state.terminalInput.trim().length > 0) {
        state.gameState = 'connecting';
        handleSceneInput();
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      state.terminalInput = state.terminalInput.slice(0, -1);
      updateTerminalInputDisplay();
    } else if (e.key.length === 1) {
      e.preventDefault();
      state.terminalInput += e.key.toUpperCase();
      updateTerminalInputDisplay();
    }
    return;
  }

  if (state.gameState !== 'playing') return;
  if (state.sendStatus === 'sending') return;
  const inputText = document.getElementById('inputText');
  if (!inputText) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === 'Enter') {
    e.preventDefault();
    const messageText = state.inputMessage.trim();
    if (messageText) appendPendingMessage(messageText);
    sendMessage();
    inputText.textContent = '';
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    state.inputMessage = state.inputMessage.slice(0, -1);
    inputText.textContent = state.inputMessage;
    updateTypingStatus(state.inputMessage.length > 0);
  } else if (e.key.length === 1) {
    e.preventDefault();
    state.inputMessage += e.key;
    inputText.textContent = state.inputMessage;
    updateTypingStatus(true);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Window-level functions
// ─────────────────────────────────────────────────────────────────────────────

window.copyLink = async (buttonId) => {
  const joinUrl = `${window.location.origin}${window.location.pathname}?code=${state.roomCode}`;
  try {
    await navigator.clipboard.writeText(joinUrl);
    if (buttonId === 'btn-code') {
      const display = document.getElementById('comms-code-display');
      if (display) {
        const orig = display.textContent;
        display.textContent = 'LINK COPIED';
        setTimeout(() => { display.textContent = orig; }, 1500);
      }
    } else if (buttonId) {
      const btn = document.getElementById(buttonId);
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = buttonId === 'copy-inline' ? '[COPIED!]' : '[ COPIED! ]';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      }
    }
  } catch {
    const btn = buttonId ? document.getElementById(buttonId) : null;
    if (btn) { btn.textContent = '[ERROR]'; setTimeout(() => location.reload(), 1500); }
  }
};

window.copyRoomCode = async () => {
  const button = document.getElementById('copyButton');
  if (!button) return;
  const joinUrl = `${window.location.origin}${window.location.pathname}?code=${state.roomCode}`;
  try {
    await navigator.clipboard.writeText(joinUrl);
    const orig = button.textContent;
    button.textContent = 'COPIED!';
    setTimeout(() => { button.textContent = orig; }, 1500);
  } catch {
    button.textContent = 'ERROR';
    setTimeout(() => { button.textContent = 'COPY LINK'; }, 1500);
  }
};

window.togglePrompts = () => {
  const overlay = document.getElementById('promptOverlay');
  if (!overlay) return;
  const btn = document.getElementById('mission-data-btn');
  if (btn) btn.classList.remove('animate-pulse');
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    currentPromptCategory = 'briefing';
    refreshPrompts();
  } else {
    overlay.classList.add('hidden');
  }
};

window.switchPromptCategory = (category) => {
  currentPromptCategory = category;
  ['briefing', 'generic', 'things', 'protocol'].forEach(cat => {
    const tab = document.getElementById(`tab-${cat}`);
    if (tab) tab.classList.toggle('bg-green-900', cat === category);
  });
  refreshPrompts();
};

window.refreshPrompts = refreshPrompts;

function refreshPrompts() {
  const content = document.getElementById('promptContent');
  if (!content) return;

  if (currentPromptCategory === 'briefing') {
    const roleData = getPlayerBriefing(state.playerRole, state.selectedScenario);
    content.innerHTML = `
      <div class="space-y-4">
        <div>
          <div class="text-sm text-green-400 mb-2">YOUR ROLE:</div>
          <div class="text-lg font-bold mb-3">${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}</div>
        </div>
        <div>
          <div class="text-sm text-green-400 mb-2">WHERE YOU ARE:</div>
          <div class="text-sm">${escapeHtml(roleData.context || 'Preparing for mission...')}</div>
        </div>
        <div>
          <div class="text-sm text-green-400 mb-2">YOUR OBJECTIVE:</div>
          <div class="text-sm">${escapeHtml(roleData.briefing || 'Awaiting mission briefing...')}</div>
        </div>
        <div class="border-t border-green-600 pt-4">
          <div class="text-sm text-green-400 mb-2">TECHNICAL REFERENCE:</div>
          <div class="text-sm space-y-1">
            ${state.selectedScenario?.technicalDetails
              ? state.selectedScenario.technicalDetails.map(d => `<div>• ${escapeHtml(d)}</div>`).join('')
              : '<div>No technical details available</div>'}
          </div>
        </div>
      </div>`;
  }

  if (currentPromptCategory === 'generic') {
    const verbs = getRandomItems(MOON_VERBS, 10);
    const adjectives = getRandomItems(EQUIPMENT_ADJECTIVES, 10);
    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">Combine these to create authentic-sounding technical jargon:</div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div class="text-sm text-green-400 mb-2">VERBS</div>
          <div class="text-sm space-y-1">${verbs.map(v => `<div class="text-green-500">${v}</div>`).join('')}</div>
        </div>
        <div>
          <div class="text-sm text-green-400 mb-2">ADJECTIVES</div>
          <div class="text-sm space-y-1">${adjectives.map(a => `<div class="text-green-500">${a}</div>`).join('')}</div>
        </div>
      </div>
      <div class="text-xs text-green-600 mt-4 italic">Example: "Degauss the auxiliary relay" or "Recalibrate the omnidirectional sensor"</div>`;
  } else if (currentPromptCategory === 'things') {
    const items = getRandomFromCategory(THINGS, 15);
    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">Physical objects, equipment, and structures you might reference:</div>
      <div class="text-sm space-y-1">${items.map(i => `<div class="text-green-500">${i}</div>`).join('')}</div>`;
  } else if (currentPromptCategory === 'protocol') {
    const items = getRandomFromCategory(PROTOCOL, 15);
    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">Radio communication phrases and problem descriptions:</div>
      <div class="text-sm space-y-1">${items.map(i => `<div class="text-green-500">${i}</div>`).join('')}</div>`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('keydown', handleKeydown);

const urlParams = new URLSearchParams(window.location.search);
const joinCode = urlParams.get('code');
if (joinCode) state.joinCode = joinCode.trim().toUpperCase();

runBootSequence();
