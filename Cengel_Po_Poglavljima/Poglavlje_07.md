# CHAPTER 7: DIMENSIONAL ANALYSIS AND MODELING

Dimensional analysis reduces the number of necessary independent parameters in a problem by combining variables into nondimensional groups.

### OBJECTIVES
- Understand dimensions, units, and dimensional homogeneity.
- Use the **method of repeating variables**.
- Understand **dynamic similarity** for experimental modeling.

---

## 7–1 ■ DIMENSIONS AND UNITS

A **dimension** is a measure of a physical quantity; a **unit** is a way to assign a number. 
Primary dimensions: mass $m$, length $L$, time $t$, temperature $T$.
$$ \{\text{Force}\} = \{\text{Mass} \cdot \text{Acceleration}\} = \{mL/t^2\} \quad (7–1) $$

**EXAMPLE 7–1: Primary Dimensions of Surface Tension**
$\sigma_s$ has dimensions of force per unit length.
**Analysis:** $\{\sigma_s\} = \left\{ \frac{\text{Force}}{\text{Length}} \right\} = \left\{ \frac{m \cdot L/t^2}{L} \right\} = \{m/t^2\}$.

---

## 7–2 ■ DIMENSIONAL HOMOGENEITY

Every additive term in an equation must have the same dimensions.
Example: Change of total energy $\Delta E = \Delta U + \Delta KE + \Delta PE \quad (7–2)$.
All terms have dimensions of energy: $\{mL^2/t^2\}$.

**EXAMPLE 7–2: Dimensional Homogeneity of the Bernoulli Equation**
$$ P + \frac{1}{2} \rho V^2 + \rho gz = C \quad (1) $$
Each term has dimensions of pressure: $\{m/(t^2 L)\}$.

### Nondimensionalization of Equations

By dividing an equation by a collection of variables with the same dimensions, the equation becomes nondimensional.

**Example: Object falling in a vacuum**
Equation: $d^2 z / dt^2 = -g \quad (7–4)$.
Dimensional variables: $z$ (length), $t$ (time).
Nondimensional variables: $z^* = z/z_0, t^* = w_0 t / z_0 \quad (7–6)$.
Substituting into (7–4):
$$ \frac{w_0^2}{gz_0} \frac{d^2 z^*}{dt^{*2}} = -1 \quad \to \quad \frac{d^2 z^*}{dt^{*2}} = -\frac{1}{Fr^2} \quad (7–9) $$
where **Froude number** is $Fr = \frac{w_0}{\sqrt{gz_0}} \quad (7–8)$.
Nondimensional result:
$$ z^* = 1 + t^* - \frac{1}{2Fr^2} t^{*2} \quad (7–10) $$
The number of parameters is reduced from three ($g, w_0, z_0$) to one ($Fr$).

---

**EXAMPLE 7–3: Illustration of the Advantages of Nondimensionalization**
Brute force experiments for a falling ball ($z$ vs $t$) with varying $z_0, w_0, g$ would require 125 tests for 5 levels each. 
**Analysis:** By nondimensionalizing ($z^* = z/z_0, t^* = w_0 t / z_0$), the problem is reduced to just one parameter: the **Froude number** ($Fr$). Only 5 experiments are then required to characterize the entire family of trajectories (Fig. 7–13).

---

**EXAMPLE 7–4: Extrapolation of Nondimensionalized Data**
Predict baseball fall time on the moon ($g_{moon} = 1.63 \text{ m/s}^2$) using earth data.
**Analysis:** Calculate moon Froude number:
$$ Fr^2 = \frac{w_0^2}{g_{moon} z_0} = \frac{(1.830)^2}{(1.63)(2.0)} = 1.03 $$
From earth data plot (Fig. 7–13) for $Fr^2 \cong 1.0$, find $t^* \cong 2.75$.
Convert to real time: $t = t^* z_0 / w_0 = 2.75(2.0) / 1.830 = 3.01 \text{ s}$.

---

## 7–3 ■ DIMENSIONAL ANALYSIS AND SIMILARITY

**Similarity** ensures that model tests accurately predict prototype performance.
1. **Geometric Similarity:** Model and prototype have the same shape.
2. **Kinematic Similarity:** Velocity vectors at corresponding points point in the same direction and are proportional in magnitude. Requires geometric similarity.
3. **Dynamic Similarity:** All forces scale by a constant factor. Requires kinematic similarity.

Complete similarity is achieved only when **geometric, kinematic, and dynamic similarity** exist.

### Functional Relationship between $\Pi$ groups
$$ \Pi_1 = f(\Pi_2, \Pi_3, \dots, \Pi_k) \quad (7–11) $$
To ensure similarity: $\Pi_{2,m} = \Pi_{2,p}, \Pi_{3,m} = \Pi_{3,p}, \dots$
Then the dependent $\Pi$ group is guaranteed to match: $\Pi_{1,m} = \Pi_{1,p} \quad (7–12)$.

---

**EXAMPLE 7–5: Similarity between Model and Prototype Cars**
1/5 scale model in a cold wind tunnel ($5^\circ\text{C}$). Prototype at $25^\circ\text{C}, 50 \text{ mi/h}$.
**Analysis:** Match Reynolds numbers ($Re_m = Re_p$):
$$ \frac{\rho_m V_m L_m}{\mu_m} = \frac{\rho_p V_p L_p}{\mu_p} \to V_m = V_p \left( \frac{\mu_m}{\mu_p} \right) \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{L_p}{L_m} \right) $$
$$ V_m = (50.0 \text{ mi/h}) \left( \frac{1.754 \times 10^{-5}}{1.849 \times 10^{-5}} \right) \left( \frac{1.184}{1.269} \right) (5) = 221 \text{ mi/h} $$

---

## 7–4 ■ THE METHOD OF REPEATING VARIABLES AND THE BUCKINGHAM PI THEOREM

**Buckingham Pi Theorem:** The number of independent dimensionless groups ($\Pi$'s) is $k = n - j$, where $n$ is the number of variables and $j$ is the reduction (usually the number of primary dimensions).

### Steps of the Method:
1. **Step 1:** List all parameters ($n$).
2. **Step 2:** List primary dimensions of each.
3. **Step 3:** Guess reduction $j$ (usually 3 for $m, L, t$). Calculate $k = n - j$.
4. **Step 4:** Choose $j$ repeating parameters (e.g., $L, V, \rho$).
5. **Step 5:** Construct $\Pi$'s by grouping repeating parameters with remaining ones.
6. **Step 6:** Check that all $\Pi$'s are dimensionless.

### Guidelines for choosing repeating parameters (Table 7–3):
1. Never pick the dependent variable.
2. Chosen parameters must not form a $\Pi$ group themselves.
3. Must represent all primary dimensions.
4. Never pick parameters that are already dimensionless.
5. Never pick two parameters with the same dimensions.
6. Choose dimensional constants ($g$) over variables if possible.
7. Pick common parameters ($L, V, \rho$).
8. Pick simple parameters over complex ones.

---

---

## 7–4 ■ THE METHOD OF REPEATING VARIABLES - Continued

### Step 5 & 6: Constructing and Checking $\Pi$ Groups
We group repeating parameters with the remaining ones. 
Example (Falling ball):
$$ \Pi_3 = g w_0^{a_3} z_0^{b_3} \to \{L^0 t^0\} = \{L^1 t^{-2} (L^1 t^{-1})^{a_3} L^{b_3}\} $$
Equating exponents:
- Time: $-2 - a_3 = 0 \to a_3 = -2$.
- Length: $1 + a_3 + b_3 = 0 \to 1 - 2 + b_3 = 0 \to b_3 = 1$.
$$ \Pi_3 = \frac{g z_0}{w_0^2} \quad (7–18) $$

**Modified $\Pi_3$:** To match the established **Froude number**:
$$ \Pi_{3,modified} = (\Pi_3)^{-1/2} = \frac{w_0}{\sqrt{gz_0}} = Fr \quad (7–19) $$

### Guidelines for Manipulation (Table 7–4):
1. Raise a $\Pi$ to any exponent.
2. Multiply by a dimensionless constant (e.g., $1/2$).
3. Form products or quotients of $\Pi$ groups.
4. Substitute parameters with others of same dimensions (e.g., $L^2$ with $A$).

---

### TABLE 7–5: Common Nondimensional Parameters
| Name | Definition | Ratio of Significance |
| :--- | :--- | :--- |
| **Reynolds number ($Re$)** | $\frac{\rho V L}{\mu} = \frac{VL}{\nu}$ | Inertial / Viscous |
| **Froude number ($Fr$)** | $\frac{V}{\sqrt{gL}}$ | Inertial / Gravitational |
| **Mach number ($Ma$)** | $\frac{V}{c}$ | Flow speed / Sound speed |
| **Weber number ($We$)** | $\frac{\rho V^2 L}{\sigma_s}$ | Inertial / Surface tension |
| **Euler number ($Eu$)** | $\frac{\Delta P}{\rho V^2}$ | Pressure diff / Dynamic pressure |
| **Drag coefficient ($C_D$)** | $\frac{F_D}{\frac{1}{2} \rho V^2 A}$ | Drag force / Dynamic force |
| **Lift coefficient ($C_L$)** | $\frac{F_L}{\frac{1}{2} \rho V^2 A}$ | Lift force / Dynamic force |
| **Strouhal number ($St$)** | $\frac{fL}{V}$ | Characteristic flow time / Oscillation period |

---

**EXAMPLE 7–6: Prediction of Aerodynamic Drag Force on a Prototype Car**
Follow-up to Ex 7–5. Model $F_{D,m} = 21.2 \text{ lbf}$ at $221 \text{ mi/h}$. Predict $F_{D,p}$ at $50 \text{ mi/h}$.
**Analysis:** Match $\Pi_1$ (drag coefficient):
$$ \Pi_{1,m} = \frac{F_{D,m}}{\rho_m V_m^2 L_m^2} = \Pi_{1,p} = \frac{F_{D,p}}{\rho_p V_p^2 L_p^2} $$
$$ F_{D,p} = F_{D,m} \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{V_p}{V_m} \right)^2 \left( \frac{L_p}{L_m} \right)^2 $$
$$ F_{D,p} = (21.2 \text{ lbf}) \left( \frac{1.184}{1.269} \right) \left( \frac{50.0}{221} \right)^2 (5)^2 = 25.3 \text{ lbf} $$

---

**EXAMPLE 7–7: Pressure in a Soap Bubble**
Relate $\Delta P$ to radius $R$ and surface tension $\sigma_s$.
**Analysis:** $n=3$ variables ($\Delta P, R, \sigma_s$). Primary dimensions: $m, L, t$. 
Reduction $j=2$ (since $\Delta P$ and $\sigma_s$ have same time and mass dimensions).
$k = n - j = 3 - 2 = 1$ group.
$$ \Pi_1 = \Delta P R^a \sigma_s^b \to \{m^0 L^0 t^0\} = \{m^1 L^{-1} t^{-2}\} \{L^a\} \{m^1 t^{-2}\}^b $$
Solving: $b = -1, a = 1$.
$$ \Pi_1 = \frac{\Delta P R}{\sigma_s} = \text{constant} \to \Delta P \propto \frac{\sigma_s}{R} $$

---

**EXAMPLE 7–8: Lift on a Wing**
Match $Re$ and $Ma$ for a 1/10 scale model.
**Analysis:** If we match $Re$: $V_m = 10 V_p = 520 \text{ m/s}$.
$Ma_m = V_m/c = 520/346 = 1.50$ (Supersonic!).
If $Ma_p = 0.15$ (subsonic), we can ignore $Ma$ similarity if $Ma_m < 0.3$.
Pressurize wind tunnel to $10 \text{ atm}$ to increase density and match $Re$ at lower velocity.
Final recommendation: Run tunnel at $100 \text{ m/s}, 5 \text{ atm}, 25^\circ\text{C}$.

---

---

**EXAMPLE 7–9: Friction in a Pipe**
Relate wall shear stress $\tau_w$ to fluid speed $V$, diameter $D$, density $\rho$, viscosity $\mu$, and roughness height $\varepsilon$.
**Analysis:** $n=6$ variables. $j=3$ dimensions ($m, L, t$). $k = 6-3=3$ groups.
Repeating parameters: $V, D, \rho$.
- $\Pi_1 = \tau_w V^a D^b \rho^c \to \Pi_1 = \frac{\tau_w}{\rho V^2}$.
- $\Pi_2 = \mu V^a D^b \rho^c \to \Pi_2 = \frac{\mu}{\rho V D} = \frac{1}{Re}$.
- $\Pi_3 = \varepsilon V^a D^b \rho^c \to \Pi_3 = \frac{\varepsilon}{D}$.
Modified $\Pi_1$ to match **Darcy friction factor**:
$$ f = \frac{8\tau_w}{\rho V^2} = f(Re, \varepsilon/D) $$

---

**EXAMPLE 7–10: Model Truck Wind Tunnel Measurements**
1/16 scale model truck. $V_m$ from 20 to 70 m/s.
**Analysis:** Reynolds number of prototype $Re_p = 4.37 \times 10^6$.
Model $Re_m$ at 70 m/s is $7.13 \times 10^5$. 
Even though $Re_m \neq Re_p$, Fig. 7-41 shows **Reynolds number independence** for $Re > 5 \times 10^5$.
Drag coefficient $C_D$ levels off at $\cong 0.76$.
Predicted prototype drag:
$$ F_{D,p} = \frac{1}{2} \rho_p V_p^2 A_p C_{D,p} = 3400 \text{ N} $$

---

## Flows with Free Surfaces

For testing boats, rivers, or spillways, both **Reynolds number** and **Froude number** are relevant.
$$ Re_p = Re_m \to \frac{V_p L_p}{\nu_p} = \frac{V_m L_m}{\nu_m} \quad (7–21) $$
$$ Fr_p = Fr_m \to \frac{V_p}{\sqrt{gL_p}} = \frac{V_m}{\sqrt{gL_m}} \quad (7–22) $$
To satisfy both, the kinematic viscosity ratio must be:
$$ \frac{\nu_m}{\nu_p} = \left( \frac{L_m}{L_p} \right)^{3/2} \quad (7–24) $$
Since no practical fluid has such low viscosity for small scales (e.g., 1/100), we accept **incomplete similarity**. Usually, Froude scaling is prioritized for free surface flows.

**Distorted Models:** Used when scaling would make the model too shallow (e.g., rivers). The vertical scale is exaggerated compared to the horizontal scale.

---

**EXAMPLE 7–11: Model Lock and River**
Scale $L_m/L_p = 1/100$.
**Analysis:** Required $\nu_m = \nu_p (1/100)^{3/2} = 1.00 \times 10^{-9} \text{ m}^2\text{/s}$.
No such liquid exists (mercury is $10^{-7}$). Complete similarity is impossible; water is used despite incomplete $Re$ similarity.

---

## APPLICATION SPOTLIGHT: How a Fly Flies
Insects use **dynamic scaling** to study aerodynamics on larger, slower models (robots).
- Reynolds number for a flapping wing: $Re = 2\Phi R L_c \omega / \nu$.
- Reduced frequency: $\sigma = 2\Phi R \omega / V$.
Leading-edge vortices (LEV) provide extra lift during each stroke.

---

---

## SUMMARY (Chapter 7: Final)

- **Dimensions vs. Units:** A dimension is a measure of physical quantity (e.g., length), whereas a unit is a way to assign a number (e.g., meter).
- **Dimensional Homogeneity:** Every additive term in an equation must have the same dimensions.
- **Buckingham Pi Theorem:** Reduces $n$ parameters to $k = n - j$ independent $\Pi$ groups.
- **Similarity:** Requires geometric, kinematic, and dynamic similarity between model and prototype.
- **Applications:** Used in pipe flows (Chap. 8), normalizing differential equations (Chap. 10), turbomachinery (Chap. 14), and CFD (Chap. 15).

---

## PROBLEMS (Chapter 7: Selection)

**7–2C** Primary dimensions of basic parameters:
- **Acceleration:** $\{L/t^2\}$
- **Density:** $\{m/L^3\}$
- **Force:** $\{mL/t^2\}$
- **Pressure:** $\{m/(L t^2)\}$
- **Viscosity:** $\{m/(L t)\}$
- **Surface Tension:** $\{m/t^2\}$

**7–11** Ohms Law $\Delta E = IR$: Primary dimensions of resistance $R$ are $\{m L^2 t^{-3} I^{-2}\}$.

**7–15** Fourier’s law $\dot{Q} = -kA \frac{dT}{dx}$: Primary dimensions of thermal conductivity $k$ are $\{m L t^{-3} T^{-1}\}$.

**7–24** Heat transfer in a pipe $\dot{Q} = \dot{m} c_p (T_{out} - T_{in})$. Verify dimensional homogeneity.

**7–26** Room ventilation equation: $V \frac{dc}{dt} = S - \dot{V}c - c A_s k_w$.
- $c$: mass concentration $\{m/L^3\}$.
- $S$: source $\{m/t\}$.
- $k_w$: adsorption coefficient $\{L/t\}$.

**7–36** Submarine model (1/8 scale) in wind tunnel. Prototype in water at $0.560 \text{ m/s}$.
**Analysis:** Match Reynolds numbers to find required air speed. Answer: $61.4 \text{ m/s}$.

**7–48** Rotating liquid in cylinder. Relate $h$ to $\omega, \rho, g, R$.
**Analysis:** $k = 5-3=2$ groups. Result: $h/R = f(Fr)$ where $Fr = \omega^2 R / g$.

**7–62** Creeping flow ($Re \ll 1$): Drag force $F_D = f(V, L, \mu)$.
**Analysis:** $k = 4-3=1$ group. Result: $\frac{F_D}{\mu V L} = \text{constant}$.

**7–73** Shallow water waves speed $c = f(h, g, \rho, \mu)$.
**Analysis:** Show $Fr = \frac{c}{\sqrt{gh}} = f(Re)$ where $Re = \frac{\rho c h}{\mu}$.

**7–74** Pipe pressure drop $\Delta P$ extrapolation using Euler number $Eu = \frac{\Delta P}{\rho V^2}$ and Reynolds independence.

---

---

## PROBLEMS (Chapter 6: Advanced)

**6–54** Centrifugal blower ($r_1=20\text{ cm}, b_1=8.2\text{ cm}, r_2=45\text{ cm}, b_2=5.6\text{ cm}$). $\dot{V} = 0.70 \text{ m}^3\text{/s}$ at $700 \text{ rpm}$. Radial inlet ($\alpha_1=0^\circ$), outlet $\alpha_2=50^\circ$. Determine minimum power. $\rho = 1.25 \text{ kg/m}^3$.

**6–59** Tripod failure reconstruction ($D=5\text{ cm}$). Nozzle mass $10 \text{ kg}$, rated at $1800 \text{ N}$. Find failure velocity and impact velocity at $60 \text{ cm}$. Answers: $30.2 \text{ m/s}, 0.0593 \text{ m}^3\text{/s}, 14.7 \text{ m/s}$.

**6–66** Indiana Jones ascent platform ($m=150 \text{ kg}$, four $5\text{-cm}$ nozzles). Determine min velocity and time to rise $10 \text{ m}$ ($V=15 \text{ m/s}$). Answers: $13.7 \text{ m/s}, 3.2 \text{ s}$.

**6–71** Mixed flow pump: $\dot{V} = 0.2 \text{ m}^3\text{/s}, V_{in} = 5 \text{ m/s}$, exit at $60^\circ$. Determine axial force if exit area is half inlet area.

---
