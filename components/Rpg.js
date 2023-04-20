import { useRef, useEffect, useState } from 'react'
import TMX from '@/utils/parser'

const scale = 2.75
const playerScale = 3

const collide = (ax, ay, aw, ah, bx, by, bw, bh) => {
  if (ax < bx + bw && ax + aw > bx && ay < by + bh && ah + ay > by) return true
  return false
}

const possible = (ax, ay, aw, ah, bx, by, bw, bh) => {
  // Check if any direction is possible
  let res = []
  const directions = [
    [-1, 0, 'left'],
    [1, 0, 'right'],
    [0, -1, 'front'],
    [0, 1, 'back']
  ]
  for (let dir of directions) {
    let testAx = ax + dir[0] * aw
    let testAy = ay + dir[1] * ah
    if (collide(testAx, testAy, aw, ah, bx, by, bw, bh)) res.push(dir[2])
  }
  return res
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
  }

  update(collisionSprites, keys, elapsed) {
    // Update actions? You need to use elapsed somehow
    collisionSprites = new Set(collisionSprites)
    this.anim += elapsed
    if (keys['w'] && this.y > 0 && !collisionSprites.has('back')) {
      this.direction = 'back'
      if (this.anim > 50) {
        this.anim = 0
        this.action =
          this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
      }
      this.y += -0.1 * elapsed
    } else if (keys['s'] && !collisionSprites.has('front')) {
      this.direction = 'front'
      if (this.anim > 50) {
        this.anim = 0
        this.action =
          this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
      }
      this.y += 0.1 * elapsed
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
    let avatar = new Image()
    avatar.src = `/luna/luna_${this.direction}_walking${
      this.action ? '_' + this.action : ''
    }.png`
    avatar.onload = () => {
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
}

export default function Rpg({ map: initialMap }) {
  const canvasRef = useRef(null)
  const [player, setPlayer] = useState(new Player(64, 64))
  let keys = {}

  const update = (canvas, ctx, { elapsed, keys }) => {
    let tileAtlas = new Image()
    tileAtlas.src = '/main.png'
    tileAtlas.onload = () => {
      // Center map around player
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
              if (map.collisionLayer[mapIndex] === 0) {
                // Make sure that it's also one of four squares next to player
                let collisions = possible(
                  player.x,
                  player.y,
                  player.tileWidth,
                  player.tileHeight,
                  row * scale,
                  col * scale,
                  tileWidth,
                  tileHeight
                )
                if (collisions.length) collisionSprites.push(...collisions)
              }
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
            }
            mapIndex++
          }
        }
      }
      player.update(collisionSprites, keys, elapsed)
      player.draw(canvas, ctx)
      ctx.restore()
    }
  }

  const handleKeydown = event => {
    keys[event.key] = true
  }

  const handleKeyUp = event => {
    keys[event.key] = false
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
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
          update(canvas, ctx, {
            elapsed,
            keys
          })
          lastTime = now
        }
      }
      requestAnimationFrame(render)
      window.addEventListener('keydown', handleKeydown)
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}
