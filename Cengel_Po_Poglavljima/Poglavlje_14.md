# CHAPTER 14: TURBOMACHINERY

In this chapter, we discuss the basic principles of turbomachinery, classified into pumps and turbines. We emphasize preliminary design, overall performance, matching requirements to system characteristics, and scaling laws.

## 14–1 ■ CLASSIFICATIONS AND TERMINOLOGY
- **Pump:** A general term for any fluid machine that **adds energy** to a fluid (energy absorbing device).
- **Turbine:** A machine that **extracts energy** from a fluid and transfers it to mechanical energy output (energy producing device).

The purpose of a pump is to increase fluid pressure, not necessarily fluid speed. Conversely, a turbine decreases fluid pressure.

**Gas-moving machines:**
- **Fan:** Low pressure rise, high flow rate.
- **Blower:** Moderate pressure rise and flow rate.
- **Compressor:** High pressure rise, low to moderate flow rate.

**Classification by energy transfer:**
- **Positive-displacement machines:** Energy transfer via movement of the boundary of a closed volume (e.g., human heart, water meter).
- **Dynamic machines:** Rotating blades (impellers for pumps, runners/buckets for turbines) supply or extract energy without a closed volume (e.g., wind turbine, centrifugal pump).

---

## 14–2 ■ PUMPS

### Pump Performance Parameters
- **Capacity (Volume flow rate):** $\dot{V} = \frac{\dot{m}}{\rho} \quad (14–1)$
- **Net Head ($H$):** Defined as the change in Bernoulli head between the inlet and outlet.
  $$ H = \left( \frac{P}{\rho g} + \frac{V^2}{2g} + z \right)_{\text{out}} - \left( \frac{P}{\rho g} + \frac{V^2}{2g} + z \right)_{\text{in}} \quad (14–2) $$
- **Water Horsepower ($\dot{W}_{\text{water horsepower}}$):** Useful power delivered to the fluid.
  $$ \dot{W}_{\text{water horsepower}} = \dot{m}gH = \rho g \dot{V} H \quad (14–3) $$
- **Brake Horsepower (bhp):** External power supplied to the pump shaft.
  $$ \text{bhp} = \dot{W}_{\text{shaft}} = \omega T_{\text{shaft}} \quad (14–4) $$
- **Pump Efficiency ($\eta_{\text{pump}}$):**
  $$ \eta_{\text{pump}} = \frac{\dot{W}_{\text{water horsepower}}}{\dot{W}_{\text{shaft}}} = \frac{\rho g \dot{V} H}{\omega T_{\text{shaft}}} \quad (14–5) $$

### Pump Performance Curves
- **Free Delivery:** Maximum flow rate when $H = 0$.
- **Shutoff Head:** Net head when $\dot{V} = 0$.
- **Best Efficiency Point (BEP):** The operating point where efficiency is at its maximum.

### Matching a Pump to a Piping System
The operating point is where the **system curve** (required head) intersects the **pump performance curve** (available head):
$$ H_{\text{required}} = H_{\text{available}} \quad (14–7) $$
The required net head is determined from the energy equation:
$$ H_{\text{required}} = \frac{P_2 - P_1}{\rho g} + \frac{\alpha_2 V_2^2 - \alpha_1 V_1^2}{2g} + (z_2 - z_1) + h_{L, \text{total}} \quad (14–6) $$

### EXAMPLE 14–1: Operating Point of a Fan in a Ventilation System
A fan is used in a ventilation system with a duct diameter $D = 0.230 \text{ m}$ and length $L = 13.4 \text{ m}$. Minimum required flow rate is $0.283 \text{ m}^3\text{/s}$ (600 cfm).
**Analysis:**
Applying Eq. (14-6) with $P_1 = P_2 = P_{\text{atm}}$ and $V_1 \approx 0$:
$$ H_{\text{required}} = \frac{\alpha_2 V_2^2}{2g} + h_{L, \text{total}} $$
For the given conditions, $H_{\text{required}}$ is calculated to be $15.2 \text{ m}$ of air, which is $0.709 \text{ inches of water}$.
Comparing with fan data, the operating point is $\approx 650 \text{ cfm}$ at $0.83 \text{ in H}_2\text{O}$, which is adequate.

---

### Pump Cavitation and Net Positive Suction Head (NPSH)
**Cavitation** occurs when the local pressure inside the pump falls below the vapor pressure $P_v$ of the liquid, causing vapor bubbles to form and subsequently collapse, damaging the impeller.

**Net Positive Suction Head (NPSH):**
$$ \text{NPSH} = \left( \frac{P}{\rho g} + \frac{V^2}{2g} \right)_{\text{pump inlet}} - \frac{P_v}{\rho g} \quad (14–8) $$

- **$\text{NPSH}_{\text{required}}$:** Minimum NPSH specified by the manufacturer to avoid cavitation.
- **$\text{NPSH}_{\text{available}}$:** Actual NPSH at the pump inlet based on the system design.
To avoid cavitation: $\text{NPSH}_{\text{available}} > \text{NPSH}_{\text{required}}$.

### EXAMPLE 14–3: Maximum Flow Rate to Avoid Pump Cavitation
Water ($T = 25^\circ\text{C}$) is pumped from a reservoir to a pump inlet.
**Available NPSH:**
$$ \text{NPSH} = \frac{P_{\text{atm}} - P_v}{\rho g} + (z_1 - z_2) - h_{L, \text{total}} - \frac{(\alpha_2 - 1) V_2^2}{2g} $$
As flow rate increases, $h_{L, \text{total}}$ increases and available NPSH decreases. The maximum flow rate is found where available NPSH equals required NPSH.

---

### Pumps in Series and Parallel
- **Series:** Used to increase **net head**. The volume flow rate is the same through each pump.
  $$ H_{\text{combined}} = \sum_{i=1}^{n} H_i \quad (14–9) $$
- **Parallel:** Used to increase **volume flow rate**. The net head is the same across each branch.
  $$ \dot{V}_{\text{combined}} = \sum_{i=1}^{n} \dot{V}_i \quad (14–10) $$

---

### Positive-Displacement Pumps
Energy transfer via expanding and contracting volumes.
- **Examples:** Peristaltic, rotary lobe, gear, screw pumps.
- **Advantages:** Handles high-viscosity fluids, shear-sensitive liquids (e.g., blood), self-priming.
- **Disadvantages:** Pulsating flow, risk of overpressure if outlet is blocked.

**Volume Flow Rate:**
$$ \dot{V} = \dot{n} \frac{V_{\text{closed}}}{n} \quad (14–11) $$
where $\dot{n}$ is the rotation rate, $V_{\text{closed}}$ is the volume per cycle, and $n$ is the number of rotations per cycle.

---

### Dynamic Pumps
Energy transfer via rotating blades (impellers).
1. **Centrifugal (Radial) Flow:** Fluid enters axially and exits radially.
2. **Axial Flow:** Fluid enters and exits axially.
3. **Mixed Flow:** Intermediate between centrifugal and axial.

---

### Centrifugal Pumps
Fluid enters axially through the **eye**, acquires tangential and radial velocity from the rotating blades (**impeller**), and is flung into the snail-shaped **scroll** (volute) which converts kinetic energy into pressure.

**Blade Types:**
1. **Backward-inclined:** Most common, highest efficiency.
2. **Radial (Straight):** Simplest geometry, highest pressure rise.
3. **Forward-inclined:** Nearly constant pressure rise, lower efficiency.

#### Velocity Analysis
- **Volume Flow Rate:**
  $$ \dot{V} = 2\pi r_1 b_1 V_{1,n} = 2\pi r_2 b_2 V_{2,n} \quad (14–12) $$
- **Normal Velocity Ratio:**
  $$ V_{2,n} = V_{1,n} \frac{r_1 b_1}{r_2 b_2} \quad (14–13) $$

#### Euler Turbomachine Equation
Relates torque and net head to the change in angular momentum:
- **Shaft Torque:**
  $$ T_{\text{shaft}} = \rho \dot{V} (r_2 V_{2,t} - r_1 V_{1,t}) \quad (14–14) $$
- **Net Head (Ideal):**
  $$ H = \frac{\omega r_2 V_{2,t} - \omega r_1 V_{1,t}}{g} \quad (14–17) $$
  where $V_t$ is the tangential component of absolute velocity.

#### Bernoulli Equation in a Rotating Frame
For idealized flow (no losses) through an impeller:
$$ \frac{P}{\rho g} + \frac{V_{\text{rel}}^2}{2g} - \frac{\omega^2 r^2}{2g} + z = \text{constant} \quad (14–22) $$
The term $-\frac{\omega^2 r^2}{2g}$ accounts for the rotating reference frame.

---

### EXAMPLE 14–5: Idealized Blower Performance
A centrifugal blower rotates at $1750 \text{ rpm}$ ($\omega = 183.3 \text{ rad/s}$). Air flow rate is $0.13 \text{ m}^3\text{/s}$.
**Analysis:**
Using Eq. (14-12), $V_{1,n} = 9.947 \text{ m/s}$ and $V_{2,n} = 11.24 \text{ m/s}$.
For purely radial entry ($V_{1,t} = 0$) and exit angle $\alpha_2 = 40^\circ$:
$V_{2,t} = V_{2,n} \tan \alpha_2 = 9.435 \text{ m/s}$.
Ideal net head $H = 14.1 \text{ m of air} \approx 17.0 \text{ mm of water}$.
Brake horsepower $\text{bhp} = \rho g \dot{V} H = 21.6 \text{ W}$.

---

### Preliminary Design of an Impeller
For a first-order design, setting $V_{1,t} = 0$ (radial entry) yields:
$$ \dot{V} = 2\pi b_1 \omega r_1^2 \tan \beta_1 \quad (14–25) $$
where $\beta_1$ is the leading edge blade angle.

### Loss Mechanisms
Actual performance is lower than predicted due to:
- **Circulatory flow loss:** Non-uniform velocity between blades.
- **Passage losses:** Friction and flow blockage from finite blade thickness.

---

### Axial Pumps
Impeller blades behave like airplane wings, producing lift.
- **Mechanism:** Lift force creates a pressure jump across the rotor plane.
- **Examples:** Helicopter rotors, propellers, window fans, computer cooling fans.
- **Blade Twist:** Angle of attack (pitch angle $\theta$) varies with radius to account for increasing tangential speed $\omega r$ toward the tip.

---

#### Axial-Flow Fans
- **Blade Twist:** The pitch angle $\theta$ is higher at the root than at the tip because the tangential speed $u_\theta = \omega r$ increases with radius.
- **Relative Velocity:**
  $$ \vec{V}_{\text{rel}} = \vec{V}_{\text{wind}} - \vec{V}_{\text{blade}} \quad (14–27) $$
- **Propeller Design:** Propellers are often narrower at the root and wider toward the tip to take advantage of larger lift. Tips are rounded to reduce induced drag.

### EXAMPLE 14–7: Calculation of Twist in an Airplane Propeller
Calculate the pitch angle $\theta$ from root ($r = 2.75 \text{ cm}$) to tip ($r = 17.0 \text{ cm}$) for a propeller rotating at $1700 \text{ rpm}$ in a $13.4 \text{ m/s}$ wind, such that the angle of attack $\alpha = 14^\circ$.
**Analysis:**
$$ \theta = \alpha + \phi, \quad \text{where } \phi = \arctan\left( \frac{V_{\text{wind}}}{\omega r} \right) $$
- At root: $\theta = 14^\circ + \arctan\left( \frac{13.4}{178.0 \times 0.0275} \right) = 83.9^\circ$.
- At tip: $\theta = 14^\circ + \arctan\left( \frac{13.4}{178.0 \times 0.17} \right) = 37.9^\circ$.

---

### Axial Fan Configurations
1. **Tube-axial Fan:** Single impeller in a duct; produces swirling flow.
2. **Counter-rotating Fan:** Two rotors rotating in opposite directions to cancel swirl.
3. **Vane-axial Fan:** Rotor followed (or preceded) by stationary **stator blades** (vanes) to redirect flow and recover kinetic energy.
   - *Design Note:* Choose number of stator and rotor blades to have no common denominator to avoid pulsating noise and vibration.

---

### 14–3 ■ PUMP SCALING LAWS
Dimensional analysis yields dimensionless parameters used to scale geometrically similar pumps.

**Dimensionless Pump Parameters:**
1. **Head Coefficient ($C_H$):**
   $$ C_H = \frac{gH}{\omega^2 D^2} \quad (14–30) $$
2. **Capacity Coefficient ($C_Q$):**
   $$ C_Q = \frac{\dot{V}}{\omega D^3} \quad (14–30) $$
3. **Power Coefficient ($C_P$):**
   $$ C_P = \frac{\text{bhp}}{\rho \omega^3 D^5} \quad (14–30) $$
4. **Suction Head Coefficient ($C_{\text{NPSH}}$):**
   $$ C_{\text{NPSH}} = \frac{g \text{NPSH}_{\text{required}}}{\omega^2 D^2} \quad (14–31) $$

**Dynamic Similarity:**
Two pumps are dynamically similar if their independent Pi groups ($C_Q$, $Re$, $\epsilon/D$) are equal. In such cases, their dependent Pi groups ($C_H, C_P$) are also equal, and the operating points are called **homologous**.
- **Reynolds Number Independence:** For $Re > 10^4$, performance becomes nearly independent of $Re$.
- Simplified scaling: $C_H = f(C_Q)$ and $C_P = f(C_Q)$.

---

### Pump Efficiency and Similarity
Nondimensional pump performance curves (Fig. 14–69) collapse the data of a pump family onto a single plot.
**Pump Efficiency:**
$$ \eta_{\text{pump}} = \frac{\rho \dot{V} gH}{\text{bhp}} = \frac{C_Q C_H}{C_P} = f(C_Q) \quad (14–33) $$

**Moody Efficiency Correction:**
Accounts for improved efficiency in larger prototype pumps compared to models:
$$ \eta_{\text{pump, proto}} \cong 1 - (1 - \eta_{\text{pump, model}}) \left( \frac{D_{\text{model}}}{D_{\text{proto}}} \right)^{1/5} \quad (14–34) $$

---

### Pump Specific Speed ($N_{Sp}$)
A parameter used to characterize a pump's operation at its BEP, aiding in preliminary pump selection.
$$ N_{Sp} = \frac{C_Q^{1/2}}{C_H^{3/4}} = \frac{\omega \dot{V}^{1/2}}{(gH)^{3/4}} \quad (14–35) $$
- **Centrifugal pumps:** Best for $N_{Sp} < 1.5$.
- **Mixed-flow pumps:** Best for $1.5 < N_{Sp} < 3.5$.
- **Axial pumps:** Best for $N_{Sp} > 3.5$.

---

### Affinity Laws
Relate two geometrically and dynamically similar pumps (or two homologous states of the same pump):
1. **Flow Rate:** $\frac{\dot{V}_B}{\dot{V}_A} = \left( \frac{\omega_B}{\omega_A} \right) \left( \frac{D_B}{D_A} \right)^3 \quad (14–38a)$
2. **Net Head:** $\frac{H_B}{H_A} = \left( \frac{\omega_B}{\omega_A} \right)^2 \left( \frac{D_B}{D_A} \right)^2 \quad (14–38b)$
3. **Power:** $\frac{\text{bhp}_B}{\text{bhp}_A} = \left( \frac{\rho_B}{\rho_A} \right) \left( \frac{\omega_B}{\omega_A} \right)^3 \left( \frac{D_B}{D_A} \right)^5 \quad (14–38c)$

**Speed Scaling Jingle:** "Very Hard Problems are as easy as 1, 2, 3" (representing the exponents on $\omega$ for $\dot{V}$, $H$, and $\text{bhp}$, respectively).

---

### 14–4 ■ TURBINES
Turbines extract energy from a fluid and convert it into mechanical work.
- **Components:** The rotating part is called the **runner**.
- **Classification:**
  - **Positive-displacement turbines:** Used for flow measurement (e.g., nutating disc water meter).
  - **Dynamic turbines:** Used for flow measurement (anemometers) and power production.
    - **Impulse turbines:** High head, low flow rate. Fluid is sent through a nozzle as a high-speed jet (e.g., **Pelton wheel**).
    - **Reaction turbines:** Low head, high flow rate.

**Euler Turbomachine Equation for a Turbine:**
$$ \dot{W}_{\text{shaft}} = \omega T_{\text{shaft}} = \rho \omega \dot{V} (r_2 V_{2,t} - r_1 V_{1,t}) \quad (14–39) $$
Note: In turbines, point 2 is typically the inlet and point 1 is the outlet.

---

### Impulse Turbines (Pelton Wheel)
The fluid jet hits the buckets and is turned through an angle $\beta$.

**Output Shaft Power:**
$$ \dot{W}_{\text{shaft}} = \rho r \omega \dot{V} (V_j - r\omega)(1 - \cos \beta) \quad (14–40) $$
- **Maximum Power:** Theoretically occurs when the bucket speed is half the jet speed ($r\omega = V_j / 2$).
- **Efficiency Factor:** $\eta_\beta = \frac{1 - \cos \beta}{1 - \cos(180^\circ)} \quad (14–41)$. In practice, $\beta \approx 160^\circ - 165^\circ$ is used to avoid interference with the next bucket.

---

### Reaction Turbines
Unlike impulse turbines, reaction turbines are completely filled with water.
- **Francis Turbine:** Radial or mixed flow. Most common for medium heads. High efficiency (90–95%).
- **Kaplan Turbine:** Axial flow with adjustable blades (**double regulated**). Suited for low heads and high flow rates.
- **Components:**
  - **Stay Vanes:** Fixed guide vanes in the volute.
  - **Wicket Gates:** Adjustable vanes to control flow rate.
  - **Draft Tube:** An expanding diffuser at the runner outlet to recover pressure and increase net head.

**Turbine Efficiency:**
$$ \eta_{\text{turbine}} = \frac{\dot{W}_{\text{shaft}}}{\dot{W}_{\text{water horsepower}}} = \frac{\text{bhp}}{\rho g H \dot{V}} \quad (14–44) $$

#### Velocity Analysis
In turbines, fluid enters at the outer radius $r_2$ and leaves at the inner radius $r_1$:
- **Runner Leading Edge (Inlet):**
  $$ V_{2,t} = \omega r_2 - \frac{V_{2,n}}{\tan \beta_2} \quad (14–45) $$
- **Runner Trailing Edge (Outlet):**
  $$ V_{1,t} = \omega r_1 - \frac{V_{1,n}}{\tan \beta_1} \quad (14–46) $$

**Reverse Swirl:** Occurs when $V_{1,t} < 0$ (flow swirls opposite to runner rotation). A small amount of reverse swirl is often designed to optimize efficiency.

### EXAMPLE 14–12: Hydroturbine Design
Design a retrofit Francis radial-flow hydroturbine for $599 \text{ m}^3\text{/s}$ flow rate and $120 \text{ rpm}$.
**Analysis (a) - Swirl at outlet ($\alpha_1 = 10^\circ$):**
- Inlet: $V_{2,n} = 41.7 \text{ m/s}$, $V_{2,t} = 27.1 \text{ m/s} \rightarrow \beta_2 = 84.1^\circ$.
- Outlet: $V_{1,n} = 20.6 \text{ m/s}$, $V_{1,t} = 3.63 \text{ m/s} \rightarrow \beta_1 = 47.9^\circ$.
- Power Output: $\dot{W}_{\text{shaft}} = 461 \text{ MW}$.
- Required Net Head: $H = 78.6 \text{ m}$.

---

### 14–5 ■ TURBINE SCALING LAWS
Similar to pumps, dimensional analysis for turbines yields dimensionless parameters, but uses **brake horsepower (bhp)** as the independent variable instead of flow rate.

**Dimensionless Turbine Parameters:**
1. **Head Coefficient ($C_H$):** $C_H = \frac{gH}{\omega^2 D^2}$
2. **Capacity Coefficient ($C_Q$):** $C_Q = \frac{\dot{V}}{\omega D^3}$
3. **Power Coefficient ($C_P$):** $C_P = \frac{\text{bhp}}{\rho \omega^3 D^5} \quad (14–47)$
4. **Turbine Efficiency:** $\eta_{\text{turbine}} = \frac{C_P}{C_Q C_H} = f(C_P) \quad (14–48)$

**Moody Efficiency Correction for Turbines:**
$$ \eta_{\text{turbine, proto}} \cong 1 - (1 - \eta_{\text{turbine, model}}) \left( \frac{D_{\text{model}}}{D_{\text{proto}}} \right)^{1/5} \quad (14–49) $$
In practice, only about two-thirds of the efficiency increase predicted by this equation is typically realized.

---

### Turbine Specific Speed ($N_{St}$)
Used to characterize the operation of a turbine at its BEP.
$$ N_{St} = \frac{C_P^{1/2}}{C_H^{5/4}} = \frac{\omega \sqrt{\text{bhp}}}{\rho^{1/2} (gH)^{5/4}} \quad (14–50) $$
- **Impulse turbines:** Best for $N_{St} < 0.3$.
- **Francis turbines:** Best for $0.3 < N_{St} < 2$.
- **Kaplan turbines:** Best for $N_{St} > 2$.

**Relationship to Pump Specific Speed:**
$$ N_{St} = N_{Sp} \sqrt{\eta_{\text{turbine}}} \quad (14–51) $$
(Applies only when the same machine is used as both pump and turbine at same flow rate and rpm).

---

### Pump-Turbines
Machines designed to operate as both pumps (during low power demand) and turbines (during high power demand) for energy storage. Overall efficiency is typically around 80%.

---

### SUMMARY OF CHAPTER 14
- **Pumps** add energy; **Turbines** extract energy.
- **Euler Equation:** Fundamental for preliminary design of both.
- **Centrifugal pumps:** Fluid exits radially; **Axial pumps:** Fluid exits axially (lift-based).
- **Affinity Laws:** Allow scaling of geometrically and dynamically similar machines.
- **Specific Speed ($N_{Sp}, N_{St}$):** Aids in selecting the appropriate type of machine for a given application.

---

### CHAPTER 14: PROBLEMS (Selected)
- **14–1C** Terms for energy-producing (turbine) and energy-absorbing (pump) machines.
- **14–2C** Differences between fans, blowers, and compressors.
- **14–7C** Why is there an "extra" term in the Bernoulli equation in a rotating frame? (Due to rotational/centrifugal effects).
- **14–10C** Three main categories of dynamic pumps (Centrifugal, Axial, Mixed).
- **14–13C** Definition of NPSH and $\text{NPSH}_{\text{required}}$ and their role in avoiding cavitation.

---

### CHAPTER 14: PROBLEMS (Continued)

#### Pumps and Systems
- **14–15C** Why is it unwise to arrange dissimilar pumps in series or parallel? (Potential for one pump to operate beyond free delivery or experience reverse flow).
- **14–17C** Ways to decrease the likelihood of cavitation:
  1. Increase inlet pressure (e.g., raise reservoir level).
  2. Decrease fluid temperature (lower $P_v$).
  3. Decrease flow rate (lower $h_L$).
  4. Increase pipe diameter on the suction side (lower $h_L$ and $V$).
  5. Reduce minor losses on the suction side (e.g., use fewer elbows).
- **14–18C** Identical pumps:
  - **Series:** $H_{\text{total}} = H_1 + H_2$; $\dot{V}_{\text{total}} = \dot{V}_1 = \dot{V}_2$.
  - **Parallel:** $\dot{V}_{\text{total}} = \dot{V}_1 + \dot{V}_2$; $H_{\text{total}} = H_1 = H_2$.
- **14–26** Estimate operating volume flow rate $\dot{V}$ in Lpm using $H_{\text{available}} = H_0 - a\dot{V}^2$.
- **14–36** Calculate the operating point ($4.99 \text{ Lpm}, 4.17 \text{ m}$) for a system where $H_{\text{required}} = (z_2 - z_1) + b\dot{V}^2$.

#### Scaling and Specific Speed
- **14–84C** Doubling RPM ($\omega$):
  - Capacity $\dot{V}$ increases by $\approx 2$.
  - Net head $H$ increases by $\approx 4$.
  - Shaft power bhp increases by $\approx 8$.
- **14–87** Calculate $N_{Sp}$ at BEP ($14.0 \text{ Lpm}$). *Answers: 0.199 (dimensionless), 545 (U.S.), Centrifugal pump*.
- **14–91** Design a small pump for an aquarium ($18.0 \text{ Lpm}, 1.6 \text{ m}, 1200 \text{ rpm}$). *Answers: Centrifugal, 75% efficiency*.

#### Turbines
- **14–69C** Why turbines are more efficient than pumps:
  1. Favorable pressure gradients (less boundary layer separation).
  2. Usually larger in size (viscous losses less significant).
  3. Operated over a narrower range of conditions.
- **14–71C** **Draft Tube:** An expanding area diffuser at the turbine exit. It recovers kinetic energy and creates a sub-atmospheric pressure at the runner outlet, increasing net head.
- **14–75** Pelton wheel hydroelectric power ($R = 1.83 \text{ m}, V_j = 102 \text{ m/s}, \beta = 165^\circ$).
  - (a) $\dot{V} = 0.801 \text{ m}^3\text{/s}$.
  - (b) Optimum $\omega = 266 \text{ rpm}$ (at $r\omega = V_j / 2$).
  - (c) $\dot{W}_{\text{shaft}} = 3.35 \text{ MW}$ (at 82% efficiency).
- **14–78** Francis hydroturbine design ($340 \text{ m}^3\text{/s}, 180 \text{ rpm}, H_{\text{gross}} = 90.0 \text{ m}$).
- **14–108** Scale up an existing turbine ($150 \text{ rpm}, 162 \text{ m}^3\text{/s}, 90 \text{ m}$ to $120 \text{ rpm}, 110 \text{ m}$). *Answers: $D_B = 2.07 \text{ m}, \dot{V}_B = 342 \text{ m}^3\text{/s}, \text{bhp}_B = 341 \text{ MW}$.*
- **14–114C** **Pump-turbine:** A reversible machine used in pumped storage plants to store energy by pumping water uphill and generate electricity by acting as a turbine when needed.

---
