if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),f={module:{uri:c},exports:o,require:t};i[c]=Promise.all(r.map((e=>f[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.5383d9b8.css",revision:null},{url:"index.html",revision:"8eb11125cdd4ce6089b31b12cfcb6ac1"},{url:"registerSW.js",revision:"760a54a5e9deaa5bcb807379f444e6c7"},{url:"favicon.ico",revision:"2194b883c2fad05c626ac90741669ef2"},{url:"apple-touch-icon.png",revision:"b24616f6bfcc1038a6e18426fcfafc9b"},{url:"pwa-192x192.png",revision:"190e5618aaa037e8e2d76bae80e94c31"},{url:"pwa-512x512.png",revision:"4a913f4920faac745b69e6ae657a810d"},{url:"manifest.webmanifest",revision:"c15751d3ee73f0e45a3f06bf567833fa"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
