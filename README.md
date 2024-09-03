# peekxc.github.io source code

Source code for statically generating my personal website, hosted at mattpiekenbrock.com (or peekxc.github.io).

This site was built using [Quarto](https://quarto.org/) and [Eleventy](https://www.11ty.dev/) (11ty) for site generation. The template files are written in [PugJS](https://pugjs.org/api/getting-started.html), and the CSS is generated using [TailwindCSS](https://tailwindcss.com/).

## Layout format

For any given source file, the following workflow ([inspired from here](https://quarto.org/docs/output-formats/docusaurus#workflow)) is as follows:

**source.qmd** => _quarto_ => **source.md** => _eleventy_ => **source.html**

Canonically, the cascade is as follows:

1. Write content files, stored in _plain text_, as quarto or markdown documents in `/content`
2. Call _quarto_ to render _.qmd / _.md from (1) to Github flavored markdown (GFM) \*.md files
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
npx eleventy --config eleventy.config.js
```

To develop actively, use:

```bash
quarto render && npx eleventy --config eleventy.config.js --watch --serve
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
npx tailwindcss -i styles.css -m --output content/css/tw_styles.css
```

To minimize the CSS, use the CLI command:

```bash
npx lightningcss --minify --bundle content/css/*.css --output-dir docs/css/
```

<!-- MY_ENVIRONMENT=production -->

On generation, all source css/js/font/img assets that are stored in `/content` and statically copied to `/docs`, which is then used as the root host for GH pages.

## TODO

- Switch to gulp?
- Finish the grid layout and styling
- Add categories and tags pages
- Add static "search support" / filtering with elastic-lunar
- Use eleventy filter to provide sections in markdown for sidebar support
- Implement the tricks from [the high performance blog](https://github.com/google/eleventy-high-performance-blog)
- Port the text content to make it configurable from \_data'
- Figure out layout chaining problem vs readHTML filter solution used now
- Switch to eleventy 3.0
- Add production flag
- Add 'eleventy-plugin-heroicons' and figure out pug eq.
- Compress images to webP with https://squoosh.app/editor, or somehow automate it

## Done

- Added image / js / css / html minimizers
- Enabled brotli compressions
- Fixed most of the layout shifting issues
- Removed tailwind-elements.js and jquery.js dependencies for page performance
- Moved relevent katex.min and code highlighting styles to the blog/single_md templates
- Switched to bun

## NOTES

- The eleventy-img plugin is buggy, at least the universal transform
- Dont use .container
