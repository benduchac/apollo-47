export const NORMAL_SCENARIOS = [
  {
    title: "Core Sample Extraction",
    setup:
      "The drill bit is stuck 47 centimeters down in regolith that's somehow both powder and concrete.",

    technicalDetails: [
      "RM-11 drill assembly reading 8.4kN resistance",
      "Vibration frequency locked at 47Hz (nominal: 60Hz)",
      "Sample tube CBT-229S may be compromised",
      "EVA timer: 2hr 12min elapsed",
      "Battery capacity: 67% remaining",
    ],

    roles: [
      {
        id: "FieldAstronaut",
        label: "Field Astronaut",
        isPrimary: true,
        context:
          "It's the two-hour mark of your EVA. You're kneeling at the drill site in Mare Tranquillitatis, about 400 meters southeast of the lander. Sun is directly overhead — flat white light, no shadows to read the terrain by. Both hands on the drill assembly. Your suit radio has been live since departure.",
        briefing:
          "You're two hours into the EVA. Something's not right at the drill site. Get Houston on the line and work through it.",
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at console 7 in Mission Analysis, Houston. Shift started four hours ago. Three binders of EVA documentation are stacked to your left, cold coffee in a styrofoam cup to your right. The surface comms channel just opened.",
        briefing:
          "The field astronaut is checking in from the drill site. Monitor the telemetry and walk them through whatever comes up.",
      },
      {
        id: "EquipSpec",
        label: "Equipment Specialist",
        isPrimary: false,
        context:
          "You're three desks from Mission Control at console 12. You pulled up the RM-11 maintenance manual when the EVA started — it's still open on your screen. Your headset is on the surface channel.",
        briefing:
          "The field team is about to check in. Keep the RM-11 manual ready — pull up whatever section is relevant when they tell you what they've got.",
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context:
          "You're at the flight surgeon's station, watching the EVA biometric feeds. Suit telemetry is all nominal. You have a sandwich next to your keyboard. The surface channel is live.",
        briefing:
          "EVA biometrics are nominal for now. Stay on the channel and watch exertion levels — two hours in a suit adds up.",
      },
    ],
  },

  {
    title: "Antenna Alignment",
    setup:
      "The high-gain antenna won't lock onto Earth and you're losing signal in twenty minutes.",

    technicalDetails: [
      "Antenna azimuth reading 247° (expected: 251°)",
      "Signal strength fluctuating between 2.1 and 3.8",
      "Manual override engaged but unresponsive",
      "Next comm window closes in 18 minutes",
      "Mounting bracket shows stress fractures",
    ],

    roles: [
      {
        id: "EVAAstronaut",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "You're on the habitat rooftop access platform, about three meters above the lunar surface. Safety-tethered to the rail. The high-gain antenna assembly is right in front of you — large dish, manual crank mechanism. Wrench in your left hand. Your suit radio is live.",
        briefing:
          "You're on the habitat roof with the antenna assembly and you've got a limited window to get it sorted. Get your team on the line.",
      },
      {
        id: "CAPCOM",
        label: "CAPCOM",
        isPrimary: false,
        context:
          "You're at the CAPCOM desk in Houston, ninety minutes into your shift. The antenna alignment window opened twenty minutes ago. Your screen is showing azimuth coordinates. You've checked them twice. Your radio is live.",
        briefing:
          "The EVA astronaut is checking in from the rooftop. You have azimuth coordinates on your screen. Stay with them through the alignment window.",
      },
      {
        id: "HabCrew",
        label: "Hab Crew",
        isPrimary: false,
        context:
          "You're inside the habitat at the systems panel in the utility corridor. You can hear the EVA channel through your headset. The voltage readouts on your board look normal. Your radio is open.",
        briefing:
          "You're monitoring from inside with the EVA channel open. Your board looks normal but the astronaut outside may need your read on things.",
      },
      {
        id: "Engineer",
        label: "Systems Engineer",
        isPrimary: false,
        context:
          "You're at engineering console 3 with the antenna technical specs on screen — a printout that had coffee spilled on it last Tuesday. Some of the margin numbers are smudged. Your headset is on the surface channel.",
        briefing:
          "You're on standby with the antenna specs. When the EVA team checks in, have the technical reference ready.",
      },
    ],
  },

  {
    title: "Soil Mechanics Experiment",
    setup:
      "You're supposed to drive stakes into the lunar surface to measure soil bearing strength, but they keep bending.",

    technicalDetails: [
      "Stakes: titanium alloy, 60cm length, 2cm diameter",
      "Five stakes bent at 30-45° angles so far",
      "Regolith resistance: higher than predicted",
      "Mallet impact force: within spec",
      "Stakes remaining: 7 of 12",
    ],

    roles: [
      {
        id: "Astronaut 1",
        label: "Field Astronaut",
        isPrimary: true,
        context:
          "You're standing in a shallow crater about 600 meters from the lander. The sun is low and to your left, long shadows stretching across the regolith. Mallet in your right hand. Several bent titanium stakes are scattered in the dust around you. Your suit radio is live.",
        briefing:
          "You're running a soil mechanics experiment in the field. Something's not going to spec. Check in with your team and work through it.",
      },
      {
        id: "PI",
        label: "Principal Investigator",
        isPrimary: false,
        context:
          "You're at a research terminal at the University of Houston, patched into the NASA comms relay. It's 2pm local. Your experiment protocol is open on your laptop, printed stake placement diagram beside it. Your comms channel is live.",
        briefing:
          "The field astronaut is checking in from the experiment site. You've been waiting on this data. Stay on the channel and help them work through whatever they've got.",
      },
      {
        id: "Commander",
        label: "Mission Commander",
        isPrimary: false,
        context:
          "You're at the command console in the Mission Analysis room, clipboard in hand. Someone drew a small cartoon in the lower margin last week and you keep noticing it. The EVA resource log is open in front of you. Radio is live.",
        briefing:
          "You're tracking resources and mission timeline for the soil mechanics EVA. The field team is checking in. Keep an eye on what's being used and what's left.",
      },
      {
        id: "Medical",
        label: "Medical",
        isPrimary: false,
        context:
          "You're at the flight surgeon station, watching the EVA astronaut's biometrics. Heart rate is elevated and still climbing. The EVA time log is open on your left screen. Radio is live.",
        briefing:
          "The EVA astronaut's heart rate is climbing. Stay on the channel and keep track of exertion. They'll push through discomfort without mentioning it — that's your job to catch.",
      },
    ],
  },

  {
    title: "Film Magazine Swap",
    setup:
      "The camera's film magazine is jammed and you're supposed to photograph this crater in exactly this lighting.",

    technicalDetails: [
      "Hasselblad 500EL camera, magazine K-24",
      "Film advance mechanism stuck at frame 38",
      "Manual release tab unresponsive",
      "Optimal lighting window: 12 minutes remaining",
      "Backup camera location: equipment cache, 400m away",
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're at the rim of a secondary crater, about 800 meters from the lander. The sun is at a low angle right now — the light you've been waiting for, the one that throws the crater wall features into sharp relief. The Hasselblad is in both gloved hands. Your suit radio is live.",
        briefing:
          "You're at the crater rim with the Hasselblad and the lighting window you've been waiting for is open right now. Something's wrong with the camera. Get your team on the line.",
      },
      {
        id: "PhotoLead",
        label: "Photography Analysis Lead",
        isPrimary: false,
        context:
          "You're at the science support console in Houston, printed shot list beside your keyboard. You've been coordinating this documentation session for two months. The comms channel just opened. You're watching the lighting window on your timeline.",
        briefing:
          "You need specific angles and features documented. The lighting window is closing. Help them get the camera working or find another solution.",
      },
      {
        id: "GeoTeam",
        label: "Geology Team",
        isPrimary: false,
        context:
          "You're at the geology console, two seats from the Photography Lead. Your paper deadline is November. You have your documentation requirements open on screen. The comms channel is live.",
        briefing:
          "The field astronaut is checking in from the crater rim during the documentation window. You need specific geological features from this session. Stay on the channel.",
      },
      {
        id: "SupportCrew",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're at the rover, about 400 meters from Astronaut 1. You can see them at the crater rim if you shade your visor. The equipment cache is on the rear rack. Your suit radio is live.",
        briefing:
          "You're at the rover 400 meters from the crater. The equipment cache is on the rear rack. Stay on comms — they may need something from out here.",
      },
    ],
  },

  {
    title: "Rover Navigation Calibration",
    setup:
      "The rover's gyroscope is drifting and you're 4 kilometers from base with six more sample sites to visit.",

    technicalDetails: [
      "Gyro drift rate: 0.3° per minute",
      "Current position: 4.2km southwest of base",
      "Remaining sample sites: 6",
      "Battery range: sufficient for 12km",
      "Manual calibration requires 15-minute stationary period",
    ],

    roles: [
      {
        id: "RoverPilot",
        label: "Rover Pilot",
        isPrimary: true,
        context:
          "You're in the rover driver's seat, parked on a slope in the Taurus-Littrow valley, about 4.2 kilometers southwest of base. The rover is tilted slightly to your left. Six sample sites still to reach. You've been looking at the navigation display for the past few minutes. Your comms panel is live.",
        briefing:
          "You're parked 4 kilometers from base with six sample sites still to reach. Something's off with the navigation system. Check in with base and work through it.",
      },
      {
        id: "NavOfficer",
        label: "Navigation Officer",
        isPrimary: false,
        context:
          "You're at the navigation console in Houston. The rover position data on your screen puts it somewhere different from what the pilot is reporting. You've verified your numbers twice. Your radio is live.",
        briefing:
          "The rover is in the field and the pilot is checking in. You have position data on your screen. Compare notes and help them figure out where they are.",
      },
      {
        id: "BaseCrew",
        label: "Base Crew",
        isPrimary: false,
        context:
          "You're at the hab engineering terminal with the paper navigation manual open in front of you. Someone circled something on page 47 in pencil but the handwriting is illegible. Your comms channel is live.",
        briefing:
          "The rover team is checking in from the field. The navigation manual is in front of you. Find whatever procedure they need and read it out.",
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at the Mission Control console, EVA timeline on your left screen, battery projection on your right. The math is tighter than you'd like. Your radio is live.",
        briefing:
          "The rover is in the field. You're watching battery and mission timeline. When they check in, help them weigh the tradeoffs — how much they can do before they need to turn back.",
      },
    ],
  },

  {
    title: "Seismometer Deployment",
    setup:
      "The seismometer keeps registering your footsteps as moonquakes and needs to be relocated somewhere more stable.",

    technicalDetails: [
      "Seismometer sensitivity: 0.001 micrometers",
      "Current false readings: 12-20 per minute",
      "Device weight: 8.4kg (1.4kg lunar)",
      "Cable length limitation: 50 meters from power source",
      "Ideal placement: bedrock, minimal regolith",
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Field Astronaut",
        isPrimary: true,
        context:
          "You're walking slowly across open regolith, about 300 meters from the lander. The seismometer assembly is in both arms — light out here, but awkward to carry. The cable runs out behind you toward the power source. Your wrist display shows the instrument is active. Your suit radio is live.",
        briefing:
          "You're carrying the seismometer across open regolith looking for a good deployment site. Check in with Houston — you need guidance on where to set this thing down.",
      },
      {
        id: "SciTeam",
        label: "Science Team",
        isPrimary: false,
        context:
          "You're at the geophysics console in Houston, watching the seismometer telemetry. The signal trace is very cluttered. You have geological survey maps of the deployment area open on your left screen. Your radio is live.",
        briefing:
          "The astronaut is in the field with the seismometer. You have geological survey maps. Help them find a good deployment location.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're standing still about 100 meters from Astronaut 1, watching them and the terrain ahead of them. Your suit radio is live.",
        briefing:
          "You're standing still nearby watching the terrain. Call out craters, loose rock, anything in their path. Don't let them trip.",
      },
      {
        id: "Control",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at your console with the cable routing diagram in front of you. The maximum tether distance is marked in red. You've measured the 50-meter limit three times already. Your radio is open.",
        briefing:
          "You have the cable routing diagram in front of you. Track where they are relative to the power source and call it out when they're getting close to the limit.",
      },
    ],
  },

  {
    title: "Water Reclamation Filter",
    setup:
      "The condensate filter is clogged and efficiency is down to 34%. You're supposed to clean it without contaminating the water supply.",

    technicalDetails: [
      "Filter efficiency: 34% (nominal: 92%)",
      "Particulate buildup: severe",
      "Water reserves: 4.2 days at current consumption",
      "Cleaning procedure: 23 steps",
      "Zero-gravity section access required",
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're in the zero-gravity utility section of the lunar waystation, floating near the water reclamation assembly. Tools are clipped to your belt on lanyards — one wrench drifted about two meters to your left while you had the access panel off. The filter housing is open in front of you. Your suit radio is live.",
        briefing:
          "You're in the zero-gravity utility section with the water reclamation assembly open. Get the systems engineer on the line and work through the procedure step by step.",
      },
      {
        id: "SysEngineer",
        label: "Systems Engineer",
        isPrimary: false,
        context:
          "You're in the adjacent module with the 23-step maintenance procedure open on your tablet. You're on step 3 and something doesn't quite match what you're expecting. Your comms channel is open.",
        briefing:
          "The astronaut is in the utility section starting on the water reclamation maintenance. You have the procedure open. Walk them through it — one step at a time, in order.",
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context:
          "You're at the medical station, one module over. The water reserve gauge on your panel reads 4.2 days at current consumption. Your radio is open.",
        briefing:
          "You're watching water reserves and mission timeline from the medical station. The maintenance team is underway — track how long this is taking.",
      },
      {
        id: "Commander",
        label: "Commander",
        isPrimary: false,
        context:
          "You're at the command console in the forward module, mission schedule open on your tablet. You have two other activities scheduled this afternoon. Your radio is live.",
        briefing:
          "You have other missions scheduled this afternoon. Find out how long the water system maintenance is going to take and whether the timeline is holding.",
      },
    ],
  },

  {
    title: "Spacesuit Pressure Check",
    setup:
      "Your suit pressure is reading 3.8 PSI when it should be 4.3, and you're supposed to go outside in thirty minutes.",

    technicalDetails: [
      "Current pressure: 3.8 PSI (nominal: 4.3 PSI)",
      "Leak rate: approximately 0.02 PSI per minute",
      "Suit seal points: 847 possible locations",
      "EVA scheduled: T-minus 28 minutes",
      "Minimum safe EVA pressure: 4.0 PSI",
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context:
          "You're in the pre-EVA staging area, suited up, helmet locked, life support running. EVA is scheduled in twenty-eight minutes. You're working through the pre-departure checklist. The pressure reading on your wrist display has your full attention. Your radio is live.",
        briefing:
          "You're suited up and working through the pre-departure checklist. Something on your telemetry doesn't look right. EVA is in twenty-eight minutes. Get your team on the line.",
      },
      {
        id: "SuitTech",
        label: "Suit Technician",
        isPrimary: false,
        context:
          "You're at the suit technician console in Houston. Suit telemetry from the EVA prep is on your screen — pressure, thermal, life support feeds. You have the suit schematic open on your left monitor. 847 labeled seal points. It's not a great diagram. Your radio is live.",
        briefing:
          "The astronaut is in pre-EVA staging and something's off on their suit telemetry. You have the suit schematic on screen. Help them work through diagnostics before the departure window.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're in the pre-EVA staging area, suited up and waiting for your own departure window. You have the suit diagnostic checklist on your forearm display. The index is organized but there's nothing labeled 'leak' or 'pressure'. Your radio is live.",
        briefing:
          "You're in staging waiting for your own departure window. The other astronaut is working through an issue with their suit. Help them find the right checklist and read it out.",
      },
      {
        id: "FlightSurgeon",
        label: "Flight Surgeon",
        isPrimary: false,
        context:
          "You're at the flight surgeon's station, monitoring pre-EVA suit telemetry. The EVA safety parameters are open on your screen. You have a pen in your hand. Your radio is live.",
        briefing:
          "Pre-EVA telemetry is showing something on the suit readings. You have the EVA safety parameters on screen. Help determine whether it's safe to proceed.",
      },
    ],
  },

  {
    title: "Solar Panel Cleaning",
    setup:
      "Lunar dust has reduced solar panel efficiency by 18% and you need to clean them without scratching the surface.",

    technicalDetails: [
      "Current efficiency: 74% (nominal: 92%)",
      "Panel surface: specialized anti-reflective coating",
      "Dust composition: electrostatically charged regolith",
      "Cleaning tools: soft-bristle brushes, no liquids",
      "Panel array size: 24 square meters",
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "You're on the solar array platform, about two meters above the lunar surface, safety-tethered to the main array strut. The panels stretch out in front of you — 24 square meters of glass. You have the soft-bristle cleaning kit in your right hand. The dust is already clinging to your gloves. Your suit radio is live.",
        briefing:
          "You're on the solar array platform with the cleaning kit. Check in with power systems before you start — they'll tell you if it's working.",
      },
      {
        id: "PowerSys",
        label: "Power Systems",
        isPrimary: false,
        context:
          "You're at the power systems console in Houston, watching the solar efficiency readout. The number updates every three seconds. Your radio is live.",
        briefing:
          "The EVA astronaut is about to start panel cleaning. You're watching efficiency readouts — tell them when the numbers move and which direction.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're on the ground below the array platform, watching the tether routing and cable layout above. There are a lot of cables up there and they're all the same color. Your suit radio is live.",
        briefing:
          "You're on the ground below the array platform. Watch the tether routing and call out anything that looks like it might snag.",
      },
      {
        id: "Control",
        label: "Mission Control",
        isPrimary: false,
        context:
          "You're at your console with the panel cleaning procedure on your screen. There are diagrams. Your radio is open.",
        briefing:
          "You have the panel cleaning procedure on screen. The EVA team is about to start. Have the brush technique specs ready when they ask.",
      },
    ],
  },

  {
    title: "Thermal Blanket Repair",
    setup:
      "A thermal blanket tore during the last EVA and now that equipment bay is heating up in the sun.",

    technicalDetails: [
      "Tear size: approximately 30cm diagonal",
      "Bay temperature: 47°C (nominal: 18°C)",
      "Critical equipment temp limit: 55°C",
      "Repair material: metallic tape, vacuum-rated",
      "Time to critical temp: estimated 23 minutes",
    ],

    roles: [
      {
        id: "Astronaut 1",
        label: "EVA Astronaut",
        isPrimary: true,
        context:
          "You're on the equipment bay exterior, east face of the habitat, safety-tethered to the handhold rail. You came out here for a visual inspection of the external thermal systems — standard post-EVA protocol. The sun is hitting this face directly. Your radio is live.",
        briefing:
          "You're on the equipment bay exterior for a standard post-EVA visual inspection. Something caught your eye on the thermal systems. Call it in.",
      },
      {
        id: "ThermalEng",
        label: "Thermal Engineer",
        isPrimary: false,
        context:
          "You're at the thermal engineering console, watching the equipment bay temperature readout. The number is moving in the wrong direction. You have the thermal limits document open on your screen. Your radio is live.",
        briefing:
          "The EVA astronaut is outside at the equipment bay. You're watching the thermal readouts. Keep them updated on the numbers as they work.",
      },
      {
        id: "MaterialsSpec",
        label: "Materials Specialist",
        isPrimary: false,
        context:
          "You're at the console next to the thermal engineer. You read the vacuum tape and blanket material specs a while back. You have the reference document open now and you're searching for the right section. Your radio is open.",
        briefing:
          "The EVA team is working on the exterior. You have the vacuum tape and blanket material specs in front of you. Stay on the channel — they may need your read on the materials.",
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context:
          "You're on the equipment bay exterior, tethered to an adjacent handhold a couple meters from Astronaut 1. Your arms are already getting tired. Your suit radio is live.",
        briefing:
          "You're tethered to the exterior a couple meters from Astronaut 1. Be ready to use your hands — they may need you to hold something in place while they work.",
      },
    ],
  },
];

export function getRecommendedPlayerCount(scenario) {
  return scenario.roles.length;
}

export function getRandomScenarios() {
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const selectedNormal = shuffleArray(NORMAL_SCENARIOS).slice(0, 4);
  const selectedUnsettling = shuffleArray(UNSETTLING_SCENARIOS).slice(0, 2);
  return shuffleArray([...selectedNormal, ...selectedUnsettling]);
}

export function getRandomScenario() {
  const allScenarios = [...NORMAL_SCENARIOS, ...UNSETTLING_SCENARIOS];
  return allScenarios[Math.floor(Math.random() * allScenarios.length)];
}

export const UNSETTLING_SCENARIOS = [];
