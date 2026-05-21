# CHAPTER 3: PRESSURE AND FLUID STATICS

This chapter deals with forces applied by fluids at rest or in rigid-body motion. The fluid property responsible for those forces is pressure, which is a normal force exerted by a fluid per unit area. We start this chapter with a detailed discussion of pressure, including absolute and gage pressures, the pressure at a point, the variation of pressure with depth in a gravitational field, the manometer, the barometer, and pressure measurement devices. This is followed by a discussion of the hydrostatic forces applied on submerged bodies with plane or curved surfaces. We then consider the buoyant force applied by fluids on submerged or floating bodies, and discuss the stability of such bodies. Finally, we apply Newton’s second law of motion to a body of fluid in motion that acts as a rigid body and analyze the variation of pressure in fluids that undergo linear acceleration and in rotating containers.

### OBJECTIVES
When you finish reading this chapter, you should be able to:
- Determine the variation of pressure in a fluid at rest.
- Calculate the forces exerted by a fluid at rest on plane or curved submerged surfaces.
- Analyze the rigid-body motion of fluids in containers during linear acceleration or rotation.

---

## 3–1 ■ PRESSURE

**Pressure** is defined as a normal force exerted by a fluid per unit area. We speak of pressure only when we deal with a gas or a liquid. The counterpart of pressure in solids is normal stress. Since pressure is defined as force per unit area, it has the unit of newtons per square meter ($\text{N/m}^2$), which is called a **pascal (Pa)**. That is,
$$ 1 \text{ Pa} = 1 \text{ N/m}^2 $$

The pressure unit pascal is too small for pressures encountered in practice. Therefore, its multiples kilopascal ($1 \text{ kPa} = 10^3 \text{ Pa}$) and megapascal ($1 \text{ MPa} = 10^6 \text{ Pa}$) are commonly used. Other units:
- $1 \text{ bar} = 10^5 \text{ Pa} = 0.1 \text{ MPa} = 100 \text{ kPa}$
- $1 \text{ atm} = 101,325 \text{ Pa} = 101.325 \text{ kPa} = 1.01325 \text{ bars}$
- $1 \text{ kgf/cm}^2 = 9.807 \text{ N/cm}^2 = 9.807 \times 10^4 \text{ Pa} = 0.9807 \text{ bar} = 0.9679 \text{ atm}$

In the English system, the pressure unit is **pound-force per square inch** ($\text{lbf/in}^2$, or **psi**), and $1 \text{ atm} = 14.696 \text{ psi}$.

![FIGURE 3–1: The normal stress (or “pressure”) on the feet of a chubby person is much greater than on the feet of a slim person.](path/to/image3-1.jpg)

The actual pressure at a given position is called the **absolute pressure**, and it is measured relative to absolute vacuum. Most pressure-measuring devices are calibrated to read zero in the atmosphere, and so they indicate the **gage pressure**. Pressures below atmospheric pressure are called **vacuum pressures**.

$$ P_{gage} = P_{abs} - P_{atm} \quad (3–1) $$
$$ P_{vac} = P_{atm} - P_{abs} \quad (3–2) $$

![FIGURE 3–3: Absolute, gage, and vacuum pressures.](path/to/image3-3.jpg)

**EXAMPLE 3–1: Absolute Pressure of a Vacuum Chamber**
A vacuum gage reads $5.8 \text{ psi}$ where $P_{atm} = 14.5 \text{ psi}$.
**Analysis:** $P_{abs} = P_{atm} - P_{vac} = 14.5 - 5.8 = 8.7 \text{ psi}$.

### Pressure at a Point

Pressure at any point in a fluid is the same in all directions. It has magnitude but not a specific direction, and thus it is a **scalar quantity**. This is demonstrated by considering a small wedge-shaped fluid element (Fig. 3–4).

![FIGURE 3–4: Forces acting on a wedge-shaped fluid element in equilibrium.](path/to/image3-4.jpg)

Force balance in $x$ and $z$ directions:
$$ \sum F_x = ma_x = 0: \quad P_1 \Delta z - P_3 \ell \sin \theta = 0 \quad (3–3a) $$
$$ \sum F_z = ma_z = 0: \quad P_2 \Delta x - P_3 \ell \cos \theta - \frac{1}{2} \rho g \Delta x \Delta z = 0 \quad (3–3b) $$
As the wedge shrinks to a point ($\Delta z \to 0$):
$$ P_1 = P_2 = P_3 = P \quad (3–5) $$

### Variation of Pressure with Depth

Pressure in a fluid at rest increases with depth because more fluid rests on deeper layers. For a rectangular fluid element (Fig. 3–6):
$$ \sum F_z = ma_z = 0: \quad P_2 \Delta x - P_1 \Delta x - \rho g \Delta x \Delta z = 0 \quad (3–6) $$
$$ \Delta P = P_2 - P_1 = \rho g \Delta z = \gamma_s \Delta z \quad (3–7) $$

If point 1 is at the free surface ($P_1 = P_{atm}$):
$$ P = P_{atm} + \rho g h \quad \text{or} \quad P_{gage} = \rho g h \quad (3–8) $$

For fluids with variable density:
$$ \frac{dP}{dz} = -\rho g \quad (3–9) $$

**Pascal’s Law:** The pressure applied to a confined fluid increases the pressure throughout by the same amount.
$$ P_1 = P_2 \to \frac{F_1}{A_1} = \frac{F_2}{A_2} \to \frac{F_2}{F_1} = \frac{A_2}{A_1} \quad (3–11) $$

---

## 3–2 ■ THE MANOMETER

A fluid column can be used to measure pressure differences. Such a device is called a **manometer**.
$$ P_2 = P_{atm} + \rho g h \quad (3–12) $$

![FIGURE 3–11: The basic manometer.](path/to/image3-11.jpg)

**EXAMPLE 3–2: Measuring Pressure with a Manometer**
$SG = 0.85$, $h = 55 \text{ cm}$, $P_{atm} = 96 \text{ kPa}$.
**Analysis:** $\rho = 0.85(1000) = 850 \text{ kg/m}^3$.
$$ P = P_{atm} + \rho g h = 96 \text{ kPa} + (850 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.55 \text{ m}) = 100.6 \text{ kPa} $$

For multiple immiscible fluids (Fig. 3–13):
$$ P_{atm} + \rho_1 g h_1 + \rho_2 g h_2 + \rho_3 g h_3 = P_1 $$

**EXAMPLE 3–3: Measuring Pressure with a Multifluid Manometer**
$P_1 + \rho_{water} g h_1 + \rho_{oil} g h_2 - \rho_{mercury} g h_3 = P_{atm}$
$P_1 = 130 \text{ kPa}$ (after substitution).

---

## Other Pressure Measurement Devices

- **Bourdon tube:** Hollow metal tube bent like a hook.
- **Pressure transducers:** Convert pressure to electrical signal (voltage, resistance, capacitance).
- **Strain-gage pressure transducers:** Use a diaphragm that deflects under pressure.
- **Piezoelectric transducers:** Generate voltage when compressed.

---

---

## 3–3 ■ THE BAROMETER AND ATMOSPHERIC PRESSURE

Atmospheric pressure is measured by a device called a **barometer**; thus, the atmospheric pressure is often referred to as the **barometric pressure**.

The Italian Evangelista Torricelli (1608–1647) was the first to conclusively prove that the atmospheric pressure can be measured by inverting a mercury-filled tube into a mercury container open to the atmosphere. Writing a force balance in the vertical direction (Fig. 3–17):
$$ P_{atm} = \rho g h \quad (3–15) $$
where $\rho$ is the density of mercury, $g$ is the local gravitational acceleration, and $h$ is the height of the mercury column.

![FIGURE 3–17: The basic barometer.](path/to/image3-17.jpg)

The standard atmosphere is defined as the pressure produced by a column of mercury $760 \text{ mm}$ in height at $0^\circ\text{C}$ ($\rho_{Hg} = 13,595 \text{ kg/m}^3$) under standard gravity ($g = 9.807 \text{ m/s}^2$). 
$$ 1 \text{ atm} = 760 \text{ torr} = 101.325 \text{ kPa} $$

**EXAMPLE 3–5: Measuring Atmospheric Pressure with a Barometer**
Determine $P_{atm}$ if the reading is $740 \text{ mm Hg}$ and $g = 9.81 \text{ m/s}^2$. 
**Analysis:** 
$$ P_{atm} = \rho g h = (13,570 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.74 \text{ m}) = 98.5 \text{ kPa} $$

**EXAMPLE 3–6: Effect of Piston Weight on Pressure in a Cylinder**
A piston of mass $60 \text{ kg}$ and area $0.04 \text{ m}^2$. Local $P_{atm} = 0.97 \text{ bar}$.
**Analysis:** 
$$ P = P_{atm} + \frac{mg}{A} = 0.97 \text{ bar} + \frac{(60 \text{ kg})(9.81 \text{ m/s}^2)}{0.04 \text{ m}^2} \left( \frac{1 \text{ bar}}{10^5 \text{ Pa}} \right) = 1.12 \text{ bars} $$

---

## 3–4 ■ INTRODUCTION TO FLUID STATICS

Fluid statics deals with problems associated with fluids at rest. The fluid can be either gaseous (**aerostatics**) or liquid (**hydrostatics**). In fluid statics, there are no shear (tangential) stresses; the only stress is the normal stress, which is the pressure.

---

## 3–5 ■ HYDROSTATIC FORCES ON SUBMERGED PLANE SURFACES

A plate exposed to a liquid is subjected to fluid pressure distributed over its surface. We need to determine the magnitude of the force and its point of application, called the **center of pressure**.

![FIGURE 3–25: Hydrostatic force on an inclined plane surface completely submerged in a liquid.](path/to/image3-25.jpg)

The absolute pressure at any point on the plate is:
$$ P = P_0 + \rho g h = P_0 + \rho g y \sin \theta \quad (3–16) $$
Integrating the force $P dA$ over the entire surface area:
$$ F_R = \int_A P dA = \int_A (P_0 + \rho g y \sin \theta) dA = P_0 A + \rho g \sin \theta \int_A y dA \quad (3–17) $$
Using the centroid coordinate $y_C = \frac{1}{A} \int_A y dA$:
$$ F_R = (P_0 + \rho g y_C \sin \theta)A = (P_0 + \rho g h_C)A = P_C A \quad (3–19) $$
where $P_C$ is the pressure at the centroid.

### Line of Action (Center of Pressure)
The vertical location $y_P$ of the line of action is determined by equating moments:
$$ y_P F_R = P_0 y_C A + \rho g \sin \theta I_{xx,O} \quad (3–20) $$
Using the parallel axis theorem $I_{xx,O} = I_{xx,C} + y_C^2 A$:
$$ y_P = y_C + \frac{I_{xx,C}}{[y_C + P_0/(\rho g \sin \theta)]A} \quad (3–22a) $$
If $P_0$ (gage pressure approach) is ignored:
$$ y_P = y_C + \frac{I_{xx,C}}{y_C A} \quad (3–22b) $$

### TABLE: Centroidal Moments of Inertia (Fig. 3–28)
- **Rectangle:** $A = ab$, $I_{xx,C} = ab^3/12$
- **Circle:** $A = \pi R^2$, $I_{xx,C} = \pi R^4/4$
- **Triangle:** $A = ab/2$, $I_{xx,C} = ab^3/36$

### Special Case: Submerged Rectangular Plate (Fig. 3–30)
- **Tilted:** $F_R = [P_0 + \rho g(s + b/2) \sin \theta]ab$
- **Vertical:** $F_R = [P_0 + \rho g(s + b/2)]ab$
- **Horizontal:** $F_R = (P_0 + \rho g h)ab$

---

**EXAMPLE 3–8: Hydrostatic Force Acting on the Door of a Submerged Car**
A car is submerged in water at a depth of $8 \text{ m}$ (top edge of the door). The door is $1.2 \text{ m}$ high and $1 \text{ m}$ wide.
**Analysis:** The average pressure on the door:
$$ P_{ave} = P_C = \rho g h_C = \rho g (s + b/2) = (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(8 + 1.2/2 \text{ m}) \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right) = 84.4 \text{ kN/m}^2 $$
The resultant force:
$$ F_R = P_{ave} A = (84.4 \text{ kN/m}^2)(1 \text{ m} \times 1.2 \text{ m}) = 101.3 \text{ kN} $$
The pressure center $y_P$:
$$ y_P = s + \frac{b}{2} + \frac{b^2}{12(s + b/2)} = 8 + \frac{1.2}{2} + \frac{1.2^2}{12(8 + 1.2/2)} = 8.61 \text{ m} $$

---

## 3–6 ■ HYDROSTATIC FORCES ON SUBMERGED CURVED SURFACES

For a submerged curved surface, we determine the horizontal ($F_H$) and vertical ($F_V$) components separately (Fig. 3–32).
- **Horizontal component:** Equal to the force on the vertical projection of the curved surface.
$$ F_H = F_x \quad (3–29) $$
- **Vertical component:** Equal to the weight of the fluid block above plus (or minus) the force on the horizontal projection.
$$ F_V = F_y \pm W \quad (3–30) $$
The resultant force is $F_R = \sqrt{F_H^2 + F_V^2}$ and its direction is $\tan \alpha = F_V / F_H$.

![FIGURE 3–32: Determination of the hydrostatic force acting on a submerged curved surface.](path/to/image3-32.jpg)

**EXAMPLE 3–9: A Gravity-Controlled Cylindrical Gate**
Radius $R = 0.8 \text{ m}$. Water level at $5 \text{ m}$.
**Analysis:** 
Horizontal force: $F_H = \rho g (s + R/2)A = 36.1 \text{ kN}$.
Vertical force (upward): $F_y = \rho g h_{bottom} A = 39.2 \text{ kN}$.
Weight of fluid block $W = 1.3 \text{ kN}$.
Net upward force: $F_V = F_y - W = 37.9 \text{ kN}$.
Resultant: $F_R = \sqrt{36.1^2 + 37.9^2} = 52.3 \text{ kN}$ at $\theta = 46.4^\circ$.

---

## 3–7 ■ BUOYANCY AND STABILITY

A fluid exerts an upward force on a body immersed in it, called the **buoyant force** $F_B$.
$$ F_B = F_{bottom} - F_{top} = \rho_f g (s + h)A - \rho_f g s A = \rho_f g h A = \rho_f g V \quad (3–32) $$
**Archimedes’ principle:** The buoyant force acting on a body is equal to the weight of the fluid displaced by the body, and it acts upward through the centroid of the displaced volume.

For floating bodies:
$$ \frac{V_{sub}}{V_{total}} = \frac{\rho_{ave, body}}{\rho_f} \quad (3–33) $$

![FIGURE 3–38: The buoyant forces acting on a solid body submerged in a fluid and on a fluid body of the same shape.](path/to/image3-38.jpg)

### Stability of Immersed and Floating Bodies

- **Immersed body:** Stable if the center of gravity $G$ is below the center of buoyancy $B$. Neutrally stable if $G$ and $B$ coincide. Unstable if $G$ is above $B$.
- **Floating body:** Can be stable even if $G$ is above $B$ because the centroid of the displaced volume shifts during rotation. Stability is measured by the **metacentric height** $GM$. 
    - Stable if $M$ is above $G$ ($GM > 0$).
    - Unstable if $M$ is below $G$ ($GM < 0$).

![FIGURE 3–44: Stability of immersed bodies.](path/to/image3-44.jpg)
![FIGURE 3–46: Stability of floating bodies and the metacenter M.](path/to/image3-46.jpg)

---

---

## 3–8 ■ FLUIDS IN RIGID-BODY MOTION

In this section, we obtain relations for the variation of pressure in fluids moving like a solid body with or without acceleration in the absence of any shear stresses. No shear stresses develop within the fluid body since there is no deformation.

Consider a differential rectangular fluid element (Fig. 3–48). Newton’s second law of motion for this element:
$$ \delta \vec{F} = \delta m \cdot \vec{a} \quad (3–34) $$
where $\delta m = \rho \, dV = \rho \, dx \, dy \, dz$.

The net surface force acting on the element in the $z$-direction:
$$ \delta F_{S,z} = \left( P - \frac{\partial P}{\partial z} \frac{dz}{2} \right) dx \, dy - \left( P + \frac{\partial P}{\partial z} \frac{dz}{2} \right) dx \, dy = -\frac{\partial P}{\partial z} dx \, dy \, dz \quad (3–35) $$

In vector form, the surface force is:
$$ \delta \vec{F}_S = -\left( \frac{\partial P}{\partial x} \vec{i} + \frac{\partial P}{\partial y} \vec{j} + \frac{\partial P}{\partial z} \vec{k} \right) dx \, dy \, dz = -\vec{\nabla} P \, dx \, dy \, dz \quad (3–37) $$

The total force (surface + body force):
$$ \delta \vec{F} = \delta \vec{F}_S + \delta \vec{F}_B = -(\vec{\nabla} P + \rho g \vec{k}) dx \, dy \, dz \quad (3–40) $$

**General equation of motion for rigid-body motion:**
$$ \vec{\nabla} P + \rho g \vec{k} = -\rho \vec{a} \quad (3–41) $$

Scalar forms:
$$ \frac{\partial P}{\partial x} = -\rho a_x, \quad \frac{\partial P}{\partial y} = -\rho a_y, \quad \frac{\partial P}{\partial z} = -\rho(g + a_z) \quad (3–43) $$

### Special Case 1: Fluids at Rest
For $\vec{a} = 0$:
$$ \frac{\partial P}{\partial x} = 0, \quad \frac{\partial P}{\partial y} = 0, \quad \frac{dP}{dz} = -\rho g \quad (3–44) $$

### Special Case 2: Free Fall of a Fluid Body
For $a_z = -g$:
$$ \frac{\partial P}{\partial x} = 0, \quad \frac{\partial P}{\partial y} = 0, \quad \frac{\partial P}{\partial z} = 0 \to P = \text{constant} \quad (3–45) $$

---

## Acceleration on a Straight Path

For a container moving with constant acceleration $a_x$ and $a_z$:
$$ \frac{\partial P}{\partial x} = -\rho a_x, \quad \frac{\partial P}{\partial y} = 0, \quad \frac{\partial P}{\partial z} = -\rho(g + a_z) \quad (3–46) $$
Pressure variation:
$$ P = P_0 - \rho a_x x - \rho(g + a_z)z \quad (3–49) $$

**Vertical rise of surface:**
$$ \Delta z_s = z_{s2} - z_{s1} = -\frac{a_x}{g + a_z} (x_2 - x_1) \quad (3–50) $$
$$ \text{Slope} = \frac{dz_{isobar}}{dx} = -\frac{a_x}{g + a_z} = -\tan \theta \quad (3–52) $$

**EXAMPLE 3–12: Overflow from a Water Tank During Acceleration**
Truck accelerates from 0 to 90 km/h in 10 s ($a_x = 2.5 \text{ m/s}^2$).
**Analysis:** $\tan \theta = \frac{a_x}{g} = \frac{2.5}{9.81} = 0.255 \to \theta = 14.3^\circ$.
Rise at the back: $\Delta z_{s1} = (b/2) \tan \theta$.

---

## Rotation in a Cylindrical Container

For a container rotated at constant angular velocity $\omega$ (Fig. 3–53):
$$ \frac{\partial P}{\partial r} = \rho r \omega^2, \quad \frac{\partial P}{\partial \theta} = 0, \quad \frac{\partial P}{\partial z} = -\rho g \quad (3–53) $$
Differential pressure: $dP = \rho r \omega^2 dr - \rho g dz$.

**Surfaces of constant pressure (paraboloids):**
$$ z_{isobar} = \frac{\omega^2}{2g} r^2 + C_1 \quad (3–56) $$
**Equation of the free surface:**
$$ z_s = h_0 - \frac{\omega^2}{4g} (R^2 - 2r^2) \quad (3–61) $$
Maximum height difference: $\Delta z_{s,max} = z_s(R) - z_s(0) = \frac{\omega^2 R^2}{2g} \quad (3–62)$.

**EXAMPLE 3–13: Rising of a Liquid During Rotation**
$D = 20 \text{ cm}$, $h_{liquid} = 50 \text{ cm}$. Determine speed at which liquid spills.
**Analysis:** $z_s(R) = 0.6 \text{ m}$. $h_0 = 0.5 \text{ m}$.
$$ \omega = \sqrt{\frac{4g[z_s(R) - h_0]}{R^2}} = 19.8 \text{ rad/s} = 189 \text{ rpm} $$

---

## SUMMARY (Chapter 3)

- Pressure variation with elevation: $dP/dz = -\rho g$.
- Hydrostatic force on plane surface: $F_R = P_C A$.
- Center of pressure: $y_P = y_C + \frac{I_{xx,C}}{y_C A}$.
- Archimedes' principle: $F_B = \rho_f g V$.
- Metacentric height $GM$ for stability.

---

## PROBLEMS

**3–7** A vacuum gage reads 24 kPa where $P_{atm} = 92 \text{ kPa}$. Determine $P_{abs}$.
**3–9** Determine gage pressure in Fig. P3–9 with $h_1=0.2\text{m}, h_2=0.3\text{m}, h_3=0.46\text{m}$.
**3–12** Absolute pressure at 5 m depth is 145 kPa. Determine $P_{atm}$.
**3–19** Hiker's barometer: 930 mbar to 780 mbar. Determine vertical distance climbed ($\rho_{air}=1.20 \text{ kg/m}^3$).
**3–20** Use barometer to measure building height. $P_{top}=730 \text{ mmHg}, P_{bot}=755 \text{ mmHg}$.

---

---

## PROBLEMS (Chapter 3: Continued)

**3–22** Determine the pressure exerted on a diver at $30 \text{ m}$ below the free surface of the sea. Assume $P_{bar} = 101 \text{ kPa}$ and $SG = 1.03$ for seawater. Answer: $404.0 \text{ kPa}$

**3–24** A gas is contained in a vertical, frictionless piston–cylinder device. The piston has a mass of $4 \text{ kg}$ and area $35 \text{ cm}^2$. A compressed spring exerts $60 \text{ N}$ on the piston. $P_{atm} = 95 \text{ kPa}$. Determine the pressure inside. Answer: $123.4 \text{ kPa}$

**3–26** Both a gage and a manometer are attached to a gas tank. If the gage reads $80 \text{ kPa}$, determine the distance $h$ between the fluid levels if the fluid is (a) mercury ($\rho = 13,600 \text{ kg/m}^3$) or (b) water ($\rho = 1000 \text{ kg/m}^3$).

**3–29** A mercury manometer is connected to an air duct. $\Delta h = 15 \text{ mm}$, $P_{atm} = 100 \text{ kPa}$. Determine the absolute pressure in the duct.

**3–31** Blood pressure of a healthy person is $120/80 \text{ mmHg}$. Express these gage pressures in $\text{kPa}$, $\text{psi}$, and meter water column.

**3–32** The maximum blood pressure in the upper arm is $120 \text{ mmHg}$. Determine how high the blood will rise in a vertical tube. $\rho_{blood} = 1050 \text{ kg/m}^3$.

**3–33** Consider a $1.8\text{-m}$-tall man submerged in a pool. Determine the pressure difference between the head and the toes.

**3–35** A hydraulic lift has an output diameter of $30 \text{ cm}$ and lifts $2000 \text{ kg}$. Determine the gage pressure required.

**3–36** Freshwater and seawater pipelines connected by a double U-tube manometer (Fig. P3–36). Determine the pressure difference. $\rho_{sw} = 1035 \text{ kg/m}^3$.

**3–40** The gage pressure of air in the tank (Fig. P3–40) is $65 \text{ kPa}$. Determine the height $h$ of the mercury column.

**3–43** A $500\text{-kg}$ load on a hydraulic lift is to be raised by pouring oil ($\rho = 780 \text{ kg/m}^3$) into a thin tube. Determine height $h$ needed.

**3–46** An inverted glass filled with water and covered with paper. Determine the pressure at the bottom of the glass and explain why water does not fall out.

**3–49** Pressure difference between oil and water pipes measured by a double-fluid manometer (Fig. P3–49).

**3–51** Two water tanks connected by an inclined mercury manometer. $\Delta P = 20 \text{ kPa}$, calculate $a$ and $\theta$.

**3–60** Submerged car door ($1.1 \text{ m}$ high, $0.9 \text{ m}$ wide, top edge at $8 \text{ m}$). Determine net force and center of pressure for (a) air-filled cabin, (b) water-filled cabin.

**3–64** A room in a cruise ship has a $30\text{-cm}$ circular window. Midpoint is $5 \text{ m}$ below surface. Determine hydrostatic force and pressure center. $SG = 1.025$. Answer: $3554 \text{ N}, 5.001 \text{ m}$.

**3–73** A retaining wall against a mud slide ($\rho_{mud} = 1800 \text{ kg/m}^3$). Concrete blocks ($0.8 \text{ m}$ high, $0.2 \text{ m}$ wide, $\rho = 2700 \text{ kg/m}^3$). Friction $\mu = 0.3$. Determine mud height for sliding or tipping.

**3–82** Density of a liquid determined by a cylindrical hydrometer.

**3–85** A cubic ice block floating in seawater ($SG_{ice}=0.92, SG_{sw}=1.025$). If $10 \text{ cm}$ extends above surface, determine height below surface. Answer: $87.6 \text{ cm}$.

**3–88** Procedure for fat-to-muscle ratio based on average body density: $x_{fat} = (\rho_{muscle} - \rho_{ave})/(\rho_{muscle} - \rho_{fat})$.

**3–95** Two tanks: (1) $8 \text{ m}$ high, stationary; (2) $2 \text{ m}$ high, moving up with $a = 5 \text{ m/s}^2$. Which has higher bottom pressure?

**3–102** Milk ($\rho = 1020 \text{ kg/m}^3$) in a $7\text{-m}$-long tanker accelerating at $2.5 \text{ m/s}^2$. Determine max pressure if min is $100 \text{ kPa}$. Answer: $47.9 \text{ kPa}$.

**3–111** Helium balloon ($D = 10 \text{ m}$) carrying two $70\text{-kg}$ people. $\rho_{air} = 1.16 \text{ kg/m}^3$. Determine acceleration when released. Answer: $16.5 \text{ m/s}^2$.

**3–118** Pressure cooker with petcock ($A = 4 \text{ mm}^2$). $P_{atm} = 101 \text{ kPa}$.

---

---

## PROBLEMS (Chapter 3: Continued)

**3–119** A glass tube is attached to a water pipe. If the water pressure at the bottom is $115 \text{ kPa}$ and $P_{atm} = 92 \text{ kPa}$, determine how high $h$ the water will rise. Answer: $2.35 \text{ m}$ (assuming $g=9.8 \text{ m/s}^2$).

**3–120** Atmospheric pressure function of altitude: $P_{atm} = 101.325 (1 - 0.02256z)^{5.256} \text{ kPa}$. Determine pressures at Atlanta ($306 \text{ m}$), Denver ($1610 \text{ m}$), etc.

**3–121** Inclined manometer at $35^\circ$. $\Delta h = 8 \text{ cm}$ (vertical). Determine gage pressure and length $L$.

**3–123** IV infusion driven by gravity. (a) If pressures balance at $1.2 \text{ m}$ height, determine blood gage pressure. (b) If $20 \text{ kPa}$ is needed at arm level, determine bottle height. $\rho = 1020 \text{ kg/m}^3$.

**3–128** U-tube with mercury and oil ($SG = 2.72$). Determine max oil volume added to the left arm. Answer: $0.256 \text{ L}$.

**3–133** Calibration of pressure transducers: $P = aI + b$. Use tabulated data for $\Delta h$ and current $I$ (mA).

**3–142** A 50-ton hemispherical dome. Determine water height $h$ in the tube to lift the dome using Pascal's law. Answer: $0.77 \text{ m}$.

**3–151** Inverted cylindrical container ($W = 79 \text{ N}$) pressed into water. Determine $h$ and force $F$.

---

**CHAPTER 3: PRESSURE AND FLUID STATICS**

**Pressure, Manometer, and Barometer**

**3-1C**
**Solution** We are to discuss the difference between gage pressure and absolute pressure.
**Analysis** The pressure relative to the atmospheric pressure is called the **gage pressure**, and the pressure relative to an **absolute vacuum** is called **absolute pressure**.
**Discussion** Most pressure gages (like your bicycle tire gage) read relative to atmospheric pressure, and therefore read the gage pressure.

---

**3-2C**
**Solution** We are to explain nose bleeding and shortness of breath at high elevation.
**Analysis** Atmospheric air pressure which is the external pressure exerted on the skin decreases with increasing elevation. Therefore, the pressure is lower at higher elevations. As a result, the difference between the blood pressure in the veins and the air pressure outside increases. This pressure imbalance may cause some thin-walled veins such as the ones in the nose to burst, causing bleeding. The shortness of breath is caused by the lower air density at higher elevations, and thus lower amount of oxygen per unit volume.
**Discussion** People who climb high mountains like Mt. Everest suffer other physical problems due to the low pressure.

---

**3-3C**
**Solution** We are to examine a claim about absolute pressure.
**Analysis** No, the absolute pressure in a liquid of constant density does not double when the depth is doubled. It is the **gage pressure** that doubles when the depth is doubled.
**Discussion** This is analogous to temperature scales – when performing analysis using something like the ideal gas law, you must use absolute temperature (K), not relative temperature (°C), or you will run into the same kind of problem.

---

**3-4C**
**Solution** We are to compare the pressure on the surfaces of a cube.
**Analysis** Since pressure increases with depth, the pressure on the bottom face of the cube is higher than that on the top. The pressure varies linearly along the side faces. However, if the lengths of the sides of the tiny cube suspended in water by a string are very small, the magnitudes of the pressures on all sides of the cube are nearly the same.
**Discussion** In the limit of an “infinitesimal cube”, we have a fluid particle, with pressure $P$ defined at a “point”.

---

**3-5C**
**Solution** We are to define Pascal’s law and give an example.
**Analysis** **Pascal’s law** states that the pressure applied to a confined fluid increases the pressure throughout by the same amount. This is a consequence of the pressure in a fluid remaining constant in the horizontal direction. An example of Pascal’s principle is the operation of the hydraulic car jack.
**Discussion** The above discussion applies to fluids at rest (hydrostatics). When fluids are in motion, Pascal’s principle does not necessarily apply. However, as we shall see in later chapters, the differential equations of incompressible fluid flow contain only pressure gradients, and thus an increase in pressure in the whole system does not affect fluid motion.

---

**3-6C**
**Solution** We are to compare the volume and mass flow rates of two fans at different elevations.
**Analysis** The density of air at sea level is higher than the density of air on top of a high mountain. Therefore, the volume flow rates of the two fans running at identical speeds will be the same, but the mass flow rate of the fan at sea level will be higher.
**Discussion** In reality, the fan blades on the high mountain would experience less frictional drag, and hence the fan motor would not have as much resistance – the rotational speed of the fan on the mountain would be slightly higher than that at sea level.

---

**3-7**
**Solution** The pressure in a vacuum chamber is measured by a vacuum gage. The absolute pressure in the chamber is to be determined.
**Analysis** The absolute pressure in the chamber is determined from
$P_{\text{abs}} = P_{\text{atm}} - P_{\text{vac}} = 92 - 24 = \mathbf{68 \text{ kPa}}$
**Discussion** We must remember that “vacuum pressure” is the negative of gage pressure – hence the negative sign.

---

**3-8E**
**Solution** The pressure in a tank is measured with a manometer by measuring the differential height of the manometer fluid. The absolute pressure in the tank is to be determined for two cases: the manometer arm with the (a) higher and (b) lower fluid level being attached to the tank.
**Assumptions** The fluid in the manometer is incompressible.
**Properties** The specific gravity of the fluid is given to be $SG = 1.25$. The density of water at 32°F is $62.4 \text{ lbm/ft}^3$.
**Analysis** The density of the fluid is obtained by multiplying its specific gravity by the density of water,
$\rho = SG \times \rho_{\text{H2O}} = (1.25)(62.4 \text{ lbm/ft}^3) = 78.0 \text{ lbm/ft}^3$.
The pressure difference corresponding to a differential height of 28 in between the two arms of the manometer is
$\Delta P = \rho g h = (78 \text{ lbm/ft}^3)(32.174 \text{ ft/s}^2)(28/12 \text{ ft}) \left( \frac{1 \text{ lbf}}{32.174 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = 1.26 \text{ psia}$
Then the absolute pressures in the tank for the two cases become:
(a) The fluid level in the arm attached to the tank is higher (vacuum):
$P_{\text{abs}} = P_{\text{atm}} - P_{\text{vac}} = 12.7 - 1.26 = 11.44 \text{ psia} \cong \mathbf{11.4 \text{ psia}}$
(b) The fluid level in the arm attached to the tank is lower:
$P_{\text{abs}} = P_{\text{gage}} + P_{\text{atm}} = 12.7 + 1.26 = 13.96 \text{ psia} \cong \mathbf{14.0 \text{ psia}}$
**Discussion** The final results are reported to three significant digits. Note that we can determine whether the pressure in a tank is above or below atmospheric pressure by simply observing the side of the manometer arm with the higher fluid level.

---

**3-9**
**Solution** The pressure in a pressurized water tank is measured by a multi-fluid manometer. The gage pressure of air in the tank is to be determined.
**Assumptions** The air pressure in the tank is uniform (i.e., its variation with elevation is negligible due to its low density), and thus we can determine the pressure at the air-water interface.
**Properties** The densities of mercury, water, and oil are given to be $13,600, 1000, \text{ and } 850 \text{ kg/m}^3$, respectively.
**Analysis** Starting with the pressure at point 1 at the air-water interface, and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach point 2, and setting the result equal to $P_{\text{atm}}$ since the tube is open to the atmosphere gives
$P_1 + \rho_{\text{water}} g h_1 + \rho_{\text{oil}} g h_2 - \rho_{\text{mercury}} g h_3 = P_{\text{atm}}$
Solving for $P_1$,
$P_1 = P_{\text{atm}} - \rho_{\text{water}} g h_1 - \rho_{\text{oil}} g h_2 + \rho_{\text{mercury}} g h_3$
or,
$P_1 - P_{\text{atm}} = g (\rho_{\text{mercury}} h_3 - \rho_{\text{water}} h_1 - \rho_{\text{oil}} h_2)$
Noting that $P_{1, \text{ gage}} = P_1 - P_{\text{atm}}$ and substituting,
$P_{1, \text{ gage}} = (9.81 \text{ m/s}^2) [(13,600 \text{ kg/m}^3)(0.46 \text{ m}) - (1000 \text{ kg/m}^3)(0.2 \text{ m}) - (850 \text{ kg/m}^3)(0.3 \text{ m})] \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{56.9 \text{ kPa}}$
**Discussion** Note that jumping horizontally from one tube to the next and realizing that pressure remains the same in the same fluid simplifies the analysis greatly.

---

**3-10**
**Solution** The barometric reading at a location is given in height of mercury column. The atmospheric pressure is to be determined.
**Properties** The density of mercury is given to be $13,600 \text{ kg/m}^3$.
**Analysis** The atmospheric pressure is determined directly from
$P_{\text{atm}} = \rho g h = (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.750 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 100.1 \text{ kPa} \cong \mathbf{100 \text{ kPa}}$
**Discussion** We round off the final answer to three significant digits. 100 kPa is a fairly typical value of atmospheric pressure on land slightly above sea level.

---

**3-11**
**Solution** The gage pressure in a liquid at a certain depth is given. The gage pressure in the same liquid at a different depth is to be determined.
**Assumptions** The variation of the density of the liquid with depth is negligible.
**Analysis** The gage pressure at two different depths of a liquid can be expressed as $P_1 = \rho g h_1$ and $P_2 = \rho g h_2$. Taking their ratio,
$\frac{P_2}{P_1} = \frac{\rho g h_2}{\rho g h_1} = \frac{h_2}{h_1}$
Solving for $P_2$ and substituting gives
$P_2 = \frac{h_2}{h_1} P_1 = \frac{12 \text{ m}}{3 \text{ m}} (28 \text{ kPa}) = \mathbf{112 \text{ kPa}}$
**Discussion** Note that the gage pressure in a given fluid is proportional to depth.

---

**3-12**
**Solution** The absolute pressure in water at a specified depth is given. The local atmospheric pressure and the absolute pressure at the same depth in a different liquid are to be determined.
**Assumptions** The liquid and water are incompressible.
**Properties** The specific gravity of the fluid is given to be $SG = 0.85$. We take the density of water to be $1000 \text{ kg/m}^3$. Then density of the liquid is obtained by multiplying its specific gravity by the density of water,
$\rho = SG \times \rho_{\text{H2O}} = (0.85)(1000 \text{ kg/m}^3) = 850 \text{ kg/m}^3$
**Analysis** (a) Knowing the absolute pressure, the atmospheric pressure can be determined from
$P_{\text{atm}} = P - \rho g h = (145 \text{ kPa}) - (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(5 \text{ m}) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{96.0 \text{ kPa}}$
(b) The absolute pressure at a depth of 5 m in the other liquid is
$P = P_{\text{atm}} + \rho g h = (96.0 \text{ kPa}) + (850 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(5 \text{ m}) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 137.7 \text{ kPa} \cong \mathbf{138 \text{ kPa}}$
**Discussion** Note that at a given depth, the pressure in the lighter fluid is lower, as expected.

---

**3-13E**
**Solution** It is to be shown that 1 kgf/cm$^2$ = 14.223 psi.
**Analysis** Noting that 1 kgf = 9.80665 N, 1 N = 0.22481 lbf, and 1 in = 2.54 cm, we have
1 kgf = 9.80665 N = (9.80665 N) $\left( \frac{0.22481 \text{ lbf}}{1 \text{ N}} \right) = 2.20463 \text{ lbf}$
and 1 kgf/cm$^2$ = 2.20463 lbf/cm$^2$ = (2.20463 lbf/cm$^2$) $\left( \frac{2.54 \text{ cm}}{1 \text{ in}} \right)^2 = 14.223 \text{ lbf/in}^2 = \mathbf{14.223 \text{ psi}}$
**Discussion** This relationship may be used as a conversion factor.

---

**3-14E**
**Solution** The weight and the foot imprint area of a person are given. The pressures this man exerts on the ground when he stands on one and on both feet are to be determined.
**Assumptions** The weight of the person is distributed uniformly on foot imprint area.
**Analysis** The weight of the man is given to be 200 lbf. Noting that pressure is force per unit area, the pressure this man exerts on the ground is
(a) On one foot: $P = \frac{W}{A} = \frac{200 \text{ lbf}}{36 \text{ in}^2} = 5.56 \text{ lbf/in}^2 = \mathbf{5.56 \text{ psi}}$
(a) On both feet: $P = \frac{W}{2A} = \frac{200 \text{ lbf}}{2 \times 36 \text{ in}^2} = 2.78 \text{ lbf/in}^2 = \mathbf{2.78 \text{ psi}}$
**Discussion** Note that the pressure exerted on the ground (and on the feet) is reduced by half when the person stands on both feet.

---

**3-15**
**Solution** The mass of a woman is given. The minimum imprint area per shoe needed to enable her to walk on the snow without sinking is to be determined.
**Assumptions** 1 The weight of the person is distributed uniformly on the imprint area of the shoes. 2 One foot carries the entire weight of a person during walking, and the shoe is sized for walking conditions (rather than standing). 3 The weight of the shoes is negligible.
**Analysis** The mass of the woman is given to be 70 kg. For a pressure of 0.5 kPa on the snow, the imprint area of one shoe must be
$A = \frac{W}{P} = \frac{mg}{P} = \frac{(70 \text{ kg})(9.81 \text{ m/s}^2)}{0.5 \text{ kPa}} \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{1.37 \text{ m}^2}$
**Discussion** This is a very large area for a shoe, and such shoes would be impractical to use. Therefore, some sinking of the snow should be allowed to have shoes of reasonable size.

---

**3-16**
**Solution** The vacuum pressure reading of a tank is given. The absolute pressure in the tank is to be determined.
**Properties** The density of mercury is given to be $\rho = 13,590 \text{ kg/m}^3$.
**Analysis** The atmospheric (or barometric) pressure can be expressed as
$P_{\text{atm}} = \rho g h = (13,590 \text{ kg/m}^3)(9.807 \text{ m/s}^2)(0.755 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 100.6 \text{ kPa}$
Then the absolute pressure in the tank becomes
$P_{\text{abs}} = P_{\text{atm}} - P_{\text{vac}} = 100.6 - 30 = \mathbf{70.6 \text{ kPa}}$
**Discussion** The gage pressure in the tank is the negative of the vacuum pressure, i.e., $P_{\text{gage}} = -30.0 \text{ kPa}$.

---

**3-17E**
**Solution** A pressure gage connected to a tank reads 50 psi. The absolute pressure in the tank is to be determined.
**Properties** The density of mercury is given to be $\rho = 848.4 \text{ lbm/ft}^3$.
**Analysis** The atmospheric (or barometric) pressure can be expressed as
$P_{\text{atm}} = \rho g h = (848.4 \text{ lbm/ft}^3)(32.174 \text{ ft/s}^2)(29.1/12 \text{ ft}) \left( \frac{1 \text{ lbf}}{32.174 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = 14.29 \text{ psia}$
Then the absolute pressure in the tank is
$P_{\text{abs}} = P_{\text{gage}} + P_{\text{atm}} = 50 + 14.29 = 64.29 \text{ psia} \cong \mathbf{64.3 \text{ psia}}$
**Discussion** This pressure is more than four times as much as standard atmospheric pressure.

---

**3-18**
**Solution** A pressure gage connected to a tank reads 500 kPa. The absolute pressure in the tank is to be determined.
**Analysis** The absolute pressure in the tank is determined from
$P_{\text{abs}} = P_{\text{gage}} + P_{\text{atm}} = 500 + 94 = \mathbf{594 \text{ kPa}}$
**Discussion** This pressure is almost six times greater than standard atmospheric pressure.

---

**3-19**
**Solution** A mountain hiker records the barometric reading before and after a hiking trip. The vertical distance climbed is to be determined.
**Assumptions** The variation of air density and the gravitational acceleration with altitude is negligible.
**Properties** The density of air is given to be $\rho = 1.20 \text{ kg/m}^3$.
**Analysis** Taking an air column between the top and the bottom of the mountain and writing a force balance per unit base area, we obtain
$W_{\text{air}} / A = P_{\text{bottom}} - P_{\text{top}}$
$(\rho g h)_{\text{air}} = P_{\text{bottom}} - P_{\text{top}}$
$(1.20 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(h) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ bar}}{100,000 \text{ N/m}^2} \right) = (0.930 - 0.780) \text{ bar}$
It yields $h = 1274 \text{ m} \cong \mathbf{1270 \text{ m}}$ (to 3 significant digits), which is also the distance climbed.
**Discussion** A similar principle is used in some aircraft instruments to measure elevation.

---

**3-20**
**Solution** A barometer is used to measure the height of a building by recording reading at the bottom and at the top of the building. The height of the building is to be determined.
**Assumptions** The variation of air density with altitude is negligible.
**Properties** The density of air is given to be $\rho = 1.18 \text{ kg/m}^3$. The density of mercury is $13,600 \text{ kg/m}^3$.
**Analysis** Atmospheric pressures at the top and at the bottom of the building are
$P_{\text{top}} = (\rho g h)_{\text{top}} = (13,600 \text{ kg/m}^3)(9.807 \text{ m/s}^2)(0.730 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 97.36 \text{ kPa}$
$P_{\text{bottom}} = (\rho g h)_{\text{bottom}} = (13,600 \text{ kg/m}^3)(9.807 \text{ m/s}^2)(0.755 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 100.70 \text{ kPa}$
Taking an air column between the top and the bottom of the building, we write a force balance per unit base area,
$(\rho g h)_{\text{air}} = P_{\text{bottom}} - P_{\text{top}}$
$(1.18 \text{ kg/m}^3)(9.807 \text{ m/s}^2)(h) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = (100.70 - 97.36) \text{ kPa}$
which yields $h = 288.6 \text{ m} \cong \mathbf{289 \text{ m}}$, which is also the height of the building.
**Discussion** There are more accurate ways to measure the height of a building, but this method is quite simple.

---

**3-21**
**Solution** The previous problem is reconsidered. The EES solution is to be printed out, including proper units.
**Analysis** The EES Equations window is printed below, followed by the Solution window.
```ees
P_bottom=755"[mmHg]"
P_top=730"[mmHg]"
g=9.807 "[m/s^2]" "local acceleration of gravity at sea level"
rho=1.18"[kg/m^3]" 
DELTAP_abs=(P_bottom-P_top)*CONVERT('mmHg','kPa')"[kPa]" 
DELTAP_h =rho*g*h/1000 "[kPa]" 
DELTAP_abs=DELTAP_h 
```
**SOLUTION**
Variables in Main
$DELTAP\_abs=3.333 \text{ [kPa]}$
$DELTAP\_h=3.333 \text{ [kPa]}$
$g=9.807 \text{ [m/s}^2]$
$h=\mathbf{288 \text{ [m]}}$
$P\_bottom=755 \text{ [mmHg]}$
$P\_top=730 \text{ [mmHg]}$
$rho=1.18 \text{ [kg/m}^3]$
**Discussion** To obtain the solution in EES, simply click on the icon that looks like a calculator, or Calculate-Solve.

---

**3-22**
**Solution** A diver is moving at a specified depth from the water surface. The pressure exerted on the surface of the diver by the water is to be determined.
**Assumptions** The variation of the density of water with depth is negligible.
**Properties** The specific gravity of sea water is given to be $SG = 1.03$. We take the density of water to be $1000 \text{ kg/m}^3$.
**Analysis** The density of the sea water is obtained by multiplying its specific gravity by the density of water:
$\rho = SG \times \rho_{\text{H2O}} = (1.03)(1000 \text{ kg/m}^3) = 1030 \text{ kg/m}^3$
The pressure exerted on a diver at 30 m below the free surface of the sea is the absolute pressure at that location:
$P = P_{\text{atm}} + \rho g h = (101 \text{ kPa}) + (1030 \text{ kg/m}^3)(9.807 \text{ m/s}^2)(30 \text{ m}) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{404 \text{ kPa}}$
**Discussion** This is about 4 times the normal sea level value of atmospheric pressure.

---

**3-23E**
**Solution** A submarine is cruising at a specified depth from the water surface. The pressure exerted on the surface of the submarine by water is to be determined.
**Assumptions** The variation of the density of water with depth is negligible.
**Properties** The specific gravity of sea water is given to be $SG = 1.03$. The density of water at 32°F is $62.4 \text{ lbm/ft}^3$.
**Analysis** The density of the seawater is obtained by multiplying its specific gravity by the density of water,
$\rho = SG \times \rho_{\text{H2O}} = (1.03)(62.4 \text{ lbm/ft}^3) = 64.27 \text{ lbm/ft}^3$
The pressure exerted on the surface of the submarine cruising 300 ft below the free surface of the sea is the absolute pressure at that location:
$P = P_{\text{atm}} + \rho g h = (14.7 \text{ psia}) + (64.27 \text{ lbm/ft}^3)(32.174 \text{ ft/s}^2)(300 \text{ ft}) \left( \frac{1 \text{ lbf}}{32.174 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = 148.6 \text{ psia} \cong \mathbf{149 \text{ psia}}$
where we have rounded the final answer to three significant digits.
**Discussion** This is more than 10 times the value of atmospheric pressure at sea level.

---

**3-24**
**Solution** A gas contained in a vertical piston-cylinder device is pressurized by a spring and by the weight of the piston. The pressure of the gas is to be determined.
**Analysis** Drawing the free body diagram of the piston and balancing the vertical forces yields
$P A = P_{\text{atm}} A + W + F_{\text{spring}}$
Thus,
$P = P_{\text{atm}} + \frac{mg + F_{\text{spring}}}{A} = (95 \text{ kPa}) + \frac{(4 \text{ kg})(9.807 \text{ m/s}^2) + 60 \text{ N}}{35 \times 10^{-4} \text{ m}^2} \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 123.4 \text{ kPa} \cong \mathbf{123 \text{ kPa}}$
**Discussion** This setup represents a crude but functional way to control the pressure in a tank.

---

**3-25**
**Solution** The previous problem is reconsidered. The effect of the spring force in the range of 0 to 500 N on the pressure inside the cylinder is to be investigated. The pressure against the spring force is to be plotted, and results are to be discussed.
**Analysis** The EES Equations window is printed below, followed by the tabulated and plotted results.
```ees
g=9.807"[m/s^2]"
P_atm= 95"[kPa]"
m_piston=4"[kg]"
{F_spring=60"[N]"}
A=35*CONVERT('cm^2','m^2')"[m^2]"
W_piston=m_piston*g"[N]"
F_atm=P_atm*A*CONVERT('kPa','N/m^2')"[N]"
F_gas= F_atm+F_spring+W_piston"[N]"
P_gas=F_gas/A*CONVERT('N/m^2','kPa')"[kPa]"
```
| $F_{\text{spring}}$ [N] | $P_{\text{gas}}$ [kPa] |
| :--- | :--- |
| 0 | 106.2 |
| 55.56 | 122.1 |
| 111.1 | 138 |
| 166.7 | 153.8 |
| 222.2 | 169.7 |
| 277.8 | 185.6 |
| 333.3 | 201.4 |
| 388.9 | 217.3 |
| 444.4 | 233.2 |
| 500 | 249.1 |
**Discussion** The relationship is linear, as expected.

---

**3-26**
**Solution** Both a pressure gage and a manometer are attached to a tank of gas to measure its pressure. For a specified reading of gage pressure, the difference between the fluid levels of the two arms of the manometer is to be determined for mercury and water.
**Properties** The densities of water and mercury are given to be $\rho_{\text{water}} = 1000 \text{ kg/m}^3$ and $\rho_{\text{Hg}} = 13,600 \text{ kg/m}^3$.
**Analysis** The gage pressure is related to the vertical distance $h$ between the two fluid levels by
$P_{\text{gage}} = \rho g h \longrightarrow h = \frac{P_{\text{gage}}}{\rho g}$
(a) For mercury,
$h = \frac{80 \text{ kPa}}{(13,600 \text{ kg/m}^3)(9.807 \text{ m/s}^2)} \left( \frac{1000 \text{ kg/m} \cdot \text{s}^2}{1 \text{ kPa} \cdot \text{m}} \right) = \mathbf{0.60 \text{ m}}$
(b) For water,
$h = \frac{80 \text{ kPa}}{(1000 \text{ kg/m}^3)(9.807 \text{ m/s}^2)} \left( \frac{1000 \text{ kg/m} \cdot \text{s}^2}{1 \text{ kPa} \cdot \text{m}} \right) = \mathbf{8.16 \text{ m}}$
**Discussion** The manometer with water is more precise since the column height is bigger (better resolution). However, a column of water more than 8 meters high would be impractical, so mercury is the better choice of manometer fluid here.

---

**3-27**
**Solution** The previous problem is reconsidered. The effect of the manometer fluid density in the range of 800 to 13,000 kg/m$^3$ on the differential fluid height of the manometer is to be investigated. Differential fluid height is to be plotted as a function of the density, and the results are to be discussed.
**Analysis** The EES Equations window is printed below, followed by the tabulated and plotted results.
```ees
Function fluid_density(Fluid$) 
 If fluid$='Mercury' then fluid_density=13600 else fluid_density=1000 
end 
P_atm = 101.325 "kpa" 
DELTAP=80 "kPa"
g=9.807 "m/s2"
rho=Fluid_density(Fluid$) 
DELTAP = RHO*g*h/1000 
h_mm=h*convert('m','mm') 
P_abs= P_atm + DELTAP 
```
| $h_{\text{mm}}$ [mm] | $\rho$ [kg/m$^3$] |
| :--- | :--- |
| 10197 | 800 |
| 3784 | 2156 |
| 2323 | 3511 |
| 1676 | 4867 |
| 1311 | 6222 |
| 1076 | 7578 |
| 913.1 | 8933 |
| 792.8 | 10289 |
| 700.5 | 11644 |
| 627.5 | 13000 |
**Discussion** Many comments are provided in the Equation window above to help you learn some of the features of EES.

---

**3-28**
**Solution** The air pressure in a tank is measured by an oil manometer. For a given oil-level difference between the two columns, the absolute pressure in the tank is to be determined.
**Properties** The density of oil is given to be $\rho = 850 \text{ kg/m}^3$.
**Analysis** The absolute pressure in the tank is determined from
$P = P_{\text{atm}} + \rho g h = (98 \text{ kPa}) + (850 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.45 \text{ m}) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 101.75 \text{ kPa} \cong \mathbf{102 \text{ kPa}}$
**Discussion** If a heavier liquid, such as water, were used for the manometer fluid, the column height would be smaller, and thus the reading would be less precise (lower resolution).

---

**3-29**
**Solution** The air pressure in a duct is measured by a mercury manometer. For a given mercury-level difference between the two columns, the absolute pressure in the duct is to be determined.
**Properties** The density of mercury is given to be $\rho = 13,600 \text{ kg/m}^3$.
**Analysis** (a) The pressure in the duct is above atmospheric pressure since the fluid column on the duct side is at a lower level.
(b) The absolute pressure in the duct is determined from
$P = P_{\text{atm}} + \rho g h = (100 \text{ kPa}) + (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.015 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 102.00 \text{ kPa} \cong \mathbf{102 \text{ kPa}}$
**Discussion** When measuring pressures in a fluid flow, the difference between two pressures is usually desired. In this case, the difference is between the measurement point and atmospheric pressure.

---

**3-30**
**Solution** The air pressure in a duct is measured by a mercury manometer. For a given mercury-level difference between the two columns, the absolute pressure in the duct is to be determined.
**Properties** The density of mercury is given to be $\rho = 13,600 \text{ kg/m}^3$.
**Analysis** (a) The pressure in the duct is above atmospheric pressure since the fluid column on the duct side is at a lower level.
(b) The absolute pressure in the duct is determined from
$P = P_{\text{atm}} + \rho g h = (100 \text{ kPa}) + (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.030 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = 104.00 \text{ kPa} \cong \mathbf{104 \text{ kPa}}$
**Discussion** The final result is given to three significant digits.

---

**3-31**
**Solution** The systolic and diastolic pressures of a healthy person are given in mm of Hg. These pressures are to be expressed in kPa, psi, and meters of water column.
**Assumptions** Both mercury and water are incompressible substances.
**Properties** We take the densities of water and mercury to be $1000 \text{ kg/m}^3$ and $13,600 \text{ kg/m}^3$, respectively.
**Analysis** Using the relation $P = \rho g h$ for gage pressure, the high and low pressures are expressed as
$P_{\text{high}} = \rho g h_{\text{high}} = (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.12 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{16.0 \text{ kPa}}$
$P_{\text{low}} = \rho g h_{\text{low}} = (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.08 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{10.7 \text{ kPa}}$
Noting that 1 psi = 6.895 kPa,
$P_{\text{high}} = (16.0 \text{ kPa}) \left( \frac{1 \text{ psi}}{6.895 \text{ kPa}} \right) = \mathbf{2.32 \text{ psi}}$
$P_{\text{low}} = (10.7 \text{ kPa}) \left( \frac{1 \text{ psi}}{6.895 \text{ kPa}} \right) = \mathbf{1.55 \text{ psi}}$
For a given pressure, the relation $P = \rho g h$ is expressed for mercury and water as $P = \rho_{\text{water}} g h_{\text{water}} = \rho_{\text{mercury}} g h_{\text{mercury}} \longrightarrow h_{\text{water}} = \frac{\rho_{\text{mercury}}}{\rho_{\text{water}}} h_{\text{mercury}}$
Therefore,
$h_{\text{water, high}} = \frac{13,600 \text{ kg/m}^3}{1000 \text{ kg/m}^3} (0.12 \text{ m}) = \mathbf{1.63 \text{ m}}$
$h_{\text{water, low}} = \frac{13,600 \text{ kg/m}^3}{1000 \text{ kg/m}^3} (0.08 \text{ m}) = \mathbf{1.09 \text{ m}}$
**Discussion** Note that measuring blood pressure with a water manometer would involve water column heights higher than the person’s height, and thus it is impractical. This problem shows why mercury is a suitable fluid for blood pressure measurement devices.

---

**3-32**
**Solution** A vertical tube open to the atmosphere is connected to the vein in the arm of a person. The height that the blood rises in the tube is to be determined.
**Assumptions** 1 The density of blood is constant. 2 The gage pressure of blood is 120 mmHg.
**Properties** The density of blood is given to be $\rho = 1050 \text{ kg/m}^3$.
**Analysis** For a given gage pressure, the relation $P = \rho g h$ can be expressed for mercury and blood as $P = \rho_{\text{blood}} g h_{\text{blood}} = \rho_{\text{mercury}} g h_{\text{mercury}}$. Setting these two relations equal to each other we get
$P = \rho_{\text{blood}} g h_{\text{blood}} = \rho_{\text{mercury}} g h_{\text{mercury}}$
Solving for blood height and substituting gives
$h_{\text{blood}} = \frac{\rho_{\text{mercury}}}{\rho_{\text{blood}}} h_{\text{mercury}} = \frac{13,600 \text{ kg/m}^3}{1050 \text{ kg/m}^3} (0.12 \text{ m}) = \mathbf{1.55 \text{ m}}$
**Discussion** Note that the blood can rise about one and a half meters in a tube connected to the vein. This explains why IV tubes must be placed high to force a fluid into the vein of a patient.

---

**3-33**
**Solution** A man is standing in water vertically while being completely submerged. The difference between the pressure acting on his head and the pressure acting on his toes is to be determined.
**Assumptions** Water is an incompressible substance, and thus the density does not change with depth.
**Properties** We take the density of water to be $\rho = 1000 \text{ kg/m}^3$.
**Analysis** The pressures at the head and toes of the person can be expressed as
$P_{\text{head}} = P_{\text{atm}} + \rho g h_{\text{head}}$ and $P_{\text{toe}} = P_{\text{atm}} + \rho g h_{\text{toe}}$
where $h$ is the vertical distance of the location in water from the free surface. The pressure difference between the toes and the head is determined by subtracting the first relation above from the second,
$P_{\text{toe}} - P_{\text{head}} = \rho g h_{\text{toe}} - \rho g h_{\text{head}} = \rho g (h_{\text{toe}} - h_{\text{head}})$
Substituting,
$P_{\text{toe}} - P_{\text{head}} = (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(1.80 \text{ m} - 0) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{17.7 \text{ kPa}}$
**Discussion** This problem can also be solved by noting that the atmospheric pressure (1 atm = 101.325 kPa) is equivalent to 10.3-m of water height, and finding the pressure that corresponds to a water height of 1.8 m.

---

**3-34**
**Solution** Water is poured into the U-tube from one arm and oil from the other arm. The water column height in one arm and the ratio of the heights of the two fluids in the other arm are given. The height of each fluid in that arm is to be determined.
**Assumptions** Both water and oil are incompressible substances.
**Properties** The density of oil is given to be $\rho_{\text{oil}} = 790 \text{ kg/m}^3$. We take the density of water to be $\rho_w = 1000 \text{ kg/m}^3$.
**Analysis** The height of water column in the left arm of the manometer is given to be $h_{w1} = 0.70 \text{ m}$. We let the height of water and oil in the right arm to be $h_{w2}$ and $h_a$, respectively. Then, $h_a = 6h_{w2}$. Noting that both arms are open to the atmosphere, the pressure at the bottom of the U-tube can be expressed as
$P_{\text{bottom}} = P_{\text{atm}} + \rho_w g h_{w1}$ and $P_{\text{bottom}} = P_{\text{atm}} + \rho_w g h_{w2} + \rho_a g h_a$
Setting them equal to each other and simplifying,
$\rho_w g h_{w1} = \rho_w g h_{w2} + \rho_a g h_a \longrightarrow \rho_w h_{w1} = \rho_w h_{w2} + \rho_a h_a \longrightarrow h_{w1} = h_{w2} + (\rho_a / \rho_w) h_a$
Noting that $h_a = 6h_{w2}$ and we take $\rho_a = \rho_{\text{oil}}$, the water and oil column heights in the second arm are determined to be
$0.7 \text{ m} = h_{w2} + (790/1000) 6 h_{w2} \longrightarrow h_{w2} = \mathbf{0.122 \text{ m}}$
$0.7 \text{ m} = 0.122 \text{ m} + (790/1000) h_a \longrightarrow h_a = \mathbf{0.732 \text{ m}}$
**Discussion** Note that the fluid height in the arm that contains oil is higher. This is expected since oil is lighter than water.

---

**3-35**
**Solution** The hydraulic lift in a car repair shop is to lift cars. The fluid gage pressure that must be maintained in the reservoir is to be determined.
**Assumptions** The weight of the piston of the lift is negligible.
**Analysis** Pressure is force per unit area, and thus the gage pressure required is simply the ratio of the weight of the car to the area of the lift,
$P_{\text{gage}} = \frac{W}{A} = \frac{mg}{\pi D^2 / 4} = \frac{(2000 \text{ kg})(9.81 \text{ m/s}^2)}{\pi (0.30 \text{ m})^2 / 4} \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right) = 278 \text{ kN/m}^2 = \mathbf{278 \text{ kPa}}$
**Discussion** Note that the pressure level in the reservoir can be reduced by using a piston with a larger area.

---

**3-36**
**Solution** Fresh and seawater flowing in parallel horizontal pipelines are connected to each other by a double U-tube manometer. The pressure difference between the two pipelines is to be determined.
**Assumptions** 1 All the liquids are incompressible. 2 The effect of air column on pressure is negligible.
**Properties** The densities of seawater and mercury are given to be $\rho_{\text{sea}} = 1035 \text{ kg/m}^3$ and $\rho_{\text{Hg}} = 13,600 \text{ kg/m}^3$. We take the density of water to be $\rho_w = 1000 \text{ kg/m}^3$.
**Analysis** Starting with the pressure in the fresh water pipe (point 1) and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the sea water pipe (point 2), and setting the result equal to $P_2$ gives
$P_1 + \rho_w g h_w - \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{air}} g h_{\text{air}} + \rho_{\text{sea}} g h_{\text{sea}} = P_2$
Rearranging and neglecting the effect of air column on pressure,
$P_1 - P_2 = -\rho_w g h_w + \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{sea}} g h_{\text{sea}} = g (\rho_{\text{Hg}} h_{\text{Hg}} - \rho_w h_w - \rho_{\text{sea}} h_{\text{sea}})$
Substituting,
$P_1 - P_2 = (9.81 \text{ m/s}^2) [(13,600 \text{ kg/m}^3)(0.1 \text{ m}) - (1000 \text{ kg/m}^3)(0.6 \text{ m}) - (1035 \text{ kg/m}^3)(0.4 \text{ m})] \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right)$
$= 3.39 \text{ kN/m}^2 = \mathbf{3.39 \text{ kPa}}$
Therefore, the pressure in the fresh water pipe is 3.39 kPa higher than the pressure in the sea water pipe.
**Discussion** A 0.70-m high air column with a density of $1.2 \text{ kg/m}^3$ corresponds to a pressure difference of 0.008 kPa. Therefore, its effect on the pressure difference between the two pipes is negligible.

---

**3-37**
**Solution** Fresh and seawater flowing in parallel horizontal pipelines are connected to each other by a double U-tube manometer. The pressure difference between the two pipelines is to be determined.
**Assumptions** All the liquids are incompressible.
**Properties** The densities of seawater and mercury are given to be $\rho_{\text{sea}} = 1035 \text{ kg/m}^3$ and $\rho_{\text{Hg}} = 13,600 \text{ kg/m}^3$. We take the density of water to be $\rho_w = 1000 \text{ kg/m}^3$. The specific gravity of oil is given to be 0.72, and thus its density is $720 \text{ kg/m}^3$.
**Analysis** Starting with the pressure in the fresh water pipe (point 1) and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the sea water pipe (point 2), and setting the result equal to $P_2$ gives
$P_1 + \rho_w g h_w - \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{oil}} g h_{\text{oil}} + \rho_{\text{sea}} g h_{\text{sea}} = P_2$
Rearranging,
$P_1 - P_2 = -\rho_w g h_w + \rho_{\text{Hg}} g h_{\text{Hg}} + \rho_{\text{oil}} g h_{\text{oil}} - \rho_{\text{sea}} g h_{\text{sea}} = g (\rho_{\text{Hg}} h_{\text{Hg}} + \rho_{\text{oil}} h_{\text{oil}} - \rho_w h_w - \rho_{\text{sea}} h_{\text{sea}})$
Substituting,
$P_1 - P_2 = (9.81 \text{ m/s}^2) [(13,600 \text{ kg/m}^3)(0.1 \text{ m}) + (720 \text{ kg/m}^3)(0.7 \text{ m}) - (1000 \text{ kg/m}^3)(0.6 \text{ m}) - (1035 \text{ kg/m}^3)(0.4 \text{ m})] \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right)$
$= 8.34 \text{ kN/m}^2 = \mathbf{8.34 \text{ kPa}}$
Therefore, the pressure in the fresh water pipe is 8.34 kPa higher than the pressure in the sea water pipe.
**Discussion** The result is greater than that of the previous problem since the oil is heavier than the air.

---

**3-38E**
**Solution** The pressure in a natural gas pipeline is measured by a double U-tube manometer with one of the arms open to the atmosphere. The absolute pressure in the pipeline is to be determined.
**Assumptions** 1 All the liquids are incompressible. 2 The effect of air column on pressure is negligible. 3 The pressure throughout the natural gas (including the tube) is uniform since its density is low.
**Properties** We take the density of water to be $\rho_w = 62.4 \text{ lbm/ft}^3$. The specific gravity of mercury is given to be 13.6, and thus its density is $\rho_{\text{Hg}} = 13.6 \times 62.4 = 848.6 \text{ lbm/ft}^3$.
**Analysis** Starting with the pressure at point 1 in the natural gas pipeline, and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the free surface of oil where the oil tube is exposed to the atmosphere, and setting the result equal to $P_{\text{atm}}$ gives
$P_1 - \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{water}} g h_{\text{water}} = P_{\text{atm}}$
Solving for $P_1$,
$P_1 = P_{\text{atm}} + \rho_{\text{Hg}} g h_{\text{Hg}} + \rho_{\text{water}} g h_{w1}$
Substituting,
$P_1 = 14.2 \text{ psia} + (32.2 \text{ ft/s}^2) [(848.6 \text{ lbm/ft}^3)(6/12 \text{ ft}) + (62.4 \text{ lbm/ft}^3)(27/12 \text{ ft})] \left( \frac{1 \text{ lbf}}{32.2 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = \mathbf{18.1 \text{ psia}}$
**Discussion** Note that jumping horizontally from one tube to the next and realizing that pressure remains the same in the same fluid simplifies the analysis greatly. Also, it can be shown that the 15-in high air column with a density of $0.075 \text{ lbm/ft}^3$ corresponds to a pressure difference of 0.00065 psi. Therefore, its effect on the pressure difference between the two pipes is negligible.

---

**3-39E**
**Solution** The pressure in a natural gas pipeline is measured by a double U-tube manometer with one of the arms open to the atmosphere. The absolute pressure in the pipeline is to be determined.
**Assumptions** 1 All the liquids are incompressible. 2 The pressure throughout the natural gas (including the tube) is uniform since its density is low.
**Properties** We take the density of water to be $\rho_w = 62.4 \text{ lbm/ft}^3$. The specific gravity of mercury is given to be 13.6, and thus its density is $\rho_{\text{Hg}} = 13.6 \times 62.4 = 848.6 \text{ lbm/ft}^3$. The specific gravity of oil is given to be 0.69, and thus its density is $\rho_{\text{oil}} = 0.69 \times 62.4 = 43.1 \text{ lbm/ft}^3$.
**Analysis** Starting with the pressure at point 1 in the natural gas pipeline, and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the free surface of oil where the oil tube is exposed to the atmosphere, and setting the result equal to $P_{\text{atm}}$ gives
$P_1 - \rho_{\text{Hg}} g h_{\text{Hg}} + \rho_{\text{oil}} g h_{\text{oil}} - \rho_{\text{water}} g h_{\text{water}} = P_{\text{atm}}$
Solving for $P_1$,
$P_1 = P_{\text{atm}} + \rho_{\text{Hg}} g h_{\text{Hg}} + \rho_{\text{water}} g h_1 - \rho_{\text{oil}} g h_{\text{oil}}$
Substituting,
$P_1 = 14.2 \text{ psia} + (32.2 \text{ ft/s}^2) [(848.6 \text{ lbm/ft}^3)(6/12 \text{ ft}) + (62.4 \text{ lbm/ft}^3)(27/12 \text{ ft}) - (43.1 \text{ lbm/ft}^3)(15/12 \text{ ft})] \left( \frac{1 \text{ lbf}}{32.2 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = \mathbf{17.7 \text{ psia}}$
**Discussion** Note that jumping horizontally from one tube to the next and realizing that pressure remains the same in the same fluid simplifies the analysis greatly.

---

**3-40**
**Solution** The gage pressure of air in a pressurized water tank is measured simultaneously by both a pressure gage and a manometer. The differential height $h$ of the mercury column is to be determined.
**Assumptions** The air pressure in the tank is uniform (i.e., its variation with elevation is negligible due to its low density), and thus the pressure at the air-water interface is the same as the indicated gage pressure.
**Properties** We take the density of water to be $\rho_w = 1000 \text{ kg/m}^3$. The specific gravities of oil and mercury are given to be 0.72 and 13.6, respectively.
**Analysis** Starting with the pressure of air in the tank (point 1), and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the free surface of oil where the oil tube is exposed to the atmosphere, and setting the result equal to $P_{\text{atm}}$ gives
$P_1 + \rho_w g h_w - \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{oil}} g h_{\text{oil}} = P_{\text{atm}}$
Rearranging,
$P_1 - P_{\text{atm}} = \rho_{\text{oil}} g h_{\text{oil}} + \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_w g h_w$
or,
$\frac{P_{1, \text{ gage}}}{\rho_w g} = SG_{\text{oil}} h_{\text{oil}} + SG_{\text{Hg}} h_{\text{Hg}} - h_w$
Substituting,
$\frac{65 \text{ kPa}}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kPa} \cdot \text{m}^2} \right) = 0.72(0.75 \text{ m}) + 13.6 \times h_{\text{Hg}} - 0.3 \text{ m}$
Solving for $h_{\text{Hg}}$ gives $h_{\text{Hg}} = \mathbf{0.47 \text{ m}}$. Therefore, the differential height of the mercury column must be 47 cm.
**Discussion** Double instrumentation like this allows one to verify the measurement of one of the instruments by the measurement of another instrument.

---

**3-41**
**Solution** The gage pressure of air in a pressurized water tank is measured simultaneously by both a pressure gage and a manometer. The differential height $h$ of the mercury column is to be determined.
**Assumptions** The air pressure in the tank is uniform (i.e., its variation with elevation is negligible due to its low density), and thus the pressure at the air-water interface is the same as the indicated gage pressure.
**Properties** We take the density of water to be $\rho_w = 1000 \text{ kg/m}^3$. The specific gravities of oil and mercury are given to be 0.72 and 13.6, respectively.
**Analysis** Starting with the pressure of air in the tank (point 1), and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the free surface of oil where the oil tube is exposed to the atmosphere, and setting the result equal to $P_{\text{atm}}$ gives
$P_1 + \rho_w g h_w - \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{oil}} g h_{\text{oil}} = P_{\text{atm}}$
Rearranging,
$P_1 - P_{\text{atm}} = \rho_{\text{oil}} g h_{\text{oil}} + \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_w g h_w$
or,
$\frac{P_{1, \text{ gage}}}{\rho_w g} = SG_{\text{oil}} h_{\text{oil}} + SG_{\text{Hg}} h_{\text{Hg}} - h_w$
Substituting,
$\frac{45 \text{ kPa}}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kPa} \cdot \text{m}^2} \right) = 0.72(0.75 \text{ m}) + 13.6 \times h_{\text{Hg}} - 0.3 \text{ m}$
Solving for $h_{\text{Hg}}$ gives $h_{\text{Hg}} = \mathbf{0.32 \text{ m}}$. Therefore, the differential height of the mercury column must be 32 cm.
**Discussion** Double instrumentation like this allows one to verify the measurement of one of the instruments by the measurement of another instrument.

---

**3-42**
**Solution** The top part of a water tank is divided into two compartments, and a fluid with an unknown density is poured into one side. The levels of the water and the liquid are measured. The density of the fluid is to be determined.
**Assumptions** 1 Both water and the added liquid are incompressible substances. 2 The added liquid does not mix with water.
**Properties** We take the density of water to be $\rho = 1000 \text{ kg/m}^3$.
**Analysis** Both fluids are open to the atmosphere. Noting that the pressure of both water and the added fluid is the same at the contact surface, the pressure at this surface can be expressed as
$P_{\text{contact}} = P_{\text{atm}} + \rho_f g h_f = P_{\text{atm}} + \rho_w g h_w$
Simplifying, we have $\rho_f g h_f = \rho_w g h_w$. Solving for $\rho_f$ gives
$\rho_f = \frac{h_w}{h_f} \rho_w = \frac{45 \text{ cm}}{80 \text{ cm}} (1000 \text{ kg/m}^3) = 562.5 \text{ kg/m}^3 \cong \mathbf{563 \text{ kg/m}^3}$
**Discussion** Note that the added fluid is lighter than water as expected (a heavier fluid would sink in water).

---

**3-43**
**Solution** A load on a hydraulic lift is to be raised by pouring oil from a thin tube. The height of oil in the tube required in order to raise that weight is to be determined.
**Assumptions** 1 The cylinders of the lift are vertical. 2 There are no leaks. 3 Atmospheric pressure act on both sides, and thus it can be disregarded.
**Properties** The density of oil is given to be $\rho = 780 \text{ kg/m}^3$.
**Analysis** Noting that pressure is force per unit area, the gage pressure in the fluid under the load is simply the ratio of the weight to the area of the lift,
$P_{\text{gage}} = \frac{W}{A} = \frac{mg}{\pi D^2 / 4} = \frac{(500 \text{ kg})(9.81 \text{ m/s}^2)}{\pi (1.20 \text{ m})^2 / 4} \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right) = 4.34 \text{ kN/m}^2 = 4.34 \text{ kPa}$
The required oil height that will cause 4.34 kPa of pressure rise is
$P_{\text{gage}} = \rho g h \longrightarrow h = \frac{P_{\text{gage}}}{\rho g} = \frac{4.34 \text{ kN/m}^2}{(780 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kN/m}^2} \right) = \mathbf{0.567 \text{ m}}$
Therefore, a 500 kg load can be raised by this hydraulic lift by simply raising the oil level in the tube by 56.7 cm.
**Discussion** Note that large weights can be raised by little effort in hydraulic lift by making use of Pascal’s principle.

---

**3-44E**
**Solution** Two oil tanks are connected to each other through a mercury manometer. For a given differential height, the pressure difference between the two tanks is to be determined.
**Assumptions** 1 Both the oil and mercury are incompressible fluids. 2 The oils in both tanks have the same density.
**Properties** The densities of oil and mercury are given to be $\rho_{\text{oil}} = 45 \text{ lbm/ft}^3$ and $\rho_{\text{Hg}} = 848 \text{ lbm/ft}^3$.
**Analysis** Starting with the pressure at the bottom of tank 1 (where pressure is $P_1$) and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the bottom of tank 2 (where pressure is $P_2$) gives
$P_1 + \rho_{\text{oil}} g(h_1 + h_2) - \rho_{\text{Hg}} g h_2 - \rho_{\text{oil}} g h_1 = P_2$
where $h_1 = 10 \text{ in}$ and $h_2 = 32 \text{ in}$. Rearranging and simplifying,
$P_1 - P_2 = \rho_{\text{Hg}} g h_2 - \rho_{\text{oil}} g h_2 = (\rho_{\text{Hg}} - \rho_{\text{oil}}) g h_2$
Substituting,
$\Delta P = P_1 - P_2 = (848 - 45 \text{ lbm/ft}^3)(32.2 \text{ ft/s}^2)(32/12 \text{ ft}) \left( \frac{1 \text{ lbf}}{32.2 \text{ lbm} \cdot \text{ft/s}^2} \right) \left( \frac{1 \text{ ft}^2}{144 \text{ in}^2} \right) = \mathbf{14.9 \text{ psia}}$
Therefore, the pressure in the left oil tank is 14.9 psia higher than the pressure in the right oil tank.
**Discussion** Note that large pressure differences can be measured conveniently by mercury manometers. If a water manometer were used in this case, the differential height would be over 30 ft.

---

**3-45**
**Solution** The standard atmospheric pressure is expressed in terms of mercury, water, and glycerin columns.
**Assumptions** The densities of fluids are constant.
**Properties** The specific gravities are given to be $SG = 13.6$ for mercury, $SG = 1.0$ for water, and $SG = 1.26$ for glycerin. The standard density of water is $1000 \text{ kg/m}^3$, and the standard atmospheric pressure is 101,325 Pa.
**Analysis** The atmospheric pressure is expressed in terms of a fluid column height as
$P_{\text{atm}} = \rho g h = SG \rho_w g h \longrightarrow h = \frac{P_{\text{atm}}}{SG \rho_w g}$
Substituting,
(a) **Mercury:** $h = \frac{101,325 \text{ N/m}^2}{13.6(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) = \mathbf{0.759 \text{ m}}$
(b) **Water:** $h = \frac{101,325 \text{ N/m}^2}{1(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) = \mathbf{10.3 \text{ m}}$
(c) **Glycerin:** $h = \frac{101,325 \text{ N/m}^2}{1.26(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) = \mathbf{8.20 \text{ m}}$
**Discussion** Using water or glycerin to measure atmospheric pressure requires very long vertical tubes (over 10 m for water), which is not practical. This explains why mercury is used instead of water or a light fluid.

---

**3-46**
**Solution** A glass filled with water and covered with a thin paper is inverted. The pressure at the bottom of the glass is to be determined.
**Assumptions** 1 Water is an incompressible substance. 2 The weight of the paper is negligible. 3 The atmospheric pressure is 100 kPa.
**Properties** We take the density of water to be $\rho = 1000 \text{ kg/m}^3$.
**Analysis** The paper is in equilibrium, and thus the net force acting on the paper must be zero. A vertical force balance on the paper involves the pressure forces on both sides, and yields
$P_1 A_{\text{glass}} = P_{\text{atm}} A_{\text{glass}} \longrightarrow P_1 = P_{\text{atm}}$
That is, the pressures on both sides of the paper must be the same.
The pressure at the bottom of the glass is determined from the hydrostatic pressure relation to be
$P_{\text{atm}} = P_{\text{bottom}} + \rho g h_{\text{glass}} \longrightarrow P_{\text{bottom}} = P_{\text{atm}} - \rho g h_{\text{glass}}$
Substituting,
$P_{\text{bottom}} = (100 \text{ kPa}) - (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.1 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) \left( \frac{1 \text{ kPa}}{1000 \text{ N/m}^2} \right) = \mathbf{99.0 \text{ kPa}}$
**Discussion** Note that there is a vacuum of 1 kPa at the bottom of the glass, and thus there is an upward pressure force acting on the water body, which balanced by the weight of water. As a result, the net downward force on water is zero, and thus water does not flow down.

---

**3-47**
**Solution** Two chambers with the same fluid at their base are separated by a piston. The gage pressure in each air chamber is to be determined.
**Assumptions** 1 Water is an incompressible substance. 2 The variation of pressure with elevation in each air chamber is negligible because of the low density of air.
**Properties** We take the density of water to be $\rho = 1000 \text{ kg/m}^3$.
**Analysis** The piston is in equilibrium, and thus the net force acting on the piston must be zero. A vertical force balance on the piston involves the pressure force exerted by water on the piston face, the atmospheric pressure force, and the piston weight, and yields
$P_C A_{\text{piston}} = P_{\text{atm}} A_{\text{piston}} + W_{\text{piston}} \longrightarrow P_C = P_{\text{atm}} + \frac{W_{\text{piston}}}{A_{\text{piston}}}$
The pressure at the bottom of each air chamber is determined from the hydrostatic pressure relation to be
$P_{\text{air A}} = P_E = P_C + \rho g CE = P_{\text{atm}} + \frac{W_{\text{piston}}}{A_{\text{piston}}} + \rho g CE \longrightarrow P_{\text{air A, gage}} = \frac{W_{\text{piston}}}{A_{\text{piston}}} + \rho g CE$
$P_{\text{air B}} = P_D = P_C - \rho g CD = P_{\text{atm}} + \frac{W_{\text{piston}}}{A_{\text{piston}}} - \rho g CD \longrightarrow P_{\text{air B, gage}} = \frac{W_{\text{piston}}}{A_{\text{piston}}} - \rho g CD$
Substituting,
$P_{\text{air A, gage}} = \frac{25 \text{ N}}{\pi (0.3 \text{ m})^2 / 4} + (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.25 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = 2806 \text{ N/m}^2 = \mathbf{2.81 \text{ kPa}}$
$P_{\text{air B, gage}} = \frac{25 \text{ N}}{\pi (0.3 \text{ m})^2 / 4} - (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.25 \text{ m}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = -2099 \text{ N/m}^2 = \mathbf{-2.10 \text{ kPa}}$
**Discussion** Note that there is a vacuum of about 2 kPa in tank B which pulls the water up.

---

**3-48**
**Solution** A double-fluid manometer attached to an air pipe is considered. The specific gravity of one fluid is known, and the specific gravity of the other fluid is to be determined.
**Assumptions** 1 Densities of liquids are constant. 2 The air pressure in the tank is uniform (i.e., its variation with elevation is negligible due to its low density), and thus the pressure at the air-water interface is the same as the indicated gage pressure.
**Properties** The specific gravity of one fluid is given to be 13.55. We take the standard density of water to be $1000 \text{ kg/m}^3$.
**Analysis** Starting with the pressure of air in the tank, and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the free surface where the oil tube is exposed to the atmosphere, and setting the result equal to $P_{\text{atm}}$ give
$P_{\text{air}} + \rho_1 g h_1 - \rho_2 g h_2 = P_{\text{atm}} \longrightarrow P_{\text{air}} - P_{\text{atm}} = SG_2 \rho_w g h_2 - SG_1 \rho_w g h_1$
Rearranging and solving for $SG_2$,
$SG_2 = SG_1 \frac{h_1}{h_2} + \frac{P_{\text{air}} - P_{\text{atm}}}{\rho_w g h_2} = 13.55 \frac{0.22 \text{ m}}{0.40 \text{ m}} + \frac{(76 - 100) \text{ kPa}}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.40 \text{ m})} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kPa} \cdot \text{m}^2} \right) = \mathbf{1.34}$
**Discussion** Note that the right fluid column is higher than the left, and this would imply above atmospheric pressure in the pipe for a single-fluid manometer.

---

**3-49**
**Solution** The pressure difference between two pipes is measured by a double-fluid manometer. For given fluid heights and specific gravities, the pressure difference between the pipes is to be calculated.
**Assumptions** All the liquids are incompressible.
**Properties** The specific gravities are given to be 13.5 for mercury, 1.26 for glycerin, and 0.88 for oil. We take the standard density of water to be $\rho_w = 1000 \text{ kg/m}^3$.
**Analysis** Starting with the pressure in the water pipe (point A) and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the oil pipe (point B), and setting the result equal to $P_B$ give
$P_A + \rho_w g h_w + \rho_{\text{Hg}} g h_{\text{Hg}} - \rho_{\text{gly}} g h_{\text{gly}} + \rho_{\text{oil}} g h_{\text{oil}} = P_B$
Rearranging and using the definition of specific gravity,
$P_B - P_A = SG_w \rho_w g h_w + SG_{\text{Hg}} \rho_w g h_{\text{Hg}} - SG_{\text{gly}} \rho_w g h_{\text{gly}} + SG_{\text{oil}} \rho_w g h_{\text{oil}}$
$= g \rho_w (SG_w h_w + SG_{\text{Hg}} h_{\text{Hg}} - SG_{\text{gly}} h_{\text{gly}} + SG_{\text{oil}} h_{\text{oil}})$
Substituting,
$P_B - P_A = (9.81 \text{ m/s}^2)(1000 \text{ kg/m}^3) [1(0.6 \text{ m}) + 13.5(0.2 \text{ m}) - 1.26(0.45 \text{ m}) + 0.88(0.1 \text{ m})] \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right)$
$= 27.7 \text{ kN/m}^2 = \mathbf{27.7 \text{ kPa}}$
Therefore, the pressure in the oil pipe is 27.7 kPa higher than the pressure in the water pipe.
**Discussion** Using a manometer between two pipes is not recommended unless the pressures in the two pipes are relatively constant. Otherwise, an over-rise of pressure in one pipe can push the manometer fluid into the other pipe, creating a short circuit.

---

**3-50**
**Solution** The fluid levels in a multi-fluid U-tube manometer change as a result of a pressure drop in the trapped air space. For a given pressure drop and brine level change, the area ratio is to be determined.
**Assumptions** 1 All the liquids are incompressible. 2 Pressure in the brine pipe remains constant. 3 The variation of pressure in the trapped air space is negligible.
**Properties** The specific gravities are given to be 13.56 for mercury and 1.1 for brine. We take the standard density of water to be $\rho_w = 1000 \text{ kg/m}^3$.
**Analysis** It is clear from the problem statement and the figure that the brine pressure is much higher than the air pressure, and when the air pressure drops by 0.7 kPa, the pressure difference between the brine and the air space also increases by the same amount. Starting with the air pressure (point A) and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach the brine pipe (point B), and setting the result equal to $P_B$ before and after the pressure change of air give
Before: $P_{A1} + \rho_w g h_w + \rho_{\text{Hg}} g h_{\text{Hg,1}} - \rho_{\text{br}} g h_{\text{br,1}} = P_B$
After: $P_{A2} + \rho_w g h_w + \rho_{\text{Hg}} g h_{\text{Hg,2}} - \rho_{\text{br}} g h_{\text{br,2}} = P_B$
Subtracting,
$P_{A2} - P_{A1} + \rho_{\text{Hg}} g \Delta h_{\text{Hg}} - \rho_{\text{br}} g \Delta h_{\text{br}} = 0 \longrightarrow \frac{P_{A1} - P_{A2}}{\rho_w g} = SG_{\text{Hg}} \Delta h_{\text{Hg}} - SG_{\text{br}} \Delta h_{\text{br}} = 0$ (1)
where $\Delta h_{\text{Hg}}$ and $\Delta h_{\text{br}}$ are the changes in the differential mercury and brine column heights, respectively, due to the drop in air pressure. Both of these are positive quantities since as the mercury-brine interface drops, the differential fluid heights for both mercury and brine increase. Noting also that the volume of mercury is constant, we have $A_1 \Delta h_{\text{Hg,left}} = A_2 \Delta h_{\text{Hg,right}}$ and
$P_{A2} - P_{A1} = -0.7 \text{ kPa} = -700 \text{ N/m}^2 = -700 \text{ kg/m} \cdot \text{s}^2$
$\Delta h_{\text{br}} = 0.005 \text{ m}$
$\Delta h_{\text{Hg}} = \Delta h_{\text{Hg,right}} + \Delta h_{\text{Hg,left}} = \Delta h_{\text{br}} + \Delta h_{\text{br}} A_2/A_1 = \Delta h_{\text{br}} (1 + A_2/A_1)$
Substituting,
$\frac{700 \text{ kg/m} \cdot \text{s}^2}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} = [13.56 \times 0.005(1 + A_2/A_1) - 1.1 \times 0.005] \text{ m}$
It gives $\mathbf{A_2/A_1 = 0.134}$
**Discussion** In addition to the equations of hydrostatics, we also utilize conservation of mass in this problem.

---

**3-51**
**Solution** Two water tanks are connected to each other through a mercury manometer with inclined tubes. For a given pressure difference between the two tanks, the parameters $a$ and $\theta$ are to be determined.
**Assumptions** Both water and mercury are incompressible liquids.
**Properties** The specific gravity of mercury is given to be 13.6. We take the standard density of water to be $\rho_w = 1000 \text{ kg/m}^3$.
**Analysis** Starting with the pressure in the tank A and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach tank B, and setting the result equal to $P_B$ give
$P_A + \rho_w g a + \rho_{\text{Hg}} g 2a - \rho_w g a = P_B \longrightarrow 2 \rho_{\text{Hg}} g a = P_B - P_A$
Rearranging and substituting the known values,
$a = \frac{P_B - P_A}{2 \rho_{\text{Hg}} g} = \frac{20 \text{ kN/m}^2}{2(13.6)(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kN}} \right) = 0.0750 \text{ m} = \mathbf{7.50 \text{ cm}}$
From geometric considerations,
$26.8 \sin \theta = 2a \text{ (cm)}$
Therefore,
$\sin \theta = \frac{2a}{26.8} = \frac{2 \times 7.50}{26.8} = 0.560 \longrightarrow \mathbf{\theta = 34.0\text{°}}$
**Discussion** Note that vertical distances are used in manometer analysis. Horizontal distances are of no consequence.

---

**3-52**
**Solution** A multi-fluid container is connected to a U-tube. For the given specific gravities and fluid column heights, the gage pressure at A and the height of a mercury column that would create the same pressure at A are to be determined.
**Assumptions** 1 All the liquids are incompressible. 2 The multi-fluid container is open to the atmosphere.
**Properties** The specific gravities are given to be 1.26 for glycerin and 0.90 for oil. We take the standard density of water to be $\rho_w = 1000 \text{ kg/m}^3$, and the specific gravity of mercury to be 13.6.
**Analysis** Starting with the atmospheric pressure on the top surface of the container and moving along the tube by adding (as we go down) or subtracting (as we go up) the $\rho g h$ terms until we reach point A, and setting the result equal to $P_A$ give
$P_{\text{atm}} + \rho_{\text{oil}} g h_{\text{oil}} + \rho_w g h_w - \rho_{\text{gly}} g h_{\text{gly}} = P_A$
Rearranging and using the definition of specific gravity,
$P_A - P_{\text{atm}} = SG_{\text{oil}} \rho_w g h_{\text{oil}} + SG_w \rho_w g h_w - SG_{\text{gly}} \rho_w g h_{\text{gly}}$
or $P_{A, \text{ gage}} = g \rho_w (SG_{\text{oil}} h_{\text{oil}} + SG_w h_w - SG_{\text{gly}} h_{\text{gly}})$
Substituting,
$P_{A, \text{ gage}} = (9.81 \text{ m/s}^2)(1000 \text{ kg/m}^3) [0.90(0.70 \text{ m}) + 1(0.3 \text{ m}) - 1.26(0.70 \text{ m})] \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right)$
$= 0.471 \text{ kN/m}^2 = \mathbf{0.471 \text{ kPa}}$
The equivalent mercury column height is
$h_{\text{Hg}} = \frac{P_{A, \text{ gage}}}{\rho_{\text{Hg}} g} = \frac{0.471 \text{ kN/m}^2}{(13.6)(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1000 \text{ kg} \cdot \text{m/s}^2}{1 \text{ kN}} \right) = 0.00353 \text{ m} = \mathbf{0.353 \text{ cm}}$
**Discussion** Note that the high density of mercury makes it a very suitable fluid for measuring high pressures in manometers.

---

**Fluid Statics: Hydrostatic Forces on Plane and Curved Surfaces**

**3-53C**
**Solution** We are to define resultant force and center of pressure.
**Analysis** The **resultant hydrostatic force** acting on a submerged surface is the resultant of the pressure forces acting on the surface. The point of application of this resultant force is called the **center of pressure**.
**Discussion** The center of pressure is generally not at the center of the body, due to hydrostatic pressure variation.

---

**3-54C**
**Solution** We are to examine a claim about hydrostatic force.
**Analysis** Yes, because the magnitude of the resultant force acting on a plane surface of a completely submerged body in a homogeneous fluid is equal to the product of the pressure $P_C$ at the centroid of the surface and the area $A$ of the surface. The pressure at the centroid of the surface is $P_C = P_0 + \rho g h_C$ where $h_C$ is the vertical distance of the centroid from the free surface of the liquid.
**Discussion** We have assumed that we also know the pressure at the liquid surface.

---

**3-55C**
**Solution** We are to consider the effect of plate rotation on the hydrostatic force on the plate surface.
**Analysis** There will be **no change** on the hydrostatic force acting on the top surface of this submerged horizontal flat plate as a result of this rotation since the magnitude of the resultant force acting on a plane surface of a completely submerged body in a homogeneous fluid is equal to the product of the pressure $P_C$ at the centroid of the surface and the area $A$ of the surface.
**Discussion** If the rotation were not around the centroid, there would be a change in the force.

---

**3-56C**
**Solution** We are to explain why dams are bigger at the bottom than at the top.
**Analysis** Dams are built much thicker at the bottom because the pressure force increases with depth, and the **bottom part of dams are subjected to largest forces**.
**Discussion** Dam construction requires an enormous amount of concrete, so tapering the dam in this way saves a lot of concrete, and therefore a lot of money.

---

**3-57C**
**Solution** We are to explain how to determine the horizontal component of hydrostatic force on a curved surface.
**Analysis** The **horizontal component** of the hydrostatic force acting on a curved surface is **equal (in both magnitude and the line of action) to the hydrostatic force acting on the vertical projection** of the curved surface.
**Discussion** We could also integrate pressure along the surface, but the method discussed here is much simpler and yields the same answer.

---

**3-58C**
**Solution** We are to explain how to determine the vertical component of hydrostatic force on a curved surface.
**Analysis** The **vertical component** of the hydrostatic force acting on a curved surface is **equal to the hydrostatic force acting on the horizontal projection of the curved surface, plus (minus, if acting in the opposite direction) the weight of the fluid block**.
**Discussion** We could also integrate pressure along the surface, but the method discussed here is much simpler and yields the same answer.

---

**3-59C**
**Solution** We are to explain how to determine the line of action on a circular surface.
**Analysis** The **resultant hydrostatic force acting on a circular surface always passes through the center of the circle** since the pressure forces are normal to the surface, and all lines normal to the surface of a circle pass through the center of the circle. Thus the pressure forces form a concurrent force system at the center, which can be reduced to a single equivalent force at that point. If the magnitudes of the horizontal and vertical components of the resultant hydrostatic force are known, the tangent of the angle the resultant hydrostatic force makes with the horizontal is $\tan \alpha = F_V / F_H$.
**Discussion** This fact makes analysis of circular-shaped surfaces simple. There is no corresponding simplification for shapes other than circular, unfortunately.

---

**3-60**
**Solution** A car is submerged in water. The hydrostatic force on the door and its line of action are to be determined for the cases of the car containing atmospheric air and the car is filled with water.
**Assumptions** 1 The bottom surface of the lake is horizontal. 2 The door can be approximated as a vertical rectangular plate. 3 The pressure in the car remains at atmospheric value since there is no water leaking in, and thus no compression of the air inside. Therefore, we can ignore the atmospheric pressure in calculations since it acts on both sides of the door.
**Properties** We take the density of lake water to be $1000 \text{ kg/m}^3$ throughout.
**Analysis** (a) When the car is well-sealed and thus the pressure inside the car is the atmospheric pressure, the average pressure on the outer surface of the door is the pressure at the centroid (midpoint) of the surface, and is determined to be
$P_{\text{avg}} = P_C = \rho g h_C = \rho g (s + b/2) = (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(8 + 1.1/2 \text{ m}) \left( \frac{1 \text{ kN}}{1000 \text{ kg} \cdot \text{m/s}^2} \right) = 83.88 \text{ kN/m}^2$
Then the resultant hydrostatic force on the door becomes
$F_R = P_{\text{ave}} A = (83.88 \text{ kN/m}^2)(0.9 \text{ m} \times 1.1 \text{ m}) = \mathbf{83.0 \text{ kN}}$
The pressure center is directly under the midpoint of the plate, and its distance from the surface of the lake is determined to be
$y_P = s + \frac{b}{2} + \frac{b^2}{12(s + b/2)} = 8 + \frac{1.1}{2} + \frac{1.1^2}{12(8 + 1.1/2)} = \mathbf{8.56 \text{ m}}$
(b) When the car is filled with water, the net force normal to the surface of the door is **zero** since the pressure on both sides of the door will be the same.
**Discussion** Note that it is impossible for a person to open the door of the car when it is filled with atmospheric air. But it takes little effort to open the door when car is filled with water, because then the pressure on each side of the door is the same.

---
