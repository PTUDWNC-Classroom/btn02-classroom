import axios from "axios"

const classroomAxios = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  // baseURL: process.env.APP_API_BASE_URL,
})

classroomAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  console.log(token)
  config.headers.authorization = token ? `Bearer ${token}` : ""
  return config
})

export default classroomAxios
