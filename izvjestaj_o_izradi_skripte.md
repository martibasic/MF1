# Izvještaj o izradi interaktivne skripte: Mehanika fluida 1

Datum: 2026-03-31

## 1. Svrha i cilj projekta

Glavni cilj projekta bio je transformirati statične `.qmd` datoteke vježbi u cjelovito interaktivno edukacijsko iskustvo za kolegij **Mehanika fluida 1**. U izradi skripte naglasak je stavljen na:

- vizualizaciju fizikalnih procesa i zakonitosti,
- jasnije i intuitivnije razumijevanje zadataka kroz interaktivne prikaze,
- rješavanje problema vidljivosti i robusnosti interaktivnih elemenata,
- matematičku i sadržajnu preciznost,
- automatizaciju objave i tehničku stabilnost portala,
- dosljednu primjenu jedinstvenog MF1 vizualnog i funkcionalnog standarda.

Projektna namjera nije bila samo digitalizirati postojeće materijale, nego ih nadograditi u skriptu koja studentima omogućuje aktivno istraživanje promjene parametara, neposredno praćenje posljedica tih promjena i bolji fizički uvid u obrađene teme.

## 2. Opći opseg izvedenih radova

Tijekom rada provedeno je sveobuhvatno ažuriranje sadržaja i funkcionalnosti kroz **Vježbe 1 - 13**, uz završnu verifikaciju cijelog sustava. Izvedeni radovi obuhvatili su:

- potpunu sinkronizaciju tekstova zadataka, odjeljaka **"Zadano"** i **"Odrediti"** s originalnim PDF materijalima,
- implementaciju i doradu velikog broja premium interaktivnih widgeta,
- ugradnju LaTeX formula, integracijskih postupaka i relevantnih termodinamičkih i mehaničkih veza,
- standardizaciju korisničkog sučelja i rezultatskih prikaza,
- tehničku stabilizaciju kroz izolirane skriptne blokove i optimizirane animacije,
- pripremu materijala za web objavu i kontinuiranu sinkronizaciju.

Posebno je važno da je kroz završnu fazu rada implementirano **više od 20 novih premium widgeta**, najvećim dijelom u vježbama 9 - 13, uz dodatne nadogradnje ranijih poglavlja.

## 3. Sadržajna i funkcionalna nadogradnja po cjelinama

### 3.1. Sveobuhvatno ažuriranje sadržaja (Vježbe 1 - 13)

Na razini cijele skripte provedena je potpuna sadržajna usklađenost s izvornim materijalima. Time je osigurano da tekstovi zadataka, tražene veličine i prateći matematički izrazi vjerno odgovaraju službenim PDF predlošcima i rješenjima.

Matematička preciznost dodatno je ojačana implementacijom:

- LaTeX formula kroz cijelu skriptu,
- prikaza integracijskih postupaka ondje gdje su fizički i didaktički važni,
- termodinamičkih i hidromehaničkih veza u odgovarajućim zadacima.

### 3.2. Premium remont statike (Vježbe 5, 6 i 7)

U statičkim cjelinama provedena je velika nadogradnja s ciljem da se raspodjela tlaka, rezultantne sile i geometrijski utjecaji prikažu vizualno i intuitivno.

#### Vježba 5 - Ravne plohe

Implementirano je:

- integracijske animacije,
- novi widgeti za nagnute zaklopke,
- specijalizirani prikazi za krug i polukrug.

#### Vježba 6 - Zakrivljene plohe 1

Dodano je:

- dekompozicija volumena,
- interaktivni grafikon uzgona,
- simulacija prevrtanja ledenjaka.

#### Vježba 7 - Zakrivljene plohe 2

Implementirano je:

- **Arc Explorer**,
- polarni prikaz rezultante,
- vizualizacija tlačnog polja.

### 3.3. Premium remont kontinuiteta i Bernoullija (Vježbe 8 i 9)

U ovim poglavljima fokus je bio na jačanju veze između jednadžbi kontinuiteta, energetskih odnosa i fizikalnog ponašanja sustava.

#### Vježba 8 - Kontinuitet

Implementirani su premium widgeti za:

- difuzore (**Z70**),
- miješanje (**Z71**),
- spremnike s razinom (**Z72**),
- višefazne sustave (**Z73**),
- aerotunel (**Z74**),
- koaksijalno miješanje (**Z75**).

#### Vježba 9 - Dinamika idealnog fluida / idealni Bernoulli

Dodano i nadograđeno je:

- **Zadatak 76**: domet mlaza nadograđen na prikaz tri usporedne putanje,
- **Zadatak 77**: laminarni profil / paraboloid,
- **Zadatak 80-81**: pumpni sustav s usisnom i tlačnom visinom,
- **Zadatak 83-85**: sifoni i kavitacija s prikazom apsolutnog tlaka,
- popravci formatiranja i HTML blokova.

### 3.4. Masovni remont realnih fluida i impulsa (Vježbe 10 - 13)

Najveći broj novih premium vizualizacija uveden je u poglavljima koja obrađuju realne fluide, gubitke energije i količinu gibanja. Ova faza predstavlja najopsežniji funkcionalni iskorak cijelog projekta.

#### Vježba 10 - Dinamika realnog fluida / realni Bernoulli

Dodani su:

- **Darcy-Weisbach Explorer** za analizu osjetljivosti na `L`, `D`, `v` i `λ`,
- **Zadatak 86**: sifon s gubicima i **EGL/HGL** linijama,
- **Zadatak 87**: sapnica i visina uspona mlaza,
- **Zadatak 89**: istjecanje iz velikog spremnika s `"multi-hole"` modom,
- **Zadatak 90**: Pitotova cijev sa stagnacijskom točkom i Hg manometrom,
- **Zadatak 91**: višefazni spremnik s vodom, uljem, benzinom i zrakom,
- **Zadatak 92**: protočna sapnica i **Vena Contracta**,
- **Zadatak 94-95**: Venturi ejektor s efektom usisavanja.

#### Vježba 11 - Količina gibanja 1

Dodani su:

- **Zadatak 98**: kinematika dva mlaza koji se sijeku,
- **Zadatak 99**: rotirajući spremnik s centrifugalnim gradijentom tlaka,
- **Zadatak 102**: udar mlaza u ploču i reakcijska sila,
- **Zadatak 103**: vjetroturbina, strujna cijev i Betzov limit.

#### Vježba 12 - Količina gibanja 2

Dodani su:

- **Zadatak 105**: sila na prirubnici ventila s vektorskom dekompozicijom,
- **Zadatak 106**: konzolni cjevovod i moment savijanja,
- **Zadatak 110**: sluice gate, odnosno ravnoteža hidrostatske i dinamičke sile na ustavi.

#### Vježba 13 - Cjevovodi, viskozna strujanja i mreže

Dodani su:

- **Zadatak 120**: laminarni tok s temperaturnom ovisnosti viskoznosti,
- **Zadatak 122**: difuzor s odvajanjem struje pri velikim kutovima,
- **Zadatak 123**: budžet gubitaka, odnosno usporedba linijskih i lokalnih otpora,
- **Zadatak 124**: paralelni cjevovodi i hidraulička analogija.

### 3.5. Reologija i nelinearna ponašanja fluida

U sklopu **Vježbe 2** dodan je premium vizualizator nenewtonskih fluida. Vizualizator obuhvaća:

- usporedbu **Power-law** i **Bingham** modela,
- usporedbu pseudoplastičnih i dilatantnih materijala,
- interaktivne grafove `τ(dv/dy)` za različite tipove fluida.

Ova nadogradnja značajno proširuje sadržaj skripte prema suvremenijem i didaktički jačem prikazu reoloških pojava.

## 4. Premium funkcije i željeni standard izrade skripte

Tijekom rada oblikovan je i proveden jasan standard izrade interaktivne MF1 skripte. Taj standard podrazumijeva da svaki widget, osim numeričkog rezultata, studentu daje i vizualni i fizički kontekst problema.

Ključne željene i ostvarene značajke skripte su:

- **MF1 standard vizualnog identiteta**: primjena `Inter` fonta, glassmorphism efekata, modernih gradijenata i tamnih dashboarda za rezultate,
- **fizikalna intuitivnost**: svaki widget sadrži legendu, dinamičke formule i odjeljak **"Fizikalni uvid"**,
- **interaktivna analiza energijskih linija**: dinamički prikaz **EGL/HGL** linija uz uračunate gubitke,
- **termofizikalni prikazi**: modeliranje promjene viskoznosti vode i ulja ovisno o temperaturi,
- **vektorska analiza**: vizualni prikaz sila reakcije i momenata u osloncima,
- **multi-phase pristup**: slojeviti spremnici s više fluida koji kumulativno određuju tlak i istjecanje,
- **fluidne animacije i robusnost**: korištenje tehničkih rješenja koja omogućuju stabilan rad i kad je na stranici velik broj interaktivnih elemenata.

Drugim riječima, želja u izradi skripte bila je postići razinu na kojoj portal nije samo zbirka zadataka s rješenjima, nego vizualno i koncepcijski koherentan nastavni alat spreman za stvarnu uporabu u edukaciji.

## 5. Tehnička rješenja i stabilnost

Za osiguravanje tehničke stabilnosti i konzistentnog ponašanja skripte uvedena su sljedeća rješenja:

- korištenje **IIFE** blokova za izolaciju skripti,
- korištenje `requestAnimationFrame` za fluidne i učinkovite animacije,
- kontinuirana sinkronizacija datoteka i osiguranje **UTF-8** kodiranja,
- tehnička optimizacija portala radi stabilnosti čak i uz velik broj widgeta na istoj stranici.

Na taj je način postignuta razina robusnosti potrebna za pouzdano korištenje u nastavi i za javnu web objavu.

## 6. Verifikacija i trenutačno stanje projekta

Provedena je puna tehnička provjera cijele skripte:

- izvršen je puni `quarto render` za sve vježbe **1 - 13**,
- svi dokumenti su uspješno renderirani i verificirani,
- nisu evidentirane greške koje bi onemogućavale generiranje ili korištenje materijala.

Trenutačno stanje projekta može se sažeti ovako:

- cijela skripta je opremljena modernim interaktivnim vizualizacijama u skladu s MF1 standardom,
- svi ključni koncepti iz mape **`Widget - Claude`** uspješno su implementirani ili značajno poboljšani,
- tehnička stabilnost sustava je postignuta,
- portal je u potpunosti funkcionalan i spreman za korištenje u edukaciji,
- materijal je praktično spreman za objavu.

## 7. Zaključak

Projekt izrade interaktivne skripte **Mehanika fluida 1** rezultirao je cjelovitom, sadržajno usklađenom, tehnički stabilnom i vizualno standardiziranom nastavnom cjelinom. Kroz Vježbe 1 - 13 ostvarena je transformacija iz statičnih materijala u interaktivni portal koji studentima omogućuje neposredno razumijevanje fizikalnih procesa, istraživanje parametara i bolji uvid u rješenja zadataka.

Posebna vrijednost projekta leži u tome što su sadržajna preciznost, moderna vizualizacija, matematička korektnost i tehnička robusnost objedinjeni u jedinstven sustav. Time je postignut željeni premium standard skripte i stvorena kvalitetna osnova za dugoročno korištenje, daljnje održavanje i javnu objavu.

## 8. Preporučeni sljedeći koraci

1. Provesti završnu lekturu tekstualnih dijelova zadataka, osobito u poglavljima 10 - 13, radi potpune sinkronizacije s rješenjima u widgetima.
2. Izvršiti korisničko testiranje intuitivnosti klizača, kontrola i prikaza na mobilnim uređajima i tabletima.
3. Sinkronizirati sve promjene na glavni repozitorij i ažurirati live verziju portala.
