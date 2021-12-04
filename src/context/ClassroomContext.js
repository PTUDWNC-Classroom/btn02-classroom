import React, { createContext, useReducer } from "react"
import actionType from "../constants/actionType"
import classroomReducer from "../reducers/classroomReducer"

const initialState = {
  classList: [],
  user: {
    _id: "",
    username: "",
    email: "",
    studentId: "",
  },
  roleInClass: "",
}

export const ClassroomContext = createContext(initialState)

export const ClassroomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classroomReducer, initialState)

  const login = (userInfo) => {
    dispatch({
      type: actionType.LOGIN,
      payload: userInfo,
    })
  }

  const logout = () => {
    dispatch({
      type: actionType.LOGOUT,
    })
  }

  const updateClassList = (classList) => {
    dispatch({
      type: actionType.UPDATE_CLASS_LIST,
      payload: classList,
    })
  }

  const addClass = (classInfo) => {
    dispatch({
      type: actionType.ADD_CLASS,
      payload: classInfo,
    })
  }

  const updateRoleInClass = (role) => {
    dispatch({
      type: actionType.UPDATE_ROLE_IN_CLASS,
      payload: role,
    })
  }

  return (
    <ClassroomContext.Provider
      value={{
        classList: state.classList,
        user: state.user,
        roleInClass: state.roleInClass,
        login,
        logout,
        addClass,
        updateClassList,
        updateRoleInClass,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}
