# CHAPTER 12: COMPRESSIBLE FLOW

Compressible flow involves significant changes in density, typical of high-speed gas flows. This field combines fluid dynamics and thermodynamics.

## 12–1 ■ STAGNATION PROPERTIES

When a fluid is brought to a complete stop adiatabatically, its kinetic energy is converted into enthalpy, resulting in an increase in temperature and pressure.

**Stagnation (Total) Enthalpy ($h_0$):**
$$ h_0 = h + \frac{V^2}{2} \quad \text{(kJ/kg)} \quad (12–1) $$
In the absence of heat/work interactions and potential energy changes, $h_0$ remains constant: $h_{01} = h_{02}$.

### Ideal Gas Relations
For an ideal gas with constant specific heats:
**Stagnation Temperature ($T_0$):**
$$ T_0 = T + \frac{V^2}{2c_p} \quad (12–4) $$
The term $V^2/2c_p$ is called the **dynamic temperature**.

**Isentropic Stagnation Pressure ($P_0$):**
$$ \frac{P_0}{P} = \left( \frac{T_0}{T} \right)^{k/(k-1)} \quad (12–5) $$

**Isentropic Stagnation Density ($\rho_0$):**
$$ \frac{\rho_0}{\rho} = \left( \frac{T_0}{T} \right)^{1/(k-1)} \quad (12–6) $$
*Note: Actual stagnation pressure is lower than isentropic due to friction (Fig. 12–4).*

---

**EXAMPLE 12–1: Compression of High-Speed Air in an Aircraft**
Aircraft flying at $V = 250 \text{ m/s}$ at altitude $5000 \text{ m}$ ($P = 54.05 \text{ kPa}, T = 255.7 \text{ K}$). 
**Analysis:**
1. Stagnation temperature at compressor inlet:
   $$ T_{01} = T_1 + \frac{V_1^2}{2c_p} = 255.7 + \frac{250^2}{2(1005)} = 286.8 \text{ K} $$
2. Stagnation pressure at inlet (isentropic):
   $$ P_{01} = P_1 \left( \frac{T_{01}}{T_1} \right)^{k/(k-1)} = 54.05 \left( \frac{286.8}{255.7} \right)^{1.4/0.4} = 80.77 \text{ kPa} $$
3. If compressor pressure ratio is 8, $P_{02} = 8 \times P_{01} = 646.2 \text{ kPa}$.
4. Stagnation temperature at exit ($T_{02}$):
   $$ T_{02} = T_{01} (P_{02}/P_{01})^{(k-1)/k} = 286.8 (8)^{0.4/1.4} = 519.5 \text{ K} $$
*The temperature rises by $31.1^\circ\text{C}$ just due to deceleration in the diffuser.*

---

## 12–2 ■ SPEED OF SOUND AND MACH NUMBER

**Speed of Sound ($c$):** The speed at which an infinitesimally small pressure wave travels through a medium.
$$ c^2 = \left( \frac{\partial P}{\partial \rho} \right)_s \quad (12–9) $$
For an **ideal gas**:
$$ c = \sqrt{kRT} \quad (12–11) $$
*Note: $c$ depends only on temperature for a specified ideal gas (Fig. 12–9).*

**Mach Number ($Ma$):**
$$ Ma = \frac{V}{c} \quad (12–12) $$
- **Subsonic:** $Ma < 1$.
- **Sonic:** $Ma = 1$.
- **Supersonic:** $Ma > 1$.
- **Hypersonic:** $Ma \gg 1$.

---

**EXAMPLE 12–2: Mach Number of Air Entering a Diffuser**
Air at $30^\circ\text{C}$ ($303 \text{ K}$), $V = 200 \text{ m/s}$. $R = 0.287 \text{ kJ/kg·K}, k = 1.4$.
**Analysis:**
1. Speed of sound: $c = \sqrt{(1.4)(287)(303)} = 349 \text{ m/s}$.
2. Mach number: $Ma = 200 / 349 = 0.573$ (Subsonic).

---

## 12–3 ■ ONE-DIMENSIONAL ISENTROPIC FLOW

For isentropic flow in a duct with varying area $A$:
**Area-Velocity Relation:**
$$ \frac{dA}{A} = \frac{dV}{V} (Ma^2 - 1) \quad (12–17) $$
- For $Ma < 1$: $dA$ and $dV$ have opposite signs (converging nozzle accelerates).
- For $Ma > 1$: $dA$ and $dV$ have same signs (diverging nozzle accelerates).
- For $Ma = 1$: $dA = 0$ (occurs at the **throat**).

### Property Relations (Ideal Gas)
$$ \frac{T_0}{T} = 1 + \left( \frac{k-1}{2} \right) Ma^2 \quad (12–18) $$
$$ \frac{P_0}{P} = \left[ 1 + \left( \frac{k-1}{2} \right) Ma^2 \right]^{k/(k-1)} \quad (12–19) $$

### Critical Properties ($Ma = 1$)
| Ratio | Formula | For Air ($k=1.4$) |
| :--- | :--- | :--- |
| $T^*/T_0$ | $2 / (k+1)$ | 0.8333 |
| $P^*/P_0$ | $[2 / (k+1)]^{k/(k-1)}$ | 0.5283 |
| $\rho^*/\rho_0$ | $[2 / (k+1)]^{1/(k-1)}$ | 0.6340 |

---

**EXAMPLE 12–3 & 12–4: Gas Flow through a C-D Duct**
$CO_2$ ($k = 1.289, R = 0.1889 \text{ kJ/kg·K}$), $\dot{m} = 3 \text{ kg/s}$. Inlet $P_0 = 1400 \text{ kPa}, T_0 = 473 \text{ K}$.
**Critical Analysis:**
$$ T^*/T_0 = 2 / (1.289+1) = 0.873 \implies T^* = 413 \text{ K} $$
$$ P^*/P_0 = (0.873)^{1.289/0.289} = 0.5477 \implies P^* = 767 \text{ kPa} $$
*At $P = 1200 \text{ kPa}$: $T = 457 \text{ K}, V = 164.5 \text{ m/s}, Ma = 0.493, A = 13.1 \text{ cm}^2$.*
*At $P = 200 \text{ kPa}$ (Supersonic): $T = 306 \text{ K}, V = 530.9 \text{ m/s}, Ma = 1.946, A = 16.3 \text{ cm}^2$.*

---

## 12–4 ■ ISENTROPIC FLOW THROUGH NOZZLES (Continued)

### Converging Nozzles
As back pressure $P_b$ decreases, mass flow rate $\dot{m}$ increases until it reaches a maximum at the critical pressure $P^*$.
- **Choked Flow:** When $Ma = 1$ at the exit, $\dot{m}$ is maximum and remains constant regardless of further decreases in $P_b$.
- **Maximum Mass Flow Rate:**
  $$ \dot{m}_{max} = A^* P_0 \sqrt{\frac{k}{RT_0}} \left( \frac{2}{k+1} \right)^{(k+1)/[2(k-1)]} \quad (12–25) $$

### Converging-Diverging (C-D) Nozzles
Used to accelerate gases to supersonic speeds ($Ma > 1$). 
- The fluid accelerates in the converging section, reaches $Ma = 1$ at the **throat**, and continues to accelerate in the diverging section if the pressure ratio is appropriate (Fig. 12–27).
- **Laval Nozzles:** Another name for C-D nozzles, originally developed for steam turbines.

---

**EXAMPLE 12–7: Airflow through a C-D Nozzle**
Inlet: $P_0 = 1.0 \text{ MPa}, T_0 = 800 \text{ K}$. Throat area $A^* = 20 \text{ cm}^2$. Exit $Ma_e = 2$.
**Analysis:**
1. Stagnation density: $\rho_0 = P_0 / RT_0 = 4.355 \text{ kg/m}^3$.
2. Throat conditions ($Ma=1$):
   $P^* = 0.5283 P_0 = 0.5283 \text{ MPa}$.
   $T^* = 0.8333 T_0 = 666.6 \text{ K}$.
   $V^* = \sqrt{kRT^*} = 517.5 \text{ m/s}$.
3. Exit conditions ($Ma_e=2$):
   From Table A–13: $P_e/P_0 = 0.1278 \implies P_e = 0.1278 \text{ MPa}$.
   $T_e/T_0 = 0.5556 \implies T_e = 444.5 \text{ K}$.
   $A_e/A^* = 1.6875 \implies A_e = 33.75 \text{ cm}^2$.
   $V_e = Ma_e \sqrt{kRT_e} = 845.2 \text{ m/s}$.
4. Mass flow rate:
   $$ \dot{m} = \rho^* A^* V^* = (2.761 \text{ kg/m}^3)(20 \times 10^{-4} \text{ m}^2)(517.5 \text{ m/s}) = 2.86 \text{ kg/s} $$

---

## 12–5 ■ SHOCK WAVES AND EXPANSION WAVES

### Normal Shocks
Abrupt changes in fluid properties occur in a very thin region when flow changes from supersonic to subsonic (Fig. 12–29).
- **Conservation Equations (1=upstream, 2=downstream):**
  - **Mass:** $\rho_1 V_1 = \rho_2 V_2 \quad (12–29)$
  - **Energy:** $h_{01} = h_{02} \quad (12–31)$
  - **Momentum:** $A(P_1 - P_2) = \dot{m}(V_2 - V_1) \quad (12–32)$
  - **Entropy:** $s_2 - s_1 > 0 \quad$ (Irreversible process).

- **Fanno Line:** Locus of states with same $h_0$ and $\dot{m}/A$.
- **Rayleigh Line:** Locus of states with same momentum and mass flux.
*The intersection of these lines gives the states before and after the shock.*

---

### Property Relations across Normal Shocks
Across a normal shock, stagnation temperature $T_{01} = T_{02}$ remains constant for an ideal gas.
**Temperature Ratio:**
$$ \frac{T_2}{T_1} = \frac{1 + Ma_1^2(k-1)/2}{1 + Ma_2^2(k-1)/2} \quad (12–35) $$
**Pressure Ratio:**
$$ \frac{P_2}{P_1} = \frac{1 + k Ma_1^2}{1 + k Ma_2^2} \quad (12–38) $$
**Mach Number Relation:**
$$ Ma_2^2 = \frac{Ma_1^2 + 2/(k-1)}{2Ma_1^2 k/(k-1) - 1} \quad (12–39) $$

---

**EXAMPLE 12–9: Shock Wave in a Converging–Diverging Nozzle**
Air at exit of C-D nozzle from Ex 12–7: $Ma_1 = 2, P_1 = 0.1278 \text{ MPa}, T_1 = 444.5 \text{ K}$. Normal shock occurs at the exit.
**Analysis:**
Using Table A–14 for $Ma_1 = 2$:
$Ma_2 = 0.5774$, $P_2/P_1 = 4.5000$, $T_2/T_1 = 1.6875$.
**Results:**
- $P_2 = 4.5(0.1278) = 0.575 \text{ MPa}$ (Static pressure increases).
- $T_2 = 1.6875(444.5) = 750 \text{ K}$ (Temperature rises).
- $P_{02} = 0.7209 P_{01} = 0.721 \text{ MPa}$ (Stagnation pressure loss of 28%).
- Entropy change: $\Delta s = c_p \ln(T_2/T_1) - R \ln(P_2/P_1) = 0.0942 \text{ kJ/kg·K}$.

---

## Oblique Shocks
Occur when supersonic flow ($Ma_1 > 1$) hits a wedge or cone and is turned by deflection angle $\theta$.
**$\theta-\beta-Ma$ Relationship:**
$$ \tan \theta = \frac{2 \cot \beta (Ma_1^2 \sin^2 \beta - 1)}{Ma_1^2 (k + \cos 2\beta) + 2} \quad (12–46) $$
- **Weak vs. Strong Shocks:** Two values of shock angle $\beta$ exist for each $\theta < \theta_{max}$. Weak shocks are usually observed (Fig. 12–41).
- **Detached Shock (Bow Wave):** Forms if $\theta > \theta_{max}$ or if the body is blunt (Fig. 12–42).
- **Mach Angle ($\mu$):** The weakest possible oblique shock:
  $$ \mu = \sin^{-1}(1/Ma_1) \quad (12–47) $$

---

## Prandtl–Meyer Expansion Waves
Occur when supersonic flow is turned away from the incoming direction (expanding flow).
- **Isentropic process:** Unlike shocks, expansion waves do not increase entropy.
- **Expansion Fan:** Flow turns gradually through an infinite number of Mach waves.
- **Downstream:** $Ma_2 > Ma_1$, while $P, T, \rho$ decrease.

---

## 12–6 ■ DUCT FLOW WITH HEAT TRANSFER AND NEGLIGIBLE FRICTION (RAYLEIGH FLOW)

Rayleigh flow refers to steady 1-D flow of an ideal gas through a constant-area duct with heat transfer but negligible friction (e.g., combustion chambers).

### Conservation Equations
- **Continuity:** $\rho_1 V_1 = \rho_2 V_2 \quad (12–50)$
- **Momentum:** $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2 \quad (12–51)$
- **Energy:** $q = h_{02} - h_{01} = c_p(T_{02} - T_{01}) \quad (12–54)$
- **Entropy Change:** $s_2 - s_1 = c_p \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1} \quad (12–55)$

### Rayleigh Line on T-s Diagram (Fig. 12–52)
1. **Heat Addition ($q > 0$):** Entropy increases, moving the state to the right. $Ma$ approaches 1 (from either side).
2. **Heat Rejection ($q < 0$):** Entropy decreases, moving the state to the left.
3. **Maximum Entropy:** Occurs at $Ma = 1$ (Point $a$).
4. **Maximum Temperature:** Occurs at $Ma = 1/\sqrt{k}$ (Point $b$). For air ($k=1.4$), $Ma = 0.845$.

### TABLE 12–3: Effects of heating and cooling in Rayleigh flow
| Property | Heating Subsonic | Heating Supersonic |
| :--- | :--- | :--- |
| Velocity, $V$ | Increase | Decrease |
| Mach number, $Ma$ | Increase | Decrease |
| Stagnation Temp, $T_0$ | Increase | Increase |
| Static Pressure, $P$ | Decrease | Increase |
| Density, $\rho$ | Decrease | Increase |

---

### Property Relations for Rayleigh Flow (Relative to sonic state *)
$$ \frac{P}{P^*} = \frac{1+k}{1+k Ma^2} \quad (12–63) $$
$$ \frac{T}{T^*} = \left[ \frac{Ma(1+k)}{1+k Ma^2} \right]^2 \quad (12–63) $$
$$ \frac{T_0}{T_0^*} = \frac{(k+1)Ma^2 [2 + (k-1)Ma^2]}{(1+k Ma^2)^2} \quad (12–65) $$
$$ \frac{V}{V^*} = \frac{\rho^*}{\rho} = \frac{(1+k)Ma^2}{1+k Ma^2} \quad (12–63) $$

---

**EXAMPLE 12–13: Extrema of Rayleigh Line**
Show that $Ma = 1$ at max entropy.
**Analysis:** Differentiating entropy relation and setting $ds/dT = 0$:
$$ \frac{ds}{dT} = \frac{R(kRT - V^2)}{T(k-1)(RT - V^2)} \quad (8) $$
Setting numerator to zero: $V^2 = kRT \implies V = c \implies Ma = 1$.
Similarly, for max temperature ($dT/ds = 0$): $V = \sqrt{RT} \implies Ma = 1/\sqrt{k}$.

---

## 12–7 ■ ADIABATIC DUCT FLOW WITH FRICTION (FANNO FLOW)

Fanno flow refers to steady 1-D adiabatic flow of an ideal gas through a constant-area duct where wall friction is significant.

### Conservation Equations
- **Continuity:** $\rho V = \text{constant} \quad (12–70)$
- **Energy:** $h_0 = \text{constant} \implies T_0 = \text{constant} \quad (12–73)$
- **Momentum:** $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2 + \frac{F_{friction}}{A} \quad (12–71)$
- **Entropy Change:** $s_2 - s_1 = c_p \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1} > 0$

### Fanno Line on T-s Diagram (Fig. 12–60)
1. **Direction:** Friction always increases entropy, moving the state to the right.
2. **Sonic Point:** Maximum entropy occurs at $Ma = 1$.
3. **Trends:** 
   - Subsonic flow ($Ma < 1$): Friction increases $Ma$ and $V$, but decreases $P$ and $T$.
   - Supersonic flow ($Ma > 1$): Friction decreases $Ma$ and $V$, but increases $P$ and $T$.
   - Stagnation pressure $P_0$ always decreases.

---

### Property Relations for Fanno Flow (Relative to sonic state *)
$$ \frac{P}{P^*} = \frac{1}{Ma} \left[ \frac{k+1}{2 + (k-1)Ma^2} \right]^{1/2} \quad (12–94) $$
$$ \frac{T}{T^*} = \frac{k+1}{2 + (k-1)Ma^2} \quad (12–95) $$
$$ \frac{P_0}{P_0^*} = \frac{1}{Ma} \left[ \frac{2 + (k-1)Ma^2}{k+1} \right]^{(k+1)/[2(k-1)]} \quad (12–97) $$

**Sonic Length ($L^*$):** The duct length required for the flow to reach $Ma = 1$.
$$ \frac{fL^*}{D_h} = \frac{1 - Ma^2}{k Ma^2} + \frac{k+1}{2k} \ln \left[ \frac{(k+1)Ma^2}{2 + (k-1)Ma^2} \right] \quad (12–90) $$
For a duct of length $L$ between states 1 and 2: $\frac{fL}{D_h} = \left( \frac{fL^*}{D_h} \right)_1 - \left( \frac{fL^*}{D_h} \right)_2$.

---

**EXAMPLE 12–16: Choked Fanno Flow in a Duct**
Air at $Ma_1 = 0.4, T_1 = 300 \text{ K}, P_1 = 150 \text{ kPa}$ enters a $3\text{-cm}$ diameter duct. Flow is choked at exit ($Ma_2 = 1$).
**Analysis:**
1. Inlet velocity: $V_1 = Ma_1 \sqrt{kRT_1} = 0.4(347) = 139 \text{ m/s}$.
2. Reynolds number: $Re_1 = \rho_1 V_1 D / \mu = 2.637 \times 10^5$.
3. Friction factor (Haaland): $1/\sqrt{f} \cong -1.8 \log [6.9/Re + (\varepsilon/3.7D)^{1.11}]$.
4. Using Eq. 12–90 to find $L^*$ (max length).
5. Using Eq. 12–95 and 12–94 to find $T_2$ ($T^*$) and $P_2$ ($P^*$).
*Note: Stagnation temperature $T_0$ remains 300 K.*

---

## CHAPTER 12: PROBLEMS (Selected)

### Stagnation Properties
**12–5** Air flowing at $44 \text{ kPa}, 245.9 \text{ K}, 470 \text{ m/s}$. Find $T_0$ and $P_0$.
*Answers: 355.8 K, 160.3 kPa*

### Speed of Sound and Mach Number
**12–20** $CO_2$ enters adiabatic nozzle at $1200 \text{ K}, 50 \text{ m/s}$ and leaves at $400 \text{ K}$. Find $Ma_{in}$ and $Ma_{out}$.
*Answers: (a) 0.0925, (b) 3.73*

### Isentropic Flow through Nozzles
**12–58** Air enters nozzle at $0.2 \text{ MPa}, 350 \text{ K}, 150 \text{ m/s}$. Find $P$ and $T$ at location where $V = c$.
*Answers: 301.0 K, 0.118 MPa, Area ratio = 0.629*

**12–67E: Supersonic Wind Tunnel**
$P_0 = 150 \text{ psia}, T_0 = 100^\circ\text{F}, Ma = 2, A_e = 5 \text{ ft}^2$.
*Answers: 19.1 psia, 311 R, 1729 ft/s, 1435 lbm/s*
*Note: Air must be dry to prevent condensation shocks.*

### Shock Waves
**12–79** C-D nozzle, $Ma_1 = 2$ before normal shock. $P_{01} = 1 \text{ MPa}, T_{01} = 300 \text{ K}$. Find properties after shock.
*Answers: $P_2 = 0.575 \text{ MPa}, T_2 = 281 \text{ K}, Ma_2 = 0.577, P_{02} = 0.721 \text{ MPa}$.*

### Rayleigh and Fanno Flow
**12–109 (Rayleigh):** Air enters combustor at $T_1 = 550 \text{ K}, P_1 = 600 \text{ kPa}, Ma_1 = 0.2$. Heat added $\dot{Q} = 200 \text{ kJ/s}$. Find $Ma_2$ and $\Delta P_0$.
*Answers: 0.319, 21.8 kPa*

**12–121 (Fanno):** Air in $5\text{-cm}$ duct, $Ma_1 = 0.2, T_1 = 400 \text{ K}, P_1 = 200 \text{ kPa}$. $f = 0.016$. Find length $L$ for $Ma_2 = 0.8$.

---

## CHAPTER 12 SUMMARY (Continued)

**Rayleigh Flow (Heat Transfer, No Friction):**
- $T_0$ changes, $h_0$ changes.
- Maximum entropy at $Ma = 1$.
- Maximum temperature at $Ma = 1/\sqrt{k}$.

**Fanno Flow (Friction, No Heat Transfer):**
- $T_0$ is constant, $P_0$ decreases.
- Maximum entropy at $Ma = 1$.
- Friction drives flow toward $Ma = 1$.
- Sonic length $L^*$ is the maximum duct length before choking occurs.

---

### Review Problems (Chapter 12)
**12–125** Air enters $D=5\text{ cm}$ duct at $Ma_1 = 2.8, T_1 = 380 \text{ K}, P_1 = 80 \text{ kPa}$. Normal shock at $3\text{ m}$ from inlet. $f_{avg} = 0.007$. Find exit properties.
*Answers: 572 m/s, 813 K, 328 kPa*

**12–168: Pitot Probe in Supersonic Flow**
Velocity measurements with a Pitot probe are in error if incompressible relations are used. A probe in Mach flow causes a shock wave upstream. 
Given: $P_{02} = 620 \text{ kPa}, T_{02} = 340 \text{ K}$ (after shock), $P_1 = 110 \text{ kPa}$ (upstream static). Find $V_1$.

---
