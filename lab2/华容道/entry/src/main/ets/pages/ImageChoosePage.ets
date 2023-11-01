import router from '@ohos.router'
import Prompt from '@system.prompt'
import { Action } from '@ohos.multimodalInput.keyEvent'
import commonEventManager from '@ohos.commonEventManager'
import image from '@ohos.multimedia.image'
import promptAction from '@ohos.promptAction'
@Entry
@Component
struct B {
  @State message: string = 'B页面'
  @State text: string = ''
  @State url: string = 'imdia/empty.png'
  @State passUrl: Resource = null
  onPageShow(){
    let params = router.getParams()
    if(params){
      let age = params["age"]
      let name = params["name"]
      this.text = name + age
    }


  }
  build() {
    // Row() {
    //   Column() {
    //     Text(this.message)
    //       .fontSize(50)
    //       .fontWeight(FontWeight.Bold)
    //     Button('跳转到C')
    //       .width('80%')
    //       .margin({top: 30})
    //       .onClick(()=>{
    //         router.pushUrl({url: 'pages/C',
    //         params:{
    //           "info": "This is the data from the page B"
    //         }})
    //       })
    //     Text(this.text).fontSize(50)
    //       .fontWeight(FontWeight.Bold)
    //   }
    //   .width('100%')
    //
    // }
    // .height('100%')


    Column(){

      Image(this.url)
      .id('ImageChosed')
      .height('30%')
      .width('60%')
      .margin({
        left:10,
        right: 10,
        top: 10,
        bottom:10
      })



      Row(){
        Button('取消选择')
          .width('40%')
          .onClick(()=>{
            if(this.url != 'imdia/empty.png'){
              this.url = 'imdia/empty.png'
            }else{
              Prompt.showToast({
                message: '请先选择图片',
                duration: 1000,
              })
            }
          })
        Blank()
        Button('选择模式')
          .width('40%')
          .onClick(() => {
            if(this.url == 'imdia/empty.png'){
              Prompt.showToast({
                message: '图片不能为空，请先选择图片',
                duration:1000,
              })
            }
            else{
              // 图片切割



              router.pushUrl({
                url: 'pages/ModeChoosePage',
                params:{
                  "info": this.passUrl,
                  'image': this.url
                }
              })
            }
          })
      }
      .height('20%')
      .width('100%')
      .margin({bottom: 30})

      Swiper(){
        Image('imdia/peo.jpg')
          .onClick(() => {
            this.url = 'imdia/peo.jpg'
            this.passUrl = $r('app.media.peo')
            // Prompt.showToast({
            //   message: "图片已经更改",
            //   duration: 1000
            // })
          })
        Image('imdia/test1.jpg')
          .onClick(() => {
            this.url = 'imdia/test1.jpg'
            this.passUrl = $r('app.media.test1')
          })
        Image('imdia/test2.jpg')
          .onClick(() => {
            this.url = 'imdia/test2.jpg'
            this.passUrl = $r('app.media.test2')
          })
      }
      .width('100%')
      .height('50%')
      .indicator(true)
      .indicatorStyle({
        size: 30,
        color: Color.Red,
        top: 0
      })
    }
    .justifyContent(FlexAlign.End)
    .height('100%')
    .width('100%')
    .backgroundImage($r('app.media.bk2'))
    .backgroundImageSize(ImageSize.Cover)
  }
}