import image from '@ohos.multimedia.image'
import imageItem from './PictureItem';
import fs from '@ohos.file.fs';

export default class ImageModel{
  // 接收一个资源路径，是选中的图片
  pic_url: Resource
  pic_name: string
  mode: number
  ImageArray: ImageModel[] = []
  constructor(pic: Resource, pic_name: string, num: number) {
    this.pic_url = pic
    this.pic_name = pic_name
    this.mode = num
  }
  async splitPic(context: Context) {
    console.log('进入函数')
    let imagePixelMap: imageItem[] = []
    const fd = await this.getResourceFd(context);
    let imageSource = image.createImageSource(fd)
    if (!imageSource) {
      console.log('失败失败')
      return;
    }
    let imageInfo;
    try {
      imageInfo = await imageSource.getImageInfo();
    } catch (error) {
      console.error('Error while getting image info:', error);
      // 处理错误，或者抛出异常终止方法继续执行
      throw error;
    }
    // 接下来的代码使用 imageInfo


    let height = imageInfo.size.height / this.mode

    for (let i = 0; i < this.mode; i++) {
      for (let j = 0; j < this.mode; j++) {
        let picItem
        if (i === this.mode - 1 && j === this.mode - 1) {
          picItem = new imageItem(this.mode * this.mode, undefined, 8)
          imagePixelMap.push(picItem)
        } else {
          let decodingOptions: image.DecodingOptions = {
            desiredRegion: {
              size: {
                height: height, width: imageInfo.size.width / this.mode
              },
              x: j * imageInfo.size.width / this.mode,
              y: i * height
            }
          }

          picItem = await imageSource.createPixelMap(decodingOptions)
          imagePixelMap.push({
            index: i * this.mode + j, pixelMap: picItem, pos: i * this.mode + j
          })
        }
      }
    }
    console.log('执行完毕，填充完毕')
    console.log('imagePixelMap' + imagePixelMap[0])
    return imagePixelMap
  }

  async getResourceFd(context: Context) {
    const resourceMgr = context.resourceManager;
    let imageBuffer = await resourceMgr.getMediaContent(this.pic_url)
    let filePath = context.cacheDir + '/' + 'tmp.jpg';
    let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(file.fd, imageBuffer.buffer);
    return file.fd;
  }
}