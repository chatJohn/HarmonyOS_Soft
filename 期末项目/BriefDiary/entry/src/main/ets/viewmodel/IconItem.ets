

import Point from './Point';

@Observed
export default class IconItem {
  index: number = 0;
  clicked: boolean = false;
  image: Resource = $r('app.media.badge1');
  point: Point = new Point(0, 0);

  constructor(index: number, image: Resource, clicked: boolean, point: Point) {
    this.index = index;
    this.image = image;
    this.clicked = clicked;
    this.point = point;
  }
}