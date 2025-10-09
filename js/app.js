import { getRandomScenarios } from './scenarios-enhanced.js';
import { 
  state, 
  getRoleLabel, 
  getPlayerBriefing, 
  createRoom, 
  joinRoom, 
  sendMessage, 
  updateTypingStatus,
  isPrimaryRole,  // ADD THIS
  getAvailableVoices,  // ADD THIS (for later)
  getDisplayRole,  // ADD THIS (for later)
  switchVoice,  // ADD THIS (for later)
  maybeAssignComplication  // ADD THIS (for complications feature)
} from './game.js';
import { escapeHtml } from './utils.js';
import { MOON_VERBS, EQUIPMENT_ADJECTIVES, THINGS, PROTOCOL, getRandomItems, getRandomFromCategory } from './prompts.js';

// Track which category is showing
let currentPromptCategory = 'generic';

window.renderApp = render;
window.renderMessages = renderMessages; // Add this line

function render() {
  const app = document.getElementById('app');

   // START SCREEN
  if (state.gameState === 'start') {
    app.innerHTML = `
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-md space-y-6">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">APOLLO 47</h1>
            <p class="text-sm text-green-600">TECHNICAL HANDBOOK - MISSION CHAT</p>
          </div>
          
          <div class="border-2 border-green-400 p-6 space-y-4">
            <button onclick="showScenarios()" class="w-full bg-green-400 text-black py-3 px-4 font-bold hover:bg-green-300 transition">
              START NEW MISSION
            </button>
            
            <div class="text-center text-green-600">- OR -</div>
            
            <div class="space-y-2">
              <input
                type="text"
                id="joinInput"
                placeholder="ENTER ROOM CODE"
                class="w-full bg-black border-2 border-green-400 p-3 text-green-400 placeholder-green-600"
              />
              <button id="joinButton" onclick="joinWithCode()" class="w-full border-2 border-green-400 text-green-400 py-2 px-4 hover:bg-green-400 hover:text-black transition">
              JOIN MISSION
              </button>
            </div>
          </div>
          <div class="text-center">
<button onclick="showHowToPlay()" class="w-full border-2 border-green-400 text-green-400 py-2 px-4 hover:bg-green-400 hover:text-black transition">
  HOW TO PLAY
</button>
</div>
          <p class="text-xs text-center text-green-600">
            It's a parallel 1986. Moon landings have become commonplace and, dare we say, a little boring?
          </p>
        </div>
      </div>
    `;

    const input = document.getElementById('joinInput');
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.joinWithCode();
      });
    }
  }

  // HOW TO PLAY SCREEN
else if (state.gameState === 'howToPlay') {
  app.innerHTML = `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-3xl space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">HOW TO PLAY APOLLO 47</h2>
          <p class="text-sm text-green-600">A guide for new astronauts</p>
        </div>
        
        <div class="border-2 border-green-400 p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">What Is This Game?</h3>
            <p class="text-sm">Apollo 47 is an improvisational roleplaying game set in an alternate 1986 where moon landings are routine. Players collaborate to tell stories about mundane mission complications through radio chat.</p>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">Game Setup</h3>
            <p class="text-sm mb-2">This is a <strong>2-6 player</strong> game played entirely through text chat:</p>
            <ul class="text-sm list-disc list-inside space-y-1">
              <li>One player starts a new mission and selects a scenario</li>
              <li>They receive a room code to share with others</li>
              <li>Other players join using the room code</li>
              <li>Each player is assigned a role from the scenario</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">The Two Roles</h3>
            <div class="space-y-2 text-sm">
              <p><strong class="text-green-300">[PRIMARY] - The Spotlight Astronaut:</strong> You're dealing with the mission complication hands-on. Describe what you're doing, what you see, and what problems you're encountering. Lead the scene.</p>
              <p><strong class="text-green-300">[SUPPORT] - Voices on the Radio:</strong> You're Mission Control, other crew members, or support staff. Guide the Primary astronaut, ask for clarifications, offer suggestions, and introduce small complications to keep things interesting.</p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">How to Play</h3>
            <ul class="text-sm list-disc list-inside space-y-1">
              <li><strong>Use technical jargon freely</strong> - Invent equipment names, refer to systems by alphanumeric codes (CBT445S, Alpha-2 Umbilical, etc.)</li>
              <li><strong>Call and response</strong> - Confirm transmissions: "Copy that" / "Roger" / "Check nine on that"</li>
              <li><strong>Create nested problems</strong> - One issue leads to another: "The clamps won't release because the power coupling is stuck..."</li>
              <li><strong>Keep it mundane</strong> - Focus on technical difficulties, not life-or-death drama</li>
              <li><strong>Support, don't dominate</strong> - If you're SUPPORT, let the PRIMARY lead. Ask questions, don't take over</li>
              <li><strong>Embrace contradictions</strong> - If something doesn't match up, explain it in-character rather than arguing</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">The Tone</h3>
            <p class="text-sm">Apollo 47 is about the <em>mundane reality of space work</em>. Think:</p>
            <ul class="text-sm list-disc list-inside space-y-1 mt-2">
              <li>Jammed hatches, not alien invasions</li>
              <li>Equipment malfunctions, not explosions</li>
              <li>Paperwork and procedures, not heroics</li>
              <li>Technical banter, not epic speeches</li>
            </ul>
            <p class="text-sm mt-2">The fun comes from <strong>sounding professional while improvising technical problems</strong>.</p>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-2 text-green-300">Tips for Success</h3>
            <ul class="text-sm list-disc list-inside space-y-1">
              <li><strong>Say "yes, and"</strong> - Build on what others establish</li>
              <li><strong>Ask clarifying questions</strong> - "What's the voltage reading?" / "Can you see the serial number?"</li>
              <li><strong>Repeat jargon back</strong> - If someone mentions "RM11 clamps," reference them later</li>
              <li><strong>Keep messages focused</strong> - Short transmissions feel more like radio chatter</li>
              <li><strong>Support the story</strong> - Everyone works together to make the scene interesting</li>
            </ul>
          </div>

          <div class="border-t border-green-600 pt-4">
            <p class="text-xs text-green-600 italic">Based on the tabletop RPG by Tim Hutchings</p>
          </div>
        </div>
        
        <div class="text-center">
          <button onclick="backToStart()" class="border-2 border-green-400 text-green-400 py-2 px-6 hover:bg-green-400 hover:text-black transition">
            ← BACK TO START
          </button>
        </div>
      </div>
    </div>
  `;
}

 // SCENARIO SELECTION SCREEN
  else if (state.gameState === 'selectScenario') {
    app.innerHTML = `
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-4xl space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-2xl font-bold">SELECT MISSION SCENARIO</h2>
            <p class="text-sm text-green-600">Choose a mission complication to explore</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
${state.scenarioOptions.map((scenario, idx) => `
  <div 
    class="scenario-card border-2 border-green-400 p-4 space-y-3"
    onclick="selectScenario(${idx})"
  >
    <div class="font-bold text-lg">${escapeHtml(scenario.title)}</div>
    <div class="text-sm text-green-600">${escapeHtml(scenario.setup)}</div>
  </div>
`).join('')}
          </div>
          
          <div class="text-center">
            <button onclick="backToStart()" class="border-2 border-green-400 text-green-400 py-2 px-6 hover:bg-green-400 hover:text-black transition">
              ← BACK
            </button>
          </div>
        </div>
      </div>
    `;
  }

// LOBBY SCREEN
else if (state.gameState === 'lobby') {
  app.innerHTML = `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-2xl space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">MISSION BRIEFING</h2>
          <div class="text-lg mb-4">Room: ${escapeHtml(state.roomCode)}</div>
        </div>
        
        <div class="border-2 border-green-400 p-4 space-y-4">
          ${state.players.length === 1 ? `
            <div class="text-xs text-green-600 mb-4 border-b border-green-600 pb-3">
              > Transmission sent to Mission Control...<br>
              > Standing by for support response...<br>
              > Signal: Active
            </div>
          ` : ''}
          
          <div>
            <div class="text-sm text-green-600 mb-2">WHERE YOU ARE:</div>
            <div class="text-sm">${escapeHtml(getPlayerBriefing(state.playerRole, state.selectedScenario).context || 'Preparing for mission...')}</div>
          </div>

          <div>
            <div class="text-sm text-green-600 mb-2">YOUR BRIEFING:</div>
            <div class="text-sm">${escapeHtml(getPlayerBriefing(state.playerRole, state.selectedScenario).briefing || 'Awaiting mission briefing...')}</div>
          </div>
          
          <div>
            <div class="text-sm text-green-600 mb-2">SITUATION:</div>
            <div class="text-sm">${escapeHtml(state.selectedScenario ? state.selectedScenario.setup : 'Loading...')}</div>
          </div>
          
          <div>
            <div class="text-sm text-green-600 mb-2">CREW MANIFEST:</div>
            <div class="space-y-1">
              ${state.players.map(player => `
                <div class="flex items-center gap-2">
                  ${escapeHtml(getRoleLabel(player, state.selectedScenario))}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <button onclick="beginMission()" class="w-full bg-green-400 text-black py-3 px-4 font-bold hover:bg-green-300 transition">
          BEGIN MISSION
        </button>
        
        <div class="text-xs text-center text-green-600">
          Share room code "${state.roomCode}" with other players
        </div>
      </div>
    </div>
  `;
}

// DISPATCH SCREEN (for support players joining)
else if (state.gameState === 'dispatch') {
  const roleData = getPlayerBriefing(state.playerRole, state.selectedScenario);
  
  app.innerHTML = `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-2xl space-y-6">
        
        <div class="border-2 border-green-400 p-8 space-y-6 font-mono">
          <div class="border-2 border-green-400 p-4 text-center">
            <div class="font-bold tracking-wider">INCOMING TRANSMISSION - PRIORITY ALPHA</div>
          </div>
          
          <div class="space-y-4">
            <div>
              <div class="text-green-600 mb-2">Mission Control has requested your assistance:</div>
            </div>
            
            <div>
              <div class="font-bold mb-2">SITUATION:</div>
              <div>${escapeHtml(state.selectedScenario ? state.selectedScenario.setup : '')}</div>
            </div>
            
            <div>
              <div class="font-bold mb-2">YOUR ROLE:</div>
              <div>${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}</div>
            </div>
            
            <div>
              <div class="font-bold mb-2">YOUR OBJECTIVE:</div>
              <div>${escapeHtml(roleData.briefing || 'Provide mission support')}</div>
            </div>
            
            <div class="border-t border-green-600 pt-4 text-sm">
              <div class="mb-2">Remember: They've been waiting for your support.</div>
              <div>Use technical language. Confirm transmissions.</div>
            </div>
          </div>
          
          <div class="text-center text-green-600 pt-4">
            [PRESS ENTER TO ACCEPT ASSIGNMENT]
          </div>
        </div>
        
      </div>
    </div>
  `;
  
  // Set up Enter key handler
  const handleDispatchEnter = (e) => {
    if (e.key === 'Enter') {
      document.removeEventListener('keydown', handleDispatchEnter);
      state.gameState = 'playing';
      render();
      maybeAssignComplication();
    }
  };
  
  document.addEventListener('keydown', handleDispatchEnter);
}

// PLAYING SCREEN
else if (state.gameState === 'playing') {
  // Only set innerHTML if we're entering playing state for the first time
  if (!document.getElementById('terminal')) {
    app.innerHTML = `
      <div class="flex flex-col h-screen">
        <div class="border-b-2 border-green-400 p-4">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="font-bold">APOLLO 47 - ${escapeHtml(state.roomCode)}</div>
                  <button onclick="copyRoomCode()" id="copyButton" class="text-xs border border-green-400 px-2 py-1 hover:bg-green-400 hover:text-black transition">
                    COPY
                  </button>
                </div>
                
                ${state.players.length === 1 ? `
                  <div class="text-sm text-yellow-400 animate-pulse flex-1 text-center">
                    ⚠ SUPPORT REQUESTED...AWAITING RESPONSE...
                  </div>
                ` : `
                  <div class="flex-1"></div>
                `}
                
          <button onclick="togglePrompts()" class="text-sm border-2 border-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition font-bold">
            ASTRONAUT ASSISTANCE BUTTON
          </button>
        </div>
              
              <div class="text-sm text-green-600">
                ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))} • 
                ${escapeHtml(state.selectedScenario?.title || 'Mission')}
              </div>
            </div>
          </div>
        </div>

        <div id="terminal" class="flex-1 overflow-y-auto p-4 font-mono">
          <div id="messages"></div>
          <div id="typingIndicator"></div>
          <div id="inputLine" class="terminal-line">
              <span id="inputText"></span><span class="cursor">█</span>
          </div>
        </div>
        
        <!-- Reference Panel Overlay -->
        <div id="promptOverlay" class="hidden fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div class="bg-black border-2 border-green-400 w-full max-w-2xl max-h-[80vh] flex flex-col">
            <!-- Header -->
            <div class="border-b-2 border-green-400 p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="font-bold text-green-400 text-xl">MISSION REFERENCE</div>
                <button onclick="togglePrompts()" class="text-green-400 hover:text-green-300 text-2xl leading-none">×</button>
              </div>
              <div class="text-xs text-green-600">
                Not sure what a professional astronaut of your caliber would say? We got these words straight from the manual.
              </div>
            </div>
            
            <!-- Category Tabs -->
            <div class="border-b-2 border-green-400 flex">
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
            
            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-4">
              <div id="promptContent"></div>
            </div>
            
            <!-- Footer -->
            <div class="border-t-2 border-green-400 p-4">
              <button onclick="refreshPrompts()" class="w-full border-2 border-green-400 py-2 hover:bg-green-400 hover:text-black transition">
                ↻ REFRESH
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  renderMessages();
  setupInput();
}

  
  renderMessages();
  setupInput();
}


function renderMessages() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;

  const previousCount = state.lastRenderedMessageCount || 0;
  const currentCount = state.messages.length;

  // If this is the first render, show all messages instantly
  if (previousCount === 0) {
    messagesDiv.innerHTML = state.messages.map(msg => formatMessage(msg)).join('');
    state.lastRenderedMessageCount = currentCount;
    scrollToBottom();
    return;
  }

  // Only animate new messages
  if (currentCount > previousCount) {
    const newMessages = state.messages.slice(previousCount);
    
    newMessages.forEach((msg) => {
      const messageElement = document.createElement('div');
      messageElement.className = 'terminal-line';
      
      const formattedText = formatMessage(msg);
      messagesDiv.appendChild(messageElement);
      
      // Animate messages from OTHER players (not marked as own-message)
      // Show our own messages instantly
      if (msg.role !== state.playerRole) {
        animateMessage(messageElement, formattedText, 50);
      } else {
        messageElement.outerHTML = formattedText;
        scrollToBottom();
      }
    });
    
    state.lastRenderedMessageCount = currentCount;
  }

  scrollToBottom();
}

// Helper function to format a message
function formatMessage(msg) {
  if (msg.type === 'system') {
    return `<div class="terminal-line text-green-600">&gt; ${escapeHtml(msg.text)}</div>`;
  }
  if (msg.type === 'scenario') {
    return `<div class="terminal-line text-green-600">&gt; MISSION: ${escapeHtml(msg.text)}</div>`;
  }
  if (msg.type === 'message') {
    if (msg.role === state.playerRole) {
      return `<div class="terminal-line" data-own-message="true">${escapeHtml(msg.text)}</div>`;
    } else {
      return `<div class="terminal-line">[${escapeHtml(msg.role)}]: ${escapeHtml(msg.text)}</div>`;
    }
  }
  return '';
}

// Updated animation function to handle HTML content
function animateMessage(element, htmlContent, speed = 20) {
  // For messages with HTML tags (like role labels), we need to extract just the text
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const textToAnimate = tempDiv.textContent || tempDiv.innerText;
  
  // Determine if this has a role prefix
  const hasRolePrefix = htmlContent.includes('[');
  let rolePrefix = '';
  let messageText = textToAnimate;
  
  if (hasRolePrefix && textToAnimate.includes(']:')) {
    const splitPoint = textToAnimate.indexOf(']:') + 2;
    rolePrefix = textToAnimate.substring(0, splitPoint);
    messageText = textToAnimate.substring(splitPoint);
  }
  
  // Show role prefix instantly, animate the message
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
    const roles = state.typingPlayers.map(role => `[${escapeHtml(role)}]`).join('');
    indicator.innerHTML = `<div class="terminal-line text-green-600 typing-dots">${roles}<span class="dots">...</span></div>`;
  } else {
    indicator.innerHTML = '';
  }
}

function renderSendStatus() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;
  
  const lastMessageElement = messagesDiv.lastElementChild;
  if (!lastMessageElement) return;
  
  const lastMessage = state.messages[state.messages.length - 1];
  if (!lastMessage || lastMessage.role !== state.playerRole) return;
  
  // Update the last message with current send status
  if (state.sendStatus === 'sending') {
    lastMessageElement.innerHTML = `${escapeHtml(lastMessage.text)} <span class="text-green-600">[sending...]</span>`;
  } else if (state.sendStatus === 'sent') {
    lastMessageElement.innerHTML = `${escapeHtml(lastMessage.text)} <span class="text-green-600">[sent ✓]</span>`;
  } else {
    lastMessageElement.innerHTML = `${escapeHtml(lastMessage.text)}`;
  }
}

function updateSendStatusDisplay() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;
  
  // Find the last message that's marked as ours
  const messageElements = messagesDiv.querySelectorAll('[data-own-message="true"]');
  const lastOwnMessage = messageElements[messageElements.length - 1];
  
  if (!lastOwnMessage) return;
  
  // Get the original text (strip any existing status)
  const originalText = lastOwnMessage.textContent
    .replace(' [sending...]', '')
    .replace(' [sent ✓]', '');
  
  // Append appropriate status
  if (state.sendStatus === 'sending') {
    lastOwnMessage.textContent = originalText + ' [sending...]';
  } else if (state.sendStatus === 'sent') {
    lastOwnMessage.textContent = originalText + ' [sent ✓]';
  } else {
    lastOwnMessage.textContent = originalText;
  }
}

window.updateSendStatusDisplay = updateSendStatusDisplay;

function updatePlayingHeader() {
  const headerDiv = document.querySelector('.border-b-2.border-green-400');
  if (!headerDiv) return;
  
  headerDiv.innerHTML = `
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="font-bold">APOLLO 47 - ${escapeHtml(state.roomCode)}</div>
            <button onclick="copyRoomCode()" id="copyButton" class="text-xs border border-green-400 px-2 py-1 hover:bg-green-400 hover:text-black transition">
              COPY
            </button>
          </div>
          
          ${state.players.length === 1 ? `
            <div class="text-sm text-yellow-400 animate-pulse flex-1 text-center">
              ⚠ SUPPORT REQUESTED...AWAITING RESPONSE...
            </div>
          ` : `
            <div class="flex-1"></div>
          `}
          
          <button onclick="togglePrompts()" class="text-xs border border-green-400 px-3 py-1 hover:bg-green-400 hover:text-black transition">
            REFERENCE
          </button>
        </div>
        
        <div class="text-sm text-green-600">
          ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))} • 
          ${escapeHtml(state.selectedScenario?.title || 'Mission')}
        </div>
      </div>
    </div>
  `;
}

window.updatePlayingHeader = updatePlayingHeader;


function handleKeydown(e) {
  if (state.gameState !== 'playing') return;

  const inputText = document.getElementById('inputText');
  if (!inputText) return;

  // Let browser shortcuts through (Ctrl, Cmd, Alt combinations)
  if (e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
    inputText.textContent = ''; // clear the input after sending
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    state.inputMessage = state.inputMessage.slice(0, -1);
    inputText.textContent = state.inputMessage;
    
    // Update typing status
    if (state.inputMessage.length === 0) {
      updateTypingStatus(false);
    } else {
      updateTypingStatus(true);
    }
  } else if (e.key.length === 1) {
    // Only add printable characters
    e.preventDefault();
    state.inputMessage += e.key;
    inputText.textContent = state.inputMessage;
    
    // Update typing status
    updateTypingStatus(true);
  }
}
 
// Global functions
window.showScenarios = () => {
  console.log('1. showScenarios called');
  state.scenarioOptions = getRandomScenarios();
  console.log('2. scenarioOptions set:', state.scenarioOptions);
  state.gameState = 'selectScenario';
  console.log('3. gameState set:', state.gameState);
  render();
  console.log('4. render called');
};

window.showHowToPlay = () => {
  state.gameState = 'howToPlay';
  render();
};

window.selectScenario = async (idx) => {
  const scenario = state.scenarioOptions[idx];
  await createRoom(scenario);
  render();
};

window.backToStart = () => {
  state.gameState = 'start';
  render();
};

window.joinWithCode = async () => {
  const input = document.getElementById('joinInput');
  const button = document.getElementById('joinButton');
  const code = input?.value?.trim().toUpperCase();
  
  if (!code || code.length === 0) {
    alert('Please enter a room code');
    return;
  }
  
  // Disable button and show loading state
  if (button) {
    button.disabled = true;
    button.textContent = 'JOINING...';
  }
  
  await joinRoom(code);
  render();
};

window.beginMission = () => {
  // If this player is support (not primary), show dispatch screen first
  if (!isPrimaryRole()) {
    state.gameState = 'dispatch';
  } else {
    state.gameState = 'playing';
    // maybeAssignComplication(); // Uncomment when implementing complications
  }
  render();
};

window.sendMsg = () => {
  sendMessage();
};

// Make these available globally
window.renderTypingIndicator = renderTypingIndicator;

window.renderSendStatus = renderSendStatus;

window.copyRoomCode = async () => {
  const button = document.getElementById('copyButton');
  if (!button) return;
  
  try {
    await navigator.clipboard.writeText(state.roomCode);
    // Show success feedback
    const originalText = button.textContent;
    button.textContent = 'COPIED!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
    button.textContent = 'ERROR';
    setTimeout(() => {
      button.textContent = 'COPY';
    }, 1500);
  }
};

window.togglePrompts = () => {
  const overlay = document.getElementById('promptOverlay');
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    refreshPrompts(); // Load initial content
  } else {
    overlay.classList.add('hidden');
  }
};

window.switchPromptCategory = (category) => {
  currentPromptCategory = category;
  
  // Update active tab styling
  ['generic', 'things', 'protocol'].forEach(cat => {
    const tab = document.getElementById(`tab-${cat}`);
    if (cat === category) {
      tab.classList.add('bg-green-900');
    } else {
      tab.classList.remove('bg-green-900');
    }
  });
  
  refreshPrompts();
};

window.refreshPrompts = () => {
  const content = document.getElementById('promptContent');
  
  if (currentPromptCategory === 'generic') {
    // Show verbs and adjectives with explanation
    const verbs = getRandomItems(MOON_VERBS, 10);
    const adjectives = getRandomItems(EQUIPMENT_ADJECTIVES, 10);
    
 content.innerHTML = `
      <div class="text-xs text-green-600 mb-4">
        Combine these verbs and adjectives to create authentic-sounding technical jargon:
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
};

// Set up global keyboard listener (only once)
document.addEventListener('keydown', handleKeydown);

// Initial render
render();
