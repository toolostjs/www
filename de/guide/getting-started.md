# Schnellstart

## Voraussetzungen

- Node.js mit globalem `fetch` (Node 18+ empfohlen).
- Eine Toolost OAuth-Applikation mit:
  - `clientId`
  - optional `clientSecret` (bei oeffentlichen PKCE-Clients nicht zwingend)
  - `redirectUri`

## Installation

::: code-group

```sh [npm]
$ npm install toolost
```

```sh [pnpm]
$ pnpm install toolost
```

```sh [yarn]
$ yarn add toolost
```

```sh [bun]
$ bun add toolost
```

:::

## Client erstellen

```ts
import { TooLostClient } from "toolost";

const client = new TooLostClient({
  clientId: process.env.TOOLOST_CLIENT_ID!,
  clientSecret: process.env.TOOLOST_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/callback",
  scopes: ["read:profile", "read:releases", "write:releases"],
  autoRefresh: true,
  retry: 2,
});
```

## OAuth + PKCE Flow

### 1) PKCE-Werte und Auth-URL erzeugen

```ts
const { codeVerifier, codeChallenge } = client.oauth.generatePKCE();

const authorizationURL = client.oauth.getAuthorizationURL({
  state: "csrf-token",
  codeChallenge,
});
```

### 2) Authorization Code gegen Tokens tauschen

```ts
const token = await client.oauth.exchangeCode({
  code: "AUTHORIZATION_CODE",
  codeVerifier,
});

// Tokens werden automatisch vom OAuthManager in den TooLostClient geschrieben.
```

### 3) Authentifizierte Manager nutzen

```ts
const me = await client.user.getMe();
const releases = await client.releases.list({ page: 1, perPage: 20 });
```

## Kernbeispiele

### User-Profil

```ts
const normalized = await client.user.getMe();
const raw = await client.user.getMeRaw();
```

### Release erstellen und einreichen

```ts
const release = await client.releases.create({
  type: "Album",
  title: "Midnight Echoes",
  participants: [{ name: "Nova Waves", role: ["primary"] }],
});

await client.releases.submit(release.id, {
  acceptTerms: true,
  confirmRights: true,
  confirmYoutubeRights: true,
});
```

### Track-Upload-Lifecycle

```ts
const upload = await client.tracks.uploadURL(release.id, {
  kind: "audio",
  fileName: "track-main.flac",
  contentType: "audio/flac",
});

// Binaerdaten per externem PUT auf upload.uploadUrl hochladen.

await client.tracks.updateFile(release.id, 98341, {
  kind: "audio",
  fileKey: upload.fileKey,
});
```

### Preferences-Suche

```ts
const spotifyMatches = await client.preferences.searchSpotify("Nova Waves", 5);

const unified = await client.preferences.searchArtistPlatform({
  platform: "spotify",
  term: "Nova Waves",
  limit: 5,
});
```

## Hilfreiche Runtime-Features

- Automatisches Bearer-Token im Header.
- Optionales Auto-Refresh vor Ablauf bekannter Tokens.
- 401 Refresh-and-Retry bei vorhandenem `refreshToken`.
- Retries fuer transiente Fehler (`>=500`, `429`, Netzwerkfehler).
- Event-Hooks fuer Request/Response/Error/Token-Refresh.
