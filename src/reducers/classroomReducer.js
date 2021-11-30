import actionType from "../constants/actionType"

export default function classroomReducer(state, action) {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        user: action.payload,
      }

    case actionType.LOGOUT:
      return state

    case actionType.UPDATE_CLASS_LIST:
      return {
        ...state,
        classList: [...action.payload],
      }

    case actionType.ADD_CLASS:
      return {
        ...state,
        classList: [...state.classList, action.payload],
      }

    case actionType.UPDATE_ROLE_IN_CLASS:
      const updatedEmployee = action.payload

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee
        }
        return employee
      })

      return {
        ...state,
        employees: updatedEmployees,
      }

    default:
      return state
  }
}
