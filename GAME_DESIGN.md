# GAME_DESIGN.md — Apollo 47

## The Game in One Sentence

Players use a text chat interface to improvise radio conversations about mundane technical problems during routine moon missions in an alternate 1986.

## Source Material

Apollo 47 is a tabletop RPG by **Tim Hutchings** (published by Nocturnal Media). This is a digital adaptation, made with Tim's permission. The original game is available at [nocturnal-media.itch.io/apollo-47](https://nocturnal-media.itch.io/apollo-47).

## Setting

- **When**: Parallel 1986. Mondale presidency. Continued Space Race.
- **Tech level**: Near-future 1980s. No internet. Magnetic tape storage. Giant capacitors. Verbal information transfer. Inflexible machines that must be physically disassembled to fix.
- **Tone**: "Vaguely realistic human frustration tinged with humorous failure." Human-scaled sci-fi — small problems, mundane tasks, paperwork over spectacle.

## Core Design Philosophy

These principles should guide every feature and UI decision:

1. **The game is the conversation.** Everything else (scenarios, roles, UI) exists to support the chat. If a feature doesn't make the conversation better, it doesn't belong.

2. **Mundane over dramatic.** Jammed hatches, not alien invasions. Misplaced tools, not murder mysteries. Paperwork over spectacle. The fun comes from taking simple problems seriously.

3. **No mechanics.** No dice, no stats, no health bars, no win conditions. Players improvise freely. The UI should never gamify or add systems the tabletop game doesn't have.

4. **Technical jargon is play material.** Players make up authentic-sounding terminology, repeat it back to each other, and build on it. The jargon doesn't need to be real — it needs to *sound* real.

5. **Contradictions slide by.** When players disagree about what's happening in the fiction, they don't stop to argue — they explain it away in-character and keep going. The UI should never enforce consistency.

6. **Collaborative, not competitive.** All players work together. Support players help the Primary succeed while creating interesting complications.

## Player Roles

### Primary (Spotlight Astronaut)
- One player per scene
- Leads the narrative, describes what they see and do
- Speaks in first person, present tense
- Drives the scene forward

### Support (Voices on the Radio)
- All other players
- Can be: Mission Control, other crew, technicians, scientists, commanders
- Dual job: help the Primary in-character AND create minor complications out-of-character
- Can change characters freely (become a different person on the radio)
- Use call-and-response patterns: "Check nine on that?" / "Check nine."

## Scenario Structure

Each scenario in `scenarios-enhanced.js` has:

```javascript
{
  title: "Human-readable name",
  setup: "Shared situation visible to all players",
  technicalDetails: [
    "Specific jargon and readings to inspire play",
    "Equipment names, model numbers, status readings",
    "These are prompts, not requirements"
  ],
  roles: [
    {
      id: "UniqueId",
      label: "Display Name",       // shown in chat and lobby
      isPrimary: true/false,       // first role is always Primary
      context: "Where you are physically, what you can see",
      briefing: "What you're trying to do, in second person"
    }
  ]
}
```

### Scenario Categories
- **Normal (20)**: Standard mundane technical problems. Stuck drill bits, jammed hatches, antenna malfunctions, lost tools.
- **Unsettling (20)**: Same structure but with a subtle "something's off" quality. Unexplained seismic patterns, recording gaps, signals from nowhere. Still grounded — no aliens, no horror — just things that don't quite add up.

### Selection Logic
`getRandomScenarios()` picks 4 normal + 2 unsettling, shuffles them together, and presents all 6. The player chooses one. The mix is intentional — it adds variety without making every game weird.

## Briefing Tone

Briefings should read like a colleague talking to you, not a game manual:
- **Good**: "You're trying to isolate the fault in the power bus. The readings don't make sense. Check the junction box and report back."
- **Bad**: "Your goal is to create dramatic tension by investigating the power failure while maintaining character immersion."
- **Good**: "Hold the blanket in place so they can tape it. This is boring but necessary. Don't let go."
- **Bad**: "As a Support player, your objective is to assist the Primary in completing the thermal repair task."

Use second person. Be specific and physical. Include small human details (tired arms, cold coffee, smudged checklists).

## Key Gameplay Patterns

### Technical Jargon Flow
Players create a shared vocabulary during play:
1. Someone invents a term ("Check the PLT readings on the RM11s")
2. Others repeat it back ("Copy, checking PLTs")
3. The term becomes "real" in the fiction
4. Complications can build on it ("The PLT is showing amber on bus three")

### SNAFU (Complications)
Support players introduce small problems based on what's already been established. These should be technical and procedural — nested dependencies, unexpected side effects, missing tools.

### Spackle It Over
When something doesn't make sense, players explain it away and keep going. The UI should never block or question player input.

## What the UI Should Feel Like

- A text terminal from the 1980s. Green (or amber) text on black.
- Monospace font. Blinking cursor.
- Messages appear with role labels: `[PRIMARY]` or `[SUPPORT]`
- The aesthetic goal is "NASA Mission Control in 1986" — functional, no-nonsense, slightly worn.
- Future: CRT shader effects (scanlines, phosphor glow, screen curvature) layered on top.

## What NOT to Build

These are explicitly out of scope and would hurt the game:

- **Dice or random mechanics** — the game has none
- **Win/lose conditions** — there is no winning
- **Scoring or achievements** (gameplay ones) — contradicts the collaborative improv spirit
- **Automated story generation** — players create the story themselves
- **Enforced turn order** — players naturally flow; don't add a "your turn" system
- **Message reactions or emoji** — breaks the terminal aesthetic
- **Character stats or inventory** — there are none in the original game
- **A "correct" way to play** — the game is freeform by design

## Credits

- Original game: **Tim Hutchings** (Nocturnal Media)
- Digital adaptation made with permission
- NASA technical documents used under NASA Media Usage Guidelines
