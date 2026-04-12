# Tests und Qualitaet

## Tooling

- TypeScript (`strict` mode)
- Vitest
- Prettier

## Skripte

Aus `package.json`:

- `npm run build` -> kompiliert TypeScript nach `dist`
- `npm run typecheck` -> strenger TS-No-Emit-Check
- `npm run test` -> Unit-Tests mit Vitest
- `npm run lint` -> Prettier-Check
- `npm run format` -> Prettier-Write
- `npm run prepublishOnly` -> build + typecheck + lint

## Aktuelle Testsuite

## `tests/oauth.test.ts`

Testet OAuth-Manager-Grundlagen:

- Aufbau der Authorization-URL
- Verhalten bei benoetigten Query-Parametern
- Form und Laenge von PKCE-Verifier/Challenge

## `tests/client.test.ts`

Testet Client-Kernverhalten:

- Envelope-Unwrapping (`{ data: ... }`)
- Bearer-Header-Injektion mit Access Token
- automatische 401 Refresh-and-Retry-Logik
- Token-Update-Propagation (`accessToken`/`refreshToken`)
- `tokenRefresh` Event-Emission

## `tests/managers.test.ts`

Testet Endpoint-Mapping je Manager:

- Releases-Manager Route- und Methodenzuordnung
- Tracks-Manager Route- und Methodenzuordnung
- Preferences-Manager Route- und Methodenzuordnung
- Lookup- und User-Manager Route- und Methodenzuordnung
- Query-Serialisierung fuer ausgewaehlte Endpunkte

## Qualitaetsmerkmale

- Oeffentliche SDK-Oberflaeche ist stark typisiert und fuer Konsumenten exportiert.
- Request-Methoden behalten endpoint-spezifische Signaturen.
- Runtime-Fehler werden fuer Nicht-2xx in `TooLostAPIError` normalisiert.
- Retry- und Refresh-Verhalten ist deterministisch und in Kernpfaden getestet.

## Aktuelle Luecken

Bekannte Chancen fuer hoehere Absicherung:

- keine Live-Integrationstests gegen Toolost Sandbox/Produktiv-API
- keine Contract-Snapshot-Tests fuer komplette Response-Shapes
- keine Fuzz/Property-Tests fuer Query-Serialisierungs-Randfaelle
- keine dedizierten Concurrency-Stresstests fuer `inflightRefresh`
- keine expliziten Performance-Benchmarks

## Empfohlene naechste Tests

1. Integrationstests hinter env-basierten Credentials ergaenzen.
2. Retry-Tests fuer Backoff-Timing und Stop-Bedingungen erweitern.
3. Tests fuer `skipAuth`, Custom Headers und Body-Serialisierungs-Randfaelle ergaenzen.
4. Regressionstests fuer Alias-Methoden zur Paritaet mit kanonischen Methoden ergaenzen.
5. Schema-nahe Validierungstests fuer kritische Write-Payloads hinzufuegen.

## CI-Empfehlung

Eine minimale Quality-Gate-Pipeline sollte ausfuehren:

1. `npm ci`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
