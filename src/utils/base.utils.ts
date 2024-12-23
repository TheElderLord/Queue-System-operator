const host = import.meta.env.VITE_SERVER_API_HOST;
const port = import.meta.env.VITE_SERVER_API_PORT;

export const BASE_URL = `http://${host}:${port}/api/v1`


export const TICKETS_URL = `${BASE_URL}/tickets/sessions`
// export const CURRENT_TICKETS_URL = `${BASE_URL}/tickets/sessions`

export const TICKET_CALL_NEXT_URL = `${BASE_URL}/tickets/start`
export const TICKET_FINISH_URL = `${BASE_URL}/tickets/end`

export const OPERATORS_URL = `${BASE_URL}/operators`
export const BRANCHES_URL = `${BASE_URL}/branches`
export const WINDOWS_URL = `${BASE_URL}/windows`
export const SESSIONS_URL = `${BASE_URL}/sessions`
export const SERVICES_URL = `${BASE_URL}/services`
