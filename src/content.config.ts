import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog_posts = defineCollection({
  loader: glob({ 
		pattern: ['**/*.md', '**/*.mdx'], 
		base: './src/content/posts', 
		retainBody: false
	}),
	schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
		slug: z.string(), 
		tags: z.array(z.string()),
		draft: z.boolean(), 
		background_image: z.string().optional(),
    abstract: z.string().optional(),
  })
})

// console.log(await posts.loader.load())
export const collections = { blog_posts }
