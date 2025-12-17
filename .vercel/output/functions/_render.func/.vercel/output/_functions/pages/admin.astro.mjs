import { c as createComponent, r as renderHead, a as renderScript, b as renderTemplate } from '../chunks/astro/server_DWmbGqKx.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Content Manager | Isho's Factory</title><meta name="robots" content="noindex"><link href="/admin/config.yml" type="text/yaml" rel="cms-config-url"><link rel="stylesheet" href="https://unpkg.com/decap-cms@^3.9.0/dist/decap-cms.css">${renderHead()}</head> <body> ${renderScript($$result, "/home/dev/web-dev/astroJS/ishos_Factory/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/dev/web-dev/astroJS/ishos_Factory/src/pages/admin/index.astro", void 0);

const $$file = "/home/dev/web-dev/astroJS/ishos_Factory/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
