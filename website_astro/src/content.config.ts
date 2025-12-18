// import { defineCollection, z } from 'astro:content';
// import { glob, file } from 'astro/loaders';

// // 3. Define your collection(s)
// const jobs = defineCollection({ 
// 	loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
// });
// const dogs = defineCollection({ /* ... */ });

// // 4. Export a single `collections` object to register your collection(s)
// export const collections = { blog, dogs };


import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders';

const jobs = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./jobs" })
  // type: 'content',
  // schema: z.object({
  //   title: z.string(),
  //   date: z.string(),
  //   subtitle: z.string().optional(),
  //   extra: z.string().optional(),
  //   tags: z.array(z.string()).optional(),
  // }),
})

export const collections = { jobs }
