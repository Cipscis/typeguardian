(()=>{"use strict";const e={INSTANCE:".js-typeguardian",INPUT:".js-typeguardian__input",OUTPUT:".js-typeguardian__output",GENERATE:".js-typeguardian__generate",COPY:".js-typeguardian__copy",ALLOW_ENHANCED_DEBUGGING:".js-typeguardian__allow-enhanced-debugging",INDENTATION:".js-typeguardian__indentation",TOAST:".js-toast"},n={ERROR:"has-error",TOAST_CONTAINER:"toast__container",TOAST:"toast"},t={duration:6e3},r=document.createElement("div");async function o(){const o=this.closest(e.INSTANCE);if(!o)return;const a=o.querySelector(e.OUTPUT);if(!(a instanceof HTMLTextAreaElement))return;const i=a.value;await navigator.clipboard.writeText(i),function(e,o){const a={...t,...o},i=function(){const e=document.createElement("div");return e.classList.add(n.TOAST),e}();i.innerText=e;const s={opacity:0};matchMedia("(prefers-reduced-motion: no-preference)").matches&&(s.transform="translateY(100%)"),r.append(i),i.animate([s,{}],{duration:300,fill:"backwards"}),function(e,n){new Promise(((t,r)=>{window.setTimeout((()=>{const n={opacity:0};!1===matchMedia("(prefers-reduced-motion: reduce)").matches&&(n.transform="translateY(-100%)"),e.animate([{},n],{duration:300,fill:"forwards"}).addEventListener("finish",(()=>{e.remove(),t()}))}),n)}))}(i,a.duration)}("Copied!")}function a(e){const n=/^\/\//,t=/^\/?\*/,r=e.split("\n").map((e=>e.trim())).filter((e=>""!==e&&(!n.test(e)&&!t.test(e))));if(0===r.length)throw new Error("Couldn't read empty type definition");const o=r[0].match(/^(export\s+)?(type|interface)\s+(\w+)\s*=?\s*{(\s*\/\/.*)?$/);if(!o)throw new Error("Couldn't determine name of custom type");const a=Boolean(o[1]),i=o[3],s=r.slice(1,-1).map(((e,r)=>{if(n.test(e))return;if(t.test(e))return;const o=e.match(/^(\w+)\s*(\??:)\s*(.+?)(,|;)?(\s*\/\/.*)?$/);if(!o)throw new Error(`Couldn't read property on line ${r} of ${i} definition: ${e}`);const a=o[1],s="?:"===o[2];return[a,`${o[3]}${s?" | undefined":""}`]})).filter((e=>Boolean(e)));return{name:i,props:s,exported:a}}function i(e){return`is${e}`}function s(e,n,t){const{indent:r,indentLevel:o}=t,a=function(e="    ",n=0){const t=new Array(n);return t.fill(e),t.join("")}(r,o),c=/^([A-Z][a-z]+)+$/;if(["boolean","number","string","undefined"].includes(n))return`typeof data.${e} === '${n}'`;if("null"===n)return`data.${e} === null`;const u=n.match(/^(Array<(.+?)>|(.+?)\[\])$/);if(u){const n=u[2]??u[3];return`\n${a}${r}Array.isArray(data.${e}) &&\n${a}${r}data.${e}.every(${n.match(c)?t.passErrorLogger?`(el) => ${i(n)}(el, errorLogger)`:i(n):`() => ${s(e,n,{indent:r,indentLevel:o+1})}`})\n${a}`}const d=n.split(/\s*\|\s*/),l=[...new Set(d)];return d.length!==l.length&&console.warn(`WARNING: Duplicate union member detected in type ${n}`),d.length>1?`\n${a}${r}${d.map((n=>s(e,n,{indent:r,indentLevel:o+1}))).join(` ||\n${a}${r}`)}\n${a}`:c.test(n)?`${i(n)}(data.${e}${t.passErrorLogger?", errorLogger":""})`:`false /* TODO: implement typeguard for \`${e}: ${n}\`*/`}r.classList.add(n.TOAST_CONTAINER),r.setAttribute("aria-live","polite"),document.body.append(r);const c="1.2.0";function u(e){return`assertIs${e}`}const d=function(e){const n=Object.values({TABS:"\t",SPACE_TWO:"  ",SPACE_FOUR:"    "});return function(e){return n.includes(e)}}();function l(n){const t=n.querySelector(e.ALLOW_ENHANCED_DEBUGGING);if(!(t instanceof HTMLInputElement))return null;const r=t.checked,o=n.querySelector(e.INDENTATION);if(!(o instanceof HTMLSelectElement))return null;const a=o.value;return d(a)?{allowEnhancedDebugging:r,indentation:a}:null}function $(){const t=this.closest(e.INSTANCE);if(!t)return;const r=t.querySelector(e.INPUT);if(!(r instanceof HTMLTextAreaElement))return;const o=t.querySelector(e.OUTPUT);if(!(o instanceof HTMLTextAreaElement))return;const d=r.value;try{const e=l(t),r=e?.allowEnhancedDebugging?function(e,n="    "){const t="string"==typeof e?a(e):e,{name:r,props:o,exported:d}=t;return`/**\n * Type assertion function for {@linkcode ${r}}\n *\n * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${c}\n *\n * @param [errorLogger] A function that can log errors specifying exactly where nested typeguards failed\n */\nfunction ${u(r)}(testData: unknown, errorLogger?: (message: string) => void): asserts testData is ${r} {\n${n}const data = testData as ${r};\n\n${n}if (!(\n${n}${n}typeof data === 'object' &&\n${n}${n}data !== null\n${n})) {\n${n}${n}throw new TypeError('Tested value was not an object');\n${n}}\n\n${n}${o.map((([e,t])=>`if (!(${s(e,t,{indent:n,indentLevel:1,passErrorLogger:!0})})) {\n${n}${n}throw new TypeError('\`${r}\` typeguard failed: Property \`${e}\` was not of type \`${t}\`');\n${n}}`)).join(`\n\n${n}`)}\n}\n\n/**\n * Typeguard function for {@linkcode ${r}}\n *\n * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${c}\n *\n * @param [errorLogger] A function that can log errors specifying exactly where the typeguard failed\n */\n${d?"export ":""}function ${i(r)}(testData: unknown, errorLogger?: (message: string) => void): testData is ${r} {\n${n}try {\n${n}${n}${u(r)}(testData, errorLogger);\n${n}${n}return true;\n${n}} catch (e) {\n${n}${n}if (errorLogger) {\n${n}${n}${n}errorLogger(e instanceof Error ? e.message : String(e));\n${n}${n}}\n${n}${n}return false;\n${n}}\n}\n`}(d,e?.indentation):function(e,n="    "){const t="string"==typeof e?a(e):e,{name:r,props:o,exported:u}=t;return`/**\n * Typeguard function for {@linkcode ${r}}\n *\n * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${c}\n */\n${u?"export ":""}function ${i(r)}(testData: unknown): testData is ${r} {\n${n}const data = testData as ${r};\n\n${n}if (!(\n${n}${n}typeof data === 'object' &&\n${n}${n}data !== null\n${n})) {\n${n}${n}return false;\n${n}}\n\n${n}${o.map((([e,t])=>`if (!(${s(e,t,{indent:n,indentLevel:1})})) {\n${n}${n}return false;\n${n}}`)).join(`\n\n${n}`)}\n\n${n}return true;\n}\n`}(d,e?.indentation);o.value=r,o.classList.remove(n.ERROR)}catch(e){const t=e instanceof Error?e.message:String(e);o.value=t,o.classList.add(n.ERROR)}}function f(){const n=this.closest(e.INSTANCE);if(!n)return;const t=l(n);localStorage.setItem("options",JSON.stringify(t))}document.querySelectorAll(e.GENERATE).forEach((e=>e.addEventListener("click",$))),document.addEventListener("keydown",(t=>{const r=document.querySelector(e.INPUT);if(!r)return;const a=document.querySelector(e.OUTPUT);a&&"Enter"===t.key&&(t.ctrlKey||t.metaKey)&&($.call(r),a.classList.contains(n.ERROR)||o.call(r))})),document.querySelectorAll(e.COPY).forEach((e=>e.addEventListener("click",o))),document.querySelectorAll(e.ALLOW_ENHANCED_DEBUGGING).forEach((e=>e.addEventListener("change",f))),document.querySelectorAll(e.INDENTATION).forEach((e=>e.addEventListener("change",f)))})();
//# sourceMappingURL=main.js.map