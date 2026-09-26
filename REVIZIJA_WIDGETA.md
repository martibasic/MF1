# Stručna revizija widgeta Mehanike fluida 1

Revizija od 26. rujna 2026. obuhvaća izvore svih 13 vježbi, njihove aktivne interaktivne scene i prateće formule. Promjene su lokalno unesene i zbirka je ponovno izgrađena. Nije izvršena objava na GitHub Pages.

**Važno ograničenje izvora:** za Z99 nedostaje izvorna PDF skica. Raniji brojčani rezultat zato nije predstavljen kao potvrđeno rješenje. Umjesto međusobno proturječne skice i formule, ugrađen je fizikalno dosljedan istraživač s izričito zadanim koordinatama. Za potvrdu baš izvornog zadatka još treba dostaviti skicu. Ovo je ujedno navedeno uz zadatak.

## Pronađene i ispravljene pogreške

| Područje | Pogreška ili nepouzdana pretpostavka | Sadašnji prikaz i model |
|---|---|---|
| Stlačivost | Linearizacija korištena bez ograničenja; neusporedivi grafički odnosi volumena/modula; strelice jednakog tlaka različitih duljina | Za konstantan K vrijedi V₂/V₁ = exp(−Δp/K); za izotermni idealni plin V₂/V₁ = p₁/p₂. Pomak klipa, raspored oznaka čestica i usporedba K proizlaze iz modela. Jednaki tlakovi imaju jednake strelice. |
| Kapilarnost | Nejasno mjeren kontaktni kut, vektori površinske napetosti koji nisu tangente; previše jaka tvrdnja o plutanju kuglice | Razlikovani su kut u plinu i kut u tekućini. Lokalna tangenta i smjer sile su usklađeni. Model kuglice izričito daje gornju granicu kapilarne nosivosti, a ne potpuno rješenje plivanja. |
| Manometri | Pogrešni predznaci, odvojeni stupci bez spojnog puta, nedosljedni geometrijski pomaci | Povezan hidrostatski put, zajednička vertikalna skala i pravilni smjerovi očitanja. U Z26, za priključke vode na istoj koti, koristi se (ρHg−ρv)gΔz. Dobiva se h = 0,08090 m i α ≈ 37,14°. |
| Ubrzani spremnici | Nastavak trapeznog modela kada površina presiječe dno; prevelika ili negativna dubina; izgubljeno očuvanje volumena | Rješavaju se trapezni i trokutasti mokri presjek. Prikazuje se suhi dio dna, prelijevanje, preostali volumen i lokalni tlak. |
| Rotirajući spremnici | Jednadžba za potpuno mokro dno nastavljana nakon osušivanja; neispravna kritična brzina pri maloj početnoj dubini | Paraboloid i suhi prsten računaju se iz volumena. Negativni koeficijent parabole nije prikazan kao negativna fizička dubina. Rub ograničava visinu nakon prelijevanja. |
| Kosina i efektivna gravitacija | Predznaci u tekstu nisu odgovarali osi nacrtanoj na skici | Lokalna os je izričito usmjerena uz kosinu: fₓ = −g sin α − aₓ. Površina je okomita na efektivno polje, a tlak računa lokalnu dubinu. |
| Ravne plohe | Neispravni krakovi djelomično uronjenih vrata; miješanje apsolutne i neto sile; sila nacrtana u pogrešnoj ravnini | Centar tlaka računa se iz stvarno uronjene površine. Reakcije i težina imaju ispravne krakove. Atmosferski doprinos je odvojen. Sila normalna na sliku označena je simbolom ⊙. |
| Zakrivljene plohe | Promjena geometrije umjesto promjene mokre strane; pogrešan smjer vertikalne komponente; poistovjećivanje težišta luka s centrom tlaka ravne plohe | Jedna geometrija koristi se za obje mokre strane. Komponente mijenjaju predznak zajedno. Pravac rezultante kružnog luka prolazi kroz centar zakrivljenosti. Točka presjeka s lukom jasno je definirana. |
| Kontinuitet | Promjer mijenjan kao da je površina; zaostale strelice i netočni približno uravnoteženi primjeri | Presjek je πD²/4; geometrija i brzine mijenjaju se zajedno. Smjer protoka zraka prati predznak bilance. Akumulacija koristi dh/dt = (Qin−Qout)/A. |
| Bernoulli | Neusklađene kote, putanje mlaza, reference tlaka i energetske linije | Balistički mlaz koristi jednaku skalu x i z. EGL/HGL imaju zajednički datum i razmak brzinske visine. Tlak pare odnosi se na apsolutni tlak. |
| Realni tok | Linijski gubitak vizualno raspoređen na pogrešnu duljinu; lokalni gubitak nije odgovarao skoku; manometar nacrtan u suprotnom smjeru | Linijski gubitak pada duž cijele dionice, lokalni daje zaseban skok. Pitot, Venturi i obrnuti zračni manometar imaju dosljedne razine. Nedopuštena geometrija ne prikazuje izmišljeni prolazni tok. |
| Impuls i rotori | Maseni protok kroz rotor računat s uzvodnom brzinom, uz istodobno nekonzistentnu bilancu snage | Idealni disk koristi ṁ = ρAvd, vd = (v₁+v₂)/2, F = ṁ(v₁−v₂), P = Fvd i CP = 4a(1−a)². Pretpostavke pretvorbe snage navedene su izričito. |
| Raketa | Konstantna masa pri izbacivanju značajnog udjela goriva | Δv = ve ln(m₀/mf); potisak i trenutačno ubrzanje usklađeni s masenim protokom i promjenom mase. |
| Konzola i ustava | Nedosljedna raspodijeljena težina/moment te pogrešan predznak doprinosa impulsa | Konzola koristi G′L u L/2, odnosno moment G′L²/2. Sila na ustavu jest tlačni doprinos minus porast toka količine gibanja. Granični slučaj jednakih razina je objašnjen. |
| Animacije | Gibanje vezano uz broj sličica; dekorativno titranje ili nasumična putanja; potisak nakon prekida mlaza | Fizičko vrijeme, podkoraci na sporim zaslonima, pokretanje/pauza/početak i odabir brzine. Flyboard nakon prekida ima a = −g, kontinuiranu brzinu i zaustavljanje na površini. |
| Reynoldsov prikaz | Turbulentni profil s nenultom brzinom na stijenci; dekorativni vrtlozi bez modela | Normalizirani srednji profili s uvjetom bez klizanja. Prijelazni profil označen je kao interpolacija, turbulentni kao aproksimacija 1/7. Prikaz ne tvrdi da simulira turbulentne fluktuacije. |

## Promjene po vježbama

| Vježba | Pregledani modeli i važne promjene |
|---|---|
| 1 | Uvodni Pascal/Couette/stlačivost, opterećeni klip i priključeni manometar, voda/plin, gustoća na dubini, Poiseuilleov profil i blok na uljnom filmu. Usklađeni su površine, normalizirani profili, smjer posmika, ravnoteža na kosini, nulto stanje i linearne skale veličina. |
| 2 | Couetteov tok, nenjutnovski model, konusni viskozimetar i snaga, kapilarne cijevi, Laplaceov tlak, podizanje čaše, kuglica, kapilarna pogreška, ksilem, slojeviti fluidi, infuzijska hidrostatska shema, stupci zraka/vode i višefluidni manometar. Sačuvani su usporedni primjeri, uz popravak tangenti, promjera, tlakova i povezivanja posuda. |
| 3 | Uvodna hidrostatika i ubrzanje; Z23–Z33 te N1–N8. Prerađeni su manometri, klip, areometar, ubrzani spremnici, puna cisterna, spojene posude, slobodno titranje i kružne/kompozitne stijenke. Areometar u obje tekućine ima istu geometriju tijela; tlak na punoj cisterni raste duž stvarnog efektivnog polja. |
| 4 | Efektivno polje, rotirajući cilindar, kombinirano ubrzanje, kosina, rotirajuća U-cijev, osušivanje dna, nagnuta os i usporedba triju stanja. Jedinstvene funkcije za volumen koriste se u brojčanom i grafičkom dijelu. Negativna izračunana gustoća više nije maskirana apsolutnom vrijednošću. |
| 5 | Uvodni tlak na ravnu plohu, nagnuta ploha, djelomično uronjena vrata, atmosferski tlak, vrata s težinom, nagnuta stijenka, numerička integracija i trokutasta ploha. Ispravljeni su centri tlaka, krakovi i orijentacija sila. Zadržane su postojeće kartice rezultata i usporedba težišta s centrom tlaka. |
| 6 | Postupak rastavljanja sile na kružnu plohu, cilindar uz stijenku, dvije mokre strane iste četvrtkružnice, zarobljeni zrak u otvorenom zvonu i kružni segment. Prikaz virtualnog volumena i zajednička skala sila povezani su s analitičkim izrazima. |
| 7 | Simetrija tlaka na uronjenom tijelu, polukružna ploha i proizvoljan kružni luk. Sačuvana je usporedba numeričke i analitičke integracije; popravljene su normale, lokalna dubina, predznaci i nulte rezultante. |
| 8 | Istraživač kontinuiteta te Z70–Z75: promjenjivi presjeci/gustoće, miješanje, spremnik, zračni protok, perforirana cijev i jezgra/prsten profila. Nula protoka dostupna je u uvodnom istraživaču. Za akumulaciju se prate vrijeme i granice spremnika; usporedive strelice imaju zajedničku skalu. |
| 9 | Uvodna energetska bilanca, mlaz, profil brzine, različiti presjeci i kote, pumpa, energetski stupci te sifoni i tlak pare. Sačuvani su zadani primjeri, uz korekcije tlakovnih jedinica, mjesta oznaka, geometrije i odnosa brzina. |
| 10 | Istraživač gubitaka te Z86–Z95: sifon, vertikalni mlaz, zadani gubici, Pitot, slojeviti fluidi, sapnica, izdignuto dno, Venturi, zračni manometar i Torricellijev kontrast. Usklađeni su EGL/HGL, manometarski predznaci i uvjeti valjanosti. |
| 11 | Vektorska bilanca koljena, pražnjenje spremnika, dva mlaza, rotirajući spremnik, konvergentno/povratno koljeno, udar mlaza i vjetroturbina. Pražnjenje koristi stvarno vrijeme i analitički zakon. Z99 ima eksplicitnu geometriju i označeno ograničenje izvora. Vjetroturbina koristi dosljedan idealni disk. |
| 12 | Raketa, Pelton, slavina, konzola, rasprskivač, vjetroturbina, lebdenje helikoptera, ustava i Flyboard. Velike promjene modela i skica: brzinski trokuti zatvaraju se vektorski; relativne i apsolutne brzine razlikuju se; reakcija oslonca nije zamijenjena silom na fluid. Za helikopter D označuje daleki trag, a okretaji se ne ekstrapoliraju na promijenjenu geometriju. |
| 13 | Zaštićeni Moody, laminarni pad tlaka, difuzor, raspodjela linijskih/lokalnih gubitaka, paralelne grane, Reynoldsovi profili i pravokutni kanal. Geometrija difuzora odgovara omjeru promjera i polukutu. Paralelne grane zadovoljavaju isti gubitak i zbroj protoka. Hidraulički promjer nije nacrtan kao stvarni kružni promjer. |

**Najveći zahvati** napravljeni su na ubrzanim i rotirajućim spremnicima, zakrivljenim plohama, vektorskim bilancama, Peltonovu kolu i rasprskivaču, oba modela vjetroturbine, raketi, ustavi i Flyboardu. Dodane su zajedničke funkcije za fizikalne modele, strelice i animacije u `assets/mf1-widgets.js`. Zajednički stil u `assets/mf1-widgets.css` ujednačuje tipografiju, fokus tipkovnice, kontrole, kartice i ponašanje na uskom zaslonu, bez zahvata u Moodyjev widget.

## Namjerno sačuvano

- **Moodyjev dijagram:** raspored, boje, krivulje, kontrole, očitanje i način interakcije. Nije zamijenjen drugim dijagramom niti preoblikovan.
- **V2, nenjutnovski graf:** zadržani su model potencijskog zakona, izbor tipa fluida i izravno povezivanje nagiba s parametrima.
- **V7, integracija proizvoljnog luka:** sačuvani su analitičko/numeričko uspoređivanje, predlošci i istraživanje kuta luka; korekcije se odnose na fizikalni prikaz i rubne slučajeve.
- **V8, miješanje fluida:** sačuvana je valjana bilanca mase i volumena te usporedba masenog i volumnog udjela. Popravljena je prezentacija tokova.
- **V9/V10, zadane energetske bilance:** sačuvani su zadani gubici, koeficijenti i korisna usporedba idealnog s realnim tokom. Nisu proizvoljno dodavani koeficijenti trenja tamo gdje ih zadatak ne daje.
- **V13, laminarni zakon i mreža paralelnih grana:** zadržani su valjana temeljna struktura i iterativni proračun; poboljšani su područje primjene, grafika i očitanja.

## Točno ograničen zahvat u Moodyjev dijagram

Usporedba s početnim Git sadržajem potvrđuje točno pet zamjena, bez drugih promjena unutar zaštićenog bloka. Test pohranjen u `tests/moody-protection.json` i `tests/widgets.test.cjs` čuva njegov kontrolni sažetak.

1. Ispravljen je suvišni faktor 2 u `k⁺`. Za Darcyjev λ vrijedi τw = λρv²/8, pa je uτ = v√(λ/8) i **k⁺ = (k/D)Re√(λ/8)**.
2. Uklonjena je prisilna oznaka „glatka cijev” samo zato što je k/D < 2·10⁻⁵. Oznaka sada koristi isti izračunati k⁺; mala relativna hrapavost sama ne jamči hidrauličku glatkoću pri proizvoljno velikom Re.
3. Oznaka ordinate 0,015 više se ne zaokružuje na 0,01 ili 0,02.
4. Tekst u stablu odluke više ne prikazuje Blasiusovu formulu kao opće pravilo za cijelo glatko turbulentno područje dijagrama.
5. Objašnjenje očitane vrijednosti imenuje stvarno korištenu Haalandovu aproksimaciju umjesto pripisivanja tog broja Blasiusovoj formuli.

Korekcija k⁺ slijedi iz gore navedenih definicija Darcyjeva koeficijenta i brzine trenja. Krivulje i postojeća funkcija za račun λ nisu promijenjene.

## Završna provjera i ponavljanje

- `npm ci --ignore-scripts`: uspješna instalacija iz zaključanih ovisnosti; npm je prijavio 0 poznatih ranjivosti pri ovoj provjeri.
- `npm test`: **22/22 prolaze**. Uključeni su neovisna integracija volumena, suho dno, prelijevanje, bilance idealnog diska, raketna jednadžba, predznak sile na ustavu, Flyboard nakon prekida i energetska bilanca Z99.
- Testirani su kontrolni minimumi i maksimumi, zajednička ekstremna stanja, gumbi/predlošci, izbori modela, pauza i početak. Kod koji pripada uklonjenoj DOM sceni ne tretira se kao aktivna kontrola.
- Provjereno je jednako fizičko vrijeme animacije pri 10, 30 i 120 fps. Animacije miruju do izričitog pokretanja; promjena vidljivosti zaustavlja zajedničku animacijsku petlju.
- `quarto render --to html`: uspješno izgrađen predgovor i svih 13 vježbi.
- `npm run test:rendered`: provjera skripti widgeta u stvarnom generiranom HTML-u, uključujući naknadno dodan prikaz Z121. U početnom DOM-u zabilježeno je **307 kontrola i 148 vidljivih canvas/SVG prikaza**. To nisu 148 zasebnih fizikalnih modela: neki widgeti imaju više grafova, a neke skice su statične. Nisu nađeni JavaScript izuzeci, NaN/Infinity u koordinatama ni dvostruki ID-jevi.
- Vizualno su pregledane izdvojene SVG i canvas scene svih vježbi te kombinirani maksimumi. Pri tome su dodatno popravljene odrezane strelice, preklapanja oznaka, veličina vrhova strelica i skale koje su izlazile iz okvira.

Za ponavljanje iz korijena projekta: `npm ci`, `npm test`, `quarto render --to html`, `npm run test:rendered`. Za kontaktne listove: `npm run snapshots -- 1 2 3 4 5 6 7 8 9 10 11 12 13`. Varijabla `MF1_RENDERED=1` bira generirani HTML, a `MF1_EXTREME=min` ili `max` bira zajedničko rubno stanje. Izlazi se spremaju u ignorirani `output/audit/`.

**Granice provjere:** provjera koristi jsdom, stvarni rasterizator canvasa i rasterizaciju SVG-a. Preglednik u ovoj sesiji nije bio dostupan, pa nije provedena provjera živog rasporeda cijele stranice, MathJax tipografije, dodira niti svih širina zaslona. Quarto navigacija i vanjske biblioteke nisu simulirane kao da su preglednik. Zbirka sadrži eksplicitno označene nastavne modele i shematske skale; nije CFD simulator. Nedostupna izvorna geometrija Z99 ostaje dokumentirana otvorena točka.

**Stručne podloge:** hidrostatika, relativno mirovanje i bilance provjereni su uz vlastite izvode i [MIT Engineering Mechanics II](https://ocw.mit.edu/courses/1-060-engineering-mechanics-ii-spring-2006/pages/lecture-notes/). Za kapilarnost korištene su [MIT bilješke o površinskoj napetosti](https://web.mit.edu/course/16/16.unified/www/FALL/fluids/Lectures/surf_tension.pdf). Model vjetroturbine uspoređen je s [MIT predavanjem o energiji vjetra, str. 13–14](https://ocw.mit.edu/courses/2-60j-fundamentals-of-advanced-energy-conversion-spring-2020/68aba3c8ecd226970e77565ae4ba3a03_MIT2_60s20_lec22.pdf), a bilanca ustave s [MIT primjerom ustave](https://ocw.mit.edu/ans7870/2/2.25/assignments/sec5/5-3/index.html). Pretpostavka CP = zadana učinkovitost u modelima rotora posebno je navedena: bez podataka o gubicima generatora iz električne snage nije moguće jednoznačno odrediti aerodinamičku silu.
