# Endpoint Matrix

Diese Matrix ordnet jede Manager-Methode ihrer HTTP-Methode und dem API-Pfad zu.

## User

| Methode           | HTTP  | Pfad  | Return-Typ     | Hinweis                           |
| ----------------- | ----- | ----- | -------------- | --------------------------------- |
| `user.getMe()`    | `GET` | `/me` | `User`         | Normalisierte camelCase-Struktur. |
| `user.getMeRaw()` | `GET` | `/me` | `UserResource` | Rohes API-Payload-Format.         |

## Releases

| Methode                                    | HTTP     | Pfad                             | Return-Typ              | Hinweis                                             |
| ------------------------------------------ | -------- | -------------------------------- | ----------------------- | --------------------------------------------------- |
| `releases.list(query?)`                    | `GET`    | `/releases`                      | `ListReleasesResponse`  | Query unterstuetzt status/type/search/page/perPage. |
| `releases.get(releaseId)`                  | `GET`    | `/releases/{releaseId}`          | `ReleaseResource`       | Einzelnes Release laden.                            |
| `releases.create(data)`                    | `POST`   | `/releases`                      | `ReleaseResource`       | Release erstellen.                                  |
| `releases.delete(releaseId)`               | `DELETE` | `/releases/{releaseId}`          | `MessageResponse`       | Release loeschen.                                   |
| `releases.updateMetadata(releaseId, data)` | `PATCH`  | `/releases/{releaseId}/metadata` | `ReleaseResource`       | Metadaten aktualisieren.                            |
| `releases.updateDelivery(releaseId, data)` | `PATCH`  | `/releases/{releaseId}/delivery` | `ReleaseResource`       | Plattform-/Territory-Delivery aktualisieren.        |
| `releases.updateVideo(releaseId, data)`    | `PATCH`  | `/releases/{releaseId}/video`    | `ReleaseResource`       | Video-Delivery aktualisieren.                       |
| `releases.submit(releaseId, data)`         | `POST`   | `/releases/{releaseId}/submit`   | `SubmitReleaseResponse` | Release zur Verarbeitung/Pruefung senden.           |
| `releases.validateUPC(data or upc)`        | `POST`   | `/releases/validate/upc`         | `ValidationResultData`  | Overloads werden unterstuetzt.                      |

## Tracks

| Methode                                       | HTTP    | Pfad                                          | Return-Typ             | Hinweis                                |
| --------------------------------------------- | ------- | --------------------------------------------- | ---------------------- | -------------------------------------- |
| `tracks.list(releaseId)`                      | `GET`   | `/releases/{releaseId}/tracks`                | `TrackResource[]`      | Tracks eines Releases listen.          |
| `tracks.get(releaseId, trackId)`              | `GET`   | `/releases/{releaseId}/tracks/{trackId}`      | `TrackResource`        | Einzelnen Track laden.                 |
| `tracks.uploadURL(releaseId, data)`           | `POST`  | `/releases/{releaseId}/tracks/upload-url`     | `TrackUploadUrlData`   | Pre-signed Upload-URL + File-Key.      |
| `tracks.updateFile(releaseId, trackId, data)` | `PATCH` | `/releases/{releaseId}/tracks/{trackId}/file` | `ReleaseResource`      | Hochgeladenen Key an File-Slot binden. |
| `tracks.validateISRC(data or isrc)`           | `POST`  | `/releases/validate/isrc`                     | `ValidationResultData` | Overloads werden unterstuetzt.         |
| `tracks.replaceAll(releaseId, data)`          | `PUT`   | `/releases/{releaseId}/tracks`                | `ReleaseResource`      | Komplette Track-Liste ersetzen.        |

## Preferences

| Methode                                        | HTTP   | Pfad                                     | Return-Typ                         | Hinweis                                  |
| ---------------------------------------------- | ------ | ---------------------------------------- | ---------------------------------- | ---------------------------------------- |
| `preferences.getArtist()`                      | `GET`  | `/preferences/artist`                    | `ArtistPreferencesData`            | Artist-Preference-Profil laden.          |
| `preferences.getArtists()`                     | `GET`  | `/preferences/artists`                   | `PreferenceArtistItem[]`           | Artist-Ressourcenliste laden.            |
| `preferences.getLabel(query?)`                 | `GET`  | `/preferences/label`                     | `LabelPreferencesData`             | Query unterstuetzt search/page/perPage.  |
| `preferences.getLabelArtist(id)`               | `GET`  | `/preferences/label/artist/{id}`         | `LabelArtistResource`              | Label-verwalteten Artist laden.          |
| `preferences.searchSpotify(artist, limit?)`    | `GET`  | `/preferences/search-spotify`            | `ArtistPlatformResult[]`           | Spotify-Entitaeten suchen.               |
| `preferences.searchYouTube(channel, limit?)`   | `GET`  | `/preferences/search-yt-channel`         | `ArtistPlatformResult[]`           | YouTube-Kanaele suchen.                  |
| `preferences.searchApple(artist, limit?)`      | `GET`  | `/preferences/search-apple`              | `ArtistPlatformResult[]`           | Apple-Music-Artists suchen.              |
| `preferences.getSpotifyArtist(link)`           | `GET`  | `/preferences/get-spotify-artist`        | `ArtistPlatformResult`             | Spotify-Artist aus URL aufloesen.        |
| `preferences.getYTChannel(link)`               | `GET`  | `/preferences/get-yt-channel`            | `ArtistPlatformResult`             | YouTube-Kanal aus URL aufloesen.         |
| `preferences.getAppleArtist(link)`             | `GET`  | `/preferences/get-apple-artist`          | `ArtistPlatformResult`             | Apple-Artist aus URL aufloesen.          |
| `preferences.getArtistViaLink(link, platform)` | `GET`  | `/preferences/artist-via-link`           | `ArtistPlatformResult`             | Generischer URL-Resolver nach Plattform. |
| `preferences.searchArtistPlatform(data)`       | `POST` | `/preferences/search/artist-platform`    | `SearchArtistPlatformResponseData` | Einheitliche Such-API.                   |
| `preferences.getArtistViaURL(data)`            | `POST` | `/preferences/artist/get-artist-via-url` | `ArtistPlatformResult`             | URL-Lookup API.                          |
| `preferences.submitArtist(data)`               | `POST` | `/preferences/artist/submit`             | `MessageResponse`                  | Artist-Preferences senden.               |
| `preferences.submitLabel(data)`                | `POST` | `/preferences/label/submit`              | `MessageResponse`                  | Label-Preferences senden.                |
| `preferences.removeLabelArtist(data or id)`    | `POST` | `/preferences/label/artist/remove`       | `MessageResponse`                  | Label-Artist-Bindung entfernen.          |

## Lookup

| Methode              | HTTP  | Pfad                | Return-Typ            | Hinweis                  |
| -------------------- | ----- | ------------------- | --------------------- | ------------------------ |
| `lookup.countries()` | `GET` | `/lookup/countries` | `CountryResource[]`   | Laenderliste.            |
| `lookup.platforms()` | `GET` | `/lookup/platforms` | `LookupPlatformsData` | Plattformliste nach Typ. |
| `lookup.genres()`    | `GET` | `/lookup/genres`    | `string[]`            | Genre-Liste.             |
| `lookup.languages()` | `GET` | `/lookup/languages` | `LanguageResource[]`  | Sprachenliste.           |

## Aliase

Diese Methoden werden absichtlich als Alias fuer DX und Kompatibilitaet angeboten:

| Alias                              | Kanonische Methode                 |
| ---------------------------------- | ---------------------------------- |
| `releases.validateUpc(...)`        | `releases.validateUPC(...)`        |
| `tracks.uploadUrl(...)`            | `tracks.uploadURL(...)`            |
| `tracks.validateIsrc(...)`         | `tracks.validateISRC(...)`         |
| `preferences.getArtistViaUrl(...)` | `preferences.getArtistViaURL(...)` |
