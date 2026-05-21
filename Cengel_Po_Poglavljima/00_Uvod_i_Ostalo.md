# FLUID MECHANICS: FUNDAMENTALS AND APPLICATIONS

**YUNUS A. ÇENGEL**
Department of Mechanical Engineering
University of Nevada, Reno

**JOHN M. CIMBALA**
Department of Mechanical and Nuclear Engineering
The Pennsylvania State University

---

## FLUID MECHANICS: FUNDAMENTALS AND APPLICATIONS

Published by McGraw-Hill, a business unit of The McGraw-Hill Companies, Inc., 1221 Avenue of the Americas, New York, NY 10020. Copyright © 2006 by The McGraw-Hill Companies, Inc. All rights reserved. No part of this publication may be reproduced or distributed in any form or by any means, or stored in a database or retrieval system, without the prior written consent of The McGraw-Hill Companies, Inc., including, but not limited to, in any network or other electronic storage or transmission, or broadcast for distance learning.

Some ancillaries, including electronic and print components, may not be available to customers outside the United States.

This book is printed on acid-free paper.

1 2 3 4 5 6 7 8 9 0 DOW/DOW 0 9 8 7 6 5 4

ISBN 0–07–247236–7

---

## Dedication

*To all students—In hopes of enhancing your desire and enthusiasm to explore the inner workings of our marvelous universe, of which fluid mechanics is a small but fascinating part; our hope is that this book enhances your love of learning, not only about fluid mechanics, but about life.*

---

## ABOUT THE AUTHORS

**Yunus A. Çengel** is Professor Emeritus of Mechanical Engineering at the University of Nevada, Reno. He received his B.S. in mechanical engineering from Istanbul Technical University and his M.S. and Ph.D. in mechanical engineering from North Carolina State University. His research areas are renewable energy, desalination, exergy analysis, heat transfer enhancement, radiation heat transfer, and energy conservation. He served as the director of the Industrial Assessment Center (IAC) at the University of Nevada, Reno, from 1996 to 2000. He has led teams of engineering students to numerous manufacturing facilities in Northern Nevada and California to do industrial assessments, and has prepared energy conservation, waste minimization, and productivity enhancement reports for them.

Dr. Çengel is the coauthor of the widely adopted textbook *Thermodynamics: An Engineering Approach*, 4th edition (2002), published by McGraw-Hill. He is also the author of the textbook *Heat Transfer: A Practical Approach*, 2nd edition (2003), and the coauthor of the textbook *Fundamentals of Thermal-Fluid Sciences*, 2nd edition (2005), both published by McGraw-Hill. Some of his textbooks have been translated to Chinese, Japanese, Korean, Spanish, Turkish, Italian, and Greek.

Dr. Çengel is the recipient of several outstanding teacher awards, and he has received the ASEE Meriam/Wiley Distinguished Author Award for excellence in authorship in 1992 and again in 2000.

Dr. Çengel is a registered Professional Engineer in the State of Nevada, and is a member of the American Society of Mechanical Engineers (ASME) and the American Society for Engineering Education (ASEE).

**John M. Cimbala** is Professor of Mechanical Engineering at The Pennsylvania State University, University Park. He received his B.S. in Aerospace Engineering from Penn State and his M.S. in Aeronautics from the California Institute of Technology (CalTech). He received his Ph.D. in Aeronautics from CalTech in 1984 under the supervision of Professor Anatol Roshko, to whom he will be forever grateful. His research areas include experimental and computational fluid mechanics and heat transfer, turbulence, turbulence modeling, turbomachinery, indoor air quality, and air pollution control. During the academic year 1993–94, Professor Cimbala took a sabbatical leave from the University and worked at NASA Langley Research Center, where he advanced his knowledge of computational fluid dynamics (CFD) and turbulence modeling.

Dr. Cimbala is the coauthor of the textbook *Indoor Air Quality Engineering: Environmental Health and Control of Indoor Pollutants* (2003), published by Marcel-Dekker, Inc. He has also contributed to parts of other books, and is the author or co-author of dozens of journal and conference papers. More information can be found at www.mne.psu.edu/cimbala.

Professor Cimbala is the recipient of several outstanding teaching awards and views his book writing as an extension of his love of teaching. He is a member of the American Institute of Aeronautics and Astronautics (AIAA), the American Society of Mechanical Engineers (ASME), the American Society for Engineering Education (ASEE), and the American Physical Society (APS).

---

## BRIEF CONTENTS

- CHAPTER ONE: INTRODUCTION AND BASIC CONCEPTS 1
- CHAPTER TWO: PROPERTIES OF FLUIDS 35
- CHAPTER THREE: PRESSURE AND FLUID STATICS 65
- CHAPTER FOUR: FLUID KINEMATICS 121
- CHAPTER FIVE: MASS, BERNOULLI, AND ENERGY EQUATIONS 171
- CHAPTER SIX: MOMENTUM ANALYSIS OF FLOW SYSTEMS 227
- CHAPTER SEVEN: DIMENSIONAL ANALYSIS AND MODELING 269
- CHAPTER EIGHT: FLOW IN PIPES 321
- CHAPTER NINE: DIFFERENTIAL ANALYSIS OF FLUID FLOW 399
- CHAPTER TEN: APPROXIMATE SOLUTIONS OF THE NAVIER–STOKES EQUATION 471
- CHAPTER ELEVEN: FLOW OVER BODIES: DRAG AND LIFT 561
- CHAPTER TWELVE: COMPRESSIBLE FLOW 611
- CHAPTER THIRTEEN: OPEN-CHANNEL FLOW 679
- CHAPTER FOURTEEN: TURBOMACHINERY 735
- CHAPTER FIFTEEN: INTRODUCTION TO COMPUTATIONAL FLUID DYNAMICS 817

---

## CONTENTS

### CHAPTER ONE: INTRODUCTION AND BASIC CONCEPTS 1

- 1–1 Introduction 2
  - What Is a Fluid? 2
  - Application Areas of Fluid Mechanics 4
- 1–2 The No-Slip Condition 6
- 1–3 A Brief History of Fluid Mechanics 7
- 1–4 Classification of Fluid Flows 9
  - Viscous versus Inviscid Regions of Flow 9
  - Internal versus External Flow 10
  - Compressible versus Incompressible Flow 10
  - Laminar versus Turbulent Flow 11
  - Natural (or Unforced) versus Forced Flow 11
  - Steady versus Unsteady Flow 11
  - One-, Two-, and Three-Dimensional Flows 12
- 1–5 System and Control Volume 14
- 1–6 Importance of Dimensions and Units 15
  - Some SI and English Units 16
  - Dimensional Homogeneity 18
  - Unity Conversion Ratios 20
- 1–7 Mathematical Modeling of Engineering Problems 21
  - Modeling in Engineering 21
- 1–8 Problem-Solving Technique 22
  - Step 1: Problem Statement 22
  - Step 2: Schematic 23
  - Step 3: Assumptions and Approximations 23
  - Step 4: Physical Laws 23
  - Step 5: Properties 23
  - Step 6: Calculations 23
  - Step 7: Reasoning, Verification, and Discussion 23
- 1–9 Engineering Software Packages 24
  - Engineering Equation Solver (EES) 25
  - FLUENT 26
- 1–10 Accuracy, Precision, and Significant Digits 26
- Application Spotlight: What Nuclear Blasts and Raindrops Have in Common 31
- Summary 30
- References and Suggested Reading 30
- Problems 32

### CHAPTER TWO: PROPERTIES OF FLUIDS 35

- 2–1 Introduction 36
  - Continuum 36
- 2–2 Density and Specific Gravity 37
  - Density of Ideal Gases 38
- 2–3 Vapor Pressure and Cavitation 39
- 2–4 Energy and Specific Heats 41
- 2–5 Coefficient of Compressibility 42
  - Coefficient of Volume Expansion 44
- 2–6 Viscosity 46
- 2–7 Surface Tension and Capillary Effect 51
  - Capillary Effect 53
- Summary 55
- References and Suggested Reading 56
- Application Spotlight: Cavitation 57
- Problems 58

### CHAPTER THREE: PRESSURE AND FLUID STATICS 65

- 3–1 Pressure 66
  - Pressure at a Point 67
  - Variation of Pressure with Depth 68
- 3–2 The Manometer 71
  - Other Pressure Measurement Devices 74
- 3–3 The Barometer and Atmospheric Pressure 75
- 3–4 Introduction to Fluid Statics 78
- 3–5 Hydrostatic Forces on Submerged Plane Surfaces 79
  - Special Case: Submerged Rectangular Plate 82
- 3–6 Hydrostatic Forces on Submerged Curved Surfaces 85
- 3–7 Buoyancy and Stability 89
  - Stability of Immersed and Floating Bodies 92
- 3–8 Fluids in Rigid-Body Motion 95
  - Special Case 1: Fluids at Rest 96
  - Special Case 2: Free Fall of a Fluid Body 97
  - Acceleration on a Straight Path 97
  - Rotation in a Cylindrical Container 99
- Summary 102
- References and Suggested Reading 103
- Problems 103

### CHAPTER FOUR: FLUID KINEMATICS 121

- 4–1 Lagrangian and Eulerian Descriptions 122
  - Acceleration Field 124
  - Material Derivative 127
- 4–2 Fundamentals of Flow Visualization 129
  - Streamlines and Streamtubes 129
  - Pathlines 130
  - Streaklines 132
  - Timelines 134
  - Refractive Flow Visualization Techniques 135
  - Surface Flow Visualization Techniques 136
- 4–3 Plots of Fluid Flow Data 136
  - Profile Plots 137
  - Vector Plots 137
  - Contour Plots 138
- 4–4 Other Kinematic Descriptions 139
  - Types of Motion or Deformation of Fluid Elements 139
  - Vorticity and Rotationality 144
  - Comparison of Two Circular Flows 147
- 4–5 The Reynolds Transport Theorem 148
  - Alternate Derivation of the Reynolds Transport Theorem 153
  - Relationship between Material Derivative and RTT 155
- Application Spotlight: Fluidic Actuators 157
- Summary 156
- References and Suggested Reading 158
- Problems 158

### CHAPTER FIVE: MASS, BERNOULLI, AND ENERGY EQUATIONS 171

- 5–1 Introduction 172
  - Conservation of Mass 172
  - Conservation of Momentum 172
  - Conservation of Energy 172
- 5–2 Conservation of Mass 173
  - Mass and Volume Flow Rates 173
  - Conservation of Mass Principle 175
  - Moving or Deforming Control Volumes 177
  - Mass Balance for Steady-Flow Processes 177
  - Special Case: Incompressible Flow 178
- 5–3 Mechanical Energy and Efficiency 180
- 5–4 The Bernoulli Equation 185
  - Acceleration of a Fluid Particle 186
  - Derivation of the Bernoulli Equation 186
  - Force Balance across Streamlines 188
  - Unsteady, Compressible Flow 189
  - Static, Dynamic, and Stagnation Pressures 189
  - Limitations on the Use of the Bernoulli Equation 190
  - Hydraulic Grade Line (HGL) and Energy Grade Line (EGL) 192
- 5–5 Applications of the Bernoulli Equation 194
- 5–6 General Energy Equation 201
  - Energy Transfer by Heat, $Q$ 202
  - Energy Transfer by Work, $W$ 202
- 5–7 Energy Analysis of Steady Flows 206
  - Special Case: Incompressible Flow with No Mechanical Work Devices and Negligible Friction 208
  - Kinetic Energy Correction Factor, $\alpha$ 208
- Summary 215
- References and Suggested Reading 216
- Problems 216

### CHAPTER SIX: MOMENTUM ANALYSIS OF FLOW SYSTEMS 227

- 6–1 Newton’s Laws and Conservation of Momentum 228
- 6–2 Choosing a Control Volume 229
- 6–3 Forces Acting on a Control Volume 230

---

9–4 Conservation of Linear Momentum—Cauchy’s Equation 421
Derivation Using the Divergence Theorem 421
Derivation Using an Infinitesimal Control Volume 422
Alternative Form of Cauchy’s Equation 425
Derivation Using Newton’s Second Law 425
9–5 The Navier–Stokes Equation 426
Introduction 426
Newtonian versus Non-Newtonian Fluids 427
Derivation of the Navier–Stokes Equation for Incompressible, Isothermal Flow 428
Continuity and Navier–Stokes Equations in Cartesian Coordinates 430
Continuity and Navier–Stokes Equations in Cylindrical Coordinates 431
9–6 Differential Analysis of Fluid Flow Problems 432
Calculation of the Pressure Field for a Known Velocity Field 432
Exact Solutions of the Continuity and Navier–Stokes Equations 437

Summary 455
References and Suggested Reading 456
Problems 456

### CHAPTER TEN: APPROXIMATE SOLUTIONS OF THE NAVIER–STOKES EQUATION 471

10–1 Introduction 472
10–2 Nondimensionalized Equations of Motion 473
10–3 The Creeping Flow Approximation 476
Drag on a Sphere in Creeping Flow 479
10–4 Approximation for Inviscid Regions of Flow 481
Derivation of the Bernoulli Equation in Inviscid Regions of Flow 482
10–5 The Irrotational Flow Approximation 485
Continuity Equation 485
Momentum Equation 487
Derivation of the Bernoulli Equation in Irrotational Regions of Flow 487
Two-Dimensional Irrotational Regions of Flow 490
Superposition in Irrotational Regions of Flow 494
Elementary Planar Irrotational Flows 494
Irrotational Flows Formed by Superposition 501

10–6 The Boundary Layer Approximation 510
The Boundary Layer Equations 515
The Boundary Layer Procedure 520
Displacement Thickness 524
Momentum Thickness 527
Turbulent Flat Plate Boundary Layer 528
Boundary Layers with Pressure Gradients 534
The Momentum Integral Technique for Boundary Layers 539

Application Spotlight: Droplet Formation 549
Summary 547
References and Suggested Reading 548
Problems 550

### CHAPTER ELEVEN: FLOW OVER BODIES: DRAG AND LIFT 561

11–1 Introduction 562
11–2 Drag and Lift 563
11–3 Friction and Pressure Drag 567
Reducing Drag by Streamlining 568
Flow Separation 569
11–4 Drag Coefficients of Common Geometries 571
Biological Systems and Drag 572
Drag Coefficients of Vehicles 574
Superposition 577
11–5 Parallel Flow over Flat Plates 579
Friction Coefficient 580
11–6 Flow over Cylinders and Spheres 583
Effect of Surface Roughness 586
11–7 Lift 587
End Effects of Wing Tips 591
Lift Generated by Spinning 594

Application Spotlight: Drag Reduction 600
Summary 598
References and Suggested Reading 599
Problems 601

### CHAPTER TWELVE: COMPRESSIBLE FLOW 611

12–1 Stagnation Properties 612
12–2 Speed of Sound and Mach Number 615
12–3 One-Dimensional Isentropic Flow 617
Variation of Fluid Velocity with Flow Area 620
Property Relations for Isentropic Flow of Ideal Gases 622

12–4 Isentropic Flow through Nozzles 624
Converging Nozzles 625
Converging–Diverging Nozzles 629
12–5 Shock Waves and Expansion Waves 633
Normal Shocks 633
Oblique Shocks 640
Prandtl–Meyer Expansion Waves 644
12–6 Duct Flow with Heat Transfer and Negligible Friction (Rayleigh Flow) 648
Property Relations for Rayleigh Flow 654
Choked Rayleigh Flow 655
12–7 Adiabatic Duct Flow with Friction (Fanno Flow) 657
Property Relations for Fanno Flow 660
Choked Fanno Flow 663

Application Spotlight: Shock-Wave/Boundary-Layer Interactions 667
Summary 668
References and Suggested Reading 669
Problems 669

### CHAPTER THIRTEEN: OPEN-CHANNEL FLOW 679

13–1 Classification of Open-Channel Flows 680
Uniform and Varied Flows 680
Laminar and Turbulent Flows in Channels 681
13–2 Froude Number and Wave Speed 683
Speed of Surface Waves 685
13–3 Specific Energy 687
13–4 Continuity and Energy Equations 690
13–5 Uniform Flow in Channels 691
Critical Uniform Flow 693
Superposition Method for Nonuniform Perimeters 693
13–6 Best Hydraulic Cross Sections 697
Rectangular Channels 699
Trapezoidal Channels 699
13–7 Gradually Varied Flow 701
Liquid Surface Profiles in Open Channels, $y(x)$ 703
Some Representative Surface Profiles 706
Numerical Solution of Surface Profile 708
13–8 Rapidly Varied Flow and Hydraulic Jump 709
13–9 Flow Control and Measurement 714
Underflow Gates 714
Overflow Gates 716

Summary 723
References and Suggested Reading 724
Problems 725

### CHAPTER FOURTEEN: TURBOMACHINERY 735

14–1 Classifications and Terminology 736
14–2 Pumps 738
Pump Performance Curves and Matching a Pump to a Piping System 739
Pump Cavitation and Net Positive Suction Head 745
Pumps in Series and Parallel 748
Positive-Displacement Pumps 751
Dynamic Pumps 754
Centrifugal Pumps 754
Axial Pumps 764
14–3 Pump Scaling Laws 773
Dimensional Analysis 773
Pump Specific Speed 775
Affinity Laws 777
14–4 Turbines 781
Positive-Displacement Turbines 782
Dynamic Turbines 782
Impulse Turbines 783
Reaction Turbines 785
14–5 Turbine Scaling Laws 795
Dimensionless Turbine Parameters 795
Turbine Specific Speed 797
Gas and Steam Turbines 800

Application Spotlight: Rotary Fuel Atomizers 802
Summary 803
References and Suggested Reading 803
Problems 804

### CHAPTER FIFTEEN: INTRODUCTION TO COMPUTATIONAL FLUID DYNAMICS 817

15–1 Introduction and Fundamentals 818
Motivation 818
Equations of Motion 818
Solution Procedure 819
Additional Equations of Motion 821
Grid Generation and Grid Independence 821
Boundary Conditions 826
Practice Makes Perfect 830

15–2 Laminar CFD Calculations 831
Pipe Flow Entrance Region at $Re = 500$ 831
Flow around a Circular Cylinder at $Re = 150$ 833
15–3 Turbulent CFD Calculations 840
Flow around a Circular Cylinder at $Re = 10,000$ 843
Flow around a Circular Cylinder at $Re = 10^7$ 844
Design of the Stator for a Vane-Axial Flow Fan 845
15–4 CFD with Heat Transfer 853
Temperature Rise through a Cross-Flow Heat Exchanger 853
Cooling of an Array of Integrated Circuit Chips 855
15–5 Compressible Flow CFD Calculations 860
Compressible Flow through a Converging–Diverging Nozzle 861
Oblique Shocks over a Wedge 865
15–6 Open-Channel Flow CFD Calculations 866
Flow over a Bump on the Bottom of a Channel 867
Flow through a Sluice Gate (Hydraulic Jump) 868

Application Spotlight: A Virtual Stomach 869
Summary 870
References and Suggested Reading 870
Problems 871

### APPENDIX 1: PROPERTY TABLES AND CHARTS (SI UNITS) 885

TABLE A–1 Molar Mass, Gas Constant, and Ideal-Gas Specfic Heats of Some Substances 886
TABLE A–2 Boiling and Freezing Point Properties 887
TABLE A–3 Properties of Saturated Water 888
TABLE A–4 Properties of Saturated Refrigerant-134a 889
TABLE A–5 Properties of Saturated Ammonia 890
TABLE A–6 Properties of Saturated Propane 891
TABLE A–7 Properties of Liquids 892
TABLE A–8 Properties of Liquid Metals 893
TABLE A–9 Properties of Air at 1 atm Pressure 894
TABLE A–10 Properties of Gases at 1 atm Pressure 895
TABLE A–11 Properties of the Atmosphere at High Altitude 897
FIGURE A–12 The Moody Chart for the Friction Factor for Fully Developed Flow in Circular Pipes 898
TABLE A–13 One-dimensional isentropic compressible flow functions for an ideal gas with $k = 1.4$ 899
TABLE A–14 One-dimensional normal shock functions for an ideal gas with $k = 1.4$ 900
TABLE A–15 Rayleigh flow functions for an ideal gas with $k = 1.4$ 901
TABLE A–16 Fanno flow functions for an ideal gas with $k = 1.4$ 902

### APPENDIX 2: PROPERTY TABLES AND CHARTS (ENGLISH UNITS) 903

TABLE A–1E Molar Mass, Gas Constant, and Ideal-Gas Specific Heats of Some Substances 904
TABLE A–2E Boiling and Freezing Point Properties 905
TABLE A–3E Properties of Saturated Water 906
TABLE A–4E Properties of Saturated Refrigerant-134a 907
TABLE A–5E Properties of Saturated Ammonia 908
TABLE A–6E Properties of Saturated Propane 909
TABLE A–7E Properties of Liquids 910
TABLE A–8E Properties of Liquid Metals 911
TABLE A–9E Properties of Air at 1 atm Pressure 912
TABLE A–10E Properties of Gases at 1 atm Pressure 913
TABLE A–11E Properties of the Atmosphere at High Altitude 915

Glossary 917
Index 931

# PREFACE

### BACKGROUND

Fluid mechanics is an exciting and fascinating subject with unlimited practical applications ranging from microscopic biological systems to automobiles, airplanes, and spacecraft propulsion. Yet fluid mechanics has historically been one of the most challenging subjects for undergraduate students. Unlike earlier freshman- and sophomore-level subjects such as physics, chemistry, and engineering mechanics, where students often learn equations and then “plug and chug” on their calculators, proper analysis of a problem in fluid mechanics requires much more. Oftentimes, students must first assess the problem, make and justify assumptions and/or approximations, apply the relevant physical laws in their proper forms, and solve the resulting equations before ever plugging any numbers into their calculators. Many problems in fluid mechanics require more than just knowledge of the subject, but also physical intuition and experience. Our hope is that this book, through its careful explanations of concepts and its use of numerous practical examples, sketches, figures, and photographs, bridges the gap between knowledge and proper application of that knowledge.

Fluid mechanics is a mature subject; the basic equations and approximations are well established and can be found in numerous introductory fluid mechanics books. The books are distinguished from one another in the way the material is presented. An accessible fluid mechanics book should present the material in a progressive order from simple to more difficult, building each chapter upon foundations laid down in previous chapters. In this way, even the traditionally challenging aspects of fluid mechanics can be learned effectively. Fluid mechanics is by its very nature a highly visual subject, and students learn more readily by visual stimulation. It is therefore imperative that a good fluid mechanics book also provide quality figures, photographs, and visual aids that help to explain the significance and meaning of the mathematical expressions.

### OBJECTIVES

This book is intended for use as a textbook in the first fluid mechanics course for undergraduate engineering students in their junior or senior year. Students are assumed to have an adequate background in calculus, physics, engineering mechanics, and thermodynamics. The objectives of this text are:
- To cover the *basic principles and equations* of fluid mechanics
- To present numerous and diverse real-world *engineering examples* to give students a feel for how fluid mechanics is applied in engineering practice
- To develop an *intuitive understanding* of fluid mechanics by emphasizing the physics, and by supplying attractive figures and visual aids to reinforce the physics

The text contains sufficient material to give instructors flexibility as to which topics to emphasize. For example, aeronautics and aerospace engineering instructors may emphasize potential flow, drag and lift, compressible flow, turbomachinery, and CFD, while mechanical and civil engineering instructors may choose to emphasize pipe flows and open-channel flows, respectively. The book has been written with enough breadth of coverage that it can be used for a two-course sequence in fluid mechanics if desired.

### PHILOSOPHY AND GOAL

We have adopted the same philosophy as that of the texts *Thermodynamics: An Engineering Approach* by Y. A. Çengel and M. A. Boles, *Heat Transfer: A Practical Approach* by Y. A. Çengel, and *Fundamentals of Thermal-Fluid Sciences* by Y. A. Çengel and R. H. Turner, all published by McGraw-Hill. Namely, our goal is to offer an engineering textbook that:
- Communicates directly to the minds of tomorrow’s engineers in a *simple yet precise* manner
- Leads students toward a clear understanding and firm grasp of the *basic principles* of fluid mechanics
- Encourages *creative thinking* and development of a *deeper understanding* and *intuitive feel* for fluid mechanics
- Is *read* by students with *interest* and *enthusiasm* rather than merely as an aid to solve problems

It is our philosophy that the best way to learn is by practice. Therefore, special effort is made throughout the book to reinforce material that was presented earlier (both earlier in the chapter and in previous chapters). For example, many of the illustrated example problems and end-of-chapter problems are *comprehensive*, forcing the student to review concepts learned in previous chapters.

Throughout the book, we show examples generated by *computational fluid dynamics* (CFD), and we provide an introductory chapter on CFD. Our goal is not to teach details about numerical algorithms associated with CFD—this is more properly presented in a separate course, typically at the graduate level. Rather, it is our intent to introduce undergraduate students to the capabilities and limitations of CFD as an *engineering tool*. We use CFD solutions in much the same way as we use experimental results from a wind tunnel test, i.e., to reinforce understanding of the physics of fluid flows and to provide quality flow visualizations that help to explain fluid behavior.

---

thermodynamic notation $\dot{V}$ for volume flow rate, thus reserving the notation $Q$ for heat transfer. Also, we consistently use an overdot to denote time rate. We think that both students and instructors will appreciate this effort to promote a common notation.

### A CHOICE OF SI ALONE OR SI/ENGLISH UNITS

In recognition of the fact that English units are still widely used in some industries, both SI and English units are used in this text, with an emphasis on SI. The material in this text can be covered using combined SI/English units or SI units alone, depending on the preference of the instructor. The property tables and charts in the appendices are presented in both units, except the ones that involve dimensionless quantities. Problems, tables, and charts in English units are designated by “E” after the number for easy recognition, and they can be ignored easily by the SI users.

### COMBINED COVERAGE OF BERNOULLI AND ENERGY EQUATIONS

The Bernoulli equation is one of the most frequently used equations in fluid mechanics, but it is also one of the most misused. Therefore, it is important to emphasize the limitations on the use of this idealized equation and to show how to properly account for imperfections and irreversible losses. In Chapter 5, we do this by introducing the energy equation right after the Bernoulli equation and demonstrating how the solutions of many practical engineering problems differ from those obtained using the Bernoulli equation. This helps students develop a realistic view of the Bernoulli equation.

### A SEPARATE CHAPTER ON CFD

Commercial Computational Fluid Dynamics (CFD) codes are widely used in engineering practice in the design and analysis of flow systems, and it has become exceedingly important for engineers to have a solid understanding of the fundamental aspects, capabilities, and limitations of CFD. Recognizing that most undergraduate engineering curriculums do not have room for a full course on CFD, a separate chapter is included here to make up for this deficiency and to equip students with an adequate background on the strengths and weaknesses of CFD.

### APPLICATION SPOTLIGHTS

Throughout the book are highlighted examples called *Application Spotlights* where a real-world application of fluid mechanics is shown. A unique feature of these special examples is that they are written by *guest authors*. The Application Spotlights are designed to show students how fluid mechanics has diverse applications in a wide variety of fields. They also include eye-catching photographs from the guest authors’ research.

### GLOSSARY OF FLUID MECHANICS TERMS

Throughout the chapters, when an important key term or concept is introduced and defined, it appears in **black boldface type**. Fundamental fluid mechanics terms and concepts appear in **blue boldface type**, and these fundamental terms also appear in a comprehensive end-of-book glossary developed by Professor James Brasseur of The Pennsylvania State University. This unique glossary is an excellent learning and review tool for students as they move forward in their study of fluid mechanics. In addition, students can test their knowledge of these fundamental terms by using the interactive flash cards and other resources located on our accompanying website ([www.mhhe.com/cengel](http://www.mhhe.com/cengel)).

### CONVERSION FACTORS

Frequently used conversion factors, physical constants, and frequently used properties of air and water at 20°C and atmospheric pressure are listed on the front inner cover pages of the text for easy reference.

### NOMENCLATURE

A list of the major symbols, subscripts, and superscripts used in the text are listed on the inside back cover pages of the text for easy reference.

### SUPPLEMENTS

These supplements are available to adopters of the book:

**STUDENT RESOURCES DVD**
Packaged free with every new copy of the text, this DVD provides a wealth of resources for students including Fluid Mechanics Videos, a CFD Animations Library, and EES Software.

**ONLINE LEARNING CENTER**
Web support is provided for the book on our Online Learning Center at [www.mhhe.com/cengel](http://www.mhhe.com/cengel). Visit this robust site for book and supplement information, errata, author information, and further resources for instructors and students.

**ENGINEERING EQUATION SOLVER (EES)**
Developed by Sanford Klein and William Beckman from the University of Wisconsin–Madison, this software combines equation-solving capability and engineering property data. EES can do optimization, parametric analysis, and linear and nonlinear regression, and provides publication-quality plotting capabilities. Thermodynamics and transport properties for air, water, and many other fluids are built-in and EES allows the user to enter property data or functional relationships.

**FLUENT FLOWLAB® SOFTWARE AND TEMPLATES**
As an integral part of Chapter 15, “Introduction to Computational Fluid Dynamics,” we provide access to a student-friendly CFD software package developed by Fluent Inc. In addition, we provide over 40 FLUENT FLOWLAB templates to complement the end-of-chapter problems in Chapter 15. These problems and templates are unique in that they are designed with both a fluid mechanics learning objective and a CFD learning objective in mind.

**INSTRUCTOR’S RESOURCE CD-ROM (AVAILABLE TO INSTRUCTORS ONLY)**
This CD, available to instructors only, offers a wide range of classroom preparation and presentation resources including an electronic solutions manual with PDF files by chapter, all text chapters and appendices as downloadable PDF files, and all text figures in JPEG format.

**COSMOS CD-ROM (AVAILABLE TO INSTRUCTORS ONLY)**
This CD, available to instructors only, provides electronic solutions delivered via our database management tool. McGraw-Hill’s COSMOS allows instructors to streamline the creation of assignments, quizzes, and tests by using problems and solutions from the textbook—as well as their own custom material.

### ACKNOWLEDGMENTS

The authors would like to acknowledge with appreciation the numerous and valuable comments, suggestions, constructive criticisms, and praise from the following evaluators and reviewers: [List of names omitted for brevity in transcription summary, but preserved in full text processing].

---
