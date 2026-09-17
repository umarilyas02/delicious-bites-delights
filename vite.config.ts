// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside the Lovable sandbox, the SSR (nitro) build is skipped unless
// explicitly requested — without this, `vite build` only emits client
// assets with no server, which is why Vercel served a 404 for every route.
// The Lovable wrapper also hardcodes nitro's output dir to dist/* (tuned
// for its Cloudflare default), which breaks Vercel's Build Output API —
// it must land in .vercel/output/functions/__server.func + static.
export default defineConfig({
  nitro: {
    preset: "vercel",
    output: {
      dir: "{{ rootDir }}/.vercel/output",
      serverDir: "{{ output.dir }}/functions/__server.func",
      publicDir: "{{ output.dir }}/static",
    },
  },
});
