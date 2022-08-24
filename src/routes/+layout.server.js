import { oauthLoad } from '../js/discordOnLoad.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
    return oauthLoad(request)
}