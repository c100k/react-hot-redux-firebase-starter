import {push} from 'react-router-redux';
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

export function roomCreated() {
  return {
    type: types.CHAT_ROOM_POST_SUCCESS
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

export function roomJoined(room) {
  return {
    type: types.CHAT_ROOM_JOIN_SUCCESS
  };
}

export function roomLeft(room) {
  return {
    type: types.CHAT_ROOM_LEAVE_SUCCESS
  };
}

export function userListeningStarted() {
  return {
    type: types.CHAT_USER_LISTENING_STARTED
  };
}

export function userReceived(user) {
  return {
    type: types.CHAT_USER_RECEIVED_SUCCESS,
    user
  };
}

export function listenToMessages(roomKey) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    dispatch(messageListeningStarted());
    const onChildAdded = message => dispatch(messageReceived(message));
    return firebaseApi.GetRealTimeRef(`/chat-messages/${roomKey}`, onChildAdded, null, { limitToLast: 10 });
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

export function listenToUsers(roomKey) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    dispatch(userListeningStarted());
    const onChildEvent = (user) => {
      dispatch(userReceived(user));
    };
    return firebaseApi.GetRealTimeRef(`/chat-users/${roomKey}`, onChildEvent, onChildEvent);
  };
}

export function createRoom(name) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush(`/chat-rooms`, {
      name,
      authorUID: getState().auth.currentUserUID
    })
      .then(() => dispatch(roomCreated()))
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      });
};
}

export function joinRoom(room) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databaseSet(`/chat-users/${room.key}/${getState().auth.currentUserUID}`, true)
      .then(() => dispatch(roomJoined()))
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      });
  };
}

export function leaveRoom(roomKey) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    /* We set the flag as false to keep a record that the user has already been in the room instead of
       simply deleting the record */
    return firebaseApi.databaseSet(`/chat-users/${roomKey}/${getState().auth.currentUserUID}`, false)
      .then(() => dispatch(roomLeft()))
      .then(() => dispatch(push('/chat')))
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      });
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
