# Naziv kolegija - online materijali

Ovaj repozitorij sadrzi Quarto online skriptu za kolegij **Naziv kolegija**.

## Sadrzaj

- `index.qmd`: pocetna stranica kolegija
- `tema_XX.qmd`: poglavlja ili nastavne cjeline
- `_quarto.yml`: konfiguracija Quarto book projekta
- `custom.css`: zajednicki vizualni stil
- `.github/workflows/publish.yml`: automatska objava na GitHub Pages

## Generiranje materijala

```bash
quarto render
```

Za PDF verziju, ako je podrzana:

```bash
quarto render --to pdf
```

## Objava

Push na `main` pokrece GitHub Actions workflow koji renderira projekt i objavljuje ga na GitHub Pages.

## Operativna uputa

Za izradu i odrzavanje kolegija koristi `README_agent_ready.md` kao glavni workflow dokument.
