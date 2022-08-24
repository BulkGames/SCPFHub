const CLIENT_ID =
    import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI =
    import.meta.env.VITE_REDIRECT_URI;

const ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=guilds.join%20guilds%20identify%20guilds.members.read%20email`;

export async function GET({ setHeaders }) {
    setHeaders({ location: ENDPOINT })

    return new Response(null, { status: 302 })
}