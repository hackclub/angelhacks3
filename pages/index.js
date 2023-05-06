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

export default function Index({ map, about, faq, signUp, team, prizes }) {
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
                  <span>
                    AngelHacks <sup>3.0</sup>
                  </span>
                </h1>
                <h6>May 27 - 28 @ Boston Seaport</h6>
              </div>
              <div className="choices">
                <button
                  className={nunito.className}
                  onClick={() => {
                    alert(
                      "Something's in the works... be sure to check back later!"
                    )
                  }}>
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
            AngelHacks 3.0 is going to be a <strong>👾 game jam 👾</strong> of
            cosmic proportions. Ok, maybe not cosmic, but the game you make can
            be! We're looking for the{' '}
            <span style={{ fontWeight: 800, color: '#009aab' }}>coders</span>,{' '}
            <span style={{ fontWeight: 800, color: '#ffb400' }}>artists</span>,{' '}
            <span style={{ fontWeight: 800, color: '#13cfbf' }}>musicians</span>
            ,{' '}
            <span style={{ fontWeight: 800, color: '#ff5a5f' }}>
              storytellers
            </span>
            , and{' '}
            <span style={{ fontWeight: 800, color: '#5cdb95' }}>gamers</span>{' '}
            out there to come together and invent new methods of procrastination
            and amusement! It'll be in-person, overnight (though you have the
            choice to just stay for Saturday), and <em>totally</em> fun. We'll
            have workshops, free food, and prizes for the coolest of games. So,
            what are you waiting for?{' '}
            <a className="link" href="https://airtable.com/shrK2lcYQVjHLKNf4">
              Sign up now!
            </a>{' '}
            If you're not in the Boston area, look up to find the links to our 3
            satellite events: Bay Area, Los Angeles, and Toronto.
          </p>
          <p>
            Hack Club is a worldwide community of high school hackers. We’re
            artists, writers, engineers, tinkerers, campers, filmmakers,
            volunteers. We make things. We help one another. We have a banger of
            a good time. :)
          </p>
          <p>
            AngelHacks is also fully open source, and funded and run by the{' '}
            <a href="https://hackclub.com">Hack Club community</a>. You can find
            all discussions publicly on the Hack Club Slack and fully
            transparent finances on{' '}
            <a href="https://bank.hackclub.com/hq-game-jam-spring-event-2023">
              Hack Club Bank
            </a>
            . Everything from this website to the wacky stickers you'll get to
            hoard was created by teenagers just like yourself, and you're
            welcome to help out in the #angelhacks channel on the Hack Club the{' '}
            <a href="https://hackclub.com/slack/?event=AngelHacks&continent=North%20America">
              Slack
            </a>
            !
          </p>
        </div>
      </section>
      <section className="skip">
        <PhotoGallery />
      </section>
      <section>
        <pre className="heading">{prizes}</pre>
        <div className="prizes flex">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. sed
            vestibulum, nisl quis tincidunt ultricies, nunc nisl aliquam
            ligula, quis ultricies nisl nunc eu nisi. vivamus euismod, nisl
            vitae aliquam ultricies, nisl nisl aliquam ligula, quis ultricies
            nisl nunc eu nisi. vivamus euismod, nisl vitae aliquam ultricies,
            nisl nisl aliquam ligula, quis ultricies nisl nunc eu nisi. vivamus
          </p>
          <iframe className='iframe' width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </section>
      <section>
        <pre className="heading">{team}</pre>
        <div className="prose">
          <p>Meet our very very cool team of slightly suspicious dinosaurs!</p>
          <div className="team">
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
            <div className="member">
              <h3>Orpheus Orphoso</h3>
              <p>Lead Organizer</p>
            </div>
          </div>
        </div>
      </section>
      <div id="background">
        <section>
          <pre className="heading">{faq}</pre>
          <Zork />
        </section>
        <section>
          <pre className="heading">{signUp}</pre>
          <div className="footer">
            <p>
              Huh. Try a little harder. Maybe the game above? <i>wink wink</i>
              <button className="link" onClick={() => setModal(true)}>
                (click here to just sign up)
              </button>
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
      about: figlet.textSync('What\'s this?', {
        font: 'Epic'
      }),
      faq: figlet.textSync('Questions!', {
        font: 'Epic'
      }),
      signUp: figlet.textSync('Sign up!', {
        font: 'Epic'
      }),
      team: figlet.textSync('Team', {
        font: 'Epic'
      }),
      prizes: figlet.textSync('Prizes!', {
        font: 'Epic'
      })
    }
  }
}
