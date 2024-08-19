---
tags: ["posts"]
layout: single_md.pug
title: "The worlds best data structure"
author: "Matt Piekenbrock"
date: '2022-07-03'
slug: data_structures_1
include_toc: true
categories: ["data_structures"]
draft: true
---

<!-- A question that occurs enough in my life for me to document my answer in a blog post: *what are the major data structures everyone should know?*

Fundamentally, the use/non-use of any particular data structure completely depends on what _specific problem_ is being solved. Data structures are a means of organizing memory and controlling [complexity](https://en.wikipedia.org/wiki/Asymptotic_computational_complexity): without reference to a particular computational problem, it's difficult to give a straight answer. While there are *common* data structures that "most" computer scientists know, there is no _de facto standard_ list of data structure one *should* know. 

Moreover, although an expansive knowledge of a variety of data structures can be as useful as having a large vocabulary is in written communication, the most challenging part of learning a new data structure is typically *not* the technical details of how the data structure itself works. Rather, the real challenge comes in recognizing the circumstances wherein a data structure provides and elegant and efficient solution to a specific problem. [Jon Bentley](https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)) summarizes this nicely: 

> The battle for a fast system can be won or lost in specifying the problem it is to solve.
> - Jon Bentley, Programming Pearls


> Probably the most beneficial [data structure] for your career is learning to be effective arrays... being good with arrays is very very beneficial - Primagen (Scams in Software Engineering, 18 min)

So what data structures should everyone know? Since this post is part I, I'll start by characterizing the properties of _the most fundamental category_ of data structures that every computer scientist should know. -->

<!-- They are the fastest, most versatile data structure in the planet?  -->
<!-- Well of course, it is the humble _array_.  -->

Arrays are my favorite data structure. Though the humble array is the first data structure I learned, and though I learned of many other data structures since then, I've come to appreciate that arrays are not only ubiquitous, but also incredibly versatile. Yet, to my surprise, I've seen many junior developers overreach to much more complicated data structures, e.g. hash-tables or sets (usually implemented as trees), despite the array being more than sufficient. 

<!-- In this post, I thought I'd cover  -->

An _array_ is a sequence container that organizes $n$ homogeneous elements within a contiguous block of memory that supports randomized ($O(1)$) access to its elements. Contiguity and homogeneity are necessary conditions for randomized access: homogeneity guarantees the size of each element is fixed and contiguity guarantees the elements can be indexed in constant-time using [offsets](https://en.wikipedia.org/wiki/Offset_(computer_science)). 

Beginner developers often refer to similar data structures as "arrays" (e.g. lists), but this is a technicality: contiguity and homogeneity are necessary conditions for a data structure to be called an _array_. 

There are many types of arrays, of which the following are worth discussing in detail:

1. Fixed-size arrays
2. Dynamically-sized arrays
3. $n$-dimensional arrays
4. Sparse arrays
5. Bit arrays

## Fixed-sized array

A _fixed-size array_ is an _array_ whose size is known ahead of time, in some sense. In C++, this means that an array's size must be specified _at compile time_. The canonical standards-compliant container for a fixed-size array is the [std::array](https://en.cppreference.com/w/cpp/container/array).

```cpp
auto a = std::array< int, 15 >(); // must know its type *and* size
```

Observe both the type (_int_) and size (_15_) are supplied at compile-time via the type's [template parameters](https://en.cppreference.com/w/cpp/language/template_parameters). 

Fixed-sized arrays have advantages in C++ as they are typically stored [on the stack](https://www.learncpp.com/cpp-tutorial/the-stack-and-the-heap/) or in global program memory, which [can be much faster to access than the heap](https://publicwork.wordpress.com/2019/06/27/stack-allocation-vs-heap-allocation-performance-benchmark/). This is not strictly true, however, because [alloca exists](https://man7.org/linux/man-pages/man3/alloca.3.html) and can be used to create "stack-allocated dynamic arrays." Nonetheless, if an array's size is known at compile-time, a fixed-size array should be used.

Surprisingly, Python does not have a fixed-size array implementation---the canonical fixed-size array data structure is the [numpy array](https://numpy.org/doc/stable/reference/arrays.html). Numpy arrays are true arrays: they [are homogeneous](https://numpy.org/doc/stable/glossary.html#term-homogeneous) and they [know their value (d)types](https://numpy.org/doc/stable/reference/arrays.dtypes.html).

```python
a = np.empty(shape=(2,), dtype=int) # a fixed-size array knows it's size and it's type
print(a) # junk: a = array([4607182418800017408, 4613374868287651840])
a[[0, 1]] = 1, 2 # This takes O(1) time
print(a[2]) # this throws
# > IndexError: index 2 is out of bounds for axis 0 with size 2
```

#### Remark 

One might be tempted in thinking that numpy arrays are not fixed size because of `np.append`/`np.insert`, but this is not true--numpy arrays must perform a copy to accomodate these operations. 

```python
a_id = id(a)          # unique identifier for a 
a[0] = 4              # write value to array 
assert id(a) == a_id  # True, a still points to the same memory 
b = np.append(a, 3)   # a is fixed, so a copy must occur!
print(a)              # [1,2]
print(b)              # [1,2,3]
assert id(b) != a_id  # True 
```

One might also be tempted in thinking that numpy arrays are type-agnostic because they support things like [void](https://numpy.org/doc/stable/reference/arrays.scalars.html#numpy.void) and [object](https://numpy.org/doc/stable/glossary.html#term-object-array) types, but this is also a facade. The generic types are just placeholders or typecast-compatible parent types of types whose size (or size-bound) [still must be known at instantation](https://numpy.org/doc/stable/reference/arrays.scalars.html#numpy.flexible). 


## Dynamic arrays

A _dynamic array_ is an _array_ that also supports insertion and deletion of elements. Necessarily, these operations change the array's size, though they may also change the arrays [capacity](https://en.cppreference.com/w/cpp/container/vector/capacity). In most implementations, [appending](https://en.wikipedia.org/wiki/Append) to the end of an array takes $O(1)$ [amortized time](https://en.wikipedia.org/wiki/Amortized_analysis)---the worst-case complexity is always $O(n)$ to ensure the contiguity property is met.

Dynamic arrays are often used when number of elements the array needs to contain is not known ahead of time, but the value type $T$ to store is homogenous and known. In C++, the standards-compliant [STL](https://en.wikipedia.org/wiki/Standard_Template_Library)-inspired container for representing dynamic arrays is the `std::vector` class. For example, a _streaming_ process that continually yields numbers until some sentinel condition:  

```cpp
auto v = std::vector< int >(); // empty vector; observe v knows its element type
while (auto x = stream_number()){
  v.push_back(x); // amortized O(1) appending
  if (x == SENTINEL_VALUE){ break; }
}
```
<!-- Here in the line `while(x = f())` I'm abusing the fact that assignments are valid expressions in conditionals and that integers [implicity type cast](https://en.wikipedia.org/wiki/Type_conversion) to booleans that happen match the condition of the problem. This is sometimes an [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern), but I think it's fine (see also [Yoda conditions](https://en.wikipedia.org/wiki/Yoda_conditions)). -->

What is the canonical dynamic-array data structure in Python? Well, of course, it's defined by the [array module](https://docs.python.org/3/library/array.html):

```python
from array import array
a = array('I') # an array *must* know its element type
f = range(15) # creates an iterable - using O(1) memory!
a.extend(f) # sequence of appends taking amortized O(1) time
```

### Detour: Amortized analysis

How do dynamic arrays always $O(1)$ memory access under size modifications? If some other area of memory exists just beyond the memory of the array being extended, then a $O(n)$ copy must take place to _move_ that arrays memory values somewhere where such size extensions don't overwrite memory not allocated for the array. Yet, appending is listed as a $O(1)$ operation on [wikipedia](https://en.wikipedia.org/wiki/Array_(data_structure)). 

To see what's happening here under the hood? Assuming `v` is initialized to an empty vector (this [doesnt actually happen](https://stackoverflow.com/questions/12271017/initial-capacity-of-vector-in-c)), the first call to `push_back()` will do the following:

- Copy `v`'s contents, if any, to a buffer
- [Free](https://en.cppreference.com/w/c/memory/free) the memory held by `v`
- Re-allocate a new contiguous block of memory $m$ of size $2n*\mathrm{sizeof}(\text{int})$
- Copy the contents from the buffer to $m$
  
Under this allocator scheme, this entire process happens whenever the [capacity](https://en.cppreference.com/w/cpp/container/vector/capacity) exceeds some power of two, $2^0, 2^1, 2^2, \dots, 2^m$.  If $f$ returns $N$ valid values, then there are $m = \lceil \log_2(N) \rceil -1$ insertions taking $O(n)$ and $N - m$ insertions taking $O(1)$. Note that the number of insertions taking $O(1)$ time increases exponentially, making the number $O(n)$ re-allocations exceedingly rare as $n \to \infty$. This is what is meant by _amortized time_.

In general, if $T(n)$ is the worst-case running time for a *sequence* of $n$ computations, then the amortized time for each operation is $T(n)/n$. One says an operation runs in _amortized_ $O(1)$ if its average cost of in a sequence of $n$ computations is constant. Note this statement is distinct compared to one made using [average case analysis](https://en.wikipedia.org/wiki/Average-case_complexity): amortized complexity statements are always made *with respect to a sequence* of operations, whereas average-case statements characterize the complexity of an operation with respect to a probability distribution over its inputs. 

The table below shows the cost $\delta_i$ and capacity $c_i$ of performing the $i$-th append operation to a dynamic array:  

$$
\begin{array}{ |c|cccccccccccccc| } 
 \hline
 i   & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & \dots \\ 
 c_i & 1 & 2 & 4 & 4 & 8 & 8 & 8 & 8 & 16 & 16 & 16 & 16 & 16 & \dots \\ 
 \delta_i & 1 & 2 & 3 & 1 & 5 & 1 & 1 & 1 & 9 & 1 & 1 & 1 & 1 & \dots \\ 
 \hline
\end{array}
$$

The cost of performing a sequence of $n$ array append operations is given by:  

$$\sum\limits_{i = 1}^n \delta_i \leq n + \sum\limits_{j=1}^{m} 2^{j-1} < 2n$$

Where again $m = \lceil \log_2(n) \rceil - 1$ . Since both terms on the right hand side are $O(n)$, the cost of performing the sequence of $n$ append operations is $O(n)$. Thus, the time required to insert each element is indeed $O(1)$ _on average_.

Strictly speaking, re-allocations need not always be performed when $n$ exceeds powers of $2$.  In the array insertion case, as long as the frequency with which the allocator chooses to perform the re-allocation is inversely proportional to a superpolynomial, the amortized cost should be sublinear and thus the allocator scheme is efficient. There are other kinds of amortized analysis; the simplest one which is shown above is called the _aggregate method_, however there are more detailed kinds of amortized analysis e.g. the [potential method](https://en.wikipedia.org/wiki/Potential_method). See [here](https://www.cs.cornell.edu/courses/cs3110/2011sp/Lectures/lec20-amortized/amortized.htm) and [here](https://www.cl.cam.ac.uk/teaching/1516/Algorithms/lec13-24.pdf) for a more in-depth review of amortized analyis. 


## $d$-dimensional array

Oweing to its contiguity requirement, an array is fundamentally a 1-dimensional data structure. 
<!-- Nonetheless, it is common in practice to  -->


<!-- Rather than recording the size of an array with 1 number, one could instead use $d$ numbers.   -->
A _matrix_ is a 2-dimensional generalization of a fixed-size _array_ whose size is recorded by two numbers, instead of one. More generally, a _$d$-dimensional array_ is a fixed-size array whose size is recorded by $d$ numbers. These are sometimes called [multi-dimensional arrays](https://en.wikipedia.org/wiki/Array_data_type#Multi-dimensional_arrays) and should not be confused with [jagged arrays](https://en.wikipedia.org/wiki/Jagged_array). Matrices are still memory-contiguous and type-homogenous. Instead of elements being indexed by offsets, they are indexed by [strides](https://en.wikipedia.org/wiki/Stride_of_an_array) (the multi-dimensional generalization of an offset).

There are many concepts that are useful to know about a particular matrix implementation. For example, since arrays store memory contiguously, should memory be stored in [column or row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order)? C/C++'s 'native' multi-dimensional array is row-major. For various performance reasons, many popular linear algebra libraries in C++ use column-major order (e.g. [Eigen](https://eigen.tuxfamily.org/dox/group__TopicStorageOrders.html) and [Armadillo](http://arma.sourceforge.net/docs.html)), as does [MATLAB and Fortran](https://www.mathworks.com/help/coder/ug/what-are-column-major-and-row-major-representation-1.html). In Python, the canonical matrix implementation is with NumPy, but by default uses row-major ordering.

Nonetheless, at the end of the day, _dense matrices_ and _multi-dimensional arrays_ are essentially generalizations of fixed-size arrays, and thus the properties of the latter translate directly to the former. 

## Sparse arrays

A _sparse array_ is a data structure that mimicks the semantics of _arrays_, but whose space complexity is proportional to the number of non-zero values it contains. 
Like _arrays_, there exist fixed / dynamic / $d$-dimensional variants, they are typically type-homogenous, and they also use an offset-based scheme to permit fast element access. Unlike _arrays_, element-wise access is typically not constant-time. 

Suppose you wanted to build a $(n \times n)$ [sparse matrix](https://en.wikipedia.org/wiki/Sparse_matrix) $M$ from a [generator](https://peps.python.org/pep-0255/) $f$ whose size is unknown and which on evaluation yields a 3-tuple of the form $(i,j,x)$, where:

- $i$, $j$ are unsigned integers (each $<n$) specifing the a position of a non-zero value in $M$
- $x$ is the non-zero value (say, a float) to go in position $M[i,j]$

How would you go about constructing such a data structure efficiently? How are sparse matrices represented in memory in the first place? Consider the 'coordinate' format of a sparse matrix used by [SciPy](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.coo_array.html#scipy.sparse.coo_array):

```python
from scipy.sparse import coo_array
from array import array
f = ... # some iterable returning triplets
I, J, X = array('I'), np.array('I'), np.array('f')
for (i,j,x) in f:
  I.append(i)
  J.append(j)
  X.append(x)
M = coo_array((X, (I, J)), shape=(max(I), max(J)))
```

## Bit arrays

On the surface, a _bit array_ seems like it's just an _array_ whose element type is a [bit](https://en.wikipedia.org/wiki/Bit). This is mostly true, but there are some serious subtleties in how one should use and think about bit arrays.

In general, asymptotic complexity statements have [very specific mathematical definitions](https://en.wikipedia.org/wiki/Big_O_notation#Family_of_Bachmann%E2%80%93Landau_notations). These definitions, by design, are completely platform independent and thus _may or may not_ have any relevence in quantifying a data structures efficiency _in practice_ (i.e. its runtime performance). Nonetheless, one of the primary uses of complexity analysis is to taxonomically distinguish data structures according to the [empirical orders of growth](https://en.wikipedia.org/wiki/Analysis_of_algorithms#Empirical_orders_of_growth) their operations exhibit. Obviously, one _should_ know and account for a data structure's complexity before choosing to use it solve a real computational problem. 

How do complexity statements differ between regular arrays and bit arrays? Since _bit arrays_ are _arrays_, all of the previous asymptotic statements and properties of _arrays_ still hold. However, because of their nature, such statements are not helpful in understanding the utility of a bit array.  

Why do these statements lose meaning? Well, we typically think of our standard types (int, float, double) as being close to the [word](https://en.wikipedia.org/wiki/Word_(computer_architecture)) size---either 32-bits or 64-bits. In theory, this means that the processor ought to be able to do simple arithmetic operations (e.g. addition) and memory operations (e.g. loading a variable into a register) with these types using $c$-cycles, where $c$ is some very small constant. This is not entirely true, of course---to say anything concrete requires knowledge of the [computer architecture](https://en.wikipedia.org/wiki/Computer_architecture), whether the instruction set is [CISC](https://en.wikipedia.org/wiki/Complex_instruction_set_computer) or [RISC](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer), etc. Indeed, many "primitive" operations can have [highly non-trivial costs](https://stackoverflow.com/questions/7724061/how-slow-how-many-cycles-is-calculating-a-square-root). Nonetheless, it seems intuitive that word-size types can be operated on with word-size instructions at a rate of $\approx 1$ cycle per operation. Because of this intuition, it is easy and sometimes safe to conflate asymptotic statements about array operations (like $O(1)$ randomized access) with the notion of an [instruction cycle](https://en.wikipedia.org/wiki/Instruction_cycle) with arrays whose element sizes are aligned to the word-size. Indeed, a $O(n)$ operation on an array involving simple arithmetic instructions _will_ be faster than an $O(n^2)$ operation comprised of similar arithmetic operations, and an $O(n^2)$ operation _will_ be faster than a comparable $O(n^3)$ operation, etc. That is, in simple arithmetic settings, asymptotic statements *are* typically informative stand-ins for runtime statements. 

Since each element of a bit array is much smaller than the word-size, this assumed 1-1 correspondence statement loses much of its validity. One must talk about what is happening at the  level of memory access. Obviously, a bit array is potentially a very compact representation from the storage perspective, but manipulation of individual bits at the hardware level must be performed via [usually several] [bitwise operations](https://en.wikipedia.org/wiki/Bitwise_operation). Sometimes these operations are efficient and sometimes they are not, leading many to question the utility of such a data structure. Indeed, this has been [a constant point of contention](https://howardhinnant.github.io/onvectorbool.html) in the evolution of data structures in C++ used to represent arrays of bits. In fact, some would say that C/C++ [does not provide support for an array of bits](http://www.mathcs.emory.edu/~cheung/Courses/255/Syllabus/1-C-intro/bit-array.html) but rather provides _all the necessary operations_ (also see [bit hacks](http://graphics.stanford.edu/~seander/bithacks.html)) to allow the developer to implement an array of bits.
Naturally, this has lead to many bit array representations in the standard library, such as the [bit array](https://cplusplus.com/reference/bitset/bitset/), [std::vector<bool>](https://en.cppreference.com/w/cpp/container/vector_bool), and [bit fields](https://en.cppreference.com/w/cpp/language/bit_field).

Python provides [bitwise operations natively via PEP 225](https://peps.python.org/pep-0225/) and there's a decent [bitarray package](https://pypi.org/project/bitarray/).


## Conclusion + things worth thinking about

Arrays are not just the simplest data structures, they are also the most performant ones in many situations. An array is _the most compact and most cache-friendly data structure that there is_. In my humble opinion, arrays should be one's __first choice__ to use if the situation allows. This may sound obvious to anyone who has worked with a compiled language, yet there exist many random [internet articles abound](https://betterprogramming.pub/stop-using-lists-for-everything-in-python-46fad15217f4) recommending the average Python programmer 'branch out' by using other non-array data structures like _sets_ and _dictionaries_. I often see this with my own students, many of who either use lists or numpy arrays because they don't even know the array module exists.

