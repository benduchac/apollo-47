import { database } from './firebase-config.js';
import { ref, set, push, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

export const ROLES = ['A1', 'Base', 'A2', 'CDR'];

export const state = {
  gameState: 'start',
  roomCode: '',
  playerRole: '',
  playerId: Math.random().toString(36).substring(7),
  players: [],
  messages: [],
  spotlightPlayer: '',
  inputMessage: '',
  selectedScenario: null,
  scenarioOptions: [],
  lastRenderedMessageCount: 0,  // Add this line
};

export function getPlayerBriefing(role, scenario) {
  if (scenario && scenario.roles) {
    const roleData = scenario.roles.find(r => r.id === role);
    if (roleData && roleData.briefing) {
      return roleData.briefing;
    }
  }
  
  // Fallback for generic support role
  if (role === 'Support') {
    return "You're providing additional mission support. Your goal: Assist the primary crew member and help solve problems.";
  }
  
  return "Awaiting mission briefing...";
}

export function getRoleLabel(role, scenario) {
  // If we have a scenario with custom roles, use those
  if (scenario && scenario.roles) {
    const roleData = scenario.roles.find(r => r.id === role);
    if (roleData) {
      return roleData.label;
    }
  }
  
  // Fallback to generic roles
  const labels = {
    'A1': 'Astronaut 1 (Primary)',
    'A2': 'Astronaut 2',
    'Base': 'Mission Control',
    'CDR': 'Commander',
    'Support': 'Support'
  };
  return labels[role] || role;
}

export function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'APOLLO-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createRoom(scenario) {
  const code = generateRoomCode();
  state.roomCode = code;
  state.selectedScenario = scenario;
  
  // Use scenario-specific roles
  const primaryRole = scenario.roles[0].id;
  state.playerRole = primaryRole;
  state.spotlightPlayer = primaryRole;
  state.gameState = 'lobby';

  const roomRef = ref(database, `rooms/${code}`);
  await set(roomRef, {
    created: Date.now(),
    scenario: {
    title: scenario.title,
    setup: scenario.setup,
    roles: scenario.roles
    },
    spotlightPlayer: primaryRole,
    players: {
      [state.playerId]: {
        role: primaryRole,
        joined: Date.now()
      }
    }
  });

  const messagesRef = ref(database, `rooms/${code}/messages`);
  await push(messagesRef, {
    type: 'system',
    text: `Mission initialized. Room code: ${code}`,
    timestamp: Date.now()
  });
  await push(messagesRef, {
    type: 'scenario',
    text: scenario.setup,
    timestamp: Date.now()
  });

  listenToRoom(code);
}

export async function joinRoom(code) {
  if (!code || code.trim().length === 0) {
    alert('Please enter a room code');
    return false;
  }

  const roomRef = ref(database, `rooms/${code}`);
  const snapshot = await get(roomRef);
  
  if (!snapshot.exists()) {
    alert('Room not found! Check the code and try again.');
    return false;
  }

  const roomData = snapshot.val();
  const existingPlayers = roomData.players || {};
  const playerCount = Object.keys(existingPlayers).length;

  if (playerCount >= 6) {
    alert('Room is full! Maximum 6 players.');
    return false;
  }

  state.roomCode = code;
  state.selectedScenario = roomData.scenario;
  state.spotlightPlayer = roomData.spotlightPlayer;
  
  // Assign role from scenario if available, otherwise "Support"
  if (roomData.scenario && roomData.scenario.roles && playerCount < roomData.scenario.roles.length) {
    state.playerRole = roomData.scenario.roles[playerCount].id;
  } else {
    state.playerRole = 'Support';
  }
  
  state.gameState = 'playing';

  const playerRef = ref(database, `rooms/${code}/players/${state.playerId}`);
  await set(playerRef, {
    role: state.playerRole,
    joined: Date.now()
  });

  const messagesRef = ref(database, `rooms/${code}/messages`);
  await push(messagesRef, {
    type: 'system',
    text: `${getRoleLabel(state.playerRole, state.selectedScenario)} has joined the mission.`,
    timestamp: Date.now()
  });

  listenToRoom(code);
  return true;
}

export function listenToRoom(code) {
  const messagesRef = ref(database, `rooms/${code}/messages`);
  const playersRef = ref(database, `rooms/${code}/players`);

  onValue(messagesRef, (snapshot) => {
    state.messages = [];
    snapshot.forEach((child) => {
      state.messages.push({ id: child.key, ...child.val() });
    });
    state.messages.sort((a, b) => a.timestamp - b.timestamp);
    window.renderApp && window.renderApp();
    scrollToBottom();
  });

  onValue(playersRef, (snapshot) => {
    state.players = [];
    snapshot.forEach((child) => {
      state.players.push(child.val().role);
    });
    window.renderApp && window.renderApp();
  });
}

export async function sendMessage() {
  if (!state.inputMessage || state.inputMessage.trim().length === 0) {
    return;
  }

  if (state.inputMessage.length > 500) {
    alert('Message too long. Maximum 500 characters.');
    return;
  }

  const messagesRef = ref(database, `rooms/${state.roomCode}/messages`);
  await push(messagesRef, {
    type: 'message',
    role: state.playerRole,
    text: state.inputMessage.trim(),
    timestamp: Date.now()
  });

  state.inputMessage = '';
  // Not calling renderapp here, but call it from here 
  //window.renderApp && window.renderApp();
}

function scrollToBottom() {
  setTimeout(() => {
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, 100);
}