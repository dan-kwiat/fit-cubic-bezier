import type { NextPage } from "next"
import Head from "next/head"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import {
  bezierCoord,
  cssCubicBezier,
  normalisePoint,
  Point,
  round,
} from "../lib/curves"

function defaultTangentPoints({
  xMin,
  xMax,
  bezierTarget,
}: {
  xMin: number
  xMax: number
  bezierTarget: (x: number) => number
}): { p1: Point; p2: Point } {
  const p1X = round(xMin + (xMax - xMin) * (1 / 3), 2)
  const p2X = round(xMin + (xMax - xMin) * (2 / 3), 2)
  return {
    p1: [p1X, round(bezierTarget(p1X), 2)],
    p2: [p2X, round(bezierTarget(p2X), 2)],
  }
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 border shadow rounded-lg p-4">{children}</div>
  )
}

function PanelRange({
  xMin,
  xMax,
  yMin,
  yMax,
  setXRange,
  onRefit,
}: {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  setXRange: Dispatch<SetStateAction<[number, number]>>
  onRefit: () => void
}) {
  return (
    <Panel>
      <h3 className="font-bold text-lg">Range</h3>
      <p className="text-xs">
        <code className="italic">yMin</code> &{" "}
        <code className="italic">yMax</code> are set automatically by the value
        of <code className="italic">bezierTarget</code> at{" "}
        <code className="italic">xMin</code> &{" "}
        <code className="italic">xMax</code> respectively.
      </p>
      <div className="flex items-center space-x-4">
        <div>
          <label
            htmlFor="xMin"
            className="block text-sm font-medium text-gray-700"
          >
            xMin
          </label>
          <div className="mt-1">
            <input
              step={0.1}
              type="number"
              name="xMin"
              id="xMin"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
              value={xMin.toString()}
              onChange={(e) => {
                const val = e.target.value
                setXRange((prev) => [parseFloat(val), prev[1]])
              }}
            />
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="p1y"
            className="block text-sm font-medium text-gray-700"
          >
            yMin
          </label>
          <div className="mt-1">
            <span>{round(yMin, 2)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label
            htmlFor="xMax"
            className="block text-sm font-medium text-gray-700"
          >
            xMax
          </label>
          <div className="mt-1">
            <input
              step={0.1}
              type="number"
              name="xMax"
              id="xMax"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.25"
              value={xMax.toString()}
              onChange={(e) => {
                const val = e.target.value
                setXRange((prev) => [prev[0], parseFloat(val)])
              }}
            />
          </div>
        </div>
        <div className="w-1/2">
          <label
            htmlFor="p2y"
            className="block text-sm font-medium text-gray-700"
          >
            yMax
          </label>
          <div className="mt-1">
            <span>{round(yMax, 2)}</span>
          </div>
        </div>
      </div>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onRefit()}
      >
        Refit
      </button>
    </Panel>
  )
}

function PanelTangentInputs({
  p1,
  p2,
  setp1,
  setp2,
  xRange,
  yRange,
}: {
  p1: Point
  p2: Point
  setp1: Dispatch<SetStateAction<Point>>
  setp2: Dispatch<SetStateAction<Point>>
  xRange: number
  yRange: number
}) {
  const stepX = round(0.1 * xRange, 2)
  const stepY = round(0.1 * yRange, 2)
  return (
    <Panel>
      <h3 className="font-bold">Tangent Points</h3>
      <div className="flex items-center space-x-4">
        <div>
          <label
            htmlFor="p1x"
            className="block text-sm font-medium text-blue-700"
          >
            P1x
          </label>
          <div className="mt-1">
            <input
              step={stepX}
              type="number"
              name="p1x"
              id="p1x"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.25"
              value={p1[0].toString()}
              onChange={(e) => {
                const val = e.target.value
                setp1((prev) => [parseFloat(val), prev[1]])
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="p1y"
            className="block text-sm font-medium text-blue-700"
          >
            P1y
          </label>
          <div className="mt-1">
            <input
              step={stepY}
              type="number"
              name="p1y"
              id="p1y"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.3"
              value={p1[1].toString()}
              onChange={(e) => {
                const val = e.target.value
                setp1((prev) => [prev[0], parseFloat(val)])
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label
            htmlFor="p2x"
            className="block text-sm font-medium text-green-700"
          >
            P2x
          </label>
          <div className="mt-1">
            <input
              step={stepX}
              type="number"
              name="p2x"
              id="p2x"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.25"
              value={p2[0].toString()}
              onChange={(e) => {
                const val = e.target.value
                setp2((prev) => [parseFloat(val), prev[1]])
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="p2y"
            className="block text-sm font-medium text-green-700"
          >
            P2y
          </label>
          <div className="mt-1">
            <input
              step={stepY}
              type="number"
              name="p2y"
              id="p2y"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.25"
              value={p2[1].toString()}
              onChange={(e) => {
                const val = e.target.value
                setp2((prev) => [prev[0], parseFloat(val)])
              }}
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}

function FitBezier({ res }: { res: number }) {
  const [bezierTarget, setBezierTarget] = useState<(x: number) => number>(
    () => (x: number) => x * x
  )
  const [functionString, setFunctionString] = useState("") // necessary to be in state to avoid clash in es5/es6 syntax between client/server

  const [[xMin, xMax], setXRange] = useState<[number, number]>([0, 1])

  const [counter, setCounter] = useState(0)
  const [p1, setp1] = useState<Point>(
    defaultTangentPoints({ xMin, xMax, bezierTarget }).p1
  )
  const [p2, setp2] = useState<Point>(
    defaultTangentPoints({ xMin, xMax, bezierTarget }).p2
  )

  function update() {
    setCounter((x) => x + 1)
  }

  useEffect(() => {
    const newBezierTarget =
      typeof window !== "undefined" && window.hasOwnProperty("bezierTarget")
        ? (window as any).bezierTarget
        : (x: number) => x * x
    setBezierTarget(() => newBezierTarget)
    const controls = defaultTangentPoints({
      xMin,
      xMax,
      bezierTarget: newBezierTarget,
    })
    setp1(controls.p1)
    setp2(controls.p2)
    setFunctionString(newBezierTarget.toString())
    // todo: show error if user-provided bezierTarget func has incorrect signature
  }, [counter, xMin, xMax])

  const coordsTarget = [...new Array(res)]
    .map<number>((_, i) => xMin + ((xMax - xMin) * i) / (res - 1))
    .map<Point>((x) => [x, bezierTarget(x)])

  const p0: Point = coordsTarget[0]
  const p3: Point = coordsTarget[coordsTarget.length - 1]

  const coordsBezier = [...new Array(res)].map<Point>((_, i) => {
    const t = i / (res - 1)
    return bezierCoord({ p0, p1, p2, p3, t })
  })

  const p1Normal = normalisePoint({ p: p1, p0, p3 })
  const p2Normal = normalisePoint({ p: p2, p0, p3 })
  const xRange = p3[0] - p0[0]
  const yRange = p3[1] - p0[1]

  return (
    <div className="py-24">
      <h1 className="text-4xl font-bold text-center">
        Fitting <code className="text-indigo-600">`{functionString}`</code>
      </h1>
      <div className="mt-12 flex space-x-12">
        <Panel>
          <h3 className="text-lg font-bold">Instructions</h3>
          <ul className="text-gray-500">
            <li className="list-disc list-inside">
              Open your browser console and type{" "}
              <code className="font-semibold">
                {"window.bezierTarget = x => 2*Math.pow(x, 4)"}
              </code>{" "}
              or whatever function you want to fit
            </li>
            <li className="list-disc list-inside">
              Set the X <span className="font-bold">Range</span> you{"'"}re
              interested in in the panel on the right
            </li>
            <li className="list-disc list-inside">
              Click <span className="font-bold">Refit</span>
            </li>
            <li className="list-disc list-inside">
              Adjust the <span className="font-bold">Tangent Point</span>{" "}
              coordinates below so the black Bezier curve approaches the red
              target function
            </li>
            <li className="list-disc list-inside">
              When you{"'"}re happy, copy the{" "}
              <span className="font-bold">Results</span> coordinates at the
              bottom
            </li>
          </ul>
        </Panel>
        <PanelRange
          onRefit={update}
          xMin={xMin}
          xMax={xMax}
          yMin={p0[1]}
          yMax={p3[1]}
          setXRange={setXRange}
        />
      </div>
      <div className="flex items-center justify-center space-x-12">
        <PanelTangentInputs
          p1={p1}
          p2={p2}
          setp1={setp1}
          setp2={setp2}
          xRange={xRange}
          yRange={yRange}
        />
        <div className="mt-24 aspect-square max-w-xl w-full relative bg-gray-100 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            {/* Target Function */}
            {coordsTarget.map(([x, y], i) => {
              if (i === coordsTarget.length - 1) {
                return
              }
              const point = normalisePoint({
                p: [x, y],
                p0,
                p3,
              })
              const nextPoint = normalisePoint({
                p: coordsTarget[i + 1],
                p0,
                p3,
              })
              return (
                <line
                  key={`target-${x}-${y}`}
                  x1={100 * point[0]}
                  y1={100 * (1 - point[1])}
                  x2={100 * nextPoint[0]}
                  y2={100 * (1 - nextPoint[1])}
                  stroke="red"
                  strokeWidth={0.5}
                />
              )
            })}
            {/* Cubic Bezier Curve */}
            {coordsBezier.map(([x, y], i) => {
              if (i === coordsBezier.length - 1) {
                return
              }
              const point = normalisePoint({
                p: [x, y],
                p0,
                p3,
              })
              const nextPoint = normalisePoint({
                p: coordsBezier[i + 1],
                p0,
                p3,
              })
              return (
                <line
                  key={`bezier-${x}-${y}`}
                  x1={100 * point[0]}
                  y1={100 * (1 - point[1])}
                  x2={100 * nextPoint[0]}
                  y2={100 * (1 - nextPoint[1])}
                  stroke="black"
                  strokeWidth={0.5}
                />
              )
            })}
            {/* Tangent Points */}
            <circle
              cx={100 * p1Normal[0]}
              cy={100 - 100 * p1Normal[1]}
              r="2"
              fill="blue"
            />
            <circle
              cx={100 * p2Normal[0]}
              cy={100 - 100 * p2Normal[1]}
              r="2"
              fill="green"
            />
          </svg>
          {/* Axis Limits */}
          <div className="absolute bottom-0 left-0 translate-y-full">
            {round(p0[0], 2)}
          </div>
          <div className="absolute bottom-0 right-0 translate-y-full">
            {round(p3[0], 2)}
          </div>
          <div className="absolute left-0 bottom-0 -translate-x-full">
            {round(p0[1], 2)}
          </div>
          <div className="absolute left-0 top-0 -translate-x-full">
            {round(p3[1], 2)}
          </div>
        </div>
      </div>
      <div className="mt-24 flex space-x-12">
        <Panel>
          <h3 className="font-bold text-lg">Results</h3>
          <div className="mt-4">
            <code className="text-xs">
              <div>
                P0=[{round(p0[0], 2)}, {round(p0[1], 2)}]
              </div>
              <div>
                P1=[{round(p1[0], 2)}, {round(p1[1], 2)}]
              </div>
              <div>
                P2=[{round(p2[0], 2)}, {round(p2[1], 2)}]
              </div>
              <div>
                P3=[{round(p3[0], 2)}, {round(p3[1], 2)}]
              </div>
            </code>
          </div>
          <p className="text-xs">CSS-friendly output:</p>
          <code className="text-xs">{cssCubicBezier({ p0, p1, p2, p3 })}</code>
          <p className="text-xs">
            (this is essentially the p1, p2 coords normalised to be in &#123;[0,
            0], [1, 1]&#125;)
          </p>
        </Panel>
        <Panel>
          <h3 className="font-bold text-lg">Caveats</h3>
          <ul className="text-gray-500">
            <li className="list-disc list-inside">
              <span className="font-bold">Refit</span> is not supposed to find
              the best-fit curve. It gives a starting point which you can tweak
              towards a better fit.
            </li>
            <li className="list-disc list-inside">
              Assumes <code>bezierTarget</code> is monotonically increasing
              between <code>xMin</code> and <code>xMax</code>
            </li>
            <li className="list-disc list-inside">
              There is some rounding to 2 d.p. so you max experience strange
              things if the range of your plot is very small
            </li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className="px-2 sm:px-8">
      <Head>
        <title>Fit Cubic Bezier Curve</title>
        <meta
          name="description"
          content="Finding the best fit parameters of a cubic Bezier function to estimate a target function between two points"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FitBezier res={30} />
      </main>
      <footer className="flex items-center justify-center py-8 border-t">
        Made by me
      </footer>
    </div>
  )
}

export default Home
