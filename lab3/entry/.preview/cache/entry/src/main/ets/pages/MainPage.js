import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { DialogComponent } from '@bundle:com.example.rdb/entry/ets/view/DialogComponent';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
import router from '@ohos:router';
import { CategoryDialogComponent } from '@bundle:com.example.rdb/entry/ets/view/CategoryDialogComponent';
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.scroller = new Scroller();
        this.__inAccount = new ObservedPropertySimplePU(0, this, "inAccount");
        this.__outAccount = new ObservedPropertySimplePU(0, this, "outAccount");
        this.__accountWithDate = new ObservedPropertyObjectPU(new Array(), this, "accountWithDate");
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEdit = new ObservedPropertySimplePU(false, this, "isEdit");
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU({ id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' }, this, "newAccount");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.DailyDate = new Date();
        this.__MonthDateString = new ObservedPropertySimplePU(this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%', this, "MonthDateString");
        this.AccountTable = new AccountTable(() => { });
        this.deleteList = [];
        this.__month_pie_arr = new ObservedPropertyObjectPU([] //饼图
        , this, "month_pie_arr");
        this.searchController = new SearchController();
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
        this.categoryDialogContorller = new CustomDialogController({
            builder: () => {
                let jsDialog = new CategoryDialogComponent(this, {});
                jsDialog.setController(this.categoryDialogContorller);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.inAccount !== undefined) {
            this.inAccount = params.inAccount;
        }
        if (params.outAccount !== undefined) {
            this.outAccount = params.outAccount;
        }
        if (params.accountWithDate !== undefined) {
            this.accountWithDate = params.accountWithDate;
        }
        if (params.accounts !== undefined) {
            this.accounts = params.accounts;
        }
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.DailyDate !== undefined) {
            this.DailyDate = params.DailyDate;
        }
        if (params.MonthDateString !== undefined) {
            this.MonthDateString = params.MonthDateString;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.deleteList !== undefined) {
            this.deleteList = params.deleteList;
        }
        if (params.month_pie_arr !== undefined) {
            this.month_pie_arr = params.month_pie_arr;
        }
        if (params.searchController !== undefined) {
            this.searchController = params.searchController;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.categoryDialogContorller !== undefined) {
            this.categoryDialogContorller = params.categoryDialogContorller;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__outAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__accountWithDate.purgeDependencyOnElmtId(rmElmtId);
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__MonthDateString.purgeDependencyOnElmtId(rmElmtId);
        this.__month_pie_arr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inAccount.aboutToBeDeleted();
        this.__outAccount.aboutToBeDeleted();
        this.__accountWithDate.aboutToBeDeleted();
        this.__accounts.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__MonthDateString.aboutToBeDeleted();
        this.__month_pie_arr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get inAccount() {
        return this.__inAccount.get();
    }
    set inAccount(newValue) {
        this.__inAccount.set(newValue);
    }
    get outAccount() {
        return this.__outAccount.get();
    }
    set outAccount(newValue) {
        this.__outAccount.set(newValue);
    }
    get accountWithDate() {
        return this.__accountWithDate.get();
    }
    set accountWithDate(newValue) {
        this.__accountWithDate.set(newValue);
    }
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue) {
        this.__searchText.set(newValue);
    }
    get isEdit() {
        return this.__isEdit.get();
    }
    set isEdit(newValue) {
        this.__isEdit.set(newValue);
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
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    get MonthDateString() {
        return this.__MonthDateString.get();
    }
    set MonthDateString(newValue) {
        this.__MonthDateString.set(newValue);
    }
    get month_pie_arr() {
        return this.__month_pie_arr.get();
    }
    set month_pie_arr(newValue) {
        this.__month_pie_arr.set(newValue);
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
        this.AccountTable.getRdbStore(() => {
            this.AccountTable.query(0, (result) => {
                this.accounts = [];
                console.log('chatting length callback', result.length);
                this.accountWithDate = result;
                console.log('chatting check accountWithDateInfo', this.accountWithDate.length.toString());
            }, true);
            this.AccountTable.month_query(this.MonthDateString, (resultIn, resultOut, res) => {
                this.month_pie_arr = res;
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
    deleteListItem() {
        for (let i = 0; i < this.deleteList.length; i++) {
            let index = this.accounts.indexOf(this.deleteList[i]);
            this.accounts.splice(index, 1);
            this.AccountTable.deleteData(this.deleteList[i], () => {
            });
        }
        this.deleteList = [];
        this.isEdit = false;
    }
    itemHead(ele, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(121:5)");
            Row.backgroundColor(0xFFFFFF);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(ele.date);
            Text.debugLine("pages/MainPage.ets(122:7)");
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
            Blank.debugLine("pages/MainPage.ets(127:7)");
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
            Image.debugLine("pages/MainPage.ets(130:7)");
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
            Text.debugLine("pages/MainPage.ets(134:7)");
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
            Image.debugLine("pages/MainPage.ets(140:7)");
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
            Text.debugLine("pages/MainPage.ets(145:7)");
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
    //侧滑出现的组件
    itemEnd(item, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 侧滑后尾端出现的组件
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("pages/MainPage.ets(157:5)");
            // 侧滑后尾端出现的组件
            Button.onClick(() => {
                this.AccountTable.deleteData(item, () => { });
                router.replaceUrl({
                    url: 'pages/MainPage'
                });
            });
            if (!isInitialRender) {
                // 侧滑后尾端出现的组件
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['delete.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/MainPage.ets(158:7)");
            Image.width('48vp');
            Image.height('48vp');
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 侧滑后尾端出现的组件
        Button.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.debugLine("pages/MainPage.ets(170:5)");
            Stack.width(CommonConstants.FULL_WIDTH);
            Stack.height(CommonConstants.FULL_HEIGHT);
            Stack.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MainPage.ets(171:7)");
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(172:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Select.create([{ value: '全部信息', icon: { "id": 0, "type": 30000, params: ['全部信息.png'], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                { value: '只看收入', icon: { "id": 0, "type": 30000, params: ['selector_in.png'], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                { value: '只看支出', icon: { "id": 0, "type": 30000, params: ['selector_out.png'], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                { value: '统计信息', icon: { "id": 0, "type": 30000, params: ['统计信息.png'], "bundleName": "com.example.rdb", "moduleName": "entry" } }]);
            Select.debugLine("pages/MainPage.ets(173:11)");
            Select.margin({
                left: 15
            });
            Select.selected(0);
            Select.value('全部信息');
            Select.font({ size: 16, weight: 500 });
            Select.fontColor('#182431');
            Select.selectedOptionFont({ size: 16, weight: 400 });
            Select.optionFont({ size: 16, weight: 400 });
            Select.onSelect((index) => {
                if (index === 0) {
                    this.AccountTable.query(0, (result) => {
                        this.accountWithDate = result;
                    }, true);
                }
                else if (index === 1) {
                    this.AccountTable.queryAccountType(1, (result) => {
                        this.accountWithDate = result;
                    });
                }
                else if (index === 2) {
                    this.AccountTable.queryAccountType(0, (result) => {
                        this.accountWithDate = result;
                    });
                }
                else if (index === 3) {
                    router.replaceUrl({
                        url: 'pages/StatisticsPage',
                        params: {
                            'pie': this.month_pie_arr
                        }
                    });
                }
            });
            if (!isInitialRender) {
                Select.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Select.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(210:11)");
            Row.margin({ right: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(211:13)");
            Row.onClick(() => {
                this.categoryDialogContorller.open();
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('全部类型');
            Text.debugLine("pages/MainPage.ets(212:15)");
            Text.fontSize({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({
                right: 3
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/MainPage.ets(217:15)");
            Blank.width(1);
            Blank.backgroundColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['类型.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/MainPage.ets(220:15)");
            Image.width({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            Image.margin({ right: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Image.margin({
                left: 3
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['ic_public_edit.svg'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/MainPage.ets(231:13)");
            Image.width({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            Image.onClick(() => {
                this.isEdit = true;
            });
            Image.margin({
                left: 8
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(251:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.padding({ left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.margin({ top: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Search.create({
                value: this.searchText,
                placeholder: '搜索你的记账记录😊',
                controller: this.searchController
            });
            Search.debugLine("pages/MainPage.ets(252:11)");
            Search.width(CommonConstants.FULL_WIDTH);
            Search.borderRadius({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderWidth({ "id": 16777220, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.placeholderFont({ size: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.textFont({ size: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.backgroundColor(Color.White);
            Search.onChange((searchValue) => {
                this.searchText = searchValue;
            });
            Search.onSubmit((searchValue) => {
                if (searchValue === '') {
                    this.AccountTable.query(0, (result) => {
                        this.accountWithDate = result;
                        console.log('chatting check all data', result[0].date);
                    }, true);
                }
                else if (searchValue.match(new RegExp('[1-9][0-9]*')) !== null) { // 根据金额查找
                    this.AccountTable.query(Number(searchValue), (result) => {
                        this.accountWithDate = result;
                    }, false);
                }
                else if (searchValue.match(new RegExp('类型[\W]*')) !== null) {
                    this.AccountTable.queryCategory(searchValue.substring(2), (res) => {
                        this.accountWithDate = res;
                    });
                }
                else { // 根据备注搜索
                    this.AccountTable.queryNotes(searchValue, (result) => {
                        this.accountWithDate = result;
                    });
                }
            });
            if (!isInitialRender) {
                Search.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Search.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(295:13)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.padding({ left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.margin({ top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.debugLine("pages/MainPage.ets(296:15)");
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
            List.debugLine("pages/MainPage.ets(297:17)");
            List.listDirection(Axis.Vertical);
            List.width(CommonConstants.FULL_WIDTH);
            List.borderRadius({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                    ListItemGroup.debugLine("pages/MainPage.ets(300:21)");
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
                                ListItem.swipeAction({
                                    end: this.itemEnd.bind(this, item)
                                });
                                ListItem.width(CommonConstants.FULL_WIDTH);
                                ListItem.height({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                ListItem.onClick(() => {
                                    this.selectListItem(item);
                                    this.dialogController.open();
                                });
                                ListItem.debugLine("pages/MainPage.ets(304:25)");
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
                                    Row.debugLine("pages/MainPage.ets(305:27)");
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[item.typeText]);
                                    Image.debugLine("pages/MainPage.ets(306:29)");
                                    Image.width({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.debugLine("pages/MainPage.ets(311:29)");
                                    Column.height({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.debugLine("pages/MainPage.ets(312:31)");
                                    Text.height({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Row.debugLine("pages/MainPage.ets(316:31)");
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.date + ' | ');
                                    Text.debugLine("pages/MainPage.ets(317:33)");
                                    Text.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Text.debugLine("pages/MainPage.ets(320:33)");
                                    Text.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Blank.debugLine("pages/MainPage.ets(327:29)");
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                                Text.debugLine("pages/MainPage.ets(331:31)");
                                                Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.fontColor(item.accountType === 0 ? { "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.align(Alignment.End);
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Row.create();
                                                Row.debugLine("pages/MainPage.ets(337:31)");
                                                Row.align(Alignment.End);
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
                                                    Row.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Toggle.create({ type: ToggleType.Checkbox });
                                                Toggle.debugLine("pages/MainPage.ets(338:33)");
                                                Toggle.onChange((isOn) => {
                                                    if (isOn) {
                                                        this.deleteList.push(item);
                                                    }
                                                    else {
                                                        let index = this.deleteList.indexOf(item);
                                                        this.deleteList.splice(index, 1);
                                                    }
                                                });
                                                if (!isInitialRender) {
                                                    Toggle.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Toggle.pop();
                                            Row.pop();
                                        });
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    Row.debugLine("pages/MainPage.ets(305:27)");
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[item.typeText]);
                                    Image.debugLine("pages/MainPage.ets(306:29)");
                                    Image.width({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.debugLine("pages/MainPage.ets(311:29)");
                                    Column.height({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.debugLine("pages/MainPage.ets(312:31)");
                                    Text.height({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Row.debugLine("pages/MainPage.ets(316:31)");
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.date + ' | ');
                                    Text.debugLine("pages/MainPage.ets(317:33)");
                                    Text.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Text.debugLine("pages/MainPage.ets(320:33)");
                                    Text.fontColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Blank.debugLine("pages/MainPage.ets(327:29)");
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                                Text.debugLine("pages/MainPage.ets(331:31)");
                                                Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.fontColor(item.accountType === 0 ? { "id": 16777252, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777250, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.align(Alignment.End);
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Row.create();
                                                Row.debugLine("pages/MainPage.ets(337:31)");
                                                Row.align(Alignment.End);
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
                                                    Row.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Toggle.create({ type: ToggleType.Checkbox });
                                                Toggle.debugLine("pages/MainPage.ets(338:33)");
                                                Toggle.onChange((isOn) => {
                                                    if (isOn) {
                                                        this.deleteList.push(item);
                                                    }
                                                    else {
                                                        let index = this.deleteList.indexOf(item);
                                                        this.deleteList.splice(index, 1);
                                                    }
                                                });
                                                if (!isInitialRender) {
                                                    Toggle.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Toggle.pop();
                                            Row.pop();
                                        });
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
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
        Row.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (!this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/MainPage.ets(391:9)");
                        Button.width('120vp');
                        Button.height({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y });
                        Button.onClick(() => {
                            this.isInsert = true;
                            this.newAccount = { id: 0, amount: 0, notes: '', accountType: 0, typeText: '', date: '' };
                            this.dialogController.open();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Row.create();
                        Row.debugLine("pages/MainPage.ets(392:11)");
                        Row.width('80vp');
                        Row.height('48vp');
                        if (!isInitialRender) {
                            Row.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['add.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/MainPage.ets(393:13)");
                        Image.width('30vp');
                        Image.height('48vp');
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('记一笔');
                        Text.debugLine("pages/MainPage.ets(396:13)");
                        Text.fontColor({ "id": 16777253, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.fontSize(15);
                        Text.height('48vp');
                        Text.width('70vp');
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    Row.pop();
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/MainPage.ets(416:9)");
                        Button.width({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.markAnchor({ x: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, y: CommonConstants.MINIMUM_SIZE });
                        Button.position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y });
                        Button.onClick(() => {
                            this.deleteListItem();
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
                        Image.create({ "id": 0, "type": 30000, params: ['delete.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/MainPage.ets(417:11)");
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MainPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MainPage.js.map