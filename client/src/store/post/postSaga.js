import { call, put, takeLatest,all } from "redux-saga/effects";
import { ADD_COMMENT, DELETE_POST, GET_POST_COMMENTS, LIKE_POST, LOAD_POST_FAILED, LOAD_POST_START, LOAD_POST_SUCCESS, SAVE_POST } from "./postReducer";
import { getPosts,addPost, removePost, likePost, commentPost } from "../../requests/post";

function* loadPosts({payload}) {
  try {
    const response = yield call(getPosts, payload);
    const data = yield response.json();
    if (!response.error) {
      yield put(LOAD_POST_SUCCESS(data));
    } else {
      yield put(LOAD_POST_FAILED(response.json()));
    }
  } catch (error) {
    yield put(LOAD_POST_FAILED(error.message));
  }
}

function* savePost({ payload }) {
  try {
    const response = yield call(addPost, payload);
    if (yield response.status !== 201) {
      const { error } = yield response.json();
      console.log(error);
    }
    yield put(LOAD_POST_START({token:payload.token}));
  } catch (error) {
    console.error(error)
  }
}

function* deletePost({ payload }) {
  try {
    const response = yield call(removePost, payload);
    if (yield response.status !== 200) {
      const { error } = yield response.json();
      console.log(error);
    }
    yield put(LOAD_POST_START());
  } catch (error) {
    console.error(error)
  }
}


function* like({ payload }) {
  console.log(payload);
  try {
    const response = yield call(likePost, payload);
    yield put(LOAD_POST_START({token:payload.token}));
  } catch (error) {
    console.error(error)
  }
}

function* addComment({ payload }) {
  try {
    const response = yield call(commentPost, payload);
    yield put(LOAD_POST_START({token:payload.token}));
  } catch (error) {
    console.error(error);
  }
}

function* getComments({ payload }) {
  try {
    const response = yield call(getComments, payload);
    yield put(LOAD_POST_START({token:payload.token}));
  } catch (error) {
    console.error(error);
  }
}

function* onLoadPosts() {
  yield takeLatest(LOAD_POST_START, loadPosts);
}


function* onSave() {
  yield takeLatest(SAVE_POST, savePost);
}

function* onDelete() {
  yield takeLatest(DELETE_POST, deletePost);
}

function* onLikePost() {
  yield takeLatest(LIKE_POST, like)
}

function* onAddComment() {
  yield takeLatest(ADD_COMMENT, addComment)
}

function* onReadComments() {
  yield takeLatest(GET_POST_COMMENTS, getComments)
}

export function* postSaga() {
  yield all([call(onLoadPosts), call(onSave), call(onDelete), call(onLikePost), call(onAddComment), call(onReadComments)]);
}