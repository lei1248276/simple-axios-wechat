"use strict";function a(s){return/^(https?:)/.test(s)}function d(s,e){const t=["constructor"],n=Object.getOwnPropertyNames(e).filter(u=>!t.includes(u)),r={};return n.forEach(u=>{typeof e[u]=="function"&&(r[u]=e[u].bind(s))}),r}class h{constructor(e){this.defaults=e,this.interceptors={request:new o,response:new o}}request(e){var u;e={...this.defaults,...e};const t=[((u=this.defaults)==null?void 0:u.adapter)||p,null];this.interceptors.request.forEach(function(l){t.unshift(l.fulfilled,l.rejected)}),this.interceptors.response.forEach(function(l){t.push(l.fulfilled,l.rejected)});let n=Promise.resolve(e),r=0;for(;r<t.length;)n=n.then(t[r++],t[r++]);return n}options(e="",t={}){return this.request({method:"OPTIONS",url:e,...t})}get(e="",t={}){return this.request({method:"GET",url:e,...t})}head(e="",t={}){return this.request({method:"HEAD",url:e,...t})}post(e="",t={}){return this.request({method:"POST",url:e,...t})}put(e="",t={}){return this.request({method:"PUT",url:e,...t})}delete(e="",t={}){return this.request({method:"DELETE",url:e,...t})}trace(e="",t={}){return this.request({method:"TRACE",url:e,...t})}connect(e="",t={}){return this.request({method:"CONNECT",url:e,...t})}}class o{constructor(){this.handlers=[]}use(e,t){return this.handlers.push({fulfilled:e||null,rejected:t||null}),this.handlers.length-1}eject(e){this.handlers[e]={fulfilled:null,rejected:null}}clear(){this.handlers=[]}forEach(e){this.handlers.forEach(t=>{e(t)})}}function p(s){return new Promise((e,t)=>{const n=wx.request({...s,url:a(s.url)?s.url:s.baseURL+s.url,success:r=>{e(r)},fail:r=>{t(r)}});s.getRequestTask&&s.getRequestTask(n)})}function c(s){const e=new h(s),t=h.prototype.request.bind(e);return t.create=function(n){return c({...s,...n})},Object.assign(t,d(e,h.prototype),e)}const f={baseURL:"",header:{},adapter:null},q=c(f);module.exports=q;