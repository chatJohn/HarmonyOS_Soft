import { ChoicePhotos } from '@ohos/imagelibrary'

@Entry
@Component
struct ChoicePhoto {
  build() {
    Column() {
      ChoicePhotos()
    }
  }
}