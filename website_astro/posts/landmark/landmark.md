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


There are many applications where one seeks to find a small yet
representative subset of the data. Typically, we want to solve a problem
$\mathcal{P}$ with respect to data $X$, but we can’t—*the data are
simply too large*—so we must work with a subset $S \subset X$ instead
and *hope it suffices*.

Sometimes, this works. Sometimes, though, the solutions $\mathcal{P}(S)$
deviate dramatically from the real problem $\mathcal{P}(X)$. Ideally, we
want a subset $S \subset X$ small enough to be *feasibly computable* on
$\mathcal{P}$, but also representative enough such that the solution
$\mathcal{P}(S)$ *approximates* $\mathcal{P}(X)$ under the appropriate
notion, e.g. a $(1 \pm \epsilon)$ scheme:

$$ (1 - \epsilon) \mathcal{P}(S) \leq \mathcal{P}(X) \leq (1 + \epsilon) \mathcal{P}(S)$$

Of course, the exact definitions of “problem” and “feasibly” and
“approximate” vary, but a general term for subsets which **provably**
achieve such approximations guarantees on their associated problems of
interest are called [coresets](https://en.wikipedia.org/wiki/Coreset).

Coresets they are *everywhere*: whether for vector quantization, low
rank matrix approximation, or surface simplification, coresets have
proven ubiquitous in scientific computing.

<!-- pop up in a variety of computational, geometric, or learning settings. -->

<!-- Indeed, the [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent)---a cornerstone of deep learning---is a type of coreset. -->

<!-- to computational problems like basic vector summation and to learning problems, like linear regression or principle component analysis.  -->

<!-- it is slow and often ineffective to compute the full gradient each iteration of training, so we choose to approximate with "batches."  -->

<!-- https://sarielhp.org/p/15/greedy_permutation/permutation.pdf -->

## One coreset to rule them all

Fascinating though they are, coreset theory can be quite
complicated—most coresets are difficult to analyse, difficult to
implement, and/or intrinsically problem-specific.

Except one.
<!-- For example, in the diameter problem, random uniform sampling is not likely to give a good approximation error. -->

There is one particular coreset construction that is easy to construct,
easy to analyze, and easy to implement. Moreover, it seems to have an
unending number of applications, having been re-discovered time and time
again: the **greedy permutation** (a.k.a the [farthest-first
traversal](https://en.wikipedia.org/wiki/Farthest-first_traversal)).
<!-- ubiquitous in computational geometry -->
<!-- Greedy permutations are effective permutations of an input set that keep points as far apart as possible while minimizing the maximum distance from any point to the sample. -->
The idea of the greedy permutation is to construct a permutation $P$ of
a set $X$ that keeps successive points as far apart as possible,
i.e. minimizing the maximum distance to previously encountered points.
Here’s a picture demonstrating the process:

![Picture from *Approximate Greedy Clustering and Distance Selection for
Graph Metrics*, by Eppstein et al](fft.png)

To clarify this construction, let $(X, d_X)$ denote a metric space of
size $\lvert X \rvert = n$, and $P = (p_0, p_1, \dots, p_{n-1})$ a
sequence of points from $X$. The sequence $P$ is called a <u>*greedy
permutation*</u> if, for all $i \in [n]$, we have:

$$d_X(p_i, P_i) = \max_{p \in P} d_X(p, P_i), \quad P_i = \{\, p_0, \dots, p_{i-1}\,\}$$

where $d_X(x, S)$ represents the minimum distance between $x \in X$ to
any point in the set $S$. The first point $p_0$ is called the *seed* of
the sequence $P$, and $P_i$ is called the *i-th* *prefix* of $P$.

Greedy permutations are easy to construct: given a seed point $p_0$ and
thus initial sequence $P = (p_0)$, choose the next point $p_1$
*greedily* by minimizing $d_X(p_0, P_1)$. Repeating this $k$-times
constructs a subset $S \subset X$ of size $\lvert S \rvert = k$ that in
many ways approximates the set $X$; when $k = n$, the resulting sequence
is a *permutation* of $X$.

## Properties: it has all of them.

Aside form the fact that its representation is extremely simple—just a
permutation of the set $X$—the greedy permutation comes equipped with a
variety of ‘nice’ coverage and separation properties. To
$$B(x, r) \triangleq \{ \, x' \in X : d_X(x, x') \leq r \, \}$$

One of the principal interests in the greedy permutation is that it
approximates the $k$-center clustering problem at all resolutions.
Specifically, the $k$-prefix given by the first $k$ vertices of the
permutations provides a $2$-approximation to the $k$-center clustering
problem, for all $k \in \{ \, 2, \dots, n \, \}$.

<!-- Assume we've constructed a greedy permutation $P$ of $X$. What are its properties, what problems can it approximate, and how does it relate to coresets? First, let's define a _ball_: -->

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

## Multiscale decomposition & quantization

To illustrate the broad utility of the greedy permutation, consider the
classical *vector quantization* problem.

To see why this can be used for vector quantization, consider the
problem of (lossily) compressing an $n \times m$ grayscale image $I$. As
a grayscale image, its intensity values can take any of the 256 values
representable by an unsigned 8-bit integer. Let’s assume a simple
Huffman encoding scheme, wherein the goal is simply to produce a smaller
image by replacing all $nm$ intensity values with a ‘codeword’ of a
smaller length, the idea being that more frequently occurring pixels map
to smaller codewords, while rarely occurring codewords necessarily take
up more bits.

For example, in the parrot picture below

``` python
import imageio
parrot_mat = imageio.imread("/Users/mpiekenbrock/peekxc.github.io/content/posts/landmark/parrots/parrot.jpeg")
parrot_mat = parrot_mat[:,:,0]
```

    /var/folders/0l/b3dbb2_d2bb4y3wbbfk0wt_80000gn/T/ipykernel_65069/3392017110.py:2: DeprecationWarning: Starting with ImageIO v3 the behavior of this function will switch to that of iio.v3.imread. To keep the current behavior (and make this warning disappear) use `import imageio.v2 as imageio` or call `imageio.v2.imread` directly.
      parrot_mat = imageio.imread("/Users/mpiekenbrock/peekxc.github.io/content/posts/landmark/parrots/parrot.jpeg")

This is a $316 \times 474$ pixel image, each pixel value representing an
unsigned 8-bit integer. Thus, the uncompressed storage size of this
image ought to be ~146 KB.

$$ 316 \times 464 \times 8 = $$

Under the (lossless) huffman coding scheme, we get a symbol table that
looks as follows:

    Bits Code              Value Symbol
       7 0000000               0 np.uint8(97)
       7 0000001               1 np.uint8(219)
       9 000001000             8 np.uint8(145)
       9 000001001             9 np.uint8(151)
       9 000001010            10 np.uint8(155)
       9 000001011            11 np.uint8(154)
       7 0000011               3 np.uint8(108)
       7 0000100               4 np.uint8(75)
       7 0000101               5 np.uint8(86)
       7 0000110               6 np.uint8(217)
       7 0000111               7 np.uint8(220)
       7 0001000               8 np.uint8(90)
       7 0001001               9 np.uint8(64)
       9 000101000            40 np.uint8(156)
      11 00010100100         164 np.uint8(14)
      12 000101001010        330 np.uint8(243)
      13 0001010010110       662 np.uint8(245)
      14 00010100101110     1326 np.uint8(248)
      14 00010100101111     1327 np.uint8(250)
      11 00010100110         166 np.uint8(6)
      11 00010100111         167 np.uint8(12)
       8 00010101             21 np.uint8(29)
       7 0001011              11 np.uint8(60)
       6 000110                6 np.uint8(92)
       7 0001110              14 np.uint8(71)
       7 0001111              15 np.uint8(93)
       6 001000                8 np.uint8(51)
       7 0010010              18 np.uint8(85)
       8 00100110             38 np.uint8(182)
       9 001001110            78 np.uint8(126)
       9 001001111            79 np.uint8(158)
       7 0010100              20 np.uint8(77)
       7 0010101              21 np.uint8(80)
       9 001011000            88 np.uint8(150)
       9 001011001            89 np.uint8(128)
       8 00101101             45 np.uint8(184)
       7 0010111              23 np.uint8(83)
       7 0011000              24 np.uint8(78)
       8 00110010             50 np.uint8(183)
       8 00110011             51 np.uint8(124)
       7 0011010              26 np.uint8(87)
       7 0011011              27 np.uint8(63)
       8 00111000             56 np.uint8(226)
       8 00111001             57 np.uint8(225)
       7 0011101              29 np.uint8(89)
       7 0011110              30 np.uint8(66)
       7 0011111              31 np.uint8(65)
      10 0100000000          256 np.uint8(24)
      11 01000000010         514 np.uint8(17)
      11 01000000011         515 np.uint8(10)
       9 010000001           129 np.uint8(157)
       8 01000001             65 np.uint8(34)
       7 0100001              33 np.uint8(72)
       7 0100010              34 np.uint8(114)
       7 0100011              35 np.uint8(56)
       7 0100100              36 np.uint8(104)
       7 0100101              37 np.uint8(67)
       9 010011000           152 np.uint8(162)
      11 01001100100         612 np.uint8(13)
      11 01001100101         613 np.uint8(20)
      10 0100110011          307 np.uint8(241)
       8 01001101             77 np.uint8(224)
       7 0100111              39 np.uint8(116)
       6 010100               20 np.uint8(101)
       7 0101010              42 np.uint8(69)
       8 01010110             86 np.uint8(35)
       9 010101110           174 np.uint8(161)
       9 010101111           175 np.uint8(160)
       6 010110               22 np.uint8(102)
       7 0101110              46 np.uint8(70)
       7 0101111              47 np.uint8(57)
       7 0110000              48 np.uint8(84)
       8 01100010             98 np.uint8(187)
       8 01100011             99 np.uint8(30)
       8 01100100            100 np.uint8(186)
      11 01100101000         808 np.uint8(9)
      11 01100101001         809 np.uint8(11)
      11 01100101010         810 np.uint8(19)
      11 01100101011         811 np.uint8(15)
       9 011001011           203 np.uint8(127)
       7 0110011              51 np.uint8(81)
       8 01101000            104 np.uint8(32)
       8 01101001            105 np.uint8(188)
       8 01101010            106 np.uint8(238)
       8 01101011            107 np.uint8(185)
       7 0110110              54 np.uint8(62)
       8 01101110            110 np.uint8(190)
       9 011011110           222 np.uint8(166)
      10 0110111110          446 np.uint8(25)
      11 01101111110         894 np.uint8(18)
      14 01101111111000     7160 np.uint8(251)
      14 01101111111001     7161 np.uint8(255)
      14 01101111111010     7162 np.uint8(246)
      14 01101111111011     7163 np.uint8(249)
      12 011011111111       1791 np.uint8(4)
       7 0111000              56 np.uint8(88)
       8 01110010            114 np.uint8(189)
       8 01110011            115 np.uint8(39)
       7 0111010              58 np.uint8(73)
       7 0111011              59 np.uint8(74)
       7 0111100              60 np.uint8(61)
       8 01111010            122 np.uint8(33)
       9 011110110           246 np.uint8(163)
       9 011110111           247 np.uint8(165)
       7 0111110              62 np.uint8(106)
       7 0111111              63 np.uint8(58)
       6 100000               32 np.uint8(95)
       7 1000010              66 np.uint8(59)
       7 1000011              67 np.uint8(91)
       7 1000100              68 np.uint8(113)
       7 1000101              69 np.uint8(100)
       9 100011000           280 np.uint8(28)
       9 100011001           281 np.uint8(159)
       8 10001101            141 np.uint8(191)
       7 1000111              71 np.uint8(107)
       8 10010000            144 np.uint8(121)
       8 10010001            145 np.uint8(115)
       9 100100100           292 np.uint8(164)
       9 100100101           293 np.uint8(167)
       8 10010011            147 np.uint8(195)
       7 1001010              74 np.uint8(112)
       8 10010110            150 np.uint8(192)
       8 10010111            151 np.uint8(38)
       8 10011000            152 np.uint8(196)
       8 10011001            153 np.uint8(223)
       7 1001101              77 np.uint8(76)
       8 10011100            156 np.uint8(197)
       9 100111010           314 np.uint8(171)
       9 100111011           315 np.uint8(168)
       7 1001111              79 np.uint8(48)
       7 1010000              80 np.uint8(109)
       7 1010001              81 np.uint8(44)
       7 1010010              82 np.uint8(98)
       8 10100110            166 np.uint8(194)
       8 10100111            167 np.uint8(198)
       8 10101000            168 np.uint8(36)
       9 101010010           338 np.uint8(231)
      10 1010100110          678 np.uint8(136)
      10 1010100111          679 np.uint8(139)
       8 10101010            170 np.uint8(199)
       8 10101011            171 np.uint8(193)
       7 1010110              86 np.uint8(54)
       8 10101110            174 np.uint8(37)
       9 101011110           350 np.uint8(119)
      10 1010111110          702 np.uint8(141)
      10 1010111111          703 np.uint8(143)
       7 1011000              88 np.uint8(117)
       7 1011001              89 np.uint8(110)
       8 10110100            180 np.uint8(200)
       8 10110101            181 np.uint8(40)
       9 101101100           364 np.uint8(169)
       9 101101101           365 np.uint8(239)
      13 1011011100000      5856 np.uint8(244)
      16 1011011100001000  46856 np.uint8(253)
      17 10110111000010010 93714 _EOF
      17 10110111000010011 93715 np.uint8(252)
      15 101101110000101   23429 np.uint8(254)
      14 10110111000011    11715 np.uint8(247)
      12 101101110001       2929 np.uint8(1)
      11 10110111001        1465 np.uint8(21)
      10 1011011101          733 np.uint8(138)
       9 101101111           367 np.uint8(172)
       7 1011100              92 np.uint8(52)
       7 1011101              93 np.uint8(50)
       8 10111100            188 np.uint8(45)
      10 1011110100          756 np.uint8(132)
      10 1011110101          757 np.uint8(133)
       9 101111011           379 np.uint8(170)
       8 10111110            190 np.uint8(204)
       8 10111111            191 np.uint8(42)
       9 110000000           384 np.uint8(230)
      11 11000000100        1540 np.uint8(23)
      12 110000001010       3082 np.uint8(3)
      12 110000001011       3083 np.uint8(7)
      10 1100000011          771 np.uint8(140)
       8 11000001            193 np.uint8(201)
       7 1100001              97 np.uint8(46)
       8 11000100            196 np.uint8(202)
       8 11000101            197 np.uint8(203)
       7 1100011              99 np.uint8(99)
       9 110010000           400 np.uint8(237)
       9 110010001           401 np.uint8(175)
       8 11001001            201 np.uint8(43)
       9 110010100           404 np.uint8(176)
      10 1100101010          810 np.uint8(131)
      10 1100101011          811 np.uint8(135)
       9 110010110           406 np.uint8(174)
       9 110010111           407 np.uint8(229)
       7 1100110             102 np.uint8(103)
       7 1100111             103 np.uint8(96)
       7 1101000             104 np.uint8(47)
       7 1101001             105 np.uint8(118)
       8 11010100            212 np.uint8(205)
      10 1101010100          852 np.uint8(149)
      10 1101010101          853 np.uint8(240)
       9 110101011           427 np.uint8(123)
       9 110101100           428 np.uint8(178)
       9 110101101           429 np.uint8(173)
       8 11010111            215 np.uint8(222)
       6 110110               54 np.uint8(94)
       9 110111000           440 np.uint8(232)
      10 1101110010          882 np.uint8(26)
      10 1101110011          883 np.uint8(142)
       9 110111010           442 np.uint8(233)
       9 110111011           443 np.uint8(234)
       8 11011110            222 np.uint8(221)
       8 11011111            223 np.uint8(213)
       7 1110000             112 np.uint8(55)
      10 1110001000          904 np.uint8(130)
      10 1110001001          905 np.uint8(137)
      10 1110001010          906 np.uint8(134)
      10 1110001011          907 np.uint8(144)
       8 11100011            227 np.uint8(215)
       9 111001000           456 np.uint8(180)
       9 111001001           457 np.uint8(122)
       8 11100101            229 np.uint8(41)
       8 11100110            230 np.uint8(207)
       8 11100111            231 np.uint8(206)
      10 1110100000          928 np.uint8(147)
      10 1110100001          929 np.uint8(129)
       9 111010001           465 np.uint8(177)
       8 11101001            233 np.uint8(212)
       8 11101010            234 np.uint8(210)
       8 11101011            235 np.uint8(209)
       7 1110110             118 np.uint8(105)
      10 1110111000          952 np.uint8(27)
      10 1110111001          953 np.uint8(146)
       9 111011101           477 np.uint8(228)
       8 11101111            239 np.uint8(214)
       8 11110000            240 np.uint8(49)
       8 11110001            241 np.uint8(208)
      10 1111001000          968 np.uint8(148)
      12 111100100100       3876 np.uint8(242)
      12 111100100101       3877 np.uint8(2)
      12 111100100110       3878 np.uint8(8)
      12 111100100111       3879 np.uint8(5)
       9 111100101           485 np.uint8(31)
       8 11110011            243 np.uint8(111)
       8 11110100            244 np.uint8(216)
       9 111101010           490 np.uint8(125)
       9 111101011           491 np.uint8(227)
       9 111101100           492 np.uint8(179)
      10 1111011010          986 np.uint8(153)
      11 11110110110        1974 np.uint8(22)
      11 11110110111        1975 np.uint8(16)
       8 11110111            247 np.uint8(120)
       8 11111000            248 np.uint8(218)
       8 11111001            249 np.uint8(211)
       9 111110100           500 np.uint8(236)
      10 1111101010         1002 np.uint8(0)
      10 1111101011         1003 np.uint8(152)
       8 11111011            251 np.uint8(68)
       8 11111100            252 np.uint8(82)
       8 11111101            253 np.uint8(79)
       9 111111100           508 np.uint8(181)
       9 111111101           509 np.uint8(235)
       8 11111111            255 np.uint8(53)

``` python
import io
from contextlib import redirect_stdout
std_out = io.StringIO()
codec.print_code_table(std_out)
print('\n'.join(std_out.getvalue().split('\n')[:15]))
```

    Bits Code              Value Symbol
       7 0000000               0 np.uint8(97)
       7 0000001               1 np.uint8(219)
       9 000001000             8 np.uint8(145)
       9 000001001             9 np.uint8(151)
       9 000001010            10 np.uint8(155)
       9 000001011            11 np.uint8(154)
       7 0000011               3 np.uint8(108)
       7 0000100               4 np.uint8(75)
       7 0000101               5 np.uint8(86)
       7 0000110               6 np.uint8(217)
       7 0000111               7 np.uint8(220)
       7 0001000               8 np.uint8(90)
       7 0001001               9 np.uint8(64)
       9 000101000            40 np.uint8(156)

We can get the number of bits of the huffman encoding by mapping the
intensity values to their corresponding ‘codeword’, counting the number
of bits of each such encoding.

    138.62744140625

Thus, in the above parrot image, we get a pretty modest compression
level of 94% (though it is lossless).

Of course, the `greedypermutation` is not a compression algorithm
per-se. But it’s geometric coverage properties suggest it might be a
valid way of approaching the encoding problem. If we arrange the pixel
values of the image on the real line and simply run the greedy
permutation, starting with black as our starting pint, we get the
following set of intensity values:

    [ 58 105  99  99  83  98  96 102  69  76  94  99  96  98 100]

Predictably, starting with a 0 intensity value (black) as our seed, the
furthest pixel away is full intensity (all white), followed by the
middle intensity value (128). This makes sense, as the greedy
permutation tends to choose extremal values.

What happens after is a little surprising. The value should look
familiar: each contiguous set of $2^k$ values for $k \geq 0$ are awfully
close to $k$-levels of a bread-first search tree built on top the range
$[0, \dots, 255]$.

                                      128
                                /          \
                        64              192
                    /   \           /     \
              32     96        160    224
            /   \    /  \     /  \    /  \
         16   48  80  112 144 176 208  240

This matches intuition: under uniform intensity values, the best way to
“cover” the range \[0..255\] would naturally be to start with the middle
value, partition the range into two \[0..127\] and \[129..255\], then
choose the next two points to be the centers of those ranges (in any
order). Continuing this process yields a set of pixel values that is
guaranteed to halve the minimum distance $d_X(x, S)$ of each intensity
value each level of the tree.

    BokehUserWarning: ColumnDataSource's columns must be of the same length. Current lengths: ('x', 256), ('y', 254)

By converting to black-and-white ($k=2$), we achieve a pleasant
compression level comparable to 15% of the original size. But this isn’t
all: we can *choose* the compression levels by a simple dictionary
mapping of codewords. This is sometimes called *progressive
compression*.

Thus, using the `greedypermutation`, we’ve turned a classical lossless
compression technique into a lossy, progressive compressive technique
that recovers the lossless when $k$ is large enough, all without knowing
almost anything about compression!

<div style="display: flex; justify-content: center; align-items: center;">

<iframe src="parrot_slider/index.html" width="400px;" height="450px;" sandbox="allow-same-origin allow-scripts allow-forms" style="overflow-y: hidden !important; text-overflow: hidden;" scrolling="no">

</iframe>

</div>

## Beyond the real line

The astute read will recognize that, though this little technique is
clever, it by not means can compete with the highly advanced,
multi-decade in-the-works compressed algorithms (e.g. Lempel-Ziv, WebP).
These compression techniques are much more complicated and successful,
and industrial. Beyond tiny demonstrations above, there’s not too many
uses of the `greedypermutation` for 1-d compression.

But the `greedypermutation` is not limited to the real line. Without
changing the underlying algorithm *at all*, we can readily adapt the
k-centering approach to higher dimensions. The biggest observation is
that works with the metric k-center out-of-the-box:

<!-- TODO: Show the metric k=center objective plot -->

## Generalizing to proximity searching

The greedy permutation *feels* like a natural, multiscale description of
a metric space. Aside from the description given above with black and
white pixels, it just seems like one ought to write an algorithm capable
of hierarchically decomposing a metric space in a geometrically “nice”
way for fun and for profit.

One of my favorite uses of the greedypermutation is the `greedy tree`,
an equally simple Ball-tree like construction which provides range
searching capability, including radius searches, ANN searching, and KNN.

This is a recent paper by Don Sheehy that does just this.

## Sometimes the hammer is a good tool

Ok, so the greedypermutation can used to solve:

- Metric k-center
- Metric k-cover
- Metric k-separation
- ANN searching
- Ball search
- KNN search
- Progressive encoding

Can we elegantly extend its use to a

dual tree
