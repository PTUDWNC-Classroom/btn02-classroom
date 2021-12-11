import classroomAxios from "../DataConnection/axiosConfig"

export default async function sendUserInfoSignIn(userInfo) {
  try {
    const response = await classroomAxios.post("user/sign-in", {
      username: userInfo.username,
      password: userInfo.password,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
