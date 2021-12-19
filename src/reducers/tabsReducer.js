import actionType from "../constants/actionType"

export default function classroomReducer(state, action) {
  switch (action.type) {
    case actionType.UPDATE_CLASS_DETAILS:
      return {
        ...state,
        gradeStruct: [...action.payload],
      }

    case actionType.UPDATE_TOTAL_GRADE_COL:
      return {
        ...state,
        totalGradeCol: [...action.payload]
      }
      
    default:
      return state
  }
}
