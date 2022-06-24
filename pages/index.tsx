import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/outline"

function Football() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="500"
      // height="500"
      viewBox="-2390 -2390 4780 4780"
      // className="-m-0.5"
    >
      <title>Football</title>
      <g stroke="#000" stroke-width="24">
        <circle fill="#fff" r="2376" />
        <path
          fill="none"
          d="m-1643-1716 155 158m-550 2364c231 231 538 195 826 202m-524-2040c-491 351-610 1064-592 1060m1216-1008c-51 373 84 783 364 1220m-107-2289c157-157 466-267 873-329m-528 4112c-50 132-37 315-8 510m62-3883c282 32 792 74 1196 303m-404 2644c310 173 649 247 1060 180m-340-2008c-242 334-534 645-872 936m1109-2119c-111-207-296-375-499-534m1146 1281c100 3 197 44 290 141m-438 495c158 297 181 718 204 1140"
        />
      </g>
      <path
        fill="#000"
        d="m-1624-1700c243-153 498-303 856-424 141 117 253 307 372 492-288 275-562 544-724 756-274-25-410-2-740-60 3-244 84-499 236-764zm2904-40c271 248 537 498 724 788-55 262-105 553-180 704-234-35-536-125-820-200-138-357-231-625-340-924 210-156 417-296 616-368zm-3273 3033a2376 2376 0 0 1-378-1392l59-7c54 342 124 674 311 928-36 179-2 323 51 458zm1197-1125c365 60 717 120 1060 180 106 333 120 667 156 1000-263 218-625 287-944 420-372-240-523-508-736-768 122-281 257-561 464-832zm3013 678a2376 2376 0 0 1-925 1147l-116-5c84-127 114-297 118-488 232-111 464-463 696-772 86 30 159 72 227 118zm-2287 1527a2376 2376 0 0 1-993-251c199 74 367 143 542 83 53 75 176 134 451 168z"
      />
    </svg>
  )
}

function BallRolling() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      // className="animate-spin"
    >
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stop-color="purple" />
          <stop offset="95%" stop-color="purple" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url('#myGradient')" />
      <circle cx="50" cy="10" r="1" fill="black" />
    </svg>
  )
}

// Assuming ball has 1m diameter:
function ballRotationDegrees(msElapsed: number) {
  return (0.001 * msElapsed * 360) / Math.PI
}

const FrameOfReference = ({ zoom }: { zoom?: boolean }) => {
  const [unplayed, setUnplayed] = useState(true)
  const [restart, setRestart] = useState(false)

  function roll() {
    setRestart(true)
    setUnplayed(false)
  }

  useEffect(() => {
    if (restart) {
      setRestart(false)
    }
  }, [restart])

  const start = unplayed || restart

  const ms = zoom ? 1000 : 2000
  // The ball has circumference of PI meters, so rotates (360/PI) degrees per meter travelled (aka per 1000ms)
  const startDegrees = zoom ? ballRotationDegrees(2000) : 0
  const deltaDegrees = ballRotationDegrees(ms)

  let ballPos = "translate-x-0"
  if (!start) {
    ballPos = `transition-transform ease-linear` //${distance} ${rotation} ${duration}
  }

  let zoomPos = "scale-100"
  if (!start && zoom) {
    zoomPos = `transition-transform ease-in origin-bottom-right scale-[1.8]`
  }

  return (
    <button
      className={`block w-full max-w-xl mx-auto shadow-lg hover:shadow-xl border-b-4 border-purple-900 bg-purple-50 rounded-lg overflow-hidden ${
        start ? "opacity-100" : `transition-opacity duration-200 opacity-25`
      }`}
      onClick={() => roll()}
      style={{
        transitionDelay: start ? undefined : `${ms - 0.5 * 200}ms`,
      }}
    >
      <div className="relative aspect-video mr-12">
        {/* <div
          className={`absolute bottom-0 left-0 text-6xl ${
            start ? "translate-x-0" : "translate-x-full"
          }`}
        >
          🤜
        </div> */}
        <div
          className={`absolute inset-x-0 bottom-0 h-full ${zoomPos}`}
          style={{
            transitionDuration: start ? undefined : `${ms}ms`,
          }}
        >
          <div
            className={`absolute inset-0 grid divide-x divide-purple-300 ${
              zoom ? "grid-cols-3" : "grid-cols-5"
            }`}
          >
            {[...new Array(zoom ? 2 : 4)].map((_, i) => (
              <div key={i} />
            ))}
            <div
              className={`flex items-center space-x-2 justify-between px-1 text-purple-600`}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>1m</span>
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </div>
          {/* <div
            className={`absolute inset-y-0 mt-6 right-0 ${
              zoom ? "w-2/3" : "w-4/5"
            } flex items-start space-x-2 justify-between px-1 border-l border-purple-300 text-purple-500`}
            // ${
            //   restart
            //     ? "opacity-0"
            //     : "opacity-100 duration-300 delay-[2000ms] transition-opacity ease-in"
            // }
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>{zoom ? 2 : 4} meters</span>
            <ArrowRightIcon className="h-5 w-5" />
          </div> */}
          <div
            className={`absolute bottom-0 left-0 ${
              zoom ? "w-1/3" : "w-1/5"
            } text-purple-500 ${ballPos}`}
            style={{
              transform: start
                ? `translateX(0%) rotate(${startDegrees}deg)`
                : `translateX(${0.1 * ms}%) rotate(${
                    startDegrees + deltaDegrees
                  }deg)`,
              transitionDuration: start ? undefined : `${ms}ms`,
              // transform: `translate(x,y) rotate(r) skewX(sx) skewY(sy) scaleX(scalex) scaleY(scaley)`,
            }}
          >
            <Football />
          </div>
          <div className="absolute inset-y-0 right-0 w-12 border-l-2 border-purple-900 translate-x-full brick-wall"></div>
        </div>

        {/* <div className="absolute top-0 left-0 bg-purple-100 rounded-br-3xl">
          <PlayIcon className="w-24 h-24 text-purple-500" />
        </div> */}
      </div>
    </button>
  )
}

const FrameOfReferenceStationaryBall = ({}: {}) => {
  const [restart, setRestart] = useState(false)

  function roll() {
    setRestart(true)
  }

  useEffect(() => {
    if (restart) {
      setRestart(false)
    }
  }, [restart])

  let ballZoom = "rotate-0 scale-[2]"
  if (!restart) {
    ballZoom =
      "transition-transform rotate-0 duration-[2000ms] ease-linear scale-[4] origin-right"
  }

  let wallZoom = "scale-[2]"

  if (!restart) {
    wallZoom =
      "transition-transform duration-[2000ms] ease-linear origin-right scale-[4]"
  }

  return (
    <button
      className="block w-full max-w-xl mx-auto bg-purple-50 rounded-lg"
      onClick={() => roll()}
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className={`border-b-4 border-r-4 border-purple-900 absolute inset-0 ${wallZoom}`}
        />
        <div
          className={`absolute inset-y-0 left-0 aspect-square text-purple-500 ${ballZoom}`}
        >
          <Football />
        </div>
        <div className="absolute top-0 left-0 bg-purple-100 rounded-br-3xl">
          <PlayIcon className="w-24 h-24 text-purple-500" />
        </div>
      </div>
    </button>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zeno's Paradox</title>
        <meta
          name="description"
          content="Zeno's Paradox, or why infinitiy doesn't exist in the real world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}> */}
      <main>
        <h1 className={styles.title}>Zeno's Paradox</h1>

        <p className={styles.description}>
          Or why infinitiy doesn't exist in the real world.
        </p>
        <p className={styles.description}>
          Or why spacetime isn't continuous as we like to imagine.
        </p>

        <div>
          Select your reading level
          <label htmlFor="">radio buttons</label>
          <button>layperson</button>
          <button>middle</button>
          <button>nerd</button>
        </div>

        <h2>Let's get the ball rolling. Towards a wall. YOLO.</h2>
        <div className="space-y-24">
          <FrameOfReference />
          <p>
            Yes, it's a giant football, 1 meter across. Let's zoom in while we
            watch it roll the next bit:
          </p>
          <FrameOfReference zoom />
          {/* <p>Again, zooming in a bit more:</p>
          <FrameOfReference zoom200 /> */}
          <p>Now, just zooming in on the gap between the ball and the wall:</p>
          <FrameOfReferenceStationaryBall />
        </div>
      </main>

      <footer className={styles.footer}>Powepurple by Deno</footer>
    </div>
  )
}

export default Home
