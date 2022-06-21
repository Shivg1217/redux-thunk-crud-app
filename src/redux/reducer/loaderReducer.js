import { REDUCER_CONSTANT } from "../constant/constant";

const initialState = {
  loader: false,
};

export const loaderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REDUCER_CONSTANT.LOADER_START:
      return {
        ...state,
        loader: action.payload,
      };
    case REDUCER_CONSTANT.LOADER_OFF:
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
};
