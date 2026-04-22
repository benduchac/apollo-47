# Apollo 47 — Onboarding & Boot Sequence Design Spec

**Status**: Design phase — not yet implemented  
**Last updated**: April 2026 (revised after scenarios audit)  
**Purpose**: Replace the current scenario-picker flow with a diegetic boot sequence that sets tone, teaches the game's vibe, and earns the right to play before play begins.

---

## The Problem This Solves

The current flow is a **game launcher**, not a game. Players hit a start screen, pick a scenario from a menu, land in a lobby, and then chat. Functionally correct — but it skips the entire social and tonal contract that makes Apollo 47 work at a real table.

At a table, before play begins, players agree on tone, someone reads sample transcripts aloud, props are placed, expectations are set. None of that exists in the app. The result is a well-styled chat engine that people don't quite know how to use.

The core insight: **the vibe is the game**. We optimized for time-to-chat and accidentally skipped the part that makes chat meaningful.

The rules document says this explicitly:
- *"Set tone expectations — agree on the balance of realism vs. humor"*
- *"Read sample Mission Transcript (pages 14-17) — get into proper communication space"*
- *"Characters already know the mission — they've trained for years"* (i.e., players don't choose a scenario, they receive one)

---

## Design Principles for This Redesign

1. **The game starts at the URL.** The moment someone opens Apollo 47, they're in 1986. Not choosing a game — entering a system.
2. **The ritual earns the game.** The boot sequence isn't a delay before play. It *is* play, or at least the thing that makes play possible.
3. **Players receive their mission. They don't pick it.** The scenario is delivered as a transmission, not selected from a menu.
4. **Teach by doing.** The boot sequence models the tone, the call-and-response, the language — without ever calling itself a tutorial.
5. **Good friction is welcome.** Waiting, confirming, authenticating — these aren't UX failures. They're world-building.

---

## The New Flow

### Overview

```
PHASE 1: SYSTEM BOOT         [per player, solo, no Firebase yet]
PHASE 2: AUTHENTICATION      [solo — flavor Y/N and ACK prompts]
PHASE 3: COMMS LINK          [room create or join — Firebase begins here]
PHASE 4: AWAITING CREW       [holds until 2nd player connects]
PHASE 5: SCENE SETTING       [4th wall break — DM-style prose, social contract]
PHASE 6: COMMS ESTABLISHED   [play begins — open chat]
PHASE 7: SCENARIO DROPS      [6 messages in + 30 second timer — mission transmitted]
```

---

### PHASE 1: System Boot

**Purpose**: Establish that this is a 1986 terminal, not a web app. Set aesthetic tone before the player has made any decisions.

**Execution**: Typewriter-style text renders sequentially in the terminal. No user input required. Can be watched or skimmed — should complete in under 30 seconds even without skipping.

**Content ideas** (not final copy — needs writing pass):
```
CAPCOM SYSTEMS INC. — LUNAR COMMUNICATIONS TERMINAL v4.2.1
BIOS CHECK.....................OK
RAM: 640K      [========================================] OK
CHECKING COMMS ARRAY.......................................OK
LOADING MISSION PROTOCOL STACK.............................OK
INITIALIZING LUNAR RELAY UPLINK............................

      .    *          .       *        .      *
                                .  *
          .      *    ___
    *           __   /   \   __          .         *
        .      /  \_/ /_\ \_/  \
              |   _   ___   _   |    *
              |  | | |   | | |  |              .
         *    |  |_| |   | |_|  |
              \_______________/       *
                    [MOON]

APOLLO LUNAR COMMUNICATIONS NETWORK
UPLINK ESTABLISHED: CAPCOM-VII RELAY
LOCAL TIME: [system time]    MISSION DATE: SOL-[day]
```

**Design notes**:
- Keep the ASCII moon. It's the emotional anchor.
- RAM count, BIOS check lines — these are flavor. Don't over-engineer. Static text is fine.
- The boot should feel like it *takes* a moment — not artificially long, but not instant. Respect the ritual.
- **Open question**: Should there be a way to skip for returning players? Probably not on the first pass. Test it first.

---

### PHASE 2: Authentication

**Purpose**: Continue tone-setting while beginning to put the player in an active relationship with the terminal. These prompts have no mechanical effect on gameplay — they are entirely vibe.

**Execution**: System asks questions. Player responds. Wrong answers should either be gently corrected or accepted anyway (the system is forgiving). The point is *engagement*, not gatekeeping.

**Example prompts** (not final copy):

```
CAPCOM SECURITY PROTOCOL — LUNAR CLEARANCE VERIFICATION

This terminal requires MOON_ALPHA_II clearance.

Confirm clearance level by entering: ALPHA
> _
```

*(Player types ALPHA or anything close — system accepts)*

```
CLEARANCE CONFIRMED.

COMMUNICATION PROTOCOL REMINDER:
All transmissions are logged and subject to review.
Comms are to remain appropriate to the situation at all times.

Confirm acknowledgement by entering: ACK
> _
```

*(Player types ACK)*

```
LOGGED. PROCEEDING.
```

**Design notes**:
- These are the closest thing to a social contract in the flow. The comms conduct line is the content moderation prompt — keep it diegetic, don't break fiction to explain it.
- "ACK" is the right confirmation token. It's technical, it's in-world, it teaches the player their first piece of jargon.
- Why no "N" option? There isn't one. You're logging in. You either proceed or you close the tab. We don't need to model refusal.
- Don't add more prompts than necessary. Two is probably the right number. Three feels like a form.
- **Open question**: Should callsign/name be assigned here, or later? Could be as simple as "CALLSIGN ASSIGNED: [random NASA-style designation]" — player doesn't choose it, they receive it. Supports the "you're an astronaut, not a player" frame. This is not yet decided.

---

### PHASE 3: Comms Link

**Purpose**: This is where room creation or joining happens — but rendered as establishing a communications channel, not "creating a game lobby."

**Two entry paths** (see architecture note below):

**HOST PATH** (creates room):
```
CAPCOM UPLINK READY.

No active mission link detected.

Establish new comms link? [Y/N]
> Y

GENERATING SECURE COMMS CODE...
LINK ESTABLISHED.

MISSION COMMS CODE: APOLLO-3K7X

Share this code with your crew to establish link.
Awaiting crew signal...
```

**JOIN PATH** (joins room via shared link):
```
CAPCOM UPLINK READY.

Incoming comms link detected.
Authenticating mission code: APOLLO-3K7X...

AUTHENTICATION CONFIRMED.
Patching into active mission link...
```

**Architecture note — two URLs**:
- `apollo-47.vercel.app` → host path (always creates)
- `apollo-47.vercel.app/join?code=APOLLO-3K7X` → join path (always joins)
- Sharing the comms code = sharing a link. The link *is* the code.
- This is the cleanest architecture for web. If the game is ever packaged (Electron/Capacitor for Steam etc.), the URL paradigm breaks for deep linking. At that point, the branch would move back into a single entry point (Option A: "Establish new [N] / Join existing [J]"). Build this decision thin so it can be refactored without touching the boot sequence.

**Room constraints**:
- Maximum 4 players per room
- Minimum 2 players to begin
- Host is de facto first player / Primary

---

### PHASE 4: Awaiting Crew

**Purpose**: Hold state after room is created, while player 2 hasn't joined yet. This is currently dead time (the lobby). In the new design, it's part of the fiction.

**Host sees**:
```
COMMS LINK ACTIVE.

AWAITING CREW SIGNAL...  [blinking]

Mission cannot proceed until crew link is established.
Share your comms code: APOLLO-3K7X
```

**Joiner sees** (after joining):
```
PATCH CONFIRMED.
STANDING BY FOR MISSION BRIEF...  [blinking]
```

**When 2nd player joins**, both terminals update:

```
CREW SIGNAL CONFIRMED.
LINK ESTABLISHED — 2 CREW CONNECTED.

INITIATING MISSION BRIEF...
```

**Design notes**:
- The blinking "AWAITING" is important. It's not frozen — it's alive and waiting.
- Don't show a player list here. This isn't a lobby. There's no "Player 1 (Host), Player 2 (Joined)" UI. That's an app. This is a terminal.
- If more players join later (up to 4), they slot in silently: *"CREW UPDATED — 3 CONNECTED."* No fanfare.

---

### PHASE 5: Scene Setting

**Purpose**: Break the fourth wall deliberately and briefly. Orient the player as a human being before they become a character. Then rebuild the fiction stronger than before.

**This is a DM voiceover moment.** Not the system. Not CAPCOM. The game itself speaking.

**Structure**:
1. Brief prose scene-setting (2–4 sentences)
2. Tone confirmation (ACK)
3. Transition back into the fiction

**Example** (not final copy — this needs careful writing, it's the most important text in the game):

```
────────────────────────────────────────────────────

MISSION BRIEF

Your suit feels heavy in the way you've stopped noticing.
You're standing on a ridge of Mare Singularis, forty days
into your lunar rotation, looking out across a landscape
that stopped being impressive around day three.

Your rover is parked behind you. Your wrist comms are
blinking. There's something flapping on the array ahead.

You just want to finish your task and go home.

────────────────────────────────────────────────────

You are about to improvise a space mission.

There are no right answers. Technical jargon you invent
is as valid as anything NASA ever wrote. Small problems
are the whole game. When something doesn't make sense,
talk through it and keep going.

Your crew will support you. You will support them.

Ready to establish contact?

Enter: ACK
> _
```

**Design notes**:
- The prose paragraph is the most important writing in the entire app. It needs multiple revision passes. It should feel like the opening line of a very good novel.
- The 4th wall break is intentional and should feel intentional — not apologetic. "You are about to improvise" is confident, not hedging.
- This is where the real social contract lives. *Small problems are the whole game* is the most important instruction. It earns its place here.
- Don't explain too much. Three short paragraphs maximum. Players learn by playing.
- Each player sees their own version independently — this is individual orientation, not a shared story beat.
- **The scene-setting prose is role-specific and already exists in seed form.** The `context` field on every role in `scenarios-enhanced.js` is this prose, written for the old pre-game lobby. It does not need to be created from scratch — it needs a voice and expansion pass. The generic placeholder above is for the social contract portion only; the physical scene-setting will draw from the player's assigned role `context`. See scenarios audit section below for full detail on this writing task.

---

### PHASE 6: Comms Established — Play Begins

**Purpose**: Transition into the chat interface. The scenario has not arrived yet. Players are present, in character, with no specific mission. This is intentional.

```
COMMS FULLY ESTABLISHED.
ALL CREW CONNECTED.

BEGIN TRANSMISSION.

────────────────────────────────────────────────────
```

Chat interface opens. Players can begin talking. No scenario card. No role labels beyond PRIMARY / SUPPORT (which were assigned at join).

**Why no scenario yet**: Players need a few exchanges to find their footing, hear each other's voice, establish the rhythm of call-and-response. Dropping the scenario immediately front-loads too much. The scenario should feel like it *interrupts* something that's already happening.

**Design notes**:
- The chat interface that opens here should feel continuous with the boot sequence — same aesthetic, same terminal feel. Not a mode switch.
- Players may feel briefly uncertain about what to say. That's fine. That's the good friction. The scenario arriving will give them direction.

---

### PHASE 7: Scenario Drops

**Purpose**: The mission complication arrives as a CAPCOM transmission mid-conversation. Simultaneously, a mission reference panel becomes available in the UI.

**Trigger**: 6 messages have been sent (across all players) AND 30 seconds have elapsed since the 6th message. Both conditions must be true.

*Rationale: 6 messages is enough for players to have found their footing. The 30-second delay prevents the scenario from dropping mid-sentence and gives it a feeling of arriving from outside rather than being triggered by a specific message.*

**Delivery — chat transmission**:

```
────────────────────────────────────────────────────
PRIORITY TRANSMISSION — CAPCOM
────────────────────────────────────────────────────

[scenario.setup text]

────────────────────────────────────────────────────
END TRANSMISSION
────────────────────────────────────────────────────
```

**Delivery — sidebar panel** (appears simultaneously with transmission):

The sidebar or collapsible panel slides in when the transmission arrives. It contains, in order:

1. **MISSION BRIEF** — `scenario.briefing` for this player's specific role. This is the player's private objective/orientation. Only they see their own briefing.
2. **TECHNICAL REFERENCE** — `scenario.technicalDetails` array. The equipment codes, readings, and jargon prompts. Shared across all players (this is reference material, not secret).

The panel is collapsed by default and indicated by a subtle UI element ("MISSION DATA RECEIVED" or similar). Players open it when they want it. It does not interrupt play.

**Design notes**:
- The transmission appears as a system message in chat, visually distinct from player messages.
- A brief "INCOMING PRIORITY TRANSMISSION..." beat should precede the text by a few seconds — makes it feel like an event, not a pop-in.
- Genuine surprise to all players including host. Nobody chose this scenario.
- Scenario selection is random from the pool, handled silently by the system at room creation. The selected scenario is stored in Firebase with the room so all players receive the same one.
- The sidebar arriving *with* the transmission is the moment the game gets its shape. Before this, players are just astronauts somewhere. After this, they have a problem.
- `technicalDetails` already existed in the UI in some form — confirm with the existing implementation whether this panel needs to be built or just populated differently.

---

## Scenarios Audit — Field-by-Field

Conducted against `scenarios-enhanced.js` after the onboarding redesign. Documents what each field does now, what it does in the new flow, and any work required.

| Field | Old use | New use | Status |
|---|---|---|---|
| `title` | Scenario picker header, lobby | Transmission header in Phase 7 | ✅ No changes needed |
| `setup` | Lobby description visible to all | Body of Phase 7 CAPCOM transmission | ✅ No changes needed |
| `context` | 1–2 sentence lobby teaser per role | Phase 5 scene-setting prose per role | ⚠️ **Writing pass required** — see below |
| `briefing` | Pre-game role objective, lobby | Mission reference sidebar, Phase 7 | ⚠️ **Voice pass required** — see below |
| `technicalDetails` | Reference panel (partially implemented) | Mission reference sidebar, Phase 7 | ✅ Already has a home — confirm implementation |
| `label` | Chat display name | Chat display name | ✅ Unchanged |
| `isPrimary` | Role assignment | Role assignment | ✅ Unchanged |
| `getRandomScenarios()` | Returns 6 for player to choose | Needs to return 1 silently at room creation | ⚠️ Logic change required |

---

### Writing Task: `context` fields

**What they are now**: Short physical situating sentences written for the pre-game lobby. Minimalist by design — just enough to tease the role before play.

> *"You're kneeling in fine lunar dust, drill in hand, sweat pooling inside your suit. The sun is directly overhead. You've been at this exact spot for two hours."*

**What they need to become**: The Phase 5 scene-setting prose — the thing a player reads in the moment before they become their character. Warmer, more immersive, more complete. This is the first and last time the game speaks to them as a narrator rather than as CAPCOM.

**The expansion**: 1–2 sentences → 3–5 sentences. Keep the physical grounding that's already there. Add: one emotional beat, one small sensory detail, one thing the character notices or is thinking about. Do not add plot. Do not foreshadow the scenario (it hasn't arrived yet).

**Example expansion**:

Before:
> *"You're kneeling in fine lunar dust, drill in hand, sweat pooling inside your suit. The sun is directly overhead. You've been at this exact spot for two hours."*

After:
> *"You're kneeling in fine lunar dust, drill in hand, sweat pooling in the small of your back where the suit doesn't breathe. The sun is directly overhead and your visor polarization is maxed. You've been at this exact spot for two hours. There's a smudge on your left glove from where you grabbed the drill housing without thinking. You keep meaning to check if that's lubricant or something else."*

**Volume**: Every role in every scenario needs this pass. That's roughly 80–100 roles across normal and unsettling scenarios. This is a real writing project — probably 2–3 days of focused work. Can be AI-drafted and human-edited. Quality bar is high because this is the first thing players read.

---

### Writing Task: `briefing` fields

**What they are now**: Terse mission objectives, written in second person imperative. Designed to be scanned quickly in a pre-game lobby.

> *"Find where the power is going. Check every circuit, every system, every connection. Energy doesn't just vanish."*

**What they need to become**: The same information, but written for a sidebar that a player glances at mid-play — not a briefing they read before starting. The voice should stay direct and practical but can afford one sentence of texture. Think: a post-it note left by someone who knows you well.

**The change is smaller than `context`**: These don't need major expansion, just a slight loosening of the voice. Some are already good. Flag the ones that feel too sparse or too game-y in tone.

**Volume**: Same as above — every role. Smaller lift than the `context` pass since the content is right, just the voice needs adjusting.

---

## What's Being Removed / Changed

| Current | New |
|---|---|
| Start screen with "New Game / Join Game" buttons | Replaced entirely by boot sequence |
| Scenario selection screen (6 random scenarios) | Removed — scenario assigned randomly at room creation |
| Lobby screen with room code + role display | Replaced by "AWAITING CREW" terminal state |
| Immediate scenario visibility on join | Scenario arrives mid-play as Phase 7 transmission |
| Role briefing shown pre-game | Role briefing in mission sidebar, revealed with Phase 7 |
| `getRandomScenarios()` returning 6 for player choice | Returns 1 silently, stored in Firebase room |

---

## What's Not Changing (Yet)

- Firebase room system and room codes
- Chat interface and real-time sync
- Scenario data structure in `scenarios-enhanced.js` (fields stay, content gets writing pass)
- Role assignment logic (host = PRIMARY)
- Message limits (500 chars)
- Max players (changing to 4, was 6)

---

## Open Questions (Ranked by Urgency)

**Must decide before coding:**

1. **Callsign assignment** — Should players be assigned a callsign/designation during Phase 2 auth? Low-complexity, high-value for immersion. Tentatively yes — assign randomly (NASA-style: CHEN-7, BAKER-3). Needs decision because it affects what Phase 2 renders and what gets stored in Firebase.

2. **Skip mechanism** — Should returning players be able to skip or accelerate the boot sequence? First instinct: no. Test the timing first. If the boot is under 60 seconds and feels purposeful, nobody wants to skip. Optimize content before adding a skip.

**Decide during development:**

3. **"INCOMING" beat before Phase 7** — Brief transmission-incoming cue before the scenario text renders. Leaning yes. Duration TBD during testing.

4. **Sidebar default state** — Collapsed (player opens it) vs. briefly open then auto-collapsing. Collapsed default is lower interruption. Test both.

5. **`technicalDetails` visibility** — Are technical details visible to all players in the sidebar, or only the primary? Leaning all players — it's reference material, not secret intel. Confirm this matches the game design intent.

---

## Tone Reference

The writing throughout the boot sequence should feel like:
- *A worn machine that's been to the moon a hundred times*
- *Bureaucratic without being cold*
- *Technical without being accurate*
- *The first chapter of a good short story, not the instructions for a board game*

The `context` expansions specifically should feel like the opening paragraph of a piece of literary fiction — grounded, sensory, not trying too hard.

Sample transcript from the rules (pages 14–17) should be referenced when writing Phase 5 prose. The call-and-response rhythm there is the model for how play should feel once it begins.

---

## Implementation Notes for Claude Code

**Execution order** — build and test phases independently:

1. **Phase 1–2** — Pure frontend, no Firebase. Sequential DOM updates with timing. Can be built and tested in complete isolation. Get the timing right here before touching anything else.
2. **Phase 3** — Firebase initializes. Room create/join logic. Two-URL architecture: no `?code` param = host, `?code=XXXX` = joiner.
3. **Phase 4** — Firebase listener on player count. Holds at "AWAITING CREW SIGNAL" until count ≥ 2.
4. **Phase 5** — Triggers per player when crew assembles. Pulls `context` field for their assigned role and renders expanded prose + social contract ACK.
5. **Phase 6** — Opens existing chat interface. Minimal changes — this is already built.
6. **Phase 7** — New logic: message counter + 30-second timer in `game.js`. New "system transmission" message type renders differently in chat. Sidebar/panel component appears simultaneously. Pulls `setup` for transmission, `briefing` for player's role panel, `technicalDetails` for shared reference panel.

**`getRandomScenarios()` change**: Remove the "return 6 for player to choose" logic. Replace with a single random selection that runs at room creation and stores the chosen scenario index (or title) in Firebase with the room data. All players derive their scenario from Firebase, not from local selection.

**Sidebar/panel**: Check existing implementation — `technicalDetails` may already have a panel component. If so, `briefing` just needs to be added to it and the panel needs to be hidden until Phase 7 triggers.

---

*Update this document as decisions are made. Move resolved questions into their relevant phase section with a note on what was decided and why. Don't delete resolved questions — the reasoning is part of the record.*
