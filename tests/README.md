# Provjera widgeta

Iz korijena repozitorija:

```text
npm ci
npm test
quarto render --to html
npm run test:rendered
npm run snapshots -- 1 2 3 4 5 6 7 8 9 10 11 12 13
```

Potrebni su Node.js 22.12+ ili 24+ i Quarto za izgradnju stranica. `widget-harness.cjs` izvršava aktivne skripte uz jsdom i native canvas. Ne izvršava Quarto navigaciju, udaljeni MathJax ni druge vanjske pregledničke biblioteke. DOM i fizikalni testovi nisu zamjena za završnu provjeru prikaza u stvarnom pregledniku.

`MF1_RENDERED=1` bira izgrađeni HTML za snimke. `MF1_EXTREME=min` ili `max` primjenjuje isto rubno stanje na sve rasponske kontrole. Snimke i strojni izvještaj nastaju u `output/audit/`; ne ulaze u Git.

`moody-protection.json` sadrži pregledani kontrolni sažetak zaštićenog bloka, izvorni Git commit i pet dopuštenih korekcija točnosti. Ne osvježavati ga automatski pri promjeni widgeta; nova razlika traži stručni pregled u skladu s korisnikovom iznimkom.
