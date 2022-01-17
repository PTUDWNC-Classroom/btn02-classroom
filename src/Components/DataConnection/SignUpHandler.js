import classroomAxios from "../DataConnection/axiosConfig"

const url = `user/sign-up`
const url1 = `user/valid-email`
//const url2 = `${process.env.REACT_APP_HOST}user/login-social`

export default async function sendUserInfoSignUp(userInfo) {
  //console.log(userInfo);
  try {
    const response = await classroomAxios.post(url, {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function sendUserInfoSocial(userInfo) {
  try {
    //sent idToken to get user info and JWT
    const response = await classroomAxios.post(`user/login-social`, {
      idToken: userInfo.idToken,
    })

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function sendOtpValidEmail(OTP, userInfo) {
  // console.log(OTP);
  try {
    const response = await classroomAxios.post(url1, {
      OTP: OTP,
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}
