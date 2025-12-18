// pages/api/auth/[...route].ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
    const routeParam = params.route;
    const routeParts = routeParam ? routeParam.split('/') : [];

    const clientId = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new Response(JSON.stringify({ error: 'Missing OAuth credentials' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const url = new URL(request.url);
    const origin = url.origin;

    // Step 1: Initial OAuth request - Redirect to GitHub
    if (routeParts.length === 0) {
        const state = url.searchParams.get('state') || '';
        const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
        authorizeUrl.searchParams.set('client_id', clientId);
        authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/auth/callback`);
        authorizeUrl.searchParams.set('scope', 'repo,user');
        authorizeUrl.searchParams.set('state', state);

        return new Response(null, {
            status: 302,
            headers: { Location: authorizeUrl.toString() }
        });
    }

    // Step 2: GitHub callback - Exchange code for token
    if (routeParts[0] === 'callback') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state') || '';

        if (!code) {
            return new Response(JSON.stringify({ error: 'No code provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            // Exchange code for access token
            const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code,
                    redirect_uri: `${origin}/api/auth/callback`,
                }),
            });

            const data = await tokenResponse.json();

            if (data.error || !data.access_token) {
                throw new Error(data.error_description || 'Failed to get access token');
            }

            // Return HTML that posts message back to Decap CMS
            const html = `



    Authorizing...
    
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .message {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
    


    
        Authorization Successful!
        Redirecting to CMS...
    
    
        (function() {
            function receiveMessage(e) {
                console.log("receiveMessage:", e);
                window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify({
                        token: "${data.access_token}",
                        provider: "github"
                    }),
                    e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
            }
            
            window.addEventListener("message", receiveMessage, false);
            
            console.log("Sending authorizing message");
            window.opener.postMessage("authorizing:github", "*");
            
            // Fallback: close window after 3 seconds
            setTimeout(function() {
                window.close();
            }, 3000);
        })();
    

`;

            return new Response(html, {
                status: 200,
                headers: { 'Content-Type': 'text/html' }
            });

        } catch (error) {
            console.error('OAuth error:', error);
            return new Response(JSON.stringify({ 
                error: 'OAuth failed', 
                details: error instanceof Error ? error.message : 'Unknown error'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
};