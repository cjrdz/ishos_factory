import { q as decodeKey } from './chunks/astro/server_DWmbGqKx.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CWWk6Ytj.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/dev/web-dev/astroJS/ishos_Factory/","cacheDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/node_modules/.astro/","outDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/.vercel/output/","srcDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/src/","publicDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/public/","buildClientDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/.vercel/output/static/","buildServerDir":"file:///home/dev/web-dev/astroJS/ishos_Factory/.vercel/output/_functions/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.6_@types+node@25.0.2_rollup@4.53.5_typescript@5.9.3_yaml@2.8.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/[...route]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...route","dynamic":true,"spread":true}]],"params":["...route"],"component":"src/pages/api/auth/[...route].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DA4cxOHW.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/dev/web-dev/astroJS/ishos_Factory/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/home/dev/web-dev/astroJS/ishos_Factory/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.6_@types+node@25.0.2_rollup@4.53.5_typescript@5.9.3_yaml@2.8.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/auth/[...route]@_@ts":"pages/api/auth/_---route_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BVUtWyJc.mjs","/home/dev/web-dev/astroJS/ishos_Factory/node_modules/.pnpm/astro@5.16.6_@types+node@25.0.2_rollup@4.53.5_typescript@5.9.3_yaml@2.8.2/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CX_HaWXU.mjs","/home/dev/web-dev/astroJS/ishos_Factory/src/content/contact.json":"chunks/contact_chByVJMN.mjs","/home/dev/web-dev/astroJS/ishos_Factory/node_modules/.pnpm/astro@5.16.6_@types+node@25.0.2_rollup@4.53.5_typescript@5.9.3_yaml@2.8.2/node_modules/astro/dist/env/setup.js":"chunks/setup_pmSpHZTB.mjs","/home/dev/web-dev/astroJS/ishos_Factory/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C3fh_7xp.js","/home/dev/web-dev/astroJS/ishos_Factory/src/components/sections/Menu.astro?astro&type=script&index=0&lang.ts":"_astro/Menu.astro_astro_type_script_index_0_lang.DzPbXSgz.js","/home/dev/web-dev/astroJS/ishos_Factory/src/components/layout/NavBar.astro?astro&type=script&index=0&lang.ts":"_astro/NavBar.astro_astro_type_script_index_0_lang.BZzRBx-E.js","/home/dev/web-dev/astroJS/ishos_Factory/src/components/layout/BackToTop.astro?astro&type=script&index=0&lang.ts":"_astro/BackToTop.astro_astro_type_script_index_0_lang.B1ZH76vq.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/dev/web-dev/astroJS/ishos_Factory/src/components/sections/Menu.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const r=document.querySelectorAll(\".menu-card-animate\");if(r.length===0)return;const o={threshold:.15,rootMargin:\"0px 0px -50px 0px\"},n=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add(\"animate-in\"),n.unobserve(t.target))})},o);r.forEach(e=>n.observe(e))});"],["/home/dev/web-dev/astroJS/ishos_Factory/src/components/layout/NavBar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const c=Array.prototype.slice.call(document.querySelectorAll(\".navbar-burger\"),0);let a;function s(){const e=document.querySelector(\".navbar.is-fixed-top\");if(!e)return;const o=e.offsetHeight;document.body.classList.contains(\"has-navbar-fixed-top\")&&(document.body.style.paddingTop=o+\"px\")}s(),window.addEventListener(\"resize\",()=>{clearTimeout(a),a=setTimeout(s,100)}),c.forEach(e=>{e.addEventListener(\"click\",()=>{const o=e.dataset.target,t=document.getElementById(o||\"\");e.classList.toggle(\"is-active\"),t&&t.classList.toggle(\"is-active\"),setTimeout(s,0)})});const r=document.querySelectorAll(\"[data-nav-link]\");r.forEach(e=>{e.addEventListener(\"click\",o=>{o.preventDefault();const t=e.getAttribute(\"href\"),n=t?document.querySelector(t):null;if(n){const i=document.getElementById(\"navbarMenu\"),v=document.querySelector(\".navbar-burger\");i?.classList.contains(\"is-active\")&&(i.classList.remove(\"is-active\"),v?.classList.remove(\"is-active\"),setTimeout(s,0)),n.scrollIntoView({behavior:\"smooth\",block:\"start\"})}})});const d=document.querySelectorAll(\"section[id]\"),l={threshold:.3,rootMargin:\"-100px 0px -50% 0px\"},u=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&r.forEach(t=>{t.classList.remove(\"is-active\"),t.getAttribute(\"href\")===`#${o.target.id}`&&t.classList.add(\"is-active\")})})},l);d.forEach(e=>u.observe(e)),window.addEventListener(\"load\",s)});"],["/home/dev/web-dev/astroJS/ishos_Factory/src/components/layout/BackToTop.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"back-to-top\");if(!e)return;const o=()=>{window.scrollY>300?e.classList.add(\"visible\"):e.classList.remove(\"visible\")};let t=!1;const n=()=>{t||(window.requestAnimationFrame(()=>{o(),t=!1}),t=!0)};window.addEventListener(\"scroll\",n,{passive:!0}),o(),e.addEventListener(\"click\",()=>{window.scrollTo({top:0,behavior:\"smooth\"})})});"]],"assets":["/_astro/icon.CSTjGebN.png","/_astro/index.DA4cxOHW.css","/favicon.png","/favicon.svg","/_astro/index.astro_astro_type_script_index_0_lang.C3fh_7xp.js","/admin/config.yml","/uploads/menu-1.png","/uploads/menu-2.png","/uploads/menu-3.png","/uploads/menu-4.png","/uploads/menu-5.png","/uploads/menu-6.png","/uploads/menu-7.png"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"yij2NKOLnWr1b4XdnjDL1vnsa4kcFzANAjGwsgM+kv8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
