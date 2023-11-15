export class CustomPieChart extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.picChartElements = undefined;
        this.__circle_radius = new ObservedPropertySimplePU(50
        // 单位
        , this, "circle_radius");
        this.__unit = new ObservedPropertySimplePU("元"
        // 获取上下文
        , this, "unit");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.picChartElements !== undefined) {
            this.picChartElements = params.picChartElements;
        }
        if (params.circle_radius !== undefined) {
            this.circle_radius = params.circle_radius;
        }
        if (params.unit !== undefined) {
            this.unit = params.unit;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__circle_radius.purgeDependencyOnElmtId(rmElmtId);
        this.__unit.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__circle_radius.aboutToBeDeleted();
        this.__unit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get circle_radius() {
        return this.__circle_radius.get();
    }
    set circle_radius(newValue) {
        this.__circle_radius.set(newValue);
    }
    get unit() {
        return this.__unit.get();
    }
    set unit(newValue) {
        this.__unit.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: 30 });
            Column.debugLine("view/PieChartComponent.ets(18:5)");
            Column.width('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Canvas.create(this.context);
            Canvas.debugLine("view/PieChartComponent.ets(19:7)");
            Canvas.height(this.circle_radius * 2);
            Canvas.aspectRatio(1);
            Canvas.onReady(() => {
                this.picChartElements.forEach((item) => {
                    // 创建一个新的控制路径
                    this.context.beginPath();
                    // 路径从当前点移动到指定点
                    this.context.moveTo(this.circle_radius, this.circle_radius);
                    // 绘制弧线路径(弧线圆心的x坐标值,弧线圆心的y坐标值,弧线的圆半径,弧线的起始弧度,弧线的终止弧度)
                    this.context.arc(this.circle_radius, this.circle_radius, this.circle_radius, item.beginAngle, item.endAngle);
                    // 指定绘制的填充色
                    this.context.fillStyle = item.color;
                    // 对封闭路径进行填充
                    this.context.fill();
                });
            });
            if (!isInitialRender) {
                Canvas.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Canvas.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.debugLine("view/PieChartComponent.ets(41:7)");
            Scroll.height(30);
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.width('100%');
            Scroll.margin({
                left: 50
            });
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("view/PieChartComponent.ets(42:9)");
            if (!isInitialRender) {
                List.pop();
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
                        ListItem.height(20);
                        ListItem.debugLine("view/PieChartComponent.ets(44:13)");
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
                            Row.debugLine("view/PieChartComponent.ets(45:15)");
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注圆点颜色
                            Circle.create({ width: 8, height: 8 });
                            Circle.debugLine("view/PieChartComponent.ets(47:17)");
                            // 标注圆点颜色
                            Circle.fill(item.color);
                            if (!isInitialRender) {
                                // 标注圆点颜色
                                Circle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注文本
                            Text.create(item.element);
                            Text.debugLine("view/PieChartComponent.ets(49:17)");
                            // 标注文本
                            Text.fontSize(12);
                            // 标注文本
                            Text.margin({
                                left: 5
                            });
                            if (!isInitialRender) {
                                // 标注文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 标注文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注数量
                            Text.create(item.quantity + ' ' + this.unit);
                            Text.debugLine("view/PieChartComponent.ets(53:17)");
                            // 标注数量
                            Text.fontSize(12);
                            // 标注数量
                            Text.margin({
                                left: 5
                            });
                            if (!isInitialRender) {
                                // 标注数量
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 标注数量
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
                            Row.debugLine("view/PieChartComponent.ets(45:15)");
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注圆点颜色
                            Circle.create({ width: 8, height: 8 });
                            Circle.debugLine("view/PieChartComponent.ets(47:17)");
                            // 标注圆点颜色
                            Circle.fill(item.color);
                            if (!isInitialRender) {
                                // 标注圆点颜色
                                Circle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注文本
                            Text.create(item.element);
                            Text.debugLine("view/PieChartComponent.ets(49:17)");
                            // 标注文本
                            Text.fontSize(12);
                            // 标注文本
                            Text.margin({
                                left: 5
                            });
                            if (!isInitialRender) {
                                // 标注文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 标注文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 标注数量
                            Text.create(item.quantity + ' ' + this.unit);
                            Text.debugLine("view/PieChartComponent.ets(53:17)");
                            // 标注数量
                            Text.fontSize(12);
                            // 标注数量
                            Text.margin({
                                left: 5
                            });
                            if (!isInitialRender) {
                                // 标注数量
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 标注数量
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
            this.forEachUpdateFunction(elmtId, this.picChartElements, forEachItemGenFunction);
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
export class PicChartElement {
    constructor(element, quantity, color, accountType) {
        this.element = element;
        this.quantity = quantity;
        this.color = color;
        this.accountType = accountType;
    }
}
//# sourceMappingURL=PieChartComponent.js.map