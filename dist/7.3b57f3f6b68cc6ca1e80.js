webpackJsonp([7],{5:function(n,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={ready:function(){},methods:{goToCreateAccount:function(){this.$router.go({name:"create-account"})}}}},15:function(n,e,t){e=n.exports=t(1)(),e.push([n.id,"#manage-account{max-width:1024px;margin:0 auto;padding:0 8px}#manage-account .pure-menu{border-bottom:1px solid #ccc;padding-bottom:16px}","",{version:3,sources:["/./src/ManageAccount.vue"],names:[],mappings:"AA+BA,gBACE,iBAAkB,AAClB,cAAe,AACf,aAAc,CACf,AAED,2BACE,6BAA8B,AAC9B,mBAAoB,CACrB",file:"ManageAccount.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#manage-account {\n  max-width: 1024px;\n  margin: 0 auto;\n  padding: 0 8px\n}\n\n#manage-account .pure-menu {\n  border-bottom: 1px solid #ccc;\n  padding-bottom: 16px\n}\n\n"],sourceRoot:"webpack://"}])},24:function(n,e,t){var a=t(15);"string"==typeof a&&(a=[[n.id,a,""]]);t(2)(a,{});a.locals&&(n.exports=a.locals)},36:function(n,e){n.exports=' <div id=manage-account> <h1 class=left-heading>{{$route.title}}</h1> <div class="pure-menu pure-menu-horizontal"> <ul class=pure-menu-list> <li class=pure-menu-item v-link=""><a class=pure-menu-link v-link="{name: \'student-account\', activeClass: \'active\'}">學生賬號</a></li> <li class=pure-menu-item><a class=pure-menu-link v-link="{name: \'teacher-account\', activeClass: \'active\'}">教師賬號</a></li> <li class=pure-menu-item><a class=pure-menu-link>家长賬號</a></li> <li class=pure-menu-item><a class=pure-menu-link>高級權限賬號</a></li> <a class="pure-button button-secondary" @click=goToCreateAccount()>新建賬號</a> </ul> </div> <router-view :is=view transition=fade transition-mode=out-in keep-alive></router-view> </div> '},46:function(n,e,t){var a,o,c={};t(24),a=t(5),o=t(36),n.exports=a||{},n.exports.__esModule&&(n.exports=n.exports["default"]);var u="function"==typeof n.exports?n.exports.options||(n.exports.options={}):n.exports;o&&(u.template=o),u.computed||(u.computed={}),Object.keys(c).forEach(function(n){var e=c[n];u.computed[n]=function(){return e}})}});
//# sourceMappingURL=7.3b57f3f6b68cc6ca1e80.js.map