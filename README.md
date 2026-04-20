# Interni README — Status Redizajna (Travanj 2026)

Ova datoteka je interni radni sažetak repozitorija za kolegij **Mehanika fluida 1**. Služi kao primarna referenca za provedene promjene i trenutni status skripte.

## Svrha projekta

Transformacija statičnih `.qmd` materijala u interaktivno, moderno edukacijsko iskustvo (Quarto skripta).

## Izvršeni Redizajn (Travanj 2026)

Dovršen je sveobuhvatan redizajn svih 13 vježbi prema **"Clean & Minimal"** standardu:

- **Tipografija i stil:** Implementiran `custom.css` s Inter fontom, čistom bijelom pozadinom i plavim akcentima (#2563EB). Uklonjeni svi glassmorphism i dark-mode efekti radi veće čitljivosti.
- **Struktura zadataka:**
  - Standardizirani naslovi: `### Zadatak Z## — [Naslov] {.unnumbered}`.
  - Parametri u dvije kolone: `zadano-grid` sustav s Markdown tablicama za "Zadano" i listama za "Odrediti".
  - Transparentnost rješenja: Uklonjeni collapsible (preklopni) elementi; rješenja su sada trajno vidljiva ispod teksta zadatka.
- **Interaktivni elementi:**
  - Svaki simulator odvojen je horizontalnom linijom (`widget-divider`) i jasno označen (`⚙️ Interaktivni simulator`).
  - "Fizikalni uvid" je premješten ispod simulatora i vizualno istaknut plavom lijevom marginom.
- **LaTeX standardizacija:** Svi matematički izrazi prebačeni su u standardne delimitere (`$` za inline, `$$` za display) kroz cijelu skriptu.

## Tehničke stabilizacije i popravci

Nakon redizajna, provedena je faza stabilizacije koda:

1.  **Popravak vidljivosti simulatora:** Riješen problem gdje su simulatori (npr. Z23 u Vježbi 3) bili prikazani kao sirovi kod. Sav HTML/JS kod je ispravno ugniježđen u ````{=html}`` blokove i očišćen od suvišnih uvlaka.
2.  **Stabilizacija animacija (Vježba 1):** Uklonjen bug višestrukih animacijskih petlji u zadacima Z4, Z7 i Z8. Brzina simulatora je sada stabilna i ne raste pri promjeni parametara na klizačima.
3.  **Quarto konfiguracija:** `_quarto.yml` je optimiziran (prebačen na `type: website`) kako bi se osiguralo ispravno renderiranje cijele knjige bez grešaka u hijerarhiji.

## Trenutna struktura

- `index.qmd`: Početna stranica.
- `vjezba_01.qmd` – `vjezba_13.qmd`: Poglavlja s integriranim interaktivnim simulatorima.
- `_quarto.yml`: Glavna konfiguracija (Website mode).
- `custom.css`: Globalni CSS standard.

## Operativne upute

Za renderiranje cijelog projekta:
```bash
quarto render
```
Nakon renderiranja, izlaz se nalazi u mapi `_site/` (ili `_book/` ovisno o konfiguraciji).

## Status
✅ Redizajn završen
✅ Simulatori vidljivi i funkcionalni
✅ Animacije stabilizirane
✅ Render prolazi bez grešaka (Verified: 20.04.2026.)
