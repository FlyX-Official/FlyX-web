import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:3000`
  })
}
/*export default() => {
  return axios.create({
    baseURL: `https://flyx-server.herokuapp.com/`
  })
}*/
/*export default() => {
  return axios.create({
    baseURL: `https://abounding-smelt.glitch.me`
  })
}*/
