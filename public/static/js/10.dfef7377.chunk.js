(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{241:function(e,t,n){"use strict";n.r(t);var r=n(45),a=n.n(r),c=n(46),u=n(6),s=n(0),o=n.n(s),i=n(51),l=n(71),f=n(49),p=n(18),d=n(47),m=n(11);t.default=function(e){var t=Object(s.useState)(),n=Object(u.a)(t,2),r=n[0],b=n[1],h=Object(d.a)(),j=h.isLoading,v=h.error,E=h.sendRequest,O=h.clearError,k=Object(s.useState)(!1),w=Object(u.a)(k,2),x=w[0],y=w[1],g=Object(s.useContext)(m.a);Object(s.useEffect)((function(){(function(){var e=Object(c.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E("https://ligafiferos.herokuapp.com/api/players/top/ofertasrealizadas");case 3:t=e.sent,b(t.players.filter((function(e){return e.ofertas.some((function(e){return e.ofertanteId===g.userId}))}))),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[E,g.userId,x]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a,{error:v,onClear:O}),!j&&r&&o.a.createElement(i.a,null),j&&o.a.createElement("div",{className:"center"},o.a.createElement(p.a,null)),!j&&r&&o.a.createElement(l.a,{items:r,onUpdate:function(){y(!x)},onDeletePlayer:function(e){b((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=10.dfef7377.chunk.js.map