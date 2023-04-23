import { VT323 } from 'next/font/google'
import Meta from '../components/meta'
import Button from '@/components/Button'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import path from 'path'
import fs from 'fs'
import tileset from '@/public/main.png'

const vt232 = VT323({
  weight: ['400'],
  subsets: ['latin']
})

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index() {
  return (
    <div>
      <Meta />
      <div
        class="container"
        style={{
          backgroundColor: 'black',
          color: '#e0e6ed',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        id="hero">
        <div style={{ margin: 'auto', width: '90vw', maxWidth: '55rem' }}>
          <img
            src="https://assets.hackclub.com/flag-orpheus-left.svg"
            style={{ position: 'absolute', top: '0', left: '0' }}
          />
          <style jsx>
            {`
              @media screen and (max-width: 400px) {
                #header {
                  font-size: 2rem !important;
                }
              }
            `}
          </style>
          <h1 id="header" style={{ fontWeight: '900', fontSize: '4rem' }}>
            <span style={{ color: '#009AAB' }}>Angel</span>&#8203;
            <span style={{ color: '#ffb400' }}>Hacks</span> 3.0 x{' '}
            <span style={{ color: '#ec3750' }}>Hack Club</span>
          </h1>
          <p style={{ fontSize: '1.5rem' }}>
            👾 A game jam for the makers, gamers, coders, artists, musicians,
            and storytellers of the world. Join us in 📍 Boston, ⏳ late-May, as
            the official 🌸 Hack Club Spring Event, with more details to come!
          </p>
          <br />
          {/* <Button url="https://airtable.com/shrK2lcYQVjHLKNf4" label="Register" /> */}
          <div class="buttons">
            <a class="button" href="https://airtable.com/shrK2lcYQVjHLKNf4">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
            </a>
          </div>
        </div>
      </div>
      <div
        class="container"
        style={{
          backgroundColor: '#1b1a1f',
          margin: '0px',
          color: 'white',
          padding: '4rem'
        }}>
        <h2 style={{ fontSize: '3rem' }} class="gamefont">
          Love games?
        </h2>
        <p style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>
          AngelHacks is a game jam, which means you’re{' '}
          <span style={{ fontWeight: '800' }}>only</span> allowed to make games
          - video games, board games, puzzle hunts, VR games, ARGs… all are game
          (hehe get it?). <br />
          <br />
          This means 🧑‍🎨 artists, 🎨 designers, 🎹 musicians, 📚 storytellers, 👩‍💻
          coders, 🎲 gamers… all are welcome. We also have three satellite
          events across the globe (🌴 Los Angeles, 🌉 San Francisco, and 🇨🇦
          Toronto)!! For those who have heard of AngelHacks or been to it in the
          past, we promise to keep the vibes of angelhacks 1.0 & 2.0 combine
          with the magic and community of hack club. <br />
          <br />
        </p>
        <p
          style={{
            color: '#ffdc89',
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}>
          Check out our{' '}
          <a href="https://www.youtube.com/watch?v=rv_UycMxEsQ">1.0 recap</a>{' '}
          and our{' '}
          <a href="https://www.youtube.com/@angelhacks5695">
            2.0 youtube channel
          </a>
          ! In addition, find our previous websites for our{' '}
          <a href="https://2019.angelhacks.org">2019</a> and{' '}
          <a href="https://2021.angelhacks.org">2021</a> events.
        </p>
      </div>
      {/* <div class="container">
        <img src="placeholder.png" width="100%" height='auto'/>
        <img src="stickexchange.jpg" width="100%" height= 'auto' />
      </div> */}
      {/* <div style={{backgroundColor: "#ffdc89", margin: '0px', padding: '3rem'}}>
        <div class="gallery">
          <div class="row">
            <div class="box">
              <img src="placeholder.png" alt="Image 1" />
            </div>
            <div class="box" style={{padding: '1rem', backgroundColor: '#ff5a5f'}}>
              <h1>Love games?</h1>
              <p>This will be entirely a game jam, which means you’re ONLY allowed to make games - video games, board games, puzzle hunts, vr games, ARGs… all are game (hehe get it?). This means you do not have to be a programmer— artists, designers, musicians, storytellers, gamers… all are welcome.</p>
            </div>
            <div class="box">
              <img src="placeholder.png" alt="Image 3" />
            </div>
          </div>
          <div class="row">
            <div class="box row2">
              <img src="https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png" alt="Image 4" />
            </div>
            <div class="box row2">
              <img src="https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png" alt="Image 5" />
            </div>
            <div class="box row2">
              <img src="https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png" alt="Image 6" />
            </div>
            <div class="box row2">
              <img src="https://returntofreedom.org/store/wp-content/uploads/default-placeholder.png" alt="Image 7" />
            </div>
          </div>
          <div class="row">
            <div class="box">
              <img src="image8.jpg" alt="Image 8" />
            </div>
            <div class="box text-box">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="box">
              <img src="image9.jpg" alt="Image 9" />
            </div>
          </div>
        </div>

      </div> */}
    </div>
  )
}

// export default function Index({ map }) {
//   const router = useRouter()
//   const [choice, setChoice] = useState(0)
//   const [dialog, setDialog] = useState([
//     /*
//     {
//       message: 'What a nice day!',
//       options: [
//         {
//           text: 'So true!',
//           click: () => setDialog(dialog.slice(1))
//         },
//         {
//           text: "... I don't want to play this game.",
//           click: () => router.push('/landing')
//         }
//       ]
//     },
//     {
//       message: "Wait! There's a hackathon happening...",
//       options: [
//         {
//           text: 'Take me there!',
//           click: () => {
//             alert('?')
//             setDialog(dialog.slice(1))
//           }
//         }
//       ]
//     },
//     {
//       message: (
//         <>
//           Hm, I'm pretty sure it's somewhere around here.{' '}
//           <i>Hint: Use WASD to move.</i>
//         </>
//       ),
//       options: [
//         {
//           text: "Alright, let's go!",
//           click: () => {}
//         }
//       ]
//     }
//     */
//   ])

//   useEffect(() => {
//     window.addEventListener('keydown', function (event) {
//       if (event.key === 'ArrowDown') setChoice(choice + 1)
//       else if (event.key === 'ArrowUp') setChoice(choice - 1)
//     })
//   }, [])

//   return (
//     <div>
//       <Rpg map={map} tileset={tileset} canMove={dialog.length === 0} />
//       {dialog.length > 0 && (
//         <div className="dialog">
//           <p>{dialog[0].message}</p>
//           <div className="choices">
//             {dialog[0].options.map((option, idx) => {
//               return (
//                 <button key={option.message} tabIndex={idx}>
//                   {idx === choice && <span>&gt;</span>} {option.text}
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

export async function getServerSideProps() {
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
      )
    }
  }
}
