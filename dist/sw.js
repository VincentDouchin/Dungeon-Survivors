if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>s(e,r),l={module:{uri:r},exports:o,require:c};i[r]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(t(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.fef8aa00.css",revision:null},{url:"index.html",revision:"020ccc88f2ebc97fd06d279927447197"},{url:"registerSW.js",revision:"760a54a5e9deaa5bcb807379f444e6c7"},{url:"manifest.webmanifest",revision:"934869bc1aeb052464d225eb030d107f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
