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
      <img src={src} />
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
          src="https://d33wubrfki0l68.cloudfront.net/bac26de2e4eb9cc341bc38e796066de23905613b/9ae5e/venue/venue3.jpg"
          text="What are the organizers takling about?"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/a5e0d804650a99a06ac2be416cc11448398c74a0/efb21/venue/venue4.jpg"
          text="Same photo, but a different angle?"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/dbb2f6bad9e0dda9c0fc8d927b6558010f471ae8/fde5a/venue/venue5.jpg"
          text="People are hard at work."
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/aa465358942daf9eaf6c254b550ee4a86623e803/12d49/venue/venue6.jpg"
          text="Wohoo!"
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
          src="https://horizon.hackclub.com/images/slh.jpg"
          text="Okay second to last"
        />
        <Image
          src="https://horizon.hackclub.com/images/0.jpg"
          text="Wow! Finally done"
        />
        <Button fontSize="2rem">24 hours. Pure joy.</Button>
      </div>
    </div>
  )
}
