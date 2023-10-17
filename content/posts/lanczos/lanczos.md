---
format: gfm
layout: single_md.pug
tags: ["posts"]
title: "The Lanczos Method"
author: "Matt Piekenbrock"
date: '2023-10-15'
slug: lanczos_method
include_toc: true
categories: ["linear_algebra"]
draft: true
---

<!-- Computing the eigen-decomposition $A = U \Lambda U^T$ of a symmetric matrix $A \subset \mathbb{R}^{n \times n}$ takes $O(n^3)$ time and $O(n^2)$ space. There's just no way around it.
&#10;<span style="font-size: 14em;" > ...or is there? </span>  -->

The Lanczos method Suppose you have a the eigen-decomposition
$A = U \Lambda U^T$ of a symmetric matrix
$A \subset \mathbb{R}^{n \times n}$ Well, assuming the “simple”
computation model of multiplication, these bounds are tight for dense
matrices: $U$ has size $\sim O(n^2)$, and reducing $A$ to its
Householder form (Givens rotations, Householder reflectors, etc), the
necessity of inner products taking $O(n)$ time.

If $A$ is sparse or otherwise highly structured[^1], there actually is a
*simple* algorithm that can compute the eigenvalues $\Lambda$ of $A$ in
essentially quadratic time. The idea is quite simple:

**Idea**: For some random $v \in \mathbb{R}^n$, expand successive powers
of $A$:

$$ 
\begin{align}
K_j &= [ v \mid Av \mid A^2 v \mid \dots \mid A^{j-1}v] && \\
Q_j &= [ q_1, q_2, \dots, q_j] \gets \mathrm{orthonormalize}(K_j) && \\
T_j &= Q_j^T A Q_j &&
\end{align}
$$

Cornelius Lanczos called this the *method of minimized iterations*. In
his honor, we now refer to it as *the Lanczos method*.

However, if $v \mapsto Av \approx O(n)$, then $\Lambda(A)$ obtainable in
<span style="color: red;"> $O(n^2)$ time </span> and
<span style="color: red;">$O(n)$ space</span>!

<div style="padding-left: 1em; border: 1px solid black; margin: 0em; ">

**Theorem \[@simon1984analysis\]**: Given a symmetric rank-$r$ matrix
$A \in \mathbb{R}^{n \times n}$ whose matrix-vector operator
$A \mapsto A x$ requires $O(\eta)$ time and $O(\nu)$ space, the Lanczos
iteration computes
$\Lambda(A) = \{ \lambda_1, \lambda_2, \dots, \lambda_r \}$ in
$O(\max\{\eta, n\}\cdot r)$ time and $O(\max\{\nu, n\})$ space *when
executed in exact arithmetic*.

</div>

## Diving in

It turns out that every $A \in \mathbf{S}$ expanded this way admits a
*three-term recurrence*

$$ A q_j = \beta_{j-1} q_{j-1} + \alpha_j q_j + \beta_j q_{j+1} $$

[^1]: Such that one can compute the matrix-vector product of $A$
    quickly.
