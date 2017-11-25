import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function messageListeningStarted() {
  return {
    type: types.CHAT_MESSAGE_LISTENING_STARTED
  };
}

export function messageReceived(message) {
  return {
    type: types.CHAT_MESSAGE_RECEIVED_SUCCESS,
    message
  };
}

export function messagePosted(message) {
  return {
    type: types.CHAT_MESSAGE_POST_SUCCESS,
    message
  };
}

export function listenToMessages() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    dispatch(messageListeningStarted());
    const onChildAdded = message => dispatch(messageReceived(message));
    return firebaseApi.GetRealTimeRef('/chat-messages', onChildAdded);
  };
}

export function postMessage(message) {
  return (dispatch, getState) => {
      dispatch(beginAjaxCall());
      return firebaseApi.databasePush('/chat-messages', {
        message,
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
