

import { IconsModel } from '../viewmodel/IconsModel';
import { IconAnimation } from './IconAnimation';
import Common from '../common/constants/CommonConstants';
import IconItem from '../viewmodel/IconItem';
import router from '@ohos.router';

@Component
export struct AnimationWidgets {
  @State mainFlag: boolean = false;
  @Link @Watch('onQuantityChange') quantity: number;
  @Consume iconModel: IconsModel;

  onQuantityChange() {
    this.iconModel.addImage(this.quantity);
  }

  aboutToAppear() {
    this.onQuantityChange();
  }

  animate() {
    animateTo(
      {
        delay: Common.DELAY_10,
        tempo: Common.TEMPO,
        iterations: 1,
        duration: Common.DURATION_500,
        curve: Curve.Smooth,
        playMode: PlayMode.Normal
      }, () => {
        this.mainFlag = !this.mainFlag;
    })
  }

  build() {
    Stack() {
      Stack() {
        ForEach(this.iconModel.imagerArr, (item: IconItem) => {
          IconAnimation({
            item: item,
            mainFlag: $mainFlag
          })
        }, (item: IconItem) => JSON.stringify(item.index))
      }
      .width(Common.DEFAULT_FULL_WIDTH)
      .height(Common.DEFAULT_FULL_HEIGHT)
      .rotate({
        x: 0,
        y: 0,
        z: 1,
        angle: this.mainFlag ? Common.ROTATE_ANGLE_360 : 0
      })

      Image(
          this.mainFlag
          ? $r("app.media.imgActive")
          : $r("app.media.imgInit")
      )
        .width('64vp')
        .height('64vp')
        .objectFit(ImageFit.Contain)
        .scale({
          x: this.mainFlag ? Common.INIT_SCALE : 1,
          y: this.mainFlag ? Common.INIT_SCALE : 1
        })
        .onClick(() => {
          this.iconModel.reset();
          this.animate();
        })

    }
    .width(Common.DEFAULT_FULL_WIDTH)
    .layoutWeight(1)

  }
}