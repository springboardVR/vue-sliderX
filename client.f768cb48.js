webpackJsonp([0],[,,function(t,e,n){"use strict";var i=n(3);e.a={components:{VirtualViewport:i.a},data:function(){return{orientation:"horizontal",index:0,loop:!1,sliderSize:"-small"}},mounted:function(){var t=this;window.addEventListener("keydown",function(e){var n=e.key;"ArrowLeft"===n&&t.index--,"ArrowRight"===n&&t.index++})}}},function(t,e,n){"use strict";var i=n(4),r=n(0),o=r(i.a,null,!1,null,null,null);e.a=o.exports},function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}e.a={name:"VirtualViewport",functional:!0,props:{index:{required:!0,type:Number},perPage:{required:!0,type:Number},orientation:{required:!0,type:String},offset:{type:Number,default:1}},render:function(t,e){var n=e.props,r=e.children,o=r.length,a=n.index,s=n.perPage,l=n.loop,u=n.offset,c=a<0?(o+a)%o:a%o,f=function(t,e){var n=0+t;return[[0-e],[0,n],[n,n+e]]}(s,u),p=0!==c||l?[].concat(i(r.slice(c,o)),i(r.slice(0,c))):r;return[p.slice.apply(p,i(f[1])),p.slice.apply(p,i(f[2]))]}}},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var o=n(19),a=n(3),s=n(21),l=n(23);e.a={name:"Slider",props:{perPage:{default:3,type:Number},current:{default:0,type:Number},viewportClass:{default:"",type:String},orientation:{default:"vertical",type:String},offset:{default:1,type:Number},loop:{default:!0,type:Boolean},clone:{default:!0,type:Boolean},navigationIncrement:{default:1,type:Number},autoSize:{default:!1,type:Boolean}},data:function(){return{index:0,isTransitioning:!1,effectiveTransform:0,elementSize:0}},computed:{canNext:function(){if(this.loop)return!0;var t=this.$slots.default.length;return this.index+this.navigationIncrement<t},canPrev:function(){return!!this.loop||this.index-this.navigationIncrement>0},transform:function(){return this.autoSize?(this.index+this.offset)*this.elementSizeValue+"px":(this.index+this.offset)*this.percentage+"%"},padding:function(){return this.autoSize?this.effectiveIndex*this.elementSizeValue+this.offset*this.elementSizeValue+"px":this.effectiveIndex*this.percentage+this.offset*this.percentage+"%"},effectiveIndex:function(){return this.autoSize?Math.floor(-this.effectiveTransform/this.elementSizeValue)-this.offset:Math.floor(this.effectiveTransform/this.percentage)-this.offset},elementSizeValue:function(){return("horizontal"===this.orientation?this.elementSize.width:this.elementSize.height)||1},percentage:function(){return Math.round(1/this.perPage*1e4)/100},viewportSize:function(){return"horizontal"===this.orientation?{width:this.elementSize.width*this.perPage,height:this.elementSize.height}:{width:this.elementSize.width,height:this.elementSize.height*this.perPage}}},watch:{current:{immediate:!0,handler:function(t){this.index=t}},orientation:function(t){this.effectiveTransform=0},loop:function(t){this.index=this.current}},methods:{next:function(){this.index=this.canNext?this.index+this.navigationIncrement:this.index},prev:function(){this.index=this.canPrev>0?this.index-this.navigationIncrement:this.index}},render:function(t){var e=this,n=function(){var t=e.perPage+e.offset-e.$slots.default.length,n=t>0;if(e.clone&&n){var i=function(){return function t(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(n>0){var o=[].concat(r(i),r(Object(l.a)(e.$slots.default.slice(0,n),e.$createElement)));return t(Math.max(0,n-o.length),o)}return i}(t)}();return[].concat(r(e.$slots.default),r(i.map(function(t,e){return Object.assign({},t,{key:"clone"+e+t.key})})))}return e.$slots.default}(),u=n.map(function(t){var n;return e.$parent.$createElement("div",{class:"elwrapper",key:t.key,style:(n={},i(n,"horizontal"===e.orientation?"width":"height",e.percentage+"%"),i(n,"flexShrink","0"),n)},[t])}),c=void 0;this.autoSize&&(c=t(s.a,{on:{changed:function(t){e.elementSize=t}}},[u[0]]));var f=t(o.a,{class:["viewport",this.viewportClass],on:{tick:function(t){e.effectiveTransform=t}},props:{transformValue:this.transform,padding:this.padding,orientation:this.orientation}},[t(a.a,{props:{index:this.effectiveIndex,perPage:this.perPage,orientation:this.orientation}},u)]);return t("div",{class:{"slider-container":!0,"-cannext":this.canNext,"-canprev":this.canPrev,"-is-transitioning":this.isTransitioning},style:Object.assign({position:"relative"},this.autoSize?{height:this.viewportSize.height+"px",width:this.viewportSize.width+"px"}:{})},[this.$scopedSlots.prev&&this.$scopedSlots.prev({canPrev:this.canPrev,prev:this.prev,index:this.index}),c,f,this.$scopedSlots.next&&this.$scopedSlots.next({canNext:this.canNext,next:this.next,index:this.index})])}}},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=n(20),o=(n.n(r),function(){function t(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}());e.a={name:"TransformContainer",props:{transformValue:{default:"0px",type:String},padding:{default:"0px",type:String},orientation:{default:"vertical",type:String}},render:function(t){var e=this,n=/(\d*\.?\d*)(%|px)/,a=this.transformValue.match(n),s=o(a,3),l=s[1],u=s[2],c=function(t,n){return"horizontal"===e.orientation?"translate3d(-"+t+n+", 0px, 0px)":"translate3d(0px, -"+t+n+", 0px)"};return t(r.Motion,{props:{value:Number(l),tag:"div"},class:"viewport",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},on:{},scopedSlots:{default:function(n){var r=n.value;return e.$emit("tick",r),t("div",{class:"transformcontainer",style:i({transform:c(r,u),display:"flex",flexDirection:"horizontal"===e.orientation?"row":"column",position:"absolute",width:"100%",height:"100%"},"horizontal"===e.orientation?"left":"top",e.padding)},e.$slots.default)}}})}}},function(t,e,n){"use strict";var i=n(22);e.a={name:"RenderedSize",created:function(){var t=this;this.$nextTick(function(){t._computeSize(),new i.a(function(e,n){t._computeSize()}).observe(t.$el)})},methods:{_computeSize:function(){var t=this.$el;t&&this.$emit("changed",{width:t.scrollWidth,height:t.scrollHeight})}},render:function(t){if(this.$slots.default){var e=this.$slots.default[0],n=e.children||e.text;return t("span",{style:{position:"absolute",visibility:"hidden",left:"-10000px",top:"-10000px"}},[t(e.tag,e.data,n)])}}}},function(t,e,n){t.exports=n(9)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),r=n(14),o=n(17);i.a.use(o.a),new i.a({el:"#app",render:function(t){return t(r.a)}})},,,,,function(t,e,n){"use strict";function i(t){n(15)}var r=n(2),o=n(16),a=n(0),s=i,l=a(r.a,o.a,!1,s,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pa5 flex flex-column"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.orientation,expression:"orientation"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.orientation=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"horizontal"}},[t._v("horizontal")]),t._v(" "),n("option",{attrs:{value:"vertical"}},[t._v("vertical")])]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.loop,expression:"loop"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.loop=e.target.multiple?n:n[0]}}},[n("option",{domProps:{value:!0}},[t._v("loop")]),t._v(" "),n("option",{domProps:{value:!1}},[t._v("no loop")])]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.sliderSize,expression:"sliderSize"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.sliderSize=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"-small"}},[t._v("small")]),t._v(" "),n("option",{attrs:{value:"-big"}},[t._v("big")])]),t._v(" "),n("h1",[t._v("Default")]),t._v(" "),n("div",{staticClass:"slider-container"},[n("Slider",{staticClass:"slider flex",class:t.sliderSize,attrs:{current:t.index,"per-page":3,orientation:t.orientation,loop:t.loop}},t._l(10,function(e){return n("div",{key:e,staticClass:"items pa3 tc white b bg-blue"},[t._v("\n        "+t._s(e)+"\n      ")])}))],1),t._v(" "),n("h1",[t._v("Autosize")]),t._v(" "),n("Slider",{staticClass:"sliderautosized flex",class:t.sliderSize,attrs:{current:t.index,"per-page":3,orientation:t.orientation,loop:t.loop,"auto-size":!0}},t._l(10,function(e){return n("div",{key:e,staticClass:"items pa3 tc white b bg-blue"},[t._v("\n      "+t._s(e)+"\n    ")])})),t._v(" "),n("h1",[t._v("Clone")]),t._v(" "),n("div",{staticClass:"slider-container"},[n("Slider",{staticClass:"slider flex",class:t.sliderSize,attrs:{current:t.index,"per-page":4,orientation:t.orientation,loop:t.loop,clone:!0}},t._l(2,function(e){return n("div",{key:e,staticClass:"items pa3 tc white b bg-blue"},[t._v("\n        "+t._s(e)+"\n      ")])}))],1)],1)},r=[],o={render:i,staticRenderFns:r};e.a=o},function(t,e,n){"use strict";var i=n(18),r=function(t){t.component(i.a.name,i.a)};e.a=r},function(t,e,n){"use strict";var i=n(5),r=n(0),o=r(i.a,null,!1,null,null,null);e.a=o.exports},function(t,e,n){"use strict";var i=n(6),r=n(0),o=r(i.a,null,!1,null,null,null);e.a=o.exports},,function(t,e,n){"use strict";var i=n(7),r=n(0),o=r(i.a,null,!1,null,null,null);e.a=o.exports},,function(t,e,n){"use strict";function i(t,e){function n(t){var i=t.children&&t.children.map(function(t){return n(t)}),r=e(t.tag,t.data,i);return r.text=t.text,r.isComment=t.isComment,r.componentOptions=t.componentOptions,r.elm=t.elm,r.context=t.context,r.ns=t.ns,r.isStatic=t.isStatic,r.key=t.key,r}return t.map(function(t){return n(t)})}e.a=i}],[8]);
//# sourceMappingURL=client.f768cb48.js.map