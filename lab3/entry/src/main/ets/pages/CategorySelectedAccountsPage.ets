import router from '@ohos.router'
import CommonConstants from '../common/constants/CommonConstants'
import AccountTable from '../common/database/tables/AccountTable'
import Logger from '../common/utils/Logger'
import { DialogComponent } from '../view/DialogComponent'
import AccountData from '../viewmodel/AccountData'
import { ImageList } from '../viewmodel/AccountList'
import DateAccountDataList from '../viewmodel/DateAccountDataList'
@Entry
@Component
struct CategorySelectedAccountsPage {
  @State category: string = ''
  @State index: number = -1;
  private scroller: Scroller = new Scroller()
  @State isInsert: boolean = false;
  @State newAccount: AccountData = { id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' };
  @State accounts: Array<AccountData> = []
  @State accountWithDate: Array<DateAccountDataList> = new Array<DateAccountDataList>()
  private AccountTable = new AccountTable(() => {});
  dialogController: CustomDialogController = new CustomDialogController({
    builder: DialogComponent({
      isInsert: $isInsert,
      newAccount: $newAccount,
      confirm: (isInsert: boolean, newAccount: AccountData) => this.accept(isInsert, newAccount),

    }),
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
    let params = router.getParams()
    this.category = params['category']
    this.AccountTable.getRdbStore( () => {
      this.AccountTable.queryCategory(this.category, (result: DateAccountDataList[]) => {
        console.log('chatting category length callback', result.length);
        this.accountWithDate = result;
        console.log('chatting check category accountWithDateInfo', this.accountWithDate.length.toString())
      });
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

  build() {
    Column() {
      Row() {
        Text($r('app.string.MainAbility_label')) //topBar
          .height($r('app.float.component_size_SP'))
          .fontSize($r('app.float.font_size_L'))
          .margin({ left: $r('app.float.font_size_L') })

        Image($rawfile('退出.png'))
          .width($r('app.float.component_size_S'))
          .aspectRatio(CommonConstants.FULL_SIZE)
          .margin({ right: $r('app.float.font_size_L') })
          .margin({
            left: 3
          })
          .onClick(() => {
            router.replaceUrl({
              url: 'pages/MainPage'
            })
          })
      }
      .width(CommonConstants.FULL_WIDTH)
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

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


                      Text(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString())
                        .fontSize($r('app.float.font_size_M'))
                        .fontColor(item.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.in_color'))
                        .align(Alignment.End)
                        .flexGrow(CommonConstants.FULL_SIZE)

                  }
                  .width(CommonConstants.FULL_WIDTH)
                  .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
                }
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
    .height('100%')
    .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
    .margin({ top: $r('app.float.edge_size_SM') })
  }
}