import { database } from './firebase-config.js';
import { ref, set, push, onValue, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

let typingTimeout = null;

// Registered by app.js — replaces window.* coupling
export const callbacks = {
  onStateChange: null,
  onTypingChange: null,
  onSendStatusChange: null,
};

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
  typingPlayers: [],
  sendStatus: null,
  currentVoice: null,
  personalComplication: null
};

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
      briefing: "Assist the primary crew member and help solve problems."
    };
  }

  return {
    context: "Preparing for mission...",
    briefing: "Awaiting mission briefing..."
  };
}

export function isPrimaryRole() {
  if (!state.selectedScenario || !state.selectedScenario.roles) return false;
  const primaryRole = state.selectedScenario.roles.find(r => r.isPrimary);
  return primaryRole && state.playerRole === primaryRole.id;
}

export function getAvailableVoices() {
  if (!state.selectedScenario || !state.selectedScenario.roles) {
    return [];
  }

  const voices = state.selectedScenario.roles.map(role => ({
    id: role.id,
    label: role.label
  }));

  if (!voices.find(v => v.id === 'Support')) {
    voices.push({ id: 'Support', label: 'Support' });
  }

  return voices;
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

export async function createRoom(scenario) {
  const code = generateRoomCode();
  state.roomCode = code;
  state.selectedScenario = scenario;

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
    timestamp: Date.now(),
    visibility: 'all'
  });

  await push(messagesRef, {
    type: 'scenario',
    text: scenario.setup,
    timestamp: Date.now(),
    visibility: 'all'
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

  if (roomData.scenario && roomData.scenario.roles && playerCount < roomData.scenario.roles.length) {
    state.playerRole = roomData.scenario.roles[playerCount].id;
  } else {
    state.playerRole = 'Support';
  }

  const isPrimary = roomData.scenario?.roles?.[0]?.id === state.playerRole;
  state.gameState = isPrimary ? 'playing' : 'dispatch';

  const playerRef = ref(database, `rooms/${code}/players/${state.playerId}`);
  await set(playerRef, {
    role: state.playerRole,
    joined: Date.now()
  });

  const messagesRef = ref(database, `rooms/${code}/messages`);
  const isFirstSupport = playerCount === 1;

  if (isFirstSupport) {
    const primaryLabel = roomData.scenario.roles[0].label;

    await push(messagesRef, {
      type: 'system',
      text: `${getRoleLabel(state.playerRole, state.selectedScenario)} connected to channel. ${primaryLabel}, what's your status?`,
      timestamp: Date.now(),
      visibility: 'primary'
    });

    await push(messagesRef, {
      type: 'system',
      text: `Support successfully connected to channel. ${getRoleLabel(state.playerRole, state.selectedScenario)}, please transmit your message`,
      timestamp: Date.now(),
      visibility: 'support'
    });
  } else {
    await push(messagesRef, {
      type: 'system',
      text: `${getRoleLabel(state.playerRole, state.selectedScenario)} has joined the mission.`,
      timestamp: Date.now(),
      visibility: 'all'
    });
  }

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

    // Remove typing indicator immediately for any role whose message just arrived
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

    callbacks.onStateChange?.();
  });

  onValue(playersRef, (snapshot) => {
    state.players = [];
    snapshot.forEach((child) => {
      state.players.push(child.val().role);
    });
    callbacks.onStateChange?.();
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

    // Immediately show new typers; cancel any pending removal for them
    activeTypers.forEach(role => {
      if (!state.typingPlayers.includes(role)) {
        state.typingPlayers.push(role);
      }
      if (typingRemovalTimers[role]) {
        clearTimeout(typingRemovalTimers[role]);
        delete typingRemovalTimers[role];
      }
    });

    // Delay removal so the indicator persists until the message arrives —
    // but skip the delay if the message already beat the typing-cleared event here
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
