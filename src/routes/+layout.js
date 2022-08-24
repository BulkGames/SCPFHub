let Data

/** @type {import('./$types').LayoutLoad} */
export function load({ data }) {
    if (data.admissions.retry_after || data.scpf.retry_after) {
        return Data
    }

    Data = data
    return data
}