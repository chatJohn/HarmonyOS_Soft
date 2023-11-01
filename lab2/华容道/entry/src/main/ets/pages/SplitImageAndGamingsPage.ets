import router from '@ohos.router'
import Prompt from '@system.prompt'
import promptAction from '@ohos.promptAction'
import ImageModel from '../SplitUtils/ImageSplit'
import PictureItem from '../ExportClass/PictureItem'

import GameRules from '../SplitUtils/GameRules'
@Entry
@Component

struct C {
  @State media: string = ''
  @State resourceMeda: Resource = null
  @State mode: number = 0
  @State frNum: string = ''
  @State Number: PictureItem[] = []
  @State originPic: PictureItem[] = []
  @State context: Context = getContext(this)
  @State time: number = 0
  @State rules: GameRules = new GameRules()
  async aboutToAppear(){
    let para = router.getParams()
    this.media = para['image']
    this.resourceMeda = para['media']
    if(this.media.substring(10) == 'peo'){
      this.media = 'imdia/peo.jpg'
    }else if(this.media.substring(10) == 'test1'){
      this.media = 'imdia/test1.jpg'
    }else if(this.media.substring(10) == 'test2'){
      this.media = 'imdia/test2.jpg'
    }
    // console.log('chatting', this.media.substring(6)) ==> peo.jpg
    // console.log("chatting", this.resourceMeda) ==> app.media.peo
    this.mode = para['mode']
    for (let index = 0; index < this.mode; index++) {
      this.frNum += '1fr '
    }
    this.Number = await new ImageModel(this.resourceMeda, this.media.substring(6), this.mode).splitPic(this.context)

    this.Number = this.rules.gameBegin(this.Number)
    this.Number = this.rules.gameInitMap(this.Number)
    this.time = Date.now()

  }

  build() {

    Column() {
      // build the Grid Image mode * mode with giving mode

      Grid(){
        ForEach(this.Number, (num: PictureItem) => {

          GridItem() {
            Image(num.pixelMap)
              .width('100%')
              .height('100%')
              .borderRadius(5)
          }.onClick(() => {
            this.Number = this.rules.gameInit(num.pos, this.Number)
            this.Number = this.rules.gameInitMap(this.Number)

          })
        })

      }
      .columnsTemplate(this.frNum)
      .rowsTemplate(this.frNum)
      .columnsGap(1)
      .rowsGap(1)
      .width('60%')
      .height('30%')
      .backgroundColor(0xF0F0F0)

      Row(){
        Button('退出游戏')
          .width('40%')
          .height('20%')
          .onClick(() => {
            promptAction.showDialog({
              message: '你确定要返回吗',
              title: '提示',
              buttons:[
                {
                  text: '取消',
                  color: '#888888'
                },
                {
                  text: '确定',
                  color: '#FF0000'
                }
              ]
            }).then((res) => {
              if(res.index == 0){
                Prompt.showToast({
                  message: '欢迎继续游戏',
                  duration: 1000
                })
              }else if(res.index == 1){
                router.pushUrl({
                  url: 'pages/EnterPage'
                })
                Prompt.showToast({
                  message: '退出成功',
                  duration: 1000
                })
              }
            })

          })

        Blank()
        Button('重新开始')
          .width('40%')
          .height('20%')
          .onClick(() => {
            this.Number = this.rules.gameBegin(this.Number)
            this.Number = this.rules.gameInitMap(this.Number)
          })
      }
      .width('100%')
      .height('20%')

      Button('一键完成')
        .width('40%')
        .height('10%')
        .onClick(() => {
          this.Number = this.rules.gamePicIndexSort(this.Number)
          let curr: number = Date.now()
          promptAction.showDialog({
            message: '恭喜完成， 总共耗时：' + (- this.time + curr) / 1000 + 's',
            title: '完成提示',
            buttons:[
              {
                text: '我知道了',
                color: '#000000'
              },
              {
                text: '退出游戏',
                color: '#888888'
              }
            ]
          }).then((res) => {
            if(res.index == 0){

            }else if(res.index == 1){
              router.pushUrl({url: 'pages/EnterPage'})
            }
          })
        })



      Image(this.media)
        .width('60%')
        .height('30%')
        .margin({
          left:10,
          right: 10,
          top: 10,
          bottom:10
        })
    }
    .height('100%')
    .width('100%')
    .backgroundImage($r('app.media.bk2'))
    .backgroundImageSize(ImageSize.Cover)
  }
}