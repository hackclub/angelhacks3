export default class TMX {
  constructor(source) {
    this.source = source
    this.compressionLevel = Number(this.source.compressionlevel)
    this.orientation = this.source.orientation
    this.tileWidth = Number(this.source.tilewidth)
    this.tileHeight = Number(this.source.tileheight)
    this.rows = Number(this.source.height)
    this.columns = Number(this.source.width)
  }

  get length() {
    return this.layers.length
  }

  get layers() {
    return this.source.layers.filter(
      layer =>
        !(layer.name === 'Collision Layer' || layer.name === 'Special Layer')
    )
  }

  get specialLayer() {
    return this.source.layers.filter(layer => layer.name === 'Special Layer')[0]
      .data
  }

  get collisionLayer() {
    return this.source.layers.filter(
      layer => layer.name === 'Collision Layer'
    )[0].data
  }
}
