---
format: gfm
layout: single_md.pug
tags:
  - posts
title: Minimal perfect hashing
author: Matt Piekenbrock
date: '2024-02-25'
slug: mphf1
include_toc: true
categories:
  - math
  - hashing
  - C++
draft: true
editor:
  rendor-on-save: true
execute:
  echo: false
  eval: false
  freeze: auto
  cache: true
bibliography: ../references.bib
---


A *hash function* is a function $h : U \to M$ that maps some set of $n$
keys $S \subseteq U$ to some set $M$, typically a subset of the integers
$M \subset \mathbb{Z}$. A *perfect hash function* is an injection
$h : S \to M$, where $m = \lvert M \rvert$ must necessarily satisfy
$m \geq n$. If $m = n$ and $M = \{0, 1, \dots, n - 1\}$, $h$ is called a
*minimal perfect hash function* (MPHF). If additionally, for any pair of
keys $s, s' \in S$ with $s < s'$ the map $h$ satisfies $h(s) < h(s')$,
then $h$ is called *order preserving*.

Perfect hashing Given a universe $U$ and a fixed subset of keys
$S \subseteq U$, a hashing function is a function that resembles a
function $f: S \to I$ to some index set.

When $I$
