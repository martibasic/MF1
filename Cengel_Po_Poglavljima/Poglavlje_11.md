# CHAPTER 11: EXTERNAL FLOW: DRAG AND LIFT

Fluid flow over solid bodies is responsible for phenomena like drag on cars, lift on wings, and wind turbine power (Fig. 11–1).

## 11–1 ■ INTRODUCTION
- **Free-stream velocity ($V$):** Velocity of the fluid approaching the body (also denoted as $u_\infty$ or $U_\infty$).
- **2D Flow:** Long body, constant cross-section (e.g., long pipe in wind).
- **Axisymmetric Flow:** Rotational symmetry about an axis (e.g., bullet).
- **3D Flow:** Complex geometries (e.g., car).
- **Streamlined vs. Bluff:** Streamlined bodies (airplanes) align with flow; bluff bodies (buildings) block flow.

---

## 11–2 ■ DRAG AND LIFT

A fluid exerts pressure forces (normal) and shear forces (tangential) on a body.
- **Drag ($F_D$):** Force component in the flow direction.
- **Lift ($F_L$):** Force component normal to the flow direction.

### Differential Forces (Fig. 11–5)
On a differential area $dA$ with outer normal angle $\theta$:
$$ dF_D = -P dA \cos \theta + \tau_w dA \sin \theta \quad (11–1) $$
$$ dF_L = -P dA \sin \theta - \tau_w dA \cos \theta \quad (11–2) $$

### Total Forces
$$ F_D = \int_A dF_D = \int_A (-P \cos \theta + \tau_w \sin \theta) dA \quad (11–3) $$
$$ F_L = \int_A dF_L = -\int_A (P \sin \theta + \tau_w \cos \theta) dA \quad (11–4) $$
*Note: In computer simulations (CFD), these integrals are evaluated directly.*

---

# CHAPTER 11: EXTERNAL FLOW: DRAG AND LIFT

External flow involves fluid motion over bodies such as cars, airplanes, and birds. Viscous effects are confined to thin boundary layers and wakes.

## 11–2 ■ DRAG AND LIFT

**Drag ($F_D$):** The force component in the flow direction.
**Lift ($F_L$):** The force component normal to the flow direction.

### Drag and Lift Coefficients
Instead of forces, we use dimensionless coefficients:
$$ C_D = \frac{F_D}{\frac{1}{2}\rho V^2 A} \quad (11–5) $$
$$ C_L = \frac{F_L}{\frac{1}{2}\rho V^2 A} \quad (11–6) $$
where $A$ is the **frontal area** (for drag) or **planform area** (for lift of airfoils).

---

**EXAMPLE 11–1: Measuring the Drag Coefficient of a Car**
Car in wind tunnel, $A = 22.26 \text{ ft}^2, V = 60 \text{ mph} = 88 \text{ ft/s}$. Measured $F_D = 68 \text{ lbf}$. Air $\rho = 0.07489 \text{ lbm/ft}^3$.
**Analysis:**
$$ C_D = \frac{2 F_D}{\rho A V^2} = \frac{2(68 \text{ lbf})}{(0.07489)(22.26)(88)^2} \times (32.2 \text{ lbm·ft/s}^2 / 1 \text{ lbf}) = 0.34 $$

---

## 11–3 ■ FRICTION AND PRESSURE DRAG

**Friction Drag ($F_{D,friction}$):** Due to wall shear stress $\tau_w$. Dominant for streamlined bodies.
**Pressure Drag ($F_{D,pressure}$):** Due to pressure difference between front and back. Dominant for bluff bodies.
- **Total Drag:** $C_D = C_{D,friction} + C_{D,pressure} \quad (11–10)$.

### Streamlining
Streamlining reduces pressure drag by delaying boundary layer separation, but increases friction drag due to larger surface area (Fig. 11–11).
- **Optimal shape:** For a streamlined strut, minimum drag occurs at $D/L \cong 0.25$.

### Flow Separation
Occurs in regions of adverse pressure gradient.
- **Wake:** The low-pressure region trailing the body. Larger wakes mean higher pressure drag.
- **Stall:** Occurs on airfoils at high angles of attack when the flow separates completely from the top surface, losing lift and increasing drag (Fig. 11–16).

---

## 11–4 ■ DRAG COEFFICIENTS OF COMMON GEOMETRIES

### Creeping Flow ($Re \ll 1$)
For a sphere, inertia is negligible, and drag is proportional to $\mu, V, D$:
$$ C_D = \frac{24}{Re} \implies F_D = 3\pi \mu V D \quad \text{(Stokes Law)} $$

### TABLE 11–1: Drag Coefficients ($Re > 10^4$) for 2D bodies
| Geometry | Orientation | $C_D$ |
| :--- | :--- | :--- |
| Square rod | Sharp corners | 2.2 |
| Square rod | Round corners ($r/D=0.2$) | 1.2 |
| Circular rod | Laminar | 1.2 |
| Circular rod | Turbulent | 0.3 |

### TABLE 11–2: Drag Coefficients ($Re > 10^4$) for 3D bodies
| Geometry | $C_D$ |
| :--- | :--- |
| Cube | 1.05 |
| Sphere | 0.5 (Laminar), 0.2 (Turbulent) |
| Hemisphere | 0.4 (Round front), 1.2 (Flat front) |
| Thin disk | 1.1 |

---

## Drag Coefficients of Vehicles
- **Typical values:** Semitrailers ($C_D \approx 1.0$), minivans ($0.4$), passenger cars ($0.3$).
- **Drafting:** Reducing drag by following closely behind another vehicle (e.g., racing cyclists reduce $C_D$ from $0.9$ to $0.5$).
- **Fuel Economy:** As a rule of thumb, fuel savings percentage $\approx 0.5 \times$ drag reduction percentage.

**EXAMPLE 11–2: Effect of Mirror Design on Fuel Consumption**
Flat mirror ($D = 13\text{ cm}$) replaced by hemispherical mirror. Car driven $24,000 \text{ km/yr}$ at $95 \text{ km/h}$. Fuel price $\$0.60/L$.
**Analysis:**
$C_{D,flat} = 1.1, C_{D,hemisp} = 0.4$.
Drag force reduction ratio: $(1.1 - 0.4)/1.1 = 0.636$.
Annual fuel saving for one mirror: $8.84 \text{ L/yr}$.
Total cost saving (2 mirrors): $>\$10 \text{ per year}$.

---

## 11–5 ■ PARALLEL FLOW OVER FLAT PLATES

For flow parallel to a thin flat plate, pressure drag is zero ($C_{D,pressure} = 0$).
$$ C_D = C_{D,friction} = C_f \quad (11–13) $$

### Friction Coefficients (Table 11–4 revisited)
**Laminar ($Re_x < 5 \times 10^5$):**
- Local: $C_{f,x} = \frac{0.664}{\sqrt{Re_x}}$
- Average: $C_f = \frac{1.328}{\sqrt{Re_L}} \quad (11–19)$

**Turbulent ($5 \times 10^5 \leq Re_x \leq 10^7$):**
- Local: $C_{f,x} = \frac{0.059}{(Re_x)^{1/5}} \quad (11–18)$
- Average: $C_f = \frac{0.074}{(Re_L)^{1/5}} \quad (11–20)$

**Combined (Transition at $Re_{cr} = 5 \times 10^5$):**
$$ C_f = \frac{0.074}{(Re_L)^{1/5}} - \frac{1742}{Re_L} \quad (11–22) $$

---

**EXAMPLE 11–3: Flow of Hot Oil over a Flat Plate**
Oil at $40^\circ\text{C}, V = 2\text{ m/s}, L = 5\text{ m}$. $\rho = 876 \text{ kg/m}^3, \nu = 2.485 \times 10^{-4} \text{ m}^2\text{/s}$.
**Analysis:**
$Re_L = VL/\nu = 4.024 \times 10^4 < 5 \times 10^5$ (Laminar).
$C_f = 1.328 / \sqrt{Re_L} = 0.00662$.
$F_D = C_f A \frac{\rho V^2}{2} = 0.00662(5 \times 1 \text{ m}^2) \frac{(876)(2^2)}{2} = 58.0 \text{ N per unit width}$.

---

## 11–6 ■ FLOW OVER CYLINDERS AND SPHERES

- **Characteristic length:** External diameter $D$.
- **Critical Reynolds number:** $Re_{cr} \cong 2 \times 10^5$.
- **Creeping Flow ($Re \leq 1$):** For a sphere $C_D = 24/Re$. No separation.
- **Wake:** At higher $V$, the boundary layer detaches, forming a separation region (wake) with low pressure, causing high pressure drag (Fig. 11–33).

---

### Flow over Cylinders and Spheres (Continued)
- **Drag Crisis:** A sudden drop in $C_D$ (from $\approx 0.5$ to $0.2$ for a sphere) at $Re \cong 2 \times 10^5$ due to the boundary layer becoming turbulent.
- **Separation Angle:** $\theta \approx 80^\circ$ (laminar) vs. $\theta \approx 140^\circ$ (turbulent).
- **Roughness Benefit:** Roughening a sphere (e.g., golf ball dimples) can reduce drag by up to 5 times by inducing turbulence earlier, narrowing the wake (Fig. 11–36).

---

**EXAMPLE 11–4: Drag Force Acting on a Pipe in a River**
Pipe $D = 2.2 \text{ cm}, L = 30 \text{ m}$ submerged in water at $15^\circ\text{C}$ ($\mu = 1.138 \times 10^{-3} \text{ Pa·s}$), $V = 4 \text{ m/s}$.
**Analysis:**
$Re = \rho V D / \mu = 7.73 \times 10^4$.
From Fig. 11–34, $C_D \cong 1.0$.
$$ F_D = C_D A \frac{\rho V^2}{2} = 1.0(30 \times 0.022) \frac{(999.1)(4^2)}{2} = 5275 \text{ N} \cong 5300 \text{ N} $$
*This force is equivalent to $\approx 500 \text{ kg}$ weight.*

---

## 11–7 ■ LIFT

**Lift Coefficient ($C_L$):**
$$ C_L = \frac{F_L}{\frac{1}{2}\rho V^2 A} \quad \text{where } A = \text{planform area } (bc) $$

### Aerodynamics of Airfoils
- **Lift generation:** Higher velocity on the upper surface results in lower pressure (Bernoulli).
- **Stall:** At high angle of attack ($\alpha > 15^\circ$), flow separates from the top, $C_L$ drops sharply, and $C_D$ increases exponentially (Fig. 11–50, 11–51).
- **Flaps:** Increase $C_{L,max}$ for takeoff/landing (up to 3.5 with double-slotted flaps - Fig. 11–45).

### Aspect Ratio ($AR$)
$$ AR = \frac{b^2}{A} = \frac{b}{c} \quad (11–25) $$
- High $AR$ (long, narrow wings) reduce **induced drag** caused by **tip vortices** (Fig. 11–47).

### Magnus Effect
Lift produced by the rotation of a solid body (e.g., spinning tennis ball).
- Rotation drags fluid due to no-slip, shifting stagnation points and creating pressure asymmetry (Fig. 11–52).

---

**EXAMPLE 11–5: Lift and Drag of a Commercial Airplane**
Airplane $m = 70,000 \text{ kg}, A = 150 \text{ m}^2$. Cruising at $12,000 \text{ m}$ ($\rho = 0.312 \text{ kg/m}^3$) at $V = 558 \text{ km/h} = 155 \text{ m/s}$.
**Analysis:**
(a) Weight $W = mg = 686,700 \text{ N}$.
Minimum speed $V_{min} = \sqrt{\frac{2W}{\rho C_{L,max} A}}$.
- Without flaps ($C_{L,max}=1.52$): $V_{min} = 70.9 \text{ m/s} = 255 \text{ km/h}$. Safe ($1.2 V_{min}$): $306 \text{ km/h}$.
- With flaps ($C_{L,max}=3.48$): $V_{min} = 46.8 \text{ m/s} = 168 \text{ km/h}$. Safe ($1.2 V_{min}$): $202 \text{ km/h}$.
(b) At cruise, $F_L = W \implies C_L = 1.22 \implies \alpha \cong 10^\circ$.
(c) Drag $F_D = C_D A \frac{\rho V^2}{2} = (0.03)(150) \frac{(0.312)(155^2)}{2} = 16.9 \text{ kN}$.
Power $= F_D V = (16.9 \text{ kN})(155 \text{ m/s}) = 2620 \text{ kW}$.

---

**EXAMPLE 11–6: Effect of Spin on a Tennis Ball**
$m = 0.125 \text{ lbm}, D = 2.52 \text{ in}$. Hit at $45 \text{ mph}$ with $4800 \text{ rpm}$ backspin.
**Analysis:**
$\omega = 502 \text{ rad/s}, V = 66 \text{ ft/s}$. $\omega D / 2V = 0.80 \implies C_L = 0.21$.
Lift $F_L = C_L A \frac{\rho V^2}{2} = 0.036 \text{ lbf}$.
Weight $W = 0.125 \text{ lbf}$.
**Result:** $W > F_L$, the ball will drop with a net force of $0.089 \text{ lbf}$.

---

## CHAPTER 11 SUMMARY

**Drag ($F_D$) and Lift ($F_L$):**
$$ F_D = C_D A \frac{\rho V^2}{2}, \quad F_L = C_L A \frac{\rho V^2}{2} $$
- $A$ is frontal area for drag, planform area for airfoils.

**Flat Plate Friction:**
- Laminar: $C_f = 1.33 / Re_L^{0.5} \quad (Re_L < 5 \times 10^5)$.
- Turbulent: $C_f = 0.074 / Re_L^{0.2} \quad (5 \times 10^5 < Re_L < 10^7)$.

**Airfoil Characteristics:**
- **Stall:** Loss of lift at high angle of attack due to separation.
- **Induced Drag:** Due to tip vortices, reduced by high aspect ratio ($AR = b/c$).

---

## CHAPTER 11: PROBLEMS

**11–21** Car in wind tunnel ($1.4 \text{ m} \times 1.65 \text{ m}$), $V = 90 \text{ km/h}$, $F_D = 300 \text{ N}$. Find $C_D$.
*Answer: 0.35*

**11–30** Cylindrical tank ($D=0.5\text{ m}, L=2\text{ m}$) on RV at $95\text{ km/h}$. Power needed for (a) frontal face, (b) side face.
*Answers: (a) 1.67 kW, (b) 7.55 kW*

**11–49** Wind at $55 \text{ km/h}$ over $4 \text{ m} \times 10 \text{ m}$ house wall. Find friction drag.
*Answers: 16 N at 55 km/h, 58 N at 110 km/h.*

---
