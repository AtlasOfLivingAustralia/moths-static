/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
yahoo-dom-event.js version: 2.3.1
*/
if(typeof YAHOO=="undefined"){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang={isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice)&&!A.hasOwnProperty(B.length);}return false;},isBoolean:function(A){return typeof A==="boolean";},isFunction:function(A){return typeof A==="function";},isNull:function(A){return A===null;},isNumber:function(A){return typeof A==="number"&&isFinite(A);},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false;},isString:function(A){return typeof A==="string";},isUndefined:function(A){return typeof A==="undefined";},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B);}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B];},_IEEnumFix:function(C,B){if(YAHOO.env.ua.ie){var E=["toString","valueOf"],A;for(A=0;A<E.length;A=A+1){var F=E[A],D=B[F];if(YAHOO.lang.isFunction(D)&&D!=Object.prototype[F]){C[F]=D;}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E;}if(C){for(var A in C){D.prototype[A]=C[A];}YAHOO.lang._IEEnumFix(D.prototype,C);}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.");}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]];}}else{for(F in D){if(B||!E[F]){E[F]=D[F];}}YAHOO.lang._IEEnumFix(E,D);}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.");}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B]);}YAHOO.lang.augmentObject.apply(this,A);},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)){return A+"";}else{if(A instanceof Date||("nodeType" in A&&"tagName" in A)){return A;}else{if(C.isFunction(A)){return B;}}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}if(I.length>1){I.pop();}I.push("]");}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}}if(I.length>1){I.pop();}I.push("}");}return I.join("");},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break;}F=Q.indexOf(O,G);if(G+1>=F){break;}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E);}N=B[M];if(J){N=J(M,N,P);}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10));}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4);}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10));}else{N=N.toString();}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C;}}Q=Q.substring(0,G)+N+Q.substring(F+1);}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g");}return Q;},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"");}catch(B){return A;}},merge:function(){var C={},A=arguments,B;for(B=0;B<A.length;B=B+1){YAHOO.lang.augmentObject(C,A[B],true);}return C;},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.1",build:"541"});(function(){var B=YAHOO.util,K,I,H=0,J={},F={};var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var M=function(O){if(!E.HYPHEN.test(O)){return O;}if(J[O]){return J[O];}var P=O;while(E.HYPHEN.exec(P)){P=P.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[O]=P;return P;};var N=function(P){var O=F[P];if(!O){O=new RegExp("(?:^|\\s+)"+P+"(?:\\s+|$)");F[P]=O;}return O;};if(document.defaultView&&document.defaultView.getComputedStyle){K=function(O,R){var Q=null;if(R=="float"){R="cssFloat";}var P=document.defaultView.getComputedStyle(O,"");if(P){Q=P[M(R)];}return O.style[R]||Q;};}else{if(document.documentElement.currentStyle&&G){K=function(O,Q){switch(M(Q)){case"opacity":var S=100;try{S=O.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(R){try{S=O.filters("alpha").opacity;}catch(R){}}return S/100;case"float":Q="styleFloat";default:var P=O.currentStyle?O.currentStyle[Q]:null;return(O.style[Q]||P);}};}else{K=function(O,P){return O.style[P];};}}if(G){I=function(O,P,Q){switch(P){case"opacity":if(YAHOO.lang.isString(O.style.filter)){O.style.filter="alpha(opacity="+Q*100+")";if(!O.currentStyle||!O.currentStyle.hasLayout){O.style.zoom=1;}}break;case"float":P="styleFloat";default:O.style[P]=Q;}};}else{I=function(O,P,Q){if(P=="float"){P="cssFloat";}O.style[P]=Q;};}var D=function(O,P){return O&&O.nodeType==1&&(!P||P(O));};YAHOO.util.Dom={get:function(Q){if(Q&&(Q.tagName||Q.item)){return Q;}if(YAHOO.lang.isString(Q)||!Q){return document.getElementById(Q);}if(Q.length!==undefined){var R=[];for(var P=0,O=Q.length;P<O;++P){R[R.length]=B.Dom.get(Q[P]);}return R;}return Q;},getStyle:function(O,Q){Q=M(Q);var P=function(R){return K(R,Q);};return B.Dom.batch(O,P,B.Dom,true);},setStyle:function(O,Q,R){Q=M(Q);var P=function(S){I(S,Q,R);};B.Dom.batch(O,P,B.Dom,true);},getXY:function(O){var P=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=document.body){return false;}var Q=null;var V=[];var S;var T=R.ownerDocument;if(R.getBoundingClientRect){S=R.getBoundingClientRect();return[S.left+B.Dom.getDocumentScrollLeft(R.ownerDocument),S.top+B.Dom.getDocumentScrollTop(R.ownerDocument)];}else{V=[R.offsetLeft,R.offsetTop];Q=R.offsetParent;var U=this.getStyle(R,"position")=="absolute";if(Q!=R){while(Q){V[0]+=Q.offsetLeft;V[1]+=Q.offsetTop;if(L&&!U&&this.getStyle(Q,"position")=="absolute"){U=true;}Q=Q.offsetParent;}}if(L&&U){V[0]-=R.ownerDocument.body.offsetLeft;V[1]-=R.ownerDocument.body.offsetTop;}}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(B.Dom.getStyle(Q,"display").search(/^inline|table-row.*$/i)){V[0]-=Q.scrollLeft;V[1]-=Q.scrollTop;}Q=Q.parentNode;}return V;};return B.Dom.batch(O,P,B.Dom,true);},getX:function(O){var P=function(Q){return B.Dom.getXY(Q)[0];};return B.Dom.batch(O,P,B.Dom,true);},getY:function(O){var P=function(Q){return B.Dom.getXY(Q)[1];};return B.Dom.batch(O,P,B.Dom,true);},setXY:function(O,R,Q){var P=function(U){var T=this.getStyle(U,"position");if(T=="static"){this.setStyle(U,"position","relative");T="relative";}var W=this.getXY(U);if(W===false){return false;}var V=[parseInt(this.getStyle(U,"left"),10),parseInt(this.getStyle(U,"top"),10)];if(isNaN(V[0])){V[0]=(T=="relative")?0:U.offsetLeft;}if(isNaN(V[1])){V[1]=(T=="relative")?0:U.offsetTop;}if(R[0]!==null){U.style.left=R[0]-W[0]+V[0]+"px";}if(R[1]!==null){U.style.top=R[1]-W[1]+V[1]+"px";}if(!Q){var S=this.getXY(U);if((R[0]!==null&&S[0]!=R[0])||(R[1]!==null&&S[1]!=R[1])){this.setXY(U,R,true);}}};B.Dom.batch(O,P,B.Dom,true);},setX:function(P,O){B.Dom.setXY(P,[O,null]);},setY:function(O,P){B.Dom.setXY(O,[null,P]);},getRegion:function(O){var P=function(Q){if((Q.parentNode===null||Q.offsetParent===null||this.getStyle(Q,"display")=="none")&&Q!=document.body){return false;}var R=B.Region.getRegion(Q);return R;};return B.Dom.batch(O,P,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(S,W,T,U){W=W||"*";T=(T)?B.Dom.get(T):null||document;if(!T){return[];}var P=[],O=T.getElementsByTagName(W),V=N(S);for(var Q=0,R=O.length;Q<R;++Q){if(V.test(O[Q].className)){P[P.length]=O[Q];if(U){U.call(O[Q],O[Q]);}}}return P;},hasClass:function(Q,P){var O=N(P);var R=function(S){return O.test(S.className);};return B.Dom.batch(Q,R,B.Dom,true);},addClass:function(P,O){var Q=function(R){if(this.hasClass(R,O)){return false;}R.className=YAHOO.lang.trim([R.className,O].join(" "));return true;};return B.Dom.batch(P,Q,B.Dom,true);},removeClass:function(Q,P){var O=N(P);var R=function(S){if(!this.hasClass(S,P)){return false;}var T=S.className;S.className=T.replace(O," ");if(this.hasClass(S,P)){this.removeClass(S,P);}S.className=YAHOO.lang.trim(S.className);return true;};return B.Dom.batch(Q,R,B.Dom,true);},replaceClass:function(R,P,O){if(!O||P===O){return false;}var Q=N(P);var S=function(T){if(!this.hasClass(T,P)){this.addClass(T,O);return true;}T.className=T.className.replace(Q," "+O+" ");if(this.hasClass(T,P)){this.replaceClass(T,P,O);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},generateId:function(O,Q){Q=Q||"yui-gen";var P=function(R){if(R&&R.id){return R.id;}var S=Q+H++;if(R){R.id=S;}return S;};return B.Dom.batch(O,P,B.Dom,true)||P.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);if(!P||!Q){return false;}var O=function(R){if(P.contains&&R.nodeType&&!L){return P.contains(R);}else{if(P.compareDocumentPosition&&R.nodeType){return !!(P.compareDocumentPosition(R)&16);}else{if(R.nodeType){return !!this.getAncestorBy(R,function(S){return S==P;});}}}return false;};return B.Dom.batch(Q,O,B.Dom,true);},inDocument:function(O){var P=function(Q){if(L){while(Q=Q.parentNode){if(Q==document.documentElement){return true;}}return false;}return this.isAncestor(document.documentElement,Q);};return B.Dom.batch(O,P,B.Dom,true);},getElementsBy:function(V,P,Q,S){P=P||"*";
Q=(Q)?B.Dom.get(Q):null||document;if(!Q){return[];}var R=[],U=Q.getElementsByTagName(P);for(var T=0,O=U.length;T<O;++T){if(V(U[T])){R[R.length]=U[T];if(S){S(U[T]);}}}return R;},batch:function(S,V,U,Q){S=(S&&(S.tagName||S.item))?S:B.Dom.get(S);if(!S||!V){return false;}var R=(Q)?U:window;if(S.tagName||S.length===undefined){return V.call(R,S,U);}var T=[];for(var P=0,O=S.length;P<O;++P){T[T.length]=V.call(R,S[P],U);}return T;},getDocumentHeight:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollHeight:document.documentElement.scrollHeight;var O=Math.max(P,B.Dom.getViewportHeight());return O;},getDocumentWidth:function(){var P=(document.compatMode!="CSS1Compat")?document.body.scrollWidth:document.documentElement.scrollWidth;var O=Math.max(P,B.Dom.getViewportWidth());return O;},getViewportHeight:function(){var O=self.innerHeight;var P=document.compatMode;if((P||G)&&!C){O=(P=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;}return O;},getViewportWidth:function(){var O=self.innerWidth;var P=document.compatMode;if(P||G){O=(P=="CSS1Compat")?document.documentElement.clientWidth:document.body.clientWidth;}return O;},getAncestorBy:function(O,P){while(O=O.parentNode){if(D(O,P)){return O;}}return null;},getAncestorByClassName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return B.Dom.hasClass(R,O);};return B.Dom.getAncestorBy(P,Q);},getAncestorByTagName:function(P,O){P=B.Dom.get(P);if(!P){return null;}var Q=function(R){return R.tagName&&R.tagName.toUpperCase()==O.toUpperCase();};return B.Dom.getAncestorBy(P,Q);},getPreviousSiblingBy:function(O,P){while(O){O=O.previousSibling;if(D(O,P)){return O;}}return null;},getPreviousSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getPreviousSiblingBy(O);},getNextSiblingBy:function(O,P){while(O){O=O.nextSibling;if(D(O,P)){return O;}}return null;},getNextSibling:function(O){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getNextSiblingBy(O);},getFirstChildBy:function(O,Q){var P=(D(O.firstChild,Q))?O.firstChild:null;return P||B.Dom.getNextSiblingBy(O.firstChild,Q);},getFirstChild:function(O,P){O=B.Dom.get(O);if(!O){return null;}return B.Dom.getFirstChildBy(O);},getLastChildBy:function(O,Q){if(!O){return null;}var P=(D(O.lastChild,Q))?O.lastChild:null;return P||B.Dom.getPreviousSiblingBy(O.lastChild,Q);},getLastChild:function(O){O=B.Dom.get(O);return B.Dom.getLastChildBy(O);},getChildrenBy:function(P,R){var Q=B.Dom.getFirstChildBy(P,R);var O=Q?[Q]:[];B.Dom.getNextSiblingBy(Q,function(S){if(!R||R(S)){O[O.length]=S;}return false;});return O;},getChildren:function(O){O=B.Dom.get(O);if(!O){}return B.Dom.getChildrenBy(O);},getDocumentScrollLeft:function(O){O=O||document;return Math.max(O.documentElement.scrollLeft,O.body.scrollLeft);},getDocumentScrollTop:function(O){O=O||document;return Math.max(O.documentElement.scrollTop,O.body.scrollTop);},insertBefore:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}return O.parentNode.insertBefore(P,O);},insertAfter:function(P,O){P=B.Dom.get(P);O=B.Dom.get(O);if(!P||!O||!O.parentNode){return null;}if(O.nextSibling){return O.parentNode.insertBefore(P,O.nextSibling);}else{return O.parentNode.appendChild(P);}}};})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.1",build:"541"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){var E=this.subscribers.length;if(!E&&this.silent){return true;}var H=[],G=true,D,I=false;for(D=0;D<arguments.length;++D){H.push(arguments[D]);}var A=H.length;if(!this.silent){}for(D=0;D<E;++D){var L=this.subscribers[D];if(!L){I=true;}else{if(!this.silent){}var K=L.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(H.length>0){B=H[0];}try{G=L.fn.call(K,B,L.obj);}catch(F){this.lastError=F;}}else{try{G=L.fn.call(K,this.type,H,L.obj);}catch(F){this.lastError=F;}}if(false===G){if(!this.silent){}return false;}}}if(I){var J=[],C=this.subscribers;for(D=0,E=C.length;D<E;D=D+1){J.push(C[D]);}this.subscribers=J;}return true;},unsubscribeAll:function(){for(var B=0,A=this.subscribers.length;B<A;++B){this._delete(A-1-B);}this.subscribers=[];return B;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers[A]=null;},toString:function(){return"CustomEvent: '"+this.type+"', scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var J=false;var I=[];var K=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var L=this;var M=function(){L._tryPreloadAttach();};this._interval=setInterval(M,this.POLL_INTERVAL);}},onAvailable:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:false});C=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(L,N,M){if(J){setTimeout(function(){var O=window;if(M){if(M===true){O=N;}else{O=M;}}L.call(O,"DOMReady",[],N);},0);}else{this.DOMReadyEvent.subscribe(L,N,M);}},onContentReady:function(N,L,O,M){F.push({id:N,fn:L,obj:O,override:M,checkReady:true});C=this.POLL_RETRYS;this.startInterval();},addListener:function(N,L,W,R,M){if(!W||!W.call){return false;}if(this._isValidCollection(N)){var X=true;for(var S=0,U=N.length;S<U;++S){X=this.on(N[S],L,W,R,M)&&X;}return X;}else{if(YAHOO.lang.isString(N)){var Q=this.getEl(N);if(Q){N=Q;}else{this.onAvailable(N,function(){YAHOO.util.Event.on(N,L,W,R,M);});return true;}}}if(!N){return false;}if("unload"==L&&R!==this){K[K.length]=[N,L,W,R,M];return true;}var Z=N;if(M){if(M===true){Z=R;}else{Z=M;}}var O=function(a){return W.call(Z,YAHOO.util.Event.getEvent(a,N),R);};var Y=[N,L,W,O,Z,R,M];var T=I.length;I[T]=Y;if(this.useLegacyEvent(N,L)){var P=this.getLegacyIndex(N,L);if(P==-1||N!=G[P][0]){P=G.length;B[N.id+L]=P;G[P]=[N,L,N["on"+L]];E[P]=[];N["on"+L]=function(a){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(a),P);};}E[P].push(Y);}else{try{this._simpleAdd(N,L,O,false);}catch(V){this.lastError=V;this.removeListener(N,L,W);return false;}}return true;},fireLegacyEvent:function(P,N){var R=true,L,T,S,U,Q;T=E[N];for(var M=0,O=T.length;M<O;++M){S=T[M];if(S&&S[this.WFN]){U=S[this.ADJ_SCOPE];Q=S[this.WFN].call(U,P);R=(R&&Q);}}L=G[N];if(L&&L[2]){L[2](P);}return R;},getLegacyIndex:function(M,N){var L=this.generateId(M)+N;if(typeof B[L]=="undefined"){return -1;}else{return B[L];}},useLegacyEvent:function(M,N){if(this.webkit&&("click"==N||"dblclick"==N)){var L=parseInt(this.webkit,10);if(!isNaN(L)&&L<418){return true;}}return false;},removeListener:function(M,L,U){var P,S,W;if(typeof M=="string"){M=this.getEl(M);}else{if(this._isValidCollection(M)){var V=true;for(P=0,S=M.length;P<S;++P){V=(this.removeListener(M[P],L,U)&&V);}return V;}}if(!U||!U.call){return this.purgeElement(M,false,L);}if("unload"==L){for(P=0,S=K.length;P<S;P++){W=K[P];if(W&&W[0]==M&&W[1]==L&&W[2]==U){K[P]=null;return true;}}return false;}var Q=null;var R=arguments[3];if("undefined"===typeof R){R=this._getCacheIndex(M,L,U);}if(R>=0){Q=I[R];}if(!M||!Q){return false;}if(this.useLegacyEvent(M,L)){var O=this.getLegacyIndex(M,L);var N=E[O];if(N){for(P=0,S=N.length;P<S;++P){W=N[P];if(W&&W[this.EL]==M&&W[this.TYPE]==L&&W[this.FN]==U){N[P]=null;break;}}}}else{try{this._simpleRemove(M,L,Q[this.WFN],false);}catch(T){this.lastError=T;return false;}}delete I[R][this.WFN];delete I[R][this.FN];I[R]=null;return true;},getTarget:function(N,M){var L=N.target||N.srcElement;return this.resolveTextNode(L);},resolveTextNode:function(L){if(L&&3==L.nodeType){return L.parentNode;}else{return L;}},getPageX:function(M){var L=M.pageX;if(!L&&0!==L){L=M.clientX||0;if(this.isIE){L+=this._getScrollLeft();}}return L;},getPageY:function(L){var M=L.pageY;if(!M&&0!==M){M=L.clientY||0;if(this.isIE){M+=this._getScrollTop();}}return M;},getXY:function(L){return[this.getPageX(L),this.getPageY(L)];
},getRelatedTarget:function(M){var L=M.relatedTarget;if(!L){if(M.type=="mouseout"){L=M.toElement;}else{if(M.type=="mouseover"){L=M.fromElement;}}}return this.resolveTextNode(L);},getTime:function(N){if(!N.time){var M=new Date().getTime();try{N.time=M;}catch(L){this.lastError=L;return M;}}return N.time;},stopEvent:function(L){this.stopPropagation(L);this.preventDefault(L);},stopPropagation:function(L){if(L.stopPropagation){L.stopPropagation();}else{L.cancelBubble=true;}},preventDefault:function(L){if(L.preventDefault){L.preventDefault();}else{L.returnValue=false;}},getEvent:function(Q,O){var P=Q||window.event;if(!P){var R=this.getEvent.caller;while(R){P=R.arguments[0];if(P&&Event==P.constructor){break;}R=R.caller;}}if(P&&this.isIE){try{var N=P.srcElement;if(N){var M=N.type;}}catch(L){P.target=O;}}return P;},getCharCode:function(M){var L=M.keyCode||M.charCode||0;if(YAHOO.env.ua.webkit&&(L in D)){L=D[L];}return L;},_getCacheIndex:function(P,Q,O){for(var N=0,M=I.length;N<M;++N){var L=I[N];if(L&&L[this.FN]==O&&L[this.EL]==P&&L[this.TYPE]==Q){return N;}}return -1;},generateId:function(L){var M=L.id;if(!M){M="yuievtautoid-"+A;++A;L.id=M;}return M;},_isValidCollection:function(M){try{return(typeof M!=="string"&&M.length&&!M.tagName&&!M.alert&&typeof M[0]!=="undefined");}catch(L){return false;}},elCache:{},getEl:function(L){return(typeof L==="string")?document.getElementById(L):L;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(M){if(!H){H=true;var L=YAHOO.util.Event;L._ready();L._tryPreloadAttach();}},_ready:function(M){if(!J){J=true;var L=YAHOO.util.Event;L.DOMReadyEvent.fire();L._simpleRemove(document,"DOMContentLoaded",L._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}if(this.isIE){if(!J){this.startInterval();return false;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var M,L,O,N;for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&!O.checkReady){N=this.getEl(O.id);if(N){R(N,O);F[M]=null;}else{P.push(O);}}}for(M=0,L=F.length;M<L;++M){O=F[M];if(O&&O.checkReady){N=this.getEl(O.id);if(N){if(H||N.nextSibling){R(N,O);F[M]=null;}}else{P.push(O);}}}C=(P.length===0)?0:C-1;if(Q){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return true;},purgeElement:function(O,P,R){var Q=this.getListeners(O,R),N,L;if(Q){for(N=0,L=Q.length;N<L;++N){var M=Q[N];this.removeListener(O,M.type,M.fn,M.index);}}if(P&&O&&O.childNodes){for(N=0,L=O.childNodes.length;N<L;++N){this.purgeElement(O.childNodes[N],P,R);}}},getListeners:function(N,L){var Q=[],M;if(!L){M=[I,K];}else{if(L=="unload"){M=[K];}else{M=[I];}}for(var P=0;P<M.length;P=P+1){var T=M[P];if(T&&T.length>0){for(var R=0,S=T.length;R<S;++R){var O=T[R];if(O&&O[this.EL]===N&&(!L||L===O[this.TYPE])){Q.push({type:O[this.TYPE],fn:O[this.FN],obj:O[this.OBJ],adjust:O[this.OVERRIDE],scope:O[this.ADJ_SCOPE],index:R});}}}}return(Q.length)?Q:null;},_unload:function(S){var R=YAHOO.util.Event,P,O,M,L,N;for(P=0,L=K.length;P<L;++P){M=K[P];if(M){var Q=window;if(M[R.ADJ_SCOPE]){if(M[R.ADJ_SCOPE]===true){Q=M[R.UNLOAD_OBJ];}else{Q=M[R.ADJ_SCOPE];}}M[R.FN].call(Q,R.getEvent(S,M[R.EL]),M[R.UNLOAD_OBJ]);K[P]=null;M=null;Q=null;}}K=null;if(I&&I.length>0){O=I.length;while(O){N=O-1;M=I[N];if(M){R.removeListener(M[R.EL],M[R.TYPE],M[R.FN],N);}O=O-1;}M=null;R.clearCache();}for(P=0,L=G.length;P<L;++P){G[P][0]=null;G[P]=null;}G=null;R._simpleRemove(window,"unload",R._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var L=document.documentElement,M=document.body;if(L&&(L.scrollTop||L.scrollLeft)){return[L.scrollTop,L.scrollLeft];}else{if(M){return[M.scrollTop,M.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(N,O,M,L){N.addEventListener(O,M,(L));};}else{if(window.attachEvent){return function(N,O,M,L){N.attachEvent("on"+O,M);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(N,O,M,L){N.removeEventListener(O,M,(L));};}else{if(window.detachEvent){return function(M,N,L){M.detachEvent("on"+N,L);};}else{return function(){};}}}()};}();(function(){var D=YAHOO.util.Event;D.on=D.addListener;if(D.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var B,E=document,A=E.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){B=document.createElement("script");var C=E.getElementsByTagName("head")[0]||A;C.insertBefore(B,C.firstChild);}else{E.write("<script id=\"_yui_eu_dr\" defer=\"true\" src=\"//:\"></script>");B=document.getElementById("_yui_eu_dr");}if(B){B.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}B=null;}else{if(D.webkit){D._drwatch=setInterval(function(){var F=document.readyState;if("loaded"==F||"complete"==F){clearInterval(D._drwatch);D._drwatch=null;D._ready();}},D.POLL_INTERVAL);}else{D._simpleAdd(document,"DOMContentLoaded",D._ready);}}D._simpleAdd(window,"load",D._load);D._simpleAdd(window,"unload",D._unload);D._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};
var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(K,J){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(K.shiftKey==F.shift&&K.altKey==F.alt&&K.ctrlKey==F.ctrl){var H;var G;if(F.keys instanceof Array){for(var I=0;I<F.keys.length;I++){H=F.keys[I];if(H==K.charCode){D.fire(K.charCode,K);break;}else{if(H==K.keyCode){D.fire(K.keyCode,K);break;}}}}else{H=F.keys;if(H==K.charCode){D.fire(K.charCode,K);}else{if(H==K.keyCode){D.fire(K.keyCode,K);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.1",build:"541"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.3.1", build: "541"});
//***********************************************************************************************************************************/
//	LyteBox v3.22
//
//	 Author: Markus F. Hay
//  Website: http://www.dolem.com/lytebox
//	   Date: October 2, 2007
//	License: Creative Commons Attribution 3.0 License (http://creativecommons.org/licenses/by/3.0/)
// Browsers: Tested successfully on WinXP with the following browsers (using no DOCTYPE and Strict/Transitional/Loose DOCTYPES):
//				* Firefox: 2.0.0.7, 1.5.0.12
//				* Internet Explorer: 7.0, 6.0 SP2, 5.5 SP2
//				* Opera: 9.23
//
// Releases: For up-to-date and complete release information, visit http://www.dolem.com/forum/showthread.php?tid=62
//				* v3.22 (10/02/07)
//				* v3.21 (09/30/07)
//				* v3.20 (07/12/07)
//				* v3.10 (05/28/07)
//				* v3.00 (05/15/07)
//				* v2.02 (11/13/06)
//
//   Credit: LyteBox was originally derived from the Lightbox class (v2.02) that was written by Lokesh Dhakar. For more
//			 information please visit http://huddletogether.com/projects/lightbox2/
//***********************************************************************************************************************************/
Array.prototype.removeDuplicates = function () { for (var i = 1; i < this.length; i++) { if (this[i][0] == this[i-1][0]) { this.splice(i,1); } } }
Array.prototype.empty = function () { for (var i = 0; i <= this.length; i++) { this.shift(); } }
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); }

function LyteBox() {
	/*** Start Global Configuration ***/
		this.theme				= 'grey';	// themes: grey (default), red, green, blue, gold
		this.hideFlash			= true;		// controls whether or not Flash objects should be hidden
		this.outerBorder		= true;		// controls whether to show the outer grey (or theme) border
		this.resizeSpeed		= 8;		// controls the speed of the image resizing (1=slowest and 10=fastest)
		this.maxOpacity			= 80;		// higher opacity = darker overlay, lower opacity = lighter overlay
		this.navType			= 1;		// 1 = "Prev/Next" buttons on top left and left (default), 2 = "<< prev | next >>" links next to image number
		this.autoResize			= true;		// controls whether or not images should be resized if larger than the browser window dimensions
		this.doAnimations		= true;		// controls whether or not "animate" Lytebox, i.e. resize transition between images, fade in/out effects, etc.

		this.borderSize			= 12;		// if you adjust the padding in the CSS, you will need to update this variable -- otherwise, leave this alone...
	/*** End Global Configuration ***/

	/*** Configure Slideshow Options ***/
		this.slideInterval		= 4000;		// Change value (milliseconds) to increase/decrease the time between "slides" (10000 = 10 seconds)
		this.showNavigation		= true;		// true to display Next/Prev buttons/text during slideshow, false to hide
		this.showClose			= true;		// true to display the Close button, false to hide
		this.showDetails		= true;		// true to display image details (caption, count), false to hide
		this.showPlayPause		= true;		// true to display pause/play buttons next to close button, false to hide
		this.autoEnd			= true;		// true to automatically close Lytebox after the last image is reached, false to keep open
		this.pauseOnNextClick	= false;	// true to pause the slideshow when the "Next" button is clicked
        this.pauseOnPrevClick 	= true;		// true to pause the slideshow when the "Prev" button is clicked
	/*** End Slideshow Configuration ***/

	if(this.resizeSpeed > 10) { this.resizeSpeed = 10; }
	if(this.resizeSpeed < 1) { resizeSpeed = 1; }
	this.resizeDuration = (11 - this.resizeSpeed) * 0.15;
	this.resizeWTimerArray		= new Array();
	this.resizeWTimerCount		= 0;
	this.resizeHTimerArray		= new Array();
	this.resizeHTimerCount		= 0;
	this.showContentTimerArray	= new Array();
	this.showContentTimerCount	= 0;
	this.overlayTimerArray		= new Array();
	this.overlayTimerCount		= 0;
	this.imageTimerArray		= new Array();
	this.imageTimerCount		= 0;
	this.timerIDArray			= new Array();
	this.timerIDCount			= 0;
	this.slideshowIDArray		= new Array();
	this.slideshowIDCount		= 0;
	this.imageArray	 = new Array();
	this.activeImage = null;
	this.slideArray	 = new Array();
	this.activeSlide = null;
	this.frameArray	 = new Array();
	this.activeFrame = null;
	this.checkFrame();
	this.isSlideshow = false;
	this.isLyteframe = false;
	/*@cc_on
		/*@if (@_jscript)
			this.ie = (document.all && !window.opera) ? true : false;
		/*@else @*/
			this.ie = false;
		/*@end
	@*/
	this.ie7 = (this.ie && window.XMLHttpRequest);
	this.initialize();
}
LyteBox.prototype.initialize = function() {
	this.updateLyteboxItems();
	var objBody = this.doc.getElementsByTagName("body").item(0);
	if (this.doc.getElementById('lbOverlay')) {
		objBody.removeChild(this.doc.getElementById("lbOverlay"));
		objBody.removeChild(this.doc.getElementById("lbMain"));
	}
	var objOverlay = this.doc.createElement("div");
		objOverlay.setAttribute('id','lbOverlay');
		objOverlay.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		if ((this.ie && !this.ie7) || (this.ie7 && this.doc.compatMode == 'BackCompat')) {
			objOverlay.style.position = 'absolute';
		}
		objOverlay.style.display = 'none';
		objBody.appendChild(objOverlay);
	var objLytebox = this.doc.createElement("div");
		objLytebox.setAttribute('id','lbMain');
		objLytebox.style.display = 'none';
		objBody.appendChild(objLytebox);
	var objOuterContainer = this.doc.createElement("div");
		objOuterContainer.setAttribute('id','lbOuterContainer');
		objOuterContainer.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objLytebox.appendChild(objOuterContainer);
	var objIframeContainer = this.doc.createElement("div");
		objIframeContainer.setAttribute('id','lbIframeContainer');
		objIframeContainer.style.display = 'none';
		objOuterContainer.appendChild(objIframeContainer);
	var objIframe = this.doc.createElement("iframe");
		objIframe.setAttribute('id','lbIframe');
		objIframe.setAttribute('name','lbIframe');
		objIframe.style.display = 'none';
		objIframeContainer.appendChild(objIframe);
	var objImageContainer = this.doc.createElement("div");
		objImageContainer.setAttribute('id','lbImageContainer');
		objOuterContainer.appendChild(objImageContainer);
	var objLyteboxImage = this.doc.createElement("img");
		objLyteboxImage.setAttribute('id','lbImage');
		objImageContainer.appendChild(objLyteboxImage);
	var objLoading = this.doc.createElement("div");
		objLoading.setAttribute('id','lbLoading');
		objOuterContainer.appendChild(objLoading);
	var objDetailsContainer = this.doc.createElement("div");
		objDetailsContainer.setAttribute('id','lbDetailsContainer');
		objDetailsContainer.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objLytebox.appendChild(objDetailsContainer);
	var objDetailsData =this.doc.createElement("div");
		objDetailsData.setAttribute('id','lbDetailsData');
		objDetailsData.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objDetailsContainer.appendChild(objDetailsData);
	var objDetails = this.doc.createElement("div");
		objDetails.setAttribute('id','lbDetails');
		objDetailsData.appendChild(objDetails);
	var objCaption = this.doc.createElement("span");
		objCaption.setAttribute('id','lbCaption');
		objDetails.appendChild(objCaption);
	var objHoverNav = this.doc.createElement("div");
		objHoverNav.setAttribute('id','lbHoverNav');
		objImageContainer.appendChild(objHoverNav);
	var objBottomNav = this.doc.createElement("div");
		objBottomNav.setAttribute('id','lbBottomNav');
		objDetailsData.appendChild(objBottomNav);
	var objPrev = this.doc.createElement("a");
		objPrev.setAttribute('id','lbPrev');
		objPrev.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objPrev.setAttribute('href','#');
		objHoverNav.appendChild(objPrev);
	var objNext = this.doc.createElement("a");
		objNext.setAttribute('id','lbNext');
		objNext.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objNext.setAttribute('href','#');
		objHoverNav.appendChild(objNext);
	var objNumberDisplay = this.doc.createElement("span");
		objNumberDisplay.setAttribute('id','lbNumberDisplay');
		objDetails.appendChild(objNumberDisplay);
	var objNavDisplay = this.doc.createElement("span");
		objNavDisplay.setAttribute('id','lbNavDisplay');
		objNavDisplay.style.display = 'none';
		objDetails.appendChild(objNavDisplay);
	var objClose = this.doc.createElement("a");
		objClose.setAttribute('id','lbClose');
		objClose.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objClose.setAttribute('href','#');
		objBottomNav.appendChild(objClose);
	var objPause = this.doc.createElement("a");
		objPause.setAttribute('id','lbPause');
		objPause.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objPause.setAttribute('href','#');
		objPause.style.display = 'none';
		objBottomNav.appendChild(objPause);
	var objPlay = this.doc.createElement("a");
		objPlay.setAttribute('id','lbPlay');
		objPlay.setAttribute((this.ie ? 'className' : 'class'), this.theme);
		objPlay.setAttribute('href','#');
		objPlay.style.display = 'none';
		objBottomNav.appendChild(objPlay);
};
LyteBox.prototype.updateLyteboxItems = function() {
	var anchors = (this.isFrame) ? window.parent.frames[window.name].document.getElementsByTagName('a') : document.getElementsByTagName('a');
	for (var i = 0; i < anchors.length; i++) {
		var anchor = anchors[i];
		var relAttribute = String(anchor.getAttribute('rel'));
		if (anchor.getAttribute('href')) {
			if (relAttribute.toLowerCase().match('lytebox')) {
				anchor.onclick = function () { myLytebox.start(this, false, false); return false; }
			} else if (relAttribute.toLowerCase().match('lyteshow')) {
				anchor.onclick = function () { myLytebox.start(this, true, false); return false; }
			} else if (relAttribute.toLowerCase().match('lyteframe')) {
				anchor.onclick = function () { myLytebox.start(this, false, true); return false; }
			}
		}
	}
};
LyteBox.prototype.start = function(imageLink, doSlide, doFrame) {
	if (this.ie && !this.ie7) {	this.toggleSelects('hide');	}
	if (this.hideFlash) { this.toggleFlash('hide'); }
	this.isLyteframe = (doFrame ? true : false);
	var pageSize	= this.getPageSize();
	var objOverlay	= this.doc.getElementById('lbOverlay');
	var objBody		= this.doc.getElementsByTagName("body").item(0);
	objOverlay.style.height = pageSize[1] + "px";
	objOverlay.style.display = '';
	this.appear('lbOverlay', (this.doAnimations ? 0 : this.maxOpacity));
	var anchors = (this.isFrame) ? window.parent.frames[window.name].document.getElementsByTagName('a') : document.getElementsByTagName('a');
	if (this.isLyteframe) {
		this.frameArray = [];
		this.frameNum = 0;
		if ((imageLink.getAttribute('rel') == 'lyteframe')) {
			var rev = imageLink.getAttribute('rev');
			this.frameArray.push(new Array(imageLink.getAttribute('href'), imageLink.getAttribute('title'), (rev == null || rev == '' ? 'width: 400px; height: 400px; scrolling: auto;' : rev)));
		} else {
			if (imageLink.getAttribute('rel').indexOf('lyteframe') != -1) {
				for (var i = 0; i < anchors.length; i++) {
					var anchor = anchors[i];
					if (anchor.getAttribute('href') && (anchor.getAttribute('rel') == imageLink.getAttribute('rel'))) {
						var rev = anchor.getAttribute('rev');
						this.frameArray.push(new Array(anchor.getAttribute('href'), anchor.getAttribute('title'), (rev == null || rev == '' ? 'width: 400px; height: 400px; scrolling: auto;' : rev)));
					}
				}
				this.frameArray.removeDuplicates();
				while(this.frameArray[this.frameNum][0] != imageLink.getAttribute('href')) { this.frameNum++; }
			}
		}
	} else {
		this.imageArray = [];
		this.imageNum = 0;
		this.slideArray = [];
		this.slideNum = 0;
		if ((imageLink.getAttribute('rel') == 'lytebox')) {
			this.imageArray.push(new Array(imageLink.getAttribute('href'), imageLink.getAttribute('title')));
		} else {
			if (imageLink.getAttribute('rel').indexOf('lytebox') != -1) {
				for (var i = 0; i < anchors.length; i++) {
					var anchor = anchors[i];
					if (anchor.getAttribute('href') && (anchor.getAttribute('rel') == imageLink.getAttribute('rel'))) {
						this.imageArray.push(new Array(anchor.getAttribute('href'), anchor.getAttribute('title')));
					}
				}
				this.imageArray.removeDuplicates();
				while(this.imageArray[this.imageNum][0] != imageLink.getAttribute('href')) { this.imageNum++; }
			}
			if (imageLink.getAttribute('rel').indexOf('lyteshow') != -1) {
				for (var i = 0; i < anchors.length; i++) {
					var anchor = anchors[i];
					if (anchor.getAttribute('href') && (anchor.getAttribute('rel') == imageLink.getAttribute('rel'))) {
						this.slideArray.push(new Array(anchor.getAttribute('href'), anchor.getAttribute('title')));
					}
				}
				this.slideArray.removeDuplicates();
				while(this.slideArray[this.slideNum][0] != imageLink.getAttribute('href')) { this.slideNum++; }
			}
		}
	}
	var object = this.doc.getElementById('lbMain');
		object.style.top = (this.getPageScroll() + (pageSize[3] / 15)) + "px";
		object.style.display = '';
	if (!this.outerBorder) {
		this.doc.getElementById('lbOuterContainer').style.border = 'none';
		this.doc.getElementById('lbDetailsContainer').style.border = 'none';
	} else {
		this.doc.getElementById('lbOuterContainer').style.borderBottom = '';
		this.doc.getElementById('lbOuterContainer').setAttribute((this.ie ? 'className' : 'class'), this.theme);
	}
	this.doc.getElementById('lbOverlay').onclick = function() { myLytebox.end(); return false; }
	this.doc.getElementById('lbMain').onclick = function(e) {
		var e = e;
		if (!e) {
			if (window.parent.frames[window.name] && (parent.document.getElementsByTagName('frameset').length <= 0)) {
				e = window.parent.window.event;
			} else {
				e = window.event;
			}
		}
		var id = (e.target ? e.target.id : e.srcElement.id);
		if (id == 'lbMain') { myLytebox.end(); return false; }
	}
	this.doc.getElementById('lbClose').onclick = function() { myLytebox.end(); return false; }
	this.doc.getElementById('lbPause').onclick = function() { myLytebox.togglePlayPause("lbPause", "lbPlay"); return false; }
	this.doc.getElementById('lbPlay').onclick = function() { myLytebox.togglePlayPause("lbPlay", "lbPause"); return false; }
	this.isSlideshow = doSlide;
	this.isPaused = (this.slideNum != 0 ? true : false);
	if (this.isSlideshow && this.showPlayPause && this.isPaused) {
		this.doc.getElementById('lbPlay').style.display = '';
		this.doc.getElementById('lbPause').style.display = 'none';
	}
	if (this.isLyteframe) {
		this.changeContent(this.frameNum);
	} else {
		if (this.isSlideshow) {
			this.changeContent(this.slideNum);
		} else {
			this.changeContent(this.imageNum);
		}
	}
};
LyteBox.prototype.changeContent = function(imageNum) {
	if (this.isSlideshow) {
		for (var i = 0; i < this.slideshowIDCount; i++) { window.clearTimeout(this.slideshowIDArray[i]); }
	}
	this.activeImage = this.activeSlide = this.activeFrame = imageNum;
	if (!this.outerBorder) {
		this.doc.getElementById('lbOuterContainer').style.border = 'none';
		this.doc.getElementById('lbDetailsContainer').style.border = 'none';
	} else {
		this.doc.getElementById('lbOuterContainer').style.borderBottom = '';
		this.doc.getElementById('lbOuterContainer').setAttribute((this.ie ? 'className' : 'class'), this.theme);
	}
	this.doc.getElementById('lbLoading').style.display = '';
	this.doc.getElementById('lbImage').style.display = 'none';
	this.doc.getElementById('lbIframe').style.display = 'none';
	this.doc.getElementById('lbPrev').style.display = 'none';
	this.doc.getElementById('lbNext').style.display = 'none';
	this.doc.getElementById('lbIframeContainer').style.display = 'none';
	this.doc.getElementById('lbDetailsContainer').style.display = 'none';
	this.doc.getElementById('lbNumberDisplay').style.display = 'none';
	if (this.navType == 2 || this.isLyteframe) {
		object = this.doc.getElementById('lbNavDisplay');
		object.innerHTML = '&nbsp;&nbsp;&nbsp;<span id="lbPrev2_Off" style="display: none;" class="' + this.theme + '">&laquo; prev</span><a href="#" id="lbPrev2" class="' + this.theme + '" style="display: none;">&laquo; prev</a> <b id="lbSpacer" class="' + this.theme + '">||</b> <span id="lbNext2_Off" style="display: none;" class="' + this.theme + '">next &raquo;</span><a href="#" id="lbNext2" class="' + this.theme + '" style="display: none;">next &raquo;</a>';
		object.style.display = 'none';
	}
	if (this.isLyteframe) {
		var iframe = myLytebox.doc.getElementById('lbIframe');
		var styles = this.frameArray[this.activeFrame][2];
		var aStyles = styles.split(';');
		for (var i = 0; i < aStyles.length; i++) {
			if (aStyles[i].indexOf('width:') >= 0) {
				var w = aStyles[i].replace('width:', '');
				iframe.width = w.trim();
			} else if (aStyles[i].indexOf('height:') >= 0) {
				var h = aStyles[i].replace('height:', '');
				iframe.height = h.trim();
			} else if (aStyles[i].indexOf('scrolling:') >= 0) {
				var s = aStyles[i].replace('scrolling:', '');
				iframe.scrolling = s.trim();
			} else if (aStyles[i].indexOf('border:') >= 0) {
				// Not implemented yet, as there are cross-platform issues with setting the border (from a GUI standpoint)
				//var b = aStyles[i].replace('border:', '');
				//iframe.style.border = b.trim();
			}
		}
		this.resizeContainer(parseInt(iframe.width), parseInt(iframe.height));
	} else {
		imgPreloader = new Image();
		imgPreloader.onload = function() {
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (myLytebox.autoResize) {
				var pagesize = myLytebox.getPageSize();
				var x = pagesize[2] - 150;
				var y = pagesize[3] - 150;
				if (imageWidth > x) {
					imageHeight = Math.round(imageHeight * (x / imageWidth));
					imageWidth = x;
					if (imageHeight > y) {
						imageWidth = Math.round(imageWidth * (y / imageHeight));
						imageHeight = y;
					}
				} else if (imageHeight > y) {
					imageWidth = Math.round(imageWidth * (y / imageHeight));
					imageHeight = y;
					if (imageWidth > x) {
						imageHeight = Math.round(imageHeight * (x / imageWidth));
						imageWidth = x;
					}
				}
			}
			var lbImage = myLytebox.doc.getElementById('lbImage')
			lbImage.src = (myLytebox.isSlideshow ? myLytebox.slideArray[myLytebox.activeSlide][0] : myLytebox.imageArray[myLytebox.activeImage][0]);
			lbImage.width = imageWidth;
			lbImage.height = imageHeight;
			myLytebox.resizeContainer(imageWidth, imageHeight);
			imgPreloader.onload = function() {};
		}
		imgPreloader.src = (this.isSlideshow ? this.slideArray[this.activeSlide][0] : this.imageArray[this.activeImage][0]);
	}
};
LyteBox.prototype.resizeContainer = function(imgWidth, imgHeight) {
	this.wCur = this.doc.getElementById('lbOuterContainer').offsetWidth;
	this.hCur = this.doc.getElementById('lbOuterContainer').offsetHeight;
	this.xScale = ((imgWidth  + (this.borderSize * 2)) / this.wCur) * 100;
	this.yScale = ((imgHeight  + (this.borderSize * 2)) / this.hCur) * 100;
	var wDiff = (this.wCur - this.borderSize * 2) - imgWidth;
	var hDiff = (this.hCur - this.borderSize * 2) - imgHeight;
	if (!(hDiff == 0)) {
		this.hDone = false;
		this.resizeH('lbOuterContainer', this.hCur, imgHeight + this.borderSize*2, this.getPixelRate(this.hCur, imgHeight));
	} else {
		this.hDone = true;
	}
	if (!(wDiff == 0)) {
		this.wDone = false;
		this.resizeW('lbOuterContainer', this.wCur, imgWidth + this.borderSize*2, this.getPixelRate(this.wCur, imgWidth));
	} else {
		this.wDone = true;
	}
	if ((hDiff == 0) && (wDiff == 0)) {
		if (this.ie){ this.pause(250); } else { this.pause(100); }
	}
	this.doc.getElementById('lbPrev').style.height = imgHeight + "px";
	this.doc.getElementById('lbNext').style.height = imgHeight + "px";
	this.doc.getElementById('lbDetailsContainer').style.width = (imgWidth + (this.borderSize * 2) + (this.ie && this.doc.compatMode == "BackCompat" && this.outerBorder ? 2 : 0)) + "px";
	this.showContent();
};
LyteBox.prototype.showContent = function() {
	if (this.wDone && this.hDone) {
		for (var i = 0; i < this.showContentTimerCount; i++) { window.clearTimeout(this.showContentTimerArray[i]); }
		if (this.outerBorder) {
			this.doc.getElementById('lbOuterContainer').style.borderBottom = 'none';
		}
		this.doc.getElementById('lbLoading').style.display = 'none';
		if (this.isLyteframe) {
			this.doc.getElementById('lbIframe').style.display = '';
			this.appear('lbIframe', (this.doAnimations ? 0 : 100));
		} else {
			this.doc.getElementById('lbImage').style.display = '';
			this.appear('lbImage', (this.doAnimations ? 0 : 100));
			this.preloadNeighborImages();
		}
		if (this.isSlideshow) {
			if(this.activeSlide == (this.slideArray.length - 1)) {
				if (this.autoEnd) {
					this.slideshowIDArray[this.slideshowIDCount++] = setTimeout("myLytebox.end('slideshow')", this.slideInterval);
				}
			} else {
				if (!this.isPaused) {
					this.slideshowIDArray[this.slideshowIDCount++] = setTimeout("myLytebox.changeContent("+(this.activeSlide+1)+")", this.slideInterval);
				}
			}
			this.doc.getElementById('lbHoverNav').style.display = (this.showNavigation && this.navType == 1 ? '' : 'none');
			this.doc.getElementById('lbClose').style.display = (this.showClose ? '' : 'none');
			this.doc.getElementById('lbDetails').style.display = (this.showDetails ? '' : 'none');
			this.doc.getElementById('lbPause').style.display = (this.showPlayPause && !this.isPaused ? '' : 'none');
			this.doc.getElementById('lbPlay').style.display = (this.showPlayPause && !this.isPaused ? 'none' : '');
			this.doc.getElementById('lbNavDisplay').style.display = (this.showNavigation && this.navType == 2 ? '' : 'none');
		} else {
			this.doc.getElementById('lbHoverNav').style.display = (this.navType == 1 && !this.isLyteframe ? '' : 'none');
			if ((this.navType == 2 && !this.isLyteframe && this.imageArray.length > 1) || (this.frameArray.length > 1 && this.isLyteframe)) {
				this.doc.getElementById('lbNavDisplay').style.display = '';
			} else {
				this.doc.getElementById('lbNavDisplay').style.display = 'none';
			}
			this.doc.getElementById('lbClose').style.display = '';
			this.doc.getElementById('lbDetails').style.display = '';
			this.doc.getElementById('lbPause').style.display = 'none';
			this.doc.getElementById('lbPlay').style.display = 'none';
		}
		this.doc.getElementById('lbImageContainer').style.display = (this.isLyteframe ? 'none' : '');
		this.doc.getElementById('lbIframeContainer').style.display = (this.isLyteframe ? '' : 'none');
		try {
			this.doc.getElementById('lbIframe').src = this.frameArray[this.activeFrame][0];
		} catch(e) { }
	} else {
		this.showContentTimerArray[this.showContentTimerCount++] = setTimeout("myLytebox.showContent()", 200);
	}
};
LyteBox.prototype.updateDetails = function() {
	var object = this.doc.getElementById('lbCaption');
	var sTitle = (this.isSlideshow ? this.slideArray[this.activeSlide][1] : (this.isLyteframe ? this.frameArray[this.activeFrame][1] : this.imageArray[this.activeImage][1]));
	object.style.display = '';
	object.innerHTML = (sTitle == null ? '' : sTitle);
	this.updateNav();
	this.doc.getElementById('lbDetailsContainer').style.display = '';
	object = this.doc.getElementById('lbNumberDisplay');
	if (this.isSlideshow && this.slideArray.length > 1) {
		object.style.display = '';
		object.innerHTML = "Image " + eval(this.activeSlide + 1) + " of " + this.slideArray.length;
		this.doc.getElementById('lbNavDisplay').style.display = (this.navType == 2 && this.showNavigation ? '' : 'none');
	} else if (this.imageArray.length > 1 && !this.isLyteframe) {
		object.style.display = '';
		object.innerHTML = "Image " + eval(this.activeImage + 1) + " of " + this.imageArray.length;
		this.doc.getElementById('lbNavDisplay').style.display = (this.navType == 2 ? '' : 'none');
	} else if (this.frameArray.length > 1 && this.isLyteframe) {
		object.style.display = '';
		object.innerHTML = "Page " + eval(this.activeFrame + 1) + " of " + this.frameArray.length;
		this.doc.getElementById('lbNavDisplay').style.display = '';
	} else {
		this.doc.getElementById('lbNavDisplay').style.display = 'none';
	}
	this.appear('lbDetailsContainer', (this.doAnimations ? 0 : 100));
};
LyteBox.prototype.updateNav = function() {
	if (this.isSlideshow) {
		if (this.activeSlide != 0) {
			var object = (this.navType == 2 ? this.doc.getElementById('lbPrev2') : this.doc.getElementById('lbPrev'));
				object.style.display = '';
				object.onclick = function() {
					if (myLytebox.pauseOnPrevClick) { myLytebox.togglePlayPause("lbPause", "lbPlay"); }
					myLytebox.changeContent(myLytebox.activeSlide - 1); return false;
				}
		} else {
			if (this.navType == 2) { this.doc.getElementById('lbPrev2_Off').style.display = ''; }
		}
		if (this.activeSlide != (this.slideArray.length - 1)) {
			var object = (this.navType == 2 ? this.doc.getElementById('lbNext2') : this.doc.getElementById('lbNext'));
				object.style.display = '';
				object.onclick = function() {
					if (myLytebox.pauseOnNextClick) { myLytebox.togglePlayPause("lbPause", "lbPlay"); }
					myLytebox.changeContent(myLytebox.activeSlide + 1); return false;
				}
		} else {
			if (this.navType == 2) { this.doc.getElementById('lbNext2_Off').style.display = ''; }
		}
	} else if (this.isLyteframe) {
		if(this.activeFrame != 0) {
			var object = this.doc.getElementById('lbPrev2');
				object.style.display = '';
				object.onclick = function() {
					myLytebox.changeContent(myLytebox.activeFrame - 1); return false;
				}
		} else {
			this.doc.getElementById('lbPrev2_Off').style.display = '';
		}
		if(this.activeFrame != (this.frameArray.length - 1)) {
			var object = this.doc.getElementById('lbNext2');
				object.style.display = '';
				object.onclick = function() {
					myLytebox.changeContent(myLytebox.activeFrame + 1); return false;
				}
		} else {
			this.doc.getElementById('lbNext2_Off').style.display = '';
		}
	} else {
		if(this.activeImage != 0) {
			var object = (this.navType == 2 ? this.doc.getElementById('lbPrev2') : this.doc.getElementById('lbPrev'));
				object.style.display = '';
				object.onclick = function() {
					myLytebox.changeContent(myLytebox.activeImage - 1); return false;
				}
		} else {
			if (this.navType == 2) { this.doc.getElementById('lbPrev2_Off').style.display = ''; }
		}
		if(this.activeImage != (this.imageArray.length - 1)) {
			var object = (this.navType == 2 ? this.doc.getElementById('lbNext2') : this.doc.getElementById('lbNext'));
				object.style.display = '';
				object.onclick = function() {
					myLytebox.changeContent(myLytebox.activeImage + 1); return false;
				}
		} else {
			if (this.navType == 2) { this.doc.getElementById('lbNext2_Off').style.display = ''; }
		}
	}
	this.enableKeyboardNav();
};
LyteBox.prototype.enableKeyboardNav = function() { document.onkeydown = this.keyboardAction; };
LyteBox.prototype.disableKeyboardNav = function() { document.onkeydown = ''; };
LyteBox.prototype.keyboardAction = function(e) {
	var keycode = key = escape = null;
	keycode	= (e == null) ? event.keyCode : e.which;
	key		= String.fromCharCode(keycode).toLowerCase();
	escape  = (e == null) ? 27 : e.DOM_VK_ESCAPE;
	if ((key == 'x') || (key == 'c') || (keycode == escape)) {
		myLytebox.end();
	} else if ((key == 'p') || (keycode == 37)) {
		if (myLytebox.isSlideshow) {
			if(myLytebox.activeSlide != 0) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeSlide - 1);
			}
		} else if (myLytebox.isLyteframe) {
			if(myLytebox.activeFrame != 0) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeFrame - 1);
			}
		} else {
			if(myLytebox.activeImage != 0) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeImage - 1);
			}
		}
	} else if ((key == 'n') || (keycode == 39)) {
		if (myLytebox.isSlideshow) {
			if(myLytebox.activeSlide != (myLytebox.slideArray.length - 1)) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeSlide + 1);
			}
		} else if (myLytebox.isLyteframe) {
			if(myLytebox.activeFrame != (myLytebox.frameArray.length - 1)) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeFrame + 1);
			}
		} else {
			if(myLytebox.activeImage != (myLytebox.imageArray.length - 1)) {
				myLytebox.disableKeyboardNav();
				myLytebox.changeContent(myLytebox.activeImage + 1);
			}
		}
	}
};
LyteBox.prototype.preloadNeighborImages = function() {
	if (this.isSlideshow) {
		if ((this.slideArray.length - 1) > this.activeSlide) {
			preloadNextImage = new Image();
			preloadNextImage.src = this.slideArray[this.activeSlide + 1][0];
		}
		if(this.activeSlide > 0) {
			preloadPrevImage = new Image();
			preloadPrevImage.src = this.slideArray[this.activeSlide - 1][0];
		}
	} else {
		if ((this.imageArray.length - 1) > this.activeImage) {
			preloadNextImage = new Image();
			preloadNextImage.src = this.imageArray[this.activeImage + 1][0];
		}
		if(this.activeImage > 0) {
			preloadPrevImage = new Image();
			preloadPrevImage.src = this.imageArray[this.activeImage - 1][0];
		}
	}
};
LyteBox.prototype.togglePlayPause = function(hideID, showID) {
	if (this.isSlideshow && hideID == "lbPause") {
		for (var i = 0; i < this.slideshowIDCount; i++) { window.clearTimeout(this.slideshowIDArray[i]); }
	}
	this.doc.getElementById(hideID).style.display = 'none';
	this.doc.getElementById(showID).style.display = '';
	if (hideID == "lbPlay") {
		this.isPaused = false;
		if (this.activeSlide == (this.slideArray.length - 1)) {
			this.end();
		} else {
			this.changeContent(this.activeSlide + 1);
		}
	} else {
		this.isPaused = true;
	}
};
LyteBox.prototype.end = function(caller) {
	var closeClick = (caller == 'slideshow' ? false : true);
	if (this.isSlideshow && this.isPaused && !closeClick) { return; }
	this.disableKeyboardNav();
	this.doc.getElementById('lbMain').style.display = 'none';
	this.fade('lbOverlay', (this.doAnimations ? this.maxOpacity : 0));
	this.toggleSelects('visible');
	if (this.hideFlash) { this.toggleFlash('visible'); }
	if (this.isSlideshow) {
		for (var i = 0; i < this.slideshowIDCount; i++) { window.clearTimeout(this.slideshowIDArray[i]); }
	}
	if (this.isLyteframe) {
		 this.initialize();
	}
};
LyteBox.prototype.checkFrame = function() {
	if (window.parent.frames[window.name] && (parent.document.getElementsByTagName('frameset').length <= 0)) {
		this.isFrame = true;
		this.lytebox = "window.parent." + window.name + ".myLytebox";
		this.doc = parent.document;
	} else {
		this.isFrame = false;
		this.lytebox = "myLytebox";
		this.doc = document;
	}
};
LyteBox.prototype.getPixelRate = function(cur, img) {
	var diff = (img > cur) ? img - cur : cur - img;
	if (diff >= 0 && diff <= 100) { return 10; }
	if (diff > 100 && diff <= 200) { return 15; }
	if (diff > 200 && diff <= 300) { return 20; }
	if (diff > 300 && diff <= 400) { return 25; }
	if (diff > 400 && diff <= 500) { return 30; }
	if (diff > 500 && diff <= 600) { return 35; }
	if (diff > 600 && diff <= 700) { return 40; }
	if (diff > 700) { return 45; }
};
LyteBox.prototype.appear = function(id, opacity) {
	var object = this.doc.getElementById(id).style;
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + (opacity + 10) + ")";
	if (opacity == 100 && (id == 'lbImage' || id == 'lbIframe')) {
		try { object.removeAttribute("filter"); } catch(e) {}	/* Fix added for IE Alpha Opacity Filter bug. */
		this.updateDetails();
	} else if (opacity >= this.maxOpacity && id == 'lbOverlay') {
		for (var i = 0; i < this.overlayTimerCount; i++) { window.clearTimeout(this.overlayTimerArray[i]); }
		return;
	} else if (opacity >= 100 && id == 'lbDetailsContainer') {
		try { object.removeAttribute("filter"); } catch(e) {}	/* Fix added for IE Alpha Opacity Filter bug. */
		for (var i = 0; i < this.imageTimerCount; i++) { window.clearTimeout(this.imageTimerArray[i]); }
		this.doc.getElementById('lbOverlay').style.height = this.getPageSize()[1] + "px";
	} else {
		if (id == 'lbOverlay') {
			this.overlayTimerArray[this.overlayTimerCount++] = setTimeout("myLytebox.appear('" + id + "', " + (opacity+20) + ")", 1);
		} else {
			this.imageTimerArray[this.imageTimerCount++] = setTimeout("myLytebox.appear('" + id + "', " + (opacity+10) + ")", 1);
		}
	}
};
LyteBox.prototype.fade = function(id, opacity) {
	var object = this.doc.getElementById(id).style;
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
	if (opacity <= 0) {
		try {
			object.display = 'none';
		} catch(err) { }
	} else if (id == 'lbOverlay') {
		this.overlayTimerArray[this.overlayTimerCount++] = setTimeout("myLytebox.fade('" + id + "', " + (opacity-20) + ")", 1);
	} else {
		this.timerIDArray[this.timerIDCount++] = setTimeout("myLytebox.fade('" + id + "', " + (opacity-10) + ")", 1);
	}
};
LyteBox.prototype.resizeW = function(id, curW, maxW, pixelrate, speed) {
	if (!this.hDone) {
		this.resizeWTimerArray[this.resizeWTimerCount++] = setTimeout("myLytebox.resizeW('" + id + "', " + curW + ", " + maxW + ", " + pixelrate + ")", 100);
		return;
	}
	var object = this.doc.getElementById(id);
	var timer = speed ? speed : (this.resizeDuration/2);
	var newW = (this.doAnimations ? curW : maxW);
	object.style.width = (newW) + "px";
	if (newW < maxW) {
		newW += (newW + pixelrate >= maxW) ? (maxW - newW) : pixelrate;
	} else if (newW > maxW) {
		newW -= (newW - pixelrate <= maxW) ? (newW - maxW) : pixelrate;
	}
	this.resizeWTimerArray[this.resizeWTimerCount++] = setTimeout("myLytebox.resizeW('" + id + "', " + newW + ", " + maxW + ", " + pixelrate + ", " + (timer+0.02) + ")", timer+0.02);
	if (parseInt(object.style.width) == maxW) {
		this.wDone = true;
		for (var i = 0; i < this.resizeWTimerCount; i++) { window.clearTimeout(this.resizeWTimerArray[i]); }
	}
};
LyteBox.prototype.resizeH = function(id, curH, maxH, pixelrate, speed) {
	var timer = speed ? speed : (this.resizeDuration/2);
	var object = this.doc.getElementById(id);
	var newH = (this.doAnimations ? curH : maxH);
	object.style.height = (newH) + "px";
	if (newH < maxH) {
		newH += (newH + pixelrate >= maxH) ? (maxH - newH) : pixelrate;
	} else if (newH > maxH) {
		newH -= (newH - pixelrate <= maxH) ? (newH - maxH) : pixelrate;
	}
	this.resizeHTimerArray[this.resizeHTimerCount++] = setTimeout("myLytebox.resizeH('" + id + "', " + newH + ", " + maxH + ", " + pixelrate + ", " + (timer+.02) + ")", timer+.02);
	if (parseInt(object.style.height) == maxH) {
		this.hDone = true;
		for (var i = 0; i < this.resizeHTimerCount; i++) { window.clearTimeout(this.resizeHTimerArray[i]); }
	}
};
LyteBox.prototype.getPageScroll = function() {
	if (self.pageYOffset) {
		return this.isFrame ? parent.pageYOffset : self.pageYOffset;
	} else if (this.doc.documentElement && this.doc.documentElement.scrollTop){
		return this.doc.documentElement.scrollTop;
	} else if (document.body) {
		return this.doc.body.scrollTop;
	}
};
LyteBox.prototype.getPageSize = function() {
	var xScroll, yScroll, windowWidth, windowHeight;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = this.doc.scrollWidth;
		yScroll = (this.isFrame ? parent.innerHeight : self.innerHeight) + (this.isFrame ? parent.scrollMaxY : self.scrollMaxY);
	} else if (this.doc.body.scrollHeight > this.doc.body.offsetHeight){
		xScroll = this.doc.body.scrollWidth;
		yScroll = this.doc.body.scrollHeight;
	} else {
		xScroll = this.doc.getElementsByTagName("html").item(0).offsetWidth;
		yScroll = this.doc.getElementsByTagName("html").item(0).offsetHeight;
		xScroll = (xScroll < this.doc.body.offsetWidth) ? this.doc.body.offsetWidth : xScroll;
		yScroll = (yScroll < this.doc.body.offsetHeight) ? this.doc.body.offsetHeight : yScroll;
	}
	if (self.innerHeight) {
		windowWidth = (this.isFrame) ? parent.innerWidth : self.innerWidth;
		windowHeight = (this.isFrame) ? parent.innerHeight : self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		windowWidth = this.doc.documentElement.clientWidth;
		windowHeight = this.doc.documentElement.clientHeight;
	} else if (document.body) {
		windowWidth = this.doc.getElementsByTagName("html").item(0).clientWidth;
		windowHeight = this.doc.getElementsByTagName("html").item(0).clientHeight;
		windowWidth = (windowWidth == 0) ? this.doc.body.clientWidth : windowWidth;
		windowHeight = (windowHeight == 0) ? this.doc.body.clientHeight : windowHeight;
	}
	var pageHeight = (yScroll < windowHeight) ? windowHeight : yScroll;
	var pageWidth = (xScroll < windowWidth) ? windowWidth : xScroll;
	return new Array(pageWidth, pageHeight, windowWidth, windowHeight);
};
LyteBox.prototype.toggleFlash = function(state) {
	var objects = this.doc.getElementsByTagName("object");
	for (var i = 0; i < objects.length; i++) {
		objects[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
	}
	var embeds = this.doc.getElementsByTagName("embed");
	for (var i = 0; i < embeds.length; i++) {
		embeds[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
	}
	if (this.isFrame) {
		for (var i = 0; i < parent.frames.length; i++) {
			try {
				objects = parent.frames[i].window.document.getElementsByTagName("object");
				for (var j = 0; j < objects.length; j++) {
					objects[j].style.visibility = (state == "hide") ? 'hidden' : 'visible';
				}
			} catch(e) { }
			try {
				embeds = parent.frames[i].window.document.getElementsByTagName("embed");
				for (var j = 0; j < embeds.length; j++) {
					embeds[j].style.visibility = (state == "hide") ? 'hidden' : 'visible';
				}
			} catch(e) { }
		}
	}
};
LyteBox.prototype.toggleSelects = function(state) {
	var selects = this.doc.getElementsByTagName("select");
	for (var i = 0; i < selects.length; i++ ) {
		selects[i].style.visibility = (state == "hide") ? 'hidden' : 'visible';
	}
	if (this.isFrame) {
		for (var i = 0; i < parent.frames.length; i++) {
			try {
				selects = parent.frames[i].window.document.getElementsByTagName("select");
				for (var j = 0; j < selects.length; j++) {
					selects[j].style.visibility = (state == "hide") ? 'hidden' : 'visible';
				}
			} catch(e) { }
		}
	}
};
LyteBox.prototype.pause = function(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime) { return; }
	}
};
if (window.addEventListener) {
	window.addEventListener("load",initLytebox,false);
} else if (window.attachEvent) {
	window.attachEvent("onload",initLytebox);
} else {
	window.onload = function() {initLytebox();}
}
function initLytebox() { myLytebox = new LyteBox(); }
var search_SearchBlock_promptString, search_SearchBlock_input,
    search_SearchBlock_errorString, search_SearchBlock_inProgressString;
var search_submitted = false;

function search_SearchBlock_init(prompt, error, inProgress) {
    search_SearchBlock_promptString = prompt;
    search_SearchBlock_errorString = error;
    search_SearchBlock_inProgressString = inProgress;
    search_SearchBlock_input = document.getElementById('search_SearchBlock').searchCriteria;

    search_SearchBlock_input.value = prompt;
}

function search_SearchBlock_checkForm() {
    var sc = search_SearchBlock_input.value;
    if (search_submitted) {
	alert(search_SearchBlock_inProgressString);
	return false;
    } else if (sc == search_SearchBlock_promptString || sc == '') {
	alert(search_SearchBlock_errorString);
	return false;
    }
    document.getElementById('search_SearchBlock').submit();
    search_submitted = true;
    return true;
}

function search_SearchBlock_focus() {
    if (search_SearchBlock_input.value == search_SearchBlock_promptString) {
	search_SearchBlock_input.value = '';
    }
}

function search_SearchBlock_blur() {
    if (search_SearchBlock_input.value == '') {
	search_SearchBlock_input.value = search_SearchBlock_promptString;
    }
}
/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr�               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

// Node object
function Node(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
};

// Tree object
function dTree(objName) {
	this.config = {
		target			: null,
		folderLinks		: true,
		useSelection		: true,
		useCookies		: true,
		useLines		: true,
		useIcons		: false,
		useStatusText		: false,
		closeSameLevel		: false,
		inOrder			: false
	}
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};

// Adds a new node to the node array
dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) {
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
};

// Open/close all nodes
dTree.prototype.openAll = function() {
	this.oAll(true);
};
dTree.prototype.closeAll = function() {
	this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function() {
	var str = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNode(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};

// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId) {
	var str = '<div class="dTreeNode" title="' + node.name + '">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
	}
	if (node.url) {
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
	str += node.name;
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId) {
	var str = '';
	if (this.root.id != node.pid) {
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) {
			str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
			str += '" alt="" /></a>';
		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';
	}
	return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function(node) {
	var lastId;
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id) node._hc = true;
		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;
};

// Returns the selected node
dTree.prototype.getSelected = function() {
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
};

// Highlights the selected node
dTree.prototype.s = function(id) {
	if (!this.config.useSelection) return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks) return;
	if (this.selectedNode != id) {
		if (this.selectedNode || this.selectedNode==0) {
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			eOld.className = "node";
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
dTree.prototype.o = function(id) {
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};

// Open or close all nodes
dTree.prototype.oAll = function(status) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
dTree.prototype.openTo = function(nId, bSelect, bFirst) {
	if (!bFirst) {
		for (var n=0; n<this.aNodes.length; n++) {
			if (this.aNodes[n].id == nId) {
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	if (cn.pid==this.root.id || !cn._p) return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect) this.s(cn._ai);
	else if (bSelect) this._sn=cn._ai;
	this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node) {
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);		
		}
	}
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom) {
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons) {
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
	}
	eJoin.src = (this.config.useLines)?
	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
	((status)?this.icon.nlMinus:this.icon.nlPlus);
	eDiv.style.display = (status) ? 'block': 'none';
};


// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function() {
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function() {
	var str = '';
	for (var n=0; n<this.aNodes.length; n++) {
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
			if (str) str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
	Array.prototype.push = function array_push() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};
if (!Array.prototype.pop) {
	Array.prototype.pop = function array_pop() {
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};