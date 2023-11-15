import prompt from '@ohos:promptAction';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { PayList, EarnList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import router from '@ohos:router';
export class DialogComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.__isInsert = new SynchedPropertySimpleTwoWayPU(params.isInsert, this, "isInsert");
        this.__newAccount = new SynchedPropertyObjectTwoWayPU(params.newAccount, this, "newAccount");
        this.confirm = undefined;
        this.scroller = new Scroller();
        this.inputAmount = '';
        this.__payList = new ObservedPropertyObjectPU(PayList, this, "payList");
        this.__earnList = new ObservedPropertyObjectPU(EarnList, this, "earnList");
        this.__bgColor = new ObservedPropertySimplePU('', this, "bgColor");
        this.__curIndex = new ObservedPropertySimplePU(0, this, "curIndex");
        this.__curType = new ObservedPropertySimplePU('', this, "curType");
        this.selectedDate = new Date();
        this.__selectedDateString = new ObservedPropertySimplePU(this.selectedDate.getFullYear() + '-' + (this.selectedDate.getMonth() + 1) + '-' + this.selectedDate.getDate()
        // 备注
        , this, "selectedDateString");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.inputAmount !== undefined) {
            this.inputAmount = params.inputAmount;
        }
        if (params.payList !== undefined) {
            this.payList = params.payList;
        }
        if (params.earnList !== undefined) {
            this.earnList = params.earnList;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.curIndex !== undefined) {
            this.curIndex = params.curIndex;
        }
        if (params.curType !== undefined) {
            this.curType = params.curType;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.selectedDateString !== undefined) {
            this.selectedDateString = params.selectedDateString;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__payList.purgeDependencyOnElmtId(rmElmtId);
        this.__earnList.purgeDependencyOnElmtId(rmElmtId);
        this.__bgColor.purgeDependencyOnElmtId(rmElmtId);
        this.__curIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__curType.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDateString.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__payList.aboutToBeDeleted();
        this.__earnList.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__curIndex.aboutToBeDeleted();
        this.__curType.aboutToBeDeleted();
        this.__selectedDateString.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get isInsert() {
        return this.__isInsert.get();
    }
    set isInsert(newValue) {
        this.__isInsert.set(newValue);
    }
    get newAccount() {
        return this.__newAccount.get();
    }
    set newAccount(newValue) {
        this.__newAccount.set(newValue);
    }
    get payList() {
        return this.__payList.get();
    }
    set payList(newValue) {
        this.__payList.set(newValue);
    }
    get earnList() {
        return this.__earnList.get();
    }
    set earnList(newValue) {
        this.__earnList.set(newValue);
    }
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue) {
        this.__bgColor.set(newValue);
    }
    get curIndex() {
        return this.__curIndex.get();
    }
    set curIndex(newValue) {
        this.__curIndex.set(newValue);
    }
    get curType() {
        return this.__curType.get();
    }
    set curType(newValue) {
        this.__curType.set(newValue);
    }
    get selectedDateString() {
        return this.__selectedDateString.get();
    }
    set selectedDateString(newValue) {
        this.__selectedDateString.set(newValue);
    }
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue) {
        this.__inputText.set(newValue);
    }
    TabBuilder(index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/DialogComponent.ets(32:5)");
            Column.width({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777230, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.margin({ bottom: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.border(this.curIndex === index ? {
                width: { bottom: { "id": 16777219, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                color: { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            } : { color: Color.White });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(index === 0 ? { "id": 16777266, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.debugLine("view/DialogComponent.ets(33:7)");
            Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(this.curIndex === index ? { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : Color.Gray);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        this.inputAmount = this.newAccount.amount.toString();
        this.curIndex = this.newAccount.accountType;
        this.curType = this.newAccount.typeText;
    }
    selectAccount(item) {
        this.newAccount.accountType = item.accountType;
        this.newAccount.typeText = item.typeText;
        this.curType = item.typeText;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/DialogComponent.ets(59:5)");
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(this.newAccount.id === 0 ? CommonConstants.DIALOG_HEIGHT : '100%');
            Column.borderRadius({ topLeft: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.backgroundColor(Color.White);
            Column.align(Alignment.BottomEnd);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['half.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("view/DialogComponent.ets(60:7)");
            Image.width({ "id": 16777221, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.onClick(() => {
                var _a;
                (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({ barPosition: BarPosition.Start, index: this.curIndex });
            Tabs.debugLine("view/DialogComponent.ets(67:7)");
            Tabs.width(CommonConstants.FULL_WIDTH);
            Tabs.height(CommonConstants.TABS_HEIGHT);
            Tabs.vertical(false);
            Tabs.barMode(BarMode.Fixed);
            Tabs.onChange((index) => {
                this.curIndex = index;
            });
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Scroll.create(this.scroller);
                    Scroll.debugLine("view/DialogComponent.ets(69:11)");
                    Scroll.scrollable(ScrollDirection.Horizontal);
                    Scroll.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        Scroll.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("view/DialogComponent.ets(70:13)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.debugLine("view/DialogComponent.ets(72:17)");
                            Column.width({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.onClick(() => {
                                this.selectAccount(item);
                            });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                            Image.debugLine("view/DialogComponent.ets(73:19)");
                            Image.width({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.debugLine("view/DialogComponent.ets(77:19)");
                            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.payList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                Row.pop();
                Scroll.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 0);
                } });
            TabContent.margin({ bottom: { "id": 16777231, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TabContent.debugLine("view/DialogComponent.ets(68:9)");
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Scroll.create(this.scroller);
                    Scroll.debugLine("view/DialogComponent.ets(102:11)");
                    Scroll.scrollable(ScrollDirection.Horizontal);
                    Scroll.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        Scroll.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("view/DialogComponent.ets(103:13)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.debugLine("view/DialogComponent.ets(105:17)");
                            Column.width({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.onClick(() => {
                                this.selectAccount(item);
                            });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                            Image.debugLine("view/DialogComponent.ets(106:19)");
                            Image.width({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.debugLine("view/DialogComponent.ets(110:19)");
                            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.earnList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                Row.pop();
                Scroll.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 1);
                } });
            TabContent.margin({ bottom: { "id": 16777231, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            TabContent.debugLine("view/DialogComponent.ets(101:9)");
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        Tabs.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/DialogComponent.ets(142:7)");
            Column.width(CommonConstants.FULL_WIDTH);
            Column.padding({ left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.debugLine("view/DialogComponent.ets(143:9)");
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/DialogComponent.ets(148:9)");
            Column.height({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: { "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                text: this.newAccount.amount === 0 ? this.inputAmount : this.newAccount.amount.toString()
            });
            TextInput.debugLine("view/DialogComponent.ets(149:11)");
            TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
            TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Number);
            TextInput.onChange((value) => {
                this.inputAmount = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //添加选择时间的功能
            Row.create();
            Row.debugLine("view/DialogComponent.ets(171:7)");
            //添加选择时间的功能
            Row.width('100%');
            //添加选择时间的功能
            Row.margin({
                top: 10
            });
            if (!isInitialRender) {
                //添加选择时间的功能
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newAccount.id === 0 ? '添加时间' : '记录时间');
            Text.debugLine("view/DialogComponent.ets(172:9)");
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontStyle(FontStyle.Italic);
            Text.width('30%');
            Text.alignSelf(ItemAlign.Start);
            Text.padding({
                left: '10vp'
            });
            Text.margin({
                top: 10
            });
            Text.onClick(() => {
                DatePickerDialog.show({
                    start: new Date("2000-1-1"),
                    end: new Date("2100-12-31"),
                    selected: this.selectedDate,
                    onAccept: (value) => {
                        // 通过Date的setFullYear方法设置按下确定按钮时的日期，这样当弹窗再次弹出时显示选中的是上一次确定的日期
                        this.selectedDate.setFullYear(value.year, value.month, value.day);
                        console.info('chatting' + value.year.toString() + '-' + value.month.toString() + '-' + value.day.toString());
                        this.selectedDateString = this.selectedDate.getFullYear() + '-' + (this.selectedDate.getMonth() + 1) + '-' + this.selectedDate.getDate();
                    },
                    onCancel: () => {
                    },
                });
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newAccount.date === '' ? this.selectedDateString : this.newAccount.date);
            Text.debugLine("view/DialogComponent.ets(201:9)");
            Text.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontStyle(FontStyle.Italic);
            Text.width('70%');
            Text.margin({
                top: 10,
                left: 150
            });
            Text.padding({
                right: '10vp'
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        //添加选择时间的功能
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //添加备注的功能
            Row.create();
            Row.debugLine("view/DialogComponent.ets(219:7)");
            //添加备注的功能
            Row.width('100%');
            //添加备注的功能
            Row.margin({
                top: 5
            });
            if (!isInitialRender) {
                //添加备注的功能
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newAccount.id === 0 ? '添加备注' : '备注');
            Text.debugLine("view/DialogComponent.ets(220:9)");
            Text.fontColor({ "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize(20);
            Text.fontStyle(FontStyle.Italic);
            Text.width('30%');
            Text.alignSelf(ItemAlign.Start);
            Text.padding({
                left: '10vp'
            });
            Text.margin({
                top: 10
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: '请添加备注',
                text: this.newAccount.notes === '' ? this.inputText : this.newAccount.notes
            });
            TextInput.debugLine("view/DialogComponent.ets(232:9)");
            TextInput.onChange((str) => {
                this.inputText = str;
            });
            TextInput.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            TextInput.fontSize(20);
            TextInput.fontStyle(FontStyle.Italic);
            TextInput.margin({
                top: 10,
                left: 80,
                right: 100
            });
            TextInput.padding({
                right: '10vp'
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        //添加备注的功能
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/DialogComponent.ets(260:7)");
            Column.layoutWeight(CommonConstants.FULL_SIZE);
            Column.padding({
                bottom: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                left: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            Column.justifyContent(FlexAlign.End);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("view/DialogComponent.ets(261:9)");
            Button.width(CommonConstants.FULL_WIDTH);
            Button.height({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => {
                var _a;
                if (this.newAccount.typeText === '' || this.curIndex !== this.newAccount.accountType) {
                    prompt.showToast({ message: CommonConstants.TOAST_TEXT_1, bottom: CommonConstants.PROMPT_BOTTOM });
                }
                else {
                    let regex = new RegExp('[1-9][0-9]*');
                    let matchValue = this.inputAmount.match(regex);
                    if (matchValue !== null && matchValue[0] === this.inputAmount) {
                        this.newAccount.amount = Number(this.inputAmount);
                        this.newAccount.date = this.selectedDateString;
                        this.newAccount.notes = this.inputText;
                        this.confirm && this.confirm(this.isInsert, ObservedObject.GetRawObject(this.newAccount));
                        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
                    }
                    else {
                        prompt.showToast({ message: CommonConstants.TOAST_TEXT_2, bottom: CommonConstants.PROMPT_BOTTOM });
                    }
                }
                router.replaceUrl({
                    url: 'pages/MainPage'
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.debugLine("view/DialogComponent.ets(262:11)");
            Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=DialogComponent.js.map