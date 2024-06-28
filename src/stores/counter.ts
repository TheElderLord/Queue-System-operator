import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', () => {
  const ticket = ref(0 as number);

  const setTicket = (newTicket: number) => {
      ticket.value = newTicket;
  }
  const getTicket = () => {
      return ticket.value;
  }

  return {  setTicket, getTicket }
})
