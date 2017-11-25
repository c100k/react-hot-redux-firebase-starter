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

export function roomListeningStarted() {
  return {
    type: types.CHAT_ROOM_LISTENING_STARTED
  };
}

export function roomReceived(room) {
  return {
    type: types.CHAT_ROOM_RECEIVED_SUCCESS,
    room
  };
}

export function listenToMessages(roomKey) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    dispatch(messageListeningStarted());
    const onChildAdded = message => dispatch(messageReceived(message));
    return firebaseApi.GetRealTimeRef(`/chat-messages/${roomKey}`, onChildAdded);
  };
}

export function listenToRooms() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    dispatch(roomListeningStarted());
    const onChildAdded = room => dispatch(roomReceived(room));
    return firebaseApi.GetRealTimeRef('/chat-rooms', onChildAdded);
  };
}

export function postMessage(roomKey, message) {
  return (dispatch, getState) => {
      dispatch(beginAjaxCall());
      return firebaseApi.databasePush(`/chat-messages/${roomKey}`, {
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
