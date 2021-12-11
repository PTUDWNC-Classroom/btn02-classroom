import classroomAxios from "./axiosConfig"

export default async function sendInviteLink(classId, email, memberType) {
  try {
    const response = await classroomAxios.post("join/invite", {
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
