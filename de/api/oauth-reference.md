# OAuth Referenz

## Klasse: OAuthManager

`OAuthManager` uebernimmt OAuth-URL-Erzeugung, Token-Exchange, Token-Refresh und PKCE-Helfer.

## Konstanten (Instanzfelder)

- `AUTH_URL`
- `TOKEN_URL`
- `REGISTER_URL`

Diese Werte kommen aus den `TooLostClient` Optionen oder den Defaults.

## Methoden

### `getAuthorizationURL`

```ts
getAuthorizationURL(options?: AuthorizationURLOptions): string
```

Erzeugt die OAuth Authorization URL mit:

- `response_type=code`
- `client_id`
- `redirect_uri`
- optional `scope`
- optional `state`
- optional PKCE-Parameter (`code_challenge`, `code_challenge_method=S256`)

### `exchangeCode`

```ts
exchangeCode(code: string, options?: TokenRequestOptions): Promise<TokenResponse>
exchangeCode(options: ExchangeCodeOptions): Promise<TokenResponse>
```

Tauscht Authorization Code gegen Tokens via `application/x-www-form-urlencoded` am Token-Endpunkt.

Unterstuetzt beide Overloads fuer DX:

- positionsbasiert mit `code`
- objektbasiert

### `refreshToken`

```ts
refreshToken(refreshToken: string): Promise<TokenResponse>
```

Aktualisiert das Access Token mit Grant Type `refresh_token`.

### `generatePKCE`

```ts
generatePKCE(): PKCEPair
```

Erzeugt:

- `codeVerifier` mit kryptographisch sicheren Zufallsbytes
- `codeChallenge` via SHA-256 und URL-safe Base64

## Token-Normalisierung

Token-Antworten werden aus camelCase oder snake_case normalisiert:

- `accessToken` oder `access_token`
- `refreshToken` oder `refresh_token`
- `expiresIn` oder `expires_in`
- `tokenType` oder `token_type`

Rueckgabeformat:

```ts
{
  tokenType: "Bearer",
  accessToken,
  refreshToken,
  expiresIn,
  scope?,
}
```

## Fehlerverhalten

OAuth-Fehler werfen `TooLostAPIError` mit:

- HTTP-Status
- best-effort Meldung aus `error_description`, `message` oder `error`
- rohem Payload in `body`

## Scope-Typ

Aktuelle Scope-Union im SDK:

- `read:profile`
- `read:releases`
- `write:releases`
- `read:preferences`
- `write:preferences`
- `read:catalog`
- `read:analytics`
- `read:earnings`
- `read:audience`
