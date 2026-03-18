# Mehanika Fluida 1 - Skripta za vježbe

Ovaj repozitorij sadrži objedinjenu Quarto skriptu za kolegij **Mehanika fluida 1**.

## Sadržaj
- `index.qmd`: Početna stranica skripte.
- `vjezba_XX.qmd`: Pojedinačna poglavlja za svaku vježbu (teorija + zadaci).
- `_quarto.yml`: Konfiguracijska datoteka za Quarto.

## Kako generirati skriptu?

Da biste generirali HTML ili PDF verziju, osigurajte da imate instaliran [Quarto](https://quarto.org/) i pokrenite:

```bash
# Za HTML verziju
quarto render

# Za PDF verziju (zahtijeva TinyTeX)
quarto render --to pdf
```

## GitHub Pages
Ovaj repozitorij je pripremljen za objavu putem GitHub Pages.
U postavkama repozitorija pod `Pages` odaberite `GitHub Actions` kao source i koristite [Quarto GitHub Action](https://quarto.org/docs/publishing/github-pages.html#github-action).
