# Uredničko uređenje vježbi

Svaka od 13 vježbi sada ima cjelovit fizikalni uvod, jedan glavni postojeći widget koji ga objašnjava te jednu ili dvije odabrane primjene. Ukupno je zadržano **36 widgeta umjesto 127** (114 izvornih kućišta i 13 naknadno dodanih laboratorija). Nisu dodani novi widgeti. Povezani postojeći prikazi objedinjeni su načinima rada, a redundantni HTML, rendereri i automatsko umetanje dodatnih laboratorija uklonjeni su iz izvora.

## Konačan izbor

| Vježba | Glavni widget nakon uvoda | Odabrane primjene | Ukupno |
|---|---|---|---:|
| 1 | Odziv fluida na tlak i posmik: Pascalov zakon, stlačivost i viskoznost | Ocean: tlak i gustoća; cijev: profil brzine i posmik | 3 |
| 2 | Jedno kućište: Newtonova viskoznost, reologija, kapilarni uspon i Laplaceov tlak | Moment viskoznog otpora rotora | 2 |
| 3 | Jedan istraživač hidrostatike, manometra i uzgona | Promjena gustoće s dubinom | 2 |
| 4 | Jedno kućište translacije i rotacije fluida | Dva fluida u rotaciji; spremnik sa suhim središtem | 3 |
| 5 | Tlačno opterećenje ravne plohe: oblik, nagib i hvatište | Moment na zapornici; nesimetrična ploha | 3 |
| 6 | Zakrivljena ploha: lokalni tlak, komponente i strana vode | Ravnoteža zakrivljene zapornice; zračno zvono i manometar | 3 |
| 7 | Tlačne sile i uzgon pri simetričnom uronu | Opći kružni luk, uključujući djelomični uron | 2 |
| 8 | Kontinuitet: presjeci, različite gustoće i akumulacija | Miješanje fluida; raspodijeljeni odsis | 3 |
| 9 | Idealni Bernoulli: brzina, tlak, EGL i HGL | Domet mlaza; sifon | 3 |
| 10 | Realni Bernoulli: linijski i lokalni gubici | Pitotova cijev; kritičnost otvorenog toka | 3 |
| 11 | Jednadžba količine gibanja: koljeno, brzine i bilanca sila | Pražnjenje spremnika; vjetroturbina | 3 |
| 12 | Pelton: mlaz/rotor ili brzinski trokuti/snaga, isti parametri | Raketa promjenjive mase; rotirajuća prskalica | 3 |
| 13 | Profil strujanja i Moodyjev dijagram sa zajedničkim Re | Proračun gubitaka; paralelne grane | 3 |

## Uredničke i fizikalne dorade

- Postojeći uvodi, zadaci, korisne statične slike i rješenja ostaju sastavni dio gradiva. Formula ili objašnjenje koje je prije postojalo samo u uklonjenom widgetu preneseno je u statičko rješenje ondje gdje je potrebno.
- Svaki dodatni widget ima zasebnu nastavnu ulogu. Ponovljena obična suženja, hidrostatike i slične varijacije više nemaju vlastito interaktivno kućište.
- U V2 i V4 aktivan je jedan spojeni način rada. Uzgon u V3 pomiče cijelo tijelo kroz nepomičnu slobodnu površinu; gaz i središte uzgona proizlaze iz istog uronjenog volumena.
- V6 koristi istu geometriju za obje strane vode i dosljedno mijenja predznake sila. Postojeći kontrolni izbor prenesen je iz uklonjenog primjera.
- U V11 i V12 student bira geometrijski prikaz ili odgovarajuću vektorsku/energetsku analizu unutar istog widgeta. Nema paralelnih kopija modela ni dodatnih ulaza za isti pokus.
- U V13 nekadašnji zasebni Reynoldsov prikaz čita isti Re kao Moodyjev dijagram. Profil 1/7 ostaje označena aproksimacija, prijelaz ilustrativna interpolacija, a gibanje oznaka normirano. Hrapavost utječe na λ; ovaj postojeći model profila ne predviđa njezin utjecaj na oblik brzine niti simulira turbulenciju. Pregledani izvorni Moodyjev blok zadržava svoju kontrolnu sumu.
- Uvećanje i precizni unos ostaju dostupni. Opcionalna usporedba A/B otvara se iz sažetog izbornika.
- Ispravljen je prikaz zatečenih sirovih LaTeX oznaka u HTML-u. Dinamička očitanja u V8 koriste stabilne indekse i jedinice i nakon promjene parametara.

## Provjera i održavanje

`tests/editorial-selection.json` bilježi konačan izbor. Strukturni test zahtijeva točno jedan glavni widget, jednu ili dvije primjene, jedinstvene ID-jeve i jedno zajedničko pomagalo po widgetu. Tako se sprječava ponovno nekontrolirano dodavanje prikaza.

- `npm test`: fizikalne bilance, granice parametara, očuvanje volumena i protoka, vektorsko zatvaranje, ponašanje spojenih načina i urednički raspored.
- `quarto render --to html`: predgovor i svih 13 vježbi.
- `npm run test:rendered`: izvršavanje konačnog HTML-a, ekstremi kontrola, konačne koordinate i jedinstveni ID-jevi.
- `npm run test:browser`: stvarni Edge na 1440 i 390 px, svi odabrani widgeti, načini rada, spremljene slike A te uvećanje/zatvaranje uz povrat fokusa.

Slike i strojni izvještaji provjere nastaju u ignoriranoj mapi `output/audit/`. Čisti modeli iz prethodnog kruga zadržani su kao dodatne regresijske reference; automatski laboratoriji koji su ih prikazivali više se ne učitavaju.

**Završni rezultati, 27. rujna 2026.:** 62/62 jedinična i strukturna testa prolaze; Quarto je izgradio svih 14 stranica; svih 13 vježbi prolazi provjeru izvršavanja konačnog HTML-a, uključujući prikaz matematičkih oznaka. Stvarni Edge provjerio je svih 36 widgeta na 1440 i 390 px, bez horizontalnog prelijevanja ili JavaScript iznimaka. Nakon završne promjene dinamičkih oznaka ponovljena je ciljana provjera V8. Usporedba naslova s prethodnim commitom nije našla nijedan uklonjeni zadatak.
