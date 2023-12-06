import router from '@ohos.router'
import CommonConstants from '../common/constants/CommonConstants';
import DiaryTable from '../common/database/tables/DiaryTable';
import DiaryData from '../viewmodel/DiaryData'
@Entry
@Component
struct TransPage {
  private testData: Array<DiaryData> = [
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-11-30","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-11-30","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-11-30","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-11-30","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-1","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-1","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-1","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-1","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-2","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-2","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-2","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-2","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-3","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-3","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-3","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-3","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-4","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-4","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-4","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-4","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-5","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-5","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-5","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-5","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-5","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-6","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-6","HourMinuites":"19:34","Tags":"","emojis":""},
    {"id":0,"mainContent":"很好广告法的","subContent":"电动车非常","picsStringList":"datashare:///media/image/99,datashare:///media/image/98,","date":"2023-12-6","HourMinuites":"19:34","Tags":"","emojis":""},
  ];
  private DiaryTable = new DiaryTable(() => {});
  onPageShow(){
    this.DiaryTable.getRdbStore(() => {
      this.testData.forEach(x => {
        this.DiaryTable.insertDate(x, ()=> {})
      })
    })
  }
  build() {
    Column(){
      Image($r('app.media.ic_logo'))
        .width("60vp")
        .height("60vp")
        .margin({
          bottom: '3.1%',
          top: '10%'
        })

      Column() {
        Text('极简日记')
          .fontSize(15)
      }
      .alignItems(HorizontalAlign.Start)
      .margin({
        left: '2.3%',
        bottom: '3.1%'
      })

      Text('美好的生活，值得记忆😘')
        .fontSize(15)
        .margin({
          top: 20,
          left: 15
        })
    }
    .backgroundImage($r('app.media.bk'))
    .backgroundImageSize(ImageSize.Cover)
    .height('100%')
    .width('100%')
    .onAppear(() => {
      animateTo({
        duration: 1000,
        onFinish: () => { // 到时间之后直接跳转
          setTimeout(() => {
            router.replaceUrl({
              url: 'pages/MainPage'
            })
          }, 1000)
        }
      }, () => {

      })
    })
  }
}