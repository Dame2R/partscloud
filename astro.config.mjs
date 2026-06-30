import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dame2r.github.io',
  base: '/partscloud',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
