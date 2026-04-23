# MISSION_BRIEFING_DESIGN.md — Apollo 47

## Purpose of This Document

This document captures design decisions made about how players are introduced to a mission and how scenario information is revealed during play. It covers scene-setting content, kickstart prompts, priority transmissions, and sidebar reference. It should be read alongside `GAME_DESIGN.md`.

---

## The Problem This Solves

The original build functioned as a chat engine but skipped the ritual that makes the game work at a real table. Players arrived at a chat screen with no sense of place, no clear first move, and a lobby-style briefing that told them everything upfront — removing the most interesting moment in the game, which is the scenario arriving as a surprise mid-conversation.

The redesign moves all story content out of the lobby and into the play experience itself.

---

## The Player Journey

### 1. Boot Sequence
Diegetic terminal boot sequence. Sets tone and aesthetic. No story content here — this is atmosphere only.

### 2. Scene Setting
Each player sees a short paragraph describing where they are physically. This is the primary piece of role-specific content each player receives before play begins.

**What it must do:**
- Put the player somewhere specific and physical
- Use named, visible things — equipment, labels, furniture, objects in hand
- Include history baked into the environment — worn paint, a bad repair job, a smudged printout
- Require no prior knowledge of the game or setting to understand
- End with the player ready to act, not still reading

**What it must not do:**
- Explain the game
- Explain the player's role or objectives
- Reference the scenario problem — players don't know what it is yet
- Use poetic or abstract language — concrete and specific only

**Voice:** Third person present tense, direct. Written like stage directions, not a novel. Small human details are encouraged (cold coffee, chipped paint, a cartoon someone drew in the margin). The world existed before this moment.

**Example (EVA Astronaut, Antenna Alignment):**
> "The moon's surface stretches out in every direction — gray dust, shallow craters, black sky. Earth hangs over the horizon, a blue crescent. You're on the roof of the habitat: a flat white box with LUN-03 stenciled in chipped black paint across the center. The antenna cluster towers above you — black cables, thin white aerials, and a silver dish with a tear in it from last year's meteorite storm. It's been intermittent ever since the repair team stripped the mounting bolts. Wrench in your hand. Suit radio open."

**Example (CAPCOM, Antenna Alignment):**
> "Mission Control, Houston. Your desk is third row from the front, position 4 — a laminated card taped to the console says CAPCOM in faded red letters. Two screens: flight data on the left, azimuth coordinates on the right. The numbers haven't moved in twenty minutes. Around you, fifteen other people are staring at their own screens, headsets on, doing the same thing you're doing — waiting for something to happen. Your radio is live."

---

### 3. Kickstart Prompt

A single short instruction that appears below the scene setting and disappears after the player's first message is sent.

**Purpose:** Solve the cold start problem. Two players, both immersed, both waiting. The Primary player needs to know it's their move and what that move looks like.

**Only the Primary player receives this prompt.** Support players are genuinely waiting for the Primary to make contact — that asymmetry is correct and should be preserved.

The prompt should:
- Identify who the player is, in plain language
- Give them two or three valid first moves so there's no wrong answer
- Explain the mechanic (type, hit return) without jargon
- Make the chat input feel like a radio, not a chat box

**Primary prompt:**
> "You're the astronaut. Give a status report, describe what you're seeing, or just check in to see if anyone is listening. Type a message and hit return to transmit."

**Support prompt (optional, if needed):**
> "You're in Mission Control. The channel is open. When the astronaut checks in, respond in character. Type a message and hit return to transmit."

The word "transmit" earns its place at the end of a plain instruction — it is not used atmospherically elsewhere in the prompt.

---

### 4. Open Improv

Players find their feet. Nobody knows what the scenario is yet. This is intentional — the conversation starts cold, which makes the transmission arrival feel like a real event rather than a recap of something they already read.

---

### 5. Priority Transmission

After the third message is sent, a 50-second timer begins. When it expires, a Priority Transmission is injected into the chat as a system message.

**Trigger:** 3 messages sent AND 50 seconds elapsed after message 3.

The 3-message gate ensures the game never fires the transmission into silence. The 50-second delay after message 3 gives the conversation room to breathe — players have found their rhythm before the problem lands.

**What it must do:**
- Name a specific problem with specific detail (panel numbers, readings, affected systems)
- Imply a deadline or consequence without being dramatic about it
- Give a measurable success condition
- Include bureaucratic tail — forms to file, procedures to follow — that makes the world feel real and gives support players something to do

**What it must not do:**
- Address a specific role — it's a broadcast, received by everyone
- Tell players how to solve the problem
- Be dramatic or urgent in tone — this is a memo, not an alarm

**Format:**
```
PRIORITY TRANSMISSION — CAPCOM
────────────────────────────────────────────────────
[Transmission body]
────────────────────────────────────────────────────
END TRANSMISSION
```

**Example (Solar Panel Dust):**
```
PRIORITY TRANSMISSION — CAPCOM
────────────────────────────────────────────────────
Power Control 3 is reporting an 18% decrease in output in the LUN-03 
solar array. Panels 1, 3, 4, and 7 are all showing linear falloff at 
low sun angles. Mission requires panels at full capacity before the 
next Orbiter transit. Diagnose the issue, restore power to >90% by 
end of EVA, and file maintenance forms MNT-020, MNT-023, and JAX-06.
────────────────────────────────────────────────────
END TRANSMISSION
```

**Transmission structure:**
1. Source and location of the report (who flagged it)
2. Specific symptoms with numbers, panel/system IDs, or readings
3. The deadline or dependency (what breaks if this isn't fixed)
4. Success threshold (measurable)
5. Administrative requirement (forms, procedures — always specific form numbers)

Each scenario has its own transmission. These are written in advance, not generated at runtime.

---

### 6. Sidebar Reference

The sidebar is a reference and tools panel. It is not story content. It contains:

- **The transmission** — persists here after it arrives in chat, for players who want to re-read it without scrolling
- **Jargon helpers** — word lists and prompts for players who want inspiration
- **Future menu items** — settings, options, and any future tools live here

The sidebar does not contain: setup text, role briefings, or any content that was removed from the pre-game flow. That content has been retired.

---

## What Was Removed and Why

### Setup text
The shared `setup` field was visible to all players but written in second person, implicitly addressing a single role. It told players the scenario before the game started, removing the surprise of the transmission. **Retired — the transmission does this job better, at a better moment.**

### Role briefings
The `briefing` field told players their objectives and approach before play began. This front-loaded information that is more interesting discovered through play. **Retired — players find their role through the conversation, not through pre-reading.**

### Scenario selection screen
Players no longer choose a scenario. The scenario is assigned randomly at room creation, stored in Firebase, and revealed only via the Priority Transmission mid-play. **The surprise is the point.**

---

## Writing Guidelines for Scene Setting

When writing or revising `context` fields in `scenarios-enhanced.js`:

- **Start with the physical world** before the character. What does the space look like?
- **Name things specifically** — console 7, not "a console." LUN-03, not "the habitat."
- **Include one detail with history** — the coffee stain, the stripped bolt, the cartoon in the margin. It makes the world feel lived-in.
- **End with the character ready** — wrench in hand, radio live, screen open. The last line should point toward action.
- **No objectives, no problem statement** — the player doesn't know what the scenario is yet. The context describes where they are, not what they're doing.
- **Keep it to a short paragraph** — four to six sentences. Long enough to place the player, short enough to read in one breath.

---

## Open Questions

- Should the kickstart prompt for support roles be included, or is the asymmetric silence sufficient?
- Should scene setting vary between the draft (more playful, dry) and current (more grounded, specific) voice — or should one voice be chosen and applied consistently across all scenarios?
- The Medical Officer briefing in Soil Mechanics Experiment (scenario 3) is incomplete in source — needs a full sentence.
