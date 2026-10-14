# Bruinsma Protect — Intune klant-kit

Kant-en-klare voorbeelden om **Bruinsma Protect** via Microsoft Intune (of GPO) bij een klant te forceren, met CIPP-rapportage en domein-squatting.

## Bestanden

| Bestand | Doel |
| --- | --- |
| [`edge-extension-settings.json`](edge-extension-settings.json) | Force-install van de Edge-extensie |
| [`bruinsma-protect-managed-settings.json`](bruinsma-protect-managed-settings.json) | Managed settings (CIPP, squatting, branding) |
| [`../macos-linux/edge-managed-policy.json`](../macos-linux/edge-managed-policy.json) | Volledige Edge-policy (ExtensionSettings + 3rdparty) |

## Stappen (Intune)

1. Publiceer of sideload de extensie en noteer de **Edge extension ID** (32 tekens).
2. Vervang overal `REPLACE_WITH_EDGE_EXTENSION_ID`.
3. Vul CIPP in:
   - `cippServerUrl` → basis-URL van jullie CIPP-host (zonder `/api/PublicPhishingCheck`)
   - `cippTenantId` → klant-tenant-ID of domein
4. Pas `urlAllowlist` / `domainSquatting.protectedDomains` aan met klant-/partnerdomeinen (optioneel; Microsoft 365-baseline zit al in de detectieregels).
5. In Intune → **Devices** → **Configuration** → nieuw **Settings catalog** of **Administrative Templates** / Edge policy:
   - Configureer **Configure extension management settings** met de inhoud van `edge-extension-settings.json` (of het ExtensionSettings-blok uit de volledige policy).
   - Configureer managed storage / 3rdparty extension settings met `bruinsma-protect-managed-settings.json`.
6. Wijs toe aan de klantgroep, sync een test-device, controleer `edge://policy` en Options → CIPP-testknop.

## CIPP-checklist

- Alleen **high/critical** (en geblokkeerde squatting) worden gerapporteerd.
- Payload `source` is **Bruinsma Protect**.
- Endpoint: `{cippServerUrl}/api/PublicPhishingCheck`.
- Test eerst via Options → **CIPP-test versturen** (geen opslaan nodig).

## Privacy / AVG

Zie [`docs/privacy-avg.md`](../../docs/privacy-avg.md). Zet `customBranding.privacyPolicyUrl` naar jullie publieke privacy-URL als die klaar is.
