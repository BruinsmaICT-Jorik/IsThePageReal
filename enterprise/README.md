# Bruinsma Protect — Enterprise Deployment

Enterprise-uitrolbestanden voor **Bruinsma Protect** (Microsoft 365 phishingbescherming).

## Browser Support

- **Chrome/Edge**: Full enterprise deployment support via Group Policy (Windows) and MDM (macOS/Linux)
- **Firefox**: Enterprise deployment via `policies.json` file (all platforms)

## Contents

- `intune/` - **Bruinsma klant-kit** (Intune force-install + CIPP managed settings)
- `admx/` - Group Policy Administrative Templates (Chrome/Edge)
   - `Check-Extension.admx` - Policy definitions file
   - `en-US` - English language resources
      - `Check-Extension.adml` - XML configuration file for Check
- `macos-linux/` - Unix-based deployment (macOS & Linux)
   - Configuration Profiles for macOS
   - Browser policy files for Linux (incl. Edge CIPP/squatting template)
   - Universal deployment scripts
- `firefox/` - Firefox-specific deployments (all platforms)
   - `policies.json` - Template for Firefox enterprise policy management
- `Check-Extension-Policy.reg` - Windows registry file for direct policy application (Chrome/Edge)
- `Deploy-ADMX.ps1` - PowerShell script for Windows ADMX deployment (Chrome/Edge)
- `Deploy-Windows-Chrome-and-Edge.ps1` - PowerShell script for manual Windows deployment, also used for RMM deployment

## Quick Links

- **Intune klant-kit (Bruinsma)**: See [`intune/README.md`](intune/README.md)
- **Chrome/Edge Deployment**: See `Deploy-Windows-Chrome-and-Edge.ps1` for Windows, `macos-linux/` for macOS/Linux
- **Firefox Deployment**: See `firefox/policies.json` template and [Firefox Deployment Guide](../docs/deployment/firefox-deployment.md)
- **Configuration Schema**: See `../config/managed_schema.json` for all available settings
- **Webhook / CIPP**: See `../docs/webhooks.md` (`source`: Bruinsma Protect)
- **Privacy / AVG**: See `../docs/privacy-avg.md`

## Security Considerations

- Always use HTTPS URLs for custom rules and logos
- Regularly update custom detection rules
- Monitor debug logging usage (performance impact)
- Test policies in a lab environment before production deployment
