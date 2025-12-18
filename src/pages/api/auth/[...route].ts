// src/pages/api/auth/[...route].ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
    const routeParam = params.route;
    const routeParts = routeParam ? routeParam.split('/') : [];

    // Only handle the initial OAuth redirect
    if (routeParts.length === 0) {
        const clientId = import.meta.env.OAUTH_CLIENT_ID;
        
        if (!clientId) {
            return new Response(
                JSON.stringify({ error: 'Missing OAuth client ID' }), 
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const url = new URL(request.url);
        const origin = url.origin;
        const state = url.searchParams.get('state') || '';
        
        const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
        authorizeUrl.searchParams.set('client_id', clientId);
        authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/auth/callback`);
        authorizeUrl.searchParams.set('scope', 'repo,user');
        authorizeUrl.searchParams.set('state', state);

        return Response.redirect(authorizeUrl.toString(), 302);
    }

    return new Response(
        JSON.stringify({ error: 'Route not found' }), 
        {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        }
    );
};