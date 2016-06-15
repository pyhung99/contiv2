/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||function(t){"use strict";var e,n=t.documentElement,i=n.firstElementChild||n.firstChild,o=t.createElement("body"),r=t.createElement("div");return r.id="mq-test-1",r.style.cssText="position:absolute;top:-100em",o.style.background="none",o.appendChild(r),function(t){return r.innerHTML='&shy;<style media="'+t+'"> #mq-test-1 { width: 42px; }</style>',n.insertBefore(o,i),e=42===r.offsetWidth,n.removeChild(o),{matches:e,media:t}}}(document),/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
function(t){"use strict";function e(){x(!0)}var n={};t.respond=n,n.update=function(){},n.mediaQueriesSupported=t.matchMedia&&t.matchMedia("only all").matches,n.mediaQueriesSupported;var i,o,r,s=t.document,a=s.documentElement,l=[],u=[],c=[],p={},d=30,h=s.getElementsByTagName("head")[0]||a,f=s.getElementsByTagName("base")[0],g=h.getElementsByTagName("link"),m=[],v=function(){for(var e=0;g.length>e;e++){var n=g[e],i=n.href,o=n.media,r=n.rel&&"stylesheet"===n.rel.toLowerCase();i&&r&&!p[i]&&(n.styleSheet&&n.styleSheet.rawCssText?(b(n.styleSheet.rawCssText,i,o),p[i]=!0):(!/^([a-zA-Z:]*\/\/)/.test(i)&&!f||i.replace(RegExp.$1,"").split("/")[0]===t.location.host)&&m.push({href:i,media:o}))}y()},y=function(){if(m.length){var t=m.shift();T(t.href,function(e){b(e,t.href,t.media),p[t.href]=!0,setTimeout(function(){y()},0)})}},b=function(t,e,n){var i=t.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),o=i&&i.length||0;e=e.substring(0,e.lastIndexOf("/"));var r=function(t){return t.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+e+"$2$3")},s=!o&&n;e.length&&(e+="/"),s&&(o=1);for(var a=0;o>a;a++){var c,p,d,h;s?(c=n,u.push(r(t))):(c=i[a].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,u.push(RegExp.$2&&r(RegExp.$2))),d=c.split(","),h=d.length;for(var f=0;h>f;f++)p=d[f],l.push({media:p.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:u.length-1,hasquery:p.indexOf("(")>-1,minw:p.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:p.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}x()},w=function(){var t,e=s.createElement("div"),n=s.body,i=!1;return e.style.cssText="position:absolute;font-size:1em;width:1em",n||(n=i=s.createElement("body"),n.style.background="none"),n.appendChild(e),a.insertBefore(n,a.firstChild),t=e.offsetWidth,i?a.removeChild(n):n.removeChild(e),t=r=parseFloat(t)},x=function(t){var e="clientWidth",n=a[e],p="CSS1Compat"===s.compatMode&&n||s.body[e]||n,f={},m=g[g.length-1],v=(new Date).getTime();if(t&&i&&d>v-i)return clearTimeout(o),void(o=setTimeout(x,d));i=v;for(var y in l)if(l.hasOwnProperty(y)){var b=l[y],T=b.minw,C=b.maxw,$=null===T,E=null===C,S="em";T&&(T=parseFloat(T)*(T.indexOf(S)>-1?r||w():1)),C&&(C=parseFloat(C)*(C.indexOf(S)>-1?r||w():1)),b.hasquery&&($&&E||!($||p>=T)||!(E||C>=p))||(f[b.media]||(f[b.media]=[]),f[b.media].push(u[b.rules]))}for(var k in c)c.hasOwnProperty(k)&&c[k]&&c[k].parentNode===h&&h.removeChild(c[k]);for(var N in f)if(f.hasOwnProperty(N)){var A=s.createElement("style"),D=f[N].join("\n");A.type="text/css",A.media=N,h.insertBefore(A,m.nextSibling),A.styleSheet?A.styleSheet.cssText=D:A.appendChild(s.createTextNode(D)),c.push(A)}},T=function(t,e){var n=C();n&&(n.open("GET",t,!0),n.onreadystatechange=function(){4!==n.readyState||200!==n.status&&304!==n.status||e(n.responseText)},4!==n.readyState&&n.send(null))},C=function(){var e=!1;try{e=new t.XMLHttpRequest}catch(n){e=new t.ActiveXObject("Microsoft.XMLHTTP")}return function(){return e}}();v(),n.update=v,t.addEventListener?t.addEventListener("resize",e,!1):t.attachEvent&&t.attachEvent("onresize",e)}(this),$("#collapse1").on("hide.bs.dropdown",function(){return!1});