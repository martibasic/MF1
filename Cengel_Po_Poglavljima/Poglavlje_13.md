# CHAPTER 13: OPEN-CHANNEL FLOW

Open-channel flow involves liquids with a free surface exposed to the atmosphere. Flow is driven by gravity (elevation change) and resisted by friction.

## 13–1 ■ CLASSIFICATION OF OPEN-CHANNEL FLOWS

### Uniform and Varied Flows
- **Uniform Flow (UF):** Flow depth $y$ and velocity $V$ remain constant. The depth is the **normal depth** $y_n$ (Fig. 13–3).
- **Gradually Varied Flow (GVF):** Depth changes slowly over long distances.
- **Rapidly Varied Flow (RVF):** Depth changes markedly over short distances (e.g., hydraulic jump).

### Hydraulic Radius ($R_h$)
Used as the characteristic dimension for non-circular channels:
$$ R_h = \frac{A_c}{p} \quad (13–2) $$
where $A_c$ is the cross-sectional area and $p$ is the **wetted perimeter**.
- **Note:** $R_h = D_h / 4$ (one-fourth of the hydraulic diameter).

### Reynolds Number in Channels
$$ Re = \frac{\rho V R_h}{\mu} = \frac{V R_h}{\nu} \quad (13–1) $$
- Laminar: $Re \leq 500$.
- Turbulent: $Re \geq 2500$.
*Flow in open channels is almost always turbulent.*

---

## 13–2 ■ FROUDE NUMBER AND WAVE SPEED

The **Froude number** ($Fr$) governs the character of open-channel flow:
$$ Fr = \frac{V}{\sqrt{g L_c}} = \frac{V}{\sqrt{g y}} \quad (13–6) $$
- **Subcritical (Tranquil):** $Fr < 1, y > y_c$.
- **Critical:** $Fr = 1, y = y_c$.
- **Supercritical (Rapid):** $Fr > 1, y < y_c$.

### Critical Depth ($y_c$)
For a rectangular channel of width $b$ and flow rate $\dot{V}$:
$$ y_c = \left( \frac{\dot{V}^2}{g b^2} \right)^{1/3} \quad (13–10) $$

### Analogy to Compressible Flow (Fig. 13–7)
- $Fr$ in channels is analogous to $Ma$ in gases.
- Wave speed $c_0 = \sqrt{gy}$ is analogous to speed of sound $c = \sqrt{kRT}$.
- Surface waves travel upstream only in subcritical flow ($V < c_0$).

---

## 13–2 ■ FROUDE NUMBER AND WAVE SPEED (Continued)

### Speed of Surface Waves ($c_0$)
The speed at which a surface disturbance travels through a shallow liquid of depth $y$:
$$ c_0 = \sqrt{gy} \quad (13–16) $$
- **Tranquil (Subcritical):** $V < c_0$. Waves can travel upstream.
- **Rapid (Supercritical):** $V > c_0$. Waves are washed downstream.

---

## 13–3 ■ SPECIFIC ENERGY ($E_s$)

Specific energy is the total mechanical energy relative to the channel bottom ($z=0$):
$$ E_s = y + \frac{V^2}{2g} \quad (13–18) $$
For a constant width $b$, substituting $V = \dot{V}/(yb)$:
$$ E_s = y + \frac{\dot{V}^2}{2gb^2y^2} \quad (13–20) $$

**Key Observations (Fig. 13–13):**
1. **Critical Point:** Minimum specific energy $E_{s,min}$ occurs at $Fr=1$.
   $$ E_{s,min} = \frac{3}{2} y_c \quad (13–25) $$
2. **Alternate Depths:** For $E_s > E_{s,min}$, two possible depths (one subsonic, one supersonic) exist for the same specific energy.

**EXAMPLE 13–1: Character of Flow and Alternate Depth**
$b = 0.4 \text{ m}, \dot{V} = 0.2 \text{ m}^3\text{/s}, y = 0.15 \text{ m}$.
**Analysis:**
1. $V = \dot{V}/(yb) = 3.33 \text{ m/s}$.
2. $y_c = (\dot{V}^2 / gb^2)^{1/3} = 0.294 \text{ m}$.
3. $y < y_c \implies$ **Supercritical flow** ($Fr = 2.75$).
4. Specific energy: $E_{s1} = 0.15 + 3.33^2/(2 \times 9.81) = 0.7163 \text{ m}$.
5. Solve for alternate depth $y_2$: $0.7163 = y_2 + \frac{0.2^2}{2(9.81)(0.4^2)y_2^2} \implies y_2 = 0.69 \text{ m}$.

---

## 13–5 ■ UNIFORM FLOW IN CHANNELS

Uniform flow occurs when friction matches the gravity head loss: $h_L = S_0 L$.
**Manning Equation (Gauckler–Manning):**
$$ V = \frac{a}{n} R_h^{2/3} S_0^{1/2}, \quad \dot{V} = \frac{a}{n} A_c R_h^{2/3} S_0^{1/2} \quad (13–41) $$
- $n$: Manning coefficient (Table 13-1).
- $a$: $1.0 \text{ m}^{1/3}\text{/s}$ (SI) or $1.486 \text{ ft}^{1/3}\text{/s}$ (English).

### TABLE 13–1: Manning coefficients ($n$)
- Glass: 0.010
- Finished Concrete: 0.012
- Clean Earth: 0.022
- Major Rivers: 0.035
- Floodplains with Trees: 0.150

---

**EXAMPLE 13–2: Flow Rate in an Open Channel**
Trapezoidal channel, $b = 0.8 \text{ m}, \theta = 60^\circ, S_0 = \tan(0.3^\circ) = 0.005236, y = 0.52 \text{ m}, n = 0.030$.
**Analysis:**
$A_c = y(b + y/\tan \theta) = 0.5721 \text{ m}^2$.
$p = b + 2y/\sin \theta = 2.001 \text{ m} \implies R_h = A_c/p = 0.2859 \text{ m}$.
$$ \dot{V} = \frac{1}{0.030} (0.5721)(0.2859)^{2/3}(0.005236)^{1/2} = 0.60 \text{ m}^3\text{/s} $$
*If slope increases to $1^\circ$, $\dot{V} \approx 1.1 \text{ m}^3\text{/s}$.*

---

**EXAMPLE 13–3: The Height of a Rectangular Channel**
Water at $\dot{V} = 51 \text{ ft}^3\text{/s}$ in unfinished concrete ($n = 0.014$). $b = 4 \text{ ft}, S_0 = 0.002$.
**Analysis:**
Using Manning equation: $51 = \frac{1.486}{0.014} (4y) (\frac{4y}{4+2y})^{2/3} (0.002)^{1/2}$.
Solving for $y$: $y = 2.5 \text{ ft}$.
*If slope drops to $0.001$, $y$ increases to $3.3 \text{ ft}$.*

---

**EXAMPLE 13–4: Channels with Nonuniform Roughness**
Channel with two sections: (1) Clean natural ($n_1=0.030$) and (2) Light brush ($n_2=0.050$). $S_0 = 0.003$.
**Analysis:**
1. Subsection 1: $A_{c1} = 21 \text{ m}^2, R_{h1} = 2.00 \text{ m} \implies \dot{V}_1 = 64.8 \text{ m}^3\text{/s}$.
2. Subsection 2: $A_{c2} = 16 \text{ m}^2, R_{h2} = 1.60 \text{ m} \implies \dot{V}_2 = 20.0 \text{ m}^3\text{/s}$.
3. Total flow: $\dot{V} = 84.8 \text{ m}^3\text{/s} \cong 85 \text{ m}^3\text{/s}$.
4. Effective Manning $n_{eff} = \frac{a A_c R_h^{2/3} S_0^{1/2}}{\dot{V}} = 0.035$.

---

## 13–6 ■ BEST HYDRAULIC CROSS SECTIONS

The best cross section is the one that minimizes the wetted perimeter $p$ for a fixed area $A_c$, thereby maximizing the hydraulic radius $R_h$ and the flow rate.

- **Rectangular Channel:** Best when $y = b/2 \quad (13–48)$.
- **Trapezoidal Channel:** Best is half of a hexagon ($\theta = 60^\circ$):
  $$ y = \frac{\sqrt{3}}{2} b \quad (13–56) $$
  In this case, $R_h = y/2$.

**EXAMPLE 13–5: Best Cross Section Comparison**
$\dot{V} = 2 \text{ m}^3\text{/s}, S_0 = 0.001, n = 0.016$.
(a) Rectangular: $b = 1.84 \text{ m}, y = 0.92 \text{ m}, p = 3.68 \text{ m}$.
(b) Trapezoidal ($\theta=60^\circ$): $b = 1.12 \text{ m}, y = 0.973 \text{ m}, p = 3.37 \text{ m}$.
*Result: Trapezoidal is better due to smaller perimeter.*

---

## 13–7 ■ GRADUALLY VARIED FLOW (GVF)

In GVF, the flow depth $y$ varies slowly along the channel.
**Dynamic Equation of GVF:**
$$ \frac{dy}{dx} = \frac{S_0 - S_f}{1 - Fr^2} \quad (13–65) $$
- **Surface Profiles:** Identified by slope (M, S, C, H, A) and zone (1, 2, 3) (Fig. 13–28).
- **M1 Profile:** Mild slope ($y_n > y_c$), flow above $y_n$ ($y > y_n$). $dy/dx > 0$, depth increases downstream (e.g., upstream of a dam).
- **S2 Profile:** Steep slope ($y_n < y_c$), flow between $y_c$ and $y_n$. $dy/dx < 0$, depth decreases toward $y_n$.

---

## 13–8 ■ RAPIDLY VARIED FLOW AND HYDRAULIC JUMP

Rapidly varied flow (RVF) occurs when there is a sudden change in geometry or slope. The most common form of RVF is the **hydraulic jump**, where a supercritical flow ($Fr_1 > 1$) abruptly slows down to a subcritical flow ($Fr_2 < 1$).

### Analysis of Hydraulic Jump
Using conservation of mass and momentum for a wide horizontal channel:
**Depth Ratio (Bélanger Equation):**
$$ \frac{y_2}{y_1} = \frac{1}{2} \left( -1 + \sqrt{1 + 8 Fr_1^2} \right) \quad (13–72) $$
**Head Loss ($h_L$):**
$$ h_L = y_1 - y_2 + \frac{V_1^2 - V_2^2}{2g} \quad (13–74) $$
**Energy Dissipation Ratio:**
$$ \frac{h_L}{E_{s1}} = \frac{h_L}{y_1(1 + Fr_1^2/2)} \quad (13–75) $$

### TABLE 13–4: Classification of hydraulic jumps
| $Fr_1$ | $y_2/y_1$ | Dissipation | Description |
| :--- | :--- | :--- | :--- |
| $< 1$ | 1 | 0 | Impossible jump. |
| 1–1.7 | 1–2 | $< 5\%$ | Undular jump (standing wave). |
| 1.7–2.5 | 2–3.1 | 5–15% | Weak jump. |
| 2.5–4.5 | 3.1–5.9 | 15–45% | Oscillating jump. |
| 4.5–9 | 5.9–12 | 45–70% | Steady jump (best for design). |
| $> 9$ | $> 12$ | 70–85% | Strong jump (rough). |

---

**EXAMPLE 13–7: Hydraulic Jump**
Water at $y_1 = 0.8 \text{ m}, V_1 = 7 \text{ m/s}$ in a $10\text{-m}$ wide channel.
**Analysis:**
1. $Fr_1 = V_1 / \sqrt{g y_1} = 7 / \sqrt{9.81 \times 0.8} = 2.50$ (Supercritical).
2. $y_2 = 0.5(0.8) [-1 + \sqrt{1 + 8(2.5^2)}] = 2.46 \text{ m}$.
3. $V_2 = V_1(y_1/y_2) = 2.28 \text{ m/s} \implies Fr_2 = 0.464$ (Subcritical).
4. $h_L = (0.8 - 2.46) + (7^2 - 2.28^2)/(2 \times 9.81) = 0.572 \text{ m}$.
5. Dissipation ratio: $h_L / E_{s1} = 0.572 / 3.30 = 0.173$ (17.3%).
6. Wasted power: $\dot{E}_{dissipated} = \dot{m} g h_L = (56000)(9.81)(0.572) = 314 \text{ kW}$.

---

## 13–9 ■ FLOW CONTROL AND MEASUREMENT

Flow in open channels is controlled by weirs (flow over) or gates (flow under).

### Underflow Gates
- **Sluice Gate:** Vertical plane surface.
- **Drum Gate:** Streamlined circular cross-section.
- **Free Outflow:** Discharge velocity $V = \sqrt{2gy_1} \quad (13–76)$.
- **Drowned (Submerged) Outflow:** Downstream depth is high enough to cause a hydraulic jump that submerges the jet. Leads to high head loss.

---

## 13–9 ■ FLOW CONTROL AND MEASUREMENT

Flow rate in open channels is controlled and measured using various structures such as gates and weirs.

### Underflow Gates
Underflow gates allow liquid to flow underneath them. The flow rate depends on the gate opening height $a$ and the upstream depth $y_1$.

**Discharge Velocity and Flow Rate:**
$$ V = C_d \sqrt{2gy_1} \quad \text{and} \quad \dot{V} = C_d ba \sqrt{2gy_1} \quad (13–77) $$
where:
- $b$ is the width of the gate.
- $a$ is the height of the gate opening.
- $C_d$ is the discharge coefficient.

For a vertical sluice gate:
- **Free Outflow:** $C_d$ typically ranges between 0.5 and 0.6.
- **Drowned Outflow:** $C_d$ drops sharply as the downstream depth increases.

### EXAMPLE 13–8: Sluice Gate with Drowned Outflow
Water is released from a 3-m-deep reservoir ($y_1 = 3 \text{ m}$) into a 6-m-wide open channel ($b = 6 \text{ m}$) through a sluice gate with a 0.25-m-high opening ($a = 0.25 \text{ m}$). The downstream flow depth is $y_2 = 1.5 \text{ m}$. Determine the rate of discharge.

**Analysis:**
The depth ratio $y_1/a = 3/0.25 = 12$ and the contraction coefficient $y_2/a = 1.5/0.25 = 6$.
From Fig. 13–38, $C_d \approx 0.47$.
$$ \dot{V} = C_d ba \sqrt{2gy_1} = 0.47(6 \text{ m})(0.25 \text{ m}) \sqrt{2(9.81 \text{ m/s}^2)(3 \text{ m})} = 5.41 \text{ m}^3\text{/s} $$

---

### Overflow Gates (Weirs)
Weirs are obstructions that force the liquid to flow over them.

#### Broad-Crested Weir
A broad-crested weir is a rectangular block where critical flow occurs over the crest.
**Ideal Flow Rate:**
$$ \dot{V}_{\text{ideal}} = b \sqrt{g} \left( \frac{2}{3} \right)^{3/2} \left( H + \frac{V_1^2}{2g} \right)^{3/2} \quad (13–86) $$
**With Discharge Coefficient ($C_{wd, \text{broad}}$):**
$$ \dot{V} = C_{wd, \text{broad}} b \sqrt{g} \left( \frac{2}{3} \right)^{3/2} \left( H + \frac{V_1^2}{2g} \right)^{3/2} \quad (13–87) $$
For high weirs where $V_1$ is low:
$$ \dot{V} \approx C_{wd, \text{broad}} b \sqrt{g} \left( \frac{2}{3} \right)^{3/2} H^{3/2} \quad (13–89) $$

#### Sharp-Crested Weirs
- **Rectangular Weir:**
$$ \dot{V}_{\text{rec}} = C_{wd, \text{rec}} \frac{2}{3} b \sqrt{2g} H^{3/2} \quad (13–95) $$
- **Triangular (V-notch) Weir:**
$$ \dot{V}_{\text{tri}} = C_{wd, \text{tri}} \frac{8}{15} \tan\left( \frac{\theta}{2} \right) \sqrt{2g} H^{5/2} \quad (13–98) $$

---

### Flow over a Bump with Negligible Friction
Consider flow over a bump of height $\Delta z_b$. The energy equation is:
$$ E_{s2} = E_{s1} - \Delta z_b \quad (13–80) $$
- **Subcritical flow:** The water surface drops over the bump.
- **Supercritical flow:** The water surface rises over the bump.
- **Choked flow:** Occurs if the bump is high enough to force critical flow over it ($E_{s2} = E_{\text{min}}$).

### EXAMPLE 13–9: Subcritical Flow over a Bump
Water ($y_1 = 0.80 \text{ m}$, $V_1 = 1.2 \text{ m/s}$) encounters a 15-cm-high bump ($\Delta z_b = 0.15 \text{ m}$). Determine if the surface is depressed.
**Analysis:**
$Fr_1 = \frac{1.2}{\sqrt{9.81 \times 0.80}} = 0.428 < 1$ (Subcritical).
$E_{s1} = 0.80 + \frac{1.2^2}{2 \times 9.81} = 0.873 \text{ m}$.
$E_{s2} = 0.873 - 0.15 = 0.723 \text{ m}$.
Solving $y_2^3 - 0.723 y_2^2 + 0.0470 = 0$ gives $y_2 = 0.59 \text{ m}$.
The surface height is $y_2 + \Delta z_b = 0.59 + 0.15 = 0.74 \text{ m}$, which is less than $y_1 = 0.80 \text{ m}$. Surface is depressed.

---

### SUMMARY OF CHAPTER 13
- **Froude Number:** $Fr = V / \sqrt{gy}$.
- **Critical Depth:** $y_c = (\dot{V}^2 / gb^2)^{1/3}$ for wide channels.
- **Uniform Flow (Manning Equation):** $V_0 = \frac{a}{n} R_h^{2/3} S_0^{1/2}$.
- **Best Hydraulic Cross Section:** For rectangular channel, $y = b/2$.
- **Hydraulic Jump:** Supercritical to subcritical transition with energy dissipation.
- **Flow Measurement:** Sluice gates (underflow) and weirs (overflow).

---

### CHAPTER 13: PROBLEMS

#### Classification, Froude Number, and Wave Speed
- **13–1C** How does open-channel flow differ from internal flow?
- **13–2C** What is the driving force for flow in an open channel? How is the flow rate in an open channel established?
- **13–3C** How does the pressure change along the free surface in an open-channel flow?
- **13–4C** Consider steady fully developed flow in an open channel of rectangular cross section with a constant slope of 5° for the bottom surface. Will the slope of the free surface also be 5°? Explain.
- **13–5C** How does uniform flow differ from nonuniform flow in open channels? In what kind of channels is uniform flow observed?
- **13–6C** What is normal depth? Explain how it is established in open channels.
- **13–7C** What causes the flow in an open channel to be varied (or nonuniform)? How does rapidly varied flow differ from gradually varied flow?
- **13–8C** In open channels, how is hydraulic radius defined? Knowing the hydraulic radius, how can the hydraulic diameter of the channel be determined?
- **13–9C** Given the average flow velocity and the flow depth, explain how you would determine if the flow in open channels is tranquil, critical, or rapid.
- **13–10C** What is the Froude number? How is it defined? What is its physical significance?
- **13–11C** What is critical depth in open-channel flow? For a given average flow velocity, how is it determined?
- **13–12C** The flow in an open channel is observed to have undergone a hydraulic jump. Is the flow upstream from the jump necessarily supercritical? Is the flow downstream from the jump necessarily subcritical?

- **13–13** Consider the flow of water in a wide channel. Determine the speed of a small disturbance in the flow if the flow depth is (a) 10 cm and (b) 80 cm.
- **13–14** Water at 20°C is flowing uniformly in a wide rectangular channel at an average velocity of 2 m/s. If the water depth is 0.2 m, determine (a) whether the flow is laminar or turbulent and (b) whether the flow is subcritical or supercritical.
- **13–15** Water at 20°C flows in a partially full 2-m-diameter circular channel at an average velocity of 2 m/s. If the maximum water depth is 0.5 m, determine the hydraulic radius, the Reynolds number, and the flow regime.
- **13–16** Water at 15°C is flowing uniformly in a 2-m-wide rectangular channel at an average velocity of 4 m/s. If the water depth is 8 cm, determine whether the flow is subcritical or supercritical. *Answer: supercritical*
- **13–17** After heavy rain, water flows on a concrete surface at an average velocity of 1.3 m/s. If the water depth is 2 cm, determine whether the flow is subcritical or supercritical.

#### Specific Energy and the Energy Equation
- **13–21C** How is the specific energy of a fluid flowing in an open channel defined in terms of heads?
- **13–22C** Consider steady flow of water through two identical open rectangular channels at identical flow rates. If the flow in one channel is subcritical and in the other supercritical, can the specific energies of water in these two channels be identical? Explain.
- **13–23C** For a given flow rate through an open channel, the variation of specific energy with flow depth is studied. One person claims that the specific energy of the fluid will be minimum when the flow is critical, but another person claims that the specific energy will be minimum when the flow is subcritical. What is your opinion?
- **13–31** Water flows steadily in a 0.8-m-wide rectangular channel at a rate of 0.7 m³/s. If the flow depth is 0.25 m, determine the flow velocity and if the flow is subcritical or supercritical. Also determine the alternate flow depth if the character of flow were to change.
- **13–34** Water at 10°C flows in a 6-m-wide rectangular channel at a depth of 0.55 m and a flow rate of 12 m³/s. Determine (a) the critical depth, (b) whether the flow is subcritical or supercritical, and (c) the alternate depth. *Answers: (a) 0.742 m, (b) supercritical, (c) 1.03 m*

#### Uniform Flow and Best Hydraulic Cross Sections
- **13–41C** When is the flow in an open channel said to be uniform? Under what conditions will the flow in an open channel remain uniform?
- **13–54** A trapezoidal channel with a bottom width of 5 m, free surface width of 10 m, and flow depth of 2.2 m discharges water at a rate of 120 m³/s. If the surfaces of the channel are lined with asphalt ($n = 0.016$), determine the elevation drop of the channel per km. *Answer: 8.52 m*

#### Gradually and Rapidly Varied Flows and Hydraulic Jump
- **13–83** Water discharging into an 8-m-wide rectangular horizontal channel from a sluice gate is observed to have undergone a hydraulic jump. The flow depth and velocity before the jump are 1.2 m and 9 m/s, respectively. Determine (a) the flow depth and the Froude number after the jump, (b) the head loss and the dissipation ratio, and (c) the mechanical energy dissipated by the hydraulic jump.
- **13–86** Consider the flow of water in a 10-m-wide channel at a rate of 70 m³/s and a flow depth of 0.50 m. The water now undergoes a hydraulic jump, and the flow depth after the jump is measured to be 4 m. Determine the mechanical power wasted during this jump. *Answer: 4.35 MW*

#### Flow Control and Measurement in Channels
- **13–95** Water is released from a 14-m-deep reservoir into a 5-m-wide open channel through a sluice gate with a 1-m-high opening at the channel bottom. If the flow depth downstream from the gate is measured to be 3 m, determine the rate of discharge through the gate.
- **13–98** The flow rate of water in a 4-m-wide horizontal channel is being measured using a 0.75-m-high sharp-crested rectangular weir that spans across the channel. If the water depth upstream is 2.2 m, determine the flow rate of water. *Answer: 15.9 m³/s*
- **13–103** Consider uniform water flow in a wide channel made of unfinished concrete laid on a slope of 0.0022. Now water flows over a 15-cm-high bump. If the flow over the bump is exactly critical ($Fr = 1$), determine the flow rate and the flow depth over the bump per m width. *Answers: 20.3 m³/s, 3.48 m*
- **13–109** The flow rate of water flowing in a 3-m-wide channel is to be measured with a sharp-crested triangular weir 0.5 m above the channel bottom with a notch angle of 60°. If the flow depth upstream from the weir is 1.5 m, determine the flow rate of water through the channel. Take the weir discharge coefficient to be 0.60. *Answer: 0.818 m³/s*

---
