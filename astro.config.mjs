import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

import { remarkReadingTime } from './src/plugins/remark-reading-time';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown:{
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  } 
});

