# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti i robusnosti interaktivnih elemenata.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1, 3 i 4)
- **Sinkronizacija tekstova:** Tekstovi zadataka, sekcije "Zadano", "Odrediti" i detaljna rješenja u potpunosti su usklađeni s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija složenih LaTeX izvedbi formula, integracijskih postupaka i termodinamičkih veza (idealni plin).

### 2. Implementacija i profinjenje interaktivnih widgeta

#### Vježba 1 (Temelji i Viskoznost)
- **Hidraulična dizalica:** Interaktivna poluga s live prikazom mehaničke prednosti.
- **Stlačivost:** Simulator čestica s brzinom koja ovisi o tlaku.
- **Profil brzine:** Dualni laboratorij (brzina vs. naprezanje) s animiranim česticama.
- **Newtonov zakon:** Vizualizacija deformacije slojeva fluida ("špil karata").

#### Vježba 3 (Statika i Ubrzani spremnici) - **Glavni redizajn**
- **Diferencijalni manometri (Z23, Z24, Z27):** 
    - Dinamički profili tlaka s **automatskim skaliranjem** (uvijek unutar okvira).
    - Vizualizacija **vektora sila tlaka** i točnih vrijednosti na sučeljima fluida.
    - Usporedni prikaz mješovitih slojeva vs. ekvivalentni stupac žive (vizualizacija gustoće).
- **Specijalni manometri i instrumenti (Z26, Z30):**
    - **Nagnuti manometar:** Usporedba s vertikalnim u realnom vremenu uz live prikaz "rastezanja" skale (osjetljivost).
    - **Areometar:** Uvećani model s **Zoom efektom na meniskus** za milimetarsku preciznost očitanja.
- **Termalni efekti (Z29):** 
    - Spoj naftovoda i spremnika zraka s animacijom čestica čija brzina ovisi o temperaturi (pV=mRT).
    - Animacija hlađenja i "povlačenja" žive u manometru.
- **Ubrzani sustavi (Z31, Z32, Z33):**
    - **Orijentacija:** Side-by-side usporedba duge i kratke strane spremnika u smjeru vožnje.
    - **Heatmape:** Puni 2D profil tlaka s numeričkim sondama u kutovima i vektorom $g_{eff}$.
    - **Zatvorena cisterna:** Interaktivna sonda za lokalni tlak i vizualizacija **nagnutih izobara** uz upozorenje na kavitaciju.

#### Vježba 4 (Rotacija i Translacija)
- **Kolica na kosini:** Vektorski dijagram sila uz live tablicu s četiri metode proračuna.
- **Rotacijski paraboloid:** 2.5D izometrijski prikaz sa "Spin-up" animacijom.
- **Rotirajući prsten:** Vizualizacija "suhog dna" s izračunom polumjera $r_0$.

### 3. Novi modul: Napredni koncepti statike fluida
Dodano je 8 specijaliziranih widgeta za dubinsko razumijevanje:
- **Stabilnost (N1):** Dinamički proračun metacentarske visine (M) i točke težišta (G) za stabilnost broda.
- **Paradoksi (N2):** Pascalov princip kroz sustav spojenih posuda različitih oblika.
- **Sile na stijenke (N3, N6, N7, N8):**
    - Vizualizacija **trokutastog opterećenja** na ravne brane.
    - **Radialna lepeza tlaka** na zakrivljene i kompozitne stijenke.
    - Dokaz da rezultanta kružnog luka uvijek prolazi kroz centar zakrivljenosti.
    - Fizika sektorskih zatvarača (nulti moment oko ležaja).
- **Dinamika (N4, N5):** 
    - **Sloshing:** Simulacija oscilacija tekućine pri naglom kočenju.
    - **Atmosfera:** Eksponencijalni pad tlaka s visinom (Barometarska formula).

## Tehničke napomene
- **Robustnost:** Uveden "clamping" i auto-skaliranje kako grafovi i modeli ne bi izlazili iz vidnog polja.
- **Performanse:** Korištenje `requestAnimationFrame` za glatke simulacije sloshinga i čestica.
- **UI standard:** Dosljedna primjena modernog UI dizajna (Segoe UI, sjenčanje, prozirnost) kroz cijeli dokument.
