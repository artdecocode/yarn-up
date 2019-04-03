#!/usr/bin/env node
'use strict';
const path = require('path');
const child_process = require('child_process');
const {resolve:m}=path;const {spawn:n}=child_process;async function p(){var a=q;if(null===a||void 0===a)throw Error("Package.json content is not given");const {devDependencies:f,dependencies:d}=a,b=Object.assign({},f,d);a=Object.keys(b);const [e,c]=a.reduce((g,h)=>{var [k,l]=g;/^\d/.test(b[h])?k.push(h):l.push(h);return[k,l]},[[],[]]);e.length&&await r(e,!0);c.length&&await r(c)}
const r=async(a,f)=>{const d=["upgrade",...a.map(b=>`${b}@latest`),...f?["-E"]:[]];process.stdout.write(["yarn",...d,"\n"].join(" "));await new Promise((b,e)=>{const c=n("yarn",d,{stdio:"inherit"});c.on("close",()=>{b()});c.on("error",g=>{e(g)})})};const q=require(m(process.cwd(),"package.json"));(async()=>{try{await p()}catch(a){console.log(a)}})();

//# sourceMappingURL=yarn-up.js.map