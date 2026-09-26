# Kompaktna dorada interaktivnih widgeta

Ovaj ciklus polazi od stručne revizije u commitu `5d54018` i slijedi posljednju korisnikovu uputu: ukloniti dodatak „Istraži i usporedi”, doraditi postojeće prikaze i smanjiti količinu kontrola, ponovljenih rezultata i teksta. Ranija revizija modela opisana je u `REVIZIJA_WIDGETA.md`.

## Konačni pristup

- Uklonjeni su zajednička eksperimentalna bilježnica, katalog i pripadajući dodatni paneli iz svih 13 vježbi. Nema zamjenskog generičkog istraživačkog panela.
- Kompaktni stil primijenjen je na 114 postojećih widgeta. Moodyjev dijagram ostaje izvan tih promjena: sačuvani su proračun, izgled i interakcije.
- Osnovni prikazi gotovo svugdje imaju najviše dva klizača. Z88 zadržava tri neovisna i korisna ulaza: brzinu te gubitke u dva uzastopna odsječka.
- Dodatna geometrija i svojstva dostupni su unutar izvornog widgeta na zahtjev. Kontrole zadržavaju izvorne identifikatore, događaje, jedinice i raspone. Nema dodatnog modela koji bi izračunavao drukčije rezultate.
- Očitanja su skupljena u sažete redove; smanjeni su razmaci, unutarnja uokvirenja i velike kartice. Glavne formule i kratka tumačenja ostaju uz prikaz.

## Značajnije pojedinačne dorade

| Vježba / prikaz | Promjena i nastavna svrha |
|---|---|
| V1 — klip i manometar | Novi kompaktan raspored skice, visine mjerenja, tereta i jednoga glavnog očitanja. Uklonjeni višestruki prikazi istih tlakova. Bilanca `pₘ = G/A − ρgh` ostaje vidljiva. |
| V1 — stlačivost | Dva fizička stanja, jedan klizač tlaka i dva očitanja volumena; uklonjene ponovljene kartice i prekrivajući tekst. Sačuvani eksponencijalni model vode i izotermni model idealnog plina. |
| V1 — ocean | Graf prikazuje cijeli raspon dubine i pomičnu radnu točku. Raspon gustoće obuhvaća i 10 km. Klik i tipkovnica mijenjaju isti parametar kao klizač. |
| V1 — Poiseuilleov tok | Dimenzijska os brzine s oznakom m/s, početni referentni profil i proporcionalne brzinske strelice. Raspon osi prilagođava se veličinama. Detaljna tablica je sklopiva. |
| V1 — blok na kosini | Prazni prostor skice iskorišten je za zatvoreni trokut `G + N + Fᵥ = 0`. Sile dijele skalu. Uvećani profil uljnog filma nalazi se u istoj sceni. Dvije glavne kontrole: kut i viskoznost. |
| V3 — stabilnost N1 | Klizač visine težišta jasno prikazuje KG u mm, uključujući trenutačnu vrijednost. |
| V3 — slobodno titranje N4 | Jedan skup kontrola pokretanja/pauze; vremenski klizač bira stvarnu fazu prigušenog prvog moda. |
| V4 — usporedba gibanja | Rotirajući spremnik prikazuje aktualnu rubnu visinu; opis jasno razlikuje zasebnu translaciju i zasebnu rotaciju. |
| V5 — zaklopka | Kratke strelice imaju ograničen vrh. Mala težina ostaje u istoj skali sila, uz zaseban označeni detalj njezina okomitog smjera. |
| V6 — zakrivljene plohe | Ispravljeno jednako mjerilo po objema osima; kružnice i lokale normale više se ne deformiraju različitim omjerom dimenzija canvasa. |
| V6 — Z53 | Tlak i početni promjer mijenjaju stvarnu skicu balona, uzgon i silu užeta prema zadanom elastičnom zakonu `pD² = konst.`. |
| V6 — Z54 | Dva klizača, širina i nagib. Točno se računa uronjeni poligon i njegov centroid; prikaz povezuje položaj centra uzgona, krak sila, GM i moment. Gustoće su zadane i vidljive. |
| V8 — uvodni kontinuitet | Svaki od tri načina ima dvije kontrole: promjer/protok, promjer/gustoća ili ulazni/izlazni protok. Preseti, skica i bilance ostaju povezani. |
| V11 — količina gibanja | Dodatne konstrukcije vektorskih bilanci dostupne su na zahtjev; glavni kontrolni volumen i reakcija ostaju u prvom planu. |
| V2–V13 — ostali prikazi | Kompaktni redovi kontrola i rezultata, sažetiji razmaci te izdvojena sekundarna svojstva; sačuvani postojeći fizički modeli i kvalitetne skice. |

## Fizikalne, matematičke i geometrijske provjere

- Plutajući blok: očuvanje istisnutog volumena, jednakost uzgona i težine, simetrija momenta pri promjeni predznaka nagiba te neovisna provjera `−M/(Gθ) → GM` za mali kut. Izračun pri zadanom kutu održava vertikalnu ravnotežu; nije simulacija prevrtanja.
- Elastični balon: `p₂D₂² = p₁D₁²` i kubna ovisnost sile o promjeru. Pri šesnaest puta većem tlaku promjer je četvrtina početnog, a sila je 1/64 početne. To je zadani elastični zakon, ne izotermni zakon idealnog plina.
- Blok na kosini: pri izvornim krajevima raspona provjereni su tangencijalna ravnoteža i `v = G sin(α)δ/(μA)`. Vektor brzine ima označeno prilagođeno mjerilo da ostane unutar skice i pri velikoj brzini.
- Zakrivljene plohe: provjereno izotropno skaliranje na širokom, visokom i dvostruko povećanom canvasu. Mijenja se grafička transformacija; proračun hidrostatskih sila ostaje isti.
- Zadržani testovi translacije i rotacije spremnika, diska vjetroturbine, raketne jednadžbe, zapornice, Flyboarda, eksplicitne geometrije Z99, vremena animacije i Moodyjeva zaštićenog bloka.

Za metacentarsku visinu pravokutnog bloka korišten je odnos `GM = d/2 + B²/(12d) − H/2`; geometrijski izvod i ograničenje malih nagiba uspoređeni su s [Fitzpatrickovim bilješkama](https://farside.ph.utexas.edu/teaching/336L/Fluidhtml/node30.html) i [MIT-ovim materijalom o stabilnosti](https://ocw.mit.edu/courses/2-017j-design-of-electromechanical-robotic-systems-fall-2009/feba89aba74b6dbf71ead4f18284ccb5_MIT2_017JF09_stability.pdf).

## Validacija i granice provjere

- `npm test`: 28 prolaznih testova; fizikalne invarijante, interakcije, preseti, rubne vrijednosti i kombinirani ekstremi svih 13 vježbi.
- `npm run test:rendered`: svih 13 generiranih stranica prolazi bez JavaScript pogrešaka, nebrojčanih koordinata ili dupliciranih HTML identifikatora. Provjereno je 311 kontrola, uključujući dodatne parametre i animacijske odabire.
- DOM pregled: 114 kompaktnih widgeta, bez odbijenih istraživačkih panela; 207 vidljivih glavnih klizača u početnim stanjima i 90 klizača sekundarnih svojstava. Moody se provjerava zasebno.
- Renderirane izdvojene canvas/SVG scene pregledane su u početnim stanjima i odabranim ekstremima. To nije provjera rasporeda cijele stranice u stvarnom pregledniku.
- Korisnik je izričito zatražio preskakanje preglednika. Zato nije provedena završna provjera rasporeda na stvarnom mobitelu, tabletu i računalu. Ne tvrdi se da automatizirani testovi dokazuju visinu svakog widgeta ili raspored na svim uređajima.
- Izvorna geometrija nedostajuće slike Z99 nije rekonstruirana napamet; ostaje prethodno dokumentirani eksplicitni model.
- Lokalni pregled služi se na `http://localhost:4200/`. Nakon izgradnje potrebno je osvježiti stranicu.
