import router from '@ohos:router';
import Curves from '@native:ohos.curves';
class TransPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('呆头鹅记账', this, "message");
        this.__powerBy = new ObservedPropertySimplePU('PowerBy: 华为', this, "powerBy");
        this.__opacityValue = new ObservedPropertySimplePU(0, this, "opacityValue");
        this.__scaleValue = new ObservedPropertySimplePU(0, this, "scaleValue");
        this.curve1 = Curves.cubicBezier(0.4, 0, 1, 1);
        this.pathCommands1 = 'M319.5 128.1 c103.5 0 187.5 84 187.5 187.5 v15 a172.5 172.5 0 0 3 -172.5 172.5 H198 a36 36 0 0 3 -13.8 -1 207 207 0 0 0 87 -372 h48.3 z';
        this.pathCommands2 = 'M270.6 128.1 h48.6 c51.6 0 98.4 21 132.3 54.6 a411 411 0 0 3 -45.6 123 c-25.2 45.6 -56.4 84 -87.6 110.4 a206.1 206.1 0 0 0 -47.7 -288 z';
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.powerBy !== undefined) {
            this.powerBy = params.powerBy;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.curve1 !== undefined) {
            this.curve1 = params.curve1;
        }
        if (params.pathCommands1 !== undefined) {
            this.pathCommands1 = params.pathCommands1;
        }
        if (params.pathCommands2 !== undefined) {
            this.pathCommands2 = params.pathCommands2;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__powerBy.purgeDependencyOnElmtId(rmElmtId);
        this.__opacityValue.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__powerBy.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get powerBy() {
        return this.__powerBy.get();
    }
    set powerBy(newValue) {
        this.__powerBy.set(newValue);
    }
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue) {
        this.__opacityValue.set(newValue);
    }
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue) {
        this.__scaleValue.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/TransPage.ets(20:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImage({ "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.backgroundImageSize(ImageSize.Cover);
            Column.onAppear(() => {
                Context.animateTo({
                    duration: 1000,
                    onFinish: () => { }
                }, () => {
                });
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Shape.create();
            Shape.debugLine("pages/TransPage.ets(21:7)");
            Shape.height('630px');
            Shape.width('630px');
            Shape.scale({ x: this.scaleValue, y: this.scaleValue });
            Shape.opacity(this.opacityValue);
            Shape.onAppear(() => {
                Context.animateTo({
                    duration: 1000,
                    curve: this.curve1,
                    onFinish: () => {
                        setTimeout(() => {
                            router.replaceUrl({
                                url: 'pages/MainPage'
                            });
                        }, 1000);
                    }
                }, () => {
                    this.opacityValue = 1;
                    this.scaleValue = 1;
                });
            });
            if (!isInitialRender) {
                Shape.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Path.create();
            Path.debugLine("pages/TransPage.ets(22:9)");
            Path.commands('M162 128.7 a222 222 0 0 1 100.8 374.4 H198 a36 36 0 0 3 -36 -36');
            Path.fill(Color.White);
            Path.stroke(Color.Blue);
            Path.antiAlias(true);
            Path.strokeOpacity(100);
            if (!isInitialRender) {
                Path.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Path.create();
            Path.debugLine("pages/TransPage.ets(28:9)");
            Path.antiAlias(true);
            Path.strokeOpacity(100);
            Path.commands(this.pathCommands1);
            Path.fill('none');
            Path.linearGradient({
                angle: 30,
                colors: [["#ff82fffb", 0], ["#ff39fcf6", 1]]
            });
            Path.clip(new Path().commands(this.pathCommands1));
            Path.stroke(Color.Blue);
            if (!isInitialRender) {
                Path.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Path.create();
            Path.debugLine("pages/TransPage.ets(40:9)");
            Path.antiAlias(true);
            Path.strokeOpacity(100);
            Path.stroke(Color.Blue);
            Path.commands(this.pathCommands2);
            Path.fill('none');
            Path.linearGradient({
                angle: 50,
                colors: [['#ff71ffdd', 0.1], ["#ff71eae2", 0.4], ["#ff1ef6f6", 0.7]]
            });
            Path.clip(new Path().commands(this.pathCommands2));
            if (!isInitialRender) {
                Path.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Shape.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.message);
            Text.debugLine("pages/TransPage.ets(74:7)");
            Text.fontSize(60);
            Text.width('100%');
            Text.height('30%');
            Text.alignSelf(ItemAlign.Center);
            Text.margin({
                left: 110,
                top: 20
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.powerBy);
            Text.debugLine("pages/TransPage.ets(85:7)");
            Text.margin({
                left: 10,
                top: 320
            });
            Text.fontSize(15);
            Text.fontColor(Color.Blue);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new TransPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TransPage.js.map