# CHAPTER 9: DIFFERENTIAL ANALYSIS OF FLUID FLOW

In Chapter 5, we analyzed fluid flow using control volumes (integral analysis). While useful for overall properties, it doesn't provide details of the flow field at every point. In this chapter, we derive differential equations that govern fluid motion at every point.

## 9–1 ■ CONSERVATION OF MASS: THE CONTINUITY EQUATION

The conservation of mass principle for a differential control volume:
$$ \frac{\partial \rho}{\partial t} + \vec{\nabla} \cdot (\rho \vec{V}) = 0 \quad (9–1) $$
In Cartesian coordinates $(x, y, z)$:
$$ \frac{\partial \rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0 \quad (9–2) $$

### Incompressible Flow
For incompressible flow ($\rho = \text{constant}$), the density drops out:
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0 \quad (9–8) $$
This is valid for both steady and unsteady incompressible flows.

---

## 9–2 ■ THE STREAM FUNCTION

For a two-dimensional, incompressible flow in the $xy$-plane, the continuity equation is:
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 $$
We define the **stream function** $\psi(x, y)$ such that:
$$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} \quad (9–11) $$
Substituting these into the continuity equation shows it is identically satisfied.

**Physical Significance:**
1. Curves of constant $\psi$ are **streamlines**.
2. The difference in $\psi$ between two streamlines is equal to the volume flow rate per unit width:
   $$ \dot{V}/L = \psi_2 - \psi_1 \quad (9–15) $$

---

## 9–3 ■ CONSERVATION OF MOMENTUM: CAUCHY’S EQUATION

Applying Newton’s second law to a differential fluid element leads to the **Cauchy equation**:
$$ \rho \frac{D\vec{V}}{Dt} = \rho \vec{g} + \vec{\nabla} \cdot \sigma_{ij} \quad (9–19) $$
where $\sigma_{ij}$ is the stress tensor, consisting of pressure and viscous stress components.

For a **Newtonian fluid**, the viscous stress is proportional to the rate of deformation, leading to the **Navier-Stokes equations**.

---

## CHAPTER 9 SUMMARY

In this chapter, we derived the differential forms of conservation of mass (continuity) and linear momentum (Navier–Stokes).

**Continuity Equation:**
$$ \vec{\nabla} \cdot \vec{V} = 0 \quad \text{(Incompressible)} $$

**Navier–Stokes Equation:**
$$ \rho \frac{D\vec{V}}{Dt} = -\vec{\nabla} P + \rho \vec{g} + \mu \nabla^2 \vec{V} \quad (9–60) $$

**Stream Function ($\psi$):**
In Cartesian ($xy$): $u = \frac{\partial \psi}{\partial y}, v = -\frac{\partial \psi}{\partial x}$.
The difference $\psi_2 - \psi_1$ equals the volume flow rate per unit width.

---

## CHAPTER 9: PROBLEMS

### General and Mathematical Background
**9–5C** The divergence theorem transforms a volume integral into a surface integral:
$$ \int_{V} \vec{\nabla} \cdot \vec{G} dV = \oint_{A} \vec{G} \cdot \vec{n} dA $$
**9–6** Transform $\vec{x} = (4, 3, -4) \text{ m}$ to cylindrical:
$r = \sqrt{4^2 + 3^2} = 5 \text{ m}, \theta = \tan^{-1}(3/4) = 36.9^\circ, z = -4 \text{ m}$.

### Continuity Equation
**9–27** Velocity field $\vec{V} = (1.3 + 2.8x)\vec{i} + (1.5 - 2.8y)\vec{j}$.
$\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 2.8 + (-2.8) = 0$. (Incompressible).
**9–29** $\vec{V} = (axy^2 - b)\vec{i} + cy^3\vec{j} + dxy\vec{k}$. Condition for incompressibility:
$\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = ay^2 + 3cy^2 + 0 = (a+3c)y^2 = 0 \implies a = -3c$.

### Stream Function
**9–40** Fully developed Couette flow $u = Vy/h, v = 0$.
$\frac{\partial \psi}{\partial y} = u = Vy/h \implies \psi = \frac{Vy^2}{2h} + g(x)$.
$-\frac{\partial \psi}{\partial x} = v = 0 \implies g'(x) = 0 \implies \psi = \frac{Vy^2}{2h} + C$.
At $y=0, \psi=0 \implies C=0$. At top wall ($y=h$): $\psi = Vh/2$.

### Boundary Conditions
**9–73C** Boundary conditions for an airplane:
- Ground frame: $V_{air} = V_{airplane}$ at surface (no-slip), $V_{air} = 0$ far away.
- Airplane frame: $V_{air} = 0$ at surface (no-slip), $V_{air} = -V_{airplane}$ far away (uniform stream).

---

**EXAMPLE 9–19 (Continued): Similarity Solution**
Normalized velocity for impulsively started plate:
$$ u^* = 1 - \text{erf}(z^*) = \text{erfc}(z^*) \quad (9–14) $$
where $z^* = \frac{z}{2\sqrt{\nu t}}$ is the similarity variable.
*All velocity profiles at different times collapse into one curve when plotted against $z^*$.*

---
