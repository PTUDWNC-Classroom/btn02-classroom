import axios from "axios"

const url = `${process.env.REACT_APP_HOST}user/sign-in`

export default async function sendUserInfoSignIn(userInfo) {
  try {
    axios.interceptors.request.use((req) => {
      req.headers.authorization = localStorage.token
      return req
    })

    const response = await axios.post(url, {
      username: userInfo.username,
      password: userInfo.password,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
