



@Component
export struct CustomPieChart {
  // 饼图数据
  private picChartElements: PicChartElement[]
  // 圆半径
  @State circle_radius:number = 50
  // 单位
  @State unit: string = "元"
  // 获取上下文
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private scroller: Scroller = new Scroller()
  build() {
    Column({space: 30}) {
      Canvas(this.context)
        // 高度为半径2倍
        .height(this.circle_radius * 2)
          // 纵横比，宽度和高度一样
        .aspectRatio(1)
          // 画布组件的事件回调，可以在此时进行绘制
        .onReady(() => {
          this.picChartElements.forEach((item) => {
            // 创建一个新的控制路径
            this.context.beginPath()
            // 路径从当前点移动到指定点
            this.context.moveTo(this.circle_radius, this.circle_radius)
            // 绘制弧线路径(弧线圆心的x坐标值,弧线圆心的y坐标值,弧线的圆半径,弧线的起始弧度,弧线的终止弧度)
            this.context.arc(this.circle_radius, this.circle_radius, this.circle_radius, item.beginAngle, item.endAngle)
            // 指定绘制的填充色
            this.context.fillStyle = item.color
            // 对封闭路径进行填充
            this.context.fill()
          })
        })


      Scroll(this.scroller){
        List(){
          ForEach(this.picChartElements, (item: PicChartElement) => {
            ListItem(){
              Row(){
                // 标注圆点颜色
                Circle({ width: 8, height: 8 }).fill(item.color)
                // 标注文本
                Text(item.element).fontSize(12).margin({
                  left: 5
                })
                // 标注数量
                Text(item.quantity + ' ' + this.unit).fontSize(12).margin({
                  left: 5
                })
              }
            }
            .height(20)
          })
        }
      }
      .height(30)
      .scrollable(ScrollDirection.Vertical)
      .width('100%')
      .margin({
        left: 50
      })
    }
    .width('100%')
  }

}

export class PicChartElement {
  element: Resource | string  // 显示文本
  quantity: number            // 数量
  percent: number             // 百分比
  beginAngle: number          // 弧线的起始弧度
  endAngle: number            // 弧线的终止弧度
  color: string               // 颜色
  accountType: number
  constructor(element: Resource | string, quantity: number, color: string, accountType: number) {
    this.element = element
    this.quantity = quantity
    this.color = color
    this.accountType = accountType
  }
}
