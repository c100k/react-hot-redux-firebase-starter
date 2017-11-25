import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function messagePosted(message) {
  return {
    type: types.CHAT_MESSAGE_POST_SUCCESS,
    message
  };
}

export function postMessage(message) {
  return (dispatch, getState) => {
      dispatch(beginAjaxCall());
      return firebaseApi.databasePush('/chat-messages', {
        message,
        createdAt: new Date().getTime(),
        authorUID: getState().auth.currentUserUID
      })
        .then(() => dispatch(messagePosted(message)))
        .catch(error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}
