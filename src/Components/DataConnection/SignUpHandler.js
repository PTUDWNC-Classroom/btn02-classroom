import axios from "axios"

const url = `${process.env.REACT_APP_HOST}user/sign-up`
const url1 = `${process.env.REACT_APP_HOST}user/valid-email`
const url2 = `${process.env.REACT_APP_HOST}user/login-social`

export default async function sendUserInfoSignUp(userInfo) {
  //console.log(userInfo);
  try {
    //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
    const response = await axios.post(url, {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
    })

    return response.data
  } catch (error) {
    //console.error(error);
  }
}

export async function sendUserInfoSocial(userInfo) {
  // console.log(userInfo);
  try {
    //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
    const response = await axios.post(url2, {
      email: userInfo.email,
      username: userInfo.name,
    })
    //  console.log("response");
    //  console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function sendOtpValidEmail(OTP, userInfo) {
  // console.log(OTP);
  try {
    //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
    const response = await axios.post(url1, {
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
