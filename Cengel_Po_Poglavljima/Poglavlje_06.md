# CHAPTER 6: MOMENTUM ANALYSIS OF FLOW SYSTEMS

This chapter focuses on the forces and torques associated with fluid flow using the conservation of momentum principle.

### OBJECTIVES
- Identify the various forces acting on a control volume.
- Use the **linear momentum equation** to calculate forces.
- Use the **angular momentum equation** to calculate torques.

---

## 6–1 ■ NEWTON’S LAWS AND THE CONSERVATION OF MOMENTUM

Newton’s second law for a system of mass $m$:
$$ \vec{F} = m\vec{a} = m \frac{d\vec{V}}{dt} = \frac{d}{dt}(m\vec{V})_{sys} \quad (6–1) $$
where $m\vec{V}$ is the **linear momentum**.

For a control volume, using RTT (with $B = m\vec{V}$ and $b = \vec{V}$):
$$ \sum \vec{F} = \frac{d}{dt} \int_{CV} \rho \vec{V} \, dV + \int_{CS} \rho \vec{V} (\vec{V}_r \cdot \vec{n}) dA \quad (6–2) $$
The net force acting on the CV is equal to the time rate of change of the linear momentum within the CV plus the net flow rate of linear momentum out of the control surface.

---

---

# CHAPTER 6: MOMENTUM ANALYSIS OF FLOW SYSTEMS

When dealing with engineering problems, it is desirable to obtain fast and accurate solutions. Most problems associated with fluid flow can be analyzed using one of three approaches: differential, experimental, or control volume. The finite control volume approach is remarkably fast and simple and provides results sufficient for most engineering purposes.

### OBJECTIVES
- Identify the various kinds of forces and moments acting on a control volume.
- Use control volume analysis to determine the **forces** associated with fluid flow.
- Use control volume analysis to determine the **torques** and moments.

---

## 6–1 ■ NEWTON’S LAWS AND CONSERVATION OF MOMENTUM

Newton’s second law for a rigid body of mass $m$:
$$ \vec{F} = m\vec{a} = m \frac{d\vec{V}}{dt} = \frac{d}{dt}(m\vec{V})_{sys} \quad (6–1) $$
where $\vec{F}$ is the net force and $m\vec{V}$ is the **linear momentum**.

Newton's law for rotating bodies:
$$ \vec{M} = I\vec{\alpha} = \frac{d\vec{H}}{dt} \quad (6–2) $$
where $\vec{M}$ is the net torque and $\vec{H}$ is the angular momentum.

---

## 6–2 ■ CHOOSING A CONTROL VOLUME

A control volume can be selected as any arbitrary region in space.
- **Fixed CV:** Stationary hardware (e.g., a nozzle on a tripod).
- **Moving CV:** Moving at constant velocity (e.g., a jet engine of an airplane).
- **Deforming CV:** Changing shape (e.g., gas being purged from a cylinder by a piston).

**Relative velocity:**
$$ \vec{V}_r = \vec{V} - \vec{V}_{CS} \quad (4–3) $$
where $\vec{V}_{CS}$ is the local velocity of the control surface.

---

## 6–3 ■ FORCES ACTING ON A CONTROL VOLUME

The forces acting on a control volume consist of **body forces** (acting on the entire volume) and **surface forces** (acting on the boundary).
$$ \sum \vec{F} = \sum \vec{F}_{body} + \sum \vec{F}_{surface} \quad (6–4) $$

### Body Forces
The most common body force is gravity:
$$ \delta \vec{F}_{gravity} = \rho \vec{g} \, dV \quad (6–5) $$
Total body force:
$$ \sum \vec{F}_{body} = \int_{CV} \rho \vec{g} \, dV = m_{CV} \vec{g} \quad (6–7) $$

### Surface Forces
Surface forces consist of normal and tangential components. They are described by the **stress tensor** $\sigma_{ij}$:
$$ \sigma_{ij} = \begin{pmatrix} \sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\ \sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\ \sigma_{zx} & \sigma_{zy} & \sigma_{zz} \end{pmatrix} \quad (6–8) $$
- **Normal stresses:** $\sigma_{xx}, \sigma_{yy}, \sigma_{zz}$ (include pressure).
- **Shear stresses:** $\sigma_{xy}, \sigma_{xz}, \dots$ (composed of viscous stresses).

Total surface force:
$$ \sum \vec{F}_{surface} = \int_{CS} \sigma_{ij} \cdot \vec{n} \, dA \quad (6–10) $$

Total force for CV analysis:
$$ \sum \vec{F} = \sum \vec{F}_{gravity} + \sum \vec{F}_{pressure} + \sum \vec{F}_{viscous} + \sum \vec{F}_{other} \quad (6–12) $$

---

## 6–4 ■ THE LINEAR MOMENTUM EQUATION

Using the Reynolds transport theorem (RTT) with $b = \vec{V}$ (momentum per unit mass):
$$ \frac{d(m\vec{V})_{sys}}{dt} = \frac{d}{dt} \int_{CV} \rho \vec{V} \, dV + \int_{CS} \rho \vec{V} (\vec{V}_r \cdot \vec{n}) dA \quad (6–15) $$

**General Linear Momentum Equation:**
$$ \sum \vec{F} = \frac{d}{dt} \int_{CV} \rho \vec{V} \, dV + \int_{CS} \rho \vec{V} (\vec{V}_r \cdot \vec{n}) dA \quad (6–16) $$
For a **fixed control volume** ($\vec{V}_r = \vec{V}$):
$$ \sum \vec{F} = \frac{d}{dt} \int_{CV} \rho \vec{V} \, dV + \int_{CS} \rho \vec{V} (\vec{V} \cdot \vec{n}) dA \quad (6–17) $$

---

---

## Special Cases

During **steady flow**, the time rate of change of linear momentum within the CV is zero:
$$ \sum \vec{F} = \int_{CS} \rho \vec{V} (\vec{V}_r \cdot \vec{n}) dA \quad (6–18) $$

### Momentum-Flux Correction Factor, $\beta$
The velocity profile across an inlet or outlet is usually not uniform. To use average velocity in the momentum equation, we introduce $\beta$:
$$ \int_{A_c} \rho \vec{V} (\vec{V} \cdot \vec{n}) dA_c = \beta \dot{m} \vec{V}_{avg} \quad (6–22) $$
where:
$$ \beta = \frac{1}{A_c} \int_{A_c} \left( \frac{V}{V_{avg}} \right)^2 dA_c \quad (6–24) $$
- **Laminar flow in pipe:** $\beta = 4/3 \cong 1.33$ (Example 6–1).
- **Turbulent flow:** $\beta$ ranges from 1.01 to 1.04.

### Steady Flow Momentum Equation
$$ \sum \vec{F} = \sum_{out} \beta \dot{m} \vec{V} - \sum_{in} \beta \dot{m} \vec{V} \quad (6–25) $$
Along the **$x$-coordinate**:
$$ \sum F_x = \dot{m} (\beta_2 V_{2,x} - \beta_1 V_{1,x}) \quad (6–27) $$

---

**EXAMPLE 6–2: The Force to Hold a Deflector Elbow in Place**
Water flow $\dot{m} = 14 \text{ kg/s}$, $30^\circ$ upward deflection. $A_{in} = 113 \text{ cm}^2, A_{out} = 7 \text{ cm}^2$, $\Delta z = 0.3 \text{ m}$.
**Analysis:** 
$V_1 = 1.24 \text{ m/s}, V_2 = 20.0 \text{ m/s}$.
Using Bernoulli for inlet pressure $P_{1,gage}$:
$$ P_{1,gage} = \rho g \left( \frac{V_2^2 - V_1^2}{2g} + z_2 - z_1 \right) = 202.2 \text{ kPa} $$
Momentum equation for anchoring force $F_{Rx}$:
$$ F_{Rx} + P_{1,gage} A_1 = \beta \dot{m} V_2 \cos \theta - \beta \dot{m} V_1 $$
$$ F_{Rx} = (1.03)(14)[20 \cos 30^\circ - 1.24] - (202,200)(0.0113) = 232 - 2285 = -2053 \text{ N} $$

---

**EXAMPLE 6–3: The Force to Hold a Reversing Elbow in Place**
Same as Ex 6–2 but $180^\circ$ U-turn ($V_{2,x} = -V_2$).
**Analysis:** 
$$ F_{Rx} + P_{1,gage} A_1 = \beta \dot{m} (-V_2) - \beta \dot{m} V_1 = -\beta \dot{m} (V_2 + V_1) $$
$$ F_{Rx} = -(1.03)(14)(20 + 1.24) - (202,200)(0.0113) = -306 - 2285 = -2591 \text{ N} $$

---

**EXAMPLE 4–4: Water Jet Striking a Stationary Plate**
$\dot{m} = 10 \text{ kg/s}$, $V_1 = 20 \text{ m/s}$. Jet splatters in $yz$-plane ($V_{2,x} = 0$).
**Analysis:** 
$$ -F_R = 0 - \beta \dot{m} V_1 \to F_R = \beta \dot{m} V_1 = (1)(10)(20) = 200 \text{ N} $$

---

**EXAMPLE 6–5: Power Generation and Wind Loading of a Wind Turbine**
$D = 30 \text{ ft}$, $V_{wind} = 7 \text{ mph}$.
**Analysis:** 
$\dot{m} = \rho V_1 A_1 = 551.7 \text{ lbm/s}$.
Max power available: $\dot{W}_{max} = \dot{m} V_1^2 / 2 = 1.225 \text{ kW}$.
Efficiency: $\eta = \dot{W}_{act} / \dot{W}_{max} = 0.4 / 1.225 = 32.7\%$.
Force on mast: $F_R = \dot{m}(V_2 - V_1) = -31.5 \text{ lbf}$.
Average velocity through turbine (Eq. 4):
$$ V_3 = \frac{V_1 + V_2}{2} $$

---

---

## Betz Limit for Wind Turbines
The maximum efficiency of an ideal wind turbine is determined by setting the derivative of efficiency $\eta_{wind \, turbine}$ with respect to $a$ (induction factor) to zero. This gives $a = 1/3$ and:
$$ \eta_{wind \, turbine} = 16/27 = 0.593 $$
This is known as the **Betz limit**.

---

**EXAMPLE 6–6: Repositioning of a Satellite**
$m_{sat} = 5000 \text{ kg}, m_f = 100 \text{ kg}, V_f = 3000 \text{ m/s}, \Delta t = 2 \text{ s}$.
**Analysis:** 
Acceleration $a_{sat} = \frac{\dot{m}_f V_f}{m_{sat}} = \frac{(100 \text{ kg} / 2 \text{ s})(3000 \text{ m/s})}{5000 \text{ kg}} = 30 \text{ m/s}^2$.
Velocity change: $\Delta V_{sat} = a_{sat} \Delta t = (30)(2) = 60 \text{ m/s}$.
Thrust: $F_{sat} = \dot{m}_f V_f = (50 \text{ kg/s})(3000 \text{ m/s}) = 150 \text{ kN}$.

---

**EXAMPLE 6–7: Net Force on a Flange**
Water flow $18.5 \text{ gal/min}$, $P_{in} = 13 \text{ psig}$, Weight $W = 12.8 \text{ lbf}$.
**Analysis:** 
$V_1 = V_2 = 12.42 \text{ ft/s}, \dot{m} = 2.568 \text{ lbm/s}$.
$x$-momentum: $F_{Rx} + P_{1,gage} A_1 = \beta \dot{m} (0) - \beta \dot{m} V_1 \to F_{Rx} = -7.20 \text{ lbf}$.
$z$-momentum: $F_{Rz} - W_{total} = \beta \dot{m} (-V_2) - 0 \to F_{Rz} = 11.8 \text{ lbf}$.
Net force: $\vec{F}_R = -7.20 \vec{i} + 11.8 \vec{k} \text{ lbf}$.

---

## 6–5 ■ REVIEW OF ROTATIONAL MOTION AND ANGULAR MOMENTUM

Rotational motion is described by angular quantities:
- **Angular distance:** $\theta$ (rad).
- **Angular velocity:** $\omega = d\theta/dt = V/r \quad (6–30)$.
- **Angular acceleration:** $\alpha = d\omega/dt = a_t/r \quad (6–31)$.

**Torque (Moment):**
$$ M = r F_t = r(ma_t) = mr^2 \alpha = I\alpha \quad (6–33) $$
**Angular Momentum:**
$$ H = rmV = r^2 m \omega = I\omega \quad (6–34) $$

**Newton’s Second Law for Rotation:**
$$ \sum \vec{M} = I\vec{\alpha} = \frac{d\vec{H}_{sys}}{dt} \quad (6–45) $$

---

## 6–6 ■ THE ANGULAR MOMENTUM EQUATION

Applying RTT to angular momentum ($B = \vec{H}, b = \vec{r} \times \vec{V}$):
$$ \sum \vec{M} = \frac{d}{dt} \int_{CV} (\vec{r} \times \vec{V})\rho \, dV + \int_{CS} (\vec{r} \times \vec{V})\rho (\vec{V}_r \cdot \vec{n}) dA \quad (6–47) $$

### Special Case: Steady Flow
$$ \sum \vec{M} = \sum_{out} \vec{r} \times \dot{m} \vec{V} - \sum_{in} \vec{r} \times \dot{m} \vec{V} \quad (6–51) $$
In scalar form (for moments in the same plane):
$$ \sum M = \sum_{out} r \dot{m} V - \sum_{in} r \dot{m} V \quad (6–52) $$

### Radial-Flow Devices
In a centrifugal pump (Fig. 6–35), fluid enters axially and leaves tangentially.
Conservation of mass:
$$ \dot{V} = (2\pi r_1 b_1) V_{1,n} = (2\pi r_2 b_2) V_{2,n} \quad (6–55) $$
where $b$ is the flow width.
Average normal velocities:
$$ V_{1,n} = \frac{\dot{V}}{2\pi r_1 b_1}, \quad V_{2,n} = \frac{\dot{V}}{2\pi r_2 b_2} \quad (6–56) $$

---

---

## Euler’s Turbine Formula

For a CV enclosing a rotating impeller (Fig. 6–36), only the tangential velocity components contribute to torque. The angular momentum equation gives:
$$ T_{shaft} = \dot{m} (r_2 V_{2,t} - r_1 V_{1,t}) \quad (6–57) $$
In terms of absolute flow angles $\alpha_1, \alpha_2$ with the radial direction:
$$ T_{shaft} = \dot{m} (r_2 V_2 \sin \alpha_2 - r_1 V_1 \sin \alpha_1) \quad (6–58) $$

For the ideal case where fluid follows the blade:
$$ T_{shaft,ideal} = \dot{m} \omega (r_2^2 - r_1^2) \quad (6–59) $$
Shaft power:
$$ \dot{W}_{shaft} = \omega T_{shaft} = 2\pi \dot{n} T_{shaft} \quad (6–38) $$

---

**EXAMPLE 6–8: Bending Moment Acting at the Base of a Water Pipe**
L-shaped pipe ($2\text{-m}$ vertical, $1\text{-m}$ horizontal). $\dot{V} = 3 \text{ m/s}, D = 10 \text{ cm}$.
**Analysis:** 
Mass flow $\dot{m} = 23.56 \text{ kg/s}$. Weight of horizontal section $W = 118 \text{ N}$.
Moment equation about point A:
$$ M_A - r_1 W = -r_2 \dot{m} V_2 $$
$$ M_A = (0.5 \text{ m})(118 \text{ N}) - (2 \text{ m})(23.56 \text{ kg/s})(3 \text{ m/s}) = -82.5 \text{ N}\cdot\text{m} $$
The moment at the base is $82.5 \text{ N}\cdot\text{m}$ clockwise.

---

**EXAMPLE 6–9: Power Generation from a Sprinkler System**
4 nozzles, $D = 1 \text{ cm}, r = 0.6 \text{ m}, \dot{V} = 20 \text{ L/s}, 300 \text{ rpm}$.
**Analysis:** 
$V_{jet} = 63.66 \text{ m/s}$. Blade speed $V_{nozzle} = \omega r = 18.85 \text{ m/s}$.
Relative velocity crossing CS: $V_r = V_{jet} - V_{nozzle} = 44.81 \text{ m/s}$.
Torque: $T_{shaft} = r \dot{m}_{total} V_r = (0.6)(20)(44.81) = 537.7 \text{ N}\cdot\text{m}$.
Power: $\dot{W} = \omega T_{shaft} = (31.42 \text{ rad/s})(537.7 \text{ N}\cdot\text{m}) = 16.9 \text{ kW}$.

---

## SUMMARY (Chapter 6: Final)

- **Linear Momentum:** $\sum \vec{F} = \frac{d}{dt} \int_{CV} \rho \vec{V} dV + \int_{CS} \beta \rho \vec{V} (\vec{V} \cdot \vec{n}) dA$.
- **Momentum correction factor:** $\beta = 1.33$ (laminar), $\beta \cong 1.02$ (turbulent).
- **Angular Momentum:** $\sum \vec{M} = \frac{d}{dt} \int_{CV} (\vec{r} \times \vec{V})\rho dV + \int_{CS} (\vec{r} \times \vec{V})\rho (\vec{V} \cdot \vec{n}) dA$.
- **Turbomachinery power:** $\dot{W}_{shaft} = \dot{m} \omega (r_2 V_{2,t} - r_1 V_{1,t})$.

---

## PROBLEMS (Chapter 6)

**6–12C** Firefighters with nozzles: straight vs. U-turn. The U-turn nozzle experiences a greater reaction force because of the change in direction of momentum.
**6–17C** Force $F$ on a plate from water jet. If $V$ doubles, $F$ quadruples because $F = \dot{m}V$ and $\dot{m} \propto V$.
**6–25** Reducing elbow ($30 \text{ kg/s}, 45^\circ$). $A_1 = 150 \text{ cm}^2, A_2 = 25 \text{ cm}^2, \Delta z = 40 \text{ cm}$. Determine anchoring force.
**6–33** Wind turbine ($D=90\text{ m}, V=25\text{ km/h}, \eta=32\%$). Determine power generated and force on mast.
**6–42** Sluice gate width $w$:
$$ F_R = \dot{m}(V_1 - V_2) + \frac{w}{2} \rho g (y_1^2 - y_2^2) $$
**6–51** Pelton wheel power:
$$ \dot{W}_{shaft} = \rho \omega r \dot{V} (V_j - \omega r)(1 - \cos \beta) $$
Numerical: $\rho=1000, r=2\text{ m}, \dot{V}=10, 150\text{ rpm}, \beta=160^\circ, V_j=50$.

---

---

## PROBLEMS (Chapter 6: Final)

**6–58** Water flow in a U-pipe section (Fig. P6–58). Flange (1): $P_{abs} = 200 \text{ kPa}, \dot{m} = 30 \text{ kg/s}$. Flange (2): $P = 150 \text{ kPa}$. Outlet (3): $\dot{m} = 8 \text{ kg/s}$ to atmosphere. Determine $x$ and $z$ forces. $\beta = 1.03$.

**6–59** Tripod holding a nozzle ($D=5 \text{ cm}$). Tripod fails at $1800 \text{ N}$. Determine water velocity and flow rate at failure. Answers: $30.2 \text{ m/s}, 0.0593 \text{ m}^3\text{/s}$.

**6–60** Airplane with jet engine. Exhaust gas at $18 \text{ kg/s}$ at $V = 250 \text{ m/s}$ relative to plane. Determine thrust (a) before and (b) after $160^\circ$ thrust reverser deployment.

**6–66** Indiana Jones ascend a $10\text{-m}$ building using four $5\text{-cm}$ nozzles pointing down. Total mass $150 \text{ kg}$. (a) Minimum jet velocity to lift? (b) Time to rise $10 \text{ m}$ if $V = 15 \text{ m/s}$? Answers: (a) $13.7 \text{ m/s}$, (b) $3.2 \text{ s}$.

**6–73** Two-armed sprinkler, $60 \text{ L/s}$, $D_{jet} = 2 \text{ cm}$, arm $L = 0.45 \text{ m}$. Determine rotational speed $\dot{n}$ for $\theta = 0^\circ, 30^\circ, 60^\circ$.

---
