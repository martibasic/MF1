# Sažetak rada na interaktivnoj skripti: Mehanika fluida 1

## Pregled projekta
Glavni cilj bio je transformirati statične `.qmd` datoteke vježbi u interaktivno edukacijsko iskustvo. Fokus je bio na vizualizaciji fizikalnih procesa, rješavanju problema vidljivosti, robusnosti interaktivnih elemenata te automatizaciji objave materijala na webu.

## Ključne aktivnosti

### 1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1 - 13)
- **Potpuna sinkronizacija:** Tekstovi svih zadataka, odjeljci "Zadano" i "Odrediti" u svih 13 vježbi usklađeni su s originalnim PDF materijalima.
- **Matematička preciznost:** Implementacija LaTeX formula, integracijskih postupaka i termodinamičkih veza kroz cijelu skriptu.

### 2. Sesija: Premium remont statike (Vježbe 5, 6 i 7)
- **Vježba 5 (Ravne plohe):** Implementirane integracijske animacije, novi widgeti za nagnute zaklopke i specijalizirani prikazi za krug/polukrug.
- **Vježba 6 (Zakrivljene plohe 1):** Dodana dekompozicija volumena, interaktivni grafikon uzgona i simulacija prevrtanja ledenjaka.
- **Vježba 7 (Zakrivljene plohe 2):** Implementiran Arc Explorer, polarni prikaz rezultante i vizualizacija tlačnog polja.

### 3. Sesija: Premium remont kontinuiteta i Bernoullija (Vježbe 8 i 9)
- **Vježba 8 (Kontinuitet):** Premium widgeti za difuzore (Z70), miješanje (Z71), spremnike s razinom (Z72), višefazne sustave (Z73), aerotunel (Z74) i koaksijalno miješanje (Z75).
- **Vježba 9 (Idealni Bernoulli):** Implementirani widgeti za laminarni profil (Z77), pumpni sustav (Z80-81), te sifon s kavitacijom (Z83-85). Nadograđen domet mlaza (Z76) na prikaz više putanja.

### 4. Sesija: Masovni remont realnih fluida i impulsa (Vježbe 10 - 13)
Ova sesija donijela je najveći broj premium vizualizacija usmjerenih na gubitke i količinu gibanja.
- **Vježba 10 (Realni Bernoulli):** Darcy-Weisbach Explorer, sifon s gubicima (Z86), sapnica (Z87), Pitotova cijev (Z90), višefazno istjecanje (Z91), Vena Contracta (Z92) i Venturi ejektor (Z94).
- **Vježba 11 (Impuls 1):** Kinematika dva mlaza (Z98), rotirajući spremnik (Z99), udar mlaza u ploču (Z102) i vjetroturbina s Betzovim limitom (Z103).
- **Vježba 12 (Impuls 2):** Sila na prirubnici ventila (Z105), moment savijanja konzolne cijevi (Z106) i sila na ustavu (Z110).
- **Vježba 13 (Cjevovodi):** Temperaturna ovisnost laminarnog toka (Z120), difuzor s odvajanjem struje (Z122), budžet gubitaka (Z123) i raspodjela u paralelnim granama (Z124).

### 5. UI/UX i tehnička optimizacija
- **MF1 Standard:** Potpuna primjena `Inter` fonta, glassmorphism efekata, modernih gradijenata i tamnih dashboarda za rezultate.
- **Fizikalna intuitivnost:** Svaki widget sadrži legendu, dinamičke formule i "Fizikalni uvid".
- **Reologija:** Dodan premium vizualizator nenewtonskih fluida (V2) za usporedbu pseudoplastičnih i dilatantnih materijala.

## Tehničke napomene
- **Quarto provjera:** Sve vježbe (1-13) su uspješno renderirane i verificirane.
- **GitHub automatizacija:** Kontinuirana sinkronizacija i osiguranje UTF-8 kodiranja za sve datoteke.
- **Premium Standard:** Svi widgeti koriste IIFE izolaciju i `requestAnimationFrame` za fluidne animacije.
