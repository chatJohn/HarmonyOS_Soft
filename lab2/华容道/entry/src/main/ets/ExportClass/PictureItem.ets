
export default class PictureItem{
  index: number
  pixelMap: PixelMap
  pos: number // real num in the Grid Map
  constructor(index: number, pix: PixelMap, num: number)  {
    this.index = index
    this.pos = num
    this.pixelMap = pix
  }
}