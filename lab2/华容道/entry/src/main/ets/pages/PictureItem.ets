
export default class PictureItem{
  index: number
  pixelMap: PixelMap
  pos: number
  constructor(index: number, pix: PixelMap, num: number) {
    this.index = index
    this.pos = num
    this.pixelMap = pix
  }
}