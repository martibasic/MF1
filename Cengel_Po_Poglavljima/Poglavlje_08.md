# CHAPTER 8: FLOW IN PIPES

Liquid or gas flow through pipes or ducts is common in heating, cooling, and distribution networks. We focus on friction, pressure drop, and head loss.

### OBJECTIVES
- Understand laminar and turbulent flow in pipes.
- Calculate major and minor losses in piping networks.
- Learn flow measurement techniques.

---

## 8–1 ■ INTRODUCTION

- **Pipes:** Circular cross section (withstand high pressure).
- **Ducts:** Noncircular (lower pressure, e.g., HVAC).
- **Average Velocity ($V_{avg}$):** Used for calculations; remains constant for incompressible flow in constant-area pipes.
  $$ \dot{m} = \rho V_{avg} A_c = \int_{A_c} \rho u(r) \, dA_c \quad (8–1) $$
  For a circular pipe of radius $R$:
  $$ V_{avg} = \frac{2}{R^2} \int_0^R u(r) r \, dr \quad (8–2) $$

---

## 8–2 ■ LAMINAR AND TURBULENT FLOWS

- **Laminar Flow:** Smooth streamlines, highly ordered motion (e.g., cigarette smoke plume at start).
- **Turbulent Flow:** Velocity fluctuations, highly disordered motion (e.g., smoke after rising).
- **Transition:** Region where flow fluctuates between regimes.

### Reynolds Number
The flow regime depends on the ratio of inertial to viscous forces:
$$ Re = \frac{\text{Inertial forces}}{\text{Viscous forces}} = \frac{V_{avg} D}{\nu} = \frac{\rho V_{avg} D}{\mu} \quad (8–3) $$
where $D$ is the characteristic length (diameter).

- **Critical Reynolds number ($Re_{cr}$):** For internal pipe flow, $Re_{cr} \cong 2300$.
- **Laminar flow:** $Re \lesssim 2300$.
- **Transitional flow:** $2300 \lesssim Re \lesssim 4000$.
- **Turbulent flow:** $Re \gtrsim 4000$.

### Hydraulic Diameter ($D_h$)
For noncircular pipes:
$$ D_h = \frac{4 A_c}{p} \quad (8–4) $$
where $p$ is the wetted perimeter.
- **Circular tube:** $D_h = \frac{4(\pi D^2/4)}{\pi D} = D$.
- **Square duct:** $D_h = \frac{4a^2}{4a} = a$.
- **Rectangular duct:** $D_h = \frac{4ab}{2(a+b)} = \frac{2ab}{a+b}$.

---

---

## 8–3 ■ THE ENTRANCE REGION

The region from the pipe inlet to the point at which the boundary layer merges at the centerline is called the **hydrodynamic entrance region**.
- **Hydrodynamic entry length ($L_h$):**
  $$ L_{h,laminar} \cong 0.05 Re D \quad (8–6) $$
  $$ L_{h,turbulent} \cong 1.359 D Re^{1/4} \cong 10 D \quad (8–8) $$

In the **fully developed region**, the velocity profile $u(r)$ remains unchanged downstream:
$$ \frac{\partial u(r, x)}{\partial x} = 0 \to u = u(r) \quad (8–5) $$

---

## 8–4 ■ LAMINAR FLOW IN PIPES

In fully developed laminar flow, the velocity profile is parabolic.
- **Velocity profile:**
  $$ u(r) = 2 V_{avg} \left( 1 - \frac{r^2}{R^2} \right) \quad (8–17) $$
- **Maximum velocity:** $u_{max} = 2 V_{avg} \quad (8–18)$.

### Pressure Drop and Head Loss
The pressure drop $\Delta P$ for laminar flow in a horizontal pipe:
$$ \Delta P = P_1 - P_2 = \frac{8 \mu L V_{avg}}{R^2} = \frac{32 \mu L V_{avg}}{D^2} \quad (8–20) $$

**Darcy friction factor ($f$):**
$$ f = \frac{8 \tau_w}{\rho V_{avg}^2} = \frac{64}{Re} \quad (8–23) $$

**Head Loss ($h_L$):**
$$ h_L = \frac{\Delta P_L}{\rho g} = f \frac{L}{D} \frac{V_{avg}^2}{2g} \quad (8–24) $$

**Pumping Power Requirement:**
$$ \dot{W}_{pump,L} = \dot{V} \Delta P_L = \dot{m} g h_L \quad (8–25) $$

**Poiseuille’s Law** (Volume flow rate for horizontal pipe):
$$ \dot{V} = \frac{\Delta P \pi D^4}{128 \mu L} \quad (8–27) $$

### Inclined Pipes
For a pipe inclined at an angle $\theta$ (Fig. 8–15):
$$ \dot{V} = \frac{(\Delta P - \rho g L \sin \theta) \pi D^4}{128 \mu L} \quad (8–34) $$
- $\theta > 0$ for uphill flow (gravity opposes).
- $\theta < 0$ for downhill flow (gravity helps).

---

**EXAMPLE 8–1: Flow Rates in Horizontal and Inclined Pipes**
Oil ($\rho = 888 \text{ kg/m}^3, \mu = 0.8 \text{ Pa·s}$), $D=5\text{ cm}, L=40\text{ m}, \Delta P = 648 \text{ kPa}$.
**Analysis:** 
(a) Horizontal: $\dot{V} = \frac{(648,000)\pi(0.05)^4}{128(0.8)(40)} = 0.00311 \text{ m}^3\text{/s}$.
(b) Uphill ($15^\circ$): $\dot{V} = \frac{[648,000 - (888)(9.81)(40)\sin 15^\circ]\pi(0.05)^4}{128(0.8)(40)} = 0.00267 \text{ m}^3\text{/s}$.
(c) Downhill ($15^\circ$): $\dot{V} = 0.00354 \text{ m}^3\text{/s}$.
$Re = \rho V_{avg} D / \mu = 100 < 2300$ (Laminar).

---

**EXAMPLE 8–2: Pressure Drop and Head Loss in a Pipe**
Water at $40^\circ\text{F}$, $D = 0.12 \text{ in}$, $L = 30 \text{ ft}$, $V_{avg} = 3 \text{ ft/s}$.
**Analysis:** 
$Re = 1803 < 2300$ (Laminar).
$f = 64/Re = 0.0355$.
$h_L = f \frac{L}{D} \frac{V^2}{2g} = 0.0355 \frac{30}{0.01} \frac{3^2}{2(32.2)} = 14.9 \text{ ft}$.
$\Delta P = \rho g h_L = (62.42 \text{ lbf/ft}^3)(14.9 \text{ ft}) \frac{1 \text{ ft}^2}{144 \text{ in}^2} = 6.46 \text{ psi}$.

---

---

## 8–5 ■ TURBULENT FLOW IN PIPES

Turbulent flow is characterized by random and rapid fluctuations of swirling regions of fluid, called **eddies**. These fluctuations provide an additional mechanism for momentum and energy transfer, resulting in higher friction and heat transfer coefficients.

The velocity is expressed as the sum of an average value $\bar{u}$ and a fluctuating component $u'$:
$$ u = \bar{u} + u' \quad (8–35) $$

### Turbulent Shear Stress
The total shear stress in turbulent flow consists of laminar and turbulent components:
$$ \tau_{total} = \tau_{lam} + \tau_{turb} \quad (8–36) $$
where $\tau_{turb} = -\rho \overline{u'v'}$ is the **Reynolds stress**.

Using **eddy viscosity** $\mu_t$:
$$ \tau_{turb} = \mu_t \frac{\partial \bar{u}}{\partial y} \quad (8–38) $$
$$ \tau_{total} = (\mu + \mu_t) \frac{\partial \bar{u}}{\partial y} = \rho (\nu + \nu_t) \frac{\partial \bar{u}}{\partial y} \quad (8–39) $$

### Turbulent Velocity Profile
Turbulent flow along a wall consists of four regions:
1. **Viscous sublayer:** Next to the wall, viscous effects are dominant. Profile is linear.
   $$ u^+ = y^+ \quad \text{where } u^+ = \frac{u}{u_*}, \ y^+ = \frac{y u_*}{\nu} \quad (8–45) $$
   Friction velocity $u_* = \sqrt{\tau_w / \rho}$.
2. **Buffer layer:** Turbulent effects become significant.
3. **Overlap layer:** Velocity is proportional to the logarithm of distance.
   $$ \text{Logarithmic law: } u^+ = 2.5 \ln y^+ + 5.0 \quad (8–47) $$
4. **Outer layer:** Turbulent effects dominate.

**Power-law velocity profile:**
$$ \frac{u}{u_{max}} = \left( \frac{y}{R} \right)^{1/n} = \left( 1 - \frac{r}{R} \right)^{1/n} \quad (8–49) $$
Typically $n=7$ for many practical flows.

---

## The Moody Chart

The friction factor $f$ depends on the **Reynolds number** ($Re$) and the **relative roughness** ($\varepsilon/D$).
**Colebrook equation (implicit):**
$$ \frac{1}{\sqrt{f}} = -2.0 \log_{10} \left( \frac{\varepsilon/D}{3.7} + \frac{2.51}{Re\sqrt{f}} \right) \quad (8–50) $$

**Haaland equation (explicit approximation):**
$$ \frac{1}{\sqrt{f}} \cong -1.8 \log_{10} \left[ \frac{6.9}{Re} + \left( \frac{\varepsilon/D}{3.7} \right)^{1.11} \right] \quad (8–51) $$

### TABLE 8–2: Equivalent roughness values for new commercial pipes
| Material | ft | mm |
| :--- | :--- | :--- |
| Glass, plastic | 0 (smooth) | 0 |
| Concrete | 0.003–0.03 | 0.9–9 |
| Cast iron | 0.00085 | 0.26 |
| Commercial steel | 0.00015 | 0.045 |
| Stainless steel | 0.000007 | 0.002 |

---

### Types of Fluid Flow Problems (Fig. 8–29)
1. **Type 1:** Given $L, D, \dot{V} \to$ Find $\Delta P$ (Straightforward).
2. **Type 2:** Given $L, D, \Delta P \to$ Find $\dot{V}$ (Iterative).
3. **Type 3:** Given $L, \Delta P, \dot{V} \to$ Find $D$ (Iterative).

**EXAMPLE 8–3: Determining the Head Loss in a Water Pipe**
Water at $60^\circ\text{F}$, $D = 2 \text{ in}$, $L = 200 \text{ ft}$, $\dot{V} = 0.2 \text{ ft}^3\text{/s}$, stainless steel.
**Analysis:** 
$V = 9.17 \text{ ft/s}, Re = 126,400$ (Turbulent).
$\varepsilon/D = 0.000007 / (2/12) = 0.000042$.
From Moody chart or Colebrook: $f = 0.0174$.
Head loss: $h_L = f \frac{L}{D} \frac{V^2}{2g} = 0.0174 \frac{200}{2/12} \frac{(9.17)^2}{2(32.2)} = 27.3 \text{ ft}$.
Pressure drop: $\Delta P = \rho g h_L = 11.8 \text{ psi}$.
Pumping power: $\dot{W}_{pump} = \dot{V} \Delta P = 461 \text{ W}$.

---

**EXAMPLE 8–4: Determining the Diameter of an Air Duct**
Air at $35^\circ\text{C}$ through a $150\text{-m}$ plastic duct. $\dot{V} = 0.35 \text{ m}^3\text{/s}$, $h_L \leq 20 \text{ m}$.
**Analysis:** This is a Type 3 problem (Find $D$). Using the Swamee–Jain formula (Eq. 8–54):
$$ D = 0.66 \left[ 0 + (1.655 \times 10^{-5})(0.35)^{9.4} \left( \frac{150}{(9.81)(20)} \right)^{5.2} \right]^{0.04} = 0.271 \text{ m} $$
Iteration with EES gives $D = 0.267 \text{ m}$.

---

**EXAMPLE 8–5: Determining the Flow Rate of Air in a Duct**
Same as Ex 8–4 but $L$ is doubled ($300 \text{ m}$). $D = 0.267 \text{ m}$, $h_L = 20 \text{ m}$. Find $\dot{V}$.
**Analysis:** Type 2 problem. Iteration or Swamee–Jain (Eq. 8–53) gives:
$$ \dot{V} = 0.24 \text{ m}^3\text{/s} $$
The flow rate drops by 31% when length is doubled.

---

## 8–6 ■ MINOR LOSSES

Minor losses are pressure drops caused by fittings, valves, bends, elbows, etc. In systems with long pipes, these are "minor" compared to major (friction) losses, but in short systems, they can be dominant.

**Loss coefficient ($K_L$):**
$$ K_L = \frac{h_L}{V^2/(2g)} \quad (8–55) $$
$$ \text{Minor loss: } h_L = K_L \frac{V^2}{2g} \quad (8–56) $$

**Equivalent length ($L_{equiv}$):**
$$ L_{equiv} = \frac{D}{f} K_L \quad (8–57) $$

### Total Head Loss
$$ h_{L,total} = h_{L,major} + h_{L,minor} = \sum f_i \frac{L_i}{D_i} \frac{V_i^2}{2g} + \sum K_{L,j} \frac{V_j^2}{2g} \quad (8–58) $$

### TABLE 8–4: Loss coefficients $K_L$ for turbulent flow
- **Pipe Inlet:**
  - Reentrant: $K_L = 0.80$
  - Sharp-edged: $K_L = 0.50$
  - Well-rounded ($r/D > 0.2$): $K_L = 0.03$
- **Pipe Exit:** $K_L = \alpha$ ($\cong 1.05$ for turbulent, $2.0$ for laminar).
- **Sudden Expansion:** $K_L = (1 - \frac{d^2}{D^2})^2 \quad (8–60)$.
- **Valves (Fully Open):**
  - Globe valve: $K_L = 10$
  - Gate valve: $K_L = 0.2$
  - Ball valve: $K_L = 0.05$

---

**EXAMPLE 8–6: Head Loss and Pressure Rise during Gradual Expansion**
Horizontal water pipe, $D_1 = 6 \text{ cm} \to D_2 = 9 \text{ cm}$. $V_1 = 7 \text{ m/s}, P_1 = 150 \text{ kPa}$. $\theta = 60^\circ \to K_L = 0.07$.
**Analysis:** 
$V_2 = V_1 (D_1/D_2)^2 = 3.11 \text{ m/s}$.
$h_L = K_L \frac{V_1^2}{2g} = 0.07 \frac{7^2}{2(9.81)} = 0.175 \text{ m}$.
Using energy equation for $P_2$:
$$ P_2 = P_1 + \rho \left( \frac{\alpha_1 V_1^2 - \alpha_2 V_2^2}{2} - g h_L \right) $$
$$ P_2 = 150 \text{ kPa} + (1000 \text{ kg/m}^3) \left( \frac{1.06(7^2 - 3.11^2)}{2} - 9.81(0.175) \right) = 169 \text{ kPa} $$
*Note: Pressure increased despite the loss because of kinetic-to-static energy conversion.*

---

## 8–7 ■ PIPING NETWORKS AND PUMP SELECTION

Piping systems involve pipes connected in series, parallel, or complex networks.

### Pipes in Series (Fig. 8–42)
For pipes connected in series, the flow rate remains constant, and the total head loss is the sum of individual head losses:
$$ \dot{V}_A = \dot{V}_B = \dot{V} $$
$$ h_{L,total} = h_{L,1} + h_{L,2} + \dots $$

### Pipes in Parallel (Fig. 8–43)
For pipes connected in parallel, the head loss is the same in each branch, and the total flow rate is the sum of branch flow rates:
$$ h_{L,1} = h_{L,2} = \dots $$
$$ \dot{V}_{total} = \dot{V}_1 + \dot{V}_2 + \dots $$

### Piping Systems with Pumps
The useful pump head $h_{pump,u}$ required to move fluid between two reservoirs:
$$ h_{pump,u} = (z_2 - z_1) + h_L \quad (8–63) $$

**Pump-Motor Efficiency ($\eta_{pump-motor}$):**
$$ \dot{W}_{elect} = \frac{\rho \dot{V} g h_{pump,u}}{\eta_{pump-motor}} \quad (8–64) $$

The intersection of the **system curve** (required head vs. flow rate) and the **pump characteristic curve** (supplied head vs. flow rate) is the **operating point** (Fig. 8–46).

---

**EXAMPLE 8–7: Pumping Water through Two Parallel Pipes**
Water at $20^\circ\text{C}$ between reservoirs ($z_A = 5 \text{ m}, z_B = 13 \text{ m}$). Parallel pipes: $D_1 = 4 \text{ cm}, D_2 = 8 \text{ cm}, L = 36 \text{ m}$. $\dot{W}_{elect} = 8 \text{ kW}, \eta = 0.70$.
**Analysis:** 
Useful power: $\dot{W}_{pump,u} = \eta \dot{W}_{elect} = 5.6 \text{ kW}$.
System of equations (13 equations): $h_{L,1} = h_{L,2} = h_L$, $\dot{V} = \dot{V}_1 + \dot{V}_2$, $\dot{W}_{pump,u} = \rho \dot{V} g h_{pump,u}$, $h_{pump,u} = \Delta z + h_L$.
**Result:** $\dot{V} = 0.030 \text{ m}^3\text{/s}$, $\dot{V}_1 = 0.00415 \text{ m}^3\text{/s}$, $\dot{V}_2 = 0.0259 \text{ m}^3\text{/s}$.
*Only 14% of flow goes through the smaller pipe ($D_1 = D_2/2$).*

---

**EXAMPLE 8–8: Gravity-Driven Water Flow in a Pipe**
$D = 5 \text{ cm}, \dot{V} = 6 \text{ L/s}$, $z_2 = 4 \text{ m}$. Total length $L=89\text{ m}$.
**Analysis:** 
$V = 3.06 \text{ m/s}, Re = 117,000$ (Turbulent).
$\sum K_L = 0.5 \text{ (inlet)} + 2(0.3) \text{ (elbows)} + 0.2 \text{ (valve)} + 1.06 \text{ (exit)} = 2.36$.
$f = 0.0315$ (Colebrook).
$h_L = (f L/D + \sum K_L) V^2/2g = 27.9 \text{ m}$.
$z_1 = z_2 + h_L = 4 + 27.9 = 31.9 \text{ m}$.

---

**EXAMPLE 8–9: Effect of Flushing on Flow Rate from a Shower**
$P_{1,gage} = 200 \text{ kPa}, D = 1.5 \text{ cm}$ (copper). Shower $K_L = 12$, toilet $K_L = 14$.
**Analysis:** 
(a) Shower alone: $h_L = \Delta P/\rho g - \Delta z = 18.4 \text{ m}$. Result: $\dot{V} = 0.53 \text{ L/s}$.
(b) Shower + Toilet (Parallel flow):
The flushing reduces the shower flow rate by 21% to $0.42 \text{ L/s}$, causing temperature spikes.

---

### Electromagnetic Flowmeters
Based on Faraday’s law of induction: the voltage induced across a conductor moving through a magnetic field is proportional to its velocity.
- **Advantages:** Nonintrusive, no head loss, suitable for corrosive or slurry fluids (e.g., blood, liquid metals).
- **Requirement:** Fluid must be electrically conductive.

### Vortex Flowmeters
Based on periodic vortex shedding from a bluff body.
- **Strouhal number:** $St = fd/V$, remains constant over a wide range of $Re$.
- **Advantages:** No moving parts, reliable, but causes head loss due to obstruction.

### Thermal (Hot-Wire and Hot-Film) Anemometers
Measure instantaneous velocity by the cooling effect of flow on an electrically heated sensor.
- **King’s Law:** 
  $$ E^2 = a + b V^n \quad (8–75) $$
- **Use:** Studying fine details of turbulent fluctuations.

### Laser Doppler Velocimetry (LDV)
Optical technique using the Doppler shift of laser light scattered by seeding particles.
- **LDV Equation:** 
  $$ f = \frac{2V \sin(\alpha/2)}{\lambda} \quad (8–76) $$
- **Advantages:** Nonintrusive, high spatial resolution, no calibration required.

### Particle Image Velocimetry (PIV)
Captures whole-field velocity distributions by tracking particle displacements ($\Delta s$) over a short time ($\Delta t$).
- **Velocity:** $V = \Delta s / \Delta t$.

---

## CHAPTER 8 SUMMARY

**Reynolds Number:** $Re = \frac{\rho V_{avg} D}{\mu} = \frac{V_{avg} D}{\nu}$.
- Laminar: $Re < 2300$.
- Turbulent: $Re > 4000$.

**Laminar Flow:**
- Friction factor: $f = 64/Re \quad (8–23)$.
- Pressure drop: $\Delta P = \frac{32 \mu L V_{avg}}{D^2}$.

**Turbulent Flow:**
- Friction factor (Colebrook): $\frac{1}{\sqrt{f}} = -2.0 \log \left( \frac{\varepsilon/D}{3.7} + \frac{2.51}{Re \sqrt{f}} \right)$.

**Head Loss:**
- $h_L = f \frac{L}{D} \frac{V^2}{2g} \quad \text{(Major Loss)}$.
- $h_{L,minor} = K_L \frac{V^2}{2g} \quad \text{(Minor Loss)}$.
- Total Head Loss: $h_{L,total} = \sum f_i \frac{L_i}{D_i} \frac{V_i^2}{2g} + \sum K_{L,j} \frac{V_j^2}{2g}$.

**Piping Networks:**
- **Series:** $\dot{V}$ is constant, $h_L$ sums up.
- **Parallel:** $h_L$ is constant, $\dot{V}$ sums up.

**Pump Selection:** Operating point is the intersection of the **system curve** ($h_{pump,req} = \Delta z + h_L$) and the **pump characteristic curve**.

---

## CHAPTER 8: PROBLEMS

### Laminar and Turbulent Flow
**8–2C** What is the physical significance of the Reynolds number? How is it defined for (a) flow in a circular pipe of inner diameter $D$ and (b) flow in a rectangular duct of cross section $a \times b$?
**8–8C** What is hydraulic diameter? How is it defined? What is it equal to for a circular pipe of diameter $D$?
**8–9C** How is the hydrodynamic entry length defined for flow in a pipe? Is the entry length longer in laminar or turbulent flow?

### Fully Developed Flow in Pipes
**8–31** Water at $10^\circ\text{C}$ ($\rho = 999.7 \text{ kg/m}^3, \mu = 1.307 \times 10^{-3} \text{ kg/m·s}$) flows steadily in a $0.20\text{-cm}$-diameter, $15\text{-m}$-long pipe at $V_{avg} = 1.2 \text{ m/s}$. Determine (a) pressure drop, (b) head loss, (c) pumping power.
*Answers: (a) 188 kPa, (b) 19.2 m, (c) 0.71 W*

**8–35** The velocity profile in fully developed laminar flow ($R = 2 \text{ cm}$) is $u(r) = 4(1 - r^2/R^2)$. Determine average and maximum velocities and volume flow rate.
*Result: $u_{max} = 4 \text{ m/s}, V_{avg} = 2 \text{ m/s}$.*

**8–41** Air enters a $7\text{-m}$ rectangular duct ($15 \text{ cm} \times 20 \text{ cm}$) at $35^\circ\text{C}$ and $V = 7 \text{ m/s}$. Determine fan power needed.
*Answer: 4.9 W*

### Minor Losses
**8–51C** What is minor loss in pipe flow? How is the minor loss coefficient $K_L$ defined?
**8–61** A horizontal pipe has an abrupt expansion from $D_1 = 8 \text{ cm}$ to $D_2 = 16 \text{ cm}$. $V_1 = 10 \text{ m/s}, P_1 = 300 \text{ kPa}$. $\alpha = 1.06$. Determine $P_2$ and estimate error if Bernoulli was used.
*Answers: 321 kPa, 28 kPa error.*

### Piping Systems and Pump Selection
**8–82** Cast iron piping, parallel branches. Pipe A ($L=1000\text{ m}, D=30\text{ cm}$), Pipe B ($L=3000\text{ m}, D=30\text{ cm}$). If $\dot{V}_A = 0.4 \text{ m}^3\text{/s}$, find $\dot{V}_B$.
*Answer: 0.231 m³/s*

### Flow Rate and Velocity Measurements
**8–103** A Venturi meter ($D=5\text{ cm}, d=3\text{ cm}$) measures water flow. $\Delta P = 5 \text{ kPa}, C_d = 0.98$. Determine $\dot{V}$ and $V_{avg}$.
*Answers: 2.35 L/s and 1.20 m/s*

---

## 9–2 ■ CONSERVATION OF MASS—THE CONTINUITY EQUATION

To derive the differential form of the conservation of mass, we use two methods: the divergence theorem and an infinitezimal control volume.

### Derivation Using the Divergence Theorem
Applying the divergence theorem to the integral form of the conservation of mass:
$$ \int_{CV} \frac{\partial \rho}{\partial t} dV + \oint_{A} \rho \vec{V} \cdot \vec{n} dA = 0 \quad (9–1) $$
Using the divergence theorem $\oint_{A} \vec{G} \cdot \vec{n} dA = \int_{V} \vec{\nabla} \cdot \vec{G} dV$:
$$ \int_{CV} \left[ \frac{\partial \rho}{\partial t} + \vec{\nabla} \cdot (\rho \vec{V}) \right] dV = 0 \quad (9–4) $$
Since this must hold for any volume, the integrand must be zero:
$$ \text{Continuity equation: } \frac{\partial \rho}{\partial t} + \vec{\nabla} \cdot (\rho \vec{V}) = 0 \quad (9–5) $$

### Derivation Using an Infinitesimal Control Volume
Consider a small box of dimensions $dx, dy, dz$. Using Taylor series expansion for mass flow across faces (Fig. 9–5):
- **Rate of change of mass within CV:** $\frac{\partial \rho}{\partial t} dx dy dz$.
- **Net mass flow rate:** Sum of (Inflow - Outflow) across all six faces.
- **Result (Cartesian):**
  $$ \frac{\partial \rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0 \quad (9–8) $$

---

**EXAMPLE 9–1: Compression of an Air–Fuel Mixture**
Piston moves up at speed $V_P$ in a cylinder. $L = L_{bottom} - V_P t$. Density $\rho = \rho(t)$ is uniform.
**Analysis:** 
Assume linear velocity profile $v = -V_P \frac{y}{L}$.
Continuity equation (1D, compressible):
$$ \frac{\partial \rho}{\partial t} + \frac{\partial(\rho v)}{\partial y} = 0 \implies \frac{d\rho}{dt} + \rho \frac{\partial v}{\partial y} = 0 $$
$$ \frac{d\rho}{dt} + \rho \left( -\frac{V_P}{L} \right) = 0 \implies \frac{d\rho}{\rho} = \frac{V_P}{L} dt $$
Substituting $L(t)$ and integrating:
$$ \ln \frac{\rho(t)}{\rho(0)} = \ln \frac{L_{bottom}}{L_{bottom} - V_P t} \implies \rho(t) = \rho(0) \frac{L_{bottom}}{L} $$
*This confirms that density is inversely proportional to volume ($V \propto L$).*

---

### Alternative Form of the Continuity Equation
Using the material derivative $D/Dt = \partial/\partial t + (\vec{V} \cdot \vec{\nabla})$:
$$ \frac{1}{\rho} \frac{D\rho}{Dt} + \vec{\nabla} \cdot \vec{V} = 0 \quad (9–10) $$
For incompressible flow, $D\rho/Dt = 0$, thus $\vec{\nabla} \cdot \vec{V} = 0$.

### Continuity Equation in Cylindrical Coordinates
Using $(r, \theta, z)$ coordinates (Fig. 9–10):
$$ \frac{\partial \rho}{\partial t} + \frac{1}{r} \frac{\partial(r \rho u_r)}{\partial r} + \frac{1}{r} \frac{\partial(\rho u_\theta)}{\partial \theta} + \frac{\partial(\rho u_z)}{\partial z} = 0 \quad (9–12) $$
For **incompressible flow** in cylindrical coordinates:
$$ \frac{1}{r} \frac{\partial(r u_r)}{\partial r} + \frac{1}{r} \frac{\partial(u_\theta)}{\partial \theta} + \frac{\partial u_z}{\partial z} = 0 \quad (9–18) $$

---

**EXAMPLE 9–2: Design of a Compressible Converging Duct**
Linear velocity $u = u_1 + C_u x$ and linear density $\rho = \rho_1 + C_\rho x$.
**Analysis:** 2D steady continuity $\frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} = 0$.
Integrating with respect to $y$:
$$ \rho v = -\int \frac{\partial(\rho u)}{\partial x} dy = -[ \rho_1 C_u + u_1 C_\rho + 2 C_u C_\rho x ] y + f(x) $$
Boundary condition: $v=0$ at $y=0 \implies f(x)=0$.
$$ v = \frac{-(\rho_1 C_u + u_1 C_\rho)y - 2 C_u C_\rho xy}{\rho_1 + C_\rho x} $$

---

## 9–3 ■ THE STREAM FUNCTION

For 2D incompressible flow in $xy$-plane:
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 \quad (9–19) $$
Define $\psi(x, y)$ such that:
$$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} \quad (9–20) $$

**Streamlines:** Curves of constant $\psi$ represent streamlines because $d\psi = \frac{\partial \psi}{\partial x} dx + \frac{\partial \psi}{\partial y} dy = -v dx + u dy = 0$.

---

**EXAMPLE 9–8: Calculation of the Velocity Field from the Stream Function**
$\psi = ax^3 + by + cx$.
**Analysis:**
(a) $u = \frac{\partial \psi}{\partial y} = b$.
(b) $v = -\frac{\partial \psi}{\partial x} = -(3ax^2 + c)$.
Continuity check: $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 + 0 = 0$ (Satisfied).

---

**EXAMPLE 9–9: Calculation of Stream Function for a Known Velocity Field**
$u = ax + b$, $v = -ay + cx$.
**Analysis:**
1. $\frac{\partial \psi}{\partial y} = u = ax + b \implies \psi = axy + by + g(x)$.
2. $v = -\frac{\partial \psi}{\partial x} = -ay - g'(x)$.
3. Compare with given $v$: $-ay - g'(x) = -ay + cx \implies g'(x) = -cx$.
4. Integrate $g'(x)$: $g(x) = -\frac{1}{2}cx^2 + C$.
**Result:** $\psi = axy + by - \frac{1}{2}cx^2 + C$.

---

### Physical Significance of the Stream Function
The difference in the value of $\psi$ from one streamline to another is equal to the volume flow rate per unit width:
$$ \dot{V}/L = \int_{\psi_1}^{\psi_2} d\psi = \psi_2 - \psi_1 \quad (9–25) $$
- **Direction of flow:** The value of $\psi$ increases to the left of the direction of flow in the $xy$-plane (Fig. 9–23).

---

**EXAMPLE 9–11: Volume Flow Rate Deduced from Streamlines**
Water channel, $w = 2.0 \text{ m}$. Suction slot at bottom. Streamline $\psi_{wall} = 0$, $\psi_{dividing} = 1.0 \text{ m}^2\text{/s}$.
**Analysis:**
Volume flow rate per unit width: $\dot{V}/w = \psi_{dividing} - \psi_{wall} = 1.0 \text{ m}^2\text{/s}$.
Total volume flow rate: $\dot{V} = (1.0 \text{ m}^2\text{/s})(2.0 \text{ m}) = 2.0 \text{ m}^3\text{/s}$.
Fluid speed at point A (between $\psi_{1.8}$ and $\psi_{1.6}$ with distance $\delta = 0.21 \text{ m}$):
$$ V_A \cong \frac{1}{\delta}(\psi_{1.8} - \psi_{1.6}) = \frac{1.8 - 1.6}{0.21} = 0.95 \text{ m/s} $$

---

### The Stream Function in Cylindrical Coordinates
1. **Planar flow ($r, \theta$):**
   $$ u_r = \frac{1}{r} \frac{\partial \psi}{\partial \theta} \quad \text{and} \quad u_\theta = -\frac{\partial \psi}{\partial r} \quad (9–27) $$
2. **Axisymmetric flow ($r, z$):**
   $$ u_r = -\frac{1}{r} \frac{\partial \psi}{\partial z} \quad \text{and} \quad u_z = \frac{1}{r} \frac{\partial \psi}{\partial r} \quad (9–29) $$

---

## 9–4 ■ CONSERVATION OF LINEAR MOMENTUM—CAUCHY’S EQUATION

Newton’s second law for a differential element leads to **Cauchy’s equation**:
$$ \frac{\partial}{\partial t}(\rho \vec{V}) + \vec{\nabla} \cdot (\rho \vec{V}\vec{V}) = \rho \vec{g} + \vec{\nabla} \cdot \sigma_{ij} \quad (9–37) $$
where $\sigma_{ij}$ is the **stress tensor** (Fig. 9–28).

**Stress Tensor Components (Cartesian):**
- $\sigma_{xx}, \sigma_{yy}, \sigma_{zz}$: Normal stresses (pressure + viscous).
- $\sigma_{xy}, \sigma_{xz}, \sigma_{yz}$, etc.: Shear stresses.

**Differential form (x-momentum):**
$$ \frac{\partial(\rho u)}{\partial t} + \frac{\partial(\rho u u)}{\partial x} + \frac{\partial(\rho v u)}{\partial y} + \frac{\partial(\rho w u)}{\partial z} = \rho g_x + \frac{\partial \sigma_{xx}}{\partial x} + \frac{\partial \sigma_{yx}}{\partial y} + \frac{\partial \sigma_{zx}}{\partial z} \quad (9–43) $$
Similar equations exist for $y$ and $z$ directions.
*Cauchy’s equation is valid for any fluid (Newtonian or non-Newtonian).*

---

### Alternative Form of Cauchy’s Equation
Recognizing the material acceleration $D\vec{V}/Dt$:
$$ \rho \frac{D\vec{V}}{Dt} = \rho \vec{g} + \vec{\nabla} \cdot \sigma_{ij} \quad (9–50) $$

---

## 9–5 ■ THE NAVIER–STOKES EQUATION

Cauchy’s equation has 10 unknowns (density, pressure, 3 velocity components, and 6 independent stress components). To solve it, we need **constitutive equations** that relate stress to velocity.

### Newtonian versus Non-Newtonian Fluids
- **Newtonian fluids:** Shear stress is linearly proportional to strain rate (e.g., water, air).
- **Non-Newtonian fluids:** Non-linear relationship (e.g., paint, blood, quicksand).
  - *Shear thinning:* Viscosity decreases with shear (paint).
  - *Shear thickening (Dilatant):* Viscosity increases with shear (quicksand - Fig. 9–38).

### Derivation for Incompressible, Isothermal Flow
For Newtonian fluids with constant $\rho$ and $\mu$, the viscous stress tensor is:
$$ \tau_{ij} = 2 \mu \varepsilon_{ij} \quad (9–55) $$
Substituting this into Cauchy’s equation yields the **Navier–Stokes equation**:
$$ \rho \frac{D\vec{V}}{Dt} = -\vec{\nabla} P + \rho \vec{g} + \mu \nabla^2 \vec{V} \quad (9–60) $$

**Cartesian Components ($x, y, z$):**
Example ($x$-component):
$$ \rho \left( \frac{\partial u}{\partial t} + u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} + w \frac{\partial u}{\partial z} \right) = -\frac{\partial P}{\partial x} + \rho g_x + \mu \left( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2} \right) $$

**Cylindrical Components ($r, \theta, z$):**
Includes terms like $u_\theta^2/r$ (centripetal acceleration) and $u_r/r^2$ (Fig. 9–42).

---

## 9–6 ■ DIFFERENTIAL ANALYSIS OF FLUID FLOW PROBLEMS

We apply the continuity and Navier–Stokes equations to solve for:
1. Pressure field for a known velocity field.
2. Both velocity and pressure fields for known boundary conditions.

**Crucial Point:** In incompressible flow, the velocity field is affected only by **pressure differences**, not the absolute magnitude of pressure (Fig. 9–45).

---

**EXAMPLE 9–13: Calculating the Pressure Field in Cartesian Coordinates**
Given $u = ax + b$ and $v = -ay + cx$. Find $P(x, y)$.
**Analysis:**
1. Check continuity: $\partial u/\partial x + \partial v/\partial y = a - a = 0$ (OK).
2. Substitute into N-S equations (ignoring gravity):
   $x$-mom: $\partial P/\partial x = \rho(-a^2x - ab)$.
   $y$-mom: $\partial P/\partial y = \rho(-bc - a^2y)$.
3. Integrate $y$-mom: $P(x, y) = \rho(-bcy - \frac{a^2y^2}{2}) + g(x)$.
4. Differentiate with respect to $x$ and equate to $x$-mom:
   $\partial P/\partial x = g'(x) = \rho(-a^2x - ab) \implies g(x) = \rho(-\frac{a^2x^2}{2} - abx) + C_1$.
**Result:**
$$ P(x, y) = \rho \left( -\frac{a^2x^2}{2} - \frac{a^2y^2}{2} - abx - bcy \right) + C_1 $$
*The arbitrary constant $C_1$ requires a pressure boundary condition.*

---

---

**EXAMPLE 9–14: Calculating the Pressure Field in Cylindrical Coordinates**
Consider a line vortex ($u_r = 0, u_\theta = K/r$). Find $P(r, \theta)$.
**Analysis:** 
From $\theta$-momentum: $\partial P / \partial \theta = 0 \implies P = P(r)$.
From $r$-momentum: 
$$ \frac{\partial P}{\partial r} = \rho \frac{u_\theta^2}{r} = \rho \frac{K^2}{r^3} \quad (2) $$
Integrating with respect to $r$:
$$ P(r) = \int \rho \frac{K^2}{r^3} dr = -\frac{1}{2} \rho \frac{K^2}{r^2} + C $$
As $r \to \infty, P \to P_\infty \implies C = P_\infty$.
**Result:** $P = P_\infty - \frac{1}{2} \rho \frac{K^2}{r^2} \quad (8)$.
*Tornado model: Pressure is lowest at the center ($r=0$).*

---

## Exact Solutions of the Continuity and Navier–Stokes Equations

Solving the full N-S equations is difficult due to nonlinearity. We use a 6-step procedure (Fig. 9–50) to find exact solutions for simple, laminar, 2D, fully developed flows.

### Boundary Conditions
1. **No-slip condition:** $\vec{V}_{fluid} = \vec{V}_{wall} \quad (9–65)$.
2. **Interface conditions:** $\vec{V}_A = \vec{V}_B$ and $\tau_{s,A} = \tau_{s,B}$.
3. **Free-surface conditions:** $P_{liquid} = P_{gas}$ and $\tau_{s,liquid} \cong 0$ (if gas is air).
4. **Symmetry plane:** $\partial u / \partial y = 0, v = 0$ (Fig. 9–54).

---

**EXAMPLE 9–15: Fully Developed Couette Flow**
Fluid between two infinite plates, top plate moving at $V$, bottom fixed. No pressure gradient.
**Assumptions:** Steady, incompressible, laminar, 2D ($w=0$), fully developed ($\partial u / \partial x = 0$).
**Analysis:**
1. Continuity: $\partial u / \partial x = 0 \implies u = u(y)$.
2. $x$-momentum: $\mu \frac{d^2u}{dy^2} = 0 \implies u(y) = C_1 y + C_2$.
3. BCs: $u(0) = 0 \implies C_2 = 0$. $u(h) = V \implies C_1 = V/h$.
**Result:** $u = V \frac{y}{h} \quad \text{(Linear profile)}$.
**Shear stress:** $\tau_{yx} = \mu \frac{du}{dy} = \mu \frac{V}{h}$ (Constant everywhere).

---

**EXAMPLE 9–16: Couette Flow with an Applied Pressure Gradient**
Same as Ex 9–15 but with constant $\partial P / \partial x$.
**Analysis:**
$x$-momentum: $\mu \frac{d^2u}{dy^2} = \frac{\partial P}{\partial x} \implies \frac{d^2u}{dy^2} = \frac{1}{\mu} \frac{\partial P}{\partial x}$.
Integrating twice:
$$ u(y) = \frac{1}{2\mu} \left( \frac{\partial P}{\partial x} \right) y^2 + C_1 y + C_2 $$
**Pressure field:** $P = P_0 + \left( \frac{\partial P}{\partial x} \right) x - \rho g z \quad (8)$.
*Note: Includes hydrostatic distribution in the $z$-direction.*

---

---

**EXAMPLE 9–16 (Continued): Dimensionless Couette Flow**
The velocity field is a superposition of a linear and a parabolic profile:
$$ u = \frac{Vy}{h} + \frac{1}{2\mu} \frac{\partial P}{\partial x} (y^2 - hy) \quad (9) $$
Using dimensionless groups $u^* = u/V, y^* = y/h, P^* = \frac{h^2}{\mu V} \frac{\partial P}{\partial x}$:
$$ u^* = y^* + \frac{1}{2} P^* y^* (y^* - 1) \quad (11) $$
- If $P^* > 0$, reverse flow can occur near the bottom wall.

---

**EXAMPLE 9–17: Oil Film Flowing Down a Vertical Wall by Gravity**
Steady, incompressible, laminar flow of thickness $h$ falling by gravity.
**Analysis:**
1. Continuity: $\partial w / \partial z = 0 \implies w = w(x)$ only.
2. $z$-momentum: $0 = -\partial P / \partial z + \rho g_z + \mu \frac{d^2w}{dx^2}$.
3. Pressure: $P$ is hydrostatic ($\partial P / \partial z = 0$ since it's open to atmosphere).
4. Equation: $\mu \frac{d^2w}{dx^2} = -\rho g \implies \frac{d^2w}{dx^2} = -\frac{\rho g}{\mu}$.
5. BCs: $w(0) = 0$ (no-slip), $dw/dx|_{x=h} = 0$ (free surface).
**Result:** $w = \frac{\rho g x}{2\mu} (x - 2h) \quad (5)$.
**Normalized:** $w^* = \frac{x^*}{2} (x^* - 2)$ where $w^* = w\mu / (\rho g h^2)$ (Fig. 9–68).

---

**EXAMPLE 9–18: Fully Developed Flow in a Round Pipe—Poiseuille Flow**
Laminar flow in a pipe of radius $R$ due to $\partial P / \partial x = \text{const}$.
**Analysis:**
Cylindrical coordinates $(r, \theta, x)$. Axial momentum:
$$ \frac{1}{r} \frac{d}{dr} \left( r \frac{du}{dr} \right) = \frac{1}{\mu} \frac{\partial P}{\partial x} $$
Integrating twice and applying BCs ($u(R)=0, du/dr|_{r=0}=0$):
**Result:** $u(r) = \frac{1}{4\mu} \left( \frac{\partial P}{\partial x} \right) (r^2 - R^2) \quad (9)$.
- Maximum velocity (at $r=0$): $u_{max} = -\frac{R^2}{4\mu} \frac{\partial P}{\partial x}$.
- Average velocity: $V = u_{max} / 2$.

---

**EXAMPLE 9–19: Sudden Motion of an Infinite Flat Plate**
Plate at $z=0$ starts moving at $t=0$ with speed $V$.
**Analysis:**
Unsteady 1-D diffusion equation:
$$ \frac{\partial u}{\partial t} = \nu \frac{\partial^2 u}{\partial z^2} \quad (7) $$
Boundary conditions: $u(z, 0) = 0$, $u(0, t) = V$, $u(\infty, t) = 0$.
Similarity solution using the **error function**:
$$ u = V \left[ 1 - \text{erf} \left( \frac{z}{2\sqrt{\nu t}} \right) \right] \quad (12) $$
where $\text{erf}(\xi) = \frac{2}{\sqrt{\pi}} \int_0^\xi e^{-\eta^2} d\eta$.
- For $z^* = \frac{z}{2\sqrt{\nu t}} > 2$, the effect of the plate is negligible ($u/V < 0.005$).
- This is a **similarity profile** (Fig. 9–78).

---
