import { createContext, useState, useReducer } from "react"
import actionType from "../constants/actionType"
import tabsReducer from "../reducers/tabsReducer"

const initialState = {
  gradeStruct: [],
  totalGradeCol: [],
  rerender: 0, // using rerender when uploading file
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
      type: actionType.UPDATE_GRADE_STRUCT,
      payload: data ? data : [],
    })
  }

  const updateTotalGradeCol = (data) => {
    dispatch({
      type: actionType.UPDATE_TOTAL_GRADE_COL,
      payload: data
    })
  }

  const countRerender = () => {
    dispatch({
      type: actionType.COUNT_RERENDER,
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
        totalGradeCol: state.totalGradeCol,
        updateTotalGradeCol,
        rerender: state.rerender,
        countRerender
      }}
    >
      {children}
    </tabsContext.Provider>
  )
}

export default TabsProvider
