import { defineCollection } from 'astro:content'
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog_posts = defineCollection({
	loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./posts" })
})

// console.log(await posts.loader.load())
export const collections = { blog_posts }
