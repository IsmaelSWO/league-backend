(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[12],{244:function(e,t,n){"use strict";n.r(t);var a=n(45),r=n.n(a),c=n(46),u=n(6),s=n(0),o=n.n(s),i=n(71),l=n(49),f=n(18),p=n(47),m=n(51),b=n(11);t.default=function(){var e=Object(p.a)(),t=e.isLoading,n=e.error,a=e.sendRequest,d=e.clearError,h=Object(s.useState)(),j=Object(u.a)(h,2),v=j[0],E=j[1],O=Object(s.useState)(!1),g=Object(u.a)(O,2),k=g[0],w=g[1],x=Object(s.useContext)(b.a);Object(s.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a("https://ligafiferos.herokuapp.com/api/players/mercado");case 3:t=e.sent,E(t.players),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[a,k]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{error:n,onClear:d}),x.isLoggedIn&&!t&&v&&o.a.createElement(m.a,null),t&&o.a.createElement("div",{className:"center"},o.a.createElement(f.a,null)),!t&&v&&o.a.createElement(i.a,{items:v,onUpdate:function(){w(!k)},onDeletePlayer:function(e){E((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=12.437c5af6.chunk.js.map