"use strict";(self["webpackChunkelife_env"]=self["webpackChunkelife_env"]||[]).push([[679,123],{679:function(t,e,n){n.r(e),n.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"navigation-view",class:["cols-"+t.groupCount,"is-"+t.navStyle],style:t.navigationStyle},[t.links.length?t._e():t._l(4,(function(n){return e("div",{key:n,staticClass:"nav-item",on:{click:t.onClickExample}},[t._m(0,!0),e("span",{staticClass:"nav-item__title",style:{color:t.fontColor||"#333333"}},[t._v("示例导航")])])})),t._l(t.links,(function(n,i){return e("div",{key:i,staticClass:"nav-item",on:{click:function(e){return t.onNavItemClick(n)}}},[e("div",{staticClass:"nav-item__img",class:!n.image&&"is-empty"},[e("div",{staticClass:"img-wrapper"},[n.image?e("img",{attrs:{src:n.image,alt:""}}):e("i",{staticClass:"img-placeholder el-icon-picture"})])]),e("span",{staticClass:"nav-item__title",style:{color:t.fontColor||"#333333"}},[t._v(t._s(n.title||"（标题）"))])])}))],2)},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"nav-item__img is-empty"},[e("div",{staticClass:"img-wrapper"},[e("i",{staticClass:"img-placeholder el-icon-picture"})])])}],r=n(5123),s={props:(0,r.getProps)(),computed:{navigationStyle(){const t={background:this.backgroundColor,overflowX:"wrap"===this.layout?"hidden":"auto",flexWrap:"wrap"===this.layout?"wrap":"nowrap"};return t}},methods:{onNavItemClick(t){this.$message.success("跳转到 "+t.title)},onClickExample(){this.$message.warn("这是示例数据，请添加真实导航")}}},l=s,o=n(1001),c=(0,o.Z)(l,i,a,!1,null,"7c0e5d4e",null),u=c.exports},5123:function(t,e,n){n.r(e),n.d(e,{getFormdata:function(){return r},getMeta:function(){return l},getProps:function(){return a},getRules:function(){return o},getWatchers:function(){return s}});var i=n(3721);function a(){return{links:{type:Array,default:()=>[]},navStyle:{type:String,default:"image"},layout:{type:String,default:"wrap"},groupCount:{type:Number,default:4},backgroundColor:{type:String,default:"#ffffff"},fontColor:{type:String,default:"#333333"}}}function r(){const t=(0,i.lN)(a());return t}function s(){const t=(0,i._6)(a());return t}function l(){return{name:"navigation",label:"图文导航",cate:"basic",limit:100,data:r()}}function o(){return{links:{type:"array",required:!0,message:"请选择链接",defaultField:{type:"object",fields:{path:{type:"string",required:!0,message:"请选择链接"}}}}}}}}]);
//# sourceMappingURL=679.7be8f0dc.js.map