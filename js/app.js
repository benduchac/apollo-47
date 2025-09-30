import { getRandomScenarios } from './scenarios.js';
import { state, getRoleLabel, getPlayerBriefing, createRoom, joinRoom, sendMessage } from './game.js';

window.renderApp = render;

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
                  <div class="font-bold text-lg flex-1">${scenario.title}</div>
                  <div class="text-xs text-green-600 ml-2">${scenario.playerCount} players</div>
                </div>
                <div class="text-sm text-green-600">${scenario.setup}</div>
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
          <div class="text-lg mb-4">Room: ${state.roomCode}</div>
        </div>
        
        <div class="border-2 border-green-400 p-4 space-y-4">
          <div>
            <div class="text-sm text-green-600 mb-2">YOUR ROLE:</div>
            <div class="text-xl">${getRoleLabel(state.playerRole, state.selectedScenario)}</div>
          </div>

          <div>
            <div class="text-sm text-green-600 mb-2">YOUR BRIEFING:</div>
            <div class="text-sm">${getPlayerBriefing(state.playerRole, state.selectedScenario)}</div>
          </div>
          
          <div>
            <div class="text-sm text-green-600 mb-2">SITUATION:</div>
            <div class="text-sm">${state.selectedScenario ? state.selectedScenario.setup : 'Loading...'}</div>
          </div>
          
          <div>
            <div class="text-sm text-green-600 mb-2">CREW MANIFEST:</div>
            <div class="space-y-1">
              ${state.players.map(player => `
                <div class="flex items-center gap-2">
                  <span>📻</span>
                  ${getRoleLabel(player, state.selectedScenario)}
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

  // PLAYING SCREEN
  else if (state.gameState === 'playing') {
    app.innerHTML = `
      <div class="flex flex-col h-screen">
        <div class="border-b-2 border-green-400 p-4">
          <div>
            <div class="font-bold">APOLLO 47 - ${state.roomCode}</div>
            <div class="text-sm text-green-600">You are: ${getRoleLabel(state.playerRole, state.selectedScenario)}</div>
          </div>
        </div>

        <div id="messages" class="flex-1 overflow-y-auto p-4 space-y-3">
          ${state.messages.map(msg => {
            if (msg.type === 'system') {
              return `<div class="text-center text-green-600 text-sm italic">&gt; ${msg.text}</div>`;
            }
            if (msg.type === 'scenario') {
              return `
                <div class="border border-green-400 p-3 text-sm">
                  <div class="text-green-600 mb-1">MISSION SITUATION:</div>
                  ${msg.text}
                </div>
              `;
            }
            if (msg.type === 'message') {
              const tag = msg.role === state.spotlightPlayer ? '[PRIMARY]' : '[SUPPORT]';
              return `
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span>📻</span>
                    <span class="font-bold">${msg.role}</span>
                    <span class="text-xs text-green-600">${tag}</span>
                  </div>
                  <div class="pl-5">${msg.text}</div>
                </div>
              `;
            }
            return '';
          }).join('')}
        </div>

        <div class="border-t-2 border-green-400 p-4">
          <div class="flex gap-2">
            <input
              type="text"
              id="messageInput"
              placeholder="Type your transmission..."
              class="flex-1 bg-black border-2 border-green-400 p-2 text-green-400 placeholder-green-600"
              value="${state.inputMessage}"
            />
            <button onclick="sendMsg()" class="bg-green-400 text-black px-4 py-2 font-bold hover:bg-green-300 transition">
              ▶
            </button>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('messageInput');
    if (input) {
      input.addEventListener('input', (e) => {
        state.inputMessage = e.target.value;
      });
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.sendMsg();
      });
      input.focus();
    }
  }
}

// Global functions
window.showScenarios = () => {
  state.scenarioOptions = getRandomScenarios();
  state.gameState = 'selectScenario';
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

// Initial render
render();
