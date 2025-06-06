---
tags:
  - projects
layout: partials/card_block.pug
card_title: 'Towards Autonomous Aerial Refueling: Massive Parallel Iterative Closest Point'
card_subtitle: 'Funding: Oak Ridge Institute for Science and Education'
background_image: /resources/aircraft.png
abstract: >-
  The Iterative Closest Point (ICP) problem is now a well-studied problem that
  seeks to align a given query point cloud to a fixed reference point cloud. The
  ICP problem computationally is dominated by the first phase, a pairwise
  distance minimization. The ''brute-force'' approach, an embarrassingly
  parallel problem amenable to GPU-acceleration..
abstract_full: >-
  The Iterative Closest Point (ICP) problem is now a well-studied problem that
  seeks to align a given query point cloud to a fixed reference point cloud. The
  ICP problem computationally is dominated by the first phase, a pairwise
  distance minimization. The 'brute-force' approach, an embarrassingly parallel
  problem amenable to GPU-acceleration, involves calculating the pairwise
  distance from every point in the query set to every point in the reference
  set. This however still requires linear runtime complexity per thread,
  rendering the trivial solution unsuitable for e.g. real-time applications.
  Alternative spatial indexing data structures utilizing branch-and-bound (B&B)
  properties have been proposed as a means of reducing the algorithmic
  complexity of the ICP problem, however they were originally developed for
  serial applications: it is well known that direct conversion to their parallel
  equivalents often results in slower runtime performance than GPU-employed
  brute-force approaches due to frequent suboptimal memory access patterns and
  conditional computations. In this application-motivated effort, we propose a
  novel two-step method which exposes the intrinsic parallelism of the ICP
  problem, yet retains a number of the B&B properties. Our solution involves an
  O(log n) approximate search, followed by fast vectorized search we call the
  Delaunay Traversal, which we show empirically finishes in O(k) time on
  average, where k << n, and is demonstrated to generally exhibit extremely
  small growth factors on average. We demonstrate the superiority of our method
  compared to the traditional B&B and brute-force implementations using a
  variety of benchmark data sets, and demonstrate its usefulness in the context
  of Autonomous Aerial Refueling
image: /resources/icp.png
card_tags:
  - Geometry
  - Point registration
  - High performance computing
date: 2014-01-01T00:00:00.000Z
format: gfm
---


<div class="flex items-center px-2 py-1 bg-gray-100">

<h4 class="font-bold bg-gray-100">

Publications
</h4>

</div>

<div class="p-2 overflow-auto px-4 py-2 bg-white-100">

<div class="bullet_list text-sm ml-2 mt-1 lisc-desc space-y-2 prose-md"
style="list-style-type: disc !important;">

- J. Robinson, M. Piekenbrock, L. Burchett, et. al. Parallelized
  Iterative Closest Point for Autonomous Aerial Refueling. In
  International Symposium on Visual Computing (pp. 593-602). Springer
  International Publishing. (2016, December) (doi:
  10.1007/978-3-319-50835-1_53)
- Piekenbrock, M., Robinson, J., Burchett, L., Nykl, S., Woolley, B., &
  Terzuoli, A. (2016, July). Automated aerial refueling: Parallelized 3D
  iterative closest point: Subject area: Guidance and control. In
  Aerospace and Electronics Conference (NAECON) and Ohio Innovation
  Summit (OIS), 2016 IEEE National (pp. 188-192). IEEE. (doi:
  10.1109/NAECON.2016.7856797)

</div>

</div>

<!-- :::{.flex .items-center .px-2 .py-1 .bg-gray-100}
<h4 class="font-bold bg-gray-100"> Software </h4>
:::
&#10;:::{.p-2 .overflow-auto .px-4 .py-2 .bg-white-100 .text-sm}
&#10;The software is not publically available, however the 
&#10;::: -->
