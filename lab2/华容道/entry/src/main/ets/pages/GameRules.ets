import { DEFAULT } from '@ohos/hypium'
import PictureItem from './PictureItem'

let   EMPTY_PICTURE: PictureItem = new PictureItem(-1, undefined, 0)
let  NULL_PICTURE: PictureItem = new PictureItem(-1, undefined, -1)
export default class GameRules {
  public numArray: PictureItem[]

  itemChange(index: number, pictures: PictureItem[]) {
    let emptyIndex = this.findEmptyIndex(pictures)
    EMPTY_PICTURE.pos = emptyIndex
    let temp: PictureItem = pictures[index]
    pictures[index] = EMPTY_PICTURE
    pictures[emptyIndex] = new PictureItem(temp.index, temp.pixelMap, temp.pos)
    return pictures
  }

  findEmptyPicPos(pics: PictureItem[]): number{
    for(let i = 0; i < pics.length; i++){
      if(pics[i].index === EMPTY_PICTURE.index){
        return pics[i].pos
      }
    }
    return NULL_PICTURE.pos
  }
  findEmptyIndex(pictures: PictureItem[]) {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].index === EMPTY_PICTURE.index) {
        return  i
      }
    }
    return -1
  }

  gameInit(i: number, pictures: PictureItem[]) {
    let len = pictures.length
    let GridEmptyPos = this.findEmptyPicPos(pictures)
    let upIndex = GridEmptyPos - Math.sqrt(len)
    let rightIndex = GridEmptyPos + 1
    let downIndex = GridEmptyPos + Math.sqrt(len)
    let leftIndex = GridEmptyPos - 1
    switch (i){
      case upIndex:{
        pictures = this.itemChange(upIndex, pictures)
        break
      }
      case rightIndex:{
        pictures = this.itemChange(rightIndex, pictures)
        break
      }
      case downIndex:{
        pictures = this.itemChange(downIndex, pictures)
        break
      }
      case leftIndex:{
        pictures = this.itemChange(leftIndex, pictures)
        break
      }
      DEFAULT:{
        break
      }
    }
    return pictures
  }

  gameBegin(pictures: PictureItem[]) {
    AppStorage.Set<boolean>('isGameStart', true);
    let len = pictures.length
    let index, temp
    while (len > 0) {
      index = Math.floor(Math.random() * len)
      temp = pictures[len-1]
      pictures[len-1] = pictures[index]
      pictures[index] = temp
      len--
    }
    return pictures
  }
  gameInitMap(pictures: PictureItem[]){
    let len = pictures.length
    for(let i = 0; i < len; i++){
      pictures[i].pos = i
    }
    EMPTY_PICTURE.index = len
    return pictures
  }
}