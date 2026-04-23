// scenarios-v2.js
//
// SCHEMA CHANGES FROM v1:
//   - `briefing` field renamed to `transmission` (priority transmission text, per-scenario)
//   - `setup` field removed (scenario revealed via transmission mid-play, not upfront)
//   - `context` fields rewritten: grounded, specific, physical scene-setting
//   - `transmission` fields written as CAPCOM broadcasts: specific readings, deadlines, form numbers
//   - getRandomScenarios() removed (no longer used — scenario selected at room creation)
//   - getRandomScenario() retained as the single selection function
//   - UNSETTLING_SCENARIOS placeholder retained for future use

export const NORMAL_SCENARIOS = [
  // ─────────────────────────────────────────────────────────────
  // 1. CORE SAMPLE EXTRACTION
  // ─────────────────────────────────────────────────────────────
  {
    title: "Core Sample Extraction",

    technicalDetails: [
      "RM-11 drill assembly reading 8.4kN resistance",
      "Vibration frequency locked at 47Hz (nominal: 60Hz)",
      "Sample tube CBT-229S may be compromised",
      "EVA timer: 2hr 12min elapsed",
      "Battery capacity: 67% remaining",
    ],

    transmission:
      "[CALLSIGN], this is Houston. We're getting a resistance reading on the RM-11 — 8.4 kilonewtons. Our reference says nominal is under 3, so that's not right. Vibration frequency is also off, we're showing 47 hertz against a 60 hertz target. Can you tell us what you're seeing down there? Also, when you get a chance, can you visually check the CBT-229S tube — we want to confirm integrity on that one. Battery's at 67, you've got time. Let's work through this.",

    roles: [
      {
        id: "FieldAstronaut",
        label: "Field Astronaut",
        isPrimary: true,
        context:
          "The moon's surface stretches flat in every direction — gray dust, the occasional shallow crater, black sky above. Earth is a blue crescent low on the horizon. You're kneeling at the drill site in Mare Tranquillitatis, about 400 meters southeast of the lander, both hands on the RM-11 assembly. The drill flag is planted. The sun is directly overhead — flat white light, no shadows to read the terrain by. You're using the drill to secure core samples on the west bank of the environmental team's proejct area. It's been two hours, and the drill isn't feeling quite right through your gloves.",
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at console 7 in Mission Analysis, Houston. The room is a long row of identical desks under fluorescent light. Your shift started four hours ago, and the air condititioners aren't working very well. Three dog-eared binders of EVA documentation are stacked to your left, cold coffee in a cardboard cup to your right. The surface comms channel just opened.",
      },
      {
        id: "EquipSpec",
        label: "Equipment Specialist",
        isPrimary: false,
        context:
          "You're three desks from Mission Control at console 12. The RM-11 maintenance manual has been open on your screen since the EVA started — you pulled it up as a precaution. You're watching the drill telemetry lines on your screen and they seem to be climbing. You've got the book open to page 47: drill resistance troubleshooting. Your headset is on the surface channel.",
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context:
          "You're at the flight surgeon's station in the back row of Mission Analysis. The EVA biometric feeds are on your left screen — heart rate, core temp, suit pressure. Everything is nominal. You have a half sandwich next to your keyboard. The surface channel is live.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ANTENNA ALIGNMENT
  // ─────────────────────────────────────────────────────────────
  {
    title: "Antenna Alignment",

    technicalDetails: [
      "Antenna azimuth reading 247° (expected: 251°)",
      "Signal strength fluctuating between 2.1 and 3.8",
      "Manual override engaged but unresponsive",
      "Next comm window closes in 18 minutes",
      "Mounting bracket shows stress fractures",
    ],

    transmission:
      "[CALLSIGN], Houston. We've got you at 247 degrees azimuth, we need 251. Signal is fluctuating between 2.1 and 3.8, threshold for reliable transmission is 4.0. Comm window closes in 18 minutes so — yeah, sooner rather than later on this one. Manual override is showing engaged on our end but azimuth isn't moving ... uhh ... the antenna guys say that they think something is jammed, or something isn't talking to something. Can you take a look at the mounting bracket while you're up there? We're trying to find the last inspection report but Peterson went down to records twenty minutes ago and isn't back yet.",

    roles: [
      {
        id: "EVAAstronaut",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "The moon's surface stretches out in every direction — gray dust, shallow craters, black sky. Earth hangs over the horizon, a blue crescent. You're on the roof of the habitat: a flat white box with LUN-03 stenciled in chipped black paint across the center. The antenna cluster towers above you — black cables, thin white aerials, and a silver dish with a tear in it from last year's meteorite storm. It's been intermittent ever since the repair team stripped the mounting bolts. The antenna needs to be aligned, and you've got the WX-10 80mm wrench in your hand.",
      },
      {
        id: "MissionCommand",
        label: "Mission Command",
        isPrimary: false,
        context:
          "Mission Control, Houston. Your desk is third row from the front, position 4 — a laminated card taped to the console says MISSION in faded red letters. You're looking at two softly glowing screens: flight data on the left, azimuth coordinates on the right. The numbers haven't moved in twenty minutes. Around you, fifteen other people are staring at their own screens, headsets on, doing the same thing you're doing — waiting for something to happen. Your radio is live.",
      },
      {
        id: "HabCrew",
        label: "Hab Crew",
        isPrimary: false,
        context:
          "You're inside the habitat at the systems panel in the utility corridor — a narrow passage between the equipment bays, lit by a single strip of fluorescent. It smells like stale electronics, self-heated meatloaf, and recycled air. The voltage readouts on your board look normal. A sticky note from last week says 'CHECK RELAY 3' in someone else's handwriting. You're not sure if it's been checked. You can hear [CALLSIGN] moving around on the hab roof. Your radio is open.",
      },
      {
        id: "Engineer",
        label: "Systems Engineer",
        isPrimary: false,
        context:
          "You're at engineering console 3 with the antenna technical specs on screen — a printout that had coffee spilled on it last Tuesday. Some of the margin numbers are smudged. The from last inspection is in a folder to your right - antenna brackets borderline but functional for at least two more cycles. Your headset is on the surface channel while you monitor transmission integrity.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. SOIL MECHANICS EXPERIMENT
  // ─────────────────────────────────────────────────────────────
  {
    title: "Soil Mechanics Experiment",

    technicalDetails: [
      "Stakes: titanium alloy, 60cm length, 2cm diameter",
      "Five stakes bent at 30-45° angles so far",
      "Regolith resistance: higher than predicted",
      "Mallet impact force: within spec",
      "Stakes remaining: 7 of 12",
    ],

    transmission:
      "[CALLSIGN], Houston. Dr. Okafor's team is asking about the stake placements — they're showing five bent on their end and they want to know what the regolith conditions are like at your current position. Mallet force is reading within spec so it's not that. You've got seven stakes left. They'd like a minimum of six successful placements if that's achievable, and they want the failure angles documented on the ones that didn't go in. Just — write them down, we'll sort it out when you're back.",

    roles: [
      {
        id: "FieldAstronaut",
        label: "Field Astronaut",
        isPrimary: true,
        context:
          "You're standing in a shallow crater about 600 meters from the lander. The sun is low and to your left — long shadows stretching across the regolith. Mallet in your right hand. Five bent titanium stakes are scattered in the dust around you at angles that don't make sense. The crater wall behind you is maybe three meters high, pocked with smaller impacts. Your suit radio is live.",
      },
      {
        id: "PI",
        label: "Principal Investigator",
        isPrimary: false,
        context:
          "You're at a research terminal at the University of Houston, patched into the NASA comms relay. It's 2pm local. Your experiment protocol is open on your laptop, printed stake placement diagram beside it — twelve positions marked in red. Five of them are already crossed out. Your comms channel is live.",
      },
      {
        id: "Commander",
        label: "Mission Commander",
        isPrimary: false,
        context:
          "You're at the command console in the Mission Analysis room, clipboard in hand. Someone drew a small cartoon in the lower margin last week and you keep noticing it. The EVA resource log is open — twelve stakes allocated, current status unknown. Your radio is live.",
      },
      {
        id: "Medical",
        label: "Medical Officer",
        isPrimary: false,
        context:
          "You're at the flight surgeon station. The EVA astronaut's biometrics are on your left screen — heart rate is elevated and still climbing. Consistent with sustained physical exertion. The EVA time log shows two hours, fourteen minutes elapsed. Your radio is live.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FILM MAGAZINE SWAP
  // ─────────────────────────────────────────────────────────────
  {
    title: "Film Magazine Swap",

    technicalDetails: [
      "Hasselblad 500EL camera, magazine K-24",
      "Film advance mechanism stuck at frame 38",
      "Manual release tab unresponsive",
      "Optimal lighting window: 12 minutes remaining",
      "Backup camera location: equipment cache, 400m away",
    ],

    transmission:
      "[CALLSIGN], Houston. Photography team is flagging K-24 — they're showing a jam at frame 38, advance mechanism. Manual release isn't responding on their telemetry. Lighting window is open for another 12 minutes, so — you've got a little time but not a lot. Backup Hasselblad is at the equipment cache, 400 meters, if it comes to that. Chen's team has the shot list, they'll tell you what they need. Let's see if we can get something usable before the light goes.",

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're at the rim of a secondary crater, about 800 meters from the lander. The sun is at a low angle to your right — long shadows raking across the crater wall, every feature thrown into sharp relief. This is the light the photography team has been waiting months for. The Hasselblad is in both gloved hands, magazine K-24 loaded. It was working fine twenty minutes ago. Your suit radio is live.",
      },
      {
        id: "PhotoLead",
        label: "Photography Analysis Lead",
        isPrimary: false,
        context:
          "You're at the science support console in Houston, printed shot list beside your keyboard. Twelve required frames, specific angles, scale markers in each. You've been coordinating this documentation session since February. The lighting window timer is on your screen. Your comms channel just opened.",
      },
      {
        id: "GeoTeam",
        label: "Geology Team",
        isPrimary: false,
        context:
          "You're at the geology console, two seats from the Photography Lead. November paper deadline. Your documentation requirements are open on screen — six specific crater wall features that need to be captured before this window closes. You have a red pen in your hand. The comms channel is live.",
      },
      {
        id: "SupportCrew",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're at the rover, about 400 meters from Astronaut 1. If you shade your visor you can just make them out at the crater rim. The equipment cache is right next to you — grey locker, EVA-4 stenciled on the side in orange paint, padlock combination on a card in your chest pocket. Your suit radio is live.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. SOLAR PANEL CLEANING
  // ─────────────────────────────────────────────────────────────
  {
    title: "Solar Panel Cleaning",

    technicalDetails: [
      "Current efficiency: 74% (nominal: 92%)",
      "Panel surface: specialized anti-reflective coating",
      "Dust composition: electrostatically charged regolith",
      "Cleaning tools: soft-bristle brushes, no liquids",
      "Panel array size: 24 square meters",
    ],

    transmission:
      "[CALLSIGN], Houston. Power systems is showing the array at 74 percent — nominal is 92. Panels 2, 5, 6, and 9 are the worst of it, dust accumulation. Standard soft-bristle procedure, no liquids, careful with the coating on those panels. We need to be above 88 before the Orbiter transit at 1400. Should be straightforward. When you're done, can you log panel condition before and after on the MNT-031 form — power systems needs that for their records.",

    roles: [
      {
        id: "Astronaut1",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "You're on the solar array platform, about two meters above the lunar surface, safety-tethered to the main array strut. Twenty-four square meters of glass panels stretch out in front of you — LUN-03's power source, coated in a thin gray film of electrostatically-clung dust. The soft-bristle cleaning kit is in your right hand. The dust is already clinging to your gloves. Your suit radio is live.",
      },
      {
        id: "PowerSys",
        label: "Power Systems",
        isPrimary: false,
        context:
          "You're at the power systems console in Houston. The solar efficiency readout is the main number on your screen — it updates every three seconds. Right now it reads 74. Nominal is 92. The number has been falling slowly for four days. Your radio is live.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're on the lunar surface directly below the array platform, watching the tether routing and cable layout above. There are a lot of cables up there and they are all the same shade of gray. One of them has a yellow tag on it but you can't read what it says from here. Your suit radio is live.",
      },
      {
        id: "Control",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at your console with the panel cleaning procedure on your screen — a two-page document with diagrams of brush stroke direction and pressure guidelines. Someone has highlighted several lines in yellow. You're not sure who. Your radio is open.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. THERMAL BLANKET REPAIR
  // ─────────────────────────────────────────────────────────────
  {
    title: "Thermal Blanket Repair",

    technicalDetails: [
      "Tear size: approximately 30cm diagonal",
      "Bay temperature: 47°C (nominal: 18°C)",
      "Critical equipment temp limit: 55°C",
      "Repair material: metallic tape, vacuum-rated",
      "Time to critical temp: estimated 23 minutes",
    ],

    transmission:
      "[CALLSIGN], Houston. We've got equipment bay 4 reading 47 degrees Celsius, nominal is 18. There's a blanket tear on the east face — looks like about 30 centimeters diagonal. Navigation electronics in that bay have a limit of 55 degrees, and at the current rate we're looking at maybe 23 minutes to get there. Vacuum tape is in the repair kit. It's a patch job, shouldn't take long. Just make sure the overlap is sufficient — materials spec says minimum 4 centimeters on each edge.",

    roles: [
      {
        id: "Astronaut1",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "You're on the equipment bay exterior, east face of the habitat, safety-tethered to the handhold rail. The habitat wall is a white panel about two meters wide — standard post-EVA inspection territory. The sun is hitting this face directly, no shade. The thermal blanket is the silver-coated layer on the wall surface; one section of it is visibly torn, edges curling in the vacuum. Your radio is live.",
      },
      {
        id: "ThermalEng",
        label: "Thermal Engineer",
        isPrimary: false,
        context:
          "You're at the thermal engineering console, watching the equipment bay 4 temperature readout. The number ticks up every few seconds. You have the thermal limits document open on your right screen — the navigation electronics column is highlighted in red. Your radio is live.",
      },
      {
        id: "MaterialsSpec",
        label: "Materials Specialist",
        isPrimary: false,
        context:
          "You're at the console next to the thermal engineer. The vacuum tape spec sheet is open on your screen — bond strength, application temperature range, overlap requirements. You found the right section about two minutes ago. Your radio is open.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're on the equipment bay exterior, tethered to an adjacent handhold a couple meters from Astronaut 1. You have the repair kit clipped to your suit — grey pouch, orange zipper, six compartments. You haven't opened it yet. Your suit radio is live.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. SPACESUIT PRESSURE CHECK
  // ─────────────────────────────────────────────────────────────
  {
    title: "Spacesuit Pressure Check",

    technicalDetails: [
      "Current pressure: 3.8 PSI (nominal: 4.3 PSI)",
      "Leak rate: approximately 0.02 PSI per minute",
      "Suit seal points: 847 possible locations",
      "EVA scheduled: T-minus 28 minutes",
      "Minimum safe EVA pressure: 4.0 PSI",
    ],

    transmission:
      "[CALLSIGN], Houston. We're seeing 3.8 PSI on your suit — nominal is 4.3, minimum for EVA clearance is 4.0. Leak rate looks like about 0.02 per minute, so the math isn't great if you're planning to go out in 28 minutes. 847 seal points on that suit, which is — a lot to check, but let's start with the wrist rings and helmet seals, those are the most common. Flight surgeon is on the channel. Let's figure out where it's going before we talk about the window.",

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're in the pre-EVA staging area, suited up, helmet locked, life support running. The staging area is a small room — airlock on one end, equipment lockers on the other. Your checklist is on the forearm display. The pressure reading on your wrist gauge is the number you keep coming back to. EVA is in twenty-eight minutes. Your radio is live.",
      },
      {
        id: "SuitTech",
        label: "Suit Technician",
        isPrimary: false,
        context:
          "You're at the suit technician console in Houston — pressure, thermal, life support feeds across three screens. The suit schematic is on your left monitor: a diagram of a suited figure with 847 numbered seal points marked in blue. It is not a great diagram. Several of the numbers overlap. Your radio is live.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're in the pre-EVA staging area, suited up, waiting for your own departure window. Your checklist is done. You have nothing to do but stand here. The suit diagnostic reference is on your forearm display — the index has 34 categories, none of them labeled 'leak'. Your radio is live.",
      },
      {
        id: "FlightSurgeon",
        label: "Flight Surgeon",
        isPrimary: false,
        context:
          "You're at the flight surgeon's station monitoring pre-EVA telemetry. EVA safety parameters are on your right screen — the pressure column has a red line at 4.0 PSI. The current reading is below it. You have a pen in your hand. Your radio is live.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. WATER RECLAMATION MAINTENANCE
  // ─────────────────────────────────────────────────────────────
  {
    title: "Water Reclamation Maintenance",

    technicalDetails: [
      "Procedure: 23-step maintenance sequence",
      "Current step: 3 of 23",
      "Water reserves: 4.2 days at current consumption",
      "System status: offline for maintenance",
      "Estimated procedure time: 90 minutes",
    ],

    transmission:
      "[CALLSIGN], Houston. Systems is showing you on step 3 of the WR-23 procedure — just flagging that there's an annotation in the current revision about a valve configuration change on step 3, it's in note B at the back. Might not affect anything but they wanted you to be aware. Reserves are at 4.2 days so no emergency, but Commander Chen has two activities scheduled this afternoon and she'll want to know how the timeline is looking. Just keep us updated on progress.",

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're in the utility section — the narrow corridor that runs along the back of the habitat between the water reclamation system and the battery banks. Fluorescent strip lighting, exposed conduit, a faint smell of recycled air. The water reclamation unit is a grey metal box about the size of a refrigerator, panel removed, internals exposed. Your tablet is propped on a nearby shelf showing the maintenance procedure. You're on step 3. Your comms are open.",
      },
      {
        id: "SysEngineer",
        label: "Systems Engineer",
        isPrimary: false,
        context:
          "You're in the adjacent module — one door down from the utility section. The 23-step maintenance procedure is open on your tablet. You've read through it twice. Step 3 has a note in the margin in small handwriting that says 'see note B' — note B is on the last page and refers to a valve configuration that was changed six months ago. Your comms channel is open.",
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context:
          "You're at the medical station, one module over. The water reserve gauge on your panel reads 4.2 days at current consumption — that number hasn't moved yet. The timeline for today's activities is on your screen. Your radio is open.",
      },
      {
        id: "Commander",
        label: "Commander",
        isPrimary: false,
        context:
          "You're at the command console in the forward module. Mission schedule is open on your tablet — three activities this afternoon, two of them time-sensitive. The maintenance window was supposed to be 90 minutes. You've been watching the clock. Your radio is live.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// UNSETTLING SCENARIOS — placeholder for future use
// ─────────────────────────────────────────────────────────────
export const UNSETTLING_SCENARIOS = [];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

// Select a single random scenario from the full pool.
// Called once at room creation — result stored in Firebase.
// Players never see this selection happen.
export function getRandomScenario() {
  const all = [...NORMAL_SCENARIOS, ...UNSETTLING_SCENARIOS];
  return all[Math.floor(Math.random() * all.length)];
}

// Convenience helper — returns role count for a given scenario.
export function getRecommendedPlayerCount(scenario) {
  return scenario.roles.length;
}
