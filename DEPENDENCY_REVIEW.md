# Dependency review (generated 2026-05-16)

## High-priority manifest issues (must change)

1. **Duplicate key in `dependencies`: `@sentry/react` appears twice**.
   - First value: `^10.22.0`
   - Second value: `^8.55.2`
   - JSON parsers keep only the *last* key, so `^10.22.0` is effectively ignored.

2. **Duplicate key in `devDependencies`: `@sentry/vite-plugin` appears twice**.
   - First value: `^4.3.0`
   - Second value: `^2.23.1`
   - Same issue: last key wins, earlier key is ignored.

3. **Registry access error blocked full outdated-check run**.
   - `npm outdated --json` failed with `E403` against `https://registry.npmjs.org/@fontsource/inter`.
   - Until registry policy/auth is fixed, exact "latest vs current" cannot be fully enumerated inside this environment.

## Installed packages already flagged as deprecated (needs update/change)

From `package-lock.json` deprecation metadata:

- `inflight@1.0.6` — deprecated as unsupported and memory-leaking.
- `abab@2.0.6` — deprecated (use native `atob()` / `btoa()`).
- `domexception@4.0.0` — deprecated (use native `DOMException`).
- `whatwg-encoding@2.0.0` — deprecated (suggests `@exodus/bytes`).
- `glob@7.2.3` (via several Jest-related subtrees) — deprecated old line.
- `glob@9.3.5` (via `@sentry/bundler-plugin-core`) — also marked deprecated upstream notice.

## "Going to shut down" packages

No explicit shutdown/EOL markers were found in `package-lock.json` metadata.

> Note: npm deprecation metadata does not always include service shutdown announcements; those are usually communicated in package READMEs/release notes.

## Recommended next actions

1. Clean duplicate keys in `package.json` first (Sentry packages).
2. Resolve npm registry policy/auth so `npm outdated` can run successfully.
3. Run:
   - `npm outdated`
   - `npm audit`
4. Upgrade parent packages that pull in deprecated transitive dependencies (especially Jest/Sentry chains).
