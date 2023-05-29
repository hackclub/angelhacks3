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

export default function Index({
  map,
  about,
  faq,
  signUp,
  team,
  prizes,
  schedule
}) {
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
                <h6>May 27 - 28 @ Boston Industrious Seaport</h6>
              </div>
              <div className="choices">
                <a
                  className={nunito.className}
                  href="#game">
                  &#9654; Play
                </a>
                {/* <a onClick={() => setModal(true)} className={nunito.className}> */}
                <a
                  href="https://airtable.com/shrK2lcYQVjHLKNf4"
                  className={nunito.className}>
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
            The address of the event is <strong>22 Boston Wharf Rd.</strong> in the Seaport area—just walk in and there'll be someone to buzz you up! If you're late, feel free to pop us an email or text us (we'll be sending out a few follow-up emails with waivers and detailed contract info). If you're not in the Boston area, look up to find the links to our 3
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
      <section className="hidden">
        <pre className="heading">{prizes}</pre>
        <div className="prizes flex">
          <div className="prizetext">
            <p>
              We'll add details about the judging soon, but it'll be a wonderful
              opportunity for you to play the games your fellow jammers have
              made as well as talk about some of the fun things you built!
              Examples of categories we'll be looking at are:
            </p>
            <ul>
              <li>
                <strong>“Most likely to leave players in financial ruin”</strong> - Nintendo Switch Lite
              </li>
              <li>
                <strong>Poignantly Pointful</strong> - swords. sharp? maybe. you signed a waiver.
              </li>
              <li>
                <strong>Nostalgically Nap-preventing</strong> - Retro Game Consoles
              </li>
              <li>
                <strong>Uniquely Useless</strong> (believe me, this is NOT an
                insult. Winner gets a year's worth of Ramen!)
              </li>
              <li>
                <strong>Uniquely Useless</strong> - A Year’s Worth of Ramen 
              </li>
              <li>
                <strong>Masterful Mechanics</strong> - Macropads
              </li>
              <li>
                <strong>Ostentatiously Offline</strong> - Board Games :) 
              </li>
            </ul>
            <p>Stay tuned for more & look at our 1.0 recap!</p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/rv_UycMxEsQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>{' '}
        </div>
      </section>
      <section className="hidden">
        <pre className="heading">{schedule}</pre>
        <div className="prose">
          <p>
            We'll be updating this schedule as we get closer to the event, but
            here's a rough idea of what to expect from Saturday, May 27 to
            Sunday, May 28:
          </p>
          <ul style={{ listStyle: 'none', fontSize: '1.2rem' }}>
            <li>
              {' '}
              👋 <strong>9:00 AM</strong> - Doors open, registration, and meet
              fun people
            </li>
            <li>
              {' '}
              👐 <strong>10:00 AM</strong> - Opening ceremony
            </li>
            <li>
              {' '}
              🤖 <strong>11:00 AM</strong> - Hacking starts & Intro to Blender w/ Gabe
            </li>
            <li>
              {' '}
              🌸 <strong>12:00 PM</strong> - Construct w/ Neel
            </li>
            <li> 
              {' '}
              🔨 <strong>1:00 PM</strong> - Lunch + Be Better than the Other Satellites!  
            </li>
            <li> 
              {' '}
              🔨 <strong>2:00 PM</strong> - Sprig Games Workshop w/ Thomas</li>
              <li> 
              {' '}
              🍲 <strong>3:00 PM</strong> - Working with Games as Narratives w/ Damian</li>
              <li> 
              {' '}
              🔨 <strong>4:00 PM</strong> - Generative AI for Games Workshop w/ Kevin</li>
            <li> 
              {' '}
              🔨 <strong>5:00 PM</strong> - 3D Shaders and Graphics w/ Kai & Animation and Game Art w/ Darla</li>
            <li>
              {' '}
              📺 <strong>7:00 PM</strong> - 12-hour track & Toronto project showcases 
            </li>
            <li>
              {' '}
              👐 <strong>9:00 PM</strong> - 12-hour track people leave :( 
            </li>
            <li>
              {' '}
              😪 <strong>12:00 AM</strong> - Midnight event!? Game night!?? Top secret.
            </li>
            <li>
              {' '}
              ☕ <strong>3:30 AM</strong> - Still awake? Make your won cursed caffeinated concoctions.
            </li>
            <li>
              {' '}
              🥐 <strong>8:00 AM</strong> - Breakfast time!
            </li>
            <li>
              {' '}
              🛑 <strong>9:00 AM</strong> - Hands up! Off the keyboard! Time to showcase your work and play games.
            </li>
            <li>
              {' '}
              💔 <strong>12:00 PM</strong> - Goodbye :){' '}
            </li>
          </ul>
        </div>
      </section>
      <section className="hidden">
        <pre className="heading">{team}</pre>
        <div className="prose">
          <p>
            Meet our very, very cool team of slightly suspicious dinosaurs from
            across the continent & their favorite games!
          </p>
          <div className="team">
            <div className="member">
              <h3>Claire Wang</h3>
              <p>Polytopia</p>
            </div>
            <div className="member">
              <h3>Damian Wilson</h3>
              <p>Portal 2 & OFF</p>
            </div>
            <div className="member">
              <h3>Kai Wilson</h3>
              <p>Hollow Knight & Hyperbolica</p>
            </div>
            <div className="member">
              <h3>Neel Redkar</h3>
              <p>Celeste & Undertale</p>
            </div>
            <div className="member">
              <h3>Kevin Yang</h3>
              <p>Rawr</p>
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
              <p>Rawr (Logistics)</p>
            </div>
            <div className="member">
              <h3>Jaden Hou</h3>
              <p>Minecraft</p>
            </div>
            <div className="member">
              <h3>Charalampos Fanoulis</h3>
              <p>Satisfactory</p>
            </div>
            <div className="member">
              <h3>Zoya Hussain</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Sarah Wang</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Arpan Pandey</h3>
              <p>Rawr</p>
            </div>
            <div className="member">
              <h3>Brianna Magtoto</h3>
              <p>Stardew Valley</p>
            </div>
            <div className="member">
              <h3>Ryan Chou</h3>
              <p>Tetris (Bay Area)</p>
            </div>
            <div className="member">
              <h3>Maggie Liu</h3>
              <p>Monument Valley (Bay Area)</p>
            </div>
            <div className="member">
              <h3>Arav Narula</h3>
              <p>Rawr (Toronto)</p>
            </div>
            <div className="member">
              <h3>Rishi Kothari</h3>
              <p>Skyrim (Toronto)</p>
            </div>
            <div className="member">
              <h3>Sam Liu</h3>
              <p>Rawr (Toronto)</p>
            </div>
            <div className="member">
              <h3>Ruien Luo</h3>
              <p>Rawr (LA)</p>
            </div>
            <div className="member">
              <h3>Andrea Yang</h3>
              <p>Rawr (LA)</p>
            </div>
            <div className="member">
              <h3>Kara Massie</h3>
              <p>Unstable Unicorns</p>
            </div>
            <div className="member">
              <h3>Javier Zaleta Martínez</h3>
              <p>Subnautica & Monument Valley</p>
            </div>
          </div>
        </div>
      </section>
      <div id="background">
        <section>
          <pre className="heading">{faq}</pre>
          <a id="game">
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
      about: figlet.textSync("What's this?", {
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
