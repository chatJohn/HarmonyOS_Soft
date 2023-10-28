import router from '@ohos.router'
@Entry
@Component
struct ModeChoosePage {
  @State url: Resource = null
  @State mode2Num: number = -1
  @State image: string = ''
  aboutToAppear(){
    let info = router.getParams()
    this.url = info['info']
    this.image = info['image']
  }
  build() {
    Column() {
      Button('简单')
        .fontSize(30)
        .width('70%')
        .margin({
          top: 300
        })

        .onClick(() => {
          this.mode2Num = 3 // 3 * 3
          router.pushUrl({
            url: 'pages/SplitImageAndGamings',
            params: {
              'media': this.url,
              'mode': this.mode2Num,
              'image': this.image
            }
          })
        })

      Button('中等')
        .fontSize(30)
        .width('70%')
        .margin({
          top: 20
        })
        .onClick(() => {
          this.mode2Num = 4 // 4 * 4
          router.pushUrl({
            url: 'pages/SplitImageAndGamings',
            params: {
              'media': this.url,
              'mode': this.mode2Num,
              'image': this.image
            }
          })
        })
      Button('困难')
        .fontSize(30)
        .width('70%')
        .margin({
          top: 20
        })
        .onClick(() => {
          this.mode2Num = 5 // 5 * 5
          router.pushUrl({
            url: 'pages/SplitImageAndGamings',
            params: {
              'media': this.url,
              'mode': this.mode2Num,
              'image': this.image
            }
          })
        })
    }
    .backgroundImage($r('app.media.bk2'))
    .backgroundImageSize(ImageSize.Cover)
    .height('100%')
    .width('100%')
  }
}