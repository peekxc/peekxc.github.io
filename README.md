# peekxc.github.io source code
Source code for statically generating my personal website, hosted at mattpiekenbrock.com (or peekxc.github.io).

This site was built using [Quarto](https://quarto.org/) and [Eleventy](https://www.11ty.dev/) (11ty) for site generation. The template files are written in [PugJS](https://pugjs.org/api/getting-started.html), and the CSS is generated using [TailwindCSS](https://tailwindcss.com/).

## Layout format 

For any given source file, the following workflow ([inspired from here](https://quarto.org/docs/output-formats/docusaurus#workflow)) is as follows: 

**source.qmd** => *quarto* =>  **source.md**  => *eleventy* =>  **source.html**

Canonically, the cascade is as follows: 
1. Write content files, stored in _plain text_, as quarto or markdown documents in `/content`
2. Call _quarto_ to render *.qmd / *.md from (1) to Github flavored markdown (GFM) *.md files
3. Write template `.pug` files for site generation in `/_includes`
4. Call _eleventy_ to merge the content from (2) with the templates from (3), generating the final html site in `/docs`

Each piece of content must be stored as a directory + markdown file, similar to the idea of [page bundles](https://gohugo.io/content-management/page-bundles/), wherein a "page" constitutes a directory with markdown text storing the text content alongside additional folders or files holding the rendered images, videos, resources, code outputs, JS includes, etc.

## Workflow 

From the root directory, to render `/content/**.qmd` => `/content/**.md`

```bash 
quarto render 
```

From the root directory, to render `/content/**.md` => `/docs/**.html`

```bash
eleventy --config eleventy.config.js 
```

To develop actively, use:

```bash
quarto render && eleventy --config eleventy.config.js --watch --serve
```

To switch to rendering only blog posts and watching, use: 

```bash
quarto render content/posts && eleventy --config eleventy.config.js --watch --serve
```

The entire website can be quickly previewed in incremental mode using: 

```bash
quarto preview --no-browser .
```

To preprocess the custom CSS styles from tailwind, use: 

```bash
npx tailwindcss -i styles.css --output lib/css/tw_styles.css
```

On generation, all source css/js/font/img assets that are stored in `/lib` and statically copied to `/docs`, which is then used as the root host for GH pages.  

## TODO

- Should probably switch to gulp
- Add image/css minimizers 
- Remove tailwind-elements.js and jquery.js dependencies for page performance
- Nanofy tailwinds styles / figure out why nothing exports well 
- Move the relevent katex.min and code highlighting styles to the blog/single_md templates
- Use eleventy filter to provide sections in markdown for sidebar support
- Implement some of the tricks from [this site](https://github.com/google/eleventy-high-performance-blog)
