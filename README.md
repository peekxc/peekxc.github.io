# peekxc.github.io source code
This repository exists to keep track and act as a host to for the mattpiekenbrock.com

## Structure 

- blog 
- CV

## Compiling 

Online CV: 
> pug online_CV/views/index.pug --out .

Blog (on a [separate repo](https://github.com/peekxc/blog))
> eleventy .

Website: 

Unclear. Either use quarto fully, or use render as pre-processing with quarto and then render + serve with eleventy. 

Ideally should incorporate tailwind, pug, bootstrap, and maybe even minimizers...

Probably try to figure out how to use quarto to render, then eleventy to collect + serve 

## Format: 

The site has the following [workflow](https://quarto.org/docs/output-formats/docusaurus#workflow): 

**news.qmd**   quarto =>   **news.md**   eleventy =>   **news.html**

- Template files and data used for site generation go in folder prefixed with underscores, e.g. "/_includes" and "/_data"
- Content files are stored as quarto, ipynb, or markdown documents in /content
- Quarto `render`'s *.ipynb and *.qmd to markdown [page bundles](https://gohugo.io/content-management/page-bundles/), i.e. markdown text + folders with images, videos, resources, etc.
- Eleventy uses the *.md to generates the final output files in /docs

From the root directory, to render `/content` => `/docs`

> eleventy --config eleventy.config.js 

To develop actively, use:

> quarto render & eleventy --config eleventy.config.js --watch --serve

Should probably switch to gulp
