export const NORMAL_SCENARIOS = [
  { 
    title: "Core Sample Extraction",
    playerCount: 4,
    setup: "The drill bit is stuck 47 centimeters down in regolith that's somehow both powder and concrete.",
    roles: [
      { id: "Geologist", label: "🔬 Geologist", isPrimary: true, description: "Attempting to extract the core without snapping the bit" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Wants the sample" },
      { id: "EquipSpec", label: "🔧 Equipment Specialist", isPrimary: false, description: "Has theories about vibration frequencies" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Monitors exertion levels" }
    ],
    fullDescription: "The drill bit is stuck 47 centimeters down in regolith that's somehow both powder and concrete. Spotlight: Geologist attempting to extract the core without snapping the bit. Voices: Mission Control wants the sample, Equipment Specialist has theories about vibration frequencies, Medical Officer monitors exertion levels."
  },
  { 
    title: "Antenna Alignment",
    playerCount: 4,
    setup: "The high-gain antenna won't lock onto Earth and you're losing signal in twenty minutes.",
    roles: [
      { id: "CommsTech", label: "📡 Communications Technician", isPrimary: true, description: "On the roof of the habitat with a wrench and a prayer" },
      { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, description: "Reading coordinates that don't seem to match" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Inside checking voltage" },
      { id: "Engineer", label: "🔧 Engineer", isPrimary: false, description: "Suggests percussive maintenance" }
    ],
    fullDescription: "The high-gain antenna won't lock onto Earth and you're losing signal in twenty minutes. Spotlight: Communications Technician on the roof of the habitat with a wrench and a prayer. Voices: CAPCOM reading coordinates that don't seem to match, another Astronaut inside checking voltage, Engineer suggests percussive maintenance."
  },
  { 
    title: "Soil Mechanics Experiment",
    playerCount: 4,
    setup: "You're supposed to drive stakes into the lunar surface to measure soil bearing strength, but they keep bending.",
    roles: [
      { id: "FieldScientist", label: "🔬 Field Scientist", isPrimary: true, description: "With a mallet and increasingly bent stakes" },
      { id: "PI", label: "👔 Principal Investigator", isPrimary: false, description: "Back on Earth very concerned about the data" },
      { id: "Commander", label: "⭐ Crew Commander", isPrimary: false, description: "Asks how many stakes are left" },
      { id: "Medical", label: "⚕️ Medical", isPrimary: false, description: "Checks if you need a break" }
    ],
    fullDescription: "You're supposed to drive stakes into the lunar surface to measure soil bearing strength, but they keep bending. Spotlight: Field Scientist with a mallet and increasingly bent stakes. Voices: Principal Investigator back on Earth very concerned about the data, Crew Commander asks how many stakes are left, Medical checks if you need a break."
  },
  { 
    title: "Film Magazine Swap",
    playerCount: 4,
    setup: "The camera's film magazine is jammed and you're supposed to photograph this crater in exactly this lighting.",
    roles: [
      { id: "DocSpec", label: "📷 Documentation Specialist", isPrimary: true, description: "Fighting a stuck mechanism in a pressure suit" },
      { id: "PhotoLead", label: "🎨 Photography Lead", isPrimary: false, description: "Wants specific angles" },
      { id: "GeoTeam", label: "🪨 Geology Team", isPrimary: false, description: "Needs the shots for paper deadlines" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Suggests the backup camera is... somewhere" }
    ],
    fullDescription: "The camera's film magazine is jammed and you're supposed to photograph this crater in exactly this lighting. Spotlight: Documentation Specialist fighting a stuck mechanism in a pressure suit. Voices: Photography Lead wants specific angles, Geology Team needs the shots for paper deadlines, another Astronaut suggests the backup camera is... somewhere."
  },
  { 
    title: "Rover Navigation Calibration",
    playerCount: 4,
    setup: "The rover's gyroscope is drifting and you're 4 kilometers from base with six more sample sites to visit.",
    roles: [
      { id: "RoverPilot", label: "🚙 Rover Pilot", isPrimary: true, description: "Trying to recalibrate while parked on a slope" },
      { id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, description: "Reads numbers that contradict the display" },
      { id: "BaseC", label: "🏠 Crew at Base", isPrimary: false, description: "Offers to walk-through the procedure" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Suggests returning to base" }
    ],
    fullDescription: "The rover's gyroscope is drifting and you're 4 kilometers from base with six more sample sites to visit. Spotlight: Rover Pilot trying to recalibrate while parked on a slope. Voices: Navigation Officer reads numbers that contradict the display, Crew back at base offers to walk-through the procedure, Mission Control suggests returning to base."
  },
  { 
    title: "Seismometer Deployment",
    playerCount: 4,
    setup: "The seismometer keeps registering your footsteps as moonquakes and needs to be relocated somewhere more stable.",
    roles: [
      { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, description: "Carrying a sensitive instrument across the lunar surface" },
      { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Debates optimal placement" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Guides you around obstacles" },
      { id: "Control", label: "🎮 Control", isPrimary: false, description: "Reminds you about the cable length limit" }
    ],
    fullDescription: "The seismometer keeps registering your footsteps as moonquakes and needs to be relocated somewhere more stable. Spotlight: Geophysicist carrying a sensitive instrument across the lunar surface. Voices: Science Team debates optimal placement, another Astronaut guides you around obstacles, Control reminds you about the cable length limit."
  },
  { 
    title: "Water Reclamation Filter",
    playerCount: 4,
    setup: "The condensate filter is clogged and efficiency is down to 34%. You're supposed to clean it without contaminating the water supply.",
    roles: [
      { id: "LifeSupport", label: "💧 Life Support Technician", isPrimary: true, description: "Disassembling plumbing in zero-g section" },
      { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, description: "Reads the maintenance checklist" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Monitors water reserves" },
      { id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Asks how long this will take" }
    ],
    fullDescription: "The condensate filter is clogged and efficiency is down to 34%. You're supposed to clean it without contaminating the water supply. Spotlight: Life Support Technician disassembling plumbing in zero-g section. Voices: Systems Engineer reads the maintenance checklist, Medical Officer monitors water reserves, Commander asks how long this will take."
  },
  { 
    title: "Spacesuit Pressure Check",
    playerCount: 4,
    setup: "Your suit pressure is reading 3.8 PSI when it should be 4.3, and you're supposed to go outside in thirty minutes.",
    roles: [
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Checking every seal and connection on their own suit" },
      { id: "SuitTech", label: "🔧 Suit Technician", isPrimary: false, description: "Suggests various test procedures" },
      { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, description: "Cross-references the manual" },
      { id: "FlightSurgeon", label: "⚕️ Flight Surgeon", isPrimary: false, description: "Establishes minimum acceptable pressure" }
    ],
    fullDescription: "Your suit pressure is reading 3.8 PSI when it should be 4.3, and you're supposed to go outside in thirty minutes. Spotlight: Astronaut checking every seal and connection on their own suit. Voices: Suit Technician suggests various test procedures, another crew member cross-references the manual, Flight Surgeon establishes minimum acceptable pressure."
  },
  { 
    title: "Solar Panel Cleaning",
    playerCount: 4,
    setup: "Lunar dust has reduced solar panel efficiency by 18% and you need to clean them without scratching the surface.",
    roles: [
      { id: "Engineer", label: "🔧 Engineer", isPrimary: true, description: "With brushes attempting delicate dust removal" },
      { id: "PowerSys", label: "⚡ Power Systems Officer", isPrimary: false, description: "Monitors voltage improvements" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Warns about cable routing" },
      { id: "Control", label: "🎮 Control", isPrimary: false, description: "Suggests brush techniques" }
    ],
    fullDescription: "Lunar dust has reduced solar panel efficiency by 18% and you need to clean them without scratching the surface. Spotlight: Engineer with brushes attempting delicate dust removal. Voices: Power Systems Officer monitors voltage improvements, another Astronaut warns about cable routing, Control suggests brush techniques."
  },
  { 
    title: "Thermal Blanket Repair",
    playerCount: 4,
    setup: "A thermal blanket tore during the last EVA and now that equipment bay is heating up in the sun.",
    roles: [
      { id: "Maintenance", label: "🔧 Maintenance Specialist", isPrimary: true, description: "Applying metallic tape in a vacuum" },
      { id: "ThermalEng", label: "🌡️ Thermal Engineer", isPrimary: false, description: "Monitors temperature climb" },
      { id: "MaterialsSpec", label: "🧪 Materials Specialist", isPrimary: false, description: "Advises on tape application technique" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Holds the flapping blanket" }
    ],
    fullDescription: "A thermal blanket tore during the last EVA and now that equipment bay is heating up in the sun. Spotlight: Maintenance Specialist applying metallic tape in a vacuum. Voices: Thermal Engineer monitors temperature climb, Materials Specialist advises on tape application technique, another Astronaut holds the flapping blanket."
  },
  { 
    title: "Magnetometer Reading",
    playerCount: 4,
    setup: "The magnetometer reading makes no sense and contradicts everything you know about the lunar magnetic field.",
    roles: [
      { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, description: "Troubleshooting the instrument in the field" },
      { id: "PI", label: "👔 Principal Investigator", isPrimary: false, description: "Questions the data" },
      { id: "ElectronicsTech", label: "⚡ Electronics Technician", isPrimary: false, description: "Suggests calibration drift" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Wonders if you're standing on the cable" }
    ],
    fullDescription: "The magnetometer reading makes no sense and contradicts everything you know about the lunar magnetic field. Spotlight: Geophysicist troubleshooting the instrument in the field. Voices: Principal Investigator questions the data, Electronics Technician suggests calibration drift, another Astronaut wonders if you're standing on the cable."
  },
  { 
    title: "Waste Management System",
    playerCount: 4,
    setup: "The waste management system is making a noise it shouldn't make and there's a smell.",
    roles: [
      { id: "Engineer", label: "🔧 Engineer", isPrimary: true, description: "Very unlucky Engineer investigating the source" },
      { id: "LifeSupport", label: "💧 Life Support", isPrimary: false, description: "Reads system pressures" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Asks pointed questions about symptoms" },
      { id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Requests status updates from a safe distance" }
    ],
    fullDescription: "The waste management system is making a noise it shouldn't make and there's a smell. Spotlight: Very unlucky Engineer investigating the source. Voices: Life Support reads system pressures, Medical Officer asks pointed questions about symptoms, Commander requests status updates from a safe distance."
  },
  { 
    title: "Spectrometer Calibration",
    playerCount: 4,
    setup: "The spectrometer needs recalibration but the calibration source is reading wrong too.",
    roles: [
      { id: "Scientist", label: "🔬 Scientist", isPrimary: true, description: "Trying to determine what's broken and what's just lunar weirdness" },
      { id: "LabDirector", label: "👔 Lab Director", isPrimary: false, description: "Suggests diagnostic steps" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Locates backup equipment" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Asks if you tried turning it off and on" }
    ],
    fullDescription: "The spectrometer needs recalibration but the calibration source is reading wrong too. Spotlight: Scientist trying to determine what's broken and what's just lunar weirdness. Voices: Lab Director suggests diagnostic steps, another Astronaut locates backup equipment, Mission Control asks if you tried turning it off and on."
  },
  { 
    title: "Habitat Pressure Leak",
    playerCount: 4,
    setup: "There's a slow pressure leak somewhere in the habitat and you have 847 possible seal points to check.",
    roles: [
      { id: "SysTech", label: "🔧 Systems Technician", isPrimary: true, description: "With leak detector working through the checklist" },
      { id: "LifeSupportEng", label: "💧 Life Support Engineer", isPrimary: false, description: "Monitors pressure decay rate" },
      { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, description: "Isolates modules" },
      { id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Prioritizes search areas" }
    ],
    fullDescription: "There's a slow pressure leak somewhere in the habitat and you have 847 possible seal points to check. Spotlight: Systems Technician with leak detector working through the checklist. Voices: Life Support Engineer monitors pressure decay rate, another crew member isolates modules, Commander prioritizes search areas."
  },
  { 
    title: "Sample Container Jam",
    playerCount: 4,
    setup: "A rock sample is wedged in the collection container and you can't get it in or out.",
    roles: [
      { id: "FieldGeologist", label: "🪨 Field Geologist", isPrimary: true, description: "Trying to extract a too-big rock without damaging it" },
      { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Debates if the sample is worth the container" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Suggests tools" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Recommends abandoning this sample" }
    ],
    fullDescription: "A rock sample is wedged in the collection container and you can't get it in or out. Spotlight: Field Geologist trying to extract a too-big rock without damaging it. Voices: Science Team debates if the sample is worth the container, another Astronaut suggests tools, Mission Control recommends abandoning this sample."
  },
  { 
    title: "Bootprint Documentation",
    playerCount: 4,
    setup: "You're supposed to photograph your bootprints for soil mechanics study but you keep walking through the good ones.",
    roles: [
      { id: "Photographer", label: "📷 Photographer", isPrimary: true, description: "Trying to document prints without making new ones" },
      { id: "SciLead", label: "🔬 Science Lead", isPrimary: false, description: "Specifies what angles are needed" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Navigates you backward" },
      { id: "Control", label: "🎮 Control", isPrimary: false, description: "Suggests just making fresh prints" }
    ],
    fullDescription: "You're supposed to photograph your bootprints for soil mechanics study but you keep walking through the good ones. Spotlight: Photographer trying to document prints without making new ones. Voices: Science Lead specifies what angles are needed, another Astronaut navigates you backward, Control suggests just making fresh prints."
  },
  { 
    title: "Radio Interference",
    playerCount: 4,
    setup: "Something is causing intermittent radio interference and it's definitely coming from inside the hab.",
    roles: [
      { id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, description: "Tracking down the source with a receiver" },
      { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, description: "Reports signal quality changes" },
      { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, description: "Lists possible sources" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Turns equipment off one by one" }
    ],
    fullDescription: "Something is causing intermittent radio interference and it's definitely coming from inside the hab. Spotlight: Communications Officer tracking down the source with a receiver. Voices: CAPCOM reports signal quality changes, Systems Engineer lists possible sources, another Astronaut turns equipment off one by one."
  },
  { 
    title: "Soil Sieve Jam",
    playerCount: 4,
    setup: "The mechanical soil sieve is jammed with a rock and you need fine regolith samples for three different experiments.",
    roles: [
      { id: "LabTech", label: "🔬 Lab Technician", isPrimary: true, description: "Attempting to clear the jam without losing the sample" },
      { id: "Geologist", label: "🪨 Geologist", isPrimary: false, description: "Wants to see the rock that caused it" },
      { id: "Engineer", label: "🔧 Engineer", isPrimary: false, description: "Suggests disassembly procedure" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Asks about timeline impact" }
    ],
    fullDescription: "The mechanical soil sieve is jammed with a rock and you need fine regolith samples for three different experiments. Spotlight: Lab Technician attempting to clear the jam without losing the sample. Voices: Geologist wants to see the rock that caused it, Engineer suggests disassembly procedure, Mission Control asks about timeline impact."
  },
  { 
    title: "EVA Glove Wear",
    playerCount: 4,
    setup: "Your EVA glove is showing wear at the fingertips and you're two hours into a six-hour EVA.",
    roles: [
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Monitoring their own glove integrity while working" },
      { id: "SuitEngineer", label: "🔧 Suit Engineer", isPrimary: false, description: "Asks for visual descriptions" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Establishes abort criteria" },
      { id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, description: "Suggests modified handling techniques" }
    ],
    fullDescription: "Your EVA glove is showing wear at the fingertips and you're two hours into a six-hour EVA. Spotlight: Astronaut monitoring their own glove integrity while working. Voices: Suit Engineer asks for visual descriptions, Medical Officer establishes abort criteria, another Astronaut suggests modified handling techniques."
  },
  { 
    title: "Transponder Alignment",
    playerCount: 4,
    setup: "The transponder beacon that marks your base isn't transmitting properly and you need it to navigate back in the dark.",
    roles: [
      { id: "ElectronicsTech", label: "⚡ Electronics Technician", isPrimary: true, description: "Troubleshooting a transmitter before sunset" },
      { id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, description: "Confirms what signal they're receiving" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Reads voltage levels" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Discusses backup navigation methods" }
    ],
    fullDescription: "The transponder beacon that marks your base isn't transmitting properly and you need it to navigate back in the dark. Spotlight: Electronics Technician troubleshooting a transmitter before sunset. Voices: Navigation Officer confirms what signal they're receiving, another Astronaut reads voltage levels, Mission Control discusses backup navigation methods."
  }
];

export const UNSETTLING_SCENARIOS = [
  { 
    title: "Seismic Activity",
    playerCount: 4,
    setup: "The seismometers are registering rhythmic vibrations every 47 seconds, and they're getting stronger.",
    roles: [
      { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, description: "Trying to determine if this is equipment malfunction or actual lunar activity" },
      { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Debates tidal stress theories" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Reports feeling vibrations through boots" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Reviews historical data that doesn't match" }
    ],
    fullDescription: "The seismometers are registering rhythmic vibrations every 47 seconds, and they're getting stronger. Spotlight: Geophysicist trying to determine if this is equipment malfunction or actual lunar activity. Voices: Science Team debates tidal stress theories, another Astronaut reports feeling vibrations through boots, Mission Control reviews historical data that doesn't match."
  },
  { 
    title: "Oxygen Generation Fluctuation",
    playerCount: 4,
    setup: "The oxygen generator keeps cycling output between 92% and 103% efficiency with no clear pattern.",
    roles: [
      { id: "LifeSupport", label: "💧 Life Support Technician", isPrimary: true, description: "Monitoring the system that shouldn't be this unpredictable" },
      { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, description: "Can't explain the fluctuation" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Tracks crew O2 saturation" },
      { id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Establishes contingency thresholds" }
    ],
    fullDescription: "The oxygen generator keeps cycling output between 92% and 103% efficiency with no clear pattern. Spotlight: Life Support Technician monitoring the system that shouldn't be this unpredictable. Voices: Systems Engineer can't explain the fluctuation, Medical Officer tracks crew O2 saturation, Commander establishes contingency thresholds."
  },
  { 
    title: "Unscheduled Transmission",
    playerCount: 4,
    setup: "You're receiving a faint radio signal on the lunar surface frequency that isn't from Mission Control or the hab.",
    roles: [
      { id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, description: "Trying to isolate and identify the source" },
      { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, description: "Confirms they're not transmitting" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Suggests it might be equipment echo" },
      { id: "Engineer", label: "🔧 Engineer", isPrimary: false, description: "Notes the signal strength is increasing" }
    ],
    fullDescription: "You're receiving a faint radio signal on the lunar surface frequency that isn't from Mission Control or the hab. Spotlight: Communications Officer trying to isolate and identify the source. Voices: CAPCOM confirms they're not transmitting, another Astronaut suggests it might be equipment echo, Engineer notes the signal strength is increasing."
  },
  { 
    title: "Missing Tools",
    playerCount: 4,
    setup: "Three tools have gone missing from the equipment bay over the past week, and no one remembers moving them.",
    roles: [
      { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: true, description: "Conducting inventory and trying to reconstruct events" },
      { id: "AstronautA", label: "🚀 Astronaut A", isPrimary: false, description: "Offers contradictory memories" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Suggests logging procedures weren't followed" },
      { id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Questions if anyone's been sleepwalking" }
    ],
    fullDescription: "Three tools have gone missing from the equipment bay over the past week, and no one remembers moving them. Spotlight: Crew member conducting inventory and trying to reconstruct events. Voices: Other Astronauts offer contradictory memories, Mission Control suggests logging procedures weren't followed, Commander questions if anyone's been sleepwalking."
  },
  { 
    title: "Camera Malfunction",
    playerCount: 4,
    setup: "Every photograph from this one location shows a dark spot that moves between frames, but nothing is visible to the eye.",
    roles: [
      { id: "Photographer", label: "📷 Photographer", isPrimary: true, description: "Troubleshooting the camera or documenting something strange" },
      { id: "ImagingSpec", label: "🖼️ Imaging Specialist", isPrimary: false, description: "Suggests sensor damage" },
      { id: "Geologist", label: "🪨 Geologist", isPrimary: false, description: "Wants to go back to that location" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Reviews the photographs with confusion" }
    ],
    fullDescription: "Every photograph from this one location shows a dark spot that moves between frames, but nothing is visible to the eye. Spotlight: Photographer troubleshooting the camera or documenting something strange. Voices: Imaging Specialist suggests sensor damage, Geologist wants to go back to that location, Mission Control reviews the photographs with confusion."
  },
  { 
    title: "Temperature Anomaly",
    playerCount: 4,
    setup: "One section of the habitat is 7 degrees colder than it should be and the heating elements test fine.",
    roles: [
      { id: "EnvTech", label: "🌡️ Environmental Technician", isPrimary: true, description: "Investigating the cold spot" },
      { id: "ThermalEng", label: "🔧 Thermal Engineer", isPrimary: false, description: "Can't explain the readings" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Mentions the cold spot has moved" },
      { id: "Systems", label: "🔧 Systems", isPrimary: false, description: "Checks for hull breaches that aren't there" }
    ],
    fullDescription: "One section of the habitat is 7 degrees colder than it should be and the heating elements test fine. Spotlight: Environmental Technician investigating the cold spot. Voices: Thermal Engineer can't explain the readings, another Astronaut mentions the cold spot has moved, Systems checks for hull breaches that aren't there."
  },
  { 
    title: "Dust Accumulation Pattern",
    playerCount: 4,
    setup: "The lunar dust inside the airlock is accumulating in patterns that don't match foot traffic or wind.",
    roles: [
      { id: "Scientist", label: "🔬 Scientist", isPrimary: true, description: "Documenting and analyzing the unexpected formations" },
      { id: "Geologist", label: "🪨 Geologist", isPrimary: false, description: "Offers theories about electrostatic behavior" },
      { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Notes the patterns change overnight" },
      { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Requests detailed photos" }
    ],
    fullDescription: "The lunar dust inside the airlock is accumulating in patterns that don't match foot traffic or wind. Spotlight: Scientist documenting and analyzing the unexpected formations. Voices: Geologist offers theories about electrostatic behavior, another Astronaut notes the patterns change overnight, Mission Control requests detailed photos."
  },
  { 
    title: "Biological Contamination Alert",
    playerCount: 4,
    setup: "A contamination sensor in the sample lab keeps alarming for organic compounds, but all samples are verified sterile.",
    roles: [
      { id: "LabTech", label: "🔬 Lab Technician", isPrimary: true, description: "Trying to determine if it's sensor failure or actual detection" },
      { id: "Biologist", label: "🧬 Biologist", isPrimary: false, description: "Runs through impossible scenarios" },
      { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Suggests testing crew for illness" },
      { id: "MissionControl", label:"🎮 Mission Control", isPrimary: false, description: "Initiates containment protocols" }
],
fullDescription: "A contamination sensor in the sample lab keeps alarming for organic compounds, but all samples are verified sterile. Spotlight: Lab Technician trying to determine if it's sensor failure or actual detection. Voices: Biologist runs through impossible scenarios, Medical Officer suggests testing crew for illness, Mission Control initiates containment protocols."
},
{
title: "Power Drain",
playerCount: 4,
setup: "Battery banks are draining 11% faster than energy budget accounts for, and no equipment logs show the usage.",
roles: [
{ id: "ElectricalEng", label: "⚡ Electrical Engineer", isPrimary: true, description: "Tracing power consumption through the systems" },
{ id: "SysOfficer", label: "🔧 Systems Officer", isPrimary: false, description: "Reads contradictory meter data" },
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Suggests checking for short circuits" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Calculates how long reserves will last" }
],
fullDescription: "Battery banks are draining 11% faster than energy budget accounts for, and no equipment logs show the usage. Spotlight: Electrical Engineer tracing power consumption through the systems. Voices: Systems Officer reads contradictory meter data, another Astronaut suggests checking for short circuits, Mission Control calculates how long reserves will last."
},
{
title: "Horizon Observation",
playerCount: 4,
setup: "Something on the horizon keeps catching your eye during EVAs, but when you look directly at it there's nothing there.",
roles: [
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Trying to document or locate what they keep seeing peripherally" },
{ id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Asks about vision symptoms and fatigue" },
{ id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, description: "Reports seeing it too" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Reviews helmet camera footage" }
],
fullDescription: "Something on the horizon keeps catching your eye during EVAs, but when you look directly at it there's nothing there. Spotlight: Astronaut trying to document or locate what they keep seeing peripherally. Voices: Medical Officer asks about vision symptoms and fatigue, another Astronaut reports seeing it too, Mission Control reviews helmet camera footage."
},
{
title: "Time Discrepancy",
playerCount: 4,
setup: "Your EVA timer shows 3 hours elapsed but Mission Control says you've been out for 4 hours and 20 minutes.",
roles: [
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Trying to account for the missing time" },
{ id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, description: "Confirms their timeline" },
{ id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, description: "Checks all chronometers" },
{ id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Asks detailed questions about memory continuity" }
],
fullDescription: "Your EVA timer shows 3 hours elapsed but Mission Control says you've been out for 4 hours and 20 minutes. Spotlight: Astronaut trying to account for the missing time. Voices: CAPCOM confirms their timeline, another crew member checks all chronometers, Medical Officer asks detailed questions about memory continuity."
},
{
title: "Sample Movement",
playerCount: 4,
setup: "A rock sample you collected yesterday is in a different position in the storage rack than where you placed it.",
roles: [
{ id: "Geologist", label: "🪨 Geologist", isPrimary: true, description: "Checking sample inventory and security" },
{ id: "CrewA", label: "👨‍🚀 Crew Member", isPrimary: false, description: "Denies touching it" },
{ id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Wants to verify sample identity" },
{ id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Reviews habitat access logs" }
],
fullDescription: "A rock sample you collected yesterday is in a different position in the storage rack than where you placed it. Spotlight: Geologist checking sample inventory and security. Voices: Other crew members deny touching it, Science Team wants to verify sample identity, Commander reviews habitat access logs."
},
{
title: "Suit Weight Distribution",
playerCount: 4,
setup: "Your spacesuit feels heavier on the left side, but mass distribution checks show symmetric balance.",
roles: [
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Investigating unexplained sensation in their suit" },
{ id: "SuitEngineer", label: "🔧 Suit Engineer", isPrimary: false, description: "Can't find the problem" },
{ id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Considers inner ear issues" },
{ id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, description: "Mentions they felt something similar last week" }
],
fullDescription: "Your spacesuit feels heavier on the left side, but mass distribution checks show symmetric balance. Spotlight: Astronaut investigating unexplained sensation in their suit. Voices: Suit Engineer can't find the problem, Medical Officer considers inner ear issues, another Astronaut mentions they felt something similar last week."
},
{
title: "Crater Rim Shadow",
playerCount: 4,
setup: "The shadow at the crater rim you're studying doesn't match the sun angle, and it's grown since this morning.",
roles: [
{ id: "Surveyor", label: "📐 Surveyor", isPrimary: true, description: "Documenting and measuring the anomalous shadow" },
{ id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, description: "Confirms sun position" },
{ id: "Geologist", label: "🪨 Geologist", isPrimary: false, description: "Suggests unusual terrain features" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Requests you maintain safe distance" }
],
fullDescription: "The shadow at the crater rim you're studying doesn't match the sun angle, and it's grown since this morning. Spotlight: Surveyor documenting and measuring the anomalous shadow. Voices: Navigation Officer confirms sun position, Geologist suggests unusual terrain features, Mission Control requests you maintain safe distance."
},
{
title: "Audio Recording Gap",
playerCount: 4,
setup: "The mission voice recorder has a 23-minute gap from last night that no one can explain.",
roles: [
{ id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, description: "Investigating the recording failure" },
{ id: "CrewA", label: "👨‍🚀 Crew Member", isPrimary: false, description: "Has vague memories of that time period" },
{ id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, description: "Checks for power interruption" },
{ id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, description: "Asks what you were doing then" }
],
fullDescription: "The mission voice recorder has a 23-minute gap from last night that no one can explain. Spotlight: Communications Officer investigating the recording failure. Voices: Other crew members have vague memories of that time period, Systems Engineer checks for power interruption, CAPCOM asks what you were doing then."
},
{
title: "Pressure Suit Resistance",
playerCount: 4,
setup: "Your suit joints are offering more resistance than normal, but pressure readings are nominal and there's no damage.",
roles: [
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, description: "Trying to diagnose why movement feels wrong" },
{ id: "SuitTech", label: "🔧 Suit Technician", isPrimary: false, description: "Checks telemetry remotely" },
{ id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Monitors heart rate and exertion" },
{ id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, description: "Confirms your movements look normal" }
],
fullDescription: "Your suit joints are offering more resistance than normal, but pressure readings are nominal and there's no damage. Spotlight: Astronaut trying to diagnose why movement feels wrong. Voices: Suit Technician checks telemetry remotely, Medical Officer monitors heart rate and exertion, another Astronaut confirms your movements look normal."
},
{
title: "Regolith Depth Anomaly",
playerCount: 4,
setup: "The rover's ground-penetrating radar shows a void 3 meters down that shouldn't exist in impact-compacted soil.",
roles: [
{ id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, description: "Trying to verify and characterize the anomaly" },
{ id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Debates natural explanations" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Reviews geological surveys" },
{ id: "Commander", label: "⭐ Commander", isPrimary: false, description: "Asks if it's safe to continue over this area" }
],
fullDescription: "The rover's ground-penetrating radar shows a void 3 meters down that shouldn't exist in impact-compacted soil. Spotlight: Geophysicist trying to verify and characterize the anomaly. Voices: Science Team debates natural explanations, Mission Control reviews geological surveys, Commander asks if it's safe to continue over this area."
},
{
title: "Equipment Activation",
playerCount: 4,
setup: "A piece of equipment you definitely turned off last night was running this morning, and the logs show no activation command.",
roles: [
{ id: "Technician", label: "🔧 Technician", isPrimary: true, description: "Investigating the unauthorized power-up" },
{ id: "SysEngineer", label: "⚡ Systems Engineer", isPrimary: false, description: "Reviews command history" },
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Questions if someone sleep-operated it" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Suggests checking for programming errors" }
],
fullDescription: "A piece of equipment you definitely turned off last night was running this morning, and the logs show no activation command. Spotlight: Technician investigating the unauthorized power-up. Voices: Systems Engineer reviews command history, another Astronaut questions if someone sleep-operated it, Mission Control suggests checking for programming errors."
},
{
title: "Directional Disorientation",
playerCount: 4,
setup: "You keep feeling like north is in the wrong direction, even though all instruments confirm correct orientation.",
roles: [
{ id: "Navigator", label: "🧭 Navigator", isPrimary: true, description: "Trying to resolve the persistent feeling something is wrong with direction" },
{ id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, description: "Asks about vertigo symptoms" },
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Suggests local magnetic anomaly" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Reminds you the moon has almost no magnetic field" }
],
fullDescription: "You keep feeling like north is in the wrong direction, even though all instruments confirm correct orientation. Spotlight: Navigator trying to resolve the persistent feeling something is wrong with direction. Voices: Medical Officer asks about vertigo symptoms, another Astronaut suggests local magnetic anomaly, Mission Control reminds you the moon has almost no magnetic field."
},
{
title: "Sample Degradation",
playerCount: 4,
setup: "Rock samples are showing surface changes that shouldn't occur in the controlled habitat environment.",
roles: [
{ id: "Geochemist", label: "🧪 Geochemist", isPrimary: true, description: "Documenting impossible weathering or alteration" },
{ id: "SciTeam", label: "🔬 Science Team", isPrimary: false, description: "Proposes contamination theories" },
{ id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, description: "Checks environmental controls" },
{ id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, description: "Requests immediate photography and isolation of samples" }
],
fullDescription: "Rock samples are showing surface changes that shouldn't occur in the controlled habitat environment. Spotlight: Geochemist documenting impossible weathering or alteration. Voices: Science Team proposes contamination theories, another Astronaut checks environmental controls, Mission Control requests immediate photography and isolation of samples."
}
];
// Helper function to get 4 normal + 2 unsettling scenarios in random order
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
