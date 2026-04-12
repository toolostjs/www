# Oeffentliche API Oberflaeche

Dieses Dokument listet die Package-Exporte aus `src/index.ts` auf.

## Klassen-Exporte

- `TooLostClient`
- `OAuthManager`
- `UserManager`
- `ReleasesManager`
- `TracksManager`
- `PreferencesManager`
- `LookupManager`

## Fehler-Export

- `TooLostAPIError`

## Utility-Export

- `normalizeUserResource`

Konvertiert ein rohes `UserResource` Payload in die normalisierte `User` Struktur.

## Type-Exporte

### Normalisierte Modelltypen

- `User`

### API-Vertragstypen

- `export type * from "./types/api"`

Enthaelt alle Request/Response- und Utility-Typen aus den API-Typmodulen.

### Client-Runtime-Typen

- `TooLostClientOptions`
- `RequestEvent`
- `ResponseEvent`
- `ErrorEvent`
- `TokenRefreshEvent`

### OAuth-Typen

- `AuthorizationURLOptions`
- `ExchangeCodeOptions`
- `PKCEPair`
- `Scope`
- `TokenRequestOptions`
- `TokenResponse`
