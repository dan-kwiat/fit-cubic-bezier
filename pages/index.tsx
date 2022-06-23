import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/outline"

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
          <stop offset="95%" stop-color="blue" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url('#myGradient')" />
      <circle cx="50" cy="10" r="1" fill="black" />
    </svg>
  )
}

const FrameOfReference = ({
  zoom150,
  zoom200,
}: {
  zoom150?: boolean
  zoom200?: boolean
}) => {
  const [restart, setRestart] = useState(false)

  function roll() {
    setRestart(true)
  }

  useEffect(() => {
    if (restart) {
      setRestart(false)
    }
  }, [restart])

  let ballPos = "translate-x-0"
  if (!restart) {
    ballPos =
      "transition-transform translate-x-full rotate-[114deg] duration-[1500ms] ease-linear"
  }

  let zoomPos = "scale-100 rotate-0s"
  if (!restart) {
    if (zoom150) {
      zoomPos =
        "transition-transform duration-[1500ms] ease-in origin-bottom-right scale-[1.4]"
    }
    if (zoom200) {
      zoomPos =
        "transition-transform duration-[1500ms] ease-in origin-bottom-right scale-[2]"
    }
  }

  return (
    <button
      className="block w-full max-w-xl mx-auto shadow-lg hover:shadow-xl border-b-4 border-purple-900 bg-purple-50 rounded-lg overflow-hidden"
      onClick={() => roll()}
    >
      <div className="relative aspect-video mr-12">
        <div className={`absolute inset-x-0 bottom-0 h-full ${zoomPos}`}>
          <div
            className={`absolute bottom-0 left-0 w-1/3 text-purple-500 ${ballPos}`}
          >
            <BallRolling />
          </div>
          <div className="absolute inset-y-0 right-0 w-12 border-l-2 border-purple-900 translate-x-full brick-wall"></div>
        </div>
        <div
          className={`absolute inset-y-0 mt-6 right-0 w-1/3 flex items-start space-x-2 justify-between px-1 border-l border-purple-300 text-purple-500 ${
            restart
              ? "opacity-0"
              : "opacity-100 duration-300 delay-[1500ms] transition-opacity ease-in"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>1 meter</span>
          <ArrowRightIcon className="h-5 w-5" />
        </div>
        <div className="absolute top-0 left-0 bg-purple-100 rounded-br-3xl">
          <PlayIcon className="w-24 h-24 text-purple-500" />
        </div>
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
      "transition-transform rotate-0 duration-[1500ms] ease-linear scale-[4] origin-right"
  }

  let wallZoom = "scale-[2]"

  if (!restart) {
    wallZoom =
      "transition-transform duration-[1500ms] ease-linear origin-right scale-[4]"
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
          <BallRolling />
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
            Before the ball reaches the wall, let's look again and zoom in a bit
            as we look
          </p>
          <FrameOfReference zoom150 />
          <p>Again, zooming in a bit more:</p>
          <FrameOfReference zoom200 />
          <p>Now, just zooming in on the gap between the ball and the wall:</p>
          <FrameOfReferenceStationaryBall />
        </div>
      </main>

      <footer className={styles.footer}>Powered by Deno</footer>
    </div>
  )
}

export default Home
