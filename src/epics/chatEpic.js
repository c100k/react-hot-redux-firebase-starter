import {map, mergeMap} from 'rxjs';

import * as types from '../actions/actionTypes';
import firebaseApi from '../api/firebase';

function messagePosted(message) {
  return {
    type: types.CHAT_MESSAGE_POST_SUCCESS,
    message
  };
}

const chatEpic = (action$, store) => {
  return action$.ofType(types.CHAT_MESSAGE_POST_STARTED)
    .mergeMap(action =>
      firebaseApi.databasePush(`/chat-messages/${action.roomKey}`, {
        message : action.message,
        authorUID: store.getState().auth.currentUserUID
      })
        .then(() => messagePosted(action.message)));
}

export default chatEpic;
