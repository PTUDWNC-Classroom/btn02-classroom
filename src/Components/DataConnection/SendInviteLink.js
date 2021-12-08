import axios from "axios"

const url = `${process.env.REACT_APP_HOST}join/invite`

export default async function sendInviteLink(classId, email, memberType) {
  try {
    const response = await axios.post(url, {
      classId: classId,
      email: email,
      memberType: memberType,
    })
    //console.log("response")
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
