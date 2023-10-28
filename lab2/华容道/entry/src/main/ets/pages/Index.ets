@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column({space:20}) {
      Text('item1').backgroundColor(Color.Red)
      Text('item2').backgroundColor(Color.Blue)
      Text('item3').backgroundColor(Color.Gray).fontSize('40')
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
  }
}