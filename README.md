# portfoling

My personal portfolio site, visible at [oling.dev](https://oling.dev).

Built in raw HTML, CSS and TypeScript. No templates, frameworks or static site generators used.

The site is heavily optimised to be fast on mobile and desktop. In addition, it passes various accessibility tests (see below) and supports a range of displays and is custom-designed to be responsive for mobile.

The site scores 100/100/100/100 on Lighthouse for mobile and desktop, on both the [home](https://pagespeed.web.dev/analysis/https-oling-dev/mso18py322?form_factor=mobile) and [about](https://pagespeed.web.dev/analysis/https-oling-dev-about/a0nzvxknqq?form_factor=mobile) pages.

## Build instructions

The site can be run statically (e.g. GitHub/Cloudflare Pages) or with server-side logic (e.g. Cloudflare Workers) - this is how [oling.dev](https://oling.dev) is deployed.

1. Clone the repository and `cd` into it.
2. Transpile TypeScript into browser-friendly JS: run `tsc`
3. Optional: run `npx wrangler dev` to run a local webserver, and `npx wrangler deploy` to deploy to Cloudflare Workers.

```sh
git clone https://github.com/draggie306/portfolio.git && cd ./portfolio && tsc && npx wrangler dev
```

### Cloudflare Workers configuration

Build command: `npm install typescript -g && tsc`

Deploy command: `npx wrangler deploy`

Root directory: `/`

## Inspiration

The site's design elements and overall experience are original ideas and creations. That being said, I did take inspiration for the following things:

- Hover element border effects: [Fortnite.com](https://www.fortnite.com)

## Contributing

If you'd like to make a correction to the code, the grammar/English usage, or optimise something (such as the Medieval Tower Defense project's GIF into a webp), please open an issue and link a PR. It would be greatly appreciated!

If you would like to fork the repo and make adjustments for your own portfolio, I wouldn't mind a little shoutout somewhere :)
