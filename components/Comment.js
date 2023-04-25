import styles from './Modal.module.scss'
import { Azeret_Mono } from 'next/font/google'
import { Button } from './PhotoGallery'

const azeretMono = Azeret_Mono({
  weight: ['400'],
  subsets: ['latin']
})

export default function Comment({ setModal }) {
  return (
    <>
      <style jsx global>{`
        body,
        html {
          overflow: hidden;
        }
      `}</style>
      <div
        className={`${styles.wrapper} ${azeretMono.className}`}
        onClick={() => setModal(false)}>
        <div onClick={event => event.stopPropagation()}>
          <svg
            style={{ display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320">
            <path
              fill="white"
              fill-opacity="1"
              d="M0,320L36.9,288L73.8,64L110.8,224L147.7,128L184.6,0L221.5,320L258.5,64L295.4,64L332.3,288L369.2,256L406.2,288L443.1,192L480,32L516.9,64L553.8,288L590.8,0L627.7,32L664.6,288L701.5,64L738.5,192L775.4,128L812.3,320L849.2,160L886.2,256L923.1,64L960,96L996.9,128L1033.8,96L1070.8,192L1107.7,128L1144.6,32L1181.5,192L1218.5,256L1255.4,128L1292.3,96L1329.2,128L1366.2,192L1403.1,64L1440,224L1440,320L1403.1,320L1366.2,320L1329.2,320L1292.3,320L1255.4,320L1218.5,320L1181.5,320L1144.6,320L1107.7,320L1070.8,320L1033.8,320L996.9,320L960,320L923.1,320L886.2,320L849.2,320L812.3,320L775.4,320L738.5,320L701.5,320L664.6,320L627.7,320L590.8,320L553.8,320L516.9,320L480,320L443.1,320L406.2,320L369.2,320L332.3,320L295.4,320L258.5,320L221.5,320L184.6,320L147.7,320L110.8,320L73.8,320L36.9,320L0,320Z"></path>
          </svg>
          <div className={styles.form}>
            <div className={styles.center}>
              <div className="prose" style={{ fontSize: '1.1rem' }}>
                <p>;) Leave a comment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
