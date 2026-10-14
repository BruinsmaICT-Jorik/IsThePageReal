# Bruinsma Protect — Microsoft Edge uitrol (Bruinsma)

Deze fork is gebrandmerkt als **Bruinsma Protect**. Hieronder staan de praktische stappen om de extensie als eigen Edge-extensie uit te rollen bij klanten.

## 1. Pakket maken

Maak een distributie-zip zonder ontwikkelbestanden:

```bash
npm run package:edge
```

Dit schrijft `dist/Bruinsma Protect-edge.zip`. Die zip upload je naar Edge Add-ons Partner Center, of je gebruikt hem voor een private update-host.

Inhoud die meegaat: `manifest.json`, `scripts/`, `popup/`, `options/`, `config/`, `rules/`, `images/`, `styles/`, `blocked.html`.

## 2. Publiceren in Edge Add-ons (aanbevolen voor klanten)

1. Maak een account in [Microsoft Partner Center – Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/overview).
2. Maak een nieuwe extensie en upload `dist/Bruinsma Protect-edge.zip`.
3. Vul store-listing in (naam, beschrijving, screenshots, privacybeleid).
4. Na goedkeuring krijg je een **extension ID** (32 tekens).
5. Vervang overal `REPLACE_WITH_EDGE_EXTENSION_ID` door die ID:
   - `enterprise/macos-linux/edge-managed-policy.json`
   - `enterprise/Deploy-Windows-Chrome-and-Edge.ps1` (`$edgeExtensionId`)
   - Intune/GPO ExtensionSettings

> Tip: zolang de extensie nog niet in de store staat, kun je hem handmatig testen via `edge://extensions` → Developer mode → **Load unpacked**.

## 3. Force-install via Intune / GPO

Gebruik managed policy zodat Edge de Bruinsma-extensie forceert en branding locked is.

### ExtensionSettings (voorbeeld)

```json
{
  "ExtensionSettings": {
    "JOUW_EDGE_EXTENSION_ID": {
      "installation_mode": "force_installed",
      "update_url": "https://edge.microsoft.com/extensionwebstorebase/v1/crx"
    }
  }
}
```

### Managed settings (branding)

Volledige template: [`enterprise/macos-linux/edge-managed-policy.json`](../enterprise/macos-linux/edge-managed-policy.json).

Belangrijke defaults:

| Setting | Waarde |
| --- | --- |
| companyName | Bruinsma |
| productName | Bruinsma Protect |
| primaryColor | `#299DCF` |
| supportEmail | info@bruinsmakantoor.nl |
| supportUrl | https://bruinsmakantoor.nl/ict/ |
| logoUrl | https://bruinsmakantoor.nl/wp-content/uploads/2024/02/favicon_kantoor.png |

Windows-script: `enterprise/Deploy-Windows-Chrome-and-Edge.ps1` (zet eerst `$edgeExtensionId`).

## 4. Private hosting (zonder Edge Store)

Als je niet via de publieke store wilt:

1. Genereer een private key / CRX (of gebruik een interne update feed).
2. Host `updates.xml` + CRX op een HTTPS-URL binnen jullie beheer.
3. Zet in ExtensionSettings:

```json
{
  "installation_mode": "force_installed",
  "update_url": "https://updates.jouwdomein.nl/isthepagereal/updates.xml"
}
```

4. Deel de extension ID die bij die private key hoort met Intune/GPO.

## 5. Handmatige validatie

1. Open Edge → `edge://extensions` → Load unpacked (projectmap) of installeer via policy.
2. Controleer popup: titel **Bruinsma Protect**, company **Bruinsma**, blauw icoon.
3. Open Options → Branding/About: Bruinsma-teksten en kleuren.
4. Open `test-pages/phishing-basic.html` en controleer detectie/blokkade.
5. Open `edge://policy` en bevestig dat managed settings binnenkomen.

## 6. Licentie / attribution

Deze codebase is een fork van [Check by CyberDrain](https://github.com/CyberDrain/Check) onder **AGPL-3.0**. Houd broncode beschikbaar voor klanten die de extensie ontvangen, en behoud attribution in About.
