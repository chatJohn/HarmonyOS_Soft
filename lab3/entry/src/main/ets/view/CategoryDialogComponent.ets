
import router from '@ohos.router';
import Prompt from '@system.prompt';
import promptAction from '@ohos.promptAction';
import CommonConstants from '../common/constants/CommonConstants';
import AccountItem from '../viewmodel/AccountItem';
import { EarnList, PayList } from '../viewmodel/AccountList';

@CustomDialog
export struct CategoryDialogComponent{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller();
  @State payList: Array<AccountItem> = PayList;
  @State PayGridLength: string = '1fr 1fr 1fr 1fr'
  @State EarnGridLength: string = this.PayGridLength
  @State earnList: Array<AccountItem> = EarnList;
  @State curType: string = ''
  selectAccount(item: AccountItem) {
    this.curType = item.typeText;
  }
  aboutToAppear(){

  }
  build(){
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close()
        })

      Scroll(this.scroller){
        Column(){
          Text('支出')
            .fontSize(20)
            .width("40%")
            .height('10%')
            .padding(10)
            .alignSelf(ItemAlign.Start)
            .backgroundColor(0xF0F0F0)
          Grid(){
            ForEach(this.payList, (item: AccountItem) => {
              GridItem() {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize('10vp')
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: '6vp' })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              }
            })
          }
          .columnsTemplate(this.PayGridLength)
          .rowsTemplate(this.PayGridLength)
          .width('100%')
          .height('40%')
          .backgroundColor(0xF0F0F0)
          Text('收入')
            .fontSize(20)
            .width("40%")
            .height('10%')
            .padding(10)
            .alignSelf(ItemAlign.Start)
          Grid(){
            ForEach(this.earnList, (item: AccountItem) => {
              GridItem() {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize('10vp')
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: '6vp' })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              }
            })
          }
          .columnsTemplate(this.PayGridLength)
          .rowsTemplate(this.PayGridLength)
          .width('100%')
          .height('30%')
          .backgroundColor(0xF0F0F0)

          Button() {
            Text($r('app.string.confirm_text'))
              .fontSize($r('app.float.font_size_M'))
              .fontColor(Color.White)
          }
          .width(CommonConstants.FULL_WIDTH)
          .height('5%')
          .onClick(() => {
            if(this.curType === ''){
              promptAction.showToast({
                message: '请先选择账目类型',
                duration: 1000
              })
            }else{
              router.replaceUrl({
                url: 'pages/CategorySelectedAccountsPage',
                params:{
                  'category': this.curType
                }
              })
            }
          })
        }


      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height('100%')
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(0xF0F0F0)
    .align(Alignment.BottomEnd)
  }
}