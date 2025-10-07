// Apollo 47 - Jargon and Prompt Lists
// Extracted from the original tabletop RPG by Tim Hutchings
//
// Organized into three categories:
// 1. GENERIC - Verbs and adjectives to combine into jargon
// 2. THINGS - Physical objects to reference
// 3. PROTOCOL - Radio communications and tone

// ============================================
// CATEGORY 1: GENERIC (Make up jargon)
// ============================================

export const MOON_VERBS = [
  "Assay", "Purge", "Traverse", "Dig", "Launch", "Repair", "Ascend", "Clean", 
  "Tip", "Analyze", "Ascertain", "Fill", "Sight", "Unfold", "Redeploy", "Stow", 
  "Exert", "Caution", "Transmit", "Salvage", "Process", "Degauss", "Flounder", 
  "Confirm", "Describe", "Focus", "Retrieve", "Photograph", "Delineate", "Resume", 
  "Fit", "Aim", "Secure", "Test", "Annotate", "Reboot", "Rescue", "Detach", 
  "Prepare", "Drill", "Disassemble", "Deliver", "Regulate", "Pilot", "Signal", 
  "Navigate", "Transverse", "Abseil", "Search", "Probe", "Descend", "Build", 
  "Collect", "Convey", "Emit", "Weld", "Survey", "Mark", "Unravel", "Program", 
  "Deposit", "Enter", "Inspect", "Undock", "Raze", "Climb", "Wait", "Erect", 
  "Activate", "Evaluate", "Experiment", "Uninstall", "Cache", "Investigate", 
  "Uncoil", "Project", "Inflate", "Unify", "Weigh", "Codify", "Direct", "Guide", 
  "Install", "Energize", "Level", "Destroy", "Push", "Cover", "Open", "Flush", 
  "Depress", "Translate", "Meet", "Warm", "Manipulate", "Conduct", "Lubricate", 
  "Remove", "Tag", "Spelunk", "Sift", "Exhume", "Move", "Reconnoiter", "Redirect", 
  "Splice", "Unite", "Reposition", "Patch", "Approach", "Irradiate", "Aid", "Tow", 
  "Discharge", "Index", "Tabulate", "Monitor", "Help", "Embark", "Intercede", 
  "Modify", "Break", "Advise", "Combine", "Distill", "Bridge", "Gather", "Connect", 
  "Network", "Conjoin", "Interface", "Sort", "Detect", "Extend", "Tally", 
  "Coordinate", "Lug", "Transfer", "Entrench", "Conceal", "Flash", "Improvise", 
  "Synchronize", "Tune", "Demonstrate", "Make", "Beam", "Loosen", "Transport", 
  "Repeat", "Measure", "Exercise", "Toil", "Prospect", "Tour", "Delve", "Breach", 
  "Carve", "Comply", "Observe", "Chart", "Renew", "Reestablish", "Revive", "Polish", 
  "Dredge", "Eject", "Exonerate", "Refine", "Scrape", "Anneal", "Rake", "Mix", 
  "Illuminate", "Plug", "Cooperate", "Compile", "Synthesize", "Link", "Fabricate", 
  "Arrange", "Classify", "Align", "Camp", "Range", "Catalogue", "Hoist", "Calculate", 
  "Unclog", "Rejigger", "Paint", "Scatter", "Tilt", "Park", "Extinguish", "Resupply", 
  "Implement", "Contrive", "Handle", "Compress", "Tauten", "Warn", "Unfurl", 
  "Obfuscate", "Rewire", "Assist", "Relieve", "Admire", "Corroborate", "Predict", 
  "Call", "Auger", "Witness", "Eliminate", "Substantiate", "Authorize", "Delay", 
  "Acquire", "Hammer", "Unlock", "Treat", "Recalibrate", "Triangulate"
];

export const EQUIPMENT_ADJECTIVES = [
  "Auxiliary", "Omnidirectional", "Outmoded", "Calibration", "Delta", "Digital", 
  "Differential", "Cosmic", "Deployable", "Passive", "Electronic", "Tertiary", 
  "Extravehicular", "Forward", "Geological", "Solar", "Guidance", "Inertial", 
  "Integrating", "Self-Correcting", "Interim", "Ranging", "Lateral", "Lunar", 
  "Radar", "Modular", "Main", "Middle", "Magnetic", "Vector", "Ultra-High Frequency", 
  "Navigation", "Narrow Band", "External", "Powered", "Scaleable", "Pressurized", 
  "Principal", "Pulsed", "Portable", "Axial", "Primary", "Command", "Miniature", 
  "Secondary", "Remote", "Retractable", "Reverse", "Radio", "Refractive", "Unrated", 
  "Radial", "Sequential", "Environmental", "Supercritical", "Self-Recording", 
  "Dynamic", "Static", "Unmanned", "Synchronizational", "Telemetric", "Polarizing", 
  "Translunar", "Universal", "Wide Band", "Contingency", "Automatic", "Transfer", 
  "Subsurface", "Mobile", "Seismic", "Secret", "Subatomic", "Preliminary", 
  "Sublunar", "Autonomous", "Reactive", "Damaged", "Transdiscursive", "Atmospheric", 
  "Disposable", "United Nations", "Retrofitted", "Entrenched"
];

// ============================================
// CATEGORY 2: THINGS (Physical objects)
// ============================================

export const EQUIPMENT_PARTS = [
  "Elevation Control", "Latching Device", "Altimeter", "Gain Control", "Bulb", 
  "Unit", "Annunciator", "Antenna", "Sensor Assembly", "Data Processor", 
  "Safety Switch", "Bipropellant", "Gyro", "Laser", "Gimlet", "Assembly", "Cable", 
  "Contact Closure", "Coupler", "Bit", "Component", "Camera", "Cartridge", "Diverter", 
  "Knob", "Static Band", "Electrical Power System", "Modulator", "Clamp", 
  "Operation Switch", "Switch", "Tape Relay", "Actuator", "Gimbal", "Panel", 
  "Keyboard", "Toggle", "Indicator Lamp", "Heat Exchanger", "Injector", "Instrument", 
  "Driver", "Limiter", "Manifold", "Console", "Contact", "Feeder", "Magnetic", 
  "Purger", "Outlet", "Cap", "Override", "Amplifier", "Program", "Lock", "Screw", 
  "Nut", "Bolt", "Regulator", "Release", "Hatch", "Clip", "Relay", "Ranger", 
  "Resolver", "Insulation", "Separator", "Adapter", "Solenoid", "Valve", "System", 
  "Strobe", "Strut", "Servo", "Chamber", "Oscillograph", "Circuit Breaker", 
  "Stepper Motor", "Tank", "Resistor", "Mesh", "Trunnion", "Tether", "Lanyard", 
  "Iris", "Tape", "Bus", "Ammeter", "System Reset", "Plug", "Wire", "Spring", 
  "Cog", "Hinge Track", "Bundle", "Capacitor", "Overlimiter", "Ground", "Read Out", 
  "Telltale", "Contact Point", "Power Outtake", "Integrator", "Boyd Bolt", "Taper", 
  "Diffracting Lens", "Fractionator", "Augur", "Diode"
];

export const SAMPLE_EQUIPMENT = [
  "Low Gain Antenna", "Apollo Lunar Experiments Package", "Sample Return Container", 
  "Area Surveillance Radar", "Timing Beacon", "Cosmic Ray Detector", 
  "Caution and Warning Electronics Assembly", "Emergency Cache", 
  "Radio-Isotope Thermo-Electric Generator", "Fuel Transfer Unit", "Retroreflectors", 
  "Solar Panel Array", "Detection System", "Sounder", "Electro-magnetic Interferometer", 
  "Flosonic Indicator", "Far Ultraviolet Spectrometer", "Gas Analysis Sample Extractor", 
  "Gnomon", "High Gain Infrator", "Lunar Atmosphere Detector", 
  "Infrared Scanning Radiometer", "Geophone", "Transponder", 
  "Communications Relay Unit", "Lunar Mass Spectrometer", "Lunar Neutron Probe", 
  "Tripod", "Location Designator", "Surface Gravimeter", "Thumper", "Magnetometer", 
  "Repeater", "Transducer", "Ison Gun", "Ultraviolet Camera", 
  "Integrating Pendulous Accelerometer", "Radiation Dosimeter", "Propellant", 
  "Quantity Measuring Device", "Receiver", "Signal Conditioner", "Penetrometer", 
  "Sun Shadow Device", "Solar Wind Composition Collector", "Theodolite", "Transmitter", 
  "Crystallographic Microtron", "Array", "Dustbrush", "Geopallet", "Oscilloscope", 
  "Laser Ranging Retroreflector", "Optical Alignment Scope", "Rake", "Box Scoop", 
  "Tongs", "Trenching Tool", "Plotting Map", "Contact Soil Sampling Device", 
  "Beta Cloth Sampler", "Extensible Contingency Soil Sampler", "2cm Coring Tube", 
  "4cm Drive Tube", "Drill Treadle", "Gas Analysis Container", "Mounting Stem", 
  "Battery RECC Pack", "Bore Stem Packet", "Rock Hammer", "Soil Sampler", 
  "Brush-Scriber-Lens", "Spring Scale", "Sample Collection Bags", 
  "Vacuum Sample Containers", "Extension Handle"
];

export const SUIT_PARTS = [
  "Gloves", "Lower Torso Assembly", "Contaminant Control Cartridge", 
  "Pressure Gauge", "Tamping Battery", "Service Umbilical", "Knee Pads", "Boots", 
  "Visor Assembly", "Heads Up Display", "Helmet Mounting Ring", 
  "Medical Injection Flap", "Dosimeter", "Velcro Patch", "Detachable Checklist Pocket", 
  "Primary Life Support System", "Emergency Oxygen Hose Attachment", 
  "Electrical Harness", "Liquid Coolant", "Web Belt", "Display and Control Module", 
  "Relay Jack", "Headset", "LG Antenna", "Secondary Oxygen Pack", 
  "Deployable Sun Shield", "Helmet", "In-suit Drink Bag", "Urine Collection Device", 
  "Elbow Pleats", "Fastener Flap", "UTC Connector", "Helmet Light", 
  "Oxygen Control Actuator", "Temperature Control Valve", "Oxygen Meter", 
  "TV Camera Mount", "Fan Pump Motor Assembly", "Caution and Warning Computer", 
  "Communications Assembly", "Emergency Strobe", "Tool Mobility Satchel", 
  "Safety Tether Mount Point", "Heat Exchanger", "Scissors Pocket", "Telemetry Unit", 
  "Moisture Separator", "LM Restraint Ring", "Nameplate", "Primary Vent", "Backpack", 
  "Wrist Mounted Checklist"
];

export const VEHICLE_PARTS = [
  "Control Console", "Stowage Platform", "Axial Controls", "Klein Jets", 
  "Payload Pallet Adapter", "Umbilical System", "Motor", "Circular Spline", 
  "PLSS Battery Array", "Crash Cage", "Emergency Beacon", "Brace", 
  "High Gain Antenna", "Waypoint Log", "Stowage Access Hatch", "SPU", "Truss", 
  "Heat Exchanger", "Radiation Shielding", "Seat Belts", "Forward Chassis", 
  "Tie Rod", "Cable Reel", "Emergency Oxygen Hose", "Rear Steering Actuator", 
  "Wave Generator", "Reed Switch", "Feedback Pot", "EMI Filter", "Coping Flange", 
  "Reverse Inhibit Switch", "Expandable Tread", "ECS LiOH Cartridge", 
  "Alignment Scope", "FTP Lamp", "Ambient Ion Generator", "RCS Nozzle", 
  "Dispersal Socket", "ETF Packet", "Tertiary Thruster Assembly", "Floodlight"
];

export const LUNAR_STRUCTURES = [
  "Science Pod", "Pressurized Habitation Structure", "Radar Installation", 
  "Antenna Mast", "Mine Entrance", "Emergency Cache", "Navigation Beacon", 
  "Pit Mine", "Unimproved Landing Area", "Abandoned Equipment", "Military Base", 
  "Oxygen Extraction Refinery", "LOSS-Low Orbit Space Station", 
  "Geoseismic Detection Outpost", "Medical Ward", "Subsurface Facility", 
  "Vehicle Depot", "Solar Power Array", "Tunnel Access Point", "Hydroponic Sphere", 
  "Airlock", "Solar Shield", "Occupied Lava Tube", "Magnetic Arc Generator", 
  "Nuclear Power Plant", "Fuel Dump", "Observatory", 
  "Mission Oriented Temporary Inflatable Structure", "Vehicle Guidance Markers", 
  "Orbiting Solar Focus", "Launch Pad", "Catapult Railway", 
  "Containment Drum Stockpile", "Storage Tank", "Crane Assembly", 
  "Irrecoverable Waste Pits", "Radiator Fins", "Footprints", "Vehicle Graveyard", 
  "Ranging Yard", "Lift Balloon", "Solar Flare Bunker", "Earth Observation Unit", 
  "Abandoned Landing Deployment Capsule", "Wave Transit Field", "Transversal Pits", 
  "Drill Tower", "Geothermal Tapping Station", "Ice Pile", "Dome", "Cylinder"
];

// ============================================
// CATEGORY 3: PROTOCOL (Radio communications)
// ============================================

export const COMMS_PHRASES = [
  "Check nine on that?",
  "Check nine",
  "Copy that",
  "Roger",
  "Standing by",
  "Confirm reading",
  "Give me a waypoint",
  "Confirm 7-dash-A4",
  "Reading you loud and clear",
  "Please advise",
  "How copy?",
  "Say again?",
  "Didn't get that last transmission",
  "Please repeat",
  "Mark that",
  "Confirmed",
  "Negative",
  "That's affirmative",
  "Stand by",
  "Going below horizon",
  "Switch to channel 43",
  "Toggle 7, 9, and 11",
  "Have you got green?",
  "Call that back",
  "Did you copy?",
  "We're standing by for a mark"
];

export const TONE_PHRASES = [
  "I'm not getting that reading here",
  "Let's go back to set-zero",
  "You're breaking protocol",
  "The dust here rates a Type C hazard",
  "Scratching mission steps 3 and 5",
  "I'm going to deny that request",
  "Come on home",
  "This isn't how we did it in training",
  "Can you pulse it off and on?",
  "These are blue. They've always been green before",
  "Is this a problem?",
  "Check your umbilical for kinks",
  "Give me a workaround",
  "We're handing you over to Lunex Base",
  "I've got a little birthday boy here who wants to say hi",
  "Request permission to extend my excursion",
  "What's the work-around?",
  "Give me a sighting pulse",
  "Let's start the confirmation check on 3",
  "I'm planting a flag. Anybody want to say some words?"
];

export const PROBLEM_INDICATORS = [
  "Reading's off by 3 degrees",
  "Getting intermittent signal dropout",
  "Pressure's fluctuating",
  "Not getting a green light",
  "Mechanism feels sticky",
  "Voltage looks low",
  "Can't get a solid lock",
  "Something's fouled with dust",
  "There's a smell",
  "Making a noise it shouldn't make",
  "Won't release",
  "Stuck at frame 38",
  "Jammed",
  "Drifting",
  "Off-scale low",
  "Compromised",
  "Within spec but feels wrong",
  "Contradicts everything I know",
  "Makes no sense",
  "Showing wear"
];

// ============================================
// CATEGORY GROUPINGS (for UI)
// ============================================

export const GENERIC_JARGON = {
  verbs: MOON_VERBS,
  adjectives: EQUIPMENT_ADJECTIVES
};

export const THINGS = {
  equipment: EQUIPMENT_PARTS,
  sampleEquipment: SAMPLE_EQUIPMENT,
  suit: SUIT_PARTS,
  vehicle: VEHICLE_PARTS,
  structures: LUNAR_STRUCTURES
};

export const PROTOCOL = {
  comms: COMMS_PHRASES,
  tone: TONE_PHRASES,
  problems: PROBLEM_INDICATORS
};

// Helper function to get random items from an array
export function getRandomItems(array, count = 5) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper to get random items from a category
export function getRandomFromCategory(category, count = 10) {
  const allItems = Object.values(category).flat();
  return getRandomItems(allItems, count);
}