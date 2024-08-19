---
format: gfm
layout: single_md.pug
tags:
  - posts
title: The Lanczos Algorithm
author: Matt Piekenbrock
date: '2023-10-15'
slug: lanczos_method2
include_toc: true
categories:
  - math
  - linear algebra
  - high performance computing
draft: true
editor:
  rendor-on-save: true
bibliography: ../references.bib
---


## Beating the complexity bounds

Elegant and as theoretically founded as the Lanczos method may be, is it
efficient in practice?

Let’s start by establishing a baseline on its complexity:

<div id="thm-line" class="theorem" style="background-color: #efefef;">

<span class="theorem-title">**Theorem 1 (Parlett 1994)**</span> Given a
symmetric rank-$r$ matrix $A \in \mathbb{R}^{n \times n}$ whose operator
$x \mapsto A x$ requires $O(\eta)$ time and $O(\nu)$ space, the Lanczos
method computes $\Lambda(A)$ in $O(\max\{\eta, n\}\cdot r)$ time and
$O(\max\{\nu, n\})$ space, when computation is done in exact arithmetic

</div>

As its clear from the theorem, if we specialize it such that $r = n$ and
$\eta = \nu = n$, then the Lanczos method requires just $O(n^2)$ time
and $O(n)$ space to execute. In other words, the Lanczos method drops
*both* the time and space complexity\[^4\] of obtaining spectral
information by **order of magnitude** over similar eigen-algorithms that
decompose $A$ directly.

To see why this is true, note that a symmetric tridiagonal matrix is
fully characterized by its diagonal and subdiagonal terms, which
requires just $O(n)$ space. If we assume that $v \mapsto Av \sim O(n)$,
then carrying out the recurrence clearly takes at most $O(n^2)$ time,
since there are most $n$ such vectors $\{q_i\}_{i=1}^n$ to generate!

Now, if we need to store all of $Y$ or $Q$ explicitly, we clearly need
$O(n^2)$ space to do so. However, if we only need the eigen-*values*
$\Lambda(A)$ (and not their eigen-vectors $U$), then we may execute the
recurrence keeping at most three vectors $\{q_{j-1}, q_{j}, q_{j+1}\}$
in memory at any given time. Since each of these is $O(n)$ is size, the
claim of $O(n)$ space is justified!
