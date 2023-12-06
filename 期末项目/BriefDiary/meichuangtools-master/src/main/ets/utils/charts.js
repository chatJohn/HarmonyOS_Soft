export function roundRect(t,i,e,s,o,a){t.beginPath();s>0?t.moveTo(i+a,e):t.moveTo(i-a,e);t.arcTo(i+s,e,i+s,e+o,a);t.arcTo(i+s,e+o,i,e+o,a);t.arcTo(i,e+o,i,e,a);s>0?t.arcTo(i,e,i+a,e,a):t.arcTo(i,e,i-a,e,a)}export function calculateNum(t,i){if(!t||!t.length)return{num:0,step:0,min:0,max:0};let e=Math.max.apply(this,t);let s=Math.min.apply(this,t);let o=0;let a=0;let n=0;let r;let l;let c;let h;let d;let f;let b=0;t:for(d=0;d<10;d++){r=Math.pow(10,d);for(f=1;f<=10;f++){l=r*f;if(l>e){a=l;break}}if(a){if(d<2||f>4)break;for(b=0;b<10;b++)if(a-r/10*(b+1)<=e){a-=r/10*b;break t}}}o=f;if(o<4){a%4==0&&(o=4);a%3==0&&(o=3)}c=Math.round(a/o*100)/100;if(s<0){h=Math.abs(s);o++;n+=c;for(;n<h;){o++;n+=c}n=-n}if(i){let t=o;let i=0;for(let e=1;e<t;e++){let t=n+e*c;if(s<t)break;i=t;o--}n=i}return{num:o,step:c,min:n,max:a}}const seriesOpt={name:"",lineStyle:{color:"",width:2,type:"solid"},label:{show:!1,color:"#333",fontWeight:"normal",fontFamily:"sans-serif",fontSize:18},itemStyle:{symbol:"solidCircle",symbolSize:2,symbolColor:"",borderWidth:0,borderType:"solid",borderColor:""},data:[]};const axisOpt={axisLine:{show:!0,lineStyle:{color:"#333",width:1,type:"solid"}},axisTick:{show:!0,interval:4,length:5,lineStyle:{color:"#333",width:1}},axisLabel:{color:"#333",fontWeight:"normal",fontFamily:"sans-serif",fontSize:18}};const xAxisOpt=Object.assign(Object.assign({},axisOpt),{data:[]});const yAxisOpt=Object.assign(Object.assign({nameTextStyle:{color:"#333",fontWeight:"normal",fontFamily:"sans-serif",fontSize:18}},axisOpt),{splitLine:{show:!0,lineStyle:{color:"#ccc",width:1}},data:[]});const axisPointer={type:"line",lineStyle:{color:"#555",width:1,type:"solid"},shadowStyle:{color:"rgba(150,150,150,0.3)"}};const tooltip={show:!0,axisPointer:axisPointer,backgroundColor:"rgba(50,50,50,0.7)",borderColor:"#333",borderWidth:0,padding:10,textStyle:{color:"#fff",fontWeight:"normal",fontFamily:"sans-serif",fontSize:18}};export class Chart{constructor(){this.cPaddingT=20;this.cPaddingB=30;this.cPaddingL=30;this.cPaddingR=30;this.color=["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"];this.legend=[];this.tooltip=tooltip;this.series=[];this.xAxis={};this.yAxis=yAxisOpt;this.animateArr=[];this.info={};this.drawing=!1}init(t,i){this.ctx=t;this.W=t.width;this.H=t.height;this.setOption(i);this.create()}setOption(t){for(const i in t){const e=t[i];switch(i){case"cPaddingT":this.cPaddingT=Number(i);break;case"cPaddingB":this.cPaddingB=Number(i);break;case"cPaddingL":this.cPaddingL=Number(i);break;case"tooltip":this.tooltip=Object.assign({},tooltip,e);break;case"xAxis":this.xAxis=Object.assign({},xAxisOpt,e);break;case"yAxis":this.yAxis=Object.assign({},yAxisOpt,e);break;case"series":this.series=e.map((t=>Object.assign({},seriesOpt,t)));break;default:this[i]=e}}}create(){}setCtxStyle(t){for(const i in t)this.ctx[i]=t[i]}showInfo(t,i,e){}}