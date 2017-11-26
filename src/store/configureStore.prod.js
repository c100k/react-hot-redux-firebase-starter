import {createStore, applyMiddleware} from 'redux';
import rootEpic from '../epics';
import rootReducer from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, createEpicMiddleware(rootEpic))
  );
}
