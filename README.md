# portfoling

My personal portfolio site, visible at [oling.dev](https://oling.dev).

Built in raw HTML, CSS and JS. No fancy templates, frameworks or static site generators.

## Build instructions

The site can be run statically (e.g. GitHub/Cloudflare Pages) or with server-side logic (e.g. Cloudflare Workers) - this is how [oling.dev](https://oling.dev) is deployed.

1. Clone the repository and `cd` into it.
2. Transpile TypeScript into browser-friendly JS: run `tsc`
3. Optional: run `npx wrangler dev` to run a local webserver, and `npx wrangler deploy` to deploy to Cloudflare Workers.

```sh
git clone https://github.com/draggie306/portfolio.git && cd ./portfolio && tsc && npx wrangler dev
```



## Inspiration

The site's design elements and overall experience are original ideas and creations. That being said, I did take inspiration for the following things:

- Hover element border effects: [Fortnite.com](https://www.fortnite.com)
