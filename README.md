Benchmark overview
==================

The goal of this benchmark is to compare different solutions for finding all intersections amongst a set of boxes.  An overview of this problem and this procedure can be found in the following blog posts:

* Collision detection (part 1)
* Collision detection (part 2)
* Collision detection (part 3)

### Libraries surveyed

| Library | Algorithms implemented | Dimensions | Bipartite |
|:-------:|:----------------------:|:----------:|:---------:|
| Brute force | Brute force | Any | ✓ |
| box-intersect | Streaming segment trees | Any | ✓ |
| rbush | BVH | 2 | ✓ |
| rtree | BVH | 2 | ✓ |
| lazykdtree | BVH | Any | ✓ |
| jsts | BVH, hierarchical grid | 2 | ✓ |
| simple-quadtree | Hierarchical grid | 2 | ✓ |
| p2 | Brute force, sweep and prune, grid | 2 | |
| box2d | Sweep and prune | 2 | |
| oimo | Brute force, BVH, sweep and prune | 3 | |

### Data sets

* Uniform distribution
* Spheres
* Skewed / high aspect ratio boxes
* Stanford bunny
* ... more data needed

# Results

## 2D

### Uniform/complete

#### Tiny (500 boxes)

#### Small (1500 boxes)

#### Medium (10000 boxes)

#### Large (1000000 boxes)

### Uniform/bipartite

#### Small (1500 boxes)

#### Large (100000 boxes)

#### Small vs Large

### Circle

#### Small

#### Large

### Skewed

#### Small

#### Medium

### Real data


## 3D



# Running the benchmark

## In node.js/iojs

## In a browser

# Contributing
