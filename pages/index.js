import figlet from 'figlet'
import { VT323, Nunito } from 'next/font/google'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import path from 'path'
import fs from 'fs'
import tileset from '@/public/main.png'
import PhotoGallery from '@/components/PhotoGallery'
import Zork from '@/components/Zork'
import Satellites from '@/components/Satellites'
import Register from '@/components/Register'

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin']
})

const nunito = Nunito({
  weight: ['400', '500'],
  subsets: ['latin']
})

let dialog = [
  {
    message: 'What a nice day!',
    options: [
      {
        text: 'So true!',
        click: () => {}
      }
    ]
  },
  {
    message: "Wait! There's a hackathon happening...",
    options: [
      {
        text: 'Take me there!',
        click: () => {}
      }
    ]
  },
  {
    message: (
      <>
        Hm, I'm pretty sure it's somewhere around here.{' '}
        <i>Hint: Use WASD to move.</i>
      </>
    ),
    options: [
      {
        text: "Alright, let's go!",
        click: () => {}
      }
    ]
  }
]

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index({ map, about, faq, signUp }) {
  let keys = {}
  const [modal, setModal] = useState(false)
  const [start, setStart] = useState(false)
  const [curr, setCurr] = useState(0)
  const [choice, setChoice] = useState(0)

  const handleKeyDown = event => {
    keys[event.key] = true
  }

  const handleKeyUp = event => {
    keys[event.key] = false
  }

  const next = () => {
    dialog[curr].options[choice].click()
    setCurr(prev => {
      return prev + 1 < dialog.length ? prev + 1 : null
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', event => {
      handleKeyDown(event)
      if (event.key === 'Enter') next()
    })
    window.addEventListener('keyup', event => {
      handleKeyUp(event)
    })

    return () => {
      window.removeEventListener('keydown', event => {
        handleKeyDown(event)
        if (event.key === 'Enter') next()
      })
      window.removeEventListener('keyup', event => {
        handleKeyUp(event)
      })
    }
  }, [])

  return (
    <div className={nunito.className}>
      {modal === true && <Register setModal={setModal} />}
      <a id="hackclub" href="https://hackclub.com" target="_blank">
        <img src="/flag.svg" />
      </a>
      <div id="rpg">
        <Rpg map={map} tileset={tileset} canMove={start === true} keys={keys} />
        {start === false && (
          <div className="start">
            <div className={`dialog special`}>
              <h3>Presenting...</h3>
              <h1>
                AngelHacks <sup>3.0</sup>
              </h1>
              <h6>May 26 - 29, 2023 @ Boston HQ</h6>
              <div className="choices">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0)
                    setStart(true)
                  }}
                  style={{ fontSize: '1rem !important' }}>
                  &#9654;
                </button>
                <a href="#first" className={nunito.className}>
                  What?
                </a>
              </div>
            </div>
          </div>
        )}
        {start === true && curr !== null && (
          <div className="dialog" id="dialog">
            <p>{dialog[curr].message}</p>
            <div className="choices">
              {dialog[curr].options.map((option, idx) => {
                return (
                  <button key={option.message}>
                    {idx === choice && <span>&gt;</span>} {option.text}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
      {modal === false && <Satellites />}
      <section id="first">
        <pre className="heading">{about}</pre>
        <img src="/console.png" id="console" />
        <img src="/gameboy.png" id="gameboy" />
        <div className="prose">
          <p>
            Horizon is a social coding event where teens come together for a day
            to discover the joy of code, build creative projects and share their
            projects with the world.
          </p>
          <p>
            Hack Club is a worldwide community of high school hackers. We’re
            artists, writers, engineers, tinkerers, campers, filmmakers,
            volunteers. We make things. We help one another. We have fun.
          </p>
          <p>
            Horizon is fully open source, and funded and run by the Hack Club
            community, as well as the Girl Scouts of Greater New York. Hack
            Clubbers are organizing Horizon in public on the Hack Club Slack and
            with fully transparent finances using Hack Club Bank. Everything
            from this website to Horizon's dinner menu was created by teenagers
            just like yourself, and you're welcome to help out in #horizon on
            the Slack!
          </p>
        </div>
      </section>
      <section className="skip">
        <PhotoGallery />
      </section>
      <div id="background">
        <section>
          <pre className="heading">{faq}</pre>
          <Zork />
        </section>
        <section>
          <pre className="heading">{signUp}</pre>
          <div className="prose">
            <p>
              Huh. Try a little harder. Maybe the game above? <i>wink wink</i> (
              <button class="link" onClick={() => setModal(true)}>
                Ugh, not this again. Just let me sign up.
              </button>
              )
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const readFile = location =>
    new Promise((resolve, reject) =>
      fs.readFile(location, 'utf-8', (err, data) => {
        if (err) return reject(err)
        return resolve(data)
      })
    )

  return {
    props: {
      map: JSON.parse(
        await readFile(path.join(process.cwd(), 'public/main.json'))
      ),
      about: figlet.textSync('What is this?', {
        font: 'epic'
      }),
      faq: figlet.textSync('I have questions!', {
        font: 'epic'
      }),
      signUp: figlet.textSync('Sign me up!', {
        font: 'epic'
      })
    }
  }
}
