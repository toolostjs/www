# Roadmap

Diese Roadmap fokussiert sich auf die Weiterentwicklung des SDKs ausgehend vom aktuellen `1.0.x` Stand.

## Prinzipien

- Endpoint-Paritaet zur Toolost API hat Prioritaet.
- Starke Typsicherheit und vorhersagbares Runtime-Verhalten bleiben Kernziele.
- Rueckwaertskompatible Erweiterungen werden bevorzugt.
- Methodennamen bleiben konsistent, sinnvolle Aliase bleiben erhalten.

## Kurzfristig (v1.1)

- Testabdeckung fuer Retry-Timing, `skipAuth` und Request-Randfaelle erweitern.
- Mehr praxisnahe Doku-Beispiele fuer Release-Lifecycle und Preference-Workflows.
- Helper-APIs fuer haeufige Pagination-Muster ergaenzen.
- Fehler-Metadaten und Troubleshooting-Hinweise verbessern.

## Mittelfristig (v1.2-v1.4)

- Optionale Integrationstest-Harness fuer Sandbox/Produktiv-API einfuehren.
- Optionale Runtime-Validatoren fuer kritische Write-Payloads ergaenzen.
- Erweiterte Analytics/Catalog/Audience-Manager hinzufuegen, sobald API-Endpunkte final sind.
- Request-Level Middleware/Hooks fuer Observability und Logging einfuehren.

## Langfristig (v2.0 Kandidaten)

- ESM-first Distribution evaluieren, inklusive Dual-Package-Strategie wo notwendig.
- Generierte Endpoint-Clients auf Basis eines kanonischen API-Schemas pruefen.
- First-class Pagination Iterator Helper einfuehren.
- Deprecated Aliase nach Migrationsfenster gezielt bereinigen.

## Dokumentations-Roadmap

- Endpoint-fuer-Endpoint Request/Response-Beispiele aus realen API-Payloads.
- Migrationsguides fuer jede Minor- und Major-Version.
- Cookbook-Rezepte fuer typische Workflows:
  - OAuth Onboarding
  - Release erstellen und einreichen
  - Track-Ersetzung und Validierungen
  - Preference-Synchronisierung

## Contribution-Roadmap

- Contributor-Konventionen fuer neue Endpunkte festlegen:
  - verpflichtende Tests
  - verpflichtende JSDoc-Updates
  - verpflichtende Doku-Updates
- Release-Checklisten fuer Versionsbump und Changelog-Validierung automatisieren.

## Kompatibilitaetspolitik (Vorschlag)

- Patch-Releases: Bugfixes, Typ-Korrekturen, Doku-Updates.
- Minor-Releases: rueckwaertskompatible Endpoint/Typ-Erweiterungen.
- Major-Releases: Breaking Changes mit Migrationsdokumentation.

## Hinweis

Roadmap-Punkte haengen von der Weiterentwicklung der Toolost API ab und koennen priorisiert werden.
