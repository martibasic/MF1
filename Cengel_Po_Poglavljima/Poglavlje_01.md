# CHAPTER 1: INTRODUCTION AND BASIC CONCEPTS

In this introductory chapter, we present the basic concepts commonly used in the analysis of fluid flow. We start this chapter with a discussion of the phases of matter and the numerous ways of classification of fluid flow, such as viscous versus inviscid regions of flow, internal versus external flow, compressible versus incompressible flow, laminar versus turbulent flow, natural versus forced flow, and steady versus unsteady flow. We also discuss the no-slip condition at solid–fluid interfaces and present a brief history of the development of fluid mechanics.

After presenting the concepts of system and control volume, we review the unit systems that will be used. We then discuss how mathematical models for engineering problems are prepared and how to interpret the results obtained from the analysis of such models. This is followed by a presentation of an intuitive systematic problem-solving technique that can be used as a model in solving engineering problems. Finally, we discuss accuracy, precision, and significant digits in engineering measurements and calculations.

### OBJECTIVES
When you finish reading this chapter, you should be able to:
- Understand the basic concepts of fluid mechanics and recognize the various types of fluid flow problems encountered in practice.
- Model engineering problems and solve them in a systematic manner.
- Have a working knowledge of accuracy, precision, and significant digits, and recognize the importance of dimensional homogeneity in engineering calculations.

---

## 1–1 ■ INTRODUCTION

**Mechanics** is the oldest physical science that deals with both stationary and moving bodies under the influence of forces. The branch of mechanics that deals with bodies at rest is called **statics**, while the branch that deals with bodies in motion is called **dynamics**. The subcategory **fluid mechanics** is defined as the science that deals with the behavior of fluids at rest (**fluid statics**) or in motion (**fluid dynamics**), and the interaction of fluids with solids or other fluids at the boundaries. Fluid mechanics is also referred to as **fluid dynamics** by considering fluids at rest as a special case of motion with zero velocity (Fig. 1–1).

![FIGURE 1–1: Fluid mechanics deals with liquids and gases in motion or at rest.](path/to/image1-1.jpg)

Fluid mechanics itself is also divided into several categories. The study of the motion of fluids that are practically incompressible (such as liquids, especially water, and gases at low speeds) is usually referred to as **hydrodynamics**. A subcategory of hydrodynamics is **hydraulics**, which deals with liquid flows in pipes and open channels. **Gas dynamics** deals with the flow of fluids that undergo significant density changes, such as the flow of gases through nozzles at high speeds. The category **aerodynamics** deals with the flow of gases (especially air) over bodies such as aircraft, rockets, and automobiles at high or low speeds. Some other specialized categories such as meteorology, oceanography, and hydrology deal with naturally occurring flows.

### What Is a Fluid?

You will recall from physics that a substance exists in three primary phases: solid, liquid, and gas. (At very high temperatures, it also exists as plasma.) A substance in the liquid or gas phase is referred to as a **fluid**. Distinction between a solid and a fluid is made on the basis of the substance’s ability to resist an applied shear (or tangential) stress that tends to change its shape. A solid can resist an applied shear stress by deforming, whereas a fluid deforms continuously under the influence of shear stress, no matter how small. In solids stress is proportional to strain, but in fluids stress is proportional to **strain rate**. When a constant shear force is applied, a solid eventually stops deforming, at some fixed strain angle, whereas a fluid never stops deforming and approaches a certain rate of strain.

Consider a rectangular rubber block tightly placed between two plates. As the upper plate is pulled with a force $F$ while the lower plate is held fixed, the rubber block deforms, as shown in Fig. 1–2. The angle of deformation $\alpha$ (called the shear strain or angular displacement) increases in proportion to the applied force $F$. Assuming there is no slip between the rubber and the plates, the upper surface of the rubber is displaced by an amount equal to the displacement of the upper plate while the lower surface remains stationary. In equilibrium, the net force acting on the plate in the horizontal direction must be zero, and thus a force equal and opposite to $F$ must be acting on the plate. This opposing force that develops at the plate–rubber interface due to friction is expressed as $F = \tau A$, where $\tau$ is the shear stress and $A$ is the contact area between the upper plate and the rubber. When the force is removed, the rubber returns to its original position. This phenomenon would also be observed with other solids such as a steel block provided that the applied force does not exceed the elastic range. If this experiment were repeated with a fluid (with two large parallel plates placed in a large body of water, for example), the fluid layer in contact with the upper plate would move with the plate continuously at the velocity of the plate no matter how small the force $F$ is. The fluid velocity decreases with depth because of friction between fluid layers, reaching zero at the lower plate.

![FIGURE 1–2: Deformation of a rubber eraser placed between two parallel plates under the influence of a shear force.](path/to/image1-2.jpg)

You will recall from statics that **stress** is defined as force per unit area and is determined by dividing the force by the area upon which it acts. The normal component of the force acting on a surface per unit area is called the **normal stress**, and the tangential component of a force acting on a surface per unit area is called **shear stress** (Fig. 1–3). In a fluid at rest, the normal stress is called **pressure**. The supporting walls of a fluid eliminate shear stress, and thus a fluid at rest is at a state of zero shear stress. When the walls are removed or a liquid container is tilted, a shear develops and the liquid splashes or moves to attain a horizontal free surface.

![FIGURE 1–3: The normal stress and shear stress at the surface of a fluid element. For fluids at rest, the shear stress is zero and pressure is the only normal stress.](path/to/image1-3.jpg)

$$ \text{Normal stress: } \sigma = \frac{F_n}{dA} $$
$$ \text{Shear stress: } \tau = \frac{F_t}{dA} $$

In a liquid, chunks of molecules can move relative to each other, but the volume remains relatively constant because of the strong cohesive forces between the molecules. As a result, a liquid takes the shape of the container it is in, and it forms a free surface in a larger container in a gravitational field. A gas, on the other hand, expands until it encounters the walls of the container and fills the entire available space. This is because the gas molecules are widely spaced, and the cohesive forces between them are very small. Unlike liquids, gases cannot form a free surface (Fig. 1–4).

![FIGURE 1–4: Unlike a liquid, a gas does not form a free surface, and it expands to fill the entire available space.](path/to/image1-4.jpg)

Although solids and fluids are easily distinguished in most cases, this distinction is not so clear in some borderline cases. For example, asphalt appears and behaves as a solid since it resists shear stress for short periods of time. But it deforms slowly and behaves like a fluid when these forces are exerted for extended periods of time. Some plastics, lead, and slurry mixtures exhibit similar behavior. Such borderline cases are beyond the scope of this text. The fluids we will deal with in this text will be clearly recognizable as fluids.

Intermolecular bonds are strongest in solids and weakest in gases. One reason is that molecules in solids are closely packed together, whereas in gases they are separated by relatively large distances (Fig. 1–5).

![FIGURE 1–5: The arrangement of atoms in different phases: (a) molecules are at relatively fixed positions in a solid, (b) groups of molecules move about each other in the liquid phase, and (c) molecules move about at random in the gas phase.](path/to/image1-5.jpg)

The molecules in a solid are arranged in a pattern that is repeated throughout. Because of the small distances between molecules in a solid, the attractive forces of molecules on each other are large and keep the molecules at fixed positions. The molecular spacing in the liquid phase is not much different from that of the solid phase, except the molecules are no longer at fixed positions relative to each other and they can rotate and translate freely. In a liquid, the intermolecular forces are weaker relative to solids, but still strong compared with gases. The distances between molecules generally increase slightly as a solid turns liquid, with water being a notable exception.

In the gas phase, the molecules are far apart from each other, and a molecular order is nonexistent. Gas molecules move about at random, continually colliding with each other and the walls of the container in which they are contained. Particularly at low densities, the intermolecular forces are very small, and collisions are the only mode of interaction between the molecules. Molecules in the gas phase are at a considerably higher energy level than they are in the liquid or solid phase. Therefore, the gas must release a large amount of its energy before it can condense or freeze.

**Gas** and **vapor** are often used as synonymous words. The vapor phase of a substance is customarily called a gas when it is above the critical temperature. Vapor usually implies a gas that is not far from a state of condensation.

Any practical fluid system consists of a large number of molecules, and the properties of the system naturally depend on the behavior of these molecules. For example, the pressure of a gas in a container is the result of momentum transfer between the molecules and the walls of the container. However, one does not need to know the behavior of the gas molecules to determine the pressure in the container. It would be sufficient to attach a pressure gage to the container (Fig. 1–6). This **macroscopic** or **classical** approach does not require a knowledge of the behavior of individual molecules and provides a direct and easy way to the solution of engineering problems. The more elaborate **microscopic** or **statistical** approach, based on the average behavior of large groups of individual molecules, is rather involved and is used in this text only in the supporting role.

![FIGURE 1–6: On a microscopic scale, pressure is determined by the interaction of individual gas molecules. However, we can measure the pressure on a macroscopic scale with a pressure gage.](path/to/image1-6.jpg)

### Application Areas of Fluid Mechanics

Fluid mechanics is widely used both in everyday activities and in the design of modern engineering systems from vacuum cleaners to supersonic aircraft. Therefore, it is important to develop a good understanding of the basic principles of fluid mechanics.

To begin with, fluid mechanics plays a vital role in the human body. The heart is constantly pumping blood to all parts of the human body through the arteries and veins, and the lungs are the sites of airflow in alternating directions. Needless to say, all artificial hearts, breathing machines, and dialysis systems are designed using fluid dynamics.

An ordinary house is, in some respects, an exhibition hall filled with applications of fluid mechanics. The piping systems for cold water, natural gas, and sewage for an individual house and the entire city are designed primarily on the basis of fluid mechanics. The same is also true for the piping and ducting network of heating and air-conditioning systems. A refrigerator involves tubes through which the refrigerant flows, a compressor that pressurizes the refrigerant, and two heat exchangers where the refrigerant absorbs and rejects heat. Fluid mechanics plays a major role in the design of all these components. Even the operation of ordinary faucets is based on fluid mechanics.

We can also see numerous applications of fluid mechanics in an automobile. All components associated with the transportation of the fuel from the...

---

fuel tank to the cylinders—the fuel line, fuel pump, fuel injectors, or carburetors—as well as the mixing of the fuel and the air in the cylinders and the purging of combustion gases in exhaust pipes are analyzed using fluid mechanics. Fluid mechanics is also used in the design of the heating and air-conditioning system, the hydraulic brakes, the power steering, automatic transmission, and lubrication systems, the cooling system of the engine block including the radiator and the water pump, and even the tires. The sleek streamlined shape of recent model cars is the result of efforts to minimize drag by using extensive analysis of flow over surfaces.

On a broader scale, fluid mechanics plays a major part in the design and analysis of aircraft, boats, submarines, rockets, jet engines, wind turbines, biomedical devices, the cooling of electronic components, and the transportation of water, crude oil, and natural gas. It is also considered in the design of buildings, bridges, and even billboards to make sure that the structures can withstand wind loading. Numerous natural phenomena such as the rain cycle, weather patterns, the rise of ground water to the top of trees, winds, ocean waves, and currents in large water bodies are also governed by the principles of fluid mechanics (Fig. 1–7).

![FIGURE 1–7: Some application areas of fluid mechanics.](path/to/image1-7.jpg)

---

## 1–2 ■ THE NO-SLIP CONDITION

Fluid flow is often confined by solid surfaces, and it is important to understand how the presence of solid surfaces affects fluid flow. We know that water in a river cannot flow through large rocks, and goes around them. That is, the water velocity normal to the rock surface must be zero, and water approaching the surface normally comes to a complete stop at the surface. What is not so obvious is that water approaching the rock at any angle also comes to a complete stop at the rock surface, and thus the tangential velocity of water at the surface is also zero.

Consider the flow of a fluid in a stationary pipe or over a solid surface that is nonporous (i.e., impermeable to the fluid). All experimental observations indicate that a fluid in motion comes to a complete stop at the surface and assumes a zero velocity relative to the surface. That is, a fluid in direct contact with a solid “sticks” to the surface due to viscous effects, and there is no slip. This is known as the **no-slip condition**.

The photo in Fig. 1–8 obtained from a video clip clearly shows the evolution of a velocity gradient as a result of the fluid sticking to the surface of a blunt nose. The layer that sticks to the surface slows the adjacent fluid layer because of viscous forces between the fluid layers, which slows the next layer, and so on. Therefore, the no-slip condition is responsible for the development of the velocity profile. The flow region adjacent to the wall in which the viscous effects (and thus the velocity gradients) are significant is called the **boundary layer**. The fluid property responsible for the no-slip condition and the development of the boundary layer is **viscosity** and is discussed in Chap. 2.

![FIGURE 1–8: The development of a velocity profile due to the no-slip condition as a fluid flows over a blunt nose.](path/to/image1-8.jpg)

A fluid layer adjacent to a moving surface has the same velocity as the surface. A consequence of the no-slip condition is that all velocity profiles must have zero values with respect to the surface at the points of contact between a fluid and a solid surface (Fig. 1–9). Another consequence of the no-slip condition is the surface drag, which is the force a fluid exerts on a surface in the flow direction.

![FIGURE 1–9: A fluid flowing over a stationary surface comes to a complete stop at the surface because of the no-slip condition.](path/to/image1-9.jpg)

When a fluid is forced to flow over a curved surface, such as the back side of a cylinder at sufficiently high velocity, the boundary layer can no longer remain attached to the surface, and at some point it separates from the surface—a process called **flow separation** (Fig. 1–10). We emphasize that the no-slip condition applies everywhere along the surface, even downstream of the separation point. Flow separation is discussed in greater detail in Chap. 10.

![FIGURE 1–10: Flow separation during flow over a curved surface.](path/to/image1-10.jpg)

A similar phenomenon occurs for temperature. When two bodies at different temperatures are brought into contact, heat transfer occurs until both bodies assume the same temperature at the points of contact. Therefore, a fluid and a solid surface have the same temperature at the points of contact. This is known as **no-temperature-jump condition**.

---

## 1–3 ■ A BRIEF HISTORY OF FLUID MECHANICS

One of the first engineering problems humankind faced as cities were developed was the supply of water for domestic use and irrigation of crops. Our urban lifestyles can be retained only with abundant water, and it is clear from archeology that every successful civilization of prehistory invested in the construction and maintenance of water systems. The Roman aqueducts, some of which are still in use, are the best known examples. However, perhaps the most impressive engineering from a technical viewpoint was done at the Hellenistic city of Pergamon in present-day Turkey. There, from 283 to 133 BC, they built a series of pressurized lead and clay pipelines (Fig. 1–11), up to 45 km long that operated at pressures exceeding 1.7 MPa (180 m of head). Unfortunately, the names of almost all these early builders are lost to history. The earliest recognized contribution to fluid mechanics theory was made by the Greek mathematician Archimedes (285–212 BC). He formulated and applied the buoyancy principle in history’s first nondestructive test to determine the gold content of the crown of King Hiero I. The Romans built great aqueducts and educated many conquered people on the benefits of clean water, but overall had a poor understanding of fluids theory.

During the Middle Ages the application of fluid machinery slowly but steadily expanded. Elegant piston pumps were developed for dewatering mines, and the watermill and windmill were perfected to grind grain, forge metal, and for other tasks. For the first time in recorded human history significant work was being done without the power of a muscle supplied by a person or animal. Georgius Agricola (Fig. 1–12) documented many of these devices.

The Renaissance brought continued development of fluid systems and machines, but more importantly, the scientific method was perfected and adopted throughout Europe. Simon Stevin (1548–1617), Galileo Galilei (1564–1642), Edme Mariotte (1620–1684), and Evangelista Torricelli (1608–1647) were among the first to apply the method to fluids as they investigated hydrostatic pressure distributions and vacuums. That work was integrated and refined by Blaise Pascal (1623–1662). Benedetto Castelli (1577–1644) was the first person to publish a statement of the continuity principle for fluids. Sir Isaac Newton (1643–1727) applied his laws to fluids and explored fluid inertia and resistance, free jets, and viscosity. That effort was built upon by Daniel Bernoulli (1700–1782) and his associate Leonard Euler (1707–1783). Together, their work defined the energy and momentum equations. Bernoulli’s 1738 classic treatise *Hydrodynamica* may be considered the first fluid mechanics text.

The late nineteenth century was notable for the expansion of fluid theory by scientists like Poiseuille, Hagen, Reynolds, Navier, Stokes, Froude, and Rayleigh. In 1904, Ludwig Prandtl showed that fluid flows can be divided into a layer near the walls, the **boundary layer**, and an outer layer where friction effects are negligible.

---

## 1–4 ■ CLASSIFICATION OF FLUID FLOWS

### Viscous versus Inviscid Regions of Flow

When two fluid layers move relative to each other, a friction force develops between them and the slower layer tries to slow down the faster layer. This internal resistance to flow is quantified by the fluid property **viscosity**, which is a measure of internal stickiness of the fluid. Viscosity is caused by cohesive forces between the molecules in liquids and by molecular collisions in gases. There is no fluid with zero viscosity, and thus all fluid flows involve viscous effects to some degree. Flows in which the frictional effects are significant are called **viscous flows**. However, in many flows of practical interest, there are regions (typically regions not close to solid surfaces) where viscous forces are negligibly small compared to inertial or pressure forces. Neglecting the viscous terms in such **inviscid flow regions** greatly simplifies the analysis without much loss in accuracy.

![FIGURE 1–15: The flow of an originally uniform fluid stream over a flat plate, and the regions of viscous flow and inviscid flow.](path/to/image1-15.jpg)

### Internal versus External Flow

A fluid flow is classified as being **internal** or **external**, depending on whether the fluid is forced to flow in a confined channel or over a surface. The flow of an unbounded fluid over a surface such as a plate, a wire, or a pipe is **external flow**. The flow in a pipe or duct is **internal flow** if the fluid is completely bounded by solid surfaces. Water flow in a pipe, for example, is internal flow, and airflow over a ball or over an exposed pipe during a windy day is external flow (Fig. 1–16).

### Compressible versus Incompressible Flow

A flow is classified as being **compressible** or **incompressible**, depending on the level of variation of density during flow. Incompressibility is an approximation, and a flow is said to be **incompressible** if the density remains nearly constant throughout.

When analyzing rockets, spacecraft, and other systems that involve high-speed gas flows, the flow speed is often expressed in terms of the dimensionless **Mach number** defined as:

$$ Ma = \frac{V}{c} = \frac{\text{Speed of flow}}{\text{Speed of sound}} $$

where $c$ is the speed of sound whose value is 346 m/s in air at room temperature at sea level. A flow is called **sonic** when $Ma = 1$, **subsonic** when $Ma < 1$, **supersonic** when $Ma > 1$, and **hypersonic** when $Ma \gg 1$.

### Laminar versus Turbulent Flow

Some flows are smooth and orderly while others are rather chaotic. The highly ordered fluid motion characterized by smooth layers of fluid is called **laminar**. The highly disordered fluid motion that typically occurs at high velocities and is characterized by velocity fluctuations is called **turbulent** (Fig. 1–17). A flow that alternates between being laminar and turbulent is called **transitional**. The **Reynolds number**, $Re$, is the key parameter for the determination of the flow regime.

### Natural (or Unforced) versus Forced Flow

In **forced flow**, a fluid is forced to flow over a surface or in a pipe by external means such as a pump or a fan. In **natural flows**, any fluid motion is due to natural means such as the buoyancy effect (Fig. 1–18).

### Steady versus Unsteady Flow

The term **steady** implies no change at a point with time. The opposite of steady is **unsteady**. The term **uniform** implies no change with location over a specified region.

---

## 1–5 ■ SYSTEM AND CONTROL VOLUME

A **system** is defined as a quantity of matter or a region in space chosen for study. The mass or region outside the system is called the **surroundings**. The surface that separates the system from its surroundings is called the **boundary** (Fig. 1–23).

Systems may be **closed** or **open**. A **closed system** (control mass) consists of a fixed amount of mass, and no mass can cross its boundary. An **open system**, or a **control volume**, is a properly selected region in space. It usually encloses a device that involves mass flow such as a compressor, turbine, or nozzle.

![FIGURE 1–23: System, surroundings, and boundary.](path/to/image1-23.jpg)
![FIGURE 1–24: A closed system with a moving boundary.](path/to/image1-24.jpg)

---

moving boundaries. A control volume may also involve heat and work interactions just as a closed system, in addition to mass interaction.

![FIGURE 1–25: A control volume may involve fixed, moving, real, and imaginary boundaries.](path/to/image1-25.jpg)

---

## 1–6 ■ IMPORTANCE OF DIMENSIONS AND UNITS

Any physical quantity can be characterized by **dimensions**. The magnitudes assigned to the dimensions are called **units**. Some basic dimensions such as mass $m$, length $L$, time $t$, and temperature $T$ are selected as **primary** or **fundamental dimensions**, while others such as velocity $V$, energy $E$, and volume $V$ are expressed in terms of the primary dimensions and are called **secondary dimensions**, or **derived dimensions**.

A number of unit systems have been developed over the years. Despite strong efforts in the scientific and engineering community to unify the world with a single unit system, two sets of units are still in common use today: the **English system**, which is also known as the United States Customary System (USCS), and the metric **SI** (from *Le Système International d’Unités*), which is also known as the International System. The SI is a simple and logical system based on a decimal relationship between the various units, and it is being used for scientific and engineering work in most of the industrialized nations, including England. The English system, however, has no apparent systematic numerical base, and various units in this system are related to each other rather arbitrarily ($12 \text{ in} = 1 \text{ ft}$, $1 \text{ mile} = 5280 \text{ ft}$, $4 \text{ qt} = 1 \text{ gal}$, etc.), which makes it confusing and difficult to learn. The United States is the only industrialized country that has not yet fully converted to the metric system.

### TABLE 1–1: The seven fundamental (or primary) dimensions and their units in SI
| Dimension | Unit |
| :--- | :--- |
| Length | meter (m) |
| Mass | kilogram (kg) |
| Time | second (s) |
| Temperature | kelvin (K) |
| Electric current | ampere (A) |
| Amount of light | candela (cd) |
| Amount of matter | mole (mol) |

### TABLE 1–2: Standard prefixes in SI units
| Multiple | Prefix |
| :--- | :--- |
| $10^{12}$ | tera, T |
| $10^{9}$ | giga, G |
| $10^{6}$ | mega, M |
| $10^{3}$ | kilo, k |
| $10^{2}$ | hecto, h |
| $10^{1}$ | deka, da |
| $10^{-1}$ | deci, d |
| $10^{-2}$ | centi, c |
| $10^{-3}$ | milli, m |
| $10^{-6}$ | micro, $\mu$ |
| $10^{-9}$ | nano, n |
| $10^{-12}$ | pico, p |

### Some SI and English Units

In SI, the units of mass, length, and time are the kilogram (kg), meter (m), and second (s), respectively. The respective units in the English system are the pound-mass (lbm), foot (ft), and second (s). The pound symbol lb is actually the abbreviation of *libra*, which was the ancient Roman unit of weight. The mass and length units in the two systems are related to each other by:

$$ 1 \text{ lbm} = 0.45359 \text{ kg} $$
$$ 1 \text{ ft} = 0.3048 \text{ m} $$

In the English system, force is usually considered to be one of the primary dimensions and is assigned a nonderived unit. This is a source of confusion and error that necessitates the use of a dimensional constant ($g_c$) in many formulas. To avoid this nuisance, we consider force to be a secondary dimension whose unit is derived from Newton’s second law, i.e.,

$$ \text{Force} = (\text{Mass})(\text{Acceleration}) $$
$$ F = ma \quad (1–1) $$

In SI, the force unit is the **newton (N)**, and it is defined as the force required to accelerate a mass of $1 \text{ kg}$ at a rate of $1 \text{ m/s}^2$. In the English system, the force unit is the **pound-force (lbf)** and is defined as the force required to accelerate a mass of $32.174 \text{ lbm}$ (1 slug) at a rate of $1 \text{ ft/s}^2$ (Fig. 1–27). That is,

$$ 1 \text{ N} = 1 \text{ kg} \cdot \text{m/s}^2 $$
$$ 1 \text{ lbf} = 32.174 \text{ lbm} \cdot \text{ft/s}^2 $$

![FIGURE 1–27: The definition of the force units.](path/to/image1-27.jpg)

The term **weight** is often incorrectly used to express mass. Unlike mass, weight $W$ is a force. It is the gravitational force applied to a body, and its magnitude is determined from Newton’s second law:

$$ W = mg \quad \text{(N)} \quad (1–2) $$

where $m$ is the mass of the body, and $g$ is the local gravitational acceleration ($g$ is $9.807 \text{ m/s}^2$ or $32.174 \text{ ft/s}^2$ at sea level and $45^\circ$ latitude). The weight of a unit volume of a substance is called the **specific weight** $\gamma$ and is determined from $\gamma = \rho g$, where $\rho$ is density.

Work, which is a form of energy, can simply be defined as force times distance; therefore, it has the unit “newton-meter ($\text{N} \cdot \text{m}$),” which is called a **joule (J)**. That is,

$$ 1 \text{ J} = 1 \text{ N} \cdot \text{m} \quad (1–3) $$

### Dimensional Homogeneity

We all know from grade school that apples and oranges do not add. In engineering, all equations must be **dimensionally homogeneous**. That is, every term in an equation must have the same unit (Fig. 1–31).

---

## 1–7 ■ MATHEMATICAL MODELING OF ENGINEERING PROBLEMS

An engineering device or process can be studied either **experimentally** (testing and taking measurements) or **analytically** (by analysis or calculations). The analytical approach has the advantage that it is fast and inexpensive, but the results obtained are subject to the accuracy of the assumptions and idealizations made in the analysis.

### Modeling in Engineering

The study of physical phenomena involves two important steps. In the first step, all the variables that affect the phenomena are identified, reasonable assumptions and approximations are made, and the physical laws are applied to formulate the problem mathematically (usually as a differential equation). In the second step, the problem is solved and the results are interpreted.

---

## 1–8 ■ PROBLEM-SOLVING TECHNIQUE

A systematic approach can greatly simplify problem solving (Fig. 1–36).
1. **Step 1: Problem Statement**
2. **Step 2: Schematic**
3. **Step 3: Assumptions and Approximations**
4. **Step 4: Physical Laws**
5. **Step 5: Properties**
6. **Step 6: Calculations**
7. **Step 7: Reasoning, Verification, and Discussion**

---

## 1–9 ■ ENGINEERING SOFTWARE PACKAGES

Most problems can be solved using software packages, but it is essential to understand the fundamentals to avoid "garbage-in, garbage-out" scenarios. Software is a tool, not a replacement for engineering judgment.

---

We should always remember that all the computing power and the engineering software packages available today are just tools, and tools have meaning only in the hands of masters. Having the best word-processing program does not make a person a good writer, but it certainly makes the job of a good writer much easier and makes the writer more productive (Fig. 1–39). Hand calculators did not eliminate the need to teach our children how to add or subtract, and the sophisticated medical software packages did not take the place of medical school training. Neither will engineering software packages replace the traditional engineering education. They will simply cause a shift in emphasis in the courses from mathematics to physics. That is, more time will be spent in the classroom discussing the physical aspects of the problems in greater detail, and less time on the mechanics of solution procedures.

![FIGURE 1–39: An excellent word-processing program does not make a person a good writer; it simply makes a good writer a more efficient writer.](path/to/image1-39.jpg)

All these marvelous and powerful tools available today put an extra burden on today’s engineers. They must still have a thorough understanding of the fundamentals, develop a “feel” of the physical phenomena, be able to put the data into proper perspective, and make sound engineering judgments, just like their predecessors. However, they must do it much better, and much faster, using more realistic models because of the powerful tools available today. The engineers in the past had to rely on hand calculations, slide rules, and later hand calculators and computers. Today they rely on software packages. The easy access to such power and the possibility of a simple misunderstanding or misinterpretation causing great damage make it more important today than ever to have solid training in the fundamentals of engineering. In this text we make an extra effort to put the emphasis on developing an intuitive and physical understanding of natural phenomena instead of on the mathematical details of solution procedures.

### Engineering Equation Solver (EES)

EES is a program that solves systems of linear or nonlinear algebraic or differential equations numerically. It has a large library of built-in thermodynamic property functions as well as mathematical functions, and allows the user to supply additional property data. Unlike some software packages, EES does not solve engineering problems; it only solves the equations supplied by the user. Therefore, the user must understand the problem and formulate it by applying any relevant physical laws and relations. EES saves the user considerable time and effort by simply solving the resulting mathematical equations. This makes it possible to attempt significant engineering problems not suitable for hand calculations and to conduct parametric studies quickly and conveniently.

**EXAMPLE 1–5: Solving a System of Equations with EES**
The difference of two numbers is 4, and the sum of the squares of these two numbers is equal to the sum of the numbers plus 20. Determine these two numbers.

**SOLUTION:** Relations are given for the difference and the sum of the squares of two numbers. They are to be determined.
**Analysis:** We start the EES program by double-clicking on its icon, open a new file, and type the following on the blank screen that appears:
$$ x - y = 4 $$
$$ x^2 + y^2 = x + y + 20 $$
which is an exact mathematical expression of the problem statement with $x$ and $y$ denoting the unknown numbers. The solution to this system of two nonlinear equations with two unknowns is obtained by a single click on the “calculator” icon on the taskbar. It gives:
$$ x = 5 \quad \text{and} \quad y = 1 $$
**Discussion:** Note that all we did is formulate the problem as we would on paper; EES took care of all the mathematical details of solution.

### FLUENT

FLUENT is a computational fluid dynamics (CFD) code widely used for flow-modeling applications. The first step in analysis is preprocessing, which involves building a model or importing one from a CAD package, applying a finite-volume-based mesh, and entering data. Once the numerical model is prepared, FLUENT performs the necessary calculations and produces the desired results. FLUENT can handle subsonic or supersonic flows, steady or transient flows, laminar or turbulent flows, Newtonian or non-Newtonian flows, single or multiphase flows, chemical reactions including combustion, flow through porous media, heat transfer, and flow-induced vibrations.

---

## 1–10 ■ ACCURACY, PRECISION, AND SIGNIFICANT DIGITS

In engineering calculations, the supplied information is not known to more than a certain number of significant digits, usually three digits. Consequently, the results obtained cannot possibly be precise to more significant digits. Reporting results in more significant digits implies greater precision than exists, and it should be avoided.

- **Accuracy error** (inaccuracy) is the value of one reading minus the true value. In general, accuracy refers to the closeness of the average reading to the true value.
- **Precision error** is the value of one reading minus the average of readings. Precision refers to the fineness of the resolution and the repeatability of the instrument.
- **Significant digits** are digits that are relevant and meaningful.

![FIGURE 1–40: Illustration of accuracy versus precision. Shooter A is more precise, but less accurate, while shooter B is more accurate, but less precise.](path/to/image1-40.jpg)

### TABLE 1–3: Significant digits
| Number | Exponential Notation | Number of Significant Digits |
| :--- | :--- | :--- |
| 12.3 | $1.23 \times 10^1$ | 3 |
| 123,000 | $1.23 \times 10^5$ | 3 |
| 0.00123 | $1.23 \times 10^{-3}$ | 3 |
| 40,300 | $4.03 \times 10^4$ | 3 |
| 40,300. | $4.0300 \times 10^4$ | 5 |
| 0.005600 | $5.600 \times 10^{-3}$ | 4 |
| 0.0056 | $5.6 \times 10^{-3}$ | 2 |
| 0.006 | $6. \times 10^{-3}$ | 1 |

When performing calculations, the final result is generally only as precise as the least precise parameter in the problem. For example, if $A = 2.3601$ (five significant digits) and $B = 0.34$ (two significant digits), then $C = A \times B = 0.80$ (only two digits are significant).

![FIGURE 1–41: A result with more significant digits than that of given data falsely implies more precision.](path/to/image1-41.jpg)

**EXAMPLE 1–6: Significant Digits and Volume Flow Rate**
The volume of water collected is $V = 1.1 \text{ gal}$ in time period $\Delta t = 45.62 \text{ s}$. Calculate the volume flow rate $\dot{V}$.
**Analysis:** Volume flow rate $\dot{V}$ is expressed as:
$$ \dot{V} = \frac{\Delta V}{\Delta t} $$
Substituting the measured values:
$$ \dot{V} = \frac{1.1 \text{ gal}}{45.62 \text{ s}} \left( \frac{3.785 \times 10^{-3} \text{ m}^3}{1 \text{ gal}} \right) \left( \frac{60 \text{ s}}{1 \text{ min}} \right) = 5.5 \times 10^{-3} \text{ m}^3/\text{min} $$

---

## SUMMARY

In this chapter, some basic concepts of fluid mechanics are introduced and discussed. A substance in the liquid or gas phase is referred to as a **fluid**. Fluid mechanics is the science that deals with the behavior of fluids at rest or in motion. The **no-slip condition** leads to the formation of boundary layers. A system of fixed mass is called a **closed system**, and a system that involves mass transfer is called an **open system** or **control volume**.

---

## PROBLEMS

**1–1C** Define internal, external, and open-channel flows.
**1–2C** Define incompressible flow and incompressible fluid.
**1–14** A 3-kg plastic tank that has a volume of $0.2 \text{ m}^3$ is filled with liquid water. Assuming the density of water is $1000 \text{ kg/m}^3$, determine the weight of the combined system.
**1–16** At $45^\circ$ latitude, the gravitational acceleration as a function of elevation $z$ is given by $g = a - bz$, where $a = 9.807 \text{ m/s}^2$ and $b = 3.32 \times 10^{-6} \text{ s}^{-2}$. Determine the height where the weight will decrease by 1 percent.
**1–19** A 5-kg rock is thrown upward with a force of $150 \text{ N}$ at a location where $g = 9.79 \text{ m/s}^2$. Determine the acceleration of the rock.

**1–29** Solve this system of two equations with two unknowns using EES:
$$ x^3 - y^2 = 7.75 $$
$$ 3xy + y = 3.5 $$

---

**CHAPTER 1: INTRODUCTION AND BASIC CONCEPTS**

*(Note: This section begins the detailed solutions manual for the textbook problems.)*

---

**Introduction, Classification, and System**

**1-1C**
**Solution** We are to define internal, external, and open-channel flows.
**Analysis** External flow is the flow of an unbounded fluid over a surface such as a plate, a wire, or a pipe. The flow in a pipe or duct is internal flow if the fluid is completely bounded by solid surfaces. The flow of liquids in a pipe is called open-channel flow if the pipe is partially filled with the liquid and there is a free surface, such as the flow of water in rivers and irrigation ditches.
**Discussion** As we shall see in later chapters, there different approximations are used in the analysis of fluid flows based on their classification.

---

**1-2C**
**Solution** We are to define incompressible and compressible flow, and discuss fluid compressibility.
**Analysis** A fluid flow during which the density of the fluid remains nearly constant is called incompressible flow. A flow in which density varies significantly is called compressible flow. A fluid whose density is practically independent of pressure (such as a liquid) is commonly referred to as an “incompressible fluid,” although it is more proper to refer to incompressible flow. The flow of compressible fluid (such as air) does not necessarily need to be treated as compressible since the density of a compressible fluid may still remain nearly constant during flow – especially flow at low speeds.
**Discussion** It turns out that the Mach number is the critical parameter to determine whether the flow of a gas can be approximated as an incompressible flow. If $Ma$ is less than about 0.3, the incompressible approximation yields results that are in error by less than a couple percent.

---

**1-3C**
**Solution** We are to define the no-slip condition and its cause.
**Analysis** A fluid in direct contact with a solid surface sticks to the surface and there is no slip. This is known as the no-slip condition, and it is due to the viscosity of the fluid.
**Discussion** There is no such thing as an inviscid fluid, since all fluids have viscosity.

---

**1-4C**
**Solution** We are to define forced flow and discuss the difference between forced and natural flow. We are also to discuss whether wind-driven flows are forced or natural.
**Analysis** In forced flow, the fluid is forced to flow over a surface or in a tube by external means such as a pump or a fan. In natural flow, any fluid motion is caused by natural means such as the buoyancy effect that manifests itself as the rise of the warmer fluid and the fall of the cooler fluid. The flow caused by winds is natural flow for the earth, but it is forced flow for bodies subjected to the winds since for the body it makes no difference whether the air motion is caused by a fan or by the winds.
**Discussion** As seen here, the classification of forced vs. natural flow may depend on your frame of reference.

---

**1-5C**
**Solution** We are to define a boundary layer, and discuss its cause.
**Analysis** When a fluid stream encounters a solid surface that is at rest, the fluid velocity assumes a value of zero at that surface. The velocity then varies from zero at the surface to the freestream value sufficiently far from the surface. The region of flow in which the velocity gradients are significant and frictional effects are important is called the **boundary layer**. The development of a boundary layer is caused by the no-slip condition.
**Discussion** As we shall see later, flow within a boundary layer is rotational (individual fluid particles rotate), while that outside the boundary layer is typically irrotational (individual fluid particles move, but do not rotate).

---

**1-6C**
**Solution** We are to discuss the differences between classical and statistical approaches.
**Analysis** The classical approach is a macroscopic approach, based on experiments or analysis of the gross behavior of a fluid, without knowledge of individual molecules, whereas the statistical approach is a microscopic approach based on the average behavior of large groups of individual molecules.
**Discussion** The classical approach is easier and much more common in fluid flow analysis.

---

**1-7C**
**Solution** We are to define a steady-flow process.
**Analysis** A process is said to be **steady** if it involves **no changes with time** anywhere within the system or at the system boundaries.
**Discussion** The opposite of steady flow is unsteady flow, which involves changes with time.

---

**1-8C**
**Solution** We are to define stress, normal stress, shear stress, and pressure.
**Analysis** Stress is defined as **force per unit area**, and is determined by dividing the force by the area upon which it acts. The normal component of a force acting on a surface per unit area is called the **normal stress**, and the tangential component of a force acting on a surface per unit area is called **shear stress**. In a fluid at rest, the normal stress is called **pressure**.
**Discussion** Fluids in motion may have additional normal stresses, but when a fluid is at rest, the only normal stress is the pressure.

---

**1-9C**
**Solution** We are to define system, surroundings, and boundary.
**Analysis** A **system** is defined as a quantity of matter or a region in space chosen for study. The mass or region outside the system is called the **surroundings**. The real or imaginary surface that separates the system from its surroundings is called the **boundary**.
**Discussion** Some authors like to define closed systems and open systems, while others use the notation “system” to mean a closed system and “control volume” to mean an open system. This has been a source of confusion for students for many years.

---

**1-10C**
**Solution** We are to discuss when a system is considered closed or open.
**Analysis** Systems may be considered to be **closed** or **open**, depending on whether a fixed mass or a volume in space is chosen for study. A closed system (also known as a control mass or simply a system) consists of a **fixed amount of mass**, and **no mass can cross its boundary**. An open system, or a control volume, is a properly selected region in space.
**Discussion** In thermodynamics, it is more common to use the terms open system and closed system, but in fluid mechanics, it is more common to use the terms system and control volume to mean the same things, respectively.

---

**Mass, Force, and Units**

**1-11C**
**Solution** We are to discuss the difference between pound-mass and pound-force.
**Analysis** Pound-mass lbm is the **mass unit** in English system whereas pound-force lbf is the **force unit** in the English system. One pound-force is the force required to accelerate a mass of 32.174 lbm by 1 ft/s². In other words, the weight of a 1-lbm mass at sea level on earth is 1 lbf.
**Discussion** It is not proper to say that one lbm is equal to one lbf since the two units have different dimensions.

---

**1-12C**
**Solution** We are to discuss the difference between kg-mass and kg-force.
**Analysis** The unit kilogram (kg) is the **mass unit** in the SI system, and it is sometimes called kg-mass, whereas kg-force (kgf) is a **force unit**. One kg-force is the force required to accelerate a 1-kg mass by 9.807 m/s². In other words, the weight of 1-kg mass at sea level on earth is 1 kg-force.
**Discussion** It is not proper to say that one kg-mass is equal to one kg-force since the two units have different dimensions.

---

**1-13C**
**Solution** We are to calculate the net force on a car cruising at constant velocity.
**Analysis** There is no acceleration, thus the **net force is zero** in both cases.
**Discussion** By Newton’s second law, the force on an object is directly proportional to its acceleration. If there is zero acceleration, there must be zero net force.

---

**1-14**
**Solution** A plastic tank is filled with water. The weight of the combined system is to be determined.
**Assumptions** The density of water is constant throughout.
**Properties** The density of water is given to be $\rho = 1000 \text{ kg/m}^3$.
**Analysis** The mass of the water in the tank and the total mass are:
$V = 0.2 \text{ m}^3$
$m_{\text{tank}} = 3 \text{ kg}$
$m_w = \rho V = (1000 \text{ kg/m}^3)(0.2 \text{ m}^3) = 200 \text{ kg}$
$m_{\text{total}} = m_w + m_{\text{tank}} = 200 + 3 = 203 \text{ kg}$
Thus,
$W = mg = (203 \text{ kg})(9.81 \text{ m/s}^2) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = 1991 \text{ N} \cong \mathbf{1990 \text{ N}}$
where we give the final answer to three significant digits.
**Discussion** Note the unity conversion factor in the above equation.

---

**1-15**
**Solution** The interior dimensions of a room are given. The mass and weight of the air in the room are to be determined.
**Assumptions** The density of air is constant throughout the room.
**Properties** The density of air is given to be $\rho = 1.16 \text{ kg/m}^3$.
**Analysis** The mass of the air in the room is:
$V = 6 \times 6 \times 8 \text{ m}^3$
$m = \rho V = (1.16 \text{ kg/m}^3)(6 \times 6 \times 8 \text{ m}^3) = 334.1 \text{ kg} \cong \mathbf{334 \text{ kg}}$
Thus,
$W = mg = (334.1 \text{ kg})(9.81 \text{ m/s}^2) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = 3277 \text{ N} \cong \mathbf{3280 \text{ N}}$
**Discussion** Note that we round our final answers to three significant digits, but use extra digit(s) in intermediate calculations. Considering that the mass of an average man is about 70 to 90 kg, the mass of air in the room is probably larger than you might have expected.

---

**1-16**
**Solution** The variation of gravitational acceleration above sea level is given as a function of altitude. The height at which the weight of a body decreases by 1% is to be determined.
**Analysis** The weight of a body at the elevation $z$ can be expressed as:
$W = mg = m(9.807 - 3.32 \times 10^{-6} z)$
In our case,
$W = 0.99 W_s = 0.99 mg_s = 0.99(m)(9.807)$
Substituting,
$0.99(9.807) = (9.807 - 3.32 \times 10^{-6} z) \longrightarrow z = 29,540 \text{ m} \cong \mathbf{29,500 \text{ m}}$
where we have rounded off the final answer to three significant digits.
**Discussion** This is more than three times higher than the altitude at which a typical commercial jet flies, which is about 30,000 ft (9140 m). So, flying in a jet is not a good way to lose weight – diet and exercise are always the best bet.

---

**1-17E**
**Solution** An astronaut takes his scales with him to the moon. It is to be determined how much he weighs on the spring and beam scales on the moon.
**Analysis**
(a) A spring scale measures weight, which is the local gravitational force applied on a body:
$W = mg = (150 \text{ lbm})(5.48 \text{ ft/s}^2) \left( \frac{1 \text{ lbf}}{32.2 \text{ lbm} \cdot \text{ft/s}^2} \right) = \mathbf{25.5 \text{ lbf}}$
(b) A beam scale compares masses and thus is not affected by the variations in gravitational acceleration. The beam scale reads what it reads on earth,
$W = \mathbf{150 \text{ lbf}}$
**Discussion** The beam scale may be marked in units of weight (lbf), but it really compares mass, not weight. Which scale would you consider to be more accurate?

---

**1-18**
**Solution** The acceleration of an aircraft is given in g’s. The net upward force acting on a man in the aircraft is to be determined.
**Analysis** From Newton's second law, the applied force is
$F = ma = m(6g) = (90 \text{ kg})(6 \times 9.81 \text{ m/s}^2) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = 5297 \text{ N} \cong \mathbf{5300 \text{ N}}$
where we have rounded off the final answer to three significant digits.
**Discussion** The man feels like he is six times heavier than normal. You get a similar feeling when riding an elevator to the top of a tall building, although to a much lesser extent.

---

**1-19**
**Solution** A rock is thrown upward with a specified force. The acceleration of the rock is to be determined.
**Analysis** The weight of the rock is
$W = mg = (5 \text{ kg})(9.79 \text{ m/s}^2) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right) = 48.95 \text{ N} \cong 49.0 \text{ N}$
Then the net force that acts on the rock is
$F_{\text{net}} = F_{\text{up}} - F_{\text{down}} = 150 - 48.95 = 101.05 \text{ N}$
From Newton's second law, the acceleration of the rock becomes
$a = \frac{F}{m} = \frac{101.05 \text{ N}}{5 \text{ kg}} \left( \frac{1 \text{ kg} \cdot \text{m/s}^2}{1 \text{ N}} \right) = \mathbf{20.2 \text{ m/s}^2}$
**Discussion** This acceleration is more than twice the acceleration at which it would fall (due to gravity) if dropped.

---

**1-20**
**Solution** The previous problem is recalculated using EES. The entire EES solution is to be printed out, including the numerical results with proper units.
**Analysis** The EES Equations window is printed below, followed by the Solution window.
```ees
W=m*g"[N]"
m=5"[kg]"
g=9.79"[m/s^2]"
"The force balance on the rock yields the net force acting on the rock as"
F_net = F_up - F_down"[N]"
F_up=150"[N]"
F_down=W"[N]"
"The acceleration of the rock is determined from Newton's second law."
F_net=a*m 
"To Run the program, press F2 or click on the calculator icon from the Calculate menu"
```
**SOLUTION**
Variables in Main
$a=20.21 \text{ [m/s}^2]$
$F_{\text{down}}=48.95 \text{ [N]}$
$F_{\text{net}}=101.1 \text{ [N]}$
$F_{\text{up}}=150 \text{ [N]}$
$g=9.79 \text{ [m/s}^2]$
$m=5 \text{ [kg]}$
$W=48.95 \text{ [N]}$
The final results are $W = \mathbf{49.0 \text{ N}}$ and $a = \mathbf{20.2 \text{ m/s}^2}$, to three significant digits, which agree with the results of the previous problem.
**Discussion** Items in quotation marks in the EES Equation window are comments. Units are in square brackets.

---

**1-21**
**Solution** Gravitational acceleration $g$ and thus the weight of bodies decreases with increasing elevation. The percent reduction in the weight of an airplane cruising at 13,000 m is to be determined.
**Properties** The gravitational acceleration $g$ is $9.807 \text{ m/s}^2$ at sea level and $9.767 \text{ m/s}^2$ at an altitude of 13,000 m.
**Analysis** Weight is proportional to the gravitational acceleration $g$, and thus the percent reduction in weight is equivalent to the percent reduction in the gravitational acceleration, which is determined from
$\% \text{ Reduction in weight} = \% \text{ Reduction in } g = \frac{\Delta g}{g} \times 100 = \frac{9.807 - 9.767}{9.807} \times 100 = \mathbf{0.41\%}$
Therefore, the airplane and the people in it will weigh 0.41% less at 13,000 m altitude.
**Discussion** Note that the weight loss at cruising altitudes is negligible. Sorry, but flying in an airplane is not a good way to lose weight. The best way to lose weight is to carefully control your diet, and to exercise.

---

**Modeling and Solving Problems, and Precision**

**1-22C**
**Solution** We are to discuss the difference between accuracy and precision.
**Analysis** **Accuracy** refers to the closeness of the measured or calculated value to the true value whereas **precision** represents the number of significant digits or the closeness of different measurements of the same quantity to each other. A measurement or calculation can be very precise without being very accurate, and vice-versa. When measuring the boiling temperature of pure water at standard atmospheric conditions, for example, a temperature measurement of 97.861°C is very precise, but not as accurate as the less precise measurement of 99.0°C.
**Discussion** Accuracy and precision are often confused; both are important for quality engineering measurements.

---

**1-23C**
**Solution** We are to discuss the difference between analytical and experimental approaches.
**Analysis** The **experimental approach** (testing and taking measurements) has the advantage of dealing with the actual physical system, and getting a physical value within the limits of experimental error. However, this approach is expensive, time consuming, and often impractical. The **analytical approach** (analysis or calculations) has the advantage that it is fast and inexpensive, but the results obtained are subject to the accuracy of the assumptions and idealizations made in the analysis.
**Discussion** Most engineering designs require both analytical and experimental components, and both are important. Nowadays, computational fluid dynamics (CFD) is often used in place of pencil-and-paper analysis and/or experiments.

---

**1-24C**
**Solution** We are to discuss the importance of modeling in engineering.
**Analysis** **Modeling** makes it possible to predict the course of an event before it actually occurs, or to study various aspects of an event mathematically without actually running expensive and time-consuming experiments. When preparing a mathematical model, all the variables that affect the phenomena are identified, reasonable assumptions and approximations are made, and the interdependence of these variables are studied. The relevant physical laws and principles are invoked, and the problem is formulated mathematically. Finally, the problem is solved using an appropriate approach, and the results are interpreted.
**Discussion** In most cases of actual engineering design, the results are verified by experiment – usually by building a prototype. CFD is also being used more and more in the design process.

---

**1-25C**
**Solution** We are to discuss choosing a model.
**Analysis** The right choice between a crude and complex model is usually the **simplest model that yields adequate results**. Preparing very accurate but complex models is not necessarily a better choice since such models are not much use to an analyst if they are very difficult and time consuming to solve. At a minimum, the model should reflect the essential features of the physical problem it represents.
**Discussion** Cost is always an issue in engineering design, and “adequate” is often determined by cost.

---

**1-26C**
**Solution** We are to discuss how differential equations arise in the study of a physical problem.
**Analysis** The description of most scientific problems involves equations that relate the *changes* in some key variables to each other, and the smaller the increment chosen in the changing variables, the more accurate the description. In the limiting case of infinitesimal changes in variables, we obtain **differential equations**, which provide precise mathematical formulations for the physical principles and laws by representing the rates of changes as derivatives.
**Discussion** As we shall see in later chapters, the differential equations of fluid mechanics are known, but very difficult to solve except for very simple geometries. Computers are extremely helpful in this area.

---

**1-27C**
**Solution** We are to discuss the value of engineering software packages.
**Analysis** **Software packages** are of great value in engineering practice, and engineers today rely on software packages to solve large and complex problems quickly, and to perform optimization studies efficiently. Despite the convenience and capability that engineering software packages offer, they are still just tools, and they cannot replace traditional engineering courses. They simply cause a shift in emphasis in the course material from mathematics to physics.
**Discussion** While software packages save us time by reducing the amount of number-crunching, we must be careful to understand how they work and what they are doing, or else incorrect results can occur.

---

**1-28**
**Solution** We are to determine a positive real root of the following equation using EES: $2x^3 - 10x^{0.5} - 3x = -3$.
**Analysis** Using EES software, copy the following lines and paste on a blank EES screen to verify the solution:
```ees
2*x^3-10*x^0.5-3*x = -3
```
**Answer:** $x = \mathbf{2.063}$ (using an initial guess of $x = 2$)
**Discussion** To obtain the solution in EES, click on the icon that looks like a calculator, or Calculate-Solve.

---

**1-29**
**Solution** We are to solve a system of 2 equations and 2 unknowns using EES.
**Analysis** Using EES software, copy the following lines and paste on a blank EES screen to verify the solution:
```ees
x^3-y^2=7.75 
3*x*y+y=3.5
```
**Answers:** $x = \mathbf{2.0}$, $y = \mathbf{0.50}$.
**Discussion** To obtain the solution in EES, click on the icon that looks like a calculator, or Calculate-Solve.

---

**1-30**
**Solution** We are to solve a system of 3 equations with 3 unknowns using EES.
**Analysis** Using EES software, copy the following lines and paste on a blank EES screen to verify the solution:
```ees
2*x-y+z=5 
3*x^2+2*y=z+2 
x*y+2*z=8
```
**Answers:** $x = \mathbf{1.141}$, $y = \mathbf{0.8159}$, $z = \mathbf{3.535}$.
**Discussion** To obtain the solution in EES, click on the icon that looks like a calculator, or Calculate-Solve.

---

**1-31**
**Solution** We are to solve a system of 3 equations with 3 unknowns using EES.
**Analysis** Using EES software, copy the following lines and paste on a blank EES screen to verify the solution:
```ees
x^2*y-z=1 
x-3*y^0.5+x*z=-2 
x+y-z=2
```
**Answers:** $x = \mathbf{1}$, $y = \mathbf{1}$, $z = \mathbf{0}$.
**Discussion** To obtain the solution in EES, click on the icon that looks like a calculator, or Calculate-Solve.

---

**Review Problems**

**1-32**
**Solution** The gravitational acceleration changes with altitude. Accounting for this variation, the weights of a body at different locations are to be determined.
**Analysis** The weight of an 80-kg man at various locations is obtained by substituting the altitude $z$ (values in m) into the relation
$W = mg = (80 \text{ kg})(9.807 - 3.32 \times 10^{-6} z \text{ m/s}^2) \left( \frac{1 \text{ N}}{1 \text{ kg} \cdot \text{m/s}^2} \right)$
**Sea level:** ($z = 0 \text{ m}$): $W = 80 \times (9.807 - 3.32 \times 10^{-6} \times 0) = 80 \times 9.807 = \mathbf{784.6 \text{ N}}$
**Denver:** ($z = 1610 \text{ m}$): $W = 80 \times (9.807 - 3.32 \times 10^{-6} \times 1610) = 80 \times 9.802 = \mathbf{784.2 \text{ N}}$
**Mt. Ev.:** ($z = 8848 \text{ m}$): $W = 80 \times (9.807 - 3.32 \times 10^{-6} \times 8848) = 80 \times 9.778 = \mathbf{782.2 \text{ N}}$
**Discussion** We report 4 significant digits since the values are so close to each other. The percentage difference in weight from sea level to Mt. Everest is only about -0.3%, which is negligible for most engineering calculations.

---

**1-33**
**Solution** A man is considering buying a 12-oz steak for $3.15, or a 320-g steak for $2.80. The steak that is a better buy is to be determined.
**Assumptions** The steaks are of identical quality.
**Analysis** To make a comparison possible, we need to express the cost of each steak on a common basis. We choose 1 kg as the basis for comparison. Using proper conversion factors, the unit cost of each steak is determined to be:
**12 ounce steak:**
$\text{Unit Cost} = \left( \frac{\$3.15}{12 \text{ oz}} \right) \left( \frac{16 \text{ oz}}{1 \text{ lbm}} \right) \left( \frac{1 \text{ lbm}}{0.45359 \text{ kg}} \right) = \mathbf{\$9.26/kg}$
**320 gram steak:**
$\text{Unit Cost} = \left( \frac{\$2.80}{320 \text{ g}} \right) \left( \frac{1000 \text{ g}}{1 \text{ kg}} \right) = \mathbf{\$8.75/kg}$
Therefore, the steak at the international market is a better buy.
**Discussion** Notice the unity conversion factors in the above equations.

---

**1-34**
**Solution** The thrust developed by the jet engine of a Boeing 777 is given to be 85,000 pounds. This thrust is to be expressed in N and kgf.
**Analysis** Noting that $1 \text{ lbf} = 4.448 \text{ N}$ and $1 \text{ kgf} = 9.81 \text{ N}$, the thrust developed is expressed in two other units as:
**Thrust in N:** $\text{Thrust} = (85,000 \text{ lbf}) \left( \frac{4.448 \text{ N}}{1 \text{ lbf}} \right) = \mathbf{3.78 \times 10^5 \text{ N}}$
**Thrust in kgf:** $\text{Thrust} = (3.78 \times 10^5 \text{ N}) \left( \frac{1 \text{ kgf}}{9.81 \text{ N}} \right) = \mathbf{3.85 \times 10^4 \text{ kgf}}$
**Discussion** Because the gravitational acceleration on earth is close to 10 m/s², it turns out that the two force units N and kgf differ by nearly a factor of 10. This can lead to confusion, and we recommend that you do not use the unit kgf.

---

**Design and Essay Problem**

**1-35**
**Solution** We are to write an essay on mass- and volume-measurement devices.
**Discussion** Students’ essays should be unique and will differ from each other.

---
