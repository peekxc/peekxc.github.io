# peekxc.github.io source code
This repository exists to keep track and act as a host to for the mattpiekenbrock.com

## Layout format 

This site uses [Quarto](https://quarto.org/) and [Eleventy](https://www.11ty.dev/) (11ty) as its primary two tools for site generation.

The following workflow ([inspired from here](https://quarto.org/docs/output-formats/docusaurus#workflow)), for any given source file, is as follows: 

**source.qmd** => *quarto* =>  **source.md**  => *eleventy* =>  **source.html**

Canonically, the cascade 
1. Author content files are stored as quarto, ipynb, or markdown documents in `/content`
2. Render *.ipynb / *.qmd / *.md to Github flavored markdown (GFM) *.md files using quarto's `render` 
3. Use template files for site generation in folders prefixed with underscores, e.g. `/_includes` and `/_data`
4. Call eleventy to merge the content from (2) with the templates from (3), generating the final html site in `/docs`

Using quarto as an intermediate step prior to eleventy is similar to the [page bundles](https://gohugo.io/content-management/page-bundles/) idea, wherein a "page" constitutes a directory with markdown text storing the content alongside additional folders holding the rendered images, videos, resources, code outputs, JS includes, etc.

## Workflow 

From the root directory, to render `/content/**.qmd` => `/content/**.md`

> quarto render 

From the root directory, to render `/content/**.md` => `/docs/**.html`

> eleventy --config eleventy.config.js 

To develop actively, use:

> quarto render && eleventy --config eleventy.config.js --watch --serve

To switch to rendering only blog posts and watching, use: 

> quarto render content/posts && eleventy --config eleventy.config.js --watch --serve

To preprocess the custom CSS styles from tailwind, use: 

> npx tailwindcss -i styles.css --output lib/css/tw_styles.css

All source css/js/font/img assest are stored in `/lib` and statically copied to `/docs` on generation. 

## Font notes 

For nice, hand-written book-like font, use et-book
et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif

## TODO

- Should probably switch to gulp
- Add image/css minimizers 
- Remove tailwind-elements.js and jquery.js dependencies for page performance
- Nanofy tailwinds styles / figure out why nothing exports well 
- Move the relevent katex.min and code highlighting styles to the blog/single_md templates
- Use eleventy filter to provide sections in markdown for sidebar support

