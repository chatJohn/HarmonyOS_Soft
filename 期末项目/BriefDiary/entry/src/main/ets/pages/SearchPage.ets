import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants'
import DiaryTable from '../common/database/tables/DiaryTable';
import DiaryData from '../viewmodel/DiaryData';
import { TagMap } from '../viewmodel/TagList';
@Entry
@Component
struct SearchPage {
  private TagMap: Map<string, Resource> = TagMap;
  @State message: string = 'Hello World'
  @State searchText: string = ''
  searchController: SearchController = new SearchController();
  private myScroller: Scroller = new Scroller();
  private curDate: Date = new Date();
  @State curDateString: string = this.curDate.getFullYear() + '-' + ( 1 + this.curDate.getMonth()) + '-' + this.curDate.getDate();
  @State allDiary: DiaryData[] = [];
  private DiaryTable = new DiaryTable(() => {});
  aboutToAppear(){
    this.DiaryTable.getRdbStore(() => {
      this.DiaryTable.DayQuerySortedByTime(this.curDateString, (res: DiaryData[]) => {
        this.allDiary = res
        console.log(CommonConstants.ALL_DATA_CHECK, `all diary data: ${JSON.stringify(res)}`)
      });
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

      Row() {
        Search({
          value: this.searchText,
          placeholder: '搜索你的日记记录😊',
          controller: this.searchController
        })
          .width(CommonConstants.FULL_WIDTH)
          .borderRadius($r('app.float.radius_size_M'))
          .borderWidth($r('app.float.border_size_S'))
          .borderColor($r('app.color.border_color'))
          .placeholderFont({ size: $r('app.float.font_size_M') })
          .textFont({ size: $r('app.float.font_size_M') })
          .backgroundColor(Color.White)
          .onChange((searchValue: string) => {
            this.searchText = searchValue;
          })
          .onSubmit((searchValue: string) => {
            if(searchValue === ''){
              this.DiaryTable.query(0, (res: Array<DiaryData>) => {
                this.allDiary = res;
              }, true);
            }else if(searchValue.match(new RegExp('[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}'))){
              this.DiaryTable.DayQuerySortedByTime(searchValue, (res: Array<DiaryData>) => {
                this.allDiary = res
              })
            }else if(searchValue.match(new RegExp('Tag:[\W]*'))){
              this.DiaryTable.queryTag(searchValue.substr(4), (res: Array<DiaryData> ) => {
                this.allDiary = res;
              })
            }else{
              this.DiaryTable.queryEmoji(searchValue, (res: Array<DiaryData>) => {
                this.allDiary = res;
              })
            }
          })
      } // search bar
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
      .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') })

      //搜索内容展示
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
                      .textOverflow({ overflow: TextOverflow.Clip })
                      .maxLines(1)
                    .width('80%')
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

            .margin({
              top: 10
            })

          })
        }
      }
      .scrollable(ScrollDirection.Vertical)

    }
    .width('100%')
    .height('100%')
  }
}