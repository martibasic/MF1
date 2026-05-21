# Interni README - MF1 repozitorij (svibanj 2026)

Ovaj README vise nije plan za odvojenu skriptu i zaseban teorijski prirucnik. Sluzi kao kratki operativni presjek stvarnog stanja repozitorija nakon sto je `MF1_udzbenik` postao kanonski proizvod.

## Trenutni raspored projekta

1. `MF1_udzbenik/` je jedini aktivni i kanonski izvor integriranog udzbenika MF1.
2. `vjezba_01.qmd` do `vjezba_13.qmd` ostaju zamrznuti nastavni materijal do sljedece akademske godine i ne sluze kao aktivna meta razvoja.
3. `MF1_teorijski_prirucnik/` i javni root blokovi `prirucnik/` ostaju prijelazni i referencijski izvori; nisu vise glavni razvojni tok.
4. Root `_site/` i `_book/` su renderirani izlazi starijeg javnog sloja, a ne izvor istine za udzbenik.

## Sto je stvarno zatvoreno u udzbeniku

1. `U00`, `U01-U13` i `D01-D03` postoje kao stvarni dijelovi jedne Quarto knjige u `MF1_udzbenik`.
2. Teorija, izvedbe, rijeseni primjeri i zadaci sada zive u istim poglavljima.
3. Poglavlja imaju uvodni inzenjerski kontekst, fizikalni uvod, matematicki izvod, rijesene primjere, zadatke za vjezbu i zavrsni sazetak.
4. Provedeni su veliki urednicki prolazi: prijenos i prerada zadataka, jezikoslovno i interpunkcijsko ciscenje, ujednacavanje tehnickog hrvatskog i dodatno zbijanje toka poglavlja.
5. Vizualni standard skica i vjezbenih blokova podignut je do stabilnog print-first stanja.
6. Puni `quarto render` za `MF1_udzbenik` prolazi bez greske, a editor checkovi su cisti.

## Gdje se sada stvarno radi

- `MF1_udzbenik/README.md` - ulaz u kanonski radni folder udzbenika
- `MF1_udzbenik/source/` - kanonski tekstovi poglavlja i dodataka
- `MF1_udzbenik/chapters/` - Quarto omotaci za web i print tok
- `MF1_udzbenik/assets/` - skice, staticke ilustracije i pomocni graficki asseti
- `MF1_udzbenik/status_izrade_udzbenika.md` - aktualni statusni presjek
- `MF1_udzbenik/plan_prijenosa_zadataka.md` - zakljuceni status prijenosa i pravila za buduce dopune
- `MF1_udzbenik/protokol_prerade_zadataka_i_skica.md` - aktivni protokol za svaku novu preradu zadatka ili skice

## Orijentacija po folderima

- `private/README.md` - ulaz u interni radni i arhivski sloj
- `MF1_teorijski_prirucnik/README.md` - referencijski zaseban prirucnicki projekt
- `prirucnik/README.md` - legacy lokalna kopija starijeg prirucnickog sloja

## Operativna pravila za ovaj ciklus

1. Ne otvarati `vjezba_01.qmd` do `vjezba_13.qmd`, osim ako se kasnije donese nova eksplicitna odluka nakon nastavnog ciklusa.
2. Novi sadrzaj, nove skice i sve ozbiljne urednicke promjene idu izravno u `MF1_udzbenik`.
3. Donorske izvore i stare prirucnike treba koristiti kao reference i evidenciju, a ne kao novu paralelnu javnu arhitekturu.
4. Nakon svake vece promjene u udzbeniku zavrsni check je `Set-Location 'c:\Users\mandr\Desktop\MF1_github\MF1_udzbenik'; quarto render`.

## Najblizi prioriteti

1. Odrzavati `D01-D03` sinkronima s aktivnom notacijom i terminologijom glavnih poglavlja.
2. Dalje fino kalibrirati tezinske oznake, raspored zadataka i selektivne `T3/T4` integracijske blokove samo ondje gdje stvarno dizu knjigu.
3. Selektivno podizati vizualni standard skica i print/PDF stabilnost.
4. Nakon nastavnog ciklusa odluciti treba li dodatno konsolidirati ili ugasiti prijelazne teorijske slojeve izvan `MF1_udzbenik`.

## Datum zadnje sinkronizacije

Ovaj README je uskladen sa stvarnim stanjem repozitorija u svibnju 2026., nakon sto je `MF1_udzbenik` potvrden kao glavni proizvod i nakon zavrsnih urednickih prolaza kroz sadrzaj `U01-U13`.