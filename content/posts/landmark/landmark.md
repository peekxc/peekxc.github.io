---
format: gfm
layout: single_md.pug
tags:
  - posts
title: The Greedy Permutation
author: Matt Piekenbrock
date: '2024-04-29'
slug: landmark
include_toc: true
categories:
  - computer science
  - algorithms
  - math
draft: true
editor:
  rendor-on-save: true
execute:
  echo: false
  eval: true
  freeze: auto
  cache: true
bibliography: ../references.bib
citations-hover: true
jupyter: blog
---


In many applications, finding a small yet representative subset of the
data is a common yet necessary preprocessing step, i.e. we want to solve
a problem $\mathcal{P}$ with respect to data $X$, but we can’t—*the data
are simply too large*—so we must work with a subset $S \subset X$
instead.

While basic sampling techniques (e.g. uniform) may suffice for some
problems, solutions solved on the subset $\mathcal{P}(S)$ can sometimes
deviate dramatically from their population values $\mathcal{P}(X)$.
Ideally, we want a subset $S \subset X$ *small enough* to be feasibly
computable on $\mathcal{P}$, but also *representative enough* such that
the solution $\mathcal{P}(S)$ approximates $\mathcal{P}(X)$,
e.g. solutions satisfying:

$$ (1 - \epsilon) \mathcal{P}(S) \leq \mathcal{P}(X) \leq (1 + \epsilon) \mathcal{P}(S)$$

Of course, The exact definitions of “feasibly” and “approximate” often
change based on the problem, but in general subsets which **provably**
achieve such approximations guarantees are called
[coresets](https://en.wikipedia.org/wiki/Coreset), and they are
*everywhere*: whether for vector quantization, low rank matrix
approximation, or surface simplification, coresets have proven
ubiquitious for scientific computing.

<!-- pop up in a variety of computational, geometric, or learning settings. -->
<!-- Indeed, the [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent)---a cornerstone of deep learning---is a type of coreset. -->
<!-- to computational problems like basic vector summation and to learning problems, like linear regression or principle component analysis.  -->
<!-- it is slow and often ineffective to compute the full gradient each iteration of training, so we choose to approximate with "batches."  -->
<!-- https://sarielhp.org/p/15/greedy_permutation/permutation.pdf -->

## One coreset to rule them all

Though fascinating in their own right, the theory behind coresets can be
quite complicated. Many coreset constructions are difficult to analyse,
difficult to implement, and intrinsically problem-specific. For example,
in the diameter problem, random uniform sampling is not likely to give a
good approximation error.

In spite of this, there is one particular coreset construction that
seems to have an unending number of applications, being re-discovered
again and again: the **greedy permutation** (or the [farthest-first
traversal](https://en.wikipedia.org/wiki/Farthest-first_traversal)).
<!-- ubiquitous in computational geometry -->
<!-- Greedy permutations are effective permutations of an input set that keep points as far apart as possible while minimizing the maximum distance from any point to the sample. -->
The idea of the greedy permutation is to construct a permutation $P$ of
a set $X$ that keeps successive points as far apart as possible,
i.e. minimizing the maximum distance to previously encountered points.

![Picture from *Approximate Greedy Clustering and Distance Selection for
Graph Metrics*, by Eppstein et al](fft.png)

To clarify, let $(X, d_X)$ denote a metric space of size
$\lvert X \rvert = n$, and $P = (p_0, p_1, \dots, p_{n-1})$ a sequence
of points from $X$. The sequence $P$ is called a <u> *greedy
permutation* </u> if for all $i \in [n]$:

$$d_X(p_i, P_i) = \max_{p \in P} d_X(p, P_i), \quad P_i = \{\, p_0, \dots, p_{i-1}\,\}$$

where $d_X(x, S)$ represents the minimum distance between $x \in X$ to
any point in the set $S$. The first point $p_0$ is called the *seed* of
the sequence $P$, and $P_i$ is called the *i-th* *prefix* of $P$.

Greedy permutations are easy to construct: simply choose a seed point
$p_0$, add it to the sequence $P = (p_0)$, then choose the next point
$p_1$ *greedily* by minimizing the above distance $d_X(p_0, P_1)$.
Repeating this $k$-times constructs a subset $S \subset X$ of size
$\lvert S \rvert = k$ that in many ways approximates the set $X$; when
$k = n$, the resulting sequence is a permutation of $X$.

## Properties: it has all of them.

One of the principal interests in the greedy permutation is that it
approximates the $k$-center clustering problem at all resolutions.
Specifically, the $k$-prefix given by the first $k$ vertices of the
permutations provides a $2$-approximation to the $k$-center clustering
problem, for all $k \in \{ \, 2, \dots, n \, \}$.

<!-- Assume we've constructed a greedy permutation $P$ of $X$. What are its properties, what problems can it approximate, and how does it relate to coresets? First, let's define a _ball_: -->

$$B(x, r) \triangleq \{ \, x' \in X : d_X(x, x') \leq r \, \}$$

<!-- Naive computation of the $k$-th prefix of the greedy permutation takes $O(nk)$ time, though  -->
<!-- : given some problem $\mathcal{P}$ defined on some data $X$, a _coreset_ $S$ is a proxy for the full data set satsifying the property that same algorithm can be run on the coreset as the full data set, and the result on the coreset approximates that on the full data set. -->
<!-- Indeed, the cornerstone of [SGD](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) i -->
<!-- a geometrically-oriented perspective on sampling is to choose a subset that preserves, in some sense, the *shape* of the underlying data. This goal is a bit lofty: we need precisely define both "shape" is, and how can we preserve it. -->
<!-- The idea is as follows. Suppose we have some data $X$ equipped ia metric \$d_X : X \\times X \\to \\mathbb{R}*+\$ (i.e. a metric space \$(X, d\_*X)\$) and some primitive operation $T : X \to \dots$ which computes some quantity of interest $\dots.$ -->
<!-- We would like to produce a subset $S \subseteq X$ of $X$ such that the -->
<!-- <https://sarielhp.org/p/04/survey/survey.pdf>
&#10;<https://en.wikipedia.org/wiki/Coreset> -->
<!-- In machine learning, this challenge often manifests in tasks where pairwise distance computations are necessary, such as clustering, classification, anomaly detection.
&#10;In many computational geometry and computer graphics applications, one often wants to compare detailed meshes identifiable point on an object that corresponds to matching points on similar objects.
&#10;$S \subseteq X$
&#10;$X$ -->
<!-- The metric k-center problem is a combinatorial optimization problem studied in theoretical computer science. Given n cities with specified distances, one wants to build k warehouses in different cities and minimize the maximum distance of a city to a warehouse. In graph theory, this means finding a set of k vertices for which the largest distance of any point to its closest vertex in the k-set is minimum. The vertices must be in a metric space, providing a complete graph that satisfies the triangle inequality. -->
<!-- k-center for any metric space (X , dX ). Given a dataset S ⊆ X , the goal is to quickly find a set of centers T ⊆ X with the constraint \|T\| = k. The objective is that maxa∈§ dX (a, T) is minimized over all such sets T. Here we extend the definition of a distance function to sets by dX (a, T) = minb∈T dX (a, b). -->

<div style="display: flex; justify-content: center; align-items: center;">

<iframe src="k_slider/index.html" width="400px;" height="450px;" sandbox="allow-same-origin allow-scripts allow-forms" style="overflow-y: hidden !important; text-overflow: hidden;" scrolling="no">
</iframe>

</div>

    '/Users/mpiekenbrock/peekxc.github.io/content/posts/landmark/parrot_slider.html'

<div style="display: flex; justify-content: center; align-items: center;">

<iframe src="parrot_slider/index.html" width="400px;" height="450px;" sandbox="allow-same-origin allow-scripts allow-forms" style="overflow-y: hidden !important; text-overflow: hidden;" scrolling="no">
</iframe>

</div>
