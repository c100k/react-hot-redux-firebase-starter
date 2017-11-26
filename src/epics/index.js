import { combineEpics } from 'redux-observable';

import chatEpic from './chatEpic';

const rootEpic = combineEpics(
  chatEpic
);

export default rootEpic;
