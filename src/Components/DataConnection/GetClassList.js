import classroomAxios from "../DataConnection/axiosConfig"

export default async function getClassList(setIsLoaded, setItems, setError) {
  try {
    const response = await classroomAxios.get(`classes/class-list`)
    if (response) {
      setIsLoaded(true)
      setItems(response.data)
    }
  } catch (error) {
    console.error(error)
    setIsLoaded(true)
    setError(error)
  }
}
