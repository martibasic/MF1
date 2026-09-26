# Vizualna dorada widgeta — 26. rujna 2026.

Zajednički izgled obuhvaća 115 kontejnera widgeta kroz svih 13 vježbi. Glavne i zasebne pomoćne grafike imaju punu širinu, jedna ispod druge. Kontrole, rezultati i objašnjenja mogu zadržati više stupaca; na užim zaslonima se slažu okomito.

## Izgled i raspored

- Novi zajednički stil u `assets/mf1-layout.css`: svijetle grafičke površine, jasnija tipografija, tamnoplava glavna očitanja, ujednačeni klizači, vidljiv fokus tipkovnice i prostraniji razmaci.
- `assets/mf1-layout.js` prepoznaje stvarne grane DOM-a koje sadrže grafiku, uključujući stare lokalne flex/grid rasporede. Promjene načina rada ponovno uređuju nove grafike i kontrole.
- Vektorske konstrukcije u V11 ostaju vidljive. Sedam prijašnjih bočnih panela u V11/V12 izdvojeno je u zasebne SVG prikaze ispod fizičke skice: pražnjenje, snaga vjetra, Pelton, masa rakete, opterećenje prirubnice, momenti konzole i tangencijalna bilanca rasprskivača.
- Proširen je profil uljnog filma Z7. Z53 ima dodatni čitljiv prikaz konačnih sila s izričito označenim vlastitim mjerilom; zajednička skala u usporedbi balona ostaje sačuvana.
- Strelice imaju svijetli obrub i jasnije oznake. Dijagonalne oznake udaljene su od zajedničkih vrhova komponenti i rezultante. Nulti vektor ne dobiva umjetnu duljinu.
- Moodyjev izvorni blok, njegove krivulje i izračun ostaju jednaki pregledanom kontrolnom sažetku; zajednički stil uređuje vanjski okvir.

## Geometrija i fizika

Ujednačeno skaliranje u V5 i Z7 čuva kutove i smjerove pri promjeni dimenzija canvasa. SVG paneli zadržavaju svoje izvorne koordinate i omjere. Pascalove sile imaju zajedničko prilagođeno mjerilo, a ulazna strelica završava na opterećenom klipu. Bilance i jednadžbe modela ostaju povezane s istim kontrolama.

## Provjera

- `npm test`: 34/34 prolaze. Uz postojeće fizikalne testove dodane su provjere pune širine grafika i promjena načina rada, skrivenih zamijenjenih canvasa, izotropnog skaliranja, zatvaranja brzinskih trokuta i bilance sila te granica vektora V12 pri ekstremima kontrola.
- `quarto render --to html`: izgrađen predgovor i svih 13 vježbi. V12 je ponovno izgrađen nakon završnog odmicanja oznaka od rubova. Zajednički izgrađeni resursi uspoređeni su s izvorima.
- `npm run test:rendered`: svih 13 HTML stranica prolazi provjeru kontrola bez JavaScript izuzetaka, nebrojčanih koordinata i dupliciranih identifikatora.
- Pregledane su izdvojene canvas/SVG snimke svih vježbi te zajednički maksimumi V1, V5, V6, V11 i V12. Snimke se nalaze u ignoriranoj mapi `output/audit/`.
- `git diff --check` prolazi.

Preglednik nije bio dostupan u ovoj sesiji: inventar nije vratio nijedan preglednik, a otvaranje ugrađenog preglednika prijavilo je nedostupnost. Zato su provjere rasporeda provedene nad DOM-om i CSS-om, uz vizualni pregled zasebno renderiranih grafika. Nije provedena završna provjera cijele stranice u živom pregledniku na različitim širinama zaslona.
