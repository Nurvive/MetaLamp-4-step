class e{constructor(){this.observers=[]}subscribe(e){this.observers.push(e)}unsubscribe(e){this.observers=this.observers.filter((t=>t!==e))}notify(e){this.observers.forEach((t=>t(e)))}}var t=class{constructor(e){this.parent=e,this.init()}init(){this.element=document.createElement("span"),this.element.classList.add("slider__head-bubble"),this.element.setAttribute("data-type","bubble"),this.parent.append(this.element)}update(e){this.element&&(this.element.textContent=String(e))}show(){this.element?.classList.add("slider__head-bubble_active")}hide(){this.element?.classList.remove("slider__head-bubble_active")}};var i=class{constructor(e,i,s,a){this.handleHeadStart=e=>{const t=new CustomEvent("headStart",{detail:{data:e}});this.parent.dispatchEvent(t)},this.parent=e,this.direction=i,this.element=document.createElement("div"),this.bubble=new t(this.element),this.updatePosition(s),this.updateBubble(a),this.init()}init(){this.element.classList.add("slider__head"),"horizontal"===this.direction?this.element.classList.add("slider__head"):this.element.classList.add("slider__head","slider__head_vertical"),this.parent.append(this.element),this.element.addEventListener("mousedown",this.handleHeadStart),this.element.addEventListener("touchstart",this.handleHeadStart)}removeHead(){return this.element.remove(),!0}updatePosition(e){"horizontal"===this.direction?this.element.style.left=100*e+"%":this.element.style.top=100*e+"%"}updateBubble(e){this.bubble&&this.bubble.update(e)}showBubble(){this.bubble.show()}hideBubble(){this.bubble.hide()}get getWidth(){return this.element.getBoundingClientRect().width}get getHeight(){return this.element.getBoundingClientRect().height}};var s=class{constructor(e,t,i,s){this.handleScaleClick=e=>{const t=new CustomEvent("scaleClick",{detail:{data:e}});this.parent.dispatchEvent(t)},this.parent=e,this.direction=t,this.element=document.createElement("div"),this.init(i,s)}init(e,t){"horizontal"===this.direction?this.element.classList.add("slider__scale"):this.element.classList.add("slider__scale","slider__scale_vertical"),this.parent.append(this.element);const i=(t-e)/4;for(let t=0;t<=100;t+=5){const s=document.createElement("div");if(s.classList.add("slider__dash"),t%25==0){const a=document.createElement("div");a.classList.add("slider__scale-number"),"horizontal"===this.direction?(s.style.left=`${t}%`,a.style.left=`${t}%`,s.append(a),this.element.append(s)):(s.style.top=`${t}%`,s.classList.add("slider__dash_vertical"),a.style.top=`${t}%`,a.classList.add("slider__scale-number_vertical"),s.append(a),this.element.append(s));const n=this.element.querySelectorAll(".slider__scale-number"),h=n[n.length-1];if(0===t)h.innerHTML=String(e);else{const s=e+t/25*i;h.innerHTML=Number.isInteger(s)?String(s):s.toFixed(2)}}else"horizontal"===this.direction?(s.classList.add("slider__dash_small"),s.style.left=`${t}%`,this.element.append(s)):(s.classList.add("slider__dash_small-vertical"),s.style.top=`${t}%`,this.element.append(s))}this.element.addEventListener("click",this.handleScaleClick)}removeScale(){this.element.remove()}get getWidth(){return this.element.getBoundingClientRect().width}get getLeftCoordinate(){return this.element.getBoundingClientRect().left}get getHeight(){return this.element.getBoundingClientRect().height}get getTopCoordinate(){return this.element.getBoundingClientRect().top}};var a=class{constructor(e,t,i){this.handleHeadStart=e=>{const t=new CustomEvent("headStart",{detail:{data:e.detail.data}});this.parent.dispatchEvent(t)},this.handleScaleClick=e=>{const t=new CustomEvent("scaleClick",{detail:{data:e.detail.data}});this.parent.dispatchEvent(t)},this.parent=e,this.direction=t,this.type=i,this.element=document.createElement("div"),this.progressBar=document.createElement("span"),this.init()}init(){"horizontal"===this.direction?(this.element.classList.add("slider__line"),this.progressBar.classList.add("slider__line-progress")):(this.element.classList.add("slider__line","slider__line_vertical"),this.progressBar.classList.add("slider__line-progress","slider__line-progress_vertical")),this.element.append(this.progressBar),this.parent.append(this.element),this.element.addEventListener("headStart",this.handleHeadStart),this.element.addEventListener("scaleClick",this.handleScaleClick)}set setType(e){this.type=e}progressValue(e,t){"horizontal"===this.direction?"single"===this.type?this.progressBar.style.width=e.style.left:void 0!==t&&(this.progressBar.style.width=parseInt(e.style.left,10)-parseInt(t.style.left,10)+"%",this.progressBar.style.left=t.style.left):"single"===this.type?this.progressBar.style.height=e.style.top:void 0!==t&&(this.progressBar.style.height=parseInt(e.style.top,10)-parseInt(t.style.top,10)+"%",this.progressBar.style.top=t.style.top)}removeLine(){this.element.remove()}get getWidth(){return this.element.getBoundingClientRect().width}get getLeftCoordinate(){return this.element.getBoundingClientRect().left}get getHeight(){return this.element.getBoundingClientRect().height}get getTopCoordinate(){return this.element.getBoundingClientRect().top}};class n extends e{constructor(e,t){super(),this.handleHeadStart=e=>{const t=n.getEvent(e.detail.data),i=t.target,s=i.hasAttribute("data-valueFrom")?"valueFrom":"valueTo",a=[];return"horizontal"===this.state.direction?(a.push(i.getBoundingClientRect().left),a.push(t.clientX)):(a.push(i.getBoundingClientRect().top),a.push(t.clientY)),this.handleSwipe=e=>this.swipeAction(e,a,s),document.addEventListener("touchmove",this.handleSwipe,{passive:!1}),document.addEventListener("mousemove",this.handleSwipe),document.addEventListener("touchend",this.handleSwipeEnd),document.addEventListener("mouseup",this.handleSwipeEnd),a},this.swipeAction=(e,t,i)=>{e.preventDefault();const s=n.getEvent(e);return"horizontal"===this.state.direction?(t.push(this.line.getWidth),t.push(this.line.getLeftCoordinate),t.push(s.clientX)):(t.push(this.line.getHeight),t.push(this.line.getTopCoordinate),t.push(s.clientY)),t.push(this.head.getWidth/2),this.notify({valueArray:t.slice(),target:i,onlyState:!1}),t.splice(2,t.length-2),t},this.handleSwipeEnd=()=>(document.removeEventListener("touchmove",this.handleSwipe),document.removeEventListener("mousemove",this.handleSwipe),document.removeEventListener("touchend",this.handleSwipeEnd),document.removeEventListener("mouseup",this.handleSwipeEnd),!0),this.handleScaleClick=e=>{const t=this.scaleClickData(e);return this.notify({target:"value",valueArray:t.slice(),onlyState:!1}),t},this.elem=e,this.handleSwipe=()=>[],this.state=Object.assign({},t),this.line=new a(this.elem,this.state.direction,this.state.type),this.scale=new s(this.line.element,this.state.direction,this.state.min,this.state.max);const h=this.calcHeadStartPosition(this.state.valueTo);this.head=new i(this.line.element,this.state.direction,h,this.state.valueTo)}init(){if("double"===this.state.type){const e=this.calcHeadStartPosition(this.state.valueFrom);this.head2=new i(this.line.element,this.state.direction,e,this.state.valueFrom),this.head2.element.setAttribute("data-valueFrom","true")}this.state.bubble&&(this.head.showBubble(),"double"===this.state.type&&void 0!==this.head2&&this.head2.showBubble()),this.line.progressValue(this.head.element,this.head2?.element),this.setup()}changePosition(e){if(e.onlyState)return;let t=0;if(void 0===e.valueNumber)throw new Error("Новое значение не определено");if(t=e.valueNumber,"valueTo"===e.target)this.head.updatePosition(t),this.head.updateBubble(this.state.valueTo),this.state.onChangeTo(this.state.valueTo),this.line.progressValue(this.head.element,this.head2?.element);else if("valueFrom"===e.target){if(void 0===this.head2)throw new Error("Head2 не существует");this.head2.updatePosition(t),this.head2.updateBubble(this.state.valueFrom),this.state.onChangeFrom(this.state.valueFrom),this.line.progressValue(this.head.element,this.head2.element)}}hideBubble(){this.updateState({target:"bubble",valueBoolean:!1,onlyState:!0}),this.head.hideBubble(),this.head2?.hideBubble(),this.notify({target:"bubble",valueBoolean:!1,onlyState:!0})}showBubble(){this.updateState({target:"bubble",valueBoolean:!0,onlyState:!0}),this.head.showBubble(),this.head2?.showBubble(),this.notify({target:"bubble",valueBoolean:!0,onlyState:!0})}set changeOrientation(e){this.updateState({target:"direction",valueString:e,onlyState:!0}),this.head.removeHead(),this.head2?.removeHead(),this.scale.removeScale(),this.line.removeLine(),this.reInit()}set changeType(e){this.updateState({target:"type",valueString:e,onlyState:!0}),this.head.removeHead(),this.head2?.removeHead(),delete this.head2,this.scale.removeScale(),this.line.removeLine(),this.reInit()}set changeStep(e){if(e>this.state.max-this.state.min)throw new Error("Шаг не может быть больше разницы максимума и минимума");this.state.step=e}set changeMax(e){if(e<=this.state.min)throw new Error("Максимум не может быть меньше или равен минимуму");this.updateState({target:"max",valueNumber:e,onlyState:!0}),this.head.removeHead(),this.head2?.removeHead(),this.scale.removeScale(),this.line.removeLine(),this.reInit()}set changeMin(e){if(e>=this.state.max||e>=this.state.valueTo)throw new Error("Минимум не может быть больше или равен максимуму");this.updateState({target:"min",valueNumber:e,onlyState:!0}),this.head.removeHead(),this.head2?.removeHead(),this.scale.removeScale(),this.line.removeLine(),this.reInit()}updateState(e){e.onlyState&&("string"==typeof this.state[e.target]?this.state[e.target]=e.valueString:"number"==typeof this.state[e.target]?this.state[e.target]=e.valueNumber:this.state[e.target]=e.valueBoolean)}reInit(){if(this.line=new a(this.elem,this.state.direction,this.state.type),this.scale=new s(this.line.element,this.state.direction,this.state.min,this.state.max),"double"===this.state.type){const e=this.calcHeadStartPosition(this.state.valueFrom);this.head2=new i(this.line.element,this.state.direction,e,this.state.valueFrom),this.head2.element.setAttribute("data-valueFrom","true")}const e=this.calcHeadStartPosition(this.state.valueTo);this.head=new i(this.line.element,this.state.direction,e,this.state.valueTo),this.state.bubble&&(this.head.showBubble(),"double"===this.state.type&&void 0!==this.head2&&this.head2.showBubble()),this.line.progressValue(this.head.element,this.head2?.element),this.setup()}setup(){this.elem.addEventListener("headStart",this.handleHeadStart),this.elem.addEventListener("scaleClick",this.handleScaleClick)}calcHeadStartPosition(e){return(e-this.state.min)/(this.state.max-this.state.min)}static getEvent(e){return e instanceof TouchEvent?e.touches[0]:e}scaleClickData(e){const t=n.getEvent(e.detail.data),i=[];return"horizontal"===this.state.direction?(i.push(this.line.getWidth),i.push(this.line.getLeftCoordinate),i.push(t.clientX)):(i.push(this.line.getHeight),i.push(this.line.getTopCoordinate),i.push(t.clientY)),i}}class h{constructor(e,t){this.model=e,this.view=t,this.view.subscribe(this.model.updateState.bind(this.model)),this.view.subscribe(this.model.calcPosition.bind(this.model)),this.model.subscribe(this.view.updateState.bind(this.view)),this.model.subscribe(this.view.changePosition.bind(this.view))}}class l extends e{constructor(e){super(),this.isValueTo=e=>(e-this.state.valueFrom)/(this.state.valueTo-this.state.valueFrom)>=.5,this.state=Object.assign({},e)}calcPosition(e){if(e.onlyState)return;let t,i;"valueTo"===e.target?(i="valueTo",t=this.calcUpdatedValue(e,i)):"value"===e.target?(t=this.calcUpdatedValueRelative(e),i="single"===this.state.type||this.isValueTo(t)?"valueTo":"valueFrom",t="valueFrom"===i?this.validValueFrom(t):this.validValueTo(t)):(i="valueFrom",t=this.calcUpdatedValue(e,i)),t=Number(t.toFixed(2)),this.updateState({target:i,valueNumber:t,onlyState:!0}),this.notify({target:i,valueNumber:t,onlyState:!0});let s=l.getValueRelative(t,this.state.min,this.state.max);s=l.moreThan0LessThan1(s),this.notify({target:i,valueNumber:s,onlyState:!1})}set changeOrientation(e){this.updateState({target:"direction",valueString:e,onlyState:!0})}set changeType(e){this.updateState({target:"type",valueString:e,onlyState:!0}),this.state.min>this.state.valueFrom&&(this.changeFrom=this.state.min),this.state.valueFrom>this.state.valueTo&&(this.changeFrom=this.state.valueTo)}set changeStep(e){if(t=e,i=this.state.max,s=this.state.min,!(t<i-s&&t>0))throw new Error("Шаг не может быть больше разницы максимума и минимума или меньше нуля");var t,i,s;this.state.step=e}get getStep(){return this.state.step}set changeMax(e){if(e<=this.state.min)throw new Error("Максимум не может быть меньше или равен минимуму");this.updateState({target:"max",valueNumber:e,onlyState:!0}),e<this.state.valueTo&&(this.changeTo=e)}get getMax(){return this.state.max}set changeMin(e){if(e>=this.state.max||e>=this.state.valueTo)throw new Error("Минимум не может быть больше или равен максимуму");this.updateState({target:"min",valueNumber:e,onlyState:!0}),"double"===this.state.type&&e>this.state.valueFrom&&(this.changeFrom=e)}get getMin(){return this.state.min}set changeTo(e){this.updateState({target:"valueTo",valueNumber:this.validValueTo(e),onlyState:!0}),this.notify({valueNumber:this.state.valueTo,target:"valueTo",onlyState:!0});let t=l.getValueRelative(this.state.valueTo,this.state.min,this.state.max);t=l.moreThan0LessThan1(t),this.notify({valueNumber:t,target:"valueTo",onlyState:!1})}get getValueTo(){return this.state.valueTo}set changeFrom(e){if("single"===this.state.type)return;this.updateState({target:"valueFrom",valueNumber:Number(this.validValueFrom(e).toFixed(2)),onlyState:!0}),this.notify({valueNumber:this.state.valueFrom,target:"valueFrom",onlyState:!0});let t=l.getValueRelative(this.state.valueFrom,this.state.min,this.state.max);t=l.moreThan0LessThan1(t),this.notify({valueNumber:t,target:"valueFrom",onlyState:!1})}get getValueFrom(){return this.state.valueFrom}updateState(e){e.onlyState&&("string"==typeof this.state[e.target]?this.state[e.target]=e.valueString:"number"==typeof this.state[e.target]?this.state[e.target]=e.valueNumber:this.state[e.target]=e.valueBoolean)}static moreThan0LessThan1(e){let t=e;return t=t>1?1:t,t=t<0?0:t,t}static getValueRelative(e,t,i){return(e-t)/(i-t)}calcValue(e,t="valueTo"){let i=e;return i*=this.state.max-this.state.min,this.state.min+this.calcValueByStep(i,t)}calcValueByStep(e,t){let i=e;if(void 0===this.state.step)throw new Error("Значение step не определено");const s=i/this.state.step;if(i=s%1>=.5?this.state.step*Math.ceil(s):this.state.step*Math.floor(s),"valueTo"===t){s===(this.state.max-this.state.min)/this.state.step&&(i=this.state.min<0?this.state.max+Math.abs(this.state.min):this.state.max)}const a=this.state.step.toString().split(".").pop();let n=0;return void 0!==a&&(n=this.state.step.toString().includes(".")?a.length:0),Number(i.toFixed(n))}validValueTo(e){return e>this.state.max?this.state.max:e<this.state.min?this.state.min:"double"===this.state.type&&e<=this.state.valueFrom?this.state.valueFrom+this.state.step:e}validValueFrom(e){return e<this.state.min?this.state.min:e>=this.state.valueTo?this.state.valueTo-this.state.step:e}calcUpdatedValue(e,t){if(void 0===e.valueArray)throw new Error("Ожидался массив значений для Model");const[i,s,a,n,h,r]=e.valueArray;let o=(h-(s-i)-n+r)/a;o=l.moreThan0LessThan1(o);const u=this.calcValue(o,t);return"valueTo"===t?this.validValueTo(u):this.validValueFrom(u)}calcUpdatedValueRelative(e){if(void 0===e.valueArray)throw new Error("Ожидался массив значений для Model");const[t,i,s]=e.valueArray;let a=(s-i)/t;return a=l.moreThan0LessThan1(a),this.calcValue(a)}}class r{constructor(e,t){this.elem=e,this.model=new l(t),this.view=new n(this.elem,t),this.view.init(),this.presenter=new h(this.model,this.view)}hideBubble(){return this.view.hideBubble(),!0}showBubble(){return this.view.showBubble(),!0}changeOrientation(e){return this.view.changeOrientation=e,this.model.changeOrientation=e,!0}changeType(e){return this.view.changeType=e,this.model.changeType=e,!0}changeStep(e){return this.model.changeStep=e,this.view.changeStep=e,!0}changeTo(e){return this.model.changeTo=e,!0}changeFrom(e){return this.model.changeFrom=e,!0}changeMax(e){return this.model.changeMax=e,this.view.changeMax=e,!0}changeMin(e){return this.model.changeMin=e,this.view.changeMin=e,!0}getMax(){return this.model.getMax}getMin(){return this.model.getMin}getValueTo(){return this.model.getValueTo}getValueFrom(){return this.model.getValueFrom}getStep(){return this.model.getStep}}!function(e){const t=[],i={init:function(i){const s=e.extend({bubble:!0,max:100,min:0,step:1,type:"single",valueTo:100,valueFrom:5,direction:"horizontal",onChangeTo:function(){},onChangeFrom:function(){}},i);return this.each((function(){const i=e(this);if(s.step>s.max-s.min)throw new Error("Шаг не может быть больше разницы максимума и минимума");if(s.step<=0)throw new Error("Шаг должен быть больше нуля");if(s.valueTo>s.max)throw new Error("Текущее значение не может быть больше максимума");if(s.valueFrom<s.min)throw new Error("Текущее значение не может быть меньше минимума");t.push(new r(i[0],s))}))},hideBubble:function(){let e;t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.hideBubble()},showBubble:function(){let e;t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.showBubble()},changeOrientation:function(e){let i;t.forEach((e=>{e.elem===this[0]&&(i=e)})),i.changeOrientation(e)},changeType:function(e){let i;t.forEach((e=>{e.elem===this[0]&&(i=e)})),i.changeType(e)},changeStep:function(e){let i;if(t.forEach((e=>{e.elem===this[0]&&(i=e)})),Number.isNaN(e))throw new Error("step должно быть числом");i.changeStep(e)},changeTo:function(e){let i;if(t.forEach((e=>{e.elem===this[0]&&(i=e)})),Number.isNaN(e))throw new Error("valueTo должно быть числом");i.changeTo(e)},changeFrom:function(e){let i;if(t.forEach((e=>{e.elem===this[0]&&(i=e)})),Number.isNaN(e))throw new Error("valueFrom должно быть числом");i.changeFrom(e)},changeMax:function(e){let i;if(t.forEach((e=>{e.elem===this[0]&&(i=e)})),Number.isNaN(e))throw new Error("valueFrom должно быть числом");i.changeMax(e)},getMax:function(){let e;return t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.getMax()},getMin:function(){let e;return t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.getMin()},getValueTo:function(){let e;return t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.getValueTo()},getValueFrom:function(){let e;return t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.getValueFrom()},getStep:function(){let e;return t.forEach((t=>{t.elem===this[0]&&(e=t)})),e.getStep()},changeMin:function(e){let i;if(t.forEach((e=>{e.elem===this[0]&&(i=e)})),Number.isNaN(e))throw new Error("valueFrom должно быть числом");i.changeMin(e)}};e.fn.Slider=function(t){return i[t]?i[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?(e.error("Метод с именем "+t+" не существует для jQuery.slider"),null):i.init.apply(this,arguments)}}(jQuery);var o=class{constructor(e,t){this.handleBubbleButtonClick=e=>{e.target.checked?this.slider?.Slider("showBubble"):this.slider?.Slider("hideBubble")},this.handleVerticalButtonClick=e=>{e.target.checked?this.slider?.Slider("changeOrientation","vertical"):this.slider?.Slider("changeOrientation","horizontal")},this.handleRangeButtonClick=e=>{e.target.checked?(this.slider?.Slider("changeType","double"),this.$fromInput?.parent().removeClass("slider-template__label_hide")):(this.slider?.Slider("changeType","single"),this.$fromInput?.parent().addClass("slider-template__label_hide"))},this.handleStepInputChange=e=>{try{this.slider?.Slider("changeStep",parseFloat(e.target.value))}catch(t){e.target.value=this.slider?.Slider("getStep")}},this.handleToInputChange=e=>{this.slider?.Slider("changeTo",parseFloat(e.target.value))},this.handleFromInputChange=e=>{this.slider?.Slider("changeFrom",parseFloat(e.target.value))},this.handleMaxInputChange=e=>{try{this.slider?.Slider("changeMax",parseFloat(e.target.value))}catch(t){e.target.value=this.slider?.Slider("getMax")}},this.handleMinInputChange=e=>{try{this.slider?.Slider("changeMin",parseFloat(e.target.value))}catch(t){e.target.value=this.slider?.Slider("getMin")}},this.element=$(e),this.init(t)}init(e){this.$bubbleButton=$(this.element.find('input[data-type="bubble"]')),this.$verticalButton=$(this.element.find('input[data-type="vertical"]')),this.$rangeButton=$(this.element.find('input[data-type="range"]')),this.$stepInput=$(this.element.find('input[data-type="step"]')),this.$toInput=$(this.element.find('input[data-type="to"]')),this.$fromInput=$(this.element.find('input[data-type="from"]')),this.$maxInput=$(this.element.find('input[data-type="max"]')),this.$minInput=$(this.element.find('input[data-type="min"]'));const t=Object.assign(e,{onChangeTo:e=>{this.$toInput?.val(e)},onChangeFrom:e=>{this.$fromInput?.val(e)}});this.slider=$(this.element.find(".slider")).Slider(t),this.setup()}setup(){this.$bubbleButton?.on("click",this.handleBubbleButtonClick),this.$verticalButton?.on("click",this.handleVerticalButtonClick),this.$rangeButton?.on("click",this.handleRangeButtonClick),this.$rangeButton?.is(":checked")||this.$fromInput?.parent().addClass("slider-template__label_hide"),this.$stepInput?.on("change",this.handleStepInputChange),this.$stepInput?.val(String(this.slider?.Slider("getStep"))),this.$toInput?.on("change",this.handleToInputChange),this.$toInput?.val(String(this.slider?.Slider("getValueTo"))),this.$fromInput?.on("change",this.handleFromInputChange),this.$fromInput?.val(String(this.slider?.Slider("getValueFrom"))),this.$maxInput?.on("change",this.handleMaxInputChange),this.$maxInput?.val(String(this.slider?.Slider("getMax"))),this.$minInput?.on("change",this.handleMinInputChange),this.$minInput?.val(String(this.slider?.Slider("getMin")))}};$((function(){const e=[{bubble:!0,direction:"horizontal",max:100,min:0,step:1,type:"double",valueTo:100,valueFrom:0,onChangeTo:function(){},onChangeFrom:function(){}},{bubble:!1,direction:"vertical",max:90,min:5,step:2,type:"single",valueTo:50,valueFrom:15,onChangeTo:function(){},onChangeFrom:function(){}},{bubble:!0,direction:"horizontal",max:1e3,min:-100,step:30,type:"single",valueTo:780,valueFrom:-5,onChangeTo:function(){},onChangeFrom:function(){}}];$(".slider-template").each(((t,i)=>{new o(i,e[t])}))}));
//# sourceMappingURL=index.a4e526f7.js.map
