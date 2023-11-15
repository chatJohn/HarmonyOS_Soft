import router from '@ohos:router';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
export class MonthDialogComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.scroller = new Scroller();
        this.__MonthList = new ObservedPropertyObjectPU(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], this, "MonthList");
        this.__YearList = new ObservedPropertyObjectPU(['2021', '2022', '2023'], this, "YearList");
        this.__GridLength = new ObservedPropertySimplePU('1fr 1fr 1fr 1fr', this, "GridLength");
        this.__curMonth = new ObservedPropertySimplePU('', this, "curMonth");
        this.__curYear = new ObservedPropertySimplePU('', this, "curYear");
        this.AccountTable = new AccountTable(() => { });
        this.__result = new ObservedPropertyObjectPU([], this, "result");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.MonthList !== undefined) {
            this.MonthList = params.MonthList;
        }
        if (params.YearList !== undefined) {
            this.YearList = params.YearList;
        }
        if (params.GridLength !== undefined) {
            this.GridLength = params.GridLength;
        }
        if (params.curMonth !== undefined) {
            this.curMonth = params.curMonth;
        }
        if (params.curYear !== undefined) {
            this.curYear = params.curYear;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__MonthList.purgeDependencyOnElmtId(rmElmtId);
        this.__YearList.purgeDependencyOnElmtId(rmElmtId);
        this.__GridLength.purgeDependencyOnElmtId(rmElmtId);
        this.__curMonth.purgeDependencyOnElmtId(rmElmtId);
        this.__curYear.purgeDependencyOnElmtId(rmElmtId);
        this.__result.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__MonthList.aboutToBeDeleted();
        this.__YearList.aboutToBeDeleted();
        this.__GridLength.aboutToBeDeleted();
        this.__curMonth.aboutToBeDeleted();
        this.__curYear.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get MonthList() {
        return this.__MonthList.get();
    }
    set MonthList(newValue) {
        this.__MonthList.set(newValue);
    }
    get YearList() {
        return this.__YearList.get();
    }
    set YearList(newValue) {
        this.__YearList.set(newValue);
    }
    get GridLength() {
        return this.__GridLength.get();
    }
    set GridLength(newValue) {
        this.__GridLength.set(newValue);
    }
    get curMonth() {
        return this.__curMonth.get();
    }
    set curMonth(newValue) {
        this.__curMonth.set(newValue);
    }
    get curYear() {
        return this.__curYear.get();
    }
    set curYear(newValue) {
        this.__curYear.set(newValue);
    }
    get result() {
        return this.__result.get();
    }
    set result(newValue) {
        this.__result.set(newValue);
    }
    selectItem(month, year) {
        this.curMonth = month;
        this.curYear = year;
        this.AccountTable.getRdbStore(() => {
            this.AccountTable.month_query(year + '-' + month.substring(0, month.length - 1) + '-%', (resultIn, resultOut, result) => {
                this.result = result;
            });
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/MonthDialogComponent.ets(30:5)");
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height('100%');
            Column.borderRadius({ topLeft: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
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
            Image.debugLine("view/MonthDialogComponent.ets(31:7)");
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
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("view/MonthDialogComponent.ets(40:11)");
                    Column.width('100%');
                    Column.height('30%');
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(item);
                    Text.debugLine("view/MonthDialogComponent.ets(41:13)");
                    Text.fontSize(20);
                    Text.width("40%");
                    Text.height('20%');
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
                    Grid.debugLine("view/MonthDialogComponent.ets(48:13)");
                    Grid.columnsTemplate(this.GridLength);
                    Grid.rowsTemplate(this.GridLength);
                    Grid.width('100%');
                    Grid.height('80%');
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
                        const it = _item;
                        {
                            const isLazyCreate = true && (Grid.willUseProxy() === true);
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                GridItem.create(deepRenderFunction, isLazyCreate);
                                GridItem.aspectRatio(CommonConstants.FULL_SIZE);
                                GridItem.padding({ top: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                GridItem.margin({ top: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                GridItem.align(Alignment.TopStart);
                                GridItem.backgroundColor(this.curMonth === it && this.curYear === item ? { "id": 16777251, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                GridItem.borderRadius({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                GridItem.onClick(() => {
                                    this.selectItem(it, item);
                                });
                                GridItem.debugLine("view/MonthDialogComponent.ets(50:17)");
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
                                    Text.create(it);
                                    Text.debugLine("view/MonthDialogComponent.ets(51:19)");
                                    Text.fontSize(30);
                                    Text.fontColor(Color.Black);
                                    Text.margin({ top: '6vp' });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                GridItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(it);
                                    Text.debugLine("view/MonthDialogComponent.ets(51:19)");
                                    Text.fontSize(30);
                                    Text.fontColor(Color.Black);
                                    Text.margin({ top: '6vp' });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
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
                    this.forEachUpdateFunction(elmtId, this.MonthList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                Grid.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.YearList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("view/MonthDialogComponent.ets(77:9)");
            Button.width(CommonConstants.FULL_WIDTH);
            Button.height('5%');
            Button.onClick(() => {
                router.replaceUrl({
                    url: 'pages/StatisticsPage',
                    params: {
                        'result': this.result
                    }
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
            Text.debugLine("view/MonthDialogComponent.ets(78:11)");
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
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=MonthDialogComponent.js.map