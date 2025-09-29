export const NORMAL_SCENARIOS = [
 { 
  title: "Core Sample Extraction",
  playerCount: 4,
  setup: "The drill bit is stuck 47 centimeters down in regolith that's somehow both powder and concrete.",
  roles: [
    { id: "Geologist", label: "🔬 Geologist", isPrimary: true, briefing: "You're attempting to extract the core sample without snapping the drill bit. Your goal: Get this sample out intact." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You need this sample for critical research back on Earth. Your goal: Coordinate the extraction and ensure mission objectives are met." },
    { id: "EquipSpec", label: "🔧 Equipment Specialist", isPrimary: false, briefing: "You have theories about using vibration frequencies to free the bit. Your goal: Provide technical solutions without damaging the equipment." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're monitoring the Geologist's exertion levels in their suit. Your goal: Keep them safe while they work." }
  ]
},
{ 
  title: "Antenna Alignment",
  playerCount: 4,
  setup: "The high-gain antenna won't lock onto Earth and you're losing signal in twenty minutes.",
  roles: [
    { id: "CommsTech", label: "📡 Communications Technician", isPrimary: true, briefing: "You're on the roof of the habitat with a wrench trying to realign the antenna. Your goal: Restore Earth communications before you lose signal entirely." },
    { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, briefing: "You're reading out coordinates from Mission Control, but they don't seem to match what the tech is seeing. Your goal: Help troubleshoot the alignment remotely." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're inside the hab checking voltage readings and power systems. Your goal: Determine if this is a mechanical or electrical problem." },
    { id: "Engineer", label: "🔧 Engineer", isPrimary: false, briefing: "You're reviewing the technical specs and suggesting solutions. Your goal: Get creative with repairs—percussive maintenance is on the table." }
  ]
},
{ 
  title: "Soil Mechanics Experiment",
  playerCount: 4,
  setup: "You're supposed to drive stakes into the lunar surface to measure soil bearing strength, but they keep bending.",
  roles: [
    { id: "FieldScientist", label: "🔬 Field Scientist", isPrimary: true, briefing: "You're out here with a mallet and increasingly bent stakes. Your goal: Complete this experiment before you run out of stakes." },
    { id: "PI", label: "👔 Principal Investigator", isPrimary: false, briefing: "You're back on Earth and very concerned about getting usable data. Your goal: Salvage this experiment for your research paper." },
    { id: "Commander", label: "⭐ Crew Commander", isPrimary: false, briefing: "You're tracking resources and asking how many stakes are left. Your goal: Balance mission objectives with equipment conservation." },
    { id: "Medical", label: "⚕️ Medical", isPrimary: false, briefing: "You're monitoring the scientist's physical condition as they work. Your goal: Ensure they take breaks and don't overexert themselves." }
  ]
},
{ 
  title: "Film Magazine Swap",
  playerCount: 4,
  setup: "The camera's film magazine is jammed and you're supposed to photograph this crater in exactly this lighting.",
  roles: [
    { id: "DocSpec", label: "📷 Documentation Specialist", isPrimary: true, briefing: "You're fighting with a stuck mechanism while wearing thick pressure suit gloves. Your goal: Get this camera working before the lighting changes." },
    { id: "PhotoLead", label: "🎨 Photography Lead", isPrimary: false, briefing: "You need specific angles of this crater for the mission report. Your goal: Direct the shots while there's still time." },
    { id: "GeoTeam", label: "🪨 Geology Team", isPrimary: false, briefing: "You need these photographs for your paper deadlines. Your goal: Make sure the critical features are documented." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You remember there's a backup camera somewhere in the equipment cache. Your goal: Help locate alternatives if the primary camera fails." }
  ]
},
{ 
  title: "Rover Navigation Calibration",
  playerCount: 4,
  setup: "The rover's gyroscope is drifting and you're 4 kilometers from base with six more sample sites to visit.",
  roles: [
    { id: "RoverPilot", label: "🚙 Rover Pilot", isPrimary: true, briefing: "You're trying to recalibrate the gyro while parked on a slope. Your goal: Fix navigation so you can complete the remaining sample sites." },
    { id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, briefing: "You're reading out numbers that contradict what the rover display shows. Your goal: Figure out which readings are accurate." },
    { id: "BaseC", label: "🏠 Crew at Base", isPrimary: false, briefing: "You have the manual and can walk through the calibration procedure. Your goal: Guide them through the fix step by step." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're weighing the risk of continuing versus returning to base. Your goal: Make the call on whether to abort or proceed." }
  ]
},
{ 
  title: "Seismometer Deployment",
  playerCount: 4,
  setup: "The seismometer keeps registering your footsteps as moonquakes and needs to be relocated somewhere more stable.",
  roles: [
    { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, briefing: "You're carrying a sensitive instrument across the lunar surface. Your goal: Find a stable location that won't trigger false readings." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You're analyzing geological data remotely. Your goal: Guide them to the optimal placement location." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You have visual on the terrain and nearby hazards. Your goal: Navigate them safely around obstacles." },
    { id: "Control", label: "🎮 Control", isPrimary: false, briefing: "You're monitoring from Mission Control. Your goal: Ensure they stay within the cable length limit." }
  ]
},
{ 
  title: "Water Reclamation Filter",
  playerCount: 4,
  setup: "The condensate filter is clogged and efficiency is down to 34%. You're supposed to clean it without contaminating the water supply.",
  roles: [
    { id: "LifeSupport", label: "💧 Life Support Technician", isPrimary: true, briefing: "You're disassembling plumbing in the zero-g section. Your goal: Clean the filter without contaminating the water supply." },
    { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, briefing: "You're reading through the maintenance checklist. Your goal: Walk them through the proper procedure step by step." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're monitoring water reserves. Your goal: Track how much time they have before reserves run critically low." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're coordinating the mission schedule. Your goal: Find out how long this repair will take." }
  ]
},
{ 
  title: "Spacesuit Pressure Check",
  playerCount: 4,
  setup: "Your suit pressure is reading 3.8 PSI when it should be 4.3, and you're supposed to go outside in thirty minutes.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're checking every seal and connection on your own suit. Your goal: Find and fix the pressure leak before EVA time." },
    { id: "SuitTech", label: "🔧 Suit Technician", isPrimary: false, briefing: "You're guiding them through test procedures remotely. Your goal: Help diagnose the source of the leak." },
    { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, briefing: "You're cross-referencing the maintenance manual. Your goal: Find the checklist for pressure diagnostics." },
    { id: "FlightSurgeon", label: "⚕️ Flight Surgeon", isPrimary: false, briefing: "You're establishing safety protocols. Your goal: Determine the minimum acceptable pressure for EVA." }
  ]
},
{ 
  title: "Solar Panel Cleaning",
  playerCount: 4,
  setup: "Lunar dust has reduced solar panel efficiency by 18% and you need to clean them without scratching the surface.",
  roles: [
    { id: "Engineer", label: "🔧 Engineer", isPrimary: true, briefing: "You're out here with special brushes attempting delicate dust removal. Your goal: Restore efficiency without damaging the panels." },
    { id: "PowerSys", label: "⚡ Power Systems Officer", isPrimary: false, briefing: "You're monitoring voltage improvements in real-time. Your goal: Confirm whether the cleaning is actually working." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're watching for cable routing hazards. Your goal: Keep them from tripping or snagging their tether." },
    { id: "Control", label: "🎮 Control", isPrimary: false, briefing: "You're reading from the cleaning procedure manual. Your goal: Suggest the proper brush techniques." }
  ]
},
{ 
  title: "Thermal Blanket Repair",
  playerCount: 4,
  setup: "A thermal blanket tore during the last EVA and now that equipment bay is heating up in the sun.",
  roles: [
    { id: "Maintenance", label: "🔧 Maintenance Specialist", isPrimary: true, briefing: "You're applying metallic tape in a vacuum while the blanket flaps around. Your goal: Seal the tear before the equipment overheats." },
    { id: "ThermalEng", label: "🌡️ Thermal Engineer", isPrimary: false, briefing: "You're monitoring the temperature climb in the bay. Your goal: Track how much time they have before damage occurs." },
    { id: "MaterialsSpec", label: "🧪 Materials Specialist", isPrimary: false, briefing: "You know the properties of the tape and blanket material. Your goal: Advise on the best application technique." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're helping hold the flapping blanket steady. Your goal: Keep it in place so they can work." }
  ]
},
{ 
  title: "Magnetometer Reading",
  playerCount: 4,
  setup: "The magnetometer reading makes no sense and contradicts everything you know about the lunar magnetic field.",
  roles: [
    { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, briefing: "You're troubleshooting the instrument in the field. Your goal: Determine if this is equipment failure or actual anomalous data." },
    { id: "PI", label: "👔 Principal Investigator", isPrimary: false, briefing: "You're questioning the data from Earth. Your goal: Verify whether these readings are scientifically possible." },
    { id: "ElectronicsTech", label: "⚡ Electronics Technician", isPrimary: false, briefing: "You suspect calibration drift in the sensors. Your goal: Help diagnose potential hardware issues." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're wondering if they're standing on the cable. Your goal: Check for obvious physical problems with the setup." }
  ]
},
{ 
  title: "Waste Management System",
  playerCount: 4,
  setup: "The waste management system is making a noise it shouldn't make and there's a smell.",
  roles: [
    { id: "Engineer", label: "🔧 Engineer", isPrimary: true, briefing: "You're the unlucky one investigating the source of the problem. Your goal: Find and fix the issue without making it worse." },
    { id: "LifeSupport", label: "💧 Life Support", isPrimary: false, briefing: "You're reading system pressures and flow rates. Your goal: Help diagnose what's malfunctioning." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're asking pointed questions about health symptoms. Your goal: Assess if there's a contamination risk." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're requesting status updates from a safe distance. Your goal: Determine if this requires emergency protocols." }
  ]
},
{ 
  title: "Spectrometer Calibration",
  playerCount: 4,
  setup: "The spectrometer needs recalibration but the calibration source is reading wrong too.",
  roles: [
    { id: "Scientist", label: "🔬 Scientist", isPrimary: true, briefing: "You're trying to determine what's broken versus what's just lunar weirdness. Your goal: Get one piece of equipment reading correctly." },
    { id: "LabDirector", label: "👔 Lab Director", isPrimary: false, briefing: "You're suggesting diagnostic steps from Earth. Your goal: Walk them through systematic troubleshooting." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're locating backup equipment in the storage cache. Your goal: Find alternative calibration sources." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're wondering if they tried turning it off and on. Your goal: Suggest the basic fixes first." }
  ]
},
{ 
  title: "Habitat Pressure Leak",
  playerCount: 4,
  setup: "There's a slow pressure leak somewhere in the habitat and you have 847 possible seal points to check.",
  roles: [
    { id: "SysTech", label: "🔧 Systems Technician", isPrimary: true, briefing: "You're working through the checklist with a leak detector. Your goal: Find the leak before pressure drops to dangerous levels." },
    { id: "LifeSupportEng", label: "💧 Life Support Engineer", isPrimary: false, briefing: "You're monitoring the pressure decay rate. Your goal: Calculate how much time they have to find it." },
    { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, briefing: "You're isolating modules to narrow down the search area. Your goal: Help systematically eliminate sections." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're prioritizing which areas to search first. Your goal: Make strategic decisions about the search pattern." }
  ]
},
{ 
  title: "Sample Container Jam",
  playerCount: 4,
  setup: "A rock sample is wedged in the collection container and you can't get it in or out.",
  roles: [
    { id: "FieldGeologist", label: "🪨 Field Geologist", isPrimary: true, briefing: "You're trying to extract a too-big rock without damaging it or the container. Your goal: Save both the sample and the equipment." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You're debating whether this sample is worth sacrificing the container. Your goal: Assess the scientific value of this specific rock." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're suggesting tools that might help. Your goal: Find creative solutions for extracting the sample." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're recommending they abandon this sample. Your goal: Prioritize mission schedule and equipment preservation." }
  ]
},
{ 
  title: "Bootprint Documentation",
  playerCount: 4,
  setup: "You're supposed to photograph your bootprints for soil mechanics study but you keep walking through the good ones.",
  roles: [
    { id: "Photographer", label: "📷 Photographer", isPrimary: true, briefing: "You're trying to document prints without making new ones. Your goal: Capture usable photographs without contaminating the site." },
    { id: "SciLead", label: "🔬 Science Lead", isPrimary: false, briefing: "You need specific angles and measurements for the study. Your goal: Specify exactly what documentation is required." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're guiding them backward to avoid the pristine prints. Your goal: Navigate them safely without ruining the samples." },
    { id: "Control", label: "🎮 Control", isPrimary: false, briefing: "You're suggesting they just make fresh prints. Your goal: Find pragmatic solutions to speed this up." }
  ]
},
{ 
  title: "Radio Interference",
  playerCount: 4,
  setup: "Something is causing intermittent radio interference and it's definitely coming from inside the hab.",
  roles: [
    { id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, briefing: "You're tracking down the interference source with a receiver. Your goal: Locate and eliminate the source before it disrupts critical communications." },
    { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, briefing: "You're reporting signal quality changes from Earth. Your goal: Help them understand the interference pattern." },
    { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, briefing: "You're listing all possible sources of interference. Your goal: Systematically narrow down the culprit." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're turning equipment off one by one to isolate the problem. Your goal: Help with the process of elimination." }
  ]
},
{ 
  title: "Soil Sieve Jam",
  playerCount: 4,
  setup: "The mechanical soil sieve is jammed with a rock and you need fine regolith samples for three different experiments.",
  roles: [
    { id: "LabTech", label: "🔬 Lab Technician", isPrimary: true, briefing: "You're attempting to clear the jam without losing the sample batch. Your goal: Get the sieve operational without contaminating the regolith." },
    { id: "Geologist", label: "🪨 Geologist", isPrimary: false, briefing: "You want to examine the rock that caused the jam. Your goal: Determine if it's scientifically interesting." },
    { id: "Engineer", label: "🔧 Engineer", isPrimary: false, briefing: "You're suggesting disassembly procedures. Your goal: Help them take it apart safely without breaking anything." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're concerned about timeline impact. Your goal: Assess whether this delay affects other experiments." }
  ]
},
{ 
  title: "EVA Glove Wear",
  playerCount: 4,
  setup: "Your EVA glove is showing wear at the fingertips and you're two hours into a six-hour EVA.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're monitoring your own glove integrity while continuing to work. Your goal: Complete the EVA without catastrophic glove failure." },
    { id: "SuitEngineer", label: "🔧 Suit Engineer", isPrimary: false, briefing: "You're asking for detailed visual descriptions of the wear. Your goal: Determine when the glove becomes unsafe to use." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're establishing abort criteria based on safety margins. Your goal: Decide at what point they must return to the airlock." },
    { id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, briefing: "You're suggesting modified handling techniques to reduce stress on the glove. Your goal: Help them work more carefully." }
  ]
},
{ 
  title: "Transponder Alignment",
  playerCount: 4,
  setup: "The transponder beacon that marks your base isn't transmitting properly and you need it to navigate back in the dark.",
  roles: [
    { id: "ElectronicsTech", label: "⚡ Electronics Technician", isPrimary: true, briefing: "You're troubleshooting the transmitter before sunset. Your goal: Get the beacon working before you lose daylight." },
    { id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, briefing: "You're confirming what signal you're receiving at base. Your goal: Help diagnose whether it's transmission or reception." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're reading voltage levels on the power supply. Your goal: Check if it's an electrical problem." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reviewing backup navigation methods. Your goal: Prepare contingency plans if the beacon can't be fixed." }
  ]
}
];

export const UNSETTLING_SCENARIOS = [
  { 
  title: "Seismic Activity",
  playerCount: 4,
  setup: "The seismometers are registering rhythmic vibrations every 47 seconds, and they're getting stronger.",
  roles: [
    { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, briefing: "You're trying to determine if this is equipment malfunction or actual lunar activity. Your goal: Gather data to explain these impossible readings." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You're debating tidal stress theories that don't quite add up. Your goal: Find a scientific explanation for the pattern." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're reporting that you can feel the vibrations through your boots. Your goal: Provide ground-truth observations." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reviewing historical data that doesn't match current readings. Your goal: Determine if this has ever happened before." }
  ]
},
{ 
  title: "Oxygen Generation Fluctuation",
  playerCount: 4,
  setup: "The oxygen generator keeps cycling output between 92% and 103% efficiency with no clear pattern.",
  roles: [
    { id: "LifeSupport", label: "💧 Life Support Technician", isPrimary: true, briefing: "You're monitoring a system that shouldn't be this unpredictable. Your goal: Find out why the output is fluctuating." },
    { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, briefing: "You can't explain the fluctuation based on any known failure mode. Your goal: Rule out mechanical causes." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're tracking crew oxygen saturation levels. Your goal: Ensure the fluctuations aren't affecting crew health." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're establishing contingency thresholds for when to abort. Your goal: Decide what variance is acceptable." }
  ]
},
{ 
  title: "Unscheduled Transmission",
  playerCount: 4,
  setup: "You're receiving a faint radio signal on the lunar surface frequency that isn't from Mission Control or the hab.",
  roles: [
    { id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, briefing: "You're trying to isolate and identify the source of the signal. Your goal: Determine what's transmitting and from where." },
    { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, briefing: "You're confirming that Mission Control is not transmitting on that frequency. Your goal: Help rule out known sources." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're suggesting it might be equipment echo or interference. Your goal: Propose rational explanations." },
    { id: "Engineer", label: "🔧 Engineer", isPrimary: false, briefing: "You're noting that the signal strength is increasing. Your goal: Track the signal characteristics." }
  ]
},
{ 
  title: "Missing Tools",
  playerCount: 4,
  setup: "Three tools have gone missing from the equipment bay over the past week, and no one remembers moving them.",
  roles: [
    { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: true, briefing: "You're conducting inventory and trying to reconstruct events. Your goal: Figure out where the tools went." },
    { id: "AstronautA", label: "🚀 Astronaut A", isPrimary: false, briefing: "You have vague, contradictory memories of seeing the tools. Your goal: Try to remember what actually happened." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're suggesting logging procedures weren't followed properly. Your goal: Find a procedural explanation." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're questioning whether anyone has been sleepwalking. Your goal: Consider unusual but possible explanations." }
  ]
},
{ 
  title: "Camera Malfunction",
  playerCount: 4,
  setup: "Every photograph from this one location shows a dark spot that moves between frames, but nothing is visible to the eye.",
  roles: [
    { id: "Photographer", label: "📷 Photographer", isPrimary: true, briefing: "You're troubleshooting the camera or documenting something strange. Your goal: Determine if this is equipment failure or something else." },
    { id: "ImagingSpec", label: "🖼️ Imaging Specialist", isPrimary: false, briefing: "You're suggesting sensor damage or lens defects. Your goal: Identify technical explanations for the artifact." },
    { id: "Geologist", label: "🪨 Geologist", isPrimary: false, briefing: "You want to return to that exact location for verification. Your goal: Gather more data about the phenomenon." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reviewing the photographs with confusion. Your goal: Determine if this warrants investigation protocols." }
  ]
},
{ 
  title: "Temperature Anomaly",
  playerCount: 4,
  setup: "One section of the habitat is 7 degrees colder than it should be and the heating elements test fine.",
  roles: [
    { id: "EnvTech", label: "🌡️ Environmental Technician", isPrimary: true, briefing: "You're investigating the cold spot with no clear cause. Your goal: Find out why this section is losing heat." },
    { id: "ThermalEng", label: "🔧 Thermal Engineer", isPrimary: false, briefing: "You can't explain the readings based on system performance. Your goal: Rule out all normal failure modes." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're mentioning that the cold spot seems to have moved since yesterday. Your goal: Document the location changes." },
    { id: "Systems", label: "🔧 Systems", isPrimary: false, briefing: "You're checking for hull breaches that aren't showing up. Your goal: Verify structural integrity." }
  ]
},
{ 
  title: "Dust Accumulation Pattern",
  playerCount: 4,
  setup: "The lunar dust inside the airlock is accumulating in patterns that don't match foot traffic or wind.",
  roles: [
    { id: "Scientist", label: "🔬 Scientist", isPrimary: true, briefing: "You're documenting and analyzing the unexpected formations. Your goal: Determine what's causing these patterns." },
    { id: "Geologist", label: "🪨 Geologist", isPrimary: false, briefing: "You're offering theories about electrostatic behavior. Your goal: Find natural explanations for the phenomenon." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're noting that the patterns change overnight. Your goal: Monitor and document the changes." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're requesting detailed photographs. Your goal: Get documentation for analysis back on Earth." }
  ]
},
{ 
  title: "Biological Contamination Alert",
  playerCount: 4,
  setup: "A contamination sensor in the sample lab keeps alarming for organic compounds, but all samples are verified sterile.",
  roles: [
    { id: "LabTech", label: "🔬 Lab Technician", isPrimary: true, briefing: "You're trying to determine if it's sensor failure or actual detection. Your goal: Find the source of the organic readings." },
    { id: "Biologist", label: "🧬 Biologist", isPrimary: false, briefing: "You're running through scenarios that should be impossible. Your goal: Consider biological explanations while maintaining scientific skepticism." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're suggesting testing crew members for illness or contamination. Your goal: Rule out human sources." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're initiating containment protocols as a precaution. Your goal: Ensure proper safety procedures are followed." }
  ]
},
{ 
  title: "Power Drain",
  playerCount: 4,
  setup: "Battery banks are draining 11% faster than energy budget accounts for, and no equipment logs show the usage.",
  roles: [
    { id: "ElectricalEng", label: "⚡ Electrical Engineer", isPrimary: true, briefing: "You're tracing power consumption through the systems. Your goal: Find where the missing power is going." },
    { id: "SysOfficer", label: "🔧 Systems Officer", isPrimary: false, briefing: "You're reading contradictory meter data. Your goal: Verify which readings are accurate." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're suggesting checking for short circuits or damaged wiring. Your goal: Look for physical electrical problems." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're calculating how long reserves will last at this rate. Your goal: Determine when this becomes critical." }
  ]
},
{ 
  title: "Horizon Observation",
  playerCount: 4,
  setup: "Something on the horizon keeps catching your eye during EVAs, but when you look directly at it there's nothing there.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're trying to document or locate what you keep seeing peripherally. Your goal: Prove you're actually seeing something." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're asking about vision symptoms and fatigue levels. Your goal: Determine if this is a medical issue." },
    { id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, briefing: "You're reporting that you've seen it too. Your goal: Corroborate the sighting." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reviewing helmet camera footage that shows nothing. Your goal: Look for objective evidence." }
  ]
},
{ 
  title: "Time Discrepancy",
  playerCount: 4,
  setup: "Your EVA timer shows 3 hours elapsed but Mission Control says you've been out for 4 hours and 20 minutes.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're trying to account for the missing time. Your goal: Figure out what happened during the gap." },
    { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, briefing: "You're confirming Mission Control's timeline is accurate. Your goal: Verify the time discrepancy from multiple sources." },
    { id: "CrewMember", label: "👨‍🚀 Crew Member", isPrimary: false, briefing: "You're checking all chronometers and clocks. Your goal: Determine which timepiece is malfunctioning." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're asking detailed questions about memory continuity. Your goal: Assess if there are gaps in their recollection." }
  ]
},
{ 
  title: "Sample Movement",
  playerCount: 4,
  setup: "A rock sample you collected yesterday is in a different position in the storage rack than where you placed it.",
  roles: [
    { id: "Geologist", label: "🪨 Geologist", isPrimary: true, briefing: "You're checking sample inventory and security. Your goal: Verify the sample's position and determine if it moved." },
    { id: "CrewA", label: "👨‍🚀 Crew Member", isPrimary: false, briefing: "You deny touching the samples. Your goal: Help figure out what happened." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You want to verify the sample's identity hasn't changed. Your goal: Ensure this is still the correct sample." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're reviewing habitat access logs. Your goal: Determine who had access to the lab." }
  ]
},
{ 
  title: "Suit Weight Distribution",
  playerCount: 4,
  setup: "Your spacesuit feels heavier on the left side, but mass distribution checks show symmetric balance.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're investigating an unexplained sensation in your suit. Your goal: Determine if this is physical or perceptual." },
    { id: "SuitEngineer", label: "🔧 Suit Engineer", isPrimary: false, briefing: "You can't find any physical problem with the suit. Your goal: Rule out all mechanical causes." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're considering inner ear or vestibular issues. Your goal: Assess if this is a medical symptom." },
    { id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, briefing: "You mention feeling something similar last week. Your goal: Compare experiences." }
  ]
},
{ 
  title: "Crater Rim Shadow",
  playerCount: 4,
  setup: "The shadow at the crater rim you're studying doesn't match the sun angle, and it's grown since this morning.",
  roles: [
    { id: "Surveyor", label: "📐 Surveyor", isPrimary: true, briefing: "You're documenting and measuring the anomalous shadow. Your goal: Gather precise data about the discrepancy." },
    { id: "NavOfficer", label: "🧭 Navigation Officer", isPrimary: false, briefing: "You're confirming the sun's position is exactly where it should be. Your goal: Rule out navigation or timing errors." },
    { id: "Geologist", label: "🪨 Geologist", isPrimary: false, briefing: "You're suggesting unusual terrain features might explain it. Your goal: Find geological reasons for the shadow." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're requesting they maintain a safe distance. Your goal: Prioritize crew safety over investigation." }
  ]
},
{ 
  title: "Audio Recording Gap",
  playerCount: 4,
  setup: "The mission voice recorder has a 23-minute gap from last night that no one can explain.",
  roles: [
    { id: "CommsOfficer", label: "📡 Communications Officer", isPrimary: true, briefing: "You're investigating the recording failure. Your goal: Determine what caused the gap." },
    { id: "CrewA", label: "👨‍🚀 Crew Member", isPrimary: false, briefing: "You have vague, fragmentary memories of that time period. Your goal: Try to reconstruct what happened." },
    { id: "SysEngineer", label: "🔧 Systems Engineer", isPrimary: false, briefing: "You're checking for power interruptions or system failures. Your goal: Find a technical explanation." },
    { id: "CAPCOM", label: "🎮 CAPCOM", isPrimary: false, briefing: "You're asking what they were doing during that time. Your goal: Gather context about the missing period." }
  ]
},
{ 
  title: "Pressure Suit Resistance",
  playerCount: 4,
  setup: "Your suit joints are offering more resistance than normal, but pressure readings are nominal and there's no damage.",
  roles: [
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: true, briefing: "You're trying to diagnose why movement feels wrong. Your goal: Determine if the suit is malfunctioning or if something else is happening." },
    { id: "SuitTech", label: "🔧 Suit Technician", isPrimary: false, briefing: "You're checking telemetry remotely and everything looks normal. Your goal: Compare sensor data with their reported experience." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're monitoring heart rate and exertion levels. Your goal: Determine if this is causing physical strain." },
    { id: "AstronautB", label: "👨‍🚀 Astronaut", isPrimary: false, briefing: "You're observing that their movements look completely normal from outside. Your goal: Provide external perspective." }
  ]
},
{ 
  title: "Regolith Depth Anomaly",
  playerCount: 4,
  setup: "The rover's ground-penetrating radar shows a void 3 meters down that shouldn't exist in impact-compacted soil.",
  roles: [
    { id: "Geophysicist", label: "🌍 Geophysicist", isPrimary: true, briefing: "You're trying to verify and characterize the anomaly. Your goal: Determine if this void is real and what could have created it." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You're debating natural explanations that don't quite fit. Your goal: Find geological processes that could explain this." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reviewing geological surveys that show no voids. Your goal: Cross-reference with existing data." },
    { id: "Commander", label: "⭐ Commander", isPrimary: false, briefing: "You're asking if it's safe to continue over this area. Your goal: Assess potential hazards." }
  ]
},
{ 
  title: "Equipment Activation",
  playerCount: 4,
  setup: "A piece of equipment you definitely turned off last night was running this morning, and the logs show no activation command.",
  roles: [
    { id: "Technician", label: "🔧 Technician", isPrimary: true, briefing: "You're investigating the unauthorized power-up. Your goal: Find out how the equipment turned itself on." },
    { id: "SysEngineer", label: "⚡ Systems Engineer", isPrimary: false, briefing: "You're reviewing command history with no explanation. Your goal: Check for software glitches or bugs." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're questioning if someone operated it while sleepwalking. Your goal: Consider human factors." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're suggesting checking for programming errors. Your goal: Find rational technical explanations." }
  ]
},
{ 
  title: "Directional Disorientation",
  playerCount: 4,
  setup: "You keep feeling like north is in the wrong direction, even though all instruments confirm correct orientation.",
  roles: [
    { id: "Navigator", label: "🧭 Navigator", isPrimary: true, briefing: "You're trying to resolve the persistent feeling that direction is wrong. Your goal: Trust your instruments over your instincts." },
    { id: "MedOfficer", label: "⚕️ Medical Officer", isPrimary: false, briefing: "You're asking about vertigo or balance symptoms. Your goal: Rule out vestibular or neurological issues." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're suggesting a local magnetic anomaly might be affecting them. Your goal: Propose environmental causes." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're reminding them the moon has almost no magnetic field. Your goal: Keep them grounded in known facts." }
  ]
},
{ 
  title: "Sample Degradation",
  playerCount: 4,
  setup: "Rock samples are showing surface changes that shouldn't occur in the controlled habitat environment.",
  roles: [
    { id: "Geochemist", label: "🧪 Geochemist", isPrimary: true, briefing: "You're documenting impossible weathering or alteration. Your goal: Determine what's causing the samples to change." },
    { id: "SciTeam", label: "🔬 Science Team", isPrimary: false, briefing: "You're proposing contamination theories. Your goal: Find explanations for the chemical changes." },
    { id: "Astronaut", label: "🚀 Astronaut", isPrimary: false, briefing: "You're checking environmental controls for anomalies. Your goal: Verify the habitat conditions are stable." },
    { id: "MissionControl", label: "🎮 Mission Control", isPrimary: false, briefing: "You're requesting immediate photography and sample isolation. Your goal: Preserve evidence and prevent further changes." }
  ]
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
