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
  - *V1 (Pascal/Newton):* Vizualna usporedba hidrauličke multiplikacije sile i profila brzine kod viskoznog trenja.
  - *V3 (Statika):* Widget za manometarski balans te vektorski prikaz efektivne gravitacije u ubrzanim sustavima.
- **Humanizacija (index.qmd):** Redizajniran predgovor. Suhoparni tehnički opis zamijenjen je motivirajućim, "ljudskim" tekstom koji potiče inženjersku intuiciju kroz igru s parametrima.
- **Tehnički remont V3:** Riješen kritičan problem s uvlakama u `vjezba_03.qmd` koji je uzrokovao loš ispis zadataka (Markdown kôd-blokovi umjesto teksta).
- **GitHub Automatizacija:** Sve promjene su uspješno commitane i pushane na repozitorij uz sinkronizaciju svih popratnih widgeta.

### 4. UI/UX i Tehnička optimizacija
- **Moderni UI:** Uveden `Inter` font, gradijenti, glassmorphism efekti i "Dark Mode Dashboard" za rezultate.
- **Fizikalna intuitivnost:** Svaki widget sada sadrži "Fizikalni uvid" ili "Savjet" (💡) koji povezuje sliku s teorijom.

## Tehničke napomene
- **Canvas Clipping:** Korištenje `ctx.clip()` za realističan prikaz tekućine unutar spremnika bez obzira na kut nagiba.
- **Vektorska grafika:** Implementirane funkcije za dinamičko iscrtavanje vektora s "glow" efektima i automatskim labeliranjem.
- **Kontekstna izolacija:** Svaki widget radi u vlastitom `IIFE` bloku kako bi se izbjegli konflikti varijabli.
