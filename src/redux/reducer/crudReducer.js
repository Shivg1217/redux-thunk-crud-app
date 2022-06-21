import { REDUCER_CONSTANT } from "../constant/constant";

const initialState = {
  postData: [],
};

export const crudReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REDUCER_CONSTANT.FETCH_LIST:
      return {
        ...state,
        postData: [...action.payload],
      };
    case REDUCER_CONSTANT.DELETE_POST:
      let newArray = state.postData.filter((val, idx) => {
        return val.id !== action.payload.id;
      });
      return {
        ...state,
        postData: [...newArray],
      };
    case REDUCER_CONSTANT.CREATE_POST:
      return {
        ...state,
        postData: [action.payload, ...state.postData],
      };
    case REDUCER_CONSTANT.UPDATE_POST:
      let updateArray = state.postData.filter((val, idx) => {
        if (val.id === action.payload.apiRes.id) {
          val.title = action.payload.apiRes.data.title;
          val.body = action.payload.apiRes.data.body;
          return val;
        } else {
          return val;
        }
      });
      return {
        ...state,
        postData: [...updateArray],
      };

    default:
      return state;
  }
};
