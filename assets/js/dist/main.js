(()=>{"use strict";const t={INSTANCE:".js-typeguardian",INPUT:".js-typeguardian__input",OUTPUT:".js-typeguardian__output",GENERATE:".js-typeguardian__generate",COPY:".js-typeguardian__copy",INDENTATION:".js-typeguardian__indentation",TOAST:".js-toast"},e={ERROR:"has-error",TOAST_CONTAINER:"toast__container",TOAST:"toast"},n={duration:6e3},r=document.createElement("div");async function o(){const o=this.closest(t.INSTANCE);if(!o)return;const a=o.querySelector(t.OUTPUT);if(!(a instanceof HTMLTextAreaElement))return;const i=a.value;await navigator.clipboard.writeText(i),function(t,o){const a={...n,...o},i=function(){const t=document.createElement("div");return t.classList.add(e.TOAST),t}();i.innerText=t;const s={opacity:0};matchMedia("(prefers-reduced-motion: no-preference)").matches&&(s.transform="translateY(100%)"),r.append(i),i.animate([s,{}],{duration:300,fill:"backwards"}),function(t,e){new Promise(((n,r)=>{window.setTimeout((()=>{const e={opacity:0};!1===matchMedia("(prefers-reduced-motion: reduce)").matches&&(e.transform="translateY(-100%)"),t.animate([{},e],{duration:300,fill:"forwards"}).addEventListener("finish",(()=>{t.remove(),n()}))}),e)}))}(i,a.duration)}("Copied!")}function a(t){return`is${t}`}function i(t,e,n="    ",r=0){const o=function(t="    ",e=0){const n=new Array(e);return n.fill(t),n.join("")}(n,r),s=/^([A-Z][a-z]+)+$/;if(["boolean","number","string","undefined"].includes(e))return`typeof data.${t} === '${e}'`;if("null"===e)return`data.${t} === null`;const c=e.match(/^(Array<(.+?)>|(.+?)\[\])$/);if(c){const e=c[2]??c[3];return`\n${o}${n}Array.isArray(data.${t}) &&\n${o}${n}data.${t}.every(${e.match(s)?a(e):`() => ${i(t,e,n,r+1)}`})\n${o}`}const u=e.split(/\s*\|\s*/),l=[...new Set(u)];return u.length!==l.length&&console.warn(`WARNING: Duplicate union member detected in type ${e}`),u.length>1?`\n${o}${n}${u.map((e=>i(t,e,n,r+1))).join(` ||\n${o}${n}`)}\n${o}`:s.test(e)?`${a(e)}(data.${t})`:`false /* TODO: implement typeguard for \`${t}: ${e}\`*/`}r.classList.add(e.TOAST_CONTAINER),r.setAttribute("aria-live","polite"),document.body.append(r);const s="1.1.0";function c(t,e="    "){const n="string"==typeof t?function(t){const e=/^\/\//,n=/^\/?\*/,r=t.split("\n").map((t=>t.trim())).filter((t=>""!==t&&!e.test(t)&&!n.test(t)));if(0===r.length)throw new Error("Couldn't read empty type definition");const o=r[0].match(/^(export\s+)?(type|interface)\s+(\w+)\s*=?\s*{(\s*\/\/.*)?$/);if(!o)throw new Error("Couldn't determine name of custom type");const a=Boolean(o[1]),i=o[3],s=r.slice(1,-1).map(((t,r)=>{if(e.test(t))return;if(n.test(t))return;const o=t.match(/^(\w+)\s*(\??:)\s*(.+?)(,|;)?(\s*\/\/.*)?$/);if(!o)throw new Error(`Couldn't read property on line ${r} of ${i} definition: ${t}`);const a=o[1],s="?:"===o[2];return[a,`${o[3]}${s?" | undefined":""}`]})).filter((t=>Boolean(t)));return{name:i,props:s,exported:a}}(t):t,{name:r,props:o,exported:a}=n;return`/**\n * Typeguard function for {@linkcode ${r}}\n *\n * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${s}\n */\n${a?"export ":""}function is${r}(testData: unknown): testData is ${r} {\n${e}const data = testData as ${r};\n\n${e}if (!(\n${e}${e}typeof data === 'object' &&\n${e}${e}data !== null\n${e})) {\n${e}${e}return false;\n${e}}\n\n${e}${o.map((([t,n])=>`if (!(${i(t,n,e,1)})) {\n${e}${e}return false;\n${e}}`)).join(`\n\n${e}`)}\n\n${e}return true;\n}\n`}const u=function(t){const e=Object.values({TABS:"\t",SPACE_TWO:"  ",SPACE_FOUR:"    "});return function(t){return e.includes(t)}}();function l(e){const n=e.querySelector(t.INDENTATION);if(!(n instanceof HTMLSelectElement))return null;const r=n.value;return u(r)?{indentation:r}:null}function d(){const n=this.closest(t.INSTANCE);if(!n)return;const r=n.querySelector(t.INPUT);if(!(r instanceof HTMLTextAreaElement))return;const o=n.querySelector(t.OUTPUT);if(!(o instanceof HTMLTextAreaElement))return;const a=r.value;try{const t=l(n),r=c(a,t?.indentation);o.value=r,o.classList.remove(e.ERROR)}catch(t){const n=t instanceof Error?t.message:String(t);o.value=n,o.classList.add(e.ERROR)}}function f(){const e=this.closest(t.INSTANCE);if(!e)return;const n=l(e);localStorage.setItem("options",JSON.stringify(n))}document.querySelectorAll(t.GENERATE).forEach((t=>t.addEventListener("click",d))),document.addEventListener("keydown",(n=>{const r=document.querySelector(t.INPUT);if(!r)return;const a=document.querySelector(t.OUTPUT);a&&"Enter"===n.key&&(n.ctrlKey||n.metaKey)&&(d.call(r),a.classList.contains(e.ERROR)||o.call(r))})),document.querySelectorAll(t.COPY).forEach((t=>t.addEventListener("click",o))),document.querySelectorAll(t.INDENTATION).forEach((t=>t.addEventListener("change",f)))})();
//# sourceMappingURL=main.js.map