

import AccountTable from '../common/database/tables/AccountTable';
import AccountData from '../viewmodel/AccountData';
import CommonConstants from '../common/constants/CommonConstants';
import { DialogComponent } from '../view/DialogComponent';
import { ImageList } from '../viewmodel/AccountList';
import Logger from '../common/utils/Logger';
import HashSet from '@ohos.util.HashSet';
import DateAccountDataList from '../viewmodel/DateAccountDataList';
import router from '@ohos.router';
import { CategoryDialogComponent } from '../view/CategoryDialogComponent';
import { PicChartElement } from '../view/PieChartComponent';
@Entry
@Component
struct MainPage {
  private scroller: Scroller = new Scroller()
  @State inAccount: number = 0
  @State outAccount: number = 0
  @State accountWithDate: Array<DateAccountDataList> = new Array<DateAccountDataList>()
  @State accounts: Array<AccountData> = []
  @State searchText: string = '';
  @State isEdit: boolean = false;
  @State isInsert: boolean = false;
  @State newAccount: AccountData = { id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' };
  @State index: number = -1;
  private DailyDate: Date = new Date()
  @State MonthDateString: string = this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%'
  private AccountTable = new AccountTable(() => {});
  private deleteList: Array<AccountData> = [];
  @State month_pie_arr: PicChartElement[] = [] //饼图
  searchController: SearchController = new SearchController();
  dialogController: CustomDialogController = new CustomDialogController({
    builder: DialogComponent({
      isInsert: $isInsert,
      newAccount: $newAccount,
      confirm: (isInsert: boolean, newAccount: AccountData) => this.accept(isInsert, newAccount),
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })
  categoryDialogContorller: CustomDialogController = new CustomDialogController({
    builder: CategoryDialogComponent(),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })

  accept(isInsert: boolean, newAccount: AccountData): void {

    if (isInsert) {
      Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
      this.AccountTable.insertData(newAccount, (id: number) => {
        newAccount.id = id;
        this.accounts.push(newAccount);
        // if(this.accountDate.has(newAccount.date.toString()) === true){
        //   this.accountWithDate.forEach(x => {
        //     if(x.date.toString() === newAccount.date.toString()){
        //       x.accountDataList.push(newAccount)
        //     }
        //   })
        // }else{
        //   this.accountDate.add(newAccount.date.toString())
        //   this.accountWithDate.push(new DateAccountDataList(newAccount.date.toString(), new Array<AccountData>(newAccount)))
        // }
      });
    } else {
      this.AccountTable.updateData(newAccount, () => {
      });
      let list = this.accounts;
      this.accounts = [];
      list[this.index] = newAccount;
      this.accounts = list;
      this.index = -1;
    }

    // console.log('chatting check date length', this.accountDate.size.toString())
  }

   aboutToAppear() {
     this.AccountTable.getRdbStore( () => {
       this.AccountTable.query(0, (result: DateAccountDataList[]) => {
         this.accounts = [];
         console.log('chatting length callback', result.length);
         this.accountWithDate = result;
         console.log('chatting check accountWithDateInfo', this.accountWithDate.length.toString())
       }, true)


       this.AccountTable.month_query(this.MonthDateString, (resultIn: number[], resultOut: number[], res: PicChartElement[]) => {
         this.month_pie_arr = res
       })
     })
  }

  selectListItem(item: AccountData) {
    this.isInsert = false;
    this.index = this.accounts.indexOf(item);
    this.newAccount = {
      id: item.id,
      amount: item.amount,
      notes: item.notes,
      accountType: item.accountType,
      typeText: item.typeText,
      date: item.date
    };
  }

  deleteListItem() {
    for (let i = 0; i < this.deleteList.length; i++) {
      let index = this.accounts.indexOf(this.deleteList[i]);
      this.accounts.splice(index, 1);
      this.AccountTable.deleteData(this.deleteList[i], () => {
      });
    }
    this.deleteList = [];
    this.isEdit = false;
  }

  @Builder itemHead(ele: DateAccountDataList) {

    Row(){
      Text(ele.date)
        .fontSize(20)

        .width("40%")
        .padding(10)
      Blank()
        .width('10%')

      Image($rawfile('支出.png'))
        .width('10%')
        .padding(10)

      Text(ele.outAccount.toString())
        .fontSize(15)

        .width('15%')
        .padding(10)

      Image($rawfile('收入.png'))
        .padding(10)
        .width('10%')


      Text(ele.inAccount.toString())
        .fontSize(15)
        .width('15%')
        .padding(10)

    }
    .backgroundColor(0xFFFFFF)
  }

  //侧滑出现的组件
  @Builder itemEnd(item: AccountData) {
    // 侧滑后尾端出现的组件
    Button({ type: ButtonType.Circle }) {
      Image($rawfile('delete.png'))
        .width('48vp')
        .height('48vp')
    }
    .onClick(() => {
      this.AccountTable.deleteData(item, () => {})
      router.replaceUrl({
        url: 'pages/MainPage'
      })
    })
  }
  build() {
    Stack() {
      Column() {
        Row() {
          Select([{ value: '全部信息', icon: $rawfile('全部信息.png') },
            { value: '只看收入', icon: $rawfile('selector_in.png') },
            { value: '只看支出', icon: $rawfile('selector_out.png') },
            { value: '统计信息', icon: $rawfile('统计信息.png') }])
            .margin({
              left: 15
            })
            .selected(0)
            .value('全部信息')
            .font({ size: 16, weight: 500 })
            .fontColor('#182431')
            .selectedOptionFont({ size: 16, weight: 400 })
            .optionFont({ size: 16, weight: 400 })
            .onSelect((index: number) => {
              if(index === 0){
                this.AccountTable.query(0, (result: DateAccountDataList[]) => {
                  this.accountWithDate = result;
                }, true)
              }else if(index === 1){
                this.AccountTable.queryAccountType(1, (result: DateAccountDataList[]) => {
                  this.accountWithDate = result;
                })
              }else if(index === 2){
                this.AccountTable.queryAccountType(0, (result: DateAccountDataList[]) => {
                  this.accountWithDate = result;
                })
              }else if(index === 3){
                router.replaceUrl({
                  url: 'pages/StatisticsPage',
                  params:{
                    'pie': this.month_pie_arr
                  }

                })
              }
            })

          Row(){
            Row(){
              Text('全部类型')
                .fontSize($r('app.float.font_size_L'))
                .margin({
                  right: 3
                })
              Blank()
                .width(1)
                .backgroundColor($r('app.color.gray'))
              Image($rawfile('类型.png'))
                .width($r('app.float.component_size_S'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .margin({ right: $r('app.float.font_size_L') })
                .margin({
                  left: 3
                })
            }
            .onClick(() => {
              this.categoryDialogContorller.open()
            })
            Image($rawfile('ic_public_edit.svg'))
              .width($r('app.float.component_size_S'))
              .aspectRatio(CommonConstants.FULL_SIZE)

              .onClick(() => {
                this.isEdit = true;
              })
              .margin({
                left: 8
              })
          }
          .margin({ right: $r('app.float.font_size_L') })



        }
        .width(CommonConstants.FULL_WIDTH)
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

        Row() {
          Search({
            value: this.searchText,
            placeholder: '搜索你的记账记录😊',
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

              if (searchValue === '') {
                this.AccountTable.query(0, (result: DateAccountDataList[]) => {
                  this.accountWithDate = result
                  console.log('chatting check all data', result[0].date)
                }, true);
              } else if(searchValue.match(new RegExp('[1-9][0-9]*')) !== null){ // 根据金额查找
                this.AccountTable.query(Number(searchValue), (result: DateAccountDataList[]) => {
                  this.accountWithDate = result
                }, false);
              }else if(searchValue.match(new RegExp('类型[\W]*')) !== null){
                this.AccountTable.queryCategory(searchValue.substring(2), (res: DateAccountDataList[]) => {
                  this.accountWithDate = res
                })
              }else{ // 根据备注搜索
                this.AccountTable.queryNotes(searchValue, (result: DateAccountDataList[]) => {
                  this.accountWithDate = result
                });
              }

            })
        } // search bar
        .width(CommonConstants.FULL_WIDTH)
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') })


            Row() {
              Scroll(this.scroller){
                List({ space: CommonConstants.FULL_SIZE }) {
                  ForEach(this.accountWithDate, (it: DateAccountDataList) => {

                    ListItemGroup({
                      header: this.itemHead(it)
                    }){
                      ForEach(it.accountDataList, (item: AccountData) =>{
                        ListItem() {
                          Row() {
                            Image(ImageList[item.typeText])
                              .width($r('app.float.component_size_M'))
                              .aspectRatio(CommonConstants.FULL_SIZE)
                              .margin({ right: $r('app.float.edge_size_MP') })

                            Column(){
                              Text(item.typeText)
                                .height($r('app.float.component_size_SM'))
                                .fontSize($r('app.float.font_size_M'))
                                .alignSelf(ItemAlign.Start)
                              Row(){
                                Text(item.date + ' | ')
                                  .fontColor($r('app.color.gray'))
                                  .fontSize('10vp')
                                Text(item.notes)
                                  .fontColor($r('app.color.gray'))
                                  .fontSize('10vp')
                              }
                            }
                            .height($r('app.float.component_size_SM'))

                            Blank()
                              .layoutWeight(1)

                            if (!this.isEdit) {
                              Text(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString())
                                .fontSize($r('app.float.font_size_M'))
                                .fontColor(item.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.in_color'))
                                .align(Alignment.End)
                                .flexGrow(CommonConstants.FULL_SIZE)
                            } else {
                              Row() {
                                Toggle({ type: ToggleType.Checkbox })
                                  .onChange((isOn) => {
                                    if (isOn) {
                                      this.deleteList.push(item);
                                    } else {
                                      let index = this.deleteList.indexOf(item);
                                      this.deleteList.splice(index, 1);
                                    }
                                  })
                              }
                              .align(Alignment.End)
                              .flexGrow(CommonConstants.FULL_SIZE)
                              .justifyContent(FlexAlign.End)
                            }

                          }
                          .width(CommonConstants.FULL_WIDTH)
                          .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
                        }
                        .swipeAction({ // 侧滑属性
                          end: this.itemEnd.bind(this, item)
                        })
                        .width(CommonConstants.FULL_WIDTH)
                        .height($r('app.float.component_size_LM'))
                        .onClick(() => {
                          this.selectListItem(item);
                          this.dialogController.open();
                        })
                      })
                    }

                  })
                }
                .listDirection(Axis.Vertical)
                .width(CommonConstants.FULL_WIDTH)
                .borderRadius($r('app.float.radius_size_L'))
                .backgroundColor(Color.White)
              }
              .scrollable(ScrollDirection.Vertical)  // 滚动方向纵向
              .scrollBar(BarState.On)  // 滚动条常驻显示
              .scrollBarColor(Color.Gray)  // 滚动条颜色
              .scrollBarWidth(5) // 滚动条宽度
            }
            .width(CommonConstants.FULL_WIDTH)
            .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
            .margin({ top: $r('app.float.edge_size_SM') })


      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)

      if (!this.isEdit) {
        Button() {
          Row(){
            Image($rawfile('add.png'))
              .width('30vp')
              .height('48vp')
            Text('记一笔')
              .fontColor($r('app.color.white'))
              .fontSize(15)
              .height('48vp')
              .width('70vp')
          }.width('80vp')
          .height('48vp')
        }
        .width('120vp')
        .height($r('app.float.component_size_MP'))
        .position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y })
        .onClick(() => {
          this.isInsert = true;
          this.newAccount = { id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' };
          this.dialogController.open();
        })

      }

      if (this.isEdit) {
        Button() {
          Image($rawfile('delete.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .backgroundColor($r('app.color.background_color'))
        .markAnchor({ x: $r('app.float.mark_anchor'), y: CommonConstants.MINIMUM_SIZE })
        .position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y })
        .onClick(() => {
          this.deleteListItem();
          router.replaceUrl({
            url: 'pages/MainPage'
          })

        })
      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .backgroundColor($r('app.color.background_color'))
  }
}