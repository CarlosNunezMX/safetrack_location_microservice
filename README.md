# Safetrack
**Module: Location**

## Install
```txt
bun install
bun run dev
```

```txt
bun run deploy
```

## QoD
[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
bun run cf-typegen
```

For updating supabase client types run:
```sh
bun supabase-types
```
Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
