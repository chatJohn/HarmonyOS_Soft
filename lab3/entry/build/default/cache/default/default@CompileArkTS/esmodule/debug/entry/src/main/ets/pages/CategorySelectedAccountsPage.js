import router from '@ohos:router';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
import { DialogComponent } from '@bundle:com.example.rdb/entry/ets/view/DialogComponent';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
class CategorySelectedAccountsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__category = new ObservedPropertySimplePU('', this, "category");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.scroller = new Scroller();
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU({ id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' }, this, "newAccount");
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__accountWithDate = new ObservedPropertyObjectPU(new Array(), this, "accountWithDate");
        this.AccountTable = new AccountTable(() => { });
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DialogComponent(this, {
                    isInsert: this.__isInsert,
                    newAccount: this.__newAccount,
                    confirm: (isInsert, newAccount) => this.accept(isInsert, newAccount),
                });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.category !== undefined) {
            this.category = params.category;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.accounts !== undefined) {
            this.accounts = params.accounts;
        }
        if (params.accountWithDate !== undefined) {
            this.accountWithDate = params.accountWithDate;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__category.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__accountWithDate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__category.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__accounts.aboutToBeDeleted();
        this.__accountWithDate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get category() {
        return this.__category.get();
    }
    set category(newValue) {
        this.__category.set(newValue);
    }
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
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
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get accountWithDate() {
        return this.__accountWithDate.get();
    }
    set accountWithDate(newValue) {
        this.__accountWithDate.set(newValue);
    }
    accept(isInsert, newAccount) {
        if (isInsert) {
            Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
            this.AccountTable.insertData(newAccount, (id) => {
                newAccount.id = id;
                this.accounts.push(newAccount);
                // if(this.accountDate.has(newAccount.date.toString()) === true){
                //   this.accountWithDate.forEach(x => {
                //     if(x.date.toString() === newAccount.date.toString()){
                //       x.accountDataList.push(newAccount)
                //     }
                //   })
                // }else{
                //   this.accountDate.add(newAccount.date.toString())
                //   this.accountWithDate.push(new DateAccountDataList(newAccount.date.toString(), new Array<AccountData>(newAccount)))
                // }
            });
        }
        else {
            this.AccountTable.updateData(newAccount, () => {
            });
            let list = this.accounts;
            this.accounts = [];
            list[this.index] = newAccount;
            this.accounts = list;
            this.index = -1;
        }
        // console.log('chatting check date length', this.accountDate.size.toString())
    }
    aboutToAppear() {
        let params = router.getParams();
        this.category = params['category'];
        this.AccountTable.getRdbStore(() => {
            this.AccountTable.queryCategory(this.category, (result) => {
                console.log('chatting category length callback', result.length);
                this.accountWithDate = result;
                console.log('chatting check category accountWithDateInfo', this.accountWithDate.length.toString());
            });
        });
    }
    selectListItem(item) {
        this.isInsert = false;
        this.index = this.accounts.indexOf(item);
        this.newAccount = {
            id: item.id,
            amount: item.amount,
            notes: item.notes,
            accountType: item.accountType,
            typeText: item.typeText,
            date: item.date
        };
    }
    itemHead(ele, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.backgroundColor(0xFFFFFF);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(ele.date);
            Text.fontSize(20);
            Text.width("40%");
            Text.padding(10);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.width('10%');
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['支出.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width('10%');
            Image.padding(10);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(ele.outAccount.toString());
            Text.fontSize(15);
            Text.width('15%');
            Text.padding(10);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['收入.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.padding(10);
            Image.width('10%');
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(ele.inAccount.toString());
            Text.fontSize(15);
            Text.width('15%');
            Text.padding(10);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height('100%');
            Column.padding({ left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.margin({ top: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.height({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['退出.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            Image.margin({ right: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Image.margin({
                left: 3
            });
            Image.onClick(() => {
                router.replaceUrl({
                    url: 'pages/MainPage'
                });
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.scrollBarWidth(5);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: CommonConstants.FULL_SIZE });
            List.listDirection(Axis.Vertical);
            List.width(CommonConstants.FULL_WIDTH);
            List.borderRadius({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            List.backgroundColor(Color.White);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const it = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ListItemGroup.create({
                        header: this.itemHead.bind(this, it)
                    });
                    if (!isInitialRender) {
                        ListItemGroup.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        {
                            const isLazyCreate = true;
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                ListItem.create(deepRenderFunction, isLazyCreate);
                                ListItem.width(CommonConstants.FULL_WIDTH);
                                ListItem.height({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                ListItem.onClick(() => {
                                    this.selectListItem(item);
                                    this.dialogController.open();
                                });
                                if (!isInitialRender) {
                                    ListItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const observedShallowRender = () => {
                                this.observeComponentCreation(itemCreation);
                                ListItem.pop();
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation(itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[item.typeText]);
                                    Image.width({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.alignSelf(ItemAlign.Start);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.date + ' | ');
                                    Text.fontColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize('10vp');
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.notes);
                                    Text.fontColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize('10vp');
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Row.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Blank.create();
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                    Text.fontSize({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(item.accountType === 0 ? { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.align(Alignment.End);
                                    Text.flexGrow(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[item.typeText]);
                                    Image.width({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.alignSelf(ItemAlign.Start);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.date + ' | ');
                                    Text.fontColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize('10vp');
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.notes);
                                    Text.fontColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize('10vp');
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Row.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Blank.create();
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                    Text.fontSize({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(item.accountType === 0 ? { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.align(Alignment.End);
                                    Text.flexGrow(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            if (isLazyCreate) {
                                observedShallowRender();
                            }
                            else {
                                observedDeepRender();
                            }
                        }
                    };
                    this.forEachUpdateFunction(elmtId, it.accountDataList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                ListItemGroup.pop();
            };
            this.forEachUpdateFunction(elmtId, this.accountWithDate, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new CategorySelectedAccountsPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=CategorySelectedAccountsPage.js.map