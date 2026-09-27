# Uredničko uređenje vježbi

Svaka od 13 vježbi sada ima cjelovit fizikalni uvod, jedan glavni postojeći widget koji ga objašnjava te jednu do tri odabrane primjene. Konačan izbor sadrži **39 postojećih widgeta**. Nisu dodani novi widgeti. Povezani postojeći prikazi objedinjeni su načinima rada, a redundantni HTML, rendereri i automatsko umetanje dodatnih laboratorija uklonjeni su iz izvora.

## Konačan izbor

| Vježba | Glavni widget nakon uvoda | Odabrane primjene | Ukupno |
|---|---|---|---:|
| 1 | Odziv fluida na tlak i posmik: Pascalov zakon, stlačivost i viskoznost | Ocean: tlak i gustoća; cijev: profil brzine i posmik | 3 |
| 2 | Newtonova viskoznost i reologija | Kapilarnost i Laplaceov tlak; moment viskoznog otpora rotora | 3 |
| 3 | Hidrostatika, manometar i ubrzani spremnik | Uzgon i uron tijela; promjena gustoće s dubinom | 3 |
| 4 | Relativno mirovanje i efektivna gravitacija | Rotirajuće tlačno polje; rotirajuća U-cijev; spremnik sa suhim središtem | 4 |
| 5 | Tlačno opterećenje ravne plohe: oblik, nagib i hvatište | Moment na zapornici; nesimetrična ploha | 3 |
| 6 | Zakrivljena ploha: lokalni tlak, komponente i strana vode | Ravnoteža zakrivljene zapornice; zračno zvono i manometar | 3 |
| 7 | Tlačne sile i uzgon pri simetričnom uronu | Opći kružni luk, uključujući djelomični uron | 2 |
| 8 | Kontinuitet: presjeci, različite gustoće i akumulacija | Miješanje fluida; raspodijeljeni odsis | 3 |
| 9 | Idealni Bernoulli: brzina, tlak, EGL i HGL | Domet mlaza; sifon | 3 |
| 10 | Realni Bernoulli: linijski i lokalni gubici | Pitotova cijev; kritičnost otvorenog toka | 3 |
| 11 | Jednadžba količine gibanja: koljeno, brzine i bilanca sila | Pražnjenje spremnika; vjetroturbina | 3 |
| 12 | Pelton: mlaz/rotor ili brzinski trokuti/snaga, isti parametri | Raketa promjenjive mase; rotirajuća prskalica | 3 |
| 13 | Moodyjev dijagram s izvornom logikom odabira modela | Proračun gubitaka; paralelne grane | 3 |

## Uredničke i fizikalne dorade

- Postojeći uvodi, zadaci, korisne statične slike i rješenja ostaju sastavni dio gradiva. Formula ili objašnjenje koje je prije postojalo samo u uklonjenom widgetu preneseno je u statičko rješenje ondje gdje je potrebno.
- Svaki dodatni widget ima zasebnu nastavnu ulogu. Ponovljena obična suženja, hidrostatike i slične varijacije više nemaju vlastito interaktivno kućište.
- Različite fizičke pojave zadržavaju odvojene nastavne uloge. Jedan widget može imati nekoliko pogleda istog modela; istodobno ostaje vidljiv samo odabrani pogled.
- V6 koristi istu geometriju za obje strane vode i dosljedno mijenja predznake sila. Postojeći kontrolni izbor prenesen je iz uklonjenog primjera.
- U V11 i V12 student bira geometrijski prikaz ili odgovarajuću vektorsku/energetsku analizu unutar istog widgeta. Nema paralelnih kopija modela ni dodatnih ulaza za isti pokus.
- Svih 39 widgeta crta izvornu SVG geometriju, tekst, osi i vektore. Starije crtačke naredbe koriste SVG adapter; nijedan aktivan prikaz widgeta nije bitmapa. Mjerila su objavljena, a shematske dimenzije jasno označene.
- Izvorna Moodyjeva logika ostaje referenca za izbor režima i modela trenja. Pet izvornih računskih i IF funkcija, stablo, izbor režima i svih deset referentnih krivulja imaju zasebnu regresijsku zaštitu. Prijelazno područje izričito je označeno kao ilustracija.
- Ostali widgeti povezuju uvjet, jednadžbu i brojčanu posljedicu. Provjerene su točne granične vrijednosti, nulti slučajevi, predznaci i ograničenja modela.
- Pelton koristi bilancu dviju simetričnih polovica mlaza i zatvorenu energetsku bilancu; vjetroturbina točne presjeke strujne cijevi i Betzovu granicu; raketa promjenjivu masu; prskalica razlikuje zaključani rotor, pogon, slobodnu vrtnju i vanjski pogon.
- U paralelnim cijevima glavni rezultati su protoci i zajednički gubitak. Ranije prikazani lokalni tlak u račvi nije određen zadanim podacima; dodatna pretpostavka za pumpu sada je jasno odvojena od tog tlaka.
- Uvećanje i precizni unos ostaju dostupni. Opcionalna usporedba A/B otvara se iz sažetog izbornika.
- Ispravljen je prikaz zatečenih sirovih LaTeX oznaka u HTML-u. Dinamička očitanja u V8 koriste stabilne indekse i jedinice i nakon promjene parametara.

## Provjera i održavanje

`tests/editorial-selection.json` bilježi konačan izbor. Strukturni test zahtijeva točno jedan glavni widget, jednu do tri primjene, jedinstvene ID-jeve i jedno zajedničko pomagalo po widgetu. Tako se sprječava ponovno nekontrolirano dodavanje prikaza.

- `npm test`: fizikalne bilance, granice parametara, očuvanje volumena i protoka, vektorsko zatvaranje, ponašanje spojenih načina i urednički raspored.
- `quarto render --to html`: predgovor i svih 13 vježbi.
- `npm run test:rendered`: izvršavanje konačnog HTML-a, ekstremi kontrola, konačne koordinate i jedinstveni ID-jevi.
- `npm run test:browser`: stvarni Edge na 1440 i 390 px, svi odabrani widgeti, načini rada, spremljene slike A te uvećanje/zatvaranje uz povrat fokusa.

Slike i strojni izvještaji provjere nastaju u ignoriranoj mapi `output/audit/`. Čisti modeli iz prethodnog kruga zadržani su kao dodatne regresijske reference; automatski laboratoriji koji su ih prikazivali više se ne učitavaju.

Pojedinačni pregled svakog widgeta dokumentiran je u `POJEDINACNI_PREGLED_WIDGETA.json`: vrijeme početka i završetka, najmanje 300 sekundi pregleda prije provedbe, fizikalni nalazi, izmjene i provjera. Svih 39 pregleda provedeno je redom, ukupno 210,93 minute zasebnog pregleda prije pripadajućih dorada.

Završna provjera 27. rujna 2026.: `npm test` prolazi **340/340 testova**; Quarto uspješno gradi svih 14 stranica; provjera izgrađenog HTML-a prolazi svih 13 vježbi, uključujući rubne ulaze, jedinstvene ID-jeve i izostanak aktivnih rasterskih prikaza widgeta. Ciljane fizikalne i vizualne provjere pojedinih widgeta navedene su u dnevniku.

Završni zajednički Edge audit prošao je svih **39 widgeta na 1440 i 390 px**: bez JavaScript grešaka, vodoravnog preljeva ili aktivnih bitmapa, uz provjerene načine rada, SVG usporedbu A, uvećanje, Escape i povrat fokusa. Nakon njega pregledani su i posljednji popravljeni rasporedi cijelih widgeta.
