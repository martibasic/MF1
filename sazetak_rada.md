# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti, robusnosti interaktivnih elemenata te automatizaciji objave materijala na webu.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1 - 13)
- **Potpuna sinkronizacija:** Tekstovi svih zadataka, odjeljci "Zadano" i "Odrediti" u svih 13 vježbi usklađeni su s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija LaTeX formula, integracijskih postupaka i termodinamičkih veza kroz cijelu skriptu.

### 2. Implementacija i redizajn interaktivnih widgeta

#### Vježba 1 (Temelji i Viskoznost)
- **Hidraulična dizalica:** Live prikaz mehaničke prednosti.
- **Stlačivost:** Simulator čestica ovisan o tlaku.
- **Profil brzine:** Dinamički prikaz strujanja fluida.

#### Vježba 2 (Viskoznost i Površinska napetost) - **Veliki redizajn**
- **Okretni moment (Z10):** Interaktivna geometrijska analiza s **tlocrtnim profilom brzine** i gradijentom strelica u zračnosti.
- **Rotacijsko trenje (Z11):** Napredni simulator s odabirom ulja (SAE 10W, 30, 50), **simulacijom zagrijavanja** i animiranim česticama u zazoru.
- **Kapilarnost (Z12):** Usporedni prikaz vode i žive s animacijom penjanja/spuštanja i meniskusa.
- **Plutajuće kuglice (Z15):** Dinamički balans sila (Težina vs. Površinska napetost) s detekcijom tonjenja.
- **Bonus Reologija:** Simulator Nenjutnovskih fluida (Shear-thinning/thickening) s česticama.

#### Vježba 3 (Statika i Ubrzani spremnici)
- **Diferencijalni manometri (Z23, Z24, Z27):** Dinamički profili tlaka s automatskim skaliranjem.
- **Instrumenti (Z26, Z30):** Nagnuti manometar i Areometar s efektom uvećanja.
- **Ubrzani sustavi (Z31, Z32, Z33):** Heatmape tlaka, izobare i vizualizacija kavitacije.

#### Vježba 4 (Rotacija i Translacija)
- **Rotacijski paraboloid:** 2.5D izometrijski prikaz sa "Spin-up" animacijom.
- **Rotirajući prsten:** Vizualizacija formiranja suhog dna ($r_0$).

### 3. Dinamika fluida i napredni koncepti (Vježbe 8 - 13)
- **Kontinuitet i Bernoulli:** Vizualizacija strujnica, energetskih (EGL) i piezometrijskih (HGL) linija.
- **Mjerni uređaji:** Interaktivna Pitot-statička cijev i Venturijev efekt.
- **Impuls sile:** Udar mlaza na Pelton lopatice i optimizacija snage turbine ($w=v/2$).
- **Gubici u cijevima (V13):** Vizualizacija režima strujanja (Laminarno vs. Turbulentno) s vrtlozima i profilima brzine.

### 4. UI/UX i Tehnička optimizacija
- **Custom CSS:** Kreiran `custom.css` za bolju tipografiju, prozračnost teksta i jasan razmak oko formula.
- **Sidebar TOC:** Uklonjen desni izbornik kako bi interaktivni widgeti dobili maksimalan prostor na ekranu.
- **Responzivnost:** Svi widgeti su prilagođeni za različite širine ekrana (Responsive Design).
- **GitHub Actions:** Sustav za automatsko renderiranje i objavu na **GitHub Pages**.

## Tehničke napomene
- **Stabilnost:** Uvedena unikatna imena za JS kontekste (Context Isolation) čime su eliminirane `ReferenceError` pogreške.
- **Performanse:** Korištenje `requestAnimationFrame` za glatke 60 FPS simulacije.
- **Robustnost:** Riješen problem Markdown parsiranja dodavanjem praznih redova oko HTML blokova.
