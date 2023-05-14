import { useRef, useEffect, useState } from 'react'
import TMX from '@/utils/parser'
import { VT323, Azeret_Mono } from 'next/font/google'
import styles from './Modal.module.scss'
import { Button } from './PhotoGallery'

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin']
})

const azeretMono = Azeret_Mono({
  weight: ['400'],
  subsets: ['latin']
})

function Comment({ setModal }) {
  const [comments, setComments] = useState([])

  const submit = event => {
    event.preventDefault()
    const Comment = event.target.comment.value
    if (Comment.length) {
      fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Comment })
      })
        .then(res => res.json())
        .then(json => {
          setComments(json.comments)
        })
        .catch(err => alert(err))
    }
  }

  useEffect(() => {
    fetch('/api/comment')
      .then(res => res.json())
      .then(json => setComments(json.comments))
      .catch(err => setComments(['Oops, there was an error: ' + err]))
  })

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
          <div className={styles.form}>
            <div className={styles.center}>
              <p>
                Yep, this is the puzzle! Leave a lil' comment below! Keep it
                hacky.
              </p>
              <form onSubmit={submit}>
                <label>Thoughts?</label>
                <input type="text" required name="comment" />
                <Button fontSize="1.1rem">Here we go!!!</Button>
              </form>
              <hr />
              <label>Comments</label>
              {comments.map((comment, idx) => (
                <p key={idx}>{comment}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const scale = 2.75
const playerScale = 3

const collide = (ax, ay, aw, ah, bx, by, bw, bh) => {
  if (ax < bx + bw && ax + aw > bx && ay < by + bh && ah + ay > by) {
    console.log(ax, ay, aw, ah, bx, by, bw, bh)
    return true
  }
  return false
}

class Player {
  constructor(tileWidth, tileHeight, x = 470, y = 355) {
    this.direction = 'front'
    this.action = 'still'
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.x = x
    this.y = y
    this.anim = 0
    this.avatars = {}
  }

  update(collisionSprites, keys, elapsed) {
    // Update actions? You need to use elapsed somehow
    collisionSprites = new Set(collisionSprites)
    this.anim += elapsed
    if (keys['w'] && this.y > 0) {
      this.direction = 'back'
      if (!collisionSprites.has('back')) {
        if (this.anim > 50) {
          this.anim = 0
          this.action =
            this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
        }
        this.y += -0.1 * elapsed
      } else this.action = 'still'
    } else if (keys['s']) {
      this.direction = 'front'
      if (!collisionSprites.has('front')) {
        if (this.anim > 50) {
          this.anim = 0
          this.action =
            this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
        }
        this.y += 0.1 * elapsed
      }
    } else if (keys['a'] && this.x > 0 && !collisionSprites.has('left')) {
      this.direction = 'left'
      if (this.anim > 50) {
        this.anim = 0
        this.action = this.action === 'still' ? '' : 'still'
      }
      this.x += -0.1 * elapsed
    } else if (keys['d'] && !collisionSprites.has('right')) {
      this.direction = 'right'
      if (this.anim > 50) {
        this.anim = 0
        this.action = this.action === 'still' ? '' : 'still'
      }
      this.x += 0.1 * elapsed
    }
  }

  draw(canvas, ctx) {
    const avatarUri = `/luna/luna_${this.direction}_walking${
      this.action ? '_' + this.action : ''
    }.png`
    let avatar
    if (avatarUri in this.avatars) {
      avatar = this.avatars[avatarUri]
    } else {
      console.log('loading new image')
      avatar = new Image()
      avatar.src = avatarUri
      this.avatars[avatarUri] = avatar
    }
    if (avatar.complete)
      ctx.drawImage(
        avatar,
        0,
        0,
        this.tileWidth,
        this.tileHeight,
        this.x,
        this.y,
        this.tileWidth * playerScale,
        this.tileHeight * playerScale
      )
  }
}

const tileAtlas = new Image()
tileAtlas.src = '/main.png'

let i = 0

export default function Rpg({ map: initialMap, play }) {
  let keys = {}
  const canvasRef = useRef(null)
  const [player, setPlayer] = useState(new Player(16, 16))
  const [canMove, setCanMove] = useState(play)
  const [choice, setChoice] = useState(0)

  const map = new TMX(initialMap)
  const tileWidth = map.tileWidth
  const tileHeight = map.tileHeight
  const scaledTileWidth = tileWidth * scale
  const scaledTileHeight = tileHeight * scale
  const atlasCol = 64
  const atlasRow = 64
  const mapCols = map.columns
  const mapRows = map.rows
  const mapHeight = mapRows * tileHeight
  const mapWidth = mapCols * tileWidth

  const [dialog, setDialog] = useState([
    {
      message: 'What a nice day!',
      options: [
        {
          text: 'So true!',
          click: () => setDialog(prev => prev.slice(1))
        }
      ]
    },
    {
      message: "Wait! There's a hackathon happening...",
      options: [
        {
          text: 'Take me there!',
          click: () => setDialog(prev => prev.slice(1))
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

  const draw = (canvas, ctx, { elapsed, keys }) => {
    // Center map around player
    ctx.save()
    ctx.translate(-player.x * 2, -player.y * 2)
    let collisionSprites = []
    for (let layer of map.layers) {
      const levelMap = layer.data
      let mapIndex = 0
      let sourceX = 0
      let sourceY = 0
      for (let col = 0; col < mapHeight; col += tileHeight) {
        for (let row = 0; row < mapWidth; row += tileWidth) {
          let tileVal = levelMap[mapIndex]
          if (tileVal != 0) {
            tileVal--
            sourceY = Math.floor(tileVal / atlasCol) * tileHeight
            sourceX = (tileVal % atlasCol) * tileWidth
            // Determine if user is touching square
            ctx.drawImage(
              tileAtlas,
              sourceX,
              sourceY,
              tileWidth,
              tileHeight,
              row * scale,
              col * scale,
              scaledTileWidth,
              scaledTileHeight
            )
            if (!map.collisionLayer[mapIndex]) {
              // Wait have you tried to scale it yet by the translate value?
              /*
              if (player.y + tileHeight >= col - tileHeight) {
                // Above
                ctx.fillStyle = 'red'
                ctx.fillRect(
                  row * scale,
                  col * scale,
                  scaledTileWidth,
                  scaledTileHeight
                )
              }
              */
              /*
              if (
                player.y + tileHeight + player.tileHeight <=
                col - tileHeight
              ) {
                // Below
                ctx.fillStyle = 'red'
                ctx.fillRect(
                  row * scale,
                  col * scale,
                  scaledTileWidth,
                  scaledTileHeight
                )
              }
              */
              /*
              if (
                player.x + tileWidth + player.tileWidth >=
                row - tileWidth
              ) {
                ctx.fillStyle = 'red'
                ctx.fillRect(
                  row * scale,
                  col * scale,
                  scaledTileWidth,
                  scaledTileHeight
                )
              }
              if (
                player.x + tileWidth + player.tileWidth <= row - tileWidth &&
                !(
                  player.y + tileHeight >= col - tileHeight ||
                  player.y + tileHeight + player.tileHeight <=
                    col - tileHeight
                )
              ) {
                // Right
                ctx.fillStyle = 'red'
                ctx.fillRect(
                  row * scale,
                  col * scale,
                  scaledTileWidth,
                  scaledTileHeight
                )
              }
              */
            }
          }
          mapIndex++
        }
      }
    }
    ctx.restore()
    player.update(collisionSprites, keys, elapsed)
    player.draw(canvas, ctx)
  }

  useEffect(() => {
    console.log('Initializing RPG canvas')
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    console.log('adding listener')
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = false
      let lastTime
      let requiredElapsed = 1000 / 60
      let animationFrameId
      const render = now => {
        animationFrameId = requestAnimationFrame(render)
        if (!lastTime) lastTime = now
        let elapsed = now - lastTime
        if (elapsed > requiredElapsed) {
          draw(
            canvas,
            ctx,
            {
              elapsed,
              keys
            },
            true
          )
          lastTime = now
        }
      }
      render()
      window.addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight
        ctx.imageSmoothingEnabled = false
        requestAnimationFrame(render)
      })
      if (canMove) {
        window.addEventListener('keydown', event => {
          keys[event.key.toLowerCase()] = true
        })
        window.addEventListener('keyup', event => {
          keys[event.key.toLowerCase()] = false
        })
        return () => {
          cancelAnimationFrame(animationFrameId)
          window.removeEventListener('keydown', event => {
            keys[event.key.toLowerCase()] = true
          })
          window.removeEventListener('keydown', event => {
            keys[event.key.toLowerCase()] = false
          })
        }
      }
    }
  }, [canMove])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    draw(
      canvas,
      ctx,
      {
        elapsed: 0,
        keys: []
      },
      false
    )
  }, [])

  useEffect(() => {
    if (play && dialog.length) {
      window.addEventListener('keydown', event => {
        if (event.key === 'a')
          setChoice(prev => Math.min(dialog.length - 1, prev + 1))
        else if (event.key === 'w') setChoice(prev => Math.max(0, prev - 1))
        else if (event.key === 'Enter') dialog[0].options[choice].click()
      })
      return () => {
        window.removeEventListener('keydown', event => {
          if (event.key === 'a')
            setChoice(prev => Math.min(dialog.length - 1, prev + 1))
          else if (event.key === 'w') setChoice(prev => Math.max(0, prev - 1))
          else if (event.key === 'Enter') dialog[0].options[choice].click()
        })
      }
    }
  }, [play, dialog])

  return (
    <>
      <canvas ref={canvasRef} />
      {play === true && dialog.length !== 0 && (
        <div className="dialog" id="dialog">
          <p>{dialog[0].message}</p>
          <div className="choices">
            {dialog[0].options.map((option, idx) => {
              return (
                <button key={idx}>
                  {idx === choice && <span>&gt;</span>} {option.text}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
