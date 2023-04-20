import { VT323 } from 'next/font/google'
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

export default function Index({ map }) {
  const router = useRouter()
  const [choice, setChoice] = useState(0)
  const [dialog, setDialog] = useState([
    /*
    {
      message: 'What a nice day!',
      options: [
        {
          text: 'So true!',
          click: () => setDialog(dialog.slice(1))
        },
        {
          text: "... I don't want to play this game.",
          click: () => router.push('/landing')
        }
      ]
    },
    {
      message: "Wait! There's a hackathon happening...",
      options: [
        {
          text: 'Take me there!',
          click: () => {
            alert('?')
            setDialog(dialog.slice(1))
          }
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
    */
  ])

  useEffect(() => {
    window.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') setChoice(choice + 1)
      else if (event.key === 'ArrowUp') setChoice(choice - 1)
    })
  }, [])

  return (
    <div>
      <Rpg map={map} tileset={tileset} canMove={dialog.length === 0} />
      {dialog.length > 0 && (
        <div className="dialog">
          <p>{dialog[0].message}</p>
          <div className="choices">
            {dialog[0].options.map((option, idx) => {
              return (
                <button key={option.message} tabIndex={idx}>
                  {idx === choice && <span>&gt;</span>} {option.text}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

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
