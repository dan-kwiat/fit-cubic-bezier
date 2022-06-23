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
const Home: NextPage = () => {
  const [restart, setRestart] = useState(false)

  function roll() {
    setRestart(true)
  }

  useEffect(() => {
    if (restart) {
      setRestart(false)
    }
  }, [restart])

  let pos =
    "transition-transform translate-x-full rotate-[114deg] duration-[1500ms] ease-linear" //rotate-114
  if (restart) {
    pos = "translate-x-0"
  }

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
        <div>
          <button onClick={() => roll()}>
            <PlayIcon className="w-24 h-24 text-purple-500" />
          </button>
          <div className="border-b border-r border-black w-full">
            <div className={`w-1/2 text-purple-500 ${pos}`}>
              <BallRolling />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Deno</footer>
    </div>
  )
}

export default Home
