import Masonry from 'react-masonry-css'
import styles from './PhotoGallery.module.scss'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  weight: ['400', '800'],
  subsets: ['latin']
})

export function Button({ children, fontSize = '7rem', ...props }) {
  return (
    <button className={styles.button} {...props}>
      <span className={styles.shadow} />
      <span className={styles.edge} />
      <span
        style={{ fontSize }}
        className={`${styles.front} ${nunito.className}`}>
        {children}
      </span>
    </button>
  )
}

function Image({ src, text }) {
  return (
    <div className={styles.photo}>
      <img src={src} width="auto" />
      <p>{text}</p>
    </div>
  )
}

export default function PhotoGallery() {
  return (
    <div className={styles.photoGallery}>
      <div className={styles.photos}>
        <Button>A</Button>
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/e4beb48260a0a4ba71e13d8d618b9e568be25ef6/9ddc3/venue/award3.jpg"
          text="Look at these happy kids :)"
        />
        <Image
          src="https://cloud-reku08wxh-hack-club-bot.vercel.app/0zephyr3-kunal.jpg"
          text="Zephyrites on the Hacker Zephyr Superdome. Creds: Kunal Botla"
        />
        <Image
          src="https://cloud-kfn1ngv6x-hack-club-bot.vercel.app/0assemble1.jpg"
          text="Assemble! (the dinos). Creds: Kunal Botla"
        />
        <Image
          src="https://cloud-isl5t0wgt-hack-club-bot.vercel.app/0assemble4.jpg"
          text="Assemble: conversations. Creds: Kunal Botla"
        />
        <Image
          src="https://cloud-cxohvgurr-hack-club-bot.vercel.app/0horizon-kelly.jpg"
          text="Girl Scouts @ Horizon! Creds: Kelly Marsh"
        />
        <Button>game jam.</Button>
        <Button>Hecka fun.</Button>
        <Image
          src="https://horizon.hackclub.com/images/slh.jpg"
          text="Probably, but who knows?"
        />
        <Image
          src="https://horizon.hackclub.com/images/2.jpg"
          text="We're almost at the end"
        />
        <Image
          src="https://horizon.hackclub.com/images/5.jpg"
          text="Look at all these people who have assembled."
        />
        <Image
          src="https://cloud-l2m072onj-hack-club-bot.vercel.app/0zephyr-vercel-kunal.jpg"
          text="Vercel HQ w/ Zephyrites. Creds: Kunal Botla"
        />
        <Image
          src="https://horizon.hackclub.com/images/0.jpg"
          text="Dinos! Dinos everywhere! Orpheus?"
        />
        <Button fontSize="2rem">24 hours. Pure joy.</Button>
      </div>
    </div>
  )
}
