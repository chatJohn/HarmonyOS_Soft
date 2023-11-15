
import router from '@ohos.router';
import hilog from '@ohos.hilog';
import AccountTable from '../common/database/tables/AccountTable';
import { CustomPieChart, PicChartElement } from '../view/PieChartComponent';
import { MonthDialogComponent } from '../view/MonthDialogComponent';


@Entry
@Component
struct Test {
  @State message: string = ''
  @State month_line_arr: number[] = []//折线图
  @State month_pie_arr: PicChartElement[] = [] //饼图
  @State month_balance: number = 0; // 月度余额
  @State month_revenue: number = 0; //月度收入
  @State month_spend: number = 0; //月度支出
  @State today_revenue: number = 0
  @State today_spend: number = 0
  private DailyDate: Date = new Date()
  @State DailyDateString: string = this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-' +
                                    this.DailyDate.getDate().toString()
  @State MonthDateString: string = this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%'
  @State NowMonthDateString: string = this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%'
  private AccountTable = new AccountTable(() => {});
  MonthDialogController: CustomDialogController = new CustomDialogController({
    builder: MonthDialogComponent(),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })

  initData() {
    this.AccountTable.getRdbStore(() => {
      this.AccountTable.daily_query(this.DailyDateString, (resultIn: number[], resultOUt: number[]) => {
        let tmp = 0;
        resultIn.forEach(x => {
          tmp += x
          // console.log('chatting statistics array check', x)
        })
        this.today_revenue = tmp
        tmp = 0
        resultOUt.forEach(x => {
          tmp += x
          // console.log('chatting statistics array check', x)
        })
        this.today_spend = tmp

      })
    })
  }
  set_poly_line(arr) { //绘制折线,x坐标的范围是0-数组的长度,y坐标是最小值到最大值,原始值会被计算为百分比(polyline绘制时是0%-100%的范围)
    var points: any[] = [] //建立坐标数组
    let l = arr.length //获取数组长度
    let min: number = Math.min(...arr) //获取原始数组最小值
    let max: number = Math.max(...arr) - min //获取原始数组的最大值
    for (var i = 0;i < l; i++) { //遍历
      //      let x=(100/l)*i//最后会多一个空point
      //      let x=(100/(l+1))*(i+1)//前后对称，前后都多一个
      let x = (100 / (l - 1)) * i //最后的空point消失,计算x坐标的百分比
      //      let y=100-((arr[i]-min)/max)*100//计算y坐标的百分比
      let y = 100 - ((arr[i] - min) / max) * 100 //计算y坐标的百分比
      points.push([x, y]) //坐标转为字符串,添加 百分号 并将坐标存入数组
    }
    //    console.info("折线坐标："+points.toString())
    return points //返回数组
  }
  aboutToAppear() {
    let params = router.getParams()
    if(params['result'] !== null && this.month_spend === 0 && this.month_revenue === 0){
      this.month_pie_arr = params['result']

      this.month_pie_arr.forEach(x => {
        this.month_line_arr.push((x.quantity < 0 ? -x.quantity : x.quantity))
        if(x.accountType === 0){
          this.month_spend += x.quantity
        }else{
          this.month_revenue += x.quantity
        }
        this.month_balance = this.month_revenue - this.month_spend
      })
      console.log('chatting month statistics check', this.month_pie_arr.length)
    }
    //
    // this.month_pie_arr.forEach(x => {
    //   console.log('chatting check pie chart', x.element + ' ' + x.quantity + ' ' + x.color +' '+ x.percent)
    // })
    if(params['pie'] !== null && this.month_spend === 0 && this.month_revenue === 0){
      this.month_pie_arr = params['pie']
      this.month_pie_arr.forEach(x => {
        this.month_line_arr.push((x.quantity < 0 ? -x.quantity : x.quantity))
        if(x.accountType === 0){
          this.month_spend += x.quantity
        }else{
          this.month_revenue += x.quantity
        }
      })
      this.month_balance = this.month_revenue - this.month_spend
    }

    this.initData()
  }

  build() {
    Column() {
      Row() { //顶部菜单
        Image($rawfile('exit.png'))
          .height(32).width(32).margin(20)
          .onClick(() => {
            router.replaceUrl({
              url: "pages/MainPage"
            })
          })
        Blank()
        Image($rawfile('日历.png'))
          .height(32).width(32).margin(20)
          .onClick(() => {
            this.MonthDialogController.open()
          })
      }
      .width('100%')
      .height('7%')
      .backgroundColor(Color.White)

      Flex({
        direction: FlexDirection.Column,
        alignItems: ItemAlign.Center,
        justifyContent: FlexAlign.SpaceAround
      }) { //主页面
        Row() { //月度统计
          Column({ space: 4 }) {
            Text('本月统计')
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Bold)
              .fontSize(24)
              .opacity(0.7)
              .alignSelf(ItemAlign.Start)
            Text('支出')
              .fontColor(Color.Black)
              .fontSize(22)
              .opacity(0.5)
              .alignSelf(ItemAlign.Start)
              .fontWeight(FontWeight.Bold)
            Text(this.month_spend.toString()).fontColor(Color.Black)
              .fontSize(34).alignSelf(ItemAlign.Start)
            Row() {
              Text('收入').fontSize(18).opacity(0.5).fontColor(Color.Black)
              Text(this.month_revenue.toString()).fontSize(18).fontColor(Color.Black)
              Divider()
                .vertical(true)
                .strokeWidth(2)
                .color(0xf1c3b8)
                .lineCap(LineCapStyle.Round)
                .margin(6)
              Text('结余').fontSize(18).opacity(0.5).fontColor(Color.Black)
              Text(this.month_balance.toString()).fontSize(18).fontColor(Color.Black)
            }
            .margin({
              top: 10
            })
            .height(32)
            .justifyContent(FlexAlign.SpaceAround).alignSelf(ItemAlign.Start)
          }
          .padding(5)
          .height('100%')
          .width('50%')

          CustomPieChart({picChartElements: this.month_pie_arr})
            .width('50%')
            .height('100%')
        }
        .justifyContent(FlexAlign.SpaceAround)
        .borderRadius(22)
        .padding(10)
        .backdropBlur(8)
        .width('90%')
        .height(180)
        .margin({ top: 12 })
               .linearGradient({
                 angle: 12,
                 colors: [
                   [0xffffff, 0],
                   [0xf1f3f5, 0.5]
                 ]
               })
        .onClick(() => {

        })

        Column() {
          //          Stack() {
          Polyline({ width: '95%', height: '95%' })
            .fillOpacity(0)
            .stroke(0xff8b8b)
            .strokeWidth(5)
            .points(this.set_poly_line(this.month_line_arr))
            .strokeLineJoin(LineJoinStyle.Round)
            .strokeLineCap(LineCapStyle.Round)
          //            Polyline({ width: '100%', height: '100%' })
          //              .strokeWidth(2)
          //              .fillOpacity(0)
          //              .stroke(Color.Black)
          //              .points(dataset.line(this.arr))
          //              .strokeLineJoin(LineJoinStyle.Round)
          //              .strokeLineCap(LineCapStyle.Round)
          //          }.padding(10).width("100%").height('100%')
        }
        .width('90%')
        .height(220)
        .borderRadius(22)
               .borderWidth(1)
               .backgroundColor(Color.White)
        .padding(16)
        .justifyContent(FlexAlign.Center)
        .onClick(() => {
          router.push({
            url: 'pages/MoneyHistory',
          });
        })

        Column() {
          Text('今日').fontSize(23)
          Row() {
            Column() {
              Text('' + this.today_revenue)
                .fontSize(26)
                .fontWeight(FontWeight.Bolder)
                .fontColor('#167c80')
                .borderRadius(18)
                .textAlign(TextAlign.Center)
              Text('收')
                .width(78)
                .height(48)
                .margin(6)
                .fontSize(32)
                .fontColor(Color.White)
                .borderRadius(18)
                .textAlign(TextAlign.Center)
                .backgroundColor('#61bfad')
                .onClick(() => {

                })

            }
            .width('50%')
            .borderRadius(28)
            .justifyContent(FlexAlign.SpaceAround)

            Column() {
              Text('' + this.today_spend)
                .fontSize(26)
                .fontWeight(FontWeight.Bolder)
                .fontColor('#ff8b8b')
                .borderRadius(18)
                .textAlign(TextAlign.Center)
              Text('支')
                .width(78)
                .height(48)
                .margin(6)
                .fontSize(32)
                .fontColor(Color.White)
                .borderRadius(18)
                .textAlign(TextAlign.Center)
                .backgroundColor('#ff8b8b')
                .onClick(() => {

                })
            }
            .width('50%')
            .borderRadius(28)
            .justifyContent(FlexAlign.SpaceAround)
          }
        }
        .padding(6)
        .width('90%')
        .height('180')
        .margin({ top: 22 })
        .borderRadius(22)
        .justifyContent(FlexAlign.SpaceAround)
        .backdropBlur(12)
               .linearGradient({
                 angle: 12,
                 colors: [
                   [0xf1f3f5, 0],
                   [0xffffff, 1]
                 ]
               })
      }.width("100%")
      .height('90%')
      .padding(24)
      .backgroundColor('#f1f3f5')
    }
    .width('100%').height('100%')
  }
}
