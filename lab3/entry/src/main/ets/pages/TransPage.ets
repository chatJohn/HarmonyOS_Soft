import router from '@ohos.router'
import data_rdb from '@ohos.data.rdb'
import Curves from '@ohos.curves'
import systemDateTime from '@ohos.systemDateTime'

import settings from '@ohos.settings';
@Entry
@Component
struct TransPage {
  @State message: string = '呆头鹅记账'
  @State powerBy: string = 'PowerBy: 华为'
  @State private opacityValue: number = 0
  @State private scaleValue: number = 0
  private curve1 = Curves.cubicBezier(0.4, 0, 1, 1)
  private pathCommands1: string = 'M319.5 128.1 c103.5 0 187.5 84 187.5 187.5 v15 a172.5 172.5 0 0 3 -172.5 172.5 H198 a36 36 0 0 3 -13.8 -1 207 207 0 0 0 87 -372 h48.3 z'
  private pathCommands2: string = 'M270.6 128.1 h48.6 c51.6 0 98.4 21 132.3 54.6 a411 411 0 0 3 -45.6 123 c-25.2 45.6 -56.4 84 -87.6 110.4 a206.1 206.1 0 0 0 -47.7 -288 z'


  build() {
    Column(){
      Shape() {
        Path()
          .commands('M162 128.7 a222 222 0 0 1 100.8 374.4 H198 a36 36 0 0 3 -36 -36')
          .fill(Color.White)
          .stroke(Color.Blue)
          .antiAlias(true)
          .strokeOpacity(100)
        Path()
          .antiAlias(true)
          .strokeOpacity(100)
          .commands(this.pathCommands1)
          .fill('none')
          .linearGradient(
            {
              angle: 30,
              colors: [["#ff82fffb", 0], ["#ff39fcf6", 1]]
            })
          .clip(new Path().commands(this.pathCommands1))
          .stroke(Color.Blue)
        Path()
          .antiAlias(true)
          .strokeOpacity(100)
          .stroke(Color.Blue)
          .commands(this.pathCommands2)
          .fill('none')
          .linearGradient(
            {
              angle: 50,
              colors: [['#ff71ffdd', 0.1], ["#ff71eae2", 0.4], ["#ff1ef6f6", 0.7]]
            })
          .clip(new Path().commands(this.pathCommands2))
      }
      .height('630px')
      .width('630px')
      .scale({ x: this.scaleValue, y: this.scaleValue })
      .opacity(this.opacityValue)
      .onAppear(() => {
        animateTo({
          duration: 1000,
          curve: this.curve1,
          onFinish: () => { // 到时间之后直接跳转
            setTimeout(() => {
              router.replaceUrl({
                url: 'pages/MainPage'
              })
            }, 1000)
          }
        }, () => {
          this.opacityValue = 1
          this.scaleValue = 1
        })
      })

      Text(this.message)
        .fontSize(60)
        .width('100%')
        .height('30%')
        .alignSelf(ItemAlign.Center)
        .margin({
          left: 110,
          top: 20
        })


      Text(this.powerBy)
        .margin({
          left: 10,
          top: 320
        })
        .fontSize(15)
        .fontColor(Color.Blue)
    }
    .width('100%')
    .height('100%')
    .backgroundImage($r('app.media.bk2'))
    .backgroundImageSize(ImageSize.Cover)
    .onAppear(() => {
      animateTo({
        duration: 1000,
        onFinish: () => {}
      },() => {

      })
    })
  }
}