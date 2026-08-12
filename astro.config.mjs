import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Local adapter only. `npm create @wix/new -- headless link` replaces this
// with Wix's hosting adapter and adds the @wix/astro integration.
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  image: {
    domains: ['static.wixstatic.com', 'vorosbenjamin.github.io'],
  },
});
