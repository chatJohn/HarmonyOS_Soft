import formInfo from '@ohos.app.form.formInfo';
import formBindingData from '@ohos.app.form.formBindingData';
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';

import formProvider from '@ohos.app.form.formProvider';

//导入电池信息模块
import batteryInfo from '@ohos.batteryInfo';

export default class EntryFormAbility extends FormExtensionAbility {
  onAddForm(want) {

    //初始化卡片所携带的数据
    let formData = this.getBatteryInfo()
    return formBindingData.createFormBindingData(formData);
  }

  onCastToNormalForm(formId) {

  }

  onUpdateForm(formId) {
    //更新卡片所携带的数据
    let data = formBindingData.createFormBindingData(this.getBatteryInfo())
    formProvider.updateForm(formId,data)
  }

  onChangeFormVisibility(newStatus) {

  }

  onFormEvent(formId, message) {

  }

  onRemoveForm(formId) {

  }

  onAcquireFormState(want) {
    return formInfo.FormState.READY;
  }

  //新声明一个成员方法, 通过batteryInfo模块获取电池信息
  private getBatteryInfo(){
    return {
      'BatterySOC':batteryInfo.batterySOC,
      'BatteryTemperature':batteryInfo.batteryTemperature*0.1,
      'ChargingStatus':batteryInfo.chargingStatus,
      'BatteryHealthState':batteryInfo.BatteryHealthState
    }
  }

};