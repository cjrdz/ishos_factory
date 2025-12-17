export { renderers } from '../../../renderers.mjs';

const prerender = false;
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  }
});
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    }
  });
};
const GET = async ({ request, params }) => {
  const routeParam = params.route;
  const routeParts = routeParam ? routeParam.split("/") : [];
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return json({ error: "Missing OAuth env vars" }, 500);
  }
  const baseUrl = process.env.BASE_URL || `${request.headers.get("x-forwarded-proto") ?? "https"}://${request.headers.get("host")}`;
  const callbackPath = process.env.REDIRECT_URL || "/api/auth/callback";
  const redirectUri = `${baseUrl}${callbackPath}`;
  if (routeParts.length === 0) {
    const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
    authorizeUrl.searchParams.set("client_id", clientId);
    authorizeUrl.searchParams.set("redirect_uri", redirectUri);
    authorizeUrl.searchParams.set("scope", "repo");
    return new Response(null, {
      status: 302,
      headers: {
        Location: authorizeUrl.toString()
      }
    });
  }
  if (routeParts[0] === "callback") {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    if (!code) {
      return json({ error: "Missing code" }, 400);
    }
    try {
      const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri
        })
      });
      if (!tokenResp.ok) {
        const text = await tokenResp.text();
        return json({ error: "Token exchange failed", text }, 500);
      }
      const data = await tokenResp.json();
      if (!data.access_token) {
        return json({ error: "No access_token", data }, 500);
      }
      const adminRedirect = `${baseUrl}/admin/#/auth/callback?token=${data.access_token}`;
      return new Response(null, {
        status: 302,
        headers: {
          Location: adminRedirect
        }
      });
    } catch (err) {
      return json({ error: "OAuth error", details: `${err}` }, 500);
    }
  }
  return json({ error: "Not found" }, 404);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    OPTIONS,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
