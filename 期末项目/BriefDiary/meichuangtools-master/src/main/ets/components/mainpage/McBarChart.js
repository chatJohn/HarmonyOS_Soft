export class McBarChart extends ViewPU{constructor(t,e,s,i=-1){super(t,s,i);this.settings=new RenderingContextSettings(!0);this.context=new CanvasRenderingContext2D(this.settings);this.__options=new ObservedPropertyObjectPU({},this,"options");this.setInitiallyProvidedValue(e)}setInitiallyProvidedValue(t){void 0!==t.settings&&(this.settings=t.settings);void 0!==t.context&&(this.context=t.context);void 0!==t.options&&(this.options=t.options)}updateStateVars(t){}purgeVariableDependenciesOnElmtId(t){this.__options.purgeDependencyOnElmtId(t)}aboutToBeDeleted(){this.__options.aboutToBeDeleted();SubscriberManager.Get().delete(this.id__());this.aboutToBeDeletedInternal()}get options(){return this.__options.get()}set options(t){this.__options.set(t)}aboutToAppear(){}initialRender(){this.observeComponentCreation(((t,e)=>{ViewStackProcessor.StartGetAccessRecordingFor(t);Canvas.create(this.context);Canvas.width(this.options.cWidth);Canvas.height(this.options.cHeight);e||Canvas.pop();ViewStackProcessor.StopGetAccessRecording()}));Canvas.pop()}rerender(){this.updateDirtyElements()}}