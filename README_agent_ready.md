# Uputa za izradu online nastavnih materijala (Agent Workflow)

> Ova datoteka je glavna operativna uputa za AI agente.
> Pozovi je na pocetku svakog zadatka izrade online skripte.
> Primjenjiva je za bilo koji tehnicki, prirodoslovni ili srodan predmet.
> Agent koji je cita treba je slijediti korak po korak, bez preskakanja faza verifikacije.

---

## Svrha i kontekst

Cilj ovog workflowa je pretvoriti stare ili heterogene nastavne materijale, poput PDF skripti, knjiga, prezentacija, biljeski, skenova i tablica, u moderan, interaktivan i web-objavljen online kolegij u Quarto/GitHub formatu.

Rezultat nije puki digitalni prijepis. Cilj je portal koji:

- jasno strukturira gradivo za online citanje
- ukljucuje interaktivne elemente tamo gdje stvarno pomazu razumijevanju
- prati ujednacen vizualni i pedagoski standard
- automatski se objavljuje na GitHub Pages
- moze se odrzavati i prosirivati kroz semestar

Ova uputa ne pokriva samo tehnicku migraciju u web-format. Ugraduje i nas dosadasnji nacin rada:

- pedagosku doradu, a ne samo prijepis
- ujednacen UX i vizualni standard
- po potrebi interaktivne widgete i vizualizacije
- stvarnu render-verifikaciju prije zakljucka rada
- pripremu za GitHub i automatski deploy

---

## Ulazni materijali

Agent moze raditi s bilo kojim od sljedecih formata:

- PDF skripte, knjige i zbirke zadataka
- DOCX, ODT ili RTF dokumenti
- PPTX ili ODP prezentacije
- LaTeX izvorni kod
- skenovi i fotografije uz OCR obradu
- stare web-stranice ili repozitoriji
- tablice s podacima poput CSV ili XLSX
- kombinacije svega navedenog

Ako su materijali nepotpuni ili neuredeni, agent treba eksplicitno napomenuti:

- sto je izvorni sadrzaj
- sto treba rekonstruirati
- sto nedostaje
- sto treba pedagoski preurediti

Agent ne smije nagadati bez upozorenja kada sadrzaj nije dovoljno jasan.

---

## Trazeni izlaz

Za svaki kolegij treba nastati Quarto `book` repozitorij koji sadrzi:

```text
predmet/
|-- README.md
|-- README_agent_ready.md
|-- _quarto.yml
|-- index.qmd
|-- custom.css
|-- .github/
|   `-- workflows/
|       `-- publish.yml
|-- images/
|-- data/
|-- materijali_izvorno/
|-- predlosci/
|-- tema_01.qmd
|-- tema_02.qmd
`-- tema_03.qmd
```

Nazivi poglavlja prilagodavaju se predmetu, npr.:
`tema_`, `vjezba_`, `predavanje_`, `modul_`, `lab_`, `poglavlje_`

Imenovanje mora biti konzistentno unutar jednog kolegija.

Za svaki kolegij cilj je imati:

- `index.qmd` kao pocetnu stranicu
- niz `.qmd` poglavlja
- `_quarto.yml` s naslovom, autorom i redoslijedom
- `custom.css` ili zajednicki vizualni stil
- `.github/workflows/publish.yml` za automatsku objavu
- tehnicki provjeren HTML izlaz
- po potrebi PDF izlaz
- po potrebi interaktivne ili vizualne didakticke elemente

---

## Definicija gotovog projekta

Projekt se smatra gotovim samo ako su ispunjeni svi uvjeti:

- postoji jasna struktura poglavlja u `_quarto.yml`
- `index.qmd` smisleno uvodi studenta u kolegij
- poglavlja imaju ujednacen format i stil
- slike, formule i tablice su provjerene
- `quarto render` prolazi bez gresaka
- GitHub workflow postoji
- GitHub Pages objava je aktivna ili spremna za aktivaciju
- sadrzaj nije samo prebacen nego je citljiv i nastavnicki upotrebljiv

---

## Obavezna nacela ujednacenosti

Svi kolegiji trebaju slijediti ista nacela:

- isti tip Quarto projekta: `book`
- ista osnovna logika navigacije: naslovnica plus uredena poglavlja
- isti pristup naslovima, podnaslovima, primjerima i zadacima
- slican vizualni identitet i tipografija
- isti standard tehnicke verifikacije prije objave
- isti GitHub Pages workflow model
- isti pristup kvaliteti i odrzavanju

Ako pojedini predmet treba poseban vizualni identitet, promjene trebaju biti planske i kontrolirane, ne ad hoc.

---

## Premium standard materijala

Na temelju dosadasnjeg rada, cilj nije samo digitalizirati skriptu, nego izraditi portal koji doseze premium standard. To ukljucuje:

- jasnu i modernu vizualnu hijerarhiju
- cist i pregledan raspored
- citljivost na desktopu i mobitelu
- kvalitetan prikaz formula, grafova i tablica
- kratke interpretativne blokove tipa `Napomena`, `Fizikalni uvid` ili predmetno-prikladne ekvivalente
- tehnicku robusnost stranice
- interaktivnost tamo gdje stvarno poboljsava razumijevanje

Ako izvorni materijali to opravdavaju, preporuka je da kolegij dobije barem dio interaktivnih komponenti, a ne samo staticki prijepis.

---

## Workflow - korak po korak

Agent provodi sljedece faze redoslijedom. Svaku fazu treba eksplicitno potvrditi ili dokumentirati prije prelaska na sljedecu.

### Faza 1 - Analiza ulaznih materijala

- identificirati sve ulazne datoteke i njihove formate
- procijeniti kvalitetu: citljivost, potpunost, OCR artefakti, encoding
- prepoznati logicke cjeline, teme i prirodni redoslijed gradiva
- zabiljeziti sto nedostaje, sto je zastarjelo, sto treba pedagoski doraditi
- zabiljeziti ima li formula, grafova, tablica, koda ili drugih elemenata koji trebaju poseban tretman

Izlaz ove faze:

- kratki popis tema
- procjena kvalitete materijala
- biljeska o rizicima i nedostacima

---

### Faza 2 - Prijedlog strukture kolegija

- predloziti organizaciju u poglavlja ili tematske cjeline
- predloziti redoslijed koji ima pedagosku logiku
- navesti koja poglavlja imaju potencijal za interaktivne elemente
- ako korisnik nije trazio strogo pracenje postojece strukture, predloziti i eventualna poboljsanja rasporeda

Izlaz ove faze:

- popis poglavlja s kratkim opisom sadrzaja svakog

Ako korisnik zeli potvrditi strukturu prije nastavka, to treba postovati. Ako to nije trazeno i struktura je dovoljno jasna, agent moze nastaviti bez nepotrebnog zaustavljanja.

---

### Faza 3 - Postavljanje kostura projekta

Pripremiti minimalni funkcionalni projekt.

`_quarto.yml` mora sadrzavati barem:

```yaml
project:
  type: book

book:
  title: "Naziv kolegija"
  author: "Autor ili institucija"
  date: "2026-04-01"
  chapters:
    - index.qmd
    - part: "Teme"
      chapters:
        - tema_01.qmd
        - tema_02.qmd
        - tema_03.qmd

format:
  html:
    theme: cosmo
    css: custom.css
    toc: false
    number-sections: true
    code-fold: true
    lang: hr
```

`index.qmd` mora sadrzavati:

- naziv kolegija i kratki uvod
- svrhu i nacin koristenja materijala
- pregled strukture kolegija
- napomene studentima

`custom.css` mora definirati:

- boje i tipografiju
- izgled naslova i podnaslova
- sirinu sadrzaja
- stilove blokova tipa `Napomena`, `Primjer`, `Zadatak`, `Interpretacija`
- stilove tablica i koda

`.github/workflows/publish.yml` mora biti standardni Quarto -> GitHub Pages workflow.

Izlaz ove faze:

- funkcionalan kostur koji prolazi `quarto render`

---

### Faza 4 - Prijenos i uredivanje sadrzaja

Za svako poglavlje:

1. prenijeti sadrzaj iz izvornih materijala u `.qmd` format
2. ne raditi slijepi copy-paste nego preoblikovati za citanje na webu
3. ocistiti OCR artefakte, duplikate, prijelome stranica i encoding greske
4. duge blokove teksta rastaviti na manje, pregledne cjeline
5. formule zapisati u cistom LaTeX/Quarto formatu
6. slike smisleno imenovati i premjestiti u `images/`
7. podatke izdvojiti u `data/` gdje je primjenjivo
8. jasno razdvojiti teoriju, primjere i zadatke

Standardna logika poglavlja, kada je primjenjivo:

1. uvod i motivacija teme
2. kljucni pojmovi i definicije
3. teorijski okvir
4. izvodenja formula, gdje je pedagoski relevantno
5. rijeseni primjeri
6. zadaci za samostalni rad
7. sazetak glavnih ideja
8. dodatni resursi, grafovi ili poveznice

Izlaz ove faze:

- sva poglavlja popunjena sadrzajem u `.qmd` formatu

---

### Faza 5 - Standardni blokovi i struktura unutar `.qmd`

Radi ujednacenosti koristiti iste tipove blokova kad god je smisleno:

```markdown
::: {.callout-note}
## Napomena
Tekst napomene.
:::

::: {.callout-tip}
## Primjer
Opis primjera.
:::

::: {.callout-warning}
## Zadatak
Tekst zadatka.
:::

::: {.callout-important}
## Interpretacija
Fizikalni, inzenjerski ili konceptualni uvid.
:::
```

Naziv interpretativnog bloka prilagoditi predmetu:

- `Fizikalni uvid`
- `Inzenjerski smisao`
- `Kljucna interpretacija`
- `Sto treba zapamtiti`
- `Didakticka napomena`

Izlaz ove faze:

- poglavlja imaju prepoznatljiv i ujednacen unutarnji format

---

### Faza 6 - Interaktivni elementi

Interaktivni elementi imaju smisla samo kada:

- vizualiziraju apstraktan proces koji je tesko razumjeti iz formule
- prikazuju utjecaj parametara u stvarnom vremenu
- povezuju numericki rezultat s geometrijom ili grafickom intuicijom
- upozoravaju na granicne slucajeve ili lom ponasanja sustava

Tehnicki zahtjevi za widgete:

- vizualno uskladeni s ostatkom portala
- imaju jasne kontrole i citljive oznake
- sadrze kratko objasnjenje sto korisnik promatra
- stabilni su i ne smiju rusiti render stranice
- upotrebljivi su na manjim ekranima

Preporuke:

- koristiti Observable JS (`{ojs}`) za interaktivne grafove unutar Quarto-a kada je to dovoljno
- za slozenije simulacije koristiti izolirane `<script>` blokove i performantnu animaciju
- vise widgeta na istoj stranici testirati zajedno

Izlaz ove faze:

- identificirani i implementirani interaktivni elementi s nastavnim smislom

---

### Faza 7 - Tehnicka verifikacija

Prije objave obavezno provjeriti:

- `quarto render` prolazi bez gresaka
- sva poglavlja su ukljucena u `_quarto.yml`
- formule se prikazuju ispravno
- slike postoje i prikazuju se
- tablice su citljive
- poveznice nisu pukle
- widgeti rade kako je zamisljeno
- nema problema s encodingom, posebno za hrvatske znakove
- sadrzaj je citljiv na manjim ekranima
- `index.qmd` smisleno uvodi studenta u kolegij
- GitHub workflow postoji i ispravno je konfiguriran

Izlaz ove faze:

- potvrda da sve prolazi
- ili popis gresaka za ispravak

---

### Faza 8 - Priprema za GitHub Pages objavu

Standardni Git postupak za inicijalni projekt:

```bash
git init
git add .
git commit -m "Inicijalna struktura kolegija"
git remote add origin https://github.com/korisnik/predmet.git
git push -u origin main
```

Za azuriranja:

```bash
git add .
git commit -m "Opis promjene"
git push origin main
```

Provjeriti u GitHub postavkama:

- `Settings > Pages > Source` je `GitHub Actions`
- `main` je primarna grana
- workflow prolazi bez gresaka

Izlaz ove faze:

- repozitorij objavljen na GitHub Pages ili spreman za objavu

---

## Standard kvalitete i UX

Svi kolegiji trebaju dosezati isti standard:

- moderan, cist i jasan vizualni izgled
- jaka vizualna hijerarhija
- citljiv prikaz formula, tablica i grafova
- konzistentna tipografija kroz cijeli kolegij
- responzivnost na desktopu i mobilnom uredaju
- kratki interpretativni blokovi koji pomazu razumijevanju
- interaktivnost tamo gdje stvarno pomaze, ne kao dekoracija

---

## Verifikacija i kontrola kvalitete

Materijal nije dovrsen samo zato sto su datoteke napisane. Prije zakljucka rada treba provjeriti:

- prolazi li `quarto render` bez gresaka
- jesu li sva poglavlja ukljucena u `_quarto.yml`
- rade li formule, slike, tablice i poveznice
- rade li widgeti kako je zamisljeno
- postoji li problem s encodingom ili prikazom hrvatskih znakova
- je li sadrzaj citljiv i na manjim ekranima
- postoji li sadrzajna sinkronizacija izmedu izvora, teksta i ugradenih rjesenja

---

## Odrzavanje kroz semestar

Za predmete koji se aktivno koriste tijekom nastave preporuceni ciklus je:

1. dodati ili doraditi sadrzaj po nastavnim jedinicama
2. lokalno provjeriti render
3. commitati i pushati promjene
4. provjeriti GitHub Actions deploy
5. po potrebi brzo ispraviti uocene greske

Za vece kolegije preporuka je voditi i jednostavan dnevnik promjena kroz kvalitetne commit poruke.

---

## Pravila verzioniranja

- koristiti manje, smisleno grupirane commitove
- ne mijesati stilske i sadrzajne promjene u istom commitu
- jasno oznaciti je li promjena tehnicka ili pedagoska
- prije veceg refaktora najprije osigurati da trenutna verzija prolazi render

Primjeri dobrih commit poruka:

```text
Dodana pocetna struktura kolegija
Migrirana poglavlja 1-3 iz PDF skripte
Doradeni primjeri i zadaci u temi 04
Dodan GitHub Pages workflow
Poboljsan mobilni prikaz widgeta
Dodana interaktivna vizualizacija u temi 02
```

---

## Kontrolna lista prije objave

Prije zakljucenja rada na novom kolegiju treba proci ovu listu:

- naslov, autor i datum u `_quarto.yml` su ispravni
- `index.qmd` ima smislen uvod i pregled kolegija
- sva poglavlja su ukljucena u redoslijed knjige
- nema mrtvih poveznica ili nedostajucih slika
- formule se prikazuju ispravno
- widgeti rade i nisu vizualno razbijeni
- `quarto render` prolazi
- workflow za GitHub Pages postoji
- predmetni `README.md` sadrzi osnovne upute
- repozitorij je spreman za `git push`

---

## Sto agent preuzima automatski, a sto treba eksplicitno zadati

Podrazumijeva se da agent automatski:

- predlaze strukturu poglavlja ako nije zadana
- standardizira formatiranje i nazive
- priprema Quarto kostur projekta
- dodaje workflow za GitHub Pages
- primjenjuje ujednacen stil i osnovna pravila kvalitete

Treba eksplicitno zadati ako korisnik zeli:

- da se strogo prati postojeci raspored bez preuredivanja
- samo tehnicku migraciju bez pedagoske dorade
- bez interaktivnih elemenata
- poseban vizualni identitet
- PDF kao prioritet umjesto HTML-a

---

## Kako pokrenuti novi kolegij

Za novi predmet korisnik treba dostaviti:

1. naziv kolegija
2. ulazne materijale
3. zeljenu strukturu, ako vec postoji
4. zeljeni izlaz, HTML, PDF ili oboje
5. posebne zahtjeve, poput stila, jezika, tona, razine detalja ili interaktivnosti

### Osnovni prompt za agenta

```text
Koristi README_agent_ready.md kao operativnu uputu.

Za kolegij [NAZIV KOLEGIJA] zelim iz prilozenih materijala izraditi
Quarto online skriptu za GitHub Pages objavu.

Materijali su u [POPIS FORMATA I DATOTEKA].

Zadrzi ujednacen izgled i standard prema uputi.
Predlozi strukturu poglavlja, pripremi _quarto.yml, index.qmd
i pocetni skup .qmd datoteka, pa zatim kreni s prijenosom sadrzaja.
```

### Varijante za specificne slucajeve

```text
Primijeni README_agent_ready.md - radi samo tehnicku migraciju,
bez vecih pedagoskih izmjena.
```

```text
Primijeni README_agent_ready.md - fokusiraj se na premium verziju:
predlozi i ugradi interaktivne elemente gdje imaju nastavni smisao.
```

```text
Primijeni README_agent_ready.md - strogo prati zadanu strukturu,
ne predlazi preuredivanje.
```

```text
Koristi README_agent_ready.md i postojece predloske iz mape predlosci.
Najprije postavi kostur novog kolegija, a tek zatim kreni s prijenosom sadrzaja.
```

---

## Predlosci za ponovnu upotrebu

Repozitorij treba sadrzavati mapu `predlosci/` s:

- `predlosci/_quarto_template.yml`
- `predlosci/index_template.qmd`
- `predlosci/poglavlje_template.qmd`
- `predlosci/custom_template.css`
- `predlosci/publish_template.yml`
- `predlosci/README_predmet_template.md`

Predlosci ubrzavaju otvaranje novog kolegija i osiguravaju konzistentnost. Oni ne zamjenjuju ovu uputu nego sluze kao operativna baza.

---

## Minimalni start za novi kolegij

Ako treba brzo pokrenuti novi predmet, minimalni inicijalni paket treba sadrzavati:

- `_quarto.yml`
- `index.qmd`
- `custom.css`
- barem 2 do 3 pocetna poglavlja ili prazna kostura poglavlja
- `.github/workflows/publish.yml`
- predmetni `README.md`

Ako nista drugo nije zadano, to je minimalni standard od kojeg treba krenuti.

---

## Zavrsna napomena

Ova datoteka je master-uputa za AI agente, ne README jednog pojedinog predmeta.

Pozivaj je na pocetku svakog zadatka izrade online skripte. Agent koji je primi treba provesti sve faze redom, dokumentirati bitne korake i ne preskakati verifikaciju prije objave.

Cilj nije samo digitalizacija. Cilj je kvalitetan, moderan i odrziv nastavni portal koji studentima stvarno pomaze u ucenju.
