# CHAPTER 5: MASS, BERNOULLI, AND ENERGY EQUATIONS

This chapter deals with three equations commonly used in fluid mechanics: the mass, Bernoulli, and energy equations.

### OBJECTIVES
- Apply the **mass equation** to balance flow rates.
- Understand the use and limitations of the **Bernoulli equation**.
- Work with the **energy equation** in terms of heads.

---

## 5–1 ■ INTRODUCTION

Conservation laws are balance equations.
- **Conservation of Mass:** $m_{sys} = \text{constant}$ or $dm_{sys}/dt = 0$. For a control volume (CV):
  $$ \dot{m}_{in} - \dot{m}_{out} = \frac{dm_{CV}}{dt} \quad (5–1) $$
- **Conservation of Momentum:** Newton’s second law ($F = ma$).
- **Conservation of Energy:** 
  $$ \dot{E}_{in} - \dot{E}_{out} = \frac{dE_{CV}}{dt} \quad (5–2) $$

---

## 5–2 ■ CONSERVATION OF MASS

### Mass and Volume Flow Rates

The **mass flow rate** $\dot{m}$ through a small area $dA_c$ is:
$$ \delta \dot{m} = \rho V_n dA_c \quad (5–4) $$
Total mass flow rate through a cross section:
$$ \dot{m} = \int_{A_c} \rho V_n dA_c \quad (\text{kg/s}) \quad (5–5) $$

**Average velocity** $V_{avg}$:
$$ V_{avg} = \frac{1}{A_c} \int_{A_c} V_n dA_c \quad (5–6) $$
For incompressible flow:
$$ \dot{m} = \rho V_{avg} A_c \quad (5–7) $$

**Volume flow rate** $\dot{V}$:
$$ \dot{V} = \int_{A_c} V_n dA_c = V_{avg} A_c = V A_c \quad (\text{m}^3/\text{s}) \quad (5–8) $$

The mass and volume flow rates are related by:
$$ \dot{m} = \rho \dot{V} = \frac{\dot{V}}{v} \quad (5–9) $$

![FIGURE 5–4: The average velocity is the average speed through a cross section.](path/to/image5-4.jpg)

---

---

## Conservation of Mass Principle

The net mass transfer to or from a control volume during a time interval $\Delta t$ is equal to the net change in the total mass within the control volume.
$$ m_{in} - m_{out} = \Delta m_{CV} \quad (\text{kg}) \quad (5–10) $$
In rate form:
$$ \dot{m}_{in} - \dot{m}_{out} = \frac{dm_{CV}}{dt} \quad (\text{kg/s}) \quad (5–11) $$

For a general CV, the total mass is:
$$ m_{CV} = \int_{CV} \rho \, dV \quad (5–12) $$
The rate of change is:
$$ \frac{dm_{CV}}{dt} = \frac{d}{dt} \int_{CV} \rho \, dV \quad (5–13) $$

**Net mass flow rate** across the control surface:
$$ \dot{m}_{net} = \int_{CS} \rho (\vec{V} \cdot \vec{n}) dA \quad (5–16) $$

**General conservation of mass (Continuity Equation):**
$$ \frac{d}{dt} \int_{CV} \rho \, dV + \int_{CS} \rho (\vec{V} \cdot \vec{n}) dA = 0 \quad (5–17) $$

### Mass Balance for Steady-Flow Processes
For steady flow, $m_{CV} = \text{constant}$:
$$ \sum_{in} \dot{m} = \sum_{out} \dot{m} \quad (\text{kg/s}) \quad (5–20) $$
For a single stream (one inlet, one outlet):
$$ \dot{m}_1 = \dot{m}_2 \to \rho_1 V_1 A_1 = \rho_2 V_2 A_2 \quad (5–21) $$

### Special Case: Incompressible Flow
For liquids ($\rho = \text{constant}$):
$$ \sum_{in} \dot{V} = \sum_{out} \dot{V} \quad (\text{m}^3/\text{s}) \quad (5–22) $$
$$ V_1 A_1 = V_2 A_2 \quad (5–23) $$

**EXAMPLE 5–1: Water Flow through a Garden Hose Nozzle**
$V = 10 \text{ gal}$, $\Delta t = 50 \text{ s}$, $D_{exit} = 0.8 \text{ cm}$.
**Analysis:** 
$$ \dot{V} = \frac{10 \text{ gal}}{50 \text{ s}} \left( \frac{3.7854 \text{ L}}{1 \text{ gal}} \right) = 0.757 \text{ L/s} $$
$$ V_e = \frac{\dot{V}}{A_e} = \frac{0.757 \text{ L/s}}{0.5027 \times 10^{-4} \text{ m}^2} \left( \frac{1 \text{ m}^3}{1000 \text{ L}} \right) = 15.1 \text{ m/s} $$

**EXAMPLE 5–2: Discharge of Water from a Tank**
Unsteady flow problem. Mass balance: $-\dot{m}_{out} = dm_{CV}/dt$.
$$ -\rho \sqrt{2gh} A_{jet} = \rho A_{tank} \frac{dh}{dt} \to dt = -\frac{D_{tank}^2}{D_{jet}^2} \frac{dh}{\sqrt{2gh}} $$
Integrating from $h_0$ to $h_2$:
$$ t = \frac{\sqrt{h_0} - \sqrt{h_2}}{\sqrt{g/2}} \left( \frac{D_{tank}}{D_{jet}} \right)^2 $$

---

## 5–3 ■ MECHANICAL ENERGY AND EFFICIENCY

**Mechanical energy** is the form of energy that can be converted to mechanical work completely and directly by an ideal mechanical device.
$$ e_{mech} = \frac{P}{\rho} + \frac{V^2}{2} + gz \quad (5–24) $$
Change in mechanical energy:
$$ \Delta e_{mech} = \frac{P_2 - P_1}{\rho} + \frac{V_2^2 - V_1^2}{2} + g(z_2 - z_1) \quad (\text{kJ/kg}) $$

### Mechanical Efficiency
$$ \eta_{mech} = \frac{\text{Mechanical energy output}}{\text{Mechanical energy input}} = \frac{E_{mech,out}}{E_{mech,in}} = 1 - \frac{E_{mech,loss}}{E_{mech,in}} \quad (5–25) $$

**Pump and Turbine Efficiencies:**
$$ \eta_{pump} = \frac{\Delta \dot{E}_{mech,fluid}}{\dot{W}_{shaft,in}} = \frac{\dot{W}_{pump,u}}{\dot{W}_{pump}} \quad (5–26) $$
$$ \eta_{turbine} = \frac{\dot{W}_{shaft,out}}{|\Delta \dot{E}_{mech,fluid}|} = \frac{\dot{W}_{turbine}}{\dot{W}_{turbine,e}} \quad (5–27) $$

**Overall Efficiency:**
$$ \eta_{pump-motor} = \eta_{pump} \eta_{motor} = \frac{\dot{W}_{pump,u}}{\dot{W}_{elect,in}} \quad (5–30) $$
$$ \eta_{turbine-gen} = \eta_{turbine} \eta_{generator} = \frac{\dot{W}_{elect,out}}{|\Delta \dot{E}_{mech,fluid}|} \quad (5–31) $$

**EXAMPLE 5–3: Performance of a Hydraulic Turbine–Generator**
$h = 50 \text{ m}$, $\dot{m} = 5000 \text{ kg/s}$, $\dot{W}_{elect,out} = 1862 \text{ kW}$, $\eta_{gen} = 95\%$.
**Analysis:**
$\Delta e_{mech} = gh = 0.491 \text{ kJ/kg}$.
$\Delta \dot{E}_{mech,fluid} = \dot{m} \Delta e_{mech} = 2455 \text{ kW}$.
$\eta_{overall} = \frac{1862}{2455} = 0.76 \to \eta_{turbine} = \frac{0.76}{0.95} = 0.80$.
Shaft power: $\dot{W}_{shaft,out} = 0.80(2455) = 1964 \text{ kW}$.

---

---

## 5–4 ■ THE BERNOULLI EQUATION

The Bernoulli equation is an approximate relation between pressure, velocity, and elevation, valid in regions of steady, incompressible flow where net frictional forces are negligible.

### Acceleration of a Fluid Particle
Acceleration along a streamline $s$ can be decomposed into streamwise acceleration $a_s$ and normal acceleration $a_n$:
$$ a_s = \frac{dV}{dt} = \frac{\partial V}{\partial s} \frac{ds}{dt} + \frac{\partial V}{\partial t} = V \frac{dV}{ds} \quad (\text{steady flow}) \quad (5–34) $$
$$ a_n = \frac{V^2}{R} $$

### Derivation of the Bernoulli Equation
Applying Newton’s second law in the $s$-direction (Fig. 5–23):
$$ \sum F_s = ma_s \to P dA - (P + dP) dA - W \sin \theta = \rho \, dA \, ds \, V \frac{dV}{ds} $$
Since $W = \rho g \, dA \, ds$ and $\sin \theta = dz/ds$:
$$ -dP - \rho g dz = \rho V dV $$
Dividing by $\rho$ and integrating:
$$ \int \frac{dP}{\rho} + \frac{V^2}{2} + gz = \text{constant} \quad (5–40) $$
For incompressible flow ($\rho = \text{constant}$):
$$ \frac{P}{\rho} + \frac{V^2}{2} + gz = \text{constant (along a streamline)} \quad (5–41) $$
Between two points:
$$ \frac{P_1}{\rho} + \frac{V_1^2}{2} + gz_1 = \frac{P_2}{\rho} + \frac{V_2^2}{2} + gz_2 \quad (5–42) $$

---

## Static, Dynamic, and Stagnation Pressures

Multiplying the Bernoulli equation by density $\rho$:
$$ P + \rho \frac{V^2}{2} + \rho gz = \text{constant} \quad (5–45) $$
- **$P$:** Static pressure (actual thermodynamic pressure).
- **$\rho V^2/2$:** Dynamic pressure (pressure rise when fluid is brought to rest).
- **$\rho gz$:** Hydrostatic pressure (depends on reference level).

The sum of static and dynamic pressure is the **stagnation pressure**:
$$ P_{stag} = P + \rho \frac{V^2}{2} \quad (\text{kPa}) \quad (5–46) $$
Fluid velocity can be measured using a Pitot tube:
$$ V = \sqrt{\frac{2(P_{stag} - P)}{\rho}} \quad (5–47) $$

---

## Hydraulic Grade Line (HGL) and Energy Grade Line (EGL)

Dividing each term of Eq. 5–41 by $g$ to express energy in terms of "heads":
$$ \frac{P}{\rho g} + \frac{V^2}{2g} + z = H = \text{constant} \quad (5–48) $$
- **$P/\rho g$:** Pressure head.
- **$V^2/2g$:** Velocity head.
- **$z$:** Elevation head.
- **$H$:** Total head.

**HGL (Hydraulic Grade Line):** Sum of pressure and elevation heads ($P/\rho g + z$).
**EGL (Energy Grade Line):** Total head of the fluid.

- The EGL is always a distance $V^2/2g$ above the HGL.
- For stationary bodies (reservoirs), EGL and HGL coincide with the free surface.
- Friction causes EGL and HGL to slope downward in the flow direction.
- Pumps cause a "jump" in EGL/HGL, while turbines cause a "drop" (Fig. 5–36).

---

## 5–5 ■ APPLICATIONS OF THE BERNOULLI EQUATION

**EXAMPLE 5–5: Spraying Water into the Air**
Water at $400 \text{ kPa}$ gage is sprayed upward. Determine maximum height.
**Analysis:** Bernoulli between nozzle (1) and peak (2). $P_1 = 400 \text{ kPa}$, $P_2 = 0$ (gage), $V_2 = 0$.
$$ \frac{P_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{P_2}{\rho g} + \frac{V_2^2}{2g} + z_2 $$
Assuming $V_1 \cong 0$ inside the main:
$$ z_2 - z_1 = \frac{P_1}{\rho g} = \frac{400,000 \text{ Pa}}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \cong 40.8 \text{ m} $$

---

**EXAMPLE 5–6: Water Discharge from a Large Tank**
A large tank open to the atmosphere is filled to $5 \text{ m}$ height.
**Analysis:** Bernoulli between free surface (1) and outlet (2). $P_1 = P_2 = P_{atm}, V_1 \cong 0, z_2 = 0$.
$$ z_1 = \frac{V_2^2}{2g} \to V_2 = \sqrt{2gz_1} = \sqrt{2(9.81 \text{ m/s}^2)(5 \text{ m})} = 9.9 \text{ m/s} $$
The relation $V = \sqrt{2gh}$ is called the **Torricelli equation**.

**EXAMPLE 5–7: Siphoning Out Gasoline from a Fuel Tank**
Siphon diameter $4 \text{ mm}$, $P_{atm} = 101.3 \text{ kPa}$, $\rho = 750 \text{ kg/m}^3$.
**Analysis:** 
Velocity at outlet (2): $V_2 = \sqrt{2gz_1} = \sqrt{2(9.81)(0.75)} = 3.84 \text{ m/s}$.
Time to siphon $4 \text{ L}$: $\Delta t = V / \dot{V} = 4 \text{ L} / 0.0753 \text{ L/s} = 53.1 \text{ s}$.
Pressure at high point (3): $P_3 = P_{atm} - \rho g z_3 = 101.3 - (750)(9.81)(2.75) = 81.1 \text{ kPa}$.

**EXAMPLE 5–8: Velocity Measurement by a Pitot Tube**
Static head $h_1+h_2$, stagnation head $h_1+h_2+h_3$.
**Analysis:** 
$$ V_1 = \sqrt{2gh_3} = \sqrt{2(9.81)(0.12 \text{ m})} = 1.53 \text{ m/s} $$

---

## Limitations on the Use of the Bernoulli Equation

1. **Steady flow:** Applicable only to steady flows.
2. **Frictionless flow:** Neglects viscous effects (valid in inviscid regions).
3. **No shaft work:** Not applicable across pumps, turbines, or fans.
4. **Incompressible flow:** $\rho = \text{constant}$ (valid for $Ma < 0.3$ for gases).
5. **No heat transfer:** Neglects temperature changes.
6. **Flow along a streamline:** Generally applies along a single streamline unless the flow is **irrotational**.

---

## 5–6 ■ GENERAL ENERGY EQUATION

Conservation of energy (First Law of Thermodynamics):
$$ \dot{Q}_{net,in} + \dot{W}_{net,in} = \frac{dE_{sys}}{dt} \quad (5–49) $$
Total energy $e = u + ke + pe = u + V^2/2 + gz \quad (5–50)$.

### Energy Transfer by Work, $W$
Total work rate:
$$ \dot{W}_{total} = \dot{W}_{shaft} + \dot{W}_{pressure} + \dot{W}_{viscous} + \dot{W}_{other} \quad (5–51) $$
- **Shaft work:** $\dot{W}_{shaft} = \omega T_{shaft} = 2\pi \dot{n} T_{shaft} \quad (5–52)$.
- **Pressure work:** Work done by pressure forces on the control surface.
  $$ \delta \dot{W}_{pressure} = -P \, dA \, V_n = -P \, dA (\vec{V} \cdot \vec{n}) \quad (5–53) $$
  Net pressure power:
  $$ \dot{W}_{pressure,net,in} = -\int_A P(\vec{V} \cdot \vec{n}) dA = -\int_A \frac{P}{\rho} \rho (\vec{V} \cdot \vec{n}) dA \quad (5–54) $$

### General Energy Equation for a Control Volume
Applying RTT to total energy $E$:
$$ \dot{Q}_{net,in} + \dot{W}_{shaft,net,in} + \dot{W}_{pressure,net,in} = \frac{d}{dt} \int_{CV} e \rho \, dV + \int_{CS} e \rho (\vec{V}_r \cdot \vec{n}) dA \quad (5–58) $$
This relates the net rate of energy transfer into a CV by heat and work to the time rate of change of energy within the CV plus the net flux of energy out of the CV by mass flow.

---

---

## SUMMARY (Chapter 5: Continued)

**Energy Equation in terms of heads:**
$$ \frac{P_1}{\rho g} + \alpha_1 \frac{V_1^2}{2g} + z_1 + h_{pump,u} = \frac{P_2}{\rho g} + \alpha_2 \frac{V_2^2}{2g} + z_2 + h_{turbine,e} + h_L \quad (5–74) $$
- **$h_{pump,u}$:** Useful head delivered by the pump.
- **$h_{turbine,e}$:** Extracted head removed by the turbine.
- **$h_L$:** Irreversible head loss (friction, etc.).

**Mechanical energy loss:**
$$ e_{mech,loss} = u_2 - u_1 - q_{net,in} = c_v (T_2 - T_1) - q_{net,in} \quad (5–69) $$
In adiabatic flow ($q=0$), $e_{mech,loss}$ causes a rise in fluid temperature.

---

## PROBLEMS (Chapter 5)

**5–7** Air enters a nozzle steadily at $2.21 \text{ kg/m}^3$ and $30 \text{ m/s}$ and leaves at $0.762 \text{ kg/m}^3$ and $180 \text{ m/s}$. Inlet area $80 \text{ cm}^2$.
**Analysis:** (a) $\dot{m} = \rho_1 V_1 A_1 = (2.21)(30)(0.008) = 0.530 \text{ kg/s}$.
(b) $A_2 = \dot{m} / (\rho_2 V_2) = 0.530 / (0.762 \times 180) = 38.7 \text{ cm}^2$.

**5–10** A $1\text{-m}^3$ rigid tank initially with air at $1.18 \text{ kg/m}^3$. Air enters until density is $7.20 \text{ kg/m}^3$. Determine mass that entered. Answer: $6.02 \text{ kg}$.

**5–13** Smoking lounge (15 people). Fresh air requirement: $30 \text{ L/s}$ per person. Determine flow rate and duct diameter for $V \leq 8 \text{ m/s}$.

**5–19** River flow at $3 \text{ m/s}$, $\dot{V} = 500 \text{ m}^3\text{/s}$, $h = 90 \text{ m}$. Determine total mechanical energy and power generation potential. Answer: $444 \text{ MW}$.

**5–24** Water pumped from lake to tank $20 \text{ m}$ above at $70 \text{ L/s}$, power $20.4 \text{ kW}$. Determine overall efficiency and pressure difference across pump.

**5–40** Pitot-static probe for aircraft at $3000 \text{ m}$. $\Delta P = 3 \text{ kPa}$. Determine velocity.

**5–45** Pressurized tank ($300 \text{ kPa}$ absolute), $h = 3 \text{ m}$, $P_{atm} = 100 \text{ kPa}$, $D_{orifice} = 10 \text{ cm}$. Determine initial discharge rate. Answer: $0.168 \text{ m}^3\text{/s}$.

**5–56E** Show that for a Venturi meter:
$$ \dot{V} = A_2 \sqrt{\frac{2(P_1 - P_2)}{\rho(1 - A_2^2/A_1^2)}} $$

**5–59** Water tank at $20 \text{ m}$ height, $P_{air} = 2 \text{ atm}$ gage above water. Determine max height of jet. Answer: $40.7 \text{ m}$.

**5–69** Submerged pump (70% efficiency, $3 \text{ kW}$) raises water $30 \text{ m}$. Determine max flow rate.

**5–80** Reversible hydroelectric system (night pumping, day generating). $\Delta z = 40 \text{ m}$, $h_L = 4 \text{ m}$, $\dot{V} = 2 \text{ m}^3\text{/s}$, $\eta = 75\%$. Calculate annual revenue for $\$0.03/\text{kWh}$ (night) and $\$0.08/\text{kWh}$ (day).

**5–81** Water at $20 \text{ L/s}$ through 3-cm pipe, $\Delta P_{valve} = 2 \text{ kPa}$. Determine $h_L$ and power needed to overcome it. Answer: $0.204 \text{ m}, 40 \text{ W}$.

**5–88** Fireboat drawing seawater ($\rho=1030 \text{ kg/m}^3$), $D_{pipe}=20 \text{ cm}, \dot{V}=0.1 \text{ m}^3\text{/s}, D_{exit}=5 \text{ cm}$. $h_L=3 \text{ m}, z=4 \text{ m}$. Determine shaft power ($\eta=70\%$) and discharge velocity. Answer: $200 \text{ kW}, 50.9 \text{ m/s}$.

---

---

## SUMMARY (Chapter 5: Final)

- **Mass flow rate:** $\dot{m} = \rho V_{avg} A_c$.
- **Continuity Equation:** $\dot{m}_{in} - \dot{m}_{out} = dm_{CV}/dt$.
- **Bernoulli Equation:** $\frac{P}{\rho} + \frac{V^2}{2} + gz = \text{constant}$.
- **Stagnation Pressure:** $P_{stag} = P + \rho \frac{V^2}{2}$.
- **Head Form of Energy Equation:**
  $$ \frac{P_1}{\rho g} + \alpha_1 \frac{V_1^2}{2g} + z_1 + h_{pump,u} = \frac{P_2}{\rho g} + \alpha_2 \frac{V_2^2}{2g} + z_2 + h_{turbine,e} + h_L $$
- **Efficiencies:** $\eta_{pump} = \frac{\dot{W}_{pump,u}}{\dot{W}_{shaft,in}}$, $\eta_{turbine} = \frac{\dot{W}_{shaft,out}}{\dot{W}_{turbine,e}}$.

---

## PROBLEMS (Chapter 5: Advanced)

**5–119** Water rise in a glass tube attached to a pipe. $P_{pipe} = 115 \text{ kPa}, P_{atm} = 92 \text{ kPa}$. Determine height $h$.
**5–121** Inclined manometer at $35^\circ$ for air pressure in a duct. $\Delta h = 8 \text{ cm}$ (vertical).
**5–123** IV infusion: (a) Balance at $1.2 \text{ m}$ height. (b) Determine height for $20 \text{ kPa}$ gage pressure. $\rho = 1020 \text{ kg/m}^3$.
**5–128** U-tube diameter ratio (left arm $2D$, right arm $D=2 \text{ cm}$). Determine max oil ($SG=2.72$) volume to shift mercury. Answer: $0.256 \text{ L}$.
**5–131** Troposphere pressure variation: $T = T_0 - \beta z$ and $g(z) = g_0 / (1 + z/R)^2$. Obtain relation for $P(z)$.
**5–144** Rotating U-tube ($30 \text{ rpm}$) with axis $15 \text{ cm}$ from right arm and $5 \text{ cm}$ from left. Determine density of unknown liquid.
**5–145** Rotating and accelerating cylinder ($90 \text{ rpm}, a_z = 5 \text{ m/s}^2$). Determine pressure differences.
**5–151** Inverted container ($W=79 \text{ N}, D=30 \text{ cm}$). Determine manometer height $h$ and force $F$.

---
