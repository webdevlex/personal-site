parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mpVp":[function(require,module,exports) {
function e(e){return document.querySelector(e)}window.scrollTo(0,0);var t=e(".mobile-menu-button");t.addEventListener("click",function(){return o()});var n=!1;function o(){n=!n,c(),r(),s()}function c(){e(".navbar-menu").classList.toggle("fade")}function r(){e(".top-line").classList.toggle("animate-top-line"),e(".bottom-line").classList.toggle("animate-bottom-line")}function s(){document.getElementsByTagName("body")[0].classList.toggle("stop-scrolling")}var i=e(".navbar-menu");function l(e){u(e)&&a(".home-".concat(e))}function u(e){return"contact"!==e}function a(e){n&&o();var t=f(e);window.scrollTo(t)}function f(t){return{top:e(t).getBoundingClientRect().top+window.scrollY,left:0,behavior:"smooth"}}function d(){m(),s(),v()}function m(){var t=e(".contact-container");t.classList.contains("hide-contact")?(t.classList.remove("hide-contact"),t.classList.add("slide-in")):(t.classList.add("hide-contact"),t.classList.remove("slide-in"))}function v(){e(".contact-bg").classList.toggle("show-bg")}function L(){E();var t=e(".left-project"),n=e(".center-project"),o=e(".right-project");p(t),h(n),y(o)}function g(){var e=document.querySelector(".center-project");"false"===e.getAttribute("isLogoFacingUser")&&x(e)}function p(e){e.classList.remove("left-project"),e.classList.add("center-project")}function h(e){e.classList.remove("center-project"),e.classList.add("right-project")}function y(e){e.classList.remove("right-project"),e.classList.add("left-project")}function j(){E();var t=e(".left-project"),n=e(".center-project"),o=e(".right-project");q(t),S(n),b(o)}function q(e){e.classList.remove("left-project"),e.classList.add("right-project")}function S(e){e.classList.remove("center-project"),e.classList.add("left-project")}function b(e){e.classList.remove("right-project"),e.classList.add("center-project")}function E(){A(),setTimeout(function(){return w()},600)}function A(){document.querySelectorAll(".scroll-button").forEach(function(e){return e.style.pointerEvents="none"}),document.querySelectorAll(".scroller").forEach(function(e){return e.style.pointerEvents="none"})}function w(){document.querySelectorAll(".scroll-button").forEach(function(e){return e.style.pointerEvents="all"}),document.querySelectorAll(".scroller").forEach(function(e){return e.style.pointerEvents="all"})}i.addEventListener("click",function(e){return l(e.target.id)}),document.querySelectorAll(".contact-btn").forEach(function(e){return e.addEventListener("click",function(){return d()})}),m(),v(),m(),v(),document.querySelectorAll(".left-scroller").forEach(function(e){return e.addEventListener("click",function(){return L()})}),document.querySelectorAll(".right-scroller").forEach(function(e){return e.addEventListener("click",function(){return j()})});var k=document.querySelectorAll(".project");function T(e){var t=F(),n=e.target,o=n.classList.contains("center-project");if(t<576||o)x(n);else{var c=n.classList.contains("left-project"),r=n.classList.contains("right-project");c?L():r&&j()}}function x(e){"true"==e.getAttribute("isLogoFacingUser")?e.setAttribute("isLogoFacingUser",!1):e.setAttribute("isLogoFacingUser",!0),e.querySelector(".project-rotater").classList.toggle("rotate")}function F(){return Math.max(document.documentElement.clientWidth||0,window.innerWidth||0)}k.forEach(function(e){e.setAttribute("isLogoFacingUser",!0),e.addEventListener("click",function(e){return T(e)})});var N=document.querySelectorAll(".intersection"),U=e(".contact-button"),_={root:null,threshhold:0,rootMargin:"0px"},z=new IntersectionObserver(function(e,t){e.forEach(function(e){U.classList.toggle("show-contact-button")})},_);function M(){var e=document.querySelector(".form"),t={name:e.elements.name.value,email:e.elements.email.value,subject:e.elements.subject.value,message:e.elements.message.value},n=!1;Object.entries(t).forEach(function(e){B(e)&&(n=!0)}),P(),I(),n?Q({status:0,text:"Missing required field"}):Z(t)}function B(e){var t=e[0],n=e[1];return n&&("email"!==t||C(n))?void W(t):(O(t),t)}function C(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}function O(e){document.querySelector(".form").elements[e].parentNode.classList.add("error")}function W(e){document.querySelector(".form").elements[e].parentNode.classList.remove("error")}function Z(e){emailjs.send("default_service","template_vr6w86n",e).then(function(t){return R(t,e)},function(e){return Q(e)})}function I(){document.querySelector(".loader").classList.add("active")}function R(e,t){console.log("Email sent successfully!"),Y(t),$(0),G(1500),H(2500),K(2e3)}function Y(e){emailjs.send("default_service","template_tzksk1i",e).then(function(){return console.log("Notification sent successfully!")},function(){return console.log("Notification failed to send...")})}function $(e){setTimeout(function(){D()},e)}function D(){var e=document.querySelector(".loader"),t=document.querySelector(".check");e.classList.add("success"),t.classList.add("active")}function G(e){setTimeout(function(){d()},e)}function H(e){setTimeout(function(){J()},e)}function J(){var e=document.querySelector(".form");e.elements.name.value="",e.elements.email.value="",e.elements.subject.value="",e.elements.message.value=""}function K(e){setTimeout(function(){P()},e)}function P(){var e=document.querySelector(".loader"),t=document.querySelector(".exclamation"),n=document.querySelector(".check"),o=document.querySelector(".contact-container");e.classList.remove("active"),e.classList.remove("success"),e.classList.remove("failed"),t.classList.remove("active"),n.classList.remove("active"),o.classList.remove("errors")}function Q(e){console.log("Email failed to send..."),V(10)}function V(e){setTimeout(function(){X()},e)}function X(){var e=document.querySelector(".slide-in"),t=document.querySelector(".loader");document.querySelector(".exclamation").classList.add("active"),t.classList.add("failed"),e.classList.add("errors")}N.forEach(function(e){z.observe(e)}),document.querySelector(".send-button").addEventListener("click",function(){return M()});
},{}]},{},["mpVp"], null)
//# sourceMappingURL=script.f4ae2800.js.map