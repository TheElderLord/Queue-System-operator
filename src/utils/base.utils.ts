const host = import.meta.env.VITE_SERVER_API_HOST;
const port = import.meta.env.VITE_SERVER_API_PORT;

export const BASE_URL = `http://${host}:${port}/api/v1`


export const TICKETS_URL = `${BASE_URL}/tickets/sessions/1?status=NEW`
export const CURRENT_TICKETS_URL = `${BASE_URL}/tickets/sessions/1?status=INSERVICE`

export const TICKET_CALL_NEXT_URL = `${BASE_URL}/tickets/start`
export const TICKET_FINISH_URL = `${BASE_URL}/tickets/end`