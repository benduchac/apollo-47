# CLAUDE.md — Apollo 47

## What This Is

Apollo 47 is a web-based multiplayer text chat game. Players improvise stories about mundane moon mission problems. One player is the "Primary" astronaut dealing with a problem; others are "Support" voices (Mission Control, crew) helping via radio. It's based on a tabletop RPG by Tim Hutchings.

**Read GAME_DESIGN.md before making any gameplay or UI decisions.** It contains the game rules, design philosophy, and scenario structure that drive every technical choice.

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, Tailwind CSS via CDN
- **Backend**: Firebase Realtime Database (real-time sync)
- **Deployment**: Vercel (auto-deploys from GitHub)
- **No build process.** No bundler, no framework, no transpiler. Files are served as-is.

## Project Structure

```
apollo47/
├── index.html                   # Single-page app entry point
├── css/
│   └── style.css                # Custom styles (Tailwind handles most layout)
├── js/
│   ├── firebase-config.js       # Firebase initialization + config
│   ├── scenarios-enhanced.js    # 40 scenarios (20 normal, 20 unsettling) + helpers
│   ├── prompts.js               # Jargon word lists (verbs, adjectives, equipment, etc.)
│   ├── utils.js                 # Shared utilities (escapeHtml)
│   ├── game.js                  # Game state management, all Firebase operations
│   └── app.js                   # UI rendering, DOM events, screen transitions
└── README.md
```

## Architecture

### State Management
- Single `state` object in `game.js` holds all game state (room, player, messages, etc.)
- State flows one direction: Firebase → state → UI
- No local state caching beyond what's in the `state` object

### File Responsibilities
- **`game.js`**: Owns the `state` object. All Firebase reads/writes happen here. Exports functions and a `callbacks` object that `app.js` populates to receive notifications.
- **`app.js`**: Owns the DOM. Imports from `game.js`. Renders UI based on state. Handles user input. Registers callbacks on `game.js`'s `callbacks` object (no `window.*` coupling).
- **`scenarios-enhanced.js`**: Pure data + helper functions. Exports `NORMAL_SCENARIOS`, `UNSETTLING_SCENARIOS`, `getRandomScenarios()`.
- **`prompts.js`**: Pure data. Exports word lists (`MOON_VERBS`, `EQUIPMENT_ADJECTIVES`, `THINGS`, `PROTOCOL`) and helpers used by the in-game reference panel.
- **`firebase-config.js`**: Firebase app initialization. Exports the database reference.

### Game Flow (screens)
1. **Start Screen** → player chooses "Start New Mission" or "Join Room"
2. **Scenario Selection** → shows 6 random scenarios (4 normal + 2 unsettling)
3. **Lobby** → shows room code, assigned role, scenario briefing. Waits for players.
4. **Dispatch** → support players only. Cinematic briefing screen before entering chat. Primary players skip this.
5. **Playing** → real-time chat with role labels. Includes the "Astronaut Assistance Button" reference panel (jargon, things, protocol, briefing tabs).

### Room/Player System
- Room codes: format `APOLLO-XXXX` (4 alphanumeric chars)
- First player to create a room picks the scenario and gets the Primary role
- Subsequent players joining get Support roles from the scenario's `roles` array
- 2-6 players per room
- Player identity is per-session (no accounts yet)

### Firebase Data Shape
```
rooms/
  APOLLO-X7K2/
    created: timestamp
    scenario: { title, setup, roles[] }   # technicalDetails stays client-side only
    spotlightPlayer: roleId
    players/
      playerId1: { role, joined }
      playerId2: { role, joined }
    messages/
      msgId: { type, role, text, timestamp, visibility }
      # type: "system" | "scenario" | "message"
      # visibility: "all" | "primary" | "support"
    typing/
      playerId: { role, timestamp }       # cleared after 3s of inactivity
```

## Code Conventions

- ES6 modules with named exports
- `async/await` for all Firebase operations
- Template literals for HTML generation (no JSX, no templating library)
- Functional style — minimal classes, functions over methods
- Firebase does not accept `undefined` values — always use `null` or omit the field

## Key Constraints

- **No build step.** Don't add webpack, vite, rollup, or any bundler. Don't add TypeScript. The simplicity is intentional.
- **No UI frameworks.** No React, Vue, Svelte. Vanilla JS only.
- **Messages are max 500 characters.**
- **Scenarios use second-person briefings** ("You're trying to...") without game jargon like "your goal is to create dramatic tension."
- **The game has no mechanics.** No dice, no health, no stats, no win condition. It's pure improv chat.

## Common Gotchas

- Must import functions in `app.js` from `game.js` — they're separate modules
- Firebase requires all field values to be defined (no `undefined`)
- Template literal strings with quotes inside need escaping
- Comma placement in `scenarios.js` data structures — easy to break
- After deploying, hard refresh (Ctrl+Shift+R) may be needed to see changes
- The `getRandomScenarios()` function selects 4 normal + 2 unsettling, shuffled together

## Testing

- No test framework currently. Test manually in browser.
- Open browser console (F12) for errors.
- Firebase data is visible in Firebase Console → Realtime Database.
- Test locally with VS Code Live Server or `python -m http.server 8000`.  or `python3 -m http.server 8080 --directory /apollo-47-root-directory/`
- Test multiplayer by opening two browser tabs/windows.

## Known Issues

- Rooms never expire (no cleanup)
- Players who close the browser stay in the room forever
- No reconnection if Firebase connection drops
- No message edit/delete
- Primary role assignment is automatic and can't be changed

## Future Direction (Roadmap)

These are planned but not yet built. See GAME_DESIGN.md for context on why each matters.

- **CRT visual effects**: Scanlines, phosphor glow, screen curvature (CSS first, then Canvas/WebGL)
- **Room persistence**: Rejoin games after refresh
- **Session export**: Download chat transcript
- **Scene timer**: Optional 3-5 minute timer per scene
- **User accounts**: Save games, return to active sessions
- **Desktop packaging**: Electron wrapper around the web app
