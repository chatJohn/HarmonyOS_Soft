import router from '@ohos:router';
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import { CustomPieChart } from '@bundle:com.example.rdb/entry/ets/view/PieChartComponent';
import { MonthDialogComponent } from '@bundle:com.example.rdb/entry/ets/view/MonthDialogComponent';
class Test extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('', this, "message");
        this.__month_line_arr = new ObservedPropertyObjectPU([] //折线图
        , this, "month_line_arr");
        this.__month_pie_arr = new ObservedPropertyObjectPU([] //饼图
        , this, "month_pie_arr");
        this.__month_balance = new ObservedPropertySimplePU(0, this, "month_balance");
        this.__month_revenue = new ObservedPropertySimplePU(0, this, "month_revenue");
        this.__month_spend = new ObservedPropertySimplePU(0, this, "month_spend");
        this.__today_revenue = new ObservedPropertySimplePU(0, this, "today_revenue");
        this.__today_spend = new ObservedPropertySimplePU(0, this, "today_spend");
        this.DailyDate = new Date();
        this.__DailyDateString = new ObservedPropertySimplePU(this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-' +
            this.DailyDate.getDate().toString(), this, "DailyDateString");
        this.__MonthDateString = new ObservedPropertySimplePU(this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%', this, "MonthDateString");
        this.__NowMonthDateString = new ObservedPropertySimplePU(this.DailyDate.getFullYear().toString() + '-' + (this.DailyDate.getMonth() + 1).toString() + '-%', this, "NowMonthDateString");
        this.AccountTable = new AccountTable(() => { });
        this.MonthDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new MonthDialogComponent(this, {});
                jsDialog.setController(this.MonthDialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.month_line_arr !== undefined) {
            this.month_line_arr = params.month_line_arr;
        }
        if (params.month_pie_arr !== undefined) {
            this.month_pie_arr = params.month_pie_arr;
        }
        if (params.month_balance !== undefined) {
            this.month_balance = params.month_balance;
        }
        if (params.month_revenue !== undefined) {
            this.month_revenue = params.month_revenue;
        }
        if (params.month_spend !== undefined) {
            this.month_spend = params.month_spend;
        }
        if (params.today_revenue !== undefined) {
            this.today_revenue = params.today_revenue;
        }
        if (params.today_spend !== undefined) {
            this.today_spend = params.today_spend;
        }
        if (params.DailyDate !== undefined) {
            this.DailyDate = params.DailyDate;
        }
        if (params.DailyDateString !== undefined) {
            this.DailyDateString = params.DailyDateString;
        }
        if (params.MonthDateString !== undefined) {
            this.MonthDateString = params.MonthDateString;
        }
        if (params.NowMonthDateString !== undefined) {
            this.NowMonthDateString = params.NowMonthDateString;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.MonthDialogController !== undefined) {
            this.MonthDialogController = params.MonthDialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__month_line_arr.purgeDependencyOnElmtId(rmElmtId);
        this.__month_pie_arr.purgeDependencyOnElmtId(rmElmtId);
        this.__month_balance.purgeDependencyOnElmtId(rmElmtId);
        this.__month_revenue.purgeDependencyOnElmtId(rmElmtId);
        this.__month_spend.purgeDependencyOnElmtId(rmElmtId);
        this.__today_revenue.purgeDependencyOnElmtId(rmElmtId);
        this.__today_spend.purgeDependencyOnElmtId(rmElmtId);
        this.__DailyDateString.purgeDependencyOnElmtId(rmElmtId);
        this.__MonthDateString.purgeDependencyOnElmtId(rmElmtId);
        this.__NowMonthDateString.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__month_line_arr.aboutToBeDeleted();
        this.__month_pie_arr.aboutToBeDeleted();
        this.__month_balance.aboutToBeDeleted();
        this.__month_revenue.aboutToBeDeleted();
        this.__month_spend.aboutToBeDeleted();
        this.__today_revenue.aboutToBeDeleted();
        this.__today_spend.aboutToBeDeleted();
        this.__DailyDateString.aboutToBeDeleted();
        this.__MonthDateString.aboutToBeDeleted();
        this.__NowMonthDateString.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get month_line_arr() {
        return this.__month_line_arr.get();
    }
    set month_line_arr(newValue) {
        this.__month_line_arr.set(newValue);
    }
    get month_pie_arr() {
        return this.__month_pie_arr.get();
    }
    set month_pie_arr(newValue) {
        this.__month_pie_arr.set(newValue);
    }
    get month_balance() {
        return this.__month_balance.get();
    }
    set month_balance(newValue) {
        this.__month_balance.set(newValue);
    }
    get month_revenue() {
        return this.__month_revenue.get();
    }
    set month_revenue(newValue) {
        this.__month_revenue.set(newValue);
    }
    get month_spend() {
        return this.__month_spend.get();
    }
    set month_spend(newValue) {
        this.__month_spend.set(newValue);
    }
    get today_revenue() {
        return this.__today_revenue.get();
    }
    set today_revenue(newValue) {
        this.__today_revenue.set(newValue);
    }
    get today_spend() {
        return this.__today_spend.get();
    }
    set today_spend(newValue) {
        this.__today_spend.set(newValue);
    }
    get DailyDateString() {
        return this.__DailyDateString.get();
    }
    set DailyDateString(newValue) {
        this.__DailyDateString.set(newValue);
    }
    get MonthDateString() {
        return this.__MonthDateString.get();
    }
    set MonthDateString(newValue) {
        this.__MonthDateString.set(newValue);
    }
    get NowMonthDateString() {
        return this.__NowMonthDateString.get();
    }
    set NowMonthDateString(newValue) {
        this.__NowMonthDateString.set(newValue);
    }
    initData() {
        this.AccountTable.getRdbStore(() => {
            this.AccountTable.daily_query(this.DailyDateString, (resultIn, resultOUt) => {
                let tmp = 0;
                resultIn.forEach(x => {
                    tmp += x;
                    // console.log('chatting statistics array check', x)
                });
                this.today_revenue = tmp;
                tmp = 0;
                resultOUt.forEach(x => {
                    tmp += x;
                    // console.log('chatting statistics array check', x)
                });
                this.today_spend = tmp;
            });
        });
    }
    set_poly_line(arr) {
        var points = []; //建立坐标数组
        let l = arr.length; //获取数组长度
        let min = Math.min(...arr); //获取原始数组最小值
        let max = Math.max(...arr) - min; //获取原始数组的最大值
        for (var i = 0; i < l; i++) { //遍历
            //      let x=(100/l)*i//最后会多一个空point
            //      let x=(100/(l+1))*(i+1)//前后对称，前后都多一个
            let x = (100 / (l - 1)) * i; //最后的空point消失,计算x坐标的百分比
            //      let y=100-((arr[i]-min)/max)*100//计算y坐标的百分比
            let y = 100 - ((arr[i] - min) / max) * 100; //计算y坐标的百分比
            points.push([x, y]); //坐标转为字符串,添加 百分号 并将坐标存入数组
        }
        //    console.info("折线坐标："+points.toString())
        return points; //返回数组
    }
    aboutToAppear() {
        let params = router.getParams();
        if (params['result'] !== null && this.month_spend === 0 && this.month_revenue === 0) {
            this.month_pie_arr = params['result'];
            this.month_pie_arr.forEach(x => {
                this.month_line_arr.push((x.quantity < 0 ? -x.quantity : x.quantity));
                if (x.accountType === 0) {
                    this.month_spend += x.quantity;
                }
                else {
                    this.month_revenue += x.quantity;
                }
                this.month_balance = this.month_revenue - this.month_spend;
            });
            console.log('chatting month statistics check', this.month_pie_arr.length);
        }
        //
        // this.month_pie_arr.forEach(x => {
        //   console.log('chatting check pie chart', x.element + ' ' + x.quantity + ' ' + x.color +' '+ x.percent)
        // })
        if (params['pie'] !== null && this.month_spend === 0 && this.month_revenue === 0) {
            this.month_pie_arr = params['pie'];
            this.month_pie_arr.forEach(x => {
                this.month_line_arr.push((x.quantity < 0 ? -x.quantity : x.quantity));
                if (x.accountType === 0) {
                    this.month_spend += x.quantity;
                }
                else {
                    this.month_revenue += x.quantity;
                }
            });
            this.month_balance = this.month_revenue - this.month_spend;
        }
        this.initData();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width('100%');
            Column.height('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width('100%');
            Row.height('7%');
            Row.backgroundColor(Color.White);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['exit.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height(32);
            Image.width(32);
            Image.margin(20);
            Image.onClick(() => {
                router.replaceUrl({
                    url: "pages/MainPage"
                });
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['日历.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height(32);
            Image.width(32);
            Image.margin(20);
            Image.onClick(() => {
                this.MonthDialogController.open();
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({
                direction: FlexDirection.Column,
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.SpaceAround
            });
            Flex.width("100%");
            Flex.height('90%');
            Flex.padding(24);
            Flex.backgroundColor('#f1f3f5');
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.borderRadius(22);
            Row.padding(10);
            Row.backdropBlur(8);
            Row.width('90%');
            Row.height(180);
            Row.margin({ top: 12 });
            Row.linearGradient({
                angle: 12,
                colors: [
                    [0xffffff, 0],
                    [0xf1f3f5, 0.5]
                ]
            });
            Row.onClick(() => {
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: 4 });
            Column.padding(5);
            Column.height('100%');
            Column.width('50%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('本月统计');
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
            Text.fontSize(24);
            Text.opacity(0.7);
            Text.alignSelf(ItemAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('支出');
            Text.fontColor(Color.Black);
            Text.fontSize(22);
            Text.opacity(0.5);
            Text.alignSelf(ItemAlign.Start);
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.month_spend.toString());
            Text.fontColor(Color.Black);
            Text.fontSize(34);
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
            Row.margin({
                top: 10
            });
            Row.height(32);
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.alignSelf(ItemAlign.Start);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('收入');
            Text.fontSize(18);
            Text.opacity(0.5);
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.month_revenue.toString());
            Text.fontSize(18);
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.vertical(true);
            Divider.strokeWidth(2);
            Divider.color(0xf1c3b8);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin(6);
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('结余');
            Text.fontSize(18);
            Text.opacity(0.5);
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.month_balance.toString());
            Text.fontSize(18);
            Text.fontColor(Color.Black);
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
            __Common__.create();
            __Common__.width('50%');
            __Common__.height('100%');
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomPieChart(this, { picChartElements: this.month_pie_arr }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width('90%');
            Column.height(220);
            Column.borderRadius(22);
            Column.borderWidth(1);
            Column.backgroundColor(Color.White);
            Column.padding(16);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                router.push({
                    url: 'pages/MoneyHistory',
                });
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //          Stack() {
            Polyline.create({ width: '95%', height: '95%' });
            //          Stack() {
            Polyline.fillOpacity(0);
            //          Stack() {
            Polyline.stroke(0xff8b8b);
            //          Stack() {
            Polyline.strokeWidth(5);
            //          Stack() {
            Polyline.points(this.set_poly_line(ObservedObject.GetRawObject(this.month_line_arr)));
            //          Stack() {
            Polyline.strokeLineJoin(LineJoinStyle.Round);
            //          Stack() {
            Polyline.strokeLineCap(LineCapStyle.Round);
            if (!isInitialRender) {
                //          Stack() {
                Polyline.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.padding(6);
            Column.width('90%');
            Column.height('180');
            Column.margin({ top: 22 });
            Column.borderRadius(22);
            Column.justifyContent(FlexAlign.SpaceAround);
            Column.backdropBlur(12);
            Column.linearGradient({
                angle: 12,
                colors: [
                    [0xf1f3f5, 0],
                    [0xffffff, 1]
                ]
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('今日');
            Text.fontSize(23);
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
            Column.create();
            Column.width('50%');
            Column.borderRadius(28);
            Column.justifyContent(FlexAlign.SpaceAround);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('' + this.today_revenue);
            Text.fontSize(26);
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor('#167c80');
            Text.borderRadius(18);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('收');
            Text.width(78);
            Text.height(48);
            Text.margin(6);
            Text.fontSize(32);
            Text.fontColor(Color.White);
            Text.borderRadius(18);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor('#61bfad');
            Text.onClick(() => {
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width('50%');
            Column.borderRadius(28);
            Column.justifyContent(FlexAlign.SpaceAround);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('' + this.today_spend);
            Text.fontSize(26);
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor('#ff8b8b');
            Text.borderRadius(18);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('支');
            Text.width(78);
            Text.height(48);
            Text.margin(6);
            Text.fontSize(32);
            Text.fontColor(Color.White);
            Text.borderRadius(18);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor('#ff8b8b');
            Text.onClick(() => {
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Test(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=StatisticsPage.js.map