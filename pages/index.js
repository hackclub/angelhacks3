import figlet from 'figlet'
import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import path from 'path'
import fs from 'fs'
import tileset from '@/public/main.png'
import PhotoGallery from '@/components/PhotoGallery'
import Zork from '@/components/Zork'
import Satellites from '@/components/Satellites'
import Register from '@/components/Register'
import Image from 'next/image'
import hc from '@/public/flag.svg'
import console from '@/public/console.png'
import gameboy from '@/public/gameboy.png'

const nunito = Nunito({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

const pokemon = localFont({ src: '../public/fonts/Pokemon.ttf' })

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index({ map, about, faq, signUp }) {
  let keys = {}
  const [modal, setModal] = useState(false)
  const [start, setStart] = useState(false)

  return (
    <div className={nunito.className}>
      {modal === true && <Register setModal={setModal} />}
      <a id="hackclub" href="https://hackclub.com" target="_blank">
        <Image src={hc} alt="Hack Club flag" width={150} />
      </a>
      <div id="rpg">
        <Rpg map={map} tileset={tileset} play={start} keys={keys} />
        {start === false && (
          <div className="start">
            <div className={`dialog special`}>
              <div className={pokemon.className}>
                <h3>Presenting...</h3>
                <h1>
                  AngelHacks <sup>3.0</sup>
                </h1>
                <h6>May 27 - 28, 2023 @ Boston</h6>
              </div>
              <div className="choices">
                <button
                  onClick={() => {
                    alert(
                      "Something's in the works... be sure to check back later!"
                    )
                  }}
                  style={{ fontSize: '1rem !important' }}>
                  &#9654; Play
                </button>
                <a onClick={() => setModal(true)} className={nunito.className}>
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      {modal === false && <Satellites />}
      <section id="first">
        <pre className="heading">{about}</pre>
        <Image src={console} id="console" width={400} />
        <Image src={gameboy} id="gameboy" width={400} />
        <div className="prose">
          <p>
            AngelHacks 3.0 is going to be a <strong>👾 game jam 👾</strong> of cosmic proportions. Ok, maybe not cosmic, but the game you make can be! We're looking for the <span style={{fontWeight: 800, color: '#009aab'}}>coders</span>, <span style={{fontWeight: 800, color: '#ffb400'}}>artists</span>, <span style={{fontWeight: 800, color: '#13cfbf'}}>musicians</span>, <span style={{fontWeight: 800, color: '#ff5a5f'}}>storytellers</span>, and <span style={{fontWeight: 800, color: '#5cdb95'}}>gamers</span> out there to come together and invent new methods of procrastination and fun! It'll be in-person, overnight (though you have the choice to just stay for 12 hours), and <em>totally</em> fun. We'll have workshops, free food, and prizes for the coolest of games. So, what are you waiting for? <a onClick={() => setModal(true)}>Sign up now!</a> If you're not in the Boston area, look up to find the links to our 3 satellite events: Bay Area, Los Angeles, and Toronto.
          </p>
          <p>
            Hack Club is a worldwide community of high school hackers. We’re
            artists, writers, engineers, tinkerers, campers, filmmakers,
            volunteers. We make things. We help one another. We have fun.
          </p>
          <p>
            Last but not least, AngelHacks is fully open source, and funded and run by the Hack Club
            community, and you can find all discussions public on the Hack Club Slack and
            fully transparent finances on Hack Club Bank. Everything
            from this website to the wacky stickers you'll get to hoard was created by teenagers
            just like yourself, and you're welcome to help out in the #angelhacks channel on the Hack Club
            the <a href="https://hackclub.com/slack/?event=AngelHacks&continent=North%20America">Slack</a>!
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
              <button className="link" onClick={() => setModal(true)}>
                There's no game, what is this lunatic talking about? Just let me
                sign up.
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
        font: 'Epic'
      }),
      faq: figlet.textSync('I have questions!', {
        font: 'Epic'
      }),
      signUp: figlet.textSync('Sign me up!', {
        font: 'Epic'
      })
    }
  }
}
