import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootEpic from '../epics';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { browserHistory } from "react-router";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, createEpicMiddleware(rootEpic), reduxImmutableStateInvariant(), routerMiddleware(browserHistory)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
