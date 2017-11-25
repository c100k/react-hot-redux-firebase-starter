import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function messagesListed(messages) {
  return {
    type: types.CHAT_MESSAGE_LIST_SUCCESS,
    messages
  };
}

export function messagePosted(message) {
  return {
    type: types.CHAT_MESSAGE_POST_SUCCESS,
    message
  };
}

export function listMessages() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.GetValuesOnce('/chat-messages', { limitToLast: 10 })
      .then(messages => dispatch(messagesListed(messages)))
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      });
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
