import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

import { PlayIcon } from "@heroicons/react/outline"

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

const FrameOfReference = ({ zoom }: { zoom?: boolean }) => {
  const [restart, setRestart] = useState(false)

  function roll() {
    setRestart(true)
  }

  useEffect(() => {
    if (restart) {
      setRestart(false)
    }
  }, [restart])

  let ballPos =
    "transition-transform translate-x-full rotate-[114deg] duration-[1500ms] ease-linear"
  if (restart) {
    ballPos = "translate-x-0"
  }

  let zoomPos = "scale-100"

  if (zoom && !restart) {
    zoomPos =
      "transition-transform duration-[1500ms] ease-in origin-bottom-right scale-[1.5]"
  }

  return (
    <button
      className="block w-full max-w-xl mx-auto bg-purple-50 rounded-lg"
      onClick={() => roll()}
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className={`border-b-4 border-r-4 border-purple-900 absolute inset-x-0 bottom-0 h-3/4 ${zoomPos}`}
        >
          <div
            className={`absolute bottom-0 left-0 w-1/3 text-purple-500 ${ballPos}`}
          >
            <BallRolling />
          </div>
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
          Or why infinitiy doesn't exist in the real world
        </p>

        <h2>Let's get the ball rolling...</h2>
        <FrameOfReference />
        <FrameOfReference zoom />
      </main>

      <footer className={styles.footer}>Powered by Deno</footer>
    </div>
  )
}

export default Home
