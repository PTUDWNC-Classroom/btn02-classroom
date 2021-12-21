import actionType from "../constants/actionType"

export default function classroomReducer(state, action) {
  switch (action.type) {
    case actionType.UPDATE_GRADE_STRUCT:
      return {
        ...state,
        gradeStruct: [...action.payload],
      }

    case actionType.UPDATE_TOTAL_GRADE_COL:
      return {
        ...state,
        totalGradeCol: [...action.payload]
      }

    case actionType.COUNT_RERENDER:
      return {
        ...state,
        rerender: state.rerender + 1
      }
      
    default:
      return state
  }
}
