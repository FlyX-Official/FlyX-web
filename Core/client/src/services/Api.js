import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
/*export default() => {
  return axios.create({
    baseURL: `http://10.62.82.171:8081`
  })
}*/
/*export default() => {
  return axios.create({
    baseURL: `https://gusty-windscreen.glitch.me`
  })
}*/
