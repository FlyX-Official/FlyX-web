
import Api from '@/services/Api'

export default {
  fetchTickets () {
    return Api().get('/tickets')
  }
}
