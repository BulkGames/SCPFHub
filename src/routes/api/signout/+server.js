export async function GET({ setHeaders }) {
    setHeaders({
        'set-cookie': [
            cookie.serialize('disco_access_token', "deleted", {
                maxAge: -1,
                path: '/',
            }),
            cookie.serialize('disco_refresh_token', "deleted", {
                maxAge: -1,
                path: '/',
            })
        ],
        location: '/'
    })

    return new Response(null, { status: 302 })
}