import PictureItem from './PictureItem'

let EMPTY_PICTURE: PictureItem = new PictureItem(9, undefined, 0)

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

  findEmptyIndex(pictures: PictureItem[]) {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].index === EMPTY_PICTURE.index) {
        return i
      }
    }
    return -1
  }

  gameInit(i: number, pictures: PictureItem[]) {
    let emptyIndex = this.findEmptyIndex(pictures)
      switch (emptyIndex) {
        case 0:
          if (i === 1 || i === 3) {
            pictures = this.itemChange(i, pictures)
          }
          break;
        case 2:
          if (i === 1 || i === 5) {
            pictures = this.itemChange(i, pictures)
          }
          break;
        case 6:
          if (i === 3 || i === 7) {
            pictures = this.itemChange(i, pictures)
          }
          break;
        case 8:
          if (i === 5 || i === 7) {
            pictures = this.itemChange(i, pictures)
          }
          break;
        case 3:
          switch (i) {
            case emptyIndex + 1:
            case emptyIndex - 3:
            case emptyIndex + 3:
              pictures = this.itemChange(i, pictures)
          }
          break;
        case 1:
          switch (i) {
            case emptyIndex + 1:
            case emptyIndex - 1:
            case emptyIndex + 3:
              pictures = this.itemChange(i, pictures)
          }
          break;
        case 5:
          switch (i) {
            case emptyIndex + 3:
            case emptyIndex - 3:
            case emptyIndex - 1:
              pictures = this.itemChange(i, pictures)
          }
          break;
        case 7:
          switch (i) {
            case emptyIndex + 1:
            case emptyIndex - 3:
            case emptyIndex - 1:
              pictures = this.itemChange(i, pictures)
          }
          break;
        case 4:
          switch (i) {
            case emptyIndex + 1:
            case emptyIndex - 3:
            case emptyIndex - 1:
            case emptyIndex + 3:
              pictures = this.itemChange(i, pictures)
          }
          break;
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
    return pictures
  }
}