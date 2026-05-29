---
layout: project-official
title: "S-ART — Student Astronomical Radio Telescope"
short_title: "S-ART"
permalink: /projects/s-art/

summary: "Student CubeSat mission concept focused on solar radio observations and hands-on satellite engineering."

status: "ACTIVE"
phase: "Conceptual / Preliminary Design"
year: 2026
category: "CUBESAT"
domain: "Solar Radio Astronomy"
role: "Systems Engineering / EPS / OBC"

mission_type: "Student CubeSat Mission"
science_target: "Solar radio emissions"
primary_output: "Time-frequency radio power measurements"
platform: "CubeSat-class spacecraft"

tags:
  - "CubeSat"
  - "EPS"
  - "OBC"
  - "Systems"
  - "Python"
  - "Radio Astronomy"
  - "Mission Analysis"
  - "ESA"

repo_url: "https://github.com/AxelJosephPM"
docs_url: ""
paper_url: ""

recognition:
  - title: "ESA Fly Your Satellite! Design Booster 2 Edition"
    type: "ESA Academy Training Week"
    location: "ESTEC, The Netherlands"
    year: 2024
    note: "Selected to participate in a five-day technical training week delivered by ESA professionals and focused on CubeSat mission development."

highlights:
  - "Selected to participate in ESA's Fly Your Satellite! Design Booster 2 Edition Training Week at ESTEC."
  - "Student CubeSat mission concept focused on solar radio observations."
  - "Subsystem decomposition with emphasis on EPS, OBC, payload interfaces, and operations."
  - "Requirements-driven documentation workflow for future design reviews."
  - "Simulation-oriented approach using Python tools, budgets, and validation scripts."

stack:
  - "Python for analysis and mission tools"
  - "Jekyll for technical documentation"
  - "GitHub Actions for deployment"
  - "LaTeX for engineering reports"
  - "Systems engineering documentation"

timeline:
  - date: "2024 Q4"
    title: "ESA Fly Your Satellite! Design Booster Training Week"
    note: "S-ART team members attended a five-day technical training week at ESTEC, delivered by ESA professionals and focused on CubeSat mission development."
  - date: "2025 Q4"
    title: "Concept and initial requirements"
    note: "Mission scope, early architecture, and science case definition."
  - date: "2026 Q1"
    title: "Subsystem refinement"
    note: "EPS/OBC trade studies, interface definition, and documentation."
  - date: "2026 Q2"
    title: "Preliminary mission baseline"
    note: "Mode cards, budgets, and first coherent mission architecture."

links:
  - label: "Projects index"
    url: "/projects/"
  - label: "GitHub profile"
    url: "https://github.com/AxelJosephPM"
---

## Mission Overview
{: #overview }

<div class="section-eyebrow">MISSION</div>

S-ART, the Student Astronomical Radio Telescope, is a student CubeSat mission concept focused on solar radio observations and hands-on satellite engineering.

The project combines a scientific objective with a strong educational and engineering framework. Its scientific direction is centered on the observation of solar radio emissions from a CubeSat-class platform. Its educational direction is centered on the design, documentation, simulation, and validation of a complete small satellite mission.

S-ART treats documentation, requirements, budgets, interface definitions, mode cards, and simulation scripts as core engineering products.

## ESA Fly Your Satellite! Design Booster
{: #esa-design-booster }

<div class="section-eyebrow">ESA ACADEMY MILESTONE</div>

S-ART was selected to participate in the ESA Fly Your Satellite! Design Booster 2 Edition, an ESA Academy educational opportunity for student satellite teams working on pico- and nanosatellite missions.

As part of this milestone, members of the S-ART team attended the programme's Training Week at ESTEC, the European Space Research and Technology Centre, in the Netherlands. The training lasted five days and included technical sessions, lectures, and workshops delivered by ESA professionals.

The programme exposed the team to professional space project methodology across the main areas of a CubeSat mission, including mission design, subsystem engineering, documentation, reviews, verification planning, operations, legal aspects, outreach, and space debris mitigation when appropriate.

For S-ART, the Design Booster experience represents an important project milestone. It strengthened the team's understanding of ESA-level engineering practices and reinforced the need to develop the mission through a rigorous, traceable, and review-oriented methodology.

## Mission Statement
{: #mission-statement }

<div class="section-eyebrow">MISSION BASELINE</div>

S-ART aims to develop a coherent CubeSat mission baseline for solar radio observation, connecting the science objective with spacecraft architecture, subsystem requirements, operational modes, and engineering validation.

## Science Case
{: #science }

<div class="section-eyebrow">SCIENCE</div>

The mission concept is centered on the observation of solar radio emissions.

At the current stage, the expected scientific product is a time-frequency record of received radio power. This makes the first mission baseline suitable for a student CubeSat architecture, since the project can focus on building a robust and interpretable measurement chain.

The measurement chain is currently framed around the following sequence:

1. receive solar radio signals,
2. characterize the observation window,
3. process and store the measured data,
4. downlink the data during available ground contacts,
5. connect the measurements with solar activity context.

The project focuses on a defensible and testable observational system, with payload performance, observation constraints, and mission parameters refined through later design iterations.

## Engineering Philosophy
{: #engineering-philosophy }

<div class="section-eyebrow">SYSTEMS ENGINEERING</div>

S-ART is developed as a requirements-driven engineering project.

Every technical choice should be traceable to a mission need. Payload assumptions affect the data budget. Observation windows affect the power budget. Eclipse duration affects EPS sizing. Contact opportunities affect communications and storage. Operational modes affect OBC logic and subsystem interfaces.

This traceability is one of the central engineering objectives of the project.

## Mission Architecture
{: #architecture }

<div class="section-eyebrow">ARCHITECTURE</div>

The spacecraft architecture is organized around the interaction between the main CubeSat subsystems:

- Payload
- Electrical Power System
- On-Board Computer
- Communications
- Attitude Determination and Control
- Structure
- Thermal Control
- Ground Segment

The current work focuses especially on the systems layer, the EPS/OBC interaction, payload interfaces, and the definition of operational modes.

<div class="mission-chain" aria-label="S-ART mission data flow">
  <div class="chain-node">
    <span class="chain-index">01</span>
    <strong>Sun</strong>
    <p>Solar radio source</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">02</span>
    <strong>Antenna</strong>
    <p>Signal reception</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">03</span>
    <strong>Payload</strong>
    <p>Radio measurement chain</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">04</span>
    <strong>OBC</strong>
    <p>Control and data handling</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">05</span>
    <strong>Storage</strong>
    <p>Science data buffering</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">06</span>
    <strong>Communications</strong>
    <p>Downlink window</p>
  </div>
  <div class="chain-node">
    <span class="chain-index">07</span>
    <strong>Ground</strong>
    <p>Reception and analysis</p>
  </div>
</div>

## Spacecraft Systems
{: #subsystems }

<div class="section-eyebrow">SYSTEMS</div>

<div class="subsystem-grid" aria-label="S-ART subsystem overview">
  <article class="subsystem-card">
    <span class="subsystem-tag">TBD</span>
    <h3>Payload</h3>
    <p>Scientific radio measurement chain for time-frequency power data.</p>
    <small>Open items: frequency range, antenna concept, receiver architecture.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Budget</span>
    <h3>EPS</h3>
    <p>Energy generation, storage, regulation, distribution, and safe power behavior.</p>
    <small>Open items: solar array sizing, battery capacity, eclipse assumptions.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Interface</span>
    <h3>OBC</h3>
    <p>Mode management, subsystem supervision, data handling, and basic autonomy.</p>
    <small>Open items: hardware baseline, flight software architecture, interfaces.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Link</span>
    <h3>Communications</h3>
    <p>Command, telemetry, and science data transfer during ground contacts.</p>
    <small>Open items: frequency band, link budget, contact assumptions.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">TBD</span>
    <h3>ADCS</h3>
    <p>Pointing and stability assumptions driven by the final observation concept.</p>
    <small>Open items: pointing requirement, sensors, actuators.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Accommodation</span>
    <h3>Structure</h3>
    <p>Mechanical support for payload, spacecraft equipment, and launch constraints.</p>
    <small>Open items: unit size, payload envelope, launch assumptions.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Thermal</span>
    <h3>Thermal Control</h3>
    <p>Environmental support for electronics, payload, and operational modes.</p>
    <small>Open items: thermal control approach, heat dissipation assumptions.</small>
  </article>
  <article class="subsystem-card">
    <span class="subsystem-tag">Operations</span>
    <h3>Ground Segment</h3>
    <p>Commanding, telemetry reception, data downlink, and science analysis support.</p>
    <small>Open items: ground station baseline, telemetry format, processing workflow.</small>
  </article>
</div>

### Payload

The payload is the scientific core of the mission. Its purpose is to collect solar radio measurements and produce data that can be processed into a time-frequency representation.

At the current stage, the payload is treated as a developing baseline. The final implementation depends on frequency range, antenna concept, receiver architecture, power consumption, data rate, mechanical constraints, and mission operations.

Current technical values:

- Frequency range: TBD
- Antenna concept: TBD
- Receiver architecture: TBD
- Payload power consumption: TBD
- Payload data rate: TBD

### Electrical Power System

The EPS is responsible for energy generation, storage, regulation, and distribution.

For S-ART, the EPS is especially important because the mission depends on the balance between observation time, eclipse periods, communications windows, battery capacity, and safe-mode behavior.

The EPS work includes:

- preliminary power budget,
- operational mode consumption estimates,
- battery and eclipse considerations,
- power distribution logic,
- EPS/OBC interface definition.

Current technical values:

- Solar array sizing: TBD
- Battery capacity: TBD
- Regulated power buses: TBD
- Eclipse assumptions: TBD

### On-Board Computer

The OBC acts as the central coordinator of the spacecraft.

Its responsibilities include subsystem supervision, mode management, data handling, communication with the payload, interaction with EPS status signals, and execution of basic autonomy logic.

The OBC work includes:

- mode/state logic,
- interface control,
- data handling,
- safe-state behavior,
- command and telemetry structure,
- preliminary hardware architecture.

Current technical values:

- OBC hardware baseline: TBD
- Flight software architecture: TBD
- Payload interface: TBD
- EPS interface: TBD

### Communications

The communications subsystem connects the spacecraft with the ground segment.

The design must remain consistent with the expected data volume, contact duration, link constraints, and operational schedule.

The communications analysis is directly connected to the data budget and the mission operations concept.

Current technical values:

- Frequency band: TBD
- Link budget: TBD
- Ground contact assumptions: TBD
- Downlink data volume: TBD

### ADCS

The ADCS requirements depend on the final observation concept.

At this stage, the ADCS is considered from a systems perspective: pointing needs, stability assumptions, sensor interfaces, and operational constraints must be defined before detailed subsystem design.

Current technical values:

- Pointing requirement: TBD
- Stability requirement: TBD
- Sensor baseline: TBD
- Actuator baseline: TBD

### Structure and Thermal Control

The structure and thermal subsystems provide the physical and environmental support for the spacecraft.

Their design must account for payload accommodation, deployment constraints, thermal exposure, internal heat dissipation, and launch environment assumptions.

Current technical values:

- CubeSat unit size: TBD
- Payload accommodation envelope: TBD
- Thermal control approach: TBD
- Launch environment assumptions: TBD

### Ground Segment

The ground segment closes the mission data loop.

It must support commanding, telemetry reception, data downlink, operational planning, and future analysis of the scientific measurements.

Current technical values:

- Ground station baseline: TBD
- Operations cadence: TBD
- Telemetry format: TBD
- Data processing workflow: TBD

## Operations Concept
{: #operations }

<div class="section-eyebrow">OPERATIONS</div>

S-ART is organized around a finite set of spacecraft modes.

Initial operational modes may include:

- Safe Mode
- Idle / Standby Mode
- Payload Observation Mode
- Communications Mode
- Charging Mode
- Maintenance / Update Mode

Each mode should define:

- active subsystems,
- power consumption,
- data generation,
- allowed transitions,
- entry conditions,
- exit conditions,
- fault behavior.

This mode-based structure connects operational decisions with EPS sizing, OBC logic, data handling, and communications planning.

## Documentation Products
{: #documentation }

<div class="section-eyebrow">DOCUMENTATION</div>

The project is being developed with documentation as a primary engineering output.

Expected documentation products include:

- Mission Statement
- User Requirements Document
- System Requirements Document
- Payload Requirements
- EPS Budget
- Data Budget
- Mass Budget
- Interface Control Document
- Operational Mode Cards
- Mission Analysis Notes
- Preliminary Design Review material

## Current Status
{: #current-status }

<div class="section-eyebrow">STATUS</div>

S-ART is currently in an active conceptual and preliminary design phase.

The current priority is to consolidate a coherent mission baseline before moving into detailed subsystem design. This includes refining the payload concept, defining subsystem interfaces, developing first-order budgets, and preparing documentation suitable for future design reviews.

## Roadmap
{: #roadmap }

<div class="section-eyebrow">ROADMAP</div>

<div class="roadmap-panel" aria-label="S-ART mission roadmap">
  <article class="roadmap-step">
    <span>Phase 0</span>
    <h3>Concept Definition</h3>
    <p>Define the mission motivation, science case, preliminary payload idea, and educational objectives.</p>
  </article>
  <article class="roadmap-step is-current">
    <span>Phase A</span>
    <h3>Requirements and Feasibility</h3>
    <p>Develop initial mission requirements, subsystem assumptions, operational constraints, and first-order budgets.</p>
  </article>
  <article class="roadmap-step">
    <span>Phase B</span>
    <h3>Preliminary Design</h3>
    <p>Consolidate subsystem architectures, interface definitions, operational modes, and validation plans.</p>
  </article>
  <article class="roadmap-step">
    <span>Future Work</span>
    <h3>PDR-Level Package</h3>
    <p>Focus on payload refinement, mission analysis, EPS/OBC integration, communications analysis, and preparation of a more complete PDR-level package.</p>
  </article>
</div>
