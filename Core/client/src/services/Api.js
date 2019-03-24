import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:3000`
  })
}
/*export default() => {
  return axios.create({
    baseURL: `http://10.62.82.171:8081`
  })
}*/
/*export default() => {
  return axios.create({
    baseURL: `https://abounding-smelt.glitch.me`
  })
}*/
