!function(){const i={version:"0.1.0",_listeners:{triggers:{},closeTriggers:{}},getDialogs(){return document.querySelectorAll("[id][role='dialog']")},getDialogTriggers(i){i=i.getAttribute("id");return"string"!=typeof i||0===i.length?[]:document.querySelectorAll(`[aria-haspopup="dialog"][aria-controls="${i}"]`)},open(e){if(!e.hasAttribute("open")){var i,o;e.setAttribute("open","");for([i,o]of window.baunilha.dialog._listeners.triggers[e.id])i.removeEventListener("click",o),i.setAttribute("aria-expanded","true");window.baunilha.dialog._listeners.triggers[e.id]=[];var a,n=[];for(a of e.querySelectorAll("[close]")){function t(i){i.stopPropagation(),window.baunilha.dialog.close(e)}a.addEventListener("click",t),n.push([a,t])}window.baunilha.dialog._listeners.closeTriggers[e.id]=n}},close(e){if(e.hasAttribute("open")){e.removeAttribute("open");var i,o,a,n=[];for(i of window.baunilha.dialog.getDialogTriggers(e)){function t(i){i.stopPropagation(),window.baunilha.dialog.open(e)}i.setAttribute("aria-expanded","false"),i.addEventListener("click",t),n.push([i,t])}window.baunilha.dialog._listeners.triggers[e.id]=n;for([o,a]of window.baunilha.dialog._listeners.closeTriggers[e.id])o.removeEventListener("click",a);window.baunilha.dialog._listeners.closeTriggers[e.id]=[]}},hookDialogTriggers(e){var i,o=[];for(i of window.baunilha.dialog.getDialogTriggers(e)){function a(i){i.stopPropagation(),window.baunilha.dialog.open(e)}i.addEventListener("click",a),o.push([i,a])}window.baunilha.dialog._listeners.triggers[e.id]=o},setupPortal(){var i=document.createElement("div");return i.setAttribute("id","dialog-portal"),document.getElementsByTagName("body")[0].appendChild(i),i},setup(){var i=window.baunilha.dialog.getDialogs();if(0!==i.length){var e,o=window.baunilha.dialog.setupPortal();for(e of i)o.appendChild(e),window.baunilha.dialog.hookDialogTriggers(e)}}};document.addEventListener("DOMContentLoaded",()=>{void 0===window.baunilha&&(window.baunilha={}),void 0===window.baunilha.dialog&&(window.baunilha.dialog={...i}),window.baunilha.dialog.setup()})}();