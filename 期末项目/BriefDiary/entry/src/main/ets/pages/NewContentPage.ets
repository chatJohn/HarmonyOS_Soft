import router from '@ohos.router'
import Logger from '@ohos/imagelibrary/src/main/ets/components/data/Logger';
import CommonConstants from '../common/constants/CommonConstants';
import DiaryTable from '../common/database/tables/DiaryTable';

import DiaryData from '../viewmodel/DiaryData';

const TAG: string = 'NewContent'
interface paramsType {
  mediaUris: Array<string>
}

class routerParamsType {
  isShowCamera?: boolean;
  mediaUris?: Array<string>
}


import EmojiItem from '../viewmodel/EmojiItem';
import { EmojiList } from '../viewmodel/EmojiList';
import TagItem from '../viewmodel/TagItem';
import { TagList } from '../viewmodel/TagList';


@CustomDialog
struct EmojiDialog{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller()
  @State GridLength: string = '1fr 1fr 1fr 1fr'
  @State emojiList: Array<EmojiItem> = EmojiList;
  @State curEmojiText: string = ''
  @Link choosedEmoji: string
  selectEmoji(item: EmojiItem) {
    this.curEmojiText = item.text;
    this.choosedEmoji = item.icon
  }

  build(){
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close()
        })
        .backgroundColor(0xF0F0F0)
      Scroll(this.scroller) {
        Grid() {
          ForEach(this.emojiList, (item: EmojiItem) => {
            GridItem() {
              Column() {
                Text(item.icon)
                  .width(40)
                  .height(40)
                Text(item.text)
                  .width(40)
                  .height(40)
                  .fontColor(this.curEmojiText === item.text ? '#FF007DFF' : Color.Black)
              }
              .width(80)
              .height(80)
            }
            .onClick(() => {
              this.selectEmoji(item)
            })
          })
        }

      }
      .scrollable(ScrollDirection.Vertical)
      .width(CommonConstants.FULL_WIDTH)
      .height('50%')
      .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
      .backgroundColor(0xF0F0F0)
      .align(Alignment.BottomEnd)

      Button() {
        Text('确定')
          .fontSize($r('app.float.font_size_M'))
          .fontColor(Color.White)
      }
      .onClick(() => {
        this.controller.close()
      })
      .width(CommonConstants.FULL_WIDTH)
      .height('5%')
    }
    .backgroundColor(0XF0F0F0)
  }
}


@CustomDialog
struct TagDialog{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller()
  @State GridLength: string = '1fr 1fr 1fr 1fr'
  @State TagList: Array<TagItem> = TagList;
  @Link choosedTag: Resource
  @Link choosedTagText: string
  selectTag(item: TagItem) {
    this.choosedTagText = item.TagText;
    this.choosedTag = item.icon
  }
  build(){
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close()
        })
        .backgroundColor(0xF0F0F0)
      Scroll(this.scroller) {
        Grid() {
          ForEach(this.TagList, (item: TagItem) => {
            GridItem() {
              Column() {
                Image(item.icon)
                  .width(40)
                  .height(40)
                Text(item.TagText)
                  .width(60)
                  .height(40)
                  .margin({
                    left: 15
                  })
                  .fontColor(this.choosedTagText === item.TagText ? '#FF007DFF' : Color.Black)
              }

              .width(80)
              .height(80)
            }
            .onClick(() => {
              this.selectTag(item)
            })
          })
        }

      }
      .scrollable(ScrollDirection.Vertical)
      .width(CommonConstants.FULL_WIDTH)
      .height('30%')
      .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
      .backgroundColor(0xF0F0F0)
      .align(Alignment.BottomEnd)

      Button() {
        Text('确定')
          .fontSize($r('app.float.font_size_M'))
          .fontColor(Color.White)
      }
      .onClick(() => {
        this.controller.close()
      })
      .width(CommonConstants.FULL_WIDTH)
      .height('5%')
    }
    .backgroundColor(0XF0F0F0)
  }
}

@Entry
@Component
struct NewContentPage {
  private DiaryTable = new DiaryTable(() => {});

  @State mediaUris: Array<string> = []
  @State isShowCamera: boolean = false
  private paramsObj: paramsType = {
    mediaUris: this.mediaUris
  }
  private params = router.getParams() as routerParamsType
  @State mainContent: string = '所谓人生，正是当下'
  @State subContent: string = '有什么想法或者感受呢?😎'
  @State choosedEmoji: string = ''
  @State choosedTag: Resource = null
  @State choosedTagText: string = ''
  private curDate: Date = new Date()
  @State curDateStirng: string = this.curDate.getFullYear() + '-' + (1 + this.curDate.getMonth()) + '-' + this.curDate.getDate()
  @State curTime: string = (this.curDate.getHours().toString().length === 1 ? '0' : '') + this.curDate.getHours()
                            + ':' + (this.curDate.getMinutes().toString().length === 1 ? '0' : '') + this.curDate.getMinutes()
  @State newDiary: DiaryData = {id: 0, mainContent: '', subContent: '', picsStringList: '', date: this.curDateStirng, HourMinuites: this.curTime, Tags: '', emojis: ''}
  emojiDialogController: CustomDialogController = new CustomDialogController({
    builder: EmojiDialog({
      choosedEmoji: $choosedEmoji
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })

  TagDialogController: CustomDialogController = new CustomDialogController({
    builder: TagDialog({
      choosedTag: $choosedTag,
      choosedTagText: $choosedTagText
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })
  insertDiaryData(newData: DiaryData){
    console.log(CommonConstants.INSEART_CHECK, `The insert data is: ${JSON.stringify(newData)}`)
    this.DiaryTable.insertDate(newData, (id: number) => {
      console.log(CommonConstants.INSEART_STATUS_CHECK, `Insert id: ${id}`)
    })
  }

  async onPageShow() {
    if (this.params['isShowCamera'] !== undefined && this.params['isShowCamera'] !== null) {
      this.isShowCamera = this.params['isShowCamera']
      Logger.info(TAG, `this.isShowCamera = ${this.isShowCamera}`)
    }

    if (this.params['mediaUris'] !== undefined && this.params['mediaUris'] !== null) {
      this.mediaUris = this.params['mediaUris']
      this.mediaUris.push('')
    }
    console.log('chatting string check', this.mediaUris.toString());
    this.newDiary.picsStringList = this.mediaUris.toString()
    // ==>format: datashare:///media/image/1838,datashare:///media/image/1890,datashare:///media/image/1889,
  }


  build() {
    Column(){
      Row() { //顶部菜单
        Image($rawfile('exit.png'))
          .height(32).width(32).margin(20)
          .onClick(() => {
            router.replaceUrl({
              url: "pages/MainPage"
            })
          })
        Text(this.curDateStirng + '  ' + this.curTime)
          .fontSize(20)
          .fontColor(Color.White)
          .margin({
            left: 55
          })
        Blank()
        Text('完成')
          .fontColor(Color.Black)
          .fontSize(20)
          .margin({
            right: 25
          })
          .onClick(() => {
            // 存放数据
            if(this.choosedEmoji !== '' && this.choosedTag !== null){
              this.newDiary.emojis = this.choosedEmoji
              this.newDiary.Tags = this.choosedTagText
            }
            this.insertDiaryData(this.newDiary)
            router.replaceUrl({
              url: 'pages/MainPage'
            })
          })
      }
      .width('100%')
      .height('5%')
      .backgroundColor($r('app.color.test'))

      TextInput({
        placeholder: this.mainContent
      })
        .width('100%')
        .height('20%')
        .backgroundColor(Color.White)
        .onChange((str: string) => {
          this.mainContent = str;
          // console.log(CommonConstants.INPUT_MAINCONTENT_CHECK, this.mainContent);
          this.newDiary.mainContent = str;
        })
      Divider()
        .width('100%')
      TextInput({
        placeholder: this.subContent
      })
        .width('100%')
        .height('20%')
        .backgroundColor(Color.White)
        .onChange((str: string) => {
          this.subContent = str;
          // console.log(CommonConstants.INPUT_SUBCONTENT_CHECK, this.subContent);
          this.newDiary.subContent = str;
        })
      // 图片展示区域
      Scroll() {
          Column() {
            Stack({ alignContent: Alignment.Top }) {
              Column() {
                if (this.isShowCamera) {
                  Grid() {
                    ForEach(this.mediaUris, (item: PixelMap | ResourceStr, index?: number) => {
                      if (typeof index !== "undefined") {
                        GridItem() {
                          if (index < this.mediaUris.length - 1) {
                            Stack(){
                              Image(item)
                                .width('100%')
                                .height('100%')
                                .borderRadius(10)
                            }
                          } else {
                            Column() {
                              Image($r('app.media.photo'))
                                .height(40)
                                .width(40)
                                .onClick(() => {
                                  router.pushUrl({
                                    url: 'pages/ChoicePhotoPage',
                                    params: this.paramsObj
                                  })
                                })
                              Text("添加图片/照片")
                                .fontSize(13)
                            }
                            .alignItems(HorizontalAlign.Center)
                            .justifyContent(FlexAlign.Center)
                            .width('100%')
                            .height(100)
                            .borderRadius(10)
                            .backgroundColor('#F1F3F5')
                          }
                        }
                      }
                    })
                  }
                  .columnsTemplate('1fr 1fr 1fr 1fr')
                  .columnsGap(8)
                  .rowsGap(8)
                  .margin({ top: 8 })
                  .width('94%')
                  .height(105 * (this.mediaUris.length > 4 ? 2 : 1))
                } else {
                  Column() {
                    Image($r('app.media.camera'))
                      .width(40)
                      .height(40)

                    Text("添加图片/照片")
                      .fontSize(16)
                  }
                  .onClick(() => {
                    router.pushUrl({
                      url: 'pages/ChoicePhotoPage'
                    })
                  })
                  .width('94%')
                  .height(130)
                  .margin({ top: 10 })
                  .borderRadius(10)
                  .justifyContent(FlexAlign.Center)
                  .backgroundColor('#F1F3F5')
                }
              }
              .width('100%')
              .height('100%')
              .margin({ top: 22 })
              .borderRadius(20)
              .backgroundColor('#fffffff')
            }
            .backgroundColor('#f1f3f5')
            .height('100%')
            .width('94%')
            .margin({ top: 10 })
          }
          .width('100%')
          .height(this.isShowCamera === false ? 380 : 300 + (this.mediaUris.length / 4 > 1 ? 160 : 60))
        }
        .width('100%')
        .height('50%')
        .backgroundColor('#f1f3f5')


      Row() { //底部菜单
        Image($rawfile('叉号.png'))
          .height('48vp').width('48vp')
          .onClick(() => {
            router.replaceUrl({
              url: "pages/MainPage"
            })
          })
        Blank()
        Image($rawfile('图片.png'))
          .height('48vp').width('48vp')
          .onClick(() => {
            router.pushUrl({
              url: 'pages/ChoicePhotoPage'
            })

          })
        Image($rawfile('拍照.png'))
          .height('48vp').width('48vp')
        Image($rawfile('星星.png'))
          .height('48vp').width('48vp')
        if(this.choosedEmoji === ''){
          Image($rawfile('表情.png'))
            .height('48vp').width('48vp')
            .onClick(() => {
              this.emojiDialogController.open()
            })
        }else{
          Text(this.choosedEmoji)
            .height('48vp').width('48vp')
            .onClick(() => {
              this.emojiDialogController.open()
            })
        }
        if(this.choosedTag === null){
          Image($rawfile('标签.png'))
            .height('40vp').width('40vp')
            .onClick(() => {
              this.TagDialogController.open()
            })
        }else{
          Image(this.choosedTag)
            .width('48vp')
            .height('48vp')
            .onClick(() => {
              this.TagDialogController.open()
            })
        }

        Blank()
        Image($rawfile('正确.png'))
          .height('48vp').width('48vp')
          .onClick(() =>{
            // 存放数据
            if(this.choosedEmoji !== '' && this.choosedTag !== null){
              this.newDiary.emojis = this.choosedEmoji
              this.newDiary.Tags = this.choosedTagText
            }
            this.insertDiaryData(this.newDiary)
            router.replaceUrl({
              url: 'pages/MainPage'
            })

          })
      }
      .width('100%')
      .height('5%')
      .backgroundColor(Color.White)


    }
    .width('100%')
    .height('100%')
  }
}