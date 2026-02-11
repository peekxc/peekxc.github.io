import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { z } from 'astro/zod';

const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']);

async function copyPostAssets(depth = 0) {
  const postsSource = fileURLToPath(new URL('../posts/', import.meta.url));
  const postsTarget = path.join(fileURLToPath(new URL('./assets/images/posts/', import.meta.url)));

  async function walk(dir: string, d: number) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name);
			// console.log(entryPath, d)
      if (entry.isDirectory()) {
        await walk(entryPath, d + 1);
        continue;
      }
			if (d >= 2) continue; // Limit to 2 levels deep
      if (!assetExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      const relative = path.relative(postsSource, entryPath);
      const destination = path.join(postsTarget, relative);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.copyFile(entryPath, destination);
    }
  }

  await walk(postsSource, depth);
}

await copyPostAssets();

const blog_posts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './posts' })
})

// console.log(await posts.loader.load())
export const collections = { blog_posts }
