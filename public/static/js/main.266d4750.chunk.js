(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],[,,,,,,,,,,,function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(0),l=Object(n.createContext)({isLoggedIn:!1,userId:null,token:null,userPresupuesto:null,userName:null,userTeam:null,userImage:null,hasOffers:null,login:function(){},logout:function(){}})},,,,,,,function(e,t,a){"use strict";var n=a(0),l=a.n(n);a(41);t.a=function(e){return l.a.createElement("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay")},l.a.createElement("div",{className:"lds-dual-ring"}))}},function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(9),c=a.n(r);a(39);t.a=function(e){return c.a.createPortal(l.a.createElement("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}},,,,,,,function(e,t,a){e.exports=a(42)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(9),c=a.n(r),u=(a(31),a(1)),i=a(3),s=a(6);function o(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}a(32);var m,E=function(e){return l.a.createElement("header",{className:"main-header"},e.children)},d=(a(33),a(11)),f=function(){var e=Object(n.useContext)(d.a);return l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",{className:"nav-links"},e.isLoggedIn&&l.a.createElement("li",null,"\xa1Hola, ",e.userName,"!"),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(i.c,{to:"/get/muro",exact:!0},"Muro")),e.isLoggedIn&&l.a.createElement("li",{className:""},l.a.createElement(i.c,{to:"/get/ofertasrecibidas/".concat(e.userId),exact:!0},"Ofertas recibidas")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(i.c,{to:"/get/ofertasrealizadas",exact:!0},"Ofertas realizadas")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/buscador",exact:!0},"Buscador")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/primeradivision",exact:!0},"1\xaa Divisi\xf3n")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/segundadivision",exact:!0},"2\xaa Divisi\xf3n")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/",exact:!0},"Equipos")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(i.c,{to:"/get/mismovimientos"},"Mis movimientos")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(i.c,{to:"/".concat(e.userId,"/players")},"Mis jugadores")),!e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(i.c,{to:"/auth"},"Iniciar sesi\xf3n")),e.isLoggedIn&&l.a.createElement("li",null,l.a.createElement("button",{onClick:e.logout},"Cerrar sesi\xf3n"))))},b=a(44),g=(a(38),function(e){var t=l.a.createElement(b.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children));return c.a.createPortal(t,document.getElementById("drawer-hook"))}),h=a(19),p=(a(40),function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1],c=function(){var e=Object(n.useState)(o()),t=Object(s.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){function e(){l(o())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a}().width,u=function(){r(!1)};return l.a.createElement(l.a.Fragment,null,a&&c<1392&&l.a.createElement(h.a,{onClick:u}),l.a.createElement(g,{show:a,onClick:u},l.a.createElement("nav",{className:"main-navigation__drawer-nav"},l.a.createElement(f,null))),l.a.createElement(E,null,l.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(){r(!0)}},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)),l.a.createElement("h1",{className:"main-navigation__title"},l.a.createElement(i.b,{to:"/"},"LIGAFIFEROS")),l.a.createElement("nav",{className:"main-navigation__header-nav"},l.a.createElement(f,null))))}),v=a(18),O=a(12),I=l.a.lazy((function(){return Promise.all([a.e(2),a.e(14)]).then(a.bind(null,233))})),j=l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(9)]).then(a.bind(null,246))})),x=l.a.lazy((function(){return Promise.all([a.e(2),a.e(16)]).then(a.bind(null,234))})),k=l.a.lazy((function(){return Promise.all([a.e(2),a.e(17)]).then(a.bind(null,235))})),y=(l.a.lazy((function(){return Promise.all([a.e(2),a.e(18)]).then(a.bind(null,236))})),l.a.lazy((function(){return Promise.all([a.e(2),a.e(15)]).then(a.bind(null,237))})),l.a.lazy((function(){return a.e(6).then(a.bind(null,238))}))),N=l.a.lazy((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,239))})),P=l.a.lazy((function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,240))})),w=l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(10)]).then(a.bind(null,241))})),z=l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(11)]).then(a.bind(null,242))})),S=l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(13)]).then(a.bind(null,243))})),C=(l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(12)]).then(a.bind(null,244))})),function(){var e,t=function(){var e,t=Object(n.useState)(!1),a=Object(s.a)(t,2),l=a[0],r=a[1],c=Object(n.useState)(!1),u=Object(s.a)(c,2),i=u[0],o=u[1],E=Object(n.useState)(!1),d=Object(s.a)(E,2),f=d[0],b=d[1],g=Object(n.useState)(!1),h=Object(s.a)(g,2),p=h[0],v=h[1],I=Object(n.useState)(!1),j=Object(s.a)(I,2),x=j[0],k=j[1],y=Object(n.useState)(!1),N=Object(s.a)(y,2),P=N[0],w=N[1],z=Object(n.useState)(!1),S=Object(s.a)(z,2),C=S[0],L=S[1];e=function(e){try{return Object(O.a)(e).exp>Date.now()/1e3}catch(t){return!1}};var _=Object(n.useCallback)((function(e,t,a,n,l,c,u){r(t),o(e),b(a),v(n),k(l),w(c),L(u),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,exp:Object(O.a)(t).exp,presupuesto:a,userName:n,equipo:l,image:c,hasOffers:u}))}),[]),D=Object(n.useCallback)((function(){r(null),o(null),b(null),v(null),k(null),w(null),L(null),localStorage.removeItem("userData")}),[]);return Object(n.useEffect)((function(){if(l){var e=1e3*new Date(Object(O.a)(l).exp).getTime()-(new Date).getTime();m=setTimeout(D,e)}else clearTimeout(m)}),[l,D]),Object(n.useEffect)((function(){var t=JSON.parse(localStorage.getItem("userData"));t&&t.token&&e(t.token)&&_(t.userId,t.token,t.presupuesto,t.userName,t.equipo,t.image,t.hasOffers)}),[_,e]),{token:l,login:_,logout:D,userId:i,userPresupuesto:f,userName:p,userTeam:x,userImage:P,hasOffers:C}}(),a=t.token,r=t.login,c=t.logout,o=t.userId,E=t.userPresupuesto,f=t.userName,b=t.userTeam,g=t.userImage,h=t.hasOffers;return e=a?l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(I,null)),l.a.createElement(u.b,{path:"/:userId/players",exact:!0},l.a.createElement(S,null)),l.a.createElement(u.b,{path:"/get/mismovimientos",exact:!0},l.a.createElement(P,null)),l.a.createElement(u.b,{path:"/get/muro",exact:!0},l.a.createElement(N,null)),l.a.createElement(u.b,{path:"/buscador",exact:!0},l.a.createElement(j,null)),l.a.createElement(u.b,{path:"/primeradivision",exact:!0},l.a.createElement(x,null)),l.a.createElement(u.b,{path:"/segundadivision",exact:!0},l.a.createElement(k,null)),l.a.createElement(u.b,{path:"/get/ofertasrecibidas/:userId",exact:!0},l.a.createElement(z,null)),l.a.createElement(u.b,{path:"/get/ofertasrealizadas",exact:!0},l.a.createElement(w,null)),l.a.createElement(u.a,{to:"/"})):l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(I,null)),l.a.createElement(u.b,{path:"/buscador",exact:!0},l.a.createElement(j,null)),l.a.createElement(u.b,{path:"/primeradivision",exact:!0},l.a.createElement(x,null)),l.a.createElement(u.b,{path:"/segundadivision",exact:!0},l.a.createElement(k,null)),l.a.createElement(u.b,{path:"/:userId/players",exact:!0},l.a.createElement(S,null)),l.a.createElement(u.b,{path:"/auth"},l.a.createElement(y,null)),l.a.createElement(u.a,{to:"/auth"})),l.a.createElement(d.a.Provider,{value:{isLoggedIn:!!a,token:a,userId:o,userPresupuesto:E,userName:f,userTeam:b,userImage:g,login:r,logout:c,hasOffers:h}},l.a.createElement(i.a,null,l.a.createElement(p,null),l.a.createElement("main",null,l.a.createElement(n.Suspense,{fallback:l.a.createElement("div",{className:"center"},l.a.createElement(v.a,null))},e))))});c.a.render(l.a.createElement(C,null),document.getElementById("root"))}],[[26,4,5]]]);
//# sourceMappingURL=main.266d4750.chunk.js.map