import router from '@ohos.router'
import http from '@ohos.net.http'
import CommonConstants from '../common/constants/CommonConstants'
import DiaryTable from '../common/database/tables/DiaryTable'
import { AnimationWidgets } from '../view/AnimationWidgets'
import DiaryData from '../viewmodel/DiaryData'
import { IconsModel } from '../viewmodel/IconsModel'
import { TagMap } from '../viewmodel/TagList'
import prompt from '@ohos.prompt'
import WeatherModel from '../viewmodel/WeatherModel'
import { httpWeatherGet } from '../utils/HttpUtil'



@CustomDialog
struct DiaryDetailDialog{
  controller?: CustomDialogController;
  private scroller: Scroller = new Scroller()
  @Link Diary: DiaryData;
  private TagMap: Map<string, Resource> = TagMap;
  private swiperController: SwiperController = new SwiperController();
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
        Column(){
          Swiper(this.swiperController){
            ForEach(this.Diary.picsStringList.split(','), (img: ResourceStr) => {
              Image(img)
                .width('100%')
                .height('100%')
                .borderRadius(10)
            })
          }
          .width('100%')
          .height('70%')

          Text(this.Diary.mainContent)
            .fontSize(30)
            .fontColor(Color.Black)
          Text(this.Diary.subContent)
            .fontSize(20)
            .fontColor(Color.Gray)

          Text(this.Diary.emojis)

          if(this.Diary.Tags !== ''){
            Button({type: ButtonType.Capsule}){
              Image(this.TagMap.get(this.Diary.Tags))
                .width('36vp')
                .height('36vp')
            }
            .backgroundColor(Color.White)

          }
        }
        .alignItems(HorizontalAlign.Start)
      }
      .scrollable(ScrollDirection.Vertical)
      .width(CommonConstants.FULL_WIDTH)
      .height('50%')
      .borderRadius($r('app.float.font_size_L'))
      .backgroundColor(0xF0F0F0)

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
struct MainPage {
  private defaultObject: Object = {
    'day': '',
    'day_wind_power': '',
    'night_wind_power': '',
    'night_weather_code':  '',
    'day_weather':'',
    'sun_begin_end':  '',
    'air_press':  '',
    'day_weather_code':  '',
    'night_weather_pic':  '',
    'night_weather': '',
    'jiangshui': '',
    'day_air_temperature':  '',
    'night_wind_direction':  '',
    'ziwaixian':  '',
    'weekday':  '',
    'night_air_temperature': '',
    'day_weather_pic':  '',
    'day_wind_direction': '',
  };
  private weekList: Array<string> = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  @State weatherData: WeatherModel = new WeatherModel(this.defaultObject);
  @State loadingHint: string = '';
  @State isRequestSucceed: boolean = false;
  @State city: string='';
  @State quantity: number = 3;
  @Provide iconModel: IconsModel = new IconsModel(this.quantity, CommonConstants.OFFSET_RADIUS);
  @State visible: boolean = true;
  @State offX: number = Math.random() * 400;
  @State offY: number = Math.random() * 400;
  @State handle2PopupList: Array<boolean> = [];
  private myScroller: Scroller = new Scroller();
  private curDate: Date = new Date();
  private TagMap: Map<string, Resource> = TagMap;
  @State hasData: boolean = false;
  @State curDateYear: string = this.curDate.getFullYear().toString();
  @State curDateString: string = this.curDate.getFullYear() + '-' + ( 1 + this.curDate.getMonth()) + '-' + this.curDate.getDate();
  @State curMonthString:string = (this.curDate.getMonth() + 1).toString();
  @State curDayString: string = this.curDate.getDate().toString();
  @State curWeekDay: number = this.curDate.getDay();
  private DiaryTable = new DiaryTable(() => {});
  @State allDiary: DiaryData[] = [];
  @State diary: DiaryData = null;
  DiaryDetailDialogController: CustomDialogController = new CustomDialogController({
    builder: DiaryDetailDialog({
      Diary: $diary
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })
  aboutToAppear(){
    this.DiaryTable.getRdbStore(() => {
      this.DiaryTable.DayQuerySortedByTime(this.curDateString, (res: DiaryData[]) => {
        this.allDiary = res
        console.log(CommonConstants.ALL_DATA_CHECK, `all diary data: ${JSON.stringify(res)}`)
        if(res.length !== 0){
          this.hasData = true;
          let len = res.length;
          this.handle2PopupList = Array(len).fill(false);
        }
      });

    })
    // this.getRequest(); //天气数据获取
  }

  //侧滑出现的组件
  @Builder itemEnd(item: DiaryData) {
    // 侧滑后尾端出现的组件
    Button({ type: ButtonType.Circle }) {
      Image($rawfile('delete.png'))
        .width('48vp')
        .height('48vp')
    }
    .onClick(() => {
      this.DiaryTable.deleteData(item, () => {
      })
      router.replaceUrl({
        url: 'pages/MainPage'
      })
    })
  }

  // 点击两次出现的popup
  @Builder popupBuilderWith2(item: DiaryData){
    Row(){
      Image($rawfile('删除.png'))
        .width('20%')
        .height(40)
        .alignSelf(ItemAlign.Center)
        .onClick(() => {
          this.DiaryTable.deleteData(item, () => {})
          router.replaceUrl({
            url: 'pages/MainPage'
          })
        })
      Image($rawfile('查看详情.png'))
        .width('20%')
        .height(40)
        .margin({
          left: 5
        })
        .alignSelf(ItemAlign.Center)
        .onClick(() => {
          this.diary = item
          this.DiaryDetailDialogController.open();
        })

    }
    .justifyContent(FlexAlign.Center)
    .alignItems(VerticalAlign.Center)
    .width('50%')
    .height(50)

  }
  // 拖拽时的组件
  @Builder dragButtonBuilder(){
    Button({ type: ButtonType.Circle, stateEffect: true }) {
      LoadingProgress().width(20).height(20).color(Color.Blue)
    }.width(55).height(55).backgroundColor(Color.Yellow)
  }
  //获取网络天气数据
  async getRequest() {
  // 每一个httpRequest对应一个http请求任务，不可复用
    let res = await httpWeatherGet('test')
    let res1 = res['result']
    let res2 = res1['showapi_res_body']
    let res3 = res2['f1']
    let weatherData: WeatherModel = new WeatherModel(res3)
    this.weatherData = weatherData
    console.log('chatting network check', JSON.stringify(this.weatherData))
  }

  build() {
   Column(){
     Stack({alignContent: Alignment.Center}){
       Row(){
         Text(this.curDateYear)
           .fontColor(Color.White)
           .fontSize(80)
           .width('100%')
           .height('100%')
           .margin({
             left: 100
           })
       }
       .width('100%')
       .height('100%')
       .zIndex(0)

       Row(){
         Row(){
           Column(){
             Row(){
               Text(this.weatherData.day_weather)
                 .width('30%')
                 .height('100%')
                 .fontSize(20)
               Image(this.weatherData.day_weather_pic)
                 .width('40%')
                 .height('60%')
             }
             .width('100%')
             .height('70%')
             Text(this.weatherData.day_air_temperature + '/' + this.weatherData.night_air_temperature + '℃')
               .width('100%')
               .height('30%')
               .fontSize(20)
           }
           .alignItems(HorizontalAlign.Center)
           .justifyContent(FlexAlign.Center)
           .margin({
             left:10
           })
           .width('100%')
           .height('100%')
         }
         .alignItems(VerticalAlign.Center)
         .justifyContent(FlexAlign.Center)
         .width('30%')
         .height('100%')

         Column(){
           Row(){
             Text(this.curMonthString + '月')
               .fontSize(15)
               .fontColor(Color.White)
           }
           .justifyContent(FlexAlign.Center)
           .alignItems(VerticalAlign.Center)
           .backgroundColor(Color.Blue)
           .borderRadius({
             topLeft: 40,
             topRight: 40,
           })
           .width('70%')
           .height('30%')
           Row(){
             Column(){
               Text(this.curDayString)
                 .fontColor(Color.Black)
                 .fontSize(20)
                 .fontWeight(FontWeight.Bold)
               Text(this.weekList[this.curWeekDay])
                 .fontColor(Color.Black)
                 .fontSize(15)
             }
             .width('100%')
             .height('100%')
           }
           .justifyContent(FlexAlign.Center)
           .alignItems(VerticalAlign.Center)
           .backgroundColor(Color.White)
           .width('70%')
           .height('70%')
         }
         .margin({
           left: 200
         })
         .width('20%')
         .height('100%')
       }
       .width('100%')
       .height('80%')
       .zIndex(1)
     }
     .width('100%')
     .height('10%')
     .backgroundColor($r('app.color.test'))
      Stack(){
        Column(){
          if(this.hasData === false){
            Image($rawfile('MainBk.png'))
              .width('100%')
              .height('100%')
          }else{
            // 结果展示
            Scroll(this.myScroller){
              List(){
                ForEach(this.allDiary, (Diary: DiaryData, index: number) => {
                  ListItem(){
                    Row(){
                      Column(){
                        Button({type: ButtonType.Capsule}){
                          Column(){
                            Text(Diary.HourMinuites)
                              .fontColor(Color.Black)
                              .fontSize(20)
                            Text(Diary.emojis)
                          }
                        }
                        .margin({
                          top: 50
                        })
                        .width('100%')
                        .height('30%')
                        .backgroundColor("#FFECECEC")
                      }

                      .backgroundColor($r('app.color.white'))
                      .width('20%')
                      .height('100%')

                      Column(){
                        Row(){
                          Grid(){
                            ForEach(Diary.picsStringList.split(','), (item: ResourceStr) => {
                              GridItem(){
                                Image(item)
                                  .width(Diary.picsStringList.split(',').length === 2 ? '100%' : '50%')
                                  .height('100%')
                                  .borderRadius(10)
                              }
                            })
                          }
                          .width('80%')
                          .height('100%')

                        }
                        .width('100%')
                        .height('70%')

                        Row(){
                          Text(Diary.mainContent)
                            .fontColor(Color.Black)
                            .fontSize(30)
                          .width('80%')
                            .textOverflow({ overflow: TextOverflow.Clip })
                            .maxLines(1)
                          if(Diary.Tags !== ''){
                            Button({type: ButtonType.Capsule}){
                              Image(this.TagMap.get(Diary.Tags))
                                .width('48vp')
                                .height('48vp')
                            }

                            .backgroundColor("#FFECECEC")
                            .width('20%')
                          }
                        }
                        .width('100%')
                        .height('20%')

                        Row(){
                          Text(Diary.subContent)
                            .fontColor(Color.Gray)
                            .fontSize(15)
                            .textOverflow({ overflow: TextOverflow.Clip })
                            .maxLines(1)

                        }
                        .width('100%')
                        .height('10%')
                      }
                      .width('80%')
                      .height('100%')
                      .backgroundColor(Color.White)
                    }
                    .width('100%')
                    .height('30%')
                    .padding(10)
                    .borderRadius(25)
                    .backdropBlur(8)
                    .linearGradient({
                      angle: 12,
                      colors: [
                        [0xffffff, 1],
                        [0xf1f3f5, 0.5]
                      ]
                    })
                  }
                  .swipeAction({
                    end: this.itemEnd.bind(this, Diary)
                  })
                  .margin({
                    top: 10
                  })
                  .gesture(
                    TapGesture({count: 2})
                      .onAction(() => {
                        this.handle2PopupList[index] = !this.handle2PopupList[index];
                      })
                  )// 双击事件
                  // 绑定popUp事件
                  .bindPopup(this.handle2PopupList[index], {
                    builder: this.popupBuilderWith2(Diary),
                    placement: Placement.Top,
                    popupColor: Color.White,
                    onStateChange: (e) => {
                      if(!e.isVisible){
                        this.handle2PopupList[index] = false;
                      }
                    }
                  })
                })
              }
            }
            .scrollable(ScrollDirection.Vertical)
          }
        }
        .width('100%')
        .height('100%')


        Row(){
          AnimationWidgets({
            quantity: $quantity
          })
        }
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Center)
        .borderRadius(100)
        .width(60).height(60).backgroundColor(0x317aff).margin({
          top: 500
        })
        .position({ x: this.offX, y: this.offY })
        .visibility(this.visible ? Visibility.Visible : Visibility.None)
        .onDragStart(() => {
          console.log('chatting\'s drag', 'start to drag');
          this.visible = false;
          return this.dragButtonBuilder()
        })
        .onDrop((event: DragEvent) => {
          console.log('chatting\'s drag', 'X: ' + event.getX() + ', y: ' + event.getY())
          let tmpX = Math.trunc(event.getX() - 30)
          let tmpY = Math.trunc(event.getY() - 40)
          if (tmpX < 0 || tmpY < 0) {
            return
          }
          this.offX = tmpX
          this.offY = tmpY
        })
        .onTouch((event: TouchEvent) => {
          if(event.type === TouchType.Up){
            this.visible = true;
          }
        })

      }
     .width('100%')
     .height('90%')
   }

    .width('100%')
    .height('100%')
    .backgroundColor('#f1f3f5')
  }
}