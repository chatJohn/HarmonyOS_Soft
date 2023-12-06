import router from '@ohos.router'
import { McLineChart } from 'meichuangtools'
import DiaryTable from '../common/database/tables/DiaryTable'
import DiaryData from '../viewmodel/DiaryData'
@Entry
@Component
struct StatisticsPage {

  @State month_diary_count: number = 0;
  private DiaryTable = new DiaryTable(() => {});
  private curDate: Date = new Date()
  @State curMonth: string = this.curDate.getFullYear() + '-' + (1 + this.curDate.getMonth())
  @State curWeekDay: number = this.curDate.getDay();
  @State curWeekDate: Array<string> = [];
  @State weekData: Array<number> = []
  @State monthData: Array<DiaryData> = [];
   initDate(){
    let curWeekDate: Array<string> = [];
    for(let i = 1; i <= 7; i++){
      if(-7 + i + this.curDate.getDate() <= 0){
        curWeekDate.push(this.curDate.getFullYear() + '-' + (this.curDate.getMonth()) + '-' + (30 - 7 + i + this.curDate.getDate()));
      }else{
        curWeekDate.push(this.curMonth + '-' + (-7 + i + this.curDate.getDate()))
      }
    }
    this.curWeekDate = curWeekDate;
       this.DiaryTable.queryWeek2Statistics(curWeekDate, (WeekDetail: Array<number>) => {
         this.weekData = WeekDetail
       })
    console.log("chatting week check", JSON.stringify(this.curWeekDate))
  }
  aboutToAppear(){
     this.initDate()
    this.DiaryTable.getRdbStore(() => {
      this.DiaryTable.queryMonth2Statistics(this.curMonth + '%', (MonthDetail: Array<DiaryData>) => {
        this.monthData = MonthDetail;
        this.month_diary_count = this.monthData.length
        console.log('chatting weekDetail check 2', JSON.stringify(this.monthData) );
      })
    })

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
      }
      .width('100%')
      .height('7%')
      .backgroundColor(Color.White)

      Flex({
        direction: FlexDirection.Column,
        alignItems: ItemAlign.Center,
        justifyContent: FlexAlign.SpaceAround
      }){
        Row() { //月度统计
          Column({ space: 4 }) {
            Text('本月统计')
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Bold)
              .fontSize(24)
              .opacity(0.7)
              .alignSelf(ItemAlign.Start)
            Text('日记数量')
              .fontColor(Color.Black)
              .fontSize(22)
              .opacity(0.5)
              .alignSelf(ItemAlign.Start)
              .fontWeight(FontWeight.Bold)
            Text(this.month_diary_count.toString()).fontColor(Color.Black)
              .fontSize(34).alignSelf(ItemAlign.Start)

          }
          .alignItems(HorizontalAlign.Center)
          .justifyContent(FlexAlign.Center)
          .padding(5)
          .height('100%')
          .width('50%')

          Row(){
            Text(this.month_diary_count >= 20 ? '🤩' : '😢')
              .width('100%')
              .height('100%')
              .fontSize(120)
              .borderRadius(100)
          }
          .borderRadius(100)
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


        Row() { // 日记记录折线图
          McLineChart({
            options: {
              xAxis:{
                name: '日期',
                data:this.curWeekDate
              },
              yAxis:{
                name:'数量'
              },
              series:[
                {
                  name:'日记记录数',
                  data:this.weekData
                }
              ]
            }
          })
        }
        .width('100%')
        .height('50%')


      }
      .width("100%")
      .height('90%')
      .padding(24)
      .backgroundColor('#f1f3f5')

    }
    .width('100%')
    .height('100%')
  }
}

