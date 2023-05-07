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

export default function Index({ map, about, faq, signUp, team, prizes, schedule }) {
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
      <section className='hidden'>
        <pre className="heading">{prizes}</pre>
        <div className="prizes flex">
          <p>
            We'll add details about the judging soon, but it'll be a wonderful opportunity for you to play the games your fellow jammers have made as well as talk about some of the fun things you built! Examples of categories we'll be looking at are:
            <ul>
              <li><strong>Nourishingly Novel Narrative</strong></li>
              <li><strong>Masterful Mechanics</strong> (Best Game Mechanics)</li>
              <li><strong>Exceptional Eye Candy</strong> (Best Visuals)</li>
              <li><strong>Uniquely Useless</strong> (believe me, this is NOT an insult. Winner gets a year's worth of Ramen!)</li>
              <li><strong>Poignantly Pointed</strong> (not quite sure what this means, but we do know the winner gets... swords?)</li>
              <li><strong>Dreadfully Democratic</strong></li>
            </ul>
            Stay tuned for more & look at our 1.0 recap!
          </p>
          <iframe className='iframe' width="560" height="315" src="https://www.youtube.com/watch?v=rv_UycMxEsQ" title="YouTube video player" frameBorder="0" caption="Look at our 1.0 recapt!" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </section>
      <section className='hidden'>
        <pre className="heading">{schedule}</pre>
        <div className="prose">
          <p>
            We'll be updating this schedule as we get closer to the event, but
            here's a rough idea of what to expect from Saturday, May 27 to Sunday, May 28:
          </p>
          <ul style={{listStyle: "none", fontSize: '1.2rem'}}>
            <li>
            👋 <strong>9:00 AM</strong> - Doors open, registration, and meet fun people
            </li>
            <li> 👐 <strong>10:00 AM</strong> - Opening ceremony</li>
            <li> 🤖 <strong>11:00 AM</strong> - Hacking starts</li>
            <li> 🌸 <strong>11:30 AM</strong> - Beginner Workshop (TBD)</li>
            <li> 👐 <strong>...</strong> - We'll add some more things here!</li>
            <li> 🛑 <strong>9:00 AM</strong> - Hands up! Off the keyboard! Judging time.</li>
            <li> 💔 <strong>12:00 PM</strong> - Goodbye :) </li>
            </ul>
            </div>
      </section>
      <section className='hidden'>
        <pre className="heading">{team}</pre>
        <div className="prose">
          <p>Meet our very, very cool team of slightly suspicious dinosaurs from across the continent & their favorite games!</p>
          <div className="team">
            <div className="member">
              <h3>Claire Wang</h3>
              <p>Polytopia & SineRider</p>
            </div>
            <div className="member">
              <h3>Neel Redkar</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Damian</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Kevin Yang</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Kai</h3>
              <p>Hollow Knight & Hyperbolica</p>
            </div>
            <div className="member">
              <h3>Quillan George</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Elysse Gonzalez</h3>
              <p>Night in the Woods</p>
            </div>
            <div className="member">
              <h3>Amanda Chen</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Hugo Hu</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Zoya Hussain</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Leah Vashevko</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Arpan Pandey</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Ryan Chou</h3>
              <p>Tetris</p>
            </div>
            <div className="member">
              <h3>Maggie Liu</h3>
              <p>Monument Valley</p>
            </div>
            <div className="member">
              <h3>Arav Narula</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Rishi Kothari</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Sam Liu</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Ruien Luo</h3>
              <p>Rawr</p>
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
      }),
      schedule: figlet.textSync('Schedule!', {
        font: 'Epic'
      })
    }
  }
}
