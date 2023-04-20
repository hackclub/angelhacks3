import { VT323 } from 'next/font/google'
import styles from './Dialog.module.scss'
import { useEffect, useState } from 'react'

const vt232 = VT323({
  weight: ['400'],
  subsets: ['latin']
})

export default function Dialog() {
  const [choice, setChoice] = useState(0)
  const [dialog, setDialog] = useState([
    {
      message: 'What a nice day!',
      options: [
        {
          text: 'Continue',
          click: () => {}
        },
        {
          text: "... I don't want to play this game.",
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
  ])

  const respond = async event => {
    if (event.key === 'Enter') {
      let loc = Array.from(dialog)
      loc.shift().options[choice].click()
      setDialog(loc)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', respond)
  }, [])

  return (
    <>
      {dialog.length > 0 && (
        <div className={`${vt232.className} ${styles.dialog}`}>
          <p>{dialog[0].message}</p>
          <div className={styles.choices}>
            {dialog[0].options.map((option, idx) => (
              <button key={idx}>
                {choice === idx && <span>&gt;</span>} {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
