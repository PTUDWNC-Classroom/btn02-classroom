import classroomAxios from "./axiosConfig"

//const url = "http://localhost:3000/join/add-student"
const url = `join/add-student`
const url1 = `join/add-teacher`

export default async function addStudentIntoClass(userInfo, id) {
  console.log("userInfo")
  console.log(userInfo);
  try {
    const response = await classroomAxios.post(url, {
      _id: userInfo._id,
      username: userInfo.username,
      email: userInfo.email,
      classId: id,
    })
    //console.log("response")
    return response.data
  } catch (error) {
    //console.error(error);
    return false
  }
}

export async function addTeacherIntoClass(userInfo, id) {
  // console.log("userInfo")
  // console.log(userInfo);
  try {
    const response = await classroomAxios.post(url1, {
      _id: userInfo._id,
      username: userInfo.username,
      email: userInfo.email,
      classId: id,
    })
    //  console.log("response")
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
