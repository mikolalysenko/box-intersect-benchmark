# THE GREAT JAVASCRIPT BOX INTERSECTION BENCHMARK

The goal of this benchmark is to compare different solutions for finding all intersections amongst a set of boxes.  An overview of this problem and this procedure can be found in the following blog posts:

* Collision detection (part 1)
* Collision detection (part 2)
* Collision detection (part 3)

### Libraries surveyed

| Library | Algorithms implemented | Dimensions | Bipartite |
|:-------:|:----------------------:|:----------:|:---------:|
| Brute force | Brute force | Any | ✓ |
| [box-intersect](https://github.com/mikolalysenko/box-intersect) | Streaming segment trees | Any | ✓ |
| [rbush](https://github.com/mourner/rbush) | BVH | 2 | ✓ |
| [p2.js](https://github.com/schteppe/p2.js) | Brute force, sweep and prune, grid | 2 | |
| [jsts](https://github.com/bjornharrtell/jsts) | BVH, hierarchical grid | 2 | ✓ |
| [rtree](https://github.com/leaflet-extras/RTree) | BVH | 2 | ✓ |
| [simple-quadtree](https://github.com/asaarinen/qtree) | Hierarchical grid | 2 | ✓ |
| [oimo](https://github.com/lo-th/Oimo.js/) | Brute force, BVH, sweep and prune | 3 | |
| [box2d](http://box2d.org/) | Sweep and prune | 2 | |
| lazykdtree | BVH | Any | ✓ |

### Data sets

* Uniform distribution
* Spheres
* Skewed / high aspect ratio boxes
* Stanford bunny
* TODO:  Add more real examples

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

#### Small (1500) vs Large (50000)



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

## Adding more test data

To create a new generator, you can create a module in the `generators/` folder and add a reference to it in the distributions object in the `bench.js` file.  You can also create new test cases by modifying the JSON configuration files in the `cases/` folder.

## Adding an algorithm

To add a new algorithm to the suite, there are 3 things you need to do:

1.  Create an adapter for the algorithm in the `algorithms/` folder.  At minimum, your adapter must implement two methods:  `exports.prepare` and `exports.run`.  
    a. `prepare` should translate the input boxes into whatever data format your algorithm requires (ie if you have some custom AABB type, then do these conversions here so you aren't penalized by them)
    a. `run` should execute your algorithm and return the total number of overlapping rectangles
2.  Add an entry in the `completeAlgs` or `bipartiteAlgs` sets in `bench.js`.  If your algorithm only supports one of these modes of entry (for example only complete intersections), then you don't have to add it to both tables.
3.  Add your algorithm to the relevant test cases.

You can run your test cases using the `run.js` command.