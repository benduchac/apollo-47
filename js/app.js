import { getRandomScenarios } from './scenarios.js';
import { state, getRoleLabel, getPlayerBriefing, createRoom, joinRoom, sendMessage } from './game.js';
import { escapeHtml } from './utils.js';

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
              <button onclick="joinWithCode()" class="w-full border-2 border-green-400 text-green-400 py-2 px-4 hover:bg-green-400 hover:text-black transition">
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
                class="scenario-card border-2 border-green-400 p-4 space-y-2"
                onclick="selectScenario(${idx})"
              >
                <div class="flex justify-between items-start">
                  <div class="font-bold text-lg flex-1">${escapeHtml(scenario.title)}</div>
                  <div class="text-xs text-green-600 ml-2">Recommended players: 2-${escapeHtml(scenario.playerCount)}</div>
                </div>
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
      <div class="w-full max-w-md space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">MISSION BRIEFING</h2>
          <div class="text-lg mb-4">Room: ${escapeHtml(state.roomCode)}</div>
        </div>
        
        <div class="border-2 border-green-400 p-4 space-y-4">
          <div>
            <div class="text-sm text-green-600 mb-2">YOUR ROLE:</div>
            <div class="text-xl">${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}</div>
          </div>

          <div>
            <div class="text-sm text-green-600 mb-2">YOUR BRIEFING:</div>
            <div class="text-sm">${escapeHtml(getPlayerBriefing(state.playerRole, state.selectedScenario))}</div>
          </div>
          
          <div>
            <div class="text-sm text-green-600 mb-2">SITUATION:</div>
            <div class="text-sm">${escapeHtml(state.selectedScenario ? state.selectedScenario.setup : 'Loading...')}</div>
          </div>
          
<div>
  <div class="text-sm text-green-600 mb-2">CREW MANIFEST:</div>
  <div class="space-y-1">${state.players.map(player => `<div class="flex items-center gap-2">${escapeHtml(getRoleLabel(player, state.selectedScenario))}</div>`).join('')}</div>
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

// PLAYING SCREEN
else if (state.gameState === 'playing') {
  // Only set innerHTML if we're entering playing state for the first time
  if (!document.getElementById('terminal')) {
    app.innerHTML = `
      <div class="flex flex-col h-screen">
        <div class="border-b-2 border-green-400 p-4">
          <div class="flex justify-between">
            <div class="font-bold">APOLLO 47 - ${escapeHtml(state.roomCode)}</div>
            <div class="text-sm">You are: ${escapeHtml(getRoleLabel(state.playerRole, state.selectedScenario))}</div>
          </div>
        </div>

        <div id="terminal" class="flex-1 overflow-y-auto p-4 font-mono">
          <div id="messages"></div>
          <div id="inputLine" class="terminal-line">
            <span id="inputText"></span><span class="cursor">█</span>
          </div>
        </div>
      </div>
    `;
  }
  
  renderMessages();
  setupInput();
}
}

function renderMessages() {
  const messagesDiv = document.getElementById('messages');
  if (!messagesDiv) return;

  messagesDiv.innerHTML = state.messages.map(msg => {
    if (msg.type === 'system') {
      return `<div class="terminal-line text-green-600">&gt; ${escapeHtml(msg.text)}</div>`;
    }
    if (msg.type === 'scenario') {
      return `<div class="terminal-line text-green-600">&gt; MISSION: ${escapeHtml(msg.text)}</div>`;
    }
    if (msg.type === 'message') {
      if (msg.role === state.playerRole) {
        return `<div class="terminal-line">${escapeHtml(msg.text)}</div>`;
      } else {
        return `<div class="terminal-line">[${escapeHtml(msg.role)}]: ${escapeHtml(msg.text)}</div>`;
      }
    }
    return '';
  }).join('');

  scrollToBottom();
}

function scrollToBottom() {
  const terminal = document.getElementById('terminal');
  if (terminal) {
    terminal.scrollTop = terminal.scrollHeight;
  }
}
function animateMessage(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, speed);
}

function setupInput() {
  const inputText = document.getElementById('inputText');
  if (!inputText) return;

  // Just update the display
  inputText.textContent = state.inputMessage;
}

function handleKeydown(e) {
  if (state.gameState !== 'playing') return;

  const inputText = document.getElementById('inputText');
  if (!inputText) return;

  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    state.inputMessage = state.inputMessage.slice(0, -1);
    inputText.textContent = state.inputMessage;
  } else if (e.key.length === 1) {
    // Only add printable characters
    e.preventDefault();
    state.inputMessage += e.key;
    inputText.textContent = state.inputMessage;
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
  const code = input?.value?.trim().toUpperCase();
  if (code && code.length > 0) {
    await joinRoom(code);
    render();
  } else {
    alert('Please enter a room code');
  }
};

window.beginMission = () => {
  state.gameState = 'playing';
  render();
};

window.sendMsg = () => {
  sendMessage();
};

// Set up global keyboard listener (only once)
document.addEventListener('keydown', handleKeydown);

// Initial render
render();
