# Bruinsma Protect

Manifest V3 browser extension that detects phishing sites impersonating Microsoft 365 sign-in pages. This is Bruinsma's branded fork of [Check by CyberDrain](https://github.com/CyberDrain/Check) (AGPL-3.0), intended for customer rollout via Microsoft Edge.

## Branding

Default branding lives in `config/branding.json`:

- **Company:** Bruinsma
- **Product:** Bruinsma Protect
- **Primary color:** `#299DCF`
- **Support:** info@bruinsmakantoor.nl / https://bruinsmakantoor.nl/ict/

Icons use the Bruinsma “b” mark in `images/icon{16,32,48,128}.png`.

## Features

- **Detection engine** – loads rules from `rules/detection-rules.json` and analyses URLs/page content
- **Configuration management** – merges local settings, branding, and browser policies (GPO/Intune)
- **Policy enforcement & logging** – enterprise policies, compliance mode, audit events
- **Custom branding** – logos, colors, and messaging via `config/branding.json` or managed policy
- **Options & popup** – admin settings and status UI

## Requirements

- Edge 88+ / Chrome 88+ (Manifest V3)
- Optional enterprise management via Group Policy or Microsoft Intune

## Installation (developer / test)

### Edge / Chrome

1. Clone this repository.
2. Open `edge://extensions` or `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the project directory.
4. Verify with `test-pages/` and the popup/options pages.

### Package for Edge distribution

```bash
npm run package:edge
```

Creates `dist/Bruinsma Protect-edge.zip` for Edge Add-ons Partner Center or private hosting.

Full rollout steps: [docs/edge-deployment.md](docs/edge-deployment.md).

## Enterprise deployment

- Edge managed policy template: `enterprise/macos-linux/edge-managed-policy.json`
- Windows deploy script: `enterprise/Deploy-Windows-Chrome-and-Edge.ps1`
- Replace `REPLACE_WITH_EDGE_EXTENSION_ID` / `$edgeExtensionId` after publishing to Edge Add-ons

Managed settings follow `config/managed_schema.json`.

## Configuration

- **Policies** – `config/managed_schema.json`
- **Branding** – `config/branding.json`
- **Detection rules** – `rules/detection-rules.json` (or remote URL via policy)

## License

Licensed under AGPL-3.0. Based on Check by CyberDrain; keep attribution and source availability when distributing.
