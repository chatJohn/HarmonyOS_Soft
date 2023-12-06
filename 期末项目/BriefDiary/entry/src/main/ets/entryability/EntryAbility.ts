import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import Logger from '@ohos/imagelibrary/src/main/ets/components/data/Logger';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
const TAG: string = 'MainAbility'
export default class EntryAbility extends UIAbility {
  async onCreate(want, launchParam) {
    Logger.info(TAG, `[Demo] MainAbility onCreate`)
    let atManager = abilityAccessCtrl.createAtManager()
    try {
      atManager.requestPermissionsFromUser(this.context, ['ohos.permission.READ_MEDIA', 'ohos.permission.WRITE_MEDIA', 'ohos.permission.MEDIA_LOCATION']).then((data) => {
        Logger.info(TAG, `data: ${JSON.stringify(data)}`)
      }).catch((err) => {
        Logger.info(TAG, `err: ${JSON.stringify(err)}`)
      })
    } catch (err) {
      Logger.info(TAG, `catch err->${JSON.stringify(err)}`);
    }
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/TransPage', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
