import * as cookie from 'cookie';

const CLIENT_ID =
    import.meta.env.VITE_CLIENT_ID;
const CLENT_SECRET =
    import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI =
    import.meta.env.VITE_REDIRECT_URI;

export async function GET({ url, setHeaders }) {
    const returnCode = url.searchParams.get('code');

    const dataObject = {
        client_id: CLIENT_ID,
        client_secret: CLENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        code: returnCode,
        scope: 'identify email guilds'
    };

    const request = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(dataObject),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const response = await request.json();

    if (response.error) {
        setHeaders({ location: '/' })
        return new Response(null, { status: 302 })
    }

    setHeaders({
        'set-cookie': [
            cookie.serialize('disco_access_token', response.access_token, {
                maxAge: 10 * 60 * 1000,
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