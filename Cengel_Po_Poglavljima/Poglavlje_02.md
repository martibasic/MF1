# CHAPTER 2: PROPERTIES OF FLUIDS

In this chapter, we discuss properties that are encountered in the analysis of fluid flow. First we discuss intensive and extensive properties and define density and specific gravity. This is followed by a discussion of the properties vapor pressure, energy and its various forms, the specific heats of ideal gases and incompressible substances, and the coefficient of compressibility. Then we discuss the property viscosity, which plays a dominant role in most aspects of fluid flow. Finally, we present the property surface tension and determine the capillary rise from static equilibrium conditions. The property pressure is discussed in Chap. 3 together with fluid statics.

### OBJECTIVES
When you finish reading this chapter, you should be able to:
- Have a working knowledge of the basic properties of fluids and understand the continuum approximation.
- Have a working knowledge of viscosity and the consequences of the frictional effects it causes in fluid flow.
- Calculate the capillary rises and drops due to the surface tension effect.

---

## 2–1 ■ INTRODUCTION

Any characteristic of a system is called a **property**. Some familiar properties are pressure $P$, temperature $T$, volume $V$, and mass $m$. The list can be extended to include less familiar ones such as viscosity, thermal conductivity, modulus of elasticity, thermal expansion coefficient, electric resistivity, and even velocity and elevation.

Properties are considered to be either **intensive** or **extensive**. 
- **Intensive properties** are those that are independent of the mass of a system, such as temperature, pressure, and density. 
- **Extensive properties** are those whose values depend on the size—or extent—of the system. Total mass, total volume $V$, and total momentum are some examples of extensive properties. 

An easy way to determine whether a property is intensive or extensive is to divide the system into two equal parts with an imaginary partition (Fig. 2–1). Each part will have the same value of intensive properties as the original system, but half the value of the extensive properties.

Extensive properties per unit mass are called **specific properties**. Some examples of specific properties are specific volume ($v = V/m$) and specific total energy ($e = E/m$).

The state of a system is described by its properties. The number of properties required to fix the state of a system is given by the **state postulate**: The state of a simple compressible system is completely specified by two independent, intensive properties.

### Continuum

Matter is made up of atoms that are widely spaced in the gas phase. Yet it is very convenient to disregard the atomic nature of a substance and view it as a continuous, homogeneous matter with no holes, that is, a **continuum**. The continuum idealization allows us to treat properties as point functions and to assume that the properties vary continually in space with no jump discontinuities. This idealization is valid as long as the size of the system we deal with is large relative to the space between the molecules.

---

## 2–2 ■ DENSITY AND SPECIFIC GRAVITY

**Density** is defined as mass per unit volume (Fig. 2–3). That is,
$$ \text{Density: } \rho = \frac{m}{V} \quad (\text{kg/m}^3) \quad (2–1) $$

The reciprocal of density is the **specific volume** $v$, which is defined as volume per unit mass. That is, $v = V/m = 1/\rho$. For a differential volume element of mass $\delta m$ and volume $\delta V$, density can be expressed as $\rho = \delta m / \delta V$.

The density of a substance, in general, depends on temperature and pressure. For most gases, density is proportional to pressure and inversely proportional to temperature. Liquids and solids are essentially incompressible substances, and the variation of their density with pressure is usually negligible.

Sometimes the density of a substance is given relative to the density of a well-known substance. Then it is called **specific gravity**, or **relative density**, and is defined as the ratio of the density of a substance to the density of some standard substance at a specified temperature (usually water at $4^\circ\text{C}$, for which $\rho_{H_2O} = 1000 \text{ kg/m}^3$). That is,
$$ \text{Specific gravity: } SG = \frac{\rho}{\rho_{H_2O}} \quad (2–2) $$

The weight of a unit volume of a substance is called **specific weight** $\gamma_s$ and is expressed as:
$$ \text{Specific weight: } \gamma_s = \rho g \quad (\text{N/m}^3) \quad (2–3) $$
where $g$ is the gravitational acceleration.

### TABLE 2–1: Specific gravities of some substances at 0°C
| Substance | SG |
| :--- | :--- |
| Water | 1.0 |
| Blood | 1.05 |
| Seawater | 1.025 |
| Gasoline | 0.7 |
| Ethyl alcohol | 0.79 |
| Mercury | 13.6 |
| Wood | 0.3–0.9 |
| Gold | 19.2 |
| Bones | 1.7–2.0 |
| Ice | 0.92 |
| Air (at 1 atm) | 0.0013 |

### Density of Ideal Gases

Any equation that relates the pressure, temperature, and density (or specific volume) of a substance is called an **equation of state**. The simplest and best-known equation of state for substances in the gas phase is the **ideal-gas equation of state**, expressed as:
$$ Pv = RT \quad \text{or} \quad P = \rho RT \quad (2–4) $$
where $P$ is the absolute pressure, $v$ is the specific volume, $T$ is the thermodynamic (absolute) temperature, $\rho$ is the density, and $R$ is the gas constant ($R = R_u / M$).

Thermodynamic temperature scales are related by:
$$ T(\text{K}) = T(^\circ\text{C}) + 273.15 \quad (2–5) $$
$$ T(\text{R}) = T(^\circ\text{F}) + 459.67 \quad (2–6) $$

---

## 2–3 ■ VAPOR PRESSURE AND CAVITATION

The **vapor pressure** $P_v$ of a pure substance is defined as the pressure exerted by its vapor in phase equilibrium with its liquid at a given temperature. $P_v$ is identical to the **saturation pressure** $P_{sat}$ of the liquid ($P_v = P_{sat}$).

If the liquid pressure in a flow system drops below the vapor pressure at some locations, unplanned vaporization occurs. The vapor bubbles (called **cavitation bubbles**) collapse as they are swept away from low-pressure regions, generating highly destructive, extremely high-pressure waves. This phenomenon is called **cavitation**.

---

## 2–4 ■ ENERGY AND SPECIFIC HEATS

Energy can exist in numerous forms, and their sum constitutes the **total energy** $E$ (or $e$ on a unit-mass basis) of a system.
- **Internal energy** $U$ (or $u$): Sum of all microscopic forms of energy.
- **Kinetic energy** $ke = V^2/2$.
- **Potential energy** $pe = gz$.

In the analysis of systems involving fluid flow, we frequently encounter the combination $u + Pv$. This combination is called **enthalpy** $h$:
$$ \text{Enthalpy: } h = u + Pv = u + \frac{P}{\rho} \quad (2–7) $$

The total energy of a flowing fluid on a unit-mass basis becomes:
$$ e_{flowing} = \frac{P}{\rho} + e = h + ke + pe = h + \frac{V^2}{2} + gz \quad (\text{kJ/kg}) \quad (2–8) $$

For an ideal gas:
$$ du = c_v dT \quad \text{and} \quad dh = c_p dT \quad (2–9) $$
$$ \Delta u \cong c_{v,ave} \Delta T \quad \text{and} \quad \Delta h \cong c_{p,ave} \Delta T \quad (2–10) $$

---

## 2–5 ■ COEFFICIENT OF COMPRESSIBILITY

Fluids act like elastic solids with respect to pressure. We define a **coefficient of compressibility** $\kappa$ (also called the bulk modulus of compressibility) as:
$$ \kappa = -v \left( \frac{\partial P}{\partial v} \right)_T = \rho \left( \frac{\partial P}{\partial \rho} \right)_T \quad (\text{Pa}) \quad (2–12) $$

It can also be expressed approximately in terms of finite changes as:
$$ \kappa \cong -\frac{\Delta P}{\Delta v / v} \cong \frac{\Delta P}{\Delta \rho / \rho} \quad (T = \text{constant}) \quad (2–13) $$

For an ideal gas, $\kappa_{ideal gas} = P$ (Pa).

The inverse of the coefficient of compressibility is called the **isothermal compressibility** $\alpha$:
$$ \alpha = \frac{1}{\kappa} = -\frac{1}{v} \left( \frac{\partial v}{\partial P} \right)_T = \frac{1}{\rho} \left( \frac{\partial \rho}{\partial P} \right)_T \quad (1/\text{Pa}) \quad (2–17) $$

### Coefficient of Volume Expansion

To quantify the variation of density with temperature at constant pressure, we use the **coefficient of volume expansion** $\beta$:
$$ \beta = \frac{1}{v} \left( \frac{\partial v}{\partial T} \right)_P = -\frac{1}{\rho} \left( \frac{\partial \rho}{\partial T} \right)_P \quad (1/\text{K}) \quad (2–18) $$

For an ideal gas, $\beta_{ideal gas} = 1/T$.

---

We will see in Chap. 3 that natural convection currents are initiated by the buoyancy force, which is proportional to the density difference, which is proportional to the temperature difference at constant pressure.

The combined effects of pressure and temperature changes on the volume change of a fluid can be determined by taking the specific volume to be a function of $T$ and $P$. Differentiating $v = v(T, P)$ and using the definitions of the compression and expansion coefficients $\alpha$ and $\beta$ give:
$$ dv = \left( \frac{\partial v}{\partial T} \right)_P dT + \left( \frac{\partial v}{\partial P} \right)_T dP = (\beta dT - \alpha dP)v \quad (2–22) $$

Then the fractional change in volume (or density) due to changes in pressure and temperature can be expressed approximately as:
$$ \frac{\Delta v}{v} = -\frac{\Delta \rho}{\rho} \cong \beta \Delta T - \alpha \Delta P \quad (2–23) $$

**EXAMPLE 2–3: Variation of Density with Temperature and Pressure**
Determine the final density of water (a) if it is heated to $50^\circ\text{C}$ at $1 \text{ atm}$, and (b) if it is compressed to $100 \text{ atm}$ at $20^\circ\text{C}$. Take $\alpha = 4.80 \times 10^{-5} \text{ atm}^{-1}$.
**Analysis:** The change in density is expressed as:
$$ \Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T $$
(a) For heating:
$$ \Delta \rho = -\beta \rho \Delta T = -(0.337 \times 10^{-3} \text{ K}^{-1})(998 \text{ kg/m}^3)(50 - 20) \text{ K} = -10.0 \text{ kg/m}^3 $$
$$ \rho_2 = \rho_1 + \Delta \rho = 998.0 - 10.0 = 988.0 \text{ kg/m}^3 $$
(b) For compression:
$$ \Delta \rho = \alpha \rho \Delta P = (4.80 \times 10^{-5} \text{ atm}^{-1})(998 \text{ kg/m}^3)(100 - 1) \text{ atm} = 4.7 \text{ kg/m}^3 $$
$$ \rho_2 = \rho_1 + \Delta \rho = 998.0 + 4.7 = 1002.7 \text{ kg/m}^3 $$

---

## 2–6 ■ VISCOSITY

When two solid bodies in contact move relative to each other, a friction force develops. The situation is similar when a fluid moves relative to a solid. There is a property that represents the internal resistance of a fluid to motion or the “fluidity,” and that property is the **viscosity**. The force a flowing fluid exerts on a body in the flow direction is called the **drag force**, and its magnitude depends, in part, on viscosity (Fig. 2–11).

![FIGURE 2–11: A fluid moving relative to a body exerts a drag force on the body, partly because of friction caused by viscosity.](path/to/image2-11.jpg)

To obtain a relation for viscosity, consider a fluid layer between two very large parallel plates separated by a distance $\ell$ (Fig. 2–12). A constant parallel force $F$ is applied to the upper plate. The shear stress $\tau$ acting on this fluid layer is:
$$ \tau = \frac{F}{A} \quad (2–24) $$

The velocity profile and the velocity gradient are:
$$ u(y) = \frac{y}{\ell} V \quad \text{and} \quad \frac{du}{dy} = \frac{V}{\ell} \quad (2–25) $$

The rate of deformation is equivalent to the velocity gradient $du/dy$. For most fluids, the rate of deformation is directly proportional to the shear stress $\tau$:
$$ \tau \propto \frac{du}{dy} \quad (2–28) $$

Fluids for which the rate of deformation is proportional to the shear stress are called **Newtonian fluids**. For one-dimensional shear flow:
$$ \text{Shear stress: } \tau = \mu \frac{du}{dy} \quad (\text{N/m}^2) \quad (2–29) $$
where $\mu$ is the **dynamic (or absolute) viscosity**. Its unit is $\text{kg/m} \cdot \text{s}$, or $\text{N} \cdot \text{s/m}^2$ (Pa·s). A common unit is **poise** ($1 \text{ poise} = 0.1 \text{ Pa} \cdot \text{s}$).

The shear force is:
$$ \text{Shear force: } F = \tau A = \mu A \frac{du}{dy} \quad \text{(N)} \quad (2–30) $$

For the case in Fig. 2–12:
$$ F = \mu A \frac{V}{\ell} \quad \text{(N)} \quad (2–31) $$

![FIGURE 2–12: The behavior of a fluid in laminar flow between two parallel plates when the upper plate moves with a constant velocity.](path/to/image2-12.jpg)
![FIGURE 2–13: The rate of deformation of a Newtonian fluid is proportional to shear stress, and the constant of proportionality is the viscosity.](path/to/image2-13.jpg)

**Kinematic viscosity** $\nu$ is the ratio of dynamic viscosity to density:
$$ \nu = \frac{\mu}{\rho} $$
Units: $\text{m}^2/\text{s}$ or **stoke** ($1 \text{ stoke} = 1 \text{ cm}^2/\text{s} = 10^{-4} \text{ m}^2/\text{s}$).

The viscosity of liquids decreases with temperature, whereas the viscosity of gases increases with temperature (Fig. 2–16).

![FIGURE 2–16: The viscosity of liquids decreases and the viscosity of gases increases with temperature.](path/to/image2-16.jpg)

**Gases (Sutherland correlation):**
$$ \mu = \frac{a T^{1/2}}{1 + b/T} \quad (2–32) $$

**Liquids:**
$$ \mu = a 10^{b/(T-c)} \quad (2–33) $$

For two concentric cylinders (viscometer), torque $T$ is:
$$ T = FR = \mu \frac{2 \pi R^3 \omega L}{\ell} = \mu \frac{4 \pi^2 R^3 \dot{n} L}{\ell} \quad (2–34) $$

---

## 2–7 ■ SURFACE TENSION AND CAPILLARY EFFECT

Liquid droplets behave like small spherical balloons, and the surface acts like a stretched elastic membrane under tension. The magnitude of this force per unit length is called **surface tension** $\sigma_s$. Its unit is $\text{N/m}$ (or $\text{J/m}^2$).

![FIGURE 2–20: Attractive forces acting on a liquid molecule at the surface and deep inside the liquid.](path/to/image2-20.jpg)

For a U-shaped wire frame (Fig. 2–21):
$$ \sigma_s = \frac{F}{2b} \quad (2–35) $$

The excess pressure $\Delta P$ inside a droplet or bubble is:
$$ \text{Droplet: } \Delta P_{droplet} = P_i - P_o = \frac{2\sigma_s}{R} \quad (2–36) $$
$$ \text{Bubble: } \Delta P_{bubble} = P_i - P_o = \frac{4\sigma_s}{R} \quad (2–37) $$

### Capillary Effect

The rise or fall of a liquid in a small-diameter tube is the **capillary effect**. The strength is quantified by the **contact (or wetting) angle** $\phi$.
- $\phi < 90^\circ$: Wetting fluid (e.g., water on glass).
- $\phi > 90^\circ$: Nonwetting fluid (e.g., mercury on glass).

![FIGURE 2–23: The contact angle for wetting and nonwetting fluids.](path/to/image2-23.jpg)

The magnitude of the **capillary rise** $h$ in a circular tube is:
$$ h = \frac{2\sigma_s}{\rho g R} \cos \phi \quad (R = \text{constant}) \quad (2–38) $$

Note that $h$ is inversely proportional to the radius $R$ of the tube.

![FIGURE 2–25: The capillary rise of water and the capillary fall of mercury in a small-diameter glass tube.](path/to/image2-25.jpg)

---

**EXAMPLE 2–5: The Capillary Rise of Water in a Tube**
A 0.6-mm-diameter glass tube is inserted into water at 20°C in a cup. Determine the capillary rise of water in the tube (Fig. 2–27).

**SOLUTION:** The rise of water in a slender tube as a result of the capillary effect is to be determined.
**Properties:** The surface tension of water at 20°C is 0.073 N/m. The contact angle of water with glass is 0°. We take the density of liquid water to be 1000 kg/m³.
**Analysis:** The capillary rise is determined directly from Eq. 2–38:
$$ h = \frac{2\sigma_s}{\rho g R} \cos \phi = \frac{2(0.073 \text{ N/m})}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.3 \times 10^{-3} \text{ m})} (\cos 0^\circ) \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) $$
$$ h = 0.050 \text{ m} = 5.0 \text{ cm} $$
**Discussion:** Note that if the tube diameter were 1 cm, the capillary rise would be 0.3 mm, which is hardly noticeable.

![FIGURE 2–27: Schematic for Example 2–5.](path/to/image2-27.jpg)

---

## SUMMARY

In this chapter, various properties commonly used in fluid mechanics are discussed. 
- **Density** is mass per unit volume: $\rho = m/V$.
- **Specific gravity** is the ratio of density to standard substance: $SG = \rho / \rho_{H_2O}$.
- **Ideal-gas equation:** $P = \rho RT$.
- **Vapor pressure** $P_v$ is the saturation pressure. **Cavitation** occurs when $P < P_v$.
- **Enthalpy** $h = u + P/\rho$.
- **Coefficient of compressibility** $\kappa = -v (\partial P / \partial v)_T$.
- **Viscosity** $\mu$ represents internal resistance to motion. For Newtonian fluids: $\tau = \mu (du/dy)$.
- **Surface tension** $\sigma_s$ leads to the **capillary effect**, given by $h = \frac{2\sigma_s}{\rho g R} \cos \phi$.

---

## PROBLEMS

**2–1C** What is the difference between intensive and extensive properties?
**2–5** A spherical balloon with a diameter of 6 m is filled with helium at 20°C and 200 kPa. Determine the mole number and the mass of the helium.
**2–10** The density of atmospheric air varies with elevation. Using data:
| z, km | $\rho$, kg/m³ |
| :--- | :--- |
| 6377 | 1.225 |
| 6378 | 1.112 |
| ... | ... |

**2–15** In a piping system, the water temperature remains under 40°C. Determine the minimum pressure allowed to avoid cavitation.
**2–32** Water at 1 atm pressure is compressed to 800 atm isothermally. Determine the increase in density.
**2–38C** What is viscosity? What is the cause of it in liquids and in gases?
**2–43** A 50-cm x 30-cm x 20-cm block weighing 150 N is moved at 0.8 m/s on an inclined surface ($\mu_k = 0.27$). (b) If a 0.4-mm oil film ($\mu = 0.012 \text{ Pa·s}$) is applied, determine the reduction in force.

**2–44** Velocity profile in a pipe: $u(r) = u_{max}(1 - r^n/R^n)$. Develop a relation for the drag force.
**2–47** A clutch system (Fig. P2–47) transmits torque through a 3-mm oil film ($\mu = 0.38 \text{ Pa·s}$) between two 30-cm disks.
**2–49** Bingham plastic model: $\tau = \tau_y + \mu(du/dy)$.
**2–53** Laminar flow in a pipe: $u(r) = u_{max}(1 - r^2/R^2)$. (a) Obtain a relation for drag force.
**2–60E** A 0.03-in-diameter tube in kerosene. Determine the capillary rise.
**2–63** Nutrients in plants: determine how high the solution will rise in a 0.005-mm tube.
**2–72** Variation of dynamic viscosity of water with absolute temperature:
| T, K | $\mu$, Pa·s |
| :--- | :--- |
| 273.15 | $1.787 \times 10^{-3}$ |
| 278.15 | $1.519 \times 10^{-3}$ |
| ... | ... |

**2–73** Laminar flow between parallel plates: $u(y) = 4u_{max}[y/h - (y/h)^2]$. Develop relation for drag force.
**2–75** Damping torque for a disk in oil: $T_{damping} = C\omega$.
**2–78** Consider a 30-cm journal bearing with 0.08-cm gap. Determine the torque needed at 500 rpm.

---

**CHAPTER 2: PROPERTIES OF FLUIDS**

**Density and Specific Gravity**

**2-1C**
**Solution** We are to discuss the difference between intensive and extensive properties.
**Analysis** **Intensive properties** do not depend on the size (extent) of the system but **extensive properties** do depend on the size (extent) of the system.
**Discussion** An example of an intensive property is temperature. An example of an extensive property is mass.

---

**2-2C**
**Solution** We are to define specific gravity and discuss its relationship to density.
**Analysis** The specific gravity, or relative density, is defined as the ratio of the density of a substance to the density of some standard substance at a specified temperature (the standard is water at 4°C, for which $\rho_{\text{H2O}} = 1000 \text{ kg/m}^3$). That is, $SG = \rho / \rho_{\text{H2O}}$. When specific gravity is known, density is determined from $\rho = SG \times \rho_{\text{H2O}}$.
**Discussion** Specific gravity is dimensionless and unitless [it is just a number without dimensions or units].

---

**2-3C**
**Solution** We are to discuss the applicability of the ideal gas law.
**Analysis** A gas can be treated as an ideal gas when it is at a high temperature and/or a low pressure relative to its critical temperature and pressure.
**Discussion** Air and many other gases at room temperature and pressure can be approximated as ideal gases without any significant loss of accuracy.

---

**2-4C**
**Solution** We are to discuss the difference between $R$ and $R_u$.
**Analysis** $R_u$ is the **universal gas constant** that is the same for all gases, whereas $R$ is the **specific gas constant** that is different for different gases. These two are related to each other by $R = R_u / M$, where $M$ is the molar mass (also called the molecular weight) of the gas.
**Discussion** Since molar mass has dimensions of mass per mole, $R$ and $R_u$ do not have the same dimensions or units.

---

**2-5**
**Solution** A balloon is filled with helium gas. The number of moles and the mass of helium are to be determined.
**Assumptions** At specified conditions, helium behaves as an ideal gas.
**Properties** The universal gas constant is $R_u = 8.314 \text{ kPa} \cdot \text{m}^3/\text{kmol} \cdot \text{K}$. The molar mass of helium is $4.0 \text{ kg/kmol}$.
**Analysis** The volume of the sphere is
$V = \frac{4}{3} \pi r^3 = \frac{4}{3} \pi (3 \text{ m})^3 = 113.1 \text{ m}^3$
Assuming ideal gas behavior, the number of moles of He is determined from
$N = \frac{PV}{R_u T} = \frac{(200 \text{ kPa})(113.1 \text{ m}^3)}{(8.314 \text{ kPa} \cdot \text{m}^3/\text{kmol} \cdot \text{K})(293 \text{ K})} = \mathbf{9.286 \text{ kmol}}$
Then the mass of He is determined from
$m = NM = (9.286 \text{ kmol})(4.0 \text{ kg/kmol}) = \mathbf{37.1 \text{ kg}}$
**Discussion** Although the helium mass may seem large (about half the mass of an adult man!), it is much smaller than that of the air it displaces, and that is why helium balloons rise in the air.

---

**2-6**
**Solution** A balloon is filled with helium gas. The effect of the balloon diameter on the mass of helium is to be investigated, and the results are to be tabulated and plotted.
**Analysis** The EES Equations window is shown below, followed by the Solution window and the parametric table.
```ees
"Given Data"
{D=6"[m]"}
{P=200"[kPa]"}
T=20"[C]"
P=100"[kPa]"
R_u=8.314"[kJ/kmol*K]"

"Solution"
P*V=N*R_u*(T+273) 
V=4*pi*(D/2)^3/3"[m^3]"
m=N*MOLARMASS(Helium)"[kg]"
```
| D [m] | m [kg] |
| :--- | :--- |
| 0.5 | 0.01075 |
| 2.111 | 0.8095 |
| 3.722 | 4.437 |
| 5.333 | 13.05 |
| 6.944 | 28.81 |
| 8.556 | 53.88 |
| 10.17 | 90.41 |
| 11.78 | 140.6 |
| 13.39 | 206.5 |
| 15 | 290.4 |
**Discussion** Mass increases with diameter as expected, but not linearly since volume is proportional to $D^3$.

---

**2-7**
**Solution** An automobile tire is inflated with air. The pressure rise of air in the tire when the tire is heated and the amount of air that must be bled off to reduce the temperature to the original value are to be determined.
**Assumptions** 1 At specified conditions, air behaves as an ideal gas. 2 The volume of the tire remains constant.
**Properties** The gas constant of air is $R = 0.287 \text{ kPa} \cdot \text{m}^3/\text{kg} \cdot \text{K}$.
**Analysis** Initially, the absolute pressure in the tire is
$P_1 = P_g + P_{\text{atm}} = 210 + 100 = 310 \text{ kPa}$
Treating air as an ideal gas and assuming the volume of the tire to remain constant, the final pressure in the tire is determined from
$\frac{P_1 V_1}{T_1} = \frac{P_2 V_2}{T_2} \longrightarrow P_2 = P_1 \frac{T_2}{T_1} = (310 \text{ kPa}) \frac{323 \text{ K}}{298 \text{ K}} = 336 \text{ kPa}$
Thus the pressure rise is
$\Delta P = P_2 - P_1 = 336 - 310 = \mathbf{26.0 \text{ kPa}}$
The amount of air that needs to be bled off to restore pressure to its original value is
$m_1 = \frac{P_1 V}{R T_1} = \frac{(310 \text{ kPa})(0.025 \text{ m}^3)}{(0.287 \text{ kPa} \cdot \text{m}^3/\text{kg} \cdot \text{K})(298 \text{ K})} = 0.0906 \text{ kg}$
$m_2 = \frac{P_2 V}{R T_2} = \frac{(310 \text{ kPa})(0.025 \text{ m}^3)}{(0.287 \text{ kPa} \cdot \text{m}^3/\text{kg} \cdot \text{K})(323 \text{ K})} = 0.0836 \text{ kg}$
$\Delta m = m_1 - m_2 = 0.0906 - 0.0836 = \mathbf{0.0070 \text{ kg}}$
**Discussion** Notice that absolute rather than gage pressure must be used in calculations with the ideal gas law.

---

**2-8E**
**Solution** An automobile tire is under-inflated with air. The amount of air that needs to be added to the tire to raise its pressure to the recommended value is to be determined.
**Assumptions** 1 At specified conditions, air behaves as an ideal gas. 2 The volume of the tire remains constant.
**Properties** The gas constant of air is $R = 0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R}$.
**Analysis** The initial and final absolute pressures in the tire are
$P_1 = P_{g1} + P_{\text{atm}} = 20 + 14.6 = 34.6 \text{ psia}$
$P_2 = P_{g2} + P_{\text{atm}} = 30 + 14.6 = 44.6 \text{ psia}$
Treating air as an ideal gas, the initial mass in the tire is
$m_1 = \frac{P_1 V}{R T_1} = \frac{(34.6 \text{ psia})(0.53 \text{ ft}^3)}{(0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R})(550 \text{ R})} = 0.0900 \text{ lbm}$
Noting that the temperature and the volume of the tire remain constant, the final mass in the tire becomes
$m_2 = \frac{P_2 V}{R T_2} = \frac{(44.6 \text{ psia})(0.53 \text{ ft}^3)}{(0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R})(550 \text{ R})} = 0.1160 \text{ lbm}$
Thus the amount of air that needs to be added is $\Delta m = m_2 - m_1 = 0.1160 - 0.0900 = \mathbf{0.0260 \text{ lbm}}$
**Discussion** Notice that absolute rather than gage pressure must be used in calculations with the ideal gas law.

---

**2-9E**
**Solution** A rigid tank contains slightly pressurized air. The amount of air that needs to be added to the tank to raise its pressure and temperature to the recommended values is to be determined.
**Assumptions** 1 At specified conditions, air behaves as an ideal gas. 2 The volume of the tank remains constant.
**Properties** The gas constant of air is $R = 0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R}$.
**Analysis** Treating air as an ideal gas, the initial volume and the final mass in the tank are determined to be
$V = \frac{m_1 R T_1}{P_1} = \frac{(20 \text{ lbm})(0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R})(530 \text{ R})}{20 \text{ psia}} = 196.3 \text{ ft}^3$
$m_2 = \frac{P_2 V}{R T_2} = \frac{(35 \text{ psia})(196.3 \text{ ft}^3)}{(0.3704 \text{ psia} \cdot \text{ft}^3/\text{lbm} \cdot \text{R})(550 \text{ R})} = 33.73 \text{ lbm}$
Thus the amount of air added is
$\Delta m = m_2 - m_1 = 33.73 - 20.0 = \mathbf{13.7 \text{ lbm}}$
**Discussion** As the temperature slowly decreases due to heat transfer, the pressure will also decrease.

---

**2-10**
**Solution** A relation for the variation of density with elevation is to be obtained, the density at 7 km elevation is to be calculated, and the mass of the atmosphere using the correlation is to be estimated.
**Assumptions** 1 Atmospheric air behaves as an ideal gas. 2 The earth is perfectly spherical with a radius of 6377 km at sea level, and the thickness of the atmosphere is 25 km.
**Properties** The density data are given in tabular form as a function of radius and elevation, where $r = z + 6377 \text{ km}$:
| r, km | z, km | $\rho, \text{ kg/m}^3$ |
| :--- | :--- | :--- |
| 6377 | 0 | 1.225 |
| 6378 | 1 | 1.112 |
| 6379 | 2 | 1.007 |
| 6380 | 3 | 0.9093 |
| 6381 | 4 | 0.8194 |
| 6382 | 5 | 0.7364 |
| 6383 | 6 | 0.6601 |
| 6385 | 8 | 0.5258 |
| 6387 | 10 | 0.4135 |
| 6392 | 15 | 0.1948 |
| 6397 | 20 | 0.08891 |
| 6402 | 25 | 0.04008 |

**Analysis** Using EES, a 2nd order polynomial curve fit gives:
$\rho(z) = a + bz + cz^2 = 1.20252 - 0.101674z + 0.0022375z^2$ for the unit of $\text{kg/m}^3$,
where $z$ is the vertical distance from the earth surface at sea level. At $z = 7 \text{ km}$, the equation gives $\rho = \mathbf{0.600 \text{ kg/m}^3}$.
(b) The mass of atmosphere is evaluated by integration to be
$m = \int_V \rho dV = \int_{z=0}^{h} (a + bz + cz^2) 4 \pi (r_0 + z)^2 dz = 4 \pi \int_{z=0}^{h} (a + bz + cz^2)(r_0^2 + 2r_0 z + z^2) dz$
$= 4 \pi [a r_0^2 h + r_0(2a + b r_0) h^2/2 + (a + 2b r_0 + c r_0^2) h^3/3 + (b + 2c r_0) h^4/4 + c h^5/5]$
where $r_0 = 6377 \text{ km}$ is the radius of the earth, $h = 25 \text{ km}$ is the thickness of the atmosphere. Substituting the constants $a, b, c$ and multiplying by $10^9$ to convert to $\text{kg/m}^3$, the mass is determined to be approximately
$m = \mathbf{5.09 \times 10^{18} \text{ kg}}$
**Discussion** At 7 km, the density of the air is approximately half of its value at sea level.

---

**Vapor Pressure and Cavitation**

**2-11C**
**Solution** We are to define vapor pressure and discuss its relationship to saturation pressure.
**Analysis** The **vapor pressure** $P_v$ of a pure substance is defined as the pressure exerted by a vapor in phase equilibrium with its liquid at a given temperature. In general, the pressure of a vapor or gas, whether it exists alone or in a mixture with other gases, is called the **partial pressure**. During phase change processes between the liquid and vapor phases of a pure substance, the saturation pressure and the vapor pressure are equivalent since the vapor is pure.
**Discussion** Partial pressure is not necessarily equal to vapor pressure. For example, on a dry day (low relative humidity), the partial pressure of water vapor in the air is less than the vapor pressure of water. If, however, the relative humidity is 100%, the partial pressure and the vapor pressure are equal.

---

**2-12C**
**Solution** We are to discuss whether the boiling temperature of water increases as pressure increases.
**Analysis** Yes. The saturation temperature of a pure substance depends on pressure; in fact, it increases with pressure. The higher the pressure, the higher the saturation or boiling temperature.
**Discussion** This fact is easily seen by looking at the saturated water property tables. Note that boiling temperature and saturation pressure at a given pressure are equivalent.

---

**2-13C**
**Solution** We are to determine if temperature increases or remains constant when the pressure of a boiling substance increases.
**Analysis** If the pressure of a substance increases during a boiling process, the temperature also increases since the boiling (or saturation) temperature of a pure substance depends on pressure and increases with it.
**Discussion** We are assuming that the liquid will continue to boil. If the pressure is increased fast enough, boiling may stop until the temperature has time to reach its new (higher) boiling temperature. A pressure cooker uses this principle.

---

**2-14C**
**Solution** We are to define and discuss cavitation.
**Analysis** In the flow of a liquid, **cavitation** is the vaporization that may occur at locations where the pressure drops below the vapor pressure. The vapor bubbles collapse as they are swept away from the low pressure regions, generating highly destructive, extremely high-pressure waves. This phenomenon is a common cause for drop in performance and even the erosion of impeller blades.
**Discussion** The word “cavitation” comes from the fact that a vapor bubble or “cavity” appears in the liquid. Not all cavitation is undesirable. It turns out that some underwater vehicles employ “super cavitation” on purpose to reduce drag.

---

**2-15**
**Solution** The minimum pressure in a piping system to avoid cavitation is to be determined.
**Properties** The vapor pressure of water at 40°C is 7.38 kPa.
**Analysis** To avoid cavitation, the pressure anywhere in the flow should not be allowed to drop below the vapor (or saturation) pressure at the given temperature. That is,
$P_{\text{min}} = P_{\text{sat @ 40°C}} = \mathbf{7.38 \text{ kPa}}$
Therefore, the pressure should be maintained above 7.38 kPa everywhere in flow.
**Discussion** Note that the vapor pressure increases with increasing temperature, and thus the risk of cavitation is greater at higher fluid temperatures.

---

**2-16**
**Solution** The minimum pressure in a pump is given. It is to be determined if there is a danger of cavitation.
**Properties** The vapor pressure of water at 20°C is 2.339 kPa.
**Analysis** To avoid cavitation, the pressure everywhere in the flow should remain above the vapor (or saturation) pressure at the given temperature, which is
$P_v = P_{\text{sat @ 20°C}} = 2.339 \text{ kPa}$
The minimum pressure in the pump is 2 kPa, which is less than the vapor pressure. Therefore, **there is danger of cavitation in the pump**.
**Discussion** Note that the vapor pressure increases with increasing temperature, and thus there is a greater danger of cavitation at higher fluid temperatures.

---

**2-17E**
**Solution** The minimum pressure in a pump is given. It is to be determined if there is a danger of cavitation.
**Properties** The vapor pressure of water at 70°F is 0.3632 psia.
**Analysis** To avoid cavitation, the pressure everywhere in the flow should remain above the vapor (or saturation) pressure at the given temperature, which is
$P_v = P_{\text{sat @ 70°F}} = 0.3632 \text{ psia}$
The minimum pressure in the pump is 0.1 psia, which is less than the vapor pressure. Therefore, **there is danger of cavitation in the pump**.
**Discussion** Note that the vapor pressure increases with increasing temperature, and the danger of cavitation increases at higher fluid temperatures.

---

**2-18**
**Solution** The minimum pressure in a pump to avoid cavitation is to be determined.
**Properties** The vapor pressure of water at 25°C is 3.17 kPa.
**Analysis** To avoid cavitation, the pressure anywhere in the system should not be allowed to drop below the vapor (or saturation) pressure at the given temperature. That is,
$P_{\text{min}} = P_{\text{sat @ 25°C}} = \mathbf{3.17 \text{ kPa}}$
Therefore, the lowest pressure that can exist in the pump is 3.17 kPa.
**Discussion** Note that the vapor pressure increases with increasing temperature, and thus the risk of cavitation is greater at higher fluid temperatures.

---

**Energy and Specific Heats**

**2-19C**
**Solution** We are to discuss the difference between macroscopic and microscopic forms of energy.
**Analysis** The **macroscopic forms of energy** are those a system possesses as a whole with respect to some outside reference frame. The **microscopic forms of energy**, on the other hand, are those related to the molecular structure of a system and the degree of the molecular activity, and are independent of outside reference frames.
**Discussion** We mostly deal with macroscopic forms of energy in fluid mechanics.

---

**2-20C**
**Solution** We are to define total energy and identify its constituents.
**Analysis** The sum of all forms of the energy a system possesses is called **total energy**. In the absence of magnetic, electrical, and surface tension effects, the total energy of a system consists of the kinetic, potential, and internal energies.
**Discussion** All three constituents of total energy (kinetic, potential, and internal) need to be considered in an analysis of a general fluid flow.

---

**2-21C**
**Solution** We are to list the forms of energy that contribute to the internal energy of a system.
**Analysis** The internal energy of a system is made up of **sensible, latent, chemical, and nuclear energies**. The sensible internal energy is due to translational, rotational, and vibrational effects.
**Discussion** We deal with the flow of a single phase fluid in most problems in this textbook; therefore, latent, chemical, and nuclear energies do not need to be considered.

---

**2-22C**
**Solution** We are to discuss the relationship between heat, internal energy, and thermal energy.
**Analysis** **Thermal energy** is the sensible and latent forms of internal energy. It does not include chemical or nuclear forms of energy. In common terminology, thermal energy is referred to as heat. However, like work, heat is not a property, whereas thermal energy is a property.
**Discussion** Technically speaking, “heat” is defined only when there is heat transfer, whereas the energy state of a substance can always be defined, even if no heat transfer is taking place.

---

**2-23C**
**Solution** We are to define and discuss flow energy.
**Analysis** **Flow energy** or **flow work** is the energy needed to push a fluid into or out of a control volume. Fluids at rest do not possess any flow energy.
**Discussion** Flow energy is not a fundamental quantity, like kinetic or potential energy. However, it is a useful concept in fluid mechanics since fluids are often forced into and out of control volumes in practice.

---

**2-24C**
**Solution** We are to compare the energies of flowing and non-flowing fluids.
**Analysis** A flowing fluid possesses **flow energy**, which is the energy needed to push a fluid into or out of a control volume, in addition to the forms of energy possessed by a non-flowing fluid. The total energy of a non-flowing fluid consists of internal and potential energies. If the fluid is moving as a rigid body, but not flowing, it may also have kinetic energy. The total energy of a flowing fluid consists of internal, kinetic, potential, and flow energies.
**Discussion** Flow energy is not to be confused with kinetic energy, even though both are zero when the fluid is at rest.

---

**2-25C**
**Solution** We are to explain how changes in internal energy can be determined.
**Analysis** Using specific heat values at the average temperature, the changes in the specific internal energy of ideal gases can be determined from $\Delta u = c_{v,\text{avg}} \Delta T$. For incompressible substances, $c_p \cong c_v \cong c$ and $\Delta u = c_{\text{avg}} \Delta T$.
**Discussion** If the fluid can be treated as neither incompressible nor an ideal gas, property tables must be used.

---

**2-26C**
**Solution** We are to explain how changes in enthalpy can be determined.
**Analysis** Using specific heat values at the average temperature, the changes in specific enthalpy of ideal gases can be determined from $\Delta h = c_{p,\text{avg}} \Delta T$. For incompressible substances, $c_p \cong c_v \cong c$ and $\Delta h = \Delta u + v \Delta P \cong c_{\text{avg}} \Delta T + v \Delta P$.
**Discussion** If the fluid can be treated as neither incompressible nor an ideal gas, property tables must be used.

---

**Coefficient of Compressibility**

**2-27C**
**Solution** We are to discuss the coefficient of compressibility and the isothermal compressibility.
**Analysis** The **coefficient of compressibility** represents the variation of pressure of a fluid with volume or density at constant temperature. **Isothermal compressibility** is the inverse of the coefficient of compressibility, and it represents the fractional change in volume or density corresponding to a change in pressure.
**Discussion** The coefficient of compressibility of an ideal gas is equal to its absolute pressure.

---

**2-28C**
**Solution** We are to define the coefficient of volume expansion.
**Analysis** The **coefficient of volume expansion** represents the variation of the density of a fluid with temperature at constant pressure. It differs from the coefficient of compressibility in that the latter represents the variation of pressure of a fluid with density at constant temperature.
**Discussion** The coefficient of volume expansion of an ideal gas is equal to the inverse of its absolute temperature.

---

**2-29C**
**Solution** We are to discuss the sign of the coefficient of compressibility and the coefficient of volume expansion.
**Analysis** The **coefficient of compressibility** of a fluid **cannot be negative**, but the **coefficient of volume expansion can be negative** (e.g., liquid water below 4°C).
**Discussion** This is the reason that ice floats on water.

---

**2-30**
**Solution** The percent increase in the density of an ideal gas is given for a moderate pressure. The percent increase in density of the gas when compressed at a higher pressure is to be determined.
**Assumptions** The gas behaves an ideal gas.
**Analysis** For an ideal gas, $P = \rho R T$ and $(\partial P / \partial \rho)_T = RT = P/\rho$, and thus $\kappa_{\text{ideal gas}} = P$. Therefore, the coefficient of compressibility of an ideal gas is equal to its absolute pressure, and the coefficient of compressibility of the gas increases with increasing pressure.
Substituting $\kappa = P$ into the definition of the coefficient of compressibility $\kappa \cong -\frac{\Delta P}{\Delta v/v} \cong \frac{\Delta P}{\Delta \rho/\rho}$ and rearranging gives
$\frac{\Delta \rho}{\rho} = \frac{\Delta P}{P}$
Therefore, the percent increase of density of an ideal gas during isothermal compression is equal to the percent increase in pressure.
**At 10 atm:** $\frac{\Delta \rho}{\rho} = \frac{\Delta P}{P} = \frac{11-10}{10} = \mathbf{10\%}$
**At 100 atm:** $\frac{\Delta \rho}{\rho} = \frac{\Delta P}{P} = \frac{101-100}{100} = \mathbf{1\%}$
Therefore, a pressure change of 1 atm causes a density change of 10% at 10 atm and a density change of 1% at 100 atm.
**Discussion** If temperature were also allowed to change, the relationship would not be so simple.

---

**2-31**
**Solution** Using the definition of the coefficient of volume expansion and the expression $\beta_{\text{ideal gas}} = 1/T$, it is to be shown that the percent increase in the specific volume of an ideal gas during isobaric expansion is equal to the percent increase in absolute temperature.
**Assumptions** The gas behaves an ideal gas.
**Analysis** The coefficient of volume expansion $\beta$ can be expressed as $\beta = \frac{1}{v} \left( \frac{\partial v}{\partial T} \right)_P \approx \frac{\Delta v/v}{\Delta T}$.
Noting that $\beta_{\text{ideal gas}} = 1/T$ for an ideal gas and rearranging give
$\frac{\Delta v}{v} = \frac{\Delta T}{T}$
Therefore, the percent increase in the specific volume of an ideal gas during isobaric expansion is equal to the percent increase in absolute temperature.
**Discussion** We must be careful to use absolute temperature (K or R), not relative temperature (°C or °F).

---

**2-32**
**Solution** Water at a given temperature and pressure is compressed to a high pressure isothermally. The increase in the density of water is to be determined.
**Assumptions** 1 The isothermal compressibility is constant in the given pressure range. 2 An approximate analysis is performed by replacing differential changes by finite changes.
**Properties** The density of water at 20°C and 1 atm pressure is $\rho_1 = 998 \text{ kg/m}^3$. The isothermal compressibility of water is given to be $\alpha = 4.80 \times 10^{-5} \text{ atm}^{-1}$.
**Analysis** When differential quantities are replaced by differences and the properties $\alpha$ and $\beta$ are assumed to be constant, the change in density in terms of the changes in pressure and temperature is expressed approximately as
$\Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T$
The change in density due to a change of pressure from 1 atm to 800 atm at constant temperature is
$\Delta \rho = \alpha \rho \Delta P = (4.80 \times 10^{-5} \text{ atm}^{-1})(998 \text{ kg/m}^3)(800 - 1) \text{ atm} = \mathbf{38.3 \text{ kg/m}^3}$
**Discussion** Note that the density of water increases from 998 to $1036.3 \text{ kg/m}^3$ while being compressed, as expected. This problem can be solved more accurately using differential analysis when functional forms of properties are available.

---

**2-33**
**Solution** Water at a given temperature and pressure is heated to a higher temperature at constant pressure. The change in the density of water is to be determined.
**Assumptions** 1 The coefficient of volume expansion is constant in the given temperature range. 2 An approximate analysis is performed by replacing differential changes in quantities by finite changes.
**Properties** The density of water at 15°C and 1 atm pressure is $\rho_1 = 999.1 \text{ kg/m}^3$. The coefficient of volume expansion at the average temperature of $(15+95)/2 = 55\text{°C}$ is $\beta = 0.484 \times 10^{-3} \text{ K}^{-1}$.
**Analysis** When differential quantities are replaced by differences and the properties $\alpha$ and $\beta$ are assumed to be constant, the change in density in terms of the changes in pressure and temperature is expressed approximately as
$\Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T$
The change in density due to the change of temperature from 15°C to 95°C at constant pressure is
$\Delta \rho = -\beta \rho \Delta T = -(0.484 \times 10^{-3} \text{ K}^{-1})(999.1 \text{ kg/m}^3)(95 - 15) \text{ K} = \mathbf{-38.7 \text{ kg/m}^3}$
**Discussion** Noting that $\Delta \rho = \rho_2 - \rho_1$, the density of water at 95°C and 1 atm is
$\rho_2 = \rho_1 + \Delta \rho = 999.1 + (-38.7) = \mathbf{960.4 \text{ kg/m}^3}$
which is very close to the listed value of $961.5 \text{ kg/m}^3$ at 95°C in water table in the Appendix. This is mostly due to $\beta$ varying with temperature almost linearly. Note that the density of water decreases while being heated, as expected. This problem can be solved more accurately using differential analysis when functional forms of properties are available.

---

**2-34**
**Solution** Saturated refrigerant-134a at a given temperature is cooled at constant pressure. The change in the density of the refrigerant is to be determined.
**Assumptions** 1 The coefficient of volume expansion is constant in the given temperature range. 2 An approximate analysis is performed by replacing differential changes in quantities by finite changes.
**Properties** The density of saturated liquid R-134a at 10°C is $\rho_1 = 1261 \text{ kg/m}^3$. The coefficient of volume expansion at the average temperature of $(10+0)/2 = 5\text{°C}$ is $\beta = 0.00269 \text{ K}^{-1}$.
**Analysis** When differential quantities are replaced by differences and the properties $\alpha$ and $\beta$ are assumed to be constant, the change in density in terms of the changes in pressure and temperature is expressed approximately as
$\Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T$
The change in density due to the change of temperature from 10°C to 0°C at constant pressure is
$\Delta \rho = -\beta \rho \Delta T = -(0.00269 \text{ K}^{-1})(1261 \text{ kg/m}^3)(0 - 10) \text{ K} = \mathbf{33.9 \text{ kg/m}^3}$
**Discussion** Noting that $\Delta \rho = \rho_2 - \rho_1$, the density of R-134a at 0°C is
$\rho_2 = \rho_1 + \Delta \rho = 1261 + 33.9 = \mathbf{1294.9 \text{ kg/m}^3}$
which is almost identical to the listed value of $1295 \text{ kg/m}^3$ at 0°C in R-134a table in the Appendix. This is mostly due to $\beta$ varying with temperature almost linearly. Note that the density increases during cooling, as expected.

---

**2-35**
**Solution** A water tank completely filled with water can withstand tension caused by a volume expansion of 2%. The maximum temperature rise allowed in the tank without jeopardizing safety is to be determined.
**Assumptions** 1 The coefficient of volume expansion is constant. 2 An approximate analysis is performed by replacing differential changes in quantities by finite changes. 3 The effect of pressure is disregarded.
**Properties** The average volume expansion coefficient is given to be $\beta = 0.377 \times 10^{-3} \text{ K}^{-1}$.
**Analysis** When differential quantities are replaced by differences and the properties $\alpha$ and $\beta$ are assumed to be constant, the change in density in terms of the changes in pressure and temperature is expressed approximately as
$\Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T$
A volume increase of 2% corresponds to a density decrease of 2%, which can be expressed as $\Delta \rho = -0.02 \rho$. Then the decrease in density due to a temperature rise of $\Delta T$ at constant pressure is
$-0.02 \rho = -\beta \rho \Delta T$
Solving for $\Delta T$ and substituting, the maximum temperature rise is determined to be
$\Delta T = \frac{0.02}{\beta} = \frac{0.02}{0.377 \times 10^{-3} \text{ K}^{-1}} = 53.0 \text{ K} = \mathbf{53.0\text{°C}}$
**Discussion** This result is conservative since in reality the increasing pressure will tend to compress the water and increase its density.

---

**2-36**
**Solution** A water tank completely filled with water can withstand tension caused by a volume expansion of 1%. The maximum temperature rise allowed in the tank without jeopardizing safety is to be determined.
**Assumptions** 1 The coefficient of volume expansion is constant. 2 An approximate analysis is performed by replacing differential changes in quantities by finite changes. 3 The effect of pressure is disregarded.
**Properties** The average volume expansion coefficient is given to be $\beta = 0.377 \times 10^{-3} \text{ K}^{-1}$.
**Analysis** When differential quantities are replaced by differences and the properties $\alpha$ and $\beta$ are assumed to be constant, the change in density in terms of the changes in pressure and temperature is expressed approximately as
$\Delta \rho = \alpha \rho \Delta P - \beta \rho \Delta T$
A volume increase of 1% corresponds to a density decrease of 1%, which can be expressed as $\Delta \rho = -0.01 \rho$. Then the decrease in density due to a temperature rise of $\Delta T$ at constant pressure is
$-0.01 \rho = -\beta \rho \Delta T$
Solving for $\Delta T$ and substituting, the maximum temperature rise is determined to be
$\Delta T = \frac{0.01}{\beta} = \frac{0.01}{0.377 \times 10^{-3} \text{ K}^{-1}} = 26.5 \text{ K} = \mathbf{26.5\text{°C}}$
**Discussion** This result is conservative since in reality the increasing pressure will tend to compress the water and increase its density. The change in temperature is exactly half of that of the previous problem, as expected.

---

**2-37**
**Solution** The density of seawater at the free surface and the bulk modulus of elasticity are given. The density and pressure at a depth of 2500 m are to be determined.
**Assumptions** 1 The temperature and the bulk modulus of elasticity of seawater is constant. 2 The gravitational acceleration remains constant.
**Properties** The density of seawater at free surface where the pressure is given to be $1030 \text{ kg/m}^3$, and the bulk modulus of elasticity of seawater is given to be $2.34 \times 10^9 \text{ N/m}^2$.
**Analysis** The coefficient of compressibility or the bulk modulus of elasticity of fluids is expressed as
$\kappa = \rho \left( \frac{\partial P}{\partial \rho} \right)_T$ or $\kappa = \rho \frac{dP}{d\rho}$ (at constant $T$)
The differential pressure change across a differential fluid height of $dz$ is given as $dP = \rho g dz$.
Combining the two relations above and rearranging,
$\kappa = \rho \frac{\rho g dz}{d\rho} = \rho^2 g \frac{dz}{d\rho} \longrightarrow \frac{d\rho}{\rho^2} = \frac{g dz}{\kappa}$
Integrating from $z = 0$ where $\rho = \rho_0 = 1030 \text{ kg/m}^3$ to $z = z$ where $\rho = \rho$ gives
$\int_{\rho_0}^{\rho} \frac{d\rho}{\rho^2} = \int_{0}^{z} \frac{g}{\kappa} dz \longrightarrow \frac{1}{\rho_0} - \frac{1}{\rho} = \frac{gz}{\kappa}$
Solving for $\rho$ gives the variation of density with depth as
$\rho = \frac{1}{(1/\rho_0) - (gz/\kappa)}$
Substituting into the pressure change relation $dP = \rho g dz$ and integrating from $z = 0$ where $P = P_0 = 98 \text{ kPa}$ to $z = z$ where $P = P$ gives
$\int_{P_0}^{P} dP = \int_{0}^{z} \frac{g dz}{(1/\rho_0) - (gz/\kappa)} \longrightarrow P = P_0 + \kappa \ln \left( \frac{1}{1 - (\rho_0 g z / \kappa)} \right)$
which is the desired relation for the variation of pressure in seawater with depth. At $z = 2500 \text{ m}$, the values of density and pressure are determined by substitution to be
$\rho = \frac{1}{1/(1030 \text{ kg/m}^3) - (9.81 \text{ m/s}^2)(2500 \text{ m})/(2.34 \times 10^9 \text{ N/m}^2)} = \mathbf{1041 \text{ kg/m}^3}$
$P = (98,000 \text{ Pa}) + (2.34 \times 10^9 \text{ N/m}^2) \ln \left( \frac{1}{1 - (1030 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(2500 \text{ m})/(2.34 \times 10^9 \text{ N/m}^2)} \right)$
$= 2.550 \times 10^7 \text{ Pa} = \mathbf{25.50 \text{ MPa}}$
**Discussion** Note that if we assumed $\rho = \rho_0 = \text{constant at } 1030 \text{ kg/m}^3$, the pressure at 2500 m would be $P = P_0 + \rho g z = 0.098 + 25.26 = 25.36 \text{ MPa}$. Then the density at 2500 m is estimated to be
$\Delta \rho = \rho \alpha \Delta P = (1030)(2.34 \times 10^9 \text{ Pa})^{-1}(25.26 \text{ MPa}) = 11.1 \text{ kg/m}^3$ and thus $\rho = 1041 \text{ kg/m}^3$.

---

**Viscosity**

**2-38C**
**Solution** We are to define and discuss viscosity.
**Analysis** **Viscosity** is a measure of the “stickiness” or “resistance to deformation” of a fluid. It is due to the internal frictional force that develops between different layers of fluids as they are forced to move relative to each other. Viscosity is caused by the cohesive forces between the molecules in liquids, and by the molecular collisions in gases. In general, **liquids have higher dynamic viscosities than gases**.
**Discussion** The ratio of viscosity $\mu$ to density $\rho$ often appears in the equations of fluid mechanics, and is defined as the **kinematic viscosity**, $\nu = \mu / \rho$.

---

**2-39C**
**Solution** We are to discuss Newtonian fluids.
**Analysis** Fluids whose shear stress is linearly proportional to the velocity gradient (shear strain) are called **Newtonian fluids**. Most common fluids such as water, air, gasoline, and oils are Newtonian fluids.
**Discussion** In the differential analysis of fluid flow, only Newtonian fluids are considered in this textbook.

---

**2-40C**
**Solution** We are to compare the settling speed of balls dropped in water and oil; namely, we are to determine which will reach the bottom of the container first.
**Analysis** When two identical small glass balls are dropped into two identical containers, one filled with water and the other with oil, the **ball dropped in water will reach the bottom of the container first** because of the much lower viscosity of water relative to oil.
**Discussion** Oil is very viscous, with typical values of viscosity approximately 800 times greater than that of water at room temperature.

---

**2-41C**
**Solution** We are to discuss how dynamic viscosity varies with temperature in liquids and gases.
**Analysis** (a) The **dynamic viscosity of liquids decreases** with temperature. (b) The **dynamic viscosity of gases increases** with temperature.
**Discussion** A good way to remember this is that a car engine is much harder to start in the winter because the oil in the engine has a higher viscosity at low temperatures.

---

**2-42C**
**Solution** We are to discuss how kinematic viscosity varies with temperature in liquids and gases.
**Analysis** (a) For **liquids, the kinematic viscosity decreases** with temperature. (b) For **gases, the kinematic viscosity increases** with temperature.
**Discussion** You can easily verify this by looking at the appendices.

---

**2-43**
**Solution** A block is moved at constant velocity on an inclined surface. The force that needs to be applied in the horizontal direction when the block is dry, and the percent reduction in the required force when an oil film is applied on the surface are to be determined.
**Assumptions** 1 The inclined surface is plane (perfectly flat, although tilted). 2 The friction coefficient and the oil film thickness are uniform. 3 The weight of the oil layer is negligible.
**Properties** The absolute viscosity of oil is given to be $\mu = 0.012 \text{ Pa} \cdot \text{s} = 0.012 \text{ N} \cdot \text{s/m}^2$.
**Analysis** (a) The velocity of the block is constant, and thus its acceleration and the net force acting on it are zero. A free body diagram of the block is given. Then the force balance gives
$\sum F_x = 0: F_1 - F_f \cos 20\text{°} - F_{N1} \sin 20\text{°} = 0$ (1)
$\sum F_y = 0: F_{N1} \cos 20\text{°} - F_f \sin 20\text{°} - W = 0$ (2)
Friction force: $F_f = f F_{N1}$ (3)
Substituting Eq. (3) into Eq. (2) and solving for $F_{N1}$ gives
$F_{N1} = \frac{W}{\cos 20\text{°} - f \sin 20\text{°}} = \frac{150 \text{ N}}{\cos 20\text{°} - 0.27 \sin 20\text{°}} = 177.0 \text{ N}$
Then from Eq. (1):
$F_1 = F_f \cos 20\text{°} + F_{N1} \sin 20\text{°} = (0.27 \times 177 \text{ N}) \cos 20\text{°} + (177 \text{ N}) \sin 20\text{°} = \mathbf{105.5 \text{ N}}$

(b) In this case, the friction force is replaced by the shear force applied on the bottom surface of the block due to the oil. Because of the no-slip condition, the oil film sticks to the inclined surface at the bottom and the lower surface of the block at the top. Then the shear force is expressed as
$F_{\text{shear}} = \tau_w A_s = \mu A_s \frac{V}{h} = (0.012 \text{ N} \cdot \text{s/m}^2)(0.5 \times 0.2 \text{ m}^2) \frac{0.8 \text{ m/s}}{4 \times 10^{-4} \text{ m}} = 2.4 \text{ N}$
Replacing the friction force by the shear force in part (a),
$\sum F_x = 0: F_2 - F_{\text{shear}} \cos 20\text{°} - F_{N2} \sin 20\text{°} = 0$ (4)
$\sum F_y = 0: F_{N2} \cos 20\text{°} - F_{\text{shear}} \sin 20\text{°} - W = 0$ (5)
Eq. (5) gives $F_{N2} = (F_{\text{shear}} \sin 20\text{°} + W) / \cos 20\text{°} = [(2.4 \text{ N}) \sin 20\text{°} + (150 \text{ N})] / \cos 20\text{°} = 160.5 \text{ N}$
Substituting into Eq. (4), the required horizontal force is determined to be
$F_2 = F_{\text{shear}} \cos 20\text{°} + F_{N2} \sin 20\text{°} = (2.4 \text{ N}) \cos 20\text{°} + (160.5 \text{ N}) \sin 20\text{°} = 57.2 \text{ N}$
Then, our final result is expressed as
$\text{Percentage reduction in required force} = \frac{F_1 - F_2}{F_1} \times 100\% = \frac{105.5 - 57.2}{105.5} \times 100\% = \mathbf{45.8\%}$
**Discussion** Note that the force required to push the block on the inclined surface reduces significantly by oiling the surface.

---

**2-44**
**Solution** The velocity profile of a fluid flowing though a circular pipe is given. The friction drag force exerted on the pipe by the fluid in the flow direction per unit length of the pipe is to be determined.
**Assumptions** The viscosity of the fluid is constant.
**Analysis** The wall shear stress is determined from its definition to be
$\tau_w = -\mu \frac{du}{dr} \Big|_{r=R} = -\mu u_{\text{max}} \frac{d}{dr} \left( 1 - \frac{r^n}{R^n} \right) \Big|_{r=R} = -\mu u_{\text{max}} \frac{-n r^{n-1}}{R^n} \Big|_{r=R} = \frac{n \mu u_{\text{max}}}{R}$
Note that the quantity $du/dr$ is negative in pipe flow, and the negative sign is added to the $\tau_w$ relation for pipes to make shear stress in the positive (flow) direction a positive quantity. (Or, $du/dr = -du/dy$ since $y = R - r$).
Then the friction drag force exerted by the fluid on the inner surface of the pipe becomes
$F = \tau_w A_w = \frac{n \mu u_{\text{max}}}{R} (2 \pi R) L = 2 n \pi \mu u_{\text{max}} L$
Therefore, the drag force per unit length of the pipe is
$F/L = \mathbf{2 n \pi \mu u_{\text{max}}}$
**Discussion** Note that the drag force acting on the pipe in this case is independent of the pipe diameter.

---

**2-45**
**Solution** A thin flat plate is pulled horizontally through an oil layer sandwiched between two plates, one stationary and the other moving at a constant velocity. The location in oil where the velocity is zero and the force that needs to be applied on the plate are to be determined.
**Assumptions** 1 The thickness of the plate is negligible. 2 The velocity profile in each oil layer is linear.
**Properties** The absolute viscosity of oil is given to be $\mu = 0.027 \text{ Pa} \cdot \text{s} = 0.027 \text{ N} \cdot \text{s/m}^2$.
**Analysis** (a) The velocity profile in each oil layer relative to the fixed wall is as shown in the figure below. The point of zero velocity is indicated by point A, and its distance from the lower plate is determined from geometric considerations (the similarity of the two triangles in the lower oil layer) to be
$\frac{2.6 - y_A}{y_A} = \frac{1}{0.3} \longrightarrow y_A = \mathbf{0.60 \text{ mm}}$
(b) The magnitudes of shear forces acting on the upper and lower surfaces of the plate are
$F_{\text{shear, upper}} = \tau_{w, \text{ upper}} A_s = \mu A_s \frac{du}{dy} = \mu A_s \frac{V - 0}{h_1} = (0.027 \text{ N} \cdot \text{s/m}^2)(0.2 \times 0.2 \text{ m}^2) \frac{1 \text{ m/s}}{1.0 \times 10^{-3} \text{ m}} = 1.08 \text{ N}$
$F_{\text{shear, lower}} = \tau_{w, \text{ lower}} A_s = \mu A_s \frac{du}{dy} = \mu A_s \frac{V - V_w}{h_2} = (0.027 \text{ N} \cdot \text{s/m}^2)(0.2 \times 0.2 \text{ m}^2) \frac{[1 - (-0.3)] \text{ m/s}}{2.6 \times 10^{-3} \text{ m}} = 0.54 \text{ N}$
Noting that both shear forces are in the opposite direction of motion of the plate, the force $F$ is determined from a force balance on the plate to be
$F = F_{\text{shear, upper}} + F_{\text{shear, lower}} = 1.08 + 0.54 = \mathbf{1.62 \text{ N}}$
**Discussion** Note that wall shear is a friction force between a solid and a liquid, and it acts in the opposite direction of motion.

---

**2-46**
**Solution** A frustum shaped body is rotating at a constant angular speed in an oil container. The power required to maintain this motion and the reduction in the required power input when the oil temperature rises are to be determined.
**Assumptions** The thickness of the oil layer remains constant.
**Properties** The absolute viscosity of oil is given to be $\mu = 0.1 \text{ Pa} \cdot \text{s} = 0.1 \text{ N} \cdot \text{s/m}^2$ at 20°C and $0.0078 \text{ Pa} \cdot \text{s}$ at 80°C.
**Analysis** The velocity gradient anywhere in the oil of film thickness $h$ is $V/h$ where $V = \omega r$ is the tangential velocity. Then the wall shear stress anywhere on the surface of the frustum at a distance $r$ from the axis of rotation is
$\tau_w = \mu \frac{du}{dr} = \mu \frac{V}{h} = \mu \frac{\omega r}{h}$
The shear force acting on differential area $dA$ on the surface, the torque it generates, and the shaft power associated with it are expressed as
$dF = \tau_w dA = \mu \frac{\omega r}{h} dA$
$dT = r dF = \mu \frac{\omega r^2}{h} dA$
$\dot{W}_{\text{sh}} = \omega T = \frac{\mu \omega^2}{h} \int_A r^2 dA$
**Top surface:** For the top surface, $dA = 2 \pi r dr$. Substituting and integrating,
$\dot{W}_{\text{sh, top}} = \frac{\mu \omega^2}{h} \int_0^{D/2} r^2 (2 \pi r) dr = \frac{2 \pi \mu \omega^2}{h} \int_0^{D/2} r^3 dr = \frac{2 \pi \mu \omega^2}{h} \frac{r^4}{4} \Big|_0^{D/2} = \frac{\pi \mu \omega^2 D^4}{32 h}$
**Bottom surface:** A relation for the bottom surface is obtained by replacing $D$ by $d$,
$\dot{W}_{\text{sh, bottom}} = \frac{\pi \mu \omega^2 d^4}{32 h}$
**Side surface:** The differential area for the side surface can be expressed as $dA = 2 \pi r dz$. From geometric considerations, the variation of radius with axial distance is expressed as $r = \frac{d}{2} + \frac{D - d}{2L} z$.
Differentiating gives $dr = \frac{D - d}{2L} dz$ or $dz = \frac{2L}{D - d} dr$. Therefore, $dA = 2 \pi r dz = \frac{4 \pi L}{D - d} r dr$. Substituting and integrating,
$\dot{W}_{\text{sh, side}} = \frac{\mu \omega^2}{h} \int_{d/2}^{D/2} r^2 \frac{4 \pi L}{D - d} r dr = \frac{4 \pi \mu \omega^2 L}{h(D - d)} \int_{d/2}^{D/2} r^3 dr = \frac{4 \pi \mu \omega^2 L}{h(D - d)} \frac{r^4}{4} \Big|_{d/2}^{D/2} = \frac{\pi \mu \omega^2 L (D^4 - d^4)}{16 h(D - d)}$
Then the total power required becomes
$\dot{W}_{\text{sh, total}} = \dot{W}_{\text{sh, top}} + \dot{W}_{\text{sh, bottom}} + \dot{W}_{\text{sh, side}} = \frac{\pi \mu \omega^2 D^4}{32 h} \left[ 1 + (d/D)^4 + \frac{2L[1 - (d/D)^4]}{D - d} \right]$
where $d/D = 4/12 = 1/3$. Substituting,
$\dot{W}_{\text{sh, total}} = \frac{\pi (0.1 \text{ N} \cdot \text{s/m}^2) (200 / s)^2 (0.12 \text{ m})^4}{32 (0.0012 \text{ m})} \left[ 1 + (1/3)^4 + \frac{2(0.12 \text{ m})[1 - (1/3)^4]}{(0.12 - 0.04) \text{ m}} \right] = \mathbf{270 \text{ W}}$
Noting that power is proportional to viscosity, the power required at 80°C is
$\dot{W}_{\text{sh, total, 80°C}} = \frac{\mu_{\text{80°C}}}{\mu_{\text{20°C}}} \dot{W}_{\text{sh, total, 20°C}} = \frac{0.0078 \text{ N} \cdot \text{s/m}^2}{0.1 \text{ N} \cdot \text{s/m}^2} (270 \text{ W}) = 21.1 \text{ W}$
Therefore, the reduction in the requires power input at 80°C is
$\text{Reduction} = \dot{W}_{\text{sh, total, 20°C}} - \dot{W}_{\text{sh, total, 80°C}} = 270 - 21.1 = \mathbf{249 \text{ W}}$, which is about 92%.
**Discussion** Note that the power required to overcome shear forces in a viscous fluid greatly depends on temperature.

---

**2-47**
**Solution** A clutch system is used to transmit torque through an oil film between two identical disks. For specified rotational speeds, the transmitted torque is to be determined.
**Assumptions** 1 The thickness of the oil film is uniform. 2 The rotational speeds of the disks remain constant.
**Properties** The absolute viscosity of oil is given to be $\mu = 0.38 \text{ N} \cdot \text{s/m}^2$.
**Analysis** The disks are rotating in the same direction at different angular speeds of $\omega_1$ and $\omega_2$. Therefore, we can assume one of the disks to be stationary and the other to be rotating at an angular speed of $\omega_1 - \omega_2$. The velocity gradient anywhere in the oil of film thickness $h$ is $V/h$ where $V = (\omega_1 - \omega_2)r$ is the tangential velocity. Then the wall shear stress anywhere on the surface of the faster disk at a distance $r$ from the axis of rotation can be expressed as
$\tau_w = \mu \frac{du}{dr} = \mu \frac{V}{h} = \mu \frac{(\omega_1 - \omega_2)r}{h}$
Then the shear force acting on a differential area $dA$ on the surface and the torque generation associated with it can be expressed as
$dF = \tau_w dA = \mu \frac{(\omega_1 - \omega_2)r}{h} (2 \pi r) dr$
$dT = r dF = \mu \frac{(\omega_1 - \omega_2)r^2}{h} (2 \pi r) dr = \frac{2 \pi \mu (\omega_1 - \omega_2)}{h} r^3 dr$
Integrating,
$T = \frac{2 \pi \mu (\omega_1 - \omega_2)}{h} \int_{r=0}^{D/2} r^3 dr = \frac{2 \pi \mu (\omega_1 - \omega_2)}{h} \frac{r^4}{4} \Big|_{r=0}^{D/2} = \frac{\pi \mu (\omega_1 - \omega_2) D^4}{32 h}$
Noting that $\omega = 2 \pi \dot{n}$, the relative angular speed is
$\omega_1 - \omega_2 = 2 \pi (\dot{n}_1 - \dot{n}_2) = (2 \pi \text{ rad/rev}) [(1450 - 1398) \text{ rev/min}] \left( \frac{1 \text{ min}}{60 \text{ s}} \right) = 5.445 \text{ rad/s}$
Substituting, the torque transmitted is determined to be
$T = \frac{\pi (0.38 \text{ N} \cdot \text{s/m}^2) (5.445 \text{ rad/s}) (0.30 \text{ m})^4}{32 (0.003 \text{ m})} = \mathbf{0.55 \text{ N} \cdot \text{m}}$
**Discussion** Note that the torque transmitted is proportional to the fourth power of disk diameter, and is inversely proportional to the thickness of the oil film.

---

**2-48**
**Solution** We are to investigate the effect of oil film thickness on the transmitted torque.
**Analysis** The previous problem is reconsidered. Using EES software, the effect of oil film thickness on the torque transmitted is investigated. Film thickness varied from 0.1 mm to 10 mm, and the results are tabulated and plotted. The relation used is $T = \frac{\pi \mu (\omega_1 - \omega_2) D^4}{32 h}$.
```ees
mu=0.38 
n1=1450 "rpm"
w1=2*pi*n1/60 "rad/s"
n2=1398 "rpm"
w2=2*pi*n2/60 "rad/s"
D=0.3 "m"
Tq=pi*mu*(w1-w2)*(D^4)/(32*h)
```
| Film thickness $h$, mm | Torque transmitted $T$, Nm |
| :--- | :--- |
| 0.1 | 16.46 |
| 0.2 | 8.23 |
| 0.4 | 4.11 |
| 0.6 | 2.74 |
| 0.8 | 2.06 |
| 1 | 1.65 |
| 2 | 0.82 |
| 4 | 0.41 |
| 6 | 0.27 |
| 8 | 0.21 |
| 10 | 0.16 |
**Conclusion** Torque transmitted is inversely proportional to oil film thickness, and the film thickness should be as small as possible to maximize the transmitted torque.
**Discussion** To obtain the solution in EES, we set up a parametric table, specify $h$, and let EES calculate $T$ for each value of $h$.

---

**2-49**
**Solution** A multi-disk Electro-rheological “ER” clutch is considered. The ER fluid has a shear stress that is expressed as $\tau = \tau_y + \mu (du/dy)$. A relationship for the torque transmitted by the clutch is to be obtained, and the numerical value of the torque is to be calculated.
**Assumptions** 1 The thickness of the oil layer between the disks is constant. 2 The Bingham plastic model for shear stress expressed as $\tau = \tau_y + \mu (du/dy)$ is valid.
**Properties** The constants in shear stress relation are given to be $\mu = 0.1 \text{ Pa} \cdot \text{s}$ and $\tau_y = 2.5 \text{ kPa}$.
**Analysis** (a) The velocity gradient anywhere in the oil of film thickness $h$ is $V/h$ where $V = \omega r$ is the tangential velocity relative to plates mounted on the shell. Then the wall shear stress anywhere on the surface of a plate mounted on the input shaft at a distance $r$ from the axis of rotation is expressed as
$\tau_w = \tau_y + \mu \frac{V}{h} = \tau_y + \mu \frac{\omega r}{h}$
Then the shear force acting on a differential area $dA$ on the surface of a disk and the torque generation associated with it are expressed as
$dF = \tau_w dA = \left( \tau_y + \mu \frac{\omega r}{h} \right) (2 \pi r) dr$
$dT = r dF = r \left( \tau_y + \mu \frac{\omega r}{h} \right) (2 \pi r) dr = 2 \pi \left( \tau_y r^2 + \mu \frac{\omega r^3}{h} \right) dr$
Integrating,
$T = 2 \pi \int_{R_1}^{R_2} \left( \tau_y r^2 + \mu \frac{\omega r^3}{h} \right) dr = 2 \pi \left[ \tau_y \frac{r^3}{3} + \frac{\mu \omega r^4}{4h} \right]_{R_1}^{R_2} = 2 \pi \left[ \frac{\tau_y}{3} (R_2^3 - R_1^3) + \frac{\mu \omega}{4h} (R_2^4 - R_1^4) \right]$
This is the torque transmitted by one surface of a plate mounted on the input shaft. Then the torque transmitted by both surfaces of $N$ plates attached to input shaft in the clutch becomes
$T = 4 \pi N \left[ \frac{\tau_y}{3} (R_2^3 - R_1^3) + \frac{\mu \omega}{4h} (R_2^4 - R_1^4) \right]$
(b) Noting that $\omega = 2 \pi \dot{n} = 2 \pi (2400 \text{ rev/min}) = 15,080 \text{ rad/min} = 251.3 \text{ rad/s}$ and substituting,
$T = (4 \pi)(11) \left[ \frac{2500 \text{ N/m}^2}{3} [(0.20 \text{ m})^3 - (0.05 \text{ m})^3] + \frac{(0.1 \text{ N} \cdot \text{s/m}^2)(251.3 \text{ /s})}{4(0.0012 \text{ m})} [(0.20 \text{ m})^4 - (0.05 \text{ m})^4] \right] = \mathbf{2060 \text{ N} \cdot \text{m}}$
**Discussion** Can you think of some other potential applications for this kind of fluid?

---

**2-50**
**Solution** A multi-disk magnetorheological “MR” clutch is considered. The MR fluid has a shear stress that is expressed as $\tau = \tau_y + K(du/dy)^m$. A relationship for the torque transmitted by the clutch is to be obtained, and the numerical value of the torque is to be calculated.
**Assumptions** 1 The thickness of the oil layer between the disks is constant. 2 The Herschel-Bulkley model for shear stress expressed as $\tau = \tau_y + K(du/dy)^m$ is valid.
**Properties** The constants in shear stress relation are given to be $\tau_y = 900 \text{ Pa}$, $K = 58 \text{ Pa} \cdot \text{s}^m$, and $m = 0.82$.
**Analysis** (a) The velocity gradient anywhere in the oil of film thickness $h$ is $V/h$ where $V = \omega r$ is the tangential velocity relative to plates mounted on the shell. Then the wall shear stress anywhere on the surface of a plate mounted on the input shaft at a distance $r$ from the axis of rotation is expressed as
$\tau_w = \tau_y + K \left( \frac{V}{h} \right)^m = \tau_y + K \left( \frac{\omega r}{h} \right)^m = \tau_y + K \frac{\omega^m r^m}{h^m}$
Then the shear force acting on a differential area $dA$ on the surface of a disk and the torque generation associated with it are expressed as
$dF = \tau_w dA = \left[ \tau_y + K \left( \frac{\omega r}{h} \right)^m \right] (2 \pi r) dr$
$dT = r dF = r \left[ \tau_y + K \left( \frac{\omega r}{h} \right)^m \right] (2 \pi r) dr = 2 \pi \left[ \tau_y r^2 + K \frac{\omega^m r^{m+2}}{h^m} \right] dr$
Integrating,
$T = 2 \pi \int_{R_1}^{R_2} \left( \tau_y r^2 + K \frac{\omega^m r^{m+2}}{h^m} \right) dr = 2 \pi \left[ \frac{\tau_y r^3}{3} + \frac{K \omega^m r^{m+3}}{(m+3)h^m} \right]_{R_1}^{R_2} = 2 \pi \left[ \frac{\tau_y}{3} (R_2^3 - R_1^3) + \frac{K \omega^m}{(m+3)h^m} (R_2^4 - R_1^4) \right]$
This is the torque transmitted by one surface of a plate mounted on the input shaft. Then the torque transmitted by both surfaces of $N$ plates attached to input shaft in the clutch becomes
$T = 4 \pi N \left[ \frac{\tau_y}{3} (R_2^3 - R_1^3) + \frac{K \omega^m}{(m+3)h^m} (R_2^4 - R_1^4) \right]$
(b) Noting that $\omega = 2 \pi \dot{n} = 2 \pi (2400 \text{ rev/min}) = 15,080 \text{ rad/min} = 251.3 \text{ rad/s}$ and substituting,
$T = (4 \pi)(11) \left[ \frac{900 \text{ N/m}^2}{3} [(0.20 \text{ m})^3 - (0.05 \text{ m})^3] + \frac{(58 \text{ N} \cdot \text{s}^{0.82}/\text{m}^2)(251.3 \text{ /s})^{0.82}}{(0.82+3)(0.0012 \text{ m})^{0.82}} [(0.20 \text{ m})^{3.82} - (0.05 \text{ m})^{3.82}] \right]$
$= 103.4 \text{ N} \cdot \text{m} \cong \mathbf{103 \text{ kN} \cdot \text{m}}$
**Discussion** Can you think of some other potential applications for this kind of fluid?

---

**2-51**
**Solution** The torque and the rpm of a double cylinder viscometer are given. The viscosity of the fluid is to be determined.
**Assumptions** 1 The inner cylinder is completely submerged in oil. 2 The viscous effects on the two ends of the inner cylinder are negligible. 3 The fluid is Newtonian.
**Analysis** Substituting the given values, the viscosity of the fluid is determined to be
$\mu = \frac{T \ell}{4 \pi^2 R^3 \dot{n} L} = \frac{(0.8 \text{ N} \cdot \text{m})(0.0012 \text{ m})}{4 \pi^2 (0.075 \text{ m})^3 (200 / 60 \text{ s}^{-1}) (0.75 \text{ m})} = \mathbf{0.0231 \text{ N} \cdot \text{s/m}^2}$
**Discussion** This is the viscosity value at the temperature that existed during the experiment. Viscosity is a strong function of temperature, and the values can be significantly different at different temperatures.

---

**2-52E**
**Solution** The torque and the rpm of a double cylinder viscometer are given. The viscosity of the fluid is to be determined.
**Assumptions** 1 The inner cylinder is completely submerged in the fluid. 2 The viscous effects on the two ends of the inner cylinder are negligible. 3 The fluid is Newtonian.
**Analysis** Substituting the given values, the viscosity of the fluid is determined to be
$\mu = \frac{T \ell}{4 \pi^2 R^3 \dot{n} L} = \frac{(1.2 \text{ lbf} \cdot \text{ft})(0.05 / 12 \text{ ft})}{4 \pi^2 (5.6 / 12 \text{ ft})^3 (250 / 60 \text{ s}^{-1}) (3 \text{ ft})} = \mathbf{9.97 \times 10^{-5} \text{ lbf} \cdot \text{s/ft}^2}$
**Discussion** This is the viscosity value at temperature that existed during the experiment. Viscosity is a strong function of temperature, and the values can be significantly different at different temperatures.

---

**2-53**
**Solution** The velocity profile for laminar one-dimensional flow through a circular pipe is given. A relation for friction drag force exerted on the pipe and its numerical value for water are to be determined.
**Assumptions** 1 The flow through the circular pipe is one-dimensional. 2 The fluid is Newtonian.
**Properties** The viscosity of water at 20°C is given to be $0.0010 \text{ kg/m} \cdot \text{s}$.
**Analysis** The velocity profile is given by $u(r) = u_{\text{max}} (1 - r^2/R^2)$ where $R$ is the radius of the pipe, $r$ is the radial distance from the center of the pipe, and $u_{\text{max}}$ is the maximum flow velocity, which occurs at the center, $r = 0$. The shear stress at the pipe surface is expressed as
$\tau_w = -\mu \frac{du}{dr} \Big|_{r=R} = -\mu u_{\text{max}} \frac{d}{dr} \left( 1 - \frac{r^2}{R^2} \right) \Big|_{r=R} = -\mu u_{\text{max}} \frac{-2r}{R^2} \Big|_{r=R} = \frac{2 \mu u_{\text{max}}}{R}$
Note that the quantity $du/dr$ is negative in pipe flow, and the negative sign is added to the $\tau_w$ relation for pipes to make shear stress in the positive (flow) direction a positive quantity. (Or, $du/dr = -du/dy$ since $y = R - r$).
Then the friction drag force exerted by the fluid on the inner surface of the pipe becomes
$F_D = \tau_w A_s = \frac{2 \mu u_{\text{max}}}{R} (2 \pi R L) = 4 \pi \mu L u_{\text{max}}$
Substituting we get $F_D = 4 \pi (0.0010 \text{ kg/m} \cdot \text{s})(15 \text{ m})(3 \text{ m/s}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = \mathbf{0.565 \text{ N}}$
**Discussion** In the entrance region and during turbulent flow, the velocity gradient is greater near the wall, and thus the drag force in such cases will be greater.

---

**2-54**
**Solution** The velocity profile for laminar one-dimensional flow through a circular pipe is given. A relation for friction drag force exerted on the pipe and its numerical value for water are to be determined.
**Assumptions** 1 The flow through the circular pipe is one-dimensional. 2 The fluid is Newtonian.
**Properties** The viscosity of water at 20°C is given to be $0.0010 \text{ kg/m} \cdot \text{s}$.
**Analysis** The velocity profile is given by $u(r) = u_{\text{max}} (1 - r^2/R^2)$ where $R$ is the radius of the pipe, $r$ is the radial distance from the center of the pipe, and $u_{\text{max}}$ is the maximum flow velocity, which occurs at the center, $r = 0$. The shear stress at the pipe surface can be expressed as
$\tau_w = -\mu \frac{du}{dr} \Big|_{r=R} = -\mu u_{\text{max}} \frac{d}{dr} \left( 1 - \frac{r^2}{R^2} \right) \Big|_{r=R} = -\mu u_{\text{max}} \frac{-2r}{R^2} \Big|_{r=R} = \frac{2 \mu u_{\text{max}}}{R}$
Note that the quantity $du/dr$ is negative in pipe flow, and the negative sign is added to the $\tau_w$ relation for pipes to make shear stress in the positive (flow) direction a positive quantity. (Or, $du/dr = -du/dy$ since $y = R - r$).
Then the friction drag force exerted by the fluid on the inner surface of the pipe becomes
$F_D = \tau_w A_s = \frac{2 \mu u_{\text{max}}}{R} (2 \pi R L) = 4 \pi \mu L u_{\text{max}}$
Substituting, we get $F_D = 4 \pi (0.0010 \text{ kg/m} \cdot \text{s})(15 \text{ m})(5 \text{ m/s}) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = \mathbf{0.942 \text{ N}}$
**Discussion** In the entrance region and during turbulent flow, the velocity gradient is greater near the wall, and thus the drag force in such cases will be larger.

---

**Surface Tension and Capillary Effect**

**2-55C**
**Solution** We are to define and discuss surface tension.
**Analysis** The magnitude of the pulling force at the surface of a liquid per unit length is called **surface tension** $\sigma_s$. It is caused by the attractive forces between the molecules. The surface tension is also surface energy (per unit area) since it represents the stretching work that needs to be done to increase the surface area of the liquid by a unit amount.
**Discussion** Surface tension is the cause of some very interesting phenomena such as capillary rise and insects that can walk on water.

---

**2-56C**
**Solution** We are to analyze the pressure difference between inside and outside of a soap bubble.
**Analysis** The **pressure inside a soap bubble is greater than the pressure outside**, as evidenced by the stretch of the soap film.
**Discussion** You can make an analogy between the soap film and the skin of a balloon.

---

**2-57C**
**Solution** We are to define and discuss the capillary effect.
**Analysis** The **capillary effect** is the **rise or fall of a liquid in a small-diameter tube** inserted into the liquid. It is caused by the net effect of the cohesive forces (the forces between like molecules, like water) and adhesive forces (the forces between unlike molecules, like water and glass). The capillary effect is proportional to the cosine of the contact angle, which is the angle that the tangent to the liquid surface makes with the solid surface at the point of contact.
**Discussion** The contact angle determines whether the meniscus at the top of the column is concave or convex.

---

**2-58C**
**Solution** We are to determine whether the level of liquid in a tube will rise or fall due to the capillary effect.
**Analysis** The **liquid level in the tube will drop** since the contact angle is greater than 90°, and $\cos(110°) < 0$.
**Discussion** This liquid must be a non-wetting liquid when in contact with the tube material. Mercury is an example of a non-wetting liquid with a contact angle (with glass) that is greater than 90°.

---

**2-59C**
**Solution** We are to compare the capillary rise in small and large diameter tubes.
**Analysis** The capillary rise is inversely proportional to the diameter of the tube, and thus **capillary rise is greater in the smaller-diameter tube**.
**Discussion** Note however, that if the tube diameter is large enough, there is no capillary rise (or fall) at all. Rather, the upward (or downward) rise of the liquid occurs only near the tube walls; the elevation of the middle portion of the liquid in the tube does not change for large diameter tubes.

---

**2-60E**
**Solution** A slender glass tube is inserted into kerosene. The capillary rise of kerosene in the tube is to be determined.
**Assumptions** 1 There are no impurities in the kerosene, and no contamination on the surfaces of the glass tube. 2 The kerosene is open to the atmospheric air.
**Properties** The surface tension of kerosene-glass at 68°F (20°C) is $\sigma_s = 0.028 \times 0.06852 = 0.00192 \text{ lbf/ft}$. The density of kerosene at 68°F is $\rho = 51.2 \text{ lbm/ft}^3$. The contact angle of kerosene with the glass surface is given to be 26°.
**Analysis** Substituting the numerical values, the capillary rise is determined to be
$h = \frac{2 \sigma_s \cos \phi}{\rho g R} = \frac{2(0.00192 \text{ lbf/ft})(\cos 26°)}{(51.2 \text{ lbm/ft}^3)(32.2 \text{ ft/s}^2)(0.015 / 12 \text{ ft})} \left( \frac{32.2 \text{ lbm} \cdot \text{ft/s}^2}{1 \text{ lbf}} \right) = 0.0539 \text{ ft} = \mathbf{0.650 \text{ in}}$
**Discussion** The capillary rise in this case more than half of an inch, and thus it is clearly noticeable.

---

**2-61**
**Solution** A glass tube is inserted into a liquid, and the capillary rise is measured. The surface tension of the liquid is to be determined.
**Assumptions** 1 There are no impurities in the liquid, and no contamination on the surfaces of the glass tube. 2 The liquid is open to the atmospheric air.
**Properties** The density of the liquid is given to be $960 \text{ kg/m}^3$. The contact angle is given to be 15°.
**Analysis** Substituting the numerical values, the surface tension is determined from the capillary rise relation to be
$\sigma_s = \frac{\rho g R h}{2 \cos \phi} = \frac{(960 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.0019 / 2 \text{ m})(0.005 \text{ m})}{2 (\cos 15°)} \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = \mathbf{0.0232 \text{ N/m}}$
**Discussion** Since surface tension depends on temperature, the value determined is valid at the liquid’s temperature.

---

**2-62**
**Solution** The diameter of a soap bubble is given. The gage pressure inside the bubble is to be determined.
**Assumption** The soap bubble is in atmospheric air.
**Properties** The surface tension of soap water at 20°C is $\sigma_s = 0.025 \text{ N/m}$.
**Analysis** The pressure difference between the inside and the outside of a bubble is given by
$\Delta P_{\text{bubble}} = P_i - P_0 = \frac{4 \sigma_s}{R}$
In the open atmosphere $P_0 = P_{\text{atm}}$, and thus $\Delta P_{\text{bubble}}$ is equivalent to the gage pressure. Substituting,
$P_{i, \text{ gage}} = \Delta P_{\text{bubble}} = \frac{4(0.025 \text{ N/m})}{0.002 / 2 \text{ m}} = 100 \text{ N/m}^2 = \mathbf{100 \text{ Pa}}$
$P_{i, \text{ gage}} = \Delta P_{\text{bubble}} = \frac{4(0.025 \text{ N/m})}{0.05 / 2 \text{ m}} = 4 \text{ N/m}^2 = \mathbf{4 \text{ Pa}}$
**Discussion** Note that the gage pressure in a soap bubble is inversely proportional to the radius. Therefore, the excess pressure is larger in smaller bubbles.

---

**2-63**
**Solution** Nutrients dissolved in water are carried to upper parts of plants. The height to which the water solution rises in a tree as a result of the capillary effect is to be determined.
**Assumptions** 1 The solution can be treated as water with a contact angle of 15°. 2 The diameter of the tube is constant. 3 The temperature of the water solution is 20°C.
**Properties** The surface tension of water at 20°C is $\sigma_s = 0.073 \text{ N/m}$. The density of water solution can be taken to be $1000 \text{ kg/m}^3$. The contact angle is given to be 15°.
**Analysis** Substituting the numerical values, the capillary rise is determined to be
$h = \frac{2 \sigma_s \cos \phi}{\rho g R} = \frac{2(0.073 \text{ N/m})(\cos 15°)}{(1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(2.5 \times 10^{-6} \text{ m})} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) = \mathbf{5.75 \text{ m}}$
**Discussion** Other effects such as the chemical potential difference also cause the fluid to rise in trees.

---

**2-64**
**Solution** The force acting on the movable wire of a liquid film suspended on a U-shaped wire frame is measured. The surface tension of the liquid in the air is to be determined.
**Assumptions** 1 There are no impurities in the liquid, and no contamination on the surfaces of the wire frame. 2 The liquid is open to the atmospheric air.
**Analysis** Substituting the numerical values, the surface tension is determined from the surface tension force relation to be
$\sigma_s = \frac{F}{2b} = \frac{0.012 \text{ N}}{2(0.08 \text{ m})} = \mathbf{0.075 \text{ N/m}}$
**Discussion** The surface tension depends on temperature. Therefore, the value determined is valid at the temperature of the liquid.

---

**2-65**
**Solution** A steel ball floats on water due to the surface tension effect. The maximum diameter of the ball is to be determined, and the calculations are to be repeated for aluminum.
**Assumptions** 1 The water is pure, and its temperature is constant. 2 The ball is dropped on water slowly so that the inertial effects are negligible. 3 The contact angle is taken to be 0° for maximum diameter.
**Properties** The surface tension of water at 20°C is $\sigma_s = 0.073 \text{ N/m}$. The contact angle is taken to be 0°. The densities of steel and aluminum are given to be $\rho_{\text{steel}} = 7800 \text{ kg/m}^3$ and $\rho_{\text{Al}} = 2700 \text{ kg/m}^3$.
**Analysis** The surface tension force and the weight of the ball can be expressed as
$F_s = \pi D \sigma_s$ and $W = mg = \rho g V = \rho g \pi D^3 / 6$
When the ball floats, the net force acting on the ball in the vertical direction is zero. Therefore, setting $F_s = W$ and solving for diameter $D$ gives $D = \sqrt{\frac{6 \sigma_s}{\rho g}}$. Substituting the known quantities, the maximum diameters for the steel and aluminum balls become
$D_{\text{steel}} = \sqrt{\frac{6(0.073 \text{ N/m})}{(7800 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right)} = 2.4 \times 10^{-3} \text{ m} = \mathbf{2.4 \text{ mm}}$
$D_{\text{Al}} = \sqrt{\frac{6(0.073 \text{ N/m})}{(2700 \text{ kg/m}^3)(9.81 \text{ m/s}^2)} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right)} = 4.1 \times 10^{-3} \text{ m} = \mathbf{4.1 \text{ mm}}$
**Discussion** Note that the ball diameter is inversely proportional to the square root of density, and thus for a given material, the smaller balls are more likely to float.

---

**Review Problems**

**2-66**
**Solution** The pressure in an automobile tire increases during a trip while its volume remains constant. The percent increase in the absolute temperature of the air in the tire is to be determined.
**Assumptions** 1 The volume of the tire remains constant. 2 Air is an ideal gas.
**Analysis** Noting that air is an ideal gas and the volume is constant, the ratio of absolute temperatures after and before the trip are
$\frac{P_1 V_1}{T_1} = \frac{P_2 V_2}{T_2} \longrightarrow \frac{T_2}{T_1} = \frac{P_2}{P_1} = \frac{310 \text{ kPa}}{290 \text{ kPa}} = 1.069$
Therefore, the absolute temperature of air in the tire will increase by **6.9%** during this trip.
**Discussion** This may not seem like a large temperature increase, but if the tire is originally at 20°C (293.15 K), the temperature increases to $1.069(293.15 \text{ K}) = 313.38 \text{ K}$ or about 40.2°C.

---

**2-67**
**Solution** A large tank contains nitrogen at a specified temperature and pressure. Now some nitrogen is allowed to escape, and the temperature and pressure of nitrogen drop to new values. The amount of nitrogen that has escaped is to be determined.
**Assumptions** The tank is insulated so that no heat is transferred.
**Analysis** Treating N$_2$ as an ideal gas, the initial and the final masses in the tank are determined to be
$m_1 = \frac{P_1 V}{R T_1} = \frac{(800 \text{ kPa})(20 \text{ m}^3)}{(0.2968 \text{ kPa} \cdot \text{m}^3/\text{kg} \cdot \text{K})(298 \text{ K})} = 180.9 \text{ kg}$
$m_2 = \frac{P_2 V}{R T_2} = \frac{(600 \text{ kPa})(20 \text{ m}^3)}{(0.2968 \text{ kPa} \cdot \text{m}^3/\text{kg} \cdot \text{K})(293 \text{ K})} = 138.0 \text{ kg}$
Thus the amount of N$_2$ that escaped is $\Delta m = m_1 - m_2 = 180.9 - 138.0 = \mathbf{42.9 \text{ kg}}$
**Discussion** Gas expansion generally causes the temperature to drop. This principle is used in some types of refrigeration.

---

**2-68**
**Solution** Suspended solid particles in water are considered. A relation is to be developed for the specific gravity of the suspension in terms of the mass fraction $C_{s, \text{ mass}}$ and volume fraction $C_{s, \text{ vol}}$ of the particles.
**Assumptions** 1 The solid particles are distributed uniformly in water so that the solution is homogeneous. 2 The effect of dissimilar molecules on each other is negligible.
**Analysis** Consider solid particles of mass $m_s$ and volume $V_s$ dissolved in a fluid of mass $m_f$ and volume $V_f$. The total volume of the suspension (or mixture) is $V_m = V_s + V_f$.
Dividing by $V_m$ and using the definition $C_{s, \text{ vol}} = V_s / V_m$ give
$1 = C_{s, \text{ vol}} + \frac{V_f}{V_m} \longrightarrow \frac{V_f}{V_m} = 1 - C_{s, \text{ vol}}$ (1)
The total mass of the suspension (or mixture) is $m_m = m_s + m_f$.
Dividing by $m_m$ and using the definition $C_{s, \text{ mass}} = m_s / m_m$ give
$1 = C_{s, \text{ mass}} + \frac{m_f}{m_m} = C_{s, \text{ mass}} + \frac{\rho_f V_f}{\rho_m V_m} \longrightarrow \frac{\rho_f}{\rho_m} = (1 - C_{s, \text{ mass}}) \frac{V_m}{V_f}$ (2)
Combining equations 1 and 2 gives
$\frac{\rho_f}{\rho_m} = \frac{1 - C_{s, \text{ mass}}}{1 - C_{s, \text{ vol}}}$
When the fluid is water, the ratio $\rho_f / \rho_m$ is the inverse of the definition of specific gravity. Therefore, the desired relation for the specific gravity of the mixture is
$SG_m = \frac{\rho_m}{\rho_f} = \mathbf{\frac{1 - C_{s, \text{ vol}}}{1 - C_{s, \text{ mass}}}}$
which is the desired result.
**Discussion** As a quick check, if there were no particles at all, $SG_m = 1$ (if the fluid is water), as expected. (Note: The OCR says $SG_m=0$, but $SG$ of water is 1).

---

**2-69**
**Solution** The specific gravities of solid particles and carrier fluids of a slurry are given. The relation for the specific gravity of the slurry is to be obtained in terms of the mass fraction $C_{s, \text{ mass}}$ and the specific gravity $SG_s$ of solid particles.
**Assumptions** 1 The solid particles are distributed uniformly in water so that the solution is homogeneous. 2 The effect of dissimilar molecules on each other is negligible.
**Analysis** Consider solid particles of mass $m_s$ and volume $V_s$ dissolved in a fluid of mass $m_f$ and volume $V_f$. The total volume of the suspension (or mixture) is $V_m = V_s + V_f$.
Dividing by $V_m$ gives
$1 = \frac{V_s}{V_m} + \frac{V_f}{V_m} \longrightarrow \frac{V_s}{V_m} = 1 - \frac{V_f}{V_m} = 1 - \frac{m_f / \rho_f}{m_m / \rho_m} = 1 - \frac{m_f}{m_m} \frac{\rho_m}{\rho_f} = 1 - (1 - C_{s, \text{ mass}}) \frac{SG_m}{SG_f}$ (1)
since ratio of densities is equal to the ratio of specific gravities, and $m_s / m_m = C_{s, \text{ mass}}$. The total mass of the suspension (or mixture) is $m_m = m_s + m_f$. Dividing by $m_m$ and using the definition $C_{s, \text{ mass}} = m_s / m_m$ give
$1 = C_{s, \text{ mass}} + \frac{m_f}{m_m} = C_{s, \text{ mass}} + \frac{\rho_f V_f}{\rho_m V_m} \longrightarrow \frac{\rho_m}{\rho_f} = \frac{V_f}{(1 - C_{s, \text{ mass}}) V_m}$ (2)
Taking the fluid to be water so that $\rho_f / \rho_w = 1$ and combining equations 1 and 2 give
$SG_m = \frac{1 - C_{s, \text{ mass}} SG_w / SG_s}{1 - C_{s, \text{ mass}}}$
Solving for $SG_m$ and rearranging gives
$SG_m = \mathbf{\frac{1}{1 + C_{s, \text{ mass}} (1/SG_s - 1)}}$
which is the desired result.
**Discussion** As a quick check, if there were no particles at all, $SG_m = 1$ (if the fluid is water), as expected.

---

**2-70E**
**Solution** The minimum pressure on the suction side of a water pump is given. The maximum water temperature to avoid the danger of cavitation is to be determined.
**Properties** The saturation temperature of water at 0.95 psia is 100°F.
**Analysis** To avoid cavitation at a specified pressure, the fluid temperature everywhere in the flow should remain below the saturation temperature at the given pressure, which is
$T_{\text{max}} = T_{\text{sat @ 0.95 psia}} = \mathbf{100\text{°F}}$
Therefore, $T$ must remain below 100°F to avoid the possibility of cavitation.
**Discussion** Note that saturation temperature increases with pressure, and thus cavitation may occur at higher pressure at locations with higher fluid temperatures.

---

**2-71**
**Solution** Air in a partially filled closed water tank is evacuated. The absolute pressure in the evacuated space is to be determined.
**Properties** The saturation pressure of water at 60°C is 19.94 kPa.
**Analysis** When air is completely evacuated, the vacated space is filled with water vapor, and the tank contains a saturated water-vapor mixture at the given pressure. Since we have a two-phase mixture of a pure substance at a specified temperature, the vapor pressure must be the saturation pressure at this temperature. That is,
$P_v = P_{\text{sat @ 60°C}} = 19.94 \text{ kPa} \cong \mathbf{19.9 \text{ kPa}}$
**Discussion** If there is any air left in the container, the vapor pressure will be less. In that case the sum of the component pressures of vapor and air would equal 19.94 kPa.

---

**2-72**
**Solution** The variation of the dynamic viscosity of water with absolute temperature is given. Using tabular data, a relation is to be obtained for viscosity as a 4th-order polynomial. The result is to be compared to Andrade’s equation in the form of $\mu = D \cdot e^{B/T}$.
**Properties** The viscosity data are given in tabular form:
| T (K) | $\mu$ (Pa⋅s) |
| :--- | :--- |
| 273.15 | $1.787 \times 10^{-3}$ |
| 278.15 | $1.519 \times 10^{-3}$ |
| 283.15 | $1.307 \times 10^{-3}$ |
| 293.15 | $1.002 \times 10^{-3}$ |
| 303.15 | $7.975 \times 10^{-4}$ |
| 313.15 | $6.529 \times 10^{-4}$ |
| 333.15 | $4.665 \times 10^{-4}$ |
| 353.15 | $3.547 \times 10^{-4}$ |
| 373.15 | $2.828 \times 10^{-4}$ |

**Analysis** Using EES, a 4th-order polynomial curve fit gives:
$\mu = 0.489291758 - 0.00568904387T + 0.0000249152104T^2 - 4.86155745 \times 10^{-8} T^3 + 3.56198079 \times 10^{-11} T^4$
An exponential curve fit gives:
$\mu = 0.000001475 \exp(1926.5/T)$
At $T = 323.15 \text{ K}$:
Polynomial: $\mu = 0.0005529 \text{ Pa} \cdot \text{s}$ (1.1% error)
Exponential: $\mu = 0.0005726 \text{ Pa} \cdot \text{s}$ (4.7% error)
**Discussion** Andrade’s equation results in $\mu = 1.807952 \times 10^{-6} e^{1864.06/T}$.

---

**2-73**
**Solution** The velocity profile for laminar one-dimensional flow between two parallel plates is given. A relation for friction drag force exerted on the plates per unit area of the plates is to be obtained.
**Assumptions** 1 The flow between the plates is one-dimensional. 2 The fluid is Newtonian.
**Analysis** The velocity profile is given by $u(y) = 4 u_{\text{max}} [y/h - (y/h)^2]$ where $h$ is the distance between the two plates, $y$ is the vertical distance from the bottom plate, and $u_{\text{max}}$ is the maximum flow velocity that occurs at midplane. The shear stress at the bottom surface can be expressed as
$\tau_w = \mu \frac{du}{dy} \Big|_{y=0} = 4 \mu u_{\text{max}} \frac{d}{dy} \left( \frac{y}{h} - \frac{y^2}{h^2} \right) \Big|_{y=0} = 4 \mu u_{\text{max}} \left( \frac{1}{h} - \frac{2y}{h^2} \right) \Big|_{y=0} = \mathbf{\frac{4 \mu u_{\text{max}}}{h}}$
Because of symmetry, the wall shear stress is identical at both bottom and top plates. Then the friction drag force exerted by the fluid on the inner surface of the plates becomes
$F_D = 2 \tau_w A_{\text{plate}} = \frac{8 \mu u_{\text{max}}}{h} A_{\text{plate}}$
Therefore, the friction drag per unit plate area is
$F_D / A_{\text{plate}} = \mathbf{\frac{8 \mu u_{\text{max}}}{h}}$
**Discussion** Note that the friction drag force acting on the plates is inversely proportional to the distance between plates.

---

**2-74**
**Solution** The laminar flow of a Bingham plastic fluid in a horizontal pipe of radius $R$ is considered. The shear stress at the pipe wall and the friction drag force acting on a pipe section of length $L$ are to be determined.
**Assumptions** 1 The fluid is a Bingham plastic with $\tau = \tau_y + \mu (du/dr)$ where $\tau_y$ is the yield stress. 2 The flow through the pipe is one-dimensional.
**Analysis** The velocity profile is given by $u(r) = \frac{\Delta P}{4 \mu L} (r^2 - R^2) + \frac{\tau_y}{\mu} (r - R)$ where $\Delta P/L$ is the pressure drop along the pipe per unit length. Its gradient at the pipe wall ($r = R$) is
$\frac{du}{dr} \Big|_{r=R} = \frac{d}{dr} \left( \frac{\Delta P}{4 \mu L} (r^2 - R^2) + \frac{\tau_y}{\mu} (r - R) \right) \Big|_{r=R} = \left( \frac{2r \Delta P}{4 \mu L} + \frac{\tau_y}{\mu} \right) \Big|_{r=R} = \frac{R \Delta P}{2 \mu L} + \frac{\tau_y}{\mu}$
Substituting into $\tau = \tau_y + \mu (du/dr)$, the wall shear stress at the pipe surface becomes
$\tau_w = \tau_y + \mu \left( \frac{R \Delta P}{2 \mu L} + \frac{\tau_y}{\mu} \right) = \mathbf{2 \tau_y + \frac{R \Delta P}{2L}}$
Then the friction drag force exerted by the fluid on the inner surface of the pipe becomes
$F_D = \tau_w A_s = \left( 2 \tau_y + \frac{R \Delta P}{2L} \right) (2 \pi R L) = \mathbf{4 \pi R L \tau_y + \pi R^2 \Delta P}$
**Discussion** Note that the total friction drag is proportional to yield shear stress and the pressure drop.

---

**2-75**
**Solution** A circular disk immersed in oil is used as a damper. It is to be shown that the damping torque is $T_{\text{damping}} = C \omega$ where $C = 0.5 \pi \mu (1/a + 1/b) R^4$.
**Assumptions** 1 The thickness of the oil layer on each side remains constant. 2 The velocity profiles are linear on both sides of the disk. 3 The tip effects are negligible. 4 The effect of the shaft is negligible.
**Analysis** The velocity gradient anywhere in the oil of film thickness $a$ is $V/a$ where $V = \omega r$ is the tangential velocity. Then the wall shear stress anywhere on the upper surface of the disk at a distance $r$ from the axis of rotation can be expressed as
$\tau_w = \mu \frac{du}{dy} = \mu \frac{V}{a} = \mu \frac{\omega r}{a}$
The shear force acting on differential area $dA$ and the torque it generates:
$dF = \tau_w dA = \mu \frac{\omega r}{a} dA$
$dT = r dF = \mu \frac{\omega r^2}{a} dA$
Noting that $dA = 2 \pi r dr$ and integrating, the torque on the top surface is:
$T_{\text{top}} = \frac{\mu \omega}{a} \int_0^R r^2 (2 \pi r) dr = \frac{2 \pi \mu \omega}{a} \int_0^R r^3 dr = \frac{\pi \mu \omega R^4}{2a}$
The torque on the bottom surface is obtained by replacing $a$ by $b$:
$T_{\text{bottom}} = \frac{\pi \mu \omega R^4}{2b}$
The total torque acting on the disk is:
$T_{\text{damping, total}} = T_{\text{bottom}} + T_{\text{top}} = \frac{\pi \mu \omega R^4}{2} \left( \frac{1}{a} + \frac{1}{b} \right)$
or $T_{\text{damping, total}} = C \omega$ where $C = \mathbf{\frac{\pi \mu R^4}{2} \left( \frac{1}{a} + \frac{1}{b} \right)}$.
**Discussion** Note that the damping torque is inversely proportional to the thickness of oil films on either side, and it is proportional to the 4th power of the radius of the damper disk.

---

**2-76E**
**Solution** A glass tube is inserted into mercury. The capillary drop of mercury in the tube is to be determined.
**Assumptions** 1 There are no impurities in mercury, and no contamination on the surfaces of the glass tube. 2 The mercury is open to the atmospheric air.
**Properties** The surface tension of mercury-glass is $\sigma_s = 0.03015 \text{ lbf/ft}$. The density of mercury is $\rho = 847 \text{ lbm/ft}^3$. The contact angle is given to be 140°.
**Analysis** Substituting the numerical values, the capillary drop is determined to be
$h = \frac{2 \sigma_s \cos \phi}{\rho g R} = \frac{2(0.03015 \text{ lbf/ft})(\cos 140°)}{(847 \text{ lbm/ft}^3)(32.2 \text{ ft/s}^2)(0.45 / 12 \text{ ft})} \left( \frac{32.2 \text{ lbm} \cdot \text{ft/s}^2}{1 \text{ lbf}} \right) = -0.00145 \text{ ft} = \mathbf{-0.0175 \text{ in}}$
**Discussion** The negative sign indicates capillary drop instead of rise. The drop is very small in this case because of the large diameter of the tube.

---

**2-77**
**Solution** A relation is to be derived for the capillary rise of a liquid between two large parallel plates a distance $t$ apart inserted into a liquid vertically. The contact angle is given to be $\phi$.
**Assumptions** There are no impurities in the liquid, and no contamination on the surfaces of the plates.
**Analysis** The weight of the liquid column is $W = mg = \rho g V = \rho g (w \times t \times h)$.
Equating the vertical component of the surface tension force to the weight gives
$W = F_{\text{surface}} \longrightarrow \rho g (w \times t \times h) = 2 w \sigma_s \cos \phi$
Canceling $w$ and solving for $h$ gives the capillary rise to be
$h = \mathbf{\frac{2 \sigma_s \cos \phi}{\rho g t}}$
**Discussion** The relation above is also valid for non-wetting liquids (such as mercury in glass), and gives a capillary drop instead of a capillary rise.

---

**2-78**
**Solution** A journal bearing is lubricated with oil whose viscosity is known. The torques needed to overcome the bearing friction during start-up and steady operation are to be determined.
**Assumptions** 1 The gap is uniform, and is completely filled with oil. 2 The end effects on the sides of the bearing are negligible. 3 The fluid is Newtonian.
**Properties** The viscosity of oil is 0.1 kg/m⋅s at 20°C, and 0.008 kg/m⋅s at 80°C.
**Analysis** The radius of the shaft is $R = 0.04 \text{ m}$. The torque is determined to be $T = \frac{4 \pi^2 R^3 \dot{n} L \mu}{\ell}$.
**At start up at 20°C:**
$T = \frac{4 \pi^2 (0.04 \text{ m})^3 (500 / 60 \text{ s}^{-1}) (0.30 \text{ m}) (0.1 \text{ kg/m} \cdot \text{s})}{0.0008 \text{ m}} = \mathbf{0.79 \text{ N} \cdot \text{m}}$
**During steady operation at 80°C:**
$T = \frac{4 \pi^2 (0.04 \text{ m})^3 (500 / 60 \text{ s}^{-1}) (0.30 \text{ m}) (0.008 \text{ kg/m} \cdot \text{s})}{0.0008 \text{ m}} = \mathbf{0.063 \text{ N} \cdot \text{m}}$
**Discussion** Note that the torque needed to overcome friction reduces considerably due to the decrease in the viscosity of oil at higher temperature.

---
