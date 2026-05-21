# CHAPTER 4: FLUID KINEMATICS

Fluid kinematics deals with describing the motion of fluids without necessarily considering the forces and moments that cause the motion.

### OBJECTIVES
- Understand the role of the **material derivative** in transforming between Lagrangian and Eulerian descriptions.
- Distinguish between various flow visualizations (streamlines, pathlines, etc.).
- Understand the **Reynolds transport theorem (RTT)**.

---

## 4–1 ■ LAGRANGIAN AND EULERIAN DESCRIPTIONS

There are two distinct ways to describe motion:
1. **Lagrangian description:** Follows individual objects (fluid particles) and tracks their position $\vec{x}_{particle}(t)$ and velocity $\vec{V}_{particle}(t)$. Analogous to system analysis in thermodynamics.
2. **Eulerian description:** Defines field variables as functions of space and time within a control volume. We define:
   - Pressure field: $P = P(x, y, z, t)$
   - Velocity field: $\vec{V} = \vec{V}(x, y, z, t)$
   - Acceleration field: $\vec{a} = \vec{a}(x, y, z, t)$

The velocity field in Cartesian coordinates is expanded as:
$$ \vec{V} = (u, v, w) = u(x, y, z, t)\vec{i} + v(x, y, z, t)\vec{j} + w(x, y, z, t)\vec{k} \quad (4–4) $$

**EXAMPLE 4–1: A Steady Two-Dimensional Velocity Field**
A steady, incompressible velocity field: $\vec{V} = (u, v) = (0.5 + 0.8x)\vec{i} + (1.5 - 0.8y)\vec{j}$.
Determine if there are any stagnation points.
**Analysis:** At a stagnation point, $\vec{V} = 0$:
- $u = 0.5 + 0.8x = 0 \to x = -0.625 \text{ m}$
- $v = 1.5 - 0.8y = 0 \to y = 1.875 \text{ m}$
Yes, one stagnation point at $(-0.625, 1.875)$.

---

## Acceleration Field

Newton’s second law for a fluid particle:
$$ \vec{F}_{particle} = m_{particle}\vec{a}_{particle} \quad (4–5) $$
Acceleration is the time derivative of the particle's velocity:
$$ \vec{a}_{particle} = \frac{d\vec{V}_{particle}}{dt} \quad (4–6) $$
At any instant $t$, the velocity of the particle is the same as the local value of the velocity field at the particle's location.

---

---

## Acceleration of a Fluid Particle

To take the time derivative of velocity, we must use the chain rule because velocity $\vec{V}$ is a function of four independent variables ($x, y, z, t$):
$$ \vec{a}_{particle} = \frac{d\vec{V}}{dt} = \frac{\partial \vec{V}}{\partial t} \frac{dt}{dt} + \frac{\partial \vec{V}}{\partial x} \frac{dx}{dt} + \frac{\partial \vec{V}}{\partial y} \frac{dy}{dt} + \frac{\partial \vec{V}}{\partial z} \frac{dz}{dt} \quad (4–7) $$
Since $dx/dt = u, dy/dt = v, dz/dt = w$, the acceleration field becomes:
$$ \vec{a}(x, y, z, t) = \frac{\partial \vec{V}}{\partial t} + u \frac{\partial \vec{V}}{\partial x} + v \frac{\partial \vec{V}}{\partial y} + w \frac{\partial \vec{V}}{\partial z} \quad (4–8) $$

In vector form, using the gradient operator $\vec{\nabla}$:
$$ \vec{a}(x, y, z, t) = \frac{d\vec{V}}{dt} = \frac{\partial \vec{V}}{\partial t} + (\vec{V} \cdot \vec{\nabla})\vec{V} \quad (4–9) $$
where $\vec{\nabla} = \vec{i}\frac{\partial}{\partial x} + \vec{j}\frac{\partial}{\partial y} + \vec{k}\frac{\partial}{\partial z}$.

The components of acceleration in Cartesian coordinates are:
$$ a_x = \frac{\partial u}{\partial t} + u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} + w \frac{\partial u}{\partial z} $$
$$ a_y = \frac{\partial v}{\partial t} + u \frac{\partial v}{\partial x} + v \frac{\partial v}{\partial y} + w \frac{\partial v}{\partial z} \quad (4–11) $$
$$ a_z = \frac{\partial w}{\partial t} + u \frac{\partial w}{\partial x} + v \frac{\partial w}{\partial y} + w \frac{\partial w}{\partial z} $$

- **Local acceleration:** $\partial \vec{V} / \partial t$ (nonzero only for unsteady flows).
- **Advective (convective) acceleration:** $(\vec{V} \cdot \vec{\nabla})\vec{V}$ (can be nonzero even for steady flows).

**EXAMPLE 4–2: Acceleration of a Fluid Particle through a Nozzle**
Steady flow through a $3.90\text{-in}$ long nozzle. $D_{in} = 0.420\text{ in}, D_{out} = 0.182\text{ in}, \dot{V} = 0.841 \text{ gal/min}$.
**Analysis:** 
$u_{in} = 1.95 \text{ ft/s}, u_{out} = 10.4 \text{ ft/s}$.
Using convective acceleration:
$$ a_x \cong u_{avg} \frac{\Delta u}{\Delta x} = \frac{u_{out}^2 - u_{in}^2}{2 \Delta x} = \frac{(10.4)^2 - (1.95)^2}{2(0.325 \text{ ft})} = 160 \text{ ft/s}^2 $$

---

## Material Derivative

The operator $D/Dt$ is the **material derivative** (or substantial derivative):
$$ \frac{D}{Dt} = \frac{d}{dt} = \frac{\partial}{\partial t} + (\vec{V} \cdot \vec{\nabla}) \quad (4–12) $$
Material acceleration: $\vec{a} = \frac{D\vec{V}}{Dt}$.

---

## 4–2 ■ FUNDAMENTALS OF FLOW VISUALIZATION

### Streamlines and Streamtubes
A **streamline** is a curve that is everywhere tangent to the instantaneous local velocity vector.
Equation for a streamline:
$$ \frac{dr}{V} = \frac{dx}{u} = \frac{dy}{v} = \frac{dz}{w} \quad (4–15) $$
In the $xy$-plane:
$$ \left( \frac{dy}{dx} \right)_{streamline} = \frac{v}{u} \quad (4–16) $$

**EXAMPLE 4–4: Streamlines in the xy-Plane—An Analytical Solution**
Steady velocity field: $u = 0.5 + 0.8x, v = 1.5 - 0.8y$.
**Analysis:** $\frac{dy}{dx} = \frac{1.5 - 0.8y}{0.5 + 0.8x}$.
Solving by separation of variables:
$$ y = \frac{C}{0.8(0.5 + 0.8x)} + 1.875 $$

### Pathlines
A **pathline** is the actual path traveled by an individual fluid particle over some time period.
$$ \vec{x} = \vec{x}_{start} + \int_{t_{start}}^t \vec{V} dt \quad (4–17) $$

### Streaklines
A **streakline** is the locus of fluid particles that have passed sequentially through a prescribed point in the flow. For steady flow, streamlines, pathlines, and streaklines are identical.

![FIGURE 4–25: Smoke streaklines showing a Kármán vortex street.](path/to/image4-25.jpg)

### Timelines
A **timeline** is a set of adjacent fluid particles that were marked at the same (earlier) instant in time.

---

---

## Refractive Flow Visualization Techniques

Shadowgraph and Schlieren techniques utilize the fact that the index of refraction in gases varies with density.
- **Shadowgraph:** Formed when refracted rays rearrange the shadow cast onto a screen.
- **Schlieren:** Involves lenses and a knife edge to block refracted light, providing a true focused optical image.

---

## 4–3 ■ PLOTS OF FLUID FLOW DATA

- **Profile Plots:** Indicate how a scalar property (e.g., velocity $u$) varies along a direction (e.g., $y$).
- **Vector Plots:** An array of arrows indicating magnitude and direction at an instant (e.g., velocity or acceleration fields).
- **Contour Plots:** Curves of constant values of a scalar property (e.g., isobars for pressure).

---

## 4–4 ■ OTHER KINEMATIC DESCRIPTIONS

### Types of Motion or Deformation of Fluid Elements
A fluid element can undergo four fundamental types of motion (Fig. 4–34):
1. **Translation:** Described by the velocity vector $\vec{V} = u\vec{i} + v\vec{j} + w\vec{k} \quad (4–19)$.
2. **Rotation:** Angular velocity $\omega$ in the $xy$-plane:
   $$ \omega = \frac{d}{dt} \left( \frac{\alpha_a + \alpha_b}{2} \right) = \frac{1}{2} \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right) \quad (4–20) $$
   In 3D, the rate of rotation vector is:
   $$ \vec{\omega} = \frac{1}{2} \left( \frac{\partial w}{\partial y} - \frac{\partial v}{\partial z} \right) \vec{i} + \frac{1}{2} \left( \frac{\partial u}{\partial z} - \frac{\partial w}{\partial x} \right) \vec{j} + \frac{1}{2} \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right) \vec{k} \quad (4–21) $$
3. **Linear Strain Rate:** Rate of increase in length per unit length.
   $$ \varepsilon_{xx} = \frac{\partial u}{\partial x}, \quad \varepsilon_{yy} = \frac{\partial v}{\partial y}, \quad \varepsilon_{zz} = \frac{\partial w}{\partial z} \quad (4–23) $$
   - **Volumetric Strain Rate (Dilatation):**
     $$ \frac{1}{V} \frac{DV}{Dt} = \varepsilon_{xx} + \varepsilon_{yy} + \varepsilon_{zz} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} \quad (4–24) $$
     *Note: This is zero for incompressible flow.*
4. **Shear Strain Rate:**
   $$ \varepsilon_{xy} = \frac{1}{2} \left( \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x} \right) \quad (4–25) $$

### Strain Rate Tensor
The linear and shear strain rates are combined into a symmetric second-order tensor:
$$ \varepsilon_{ij} = \begin{pmatrix} \varepsilon_{xx} & \varepsilon_{xy} & \varepsilon_{xz} \\ \varepsilon_{yx} & \varepsilon_{yy} & \varepsilon_{yz} \\ \varepsilon_{zx} & \varepsilon_{zy} & \varepsilon_{zz} \end{pmatrix} = \begin{pmatrix} \frac{\partial u}{\partial x} & \frac{1}{2} (\frac{\partial u}{\partial y} + \frac{\partial v}{\partial x}) & \frac{1}{2} (\frac{\partial u}{\partial z} + \frac{\partial w}{\partial x}) \\ \frac{1}{2} (\frac{\partial v}{\partial x} + \frac{\partial u}{\partial y}) & \frac{\partial v}{\partial y} & \frac{1}{2} (\frac{\partial v}{\partial z} + \frac{\partial w}{\partial y}) \\ \frac{1}{2} (\frac{\partial w}{\partial x} + \frac{\partial u}{\partial z}) & \frac{1}{2} (\frac{\partial w}{\partial y} + \frac{\partial v}{\partial z}) & \frac{\partial w}{\partial z} \end{pmatrix} \quad (4–27) $$

---

## Vorticity and Rotationality

The **vorticity vector** $\vec{\zeta}$ is the curl of the velocity vector:
$$ \vec{\zeta} = \vec{\nabla} \times \vec{V} = \text{curl}(\vec{V}) \quad (4–28) $$
Vorticity is equal to twice the angular velocity:
$$ \vec{\zeta} = 2\vec{\omega} \quad (4–29) $$

- **Rotational flow:** $\vec{\zeta} \neq 0$.
- **Irrotational flow:** $\vec{\zeta} = 0$.

**EXAMPLE 4–6: Calculation of Kinematic Properties**
Velocity field: $u = 0.5 + 0.8x, v = 1.5 - 0.8y$.
**Analysis:**
- $\omega_z = \frac{1}{2} (\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}) = \frac{1}{2}(0 - 0) = 0$ (Irrotational).
- $\varepsilon_{xx} = 0.8 \text{ s}^{-1}, \varepsilon_{yy} = -0.8 \text{ s}^{-1}$.
- $\text{Volumetric strain rate} = 0.8 - 0.8 = 0$ (Incompressible).
- $\varepsilon_{xy} = 0$ (No shear strain).

---

---

## Vorticity in Cartesian and Cylindrical Coordinates

In Cartesian coordinates, the **vorticity vector** $\vec{\zeta}$ is:
$$ \vec{\zeta} = \left( \frac{\partial w}{\partial y} - \frac{\partial v}{\partial z} \right) \vec{i} + \left( \frac{\partial u}{\partial z} - \frac{\partial w}{\partial x} \right) \vec{j} + \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right) \vec{k} \quad (4–30) $$
For 2D flow in the $xy$-plane ($w=0$):
$$ \vec{\zeta} = \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right) \vec{k} \quad (4–31) $$

In cylindrical coordinates ($r, \theta, z$):
$$ \vec{\zeta} = \left( \frac{1}{r} \frac{\partial u_z}{\partial \theta} - \frac{\partial u_\theta}{\partial z} \right) \vec{e}_r + \left( \frac{\partial u_r}{\partial z} - \frac{\partial u_z}{\partial r} \right) \vec{e}_\theta + \frac{1}{r} \left( \frac{\partial (r u_\theta)}{\partial r} - \frac{\partial u_r}{\partial \theta} \right) \vec{e}_z \quad (4–32) $$

**EXAMPLE 4–8: Determination of Rotationality**
Velocity field: $\vec{V} = x^2\vec{i} + (-2xy - 1)\vec{j}$.
**Analysis:** $\vec{\zeta} = (\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y})\vec{k} = (-2y - 0)\vec{k} = -2y\vec{k}$.
Since $\vec{\zeta} \neq 0$, the flow is **rotational**.

### Comparison of Two Circular Flows
1. **Flow A — Solid-body rotation:** $u_r = 0, u_\theta = \omega r$.
   - $\vec{\zeta} = 2\omega\vec{k}$ (Rotational). Analogy: Merry-go-round.
2. **Flow B — Line vortex:** $u_r = 0, u_\theta = K/r$.
   - $\vec{\zeta} = 0$ (Irrotational everywhere except $r=0$). Analogy: Ferris wheel.

---

## 4–5 ■ THE REYNOLDS TRANSPORT THEOREM (RTT)

RTT provides the link between the **system approach** (Lagrangian) and the **control volume approach** (Eulerian). It relates the time rate of change of an extensive property $B$ of a system to the changes within and across the boundaries of a control volume.

### RTT for a Fixed Control Volume
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA \quad (4–41) $$
where $b = B/m$ is the intensive property.
Alternatively:
$$ \frac{dB_{sys}}{dt} = \int_{CV} \frac{\partial}{\partial t} (\rho b) dV + \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA \quad (4–42) $$

### RTT for a Moving or Deforming Control Volume
If the CV moves with velocity $\vec{V}_{CS}$, we use the **relative velocity** $\vec{V}_r = \vec{V} - \vec{V}_{CS}$:
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \int_{CS} \rho b (\vec{V}_r \cdot \vec{n}) dA \quad (4–44) $$

### RTT for Well-Defined Inlets and Outlets
In many engineering cases, fluid crosses the boundary at specific locations:
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \sum_{out} \dot{m}_{out} b_{avg} - \sum_{in} \dot{m}_{in} b_{avg} \quad (4–47) $$
Or in terms of volume flow rate $\dot{V}$:
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \sum_{out} \rho_{avg} b_{avg} V_{r,avg} A - \sum_{in} \rho_{avg} b_{avg} V_{r,avg} A \quad (4–48) $$

---

## Alternate Derivation via Leibnitz Theorem

The one-dimensional **Leibnitz theorem** for differentiating an integral with time-dependent limits:
$$ \frac{d}{dt} \int_{a(t)}^{b(t)} G(x, t) dx = \int_{a}^{b} \frac{\partial G}{\partial t} dx + \frac{db}{dt} G(b, t) - \frac{da}{dt} G(a, t) \quad (4–49) $$

**EXAMPLE 4–10: One-Dimensional Leibnitz Integration**
Reduce $F(t) = \frac{d}{dt} \int_{0}^{Ct} e^{-x^2} dx$.
**Analysis:** $G = e^{-x^2}$, $b = Ct$, $a = 0$.
$$ F(t) = 0 + \frac{d(Ct)}{dt} e^{-(Ct)^2} - 0 = C e^{-C^2 t^2} $$

### Three-Dimensional Leibnitz Theorem
$$ \frac{d}{dt} \int_{V(t)} G dV = \int_{V(t)} \frac{\partial G}{\partial t} dV + \int_{A(t)} G (\vec{V}_A \cdot \vec{n}) dA \quad (4–50) $$
where $\vec{V}_A$ is the velocity of the moving surface $A(t)$.

---

---

## 4–5 ■ THE REYNOLDS TRANSPORT THEOREM (RTT) - Continued

RTT provides the link between the system approach and the control volume approach. 

**General RTT for a nonfixed CV:**
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \int_{CS} \rho b (\vec{V}_r \cdot \vec{n}) dA \quad (4–44) $$
where $\vec{V}_r = \vec{V} - \vec{V}_{CS}$ is the relative velocity of the fluid crossing the control surface.

**Alternate RTT (nonfixed CV):**
$$ \frac{dB_{sys}}{dt} = \int_{CV} \frac{\partial}{\partial t} (\rho b) \, dV + \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA \quad (4–45) $$
In this form, $\vec{V}$ is the absolute velocity.

**RTT for Steady Flow:**
$$ \frac{dB_{sys}}{dt} = \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA \quad (4–46) $$

**Approximate RTT for well-defined inlets and outlets:**
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \sum_{out} \dot{m}_{out} b_{avg} - \sum_{in} \dot{m}_{in} b_{avg} \quad (4–47) $$

---

## Relationship between Material Derivative and RTT

The Reynolds transport theorem for finite volumes (integral analysis) is analogous to the material derivative for infinitesimal volumes (differential analysis). Both transform from a Lagrangian/system viewpoint to an Eulerian/control volume viewpoint (Fig. 4–63).

![FIGURE 4–63: Analogy between RTT and material derivative.](path/to/image4-63.jpg)

---

## SUMMARY (Chapter 4)

- **Lagrangian description:** Follows individual particles.
- **Eulerian description:** Focuses on field variables in a flow domain.
- **Material derivative:** $\frac{Db}{Dt} = \frac{\partial b}{\partial t} + (\vec{V} \cdot \vec{\nabla})b$.
- **Flow Visualization:** Streamlines, streaklines, pathlines, and timelines.
- **Deformation Rates:** Velocity (translation), angular velocity (rotation), linear strain rate, and shear strain rate.
- **Vorticity:** $\vec{\zeta} = \vec{\nabla} \times \vec{V} = 2\vec{\omega}$. Flow is **irrotational** if $\vec{\zeta} = 0$.

---

## PROBLEMS (Chapter 4)

**4–3** Steady 2D velocity field: $u = 0.5 + 1.2x, v = -2.0 - 1.2y$. Determine stagnation point.
**4–15** Flow through a converging duct: $\vec{V} = (U_0 + bx)\vec{i} - by\vec{j}$. Calculate material acceleration.
**4–21** Air through a diffuser. Calculate acceleration at $x=0$ and $x=1.0 \text{ m}$ for $L=2 \text{ m}, u_{ent}=30 \text{ m/s}, u_{ext}=5 \text{ m/s}$.
**4–36** Velocity field: $u = 1 + 2.5x + y, v = -0.5 - 1.5x - 2.5y$. Determine stagnation points and acceleration.
**4–39** Line vortex: $u_r = 0, u_\theta = K/r$. Plot contour of speed.
**4–42** Is converging duct flow rotational or irrotational? Answer: **Irrotational**.
**4–44** Change in length $\Delta \xi$ of a line segment $AB$ along the $x$-axis in a converging duct. Answer: $(x_B - x_A)(e^{bt} - 1)$.
**4–52** General linear 2D velocity field: $u = U + a_1x + b_1y, v = V + a_2x + b_2y$.
- Incompressible condition: $a_1 + b_2 = 0$.
- Linear strain rates: $\varepsilon_{xx} = a_1, \varepsilon_{yy} = b_2$.
- Vorticity vector: $(a_2 - b_1)\vec{k}$.
**4–58** 2D shear flow: $u = a + by, v = 0$.
- Linear strain rates: $\varepsilon_{xx} = 0, \varepsilon_{yy} = 0$.
- Shear strain rate: $\varepsilon_{xy} = \frac{1}{2} b$.

---

**EXAMPLE 4–11: Reynolds Transport Theorem in Terms of Relative Velocity**
Beginning with the Leibnitz theorem and the general RTT, prove that Eq. 4–44 is valid.
**Analysis:** The 3D Leibnitz theorem (Eq. 4–50) with $G = \rho b$ becomes:
$$ \frac{d}{dt} \int_{CV} \rho b \, dV = \int_{CV} \frac{\partial}{\partial t} (\rho b) \, dV + \int_{CS} \rho b (\vec{V}_{CS} \cdot \vec{n}) dA \quad (1) $$
From the general RTT (Eq. 4–53):
$$ \int_{CV} \frac{\partial}{\partial t} (\rho b) \, dV = \frac{dB_{sys}}{dt} - \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA \quad (2) $$
Substituting (2) into (1):
$$ \frac{d}{dt} \int_{CV} \rho b \, dV = \frac{dB_{sys}}{dt} - \int_{CS} \rho b (\vec{V} \cdot \vec{n}) dA + \int_{CS} \rho b (\vec{V}_{CS} \cdot \vec{n}) dA $$
Rearranging and using $\vec{V}_r = \vec{V} - \vec{V}_{CS}$:
$$ \frac{dB_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho b \, dV + \int_{CS} \rho b (\vec{V}_r \cdot \vec{n}) dA $$

---
