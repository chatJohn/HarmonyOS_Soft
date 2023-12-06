
import CommonConstants from '../common/constants/CommonConstants';
import EmojiItem from '../viewmodel/EmojiItem';
import { EmojiList } from '../viewmodel/EmojiList';


@CustomDialog
export struct EmojiDialog{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller()
  @State GridLength: string = '1fr 1fr 1fr 1fr'
  @State emojiList: Array<EmojiItem> = EmojiList;
  confirm: (emoji: string) => void;
  @State curEmojiText: string = ''
  @State curEmoji: string = ''
  selectEmoji(item: EmojiItem) {
    this.curEmojiText = item.text;
    this.curEmoji = item.icon
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
        this.confirm(this.curEmoji)
      })
      .width(CommonConstants.FULL_WIDTH)
      .height('5%')
    }
    .backgroundColor(0XF0F0F0)
  }
}

