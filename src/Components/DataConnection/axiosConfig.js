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

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem("refreshToken")
  return refreshToken
}

function refreshToken() {
  return classroomAxios.post("/user/exchange-access-token", {
    refreshToken: getLocalRefreshToken(),
  })
}

classroomAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async (err) => {
    const originalConfig = err.config

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const response = await refreshToken()
          const { token } = response.data
          window.localStorage.setItem("token", `Bearer  ${token}`)
          window.dispatchEvent(new Event("local-storage"))

          classroomAxios.interceptors.request.use(async (config) => {
            config.headers.Authorization = token
            return config
          })

          return classroomAxios(originalConfig)
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }

          return Promise.reject(_error)
        }
      }

      if (err.response.status === 403 && err.response.data) {
        localStorage.clear()
        window.location.href = "/sign-in"
        return Promise.reject(err.response.data)
      }
    }

    return Promise.reject(err)
  }
)

export default classroomAxios
