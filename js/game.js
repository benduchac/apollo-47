import { database } from './firebase-config.js';
import { ref, set, push, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { getRandomScenario } from './scenarios-enhanced.js';

// Preheat the Firebase WebSocket connection at module load time so the first
// real write (createRoom) doesn't block waiting for cold-start handshake.
onValue(ref(database, '.info/connected'), () => {});

let typingTimeout = null;

export const callbacks = {
  onStateChange: null,
  onTypingChange: null,
  onSendStatusChange: null,
};

export const state = {
  gameState: 'boot',
  roomCode: '',
  playerRole: '',
  playerId: Math.random().toString(36).substring(7),
  players: [],
  messages: [],
  spotlightPlayer: '',
  inputMessage: '',
  selectedScenario: null,
  typingPlayers: [],
  sendStatus: null,
  currentVoice: null,
  personalComplication: null,
  // Boot sequence / onboarding
  callsign: '',
  terminalInput: '',
  authStep: 0,
  joinCode: null,
  awaitingDisplayed: false,
  crewAssembled: false,
  // Phase 7
  scenarioDropped: false,
  scenarioDropTimer: null,
};

const CALLSIGN_WORDS = [
  'ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF', 'HOTEL',
  'INDIA', 'JULIET', 'KILO', 'LIMA', 'MIKE', 'NOVEMBER', 'OSCAR', 'PAPA',
  'QUEBEC', 'ROMEO', 'SIERRA', 'TANGO', 'UNIFORM', 'VICTOR', 'WHISKEY',
  'XRAY', 'YANKEE', 'ZULU',
  'APOLLO', 'LUNA', 'SOLAR', 'RELAY', 'ORBIT', 'BEACON', 'VECTOR', 'ZENITH',
  'NOVA', 'RESOLUTE', 'MISSION', 'TRANSIT', 'HORIZON', 'POLAR', 'MERIDIAN',
];

export function generateCallsign() {
  const word = CALLSIGN_WORDS[Math.floor(Math.random() * CALLSIGN_WORDS.length)];
  const num = Math.floor(Math.random() * 9) + 1;
  return `${word}-${num}`;
}

export function getPlayerBriefing(role, scenario) {
  if (scenario && scenario.roles) {
    const roleData = scenario.roles.find(r => r.id === role);
    if (roleData) {
      return roleData;
    }
  }

  if (role === 'Support') {
    return {
      context: "You're providing mission support from your station.",
      briefing: 'Assist the primary crew member and help solve problems.'
    };
  }

  return {
    context: 'Preparing for mission...',
    briefing: 'Awaiting mission briefing...'
  };
}

export function isPrimaryRole() {
  if (!state.selectedScenario || !state.selectedScenario.roles) return false;
  const primaryRole = state.selectedScenario.roles.find(r => r.isPrimary);
  return primaryRole && state.playerRole === primaryRole.id;
}

export function getDisplayRole() {
  return state.currentVoice || state.playerRole;
}

export function switchVoice(newVoice) {
  const previousVoice = state.currentVoice || state.playerRole;
  state.currentVoice = newVoice;

  const messagesRef = ref(database, `rooms/${state.roomCode}/messages`);
  push(messagesRef, {
    type: 'voice_switch',
    previousVoice: previousVoice,
    newVoice: newVoice,
    timestamp: Date.now()
  });

  callbacks.onStateChange?.();
}

export function getRoleLabel(role, scenario) {
  if (scenario && scenario.roles) {
    const roleData = scenario.roles.find(r => r.id === role);
    if (roleData) {
      return roleData.label;
    }
  }

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

export function isSupport() {
  if (!state.selectedScenario || !state.selectedScenario.roles) return false;
  const primaryRole = state.selectedScenario.roles.find(r => r.isPrimary);
  return primaryRole && state.playerRole !== primaryRole.id;
}

export async function createRoom() {
  const scenario = getRandomScenario();
  const code = generateRoomCode();
  state.roomCode = code;
  state.selectedScenario = scenario;

  const primaryRole = scenario.roles[0].id;
  state.playerRole = primaryRole;
  state.spotlightPlayer = primaryRole;
  state.gameState = 'awaiting';
  state.crewAssembled = false;
  state.awaitingDisplayed = false;

  const roomRef = ref(database, `rooms/${code}`);
  await set(roomRef, {
    created: Date.now(),
    scenario: {
      title: scenario.title,
      setup: scenario.setup,
      roles: scenario.roles,
      technicalDetails: scenario.technicalDetails || []
    },
    spotlightPlayer: primaryRole,
    scenarioDropped: false,
    players: {
      [state.playerId]: {
        role: primaryRole,
        callsign: state.callsign,
        joined: Date.now()
      }
    }
  });

  listenToRoom(code);
}

export async function joinRoom(code) {
  if (!code || code.trim().length === 0) {
    return { success: false, error: 'No room code provided.' };
  }

  const roomRef = ref(database, `rooms/${code}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    return { success: false, error: 'AUTHENTICATION FAILED. MISSION CODE NOT FOUND.' };
  }

  const roomData = snapshot.val();
  const existingPlayers = roomData.players || {};
  const playerCount = Object.keys(existingPlayers).length;

  if (playerCount >= 4) {
    return { success: false, error: 'CREW AT CAPACITY. MAXIMUM 4 CREW MEMBERS.' };
  }

  state.roomCode = code;
  state.selectedScenario = roomData.scenario;
  state.spotlightPlayer = roomData.spotlightPlayer;
  state.scenarioDropped = roomData.scenarioDropped || false;
  state.gameState = 'awaiting';
  state.crewAssembled = false;
  state.awaitingDisplayed = false;

  if (roomData.scenario && roomData.scenario.roles && playerCount < roomData.scenario.roles.length) {
    state.playerRole = roomData.scenario.roles[playerCount].id;
  } else {
    state.playerRole = 'Support';
  }

  const playerRef = ref(database, `rooms/${code}/players/${state.playerId}`);
  await set(playerRef, {
    role: state.playerRole,
    callsign: state.callsign,
    joined: Date.now()
  });

  // Push a status update if joining a room that already has crew
  if (playerCount >= 2) {
    const messagesRef = ref(database, `rooms/${code}/messages`);
    await push(messagesRef, {
      type: 'system',
      text: `CREW UPDATED — ${playerCount + 1} CONNECTED.`,
      timestamp: Date.now(),
      visibility: 'all'
    });
  }

  listenToRoom(code);
  return { success: true };
}

export async function triggerScenarioDrop() {
  if (!isPrimaryRole()) return;
  if (state.scenarioDropped) return;

  const droppedRef = ref(database, `rooms/${state.roomCode}/scenarioDropped`);
  const snapshot = await get(droppedRef);
  if (snapshot.val() === true) return;

  const messagesRef = ref(database, `rooms/${state.roomCode}/messages`);
  await push(messagesRef, {
    type: 'transmission',
    text: state.selectedScenario.setup,
    timestamp: Date.now(),
    visibility: 'all'
  });

  await set(droppedRef, true);
}

export function listenToRoom(code) {
  const messagesRef = ref(database, `rooms/${code}/messages`);
  const playersRef = ref(database, `rooms/${code}/players`);
  const scenarioDroppedRef = ref(database, `rooms/${code}/scenarioDropped`);

  onValue(messagesRef, (snapshot) => {
    state.messages = [];
    snapshot.forEach((child) => {
      state.messages.push({ id: child.key, ...child.val() });
    });
    state.messages.sort((a, b) => a.timestamp - b.timestamp);

    // Remove typing indicator for roles whose message just arrived
    const fiveSecondsAgo = Date.now() - 5000;
    state.typingPlayers = state.typingPlayers.filter(role => {
      const justSent = state.messages.some(
        m => m.type === 'message' && m.role === role && m.timestamp >= fiveSecondsAgo
      );
      if (justSent) {
        if (typingRemovalTimers[role]) {
          clearTimeout(typingRemovalTimers[role]);
          delete typingRemovalTimers[role];
        }
        return false;
      }
      return true;
    });

    // Phase 7: start scenario drop timer after 6 player messages
    if (state.gameState === 'playing' && !state.scenarioDropped && !state.scenarioDropTimer) {
      const playerMsgCount = state.messages.filter(m => m.type === 'message').length;
      if (playerMsgCount >= 6) {
        state.scenarioDropTimer = setTimeout(triggerScenarioDrop, 30000);
      }
    }

    callbacks.onStateChange?.();
  });

  onValue(playersRef, (snapshot) => {
    state.players = [];
    snapshot.forEach((child) => {
      state.players.push(child.val().role);
    });
    callbacks.onStateChange?.();
  });

  onValue(scenarioDroppedRef, (snapshot) => {
    if (snapshot.val() === true && !state.scenarioDropped) {
      state.scenarioDropped = true;
      if (state.scenarioDropTimer) {
        clearTimeout(state.scenarioDropTimer);
        state.scenarioDropTimer = null;
      }
      callbacks.onStateChange?.();
    }
  });

  listenToTyping(code);
}

export async function sendMessage() {
  if (!state.inputMessage || state.inputMessage.trim().length === 0) {
    return;
  }

  if (state.inputMessage.length > 500) {
    alert('Message too long. Maximum 500 characters.');
    return;
  }

  const messageToSend = state.inputMessage.trim();
  state.inputMessage = '';

  state.sendStatus = 'sending';
  callbacks.onSendStatusChange?.();

  const messagesRef = ref(database, `rooms/${state.roomCode}/messages`);
  await push(messagesRef, {
    type: 'message',
    role: state.playerRole,
    text: messageToSend,
    timestamp: Date.now(),
    visibility: 'all'
  });

  await updateTypingStatus(false);

  state.sendStatus = 'sent';
  callbacks.onSendStatusChange?.();

  setTimeout(() => {
    state.sendStatus = null;
    callbacks.onSendStatusChange?.();
  }, 300);
}

export async function updateTypingStatus(isTyping) {
  if (!state.roomCode) return;

  const typingRef = ref(database, `rooms/${state.roomCode}/typing/${state.playerId}`);

  if (isTyping) {
    await set(typingRef, {
      role: state.playerRole,
      timestamp: Date.now()
    });

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(async () => {
      await set(typingRef, null);
    }, 3000);
  } else {
    await set(typingRef, null);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  }
}

const typingRemovalTimers = {};

export function listenToTyping(code) {
  const typingRef = ref(database, `rooms/${code}/typing`);

  onValue(typingRef, (snapshot) => {
    const activeTypers = new Set();
    snapshot.forEach((child) => {
      const data = child.val();
      if (child.key !== state.playerId && data) {
        activeTypers.add(data.role);
      }
    });

    activeTypers.forEach(role => {
      if (!state.typingPlayers.includes(role)) {
        state.typingPlayers.push(role);
      }
      if (typingRemovalTimers[role]) {
        clearTimeout(typingRemovalTimers[role]);
        delete typingRemovalTimers[role];
      }
    });

    state.typingPlayers.forEach(role => {
      if (!activeTypers.has(role) && !typingRemovalTimers[role]) {
        const fiveSecondsAgo = Date.now() - 5000;
        const messageAlreadyArrived = state.messages.some(
          m => m.type === 'message' && m.role === role && m.timestamp >= fiveSecondsAgo
        );
        typingRemovalTimers[role] = setTimeout(() => {
          state.typingPlayers = state.typingPlayers.filter(r => r !== role);
          delete typingRemovalTimers[role];
          callbacks.onTypingChange?.();
        }, messageAlreadyArrived ? 0 : 500);
      }
    });

    callbacks.onTypingChange?.();
  });
}
