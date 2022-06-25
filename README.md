# Fit Cubic Bezier

This is a tool for finding the best-fit parameters `p0, p1, p2, p3` of a cubic
Bezier function to estimate a target function `f(x)` of your choice within a
particular range `[xMin, xMax]`.

It does not calculate the parameters analytically. Instead it overlays a
proposed Bezier function on top of your target function, and allows you to
adjust the `p1, p2` points whilst eyeballing the closeness of fit.

It can be useful in web development for CSS transitions, if for some reason you
need the transition timing function to have a particular shape.
