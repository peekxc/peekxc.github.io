---
format: gfm
tags: ["software"]
layout: partials/card_code.pug
lib_name: "dbscan"
doc_link: "https://peekxc.github.io/primate/"
src_link: "https://github.com/peekxc/primate"
background_image: /resources/msu_logo.png
code_category: ["Linear algebra"]
code_tags: ["linear algebra", "spectral functions"]
code_links:
  {
    "vignette": "https://cran.r-project.org/web/packages/dbscan/vignettes/hdbscan.html",
    "doi": "https://doi.org/10.18637/jss.v091.i01",
  }
badges:
  - url: https://CRAN.R-project.org/package=dbscan
    src: http://www.r-pkg.org/badges/version/dbscan
    alt: CRAN version
    height: 18
  - url: https://mhahsler.r-universe.dev/dbscan
    src: https://mhahsler.r-universe.dev/badges/dbscan
    alt: R-universe
  - url: https://CRAN.R-project.org/package=dbscan
    src: https://cranlogs.r-pkg.org/badges/grand-total/dbscan
    alt: Download count
  - url: https://github.com/mhahsler/dbscan
    src: https://img.shields.io/badge/git_repo-gray.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MnB0IiBoZWlnaHQ9IjkycHQiIHZpZXdCb3g9IjAgMCA5MiA5MiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBkPSJNMCAuMTEzaDkxLjg4N1Y5MkgwWm0wIDAiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIHN0eWxlPSJzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOiNmZmY7ZmlsbC1vcGFjaXR5OjEiIGQ9Ik05MC4xNTYgNDEuOTY1IDUwLjAzNiAxLjg0OGE1LjkxOCA1LjkxOCAwIDAgMC04LjM3MiAwbC04LjMyOCA4LjMzMiAxMC41NjYgMTAuNTY2YTcuMDMgNy4wMyAwIDAgMSA3LjIzIDEuNjg0IDcuMDM0IDcuMDM0IDAgMCAxIDEuNjY5IDcuMjc3bDEwLjE4NyAxMC4xODRhNy4wMjggNy4wMjggMCAwIDEgNy4yNzggMS42NzIgNy4wNCA3LjA0IDAgMCAxIDAgOS45NTcgNy4wNSA3LjA1IDAgMCAxLTkuOTY1IDAgNy4wNDQgNy4wNDQgMCAwIDEtMS41MjgtNy42NmwtOS41LTkuNDk3VjU5LjM2YTcuMDQgNy4wNCAwIDAgMSAxLjg2IDExLjI5IDcuMDQgNy4wNCAwIDAgMS05Ljk1NyAwIDcuMDQgNy4wNCAwIDAgMSAwLTkuOTU4IDcuMDYgNy4wNiAwIDAgMSAyLjMwNC0xLjUzOVYzMy45MjZhNy4wNDkgNy4wNDkgMCAwIDEtMy44Mi05LjIzNEwyOS4yNDIgMTQuMjcyIDEuNzMgNDEuNzc3YTUuOTI1IDUuOTI1IDAgMCAwIDAgOC4zNzFMNDEuODUyIDkwLjI3YTUuOTI1IDUuOTI1IDAgMCAwIDguMzcgMGwzOS45MzQtMzkuOTM0YTUuOTI1IDUuOTI1IDAgMCAwIDAtOC4zNzEiLz48L2c+PC9zdmc+
    alt: git link
date: 2017-10-15
---

This R package provides a fast C++ (re)implementation of several density-based algorithms with a focus on the DBSCAN family for clustering spatial data, including
DBSCAN, HDBSCAN, OPTICS/OPTICSXi, FOSC, Jarvis-Patrick clustering, SNN Clustering, and various Outlier Detection methods (LOF / GLOSH)

<!-- optimizeImg './content/resources/dbscan_logo.svg', 'dbscan', '100vw', '240px', 'lazy', 'text-middle object-center mx-auto', '' -->

<img src="/resources/dbscan_logo.svg" class="text-middle object-center mx-auto"> </img>

The implementations use the ANN libraries kd-tree data structure for faster k-nearest neighbor search, and are typically faster than the native R implementations (e.g., dbscan in package `fpc`), or the implementations in WEKA, ELKI and Python’s scikit-learn.
