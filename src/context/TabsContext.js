import { createContext, useState, useReducer } from "react"
import actionType from "../constants/actionType"
import tabsReducer from "../reducers/tabsReducer"

const initialState = {
  gradeStruct: [],
}

export const tabsContext = createContext(initialState)

const TabsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tabsReducer, initialState)
  const [value, setValue] = useState(0)
  const [classDetails, setClassDetails] = useState({})
  const [role, setRole] = useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClassDetails = (info) => {
    setClassDetails(info)
  }

  const updateGradeStruct = (data) => {
    dispatch({
      type: actionType.UPDATE_CLASS_DETAILS,
      payload: data ? data : [],
    })
  }

  return (
    <tabsContext.Provider
      value={{
        value,
        handleChange,
        classDetails,
        handleClassDetails,
        role,
        setRole,
        gradeStruct: state.gradeStruct,
        updateGradeStruct,
      }}
    >
      {children}
    </tabsContext.Provider>
  )
}

export default TabsProvider
