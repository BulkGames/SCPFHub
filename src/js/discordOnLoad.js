import * as cookie from 'cookie';
const API =
    import.meta.env.VITE_API

const HOST =
    import.meta.env.VITE_HOST

let Data

/** @type {import('./$types').PageServerLoad} */
export async function oauthLoad(request) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');

    if (cookies.disco_refresh_token && !cookies.disco_access_token) {
        const discord_request = await fetch(`${HOST}/api/refresh?code=${cookies.disco_refresh_token}`);
        const discord_response = await discord_request.json();

        if (discord_response.disco_access_token) {
            const request = await fetch(`${API}/users/@me`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            });

            const AdmissionsGuild = await fetch(`${API}/users/@me/guilds/854011100264923156/member`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            })

            const SCPFGuild = await fetch(`${API}/users/@me/guilds/403055116296519691/member`, {
                headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
            })

            const UserResponse = await request.json();
            const AdmissionsResponse = await AdmissionsGuild.json();
            const SCPFResponse = await SCPFGuild.json();

            if (UserResponse.id) {
                return {
                    user: {
                        ...UserResponse,
                    },
                    admissions: {
                        ...AdmissionsResponse,
                    },
                    scpf: {
                        ...SCPFResponse
                    }
                }
            }
        }

    }

    if (cookies.disco_access_token) {
        const request = await fetch(`${API}/users/@me`, {
            headers: { 'Authorization': `Bearer ${cookies.disco_access_token}` }
        });

        const AdmissionsGuild = await fetch(`${API}/users/@me/guilds/854011100264923156/member`, {
            headers: { 'Authorization': `Bearer ${cookies.disco_access_token}` }
        })

        const SCPFGuild = await fetch(`${API}/users/@me/guilds/403055116296519691/member`, {
            headers: { 'Authorization': `Bearer ${cookies.disco_access_token}` }
        })

        const UserResponse = await request.json();
        const AdmissionsResponse = await AdmissionsGuild.json();
        const SCPFResponse = await SCPFGuild.json();

        if (UserResponse.id) {
            return {
                user: {
                    ...UserResponse,
                },
                admissions: {
                    ...AdmissionsResponse,
                },
                scpf: {
                    ...SCPFResponse
                }
            }
        }
    }

    return {
        user: false
    }
}