// @ts-nocheck
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import icon from 'astro-icon';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  output: 'server',
  adapter: isDev
    ? undefined
    : vercel({
        runtime: 'nodejs20.x',
      }),
  integrations: [icon()],
});
