# Razvojni plan MF1_udzbenika (svibanj 2026)

## Svrha dokumenta

Ovaj dokument vise nije plan nastanka integriranog proizvoda. Sada sluzi kao aktualni razvojni plan za vec postojeci `MF1_udzbenik`, koji je u ovoj fazi stabilna i kanonska baza za daljnji rad.

## Polaziste

1. `MF1_udzbenik` je potvrden kao glavni proizvod projekta.
2. `U00`, `U01-U13` i `D01-D03` postoje kao stvarna poglavlja i dodaci jedne Quarto knjige.
3. Teorija, izvodi, rijeseni primjeri, zadaci i zavrsni sazetci integrirani su u isti tok citanja.
4. Provedeni su veliki autorski i urednicki prolazi: zatvaranje prijenosa zadataka, otvaranje reprezentativnih `WE/CH` blokova, jezikoslovno ciscenje, interpunkcijski sweep i dodatno zbijanje glavnog teksta.
5. `vjezba_01.qmd` do `vjezba_13.qmd` ostaju netaknuti do sljedece akademske godine i ne ulaze u aktivni razvojni ciklus.
6. `MF1_teorijski_prirucnik` ostaje prijelazni donorski i referencijski sloj, ali vise nije glavni razvojni tok niti uvjet za citljivost udzbenika.

## Zakljucane odluke

1. Primarni proizvod je jedan integrirani udzbenik, a ne vise "skripta + prirucnik".
2. Kanonski izvori sadrzaja nalaze se u `MF1_udzbenik/source/`.
3. Javna struktura knjige vise se ne ravna prema povijesnim donorima, nego prema didaktickoj cjelini poglavlja `U00`, `U01-U13` i `D01-D03`.
4. Pomocna dokumentacija, matrice sparivanja i evidencije izvora ostaju interni tragovi provenijencije, a ne nova javna arhitektura knjige.
5. Svaka ozbiljna promjena na udzbeniku mora zavrsiti render-provjerom u `MF1_udzbenik`.
6. Sve dok traje ovaj nastavni ciklus, legacy vjezbe ostaju zamrznute.

## Faze koje su stvarno zatvorene

### Faza A - arhitektura i integracija

1. Kanonski projekt `MF1_udzbenik` je uspostavljen.
2. Quarto struktura za web i print tok je stabilna.
3. Glavni niz `U01-U13` i dodaci `D01-D03` postoje kao stvarni dijelovi knjige.

### Faza B - prijenos i autorska prerada zadataka

1. Skriptni, drugoslojni i treceslojni donorski korpusi urednicki su zatvoreni.
2. Povijesni prijenos vise se ne vodi kao otvoreni urednicki dug.
3. Novi zadaci od ovog trenutka predstavljaju novi autorski razvoj, a ne zatvaranje starog duga.

### Faza C - urednicka konsolidacija glavnog teksta

1. Uvodi, matematicki izvodi i prijelazi kroz poglavlja uskladeni su u pitkijem akademskom hrvatskom.
2. Dodani su stvarni inzenjerski konteksti i granice modela.
3. Proveden je interpunkcijski sweep i dodatno ciscenje skrivenih mini-potpoglavlja u prozi.

### Faza D - statusna i operativna sinkronizacija

1. Aktivna dokumentacija mora govoriti o odrzavanju i selektivnom jacanju, a ne o pilot-migraciji.
2. Ovaj dokument i pripadni statusni dokumenti dio su tog sinkronizacijskog sloja.

## Aktivna razvojna faza

Projekt je sada u fazi planskog odrzavanja i selektivnog jacanja. To znaci da vise nije prioritet "napuniti" knjigu pod svaku cijenu, nego sustavno dizati kvalitetu vec postojecih poglavlja.

## Operativni prioriteti

1. Odrzavati `D01-D03` uskladenima s aktivnom notacijom, terminologijom i tipicnim pogreskama iz glavnog niza `U01-U13`.
2. Dalje fino kalibrirati tezinske oznake `T1-T4` i raspored blokova `WE`, `GP`, `PO` i `CH` bez mehanickog izjednacavanja svih poglavlja.
3. Selektivno dodavati samo one nove zadatke, primjere i skice koji zatvaraju stvarnu didakticku rupu ili znacajno dizu inzenjerski karakter poglavlja.
4. Odrzavati vizualni standard skica, posebno u print-first i grayscale rezimu.
5. Periodicki raditi puni `quarto render` i odrzavati knjigu proizvodno cistom.
6. Nakon nastavnog ciklusa odluciti treba li dodatno konsolidirati legacy slojeve izvan `MF1_udzbenik`.

## Sto sada nije prioritet

1. Novo masovno preslagivanje starih donor-dokumenata.
2. Paralelno uredjivanje istog teorijskog bloka u zasebnom prirucniku i u aktivnom `uXX` chapteru.
3. Diranje `vjezba_01.qmd` do `vjezba_13.qmd` prije kraja nastavnog ciklusa.
4. Kozmeticko ciscenje repozitorija koje ne pomaze kvaliteti samog udzbenika.

## Operativna pravila rada

1. Novi glavni tekst ide u `MF1_udzbenik/source/`.
2. Quarto omotaci u `MF1_udzbenik/chapters/` mijenjaju se samo kad je potrebna stvarna promjena strukture ili redoslijeda knjige.
3. Asseti se odrzavaju u `MF1_udzbenik/assets/` i moraju ostati dosljedni print-first standardu.
4. Evidencije izvora i radne matrice ostaju povijesni trag i osiguranje provenijencije.
5. Zatvaranje promjene provjerava se naredbom `Set-Location 'c:\Users\mandr\Desktop\MF1_github\MF1_udzbenik'; quarto render`.

## Definicija uspjeha za ovaj ciklus

Ovaj razvojni ciklus smatra se uspjesnim ako vrijedi sljedece:

1. `MF1_udzbenik` ostaje jedini kanonski i proizvodno cist izvor udzbenika.
2. Aktivna dokumentacija govori istim jezikom kao i stvarno stanje projekta.
3. Dodaci `D01-D03` ostaju sinkroni s glavnim poglavljima.
4. Novi rad, kad se otvori, ide kao selektivno autorsko jacanje poglavlja, a ne kao povratak na migracijski backlog.
5. Legacy vjezbe ostaju stabilne do trenutka kada se bude smjelo otvoriti njihov zasebni ciklus prerade.