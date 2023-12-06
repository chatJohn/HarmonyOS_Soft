var Store = new LocalStorage()
@Entry
@Component
struct WidgetCard {
  /*
   * The title.
   */
  readonly TITLE: string = 'Hello World';

  /*
   * The action type.
   */
  readonly ACTION_TYPE: string = 'router';

  /*
   * The ability name.
   */
  readonly ABILITY_NAME: string = 'EntryAbility';

  /*
   * The message.
   */
  readonly MESSAGE: string = 'add detail';

  /*
   * The with percentage setting.
   */
  readonly FULL_WIDTH_PERCENT: string = '100%';

  /*
   * The height percentage setting.
   */
  readonly FULL_HEIGHT_PERCENT: string = '100%';

  //变量与本地数据库绑定
  @LocalStorageProp('BatterySOC') BatterySOC: number = 30
  @LocalStorageProp('BatteryTemperature') BatteryTemperature: number = 20
  @LocalStorageProp('ChargingStatus') ChargingStatus: boolean = true
  @LocalStorageProp('BatteryHealthState') BatteryHealthState: number = 1

  //用Array储存批量数据
  HealthState: Array<string> = ['正常', '未知', '过热', '过压', '低温', '僵死']

  build() {
    Row() {
      Column() {
        Column() {
          Row(){
            Column(){
              Text('晴')
                .fontSize(30)
                .fontColor(Color.White)
                .margin({
                  left:10
                })
              Text(17 + '/' + 7 + '℃')
                .fontColor(Color.White)
                .fontSize(20)
                .margin({
                  left: 10
                })
            }
            .justifyContent(FlexAlign.Center)
            .width('50%')
            .height('100%')
            Image($r('app.media.00'))
              .width('30%')
              .height('60%')
          }
          .width('100%')
          .height('100%')
        }
        .justifyContent(FlexAlign.Center)
        .backgroundImage($r('app.media.img'))
        .backgroundImageSize(ImageSize.Cover)
        .width('100%')
        .height('50%')
        //Stack组件,使得其子组件可以层叠布局
        Stack() {

          //Progress组件用于实现进度条
          Progress({
            total: 100,
            value: this.BatterySOC,
            type: ProgressType.Capsule
          })
            .width('89%')
            .height(30)
            .color(Color.Pink)

          //电量文本和充电图标
          Row() {

            Text(this.BatterySOC + '%')
              .fontSize(14)
              .fontWeight(700)

            if (this.ChargingStatus) {
              Image($rawfile('充电口电量.png'))
                .height(20)
                .width(10)
                .margin({
                  left: 2
                })
            }

          }

        }.layoutWeight(2)
        .width(this.FULL_WIDTH_PERCENT)

        Row() {

          //Image组件
          Image($rawfile('img_1.png'))
            .height('60%')
            .margin({
              left: 6
            })
            .layoutWeight(2)

          Column({
            space: 7
          }) {

            Text('电池温度: ' + this.BatteryTemperature + '℃')
              .fontSize(10)
              .fontWeight(700)
              .margin({
                top: 19
              })

            Text('电池状态: ' + this.HealthState[this.BatteryHealthState])
              .fontSize(10)
              .fontWeight(700)

            if (this.ChargingStatus) {
              Text('正在充电')
                .fontSize(10)
                .fontWeight(700)
            } else {
              Text('正在耗电')
                .fontSize(10)
                .fontWeight(700)
            }

          }
          .height(this.FULL_HEIGHT_PERCENT)
          .layoutWeight(3)

        }.layoutWeight(3)
        .width(this.FULL_WIDTH_PERCENT)

      }
      .width(this.FULL_WIDTH_PERCENT)
    }
    .height(this.FULL_HEIGHT_PERCENT)
    .onClick(() => {
      postCardAction(this, {
        "action": this.ACTION_TYPE,
        "abilityName": this.ABILITY_NAME,
        "params": {
          "message": this.MESSAGE
        }
      });
    })
  }
}