# CHAPTER 10: APPROXIMATE SOLUTIONS OF THE NAVIER–STOKES EQUATION

In this chapter, we look at several approximations that eliminate terms, reducing the Navier–Stokes equation to a simplified form. These approximations are often appropriate only in certain regions of the flow field (Fig. 10–2).

## 10–1 ■ INTRODUCTION

The Navier–Stokes equation is a model of fluid flow with inherent approximations (Newtonian fluid, constant properties).
- **Exact solutions:** Start with the full N-S equation and eliminate terms based on specific geometry/assumptions.
- **Approximate solutions:** Simplify the N-S equation a priori depending on the class of problem (e.g., fluid statics where velocity terms are neglected).

---

## 10–2 ■ NONDIMENSIONALIZED EQUATIONS OF MOTION

To compare the orders of magnitude of various terms, we nondimensionalize the equations.

### TABLE 10–1: Scaling parameters for nondimensionalization
| Scaling Parameter | Description | Primary Dimensions |
| :--- | :--- | :--- |
| $L$ | Characteristic length | $\{L\}$ |
| $V$ | Characteristic speed | $\{Lt^{-1}\}$ |
| $f$ | Characteristic frequency | $\{t^{-1}\}$ |
| $P_0 - P_\infty$ | Reference pressure difference | $\{mL^{-1}t^{-2}\}$ |
| $g$ | Gravitational acceleration | $\{Lt^{-2}\}$ |

### Nondimensional Variables
$$ t^* = ft, \quad \vec{x}^* = \frac{\vec{x}}{L}, \quad \vec{V}^* = \frac{\vec{V}}{V}, \quad P^* = \frac{P - P_\infty}{P_0 - P_\infty}, \quad \vec{g}^* = \frac{\vec{g}}{g} \quad (10–3) $$
$$ \vec{\nabla}^* = L\vec{\nabla}, \quad \nabla^{*2} = L^2 \nabla^2 \quad (Fig. 10–3) $$

### Nondimensional Continuity Equation
$$ \vec{\nabla}^* \cdot \vec{V}^* = 0 \quad (10–4) $$

### Nondimensional Navier–Stokes Equation
Multiplying by $L/(\rho V^2)$ yields:
$$ \left[ \frac{fL}{V} \right] \frac{\partial \vec{V}^*}{\partial t^*} + (\vec{V}^* \cdot \vec{\nabla}^*) \vec{V}^* = -\left[ \frac{P_0 - P_\infty}{\rho V^2} \right] \vec{\nabla}^* P^* + \left[ \frac{gL}{V^2} \right] \vec{g}^* + \left[ \frac{\mu}{\rho VL} \right] \nabla^{*2} \vec{V}^* \quad (10–5) $$

**Dimensionless Groups:**
- **Strouhal number:** $St = \frac{fL}{V}$
- **Euler number:** $Eu = \frac{P_0 - P_\infty}{\rho V^2}$
- **Froude number:** $Fr = \frac{V}{\sqrt{gL}}$
- **Reynolds number:** $Re = \frac{\rho VL}{\mu}$

---

### Modified Pressure ($P'$)
To simplify calculations in flows without free surfaces, we combine pressure and gravity:
$$ P' = P + \rho g z \quad (10–7) $$
The Navier–Stokes equation becomes:
$$ \rho \frac{D\vec{V}}{Dt} = -\vec{\nabla} P' + \mu \nabla^2 \vec{V} \quad (10–8) $$

---

## 10–3 ■ THE CREEPING FLOW APPROXIMATION

Creeping flow (or **Stokes flow**) occurs when $Re \ll 1$ (e.g., flow of honey, motion of bacteria - Fig. 10–7).
**Approximate N-S equation for creeping flow:**
$$ \vec{\nabla} P \cong \mu \nabla^2 \vec{V} \quad (10–11) $$
- **Inertial terms disappear:** Gliding is impossible (Fig. 10–10).
- **Density disappears:** Drag is independent of $\rho$.

**Drag on a Sphere:**
$$ F_D = 3\pi \mu V D \quad (10–12) $$

---

**EXAMPLE 10–2: Terminal Velocity of a Particle from a Volcano**
Spherical ash particle ($D = 50 \ \mu\text{m}, \rho_p = 1240 \text{ kg/m}^3$). Air at $-50^\circ\text{C}$ ($\rho_a = 0.8588 \text{ kg/m}^3, \mu = 1.474 \times 10^{-5} \text{ Pa·s}$).
**Analysis:**
Weight balances drag and buoyancy: $W = F_D + F_{buoyancy}$.
$$ \frac{\pi D^3}{6} \rho_p g = 3\pi \mu V D + \frac{\pi D^3}{6} \rho_a g $$
Solving for terminal velocity $V$:
$$ V = \frac{D^2 (\rho_p - \rho_a) g}{18\mu} = \frac{(50 \times 10^{-6})^2 (1240 - 0.8588)(9.81)}{18(1.474 \times 10^{-5})} = 0.115 \text{ m/s} $$
$Re = \rho_a V D / \mu = 0.335 < 1$ (Creeping flow assumption is valid).

---

## 10–4 ■ APPROXIMATION FOR INVISCID REGIONS OF FLOW

In high $Re$ regions far from walls (boundary layers) and wakes, net viscous forces are negligible.
**Euler Equation:**
$$ \rho \left[ \frac{\partial \vec{V}}{\partial t} + (\vec{V} \cdot \vec{\nabla})\vec{V} \right] = -\vec{\nabla} P + \rho \vec{g} \quad (10–13) $$

### Derivation of the Bernoulli Equation
Using the vector identity $(\vec{V} \cdot \vec{\nabla})\vec{V} = \vec{\nabla}(V^2/2) - \vec{V} \times \vec{\zeta}$, the steady Euler equation becomes:
$$ \vec{\nabla} \left( \frac{P}{\rho} + \frac{V^2}{2} + gz \right) = \vec{V} \times \vec{\zeta} \quad (10–17) $$
Along a streamline, the left side must be zero:
$$ \frac{P}{\rho} + \frac{V^2}{2} + gz = C = \text{constant along streamlines} \quad (10–18) $$

---

**EXAMPLE 10–3: Pressure Field in Solid Body Rotation**
Fluid rotates at $\omega$. $u_r = 0, u_\theta = \omega r, u_z = 0$.
**Analysis:**
Using Euler equation in $r$-direction:
$$ \frac{\partial P'}{\partial r} = \rho \frac{u_\theta^2}{r} = \rho \omega^2 r $$
Integrating: $P' = \rho \frac{\omega^2 r^2}{2} + B_1$.
At origin ($r=0, z=0$), $P = P_0 \implies B_1 = P_0$.
**Result:** $P = \rho \frac{\omega^2 r^2}{2} + P_0 - \rho g z \quad (5)$.
*Pressure distribution is parabolic with respect to radius (Fig. 10–21).*

---

## 10–5 ■ THE IRROTATIONAL FLOW APPROXIMATION

In regions where fluid particles have no net rotation, the flow is called **irrotational**.
**Irrotational approximation:**
$$ \vec{\zeta} = \vec{\nabla} \times \vec{V} \cong 0 \quad (10–19) $$

### Velocity Potential Function ($\phi$)
From vector identity $\vec{\nabla} \times \vec{\nabla} \phi = 0$, if a flow is irrotational, there exists a function $\phi$ such that:
$$ \vec{V} = \vec{\nabla} \phi \quad (10–21) $$
Substituting this into the incompressible continuity equation $\vec{\nabla} \cdot \vec{V} = 0$ yields the **Laplace equation**:
$$ \nabla^2 \phi = 0 \quad (10–24) $$

### Planar Irrotational Regions of Flow
In 2D planar flow, both $\phi$ and the stream function $\psi$ satisfy the Laplace equation:
$$ \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} = 0 \quad \text{and} \quad \frac{\partial^2 \psi}{\partial x^2} + \frac{\partial^2 \psi}{\partial y^2} = 0 $$
- **Mutual Orthogonality:** Streamlines and equipotential lines intersect at $90^\circ$ (Fig. 10–35).

### TABLE 10–2: Velocity components for 2D irrotational flow
| Coordinate System | Velocity Component 1 | Velocity Component 2 |
| :--- | :--- | :--- |
| Planar; Cartesian | $u = \frac{\partial \phi}{\partial x} = \frac{\partial \psi}{\partial y}$ | $v = \frac{\partial \phi}{\partial y} = -\frac{\partial \psi}{\partial x}$ |
| Planar; Cylindrical | $u_r = \frac{\partial \phi}{\partial r} = \frac{1}{r} \frac{\partial \psi}{\partial \theta}$ | $u_\theta = \frac{1}{r} \frac{\partial \phi}{\partial \theta} = -\frac{\partial \psi}{\partial r}$ |
| Axisymmetric | $u_r = \frac{\partial \phi}{\partial r} = -\frac{1}{r} \frac{\partial \psi}{\partial z}$ | $u_z = \frac{\partial \phi}{\partial z} = \frac{1}{r} \frac{\partial \psi}{\partial r}$ |

---

## Superposition in Irrotational Regions of Flow
Since the Laplace equation is linear, any linear combination of solutions is also a solution:
$$ \phi = \phi_1 + \phi_2 + \dots $$
$$ \vec{V} = \vec{V}_1 + \vec{V}_2 + \dots \quad (10–35) $$

---

**EXAMPLE 10–4: A Two-Region Model of a Tornado**
- Inner region ($r < R$): Solid body rotation (Rotational but inviscid). $u_\theta = \omega r$.
- Outer region ($r > R$): Irrotational flow. $u_\theta = \omega R^2 / r$.
**Analysis:**
1. Inner Pressure: $P = P_\infty - \rho \omega^2 R^2 + \frac{1}{2} \rho \omega^2 r^2$.
2. Outer Pressure (Bernoulli): $P = P_\infty - \frac{1}{2} \rho u_\theta^2 = P_\infty - \frac{\rho \omega^2 R^4}{2r^2}$.
**Result:** Pressure is continuous at $r=R$ but has a slope discontinuity (Fig. 10–30). The lowest pressure is at the center: $P_0 = P_\infty - \rho \omega^2 R^2$.

---

### Building Block 1—Uniform Stream
- **Cartesian:** $\phi = Vx, \quad \psi = Vy \quad (10–36, 10–37)$
- **Cylindrical:** $\phi = Vr \cos \theta, \quad \psi = Vr \sin \theta \quad (10–40)$
- **Inclined at angle $\alpha$:** $\phi = V(x \cos \alpha + y \sin \alpha), \quad \psi = V(y \cos \alpha - x \sin \alpha)$.

### Building Block 2—Line Source or Line Sink
Strength $m = \dot{V}/L$ (positive for source, negative for sink).
- **Velocity:** $u_r = \frac{m}{2\pi r}, \quad u_\theta = 0$.
- **Potential/Stream:** $\phi = \frac{m}{2\pi} \ln r, \quad \psi = \frac{m}{2\pi} \theta \quad (10–43)$.

### Building Block 3—Line Vortex
Strength $\Gamma$ (Circulation).
- **Velocity:** $u_r = 0, \quad u_\theta = \frac{\Gamma}{2\pi r} \quad (10–45)$.
- **Potential/Stream:** $\phi = \frac{\Gamma}{2\pi} \theta, \quad \psi = -\frac{\Gamma}{2\pi} \ln r \quad (10–46)$.

### Building Block 4—Doublet
Superposition of source and sink as distance $a \to 0$ while $am = \text{const}$.
- **Potential/Stream:** $\phi = K \frac{\cos \theta}{r}, \quad \psi = -K \frac{\sin \theta}{r} \quad (10–50, 10–51)$.

---

**EXAMPLE 10–6: Velocity in a Flow Composed of Three Components**
Superpose: Source 1 at $(0, -1)$, Sink 2 at $(1, -1)$, and Vortex at $(1, 1)$. Find $\vec{V}$ at $(1, 0)$.
**Analysis:**
$\vec{V} = \vec{V}_{vortex} + \vec{V}_{source 1} + \vec{V}_{source 2}$.
1. $V_{vortex} = \frac{1.5}{2\pi(1)} = 0.239 \text{ m/s}$ (to the right: $0.239\vec{i}$).
2. $V_{source 1} = \frac{2.0}{2\pi\sqrt{2}} = 0.225 \text{ m/s}$ (at $45^\circ$: $0.159\vec{i} + 0.159\vec{j}$).
3. $V_{source 2} = \frac{|-1.0|}{2\pi(1)} = 0.159 \text{ m/s}$ (down: $-0.159\vec{j}$).
**Result:** $\vec{V} = (0.239 + 0.159)\vec{i} + (0.159 - 0.159)\vec{j} = 0.398\vec{i} \text{ m/s}$.

---

### Flow over a Circular Cylinder
Formed by Uniform Stream + Doublet.
**Stream function:**
$$ \psi = V_\infty \sin \theta \left( r - \frac{a^2}{r} \right) \quad (10–55) $$
- On cylinder surface ($r=a$): $\psi = 0, \ u_r = 0, \ u_\theta = -2V_\infty \sin \theta \quad (10–59)$.

**EXAMPLE 10–7: Pressure Distribution on a Circular Cylinder**
Use Bernoulli equation to find pressure coefficient $C_p = \frac{P - P_\infty}{\frac{1}{2}\rho V_\infty^2}$.
**Analysis:**
$C_p = 1 - \frac{V^2}{V_\infty^2} = 1 - \frac{(-2V_\infty \sin \theta)^2}{V_\infty^2}$.
**Result:** $C_p = 1 - 4 \sin^2 \theta \quad (4)$.
- Stagnation points ($\theta = 0^\circ, 180^\circ$): $C_p = 1$.
- Top/Bottom ($\theta = 90^\circ, 270^\circ$): $C_p = -3$.
*Symmetry implies zero net pressure drag (D’Alembert’s Paradox).*

---

## 10–6 ■ THE BOUNDARY LAYER APPROXIMATION

The boundary layer approximation bridges the gap between the **Euler equation** (which allows slip at walls) and the **Navier–Stokes equation** (which enforces no-slip).

### Prandtl’s Boundary Layer Concept (1904)
Divide the flow into two regions (Fig. 10–76):
1. **Outer Flow Region:** Inviscid and/or irrotational. Solve using Euler or potential flow theory.
2. **Boundary Layer Region:** A very thin layer near solid walls where viscous forces and vorticity are significant.

### Boundary Layer Thickness ($\delta$)
Defined as the distance from the wall where the velocity $u$ reaches 99% of the free-stream velocity $V$.
- **Reynolds number along a flat plate:**
  $$ Re_x = \frac{\rho V x}{\mu} = \frac{V x}{\nu} \quad (10–60) $$
- **Key Trend:** At a given $x$, the higher the $Re_x$, the thinner the boundary layer $\delta$ (Fig. 10–77).

---

### D’Alembert’s Paradox
With the irrotational flow approximation, the aerodynamic drag force on any nonlifting body is zero.
- **Reality:** Real fluids have no-slip conditions and flow separation, leading to both pressure drag and viscous drag (Fig. 10–65).

**Biological Insight:** A fish’s eye is located near the **zero-pressure point** ($C_p = 0$) so that its vision is not distorted by pressure changes as it swims at different speeds (Fig. 10–66).

---

### Transition to Turbulence
The boundary layer starts laminar and transitions to turbulent as $Re_x$ increases.
- **Critical Reynolds number ($Re_{x,cr}$):** For a smooth flat plate, transition typically begins at $Re_{x,cr} \cong 1 \times 10^5$ to $5 \times 10^5$.
- **Transition process:** Infinitesimal disturbances grow into turbulent eddies.
- **Trip wires:** Used to force transition early at a desired location (Fig. 10–83).

**Scale Observation:** In real flows, the boundary layer is extremely thin. When drawn to scale (Fig. 10–82), the layer is barely visible compared to the length of the body.

---

## 10–6 ■ THE BOUNDARY LAYER APPROXIMATION (Continued)

### The Boundary Layer Equations
For steady, 2D, incompressible laminar flow in the $xy$-plane (neglecting gravity):
1. **Continuity:** $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0$
2. **x-momentum:** $u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = U \frac{dU}{dx} + \nu \frac{\partial^2 u}{\partial y^2} \quad (10–71)$
- **Note:** Pressure is eliminated by relating it to the outer flow velocity $U(x)$ via Bernoulli: $\frac{1}{\rho} \frac{dP}{dx} = -U \frac{dU}{dx} \quad (10–69)$.
- **Parabolic nature:** Boundary conditions are needed only on three sides (upstream, wall, and edge).

---

**EXAMPLE 10–10: Laminar Boundary Layer on a Flat Plate (Blasius Solution)**
Uniform stream $V$ parallel to a semi-infinite flat plate. $U(x) = V = \text{constant} \implies dU/dx = 0$.
**Analysis:**
Blasius introduced a similarity variable $\eta$:
$$ \eta = y \sqrt{\frac{U}{\nu x}} \quad (4) $$
And solved the resulting ODE numerically. Key results from Table 10–3:
- **Boundary layer thickness ($\delta$):** occurs at $\eta \cong 4.91$.
  $$ \frac{\delta}{x} = \frac{4.91}{\sqrt{Re_x}} \quad (6) $$
- **Wall shear stress ($\tau_w$):**
  $$ \tau_w = 0.332 \frac{\rho U^2}{\sqrt{Re_x}} \quad (9) $$
- **Skin friction coefficient ($C_{f,x}$):**
  $$ C_{f,x} = \frac{\tau_w}{\frac{1}{2}\rho U^2} = \frac{0.664}{\sqrt{Re_x}} \quad (10) $$

### TABLE 10–3: Blasius solution in similarity variables
| $\eta$ | $f''(\eta)$ (Stress) | $f'(\eta) = u/U$ (Velocity) |
| :--- | :--- | :--- |
| 0.0 | 0.33206 | 0.00000 |
| 1.0 | 0.32301 | 0.32978 |
| 2.0 | 0.26675 | 0.62977 |
| 4.91 | 0.018 | 0.990 |
| 5.0 | 0.01591 | 0.99154 |

---

### Displacement Thickness ($\delta^*$)
Distance that a streamline just outside the boundary layer is deflected away from the wall (Fig. 10–102).
$$ \delta^* = \int_{0}^{\infty} \left( 1 - \frac{u}{U} \right) dy \quad (10–72) $$
For the Blasius profile, $\delta^* \cong 1.72 \frac{x}{\sqrt{Re_x}}$.

**EXAMPLE 10–9: Laminar or Turbulent?**
Canoe: $L=16 \text{ ft}, V = 5 \text{ mph}$. Water at $50^\circ\text{F}$ ($\nu = 1.407 \times 10^{-5} \text{ ft}^2\text{/s}$).
**Analysis:** 
$Re_x = \frac{(5 \text{ mph})(16 \text{ ft})}{\nu} = 8.34 \times 10^6$.
Since $Re_x > 5 \times 10^5$, the boundary layer is **turbulent**.
In a practical example (car hood at 20 mph), $Re_x = 5.7 \times 10^5$ and $\delta \cong 0.27 \text{ in}$.

---

### Physical Meaning of Displacement Thickness ($\delta^*$)
$\delta^*$ is the imaginary increase in wall thickness as seen by the outer flow (Fig. 10–104).
- **In a channel/duct:** The growing boundary layers cause the core flow to accelerate to satisfy conservation of mass (Fig. 10–105).

---

**EXAMPLE 10–11: Displacement Thickness in the Design of a Wind Tunnel**
Round test section ($D=30\text{ cm}, L=30\text{ cm}$), $V=4\text{ m/s}$. Air at $19^\circ\text{C}$ ($\nu = 1.507 \times 10^{-5} \text{ m}^2\text{/s}$).
**Analysis:**
$Re_x = 7.96 \times 10^4$ (Laminar).
$\delta^* \cong \frac{1.72x}{\sqrt{Re_x}} = 1.83 \text{ mm}$.
From mass balance: $V_{end} = V_{beg} \frac{R^2}{(R - \delta^*)^2} = 4.0 \frac{(0.15)^2}{(0.15 - 0.00183)^2} = 4.10 \text{ m/s}$.
The speed increases by 2.5%.
**Recommendation:** Design the test section as a slowly **diverging** duct to counteract $\delta^*(x)$.

---

### Momentum Thickness ($\theta$)
Defined as the loss of momentum flux per unit width divided by $\rho U^2$:
$$ \theta = \int_{0}^{\infty} \frac{u}{U} \left( 1 - \frac{u}{U} \right) dy \quad (10–80) $$
- **Laminar flat plate (Blasius):** $\frac{\theta}{x} = \frac{0.664}{\sqrt{Re_x}} \quad (10–81)$.
- **Note:** $\theta/x$ is identical to the local skin friction coefficient $C_{f,x}$.

---

## Turbulent Flat Plate Boundary Layer

Turbulent profiles are fuller (hugging the wall) due to eddy mixing (Fig. 10–113).
1. **One-seventh-power law:** $\frac{u}{U} = \left( \frac{y}{\delta} \right)^{1/7} \quad (10–82)$.
2. **Log law:** $\frac{u}{u_*} = \frac{1}{\kappa} \ln \frac{y u_*}{\nu} + B \quad (10–83)$.
   Friction velocity $u_* = \sqrt{\tau_w / \rho}$. $\kappa \cong 0.41, B \cong 5.0$.

### TABLE 10–4: Summary for smooth flat plate
| Property | Laminar | Turbulent (1/7 law) |
| :--- | :--- | :--- |
| $\delta/x$ | $4.91 / \sqrt{Re_x}$ | $0.16 / (Re_x)^{1/7}$ |
| $\delta^*/x$ | $1.72 / \sqrt{Re_x}$ | $0.020 / (Re_x)^{1/7}$ |
| $\theta/x$ | $0.664 / \sqrt{Re_x}$ | $0.016 / (Re_x)^{1/7}$ |
| $C_{f,x}$ | $0.664 / \sqrt{Re_x}$ | $0.027 / (Re_x)^{1/7}$ |

---

**EXAMPLE 10–12: Comparison of Laminar and Turbulent Boundary Layers**
Air at $20^\circ\text{C}, V=10\text{ m/s}, L=1.52\text{ m} \implies Re_L = 1.0 \times 10^6$.
**Results:**
- Laminar: $\delta = 7.46 \text{ mm}, C_{f,x} = 6.64 \times 10^{-4}$.
- Turbulent: $\delta = 33.8 \text{ mm}, C_{f,x} = 3.8 \times 10^{-3}$.
*The turbulent boundary layer is ~4.5 times thicker and has ~5.7 times higher friction.*

---

### Flow Separation and Pressure Gradients
- **Favorable pressure gradient ($dP/dx < 0$):** Outer flow accelerates ($dU/dx > 0$). Boundary layer is thin and stays attached.
- **Adverse pressure gradient ($dP/dx > 0$):** Outer flow decelerates ($dU/dx < 0$). Boundary layer thickens and is prone to **separation**.
- **Separation point:** Occurs where $\left( \frac{\partial u}{\partial y} \right)_{y=0} = 0 \quad (Fig. 10–123d)$. Beyond this point, **reverse flow** occurs.
- **Resistance:** Turbulent boundary layers are more resistant to separation than laminar ones due to better mixing of high-momentum fluid from the outer region.

---

## The Momentum Integral Technique

Used to estimate gross features ($\delta, C_{f,x}$) using a control volume approach (Fig. 10–127).

**Kármán Integral Equation:**
$$ \frac{d}{dx} (U^2 \theta) + U \frac{dU}{dx} \delta^* = \frac{\tau_w}{\rho} \quad (10–93) $$
For a flat plate ($U = \text{const}$), this simplifies to:
$$ C_{f,x} = 2 \frac{d\theta}{dx} \quad (10–97) $$

---

**EXAMPLE 10–14: Flat Plate Analysis Using Kármán Equation**
Given $C_{f,x} = 0.027(Re_x)^{-1/7}$ and 1/7th-power law profile.
**Analysis:**
1. $\delta^* = \int_0^\delta (1 - (y/\delta)^{1/7}) dy = \delta/8$.
2. $\theta = \int_0^\delta (y/\delta)^{1/7} (1 - (y/\delta)^{1/7}) dy = \frac{7}{72}\delta$.
3. Substitute into Eq. 10–97: $0.027(Re_x)^{-1/7} = 2 \frac{d}{dx} (\frac{7}{72}\delta) \implies \frac{d\delta}{dx} = \frac{72}{14} 0.027 (Re_x)^{-1/7}$.
4. Integrate: $\frac{\delta}{x} \cong \frac{0.16}{(Re_x)^{1/7}}$.
*This matches the values in Table 10-4.*

---

**EXAMPLE 10–15: Drag on the Wall of a Wind Tunnel Test Section**
Air at $20^\circ\text{C}, V = 10\text{ m/s}$. Width $w=0.5\text{ m}$. $\delta_1 = 4.2 \text{ cm}, \delta_2 = 7.7 \text{ cm}$. Profile is 1/8th-power law.
**Analysis:**
For 1/8th law: $\theta = \frac{8}{(8+1)(8+2)} \delta = \frac{4}{45} \delta$.
Total drag force $F_D = w \int_{x_1}^{x_2} \tau_w dx = w \rho U^2 (\theta_2 - \theta_1)$.
$$ F_D = w \rho U^2 \frac{4}{45} (\delta_2 - \delta_1) $$
$$ F_D = (0.50 \text{ m})(1.204 \text{ kg/m}^3)(10 \text{ m/s})^2 \frac{4}{45} (0.077 - 0.042) \text{ m} = 0.19 \text{ N} $$

---

## CHAPTER 10: PROBLEMS

### General, Modified Pressure, and Fluid Statics
**10–1C** Explain the difference between an “exact” solution (Chap. 9) and an approximate solution (Chap. 10).
**10–8C** Which nondimensional parameter is eliminated by using modified pressure $P'$? 
*Answer: The Froude number.*

### Creeping Flow
**10–17** Honey ($\text{SG} \cong 1.42$) at $20^\circ\text{C}$ ($\mu = 190 \text{ poise} = 19 \text{ Pa·s}$) is squeezed through a $D=4\text{ mm}$ hole. Find max speed for creeping flow ($Re < 0.1$).
**Analysis:** $Re = \rho V D / \mu < 0.1$.
$$ V < \frac{0.1 \mu}{\rho D} = \frac{0.1(19)}{(1420)(0.004)} = 0.33 \text{ m/s} $$
At $40^\circ\text{C}$ ($\mu = 20 \text{ poise} = 2 \text{ Pa·s}$): $V < 0.035 \text{ m/s}$.

**10–29: Reynolds Equation for Lubrication**
For a 2D slipper-pad bearing, show that:
$$ \frac{d}{dx} \left( h^3 \frac{dP}{dx} \right) = 6\mu U \frac{dh}{dx} $$

**10–31E: Amusement Park Slipper-Pad Bearing**
$h_0 = 0.001\text{ in}, h_L = 0.0005\text{ in}, L = 1.0\text{ in}, V = 10\text{ ft/s}$.
**Analysis:** Calculate convergence $\alpha$, gage pressure at mid-point, and total load capacity.

### Inviscid Flow
**10–36C** In what way is the Euler equation an approximation? Where is it appropriate?
**10–42** Water rotates as a rigid body around $z$-axis. Find free surface shape $z_{surface}(r)$.
**Analysis:** Integrate Euler: $\partial P / \partial r = \rho \omega^2 r, \partial P / \partial z = -\rho g$.
**Result:** $z_{surface} = \omega^2 r^2 / 2g$.

### Irrotational (Potential) Flow
**10–47C** What flow property determines if a region is rotational? 
*Answer: Vorticity $\vec{\zeta} = \vec{\nabla} \times \vec{V}$.*
**10–49** Verify that $\nabla^2 \phi = 0$ is valid in cylindrical coordinates for irrotational flow.

---

### Potential Flow (Continued)
**10–54** Given velocity field $\vec{V} = (ax + b)\vec{i} + (-ay + cx)\vec{j}$.
**Analysis:** Check for irrotationality: $\partial v / \partial x - \partial u / \partial y = c - 0 = c$.
*Answer: Irrotational only if $c=0$. If $c=0$, $\phi = a(x^2 - y^2)/2 + bx + cy + \text{const}$.*

**10–64** What is D’Alembert’s paradox? 
*Answer: The prediction of zero aerodynamic drag on a nonlifting body in irrotational flow, which contradicts reality where viscosity leads to drag.*

---
