import { REDUCER_CONSTANT } from "../constant/constant";
import { crud } from "../services/crud";

const loaderStart = (dispatch) => {
  dispatch({
    type: REDUCER_CONSTANT.LOADER_START,
    payload: true,
  });
};

const loaderOff = (dispatch) => {
  dispatch({
    type: REDUCER_CONSTANT.LOADER_OFF,
    payload: false,
  });
};

export const fetchList = async (dispatch, data) => {
  try {
    loaderStart(dispatch);
    var apiRes = await crud.fetchList(data);
    dispatch({
      type: REDUCER_CONSTANT.FETCH_LIST,
      payload: [...apiRes.data],
    });
    loaderOff(dispatch);
    return true;
  } catch (err) {
    dispatch({
      type: REDUCER_CONSTANT.FETCH_LIST,
      payload: {
        data: [],
      },
    });
    loaderOff(dispatch);
    return err;
  }
};

export const deletePost = async (dispatch, data) => {
  try {
    loaderStart(dispatch);
    var apiRes = await crud.delPost(`posts/${data.id}`);
    dispatch({
      type: REDUCER_CONSTANT.DELETE_POST,
      payload: { id: data.id },
    });
    loaderOff(dispatch);
    return apiRes.status === 200;
  } catch (err) {
    loaderOff(dispatch);
    return err;
  }
};

export const createPost = async (dispatch, data) => {
  try {
    loaderStart(dispatch);
    var apiRes = await crud.createPost(data);
    dispatch({
      type: REDUCER_CONSTANT.CREATE_POST,
      payload: apiRes.data,
    });
    loaderOff(dispatch);
    return true;
  } catch (err) {
    loaderOff(dispatch);
    return false;
  }
};

export const updatePost = async (dispatch, data) => {
  try {
    loaderStart(dispatch);
    var apiRes = await crud.updatePost(data);
    dispatch({
      type: REDUCER_CONSTANT.UPDATE_POST,
      payload: { apiRes },
    });
    loaderOff(dispatch);
    return true;
  } catch (err) {
    loaderOff(dispatch);
    return false;
  }
};
