
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
import AccountTable from '../common/database/tables/AccountTable';
import { PicChartElement } from './PieChartComponent';


@CustomDialog
export struct MonthDialogComponent{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller();
  @State MonthList: Array<string> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月', '11月', '12月'];
  @State YearList: Array<string> = ['2021', '2022', '2023'];
  @State GridLength: string = '1fr 1fr 1fr 1fr';
  @State curMonth: string = '';
  @State curYear: string = '';
  private AccountTable = new AccountTable(() => {});
  @State result: PicChartElement[] = [];
  selectItem(month: string, year: string) {
    this.curMonth = month;
    this.curYear = year
    this.AccountTable.getRdbStore(() => {
      this.AccountTable.month_query(year + '-' + month.substring(0, month.length - 1) + '-%', (resultIn: number[], resultOut: number[], result: PicChartElement[]) => {
        this.result = result
      })
    })
  }

  build(){
    Column() {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close()
        })


        ForEach(this.YearList, (item: string) => {
          Column(){
            Text(item)
              .fontSize(20)
              .width("40%")
              .height('20%')
              .padding(10)
              .alignSelf(ItemAlign.Start)
              .backgroundColor(0xF0F0F0)
            Grid(){
              ForEach(this.MonthList, (it: string) => {
                GridItem() {
                  Text(it)
                    .fontSize(30)
                    .fontColor(Color.Black)
                    .margin({
                      left: 10,
                      top: 10
                    })
                }
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curMonth === it && this.curYear === item ? $r('app.color.main_color') : '#FFDBDBDB')
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectItem(it, item);
                })
              })
            }
            .columnsTemplate(this.GridLength)
            .rowsTemplate(this.GridLength)
            .width('100%')
            .height('80%')
            .backgroundColor(0xF0F0F0)
          }
          .width('100%')
          .height('30%')
        })

        Button() {
          Text($r('app.string.confirm_text'))
            .fontSize($r('app.float.font_size_M'))
            .fontColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .height('5%')
        .onClick(() => {
          router.replaceUrl({
            url: 'pages/StatisticsPage',
            params:{
              'result': this.result
            }
          })
        })

    }
    .width(CommonConstants.FULL_WIDTH)
    .height('100%')
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(0xF0F0F0)
    .align(Alignment.BottomEnd)

  }
}