import * as cookie from 'cookie';

const CLIENT_ID =
    import.meta.env.VITE_CLIENT_ID;
const CLENT_SECRET =
    import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI =
    import.meta.env.VITE_REDIRECT_URI;

export async function GET({ url, setHeaders }) {
    const disco_refresh_token = url.searchParams.get('code');

    if (!disco_refresh_token) {
        return new Response("No refresh token founs! (If you see this, report it to a developer and try signing out and in again.)", { status: 500 })
    }

    const dataObject = {
        client_id: CLIENT_ID,
        client_secret: CLENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        refresh_token: disco_refresh_token,
        scope: 'identify email guilds'
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    if (response.error) {
        return new Response(JSON.stringify(response.error), { status: 500 })
    }

    setHeaders({
        'set-cookie': [
            cookie.serialize('disco_access_token', response.access_token, {
                maxAge: response.expires_in,
                path: '/',
            }),
            cookie.serialize('disco_refresh_token', response.refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/',
            })
        ],
        'location': '/'
    }, )

    return new Response(null, { status: 302 });
}