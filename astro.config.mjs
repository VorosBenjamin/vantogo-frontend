import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import wix from '@wix/astro';
import wixHostingAdapter from '@wix/astro-wix-hosting-adapter';

export default defineConfig({
  output: 'server',
  adapter: wixHostingAdapter(),
  integrations: [react(), wix()],
  image: {
    domains: ['static.wixstatic.com', 'vorosbenjamin.github.io'],
  },
  security: { checkOrigin: false },
  devToolbar: { enabled: false },
});
