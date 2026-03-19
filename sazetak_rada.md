# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti, robusnosti interaktivnih elemenata te automatizaciji objave materijala na webu.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1, 3 i 4)
- **Sinkronizacija tekstova:** Tekstovi zadataka i detaljna rješenja usklađeni su s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija LaTeX formula, integracijskih postupaka i termodinamičkih veza (pV=mRT).

### 2. Implementacija i profinjenje interaktivnih widgeta

#### Vježba 1 (Temelji i Viskoznost)
- **Hidraulična dizalica:** Live prikaz mehaničke prednosti.
- **Stlačivost:** Simulator čestica ovisan o tlaku.
- **Profil brzine:** Dinamički prikaz strujanja fluida.

#### Vježba 3 (Statika i Ubrzani spremnici) - **Glavni redizajn**
- **Diferencijalni manometri (Z23, Z24, Z27):** 
    - Dinamički profili tlaka s **automatskim skaliranjem** (uvijek unutar okvira).
    - Vizualizacija **vektora sila tlaka** i numeričkih podataka na sučeljima.
- **Specijalni manometri i instrumenti (Z26, Z30):**
    - **Nagnuti manometar:** Povećan i centriran prikaz s live "rastezanjem" skale (osjetljivost).
    - **Areometar:** Uvećani model s **Zoom efektom na meniskus** za milimetarsku preciznost.
- **Termalni efekti (Z29):** Redizajniran spoj naftovoda i spremnika s animacijom čestica (idealni plin).
- **Ubrzani sustavi (Z31, Z32, Z33):**
    - **Heatmape i izobare:** Puni 2D profil tlaka s interaktivnom sondom.
    - **Kavitacija:** Vizualno upozorenje pri niskim tlakovima.

#### Vježba 4 (Rotacija i Translacija)
- **Rotacijski paraboloid:** 2.5D izometrijski prikaz sa "Spin-up" animacijom.
- **Rotirajući prsten:** Vizualizacija formiranja suhog dna ($r_0$).

### 3. Napredni koncepti i Sile na stijenke (N1-N8)
- **Stabilnost plovnih tijela (N1):** Proračun metacentra (M) i stabilnosti broda.
- **Radialni dijagrami tlaka (N6, N7, N8):** 
    - Implementiran vizualni jezik iz widgeta N3 (trokut tlaka) na zakrivljene plohe.
    - Prikaz **radijalne lepeze vektora tlaka** koji su uvijek okomiti na luk.
    - Dokaz da rezultanta kružnog luka uvijek prolazi kroz **centar zakrivljenosti**.
    - Vizualizacija nultog momenta kod radijalnih zatvarača.

### 4. Automatizacija i GitHub
- **Git integracija:** Postavljen repozitorij i konfiguriran Personal Access Token (PAT).
- **GitHub Actions:** Postavljen sustav za automatsko renderiranje i objavu na **GitHub Pages**.
- **Optimizacija:** Skripta prilagođena isključivo HTML formatu radi podrške za JS widgete.

## Tehničke napomene
- **Robustnost:** Uveden "clamping" i auto-skaliranje kako grafovi ne bi izlazili iz vidnog polja.
- **Performanse:** Korištenje `requestAnimationFrame` za glatke simulacije.
- **UI standard:** Primjena modernog dizajna (Segoe UI, sjenčanje, prozirnost) kroz cijeli dokument.
