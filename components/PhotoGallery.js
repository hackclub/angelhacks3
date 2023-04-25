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
          text="Some placeholder text"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/bac26de2e4eb9cc341bc38e796066de23905613b/9ae5e/venue/venue3.jpg"
          text="More placeholders hehe"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/a5e0d804650a99a06ac2be416cc11448398c74a0/efb21/venue/venue4.jpg"
          text="Going to fall asleep"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/dbb2f6bad9e0dda9c0fc8d927b6558010f471ae8/fde5a/venue/venue5.jpg"
          text="Bad to include"
        />
        <Image
          src="https://d33wubrfki0l68.cloudfront.net/aa465358942daf9eaf6c254b550ee4a86623e803/12d49/venue/venue6.jpg"
          text="This in Git commit"
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
          text="Think up of more placeholder text"
        />
        <Image
          src="https://horizon.hackclub.com/images/slh.jpg"
          text="Okay second to last"
        />
        <Image
          src="https://horizon.hackclub.com/images/0.jpg"
          text="Wow! Finally done"
        />
        <Button fontSize="2rem">42 hours. Pure chaos.</Button>
      </div>
    </div>
  )
}
