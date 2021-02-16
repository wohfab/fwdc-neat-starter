# FWDC Neat Starter

Starter Template for **N**etlify CMS, **E**leventy, **A**lphine JS & **T**ailwind CSS heavily modified by [fabian wohlgemuth](https://fabianwohlgemuth.de).

Check the Live Demo on Netlify: [![Netlify Status](https://api.netlify.com/api/v1/badges/ad35259d-e9f7-49f9-a8d8-ee342d8bb2e3/deploy-status)](https://app.netlify.com/sites/fwdc-neat-starter/deploys) or [deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/wohfab/fwdc-neat-starter) yourself.

## Technologies used

- [Netlify CMS](https://www.netlifycms.org/)
- [Eleventy](https://www.11ty.dev/)
- [Alpine.js](https://github.com/alpinejs/alpine)
- [Tailwind CSS](https://tailwindcss.com/)

## Quick Start

```
git clone https://github.com/wohfab/fwdc-neat-starter.git
cd fwdc-neat-starter
npm install
npm run build
```

```
npm run start
```

## Information

This project is a fork of the NEAT-starter by Surjith S M ([@surjithctly](https://surjithctly.in/)). They also wrote [detailed instructions on their blog](https://blog.surjithctly.in/neat-stack-create-a-static-website-with-netlify-cms-eleventy-alpinejs-and-tailwindcss).

## Roadmap ideas

- A11y check
- Check [Every Layout](https://every-layout.dev/) for possible improvements
- i18n integration
- Extend dark mode including [`tailwindcss-typography` dark mode](https://github.com/tailwindlabs/tailwindcss-typography/issues/69)
- Deep Netlify CMS integration with full customization functions, including 'default' texts
- Google Font integration with local copy
- Shortcode collection
  - Spotify Share Code
    - Make using the options easier
    - Check if all options are available in API
    - Possibility to download to `.svg` file instead of direct integration. Could work together with [`eleventy-plugin-svg-contents`](https://www.npmjs.com/package/eleventy-plugin-svg-contents) or [`eleventy-plugin-local-images`](https://github.com/robb0wen/eleventy-plugin-local-images#readme) later
    - Simplify `.svg`. Maybe with custom stroke style
    - Use Spotify Dev API token to get currently playing songs (ENV)
- Use Design Token file for color variables etc.
- Extend blog functionality
  - Custom title/links/etc.
  - Tag and Category system
- `package.json` clean up dependencies
