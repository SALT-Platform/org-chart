# SALT fork of d3-org-chart

Upstream: [bumbeishvili/org-chart](https://github.com/bumbeishvili/org-chart) (MIT), forked at `f917f63` (v3.1.1).

This branch (`salt/integration`) carries the minimum changes needed to embed the chart in
[SALT-Platform/salt-platform](https://github.com/SALT-Platform/salt-platform) (React 19, Vite, strict TypeScript)
without wrappers that fight the library. Every change is additive and upstreamable.

| Change | Why |
|---|---|
| `types/index.d.ts` | Upstream ships no types; salt-platform is strict TypeScript. |
| `package.json` `type: module`, `exports.types`, `sideEffects: false` | Clean ESM resolution and tree-shaking in Vite. |
| `index.js` explicit `.js` extension | Required by Node ESM resolution. |
| Lazy canvas context in `getTextWidth` | Constructing the chart no longer touches `document`, so it works in SSR, jsdom and `node:test`. |
| SSR-safe default `svgHeight` | No `window` access at construction. |
| `destroy()` + `clear()` removes the `fullscreenchange` listener | React StrictMode mounts twice; upstream leaks document listeners and zoom handlers on unmount. |
| Removed `console.log` on empty data | Keeps production consoles clean. |
| `test/salt-fork.test.mjs` (`npm test`) | Regression tests for the above, runnable with plain Node. |

No SALT data, configuration or credentials belong in this repository. It is public because the upstream is public.
