# Typsystem

Das SDK exportiert eine vollstaendig typisierte API-Oberflaeche aus `src/index.ts`, inklusive:

- Manager-Request/Response-Vertraege
- Client-Runtime-Event- und Request-Typen
- OAuth-Request- und Token-Typen
- normalisierte und rohe User-Modelle

## Oeffentliche Type-Exports

### API-Vertraege

```ts
export type * from "./types/api";
```

Das enthaelt alle Exporte aus:

- `src/types/api/common.ts`
- `src/types/api/enums.ts`
- `src/types/api/shared.ts`
- `src/types/api/user.ts`
- `src/types/api/releases.ts`
- `src/types/api/tracks.ts`
- `src/types/api/preferences.ts`
- `src/types/api/lookup.ts`
- `src/types/api/deprecated.ts`

### Client-Typen

Aus `src/types/client.ts`:

- `TooLostClientOptions`
- `RequestEvent`
- `ResponseEvent`
- `ErrorEvent`
- `TokenRefreshEvent`
- `HTTPMethod`
- `QueryPrimitive`
- `QueryValue`
- `RequestOptions`

### OAuth-Typen

Aus `src/types/oauth.ts`:

- `Scope`
- `AuthorizationURLOptions`
- `ExchangeCodeOptions`
- `PKCEPair`
- `TokenResponse`
- `TokenRequestOptions`

### Normalisiertes User-Modell

```ts
export type { User } from "./structures/User";
```

`User` ist die camelCase-Projektion von `UserResource`.

## API-Typen nach Modul

## `common.ts`

Kern-Envelope- und Utility-Typen:

- `APIResponse<T>`
- `MessageResponse`
- `MessageDataResponse<T>`
- `UnauthenticatedResponse`
- `ValidationErrorResponse`
- `ValidationResultData`
- `EntityId`
- `JSONValue`, `JSONObject`, `JSONArray`
- `PaginationOptions`

## `enums.ts`

Domain-Unions:

- `ReleaseStatus`
- `ReleaseType`
- `TrackFileKind`
- `ArtistPlatform`
- `ArtistViaUrlPlatform`
- `UserType`

## `shared.ts`

Wiederverwendbare verschachtelte Strukturen fuer Release- und Preference-Payloads:

- Contributor- und Collaborator-Inputs
- File-Referenzen und Review-Assets
- Track-Lyrics
- Social-/Platform-Links
- Artist-Delivery-Konfiguration
- Preference-Metadaten
- Territory-/Collaborator-Inputs

Beispiel-Exporte:

- `ContributorInput`, `ContributorResource`
- `FileReference`, `ReleaseReviewAttachment`
- `TrackLyrics`
- `SocialLinks`, `PlatformLinks`, `AdditionalLinks`
- `AudiomackConfig`, `ArtistPreferenceDelivery`
- `PreferenceMetadata`
- `TerritoryInput`, `CollaboratorInput`

## `user.ts`

- `UserResource` (rohes API-Format)

## `releases.ts`

Release- und release-track-bezogene Vertraege:

- `ReleaseResource`
- `TrackResource`
- `ListReleasesQuery`, `ListReleasesResponse`
- `CreateReleaseRequest`
- `UpdateReleaseMetadataRequest`
- `UpdateReleaseDeliveryRequest`
- `UpdateReleaseVideoRequest`
- `SubmitReleaseRequest`, `SubmitReleaseResponse`
- `ValidateUpcRequest`

## `tracks.ts`

Track-spezifische Write- und Validation-Vertraege:

- `ValidateIsrcRequest`
- `CreateTrackUploadUrlRequest`
- `TrackUploadUrlData`
- `ReplaceSingleTrackFileRequest`
- `ReplaceReleaseTracksTrackInput`
- `ReplaceReleaseTracksRequest`

## `preferences.ts`

Preference- und Plattform-Discovery-Vertraege:

- `ArtistPreferenceResource`, `ArtistPreferencesData`
- `PreferenceArtistItem`
- `LabelPreferenceResource`, `LabelArtistResource`
- `LabelPreferencesQuery`, `LabelPreferencesData`
- `ArtistPlatformResult`
- `SearchArtistPlatformRequest`, `SearchArtistPlatformResponseData`
- `GetArtistViaUrlRequest`
- `SubmitArtistPreferenceRequest`
- `SubmitLabelPreferenceRequest`
- `RemoveLabelArtistRequest`

## `lookup.ts`

Lookup-Resultmodelle:

- `CountryResource`
- `LanguageResource`
- `LookupPlatformsData`

## Deprecated Aliases

Fuer Kompatibilitaet werden Legacy-Aliase aus `deprecated.ts` exportiert:

- `ReleasePayload` -> `ReleaseResource`
- `TrackPayload` -> `TrackResource`
- `PreferencePayload` -> `ArtistPreferenceResource | LabelPreferenceResource`
- `PlatformSearchResult` -> `ArtistPlatformResult`

## Design-Hinweise

- Request-Methoden sind je Manager-Operation streng typisiert.
- Durch Envelope-Unwrapping (`requestData`) liefern viele Manager direkt konkrete Payload-Typen statt `APIResponse<T>`.
- Query-Optionen akzeptieren Primitive, Arrays, `null` und `undefined` via `QueryValue`.
- API-Payloads bleiben nah am Server-Shape, waehrend normalisierte Strukturen dort angeboten werden, wo sie DX verbessern (`User`).
