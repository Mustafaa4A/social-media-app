import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import reducer from './combinedReducer';
import { rootSaga } from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
  key: 'root',
  storage,
  blacklist:['post']
}


const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
  reducer:persistedReducer,
  middleware:[sagaMiddleware]
})

sagaMiddleware.run(rootSaga);

export default store;
export const persistor = persistStore(store);