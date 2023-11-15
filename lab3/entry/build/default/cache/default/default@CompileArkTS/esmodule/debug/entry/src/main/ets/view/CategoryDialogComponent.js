import router from '@ohos:router';
import promptAction from '@ohos:promptAction';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { EarnList, PayList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
export class CategoryDialogComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.scroller = new Scroller();
        this.__payList = new ObservedPropertyObjectPU(PayList, this, "payList");
        this.__PayGridLength = new ObservedPropertySimplePU('1fr 1fr 1fr 1fr', this, "PayGridLength");
        this.__EarnGridLength = new ObservedPropertySimplePU(this.PayGridLength, this, "EarnGridLength");
        this.__earnList = new ObservedPropertyObjectPU(EarnList, this, "earnList");
        this.__curType = new ObservedPropertySimplePU('', this, "curType");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.payList !== undefined) {
            this.payList = params.payList;
        }
        if (params.PayGridLength !== undefined) {
            this.PayGridLength = params.PayGridLength;
        }
        if (params.EarnGridLength !== undefined) {
            this.EarnGridLength = params.EarnGridLength;
        }
        if (params.earnList !== undefined) {
            this.earnList = params.earnList;
        }
        if (params.curType !== undefined) {
            this.curType = params.curType;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__payList.purgeDependencyOnElmtId(rmElmtId);
        this.__PayGridLength.purgeDependencyOnElmtId(rmElmtId);
        this.__EarnGridLength.purgeDependencyOnElmtId(rmElmtId);
        this.__earnList.purgeDependencyOnElmtId(rmElmtId);
        this.__curType.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__payList.aboutToBeDeleted();
        this.__PayGridLength.aboutToBeDeleted();
        this.__EarnGridLength.aboutToBeDeleted();
        this.__earnList.aboutToBeDeleted();
        this.__curType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get payList() {
        return this.__payList.get();
    }
    set payList(newValue) {
        this.__payList.set(newValue);
    }
    get PayGridLength() {
        return this.__PayGridLength.get();
    }
    set PayGridLength(newValue) {
        this.__PayGridLength.set(newValue);
    }
    get EarnGridLength() {
        return this.__EarnGridLength.get();
    }
    set EarnGridLength(newValue) {
        this.__EarnGridLength.set(newValue);
    }
    get earnList() {
        return this.__earnList.get();
    }
    set earnList(newValue) {
        this.__earnList.set(newValue);
    }
    get curType() {
        return this.__curType.get();
    }
    set curType(newValue) {
        this.__curType.set(newValue);
    }
    selectAccount(item) {
        this.curType = item.typeText;
    }
    aboutToAppear() {
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height('100%');
            Column.borderRadius({ topLeft: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.backgroundColor(0xF0F0F0);
            Column.align(Alignment.BottomEnd);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['half.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
            Scroll.create(this.scroller);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('支出');
            Text.fontSize(20);
            Text.width("40%");
            Text.height('10%');
            Text.padding(10);
            Text.alignSelf(ItemAlign.Start);
            Text.backgroundColor(0xF0F0F0);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Grid.create();
            Grid.columnsTemplate(this.PayGridLength);
            Grid.rowsTemplate(this.PayGridLength);
            Grid.width('100%');
            Grid.height('40%');
            Grid.backgroundColor(0xF0F0F0);
            if (!isInitialRender) {
                Grid.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true && (Grid.willUseProxy() === true);
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        GridItem.create(deepRenderFunction, isLazyCreate);
                        if (!isInitialRender) {
                            GridItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        GridItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Image.width({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize('10vp');
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: '6vp' });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Image.width({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize('10vp');
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: '6vp' });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.payList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('收入');
            Text.fontSize(20);
            Text.width("40%");
            Text.height('10%');
            Text.padding(10);
            Text.alignSelf(ItemAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Grid.create();
            Grid.columnsTemplate(this.PayGridLength);
            Grid.rowsTemplate(this.PayGridLength);
            Grid.width('100%');
            Grid.height('30%');
            Grid.backgroundColor(0xF0F0F0);
            if (!isInitialRender) {
                Grid.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true && (Grid.willUseProxy() === true);
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        GridItem.create(deepRenderFunction, isLazyCreate);
                        if (!isInitialRender) {
                            GridItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        GridItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Image.width({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize('10vp');
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: '6vp' });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.width({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.aspectRatio(CommonConstants.FULL_SIZE);
                            Column.padding({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            Column.align(Alignment.TopStart);
                            Column.backgroundColor(this.curType === item.typeText ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Column.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Image.width({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.fontSize('10vp');
                            Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.margin({ top: '6vp' });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.earnList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.width(CommonConstants.FULL_WIDTH);
            Button.height('5%');
            Button.onClick(() => {
                if (this.curType === '') {
                    promptAction.showToast({
                        message: '请先选择账目类型',
                        duration: 1000
                    });
                }
                else {
                    router.replaceUrl({
                        url: 'pages/CategorySelectedAccountsPage',
                        params: {
                            'category': this.curType
                        }
                    });
                }
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=CategoryDialogComponent.js.map