# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti, robusnosti interaktivnih elemenata te automatizaciji objave materijala na webu.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1 - 13)
- **Potpuna sinkronizacija:** Tekstovi svih zadataka, odjeljci "Zadano" i "Odrediti" u svih 13 vježbi usklađeni su s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija LaTeX formula, integracijskih postupaka i termodinamičkih veza kroz cijelu skriptu.

### 2. Sesija: Masovna implementacija i vizualno poliranje (Vježbe 4 - 13)
U ovoj sesiji fokus je bio na popunjavanju preostalih vježbi interaktivnim sadržajem uz podizanje estetske razine cijelog portala.
- **Vježba 4 (Relativno mirovanje):** Dodan widget "Efektivna gravitacija" i 3D Paraboloid Tlaka.
- **Vježba 5 - 7 (Statika):** Nakošena zaklopka (Z42) i Arc Explorer (V7) za analizu sila na zakrivljene plohe.
- **Vježba 8 - 13 (Dinamika):** Venturijeva cijev, energetski gubici (Moody), propulzija i nestacionarno pražnjenje.

### 3. Sesija: Finalizacija i humanizacija (Vježba 1 - 3)
Ova sesija zaokružila je cjelinu dodavanjem uvodnih koncepata i prilagodbom tona skripte studentima.
- **Fizikalni uvodi:** Implementirani interaktivni "pre-lab" widgeti na početak Vježbi 1 i 3.
- **Humanizacija (index.qmd):** Redizajniran predgovor koji potiče inženjersku intuiciju.
- **Tehnički remont V3:** Riješen problem s formatiranjem Markdown kôd-blokova.

### 4. Sesija: Premium remont statike (Vježbe 5, 6 i 7)
Najnovija sesija donijela je dubinsku nadogradnju ključnih poglavlja statike s fokusom na fizikalnu intuiciju i matematičku transparentnost.
- **Vježba 5 (Ravne plohe):** 
    - Implementirane **integracijske animacije** (Z45, Z46) koje vizualiziraju sumiranje diferencijalnih sila $dF$.
    - Novi widgeti za nagnute zaklopke s izračunom reakcija u zglobovima i momentnom ravnotežom.
    - Specijalizirani prikazi za krug i polukrug s automatskim koracima proračuna.
- **Vježba 6 (Zakrivljene plohe 1):** 
    - Dodana **dekompozicija volumena** na stvarne i zamišljene komponente uz vizualno šrafiranje.
    - Interaktivni grafikon ovisnosti uzgona o tlaku (Z53) i simulacija prevrtanja ledenjaka uslijed asimetrije topljenja (Z54).
- **Vježba 7 (Zakrivljene plohe 2):** 
    - Implementiran **Arc Explorer** s draggable selektorom luka za analizu sila na bilo kojem dijelu kružnice.
    - **3D Intuicija:** Polarni grafikon rezultante $F_R$ u ovisnosti o kutu uranjanja cilindra.
    - Vizualizacija tlačnog polja pomoću normalnih vektora koji se sumiraju u komponente $F_H$ i $F_V$.

### 5. UI/UX i Tehnička optimizacija
- **MF1 Standard:** Potpuna primjena `Inter` fonta, glassmorphism efekata i modernih gradijenata na sve widgete.
- **Fizikalna intuitivnost:** Svaki widget sadrži legendu, dinamičke formule i "Fizikalni uvid" (💡).
- **Kontekstna izolacija:** Korištenje IIFE blokova osigurava stabilnost skripte bez obzira na broj elemenata na stranici.

## Tehničke napomene
- **Integracija i Animacija:** Korištenje `setInterval` za glatke prikaze integracije i fizikalnih kretanja (npr. otvaranje zaklopki).
- **Vektorska grafika:** Dinamičko skaliranje vektora sila u stvarnom vremenu s vizualnim "glow" efektima.
- **GitHub Automatizacija:** Kontinuirana sinkronizacija i commitanje promjena na repozitorij.
