# Apollo 47

A web-based multiplayer chat game about mundane moon mission complications.

**Play here:** [apollo-47.vercel.app](https://apollo-47.vercel.app)

---

## What is this?

Apollo 47 is a real-time text chat game where 2-6 players improvise stories about routine lunar missions in an alternate 1986. One player deals with a technical problem (jammed hatch, stuck drill bit, malfunctioning antenna) while others provide support over radio chat.

It's collaborative storytelling with technical jargon, radio banter, and human-scale problems in space.

---

## Based on the TTRPG

This is a digital adaptation of [**Apollo 47**](https://timhutchings.itch.io/ap47) by **Tim Hutchings**, made with his permission. If you enjoy this, please check out the original tabletop game—it's excellent.

---

## Tech

- Vanilla JavaScript (no frameworks)
- Firebase Realtime Database
- Tailwind CSS
- Deployed on Vercel

---

## Known Issues / Next Session TODOs

1. **Boot sequence visual polish** — Screen should clear during boot; key moments (moon graphic, callsign assignment) should be centered for focus. Moon ASCII art needs a visual update. Treat as a fun sidequest.

2. **Boot terminal scrolling** — The intro/boot section scrolls off the bottom of the screen before auth prompts appear. Needs scroll behaviour fixed or content trimmed.

3. **Post-join blank screen** — After both players accept the scene setting (ACK), the chat opens with no context and no prompt. Need to figure out what stage-setting copy and "make your move" text appears to cue players on how to begin.

4. **Callsign generation bug** — Callsigns don't appear to be generating correctly. Re-check the `generateCallsign()` implementation in `game.js` and the timing of when `state.callsign` is set relative to `createRoom()`/`joinRoom()`.

---

## About

A hobby project by one person who is vibecoding and learning as he goes.

Contributions, feedback, and bug reports welcome! Email Ben.   
