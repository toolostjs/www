# Client Referenz

## Klasse: TooLostClient

`TooLostClient` ist der zentrale Einstiegspunkt des SDKs.

```ts
new TooLostClient(options: TooLostClientOptions)
```

## Konstruktor-Optionen

| Option         | Typ            | Pflicht | Beschreibung                                                   |
| -------------- | -------------- | ------: | -------------------------------------------------------------- |
| `clientId`     | `string`       |      ja | OAuth Client-ID.                                               |
| `clientSecret` | `string`       |    nein | OAuth Client-Secret (optional bei oeffentlichen PKCE-Clients). |
| `redirectUri`  | `string`       |      ja | OAuth Redirect-URI.                                            |
| `scopes`       | `Scope[]`      |    nein | Scope-Liste fuer die OAuth-URL-Erzeugung.                      |
| `accessToken`  | `string`       |    nein | Initiales Access Token.                                        |
| `refreshToken` | `string`       |    nein | Initiales Refresh Token.                                       |
| `autoRefresh`  | `boolean`      |    nein | Aktiviert Refresh vor Ablauf und bei 401. Default: `true`.     |
| `retry`        | `number`       |    nein | Standard-Retry-Anzahl fuer REST. Default: `2`.                 |
| `baseURL`      | `string`       |    nein | API Base-URL Override. Default: `https://api.toolost.com/v1`.  |
| `authURL`      | `string`       |    nein | OAuth Authorize URL Override.                                  |
| `tokenURL`     | `string`       |    nein | OAuth Token URL Override.                                      |
| `registerURL`  | `string`       |    nein | OAuth Registration URL Override.                               |
| `fetch`        | `typeof fetch` |    nein | Eigene Fetch-Implementierung.                                  |

## Exponierte Manager und Services

- `client.oauth: OAuthManager`
- `client.user: UserManager`
- `client.releases: ReleasesManager`
- `client.tracks: TracksManager`
- `client.preferences: PreferencesManager`
- `client.lookup: LookupManager`

## Token Getter und Setter

### `accessToken`

```ts
get accessToken(): string | undefined
```

### `refreshToken`

```ts
get refreshToken(): string | undefined
```

### `setAccessToken`

```ts
setAccessToken(accessToken: string, expiresIn?: number): void
```

Wenn `expiresIn` gesetzt ist, wird intern `expiresAt` berechnet und fuer Pre-Request-Refresh verwendet.

### `setRefreshToken`

```ts
setRefreshToken(refreshToken: string): void
```

### `setTokens`

```ts
setTokens(token: TokenResponse): void
```

Setzt Access/Refresh Tokens, berechnet Ablaufzeit und emittiert `tokenRefresh`.

## Request-Methoden

### `request`

```ts
request<T>(method: HTTPMethod, path: string, options?: RequestOptions): Promise<T>
```

Low-Level Request API fuer Manager.

### `requestData`

```ts
requestData<T>(method: HTTPMethod, path: string, options?: RequestOptions): Promise<T>
```

Wie `request`, aber mit automatischem Unwrapping von `{ data: T }`.

## Event API

`TooLostClient` erweitert einen typisierten Emitter (`TypedEventEmitter`) mit:

- `on`
- `once`
- `off`
- `emit`

### Event-Namen und Payloads

- `request: RequestEvent`
- `response: ResponseEvent`
- `error: ErrorEvent`
- `tokenRefresh: TokenRefreshEvent`

Beispiel:

```ts
client.on("request", (event) => {
  console.log(event.method, event.url, event.attempt);
});

client.on("tokenRefresh", (event) => {
  console.log("new token expiresAt", event.expiresAt);
});
```

## Auto-Refresh und Retry-Logik

### Pre-Request-Refresh

Wird vor jedem Request ausgefuehrt, wenn alle Bedingungen true sind:

- `autoRefresh === true`
- `options.skipAuth !== true`
- `refreshToken` existiert
- `expiresAt` existiert
- `expiresAt - now <= 30000`

### 401-Recovery

Wenn ein Request mit `TooLostAPIError` und Status `401` scheitert, dann:

1. Tokens refreshen (wenn erlaubt und Refresh Token vorhanden)
2. den urspruenglichen Request genau einmal wiederholen

### Deduplizierung paralleler Refreshes

Parallele Refresh-Vorgaenge teilen ein gemeinsames internes Promise, um doppelte Refresh-Calls zu verhindern.

## Hinweise

- Der Client benoetigt immer eine gueltige Fetch-Implementierung (global oder injiziert).
- `error` wird nur emittiert, wenn mindestens ein `error`-Listener registriert ist.
- Alle Manager-Methoden bauen letztlich auf diesem Client-Verhalten auf.
