# Bruinsma Protect — Privacy & AVG

Korte privacyverklaring voor de browserextensie **Bruinsma Protect** (fork van Check by CyberDrain, AGPL-3.0).

## Wat doet de extensie?

Bruinsma Protect scant webpagina’s in de browser op signalen van phishing die Microsoft 365-inlogpagina’s nabootsen, en kan verdachte pagina’s blokkeren of waarschuwen.

## Welke gegevens worden verwerkt?

Afhankelijk van configuratie kan de extensie lokaal of naar een door de organisatie geconfigureerde endpoint sturen:

| Gegeven | Waar | Doel |
| --- | --- | --- |
| URL / domein van de bezochte pagina | Lokaal; optioneel CIPP/webhook | Detectie en incidentmelding |
| Detectieresultaat (type, ernst, regel) | Lokaal activity log; optioneel CIPP/webhook | Beveiligingsmonitoring |
| Extensieversie, User-Agent | Optioneel in rapportages | Troubleshooting |
| Tenant-ID / domein (`cippTenantId`) | Alleen als CIPP is ingeschakeld | Multi-tenant toewijzing |
| Optioneel browserprofiel (e-mail/identity) | Alleen als de browser identity-API beschikbaar is én rapportage actief is | Context bij CIPP-meldingen |

Er is **geen** eigen Bruinsma-telemetrie of advertentie-tracking. `analytics.enabled` staat standaard uit in branding.

## Waar gaan gegevens naartoe?

- **Standaard:** alleen lokaal in de browser (extension storage / activity log).
- **CIPP:** alleen als `enableCippReporting` aan staat en `cippServerUrl` is gezet. Dan POST naar `{cippServerUrl}/api/PublicPhishingCheck`. Alleen high/critical (en geblokkeerde domain-squatting) worden gestuurd.
- **Generic webhook:** alleen als die door policy/opties is geconfigureerd.

Bruinsma ontvangt **geen** automatische kopie van detecties tenzij de klant CIPP of een webhook naar een Bruinsma-beheerde omgeving wijst.

## Rechtsgrond & verantwoordelijkheid

Bij uitrol via Intune/GPO is de **klantorganisatie** (of Bruinsma als verwerker in opdracht) verantwoordelijk voor de verwerkingsgrondslag (doorgaans gerechtvaardigd belang / beveiliging van netwerk en informatie). Gebruikers krijgen via de popup-link **Privacy** toegang tot deze toelichting of een klantspecifieke URL.

## Bewaartermijn

Activity logs blijven in de lokale browseropslag tot ze worden gewist of de extensie wordt verwijderd. Bewaartermijnen op CIPP-/SIEM-zijde volgen het beleid van die omgeving.

## Rechten van betrokkenen

Medewerkers kunnen vragen richten aan de eigen IT-/privacycontactpersoon, of via Bruinsma ICT: [info@bruinsmakantoor.nl](mailto:info@bruinsmakantoor.nl). Ondersteuning: [bruinsmakantoor.nl/ict](https://bruinsmakantoor.nl/ict/).

## Broncode

De extensie is open source onder AGPL-3.0. Upstream: [Check by CyberDrain](https://github.com/CyberDrain/Check). Fork: [BruinsmaICT-Jorik/IsThePageReal](https://github.com/BruinsmaICT-Jorik/IsThePageReal).
