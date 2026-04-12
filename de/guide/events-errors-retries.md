# Events, Fehler und Retries

## Event-System

`TooLostClient` erweitert einen typisierten EventEmitter mit vier Kanaelen:

- `request`
- `response`
- `error`
- `tokenRefresh`

## Listener-Methoden

```ts
client.on(eventName, listener);
client.once(eventName, listener);
client.off(eventName, listener);
```

## Event-Payloads

### `request`

```ts
interface RequestEvent {
  method: string;
  path: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  attempt: number;
}
```

### `response`

```ts
interface ResponseEvent {
  method: string;
  path: string;
  url: string;
  status: number;
  ok: boolean;
  durationMs: number;
}
```

### `error`

```ts
interface ErrorEvent {
  method: string;
  path: string;
  url: string;
  status?: number;
  message: string;
}
```

### `tokenRefresh`

```ts
interface TokenRefreshEvent {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
```

## Wichtige Semantik

- `error` wird fuer API- und Netzwerkfehler aus der REST-Schicht emittiert.
- `error`-Emission ist im `TooLostClient` abgesichert: ohne Listener wird nicht emittiert.
- `response` wird fuer jede Fetch-Antwort emittiert, auch bei Nicht-2xx.
- `request.attempt` steigt bei jedem Retry.

## Fehlertypen

## `TooLostAPIError`

```ts
class TooLostAPIError extends Error {
  readonly status: number;
  readonly body?: unknown;
}
```

Wird fuer Nicht-2xx-API-Antworten und bestimmte Token-Refresh-Fehler geworfen.

### Strategie fuer Fehlermeldungen

Bei Nicht-2xx wird die Meldung in dieser Reihenfolge bestimmt:

1. `body.message`
2. `body.error`
3. `response.statusText`
4. Fallback `"Request failed"`

## Retry-Verhalten

Retry ist in `REST.request` implementiert.

### Standardwerte

- Client-Default: `2`
- Pro Request ueberschreibbar: `RequestOptions.retry`

### Retry-Bedingungen

Es wird erneut versucht, wenn mindestens eines gilt:

- Response-Status ist `>= 500`
- Response-Status ist `429`
- `fetch` wirft einen Fehler, der kein `TooLostAPIError` ist

### Backoff-Schema

Backoff nach Attempt-Index (`attempt` ist in REST nullbasiert):

- attempt 0 -> 1000 ms
- attempt 1 -> 2000 ms
- attempt 2+ -> maximal 3000 ms

Formel:

```ts
Math.min(1000 * (attempt + 1), 3000);
```

## Token-Refresh-Verhalten

## Pre-Request-Refresh

Vor jedem Request kann ein Refresh erfolgen, wenn:

- `autoRefresh` aktiv ist
- `skipAuth` false ist
- `refreshToken` existiert
- `expiresAt` bekannt ist
- Token in <= 30 Sekunden ablaeuft

## 401 Refresh-and-Retry

Nach einem fehlgeschlagenen Request wird genau einmal wiederholt, wenn:

- Fehler ist `TooLostAPIError`
- Status ist `401`
- `autoRefresh` ist aktiv
- `skipAuth` ist false
- `refreshToken` ist vorhanden

Danach wird der urspruengliche Request erneut gesendet.

## Refresh-Deduplizierung

Parallel ausgeloeste Refreshes teilen sich ein gemeinsames Promise (`inflightRefresh`), damit keine doppelten Token-Refresh-Calls passieren.

## Praktische Hinweise

- Fuer Observability in Produktion mindestens einen `error`-Listener registrieren.
- Schreiboperationen wenn moeglich idempotent halten, falls Retries aktiv sind.
- Fuer nicht wiederholbare Calls `retry: 0` pro Request setzen.
