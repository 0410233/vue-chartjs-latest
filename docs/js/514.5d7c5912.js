"use strict";(self["webpackChunkelife_env"]=self["webpackChunkelife_env"]||[]).push([[514,546],{7514:function(t,a,o){o.r(a),o.d(a,{default:function(){return u}});var r=function(){var t=this,a=t._self._c;t._self._setupProxy;return a("div",{staticClass:"options"},[a("h4",{staticClass:"options__title"},[t._v(t._s(t.meta.label))]),a("el-form",{staticClass:"options__form",attrs:{model:t.formdata,rules:t.rules,size:"small","label-position":"top"},nativeOn:{submit:function(a){return a.preventDefault(),t.noop.apply(null,arguments)}}},[a("el-form-item",{attrs:{prop:"caption",error:t.errorsmap.caption,label:"标题"}},[a("el-input",{attrs:{size:"small"},on:{input:function(a){return t.handleChange(a,"caption")}},model:{value:t.formdata.caption,callback:function(a){t.$set(t.formdata,"caption",a)},expression:"formdata.caption"}})],1),a("el-form-item",{attrs:{prop:"description",label:"描述"}},[a("el-input",{attrs:{type:"textarea",size:"small"},on:{input:function(a){return t.handleChange(a,"description")}},model:{value:t.formdata.description,callback:function(a){t.$set(t.formdata,"description",a)},expression:"formdata.description"}})],1)],1),a("el-form",{staticClass:"options__form",attrs:{model:t.formdata,rules:t.rules,size:"small","label-position":"left","label-width":"80px"},nativeOn:{submit:function(a){return a.preventDefault(),t.noop.apply(null,arguments)}}},[a("el-form-item",{attrs:{prop:"textAlign",error:t.errorsmap.textAlign,label:"显示位置"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.alignDisplay[t.formdata.textAlign]||""))]),a("el-radio-group",{staticClass:"ml-auto",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"textAlign")}},model:{value:t.formdata.textAlign,callback:function(a){t.$set(t.formdata,"textAlign",a)},expression:"formdata.textAlign"}},[a("el-radio-button",{attrs:{label:"left"}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M102.4 153.6h819.2V256H102.4zm0 204.8h473.6v102.4H102.4zM102.4 563.2h819.2v102.4H102.4zM102.4 768h409.6v102.4H102.4z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:"center"}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M102.4 153.6h819.2V256H102.4zm204.8 204.8h409.6v102.4H307.2zM102.4 563.2h819.2v102.4H102.4zM307.2 768h409.6v102.4H307.2z",fill:"currentColor"}})])])],1)],1)]),a("el-form-item",{attrs:{prop:"captionFontSize",error:t.errorsmap.captionFontSize,label:"标题大小"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.fontSizeDisplay[t.formdata.captionFontSize]||""))]),a("el-radio-group",{staticClass:"ml-auto",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"captionFontSize")}},model:{value:t.formdata.captionFontSize,callback:function(a){t.$set(t.formdata,"captionFontSize",a)},expression:"formdata.captionFontSize"}},[a("el-radio-button",{attrs:{label:12}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M366.182 716.186l56.525-159.13h173.261l56.525 159.13h50.38L533.914 250.47h-49.766L315.802 716.186h50.38zM579.38 511.59H439.296l68.198-191.692h3.687l68.198 191.692z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:14}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M324.813 767.283l65.945-185.651h202.138l65.946 185.651h58.777L520.5 223.95h-58.06L266.034 767.283h58.778zm248.73-238.694H410.111l79.565-223.642h4.3l79.565 223.642z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:16}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M294.093 823.552l70.502-201.062h241.101l70.502 201.062h104.448l-244.582-672.82H434.227l-244.582 672.82h104.448zM572.62 529.357H397.67l84.428-241.971h5.223l85.299 241.97z",fill:"currentColor"}})])])],1)],1)]),a("el-form-item",{attrs:{prop:"descriptionFontSize",error:t.errorsmap.descriptionFontSize,label:"描述大小"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.fontSizeDisplay[t.formdata.descriptionFontSize]||""))]),a("el-radio-group",{staticClass:"ml-auto",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"descriptionFontSize")}},model:{value:t.formdata.descriptionFontSize,callback:function(a){t.$set(t.formdata,"descriptionFontSize",a)},expression:"formdata.descriptionFontSize"}},[a("el-radio-button",{attrs:{label:12}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M366.182 716.186l56.525-159.13h173.261l56.525 159.13h50.38L533.914 250.47h-49.766L315.802 716.186h50.38zM579.38 511.59H439.296l68.198-191.692h3.687l68.198 191.692z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:14}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M324.813 767.283l65.945-185.651h202.138l65.946 185.651h58.777L520.5 223.95h-58.06L266.034 767.283h58.778zm248.73-238.694H410.111l79.565-223.642h4.3l79.565 223.642z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:16}},[a("svg",{staticClass:"radio-button-icon",staticStyle:{width:"20px",height:"20px"},attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M294.093 823.552l70.502-201.062h241.101l70.502 201.062h104.448l-244.582-672.82H434.227l-244.582 672.82h104.448zM572.62 529.357H397.67l84.428-241.971h5.223l85.299 241.97z",fill:"currentColor"}})])])],1)],1)]),a("el-form-item",{attrs:{prop:"captionFontWeight",error:t.errorsmap.captionFontWeight,label:"标题粗细"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.fontWeightDisplay[t.formdata.captionFontWeight]||""))]),a("el-radio-group",{staticClass:"ml-auto",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"captionFontWeight")}},model:{value:t.formdata.captionFontWeight,callback:function(a){t.$set(t.formdata,"captionFontWeight",a)},expression:"formdata.captionFontWeight"}},[a("el-radio-button",{attrs:{label:400}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M896 179.2v179.2h-51.2v-128H179.2v128H128V179.2z",fill:"currentColor"}}),a("path",{attrs:{d:"M537.6 204.8v665.6h-51.2V204.8z",fill:"currentColor"}}),a("path",{attrs:{d:"M614.4 844.8V896H409.6v-51.2z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:600}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M921.6 153.6v204.8H819.2V256H204.8v102.4H102.4V153.6z",fill:"currentColor"}}),a("path",{attrs:{d:"M563.2 204.8v665.6H460.8V204.8z",fill:"currentColor"}}),a("path",{attrs:{d:"M640 819.2v102.4H384V819.2z",fill:"currentColor"}})])])],1)],1)]),a("el-form-item",{attrs:{prop:"descriptionFontWeight",error:t.errorsmap.descriptionFontWeight,label:"描述粗细"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.fontWeightDisplay[t.formdata.descriptionFontWeight]||""))]),a("el-radio-group",{staticClass:"ml-auto",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"descriptionFontWeight")}},model:{value:t.formdata.descriptionFontWeight,callback:function(a){t.$set(t.formdata,"descriptionFontWeight",a)},expression:"formdata.descriptionFontWeight"}},[a("el-radio-button",{attrs:{label:400}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M896 179.2v179.2h-51.2v-128H179.2v128H128V179.2z",fill:"currentColor"}}),a("path",{attrs:{d:"M537.6 204.8v665.6h-51.2V204.8z",fill:"currentColor"}}),a("path",{attrs:{d:"M614.4 844.8V896H409.6v-51.2z",fill:"currentColor"}})])]),a("el-radio-button",{attrs:{label:600}},[a("svg",{staticClass:"radio-button-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M921.6 153.6v204.8H819.2V256H204.8v102.4H102.4V153.6z",fill:"currentColor"}}),a("path",{attrs:{d:"M563.2 204.8v665.6H460.8V204.8z",fill:"currentColor"}}),a("path",{attrs:{d:"M640 819.2v102.4H384V819.2z",fill:"currentColor"}})])])],1)],1)]),a("el-form-item",{attrs:{prop:"captionColor",error:t.errorsmap.captionColor,label:"标题颜色"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.formdata.captionColor))]),a("el-button",{staticClass:"ml-auto",attrs:{type:"text"},on:{click:function(a){return t.reset("captionColor")}}},[t._v("重置")]),a("el-color-picker",{staticClass:"ml-8px",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"captionColor")}},model:{value:t.formdata.captionColor,callback:function(a){t.$set(t.formdata,"captionColor",a)},expression:"formdata.captionColor"}})],1)]),a("el-form-item",{attrs:{prop:"descriptionColor",error:t.errorsmap.descriptionColor,label:"描述颜色"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.formdata.descriptionColor))]),a("el-button",{staticClass:"ml-auto",attrs:{type:"text"},on:{click:function(a){return t.reset("descriptionColor")}}},[t._v("重置")]),a("el-color-picker",{staticClass:"ml-8px",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"descriptionColor")}},model:{value:t.formdata.descriptionColor,callback:function(a){t.$set(t.formdata,"descriptionColor",a)},expression:"formdata.descriptionColor"}})],1)]),a("el-form-item",{attrs:{prop:"backgroundColor",error:t.errorsmap.backgroundColor,label:"背景颜色"}},[a("div",{staticClass:"flex items-center w-full"},[a("span",{staticClass:"el-form-item__value"},[t._v(t._s(t.formdata.backgroundColor))]),a("el-button",{staticClass:"ml-auto",attrs:{type:"text"},on:{click:function(a){return t.reset("backgroundColor")}}},[t._v("重置")]),a("el-color-picker",{staticClass:"ml-8px",attrs:{size:"small"},on:{change:function(a){return t.handleChange(a,"backgroundColor")}},model:{value:t.formdata.backgroundColor,callback:function(a){t.$set(t.formdata,"backgroundColor",a)},expression:"formdata.backgroundColor"}})],1)])],1)],1)},e=[],l=o(3721),i=o(3546),n=(0,l.WN)(i,{data(){return{alignDisplay:{left:"居左显示",center:"居中显示"},fontSizeDisplay:{16:"大(16号)",14:"中(14号)",12:"小(12号)"},fontWeightDisplay:{400:"常规体",600:"加粗体"}}}}),s=n,c=o(1001),p=(0,c.Z)(s,r,e,!1,null,"045ff416",null),u=p.exports},3546:function(t,a,o){o.r(a),o.d(a,{getFormdata:function(){return l},getMeta:function(){return n},getProps:function(){return e},getRules:function(){return s},getWatchers:function(){return i},updateFormdata:function(){return c}});var r=o(3721);function e(){return{caption:{type:String,default:"标题"},description:{type:String,default:"标题描述"},textAlign:{type:String,default:"left"},captionFontSize:{type:Number,default:14},descriptionFontSize:{type:Number,default:14},captionFontWeight:{type:Number,default:600},descriptionFontWeight:{type:Number,default:400},captionColor:{type:String,default:"#323232"},descriptionColor:{type:String,default:"#969799"},backgroundColor:{type:String,default:"#ffffff"},errors:{type:[Array,Boolean],default:!1}}}function l(){const t=(0,r.lN)(e());return t}function i(){const t=(0,r._6)(e());return t}function n(){return{name:"caption",label:"标题文本",cate:"basic",limit:100,data:l()}}function s(){return{caption:{type:"string",required:!0,message:"请输入标题",trigger:["change","blur"]}}}async function c(t){return t}}}]);
//# sourceMappingURL=514.5d7c5912.js.map