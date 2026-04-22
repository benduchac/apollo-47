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

  /* ── SCENARIOS 11–20: HELD FOR FUTURE USE ──────────────────────────────────

  {
    title: "Magnetometer Reading",
    setup: "The magnetometer reading makes no sense and contradicts everything you know about the lunar magnetic field.",

    technicalDetails: [
      "Current reading: 847 nanoTeslas (expected: <10 nT)",
      "Sensor calibration date: 14 days ago",
      "Reading fluctuation: +/- 200 nT every 30 seconds",
      "Instrument temperature: within nominal range",
      "Backup magnetometer status: in storage, uncalibrated"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're standing next to the magnetometer in a crater, staring at readings that don't make any sense. You've checked the connections twice. The moon isn't supposed to have this kind of magnetic field.",
        briefing: "The readings are impossible. Either the equipment is broken or your textbooks are wrong. Troubleshoot this or just log it as anomalous and move on."
      },
      {
        id: "PI",
        label: "Principal Investigator",
        isPrimary: false,
        context: "You're questioning everything from your desk on Earth. You literally wrote papers about lunar magnetic fields. These readings contradict your career.",
        briefing: "These readings are scientifically impossible. Help determine if it's equipment failure or actual anomalous data. Your reputation is kind of on the line here."
      },
      {
        id: "ElectronicsTech",
        label: "Electronics Tech",
        isPrimary: false,
        context: "You're checking telemetry logs in Houston. You suspect calibration drift but the numbers are really weird.",
        briefing: "Diagnose potential hardware issues. Check calibration history, sensor integrity, power systems. Find the technical explanation."
      },
      {
        id: "Astronaut 2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're wondering if they're standing on the cable. You've seen weird readings from cable pressure before.",
        briefing: "Check for obvious physical problems with the setup. Are they standing on something? Is the cable kinked? Rule out the simple stuff."
      }
    ]
  },

  {
    title: "Waste Management System",
    setup: "The waste management system is making a noise it shouldn't make and there's a smell.",

    technicalDetails: [
      "Unusual noise: rhythmic clicking, 2.3 Hz frequency",
      "Odor detected in hab module section 3",
      "System pressure: reading normal",
      "Last maintenance: 8 days ago",
      "Backup system status: available but manual switchover required"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're the unlucky one investigating this. You're crouched next to the waste management compartment with a flashlight and a growing sense of dread. The smell is getting worse.",
        briefing: "Something is wrong with the waste system. It's making a noise. There's a smell. You really, really don't want to make this worse. Diagnose carefully."
      },
      {
        id: "Houston",
        label: "Ground Control (Houston)",
        isPrimary: false,
        context: "You're reading system pressures and flow rates remotely. Everything looks normal on your screen, which somehow makes it more concerning.",
        briefing: "Help diagnose what's malfunctioning based on telemetry. The numbers look fine but clearly something isn't fine."
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context: "You're asking pointed questions about health symptoms and air quality. You have contamination protocols ready.",
        briefing: "Assess if there's a contamination risk. Ask about symptoms. Determine if this needs emergency protocols or if it's just unpleasant."
      },
      {
        id: "Commander",
        label: "Commander",
        isPrimary: false,
        context: "You're requesting status updates from a safe distance. You're reviewing emergency procedures just in case.",
        briefing: "Monitor the situation from the other side of the hab. Determine if this requires emergency protocols. Try not to overreact. Try."
      }
    ]
  },

  {
    title: "Spectrometer Calibration",
    setup: "The spectrometer needs recalibration but the calibration source is reading wrong too.",

    technicalDetails: [
      "Spectrometer output: 23% deviation from baseline",
      "Calibration source output: also 23% deviation",
      "Last successful calibration: 16 days ago",
      "Ambient temperature: stable",
      "Backup calibration sources: 2 available, locations unknown"
    ],

    roles: [
      {
        id: "Astronaut 1",
        label: "Lab Astronaut",
        isPrimary: true,
        context: "You're in the lab, staring at two pieces of equipment that disagree with each other. Or agree with each other incorrectly. You can't tell which is broken.",
        briefing: "Either the spectrometer is broken, or the calibration source is broken, or they're both broken, or maybe the moon is weird. Figure out which."
      },
      {
        id: "LabDirector",
        label: "Lab Director",
        isPrimary: false,
        context: "You're suggesting diagnostic steps from Earth while drinking coffee that's gone cold. You've seen this before. You think.",
        briefing: "Walk them through systematic troubleshooting. Start with the simple stuff. Work through it methodically. Try not to sound frustrated."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're locating backup equipment in the storage cache. The inventory system is organized by someone who doesn't work here anymore.",
        briefing: "Find alternative calibration sources. The inventory says there are two. It doesn't say where. Check the usual places."
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context: "You're wondering if they tried turning it off and on again. You're not going to phrase it that way but that's what you're thinking.",
        briefing: "Suggest basic troubleshooting first. Power cycle. Check connections. The boring stuff that actually works most of the time."
      }
    ]
  },

  {
    title: "Habitat Pressure Leak",
    setup: "There's a slow pressure leak somewhere in the habitat and you have 847 possible seal points to check.",

    technicalDetails: [
      "Pressure decay rate: 0.004 PSI per minute",
      "Current pressure: 14.3 PSI (nominal: 14.7 PSI)",
      "Seal inspection points: 847 documented locations",
      "Leak detection equipment: ultrasonic detector, soap solution",
      "Time to minimum safe pressure: approximately 18 hours"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're working through a checklist with a leak detector that beeps. Everything beeps a little. You're on seal point 34 of 847. This is going to take a while.",
        briefing: "Find the leak before pressure drops to dangerous levels. You have 847 seal points to check. You don't like knowing there's a little hole venting into space."
      },
      {
        id: "LifeSupportEng",
        label: "Life Support Engineer",
        isPrimary: false,
        context: "You're monitoring pressure decay rate and doing math. You have eighteen hours but you'd really like to find it sooner.",
        briefing: "Calculate how much time they have. Monitor the decay rate. If it suddenly gets worse, that means something changed. Alert them immediately."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're isolating modules to narrow down the search area. Each module has a door that can seal. You're cut off from Astronaut 1 and are communicating by radio.",
        briefing: "Help systematically eliminate sections. Close bulkhead doors, monitor pressure in each section. Narrow down where the leak is."
      },
      {
        id: "Commander",
        label: "Commander",
        isPrimary: false,
        context: "You're prioritizing which areas to search first based on criticality and access. You're making a list. The list is long.",
        briefing: "Make strategic decisions about search pattern. Check critical areas first. Balance thoroughness with time pressure."
      }
    ]
  },

  {
    title: "Sample Container Jam",
    setup: "A rock sample is wedged in the collection container and you can't get it in or out.",

    technicalDetails: [
      "Sample dimensions: approximately 8cm x 12cm x 6cm",
      "Container opening: 7.5cm diameter",
      "Sample composition: basaltic, angular edges",
      "Extraction attempts: 3 so far, unsuccessful",
      "Container material: aluminum, not replaceable on-site"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're trying to extract a rock that's too big without damaging it or the container. Your gloves make fine manipulation nearly impossible. The rock is wedged in there really well.",
        briefing: "The sample is stuck. You could break the rock, or break the container, or give up. Figure out which option is least bad."
      },
      {
        id: "SciTeam",
        label: "Science Team",
        isPrimary: false,
        context: "You're debating sample importance versus container cost. The container costs more. The sample might be scientifically interesting. Might.",
        briefing: "Assess the scientific value of this specific rock. Is it worth sacrificing the container? Be honest about whether this rock is actually special."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're suggesting tools that might help. The tool selection out here is limited but creative application is encouraged.",
        briefing: "Find creative solutions for extraction. What tools are available? Can they be used in non-standard ways? Think outside the box."
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context: "You're looking at the mission schedule and the inventory of remaining containers. The math is not encouraging.",
        briefing: "You're leaning toward abandoning this sample. There are other rocks. The container is reusable. Make the practical call."
      }
    ]
  },

  {
    title: "Bootprint Documentation",
    setup: "You're supposed to photograph your bootprints for soil mechanics study but you keep walking through the good ones.",

    technicalDetails: [
      "Required photos: 12 distinct bootprints",
      "Print quality needed: clear tread pattern, depth measurement",
      "Completed photos: 2 of 12",
      "Contaminated prints: 7 so far",
      "Film remaining: 67 frames"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're trying to document pristine bootprints without making new ones. This is harder than it sounds. You keep stepping in the wrong place. The moon is covered in your footprints.",
        briefing: "Take photos of undisturbed bootprints. Don't step on the undisturbed bootprints. This is more difficult than anyone anticipated."
      },
      {
        id: "SciLead",
        label: "Science Lead",
        isPrimary: false,
        context: "You're requesting specific angles and measurements. You need clear tread patterns and depth markers. You're being very particular about this.",
        briefing: "Specify exactly what documentation is required. Angles, scale references, depth measurements. Don't let them rush through this."
      },
      {
        id: "SupportAstronaut",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're guiding them backward to avoid pristine prints. This is like directing someone parking a car, but harder.",
        briefing: "Navigate them safely without letting them step on good prints. Call out hazards. Tell them where to step. This is tedious but necessary."
      },
      {
        id: "Control",
        label: "Mission Control",
        isPrimary: false,
        context: "You're suggesting they just make fresh prints in a designated area. This seems simpler. Why isn't this simpler?",
        briefing: "Find pragmatic solutions. Maybe they make new prints deliberately? Speed this up somehow? The clock is ticking."
      }
    ]
  },

  {
    title: "Radio Interference",
    setup: "Something is causing intermittent radio interference and it's definitely coming from inside the hab.",

    technicalDetails: [
      "Interference frequency: 450-470 MHz band",
      "Pattern: intermittent, 15-30 second bursts",
      "Signal strength: -12 dBm",
      "First occurrence: 3 hours ago",
      "Suspected sources: 23 possible electronic devices"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're tracking down interference with a handheld receiver that beeps when it gets close to the source. Everything in the hab is beeping a little. You're going room by room.",
        briefing: "Find the source of the interference before it disrupts critical communications. Walk around with the detector. Listen for patterns. Narrow it down."
      },
      {
        id: "CAPCOM",
        label: "CAPCOM",
        isPrimary: false,
        context: "You're reporting signal quality changes from Earth. Sometimes you can hear them fine, sometimes it's static. You're documenting the pattern.",
        briefing: "Help them understand the interference pattern. When is it worst? Is there a timing pattern? Give them data to work with."
      },
      {
        id: "Comms",
        label: "Communications Officer",
        isPrimary: false,
        context: "You're making a list of all possible interference sources. The list is long. Everything electronic is suspect.",
        briefing: "List potential culprits systematically. Power supplies, motors, experiments, communications equipment. Help narrow down possibilities."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're turning equipment off one by one to isolate the problem. This is affecting people's work. They're not happy about it.",
        briefing: "Help with process of elimination. Turn things off, see if interference stops. Apologize to annoyed crew members."
      }
    ]
  },

  {
    title: "Soil Sieve Jam",
    setup: "The mechanical soil sieve is jammed with a rock and you need fine regolith samples for three different experiments.",

    technicalDetails: [
      "Sieve mesh size: 2mm openings",
      "Jammed rock size: approximately 4cm",
      "Sample batch size: 2.3kg regolith",
      "Pending experiments: 3 requiring sieved samples",
      "Manual sieve backup: available, much slower"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're trying to clear the jam without losing the sample batch. The sieve motor is whining. The rock is really wedged in there. You're worried about bending the mesh.",
        briefing: "Extract the rock without damaging the sieve or contaminating the regolith. The manual says not to force it. You might have to force it."
      },
      {
        id: "Geologist",
        label: "Geologist",
        isPrimary: false,
        context: "You're actually interested in the rock that caused the jam. It might be more interesting than the regolith samples.",
        briefing: "That rock might be scientifically valuable. Don't let them destroy it. Try to extract it intact. You want to examine it."
      },
      {
        id: "Engineer",
        label: "Engineer",
        isPrimary: false,
        context: "You're suggesting disassembly procedures from the manual. The manual has exploded diagrams. They're not very clear.",
        briefing: "Help them disassemble the sieve safely. There are screws and panels and mesh screens. Don't let them break anything expensive."
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context: "You're looking at the timeline. Three experiments are waiting on these samples. The delay is cascading through the schedule.",
        briefing: "Track timeline impact. How long can they spend on this before it affects other experiments? Balance care with urgency."
      }
    ]
  },

  {
    title: "EVA Glove Wear",
    setup: "Your EVA glove is showing wear at the fingertips and you're two hours into a six-hour EVA.",

    technicalDetails: [
      "Wear location: right hand, index and middle fingers",
      "Wear severity: outer layer compromised, inner layer intact",
      "EVA elapsed time: 2 hours 18 minutes",
      "EVA remaining time: 3 hours 42 minutes (planned)",
      "Glove replacement: requires return to airlock, 40 minutes"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're monitoring your own glove integrity while continuing to work. You can see the wear pattern getting worse. Every task uses your fingers. This is concerning but not critical yet.",
        briefing: "Your glove is wearing out. You have four hours left on the EVA. Monitor it, work carefully, and decide when it becomes unsafe. Or just finish the EVA. Probably fine."
      },
      {
        id: "SuitEngineer",
        label: "Suit Engineer",
        isPrimary: false,
        context: "You're asking for detailed visual descriptions that are hard to give through a helmet camera. You wish you could see it yourself.",
        briefing: "Determine when the glove becomes unsafe. Ask detailed questions. Compare their descriptions to failure modes you've seen. Make the safety call."
      },
      {
        id: "MedOfficer",
        label: "Medical Officer",
        isPrimary: false,
        context: "You're establishing abort criteria based on safety margins. You're conservative. You're supposed to be conservative.",
        briefing: "Set the threshold for when they must return. Balance mission completion with safety. Err on the side of caution. That's your job."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're suggesting modified handling techniques. You've got an emergency patch kit but the kit has a 6 step procedure to make sure you open it correctly without damaging it.",
        briefing: "Help them work more carefully. Suggest techniques to reduce glove stress. Maybe they can adapt their movements to extend glove life."
      }
    ]
  },

  {
    title: "Transponder Alignment",
    setup: "The transponder beacon that marks your base isn't transmitting properly and you need it to navigate back in the dark.",

    technicalDetails: [
      "Transponder signal strength: 40% nominal",
      "Transmission pattern: intermittent dropout every 45 seconds",
      "Power supply voltage: 12.1V (nominal: 12.0V)",
      "Time until sunset: 47 minutes",
      "Backup navigation: dead reckoning, not ideal"
    ],

    roles: [
      {
        id: "Astronaut1",
        label: "Astronaut 1",
        isPrimary: true,
        context: "You're troubleshooting the transmitter on the base tower. The sun is getting low. Your shadow is getting long. You don't want to navigate home in the dark without this beacon.",
        briefing: "Fix the transponder before sunset. The signal is weak and intermittent. Check connections, power, antenna alignment. Forty-seven minutes of daylight left."
      },
      {
        id: "NavOfficer",
        label: "Navigation Officer",
        isPrimary: false,
        context: "You're confirming signal reception at the base. Sometimes you get it, sometimes you don't. You're documenting the pattern.",
        briefing: "Help diagnose whether this is transmission or reception. Test the signal from your end. Report what you're hearing. Or not hearing."
      },
      {
        id: "Astronaut2",
        label: "Astronaut 2",
        isPrimary: false,
        context: "You're reading voltage levels on the power supply. They look fine. They look totally normal. Which makes this more confusing.",
        briefing: "Check if it's an electrical problem. Test power systems. Voltage looks good but maybe there's something subtle. Look for the non-obvious issues."
      },
      {
        id: "MissionControl",
        label: "Mission Control",
        isPrimary: false,
        context: "You're reviewing backup navigation methods. Dead reckoning on the moon. Landmark navigation. None of these are as good as the beacon.",
        briefing: "Prepare contingency plans if the beacon can't be fixed. How do they get home safely? What's the backup procedure? Have it ready."
      }
    ]
  },

  ── END SCENARIOS 11–20 ── */
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

// ── UNSETTLING SCENARIOS: HELD FOR FUTURE USE ─────────────────────────────────
// Uncomment and add back to pool when ready.
/*
const UNSETTLING_SCENARIOS_HELD = [
  {
    title: "Seismic Activity",
    setup: "The seismometers are registering rhythmic vibrations every 47 seconds, and they're getting stronger.",
    technicalDetails: [
      "Vibration frequency: 47-second intervals, precise",
      "Amplitude increasing: +0.3 micrometers per cycle",
      "Pattern duration: 2 hours 14 minutes so far",
      "Multiple seismometers confirming: all stations",
      "Lunar seismic activity expected: essentially none"
    ],
    roles: [
      { id: "Astronaut1", label: "Astronaut 1", isPrimary: true,
        context: "You're standing next to the seismometer array. You can feel the vibrations through your boots now. The moon isn't supposed to do this.",
        briefing: "The readings are impossible but consistent. Try to determine if this is equipment malfunction or actual lunar activity. The vibrations are getting stronger." },
      { id: "SciTeam", label: "Science Team", isPrimary: false,
        context: "You're debating tidal stress theories that don't quite add up. The moon doesn't have tides. Not like this.",
        briefing: "Find a scientific explanation for the pattern. Tidal forces? Thermal expansion? Something has to explain this. Right?" },
      { id: "Astronaut2", label: "Astronaut 2", isPrimary: false,
        context: "You're reporting that you can feel it too. Through the rover floor. Through your seat. It's subtle but it's there.",
        briefing: "Provide ground-truth observations. Confirm what you're experiencing. Help determine if this is sensor error or reality." },
      { id: "MissionControl", label: "Mission Control", isPrimary: false,
        context: "You're reviewing historical seismic data. Nothing matches this. Nothing even comes close to matching this.",
        briefing: "Check if this has ever happened before. Search archives. Compare patterns. Try to find precedent." }
    ]
  },
  { title: "Oxygen Generation Fluctuation", setup: "The oxygen generator keeps cycling output between 92% and 103% efficiency with no clear pattern.", technicalDetails: ["Efficiency range: 92% to 103% (nominal: 98%)", "Cycle duration: irregular, 3-17 minutes", "System diagnostics: all green", "Temperature: stable", "Power input: constant"], roles: [ { id: "Astronaut1", label: "Astronaut 1", isPrimary: true, context: "You're monitoring a system that shouldn't be this unpredictable. All the indicators say it's working perfectly. The numbers say otherwise.", briefing: "The output keeps fluctuating. Diagnostics show no problems. Everything tests normal. But the output is definitely changing. Figure out why." }, { id: "SysEngineer", label: "Systems Engineer", isPrimary: false, context: "You can't explain this based on any known failure mode. You've been through the manual twice. There's nothing about this.", briefing: "Rule out mechanical causes. Check every system interaction. There has to be a technical explanation. Has to be." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're tracking crew oxygen saturation. Everyone's fine. The fluctuations aren't affecting anyone. Yet.", briefing: "Monitor if the fluctuations are affecting crew health. Track oxygen levels. Determine what variance is acceptable." }, { id: "Commander", label: "Commander", isPrimary: false, context: "You're establishing thresholds for when to switch to backup systems. You don't like unexplained behavior in life support.", briefing: "Decide at what point this becomes a problem. Set abort criteria. Balance investigation with safety." } ] },
  { title: "Unscheduled Transmission", setup: "You're receiving a faint radio signal on the lunar surface frequency that isn't from Mission Control or the hab.", technicalDetails: ["Frequency: 296.8 MHz (surface operations band)", "Signal strength: -87 dBm, increasing slowly", "Modulation: appears to be voice, heavily distorted", "Direction finding: inconclusive", "Known transmitters in area: none"], roles: [ { id: "Astronaut1", label: "Astronaut 1", isPrimary: true, context: "You're trying to isolate the signal source. It sounds like voice. Almost like voice. You can't quite make out words. It's getting louder.", briefing: "Find out what's transmitting and from where. Isolate the signal. Try to decode it. Figure out if it's equipment or... something else." }, { id: "CAPCOM", label: "CAPCOM", isPrimary: false, context: "You're confirming Houston isn't transmitting on that frequency. You've checked three times. It's definitely not you.", briefing: "Rule out known sources. Verify it's not mission traffic. Help identify if this is interference or an actual transmission." }, { id: "Astronaut2", label: "Astronaut 2", isPrimary: false, context: "You're suggesting it might be equipment echo. Old satellites. Reflected signals. Anything normal.", briefing: "Propose rational explanations. Bounce paths, reflections, equipment malfunction. Find the mundane answer." }, { id: "Engineer", label: "Engineer", isPrimary: false, context: "You're noting that the signal strength is increasing. Slowly but steadily. Whatever it is, it's getting closer or stronger.", briefing: "Track signal characteristics. Monitor changes. Document everything. Try to triangulate the source." } ] },
  { title: "Missing Tools", setup: "Three tools have gone missing from the equipment bay over the past week, and no one remembers moving them.", technicalDetails: ["Missing items: torque wrench, sample scoop, calibration probe", "Last verified inventory: 8 days ago", "Access log: shows no unusual entries", "Crew size: 4 people", "Equipment bay: locked when unattended"], roles: [ { id: "AstronautA", label: "Astronaut A", isPrimary: true, context: "You're conducting inventory and trying to reconstruct events. Everyone says they didn't move the tools. Everyone sounds sincere. The tools are just gone.", briefing: "Figure out where the tools went. Check everywhere. Interview crew. Try to piece together what happened. Someone must remember something." }, { id: "AstronautB", label: "Astronaut B", isPrimary: false, context: "You have vague memories of seeing the tools. Or maybe you don't. The more you try to remember, the less certain you are.", briefing: "Try to remember. When did you last see them? Were they in the usual place? Search your memory. It's frustrating how unclear it is." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're suggesting logging procedures weren't followed. Someone forgot to log movement. That has to be it.", briefing: "Find a procedural explanation. Someone made a mistake. Someone forgot to write it down. That's the reasonable answer." }, { id: "Commander", label: "Commander", isPrimary: false, context: "You're questioning whether anyone has been sleepwalking. You've heard of it happening. Moon madness, they used to call it. Joke about it.", briefing: "Consider unusual but possible explanations. Sleep disturbances, memory gaps, stress. Find a human explanation." } ] },
  { title: "Camera Malfunction", setup: "Every photograph from this one location shows a dark spot that moves between frames, but nothing is visible to the eye.", technicalDetails: ["Affected photos: 12 consecutive frames", "Dark spot size: approximately 3cm diameter in frame", "Spot position: different in each photo", "Camera diagnostics: passing all tests", "Backup camera: not yet tested at this location"], roles: [ { id: "Astronaut_2501", label: "Astronaut 2501", isPrimary: true, context: "You're looking at the photos on the camera's preview screen. The spot is there. You look up at the actual crater. Nothing. You look back at the screen. The spot has moved.", briefing: "Document what you're seeing. Or what the camera is seeing. Try to figure out if this is lens damage, sensor defect, or something else entirely." }, { id: "ImagingSpec", label: "Imaging Specialist", isPrimary: false, context: "You're suggesting sensor damage or lens defects. Hot pixels. Dead pixels. Dust on the sensor. Standard technical problems with standard solutions.", briefing: "Identify technical explanations. Diagnose the camera fault. It's a malfunction. It has to be a malfunction." }, { id: "CAPCOM", label: "Communications", isPrimary: false, context: "You are tired of equipment malfunctions that take hours to work through.", briefing: "Push for more investigation. This could be scientifically interesting. Or it could be nothing. Either way, you need more data." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're reviewing the photographs remotely. You see the spot. You don't like it. You're trying to stay objective.", briefing: "Determine if this warrants investigation protocols. Balance curiosity with mission schedule. Make the call." } ] },
  { title: "Temperature Anomaly", setup: "One section of the habitat is 7 degrees colder than it should be and the heating elements test fine.", technicalDetails: ["Temperature differential: -7°C from nominal", "Affected area: approximately 3m x 4m section", "Heating elements: testing at 100% function", "Insulation integrity: no breaches detected", "Duration: first noticed 14 hours ago"], roles: [ { id: "EnvTech", label: "Environmental Tech", isPrimary: true, context: "You're investigating a cold spot that shouldn't exist. The heaters work. The insulation is intact. The thermometers all agree. It's just cold here.", briefing: "Find out why this section is losing heat. Check everything. Recalibrate sensors. There has to be a reason." }, { id: "ThermalEng", label: "Thermal Engineer", isPrimary: false, context: "You can't explain the readings based on system performance. Heat doesn't just disappear. Not like this.", briefing: "Rule out all normal failure modes. Work through the physics. Heat transfer, convection, radiation. Find where the energy is going." }, { id: "SupportCrew", label: "Crew Member", isPrimary: false, context: "You're mentioning that the cold spot was in a different location yesterday. You think. You're pretty sure. You checked your notes. They're unclear.", briefing: "Document location changes if any. Keep records. Note any movement or changes in the phenomenon." }, { id: "Systems", label: "Systems", isPrimary: false, context: "You're checking for hull breaches using every method available. Nothing shows up. No pressure loss, no leaks, no damage.", briefing: "Verify structural integrity. Rule out physical breaches. Confirm the hull is sound. Everything should be normal." } ] },
  { title: "Dust Accumulation Pattern", setup: "The lunar dust inside the airlock is accumulating in patterns that don't match foot traffic or wind.", technicalDetails: ["Pattern type: concentric circles, approximately 40cm diameter", "Dust depth: 2-3mm in patterns, minimal elsewhere", "Airlock pressurization: normal cycles", "Foot traffic: logged, doesn't match patterns", "Static charge: elevated but within normal range"], roles: [ { id: "Scientist", label: "Crew Scientist", isPrimary: true, context: "You're photographing dust patterns that shouldn't exist. The airlock is sealed. There's no wind. The patterns are too regular, too geometric.", briefing: "Document and analyze the formations. Determine what's causing them. Electrostatic behavior? Equipment vibration? Something else?" }, { id: "Geologist", label: "Geologist", isPrimary: false, context: "You're offering theories about electrostatic behavior. Lunar dust is weird. It's electrostatically charged. Maybe it just does this sometimes.", briefing: "Find natural explanations. Lunar dust properties, electrostatic forces, magnetic fields. There's science here. Use it." }, { id: "SupportCrew", label: "Crew Member", isPrimary: false, context: "You're noting that the patterns change overnight. You cleaned them up yesterday. They're back. Similar but not identical.", briefing: "Monitor and document changes. Keep cleaning them up. See if they recur. Track the pattern evolution." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're requesting detailed photographs. Measurements. Documentation. You want to study this but you're trying not to sound too interested.", briefing: "Get proper documentation for analysis on Earth. Be systematic. Be scientific. Don't jump to conclusions." } ] },
  { title: "Biological Contamination Alert", setup: "A contamination sensor in the sample lab keeps alarming for organic compounds, but all samples are verified sterile.", technicalDetails: ["Sensor alarm: organic compounds detected", "Sample verification: all sterile, triple-checked", "Sensor calibration: completed yesterday", "Alert frequency: 6-8 times per hour", "Backup sensors: also reading positive"], roles: [ { id: "LabTech", label: "Lab Tech", isPrimary: true, context: "You're trying to determine if it's sensor failure or actual detection. The samples are sterile. You've checked. The sensor keeps alarming. Multiple sensors keep alarming.", briefing: "Find the source of the organic readings. Test everything. The samples, the air, the equipment. Something is triggering these sensors." }, { id: "Biologist", label: "Biologist", isPrimary: false, context: "You're running through scenarios that should be impossible. Contamination from Earth? Surviving spores? Something in the lunar samples themselves?", briefing: "Consider biological explanations while maintaining scientific skepticism. What could survive? What could contaminate? Think through the impossible." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're suggesting testing crew members. Skin cells, breath, anything organic that could explain the readings.", briefing: "Rule out human sources. Test for crew contamination. Make sure it's not something simple and mundane." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're initiating containment protocols as a precaution. You don't think there's real contamination. But protocols are protocols.", briefing: "Ensure safety procedures are followed. Containment, isolation, verification. By the book. Just in case." } ] },
  { title: "Power Drain", setup: "Battery banks are draining 11% faster than energy budget accounts for, and no equipment logs show the usage.", technicalDetails: ["Power drain rate: 11% above calculated usage", "Equipment logs: all accounted for", "Battery monitoring: functioning normally", "Duration: 6 days and increasing", "Total unaccounted power: 47 kWh so far"], roles: [ { id: "ElectricalEng", label: "Electrical Engineer", isPrimary: true, context: "You're tracing power consumption through every system. Everything adds up except it doesn't. There's 11% missing. It's going somewhere.", briefing: "Find where the power is going. Check every circuit, every system, every connection. Energy doesn't just vanish." }, { id: "SysOfficer", label: "Systems Officer", isPrimary: false, context: "You're reading contradictory meter data. Some meters show normal consumption. Others show the drain. You've verified both are working.", briefing: "Verify which readings are accurate. Cross-check meters. Recalibrate instruments. Find the measurement error. There must be a measurement error." }, { id: "SupportCrew", label: "Crew Member", isPrimary: false, context: "You're checking for short circuits and damaged wiring. Going through every panel, every connection. Finding nothing wrong.", briefing: "Look for physical electrical problems. Shorts, frayed wires, bad connections. The problem has to be physical. Right?" }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're calculating how long reserves will last at this rate. The math is concerning. The trend is concerning.", briefing: "Determine when this becomes critical. Track the drain rate. Calculate reserve duration. Make contingency plans." } ] },
  { title: "Horizon Observation", setup: "Something on the horizon keeps catching your eye during EVAs, but when you look directly at it there's nothing there.", technicalDetails: ["Location: approximately 15° above horizon, bearing varies", "Visibility: peripheral vision only", "Duration: multiple EVAs, past 4 days", "Weather conditions: standard vacuum, perfect visibility", "Other crew reports: one similar sighting"], roles: [ { id: "Astronaut", label: "EVA Astronaut", isPrimary: true, context: "You keep seeing something at the edge of your vision. Every EVA. You turn to look and there's nothing. Just moon and stars. But you keep seeing it.", briefing: "Try to document what you're seeing. Camera, coordinates, timing. Prove you're seeing something. Or prove you're not." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're asking about vision symptoms, fatigue, stress levels. Visual artifacts can be caused by many things. Normal things.", briefing: "Assess if this is a medical issue. Eye strain, fatigue, isolation effects. Rule out physiological causes." }, { id: "AstronautB", label: "Astronaut 2", isPrimary: false, context: "You've seen it too. You weren't going to mention it. It sounds crazy. But yes, you've seen something similar.", briefing: "Corroborate the sighting carefully. Describe what you saw. When, where, how. Compare experiences." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're reviewing helmet camera footage. Frame by frame. There's nothing there. Nothing at all. The footage shows empty horizon.", briefing: "Look for objective evidence. Review video, analyze frames, check for artifacts. Find what the camera sees. Or doesn't see." } ] },
  { title: "Time Discrepancy", setup: "Your EVA timer shows 3 hours elapsed but Mission Control says you've been out for 4 hours and 20 minutes.", technicalDetails: ["Astronaut timer: 3:02:17 elapsed", "Mission Control timer: 4:21:43 elapsed", "Time discrepancy: 1 hour 19 minutes", "Both timers: independently verified, functioning", "Comm logs: show continuous contact, no gaps"], roles: [ { id: "Astronaut", label: "EVA Astronaut", isPrimary: true, context: "You're trying to account for the missing time. Your suit says 3 hours. Houston says over 4. You remember everything. You think. You don't remember 80 minutes of nothing.", briefing: "Figure out what happened during the gap. Check logs, review memory, reconstruct timeline. One of these clocks is wrong. Has to be." }, { id: "CAPCOM", label: "CAPCOM", isPrimary: false, context: "You're confirming Mission Control's timeline is accurate. You've been watching them the whole time. You've checked multiple sources.", briefing: "Verify the time discrepancy from multiple sources. Confirm your timeline. Check communication logs. Be absolutely certain." }, { id: "CrewMember", label: "Crew Member", isPrimary: false, context: "You're checking all chronometers and clocks in the hab. They all agree with Mission Control. Every single one.", briefing: "Determine which timepiece is malfunctioning. Test every clock, every timer. Find the faulty equipment." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're asking detailed questions about memory continuity. What do they remember from the EVA? Anything unusual? Any gaps?", briefing: "Assess memory continuity. Look for gaps, confusion, dissociation. Document everything they remember. And don't remember." } ] },
  { title: "Sample Movement", setup: "A rock sample you collected yesterday is in a different position in the storage rack than where you placed it.", technicalDetails: ["Sample ID: LR-047-23B", "Original position: Rack C, slot 14", "Current position: Rack C, slot 09", "Sample mass: 2.4 kg", "Lab access log: no entries between placement and discovery"], roles: [ { id: "Geologist", label: "Geologist", isPrimary: true, context: "You're checking sample inventory. You photographed this sample in slot 14. You labeled it yourself. Now it's in slot 9. Nobody else has been in here.", briefing: "Verify the sample position and determine if it moved. Check logs, review footage, ask crew. Something doesn't add up." }, { id: "CrewA", label: "Crew Member", isPrimary: false, context: "You deny touching the samples. You haven't been in the lab. You're sure. Pretty sure. You think you're sure.", briefing: "Help figure out what happened. Search your memory. Did you go in the lab? Did you move anything? Be certain." }, { id: "SciTeam", label: "Science Team", isPrimary: false, context: "You want to verify the sample identity hasn't changed. Make sure it's still the correct sample. That it's still the same rock.", briefing: "Ensure sample integrity. Verify it's the same rock. Check mass, appearance, labeling. Confirm nothing has been swapped or contaminated." }, { id: "Commander", label: "Commander", isPrimary: false, context: "You're reviewing habitat access logs. The logs show no lab access during the timeframe. The logs must be wrong. Or incomplete.", briefing: "Determine who had access to the lab. Review logs systematically. Find the explanation. Someone was in there." } ] },
  { title: "Suit Weight Distribution", setup: "Your spacesuit feels heavier on the left side, but mass distribution checks show symmetric balance.", technicalDetails: ["Subjective feeling: left side heavier", "Mass distribution test: symmetric within 0.2%", "Suit integrity: all systems nominal", "Duration: past 2 EVAs, approximately 6 hours total", "Other symptoms: none reported"], roles: [ { id: "Astronaut", label: "EVA Astronaut", isPrimary: true, context: "You're investigating a sensation that doesn't match reality. Your left side feels heavy. The instruments say it's balanced. You trust the instruments. You don't trust what you're feeling.", briefing: "Determine if this is physical or perceptual. The suit tests fine. You feel it anyway. Figure out what's happening." }, { id: "SuitEngineer", label: "Suit Engineer", isPrimary: false, context: "You can't find any physical problem. You've checked everything twice. The suit is perfectly balanced. Perfectly functional.", briefing: "Rule out all mechanical causes. Test everything. Mass distribution, center of gravity, joint resistance. Find the physical problem that isn't there." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're considering inner ear issues, vestibular problems, spatial disorientation. You're trying to sound confident about these diagnoses.", briefing: "Assess if this is a medical symptom. Balance issues, neurological symptoms, sensory distortion. Determine if they need to come inside." }, { id: "AstronautB", label: "Astronaut 2", isPrimary: false, context: "You mention feeling something similar last week. You didn't report it. It went away. You're not sure if you should have mentioned it then. Or now.", briefing: "Compare experiences carefully. What did you feel? When? How long? Help determine if this is a pattern." } ] },
  { title: "Crater Rim Shadow", setup: "The shadow at the crater rim you're studying doesn't match the sun angle, and it's grown since this morning.", technicalDetails: ["Shadow angle: 17° off from calculated", "Shadow length: increased 3.2m since morning measurement", "Sun position: verified correct via multiple methods", "Crater topology: surveyed, no changes detected", "Other shadows: all casting correctly"], roles: [ { id: "Surveyor", label: "Field Astronaut", isPrimary: true, context: "You're documenting a shadow that's wrong. You've checked your math three times. The sun is where it should be. The shadow isn't. And it's longer now than this morning.", briefing: "Gather precise data about the discrepancy. Measurements, angles, photos. Document everything. There has to be an explanation." }, { id: "NavOfficer", label: "Navigation Officer", isPrimary: false, context: "You're confirming the sun's position is exactly correct. Ephemeris data is spot on. The sun is where it's supposed to be.", briefing: "Rule out navigation or timing errors. Verify sun position, time, date. Eliminate the obvious explanations." }, { id: "Geologist", label: "Geologist", isPrimary: false, context: "You're suggesting unusual terrain features. Reflections, secondary light sources, atmospheric... wait, there's no atmosphere. Never mind.", briefing: "Find geological reasons for the shadow. Terrain features, rock formations, reflective surfaces. Something physical that explains this." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're requesting they maintain a safe distance from the crater. You don't know why. Protocol. Just... protocol.", briefing: "Prioritize crew safety. Suggest they observe from distance. Get more data before closer approach. Be cautious." } ] },
  { title: "Audio Recording Gap", setup: "The mission voice recorder has a 23-minute gap from last night that no one can explain.", technicalDetails: ["Gap duration: 23 minutes 14 seconds", "Gap timeframe: 02:17 to 02:40 station time", "Recording system: tested, functioning normally", "Power logs: no interruptions detected", "Backup recorder: also shows gap"], roles: [ { id: "CommsOfficer", label: "Communications Officer", isPrimary: true, context: "You're investigating a recording failure that affects primary and backup systems simultaneously. No power loss. No malfunction. Just 23 minutes of nothing.", briefing: "Determine what caused the gap. Check systems, review logs, test equipment. Both recorders failed identically. That shouldn't be possible." }, { id: "CrewA", label: "Crew Member", isPrimary: false, context: "You have vague memories of that time period. You were... doing something. You think. The more you try to remember, the more it slips away.", briefing: "Try to reconstruct what happened during those 23 minutes. What were you doing? Where was everyone? Remember. Try to remember." }, { id: "SysEngineer", label: "Systems Engineer", isPrimary: false, context: "You're checking for power interruptions. There are none. Checking for system failures. There are none. Everything was normal. Except the recordings.", briefing: "Find a technical explanation. Power, systems, interference, malfunction. Something technical caused this. Find it." }, { id: "CAPCOM", label: "CAPCOM", isPrimary: false, context: "You're asking what they were doing during that time. You're trying to sound casual about it. You're noting they can't quite answer.", briefing: "Gather context about the missing period. What was happening? Who was awake? What activities? Document the gaps in their memory." } ] },
  { title: "Pressure Suit Resistance", setup: "Your suit joints are offering more resistance than normal, but pressure readings are nominal and there's no damage.", technicalDetails: ["Joint resistance: subjectively increased", "Pressure readings: 4.3 PSI, nominal", "Suit diagnostics: all green", "Joint mobility tests: within spec", "Duration: current EVA, approximately 90 minutes"], roles: [ { id: "Astronaut", label: "EVA Astronaut", isPrimary: true, context: "You're trying to diagnose why movement feels wrong. The suit tests fine. The pressure is correct. But every joint feels stiff, resistant, like you're pushing through something.", briefing: "Determine if the suit is malfunctioning or if something else is happening. The instruments say normal. Your body says otherwise." }, { id: "SuitTech", label: "Suit Technician", isPrimary: false, context: "You're checking telemetry remotely. Everything looks completely normal. Textbook normal. Perfect nominal readings.", briefing: "Compare sensor data with their reported experience. The telemetry shows no problems. None at all. Try to reconcile the discrepancy." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're monitoring heart rate and exertion levels. They're elevated slightly. Consistent with working harder. With pushing against resistance.", briefing: "Determine if this is causing physical strain. Monitor vitals. Assess if this is dangerous. Decide if they need to come back." }, { id: "AstronautB", label: "Astronaut 2", isPrimary: false, context: "You're observing their movements from outside. They look completely normal. Smooth, natural, standard EVA movement. Nothing looks wrong.", briefing: "Provide external perspective. Their movements look normal from out here. Describe what you see. Or don't see." } ] },
  { title: "Regolith Depth Anomaly", setup: "The rover's ground-penetrating radar shows a void 3 meters down that shouldn't exist in impact-compacted soil.", technicalDetails: ["Void depth: 3.2 meters below surface", "Void dimensions: approximately 4m x 2m x 2m", "Regolith above: heavily compacted by impact", "Geological age: approximately 2 billion years", "Expected subsurface: solid compacted regolith, no voids"], roles: [ { id: "Geophysicist", label: "Rover Operator", isPrimary: true, context: "You're trying to verify an impossible void. The radar shows empty space under compacted soil. Natural processes don't create this. You're running the scan again.", briefing: "Determine if this void is real and what could have created it. Natural cave? Lava tube? Something else? The geology doesn't support any of these." }, { id: "SciTeam", label: "Science Team", isPrimary: false, context: "You're debating natural explanations. Lava tubes collapse. Impact mechanics create compression. Nothing creates voids in compacted ejecta. Nothing natural.", briefing: "Find geological processes that could explain this. Work through the physics. There has to be a natural explanation. Has to be." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're reviewing geological surveys that show no voids. This area has been mapped. Surveyed. Studied. No voids were detected.", briefing: "Cross-reference with existing data. Compare surveys. Verify the radar is working correctly. Check if this was there before." }, { id: "Commander", label: "Commander", isPrimary: false, context: "You're asking if it's safe to drive over this area. The void is three meters down. The rover weighs almost nothing. But still.", briefing: "Assess potential hazards. Is the surface stable? Could it collapse? Make safety determinations about continued operations here." } ] },
  { title: "Equipment Activation", setup: "A piece of equipment you definitely turned off last night was running this morning, and the logs show no activation command.", technicalDetails: ["Equipment: spectrometer array", "Last manual shutdown: 22:47 last night, confirmed", "Found running: 06:12 this morning", "Command logs: no activation entry", "Power consumption logs: show continuous operation"], roles: [ { id: "Technician", label: "Lab Technician", isPrimary: true, context: "You're investigating equipment that turned itself on. You shut it down. You checked it was off. This morning it was running. The logs show no one turned it on.", briefing: "Find out how the equipment activated. Check logs, review commands, interview crew. Someone or something turned it on." }, { id: "SysEngineer", label: "Systems Engineer", isPrimary: false, context: "You're reviewing command history. There's nothing. No activation command, no scheduled startup, no automation. Just... running.", briefing: "Check for software glitches or bugs. Automatic routines, scheduled tasks, system errors. Find the code that caused this." }, { id: "SupportCrew", label: "Crew Member", isPrimary: false, context: "You're questioning if someone operated it while sleepwalking. It sounds ridiculous. But someone had to turn it on. Right?", briefing: "Consider human factors. Did someone forget they turned it on? Sleepwalking? Confusion? Find the human explanation." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're suggesting checking for programming errors. Faulty timers. Bad code. Anything technical and fixable and normal.", briefing: "Find rational technical explanations. Software bugs, hardware faults, automation errors. Something that can be debugged and fixed." } ] },
  { title: "Directional Disorientation", setup: "You keep feeling like north is in the wrong direction, even though all instruments confirm correct orientation.", technicalDetails: ["Compass bearing: verified correct", "GPS position: accurate", "Star navigation: confirms orientation", "Subjective feeling: persistent directional confusion", "Duration: past 3 EVAs"], roles: [ { id: "Navigator", label: "EVA Astronaut", isPrimary: true, context: "You're trying to resolve a persistent feeling that direction is wrong. Your instruments say north. Your gut says that's east. You trust instruments. You have to trust instruments.", briefing: "Trust your instruments over your instincts. Navigate by data, not feeling. But document what you're experiencing. It's consistent. It's persistent." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're asking about vertigo, nausea, balance issues. Inner ear problems can cause spatial disorientation. That has to be it.", briefing: "Rule out vestibular or neurological issues. Test for medical causes. Determine if this is a symptom of something serious." }, { id: "SupportAstronaut", label: "Astronaut 2", isPrimary: false, context: "You're suggesting a local magnetic anomaly. Except the moon barely has a magnetic field. But maybe? Something local?", briefing: "Propose environmental causes. Magnetic anomalies, gravitational variations, local effects. Find an external explanation." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're reminding them the moon has almost no magnetic field. The instruments are correct. The feeling is wrong. Keep reminding them.", briefing: "Keep them grounded in known facts. The moon has no magnetic field. The instruments work. Trust the data. Navigate by instruments." } ] },
  { title: "Sample Degradation", setup: "Rock samples are showing surface changes that shouldn't occur in the controlled habitat environment.", technicalDetails: ["Changes observed: surface texture alteration, color shifts", "Affected samples: 4 of 23", "Environment: controlled temperature, pressure, humidity", "Time frame: changes appeared over 48 hours", "Sample composition: basaltic, should be stable"], roles: [ { id: "Geochemist", label: "Lab Scientist", isPrimary: true, context: "You're documenting changes that shouldn't happen. The samples are in controlled environment. Stable temperature. Stable everything. They're changing anyway.", briefing: "Determine what's causing the samples to change. Analyze the alterations. Test the environment. Rock doesn't weather in vacuum. But something is happening." }, { id: "SciTeam", label: "Science Team", isPrimary: false, context: "You're proposing contamination theories. Something from Earth? Equipment residue? Chemical reactions? There has to be contamination.", briefing: "Find explanations for the chemical changes. Contamination sources, reaction pathways, environmental factors. Something is reacting with these samples." }, { id: "SupportCrew", label: "Crew Member", isPrimary: false, context: "You're checking environmental controls obsessively. Temperature stable. Humidity stable. Everything is stable. Everything is normal.", briefing: "Verify habitat conditions are stable. Monitor all environmental parameters. Prove the environment isn't causing this." }, { id: "MissionControl", label: "Mission Control", isPrimary: false, context: "You're requesting immediate photography and sample isolation. Document everything. Isolate the affected samples. Contain whatever this is.", briefing: "Get documentation and prevent further changes. Photography, isolation, containment. Preserve evidence. Stop the spread." } ] },
  { title: "Suited Movement Observation", setup: "Helmet camera footage shows you making movements during an EVA that you don't remember making.", technicalDetails: ["Footage timestamp: 3:47 to 4:02 EVA time", "Movements shown: 15-second sequence, unusual gestures", "Astronaut recollection: no memory of this period", "Suit telemetry: normal throughout", "Communication logs: no transmissions during this time"], roles: [ { id: "Astronaut", label: "EVA Astronaut", isPrimary: true, context: "You're watching footage of yourself doing something you don't remember. The movements look deliberate. Purposeful. You have no memory of it.", briefing: "Try to remember what you were doing. Why you made those movements. What you were thinking. The footage shows you did it. You don't remember doing it." }, { id: "MedOfficer", label: "Medical Officer", isPrimary: false, context: "You're asking about memory gaps, confusion, disorientation. Trying to assess if this is medical. Trying not to alarm anyone.", briefing: "Assess memory continuity and cognitive function. Is this a medical issue? Stress? Fatigue? Something neurological? Be thorough but calm." }, { id: "CAPCOM", label: "CAPCOM", isPrimary: false, context: "You're reviewing communication logs. They weren't responding during that period. You called them twice. Static. Then they responded normally.", briefing: "Check communication records. When did contact break? When did it resume? Document the gap. Compare with the footage timestamp." }, { id: "SupportAstronaut", label: "Astronaut 2", isPrimary: false, context: "You were watching from the rover. You saw them stop moving for a bit. You thought they were just paused. Now you're not sure what you saw.", briefing: "Describe what you observed from your position. Did their movements look normal? Unusual? Did you notice anything off?" } ] }
];
*/

export const UNSETTLING_SCENARIOS = [];
