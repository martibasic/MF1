# Provjera widgeta

Iz korijena repozitorija:

```text
npm ci
npm test
quarto render --to html
npm run test:rendered
npm run snapshots -- 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Potrebni su Node.js 22.12+ ili 24+ i Quarto za izgradnju stranica. `widget-harness.cjs` izvršava aktivne skripte uz jsdom i native canvas. Ne izvršava Quarto navigaciju, udaljeni MathJax ni druge vanjske pregledničke biblioteke. DOM i fizikalni testovi nisu zamjena za završnu provjeru prikaza u stvarnom pregledniku.

`visual-layout.test.cjs` provjerava da grafike imaju punu širinu i nakon promjene načina rada, da zamijenjeni stari prikazi ostaju skriveni, da skaliranje čuva kutove te da se vektorske bilance zatvaraju. Provjerava i krajeve vektora V12 na rubovima raspona kontrola. To ne mjeri stvarni preglednički raspored ni granice svakog tekstnog natpisa.

`science.test.cjs` provjerava diferencijalni zakon stlačive hidrostatike, mokre dijelove kružnog luka neovisnom kvadraturom i Arhimedovim zakonom, konvergenciju hvatišta, rezidual Colebrooka, kontinuitet modela gubitaka i bilancu paralelnih grana. Provjerava i normalizaciju profila po kružnom presjeku, fizikalno vrijeme pri 2–120 fps, unos decimalnog zareza, velike vrijednosti bez separatora tisućica te očuvanje aktivnih modela pri uvećanju. Za dijaloge jsdom koristi izričitu zamjenu metoda `showModal/close`: testira se životni ciklus elemenata i događaja, ne stvarni fokus, Escape ili preglednički raspored.

Zajednički kvantitativni grafovi i modeli nalaze se u `assets/mf1-science.js`; pristupačne kontrole za uvećanje i precizan unos u `assets/mf1-instruments.js`. Skup modela prijelaznog trenja izričito interpolira veličinu `Re²λ`, a ne tvrdi da prijelazni tok ima jedinstveni zakon. Zaštićeni Moodyjev proračun ostaje zaseban.

`MF1_RENDERED=1` bira izgrađeni HTML za snimke. `MF1_EXTREME=min` ili `max` primjenjuje isto rubno stanje na sve rasponske kontrole. Snimke i strojni izvještaj nastaju u `output/audit/`; ne ulaze u Git.

`individual-*.test.cjs` sadrže ciljane provjere pojedinačno uređenih widgeta: neovisne integrale, bilance, granična stanja, predznake sila, mjerila i geometriju SVG-a te fizikalno vrijeme. `professor-*.test.cjs` povezuju te provjere s primjenama po vježbama. `vector.test.cjs` provjerava SVG adapter za postojeće crtačke naredbe; adapter ne izvozi rastersku sliku.

`npm run test:browser` pokreće izolirani headless Edge putem CDP-a, bez dodatne biblioteke i bez korisnikova profila. Zadana je standardna Windows lokacija Edgea; `MF1_BROWSER_PATH` može zadati drugi kompatibilni Chromium. Potreban je dovršen `quarto render --to html`. Provjera obuhvaća 39 odabranih widgeta u 13 vježbi na širinama 1440 i 390 px, izostanak vodoravnog preljeva i aktivnih rasterskih površina, redoslijed naslova i prikaza, dekodiranje sačuvanog SVG-a, izvorni modalni dijalog, Escape i vraćanje fokusa. Provjerava i decimalni zarez u stvarnom dijalogu. Izvještaj i slike su u `output/audit/browser/`. To je emulacija uskog zaslona u Chromiumu, ne test fizičkog mobitela ni drugih pregledničkih mehanizama.

`moody-protection.json` čuva pregledani sažetak cijelog Moodyjeva bloka, izvorni Git commit, pet ranije dopuštenih korekcija točnosti te zasebne hashove pet računskih/IF funkcija i izvornog stabla. SVG port dopušta šest izričito navedenih tekstualnih korekcija uvjeta, bez promjene tih funkcija. Zaštićeni su i izrazi odabira režima te svih deset referentnih krivulja. Ne osvježavati zaštitu automatski pri promjeni widgeta; svaka nova razlika zahtijeva stručni pregled.
