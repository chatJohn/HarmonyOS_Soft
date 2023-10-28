import router from '@ohos.router'
import { Size } from '@ohos/hypium'
import promptAction from '@ohos.promptAction'
@Entry
@Component
struct A {
  @State message: string = 'A页面'

  build() {
    Column() {
      Image($r('app.media.title'))
      .height("20%")
      .width("100%")
      .objectFit(ImageFit.Fill)
        .margin(100)
        Button('开始游戏')
          .width('80%')
          .margin({top: 30})
          .onClick(()=>{
            promptAction.showDialog({
              message: '只有与空格相邻的图片位置才可与空格交换位置，每次移动空格只允许（可以移动的话）上下左右移动',
              title: '游戏介绍',
              buttons:[
                {
                  text: '还没想好开始',
                  color: '#888888'
                },
                {
                  text: '开始游戏',
                  color: '#000000'
                }
              ]
            }).then((res) => {
              if(res.index == 0){

              }
              else if(res.index == 1){
                router.pushUrl({url: 'pages/ImageChoosePage'})
              }

            })

          })
      Button('游戏介绍')
        .width('80%')
        .margin({top: 30})
        .onClick(()=>{
          promptAction.showDialog({
            message: '只有与空格相邻的图片位置才可与空格交换位置，每次移动空格只允许（可以移动的话）上下左右移动',
            title: '游戏介绍',
            buttons:[
              {
                text: '我知道了',
                color: '#000000'
              }
            ]
          })
        })
      Button('关于作者')
        .width('80%')
        .margin({top: 30})
        .onClick(()=>{
          promptAction.showDialog({
            message: 'SB大学生',
            title: '关于作者',
            buttons:[
              {
                text: '我知道了',
                color: '#000000'
              }
            ]
          })
        })
    }
    .backgroundImage($r('app.media.bk2')).backgroundImageSize(ImageSize.Cover)

    .height('100%')
  }
}