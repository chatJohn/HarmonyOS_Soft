
import CommonConstants from '../common/constants/CommonConstants';
import EmojiItem from '../viewmodel/EmojiItem';
import { EmojiList } from '../viewmodel/EmojiList';
import TagItem from '../viewmodel/TagItem';
import { TagList } from '../viewmodel/TagList';


@CustomDialog
export struct TagDialog{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller()
  @State GridLength: string = '1fr 1fr 1fr 1fr'
  @State TagList: Array<TagItem> = TagList;
  @State curTagText: string = ''
  selectEmoji(item: TagItem) {
    this.curTagText = item.TagText;
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
                Text(item.icon)
                  .width(40)
                  .height(40)
                Text(item.TagText)
                  .width(40)
                  .height(40)
                  .fontColor(this.curTagText === item.TagText ? '#FF007DFF' : Color.Black)
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

      })
      .width(CommonConstants.FULL_WIDTH)
      .height('5%')
    }
    .backgroundColor(0XF0F0F0)
  }
}

