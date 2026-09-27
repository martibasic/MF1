# Grafička i fizikalna nadogradnja — 27. rujna 2026.

> Povijesni izvještaj prethodnih krugova. Konačno uredničko uređenje, smanjenje sa 127 na 36 widgeta i aktualni izbor opisani su u [UREDNICKO_UREDENJE.md](UREDNICKO_UREDENJE.md). Naknadno dodani laboratoriji polja opisani niže uklonjeni su; njihovi modeli ostaju samo regresijska referenca.

Promjene obuhvaćaju svih 13 izvora vježbi i zajedničke alate postojećih widgeta. Izričit korisnikov zahtjev za rad na vježbama nadjačava staru napomenu o zamrznutim izvorima u README-u. Nema objave na udaljeni poslužitelj.

## Zajedničke promjene

- Uvećani prikaz zadržava **isti aktivni widget**, njegove parametre, događaje i fizikalni model. Zatvaranje vraća element na izvorno mjesto. Obuhvaćeno je 114 vanjskih kontejnera u izvornim vježbama.
- Klizači imaju vidljive krajeve raspona i izravan unos broja. Unos podržava decimalni zarez, provjerava raspon i korak te mijenja izvornu kontrolu. Enter na klizaču otvara isti unos. Izvorni DOM sadrži 300 takvih kontrola, uključujući kontrole sekundarnih postavki i trenutačno neaktivnih načina. Moodyjeve kontrole ostaju izvorne.
- Zajednički SVG grafovi imaju brojčane podjele, jedinice, eksplicitne nazive osi, radne točke, pomoćne linije i označene reference. Oznake se ne oslanjaju samo na boju: koriste se i različiti uzorci linija.
- Jednoliko skaliranje uklanja deformaciju kružnica i fizikalnih kutova u V4, V6 i V7. Zajedničke canvas strelice dobile su prave indekse u matematičkim oznakama.

## Konkretne dorade po vježbama

| Vježba | Promjena |
|---|---|
| 1 | Dva vektorska grafa oceana s odvojenim dimenzijskim osima tlaka i gustoće; ista dubina sonde na oba grafa. U modelu stlačivosti strelica opterećenja završava na klipu. |
| 2 | Reološki modeli uspoređuju se na **istim osima** s istom Newtonskom referencom. Prikazani su K, njegova jedinica Pa·sⁿ, n i prividna viskoznost. Slojevita hidrostatika ima očitljive osi dubine i apsolutnog tlaka. |
| 3 | Hidrostatika izričito prikazuje **pretlak**, s brojčanim osima i stalnim rasponom. Manometarski hod ima potpisanu ordinatu p − p₁, označene korake i konačno p₂ − p₁ usklađeno s krajem krivulje. |
| 4 | Izotropno skaliranje. U tlačnom polju rotacije i vertikalnog ubrzanja dodane su analitičke izobare i dimenzijske osi. Izobare prate isti potencijal iz kojeg se računa boja. |
| 5 | Prerađen prikaz integracije tlaka: brojčane osi, točan profil, trake, odvojene oznake točnog i numeričkog hvatišta te pogreška u mm. Jasno je navedeno zašto je sila srednjih točaka ovdje već točna, a hvatište konvergira kao 1/N². |
| 6 | Gradijent vode, normirani profil tlaka s položajima A i B, indeksi sila te očuvanje kružne geometrije. Lokalni tlakovi i rezultantne sile imaju zasebna označena mjerila. |
| 7 | Opći luk podržava potpuno suh, djelomično uronjen i potpuno uronjen slučaj. Integral se dijeli na sjecištima s vodnom plohom; suhi dio ima nulti manometarski tlak. Prikazani su mokri/suhi segmenti, lokalne normale i zaseban vektorski zbroj. Nulta sila nema lažnu strelicu. |
| 8 | Graf kontinuiteta više ne zaravnjuje vrh krivulje: raspon ordinata obuhvaća vrijednost 16 pri D₂/D₁ = 0,25. Nulti protok ima zasebno tumačenje neodređenog omjera 0/0. Graf akumulacije ima stvarne sekunde i metre; uklonjeno je odbacivanje proteklog vremena pri sporom prikazu. |
| 9 | Domet mlaza ima brojčane bezdimenzijske osi i obje simetrične radne točke, koje daju isti domet. |
| 10 | Grafovi gubitaka na istim osima uspoređuju ukupni, linijski i lokalni doprinos. Jedinice su m/s i m; izričito je navedeno da su λ i ζ zadani i konstantni. |
| 11 | Pražnjenje ima čitljiv normirani graf i stvarno vrijeme pražnjenja T. Graf vjetra uspoređuje raspoloživu i izdvojenu snagu, umjesto prikaza samo jedne od njih. |
| 12 | Veći brzinski trokuti Peltona, šest povezanih vektora i zaseban graf normirane snage. Trokuti se zatvaraju pri promjeni U/V₁, β i k. |
| 13 | Colebrook se rješava do malog reziduala. Paralelne grane više ne ovise o diskontinuiranom skoku trenja na granici laminarnog režima. Reynoldsov profil ima brojčane osi, laminarnu referencu i oznaku srednje brzine; opis više ne obećava simulaciju vrtloga. |

## Fizikalne pretpostavke i provjere

Za mokri kružni luk koristi se p(θ) = ρg max(0, zC + R sin θ), dA = bR dθ i sila −p n dA. Analitički integral po mokrim intervalima uspoređen je s neovisnim finim numeričkim zbrojem. Za zatvorenu kružnicu dodatno je provjeren uzgon iz točne površine uronjenoga kružnog segmenta. Os z usmjerena je prema dolje. Podloga za rastavljanje tlakovnih sila i uzgon: [MIT Engineering Mechanics II, lecture 4](https://ocw.mit.edu/courses/1-060-engineering-mechanics-ii-spring-2006/resources/lecture4/).

Model cjevovoda koristi λ = 64/Re do Re = 2320 i Colebrook za Re ≥ 4000. Između granica interpolira se **Re²λ** kako bi gubitak ostao kontinuiran i monoton u protoku. To je eksplicitno označena nastavna procjena prijelaznog režima; nije tvrdnja o jedinstvenom fizikalnom zakonu niti implementacija EPANET-ove kubne interpolacije. Postupci za različite režime uspoređeni su s [EPA EPANET 2.2 User Manual](https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P10113EM.TXT). Zaštićeni Moodyjev blok i njegova kontrolna suma nisu promijenjeni.

Turbulentni profil 1/7 ostaje približan srednji profil. Normiran je integralom po **kružnom presjeku**, uz nultu brzinu na stijenci; ne opisuje viskozni podsloj ni turbulentne fluktuacije. Prijelazni profil je interpolacija. Izvorno ograničenje geometrije Z99 ostaje označeno u samoj vježbi.

## Dokazi i ponavljanje

- `npm test`: **46/46 testova prolazi**. Dvanaest novih testova obuhvaća nove modele, bilance, skaliranje, vremensku neovisnost i povezivanje kontrola. Naknadno su ponovno prošli ciljani testovi nakon završnih vizualnih korekcija.
- `quarto render --to html`: izgrađeni predgovor i svih 13 vježbi.
- `npm run test:rendered`: svih 13 HTML stranica bez JS izuzetaka, NaN/Infinity koordinata i dvostrukih ID-jeva, uključujući min/max kontrola.
- Generirane su i pregledane izdvojene SVG/canvas slike te kontaktni listovi; napravljeni su zajednički maksimumi svih vježbi i minimumi V1, V4–V8, V12 i V13. Izlazi su u ignoriranoj mapi `output/audit/`.
- `git diff --check` prolazi.

**Provjera prvog kruga:** tada ugrađeni preglednik nije bio dostupan. Taj je nedostatak u drugom krugu djelomično uklonjen zasebnom provjerom u stvarnom headless Edgeu, opisanom u nastavku. jsdom zamjena dijaloga i dalje služi samo jediničnim testovima.

## Drugi krug — laboratoriji polja i usporedba pokusa

Svih 13 vježbi dobilo je **po jedan novi laboratorij polja**, na početku niza postojećih widgeta. Svaki ima vlastite jasno označene ulaze; to su prošireni pokusi, a ne prešutno dijeljenje parametara s drugim zadacima. Koriste postojeće provjerene modele gdje je moguće, a novi modeli izdvojeni su u `assets/mf1-field-models.js`.

| Vježba | Novi pokus i fizikalna veza |
|---|---|
| 1 | Stlačivi vodeni stupac: sonda tlaka i gustoće, dimenzijska skala boje i nestlačiva referenca. |
| 2 | Superpozicija Couetteova i Poiseuilleova toka, uključujući povratno strujanje; lokalna brzina i smično naprezanje te jednakost rada stijenke i tlaka s disipacijom. |
| 3 | Dva stabilna nemješiva sloja: kontinuiran tlak i promjena njegova nagiba na granici gustoća. |
| 4 | Rotirajući spremnik: ista parabola određuje plohu i tlak; očuvan volumen, suho središte i tlocrt rotacije pri stvarnoj kutnoj brzini. |
| 5 | Kosa pravokutna ploča: lokalni tlak, integrirana sila, moment oko gornjeg ruba i hvatište. |
| 6 | Promjenjivi kružni luk: normale tlaka i vektorsko zbrajanje vodoravnih i okomitih komponenti. |
| 7 | Plutajući cilindar: ravnotežni uron iz kružnog segmenta, točan uzgon i smjer rezultante nakon ručno zadanog vertikalnog pomaka. |
| 8 | Glatko suženje: tragovi zadovoljavaju dx/dt = Q/A(x), položaj se dobiva inverzijom integrala površine presjeka. |
| 9 | Idealni Venturi: istodobni lokalni tlak, brzinska visina, HGL i EGL. |
| 10 | Cijev s lokalnim otporom: trenje ovisno o Re i hrapavosti, skok energije, disipirana snaga i zadani ulazni tlak. Provjera izlaznog apsolutnog tlaka zaustavlja tragove ispod približnog tlaka zasićenja vode. |
| 11 | Skretanje slobodnog mlaza: zatvaranje vektorskog trokuta i sila na nepomičnu lopaticu iz bilance impulsa. |
| 12 | Pelton: relativni i apsolutni izlazni vektori te proporcionalna podjela ulazne snage na korisnu, izlaznu i disipiranu. |
| 13 | Paralelne grane: rješenje je presjek krivulja gubitaka uz zbroj protoka; animacija svake grane koristi njezinu srednju brzinu. |

Tamne vektorske scene imaju suptilnu mrežu, dosljedne boje veličina, zajedničko mjerilo povezanih vektora, brojčane osi i označene referentne krivulje. Na uskom zaslonu scena, velika HTML očitanja i prilagođeni graf slažu se zasebno. Time se izbjegava samo smanjivanje cijelog laboratorija na nečitljivu sličicu.

Sonde se podešavaju klizačem, tipkovnicom ili točnim unosom; izravni dodir scene dodatno radi u V1–V3 i V8–V10. Animacija se pokreće izričito, podržava usporenje, pauzu i povratak vremena na nulu. Vrijeme se računa iz stvarno proteklih sekundi, dok se crtanje ograničava na približno 30 fps. Izlazak iz vidljivog područja ili skrivanje kartice pauzira gibanje. Promjena fizikalnih ulaza započinje novi pokus pri t = 0. Laboratoriji V11–V13 koriste radnu točku iz parametara umjesto dodatne sonde.

**Postojeći widgeti dobili su „Zapamti A”.** Ukupno je obuhvaćeno 126 od 127 vanjskih kontejnera, uključujući 13 novih laboratorija. Sačuvana grafika čuva tadašnje oznake i mjerila, dok postojeći aktivni widget predstavlja B. Tablica pokazuje promijenjene ulaze; sačuvanu sliku moguće je sakriti, ponovno snimiti ili ukloniti. Snimke su lokalno u memoriji stranice i ne šalju se nikamo. Zaštićeni Moodyjev widget zadržava izvorne kontrole.

### Pretpostavke i izvori drugog kruga

- Točno laminarno rješenje između ravnih ploča provjerava rubne uvjete, jednadžbu gibanja, integral protoka i energetsku bilancu. Ne predstavlja simulaciju stabilnosti ili turbulentnog prijelaza. Podloga: [MIT — Couette & Poiseuille Flows](https://ocw.mit.edu/courses/2-25-advanced-fluid-mechanics-fall-2013/resources/mit2_25f13_couet_and_pois/).
- Kvazi jednodimenzijski idealni Venturi zanemaruje disipaciju i koristi jedinični koeficijent kinetičke energije. Njegovi tragovi ilustriraju taj model, bez tvrdnje o CFD rješenju. Podloga: [OpenStax — Bernoulli’s Equation](https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation).
- Kavitacijska granica u V10 koristi približno 2,34 kPa pri 20 °C prema [NIST, tablica zasićenja vode](https://www.nist.gov/document/nistir5078-tab1pdf). To je provjera valjanosti jednofaznog modela, ne model dvofaznog toka. Koeficijent ζ ne daje lokalni minimum tlaka unutar ventila; stvarna kavitacija ondje može početi ranije.
- Statički pomak cilindra ne tvrdi da simulira valove, dodanu masu ili dinamiku povratka. Peltonova bilanca odnosi se na idealizirano kolo koje zahvaća cijeli mlaz, a ne na izoliranu prolaznu lopaticu. Mjerila shematskih geometrija i sila navedena su u pretpostavkama svakog laboratorija.

### Ponovljiva provjera drugog kruga

- `npm test`: **57/57 prolazi**, uključujući 11 novih testova u `field-lab.test.cjs` uz prethodnih 46.
- `quarto render --to html` i `npm run test:rendered` obuhvaćaju predgovor i svih 13 vježbi.
- `npm run test:browser` provjerava stvarni Edge: širine 1440 i 390 px, raspored, mobilna očitanja, dekodiranje snimke A, modalni dijalog, Escape, vraćanje fokusa i decimalni zarez. Izolirani profil nema pristup korisnikovoj pregledničkoj sesiji.
- Slike novih scena i mobilnih rasporeda su u `output/audit/browser/`; pregledane su i izdvojene rasterizacije scena. `report.json` bilježi rezultat svake vježbe.

Preostala granica provjere: nema testa na fizičkom telefonu, Safariju ili Firefoxu, niti dokaza da su sve moguće kombinacije parametara vizualno pregledane. Matematički testovi, pojedinačni krajevi raspona i kombinirani minimumi/maksimumi nadopunjuju ručni pregled reprezentativnih slika.
