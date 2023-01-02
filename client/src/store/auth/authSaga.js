import { put , takeLatest, all, call} from 'redux-saga/effects';
import { login } from '../../requests/auth';
import { getUserFriends, requestFriend, addFriend, deleteRequest } from '../../requests/user';
import { DELETE_REQUEST, ECCEPT_REQUEST, LOAD_FRIENDS, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, SEND_REQUEST, SET_FRIENDS } from './authReducer';

function* userLogin({ payload }) {
  try {
    const response = yield call(login, payload);
    if (yield response.status === 500) {
      yield put(LOGIN_FAILED("Something wet wrong"));
    }
    if (yield response.status === 400) {
      const {message} = yield response.json();
      yield put(LOGIN_FAILED(message));
    } else {
      const data = yield response.json();
      yield put(LOGIN_SUCCESS(data));
      yield put(LOAD_FRIENDS(data.user._id));
    }
  } catch (error) {
    yield console.error(error);
  }
}

function* loadFriends({ payload }) {
  const response = yield call(getUserFriends, payload);
  if (yield response.status === 200) {
    const data = yield response.json();
    yield put(SET_FRIENDS(data));
  } else {
    const { error } = yield response.json();
    console.log(error);
  }
}

function* sendRequest({ payload }) {
  const response = yield call(requestFriend, payload);
  yield put(LOAD_FRIENDS({userId:payload.userId}));
}

function* ecceptReq({ payload }) {
  const response = yield call(addFriend, payload);
  yield put(LOAD_FRIENDS({userId:payload.userId}));
}

function* deleteReq({ payload }) {
  const response = yield call(deleteRequest, payload);
  yield put(LOAD_FRIENDS({userId:payload.userId}));
}

function* onLogin() {
 yield takeLatest(LOGIN_START, userLogin) 
}

function* onLoadFriends() {
  yield takeLatest(LOAD_FRIENDS, loadFriends);
}

function* onSendRequest() {
  yield takeLatest(SEND_REQUEST, sendRequest);
}

function* onEcceptRequest() {
  yield takeLatest(ECCEPT_REQUEST, ecceptReq);
}

function* onDeleteRequest() {
  yield takeLatest(DELETE_REQUEST, deleteReq);
}

export function* authSaga() {
  yield all([onLogin(), onLoadFriends(), onSendRequest(), onEcceptRequest(), onDeleteRequest()])
}