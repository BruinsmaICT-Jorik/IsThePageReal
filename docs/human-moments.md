# Bruinsma Protect — menselijke momenten (fase 2)

Productfeatures die de extensie als **digitale conciërge** positioneren, naast de detectie-engine.

## A — Veilige gids

- Knop **Ga naar echte Microsoft 365** op de blocked page en in de popup.
- Policy / setting: `safeStartUrl` (standaard `https://www.office.com`).
- Configureerbaar via Intune managed settings of Options (merged config).

## B — Bruinsma-moment

- Blocked page met coach-stappen, duidelijke NL-uitleg en wisselende awareness-tip.
- Technische details blijven beschikbaar (ingeklapt).

## C — Positieve zekerheid

- Op echte Microsoft-inlogdomeinen: badge “Dit is de echte Microsoft-inlog — Beschermd door Bruinsma”.
- Teksten via `branding.json` → `features.validBadgeTitle` / `validBadgeSubtitle`.

## D — Meld & help

- Popup: **Dit lijkt verdacht** → `SUBMIT_USER_REPORT` / `user_suspicious_report` (webhook + CIPP indien geconfigureerd, altijd lokaal gelogd).
- Blocked page: **Was dit een fout?** → false-positive report of mailto naar Bruinsma support.

## Gerelateerde bestanden

- `blocked.html`, `scripts/blocked.js`
- `popup/popup.html`, `popup/popup.js`
- `scripts/content.js` (valid badge)
- `scripts/background.js` (`SUBMIT_USER_REPORT`)
- `config/managed_schema.json` (`safeStartUrl`)
