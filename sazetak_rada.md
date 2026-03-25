# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti, robusnosti interaktivnih elemenata te automatizaciji objave materijala na webu.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1 - 13)
- **Potpuna sinkronizacija:** Tekstovi svih zadataka, odjeljci "Zadano" i "Odrediti" u svih 13 vježbi usklađeni su s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija LaTeX formula, integracijskih postupaka i termodinamičkih veza kroz cijelu skriptu.

### 2. Sesija: Masovna implementacija i vizualno poliranje (Vježbe 4 - 13)
U ovoj sesiji fokus je bio na popunjavanju preostalih vježbi interaktivnim sadržajem uz podizanje estetske razine cijelog portala.

#### Vježba 4 (Relativno mirovanje - Redizajn)
- **Teorijski uvod:** Dodan widget "Efektivna gravitacija" na sam početak koji vizualno objašnjava Eulerovu jednadžbu zbrajanjem vektora $g$ i $-a$.
- **Laboratorij kolica:** Potpuni vizualni redizajn s gradijentima vode, clipping efektima i oznakama svih karakterističnih točaka (1, 2, 3, 4, E).
- **Centrifugalni manometar (Z36):** Izuzetno intuitivan prikaz s "brdašcima tlaka", strelicama sila Fc i objašnjenjem ravnoteže gustoća.
- **3D Paraboloid Tlaka:** Moderni 2.5D prikaz u svijetloj temi s prozirnim volumenima isobara, tooltipom za tlak u prostoru i "spin-up" animacijom.
- **Usporedni panel:** Fizikalno unaprijeđen prikaz mirovanja, translacije i rotacije s vektorskom analizom u realnom vremenu.

#### Vježba 5 - 7 (Statika i Zakrivljene plohe)
- **Nakošena zaklopka (Z42):** Interaktivni rješavač s momentnom ravnotežom oko zgloba.
- **Arc Explorer (V7):** Alat za slobodno definiranje kružnog luka i analizu nastanka horizontalne i vertikalne komponente sile kroz projekcije.

#### Vježba 8 - 13 (Dinamika i Realni fluidi)
- **Venturijeva cijev (V9):** Vizualizacija mjerenja protoka pomoću pada tlaka i manometarskih stupaca.
- **Energetski gubici (V10):** Usporedni prikaz Idealnog vs. Realnog fluida s jasnim padom EGL i HGL linija.
- **Spojeni spremnici (V11):** Simulator nestacionarnog pražnjenja s dinamičkim grafikonima razina tekućine.
- **Propulzija (V12):** Implementacija Tsiolkovskyjeve raketne jednadžbe s animacijom potrošnje goriva i logaritamskim grafom.
- **Moodyjev Dijagram (V13):** Potpuno funkcionalni interaktivni dijagram s Colebrook-White rješavačem i praćenjem radne točke.

### 3. UI/UX i Tehnička optimizacija
- **Moderni UI:** Uveden `Inter` font, gradijenti, glassmorphism efekti i "Dark Mode Dashboard" za rezultate.
- **Fizikalna intuitivnost:** Svaki widget sada sadrži "Fizikalni uvid" ili "Savjet" koji povezuje sliku s teorijom.
- **Stabilnost i Objava:** Riješeni problemi dupliciranja koda i ispravno formatirani HTML blokovi. Sve promjene su uspješno objavljene na **GitHubu**.

## Tehničke napomene
- **Canvas Clipping:** Korištenje `ctx.clip()` za realističan prikaz tekućine unutar spremnika bez obzira na kut nagiba.
- **Vektorska grafika:** Implementirane funkcije za dinamičko iscrtavanje vektora s "glow" efektima i automatskim labeliranjem.
- **Kontekstna izolacija:** Svaki widget radi u vlastitom `IIFE` bloku kako bi se izbjegli konflikti varijabli.
