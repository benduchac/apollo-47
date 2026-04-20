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
// Terminal helpers (used by boot/auth/comms/awaiting/scene phases)
// ─────────────────────────────────────────────────────────────────────────────

function appendToTerminal(text, className) {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const line = document.createElement('div');
  line.className = className || 'terminal-line';
  // Empty lines need a non-breaking space so the div has height
  line.textContent = text || '\u00A0';
  output.appendChild(line);
  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;
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
  const inputText = document.getElementById('terminal-input-text');
  if (inputText) inputText.textContent = state.terminalInput;
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1: Boot sequence
// ─────────────────────────────────────────────────────────────────────────────

async function runBootSequence() {
  state.gameState = 'boot';

  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="terminal-container" class="min-h-screen p-6 font-mono text-sm overflow-y-auto leading-relaxed">
      <div id="terminal-output"></div>
      <div id="terminal-input-line" class="hidden terminal-line mt-1 flex items-center">
        <span id="terminal-prompt" class="text-green-400"></span><span id="terminal-input-text" class="text-green-300"></span><span class="cursor">█</span>
      </div>
    </div>
  `;

  appendToTerminal('CAPCOM SYSTEMS INC. — LUNAR COMMUNICATIONS TERMINAL v4.2.1');
  appendToTerminal('COPYRIGHT (C) 1984-1986 CAPCOM SYSTEMS INC.');
  await wait(300);
  appendToTerminal('');
  appendToTerminal('BIOS CHECK.....................OK');
  await wait(180);
  appendToTerminal('RAM: 640K      [========================================] OK');
  await wait(220);
  appendToTerminal('VIDEO MEMORY: 256K.............OK');
  await wait(180);
  appendToTerminal('CHECKING COMMS ARRAY.......................................OK');
  await wait(350);
  appendToTerminal('LOADING MISSION PROTOCOL STACK.............................OK');
  await wait(450);
  appendToTerminal('INITIALIZING LUNAR RELAY UPLINK....');
  await wait(1100);

  // ASCII moon art
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
  await wait(500);

  appendToTerminal('');
  appendToTerminal('APOLLO LUNAR COMMUNICATIONS NETWORK');
  await wait(200);
  appendToTerminal('UPLINK ESTABLISHED: CAPCOM-VII RELAY');
  await wait(200);

  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  appendToTerminal(`LOCAL TIME: ${timeStr}    MISSION DATE: SOL-${dayOfYear}`);

  await wait(900);
  appendToTerminal('');
  appendToTerminal('> SYSTEM READY.');
  await wait(700);

  state.gameState = 'auth';
  renderAuth();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2: Authentication
// ─────────────────────────────────────────────────────────────────────────────

function renderAuth() {
  appendToTerminal('');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('CAPCOM SECURITY PROTOCOL — LUNAR CLEARANCE VERIFICATION', 'terminal-line');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  appendToTerminal('This terminal requires MOON_ALPHA_II clearance.');
  appendToTerminal('');
  appendToTerminal('Confirm clearance level by entering: ALPHA');
  appendToTerminal('');
  state.authStep = 0;
  state.terminalInput = '';
  showTerminalInput('> ');
}

function handleAuthInput() {
  const input = state.terminalInput.trim();
  state.terminalInput = '';
  hideTerminalInput();

  if (state.authStep === 0) {
    appendToTerminal(`> ${input || 'ALPHA'}`);
    appendToTerminal('');
    appendToTerminal('CLEARANCE CONFIRMED.');
    appendToTerminal('');
    appendToTerminal('COMMUNICATION PROTOCOL REMINDER:');
    appendToTerminal('All transmissions are logged and subject to review.');
    appendToTerminal('Comms are to remain appropriate to the situation at all times.');
    appendToTerminal('');
    appendToTerminal('Confirm acknowledgement by entering: ACK');
    appendToTerminal('');
    state.authStep = 1;
    showTerminalInput('> ');
  } else if (state.authStep === 1) {
    appendToTerminal(`> ${input || 'ACK'}`);
    appendToTerminal('');
    appendToTerminal('LOGGED. PROCEEDING.');

    // Assign callsign
    state.callsign = generateCallsign();
    appendToTerminal('');
    appendToTerminal(`CALLSIGN ASSIGNED: ${state.callsign}`);
    appendToTerminal('');

    state.gameState = 'comms';
    setTimeout(() => renderComms(), 900);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3: Comms link
// ─────────────────────────────────────────────────────────────────────────────

async function renderComms() {
  if (state.gameState !== 'comms') return;
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');

  if (state.joinCode) {
    // JOIN PATH — auto-connect
    appendToTerminal('CAPCOM UPLINK READY.');
    appendToTerminal('');
    appendToTerminal('Incoming comms link detected.');
    appendToTerminal(`Authenticating mission code: ${state.joinCode}...`);
    await wait(1200);

    const result = await joinRoom(state.joinCode);

    if (!result.success) {
      appendToTerminal('');
      appendToTerminal(result.error, 'terminal-line text-yellow-400');
      appendToTerminal('');
      appendToTerminal('SYSTEM HALTED. CLOSE THIS TERMINAL TO EXIT.');
      return;
    }

    appendToTerminal('');
    appendToTerminal('AUTHENTICATION CONFIRMED.');
    appendToTerminal('Patching into active mission link...');
    await wait(800);

    renderAwaiting();
  } else {
    // HOST PATH — prompt for Y/N
    appendToTerminal('CAPCOM UPLINK READY.');
    appendToTerminal('');
    appendToTerminal('No active mission link detected.');
    appendToTerminal('');
    appendToTerminal('Establish new comms link? [Y/N]');
    appendToTerminal('');
    showTerminalInput('> ');
  }
}

async function acceptCommsPrompt() {
  hideTerminalInput();
  appendToTerminal('> Y');
  appendToTerminal('');
  appendToTerminal('GENERATING SECURE COMMS CODE...');
  await wait(600);

  await createRoom();

  appendToTerminal('LINK ESTABLISHED.');
  appendToTerminal('');

  // Show room code with copy button
  const output = document.getElementById('terminal-output');
  const codeEl = document.createElement('div');
  codeEl.className = 'terminal-line my-1';
  codeEl.innerHTML = `MISSION COMMS CODE: <span class="font-bold text-green-300">${escapeHtml(state.roomCode)}</span>  <button onclick="copyRoomCodeTerminal()" id="copyButtonTerminal" class="text-xs border border-green-600 px-2 py-0.5 hover:bg-green-900 transition ml-2 font-mono">[COPY LINK]</button>`;
  output.appendChild(codeEl);
  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;

  appendToTerminal('');
  appendToTerminal('Share this link with your crew to establish comms.');
  appendToTerminal('');

  renderAwaiting();
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4: Awaiting crew
// ─────────────────────────────────────────────────────────────────────────────

function renderAwaiting() {
  state.awaitingDisplayed = true;

  // If crew is already at 2+ when we arrive (late joiner), skip straight to transition
  if (state.players.length >= 2 && !state.crewAssembled) {
    state.crewAssembled = true;
    appendToTerminal('');
    appendToTerminal(`CREW SIGNAL CONFIRMED.`);
    appendToTerminal(`LINK ESTABLISHED — ${state.players.length} CREW CONNECTED.`);
    appendToTerminal('');
    appendToTerminal('INITIATING MISSION BRIEF...');
    setTimeout(() => {
      state.gameState = 'scene';
      renderScene();
    }, 2000);
    return;
  }

  // Show waiting state
  appendToTerminal('');
  if (!state.joinCode) {
    // Host
    const output = document.getElementById('terminal-output');
    const awaitEl = document.createElement('div');
    awaitEl.id = 'awaiting-indicator';
    awaitEl.className = 'terminal-line text-green-600 animate-pulse';
    awaitEl.textContent = 'AWAITING CREW SIGNAL...';
    output.appendChild(awaitEl);
  } else {
    // Joiner
    const output = document.getElementById('terminal-output');
    const awaitEl = document.createElement('div');
    awaitEl.id = 'awaiting-indicator';
    awaitEl.className = 'terminal-line text-green-600 animate-pulse';
    awaitEl.textContent = 'STANDING BY FOR MISSION BRIEF...';
    output.appendChild(awaitEl);
  }

  const container = document.getElementById('terminal-container');
  if (container) container.scrollTop = container.scrollHeight;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5: Scene setting
// ─────────────────────────────────────────────────────────────────────────────

function renderScene() {
  const roleData = getPlayerBriefing(state.playerRole, state.selectedScenario);
  const contextText = roleData.context || 'You are preparing for the mission.';

  appendToTerminal('');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  appendToTerminal('MISSION BRIEF');
  appendToTerminal(`${state.callsign} / ${getRoleLabel(state.playerRole, state.selectedScenario)}`, 'terminal-line text-green-600 text-xs');
  appendToTerminal('');

  // Context prose — split on sentence boundaries for terminal readability
  contextText.split(/(?<=[.!?])\s+/).forEach(sentence => appendToTerminal(sentence));

  appendToTerminal('');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  appendToTerminal('You are about to improvise a space mission.');
  appendToTerminal('');
  appendToTerminal("There are no right answers. Technical jargon you");
  appendToTerminal("invent is as valid as anything NASA ever wrote.");
  appendToTerminal("Small problems are the whole game. When something");
  appendToTerminal("doesn't make sense, talk through it and keep going.");
  appendToTerminal('');
  appendToTerminal('Your crew will support you. You will support them.');
  appendToTerminal('');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('');
  appendToTerminal('Ready to establish contact?');
  appendToTerminal('');

  state.terminalInput = '';
  showTerminalInput('Enter: ACK > ');
}

function handleSceneInput() {
  const input = state.terminalInput.trim();
  state.terminalInput = '';
  hideTerminalInput();

  appendToTerminal(`Enter: ACK > ${input}`);
  appendToTerminal('');
  appendToTerminal('LOGGED.');
  appendToTerminal('');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');
  appendToTerminal('COMMS FULLY ESTABLISHED. ALL CREW CONNECTED.');
  appendToTerminal('');
  appendToTerminal('BEGIN TRANSMISSION.');
  appendToTerminal('────────────────────────────────────────────────────', 'terminal-line text-green-600');

  setTimeout(() => {
    state.gameState = 'playing';
    lastRenderedMessageCount = -1;
    transmissionRendered = false;
    render();
  }, 1500);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main render — handles comms/awaiting/scene/playing states
// (boot and auth manage their own DOM, never trigger here)
// ─────────────────────────────────────────────────────────────────────────────

function render() {
  // These states manage their own rendering or are transient
  const nonRenderStates = ['boot', 'auth', 'comms', 'connecting', 'halted'];
  if (nonRenderStates.includes(state.gameState)) return;

  // AWAITING: transition to scene when crew assembles
  if (state.gameState === 'awaiting') {
    if (state.awaitingDisplayed && state.players.length >= 2 && !state.crewAssembled) {
      state.crewAssembled = true;
      const awaitEl = document.getElementById('awaiting-indicator');
      if (awaitEl) awaitEl.remove();
      appendToTerminal('');
      appendToTerminal('CREW SIGNAL CONFIRMED.');
      appendToTerminal(`LINK ESTABLISHED — ${state.players.length} CREW CONNECTED.`);
      appendToTerminal('');
      appendToTerminal('INITIATING MISSION BRIEF...');
      setTimeout(() => {
        state.gameState = 'scene';
        renderScene();
      }, 2000);
    }
    return;
  }

  // SCENE: no-op from Firebase callbacks (handleKeydown drives this)
  if (state.gameState === 'scene') return;

  // PLAYING
  if (state.gameState === 'playing') {
    if (!document.getElementById('terminal')) {
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

          <div id="terminal" class="flex-1 overflow-y-auto p-4 font-mono">
            <div id="messages"></div>
            <div id="typingIndicator"></div>
            <div id="inputLine" class="terminal-line text-green-300">
              <span>[${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}]: </span><span id="inputText"></span><span class="cursor">█</span>
            </div>
          </div>

          <!-- Mission reference panel (hidden until Phase 7) -->
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
                <button onclick="switchPromptCategory('briefing')" id="tab-briefing" class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">
                  YOUR BRIEFING
                </button>
                <button onclick="switchPromptCategory('generic')" id="tab-generic" class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">
                  GENERIC JARGON
                </button>
                <button onclick="switchPromptCategory('things')" id="tab-things" class="flex-1 p-3 text-sm border-r-2 border-green-400 hover:bg-green-900 transition">
                  THINGS
                </button>
                <button onclick="switchPromptCategory('protocol')" id="tab-protocol" class="flex-1 p-3 text-sm hover:bg-green-900 transition">
                  PROTOCOL
                </button>
              </div>

              <div class="flex-1 overflow-y-auto p-4">
                <div id="promptContent"></div>
              </div>

              <div class="border-t-2 border-green-400 p-4">
                <button onclick="refreshPrompts()" class="w-full border-2 border-green-400 py-2 hover:bg-green-400 hover:text-black transition">
                  ↻ REFRESH
                </button>
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
    const newMessages = visibleMessages.slice(previousCount);

    newMessages.forEach((msg) => {
      if (msg.type === 'transmission') {
        renderTransmission(messagesDiv, msg);
        return;
      }

      const messageElement = document.createElement('div');
      messageElement.className = 'terminal-line';
      const formattedText = formatMessage(msg);
      messagesDiv.appendChild(messageElement);

      if (msg.role !== state.playerRole) {
        animateMessage(messageElement, formattedText, 50);
      } else {
        messageElement.outerHTML = formattedText;
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
    // Reveal the mission data button (stop pulsing after first open)
    updatePlayingHeader();
  }, 3000);
}

function formatMessage(msg) {
  if (msg.type === 'system') {
    return `<div class="terminal-line text-green-600">&gt; ${escapeHtml(msg.text)}</div>`;
  }
  if (msg.type === 'scenario') {
    return `<div class="terminal-line text-green-600">&gt; MISSION: ${escapeHtml(msg.text)}</div>`;
  }
  if (msg.type === 'transmission') {
    const divider = '────────────────────────────────────────────────────';
    return `<div class="terminal-line space-y-1 my-2">
      <div class="text-green-600">${divider}</div>
      <div class="font-bold">PRIORITY TRANSMISSION — CAPCOM</div>
      <div class="text-green-600">${divider}</div>
      <div class="my-2">${escapeHtml(msg.text)}</div>
      <div class="text-green-600">${divider}</div>
      <div class="text-green-600">END TRANSMISSION</div>
      <div class="text-green-600">${divider}</div>
    </div>`;
  }
  if (msg.type === 'message') {
    const label = escapeHtml(getRoleLabel(msg.role, state.selectedScenario));
    if (msg.role === state.playerRole) {
      return `<div class="terminal-line text-green-300" data-own-message="true">[${label}]: ${escapeHtml(msg.text)}</div>`;
    } else {
      return `<div class="terminal-line">[${label}]: ${escapeHtml(msg.text)}</div>`;
    }
  }
  return '';
}

function animateMessage(element, htmlContent, speed = 20) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const textToAnimate = tempDiv.textContent || tempDiv.innerText;

  const hasRolePrefix = htmlContent.includes('[');
  let rolePrefix = '';
  let messageText = textToAnimate;

  if (hasRolePrefix && textToAnimate.includes(']:')) {
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
  if (terminal) {
    terminal.scrollTop = terminal.scrollHeight;
  }
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
  const target = messagesDiv.querySelector('[data-pending-message]') ||
    ownMessages[ownMessages.length - 1];

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
            ? `<button onclick="togglePrompts()" id="mission-data-btn" class="text-sm border-2 border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition font-bold">
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
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard input
// ─────────────────────────────────────────────────────────────────────────────

function handleKeydown(e) {
  // AUTH phase
  if (state.gameState === 'auth') {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAuthInput();
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

  // COMMS phase (host Y/N)
  if (state.gameState === 'comms' && !state.joinCode) {
    if (e.key === 'y' || e.key === 'Y') {
      e.preventDefault();
      state.gameState = 'connecting'; // prevent re-entry
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

  // SCENE phase (ACK prompt)
  if (state.gameState === 'scene') {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (state.terminalInput.trim().length > 0) {
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

  // PLAYING phase
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

    if (state.inputMessage.length === 0) {
      updateTypingStatus(false);
    } else {
      updateTypingStatus(true);
    }
  } else if (e.key.length === 1) {
    e.preventDefault();
    state.inputMessage += e.key;
    inputText.textContent = state.inputMessage;
    updateTypingStatus(true);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Window-level functions (called from inline onclick handlers)
// ─────────────────────────────────────────────────────────────────────────────

window.copyRoomCode = async () => {
  const button = document.getElementById('copyButton');
  if (!button) return;

  const joinUrl = `${window.location.origin}${window.location.pathname}?code=${state.roomCode}`;
  try {
    await navigator.clipboard.writeText(joinUrl);
    const originalText = button.textContent;
    button.textContent = 'COPIED!';
    setTimeout(() => { button.textContent = originalText; }, 1500);
  } catch (err) {
    button.textContent = 'ERROR';
    setTimeout(() => { button.textContent = 'COPY LINK'; }, 1500);
  }
};

window.copyRoomCodeTerminal = async () => {
  const button = document.getElementById('copyButtonTerminal');
  if (!button) return;

  const joinUrl = `${window.location.origin}${window.location.pathname}?code=${state.roomCode}`;
  try {
    await navigator.clipboard.writeText(joinUrl);
    const originalText = button.textContent;
    button.textContent = '[COPIED!]';
    setTimeout(() => { button.textContent = originalText; }, 1500);
  } catch (err) {
    button.textContent = '[ERROR]';
    setTimeout(() => { button.textContent = '[COPY LINK]'; }, 1500);
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
    if (tab) {
      if (cat === category) {
        tab.classList.add('bg-green-900');
      } else {
        tab.classList.remove('bg-green-900');
      }
    }
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
              ? state.selectedScenario.technicalDetails.map(detail =>
                  `<div>• ${escapeHtml(detail)}</div>`
                ).join('')
              : '<div>No technical details available</div>'
            }
          </div>
        </div>
      </div>
    `;
  }

  if (currentPromptCategory === 'generic') {
    const verbs = getRandomItems(MOON_VERBS, 10);
    const adjectives = getRandomItems(EQUIPMENT_ADJECTIVES, 10);

    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">
        Combine these to create authentic-sounding technical jargon:
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div class="text-sm text-green-400 mb-2">VERBS</div>
          <div class="text-sm space-y-1">
            ${verbs.map(v => `<div class="text-green-500">${v}</div>`).join('')}
          </div>
        </div>
        <div>
          <div class="text-sm text-green-400 mb-2">ADJECTIVES</div>
          <div class="text-sm space-y-1">
            ${adjectives.map(a => `<div class="text-green-500">${a}</div>`).join('')}
          </div>
        </div>
      </div>
      <div class="text-xs text-green-600 mt-4 italic">
        Example: "Degauss the auxiliary relay" or "Recalibrate the omnidirectional sensor"
      </div>
    `;
  } else if (currentPromptCategory === 'things') {
    const items = getRandomFromCategory(THINGS, 15);
    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">
        Physical objects, equipment, and structures you might reference:
      </div>
      <div class="text-sm space-y-1">
        ${items.map(item => `<div class="text-green-500">${item}</div>`).join('')}
      </div>
    `;
  } else if (currentPromptCategory === 'protocol') {
    const items = getRandomFromCategory(PROTOCOL, 15);
    content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">
        Radio communication phrases and problem descriptions:
      </div>
      <div class="text-sm space-y-1">
        ${items.map(item => `<div class="text-green-500">${item}</div>`).join('')}
      </div>
    `;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('keydown', handleKeydown);

// Detect join code from URL
const urlParams = new URLSearchParams(window.location.search);
const joinCode = urlParams.get('code');
if (joinCode) {
  state.joinCode = joinCode.trim().toUpperCase();
}

runBootSequence();
