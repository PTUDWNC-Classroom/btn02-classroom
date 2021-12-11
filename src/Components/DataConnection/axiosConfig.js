import axios from "axios"

// Create an instance
const classroomAxios = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    Authorization: localStorage.token,
  },
})

/**
 * Add authorization headers with new token
 */
export const setToken = () => {
  classroomAxios.interceptors.request.use(async (config) => {
    config.headers.Authorization = window.localStorage.getItem("token") || null
    return config
  })
}

export default classroomAxios
