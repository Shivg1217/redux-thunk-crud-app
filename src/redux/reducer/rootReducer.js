import { combineReducers } from "redux";

import { crudReducer } from "./crudReducer";
import { loaderReducer } from "./loaderReducer";

const rootReducer = combineReducers({
  crudReducer: crudReducer,
  loaderReducer: loaderReducer,
});

export default rootReducer;
