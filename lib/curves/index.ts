/** X, Y coordinates */
export type Point = [number, number]

const ALPHA = 0.5

function distance(a: Point, b: Point) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
  )
}

export function round(x: number, dp: number) {
  const mult = Math.pow(10, dp)
  return Math.round(x * mult) / mult
}

export function bezierCoord({
  t,
  p0,
  p1,
  p2,
  p3,
}: {
  t: number
  p0: Point
  p1: Point
  p2: Point
  p3: Point
}): Point {
  var cX = 3 * (p1[0] - p0[0]),
    bX = 3 * (p2[0] - p1[0]) - cX,
    aX = p3[0] - p0[0] - cX - bX

  var cY = 3 * (p1[1] - p0[1]),
    bY = 3 * (p2[1] - p1[1]) - cY,
    aY = p3[1] - p0[1] - cY - bY

  var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0[0]
  var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0[1]

  return [x, y]
}

/** Normalise point in {p0,p3} domain to {[0,0], [1,1]} domain */
export function normalisePoint({
  p,
  p0,
  p3,
}: {
  p: Point
  p0: Point
  p3: Point
}) {
  return [(p[0] - p0[0]) / (p3[0] - p0[0]), (p[1] - p0[1]) / (p3[1] - p0[1])]
}

export function cssCubicBezier({
  p0,
  p1,
  p2,
  p3,
}: {
  p0: Point
  p1: Point
  p2: Point
  p3: Point
}) {
  const normalP1 = normalisePoint({ p: p1, p0, p3 })
  const normalP2 = normalisePoint({ p: p2, p0, p3 })
  return `cubic-bezier(${round(normalP1[0], 2)},${round(
    normalP1[1],
    2
  )},${round(normalP2[0], 2)},${round(normalP2[1], 2)})`
}

// This function isn't used but could be useful for related projects
// It's modified from https://apoorvaj.io/cubic-bezier-through-four-points/
// Warning the naming of parameters is opposite to that web page!
// Here we use `p0` and `p3` to mean the points that will actually end up as being the curve's `p0` and `p3` points
// And `passThroughPointx` to mean additional points *outside* this range that the curve passes through
export function getBezierTangents({
  p0,
  p3,
  passThroughPoint1,
  passThroughPoint2,
}: {
  /** Start point of Cubic Bezier */
  p0: Point
  /** End point of Cubic Bezier */
  p3: Point
  /** First *outside* point you want the curve to go through */
  passThroughPoint1: Point
  /** Second *outside* point you want the curve to go through */
  passThroughPoint2: Point
}): {
  /** The first tangent point of the Cubic Bezier */
  p1: Point
  /** The second tangent point of the Cubic Bezier */
  p2: Point
  /** Start point of Cubic Bezier (same as arg given) */
  p0: Point
  /** End point of Cubic Bezier (same as arg given) */
  p3: Point
} {
  let d1 = Math.pow(distance(passThroughPoint1, p0), ALPHA)
  let d2 = Math.pow(distance(passThroughPoint2, passThroughPoint1), ALPHA)
  let d3 = Math.pow(distance(p3, passThroughPoint2), ALPHA)

  let A1 = d1 * d1
  let B1 = d2 * d2
  let C1 = 2 * d1 * d1 + 3 * d1 * d2 + d2 * d2
  let D1 = 3 * d1 * (d1 + d2)

  let A2 = d3 * d3
  let B2 = d2 * d2
  let C2 = 2 * d3 * d3 + 3 * d3 * d2 + d2 * d2
  let D2 = 3 * d3 * (d3 + d2)

  const p1: Point = [
    round((A1 * p3[0] - B1 * passThroughPoint1[0] + C1 * p0[0]) / D1, 2),
    round((A1 * p3[1] - B1 * passThroughPoint1[1] + C1 * p0[1]) / D1, 2),
  ]

  const p2: Point = [
    round((A2 * p0[0] - B2 * passThroughPoint2[0] + C2 * p3[0]) / D2, 2),
    round((A2 * p0[1] - B2 * passThroughPoint2[1] + C2 * p3[1]) / D2, 2),
  ]

  return {
    p0,
    p1,
    p2,
    p3,
  }
}
