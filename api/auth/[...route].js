// Minimal GitHub OAuth bridge for Decap CMS on Vercel.
// Exposes:
//   - GET /api/auth           → redirects to GitHub OAuth
//   - GET /api/auth/callback  → exchanges code for token and returns { token }
//
// Required env vars (set in Vercel project settings):
//   OAUTH_CLIENT_ID       GitHub OAuth App client ID
//   OAUTH_CLIENT_SECRET   GitHub OAuth App client secret
//   GITHUB_REPO           e.g., cjrdz/ishos_factory
//   GITHUB_BRANCH         e.g., main
// Optional:
//   BASE_URL              e.g., https://ishos-factory.vercel.app
//   REDIRECT_URL          e.g., /api/auth/callback

export default async function handler(req, res) {
    const routeParam = req.query.route;
    const routeParts = Array.isArray(routeParam)
        ? routeParam
        : routeParam
        ? [routeParam]
        : [];

    // Basic CORS (adjust origin if desired)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        res.status(500).json({ error: 'Missing OAuth env vars' });
        return;
    }

    const baseUrl =
        process.env.BASE_URL || `https://${req.headers.host ?? 'localhost'}`;
    const callbackPath = process.env.REDIRECT_URL || '/api/auth/callback';
    const redirectUri = `${baseUrl}${callbackPath}`;

    // Start OAuth: /api/auth
    if (routeParts.length === 0) {
        const authorizeUrl = new URL(
            'https://github.com/login/oauth/authorize'
        );
        authorizeUrl.searchParams.set('client_id', clientId);
        authorizeUrl.searchParams.set('redirect_uri', redirectUri);
        authorizeUrl.searchParams.set('scope', 'repo');
        // Optionally add state; omitted here for brevity.
        res.writeHead(302, { Location: authorizeUrl.toString() });
        res.end();
        return;
    }

    // Callback: /api/auth/callback
    if (routeParts[0] === 'callback') {
        const code = req.query.code;
        if (!code) {
            res.status(400).json({ error: 'Missing code' });
            return;
        }

        try {
            const tokenResp = await fetch(
                'https://github.com/login/oauth/access_token',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        client_secret: clientSecret,
                        code,
                        redirect_uri: redirectUri,
                    }),
                }
            );

            if (!tokenResp.ok) {
                const text = await tokenResp.text();
                res.status(500).json({ error: 'Token exchange failed', text });
                return;
            }

            const data = await tokenResp.json();
            if (!data.access_token) {
                res.status(500).json({ error: 'No access_token', data });
                return;
            }

            res.status(200).json({ token: data.access_token });
        } catch (err) {
            res.status(500).json({ error: 'OAuth error', details: `${err}` });
        }
        return;
    }

    res.status(404).json({ error: 'Not found' });
}
