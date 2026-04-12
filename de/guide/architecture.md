# Architektur

## High-Level Design

Das SDK ist in klare Schichten aufgeteilt:

1. `TooLostClient`: Orchestrierung, Token-Status, Manager-Verkabelung.
2. `OAuthManager`: OAuth-URL-Erzeugung, Code-Exchange, Token-Refresh, PKCE-Helfer.
3. `REST`: HTTP-Transport, Retries, Auth-Header, Fehler-Normalisierung.
4. `Managers`: Domain-spezifische Endpoint-APIs.
5. `Types`: Request/Response-Vertraege nach Domain.

## Runtime-Ablauf

### Standard Request Flow

1. Manager-Methode ruft `BaseManager.request` oder `BaseManager.requestData` auf.
2. `TooLostClient.request` fuehrt den Pre-Request-Refresh-Check aus.
3. `REST.request` baut URL und Header, emittiert Events und fuehrt `fetch` aus.
4. Response-Body wird geparst.
5. Nicht-2xx-Antworten werden zu `TooLostAPIError`.
6. `requestData` entpackt `{ data: ... }` automatisch.

### Auto-Refresh-Verhalten

Der Client kann auf zwei Arten refreshen:

1. Pre-Request-Refresh:
   - Nur aktiv, wenn `autoRefresh` true ist.
   - Benoetigt bekanntes `expiresAt` und `refreshToken`.
   - Trigger bei Ablauf in <= 30 Sekunden.
2. 401-Recovery:
   - Wenn ein Request mit `TooLostAPIError` Status 401 scheitert.
   - Benoetigt `autoRefresh` und `refreshToken`.
   - Fuehrt genau einen Refresh aus und wiederholt den Request.

## Event-Modell

Der Client erweitert einen typisierten EventEmitter mit:

- `request`
- `response`
- `error`
- `tokenRefresh`

Listener-Methoden:

- `on`
- `once`
- `off`
- `emit`

## Modulstruktur

- `src/client`: Client-Runtime und typisierter EventEmitter.
- `src/oauth`: OAuth Manager.
- `src/rest`: REST-Transport.
- `src/managers`: Domain-Manager.
- `src/types`: SDK-Typsystem und API-Vertraege.
- `src/structures`: normalisierte Output-Modelle.
- `src/utils`: gemeinsame Runtime-Helper und Fehlerklassen.

## Typ-Architektur

API-Typen sind nach Domain unter `src/types/api/` aufgeteilt:

- `common.ts`
- `enums.ts`
- `shared.ts`
- `user.ts`
- `releases.ts`
- `tracks.ts`
- `preferences.ts`
- `lookup.ts`
- `deprecated.ts`

Oeffentliche Kompatibilitaet wird sichergestellt durch:

- `src/types/api.ts` (Barrel)
- `src/types/api/index.ts` (Domain-Barrel)
