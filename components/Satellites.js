import styles from './Satellites.module.scss'

export default function Satellites() {
  return (
    <div className={styles.wrapper}>
      Can't make it to Boston? Try <a href="#">Los Angeles</a> /{' '}
      <a href="#">Bay Area</a> / <a href="#">Toronto</a>
    </div>
  )
}
