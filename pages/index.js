import dynamic from 'next/dynamic'
import path from 'path'
import fs from 'fs'
import tileset from '@/public/main.png'
import Dialog from '@/components/Dialog'

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index({ map }) {
  return (
    <div>
      <Rpg map={map} tileset={tileset} />
      <Dialog />
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
